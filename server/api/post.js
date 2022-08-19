const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto");

const router = express.Router();

router.get("/", (req, res) => {
  const idx = req.query["post_id"];
  pool.getConnection((err, connection) => {
    const sql = `SELECT id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt, content  from POST where (id=${idx})`;
    connection.query(sql, (err, rows) => {
      res.json(rows[0]);
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  // hashtag 관련 내용 안 넣었음
  password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    const sql = `insert into post(title, writer, content, password) values("${req.body.title}","${req.body.writer}","${req.body.content}","${password}")`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Post has created");
    });
    connection.release();
  });
});

router.put("/", (req, res) => {
  password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    const sql = `update post set title="${req.body.title}",content="${req.body.content}",writer="${req.body.writer}", password="${password}" where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Post has edited");
    });
    connection.release();
  });
});

router.delete("/", (req, res) => {
  const password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    const sql = `select password from post where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (rows[0].password == password) {
        const sql2 = `delete from post where (id=${req.body.id})`;
        connection.query(sql2, (err, rows) => {
          if (err) res.send(err);
          else res.status(200).send("Post has deleted");
        });
      } else {
        res.status(202).send("wrong password");
      }
    });
    connection.release();
  });
});

// updateLikeCount
router.put("/like/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = `update post set like_cnt=(like_cnt${
      req.body.count === 1 ? "+1" : "-1"
    }) where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("Like Count Updated");
    });
  });
});

// updateViewCount
router.put("/view/", (req, res) => {
  const con = pool.getConnection((err, connection) => {
    const sql = `update post set view_cnt=(view_cnt+1) where (id=${req.body.id})`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else res.status(200).send("View Count Updated");
    });
  });
});

module.exports = router;
