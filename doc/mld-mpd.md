# MLD

## Modèle logique des données

- On reprend les entités du MCD et leurs attributs
- On traduit les relations en ajoutant les clés (on pourra mettre un # pour bien identifier les clés étrangères)

Mon MLD pour oKanban

- list (id, title, position, created_at, updated_at)
- card (id, title, color, position, #list_id, created_at, updated_at)
- label (id, title, color, created_at, updated_at)
- card_has_label (#card_id, #label_id, created_at)

## MPD - Modèle physique des données

C'est le MLD avec les types et les contraintes en plus, c'est exactement ce qu'on va implémenter dans notre BDD

- list
  - id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
  - title TEXT NOT NULL
  - position SMALLINT NOT NULL DEFAULT 0
  - created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  - updated_at TIMESTAMPTZ
- card
  - id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
  - title TEXT NOT NULL
  - color TEXT
  - position SMALLINT NOT NULL DEFAULT 0
  - created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  - updated_at TIMESTAMPTZ
  - list_id INTEGER NOT NULL REFERENCES list(id) ON DELETE CASCADE
- label
  - id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
  - title TEXT NOT NULL
  - color TEXT
  - created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  - updated_at TIMESTAMPTZ
- card_has_label
  - card_id INTEGER NOT NULL REFERENCES card(id) ON DELETE CASCADE
  - label_id INTEGER NOT NULL REFERENCES label(id) ON DELETE CASCADE
  - created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()