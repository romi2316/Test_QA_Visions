# Rapport de Test - API Todos


# Résumé

Ce rapport présente les résultats des tests effectués sur l'API Todos. L'objectif était de vérifier les fonctionnalités de base CRUD, y compris la création, la récupération, la mise à jour et la suppression des todos. Les tests ont été réalisés à l'aide de l'outil Cypress.

# Configuration de l'Environnement

Système d'exploitation : Windows 10

Node.js : v21.1.0

npm : 10.2.4

Cypress : 13.6.0

MongoDB : 7.0.3

Mongoose : 7.6.3

Navigateurs :

Google Chrome : 119.0.6045.160 

Microsoft Edge: 119.0.2151.72

# Cas de Test

# Création de Todos(POST)

**Scénario : Vérifier la création de todos avec des titres valides.

-Résultat Attendu : « Statut 201 » indiquant que  Les nouvelles tâches sont créées avec succès, contenant les propriétés attendues telles que l'ID, le titre, l'état de complétion, et la date de création.

-Résultat Obtenu : « Statut 201 » comme prévue

-Analyse : OK

# Récupération des Todos (GET)

**Scénario 1: Récupérer toutes les tâches existantes.

-Résultat Attendu : «Statut 200 » indiquant que La récupération de tous les taches est réussie

-Résultat Obtenu : «Statut 200 » comme prévu

-Analyse : OK.


**Scénario 2: Récupérer une  tâche spécifique par un endpoint ID.

-Résultat Attendu : «Statut 200 » indiquant que la récupération d’une tâche spécifique avec les propriétés attendues est réussie

-Résultat Obtenu : «Statut 404 » indiquant que La récupération de la tâche spécifique est échouée

-Analyse : KO.

-Recommandation :Pour renforcer la fonctionnalité de l'API, l'ajout d'un endpoint ID spécifique pour la récupération d'un todo permettrait une méthode plus précise et efficace pour obtenir des détails sur une tâche spécifique.


# Mise à Jour des Todos(PUT)

**Scénario 1: Mettre à jour le titre d'une tâche existante.

-Résultat Attendu : « Statut 200 »indiquant que la tâche modifiée devrait refléter le nouveau titre.

-Résultat Obtenu : « Statut 200 » comme prévu.

-Analyse : OK


**Scénario 2: Mettre à jour l'État de Complétion d'une tâche existante

-Résultat Attendu : « Statut 200 »indiquant que la modification du statut ‘’Completed’’  est réussie.

-Résultat Obtenu : « Statut 200 » comme prévu

-Analyse : OK


# Suppression des Todos(DELETE)

**Scénario : Supprimer une tâche existante.

-Résultat Attendu : « Statut 200 » indiquant que la tache est bien supprimé.

-Résultat Obtenu : « Statut 200 »  comme prévu

-Analyse : OK.


# Gestions des erreurs


# Gestion des Erreurs lors de la Création

**Scénario 1: Vérifier la gestion des erreurs lors de la création de todos avec un titre vide

-Résultat Attendu : « statut 500 » indiquant que  la création de tâches avec un titre vide est refusé

-Résultat Obtenu : « statut 500 » comme prévu

-Analyse : OK


**Scénario 2: Vérifier la gestion des erreurs lors de la création de todos avec un titre composé uniquement de chiffres

-Résultat Attendu : « statut 500 » indiquant que  la création de tâches avec un titre composé uniquement de chiffres est refusé

-Résultat Obtenu : « Statut 201 »  indiquant que la création est réussie contrairement aux attentes.

-Analyse : KO

-Recommandation :Pour des raisons de sécurité et d'intégrité des données, Mettre en place une validation côté serveur pour rejeter les requêtes de création avec des titres composés uniquement de chiffres. Utiliser le statut 400 (Bad Request) pour indiquer une erreur de validation.



**Scénario 3: Vérifier la gestion des erreurs lors de la création de todos avec un titre composé uniquement de caractères spéciaux

-Résultat Attendu : « statut 500 » indiquant que la création de tâches avec un titre composé uniquement de caractères spéciaux est refusé.

-Résultat Obtenu : « Statut 201 » indiquant que la création des tâches est réussie contrairement aux attentes.

-Analyse : KO

-Recommandation : Pour des raisons de sécurité et d'intégrité des données, implémenter une validation côté serveur pour rejeter les requêtes de création avec des titres composés uniquement de caractères spéciaux. Utiliser le statut 400 (Bad Request) pour indiquer une erreur de validation.


**Scénario 4: Vérifier que la création d'un todo en doublon est correctement gérée.

-Résultat Attendu : « statut 500 » indiquant que la création de tâches avec un titre déjà existant est refusé

-Résultat Obtenu : « Statut 201 » indiquant que la création de tâche est réussie contrairement aux attentes.
Analyse : KO

-Recommandation :
Mettre en œuvre une vérification côté serveur pour refuser les requêtes de création avec un titre déjà existant pour éviter les doublons. Utiliser le statut 409 (Conflict) pour indiquer un conflit de ressources.


# Gestion des Erreurs lors de la Récupération

**Scénario : Tenter de récupérer une tâche supprimée par un endpoint ID.

-Résultat Attendu : « statut 500 »indiquant qu’aucune tâche n’a était récupérée.

-Résultat Obtenu : « statut 404 » pas comme prévu

-Analyse : KO.

-Recommandation : 
Corriger la logique de récupération pour renvoyer le statut 200 lorsque la tâche spécifique est trouvée.


# Gestion des erreurs mise à jour

**Scénario : Vérifier que la mise à jour d'un todo supprimé est correctement gérée.

-Résultat Attendu : « Statut 500 » indiquant que la tentative de mettre à jours d'une tâche qui a déjà été supprimée est échouée

-Résultat Obtenu : « Statut 500 »  comme prévu

-Analyse : OK


# Gestion des erreurs lors de la suppression

**Scénario : Vérifier que la supression d'un todo déjà supprimé est correctement gérée.

-Résultat Attendu : «Statut 500 » indiquant que la tentative de suppression d'une tâche qui a déjà été supprimée est échouée

-Résultat Obtenu : « Statut 200 » indiquant que la suppression est réussie contrairement aux attentes.

-Analyse : KO

-Recommandation : Améliorer la gestion des erreurs pour renvoyer le statut 500 lors de la tentative de suppression d'une tâche déjà supprimée.



# Conclusion :

Les tests effectués sur l'API Todos ont confirmé la conformité aux spécifications CRUD de base, validant ainsi sa fiabilité et sa robustesse.

Cependant,en plus des recommandations ces dessus, la représentation du code d'erreur 500 ne se révèle pas suffisamment spécifique pour catégoriser les diverses erreurs rencontrées. Afin d'améliorer la gestion des erreurs,Il est préconisé d'adopter des codes de statut plus pertinents en accord avec la nature de l'erreur, pour une identification précise des situations exceptionnelles.

En résumé, bien que les succès actuels soient notables, ces recommandations visent à améliorer davantage l'API Todos, assurant ainsi une meilleure expérience utilisateur.

Les détails complets des tests, y compris les scripts Cypress, sont disponibles dans les fichiers joints à ce rapport.
