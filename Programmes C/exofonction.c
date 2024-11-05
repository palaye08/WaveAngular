#include <stdio.h>
#include <stdlib.h>
int sommechiffre(int);
int validite();
 

 int validite(){
    int n;
   do{
        printf("saisir un nombre: ");
        scanf("%d",&n);
        if (n<0){
          printf("saisir un bon nombre !\n");
        }
    }while(n<0);
      return n;

}
 int sommechiffre(int n){
    int q,som=0;
    q=n;
    while(n!=0){
        som=som+n%10;
        n=n/10;
    }
    if(som==q){
        return 1;
    }else 
    return 0;
 } 
 
