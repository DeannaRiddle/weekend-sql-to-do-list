const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// POST
router.post("/", (req, res) => {
  console.log(`In /tasks POST with`, req.body);

  const taskToAdd = req.body;
  const queryText = `INSERT INTO "tasks" ("task", "date_in", "importance")
                        VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [taskToAdd.task, taskToAdd.date_in, taskToAdd.importance])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

// GET
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks" ORDER BY "importance" DESC;`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.warn("ERROR", err);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const taskComplete = req.body;
  const queryText = `UPDATE "tasks" SET "tasks"=$1, "date_in"=$2, "importance"=$3 WHERE "id"=$4;`;
  pool
    .query(queryText, [
      taskComplete.tasks,
      taskComplete.date_in,
      taskComplete.importance,
      taskId,
    ])
    .then((responseDB) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

//Delete
router.delete("/", (req, res) => {});

module.exports = router;
