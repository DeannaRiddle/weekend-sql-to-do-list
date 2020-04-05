const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// GET
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks" ORDER BY "due_date" DESC;`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  console.log(`In /tasks POST with`, req.body);

  const taskToAdd = req.body;
  const queryText = `INSERT INTO "tasks" ("task", "date_in", "due_date")
                        VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [taskToAdd.task, taskToAdd.date_in, taskToAdd.due_date])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});
