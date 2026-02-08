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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './create-vol.component.html',
  styleUrls: ['./create-vol.component.css']
})
export class CreateVolComponent implements OnInit {
  private fb = inject(FormBuilder);
  private volService = inject(VolService);
  private villeService = inject(VilleService);
  public router = inject(Router);

  volForm!: FormGroup;
  villes: Ville[] = [];
  loading = false;
  
  // Modals
  showCancelModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  showValidationModal = false;
  modalMessage = '';
  
  jours = [
    { name: 'Lundi', key: 'lundi', icon: '📅' },
    { name: 'Mardi', key: 'mardi', icon: '📅' },
    { name: 'Mercredi', key: 'mercredi', icon: '📅' },
    { name: 'Jeudi', key: 'jeudi', icon: '📅' },
    { name: 'Vendredi', key: 'vendredi', icon: '📅' },
    { name: 'Samedi', key: 'samedi', icon: '📅' },
    { name: 'Dimanche', key: 'dimanche', icon: '📅' }
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
        this.modalMessage = 'Veuillez sélectionner au moins un jour de disponibilité';
        this.showValidationModal = true;
        return;
      }

      this.loading = true;
      this.volService.createVol(this.volForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.modalMessage = 'Vol créé avec succès !';
          this.showSuccessModal = true;
          
          setTimeout(() => {
            this.router.navigate(['/vols']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.modalMessage = err.error?.message || 'Erreur lors de la création du vol';
          this.showErrorModal = true;
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
      if (duree < 0) duree += 24 * 60;
      
      this.volForm.patchValue({ dureeVol: duree });
    }
  }

  openCancelModal() {
    this.showCancelModal = true;
  }

  closeCancelModal() {
    this.showCancelModal = false;
  }

  confirmCancel() {
    this.router.navigate(['/vols']);
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/vols']);
  }

  closeErrorModal() {
    this.showErrorModal = false;
    this.modalMessage = '';
  }

  closeValidationModal() {
    this.showValidationModal = false;
    this.modalMessage = '';
  }
}
