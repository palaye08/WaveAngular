import { TypeReservationEnum } from './reservation.model';

import { Ville } from "./ville.model";


export interface Vol {
    id: number;
    numeroVol: string;
    nom: string;
    villeDepart: Ville;
    villeArrivee: Ville;
    heureDepart: string;
    heureArrivee: string;
    dureeVol: number;
    nombreSieges: number;
    siegesDisponibles: number;
    prixBase: number;
    distance: number;
    lundi: boolean;
    mardi: boolean;
    mercredi: boolean;
    jeudi: boolean;
    vendredi: boolean;
    samedi: boolean;
    dimanche: boolean;
    actif: boolean;
    dateCreation: string;
  }
  
  export interface CreateVol {
    numeroVol: string;
    nom: string;
    villeDepartId: number;
    villeArriveeId: number;
    heureDepart: string;
    heureArrivee: string;
    dureeVol: number;
    nombreSieges: number;
    prixBase: number;
    distance: number;
    lundi: boolean;
    mardi: boolean;
    mercredi: boolean;
    jeudi: boolean;
    vendredi: boolean;
    samedi: boolean;
    dimanche: boolean;
  }
  
  export interface SearchVol {
    villeDepartId?: number;
    villeArriveeId?: number;
    dateDepart?: string;
    dateRetour?: string;
    typeReservation?: TypeReservationEnum;
    nombrePassagers?: number;
  }