const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET

koalaRouter.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "koalas" ORDER BY "id";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting koalas', error);
    res.sendStatus(500);
  });
});

// POST
koalaRouter.post('/',  (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "readyForTransfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT
koalaRouter.put("/:id", (req, res) => {
    const koalaId = req.params.id;
    
    let readyForTransfer = req.body.readyForTransfer;
  
    let queryString = "";
    if (readyForTransfer === "TRUE") {
      queryString = 'UPDATE "ready-to-transfer" SET "readyForTransfer"=TRUE WHERE "koalas".id = $1';
    } else if (readyForTransfer === "false") {
      queryString = 'UPDATE "ready-to-transfer" SET "readyForTransfer"=FALSE WHERE "koalas".id = $1;';
    } else {
      res.sendStatus(500);
      return; // early exit since its an error
    }
    pool
      .query(queryString, [koalaId])
      .then((response) => {
        console.log(response.rowCount);
        res.sendStatus(202);
      })
      .catch((err) => {
        console.log("ya done goofed", err);
        res.sendStatus(500);
      });
  })
// DELETE

module.exports = koalaRouter;
