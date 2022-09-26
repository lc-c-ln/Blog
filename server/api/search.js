const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  const category = req.query["category"]; //title,writer,hashtag,content
  const keyword = req.query["keyword"];
  const page = req.query["page"];
  console.log(category)
  const con = pool.getConnection((err, connection) => {
    sql = "";
    switch (category) {
      case "hashtag":
        sql = `select post.id, post.title, user.name, post.register_date, post.comment_cnt,
        post.view_cnt, post.like_cnt
        from post 
          join user on post.user_id = user.id
          join post_tag on post.id = post_tag.post_id 
          join (select id from tag where tag.name = "${keyword}")
           tag on tag.id = post_tag.tag_id
        `
        break;
      default:
        sql = `select post.id, post.title, user.name, post.register_date, post.comment_cnt, post.view_cnt, post.like_cnt
        from (
          select id, title, register_date, comment_cnt, view_cnt, user_id, like_cnt
          from post where ${category} like '%${keyword}%') post 
          join user on post.user_id = user.id 
        `
        break;
    }
    /** Pagenation에 Offset을 이용하지 않고, SQL을 작성한 건,
     * TotalPageCnt도 같이 res에 담아줘야 하기 때문이다.
     * 문제는 검색/페이지 이동 시 마다, Offset 없이 select 문을 실행하게 된다.
     * Refactor 시, 최초 검색 시에만 전체 데이터 수를 가져오고, 페이지 이동 시에는 Offset을 이용할 수 있게 해볼 것
     */
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