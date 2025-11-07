# Double Tirage au Sort — Roue spectaculaire (React + Vite)

Application web pédagogique permettant, à chaque séance, de tirer au sort:
- un terme parmi une liste de notions (avec sa définition officielle),
- un étudiant parmi une liste (avec possibilité de décocher les absents),
- avec un affichage spectaculaire via deux roues qui tournent pendant ~10 secondes pour créer du suspens,
- puis un bouton pour révéler la « vraie » définition et comparer.

Ce projet est 100% statique (pas de backend). Il s’appuie sur React 18 et Vite pour le dev/build, et lit des fichiers JSON depuis `public/data`.


## Sommaire
- [Aperçu rapide](#aperçu-rapide)
- [Captures / GIF](#captures--gif)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation et démarrage](#installation-et-démarrage)
- [Structure du projet](#structure-du-projet)
- [Données et formats](#données-et-formats)
- [Utilisation](#utilisation)
- [Personnalisation](#personnalisation)
- [Architecture & composants](#architecture--composants)
- [Accessibilité (a11y)](#accessibilité-a11y)
- [Performance](#performance)
- [Qualité & tests](#qualité--tests)
- [Scripts npm](#scripts-npm)
- [Déploiement](#déploiement)
- [Dépannage (FAQ courte)](#dépannage-faq-courte)
- [Feuille de route](#feuille-de-route)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Crédits](#crédits)


## Aperçu rapide
- Double roue (termes + étudiants) avec animation ~10s.
- Possibilité d’exclure des étudiants (absents) via cases à cocher.
- Affichage de la définition « officielle » après tirage, pour comparaison.
- État d’exclusion mémorisé localement (localStorage).
- Données simples modifiables via JSON.


## Captures / GIF
Ajoutez ici vos captures d’écran ou GIF animés (facultatif):
- `docs/preview-1.png`
- `docs/preview-2.gif`


## Fonctionnalités
- Roue de tirage des termes et roue de tirage des étudiants.
- Désactivation dynamique des étudiants (grisage des tranches et exclusion du tirage).
- Durée de spin configurable dans le code.
- Rendu responsive (desktop / laptop, et utilisable sur tablette).
- Application statique (sans suivi ni collecte de données personnelles).


## Prérequis
- Node.js 18+ recommandé
- npm 9+ (ou pnpm/yarn si vous préférez, adaptez les commandes)


## Installation et démarrage
1. Cloner le dépôt
   ```bash
   git clone <votre-url-du-repo>
   cd untitled
   ```
2. Installer les dépendances
   ```bash
   npm install
   ```
3. Lancer en développement
   ```bash
   npm run dev
   ```
   Ouvrir l’URL affichée (par défaut http://localhost:5173).

4. Construire la version de production
   ```bash
   npm run build
   ```
5. Prévisualiser le build localement
   ```bash
   npm run preview
   ```


## Structure du projet
```
.
├─ public/
│  └─ data/
│     ├─ terms.json
│     └─ students.json
├─ src/
│  ├─ components/
│  │  └─ Wheel.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ vite.config.js
└─ vercel.json
```


## Données et formats
Les données se trouvent dans `public/data` et sont servies telles quelles par Vite en dev et par l’hébergeur en prod.

- `terms.json` — tableau d’objets:
  ```json
  [
    { "term": "Algorithme", "definition": "Suite finie d'instructions..." }
  ]
  ```
  Champs:
  - `term`: string — intitulé du concept à tirer
  - `definition`: string — définition « officielle » affichée lors de la révélation

- `students.json` — tableau d’objets:
  ```json
  [
    { "id": "s1", "name": "Alice" },
    { "id": "s2", "name": "Benoît" }
  ]
  ```
  Champs:
  - `id`: string — identifiant stable (utile pour mémoriser l’état dans `localStorage`)
  - `name`: string — nom affiché sur la roue et dans la liste

Notes:
- Vous pouvez modifier ces fichiers à chaud en dev (le navigateur se recharge).
- L’état des cases cochées (présence) est mémorisé localement via `localStorage`.


## Utilisation
1. Démarrez l’app en dev ou ouvrez la version déployée.
2. Décochez les étudiants absents dans la liste.
3. Cliquez sur « Lancer la roue (10s) » pour démarrer les deux tirages.
4. À la fin, cliquez sur « Afficher la vraie définition » pour comparer avec la réponse attendue.
5. Utilisez « Réinitialiser » pour repartir de zéro si nécessaire.


## Personnalisation
- Styles: `src/styles.css`
  - Couleurs (exemple via variables CSS): `--bg`, `--primary`, `--accent`.
- Durée de spin: dans `src/App.jsx` via la constante (ex.: `spinDurationMs = 10000`).
- Palette des tranches: contrôlée par la logique `colorScheme` dans `src/components/Wheel.jsx`.
- Données: remplacez `public/data/*.json` par vos listes.

Astuce: pour des libellés très longs, pensez à les raccourcir pour un rendu optimal sur la roue.


## Architecture & composants
- Entrée: `index.html` + `src/main.jsx` (montage de l’app React dans le DOM).
- Composant principal: `src/App.jsx`
  - Charge les données JSON (termes et étudiants).
  - Gère l’état de la sélection/désélection d’étudiants (persisté en `localStorage`).
  - Pilote la durée et l’état des animations (en cours, terminé, etc.).
  - Propose les actions: lancer, afficher la définition, réinitialiser.
- Composant `Wheel`: `src/components/Wheel.jsx`
  - Reçoit la liste d’éléments à afficher et met en scène l’animation de rotation.
  - Gère le style des tranches (alternance de couleurs, grisage des éléments exclus).

Schéma simple du flux:
```
public/data → App.jsx (charge & état) → Wheel.jsx (rendu animé) → UI (boutons)
```

État & persistance:
- Liste des étudiants cochés/décochés mémorisée en `localStorage` (clé interne au projet).
- Le reste de l’état (tirage en cours, gagnant sélectionné) est en mémoire.


## Accessibilité (a11y)
- Boutons et libellés explicites.
- Contraste pensé pour rester lisible sur fond sombre/clair (ajustable dans `styles.css`).
- Recommandations possibles:
  - Fournir une alternative de tirage sans animation pour certains publics (à envisager dans la roadmap).
  - S’assurer que les contrôles sont utilisables au clavier (tabindex/ARIA si besoin).


## Performance
- Vite + React 18 — démarrage dev très rapide et build optimisé.
- Assets statiques minimalistes; pas de runtime superflu.
- Pour des listes très longues (> 500 éléments), envisager:
  - Virtualisation de rendu des listes de cases à cocher.
  - Limiter la taille des labels affichés sur les tranches.


## Qualité & tests
- Le projet est simple et ne comporte pas encore de tests automatisés.
- Idées si vous souhaitez en ajouter:
  - Tests unitaires (formatage des données, logique de sélection aléatoire, persistance `localStorage`).
  - Tests E2E (déroulé du tirage, masquage des absents).


## Scripts npm
- `npm run dev` — lancer le serveur de dev Vite
- `npm run build` — construire la version de production dans `dist/`
- `npm run preview` — prévisualiser le build localement (port 4173 par défaut)


## Déploiement
Le build est statique (`dist/`) et peut être hébergé sur n’importe quel serveur de fichiers statiques.

- Vercel (config incluse `vercel.json`):
  1. Pousser sur un dépôt Git, importer dans Vercel.
  2. Vercel détecte Vite, exécute `npm run build` et sert `dist`.
  3. Ou via CLI:
     ```bash
     npm i -g vercel
     vercel
     ```

- Netlify:
  - Build command: `npm run build`
  - Publish directory: `dist`

- GitHub Pages:
  - Construire: `npm run build`
  - Publier le dossier `dist` via GitHub Actions ou manuellement (pages branch /docs non supportée par défaut sans ajustements).

- Serveur statique classique (Nginx, Apache): pointer le vhost vers `dist`.


## Dépannage (FAQ courte)
- Le serveur de dev ne démarre pas:
  - Vérifiez votre version de Node (>= 18): `node -v`.
  - Supprimez `node_modules` et réinstallez: `rm -rf node_modules && npm install` (Windows: supprimez le dossier via l’explorateur ou `rmdir /s /q`).
- Les données ne se mettent pas à jour:
  - En dev, forcez le rafraîchissement du navigateur (Ctrl+F5).
  - En prod, vérifiez que vous avez bien déployé la dernière version de `dist` et que le cache n’interfère pas.
- Rien ne s’affiche sur la roue:
  - Assurez-vous que le JSON est valide (valider via https://jsonlint.com/).
  - Vérifiez que les champs correspondent exactement (`term`, `definition`, `id`, `name`).


## Feuille de route
- Option de durée d’animation configurable via l’interface.
- Mode « tirage unique » (terme OU étudiant).
- Export CSV/JSON des résultats.
- Accessibilité clavier/ARIA renforcée.
- Thèmes (clair/sombre/élevé contraste) sélectionnables par l’utilisateur.


## Contribuer
Les contributions sont bienvenues! Pour proposer une amélioration:
1. Ouvrez une issue en décrivant le besoin.
2. Créez une branche depuis `main`.
3. Codez, documentez, testez.
4. Ouvrez une Pull Request détaillée.

Merci de respecter le style et la simplicité du projet.


## Licence
MIT — voir le fichier `LICENSE` si présent, ou inclure le texte de la licence dans le dépôt.


## Crédits
- React, Vite
- Idée pédagogique: tirage aléatoire avec comparaison à une définition « officielle »
- Inspiré des roues de loterie/quiz pour l’aspect visuel
