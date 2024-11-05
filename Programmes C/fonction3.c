#include <stdio.h>
int validation1(int,int,int);
void validation2(int,int,int);
 
 int validation1(int jour,int mois,int annee){
    
    printf("saisir une date :");
    scanf("%d %d %d ",&jour,&mois,&annee);  
    if(jour<1 || jour>31 || mois<1 || mois>12 || annee<=0){  
         return 0; 
     } else 
         {
            return 1;
         }
}
   void validattion2(){
    
   }int bisextille(int annee){
  if(annee%4==0 && annee%100!=0 || annee%400==0){
    return 1;
  }else return 0;
}
