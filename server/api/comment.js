const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto");

const router = express.Router();

router.get("/", (req, res) => {
  const idx = req.query["post_id"];
  const parent_comment_id = req.query["parent_comment_id"];
  pool.getConnection((err, connection) => {
    const sql = req.query["parent_comment_id"]
      ? `SELECT id ,content, writer, deleted, reg_date from Comment where (post_id=${idx} and parent_comment_id =${parent_comment_id}) order by reg_date desc`
      : `SELECT id ,content, writer, deleted, reg_date from Comment where (post_id=${idx} and parent_comment_id is null) order by reg_date desc`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.json(rows);
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    const sql = req.body.parent_comment_id
      ? `insert into comment(post_id, parent_comment_id, writer, content, password) values(${req.body.post_id}, "${req.body.parent_comment_id}","${req.body.writer}","${req.body.content}","${password}");`
      : `insert into comment(post_id, writer, content, password) values(${req.body.post_id}, "${req.body.writer}","${req.body.content}","${password}");`;
    const sql2 = `update post set comment_cnt=(comment_cnt+1) where (id=${req.body.post_id})`;
    connection.query(sql + sql2, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send("Comment has created");
      }
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

router.delete("/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = `update comment set deleted=true, content="", writer="",password="" where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Comment has deleted");
    });
    connection.release();
  });
});

module.exports = router;
