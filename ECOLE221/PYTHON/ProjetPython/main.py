import pandas as pd
import csv
import os
from validation.validate import (
    valider_ligne,
    formater_date,
    formater_classe
)
from service import (
    afficher_informations,
    rechercher_par_numero,
    afficher_cinq_premiers,
    ajouter_information,
    modifier_information_invalide
)

def lire_donnees_csv(chemin_fichier='donnees_eleves.csv'):
    """Lit les données depuis un fichier CSV"""
    try:
        df = pd.read_csv(chemin_fichier)
        print("Colonnes dans le fichier:", df.columns.tolist())
        return df
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier: {str(e)}")
        return None

def valider_donnees(df):
    lignes_valides = []
    lignes_invalides = []
    # Nettoyer les noms de colonnes
    df.columns = [col.strip() for col in df.columns]
    
    for _, row in df.iterrows():
        ligne = row.to_dict()
        erreurs = valider_ligne(ligne)
        if erreurs:
            ligne['erreurs'] = erreurs
            lignes_invalides.append(ligne)
        else:
            # Formatter les données valides
            ligne['Date de naissance'] = formater_date(ligne['Date de naissance'])
            ligne['Classe'] = formater_classe(ligne['Classe'])
            lignes_valides.append(ligne)
    return lignes_valides, lignes_invalides

def afficher_menu():
    """Affiche le menu principal"""
    print("\n" + "="*50)
    print("MENU PRINCIPAL")
    print("="*50)
    print("1. Afficher les informations")
    print("2. Rechercher une information par numéro")
    print("3. Afficher les cinq premiers")
    print("4. Ajouter une information")
    print("5. Modifier une information invalide")
    print("0. Quitter")
    print("="*50)

def menu_principal(lignes_valides, lignes_invalides):
    """Gestion du menu principal"""
    while True:
        afficher_menu()
        choix = input("\nEntrez votre choix (0-5): ")
        
        if choix == "0":
            print("Au revoir!")
            break
        
        elif choix == "1":
            type_info = input("Afficher les informations valides ou invalides? (V/I): ")
            afficher_informations(
                lignes_valides, 
                lignes_invalides, 
                "valide" if type_info.upper() == "V" else "invalide"
            )
        
        elif choix == "2":
            numero = input("Entrez le numéro à rechercher: ")
            rechercher_par_numero(lignes_valides, lignes_invalides, numero)
        
        elif choix == "3":
            type_info = input("Afficher les 5 premiers éléments valides ou invalides? (V/I): ")
            afficher_cinq_premiers(
                lignes_valides, 
                lignes_invalides, 
                "valide" if type_info.upper() == "V" else "invalide"
            )
        
        elif choix == "4":
            lignes_valides, lignes_invalides = ajouter_information(lignes_valides, lignes_invalides)
        
        elif choix == "5":
            lignes_valides, lignes_invalides = modifier_information_invalide(lignes_valides, lignes_invalides)
        
        else:
            print("Choix invalide. Veuillez réessayer.")

"""Fonction principale"""
def main():
 
    # Lecture des données
    df = lire_donnees_csv()
    if df is not None:
        # Validation des données
        lignes_valides, lignes_invalides = valider_donnees(df)
        
        # Affichage des résultats initiaux
        print(f"\nNombre de lignes valides: {len(lignes_valides)}")
        print(f"Nombre de lignes invalides: {len(lignes_invalides)}")
        
        # Affichage des exemples de lignes invalides
        print("\nExemple de lignes invalides avec leurs erreurs:")
        for ligne in lignes_invalides[:10]:  # Afficher les 10 premières lignes invalides
            print(f"\nLigne: {ligne['Numero']} - {ligne['Nom']} {ligne.get('Prénom', '')}")
            print(f"Erreurs: {ligne['erreurs']}")
        
        # Lancement du menu
        menu_principal(lignes_valides, lignes_invalides)

if __name__ == "__main__":
    main()