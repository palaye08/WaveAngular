import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiBinderService } from '../../service/api-binder.service';
import { firstValueFrom } from 'rxjs';

// Interface pour un utilisateur individuel
interface User {
  id: number;
  nom: string;
  prenom: string;
  photo: string;
  identifiant: string;
  telephone: string;
}

// Interface pour la réponse de l'API
interface ApiResponse {
  users: User[];
}

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css'
})
export class PaiementComponent implements OnInit {
  societes: User[] = [];
  filteredSocietes: User[] = [];
  searchTerm: string = '';
  showDialog: boolean = false;
  selectedSociete: User | null = null;
  montant: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiBinderService: ApiBinderService) {}

  ngOnInit() {
    this.loadSocietes();
  }

  async loadSocietes() {
    try {
      const response = await firstValueFrom(
        this.apiBinderService.apiFetch<ApiResponse>('user/societe/list')
      );
      this.societes = response.users;
      this.filteredSocietes = response.users;
    } catch (error) {
      console.error('Erreur lors du chargement des sociétés:', error);
      this.errorMessage = 'Erreur lors du chargement des sociétés';
    }
  }

  filterSocietes() {
    this.filteredSocietes = this.societes.filter(user => 
      user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      user.identifiant.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openPaiementDialog(user: User) {
    this.selectedSociete = user;
    this.montant = 0;
    this.showDialog = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedSociete = null;
    this.montant = 0;
  }

  async effectuerPaiement() {
    if (!this.selectedSociete || !this.montant || this.montant <= 0) {
      this.errorMessage = 'Veuillez saisir un montant valide';
      return;
    }

    try {
      this.isLoading = true;
      this.errorMessage = '';

      const request = {
        receiverId: this.selectedSociete.id,
        montant: this.montant
      };

      await firstValueFrom(
        this.apiBinderService.apiSave<any>('paiement/service', request)
      );

      this.successMessage = `Paiement de ${this.montant} effectué avec succès à ${this.selectedSociete.nom}`;
      
      setTimeout(() => {
        this.closeDialog();
        this.successMessage = '';
      }, 2000);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      this.errorMessage = 'Erreur lors du paiement. Veuillez réessayer.';
    } finally {
      this.isLoading = false;
    }
  }
}