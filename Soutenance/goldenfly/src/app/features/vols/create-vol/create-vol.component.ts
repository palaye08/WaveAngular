import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VolService } from '../../../core/services/vol.service';
import { VilleService } from '../../../core/services/ville.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Ville } from '../../../core/models/ville.model';

@Component({
  selector: 'app-create-vol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,SidebarComponent],
  templateUrl: './create-vol.component.html'
})
export class CreateVolComponent implements OnInit {
  private fb = inject(FormBuilder);
  private volService = inject(VolService);
  private villeService = inject(VilleService);
  public router = inject(Router);

  volForm!: FormGroup;
  villes: Ville[] = [];
  loading = false;
  jours = [
    { name: 'Lundi', key: 'lundi' },
    { name: 'Mardi', key: 'mardi' },
    { name: 'Mercredi', key: 'mercredi' },
    { name: 'Jeudi', key: 'jeudi' },
    { name: 'Vendredi', key: 'vendredi' },
    { name: 'Samedi', key: 'samedi' },
    { name: 'Dimanche', key: 'dimanche' }
  ];

  ngOnInit() {
    this.initForm();
    this.loadVilles();
  }

  initForm() {
    this.volForm = this.fb.group({
      numeroVol: ['', Validators.required],
      nom: ['', Validators.required],
      villeDepartId: ['', Validators.required],
      villeArriveeId: ['', Validators.required],
      heureDepart: ['', Validators.required],
      heureArrivee: ['', Validators.required],
      dureeVol: ['', [Validators.required, Validators.min(1)]],
      nombreSieges: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      prixBase: ['', [Validators.required, Validators.min(1)]],
      distance: ['', [Validators.required, Validators.min(1)]],
      lundi: [false],
      mardi: [false],
      mercredi: [false],
      jeudi: [false],
      vendredi: [false],
      samedi: [false],
      dimanche: [false]
    });
  }

  loadVilles() {
    this.villeService.getVillesActives().subscribe({
      next: (villes) => this.villes = villes
    });
  }

  onSubmit() {
    if (this.volForm.valid) {
      // Vérifier qu'au moins un jour est sélectionné
      const joursSelectionnes = this.jours.some(j => this.volForm.get(j.key)?.value);
      if (!joursSelectionnes) {
        alert('Veuillez sélectionner au moins un jour de disponibilité');
        return;
      }

      this.loading = true;
      this.volService.createVol(this.volForm.value).subscribe({
        next: () => {
          this.loading = false;
          alert('Vol créé avec succès !');
          this.router.navigate(['/vols']);
        },
        error: (err) => {
          this.loading = false;
          alert('Erreur: ' + (err.error?.message || 'Création échouée'));
        }
      });
    }
  }

  calculerDuree() {
    const heureDepart = this.volForm.get('heureDepart')?.value;
    const heureArrivee = this.volForm.get('heureArrivee')?.value;

    if (heureDepart && heureArrivee) {
      const [hD, mD] = heureDepart.split(':').map(Number);
      const [hA, mA] = heureArrivee.split(':').map(Number);
      
      let duree = (hA * 60 + mA) - (hD * 60 + mD);
      if (duree < 0) duree += 24 * 60; // Si l'arrivée est le lendemain
      
      this.volForm.patchValue({ dureeVol: duree });
    }
  }
}