#include <stdio.h>
#include <math.h>
int main(){
float longueur,largeur;
printf("donner la longueur :");
scanf("%f",&longueur);
printf("donner la largeur : ");
scanf("%f",&largeur);
printf("le périmètre est : %f\n",(longueur+largeur)*2);
printf("la surface est : %f\n",longueur*largeur);
printf("la longueur d'un des diagonales est : %f\n",sqrt(longueur*longueur+largeur*largeur));
return 0;
}
