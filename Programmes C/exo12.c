// Exercice 12 : Faire un programme qui saisit une date (jour, mois et année) puis  indique si la date est valide ou pas.#include <stdio.h>

int main() {
    int jour, mois, annee;
    int jours_dans_mois;

    printf("Entrez le jour : ");
    scanf("%d", &jour);
    printf("Entrez le mois : ");
    scanf("%d", &mois);
    printf("Entrez l'annee : ");
    scanf("%d", &annee);

    if (mois < 1 || mois > 12) {
        printf("Mois invalide.\n");
    } else if (jour < 1) {
        printf("Jour invalide.\n");
    } else {
        if (mois == 2) {
            if ((annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)) {
                jours_dans_mois = 29;
            } else {
                jours_dans_mois = 28;
            }
        } else if (mois == 4 || mois == 6 || mois == 9 || mois == 11) {
            jours_dans_mois = 30;
        } else {
            jours_dans_mois = 31;
        }

        if (jour > jours_dans_mois) {
            printf("Date invalide : le mois %d de l'annee %d ne compte que %d jours.\n", mois, annee, jours_dans_mois);
        } else {
            printf("Date valide.\n");
        }
    }

    return 0;
}
