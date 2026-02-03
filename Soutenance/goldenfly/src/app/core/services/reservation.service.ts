import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, CreateReservation, Billet } from '../models/reservation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/reservations`;

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  getReservationsByUtilisateur(utilisateurId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/utilisateur/${utilisateurId}`);
  }

  getBillet(reservationId: number): Observable<Billet> {
    return this.http.get<Billet>(`${this.baseUrl}/${reservationId}/billet`);
  }

  createReservation(data: CreateReservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl, data);
  }

  confirmerReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}/confirmer`, {});
  }

  annulerReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}/annuler`, {});
  }
}