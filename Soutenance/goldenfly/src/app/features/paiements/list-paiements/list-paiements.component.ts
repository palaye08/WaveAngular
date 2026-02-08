import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../../../core/services/paiement.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Paiement, ModePaiementEnum, StatutPaiementEnum, PaiementManuel } from '../../../core/models/paiement.model';
import { Reservation } from '../../../core/models/reservation.model';
import { Billet } from '../../../core/models/reservation.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-list-paiements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './list-paiements.component.html',
  styleUrls: ['./list-paiements.component.css']
})
export class ListPaiementsComponent implements OnInit {
  private paiementService = inject(PaiementService);
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  paiements: Paiement[] = [];
  reservations: Reservation[] = [];
  reservationSelectionnee?: Reservation;
  billetDetails?: Billet;
  paiementForm!: FormGroup;
  
  loading = false;
  showPaiementForm = false;
  showBilletModal = false;
  showSuccessModal = false;
  isAdmin = false;

  modesPaiement = Object.values(ModePaiementEnum);
  modePaiementSelectionne?: ModePaiementEnum;
ModePaiementEnum = ModePaiementEnum; // Exposer l'enum au template
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.initForm();
    this.loadUserReservations();
    
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
      montant: [{ value: '', disabled: true }],
      modePaiement: ['', Validators.required],
      numeroRecu: [''],
      commentaire: ['']
    });
  }

  loadUserReservations() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.reservationService.getReservationsByUtilisateur(userId).subscribe({
        next: (reservations) => {
          this.reservations = reservations.filter(r => !r.estPaye);
        },
        error: (err) => {
          this.showError('Impossible de charger les réservations');
        }
      });
    }
  }

  loadReservation(id: number) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.reservationService.getReservationsByUtilisateur(userId).subscribe({
        next: (reservations) => {
          this.reservationSelectionnee = reservations.find(r => r.id === id);
          if (this.reservationSelectionnee) {
            this.paiementForm.patchValue({ 
              reservationId: id,
              montant: this.reservationSelectionnee.prixTotal
            });
          }
        },
        error: (err) => {
          this.showError('Impossible de charger la réservation');
        }
      });
    }
  }

  onReservationChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const reservationId = +selectElement.value;
    
    if (reservationId) {
      this.reservationSelectionnee = this.reservations.find(r => r.id === reservationId);
      if (this.reservationSelectionnee) {
        this.paiementForm.patchValue({
          montant: this.reservationSelectionnee.prixTotal
        });
      }
    }
  }

  selectModePaiement(mode: ModePaiementEnum) {
    this.modePaiementSelectionne = mode;
    this.paiementForm.patchValue({ modePaiement: mode });
  }

  loadPaiements() {
    const userId = this.authService.getCurrentUserId();
    if (this.isAdmin) {
      this.paiementService.getPaiements().subscribe({
        next: (paiements) => this.paiements = paiements
      });
    }
     if (userId) {
        this.paiementService.getPaiementsByUserId(userId).subscribe({
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

  effectuerPaiement() {
    if (this.paiementForm.valid && this.reservationSelectionnee) {
      this.loading = true;

      const paiementData: PaiementManuel = {
        reservationId: this.paiementForm.get('reservationId')?.value,
        montant: this.reservationSelectionnee.prixTotal,
        modePaiement: this.paiementForm.get('modePaiement')?.value,
        numeroRecu: this.paiementForm.get('numeroRecu')?.value || undefined,
        commentaire: this.paiementForm.get('commentaire')?.value || undefined
      };

      this.paiementService.enregistrerPaiementManuel(paiementData).subscribe({
        next: (paiement) => {
          this.loading = false;
          this.showSuccessModal = true;
          this.showPaiementForm = false;
          this.paiementForm.reset();
          this.modePaiementSelectionne = undefined;
          this.loadPaiements();
          
          // Fermer le modal de succès après 3 secondes
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
        },
        error: (err) => {
          this.loading = false;
          this.showError(err.error?.message || 'Erreur lors du paiement');
        }
      });
    }
  }

  voirDetailsPaiement(paiement: Paiement) {
    this.loading = true;
    this.reservationService.getBillet(paiement.reservationId).subscribe({
      next: (billet) => {
        this.billetDetails = billet;
        this.showBilletModal = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.showError('Impossible de charger les détails du billet');
      }
    });
  }

  closeBilletModal() {
    this.showBilletModal = false;
    this.billetDetails = undefined;
  }

telechargerBillet() {
  if (!this.billetDetails) return;
  const doc = new jsPDF();
  const billet = this.billetDetails;

  // Couleurs de marque
  const goldColor: [number, number, number] = [212, 175, 55]; // Or
  const darkColor: [number, number, number] = [31, 41, 55]; // Gris foncé

  // En-tête avec fond or
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  // Logo et titre
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('✈️ GOLDENFLY', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('BILLET ÉLECTRONIQUE', 105, 30, { align: 'center' });

  // Réinitialiser la couleur du texte
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

  // Numéro de réservation (grand et visible)
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Réservation: ${billet.numeroReservation}`, 20, 55);

  // Informations passager
  doc.setFillColor(245, 245, 245);
  doc.rect(15, 65, 180, 35, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PASSAGER', 20, 73);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`${billet.prenomPassager} ${billet.nomPassager}`, 20, 81);
  doc.text(`Email: ${billet.emailPassager}`, 20, 88);
  doc.text(`Téléphone: ${billet.telephonePassager}`, 20, 95);

  // Vol Aller
  let yPosition = 115;
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(15, yPosition - 5, 180, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('VOL ALLER', 20, yPosition);
  
  yPosition += 10;
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  // Départ - Arrivée (grand format)
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${billet.codeVilleDepartAller}`, 20, yPosition);
  doc.setFontSize(14);
  doc.text('→', 50, yPosition);
  doc.setFontSize(16);
  doc.text(`${billet.codeVilleArriveeAller}`, 65, yPosition);
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${billet.villeDepartAller} → ${billet.villeArriveeAller}`, 20, yPosition);
  
  yPosition += 10;
  doc.text(`Vol: ${billet.numeroVolAller}`, 20, yPosition);
  doc.text(`Date: ${this.formatDate(billet.dateDepartAller)}`, 80, yPosition);
  
  yPosition += 7;
  doc.text(`Départ: ${billet.heureDepartAller}`, 20, yPosition);
  doc.text(`Arrivée: ${billet.heureArriveeAller}`, 80, yPosition);
  doc.text(`Durée: ${billet.dureeVolAller}m`, 140, yPosition);

  // Vol Retour (si existe)
  if (billet.numeroVolRetour) {
    yPosition += 15;
    doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.rect(15, yPosition - 5, 180, 8, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('VOL RETOUR', 20, yPosition);
    
    yPosition += 10;
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${billet.codeVilleDepartRetour}`, 20, yPosition);
    doc.setFontSize(14);
    doc.text('→', 50, yPosition);
    doc.setFontSize(16);
    doc.text(`${billet.codeVilleArriveeRetour}`, 65, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${billet.villeDepartRetour} → ${billet.villeArriveeRetour}`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`Vol: ${billet.numeroVolRetour}`, 20, yPosition);
    doc.text(`Date: ${this.formatDate(billet.dateDepartRetour!)}`, 80, yPosition);
    
    yPosition += 7;
    doc.text(`Départ: ${billet.heureDepartRetour}`, 20, yPosition);
    doc.text(`Arrivée: ${billet.heureArriveeRetour}`, 80, yPosition);
    doc.text(`Durée: ${billet.dureeVolRetour}`, 140, yPosition);
  }

  // Informations complémentaires
  yPosition += 15;
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPosition - 5, 180, 30, 'F');
  
  doc.setFontSize(10);
  doc.text(`Classe: ${this.mapEnum(billet.classeVol)}`, 20, yPosition);
  doc.text(`Passagers: ${billet.nombrePassagers}`, 80, yPosition);
  doc.text(`Statut: ${this.mapEnum(billet.statut)}`, 140, yPosition);
  
  yPosition += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text(`TOTAL: ${billet.prixTotal.toLocaleString()} FCFA`, 20, yPosition + 8);

  // QR Code (si disponible)
  if (billet.qrCode) {
    try {
      doc.addImage(billet.qrCode, 'PNG', 160, yPosition + 15, 30, 30);
      doc.setFontSize(8);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text('Scan QR Code', 165, yPosition + 50, { align: 'center' });
    } catch (error) {
      // QR code non disponible
    }
  }

  // Pied de page
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('GoldenFly Airlines - Votre compagnie de confiance', 105, 280, { align: 'center' });
  doc.text('Support: support@goldenfly.com | Tél: +221 33 123 45 67', 105, 285, { align: 'center' });

  // Télécharger
  doc.save(`Billet-${billet.numeroReservation}.pdf`);
}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getModePaiementIcon(mode: ModePaiementEnum): string {
    // Retourne le chemin SVG approprié
    return mode;
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

  mapEnum(value: string): string {
    const mappings: Record<string, string> = {
      // Statuts
      'EN_ATTENTE': 'En attente',
      'PAYE': 'Payé',
      'ECHOUE': 'Échoué',
      'REMBOURSE': 'Remboursé',
      'CONFIRMEE': 'Confirmée',
      'ANNULEE': 'Annulée',
      'EMBARQUEE': 'Embarquée',
      
      // Classes
      'ECONOMIQUE': 'Économique',
      'PREMIUM': 'Premium',
      'AFFAIRES': 'Affaires',
      
      // Modes de paiement
      'WAVE': 'Wave',
      'ORANGE_MONEY': 'Orange Money',
      'ESPECES': 'Espèces',
      'CARTE_BANCAIRE': 'Carte bancaire',
      
      // Types de réservation
      'ALLER': 'Aller simple',
      'ALLER_RETOUR': 'Aller-retour'
    };
    
    return mappings[value] || value;
  }

  showError(message: string) {
    // Vous pouvez implémenter un service de notification ici
    alert(message);
  }

  togglePaiementForm() {
    this.showPaiementForm = !this.showPaiementForm;
    if (!this.showPaiementForm) {
      this.paiementForm.reset();
      this.modePaiementSelectionne = undefined;
      this.reservationSelectionnee = undefined;
    }
  }
}