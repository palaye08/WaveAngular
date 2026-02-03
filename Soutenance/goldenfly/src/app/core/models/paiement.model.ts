export enum ModePaiementEnum {
    WAVE = 'WAVE',
    ORANGE_MONEY = 'ORANGE_MONEY',
    ESPECES = 'ESPECES',
    CARTE_BANCAIRE = 'CARTE_BANCAIRE'
  }
  
  export enum StatutPaiementEnum {
    EN_ATTENTE = 'EN_ATTENTE',
    PAYE = 'PAYE',
    ECHOUE = 'ECHOUE',
    REMBOURSE = 'REMBOURSE'
  }
  
  export interface Paiement {
    id: number;
    numeroPaiement: string;
    reservationId: number;
    numeroReservation: string;
    montant: number;
    modePaiement: ModePaiementEnum;
    statut: StatutPaiementEnum;
    transactionId?: string;
    numeroTelephone?: string;
    numeroRecu?: string;
    referenceExterne?: string;
    datePaiement?: string;
    dateCreation: string;
    commentaire?: string;
  }
  
  export interface InitierPaiement {
    reservationId: number;
    modePaiement: ModePaiementEnum;
    numeroTelephone?: string;
  }
  
  export interface PaiementManuel {
    reservationId: number;
    montant: number;
    modePaiement: ModePaiementEnum;
    numeroRecu?: string;
    commentaire?: string;
  }