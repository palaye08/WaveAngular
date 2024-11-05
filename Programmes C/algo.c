#include <stdio.h>
int main()
{
    int i = 1, n;
    do
    {
        printf("saisir un nombre ");
        scanf("%d", &n);
    } while (n<0);
    
    while (n != 0)
    {
        n = (n / 10)-1;
        i++;
    }
    printf("le nombre de chiffre est : %d\n", i);
    return 0;
}
