#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <termios.h>
#include <ctype.h>

//-------------------------------------------
#ifdef _WIN32
#include <conio.h>
#else
#include <termios.h>
#include <unistd.h>
void liremessageref(){
    FILE *fich=fopen("messageref.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessagedata(){
    FILE *fich=fopen("messagedata.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessagedev(){
    FILE *fich=fopen("messagedev.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessageldiop(){
    FILE *fich=fopen("messageldiop.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessagesdiop(){
    FILE *fich=fopen("messagesdiop.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessagendiop(){
    FILE *fich=fopen("messagendiop.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessagediop(){
    FILE *fich=fopen("messagediop.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void liremessage(){
    FILE *fich=fopen("message.txt","r+");
    if(fich==NULL){
        printf("Erreur.");
        return;
    }  char message[100];
    if(fgets(message,sizeof(message),fich)!=NULL){
        printf("%s\n",message);
    }else {
        printf("erreur ");
        }
     getchar();
    fclose(fich);
}
void viderTamponEntree() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}
void ecriremessagedata(char message[100]) {
    FILE *fiche=fopen("messagedata.txt","w");
    if(fiche==NULL){
        printf("erreur.");
        return;
    }
    
    fprintf(fiche,"%s",message);
    fclose(fiche);
}
 void ecriremessagemat(char message[100]) {
    FILE *fiche=fopen("messagemat.txt","w");
    if(fiche==NULL){
        printf("erreur.");
        return;
    }
    
    fprintf(fiche,"%s",message);
    fclose(fiche);
}
  void ecriremessageref(char message[100]) {
    FILE *fiche=fopen("messageref.txt","w");
    if(fiche==NULL){
        printf("pas de message.");
        return;
    }
    
    fprintf(fiche,"%s",message);
    fclose(fiche);
}
  void ecriremessagedev(char message[100]) {
    FILE *fiche=fopen("messagedev.txt","w");
    if(fiche==NULL){
        printf("pas de message ");
        return;
    }
    
    fprintf(fiche,"%s",message);
    fclose(fiche);
}

void ecriremessage(char message[100]) {
    FILE *fiche=fopen("message.txt","w");
    if(fiche==NULL){
        printf("pas de message.");
        return;
    }
    
    fprintf(fiche,"%s",message);
    fclose(fiche);
}
void presencepardate(char dated[20]){
    if (dated[1]=='/' && dated[4]=='/' ){
        dated[1]='-'; dated[4]='-';
    } 
    if(dated[2]=='/' && dated[5]=='/'){
      dated[2]='-'; dated[5]='-';
    }
     if(dated[1]=='/' && dated[3]=='/' ){
         dated[1]='-'; dated[3]='-'; 
    }
    char tableau[50];
    FILE *fichierprecense=fopen("presence.txt","r+");
    if(fichierprecense==NULL){
        fichierprecense=fopen("presence.txt","w");
    }
     sprintf(tableau,"%s.txt",dated);
     
    
    FILE *fich=fopen(tableau,"w+");
  
        char matricule[20],prenom[20],nom[20],date[20],heure[20],classe[20];
        int cpt=0;
        while (fscanf(fichierprecense,"%s %s %s %s %s %s",matricule,prenom,nom,date,heure,classe)!=EOF){
             if(strcmp(date,dated)==0){
                   if(cpt==0){
                     fprintf(fich,"\nles présences au : %s\n",dated);
                     fprintf(fich,"%-20s","\n***************************************************\n");
                     fprintf(fich,"%-20s","matricule   prénom    nom       heure        classe\n");
                     fprintf(fich,"%-20s","***************************************************\n"); 
                    cpt=1;
                   } 
                   
                   fprintf(fich,"%-10s %-10s %-10s %-10s %-10s\n",matricule,prenom,nom,heure,classe);
                   fprintf(fich,"%-20s","--------------------------------------------------\n");
             }
        }      if(cpt==0){
            printf("\nDésolé date pas normale ");
        }  
        fclose(fich);
        fclose(fichierprecense);
}

void listepresence(){
    FILE *fichierpresence=fopen("presence.txt","r+");
    FILE *fich=fopen("tableau.txt","w+");
    if(fichierpresence==NULL || fich==NULL){
        printf("erreur .");
        return;
    }  
       char matricule[20],prenom[20],nom[20],date[20],heure[20],classe[20];
       char dateav[20];
       strcpy(dateav,"32/12/200");
       while(fscanf(fichierpresence,"%s %s %s %s %s %s",matricule,prenom,nom,date,heure,classe)!=EOF){
         if(strcmp(date,dateav)!=0){
           
            fprintf(fich,"\nprésences au : %s\n",date);
            fprintf(fich,"%-20s","\n****************************************************\n");
            fprintf(fich,"%-20s","matricule  prénom     nom         heure       classe\n");
            fprintf(fich,"%-20s","****************************************************\n");
            fprintf(fich,"%-10s %-10s %-10s %-10s %-10s\n",matricule,prenom,nom,heure,classe);
          
            strcpy(dateav,date);
         }else{
         fprintf(fich,"%-20s","-------------------------------------------------\n");
         fprintf(fich,"%-10s %-10s %-10s %-10s %-10s\n",matricule,prenom,nom,heure,classe);
         strcpy(dateav,date);
         } 
        
       }   
       fclose(fich);
       fclose(fichierpresence);
 }
int testpresence(char choix[]){
     FILE *fichierpresence = fopen("presence.txt", "r");
    if (fichierpresence == NULL) {
        printf("erreur lors de l'ouverture du fichier.\n");
        return 0;
    }

    char date[20], mattemp[20], heure[20];
    time_t now;
    time(&now);
    struct tm *local = localtime(&now);
    char date_act[20];
    strftime(date_act, sizeof(date_act), "%d-%m-%Y", local);

    while (fscanf(fichierpresence, "%s %s %s", mattemp, date, heure) != EOF) {
        if (strcmp(mattemp, choix) == 0 && strcmp(date,date_act) == 0) {
        
            return 1;
        }
    }

    fclose(fichierpresence);
    return 0;
}

        


char getch()
{
    struct termios oldt, newt;
    char ch;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    return ch;
}
#endif



#define LONGUEUR_MAX_LOGIN 10
#define LONGUEUR_MAX_MDP 10
#define MAX_STUDENTS_PER_CLASS 50

typedef struct 
{
    int jour;
    int mois;
    int annee;
} Date;

typedef struct {
    char login[LONGUEUR_MAX_LOGIN];
    char motDePasse[LONGUEUR_MAX_MDP];
} Identifiants;

typedef struct {
    char matricule[20];
    char motdepasse[10];
    char prenom[20];
    char nom[20];
    char classe[6];
    Date dateNaiss;
    int etat;
} Apprenant;

Identifiants identifiantsAdmin;
int nombreIdentifiantsAdmin = 1;

void enregistrerPresence(char *matricule) {
    FILE *fichier = fopen("presence.txt", "a");
    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier de présence.\n");
        return;
    }   
       time_t now;
    time(&now);
    struct tm *local = localtime(&now);
    char date_act[20];
    strftime(date_act, sizeof(date_act), "%d-%m-%Y", local);
    struct tm *timeinfo = localtime(&now);
/* 
    // Récupérer la date et l'heure  actuelle
    time_t now = time(NULL);
    struct tm *timeinfo = localtime(&now);
    // Écrire dans le fichier la date et l'heure */
    fprintf(fichier, "%s %s %dh%dmn%ds\n", matricule,date_act, timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);

    fclose(fichier);
}

void marquerPresence() {
    char choix[20];
    printf("Entrez le matricule de l'etudiant à marquer present ('Q' pour quitter) : ");
    scanf("%s", choix);

    while (strcmp(choix, "Q") != 0 && strcmp(choix, "q") != 0) {
       
        FILE *fichier = fopen("etudiant.txt", "r+");
        FILE *fichierPresence = fopen("presence.txt", "r+");
        if (fichier == NULL || fichierPresence == NULL) {
            printf("Erreur lors de l'ouverture du fichier d'etudiants.\n");
            return;
        }

        int present = 0;
        char matricule[10];
        int cpt;
    if(testpresence(choix)==0){
        while (fscanf(fichier,"%s", matricule) != EOF) {
            if (strcmp(matricule, choix) == 0) {
                // Enregistrer la présence dans le fichier
                enregistrerPresence(choix);
                printf("\n--- OK Presence marquee pour l'etudiant de matricule %s\n", choix);
                present = 1;
                cpt++;
            }
        }
     }else printf("vous etes déjà présent .\n");

        fclose(fichier);

        if (!present) {
            printf("--- DÉSOLÉ Matricule invalide. Veuillez reessayer ('Q' pour quitter) : ");
        } else {
            printf("\n--- Entrez le matricule de l'etudiant à marquer present ('Q' pour quitter) : ");
        }

        scanf("%s", choix);
    }
}

int menuAdmin() {
    int choix = 0;
    do {
    
        printf("\t\t\tBienvenue dans le menu de l'administrateur:\n");
        printf("1 -Gestion des étudiants\n");
        printf("2 -Génération de fichiers\n");
        printf("3 -Marquer les présences\n");
        printf("4 -Envoyer un message\n");
        printf("5 -Paramètres\n");
        printf("6 -Deconnexion\n");
        printf("\n-Entrez votre choix : ");
        scanf("%d", &choix);
        if (choix < 1 || choix > 6) {
            printf("Choix invalide. Veuillez entrer un choix entre 1 et 2.\n");
        }
    } while (choix != 6);
    return choix;
}

int menuEtudiant() {
    // Définition du menu de l'étudiant
    int choix = 0;
    do { 
        printf("\t\t\tBienvenue dans le menu de l'apprenant :\n");
        printf("1 -GESTION DES ÉTUDIANTS\n");
        printf("2 -GÉNÉRATION DE FICHIERS\n");
        printf("3 -MARQUER SA PRÉSENCE\n");
        printf("4 -Message (0)\n");
        printf("5 -Déconnexion\n");
        printf("\n-Entrez votre choix : ");
        scanf("%d", &choix);
        if (choix < 1 || choix > 5) {
            printf("Choix invalide. Veuillez entrer un choix entre  1 et 5.\n");
        }
    } while (choix < 1 || choix > 5);
    return choix;
}

// Fonction pour vérifier les identifiants de connexion
int verifierIdentifiants(Identifiants *identifiants, int nombreIdentifiants, char *login, char *motDePasse) {
    for (int i = 0; i < nombreIdentifiants; i++) {
        if (strcmp(identifiants[i].login, login) == 0 && strcmp(identifiants[i].motDePasse, motDePasse) == 0) {
            return 1; // Identifiants valides
        }
    }
    return 0; // Identifiants invalides
}



//-------------------------------------------------------- Main -------------------------------------------------------
int main() {
    
    // Création des fichiers pour stocker les identifiants
    FILE *fichierAdmin = fopen("admin.txt", "r");
    FILE *fichierEtudiant = fopen("etudiant.txt", "r");

    if (fichierAdmin == NULL || fichierEtudiant == NULL) {
        printf("Erreur lors de l'ouverture des fichiers.\n");
        return 1;
    }

    // Variables pour stocker les identifiants
    Identifiants identifiantsAdmin[100]; // Pour stocker jusqu'à 100 identifiants d'administrateur
    Identifiants identifiantsEtudiant[100]; // Pour stocker jusqu'à 100 identifiants d'étudiant

    int nombreIdentifiantsAdmin = 0;
    int nombreIdentifiantsEtudiant = 0;

    // Lecture des identifiants de l'admin
    while (fscanf(fichierAdmin, "%s %s", identifiantsAdmin[nombreIdentifiantsAdmin].login, identifiantsAdmin[nombreIdentifiantsAdmin].motDePasse) == 2) {
        nombreIdentifiantsAdmin++;
    }
    fclose(fichierAdmin);

    // Lecture des identifiants de l'étudiant
    while (fscanf(fichierEtudiant, "%s %s", identifiantsEtudiant[nombreIdentifiantsEtudiant].login, identifiantsEtudiant[nombreIdentifiantsEtudiant].motDePasse) == 2) {
        nombreIdentifiantsEtudiant++;
    }
    fclose(fichierEtudiant);

    int choix = 0;
    int choixMenu;
    char saisieLogin[LONGUEUR_MAX_LOGIN];
    char *saisieMotDePasse = malloc(LONGUEUR_MAX_MDP * sizeof(char)); // Allocation mémoire

    // Authentification
    do { 
        
        printf("---------------- Connexion ----------------\n\n");
        saisieLogin[LONGUEUR_MAX_LOGIN] = '\0';
        printf("----- login : ");
       
        fgets(saisieLogin, LONGUEUR_MAX_LOGIN, stdin);
        saisieLogin[strcspn(saisieLogin, "\n")] = 0;// Supprime le caractère de nouvelle ligne
        if (strlen(saisieLogin) == 0) {
            printf("\nVous avez laissé le champ vide.\n");
            continue;
        }

         printf("----- Mot de passe : ");

        int i = 0, c;
        while (i < LONGUEUR_MAX_MDP - 1 && (c = getch()) != '\n')
        {
            if (c == 127)
            { // ASCII value for backspace
                if (i > 0)
                {
                    printf("\b \b"); // Effacer le caractère précédent
                    i--;
                }
            }
            else
            {
                saisieMotDePasse[i++] = c;
                printf("*");
            }
        }
        saisieMotDePasse[i] = '\0';

        if (strlen(saisieMotDePasse) == 0) {
            printf("\nVous avez laissé le champ vide. Veuillez entrer votre mot de passe.\n");
            continue;
        }

        if (!(verifierIdentifiants(identifiantsAdmin, nombreIdentifiantsAdmin, saisieLogin, saisieMotDePasse)) && !(verifierIdentifiants(identifiantsEtudiant, nombreIdentifiantsEtudiant, saisieLogin, saisieMotDePasse))) {
            printf("\nLogin ou mot de passe invalides.\n");
        }
        if ((verifierIdentifiants(identifiantsAdmin, nombreIdentifiantsAdmin, saisieLogin, saisieMotDePasse))) {
            do {
                printf("\n--------------------------------------------------------------------------\n");
                printf("\t\t\t Menu de l'administrateur:\n");
                printf("--------------------------------------------------------------------------\n");
                printf("1 -Gestion des étudiants\n");
                printf("2 -Génération de fichiers\n");
                printf("3 -Marquer les présences\n");
                printf("4 -Envoyer un message\n");
                printf("5 -Paramètres\n");
                printf("6 -Deconnexion\n");
                printf("\n-Entrez votre choix : ");
                scanf("%d", &choix);
                if(choix==2){
                    do{   
                        printf("\n----------------------------------------------------------------------\n");
                        printf("\t\t\tGestion des étudiants :\n");
                        printf("----------------------------------------------------------------------\n");
                        printf("1-Générer l'ensemble des présences\n");
                        printf("2-Option par dates\n");
                        printf("\nChoisir une option : ");
                        scanf("%d",&choix);
                        if(choix==1){
                               listepresence();
                               printf("fichier bien générer ");
                        }
                        if(choix==2){
                            char dated[20];
                            printf("saisir date: ");
                            scanf("%s",dated);

                             presencepardate(dated);
                             printf("fichier bien générer ");
                        }
                    }while(choix<1 || choix>2);
                }
                 if (choix == 3) {
                  do {
                     marquerPresence();
                    saisieMotDePasse = getpass("\n--- Mot de passe: ");
                }while(strcmp(saisieMotDePasse,"admin")!=0);
        
                }
        if(choix==4){
        do{
            printf("\n----------------------------------------------------------------------\n");
            printf("\t\t\tEnvoyer un message :\n");
            printf("----------------------------------------------------------------------\n");
            printf("\n1-A tout les étudiants \n");
            printf("2-Par classe \n");
            printf("3-Par étudiants \n");
            printf("\n choisir une option :");
            scanf("%d",&choix);
                if(choix==1){
                        char message[100];
                printf("Saisir votre message : ");
                viderTamponEntree(); // Vide le tampon d'entrée avant d'utiliser fgets
                fgets(message, sizeof(message), stdin);

                // Supprimer le caractère de retour à la ligne du tableau de caractères message
                if (message[strlen(message) - 1] == '\n') {
                    message[strlen(message) - 1] = '\0';
                }

                ecriremessage(message);
            }
            if (choix==2){
            char reponse,classe[10];
            do
            { 
                printf("selectionner une classe : ");
                scanf("%s",classe);
                if (strcmp(classe,"devweb")!=0 && strcmp(classe,"refdig")!=0 && strcmp(classe,"devdata")!=0){
                    printf("veuillez saisir une classe qui existe ");
                }else{
                
                    if(strcmp(classe,"devweb")==0){                                                        
                            char message[100];
                printf("Saisir votre message : ");
                viderTamponEntree(); // Vide le tampon d'entrée avant d'utiliser fgets
                fgets(message, sizeof(message), stdin);

                // Supprimer le caractère de retour à la ligne du tableau de caractères message
                if (message[strlen(message) - 1] == '\n') {
                    message[strlen(message) - 1] = '\0';
                }
                    ecriremessagedev(message); 
                }  
                    if(strcmp(classe,"refdig")==0){
                            char message[100];
                printf("Saisir votre message : ");
                viderTamponEntree(); // Vide le tampon d'entrée avant d'utiliser fgets
                fgets(message, sizeof(message), stdin);

                // Supprimer le caractère de retour à la ligne du tableau de caractères message
                if (message[strlen(message) - 1] == '\n') {
                    message[strlen(message) - 1] = '\0';
                }
                    ecriremessageref(message); 
                    }
                        if(strcmp(classe,"devdata")==0){
                                char message[100];
                printf("Saisir votre message : ");
                viderTamponEntree(); // Vide le tampon d'entrée avant d'utiliser fgets
                fgets(message, sizeof(message), stdin);

                // Supprimer le caractère de retour à la ligne du tableau de caractères message
                if (message[strlen(message) - 1] == '\n') {
                    message[strlen(message) - 1] = '\0';
                }
                    ecriremessagedata(message);  
                        }
                }
                printf("voulez vous ajouter une classe :");
                scanf(" %c",&reponse);
            } while (reponse=='o');
            
            } 
             if (choix==3){
                char matricule[100][20],reponse;
                int i=0,n;
                printf("saisir le nombre de matricle à saisir :");
                scanf("%d",&n);
                printf("saisir les  matricules \n");
              do{
                
                scanf("%s",matricule[i]);
                i++;
              }while(i<n);
            
                 
             } 
        } while (choix<1 || choix>3);
            
             }
                if (choix == 6) {
                    printf("Vous êtes déconnecté !\n");
                }
                if (choix < 1 || choix > 6) { 
                    printf("Choix invalide. Veuillez entrer un choix entre 1 et 2.\n");
                }
            } while (choix != 6);
        }
        if ((verifierIdentifiants(identifiantsEtudiant, nombreIdentifiantsEtudiant, saisieLogin, saisieMotDePasse))) {
            int choix = 0;
            do {
                printf("\n--------------------------------------------------------------------------\n");
                printf("\t\t\t Menu de l'apprenant :\n");
                printf("--------------------------------------------------------------------------\n");
            
                printf("1 -MARQUER SA PRÉSENCE\n");
                printf("2 -Message (0)\n");
                printf("3 -Déconnexion\n");
                printf("\n-Entrez votre choix : ");
                scanf("%d", &choix);
                if (choix < 1 || choix > 3) {
                    printf("Choix invalide. Veuillez entrer un choix entre  1 et 5.\n");
                }while(choix<1 || choix>3);
                  if (choix==2){
                 printf("\n--------------------------------------------------------------------------\n");
                 printf("Bienvenue dans votre boite de messagerie ");
                 printf("\n--------------------------------------------------------------------------\n");
                liremessage();
                 
                  FILE *fichier=fopen("presence.txt", "r+");
                    if(fichier==NULL){
                        printf("Erreur.");
                        return 1;
                    } char matricule[20],prenom[20],nom[20],date[20],heure[20],classe[20];
                    while (fscanf(fichier,"%s %s %s %s",matricule,date,heure,classe)!=EOF) {
                         if(strcmp(saisieLogin,matricule)==0){
                            if(strcmp(classe,"devweb")==0){
                               liremessagedev(); 
                        }
                         if(strcmp(classe,"refdig")==0){
                              liremessageref(); 
                        } 
                         if(strcmp(classe,"devdata")==0){
                              liremessagedata(); 
                       }
                     }
                    }  
                    fclose(fichier); 
                 
                  }
                   /* if(strcmp(saisieLogin,"layediop")==0){
                        liremessagediop();
                    }if(strcmp(saisieLogin,"ndiop")==0){
                       liremessagendiop();
                    }if(strcmp(saisieLogin,"sdiop")==0){
                         liremessagesdiop();
                    }if(strcmp(saisieLogin,"layediop")==0){
                        liremessageldiop();
                    }  */
                if (choix == 1) {
                    if (testpresence(saisieLogin)==1){
                        printf("Désolé vous etes déjà présent .\n");
                    }else{
                         enregistrerPresence(saisieLogin);
                printf("\n--- OK Presence marquee pour l'etudiant de matricule %s\n", saisieLogin);
                    }
                }
                
                if (choix == 3) {
                    printf("Vous êtes déconnecté !\n");
                    saisieLogin[LONGUEUR_MAX_LOGIN] = 'a';
                }
            } while (choix<1 || choix >5);
        } getchar();
    } while (!(verifierIdentifiants(identifiantsAdmin, nombreIdentifiantsAdmin, saisieLogin, saisieMotDePasse)) || !(verifierIdentifiants(identifiantsEtudiant, nombreIdentifiantsEtudiant, saisieLogin, saisieMotDePasse)));

    return 0;
}