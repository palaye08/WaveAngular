#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void menuAdmin();
void menuEtu();
int menuadmin();
typedef struct
{
    char login[20];
    char password[20];
} identifiant;
   
int verifieIdent(identifiant identifie[],int nbridents,char login[],char password[]){
    /*identifiant ident1,ident2;
    strcpy(ident1.login,"admin");
    strcpy(ident1.password,"passer123");
    strcpy(ident2.login,"layediop");
    strcpy(ident2.password,"passer123");
    identifiant identifies[2];
    identifies[0]=ident1;
    identifies[1]=ident2;*/
    

    for (int i=0;i<nbridents;i++){
        if(strcmp(identifie[i].login,login)==0 && strcmp(identifie[i].password,password)==0){
            return 1;
        }else return 0;
    }
}

int main(){
  /* identifiant  identifiant1 , identifiant2;
   strcpy(identifiant1.login,"admin");
   strcpy(identifiant1.password,"admin");
   strcpy(identifiant2.login,"layediop");
   strcpy(identifiant2.password,"passer123");*/
   identifiant identifiant1,identifiant2;

FILE *ficEtu=fopen("etudiant.txt","r");

if (ficEtu==NULL){
    printf("Erreur.");
    return 1;}
 fscanf(ficEtu,"%s %s",identifiant2.login,identifiant2.password);
    fclose(ficEtu);
FILE *ficAdmin=fopen("admin.txt","r");

if (ficAdmin==NULL){
    printf("Erreur.");
    return 1;}
 fscanf(ficAdmin,"%s %s",identifiant1.login,identifiant1.password);
    fclose(ficAdmin);


   identifiant identifies[20];
   char login[20];
   char password[50];
  

  do
    {
        printf("Saisir login : ");
        fgets(login,sizeof(login), stdin);
        if (strlen(login) <= 1)
        {
            printf("Le login est obligatoire.\n");
        }
    } while (strlen(login) <= 1);
 

   do
    {
        printf("Saisir password : ");
        fgets(password,sizeof(password), stdin);
        if (strlen(password) <= 1)
        {
            printf("Le mot de passe est obligatoire.\n");
        }
    } while (strlen(password) <= 1);

      if(strcmp(identifiant1.login,login) == 0 && strcmp(identifiant1.password,password) == 0){
       menuadmin();
      } else if(strcmp(identifiant2.login,login) == 0 && strcmp(identifiant2.password,password) == 0 ){
       menuEtu();
      } else printf("identifiant incorrect \n");
 
  /*char matricule[10];
  
  char matinitiale[10],prend[10];
  strcpy(matinitiale,"mat_01");
    if (menuadmin()==3){
       
      do{
        printf("saisir votre matricule :\n");
        fgets(matricule,10,stdin);
          
      } while (strlen(matricule)<=1);
      
     
       if (strcmp(matricule,matinitiale)==0){
         printf("votre presence est marquer \n");
         FILE *fiche=fopen("presence.txt","w");
         if(fiche==NULL){
            printf("erreur ");
            return 1;
         }  char marquer[]="present";
            
           fprintf(fiche,"%s",marquer);    
           fclose(fiche);
       }else 
            printf("veuillez saisir un matricule conforme \n");
          
    }   
     */
  
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
int menuadmin () {
    int choix = 0;
    do {
        printf("--------------------------------------------------------------------------\n");
        printf("\t\t\tBienvenue dans le menu de l'administrateur:\n");
        printf("--------------------------------------------------------------------------\n");
        printf("1 ---------- GESTION DES ÉTUDIANTS\n");
        printf("2 ---------- GÉNÉRATION DE FICHIERS\n");
        printf("3 ---------- MARQUER LES PRÉSENCES\n");
        printf("4 ---------- ENVOYER UN MESSAGE\n");
        printf("5 ---------- Quitter\n");
        printf("\n---------- Entrez votre choix : ");
        scanf("%d", &choix);
        if (choix < 1 || choix > 5) {
            printf("Choix invalide. Veuillez entrer un choix entre  1 et 5.\n");
        }
    } while (choix < 1 || choix > 5);
    return choix;
 }
