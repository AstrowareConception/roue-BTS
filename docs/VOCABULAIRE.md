# Politique éditoriale du vocabulaire

La roue sert à faire expliquer oralement des notions réellement mobilisées pendant la formation et susceptibles d'aider l'étudiant à décrire, concevoir, sécuriser, tester ou défendre une solution applicative. Les définitions ne cherchent donc pas l'exhaustivité encyclopédique : elles donnent une formulation exacte, suffisamment courte pour être révélée en classe et suffisamment précise pour distinguer les concepts proches.

## Périmètre de la mise à jour de novembre 2026

Cette révision renforce quatre ensembles travaillés en deuxième année :

- PHP web : cycle HTTP, superglobales, formulaires, sessions, cookies et Post/Redirect/Get ;
- accès aux données : PDO, requêtes préparées, transactions et modèle relationnel ;
- architecture : Slim 4, PSR-7, middleware, MVC, repository, service métier et injection de dépendances ;
- API : ressources REST, endpoints, méthodes, statuts, JSON, idempotence et OpenAPI.

Les notions de sécurité directement liées à ces développements sont conservées : validation, échappement HTML, injection SQL, XSS, CSRF, authentification, autorisation et hashage des mots de passe. Les tests unitaires, les tests d'intégration et la recette sont également présents, car savoir vérifier et défendre une réalisation fait partie du travail attendu.

## Arbitrages effectués

Les entrées trop périphériques pour cette étape ont été retirées : CLI, Docker, attaque de l'homme du milieu, NoSQL et UTF-8. Les doublons ou formulations ambiguës ont été remplacés : « API RESTful » devient « API REST », « Code HTTP » devient « Code de statut HTTP », « Header HTTP » devient « En-tête HTTP » et « Injection XSS » devient simplement « XSS ».

Medoo est explicitement présenté comme une bibliothèque au-dessus de PDO et non comme un ORM. Le modèle MVC n'est pas assimilé à la base de données. Une ressource REST est distinguée de sa représentation JSON. Une requête préparée est présentée comme une protection des valeurs, pas comme un mécanisme permettant de paramétrer librement des noms de tables ou de colonnes.

## Règles pour les prochaines mises à jour

Avant d'ajouter un terme, vérifier qu'il répond à au moins un des critères suivants :

1. il apparaît dans un cours ou un TP effectivement réalisé ;
2. il aide à expliquer une architecture, un choix technique ou une règle de sécurité ;
3. il permet de distinguer deux notions fréquemment confondues ;
4. il correspond à une compétence ou à une activité attendue dans le BTS SIO SLAM.

Chaque définition doit être autonome, employer le terme technique consacré et éviter les promesses absolues. Après toute modification, exécuter :

```bash
npm run validate:data
npm run build
```

Le build Vercel exécute automatiquement la validation du vocabulaire avant de compiler l'application.
