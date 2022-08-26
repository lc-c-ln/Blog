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
            `insert into tag(name) select "${tagName}" where not exists (select name from tag where name="${tagName}")`,
            (err, rows) => {
              if (err) console.log(err);
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
    const sql = `update post set title="${req.body.title}",content="${req.body.content}",writer="${req.body.writer}", password="${password}" where (id=${req.body.id})`;
    try {
      connection.beginTransaction();
      connection.query(
        `delete post_tag
        from post_tag 
          join tag 
                on post_tag.tag_id = tag.id
                where
            (tag.name not in ${hashtagList} and post_tag.post_id = ${req.body.id})`
      ) // 새로 update 받은 리스트에 있는 tag들에 포함되지 않은 tag들 삭제 
      // 새로 update 받은 리스트에 있는 새로운 tag 추가하기.()
      // 제안 : 바로 delete 문에서 삭제하지 말고,
      // select 문으로 새로운  tag들과, 지워야할 tag를 분리하기.  
      // 바로 폐기
      connection.query()
      connection.query()
    } catch {
      res.send("Fail")
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
