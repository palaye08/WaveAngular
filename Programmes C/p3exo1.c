#include <stdio.h>
int main(){
    int n,i,somme=0;
    do{
    printf("saisir un nombre : ");
    scanf("%d",&n);
    }while(n<=0);

    for(i=1;i<n;i++){
        if(n%i==0){
            somme=somme+i;
        }
    }   if (n==somme){
        printf("le nombre est parfait \n");
    }else{
        printf("le nombre n'est pas parfait \n");
    }
    return 0;
}