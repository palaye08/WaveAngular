import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiBinderService } from '../../service/api-binder.service';

interface Contact {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  userId: number;
}

interface CreditRequest {
  userId: number;
  operateur: string;
  telephone: string;
  montant: number;
}

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: 'credit.component.html',
  styleUrl: 'credit.component.css'
})
export class CreditComponent implements OnInit {
  // ... rest of the component code remains the same

  contacts: Contact[] = [];
  showDialog = false;
  selectedContact: Contact | null = null;
  creditAmount: number = 0;

  constructor(
    private router: Router,
    private apiBinderService: ApiBinderService
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  async loadContacts() {
    try {
      this.apiBinderService.apiFetch<any>('user/contacts/user/1').subscribe({
        next: (response) => {
          if (response.success) {
            this.contacts = response.data.contacts;
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement des contacts:', error);
        }
      });
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  }

  getOperatorName(phone: string): string {
    if (!phone) return '';
    const prefix = phone.substring(0, 2);
    switch (prefix) {
      case '77':
      case '78':
        return 'Orange';
      case '76':
        return 'Free';
      case '70':
        return 'Expresso';
      default:
        return '';
    }
  }

  getOperatorColor(phone: string): string {
    const operator = this.getOperatorName(phone);
    switch (operator) {
      case 'Orange':
        return '#FF7900';
      case 'Free':
        return '#CD0067';
      case 'Expresso':
        return '#00A0DF';
      default:
        return '#5957D4';
    }
  }

  getOperatorSlug(phone: string): string {
    return this.getOperatorName(phone).toLowerCase();
  }

  formatPhoneNumber(number: string): string {
    if (!number) return '';
    return number.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }

  showCreditDialog(contact: Contact) {
    this.selectedContact = contact;
    this.showDialog = true;
    this.creditAmount = 0;
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedContact = null;
    this.creditAmount = 0;
  }

  isValidAmount(): boolean {
    return this.creditAmount >= 500;
  }

  purchaseCredit() {
    if (!this.selectedContact || !this.isValidAmount()) return;

    const request: CreditRequest = {
      userId: 1, // À remplacer par l'ID de l'utilisateur connecté
      operateur: this.getOperatorSlug(this.selectedContact.telephone),
      telephone: this.selectedContact.telephone,
      montant: this.creditAmount
    };

    this.apiBinderService.apiSave<any>('v1/credit/purchase', request).subscribe({
      next: (response) => {
        console.log('Crédit acheté avec succès:', response);
        this.closeDialog();
        // Ajouter une notification de succès ici
      },
      error: (error) => {
        console.error('Erreur lors de l\'achat du crédit:', error);
        // Ajouter une notification d'erreur ici
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  showNewNumberDialog() {
    // À implémenter pour l'achat de crédit pour un nouveau numéro
    console.log('Nouveau numéro');
  }
}