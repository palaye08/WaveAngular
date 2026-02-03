export interface Dashboard {
    totalReservations: number;
    totalVols: number;
    totalUtilisateurs: number;
    totalVilles: number;
    revenusTotal: number;
    reservationsConfirmees: number;
    reservationsEnAttente: number;
    reservationsAnnulees: number;
    reservationsEmbarquees: number;
    reservationsParMois: { [key: string]: number };
    revenusParMois: { [key: string]: number };
    volsPopulaires: { [key: string]: number };
  }