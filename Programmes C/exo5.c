/* Exercice 5 : On désire écrire un algorithme qui permet d’afficher le jour correspondant à un chiffre allant de 1 à 7 , entré au clavier. Résoudre ce problème avec deux méthodes :  (si imbriquée , primitive cas). */
#include <stdio.h>

int main() {
int j;
printf(" veuillez saisir un chiffre compris entre 1 et 7  pour connaître le jour");
scanf("%d",&j);
 if ((j<1) && (j>7)) {
 printf("veuillez saisir un nombre correspondant au code donnée");
 }
 else
 {
 if ( j==1) {
 printf(" ce code correspond au lundi \n");
 }
 else 
if ( j==2) { 
 printf(" ce code correspond au Mardi \n");
 } 
 else
 if ( j==3) {
 printf(" ce code correspond au Mercredi \n");
 } 
 else
 if ( j==4) {
 printf(" ce code correspond au Jeudi\n");
 } 
 else
 if ( j==5) {
 printf(" ce code correspond au Vendredi\n");
 } 
 else
 if ( j==6) {
 printf(" ce code correspond au Samedi \n");
 } 
 else
  {
 printf(" ce code correspond au Dimanche \n");
 }
 }
 return 0;
 } 
