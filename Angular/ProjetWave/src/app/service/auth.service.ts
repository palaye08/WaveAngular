import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface DecodedToken {
  id: number;
  telephone: string;
  prenom: string;
  image: string;
  type: string;
  solde: number;
  // autres champs si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  setSessionToken(token: string) {
    localStorage.setItem('sessionToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getSessionToken(): string | null {
    return localStorage.getItem('sessionToken');
  }

  clearSessionToken() {
    localStorage.removeItem('sessionToken');
    this.router.navigate(['/codepin']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionToken');
    this.router.navigate(['/login']);
  }

  // Nouvelle méthode pour décoder le token
  getDecodedToken(): DecodedToken | null {
    const token = this.getAuthToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  // Nouvelle méthode pour obtenir le solde de l'utilisateur
  getUserBalance(): number {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.solde || 0;
  }

  // Nouvelle méthode pour obtenir toutes les informations de l'utilisateur
  getUserInfo(): DecodedToken | null {
    return this.getDecodedToken();
  }
}