/* 
    En tant qu'utilisateur postgres qui a tous les droits (cf fiche recap)
    On a crée au préallable un user avec
    CREATE USER truc WITH PASSWORD 'much';
    qui est l'équivalent de CREATE ROLE truc WITH LOGIN PASSWORD 'much';
    si on s'est trompé on peut modifier avec ALTER
    ALTER ROLE truc WITH PASSWORD 'machin';

    On a ensuite créer la database avec un propriétaire
    CREATE DATABASE bidule WITH OWNER truc;

    Le owner a tous les droits sur la database on aurait pu aussi gérer des droits plus précis avec GRANT https://www.postgresql.org/docs/9.0/sql-grant.html
*/

BEGIN; -- BEGIN va de paire avec COMMIT ici en fin de fichier
-- ainsi si on a des soucis dans les instructions qui suivent, rien ne sera fait
-- si pas de soucis tout sera fait, ça évite de faire des choses à moitié si on a des bugs
-- on dit qu'on fait une transaction

DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";
-- on efface et on recommence, ainsi si on pourri les tables dans nos tests
-- on aura juste à relancer le script de création

CREATE TABLE "list" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- la contrante GENERATED AS IDENTITY sur INTEGER est un équivalent standard de SERIAL
    -- avec ALWAYS les id seront générés automatiquement tout le temps, pas besoin de s'en soucier
    "title" TEXT NOT NULL,
    "position" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- la colonne created_at a une valeur par défaut donc en fait ça mange pas de pain, ça va se remplir tout seul
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" TEXT NOT NULL,
  "color" TEXT,
  "position" SMALLINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE
  -- la contrainte ON DELETE CASCADE permet de dire si on supprime une liste, on supprime les cartes qui y font référence
);

CREATE TABLE "label" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" TEXT NOT NULL,
  "color" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_label" (
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "label_id" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("card_id", "label_id")
  -- on crée une clé composition, cad la combinaison de plusieurs champs
  -- ainsi ici chaque combinaison de card_id/label_id devra etre unique
);

INSERT INTO "list" ("title", "position") -- on peut lister uniquement les champs qui nous intéresse
    VALUES 
        ('To Buy', 0),
        ('To Do', 1); 

INSERT INTO "card" ("title", "color", "position", "list_id")
    VALUES
        ('Un 3ème écran', 'red', 0, 2),
        ('Des lego', 'blue', 1, 2),
        ('Voir exposition Pompidou', 'red', 0, 1);

INSERT INTO "label" ("title", "color")
    VALUES
        ('Urgent', 'red'),
        ('Idée', 'yellow'),
        ('À surveiller', 'green');

INSERT INTO "card_has_label" ("card_id", "label_id")
    VALUES
        (1, 1),
        (2, 2),
        (3, 1),
        (3, 3);

COMMIT;