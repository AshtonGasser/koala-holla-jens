CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"gender" VARCHAR (255) NOT NULL,
	"age" INT,
	"readyForTransfer" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(255)
);

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (1, 'Scotty', 'M', 4, TRUE, 'Born in Guatemala');

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (2, 'Jean', 'F', 5, TRUE, 'Allergic to lots of lava');

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (3, 'Ororo', 'F', 7, FALSE, 'Loves listening to Paula Abdul');

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (4, 'Logan', 'M', 15, FALSE, 'Loves the sauna');

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (5, 'Charlie', 'M', 9, TRUE, 'Favorite band is Nirvana');

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready-to-transfer", "notes")
VALUES (6, 'Betsy', 'F', 4, TRUE, 'Has a pet iguana');
