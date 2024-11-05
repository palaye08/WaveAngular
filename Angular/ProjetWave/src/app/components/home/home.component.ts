
// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HistoryComponent } from '../hystory/hystory.component';
import { AuthService } from '../../service/auth.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HistoryComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userBalance: number = 0;
  isBalanceHidden: boolean = false;
  userInfo: any = null;
  qrCodeData: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userInfo = userInfo;
      this.userBalance = userInfo.solde;
      // Générer le QR code avec les informations utilisateur
      await this.generateQRCode();
    } else {
      console.error('Impossible de charger les informations utilisateur');
      this.authService.logout();
    }
  }

  async generateQRCode() {
    // Créer un objet avec les informations à encoder
    const qrData = {
      id: this.userInfo.id,
      telephone: this.userInfo.telephone,
      solde: this.userBalance
    };

    try {
      // Générer le QR code en base64
      this.qrCodeData = await QRCode.toDataURL(JSON.stringify(qrData));
    } catch (err) {
      console.error('Erreur lors de la génération du QR code:', err);
    }
  }

  toggleBalanceVisibility() {
    this.isBalanceHidden = !this.isBalanceHidden;
  }

  getDisplayBalance(): string {
    if (this.isBalanceHidden) {
      return '••••••';
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(this.userBalance);
  }

  refreshBalance() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userBalance = userInfo.solde;
      this.generateQRCode(); // Régénérer le QR code avec le nouveau solde
    }
  }
}