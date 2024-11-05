#include <stdio.h>
int main(){
float nombre;
printf("saisir votre nombre en dm : ");
scanf("%f",&nombre);
printf("En mètres on : %f\n",nombre/10);
printf("En millimètres on : %f\n",nombre*100);
printf("En centimètres on : %f\n",nombre*10);
printf("En hectomètres on : %f\n",nombre/1000);
return 0;
}
