import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { VolService } from '../../../core/services/vol.service';
import { AuthService } from '../../../core/services/auth.service';
import { Vol } from '../../../core/models/vol.model';
import { TypeReservationEnum, ClasseVolEnum } from '../../../core/models/reservation.model';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './create-reservation.component.html'
})
export class CreateReservationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservationService = inject(ReservationService);
  private volService = inject(VolService);
  private authService = inject(AuthService);

  reservationForm!: FormGroup;
  volAller?: Vol;
  volsRetour: Vol[] = [];
  loading = false;
  showSuccess = false;
  prixEstime = 0;

  typesReservation = Object.values(TypeReservationEnum);
  classesVol = Object.values(ClasseVolEnum);
  
  // CORRECTION: Typage explicite de l'objet multiplicateurs
  multiplicateurs: Record<ClasseVolEnum, number> = {
    [ClasseVolEnum.ECONOMIQUE]: 1.0,
    [ClasseVolEnum.PREMIUM]: 1.5,
    [ClasseVolEnum.AFFAIRES]: 2.5
  };

  ngOnInit() {
    const volId = this.route.snapshot.paramMap.get('volId');
    if (volId) {
      this.loadVol(+volId);
    }

    this.initForm();
    this.setupFormListeners();
  }

  initForm() {
    const currentUserId = this.authService.getCurrentUserId();
    this.reservationForm = this.fb.group({
      utilisateurId: [currentUserId, Validators.required],
      volAllerId: ['', Validators.required],
      volRetourId: [''],
      typeReservation: [TypeReservationEnum.ALLER, Validators.required],
      classeVol: [ClasseVolEnum.ECONOMIQUE, Validators.required],
      dateDepart: ['', Validators.required],
      dateRetour: [''],
      nombrePassagers: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  setupFormListeners() {
    this.reservationForm.valueChanges.subscribe(() => {
      this.calculerPrix();
    });

    this.reservationForm.get('typeReservation')?.valueChanges.subscribe(type => {
      if (type === TypeReservationEnum.ALLER_RETOUR && this.volAller) {
        this.chargerVolsRetour();
      }
    });
  }

  loadVol(id: number) {
    this.volService.getVolById(id).subscribe({
      next: (vol) => {
        this.volAller = vol;
        this.reservationForm.patchValue({ volAllerId: vol.id });
        this.calculerPrix();
      }
    });
  }

  chargerVolsRetour() {
    if (!this.volAller) return;
    
    const dateDepart = this.reservationForm.get('dateDepart')?.value;
    const nombrePassagers = this.reservationForm.get('nombrePassagers')?.value;

    this.volService.rechercherVols({
      villeDepartId: this.volAller.villeArrivee.id,
      villeArriveeId: this.volAller.villeDepart.id,
      dateDepart: dateDepart,
      nombrePassagers: nombrePassagers
    }).subscribe({
      next: (vols) => this.volsRetour = vols
    });
  }

  calculerPrix() {
    if (!this.volAller) return;

    const typeReservation = this.reservationForm.get('typeReservation')?.value;
    const classeVol = this.reservationForm.get('classeVol')?.value as ClasseVolEnum; // CORRECTION: Cast explicite
    const nombrePassagers = this.reservationForm.get('nombrePassagers')?.value || 1;
    const volRetourId = this.reservationForm.get('volRetourId')?.value;

    let prix = this.volAller.prixBase * this.multiplicateurs[classeVol] * nombrePassagers;

    if (typeReservation === TypeReservationEnum.ALLER_RETOUR && volRetourId) {
      const volRetour = this.volsRetour.find(v => v.id === +volRetourId);
      if (volRetour) {
        prix += volRetour.prixBase * this.multiplicateurs[classeVol] * nombrePassagers;
      }
    }

    this.prixEstime = prix;
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.loading = true;

      this.reservationService.createReservation(this.reservationForm.value).subscribe({
        next: (reservation) => {
          this.loading = false;
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/paiements'], {
              queryParams: { reservationId: reservation.id }
            });
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          alert('Erreur: ' + (error.error?.message || 'Échec de la réservation'));
        }
      });
    }
  }

  getClasseLabel(classe: ClasseVolEnum): string {
    const labels: Record<ClasseVolEnum, string> = {
      [ClasseVolEnum.ECONOMIQUE]: 'Économique (×1)',
      [ClasseVolEnum.PREMIUM]: 'Premium (×1.5)',
      [ClasseVolEnum.AFFAIRES]: 'Affaires (×2.5)'
    };
    return labels[classe];
  }
}