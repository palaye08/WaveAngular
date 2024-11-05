#include <stdio.h>
int main(){
    int jour,mois,annee;
    printf("doner la date : ");
    scanf("%d %d %d",jour,mois,annee);
    if(jour==1){
         if(mois%2==0){
           
            if(mois==12){
                jour=30;
                mois-=1;
            }else{
               jour==31;
               mois-=1;
            }printf("la date précédente est : %d/%d/%d",jour,mois,annee);
         }else{
            if(mois==3){
              jour=29;
             mois-=1;
            }else{
             jour=30;
             mois-=1;
            }
            if(mois==9){
             jour=31;
             mois-=1;
            }printf("la date précédente est : %d/%d/%d",jour,mois,annee);
        }   
    }else{
        jour-=1;
        printf("la date précédente est : %d/%d/%d",jour,mois,annee);
    }
    return 0;
}