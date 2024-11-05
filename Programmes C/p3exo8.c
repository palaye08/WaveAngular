/*   Écrire un algorithme mettant en œuvre le jeu suivant entre deux joueurs : Le premier utilisateur
saisit un entier que le second doit deviner. Pour cela, il a le droit à autant de tentatives qu'il le souhaite. A
chaque échec, le programme lui indique si l'entier est plus grand ou plus petit que sa proposition. Un score est
affiché lorsque l'entier est trouvé. */

#include <stdio.h>
int main(){
    int nombre,test,i=0;
    printf("saisir votre nombre : ");
    scanf("%d",&test);
     do{
        printf("saisir un nombre : ");
        scanf("%d",&nombre);
        i++;
     }while(test!= nombre);
     printf("le nombre de tentative est : %d\n",i);
    return 0;
}