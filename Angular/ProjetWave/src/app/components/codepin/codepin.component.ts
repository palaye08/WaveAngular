import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiBinderService } from '../../service/api-binder.service';
import { NgFor, NgIf } from '@angular/common';

interface PinResponse {
  message: string;
  sessionToken: string;
}

@Component({
  selector: 'app-code-pin',
  standalone: true,
  imports: [NgFor,NgIf],

  templateUrl: './codepin.component.html',
  styleUrls: ['./codepin.component.css']
})
export class CodepinComponent {
  pin: string = '';
  displayPin: string[] = [];
  errorMessage: string = '';

  constructor(
    private apiBinderService: ApiBinderService,
    private router: Router
  ) {
    // Remplacer l'entrée d'historique pour bloquer le bouton "Retour"
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.preventBackNavigation);
  }

  // Empêche l’utilisateur d’utiliser le bouton "Retour"
  preventBackNavigation = () => {
    history.pushState(null, '', location.href);
  };

  ngOnDestroy() {
    window.removeEventListener('popstate', this.preventBackNavigation);
  }

  onNumberClick(number: number) {
    if (this.pin.length < 4) {
      this.pin += number.toString();
      this.displayPin = Array(this.pin.length).fill('•');
      
      if (this.pin.length === 4) {
        this.verifyPin();
      }
    }
  }

  onDelete() {
    if (this.pin.length > 0) {
      this.pin = this.pin.slice(0, -1);
      this.displayPin = Array(this.pin.length).fill('•');
    }
  }

  private verifyPin() {
    const data = { pin: parseInt(this.pin, 10) };
    
    this.apiBinderService.apiSave<PinResponse>('user/verify-pin', data)
      .subscribe({
        next: (response) => {
          localStorage.setItem('isCodePinValidated', 'true');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.pin = '';
          this.displayPin = [];
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }
}
