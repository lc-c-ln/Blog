const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  const category = req.query["category"]; //title,writer,hashtag,content
  const keyword = req.query["keyword"];

  const con = pool.getConnection((err, connection) => {
    // password 제외한 데이터 전송.
    const sql =
      category == "hashtag"
        ? `select id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt
        from post
        where (id in (
            select post_id 
            from post_tag 
            where (tag_id in (select id from tag where (name like '%${keyword}%')))));
        `
        : `select id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt from post where ${category} like '%${keyword}%'`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else {
        res.json(rows);
      }
    });
    connection.release();
  });
});

module.exports = router;
