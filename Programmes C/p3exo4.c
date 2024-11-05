#include <stdio.h>
int main(){
    int a,b,max,min;
    do
    {printf("saisir deux nombre : ");
     scanf("%d %d",&a,&b);
    } while (a<=0||b<=0);
    if(a>b){
        max=a; min=b;
    }else{
        max=b; min=a;
    }
    while(max>min){
        max=max-min;
    } printf("le PGDC est : %d\n",max);
     return 0;
}