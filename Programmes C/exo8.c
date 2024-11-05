#include <stdio.h>
int main(){
   int a,b,c,max,milieu,min;
    printf("donner les trois nombres : ");
    scanf("%d %d %d",&a,&b,&c);
 if(a>b){
    max=a;min=b;
    if(c>max){
        milieu=max;
        max=c;
      } else{
        if(c>min){
           milieu=c;
        }else{
          milieu=min;
          min=c;
        }
      }
 } else{
        max=b;min=a;
        if(c>max){
        milieu=max;
        max=c;
          }else{
            if(c>min){
              milieu=c;
            }else{
                milieu=min;
                min=c;
            }
        }
      }printf("l'ordre décroissant est : %d %d %d \n",max,milieu,min);
      printf("l'ordre roissant est : %d %d %d \n",min,milieu,max);

  return 0;

}