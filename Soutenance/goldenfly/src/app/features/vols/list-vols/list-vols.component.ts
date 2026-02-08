import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VolService } from '../../../core/services/vol.service';
import { VilleService } from '../../../core/services/ville.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Vol } from '../../../core/models/vol.model';
import { Ville } from '../../../core/models/ville.model';
import { TypeReservationEnum } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-list-vols',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './list-vols.component.html',
  styleUrls: ['./list-vols.component.css']
})
export class ListVolsComponent implements OnInit {
  private volService = inject(VolService);
  private villeService = inject(VilleService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  vols: Vol[] = [];
  paginatedVols: Vol[] = [];
  villes: Ville[] = [];
  searchForm!: FormGroup;
  loading = false;
  isAdmin = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  pages: number[] = [];

  // Modals
  showDeleteModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  modalMessage = '';
  selectedVolId?: number;
  selectedVolNumero?: string;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.initSearchForm();
    this.loadVilles();
    this.loadVols();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      villeDepartId: [''],
      villeArriveeId: [''],
      dateDepart: [''],
      nombrePassagers: [1]
    });
  }

  loadVilles() {
    this.villeService.getVillesActives().subscribe({
      next: (villes) => this.villes = villes
    });
  }

  loadVols() {
    this.loading = true;
    this.volService.getVols().subscribe({
      next: (vols) => {
        this.vols = vols;
        this.updatePagination();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.vols.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedVols();
  }

  updatePaginatedVols() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVols = this.vols.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedVols();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedVols();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedVols();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  rechercher() {
    this.loading = true;
    const searchCriteria = {
      ...this.searchForm.value,
      typeReservation: TypeReservationEnum.ALLER
    };

    this.volService.rechercherVols(searchCriteria).subscribe({
      next: (vols) => {
        this.vols = vols;
        this.currentPage = 1;
        this.updatePagination();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  resetSearch() {
    this.searchForm.reset({ nombrePassagers: 1 });
    this.loadVols();
  }

  reserver(vol: Vol) {
    this.router.navigate(['/reservations/create', vol.id]);
  }

  creerVol() {
    this.router.navigate(['/vols/create']);
  }

  openDeleteModal(vol: Vol) {
    this.selectedVolId = vol.id;
    this.selectedVolNumero = vol.numeroVol;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedVolId = undefined;
    this.selectedVolNumero = undefined;
  }

  deleteVol() {
    if (!this.selectedVolId) return;

    this.loading = true;
    this.volService.deleteVol(this.selectedVolId).subscribe({
      next: () => {
        this.loading = false;
        this.closeDeleteModal();
        this.modalMessage = `Vol ${this.selectedVolNumero} supprimé avec succès !`;
        this.showSuccessModal = true;
        this.loadVols();

        setTimeout(() => {
          this.showSuccessModal = false;
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.closeDeleteModal();
        this.modalMessage = err.error?.message || 'Erreur lors de la suppression du vol';
        this.showErrorModal = true;
      }
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.modalMessage = '';
  }

  closeErrorModal() {
    this.showErrorModal = false;
    this.modalMessage = '';
  }

  hasReservations(vol: Vol): boolean {
    return (vol as any).hasReservations || false;
  }
}