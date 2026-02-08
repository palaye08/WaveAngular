import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Utilisateur, ProfileEnum } from '../../../core/models/utilisateur.model';
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
  showModal = false;
  editMode = false;
  selectedUserId?: number;
  
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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
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
      error: () => this.loading = false
    });
  }

  openModal(user?: Utilisateur) {
    this.showModal = true;
    if (user) {
      this.editMode = true;
      this.selectedUserId = user.id;
      this.userForm.patchValue(user);
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.editMode = false;
      this.selectedUserId = undefined;
      this.userForm.reset({ profile: ProfileEnum.VOYAGEUR });
    }
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const formData = { ...this.userForm.value };
      
      if (this.editMode && !formData.password) {
        delete formData.password;
      }

      const request = this.editMode && this.selectedUserId
        ? this.utilisateurService.updateUtilisateur(this.selectedUserId, formData)
        : this.utilisateurService.createUtilisateur(formData);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.loadUtilisateurs();
          alert(this.editMode ? 'Utilisateur modifié !' : 'Utilisateur créé !');
        },
        error: (err) => {
          this.loading = false;
          alert('Erreur: ' + (err.error?.message || 'Opération échouée'));
        }
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          alert('Utilisateur supprimé !');
          this.loadUtilisateurs();
        },
        error: (err) => alert('Erreur: ' + err.error?.message)
      });
    }
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
        u.email.toLowerCase().includes(term)
      );
    }

    this.filteredUtilisateurs = filtered;
  }

  getProfileClass(profile: ProfileEnum): string {
    return profile === ProfileEnum.ADMIN 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-blue-100 text-blue-700';
  }
}

// le html 
