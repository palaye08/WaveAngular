from validation.validate import valider_ligne, formater_date, formater_classe
import pandas as pd

def afficher_informations(lignes_valides, lignes_invalides, type_info="valide"):
    """Affiche les informations valides ou invalides selon le choix"""
    lignes = lignes_valides if type_info.lower() == "valide" else lignes_invalides
    
    if not lignes:
        print(f"Aucune information {type_info} trouvée.")
        return
    
    print(f"\nListe des informations {type_info}s:")
    for ligne in lignes:
        print("\n" + "="*50)
        print(f"Numéro: {ligne['Numero']}")
        print(f"Nom: {ligne['Nom']}")
        print(f"Prénom: {ligne.get('Prenom', ligne.get('Prénom', ''))}")
        print(f"Date de naissance: {ligne.get('Date de naissance', '')}")
        print(f"Classe: {ligne['Classe']}")
        print(f"Notes: {ligne['Note']}")
        if type_info.lower() == "invalide" and 'erreurs' in ligne:
            print(f"Erreurs: {ligne['erreurs']}")

def rechercher_par_numero(lignes_valides, lignes_invalides, numero):
    """Recherche une information par son numéro"""
    for ligne in lignes_valides + lignes_invalides:
        if ligne['Numero'] == numero:
            print("\nInformation trouvée:")
            print("=" * 50)
            print(f"Numéro: {ligne['Numero']}")
            print(f"Nom: {ligne['Nom']}")
            print(f"Prénom: {ligne.get('Prenom', ligne.get('Prénom', ''))}")
            print(f"Date de naissance: {ligne.get('Date de naissance', '')}")
            print(f"Classe: {ligne['Classe']}")
            print(f"Notes: {ligne['Note']}")
            if 'erreurs' in ligne:
                print(f"Erreurs: {ligne['erreurs']}")
            return
    print("Numéro non trouvé.")

def afficher_cinq_premiers(lignes_valides, lignes_invalides, type_info="valide"):
    """Affiche les 5 premiers éléments"""
    lignes = lignes_valides if type_info.lower() == "valide" else lignes_invalides
    print(f"\nLes 5 premiers éléments {type_info}s:")
    for ligne in lignes[:5]: 
        print("\n" + "="*50)
        print(f"Numéro: {ligne['Numero']}")
        print(f"Nom: {ligne['Nom']}")
        print(f"Prénom: {ligne.get('Prenom', ligne.get('Prénom', ''))}")
        print(f"Date de naissance: {ligne.get('Date de naissance', '')}")
        print(f"Classe: {ligne['Classe']}")
        print(f"Notes: {ligne['Note']}")
        if 'erreurs' in ligne:
            print(f"Erreurs: {ligne['erreurs']}")

def ajouter_information(lignes_valides, lignes_invalides):
    """Ajoute une nouvelle information après validation"""
    nouvelle_ligne = {}
    print("\nSaisie d'une nouvelle information:")
    
    nouvelle_ligne['Numero'] = input("Numéro (format: 7 caractères alphanumériques): ")
    nouvelle_ligne['Nom'] = input("Nom: ")
    nouvelle_ligne['Prenom'] = input("Prénom: ")
    nouvelle_ligne['Date de naissance'] = input("Date de naissance (format: JJ/MM/AAAA): ")
    nouvelle_ligne['Classe'] = input("Classe (format: XemY où X=3-6 et Y=A ou B): ")
    nouvelle_ligne['Note'] = input("Notes (format: Matiere[note|note:moyenne]#...): ")
    
    erreurs = valider_ligne(nouvelle_ligne)
    
    if erreurs:
        nouvelle_ligne['erreurs'] = erreurs
        lignes_invalides.append(nouvelle_ligne)
        print("\nInformation ajoutée aux données invalides. Erreurs trouvées:", erreurs)
    else:
        nouvelle_ligne['Date de naissance'] = formater_date(nouvelle_ligne['Date de naissance'])
        nouvelle_ligne['Classe'] = formater_classe(nouvelle_ligne['Classe'])
        lignes_valides.append(nouvelle_ligne)
        print("\nInformation ajoutée avec succès aux données valides.")
    
    return lignes_valides, lignes_invalides

def modifier_information_invalide(lignes_valides, lignes_invalides):
    """Modifie une information invalide et la transfère si elle devient valide"""
    numero = input("\nEntrez le numéro de l'information à modifier: ")
    
    # Recherche de l'information dans les données invalides
    for index, ligne in enumerate(lignes_invalides):
        if ligne['Numero'] == numero:
            print("\nInformation trouvée. Erreurs actuelles:", ligne['erreurs'])
            nouvelle_ligne = ligne.copy()
            
            # Demande de modification des champs
            print("\nEntrez les nouvelles valeurs (ou appuyez sur Entrée pour garder l'ancienne valeur):")
            for champ in ['Numero', 'Nom', 'Prenom', 'Date de naissance', 'Classe', 'Note']:
                nouvelle_valeur = input(f"{champ} [{ligne.get(champ, '')}]: ")
                if nouvelle_valeur.strip():
                    nouvelle_ligne[champ] = nouvelle_valeur
            
            # Validation des nouvelles données
            erreurs = valider_ligne(nouvelle_ligne)
            if erreurs:
                nouvelle_ligne['erreurs'] = erreurs
                lignes_invalides[index] = nouvelle_ligne
                print("\nL'information reste invalide. Nouvelles erreurs:", erreurs)
            else:
                # Formatage et transfert vers les données valides
                nouvelle_ligne['Date de naissance'] = formater_date(nouvelle_ligne['Date de naissance'])
                nouvelle_ligne['Classe'] = formater_classe(nouvelle_ligne['Classe'])
                lignes_valides.append(nouvelle_ligne)
                lignes_invalides.pop(index)
                print("\nInformation corrigée et transférée vers les données valides.")
            return lignes_valides, lignes_invalides
    
    print("Numéro non trouvé dans les données invalides.")
    return lignes_valides, lignes_invalides