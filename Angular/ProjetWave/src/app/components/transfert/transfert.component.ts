import { ApiBinderService } from '../../service/api-binder.service';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../service/toast.service';
import { ToastComponent } from '../toast/toast.component';

interface User {
  id: number;
  nom: string;
  prenom: string;
  photo: string;
  identifiant: string;
  telephone: string;
}

interface TransferRequest {
  receiverId: number;
  montant: number;
}

interface TransferDetails {
  montantEnvoye: number;
  frais: number;
  montantRecu: number;
}

interface TransferTransaction {
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

interface TransferResponse {
  message: string;
  transaction: TransferTransaction;
  receiver: User & {
    mail: string;
    codeSecret: string;
    solde: number;
    plafond: number;
    type: string;
    type_societe: string | null;
  };
  details: TransferDetails;
}

interface UserResponse {
  users: User[];
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastComponent
  ]
})
export class TransferComponent implements OnInit {
  users: User[] = [];
  activeTab: 'favoris' | 'contacts' = 'favoris';
  showModal = false;
  selectedUser: User | null = null;
  montant: number | null = null;
  
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private apiService: ApiBinderService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.apiFetch<UserResponse>('user/list')
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          this.users = response.users;
        },
        error: (error) => {
          this.errorMessage = 'Impossible de charger la liste des utilisateurs. Veuillez réessayer.';
          console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
      });
  }

  setActiveTab(tab: 'favoris' | 'contacts') {
    this.activeTab = tab;
  }

  openTransferModal(user: User) {
    this.selectedUser = user;
    this.showModal = true;
    this.errorMessage = null;
    this.successMessage = null;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.montant = null;
    this.errorMessage = null;
    this.successMessage = null;
  }

  sendTransfer() {
    if (!this.selectedUser) {
      this.toastService.showError('Veuillez sélectionner un destinataire.');
      return;
    }
    if (!this.montant || this.montant <= 0) {
      this.toastService.showError('Veuillez saisir un montant valide.');
      return;
    }

    this.isLoading = true;
    const transferData: TransferRequest = {
      receiverId: this.selectedUser.id,
      montant: this.montant
    };

    this.apiService.apiSave<TransferResponse>('api/transfer/send', transferData)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.message === 'Success') {
            const transferDetails = `
              Transfert vers ${response.receiver.prenom} ${response.receiver.nom}
              Montant envoyé: ${this.formatMontant(response.details.montantEnvoye)}
              Frais: ${this.formatMontant(response.details.frais)}
              Montant reçu: ${this.formatMontant(response.details.montantRecu)}
              Nouveau solde: ${this.formatMontant(response.transaction.solde_sender)}`;
            
            this.toastService.showSuccess(transferDetails);
            this.closeModal();
          } else {
            this.toastService.showError('Le transfert n\'a pas pu être effectué. Veuillez réessayer.');
          }
        },
        error: (error) => {
          console.error('Erreur détaillée:', error);
          this.toastService.showError('Une erreur est survenue lors du transfert. Veuillez réessayer.');
        }
      });
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'XOF' 
    }).format(montant);
  }
}