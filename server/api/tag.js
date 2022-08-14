// post를 수정, 삭제 시 해당 post와 연결된 hashtag 전부 삭제 후 재삽입
const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.post("/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const searchsql = `select id from tag where name="${req.body.name}"`;
    connection.query(searchsql, (err, rows) => {
      if (rows.length != 0) {
        const sql = `insert into post_tag(post_id, tag_id) values(${req.body.post_id},${rows[0]["id"]});`;
        connection.query(sql, (err, rows) => {
          res.status(200).send("Existed Tag has added");
        });
      } else {
        try {
          connection.beginTransaction();
          connection.query(`insert into tag(name) values("${req.body.name}");`)
          connection.query(`insert into post_tag(post_id, tag_id) values(${req.body.post_id}, (select id from tag where (name="${req.body.name}")));`);
          connection.commit();
          res.status(200).send("Hashtag has added")
        } catch (err) {
          res.send(err)
        }
      }
    });
    connection.release();
  });
});

router.delete("/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = `delete from post_tag where (post_id=${req.body.post_id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Hashtag has deleted");
    });
    connection.release();
  });
});

module.exports = router;