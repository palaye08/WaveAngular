import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VilleService } from '../../../core/services/ville.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Ville } from '../../../core/models/ville.model';

@Component({
  selector: 'app-list-villes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,SidebarComponent],
  templateUrl: './list-villes.component.html'
})
export class ListVillesComponent implements OnInit {
  private villeService = inject(VilleService);
  private fb = inject(FormBuilder);

  villes: Ville[] = [];
  filteredVilles: Ville[] = [];
  loading = false;
  showModal = false;
  editMode = false;
  selectedVilleId?: number;
  
  villeForm!: FormGroup;
  searchTerm = '';

  ngOnInit() {
    this.initForm();
    this.loadVilles();
  }

  initForm() {
    this.villeForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      nomAeroport: ['', Validators.required],
      pays: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });
  }

  loadVilles() {
    this.loading = true;
    this.villeService.getVilles().subscribe({
      next: (villes) => {
        this.villes = villes;
        this.filteredVilles = villes;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openModal(ville?: Ville) {
    this.showModal = true;
    if (ville) {
      this.editMode = true;
      this.selectedVilleId = ville.id;
      this.villeForm.patchValue(ville);
    } else {
      this.editMode = false;
      this.selectedVilleId = undefined;
      this.villeForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.villeForm.reset();
  }

  onSubmit() {
    if (this.villeForm.valid) {
      this.loading = true;
      const formData = { ...this.villeForm.value };
      formData.code = formData.code.toUpperCase();

      const request = this.editMode && this.selectedVilleId
        ? this.villeService.updateVille(this.selectedVilleId, formData)
        : this.villeService.createVille(formData);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.loadVilles();
          alert(this.editMode ? 'Ville modifiée !' : 'Ville créée !');
        },
        error: (err) => {
          this.loading = false;
          alert('Erreur: ' + (err.error?.message || 'Opération échouée'));
        }
      });
    }
  }

  deleteVille(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette ville ?')) {
      this.villeService.deleteVille(id).subscribe({
        next: () => {
          alert('Ville supprimée !');
          this.loadVilles();
        },
        error: (err) => alert('Erreur: ' + err.error?.message)
      });
    }
  }

  filterVilles() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredVilles = this.villes.filter(v => 
        v.nom.toLowerCase().includes(term) ||
        v.code.toLowerCase().includes(term) ||
        v.pays.toLowerCase().includes(term)
      );
    } else {
      this.filteredVilles = this.villes;
    }
  }
}