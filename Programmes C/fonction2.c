#include <stdio.h>
//Faire un sous programme qui reçoit une année et un mois puis détermine et affiche le nombre de
//jours de ce mois dans cette année .

int nbjour(int,int);
void nbjour1(int,int);
 int saisie1();
 int saisie2();

 int saisie1(){
     int annee;
   do{
        printf("saisir une annee : ");
        scanf("%d",&annee);
        if (annee<=0){
          printf("saisir un bonne annee !\n");
        }
    }while(annee<=0);
      return annee;

 }   
 int saisie2(){
    int mois;
   do{
        printf("saisir un mois : ");
        scanf("%d",&mois);
        if (mois<1 || mois>12){
          printf("saisir un bon mois !\n");
        }
    }while(mois<1 || mois>12);
      return mois;
}   
   int nbjour(int annee,int mois){
     
       /* if(mois%2!=0 || mois==8){
          return 31;
        }else{
          if(mois==2){
          if(annee%4==0 && annee%100!=0 || annee%400==0){
            return 29;
           }else return 28;
           
           } else return 30;
        }

  */
 switch (mois)
 {
 case 1:3,5 ,7 ,8 ,10 ,12;
  return 31;
  case 2: if(bisextille(annee)){
    return 29;

  }else return 28;
  case 4:6,9,11;
  return 30;

 

 }
   }  
      void nbjour1(int annee,int mois){
        if(mois%2!=0 || mois==8){
          printf("le nombre de jour :%d\n",31);
        }else{
          if(mois==2){
          if(annee%4==0 && annee%100!=0 || annee%400==0){
            printf("le nombre de jour :%d\n",29);
           }else{
            printf("le nombre de jour :%d\n",28);
           }
           
           } else {
           printf("le nombre de jour :%d\n",30);
           }

        }

      }
      int main(){
        nbjour1(saisie1(),saisie2());
        return 0;
      }
      int bisextille(int annee){
  if(annee%4==0 && annee%100!=0 || annee%400==0){
    return 1;
  }else return 0;
}
