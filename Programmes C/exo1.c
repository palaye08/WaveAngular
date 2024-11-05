#include <stdio.h>
int main(){
    float valeur,rserie,rparallele,R1,R2,R3;
    printf("saisir une valeuur : ");
    scanf("%f",&valeur);
    printf ("saisir les 3 résistences : ");
    scanf("%f%f%f",&R1,&R2,&R3);
    if(valeur==1){
        rserie=R1+R2+R3;
        printf("la resistence est de : %f",rserie);
    }   if(valeur==2){
        rparallele=((R1*R2*R3)/(R1*R2+R2*R3+R1*R3));
        printf("la résistence est : %f",rparallele); 
    }
    return 0;
}