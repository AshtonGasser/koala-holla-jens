const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET

// POST
router.post('/',  (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready-to-transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, nnewKoala.gender, newKoala.age, newKoala.readyForTranfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT


// DELETE

module.exports = koalaRouter;