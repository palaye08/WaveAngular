#include <stdio.h>
#include<stdlib.h>
#include "enregistrement.c"


int main(){
    point A,B;
   A=saisi();
   B=saisi();
 printf("la distance entre A et B est :%.2f\n",racine(A,B));

 return 0;
}