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
  templateUrl: './list-reservations.component.html'
})
export class ListReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  reservations: Reservation[] = [];
  loading = false;
  isAdmin = false;

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

  confirmer(id: number) {
    if (confirm('Confirmer cette réservation ?')) {
      this.reservationService.confirmerReservation(id).subscribe({
        next: () => {
          alert('Réservation confirmée avec succès !');
          this.loadReservations();
        },
        error: (err) => alert('Erreur: ' + err.error?.message)
      });
    }
  }

  annuler(id: number) {
    if (confirm('Annuler cette réservation ?')) {
      this.reservationService.annulerReservation(id).subscribe({
        next: () => {
          alert('Réservation annulée avec succès !');
          this.loadReservations();
        },
        error: (err) => alert('Erreur: ' + err.error?.message)
      });
    }
  }

  telechargerBillet(id: number) {
    this.reservationService.getBillet(id).subscribe({
      next: (billet) => {
        // Implémenter le téléchargement PDF ici
        console.log('Billet:', billet);
        alert('Fonctionnalité de téléchargement à venir');
      }
    });
  }

  payer(reservationId: number) {
    this.router.navigate(['/paiements'], {
      queryParams: { reservationId }
    });
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