#include <stdio.h>
int main (){
   menu:; 
      int K=0;
    int choix,note,min,max,cpt=1,n,nbnote,min1=20,min2=20; 
   while(K==0) {
      printf("|||||||||||||||||||||||||||||||||||||\n\n");
     printf("<0000>1-afficher le min et max serie de note :\n<0000>2-les deux notes les plus petites :\n<0000>3-Moyenne des notes :\n<0000>4-les deux nombres les plus grands :\n<0000>5-Quitter\n\n");

    do{ 
        printf("veuillez choisir votre option :");
        scanf("%d",&choix);
      if(choix<1||choix>5){
        printf("veuillez faire le bon choix ce choix n'existe pas:\n ");
      }
    } while(choix<1 || choix>5);
    if(choix==1){
            printf("donner une note :\n");
            scanf("%d",&note);
    
       while (note>=0){
        if(cpt){
          min=max=note;
          cpt=0;
       }
        if(note<=20){
                if(note<min){
                    min=note;
                } if(note>max){
                    max=note;
                }

                }else{
                      printf("saisir une bonne note : \n");
                }
                      scanf("%d",&note);
        } 
        printf("le maximum est :%d\n",max);
        printf("le minimum est :%d\n",min);
        goto menu;
       }  
        
       if(choix==2){
          do {
            printf("saisir le nombre de note : ");
            scanf("%d",&n);
          }while(n<2);
             nbnote=0;
            do{
               printf("saisir vos notes :\n");
               scanf("%d",&note); 
                if(note>=0 && note<=20){
                 if(note<min1){
                   min2=min1;
                    min1=note;
                }else{
                 if(note<min2){
                   min2=note;
                }
              }
               }else{
               printf("saisir une bonne valeur : ");
             }
               nbnote++;    
           }while(nbnote<n);
         printf("les notes les plus petites sont : %d et %d\n",min1,min2); 

             goto menu;
     }   
          if(choix==3){
           int i=1;
           float somme=0;
           char reponse;  
                    
               do{  
                    printf("saisir la note %d: \n",i);
                    scanf("%d",&note);

                   if(note>=0 && note<=20){
                   somme=somme+note;
                   i++; 
                  }  printf("voulez vous continuer de saisir :");
                     scanf("%s",&reponse); 
                
               }while(reponse=='o');
               somme=somme/(i-1);
               printf("la moyenne est : %f\n",somme);
               goto menu;
               
           }    if(choix==4){
                printf("choisir une manière d'arret \n\n");
                printf("_//_1-Arret par un nombre négatif :\n");
                printf("_//_2-Arret par nombre de note  :\n");
                printf("_//_3-Arret par réponse oui ou non :\n");
                printf("_//_4-RETOUR :\n\n");
                 do{ 
                   printf("veuillez choisir votre option :");
                   scanf("%d",&choix);
                   if(choix<1||choix>4){
                   printf("veuillez faire le bon choix ce choix n'existe pas:\n ");
                   }
                 }while(choix<1 || choix>4);
                 
                 if(choix==1){
                  int max1=0,max2=0;
                  printf("saisir vos notes :\n ");
                    do{  scanf("%d",&note);
                     
                     if(note>=0 && note<=20){
                      if(note>max1){
                        max2=max1,
                        max1=note;
                      } else{
                         if(note>max2){
                           max2=note;
                          }
                       }
                     }  
                      
                   }while (note>=0);

                    printf("les plus grandes notes sont : %d et %d\n",max1,max2);
                    goto menu;
                  }  
                      if(choix==2){ 
                         do{
                           printf("saisir le nombre de note : ");
                           scanf("%d",&n);
                           
                         }while(n<2);
                                   int max1=0,max2=0;
                                   nbnote=0;

                         printf("saisir vos notes :\n ");
                            
                       do{  
                             scanf("%d",&note);
                      
                           if(note>=0 && note<=20){
                            if(note>max1){
                               max2=max1,
                               max1=note;
                            } else{
                              if(note>max2){
                              max2=note;
                             }
                           }
                                   nbnote++;   
                        }   
                      
                       }while (nbnote<n);
                         
                         printf("les plus grandes notes sont : %d et %d\n",max1,max2);
                         goto menu;
            
                  }     
                         if(choix==3){ 
                          int max1=0,max2=0;
                           char reponse; 
                               printf("saisir vos notes : \n");
                           do{  
                                 scanf("%d",&note);
                     
                                  if(note>=0 && note<=20){
                                   if(note>max1){
                                     max2=max1,
                                     max1=note;
                                  } else{
                                    if(note>max2){
                                        max2=note;
                                }
                              }
                            }      printf("voulez vous continuer de saisir :");
                                    scanf("%s",&reponse);     
                      
                          }while (reponse=='o');
                               
                               printf("les plus grandes notes sont : %d et %d\n",max1,max2);
                                goto menu;
 
                         }
                            if(choix==4){
                              goto menu;
                            }
                 

           }         
                        if(choix==5){
                                K=1;
                       }
               
      }   
  
  
  return 0; 
  }