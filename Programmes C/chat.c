#include <stdio.h>
#include <string.h>

#define MAX_LOGIN_LENGTH 20
#define MAX_PASSWORD_LENGTH 50

typedef struct {
    char login[MAX_LOGIN_LENGTH];
    char password[MAX_PASSWORD_LENGTH];
} identifiant;

void menuadmin() {
    printf("Menu administrateur\n");
}

void menuEtu() {
    printf("Menu étudiant\n");
}

int main() {
    identifiant identifiant1, identifiant2;

    FILE *ficEtu = fopen("etudiant.txt", "r");
    if (ficEtu == NULL) {
        printf("Erreur lors de l'ouverture du fichier 'etudiant.txt'.\n");
        return 1;
    }
    fscanf(ficEtu, "%s %s", identifiant2.login, identifiant2.password);
    fclose(ficEtu);

    FILE *ficAdmin = fopen("admin.txt", "r");
    if (ficAdmin == NULL) {
        printf("Erreur lors de l'ouverture du fichier 'admin.txt'.\n");
        return 1;
    }
    fscanf(ficAdmin, "%s %s", identifiant1.login, identifiant1.password);
    fclose(ficAdmin);

    char login[MAX_LOGIN_LENGTH];
    char password[MAX_PASSWORD_LENGTH];

    do {
        printf("Saisir login : ");
        fgets(login, sizeof(login), stdin);
        if (strlen(login) <= 1) {
            printf("Le login est obligatoire.\n");
        }
    } while (strlen(login) <= 1);

    do {
        printf("Saisir password : ");
        fgets(password, sizeof(password), stdin);
        if (strlen(password) <= 1) {
            printf("Le mot de passe est obligatoire.\n");
        }
    } while (strlen(password) <= 1);

    if (strcmp(identifiant1.login, login) == 0 && strcmp(identifiant1.password, password) == 0) {
        menuadmin();
    } else if (strcmp(identifiant2.login, login) == 0 && strcmp(identifiant2.password, password) == 0) {
        menuEtu();
    } else {
        printf("Identifiant incorrect.\n");
    }

    return 0;
}
