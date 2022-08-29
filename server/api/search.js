const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  const category = req.query["category"]; //title,writer,hashtag,content
  const keyword = req.query["keyword"];
  const page = req.query["page"];

  const con = pool.getConnection((err, connection) => {
    sql = "";
    switch (category) {
      case "hashtag":
        sql = `select post.id, post.title, post.writer, post.reg_date,post.comment_cnt, post.view_cnt, post.like_cnt from post join post_tag on post.id = post_tag.post_id join tag on tag.id = post_tag.tag_id where tag.name = "${keyword}"`; // 찾으려는 post 들의 id 를 출력
        break;
      default:
        sql = `select id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt from post where ${category} like '%${keyword}%' order by id desc`;
        break;
    }
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