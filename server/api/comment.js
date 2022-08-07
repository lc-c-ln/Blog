const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  const idx = req.query["post_id"];
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from Comment where (post_id=${idx}) order by reg_date`;
    connection.query(sql, (err, rows) => {
      console.log(rows);
      res.json({ data: `받은 것 : ${idx + rows}+1` });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = req.body.parant_comment_id ? `insert into comment(post_id, parent_comment_id, writer, content, password) values(${req.body.post_id}, "${req.body.parant_comment_id}","${req.body.writer}","${req.body.content}","${req.body.password}")` : `insert into comment(post_id, writer, content, password) values(${req.body.post_id}, "${req.body.writer}","${req.body.content}","${req.body.password}")`;    
    connection.query(sql, (err, rows) => {
      if (err) console.log(err);
      res.status(200).send("Comment has created");
    });
    connection.release();
  });
});

router.put("/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = `update comment set content="${req.body.content}" where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Comment has edited");
    });
    connection.release();
  });
});

router.delete("/",(req,res)=>{
  const con = pool.getConnection((err, connection) => {
    const sql = `update comment set deleted=True where (id=${req.body.id})`
    connection.query(sql, (err, rows) => {
      if (err)
        res.send(err)
      else
        res.status(200).send("Comment has deleted");
    });
    connection.release();
  });
})

module.exports = router;
