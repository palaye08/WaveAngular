import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur, CreateUtilisateur, ProfileEnum } from '../models/utilisateur.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/utilisateurs`;

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl);
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }

  getUtilisateursByProfile(profile: ProfileEnum): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/profile/${profile}`);
  }

  createUtilisateur(data: CreateUtilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.baseUrl, data);
  }

  updateUtilisateur(id: number, data: CreateUtilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${id}`, data);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}