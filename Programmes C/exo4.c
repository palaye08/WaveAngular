
#include <stdio.h>
#include <math.h>
int main(){
    float a,b,c,delta,x1,x2;
    printf("saisir a,b et c : ");
    scanf("%f %f %f",&a,&b,&c);
    if(a==0){
       if (b==0) {
         if (c==0) {
           printf("toujours vrai ");
          } else{
            printf("impossible ");
          }
        } else{
         printf("l'équation est de premier degré ");
        }
    
    } else{
        delta=(b*b-4*a*c);
        if(delta>0){
          x1=(-b-sqrt(delta))/2*a;
          x2=(-b+sqrt(delta))/2*a;
          printf("les deux racines sont : %f et %f",x1,x2);
        }else{
            if(delta==0){
                x1=(-b)/2*a;
                printf("la racine double est : %f",x1);

            }else{
                printf("l'équation n'admet pas de solution.");
            }
        }
    }
   
    return 0;
}