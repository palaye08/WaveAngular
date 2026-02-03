import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paiement, InitierPaiement, PaiementManuel } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/paiements`;

  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.baseUrl);
  }

  getStatutPaiement(reservationId: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.baseUrl}/reservation/${reservationId}`);
  }

  initierPaiement(data: InitierPaiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.baseUrl}/initier`, data);
  }

  enregistrerPaiementManuel(data: PaiementManuel): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.baseUrl}/manuel`, data);
  }
}