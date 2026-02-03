import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville, CreateVille } from '../models/ville.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/villes`;

  getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.baseUrl);
  }

  getVillesActives(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.baseUrl}/actives`);
  }

  getVilleById(id: number): Observable<Ville> {
    return this.http.get<Ville>(`${this.baseUrl}/${id}`);
  }

  createVille(data: CreateVille): Observable<Ville> {
    return this.http.post<Ville>(this.baseUrl, data);
  }

  updateVille(id: number, data: CreateVille): Observable<Ville> {
    return this.http.put<Ville>(`${this.baseUrl}/${id}`, data);
  }

  deleteVille(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}