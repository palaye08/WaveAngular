#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void menuAdmin();
void menuEtu();

typedef struct
{
    char login[20];
    char password[20];
    char statut[10];
} identifiant;

int verifierIdentifiants(identifiant identifiants[], int nombreIdents, char *login, char *password, char *statut)
{
    for (int i = 0; i < nombreIdents; i++)
    {
        if (strcmp("admin", login) == 0 && strcmp("password1", password) == 0 && strcmp("admin", statut) == 0)
        {
            return i; // Identifiants valides
        }
    }
    return -1; // Identifiants invalides
}

int main()
{
    char password[20];
    char login[20];
    char statut[10]; // Ajout de la variable statut
    int indice = -1;

    FILE *fichUtilisateur = fopen("utilisateur.txt", "r");

    if (fichUtilisateur == NULL)
    {
        printf("Erreur lors de l'ouverture du fichier utilisateur.txt.\n");
        return 1;
    }

    int nbUtilisateurs = 0;
    while (fscanf(fichUtilisateur, "%s %s %s", login, password, statut) != EOF) // Correction de la lecture de statut
    {
        nbUtilisateurs++;
    }

    identifiant *identifiants = malloc(nbUtilisateurs * sizeof(identifiant));

    rewind(fichUtilisateur);

    for (int i = 0; i < nbUtilisateurs; i++)
    {
        fscanf(fichUtilisateur, "%s %s %s", identifiants[i].login, identifiants[i].password, identifiants[i].statut);
    }

    fclose(fichUtilisateur);

    do
    {
        printf("Saisir login : ");
        fgets(login, 20, stdin);
        if (strlen(login) <= 1)
        {
            printf("Le login est obligatoire.\n");
        }
    } while (strlen(login) <= 1);

    do
    {
        printf("Saisir password : ");
        fgets(password, 20, stdin);
        if (strlen(password) <= 1)
        {
            printf("Le mot de passe est obligatoire.\n");
        }
    } while (strlen(password) <= 1);

    indice = verifierIdentifiants(identifiants, nbUtilisateurs, login, password, "admin");

    if (indice != -1)
    {
        menuAdmin();
    }
    else
    {
        indice = verifierIdentifiants(identifiants, nbUtilisateurs, login, password, "etud");
        if (indice != -1)
        {
            menuEtu();
        }
        else
        {
            printf("Identifiants incorrects.\n");
        }
    }

    

    return 0;
}

void menuAdmin()
{
    printf("---------------------------------------------------------------------\n");
    printf("\t\t\tBienvenue dans le menu de l'administrateur:\n");
    printf("---------------------------------------------------------------------\n");
    printf("1 -- GESTION DES ÉTUDIANTS\n");
    printf("2 -- GÉNÉRATION DE FICHIERS\n");
    printf("3 -- MARQUER LES PRÉSENCES\n");
    printf("4 -- ENVOYER UN MESSAGE\n");
    printf("5 -- Quitter\n");
    printf("\n-- Entrez votre choix : ");
}

void menuEtu()
{
    printf("---------------------------------------------------------------------\n");
    printf("\t\t\tBienvenue dans le menu de l'étudiant:\n");
    printf("---------------------------------------------------------------------\n");
    printf("1 -- MARQUER MA PRÉSENCE\n");
    printf("2 -- NOMBRE DE MINUTES D’ABSENCE\n");
    printf("3 -- MES MESSAGES (0)\n");
    printf("4 -- QUITTER\n");
    printf("\n-- Entrez votre choix : ");
}
