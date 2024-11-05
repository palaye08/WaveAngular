#include <stdio.h>
#include <time.h>
int main (){
    time_t now;
    time(&now);
    struct tm *local=localtime(&now);
    char date_act[20];
    strftime(date_act,sizeof(date_act),"%d-%m-%Y",local);
    printf("la date est : %s\n",date_act);
    return 0;
}