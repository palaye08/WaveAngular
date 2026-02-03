import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Dashboard } from '../../core/models/dashboard.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BaseChartDirective],
  template: `
    <div class="flex">
      <app-sidebar></app-sidebar>
      
      <div class="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">📊 Dashboard</h1>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm">Total Réservations</p>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalReservations || 0 }}</p>
              </div>
              <span class="text-5xl opacity-20">🎫</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gold-100 text-sm">Revenus Totaux</p>
                <p class="text-3xl font-bold mt-2">{{ (stats?.revenusTotal || 0) | number:'1.0-0' }} FCFA</p>
              </div>
              <span class="text-5xl opacity-20">💰</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm">Total Vols</p>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalVols || 0 }}</p>
              </div>
              <span class="text-5xl opacity-20">✈️</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100 text-sm">Utilisateurs</p>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalUtilisateurs || 0 }}</p>
              </div>
              <span class="text-5xl opacity-20">👥</span>
            </div>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Réservations par Statut</h3>
            <canvas baseChart *ngIf="pieChartData" 
              [data]="pieChartData" 
              [type]="'pie'"
              [options]="pieChartOptions">
            </canvas>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Revenus Mensuels</h3>
            <canvas baseChart *ngIf="lineChartData"
              [data]="lineChartData"
              [type]="'line'"
              [options]="lineChartOptions">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  stats?: Dashboard;

  pieChartData?: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartConfiguration<'pie'>['options'] = { responsive: true };

  lineChartData?: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.dashboardService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data;
        this.setupCharts();
      }
    });
  }

  setupCharts() {
    if (!this.stats) return;

    // Pie Chart
    this.pieChartData = {
      labels: ['Confirmées', 'En Attente', 'Annulées', 'Embarquées'],
      datasets: [{
        data: [
          this.stats.reservationsConfirmees,
          this.stats.reservationsEnAttente,
          this.stats.reservationsAnnulees,
          this.stats.reservationsEmbarquees
        ],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6']
      }]
    };

    // Line Chart - Revenus
    const mois = Object.keys(this.stats.revenusParMois);
    const revenus = Object.values(this.stats.revenusParMois);

    this.lineChartData = {
      labels: mois,
      datasets: [{
        label: 'Revenus (FCFA)',
        data: revenus,
        borderColor: '#DFB717',
        backgroundColor: 'rgba(223, 183, 23, 0.1)',
        tension: 0.4
      }]
    };
  }
}