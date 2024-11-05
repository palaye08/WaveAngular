#include <stdio.h>
int main(){
float R1,R2,R3;
printf("donner la résistence R1 :");
scanf("%f",&R1);
printf("donner la résistance R2 : ");
scanf("%f",&R2);
printf("donner la résistance R3 : ");
scanf("%f",&R3);
printf("la résistence en serie est :%f \n",R1+R2+R3);
printf("la résistence en parallèle est : %f",(R1*R2*R3)/(R1*R2+R2*R3+R1*R3));
return 0;
}
