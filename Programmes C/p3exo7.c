/*Écrire un algorithme qui demande successivement 10 nombres à l'utilisateur, et qui affiche à la fin
le plus grand de ces 10 nombres Et affiche aussi son rang dans la liste saisie*/
#include <stdio.h>
int main(){
    int nombre,max,cpt=1;
    printf("saisir un nombre : ");
    scanf("%d",&nombre);
    max=nombre;
    while(cpt<10){
       printf("saisir un nombre : ");
       scanf("%d",&nombre);
       if(nombre>max){
        max=nombre;
       }
       cpt++; 
    } printf("le plus grand nombre est : %d\n",max);

    return 0;
}