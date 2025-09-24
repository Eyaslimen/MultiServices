
# MultiServices
Plateforme web qui aide les employés/prestataires à exposer leurs services (informations, certificats, photos, vidéos démonstratives) et permet aux clients de rechercher, comparer et sélectionner les profils les plus compétents et fiables. Le projet comprend un backend ASP.NET Core (API REST) et un frontend Angular.

## Description du projet

MultiServices est une place de marché de services locaux où:
- Les employés créent un profil professionnel avec leurs informations de contact, leur poste/métier, leur localisation, une description, ainsi que des preuves de compétence (certificats, photos de réalisations, vidéos démonstratives).
- Les clients explorent ces profils, consultent les médias et lisent les avis laissés par d’autres clients pour évaluer la qualité et la fiabilité d’un employé.
- Chaque profil possède une section d’avis où les clients peuvent laisser un retour après une prestation.

### Rôles utilisateurs
- Employé: s’inscrit, met à jour son profil, ajoute/retire des photos et vidéos, gère ses informations.
- Client: explore les catégories, navigue entre les profils, consulte médias et avis, laisse un avis après service.

## Fonctionnalités

- Gestion de profils employés
  - Création de compte et connexion basique
  - Édition du profil (nom, email, téléphone, poste, lieu, description)
  - Téléversement et gestion des médias: photo de profil, galeries de photos, vidéos démonstratives
  - Association à une catégorie de services
- Découverte et recherche
  - Navigation par catégories
  - Liste des employés avec résumé et accès aux profils détaillés
- Avis et évaluation
  - Lecture des avis par profil
  - Ajout d’avis par les clients (expérience, commentaires, date)

## Prérequis

- .NET SDK 8.x
- Node.js 18+ et npm
- Angular CLI 18+ (`npm i -g @angular/cli`)
- SQL Server LocalDB (ou un SQL Server/PostgreSQL compatible avec EF Core et votre configuration)

## Démarrage rapide

### 1) Backend (.NET 8)

1. Copier/adapter la chaîne de connexion dans `MultiServices_backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Multiservicesdata": "Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=Multiservices;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=False"
  }
}
```

2. Se placer dans le dossier backend, appliquer les migrations et lancer l’API:

```bash
cd MultiServices_backend
# Restaurer et migrer la base (via dotnet-ef si nécessaire)
dotnet restore
# Si la base n'est pas créée, appliquer les migrations existantes
dotnet ef database update
# Lancer en développement
dotnet run
```

- L’API démarre avec Swagger en développement: `https://localhost:*****/swagger`.
- CORS est ouvert (politique `AllowAllOrigins`).
- Les fichiers uploadés sont servis depuis `wwwroot/uploads`.

### 2) Frontend (Angular 18)

1. Installer les dépendances et démarrer le serveur de dev:

```bash
cd Front
npm install
npm start
# ou
ng serve
```


### 3) Intégration Front ↔ API

- Vérifier les URLs d’appel API dans le code Angular (services sous `Front/src/app/Services/`).
- Par défaut, l’API écoute en HTTPS local. Adapter l’URL base (ex: `https://localhost:5001`) selon votre profil `launchSettings.json` et certificat.

## Démo : 
[Voir la vidéo](https://drive.google.com/drive/u/0/folders/1uem023VDaXCuCtD0nDeYgw6YDYUxiWjt)

