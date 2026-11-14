# 🃏 Mon Dex Connecté

**Mon Dex Connecté** est une application web qui permet de découvrir, rechercher et consulter des cartes Yu-Gi-Oh! grâce à une API externe.

Le projet a été réalisé dans le cadre du Sprint 3 – Brief 1 chez YouCode. Il met en pratique JavaScript, la manipulation du DOM, les requêtes API avec Fetch et la gestion des données dans le navigateur.

## 🌐 Démo en ligne

👉 **[Voir Mon Dex Connecté sur GitHub Pages](https://sadikers.github.io/Sprint-3-Brief-1-Mon-Dex-connect-/)**

## ✨ Fonctionnalités

- **Affichage des cartes :** récupérer et afficher les cartes depuis l'API Yu-Gi-Oh!.
- **Chargement progressif :** afficher les cartes par lots de 20 grâce au bouton « Load More ».
- **Recherche :** rechercher une carte par son nom.
- **Filtrage :** filtrer les cartes selon leur attribut.
- **Détails :** consulter les informations détaillées d'une carte en cliquant dessus.
- **Favoris :** ajouter ou retirer des cartes de ses favoris.
- **Persistance des favoris :** conserver les favoris grâce au LocalStorage.
- **Mon équipe :** composer une équipe avec un maximum de 6 cartes.

## 🛠️ Technologies utilisées

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Fetch API
- Yu-Gi-Oh! API
- LocalStorage
- Git & GitHub

## 🔌 API utilisée

Les données des cartes proviennent de l'API **YGOPRODeck**.

Documentation : https://ygoprodeck.com/api-guide/

Cette API permet de récupérer les cartes, leurs images, leurs attributs, leurs types et leurs statistiques.

## 📁 Structure du projet

```text
Mon-Dex-Connecte/
│
├── index.html
│
├── src/
│   ├── services/
│   │   └── api.js
│   │
│   ├── storage.js
│   ├── ui.js
│   └── main.js
│
├── dist/
│   └── output.css
│
├── images/
│
└── README.md
```

## 🚀 Installation et lancement

1. Cloner le repository :

```bash
git clone https://github.com/SADIKERS/Sprint-3-Brief-1-Mon-Dex-connect-.git
```

2. Accéder au dossier du projet :

```bash
cd Sprint-3-Brief-1-Mon-Dex-connect-
```

3. Ouvrir le fichier `index.html` dans un navigateur ou utiliser l'extension **Live Server** de VS Code.

## 🎯 Objectifs pédagogiques

Ce projet m'a permis de pratiquer :

- La communication avec une API REST à l'aide de Fetch.
- Les fonctions asynchrones `async` et `await`.
- La gestion des erreurs avec `try...catch`.
- La manipulation du DOM avec JavaScript.
- L'organisation du code en modules JavaScript.
- La gestion des événements.
- La sauvegarde des données avec LocalStorage.
- L'utilisation de Git et GitHub.

## 👨‍💻 Auteur

**Abdelilah Sadik**

- GitHub : [@SADIKERS](https://github.com/SADIKERS)

---

*Projet réalisé dans le cadre de la formation YouCode – Sprint 3, Brief 1.*
