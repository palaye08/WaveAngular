#include <stdio.h>
#include <math.h>
int main(){
float x1,x2,y1,y2,distance;
printf("saisir x1 : ");
scanf("%f",&x1);
printf("saisir x2 : ");
scanf("%f",&x2);
printf("saisir y1 : ");
scanf("%f",&y1);
printf("saisir y2 : ");
scanf("%f",&y2);
distance=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
printf("la distance est : %f",distance);

return 0;
}
