# s6

La s6 c'est cool on pratique tous les jours sur un projet fil rouge

En plus on corrige chaque jour ce qu'on a fait la veille avant d'avancer

Par contre entre les corrections du profs et nos mises à jours quotidienne ça va etre le gros bordel dans nos fichiers.

A moins qu'on s'organise un peu avec git

Ce qu'on va faire :

- On va garder master pour la version clean, cad la correction
- Au quotidien on va préférer travailler dans des branches, par exemple pourquoi pas faire une branche par jour

Rappel pratique :

- pour changer de branche : `git checkout nomdelabranche`
- pour créer une branche à partir de la branche sur laquelle on se trouve :
  - On vérifie qu'on est à jour dans nos commits (git status)
  - On crée la branche et on se positionne dessus avec `git checkout -b nomdelanouvellebranche`