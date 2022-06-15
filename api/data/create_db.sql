
BEGIN; 

DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

CREATE TABLE "list" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" TEXT NOT NULL,
    "position" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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
);

INSERT INTO "list" ("title", "position")
    VALUES 
        ('To Buy', 0),
        ('To Do', 1); 

INSERT INTO "card" ("title", "color", "position", "list_id")
    VALUES
        ('A new monitor ', 'red', 0, 1),
        ('x2 Mugs', 'blue', 1, 1),
        ('Exhibition at Pompidou', 'blue', 0, 2);

INSERT INTO "label" ("title", "color")
    VALUES
        ('Important', 'red'),
        ('Pending', 'yellow'),
        ('Done', 'green'),
        ('Idea', 'blue');

INSERT INTO "card_has_label" ("card_id", "label_id")
    VALUES
        (1, 1),
        (2, 3),
        (3, 4),
        (3, 2);

COMMIT;