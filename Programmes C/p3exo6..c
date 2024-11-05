#include <stdio.h>
int main (){
    int prix,somme=0;
    do{
        printf("saisir un prix : ");
        scanf("%d",&prix);
        if(prix!=0){
            somme=somme+prix;
        }
    }while(prix!=0);
    if(somme==0){
        printf("pas de somme :\n");
    }else{
    printf("les somme est :%d\n",somme);
    }
    
    
    return 0;

}