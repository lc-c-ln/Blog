const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto");

const router = express.Router();

router.put("/view", (req, res) => {
  const con = pool.getConnection((err, connection) => {
      const sql = `update post set view_cnt=(view_cnt+1) where (id=${req.body.id})`;    
      connection.query(sql, (err, rows) => {
        if (err) 
          res.send(err)
        else 
          res.status(200).send("Count Updated")
      })
    })
  })
  
module.exports = router

router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from POST`;
    connection.query(sql, (err, r1) => {
      const commentsql = `SELECT * from COMMENT`;
      connection.query(commentsql, (err, r2) => {
        res.json({ postCnt: r1.length, commentCnt: r2.length });
      });
    });
    connection.release();
  });
});

module.exports = router;
