typedef struct 
{
    float x;
    float y;
}point;
#ifndef enregistrement_c
#define enregistrement_c
point saisi();
float racine(point A,point B);
#endif
#include <stdio.h>
#include <math.h>


point saisi(){
    point A;
    printf("saisir les coordonnees du point : ");
    scanf("%f %f",&A.x,&A.y);
    return A;
} 
 float racine(point A,point B){

return sqrt( (A.x-B.x)*(A.x-B.x) + (A.y-B.y)*(A.y-B.y));

}