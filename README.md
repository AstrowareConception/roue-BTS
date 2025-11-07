### Double Tirage au Sort — Roue spectaculaire (React + Vite)

Application web pour tirer au sort chaque jour de cours :
- un terme parmi une liste de notions (avec sa définition officielle),
- un étudiant parmi une liste (avec possibilité de décocher les absents),
- affichage visuel spectaculaire via deux roues qui tournent pendant ~10 secondes pour créer du suspens,
- bouton pour révéler la « vraie » définition et comparer.

#### Démo locale
1. Prérequis: Node.js 18+ recommandé.
2. Installer les dépendances:
   ```bash
   npm install
   ```
3. Lancer en développement:
   ```bash
   npm run dev
   ```
   Ouvrir l’URL affichée (par défaut http://localhost:5173).

#### Données (JSON modifiables)
- Les données se trouvent dans `public/data`:
  - `terms.json`: tableau d’objets `{ "term": string, "definition": string }`.
  - `students.json`: tableau d’objets `{ "id": string, "name": string }`.
- Exemple minimal:
  ```json
  [
    { "term": "Algorithme", "definition": "Suite finie d'instructions..." }
  ]
  ```
  ```json
  [
    { "id": "s1", "name": "Alice" },
    { "id": "s2", "name": "Benoît" }
  ]
  ```
- Vous pouvez éditer ces fichiers à chaud (en dev) ou les remplacer avant de déployer.
- L’état des cases cochées (présence) est mémorisé dans le navigateur via `localStorage`.

#### Utilisation en cours
- Décochez les étudiants absents, puis cliquez « Lancer la roue (10s) ».
- À la fin du tirage, cliquez sur « Afficher la vraie définition » pour comparer.
- Bouton « Réinitialiser » pour repartir de zéro.

#### Déploiement sur Vercel
- Le projet est prêt pour Vercel (static build avec Vite):
  - Build: `npm run build` → génère le dossier `dist`.
  - Fichier `vercel.json` déjà présent (`outputDirectory: "dist"`).
- Deux options:
  1. Depuis GitHub/GitLab/Bitbucket: importer le repo dans Vercel, framework détecté, puis déployer.
  2. En local avec l’outil Vercel CLI:
     ```bash
     npm i -g vercel
     vercel
     ```
     Suivre l’assistant; lors du build, Vercel exécutera `npm run build` et servira `dist`.

#### Personnalisation visuelle
- Les styles sont dans `src/styles.css`. Quelques idées rapides:
  - Ajuster `--bg`, `--primary`, `--accent` pour changer l’ambiance.
  - La durée de spin est fixée à 10s dans `src/App.jsx` (variable `spinDurationMs`).
  - Les couleurs alternées des tranches dépendent de `colorScheme` dans `Wheel.jsx`.

#### Structure
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

#### Notes
- Les tranches d’étudiants décochées apparaissent grisées et ne sont pas sélectionnées pendant le tirage.
- Les libellés longs sont rendus au mieux à l’intérieur des tranches; au besoin, raccourcir les noms ou termes.
- Pas de tracking ni backend — application purement statique.
