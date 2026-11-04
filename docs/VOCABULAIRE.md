# Politique éditoriale du vocabulaire

La roue sert à faire expliquer oralement des notions réellement mobilisées pendant la formation et susceptibles d'aider l'étudiant à décrire, concevoir, sécuriser, tester ou défendre une solution applicative. Les définitions ne cherchent donc pas l'exhaustivité encyclopédique : elles donnent une formulation exacte, suffisamment courte pour être révélée en classe et suffisamment précise pour distinguer les concepts proches.

## Périmètre de la mise à jour de novembre 2026

Cette révision renforce quatre ensembles travaillés en deuxième année :

- PHP web : cycle HTTP, superglobales, formulaires, sessions, cookies et Post/Redirect/Get ;
- accès aux données : PDO, requêtes préparées, transactions et modèle relationnel ;
- architecture : Slim 4, PSR-7, middleware, MVC, repository, monolithe, refactorisation et règle métier ;
- API : contrat d'API, ressources REST, endpoints, méthodes, statuts, JSON et idempotence.

Les notions de sécurité directement liées à ces développements sont conservées : validation, échappement HTML, injection SQL, XSS, CSRF, authentification, autorisation et hachage des mots de passe. Les tests unitaires, les tests d'intégration et la recette sont également présents, car savoir vérifier et défendre une réalisation fait partie du travail attendu.

## Règle de sélection appliquée

Le corpus distingue désormais deux origines :

1. le socle historique de la roue, déjà travaillé dans les autres enseignements du BTS et utile pour présenter une réalisation à l'examen ;
2. les notions de PHP, PDO, Slim, MVC et API effectivement présentes dans le corps principal des cours ou des ateliers.

Une notion mentionnée uniquement dans un bloc **Défi**, **Extension facultative** ou dans une perspective d'approfondissement n'entre pas dans la roue tant qu'elle n'a pas fait l'objet d'un enseignement explicite. Cette règle évite de transformer une suggestion d'approfondissement en connaissance supposée acquise.

## Traçabilité des notions ajoutées ou précisées

| Source pédagogique | Notions retenues |
|---|---|
| `exercices/09-http-superglobales` | HTTP, requête et réponse HTTP, méthodes, codes de statut, chaîne de requête, superglobales, validation et échappement HTML |
| `exercices/10-formulaire-robuste` à `13-projet-cineclub` | session, cookie, Post/Redirect/Get, message flash, XSS, CSRF, authentification et autorisation |
| `exercices/14-modele-sql` à `18-authentification-projet` | SQL, SGBD relationnel, clés, jointures, PDO, requêtes préparées, transactions, injection SQL et hachage des mots de passe |
| `exercices/19-composer-autoload` | Composer, dépendance logicielle, espace de noms et chargement automatique PSR-4 |
| `exercices/20-medoo-repository` | Medoo, persistance et repository |
| `exercices/21-slim-routage` et `22-catalogue-slim-medoo` | Slim 4, route, middleware, PSR-7, `Content-Type` et `Location` |
| `exercices/23-refactoring-mvc` | monolithe, refactorisation, MVC, modèle, vue, contrôleur, repository et règle métier |
| `exercices/24-api-rest-slim` | API REST, contrat d'API, ressource, endpoint, JSON, CRUD et idempotence |
| ensemble des ateliers et documents officiels du BTS | tests, recette fonctionnelle, environnement de développement, modélisation et protection des données personnelles |

Le socle antérieur a lui aussi été réexaminé. Les notions de POO sont conservées parce qu'elles sont des prérequis explicites des ateliers Composer et MVC. Git et IDE restent liés à l'exploitation d'un environnement de développement et de tests. UML, MERISE, MCD, MLD, MPD et cardinalité servent à expliquer la modélisation d'une solution et de ses données. HTTPS et RGPD restent rattachés à la sécurisation des services et à la protection des données à caractère personnel. Ces familles ne constituent pas des ajouts issus du cours PHP : elles appartenaient déjà au vocabulaire général du BTS.

## Arbitrages effectués

Les entrées trop périphériques pour cette étape ont été retirées : CLI, Docker, attaque de l'homme du milieu, NoSQL et UTF-8. Les doublons ou formulations ambiguës ont été remplacés : « API RESTful » devient « API REST », « Code HTTP » devient « Code de statut HTTP », « Header HTTP » devient « En-tête HTTP », « Injection XSS » devient simplement « XSS » et « Hashage » devient le terme français correct « Hachage ».

Après vérification du contenu réellement enseigné, les termes suivants ont également été retirés :

- **Injection de dépendances**, présente seulement dans les défis ou extensions facultatives ;
- **Front controller**, expression absente des supports même si `public/index.php` joue matériellement ce rôle ;
- **Service métier**, formulation plus spécialisée que le vocabulaire explicitement travaillé à ce stade ;
- **Normalisation relationnelle**, à ne pas confondre avec la normalisation des données saisies effectivement pratiquée dans les ateliers ;
- **OpenAPI**, seulement proposé comme défi ou comme document partiel du futur projet de synthèse.

Ces termes pourront être introduits plus tard, après une séance qui les définit, les illustre et demande aux étudiants de les employer.

Medoo est explicitement présenté comme une bibliothèque au-dessus de PDO et non comme un ORM. Le modèle MVC n'est pas assimilé à la base de données. Une ressource REST est distinguée de sa représentation JSON. Une requête préparée est présentée comme une protection des valeurs, pas comme un mécanisme permettant de paramétrer librement des noms de tables ou de colonnes.

## Règles pour les prochaines mises à jour

Avant d'ajouter un terme, vérifier qu'il répond à au moins un des critères suivants :

1. il apparaît dans le corps principal d'un cours ou d'un TP effectivement réalisé ;
2. ou il appartient au socle déjà enseigné et correspond directement à une compétence ou à une activité attendue dans le BTS SIO SLAM.

Une notion simplement utile, moderne ou recommandée ne suffit donc pas. Son ajout doit être accompagné de la référence au support dans lequel elle a été étudiée. Les défis et extensions ne deviennent des sources recevables qu'après avoir été réellement traités en classe.

Chaque définition doit être autonome, employer le terme technique consacré et éviter les promesses absolues. Après toute modification, exécuter :

```bash
npm run validate:data
npm run build
```

Le build Vercel exécute automatiquement la validation du vocabulaire avant de compiler l'application.
