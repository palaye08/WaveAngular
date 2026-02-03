import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vol, CreateVol, SearchVol } from '../models/vol.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/vols`;

  getVols(): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.baseUrl);
  }

  getVolById(id: number): Observable<Vol> {
    return this.http.get<Vol>(`${this.baseUrl}/${id}`);
  }

  rechercherVols(criteria: SearchVol): Observable<Vol[]> {
    return this.http.post<Vol[]>(`${this.baseUrl}/rechercher`, criteria);
  }

  createVol(data: CreateVol): Observable<Vol> {
    return this.http.post<Vol>(this.baseUrl, data);
  }

  deleteVol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}