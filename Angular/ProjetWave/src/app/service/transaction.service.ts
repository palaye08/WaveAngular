import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 private console:string;
 
  constructor() { 
    // Code to initialize the console variable
    this.console = 'TransactionService initialized';
  }
  public getTransaction(idUser: number){
    // Simulate a call to a backend API to fetch transaction data
    if (idUser > 0 && idUser){
      return [
        {
          id: 1,
          type: 'Retrait',
          montant: 1000,
          date: new Date('2024-10-23T17:25'),
          details: '',
          isDebit: true
        },
        // Add more transactions as needed
      ];
    } 
    return this.console;

  }
}
