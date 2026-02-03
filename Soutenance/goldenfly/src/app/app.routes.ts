import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'portail',
    pathMatch: 'full'
  },
  {
    path: 'portail',
    loadComponent: () => import('./features/portail/portail.component').then(m => m.PortailComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'utilisateurs',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/utilisateurs/list-utilisateurs/list-utilisateurs.component').then(m => m.ListUtilisateursComponent)
  },
  {
    path: 'villes',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/villes/list-villes/list-villes.component').then(m => m.ListVillesComponent)
  },
  {
    path: 'vols',
    canActivate: [authGuard],
    loadComponent: () => import('./features/vols/list-vols/list-vols.component').then(m => m.ListVolsComponent)
  },
  {
    path: 'vols/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/vols/create-vol/create-vol.component').then(m => m.CreateVolComponent)
  },
  {
    path: 'reservations',
    canActivate: [authGuard],
    loadComponent: () => import('./features/reservations/list-reservations/list-reservations.component').then(m => m.ListReservationsComponent)
  },
  {
    path: 'reservations/create/:volId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/reservations/create-reservation/create-reservation.component').then(m => m.CreateReservationComponent)
  },
  {
    path: 'paiements',
    canActivate: [authGuard],
    loadComponent: () => import('./features/paiements/list-paiements/list-paiements.component').then(m => m.ListPaiementsComponent)
  },
  {
    path: 'compte',
    canActivate: [authGuard],
    loadComponent: () => import('./features/compte/compte.component').then(m => m.CompteComponent)
  },
  {
    path: '**',
    redirectTo: 'portail'
  }
];