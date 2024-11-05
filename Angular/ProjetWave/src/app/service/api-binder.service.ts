import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBinderService {
  private baseUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHttpOptions() {
    const authToken = this.authService.getAuthToken();
    const sessionToken = this.authService.getSessionToken();
    const token = sessionToken || authToken;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error Details:', {
      status: error.status,
      message: error.message,
      error: error.error,
      url: error.url
    });

    if (error.status === 401) {
      const sessionToken = this.authService.getSessionToken();
      if (sessionToken) {
        this.authService.clearSessionToken();
        return throwError(() => ({
          message: 'Session expirée. Veuillez saisir votre code PIN.',
          status: error.status
        }));
      } else {
        this.authService.logout();
        return throwError(() => ({
          message: 'Session expirée. Veuillez vous reconnecter.',
          status: error.status
        }));
      }
    }

    // Gestion spécifique de l'erreur 500
    if (error.status === 500) {
      return throwError(() => ({
        message: 'Erreur serveur. Veuillez réessayer plus tard.',
        status: error.status,
        details: error.error
      }));
    }

    const errorMessage = error.error?.message || 
                        `Erreur ${error.status}: ${error.message}`;

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      details: error.error
    }));
  }

  apiFetch<T>(endpoint: string, params: any = null): Observable<T> {
    let url = `${this.baseUrl}${endpoint}`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          queryParams.append(key, params[key]);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.http.get<T>(url, this.getHttpOptions())
      .pipe(
        tap(response => console.log(`Réponse de ${endpoint}:`, response)),
        catchError(this.handleError.bind(this))
      );
  }

  apiSave<T>(endpoint: string, data: any, method: 'POST' | 'PATCH' | 'DELETE' = 'POST'): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let request: Observable<T>;

    switch (method) {
      case 'POST':
        request = this.http.post<T>(url, data, this.getHttpOptions());
        break;
      case 'PATCH':
        request = this.http.patch<T>(url, data, this.getHttpOptions());
        break;
      case 'DELETE':
        request = this.http.delete<T>(url, this.getHttpOptions());
        break;
      default:
        throw new Error('Méthode HTTP non supportée');
    }

    return request.pipe(
      tap(response => console.log(`Réponse de ${endpoint}:`, response)),
      catchError(this.handleError.bind(this))
    );
  }
}