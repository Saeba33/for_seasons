# 4 Seasons

## À Propos
Bienvenue dans le README de "4 seasons". Cette application a été conçue pour référencer les fruits et légumes de saison et proposer des recettes liées à ces produits. Dans le cadre de ma démarche, les recettes présentes sont exclusivement végétariennes, visant à sensibiliser l'utilisateur à la consommation de produits ayant un impact environnemental moindre.

## Informations Techniques
### Général
- **Installation** : Clonez le dépôt et installez les dépendances en exécutant `npm install`.
- **Lancement** : Démarrez le serveur de développement avec `npm run dev`.

### Frontend
- Les endpoints frontend respectent la structure actuelle de NextJS (v.14) dans le dossier "**app**".
- La structure de base commune est gérée depuis le fichier "Layout" (à la racine du dossier "app").
- Le footer et la navbar sont stockés dans le dossier "**layouts**".
- Pour une meilleure visibilité et une réutilisation potentielle, le carousel (de la page Home) est géré dans le dossier "**components**". Idem pour la page de chargement.
- Les images des produits et des recettes présentent dans le dossier **public** ont été générées par intelligence artificielle, elles comportent quelques défauts visuels (pixelisation sur certains contourings).
- Le dossier "**utils**" regroupent un gestionnaire pour les intéractions admin sur les recettes et les ingrédients (handlers.js) et un fichiers de traduction (translations.js) pour les composants en ayant besoin.

### Backend
- Un context (dossier **contexts**) a été créé pour gérer certaines informations d'état liées à l'utilisateur par le biais de l'authentification. Les informations de connexion sont stockées dans un cookie.
- Les **managers** et **middlewares** sont disponibles dans leur dossier respectif à la racine du dossier "src".
- Les controllers sont gérés dans le dossier "**pages**" dans chaque endpoint de l'application.
- La gestion de la base de données est réalisée dans le dossier "**database**" (schema, migrate, seed et utilitaire de connection).

## À Venir
- Ajout d'une recette par l'utilisateur (soumis à une validation par l'administrateur avant d'être publiée).
- Permettre l'upload des images pour une recette (soumis à une validation par l'administrateur avant d'être publiée).
- Ajout d'un ingrédient par l'utilisateur (soumis à une validation par l'administrateur avant d'être publiée).
- Ajout d'un commentaire sur les recettes (soumis à une validation par l'administrateur avant d'être publiée).
- Permettre la gestion des informations personnelles (sous visa de la RGPD).
- Gestion des mots de passe oubliés.
- Personnaliser la description de chaque produit.
- Développer les catalogues de produits et de recettes.
- Optimiser la sélection des produits à faible empreinte carbonne (éviter les produits importés depuis des régions trop éloignées).


## Vrac
- Mise en forme par module.css
- Performances lighthouse optimisées
