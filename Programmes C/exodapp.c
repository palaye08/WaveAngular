#include <stdio.h>
#include<stdlib.h>
#include "prototype.c"

 int main(){
  int tentative=4,n;
  char reponse='o';
  
while(tentative>0 && reponse!='n'){
    
      printf("saisir un nombre :\n");
      scanf("%d",&n);
      tentative--;
   printf("nombre %d\n",nbrpremier());
      if(n==nbrpremier()){
       printf("voulez vous continuer ? :");
       scanf("%s",&reponse);
        
      }
      
   } 
      if(tentative==0){
          printf("tu as perdue ");
     }else printf("tu as gagne ");

   
   return 0;
}
   
