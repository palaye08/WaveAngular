

import { Utilisateur } from "./utilisateur.model";
import { Vol } from "./vol.model";

export enum TypeReservationEnum {
    ALLER = 'ALLER',
    ALLER_RETOUR = 'ALLER_RETOUR'
  }
  
  export enum ClasseVolEnum {
    ECONOMIQUE = 'ECONOMIQUE',
    PREMIUM = 'PREMIUM',
    AFFAIRES = 'AFFAIRES'
  }
  
  export enum StatutReservationEnum {
    EN_ATTENTE = 'EN_ATTENTE',
    CONFIRMEE = 'CONFIRMEE',
    ANNULEE = 'ANNULEE',
    EMBARQUEE = 'EMBARQUEE'
  }
  
  export interface Reservation {
    id: number;
    numeroReservation: string;
    utilisateur: Utilisateur;
    volAller: Vol;
    volRetour?: Vol;
    typeReservation: TypeReservationEnum;
    classeVol: ClasseVolEnum;
    dateDepart: string;
    dateRetour?: string;
    prixTotal: number;
    statut: StatutReservationEnum;
    qrCode: string;
    dateEmbarquement?: string;
    nombrePassagers: number;
    estPaye: boolean;
    dateLimitePaiement: string;
    dateCreation: string;
  }
  
  export interface CreateReservation {
    utilisateurId: number;
    volAllerId: number;
    volRetourId?: number;
    typeReservation: TypeReservationEnum;
    classeVol: ClasseVolEnum;
    dateDepart: string;
    dateRetour?: string;
    nombrePassagers: number;
  }
  
  export interface Billet {
    numeroReservation: string;
    nomPassager: string;
    prenomPassager: string;
    emailPassager: string;
    telephonePassager: string;
    numeroVolAller: string;
    villeDepartAller: string;
    codeVilleDepartAller: string;
    villeArriveeAller: string;
    codeVilleArriveeAller: string;
    dateDepartAller: string;
    heureDepartAller: string;
    heureArriveeAller: string;
    dureeVolAller: number;
    numeroVolRetour?: string;
    villeDepartRetour?: string;
    codeVilleDepartRetour?: string;
    villeArriveeRetour?: string;
    codeVilleArriveeRetour?: string;
    dateDepartRetour?: string;
    heureDepartRetour?: string;
    heureArriveeRetour?: string;
    dureeVolRetour?: number;
    classeVol: ClasseVolEnum;
    nombrePassagers: number;
    prixTotal: number;
    qrCode: string;
    statut: string;
  }