import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  template: `
    <div class="flex">
      <app-sidebar></app-sidebar>
      
      <div class="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Mon Compte</h1>
          
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <form [formGroup]="compteForm" (ngSubmit)="onSubmit()">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Nom</label>
                  <input type="text" formControlName="nom"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Prénom</label>
                  <input type="text" formControlName="prenom"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Email</label>
                  <input type="email" formControlName="email"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Téléphone</label>
                  <input type="tel" formControlName="telephone"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Âge</label>
                  <input type="number" formControlName="age"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Nouveau mot de passe</label>
                  <input type="password" formControlName="password"
                    placeholder="Laisser vide pour ne pas changer"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none">
                </div>
              </div>

              <div *ngIf="successMessage" 
                class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                ✓ {{ successMessage }}
              </div>

              <button type="submit" [disabled]="compteForm.invalid || loading"
                class="mt-6 btn-gold disabled:opacity-50">
                <span *ngIf="!loading">Enregistrer les modifications</span>
                <span *ngIf="loading">Enregistrement...</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CompteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private utilisateurService = inject(UtilisateurService);

  compteForm!: FormGroup;
  loading = false;
  successMessage = '';
  currentUserId: number | null = null;

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.initForm();
    this.loadUserData();
  }

  initForm() {
    this.compteForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      password: [''],
      profile: ['VOYAGEUR']
    });
  }

  loadUserData() {
    if (this.currentUserId) {
      this.utilisateurService.getUtilisateurById(this.currentUserId).subscribe({
        next: (user) => {
          this.compteForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            age: user.age,
            profile: user.profile
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.compteForm.valid && this.currentUserId) {
      this.loading = true;
      const formData = { ...this.compteForm.value };
      
      // Supprimer le mot de passe s'il est vide
      if (!formData.password) {
        delete formData.password;
      }

      this.utilisateurService.updateUtilisateur(this.currentUserId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Informations mises à jour avec succès !';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.loading = false;
          alert('Erreur: ' + (error.error?.message || 'Échec de la mise à jour'));
        }
      });
    }
  }
}