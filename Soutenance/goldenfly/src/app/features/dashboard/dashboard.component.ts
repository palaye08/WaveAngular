import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Dashboard } from '../../core/models/dashboard.model';
import { Chart, registerables } from 'chart.js';

// Enregistrer tous les composants de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  stats?: Dashboard;
  
  pieChart?: Chart;
  lineChart?: Chart;
  revenuMoyenParVoyageur = 0;

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.dashboardService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data;
        this.calculateRevenuMoyen();
        setTimeout(() => this.setupCharts(), 100);
      }
    });
  }

  calculateRevenuMoyen() {
    if (this.stats && this.stats.totalReservations > 0) {
      this.revenuMoyenParVoyageur = Math.round(this.stats.revenusTotal / this.stats.totalReservations);
    }
  }

  setupCharts() {
    if (!this.stats) return;

    this.setupPieChart();
    this.setupLineChart();
  }

  setupPieChart() {
    if (!this.stats) return;

    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Détruire le graphique existant s'il existe
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Confirmées', 'En Attente', 'Annulées', 'Embarquées'],
        datasets: [{
          data: [
            this.stats.reservationsConfirmees,
            this.stats.reservationsEnAttente,
            this.stats.reservationsAnnulees,
            this.stats.reservationsEmbarquees
          ],
          backgroundColor: [
            '#10B981', // Vert
            '#F59E0B', // Orange
            '#EF4444', // Rouge
            '#3B82F6'  // Bleu
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12,
                family: 'Inter'
              }
            }
          },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 12,
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value} réservation(s)`;
              }
            }
          }
        }
      }
    });
  }

  setupLineChart() {
    if (!this.stats) return;

    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Détruire le graphique existant s'il existe
    if (this.lineChart) {
      this.lineChart.destroy();
    }

    const mois = Object.keys(this.stats.revenusParMois);
    const revenus = Object.values(this.stats.revenusParMois);

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: mois,
        datasets: [{
          label: 'Revenus (FCFA)',
          data: revenus,
          borderColor: '#DFB717',
          backgroundColor: 'rgba(223, 183, 23, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: '#DFB717',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 12,
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context) {
                const value = context.parsed.y || 0;
                return `Revenus: ${value.toLocaleString()} FCFA`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return (value as number).toLocaleString() + ' FCFA';
              },
              font: {
                size: 11
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.lineChart) {
      this.lineChart.destroy();
    }
  }
}