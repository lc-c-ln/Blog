const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  const category = req.query["category"]; //title,writer,hashtag,content
  const keyword = req.query["keyword"];
  const page = req.query["page"];
  const con = pool.getConnection((err, connection) => {
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
        res.json({
          posts: rows.slice((page - 1) * 10, page * 10),
          totalPageCnt:
            Math.floor((rows.length - 1) / 10) + 1 == 0
              ? 1
              : Math.floor((rows.length - 1) / 10) + 1,
        });
      }
    });

    connection.release();
  });
});

module.exports = router;
