const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto");

const router = express.Router();

router.get("/", (req, res) => {
  const id = req.query["post_id"];
  pool.getConnection((err, connection) => {
    sql1 = `SELECT id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt, content from POST where (id=${id})`;
    sql2 = `select tag.name from tag join post_tag on post_tag.tag_id = tag.id where post_tag.post_id=${id}`;
    connection.query(sql1, (err, rows1) => {
      connection.query(sql2, (err2, rows2) => {
        res.json({
          ...rows1[0],
          hashtagList: rows2.map((tag) => {
            return tag.name;
          }),
        });
      });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  const hashtagList = req.body.hashtagList;
  password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    const sql = `insert into post(title, writer, content, password) values("${req.body.title}","${req.body.writer}","${req.body.content}","${password}");`;
    try {
      connection.query(sql, (err, rows) => {
        const post_id = rows.insertId;
        for (const tagName of hashtagList) {
          connection.query(
            `insert ignore into tag(name) values ("${tagName}")`,
            (err, rows) => {
              if (err) req.send(err);
              connection.query(
                `insert into post_tag(post_id, tag_id) values(${post_id}, (select id from tag where name="${tagName}"))`
              );
            }
          );
        }
      });
    } catch (err) {
      throw err;
    } finally {
      res.status(200).send("Post has created Successfully");
      connection.release();
    }
  });
});

router.put("/", (req, res) => {
  const hashtagList = req.body.hashtagList;
  password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  const con = pool.getConnection((err, connection) => {
    // post Table 내용 수정
    const sql = `update post set title="${req.body.title}",content="${req.body.content}",writer="${req.body.writer}", password="${password}" where (id=${req.body.id})`;
    // tag 관련 내용 수정
    try {
      connection.beginTransaction();
      connection.query(`delete from post_tag where post_id = ${req.body.id}`);
      for (const tagName of hashtagList) {
        connection.query(
          `insert ignore into tag(name) values ("${tagName}")`,
          (err, rows) => {
            if (err) res.send(err);
            connection.query(
              `insert into post_tag(post_id, tag_id) values(${req.body.id}, (select id from tag where name="${tagName}"))`
            );
          }
        );
      }
      connection.commit();
    } catch (err) {
      connection.rollback();
      throw err;
    }
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
          if (err) 
          res.send(err);
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
