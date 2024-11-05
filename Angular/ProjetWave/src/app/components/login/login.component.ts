// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiBinderService } from '../../service/api-binder.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  phoneNumber: string = '';
  otpCode: string = '';
  otpSent: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private apiService: ApiBinderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async requestOtp() {
    if (!this.phoneNumber || this.phoneNumber.length !== 9) {
      this.errorMessage = 'Veuillez entrer un numéro valide';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.apiService
        .apiSave<any>('user/request-otp', { phoneNumber: this.phoneNumber })
        .toPromise();
      
      if (response?.message === 'Code OTP envoyé.') {
        this.otpSent = true;
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Erreur lors de l\'envoi du code OTP';
    } finally {
      this.isLoading = false;
    }
  }

  async verifyOtp() {
    if (!this.otpCode || this.otpCode.length !== 6) {
      this.errorMessage = 'Veuillez entrer le code OTP complet';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.apiService
        .apiSave<any>('user/verify-otp', {
          phoneNumber: this.phoneNumber,
          otp: this.otpCode
        })
        .toPromise();

      if (response?.token) {
        this.authService.setAuthToken(response.token); // Stocke le token d'authentification
        this.router.navigate(['/codepin']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Code OTP incorrect ou expiré';
    } finally {
      this.isLoading = false;
    }
  }
}