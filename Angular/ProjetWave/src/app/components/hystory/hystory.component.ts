import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, CommonModule } from '@angular/common';
import { ApiBinderService } from '../../service/api-binder.service';

import { Router } from '@angular/router';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../service/auth.service';

interface Transaction {
  id: number;
  montant: number;
  status: string;
  date: string;
  solde_sender: number;
  solde_receiver: number;
  frais: number;
  type: string;
  senderId: number;
  receiverId: number;
  receiverString: string | null;
}

interface TransactionResponse {
  success: boolean;
  data: Transaction[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe],
  templateUrl: 'hystory.component.html',
  styleUrl: 'hystory.component.css'
})
export class HistoryComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiBinderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.getAuthToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    this.error = null;

    const headers = {
      Authorization: `Bearer ${this.authService.getAuthToken()}`
    };

    this.apiService.apiFetch<TransactionResponse>('api/transfer/transactions')
      .pipe(
        catchError((error) => {
          console.error('Erreur détaillée:', error);
          if (error.status === 401) {
            this.authService.logout();
            return throwError(() => new Error('Session expirée. Reconnectez-vous.'));
          }
          return throwError(() => new Error('Impossible de charger les transactions'));
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.transactions = response.data;
            console.log('Transactions chargées:', this.transactions);
          } else {
            this.error = 'Erreur lors du chargement des transactions';
            console.error('Réponse invalide:', response);
          }
        },
        error: (error) => {
          this.error = error.message;
          console.error('Erreur de chargement:', error);
        }
      });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  }

  getTransactionTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'transfert': 'Transfert',
      'depot': 'Dépôt',
      'retrait': 'Retrait',
      'paiement': 'Paiement',
      'achat_credit': 'Achat de crédit'
    };
    return types[type] || type;
  }
}