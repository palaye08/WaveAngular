import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../../../core/services/paiement.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Paiement, ModePaiementEnum, StatutPaiementEnum } from '../../../core/models/paiement.model';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-list-paiements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './list-paiements.component.html'
})
export class ListPaiementsComponent implements OnInit {
  private paiementService = inject(PaiementService);
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  paiements: Paiement[] = [];
  reservationSelectionnee?: Reservation;
  paiementForm!: FormGroup;
  loading = false;
  showPaiementForm = false;
  isAdmin = false;

  modesPaiement = Object.values(ModePaiementEnum);

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.initForm();
    
    // Vérifier si on vient d'une réservation
    const reservationId = this.route.snapshot.queryParamMap.get('reservationId');
    if (reservationId) {
      this.loadReservation(+reservationId);
      this.showPaiementForm = true;
    } else {
      this.loadPaiements();
    }
  }

  initForm() {
    this.paiementForm = this.fb.group({
      reservationId: ['', Validators.required],
      modePaiement: [ModePaiementEnum.WAVE, Validators.required],
      numeroTelephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{9,15}$')]]
    });
  }

  loadReservation(id: number) {
    this.reservationService.getReservationsByUtilisateur(
      this.authService.getCurrentUserId()!
    ).subscribe({
      next: (reservations) => {
        this.reservationSelectionnee = reservations.find(r => r.id === id);
        if (this.reservationSelectionnee) {
          this.paiementForm.patchValue({ reservationId: id });
        }
      }
    });
  }

  loadPaiements() {
    if (this.isAdmin) {
      this.paiementService.getPaiements().subscribe({
        next: (paiements) => this.paiements = paiements
      });
    }
  }

  initierPaiement() {
    if (this.paiementForm.valid) {
      this.loading = true;
      const mode = this.paiementForm.get('modePaiement')?.value;

      if (mode === ModePaiementEnum.WAVE || mode === ModePaiementEnum.ORANGE_MONEY) {
        this.paiementService.initierPaiement(this.paiementForm.value).subscribe({
          next: (paiement) => {
            this.loading = false;
            if (paiement.referenceExterne) {
              // Rediriger vers la page de paiement Wave/Orange
              window.open(paiement.referenceExterne, '_blank');
              alert('Une nouvelle fenêtre s\'est ouverte pour le paiement. Scannez le QR code pour payer.');
            }
          },
          error: (err) => {
            this.loading = false;
            alert('Erreur: ' + err.error?.message);
          }
        });
      }
    }
  }

  getModePaiementIcon(mode: ModePaiementEnum): string {
    const icons: Record<ModePaiementEnum, string> = {
      [ModePaiementEnum.WAVE]: '🌊',
      [ModePaiementEnum.ORANGE_MONEY]: '🍊',
      [ModePaiementEnum.ESPECES]: '💵',
      [ModePaiementEnum.CARTE_BANCAIRE]: '💳'
    };
    return icons[mode];
  }

  getStatutClass(statut: StatutPaiementEnum): string {
    const classes: Record<StatutPaiementEnum, string> = {
      [StatutPaiementEnum.EN_ATTENTE]: 'bg-yellow-100 text-yellow-700',
      [StatutPaiementEnum.PAYE]: 'bg-green-100 text-green-700',
      [StatutPaiementEnum.ECHOUE]: 'bg-red-100 text-red-700',
      [StatutPaiementEnum.REMBOURSE]: 'bg-blue-100 text-blue-700'
    };
    return classes[statut];
  }
}