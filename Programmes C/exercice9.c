#include <stdio.h>
//#include <math.h>
int main(){
int heuredepart,minutedepart,heurearrivee,minutearrivee,heure,minute;
printf("donner l'heure de départ : ");
scanf("%d",&heuredepart);
printf("donner la minute de départ: ");
scanf("%d",&minutedepart);
printf("donner l'heure d'arrivée : ");
scanf("%d",&heurearrivee);
printf("donner minute d'arrivée: ");
scanf("%d",&minutearrivee);
heure=heurearrivee-heuredepart;
  si(minutedepart > minutearrivee){ 
  minute=minutearrivee-minutedepart+60;
  }
  sinon{
  minute=minutearrivee-minutedepart;
  }
  si(heurearrivee>heuredepart){
heure=heurearrivee-heuredepart
  sinon{
  heure=heurearrivee-heuredepart+24
  }
printf("la durée est de : %d h %d min",heure,minute);


return 0;
}
