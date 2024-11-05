import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isCodePinValidated = localStorage.getItem('isCodePinValidated') === 'true';

    if (!isCodePinValidated) {
      // Redirige l'utilisateur vers la page codepin s'il n'a pas validé le code PIN
      this.router.navigate(['/codepin']);
      return false;
    }

    return true;
  }
}
