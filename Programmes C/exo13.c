#include <stdio.h>

int main() {
    int jour, mois, annee;
    
    // Saisie de la date
    printf("Entrez la date (jour/mois/annee) : ");
    scanf("%d/%d/%d", &jour, &mois, &annee);

    // Vérification de la validité de la date saisie
    if (mois < 1 || mois > 12) {
        printf("Mois invalide.\n");
        return 1;
    }
    if (jour < 1 || jour > 31) {
        printf("Jour invalide.\n");
        return 1;
    }
    if ((mois == 4 || mois == 6 || mois == 9 || mois == 11) && jour > 30) {
        printf("Jour invalide pour ce mois.\n");
        return 1;
    }
    if (mois == 2) {
        if ((annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)) {
                if (jour > 29) {
                printf("Jour invalide pour ce mois (année bissextile).\n");
            }
            } else {
                if (jour > 28) {
                printf("Jour invalide pour ce mois.\n");
   
            }
            }
    }

    // Détermination de la date suivante
    jour = jour + 1;
    if ((mois == 4 || mois == 6 || mois == 9 || mois == 11) && jour > 30) {
        jour = 1;
        mois = mois + 1;
    } else if (mois == 2) {
        if ((annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)) {
            if (jour > 29) {
                jour = 1;
                mois = mois + 1;
            }
        } else {
            if (jour > 28) {
                jour = 1;
                mois = mois + 1;
            }
        }
    } else if (jour > 31) {
        jour = 1;
        mois = mois + 1;
        if (mois > 12) {
            mois = 1;
            annee = annee + 1;
        }
    }

    // Affichage de la date suivante
    printf("La date suivante est : %d/%d/%d\n", jour, mois, annee);

    return 0;
}


