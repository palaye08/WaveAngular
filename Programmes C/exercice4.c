#include <stdio.h>
#define PI 3.14
int main(){
float rayon;
printf("donner le rayon du cercle : ");
scanf("%f",&rayon);
printf("le périmètre est : %f\n",2*PI*rayon);
printf("la surface est : %f\n",PI*rayon*rayon);
return 0;
}
