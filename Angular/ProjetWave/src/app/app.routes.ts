import { Routes } from '@angular/router';
import { CodepinComponent } from './components/codepin/codepin.component';
import { TransferComponent } from './components/transfert/transfert.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { CreditComponent } from './components/credit/credit.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'codepin', component: CodepinComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transfert', component: TransferComponent, canActivate: [AuthGuard] }, 
  { path: 'credit', component: CreditComponent, canActivate: [AuthGuard] }, 
  { path: 'paiements', component: PaiementComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
