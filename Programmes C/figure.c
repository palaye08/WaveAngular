#include <stdio.h>
#include<stdlib.h>
#include "prototype.c"
int main(){
    char reponse;
    int n,m;
    n=validite();

    printf("veux tu continuer ? : ");
    scanf("%s",&reponse);
    if(reponse=='n'){
        int choix;
        
        printf("1-triangle \n");
        printf("2-carre \n\n");
        printf("choisir une option : ");
        scanf("%d",&choix);
          if(choix==1){
            char couleur;
           printf ("choisir une couleur :");
           scanf("%s",&couleur);
            int option;
            printf("1-triangle rectancle \n");
            printf("2-triangle isocèle \n");
            printf("choisir un type de triangle : ");
            scanf("%d",&option);
            if(option==1){
                triangle_rectangle(n);
                
            }else{
              if(couleur=='v'){
                triangle_isovert(n);
              }if(couleur=='j'){
                triangle_isojaune(n);
              } if(couleur=='b'){
                   triangle_isobleu(n);
              }
            } triangle_iso(n);
          }
            if(choix==2){
            carre(n);
            }
          
    }else {
        do{
        printf("saisir votre second nombre :");
        scanf("%d",&m);
        }while (m>n);
         if(m==n){
           char couleur;
               printf ("choisir une couleur :");
               scanf("%s",&couleur);
            if(couleur=='v'){
                carrevert(n);
            } if(couleur=='j'){
              carrejaune(n);
            } if(couleur=='r'){
              carrebleu(n);
            }
            
         }else 
         rectangle(n,m);

        
     }
 return 0;
}  
       