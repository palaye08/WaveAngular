#include <stdio.h>

int main() {
    int jour, mois, annee;

    // Saisie de la date
    printf("Entrez la date (jour mois annee) : ");
    scanf("%d %d %d", &jour, &mois, &annee);

    // Vérification des limites des mois
    if (mois < 1 || mois > 12) {
        printf("Mois invalide.\n");
        return 1;
    }

    // Vérification des années bissextiles
    int bissextile = (annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0);

    // Calcul de la date dans 5 jours
    jour += 5;
    if (jour > 31 || (jour > 30 && (mois == 4 || mois == 6 || mois == 9 || mois == 11)) || (jour > 29 && mois == 2 && bissextile) || (jour > 28 && mois == 2 && !bissextile)) {
        jour -= 30;
        mois++;
        if (mois > 12) {
            mois = 1;
            annee++;
        }
    }

    // Affichage de la nouvelle date
    printf("Dans 5 jours, la date sera : %d/%d/%d\n", jour, mois, annee);

    return 0;
}
