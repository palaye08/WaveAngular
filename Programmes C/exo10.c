//Faire un programme qui saisit une  année puis indique si l’année est bissextile ou pas.
#include <stdio.h>

int main() {
    int annee;
    
    printf("Entrez une annee : ");
    scanf("%d", &annee);

    if ((annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)) {
        printf("%d est une annee bissextile.\n", annee);
    } else {
        printf("%d n'est pas une annee bissextile.\n", annee);
    }

    return 0;
}
