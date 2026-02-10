import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Utilisateur, ProfileEnum, CreateUtilisateur, UpdateUtilisateur } from '../../../core/models/utilisateur.model';

@Component({
  selector: 'app-list-utilisateurs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './list-utilisateurs.component.html'
})
export class ListUtilisateursComponent implements OnInit {
  private utilisateurService = inject(UtilisateurService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  loading = false;
  
  // Modals
  showModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  showToggleModal = false;
  
  editMode = false;
  selectedUserId?: number;
  selectedUser?: Utilisateur;
  modalMessage = '';
  
  userForm!: FormGroup;
  searchTerm = '';
  filterProfile: string = 'ALL';
  profiles = Object.values(ProfileEnum);

  ngOnInit() {
    this.initForm();
    this.loadUtilisateurs();
  }

  initForm() {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{9,15}$')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      profile: [ProfileEnum.VOYAGEUR, Validators.required]
    });
  }

  loadUtilisateurs() {
    this.loading = true;
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (users) => {
        this.utilisateurs = users;
        this.filteredUtilisateurs = users;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.showError('Erreur lors du chargement des utilisateurs');
      }
    });
  }

  openModal(user?: Utilisateur) {
    this.showModal = true;
    if (user) {
      this.editMode = true;
      this.selectedUserId = user.id;
      this.userForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        age: user.age,
        profile: user.profile
      });
      // En mode édition, le mot de passe est optionnel
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.editMode = false;
      this.selectedUserId = undefined;
      this.userForm.reset({ profile: ProfileEnum.VOYAGEUR });
      // En mode création, le mot de passe est requis
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      
      // Préparer les données selon le modèle CreateUtilisateur
      const formData: any = {
        nom: this.userForm.value.nom,
        prenom: this.userForm.value.prenom,
        email: this.userForm.value.email,
        telephone: this.userForm.value.telephone,
        age: this.userForm.value.age,
        profile: this.userForm.value.profile
      };

      // Ajouter le mot de passe seulement s'il est renseigné
      if (this.userForm.value.password && this.userForm.value.password.trim() !== '') {
        formData.password = this.userForm.value.password;
      }

      const request = this.editMode && this.selectedUserId
        ? this.utilisateurService.updateUtilisateur(this.selectedUserId, formData)
        : this.utilisateurService.createUtilisateur(formData as CreateUtilisateur);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.loadUtilisateurs();
          this.showSuccess(this.editMode ? 'Utilisateur modifié avec succès !' : 'Utilisateur créé avec succès !');
        },
        error: (err) => {
          this.loading = false;
          this.showError(err.error?.message || 'Une erreur est survenue lors de l\'opération');
        }
      });
    }
  }
// Désactiver définitivement un utilisateur
deactivateUser() {
  if (!this.selectedUser) return;

  this.loading = true;

  const updateData: UpdateUtilisateur = { 
    actif: false
  };

  this.utilisateurService.updateUtilisateur(this.selectedUser.id, updateData).subscribe({
    next: () => {
      this.loading = false;
      this.closeToggleModal();
      this.loadUtilisateurs();
      this.showSuccess('Utilisateur désactivé avec succès !');
    },
    error: (err) => {
      this.loading = false;
      this.closeToggleModal();
      this.showError(err.error?.message || 'Erreur lors de la désactivation');
    }
  });
}
  // Ouvrir le modal de confirmation pour toggle status
  openToggleModal(user: Utilisateur) {
    this.selectedUser = user;
    this.showToggleModal = true;
  }

  closeToggleModal() {
    this.showToggleModal = false;
    this.selectedUser = undefined;
  }

  // Toggle le statut actif/inactif
toggleUserStatus() {
  if (!this.selectedUser) return;

  this.loading = true;
  const newStatus = !this.selectedUser.actif;

  const updateData: UpdateUtilisateur = { 
    actif: newStatus
  };

  this.utilisateurService.updateUtilisateur(this.selectedUser.id, updateData).subscribe({
    next: () => {
      this.loading = false;
      this.closeToggleModal();
      this.loadUtilisateurs();
      this.showSuccess(`Utilisateur ${newStatus ? 'activé' : 'désactivé'} avec succès !`);
    },
    error: (err) => {
      this.loading = false;
      this.closeToggleModal();
      this.showError(err.error?.message || 'Erreur lors du changement de statut');
    }
  });
}

  filterUsers() {
    let filtered = this.utilisateurs;

    // Filtre par profil
    if (this.filterProfile !== 'ALL') {
      filtered = filtered.filter(u => u.profile === this.filterProfile);
    }

    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u => 
        u.nom.toLowerCase().includes(term) ||
        u.prenom.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.telephone.toLowerCase().includes(term)
      );
    }

    this.filteredUtilisateurs = filtered;
  }

  getProfileClass(profile: ProfileEnum): string {
    return profile === ProfileEnum.ADMIN 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-blue-100 text-blue-700';
  }

  // Modals helpers
  showSuccess(message: string) {
    this.modalMessage = message;
    this.showSuccessModal = true;
  }

  showError(message: string) {
    this.modalMessage = message;
    this.showErrorModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.modalMessage = '';
  }

  closeErrorModal() {
    this.showErrorModal = false;
    this.modalMessage = '';
  }
}