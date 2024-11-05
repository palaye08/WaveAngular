//Exercice 11: Faire un programme qui saisit une  année et un mois  puis   détermine et affiche le nombre de jours de ce mois dans cette année  .

#include <stdio.h>

int main() {
    int annee, mois, nb_jours;

    printf("Entrez une annee : ");
    scanf("%d", &annee);
    printf("Entrez un mois (1 pour janvier, 2 pour février, etc.) : ");
    scanf("%d", &mois);

    if (mois == 1 || mois == 3 || mois == 5 || mois == 7 || mois == 8 || mois == 10 || mois == 12) {
        nb_jours = 31;
    } else if (mois == 4 || mois == 6 || mois == 9 || mois == 11) {
        nb_jours = 30;
    } else if (mois == 2) {
        if ((annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)) {
            nb_jours = 29;
        } else {
            nb_jours = 28;
        }
    } else {
        printf("Mois invalide.\n");
        return 1;
    }

    printf("Il y a %d jours dans le mois %d de l'annee %d.\n", nb_jours, mois, annee);

    return 0;
}
