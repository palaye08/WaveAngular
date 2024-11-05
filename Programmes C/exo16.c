/*Faire un programme qui saisit une date (jour, mois et année) puis détermine et affiche la date
qu’il faisait il y a N jours.N est saisi au clavier et est positif.*/
#include <stdio.h>
int main(){
  int mois,jour,annee,n,type_annee; 
   printf("saisir la date : ");
   scanf("%d %d %d",&jour,&mois,&annee);
  if(jour<1||jour>31||mois<1||mois>12 ){
    printf("la date est invalide. \n");
    }
   printf("saisir le nombre de jour : ");
   scanf("%d",&n);
   if(n<0){
    printf("saisir une date valide :");
   }else{ if(annee%4==0&&annee%100!=0|| annee%400==0){
    type_annee=366;
   }else{
    type_annee=365;
   }
    if(n>type_annee){
        annee=annee-n/type_annee;
        n=n%type_annee;
     } jour-=n%31;
        mois-=n/31;
        if(jour<=0){
          jour=jour+31;
          mois--;
        }  if(mois<=0){
          mois=mois+12;
          annee--;
        }  if(mois==1||mois==3||mois==5||mois==7||mois==8||mois==10||mois==12){
            if(jour>30)
            jour=31;
        }else{
            if(jour==31)
            jour=30;
            /*if(mois==2 && type_annee==366){
               jour=29;
            }else{
                jour=28;
            }*/
        }
        printf("la date est : %d /%d /%d\n",jour,mois,annee);
   }
return 0;
}