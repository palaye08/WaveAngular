#include <stdio.h>
int main(){
    int n,i,somme=0;
    float moyenne;
    do{
     printf("saisir un nombre : ");
     scanf("%d",&n);
    }while(n<=0);
    for(i=1;i<=n;i++){
        somme=somme+i;
    } moyenne=somme/n;
      printf("la somme est : %d\n",somme);
      printf("la moyenne est : %f\n",moyenne);
}