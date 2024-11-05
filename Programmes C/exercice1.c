#include <stdio.h>
int main(){
int a,b;
printf("saisir a: ");
scanf("%d",&a);
printf("saisir b: ");
scanf("%d",&b);
printf("le quotient est : %d\n",a/b);
printf("le reste de la division est :%d\n",a%b);
printf("le quotient réel est : %f\n",(float)a/b);
return 0;
}
