#include <stdio.h>
int main (){
    int heure,min,seconde;
    printf("saisir votre heure : \n");
    scanf("%d %d %d",&heure,&min,&seconde);
    if(heure<0||min<0||seconde<0||heure>23||min>59||seconde>59){
        printf("heure invalide");
    }else{
        if(seconde!=59){
            seconde+=1;
        }else {
            seconde=0;
            if(min!=59){
                min+=1;
            }else{
                min=0;
                if(heure!=23){
                    heure+=1;
                }else{
                    heure=0;
                }
            }
        } printf("l'heure est : %d-%d-%d-n",heure,min,seconde);
    }
    return 0;
}