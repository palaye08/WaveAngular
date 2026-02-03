

export interface Ville {
    id: number;
    nom: string;
    code: string;
    nomAeroport: string;
    pays: string;
    latitude?: number;
    longitude?: number;
    actif: boolean;
    dateCreation: string;
  }
  
  export interface CreateVille {
    nom: string;
    code: string;
    nomAeroport: string;
    pays: string;
    latitude?: number;
    longitude?: number;
  }