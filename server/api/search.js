const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  
  const con = pool.getConnection((err, connection) => {
    // 상황 1. 기본 상태의 페이지만 달라짐.
    // req에 keyword 없음. 
    

    // 상황 2. 최초 검색 (검색 결과의 1 page)
    // req에 keyword 있고, page는 1임
    
    // 상황 3. 검색 결과에서 페이지 이동 (검색 결과의 2~ page)
    // req에 keyword 있고, page 다름



    // password 제외한 데이터 전송.
    const keyword = req.query["keyword"];    
    if (keyword.length == 0) {
      
    } else { 
      const category = req.query["category"]; //title,writer,hashtag,content
      const page  = req.query["page"];
      const sql =
      category == "hashtag"
        ? `select id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt 
        from post 
        where (id in (
            select post_id 
            from post_tag 
            where (tag_id in (select id from tag where (name like '%${keyword}%'))))) LIMIT 10 OFFSET ${(page-1)*10};
        `
        : `select id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt from post where ${category} like '%${keyword}%'`;
        connection.query(sql, (err, rows) => {
          if (err) 
            res.send(err);
          else {
            res.json({posts:rows, cnt:rows.length})
          }
        })
      }
    
    ;
    connection.release();
  });
});

module.exports = router;
