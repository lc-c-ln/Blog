const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto");

const router = express.Router();
router.get("/", (req, res) => {
    const password = crypto
      .createHash("sha256")
      .update(req.query["password"])
      .digest("base64");
    const con = pool.getConnection((err, connection) => {
      const sql = `select password from post where (id=${req.query["id"]})`

      connection.query(sql, (err, rows) => {
        // console.log(rows,req.query);
        if (rows[0].password == password) {
          res.status(200).send("Correct Password")
        } else {
          res.status(202).send("Wrong Password")
        }
      })
    })
  })
  
module.exports = router