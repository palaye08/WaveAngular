#include <stdio.h>
#include<stdlib.h>
//#include "prototype.c"
#include "biblio.c"
int main(){
    int t[1000],n,tab[1000],m; 
    
    if(menu()==1){
   saisi(t,&n);
 if(menu()==2){
    if(choix_tri()=='a'){
        tri_croissant(t,&n);
    }else {tri_decroissant(t,&n);}
       affiche(t,n);
    if(menu()==3){
        transfert(t,&n,tab,&m);
    }
 }
   }   
     affiche_trans(tab,m);
 
     return 0;
}