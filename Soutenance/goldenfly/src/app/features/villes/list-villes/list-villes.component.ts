import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VilleService } from '../../../core/services/ville.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Ville } from '../../../core/models/ville.model';

@Component({
  selector: 'app-list-villes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './list-villes.component.html',
  styleUrls: ['./list-villes.component.css']
})
export class ListVillesComponent implements OnInit {
  private villeService = inject(VilleService);
  private fb = inject(FormBuilder);

  villes: Ville[] = [];
  filteredVilles: Ville[] = [];
  paginatedVilles: Ville[] = [];
  
  loading = false;
  showModal = false;
  showDeleteModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  
  editMode = false;
  selectedVilleId?: number;
  selectedVille?: Ville;
  modalMessage = '';
  
  villeForm!: FormGroup;
  searchTerm = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 0;
  pages: number[] = [];

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
        this.updatePagination();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredVilles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedVilles();
  }

  updatePaginatedVilles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVilles = this.filteredVilles.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedVilles();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedVilles();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedVilles();
    }
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

  openDeleteModal(ville: Ville) {
    this.selectedVille = ville;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedVille = undefined;
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
          this.modalMessage = this.editMode ? 'Ville modifiée avec succès !' : 'Ville créée avec succès !';
          this.showSuccessModal = true;
          
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
        },
        error: (err) => {
          this.loading = false;
          this.modalMessage = err.error?.message || 'Erreur lors de l\'opération';
          this.showErrorModal = true;
        }
      });
    }
  }

  deleteVille() {
    if (!this.selectedVille) return;

    this.loading = true;
    this.villeService.deleteVille(this.selectedVille.id).subscribe({
      next: () => {
        this.loading = false;
        this.closeDeleteModal();
        this.modalMessage = `Ville ${this.selectedVille?.nom} supprimée avec succès !`;
        this.showSuccessModal = true;
        this.loadVilles();
        
        setTimeout(() => {
          this.showSuccessModal = false;
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.closeDeleteModal();
        this.modalMessage = err.error?.message || 'Erreur lors de la suppression';
        this.showErrorModal = true;
      }
    });
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
    this.currentPage = 1;
    this.updatePagination();
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