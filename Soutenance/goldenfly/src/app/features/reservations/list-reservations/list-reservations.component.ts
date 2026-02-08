import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  reservations: Reservation[] = [];
  loading = false;
  isAdmin = false;

  // Modals
  showConfirmModal = false;
  showCancelModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  
  modalMessage = '';
  selectedReservationId?: number;
  actionType: 'confirm' | 'cancel' | '' = '';

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    
    if (this.isAdmin) {
      this.reservationService.getReservations().subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    } else {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.reservationService.getReservationsByUtilisateur(userId).subscribe({
          next: (reservations) => {
            this.reservations = reservations;
            this.loading = false;
          },
          error: () => this.loading = false
        });
      }
    }
  }

  openConfirmModal(id: number) {
    this.selectedReservationId = id;
    this.actionType = 'confirm';
    this.showConfirmModal = true;
  }

  openCancelModal(id: number) {
    this.selectedReservationId = id;
    this.actionType = 'cancel';
    this.showCancelModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedReservationId = undefined;
    this.actionType = '';
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedReservationId = undefined;
    this.actionType = '';
  }

  confirmer() {
    if (!this.selectedReservationId) return;
    
    this.loading = true;
    this.reservationService.confirmerReservation(this.selectedReservationId).subscribe({
      next: () => {
        this.loading = false;
        this.closeConfirmModal();
        this.modalMessage = 'Réservation confirmée avec succès !';
        this.showSuccessModal = true;
        this.loadReservations();
        
        setTimeout(() => {
          this.showSuccessModal = false;
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.closeConfirmModal();
        this.modalMessage = err.error?.message || 'Erreur lors de la confirmation';
        this.showErrorModal = true;
      }
    });
  }

  annuler() {
    if (!this.selectedReservationId) return;
    
    this.loading = true;
    this.reservationService.annulerReservation(this.selectedReservationId).subscribe({
      next: () => {
        this.loading = false;
        this.closeCancelModal();
        this.modalMessage = 'Réservation annulée avec succès !';
        this.showSuccessModal = true;
        this.loadReservations();
        
        setTimeout(() => {
          this.showSuccessModal = false;
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.closeCancelModal();
        this.modalMessage = err.error?.message || 'Erreur lors de l\'annulation';
        this.showErrorModal = true;
      }
    });
  }

   telechargerBillet(id: number) {
    this.reservationService.getBillet(id).subscribe({
      next: (billet) => {
        // La logique de téléchargement sera implémentée ailleurs
        console.log('Billet:', billet);
      }
    });
  }

  payer(reservationId: number) {
    this.router.navigate(['/paiements'], {
      queryParams: { reservationId }
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.modalMessage = '';
  }

  closeErrorModal() {
    this.showErrorModal = false;
    this.modalMessage = '';
  }

  getStatutClass(statut: string): string {
    const classes: Record<string, string> = {
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-700',
      'CONFIRMEE': 'bg-green-100 text-green-700',
      'ANNULEE': 'bg-red-100 text-red-700',
      'EMBARQUEE': 'bg-blue-100 text-blue-700'
    };
    return classes[statut] || 'bg-gray-100 text-gray-700';
  }
}