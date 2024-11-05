#ifndef prototype_c
#define prototype_c
int sommechiffre(int);
int validite();
int nbrpremier();
void triangle_iso(int);
void triangle_isovert(int);
void triangle_isojaune(int);
void triangle_isobleu(int);
void triangle_rectangle(int);
void carre(int);
void carrevert(int);
void carrejaune(int);
void carrebleu(int);
void rectangle(int,int);
void consecutif();
void fusion(int,int);
int inversion(int);

#endif
#include <stdio.h>
#include <unistd.h>
int validite(){
    int n;
   do{
        printf("saisir la hauteur: ");
        scanf("%d",&n);
        if (n<3){
          printf("saisir un nombre superieur à 3 !\n");
        }
    }while(n<3);
      return n;

}
 int sommechiffre(int n){
    int q,som=0;
    q=n;
    while(n!=0){
        som=som+n%10;
        n=n/10;
    }
    if(som==q){
        return 1;
    }else 
    return 0;
 }
 int nbrpremier(){
  int i,k=0;
  int n=(rand()%100-1);
     
 /* do{
     
    for(i=2;i<=(n-1);i++){
      if(n%i==0){
        k++;
      }
    }  
   }while(k!=0); */

      return n;
}
  //int aleatoire(){
  //  return (rand()%50-1);
 // } 
      void triangle_iso(int hauteur) {
        int longueur=-1,espace,i;
        while(hauteur>0){
          printf("\t\t\t\t\t");
          espace=hauteur-1;
           while(espace>0){
            printf("  ");
            espace--;
           } longueur=longueur+2;
              i=0;
              
           while (i<longueur){
            printf(" *");
            i++;
           }  
           hauteur--; 
           printf("\n");
         }
    }        
       void triangle_rectangle(int hauteur) {
        int base=0,i;
  
        while (hauteur>0){
          printf("\t\t\t\t\t");
          base=base+1;
          i=0;
          while(i<base){
            printf(" *");
            i++;
          }  hauteur--;
            printf("\n");
        }
       }     
              void carre(int cote){
                int i,j;
                for(i = 0; i<cote; i++){
                 printf("\t\t\t\t\t");
                   for (j = 0; j<cote; j++){
                      printf(" *");
                   }  
                      printf("\n");
                  }
            }      
       void rectangle(int longueur,int largeur) {
         int i,j;
          for(i = 0; i<largeur; i++){
            printf("\t\t\t\t\t");
              for (j = 0; j<longueur; j++){
                printf(" *");
                fflush(stdout);
                usleep(500000);
              }    
                printf("\n");
           }
       }                                                        
   

  void triangle_isovert(int hauteur) {
        int longueur=-1,espace,i;
        while(hauteur>0){
          printf("\t\t\t\t\t");
          espace=hauteur-1;
           while(espace>0){
            printf("  ");
            espace--;
           } longueur=longueur+2;
              i=0;
              
           while (i<longueur){
            printf(" *");
            printf("\033[1;32m");
            i++;
           }  
           hauteur--; 
           printf("\n");
         }
    }    void triangle_isojaune(int hauteur) {
        int longueur=-1,espace,i;
        while(hauteur>0){
          printf("\t\t\t\t\t");
          espace=hauteur-1;
           while(espace>0){
            printf("  ");
            espace--;
           } longueur=longueur+2;
              i=0;
              
           while (i<longueur){
            printf(" *");
            printf("\033[1;33m");
            i++;
           }  
           hauteur--; 
           printf("\n");
         }
    }            
        void triangle_isobleu(int hauteur) {
        int longueur=-1,espace,i;
        while(hauteur>0){
          printf("\t\t\t\t\t");
          espace=hauteur-1;
           while(espace>0){
            printf("  ");
            espace--;
           } longueur=longueur+2;
              i=0;
              
           while (i<longueur){
            printf(" *");
            printf("\033[1;31m");
            i++;
           }  
           hauteur--; 
           printf("\n");
         }
    }        
       void carrevert(int cote){
                int i,j;
                for(i = 0; i<cote; i++){
                 printf("\t\t\t\t\t");
                   for (j = 0; j<cote; j++){
                      printf(" *");
                      printf("\033[1;32m");
                   }  
                      printf("\n");
                  }
            }  void carrejaune(int cote){
                int i,j;
                for(i = 0; i<cote; i++){
                 printf("\t\t\t\t\t");
                   for (j = 0; j<cote; j++){
                      
                      printf("\033[1;33m");
                      printf(" *");
                   }  
                      printf("\n");
                  }
            }      
              void carrebleu(int cote){
                int i,j;
                for(i = 0; i<cote; i++){
                 printf("\t\t\t\t\t");
                   for (j = 0; j<cote; j++){
                      printf(" *");
                      printf("\033[1;31");
                   }  
                      printf("\n");
                  }
            }   
                 void consecutif(){
                    int const n=5;
                    int t[]={1,2,3,4,5};
                    int  i,k=0;
                    for(i=0;i<n;i++){
                      if(t[i]<t[i+1]){
                        k++;
                      }
                    }   if(k==n){
                      printf("vrai \n");
                    }else printf("faux \n");
                  }  
                 /*void fusion(int t1,int t2){
                    int const n=3,m=3;
                    int k,j=0,i=0,t[n+m];

                    for(k=0;k<n;k++){
                      t[k]=t1[i];
                      i++;
                    }  
                      for(k=n+1;k<=n+m;k++){
                           t[k]=t2[j];
                           j++;
                      }

                  }  */
                    
                      

                