CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"task" varchar(200),
"date_in" date,
"importance" varchar(1)
);
INSERT INTO "tasks" ("task", "date_in", "importance") VALUES ('Paint Bedroom', '3/31/2020','H');
