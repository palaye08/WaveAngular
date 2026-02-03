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
  templateUrl: './list-vols.component.html'
})
export class ListVolsComponent implements OnInit {
  private volService = inject(VolService);
  private villeService = inject(VilleService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  vols: Vol[] = [];
  villes: Ville[] = [];
  searchForm!: FormGroup;
  loading = false;
  isAdmin = false;

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
        this.loading = false;
      },
      error: () => this.loading = false
    });
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
}