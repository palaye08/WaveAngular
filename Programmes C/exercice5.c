#include <stdio.h>
int main(){
float monnaiecfa;
printf("saisir la valeur de la monnaie en CFA : ");
scanf("%f",monnaiecfa);
printf("la valeur en dollar est : %f\n",monnaiecfa/608.55);
printf("la valeur en livre sterling est : %f\n",monnaiecfa/766.44);
return 0;
}
