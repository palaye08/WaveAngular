 #include <stdio.h>
int main (){
 int h,m,s,h1,m1,s1,maxh,maxm,maxs;
    printf("saisir votre première heure : \n");
    scanf("%d %d %d",&h,&m,&s);
    printf("saisir votre dexième heure : \n");
    scanf("%d %d %d",&h1,&m1,&s1);

    if(h<0||m<0||s<0||h>23||m>59||s>59||h1<0||m1<0||s1<0||h1>23||m1>59||s1>59){
        printf("heure invalide");
    }else{
      if(h==h1){
        if(m>m1){
            maxh=h; maxm=m; maxs=s;
        }else {

            if(m1>m){
                maxh=h1; maxm=m1; maxs=s1;
            }else{
                if(s>s1){
                  maxh=h; maxm=m; maxs=s;
                }else{
                    if(s1>s){
                        maxs=s1; maxm=m1; maxh=h1;
                    }
                }
            }
        }
           
      }else{
       if(h>h1){
        maxh=h; maxm=m; maxs=s;
       }else{
        maxh=h1; maxm=m1; maxs=s1;
      }
     }  
      printf("la plus grande heure : %d %d %d\n",maxh,maxm,maxs);
      
      
    
    return 0;
}
}