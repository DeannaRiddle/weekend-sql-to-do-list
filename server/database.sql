  
CREATE TABLE "koalas" (
"id" SERIAL PRIMARY KEY,
"task" varchar(120),
"date_in" date,
"due_date" date
);

INSERT INTO "tasks" ("task", "date_in", "due_date") VALUES ('Paint Bedroom', '3/31/2020','4/30/2020');