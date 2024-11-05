#include <stdio.h>
void bisextille1 (int);
void bisextille1(int annee){
      if(annee%4==0 && annee%100!=0 || annee%400==0){
        printf("l'annee est bisextille :\n");
      }else{
        printf("l'annee n'est pas bisextille :\n");
      }
       
}
int bisextille (int);
int bisextille(int annee){
  if(annee%4==0 && annee%100!=0 || annee%400==0){
    return 1;
  }else return 0;
}
int ctrlsaisie ();
int ctrlsaisie (){
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

int main(){
    bisextille1(ctrlsaisie()); return 0;
}