const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET

router.get('/', (req, res) => {
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


// PUT
router.put("/:id", (req, res) => {
    const koalaId = req.params.id;
    
    let readyForTransfer = req.body.readyForTransfer;
  
    let queryString = "";
    if (readyForTransfer === "true") {
      queryString = 'UPDATE "ready-to-transfer" SET "ready-to-transfer"=TRUE WHERE "koalas".id = $1';
    } else if (readyForTransfer === "false") {
      queryString = 'UPDATE "ready-to-transfer" SET "ready-to-transfer"=FALSE WHERE "koalas".id = $1;';
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
  });

// DELETE

module.exports = koalaRouter;