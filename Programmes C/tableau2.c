#include <stdio.h>
#include<stdlib.h>
#include "biblio.c"
int main (){
    int t[1000],n;
    
      if(menu2()==1){
      saisi_tri(t,&n);
      affiche(t,n);
      }else{
      if(menu2()==2){
        insertion(t,&n);
        affiche(t,n);
        } 
      }
       if(menu2()==3){
       suppression(t,&n);
       affiche(t,n);
      } 
      if(menu2()==4){
        return 0;
       }
      
    
    return 0;
}