export enum ProfileEnum {
    ADMIN = 'ADMIN',
    VOYAGEUR = 'VOYAGEUR'
  }
  
  export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    age: number;
    profile: ProfileEnum;
    actif: boolean;
    dateCreation: string;
  }
  
  export interface CreateUtilisateur {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone: string;
    age: number;
    profile: ProfileEnum;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    refreshToken: string;
    type: string;
    utilisateur: Utilisateur;
  }