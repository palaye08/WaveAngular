#include <stdio.h>
int main(){
    int mois1,jour1,annee1,jour,mois,annee;
    printf("donner la première date : ");
    scanf("%d %d %d",&jour1,&mois1,&annee1);
    printf("donner la seconde date : ");
    scanf("%d %d %d",&jour,&mois,&annee);
     if(annee>annee1){
        printf("le date est plus récente est : %d/%d/%d",jour,mois,annee);
     }else{
        if(annee==annee1){
            if(mois>mois1){
                printf("le date est plus récente est : %d/%d/%d",jour,mois,annee);
            }else {
                if(mois==mois1){
                    if(jour>jour1){
                        printf("la datte la plus récente est : %d/%d/%d",jour,mois,annee);
                    }else{
                       printf("la datte la plus récente est : %d/%d/%d",jour1,mois1,annee1); 
                    }

                }else {
                    if (mois1>mois){
                       printf("la datte la plus récente est : %d/%d/%d",jour1,mois1,annee1);
                    } 
                }
                
            }
            
        }else{
            if (annee<annee1){
                printf("la datte la plus récente est : %d/%d/%d",jour1,mois1,annee1);
            }
        }
     }
 return 0;
}