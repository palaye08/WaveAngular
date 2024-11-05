#include <stdio.h>

int autoIdEtudiant = 0;
typedef struct
{
    int j, m, a;

} DATE;

typedef struct
{
    int id;
    char matricule[10];
    char nom[50];
    char prenom[50];
    DATE dn;

} ETUDIANT;

typedef struct                    
{
    int id;
    char libelle[50];
    int coef;

} MATIERE;

typedef struct
{
    char libelle[50];
    MATIERE matieres[10];
    ETUDIANT etudiants[100];
    int nbrEtudiant;
    int nbrMatiere;
    enum niveau
    {
        L1 = 1,
        L2,
        L3,
        M1,
        M2,
        M3
    };

} CLASSE;

typedef struct
{
    ETUDIANT etudiant;
    MATIERE matiere;
    float note;
    enum type
    {
        DEVOIR,
        EXAMEN
    };

} EVALUATION;
// prototype
void afficherDate(DATE);
DATE saisieDate(void);
int saisirInt(int, int, char[]);
ETUDIANT saisirEtudiant();
void afficheEtudiant(ETUDIANT e);
MATIERE  saisiMatiere();
void afficheMatiere(MATIERE m);
int main()
{
    enum jour{LUNDI = 1,MARDI, MERCREDI, JEUDI,VENDREDI,SAMEDI,DIMANCHE};
    enum jour j;
    j = LUNDI;
    //afficherDate(saisieDate());
    saisirEtudiant();

    return 0;
}
DATE saisieDate(void)
{
    DATE d;
    puts("Entrez une date [j,m,a]");
   // scanf("%d%d%d", &d.j, &d.m, &d.a);
   d.j = saisirInt(1, 31, "entrez le jour");
   d.m = saisirInt(1, 12, "entrez le mois");
   d.a = saisirInt(1, 2024, "entrez l'année");
    return d;
}
void afficherDate(DATE a)
{
    printf("la date est %d-%d-%d", a.j, a.m, a.a);
}
int saisirInt(int min, int max, char msg[])
{
    int x;
    do
    {
        puts(msg);
        scanf("%d", &x);
    } while (x<min || x>max);

    return x;
}
ETUDIANT saisirEtudiant(){
    ETUDIANT e;
    e.id = ++autoIdEtudiant;
    puts("Donnez le nom :");
    gets(e.nom);
    puts("Donnez le prénom :");
    gets(e.prenom);
    e.dn = saisieDate();
    return e;

}  
  void afficheEtudiant(ETUDIANT e){
      printf("id= %d",e.id);
      printf("nom: %s",e.nom);
      printf("prenom: %d",e.prenom);
      afficherDate(e.dn);
  }
      MATIERE  saisiMatiere(){
         MATIERE m;
          m.id=++autoIdEtudiant;
          printf("saisir le libellé :");
          gets(m.libelle);
          printf("saisir le coef: ");
          scanf("%d",&m.coef);
          return m;
      }   
 void afficheMatiere(MATIERE m){
    printf("id= %d",m.id);
    printf("matiere= %s",m.libelle);
    printf("coef= %d",m.coef);
 }   
  void genereMatricule(char matricule[],ETUDIANT *e){
      sp
  }