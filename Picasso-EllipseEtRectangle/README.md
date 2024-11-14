# Projet Application Web : PICASSO 1.0

Ce projet contient un frontend et un backend configurés avec Node.js et npm. Le frontend et le backend ont chacun leurs propres dépendances et commandes de démarrage.

## Prérequis

- [Node.js](https://nodejs.org/) doit être installé sur votre machine.
- [npm](https://www.npmjs.com/) est fourni avec Node.js et doit être disponible pour l'installation des dépendances.

## Installation des dépendances

### 1. Installation des dépendances du Frontend

Dans le dossier racine (le dossier courant), exécutez la commande suivante pour installer les dépendances du frontend :

```bash
npm install
```

### 2. Installation des dépendances du Backend

Ensuite, rendez-vous dans le dossier `server` et exécutez également la commande suivante pour installer les dépendances du backend :

```bash
cd server
npm install
```

## Lancement de l'application

### 1. Démarrer le Frontend

Pour lancer le frontend, exécutez la commande suivante dans le dossier racine :

```bash
npm start
```

Le frontend sera accessible à l'adresse `http://localhost:3000` par défaut, sauf si un autre port est configuré.

### 2. Démarrer le Backend

Pour lancer le serveur backend, assurez-vous d'être dans le dossier `server`, puis exécutez la commande suivante :

```bash
npm start
```

Le serveur backend sera accessible par défaut à l'adresse `http://localhost:5000`, sauf si un autre port est configuré.

## Structure du projet

Voici la structure principale du projet :

```
├── server/                # Dossier contenant le backend
│   ├── node_modules/      # Modules npm du backend
│   ├── package.json       # Fichier de configuration npm pour le backend
│   └── ...                # Autres fichiers du backend
├── src/                   # Dossier contenant le frontend
├── node_modules/          # Modules npm du frontend
│                           # Fichier de configuration npm pour le frontend
│                           # Autres fichiers du frontend
├── package.json           # Fichier de configuration npm à la racine
└── README.md              # Ce fichier
```

## Scripts utiles

- `npm install`: Installe les dépendances nécessaires.
- `npm start`: Démarre l'application dans le mode de développement.

## Remarques

- Assurez-vous d'avoir exécuté `npm install` à la fois dans le dossier racine et dans le dossier `server` avant de démarrer le projet.
- Vous pouvez ajuster les configurations du frontend et du backend en fonction des besoins spécifiques de votre environnement de développement.

## Support

Pour toute question ou assistance, veuillez contacter l'équipe de développement.
