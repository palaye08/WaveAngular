import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { UpdateMeRequest } from '../../core/models/utilisateur.model';

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
                  <label class="block text-gray-700 font-semibold mb-2">Nom *</label>
                  <input type="text" formControlName="nom"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('nom')?.invalid && compteForm.get('nom')?.touched">
                  <p *ngIf="compteForm.get('nom')?.invalid && compteForm.get('nom')?.touched" class="text-red-500 text-xs mt-1">
                    Nom requis
                  </p>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Prénom *</label>
                  <input type="text" formControlName="prenom"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('prenom')?.invalid && compteForm.get('prenom')?.touched">
                  <p *ngIf="compteForm.get('prenom')?.invalid && compteForm.get('prenom')?.touched" class="text-red-500 text-xs mt-1">
                    Prénom requis
                  </p>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input type="email" formControlName="email"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('email')?.invalid && compteForm.get('email')?.touched">
                  <p *ngIf="compteForm.get('email')?.invalid && compteForm.get('email')?.touched" class="text-red-500 text-xs mt-1">
                    Email valide requis
                  </p>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Téléphone *</label>
                  <input type="tel" formControlName="telephone"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('telephone')?.invalid && compteForm.get('telephone')?.touched">
                  <p *ngIf="compteForm.get('telephone')?.invalid && compteForm.get('telephone')?.touched" class="text-red-500 text-xs mt-1">
                    Téléphone requis
                  </p>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Âge *</label>
                  <input type="number" formControlName="age"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('age')?.invalid && compteForm.get('age')?.touched">
                  <p *ngIf="compteForm.get('age')?.invalid && compteForm.get('age')?.touched" class="text-red-500 text-xs mt-1">
                    Âge requis (min. 18)
                  </p>
                </div>

                <div class="md:col-span-2">
                  <h3 class="text-lg font-bold text-gray-900 mb-4 mt-4">Changer le mot de passe</h3>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Nouveau mot de passe</label>
                  <input type="password" formControlName="nouveauMotDePasse"
                    placeholder="Laisser vide pour ne pas changer"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.get('nouveauMotDePasse')?.invalid && compteForm.get('nouveauMotDePasse')?.touched">
                  <p *ngIf="compteForm.get('nouveauMotDePasse')?.invalid && compteForm.get('nouveauMotDePasse')?.touched" class="text-red-500 text-xs mt-1">
                    Min. 6 caractères
                  </p>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe</label>
                  <input type="password" formControlName="confirmationMotDePasse"
                    placeholder="Laisser vide pour ne pas changer"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                    [class.border-red-500]="compteForm.hasError('passwordMismatch') && compteForm.get('confirmationMotDePasse')?.touched">
                  <p *ngIf="compteForm.hasError('passwordMismatch') && compteForm.get('confirmationMotDePasse')?.touched" class="text-red-500 text-xs mt-1">
                    Les mots de passe ne correspondent pas
                  </p>
                </div>
              </div>

              <div *ngIf="successMessage" 
                class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                ✓ {{ successMessage }}
              </div>

              <div *ngIf="errorMessage" 
                class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                ✗ {{ errorMessage }}
              </div>

              <button type="submit" [disabled]="compteForm.invalid || loading"
                class="mt-6 btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
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
  private utilisateurService = inject(UtilisateurService);

  compteForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
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
      nouveauMotDePasse: ['', Validators.minLength(6)],
      confirmationMotDePasse: ['']
    }, { validators: this.passwordMatchValidator });
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('nouveauMotDePasse')?.value;
    const confirm = group.get('confirmationMotDePasse')?.value;
    
    // Si les deux champs sont vides, pas d'erreur
    if (!password && !confirm) {
      return null;
    }
    
    // Si un seul est rempli ou s'ils ne correspondent pas
    return password === confirm ? null : { passwordMismatch: true };
  }

  loadUserData() {
    this.loading = true;
    this.utilisateurService.getMe().subscribe({
      next: (user) => {
        this.compteForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          age: user.age
        });
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement des données';
      }
    });
  }

  onSubmit() {
    if (this.compteForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      const formData: UpdateMeRequest = {
        nom: this.compteForm.value.nom,
        prenom: this.compteForm.value.prenom,
        email: this.compteForm.value.email,
        telephone: this.compteForm.value.telephone,
        age: this.compteForm.value.age
      };
      
      // Ajouter les mots de passe seulement s'ils sont renseignés
      if (this.compteForm.value.nouveauMotDePasse && this.compteForm.value.nouveauMotDePasse.trim() !== '') {
        formData.nouveauMotDePasse = this.compteForm.value.nouveauMotDePasse;
        formData.confirmationMotDePasse = this.compteForm.value.confirmationMotDePasse;
      }

      this.utilisateurService.updateMe(formData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Informations mises à jour avec succès !';
          // Réinitialiser les champs de mot de passe
          this.compteForm.patchValue({
            nouveauMotDePasse: '',
            confirmationMotDePasse: ''
          });
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Échec de la mise à jour';
          setTimeout(() => this.errorMessage = '', 5000);
        }
      });
    }
  }
}