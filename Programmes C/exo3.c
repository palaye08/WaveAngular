#include <stdio.h>
int main(){
    int a,b;
    printf("saisir a et b: ");
    scanf("%d%d",&a,&b);
    if(a==0){
        if(b==0){
            printf("toujours vrai ");
            if(b!=0){
                printf("impossible ");
            }
        }
    }else {
        printf("le resultat est : %d/%d",-b,a);
    }  

     return 0;
}  
    

