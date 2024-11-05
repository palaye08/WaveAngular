#ifndef biblio_c
#define biblio_c
void saisi(int t[],int *n);
void affiche(int t[],int n);
void tri_croissant(int t[],int *n);
void tri_decroissant(int t[],int *n);
char choix_tri();
int menu();
void transfert(int t[],int *n,int tab[],int *m);
void affiche_trans(int tab[],int m);
void saisi_tri(int t[],int *n);
void insertion(int t[],int *n);
void suppression(int t[],int *n);
int menu2();
void saisir(int cpt,int t[],int *n);
void menuEtu();


#endif
#include <stdio.h>

  int menu(){
    int choix;

      printf("1-saisir un tebleau d'entiers :\n");
      printf("2-trier le tableau : \n");
      printf("3-transfert des valeurs >10 :\n");
      printf("4-Quitter \n\n");
      printf("choisir une option :");
      scanf("%d",&choix);

      return choix;
   }
   char choix_tri(){
    char option;
    printf("a-tri croissant \n");
    printf("b-tri décroissant \n");
    printf("choisir une methode:");
    scanf(" %c",&option);
    return option;
    
   }
   void saisi(int t[],int *n){
        int a,i=0;
        char reponse='o';
       while(reponse=='o'){  
           printf("saisir un nombre : ");
           scanf("%d",&a);
           if(a%2==0){
            t[i]=a; i++;
           }
           
           printf("voulez vous continuer ? :");
           scanf(" %c",&reponse);
       }
       *n=i;
      
   
   }  
  void tri_croissant(int t[],int *n){
    int temp;
    for (int i=0;i<*n;i++){
          for(int j=i+1;j<*n;j++){
            if(t[i]>t[j]){
                temp=t[i];
                t[i]=t[j];
                t[j]=temp;
            }
          }
        }  
   }
   
   void tri_decroissant(int t[],int *n){
    int temp,tab[10000],m;
    for (int i=0;i<*n;i++){
          for(int j=i+1;j<*n;j++){
            if(t[i]<t[j]){
                temp=t[i];
                t[i]=t[j];
                t[j]=temp;
            }
          }
        }  
   } 
   void transfert(int t[],int *n,int tab[],int *m){
      int j=0;
      for(int i=0;i<*n;i++){
        if(t[i]>10){
          tab[j]=t[i];
          j++;
        }
      }  *m=j;
   }
   
   void affiche(int t[],int n){
   
      for ( int i = 0; i < n; i++){
        printf("[%d]\n",t[i]);
      }
   }   
    void affiche_trans(int tab[],int m){
    for ( int j = 0; j< m; j++){
        printf("[%d]\n",tab[j]);
      }
   }  
    void saisi_tri(int t[],int *n){
          int a,i=0,cpt=1,temp;
          printf("donnez vos valeurs :\n");
          do{
             scanf("%d",&a);
           if (a!=0){
            t[i]=a;
            if(cpt==0){
              for(int k=0;k<*n;k++){
                for(int j=k+1;j<*n;j++){
                  if(t[k]>t[j]){
                    temp=t[k];
                    t[k]=t[j];
                    t[j]=temp;
                  }
                }
              }
            }  cpt=0; i++; *n=i+1;
           }
          }while(a!=0);
          *n=i;
   }   
     void insertion(int t[],int *n){
        int i,k,a;
        printf("saisir la valeur à inserer : ");
        scanf("%d",&a);
         for(i=0;i<*n;i++){
          if(a<t[i]){
            k=i;
            break;
          }
         }  (*n)++;
          for(i=*n-1;i>k;i--){
            t[i]=t[i-1];
          } t[k]=a; 
     } 
      void suppression(int t[],int *n){
        int i,k,a;
        printf("saisir la valeur à supprimer: ");
        scanf("%d",&a);
        for(i=0;i<*n;i++){
          if(a==t[i]){
            k=i;
            break;
          }
        }  
          for(i=k;i<*n;i++){
            t[i]=t[i+1];
          } (*n)--;
     }  
        int menu2(){
          int choix;
          printf("1-saisir en triant \n");
          printf("2-insérer une valeur \n");
          printf("3-supprimer une valeur \n");
          printf("4-Quitter \n");
          printf("choisir une option : ");
          scanf("%d",&choix);
          return choix;
        }
       
/*   void saisir(int t[],int *n){
    char reponse='o';
    int i=0,a;
   do{ 
        
        if(reponse=='o'){
            printf("saisir un nombre :");  
            scanf("%d",&a);
            if(a%2==0){
                t[i]=a;
                i++;
            } 
 }   printf("voulez vous continuer : ");
        scanf(" %c",&reponse); 


   }while(reponse=='o');
   *n=i;
}    */
void saisir(int cpt,int t[],int *n){
    char reponse='o';
    int i=0,a;
   do{ 
        
        if(reponse=='o'){
            printf("saisir un nombre :");
            scanf("%d",&a);
            if(a%2==0){
                t[i++]=a;

             } else{
                printf("veuillez saisir un nombre pair \n");
            }
             if (i==cpt){
              break;
             }
 }   printf("voulez vous continuer : ");
        scanf(" %c",&reponse); 


   }while(reponse=='o'&& i<cpt);
   *n=i;
}  