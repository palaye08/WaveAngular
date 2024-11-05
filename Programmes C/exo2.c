#include <stdio.h>
int main(){
    int a,b,calcul;
    char operateur;
    printf("saisir a : ");
    scanf("%d",&a);
    printf("saisir opérateur : ");
    scanf("%s",&operateur);
    printf("saisir b : ");
    scanf("%d",&b);
    if(operateur=='+'){
        calcul=a+b;
    }if (operateur=='-'){
          calcul=a-b;
    }if (operateur=='*'){
          calcul=a*b;
    }if (operateur=='/'){
          calcul=a/b; 
    }  printf("le resultat est : %d",calcul);
    
    return 0;
}