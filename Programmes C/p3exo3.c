#include <stdio.h>
int main(){
    int a,b,i=0;
    do{
        printf("saisir deux nombres : ");
        scanf("%d %d",&a,&b);
    }while(a<=0||b<=0||a<b);
    while (a>=b) {   
       i++;
       printf("%d=%d-%d\n",a-b,a,b);
       a=a-b;
    }  
    printf("la division est égale à : %d\n",i);
return 0;
}