const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.post("/", (req, res) => {
  const category = req.body.category; //title,writer,hashtag,content
  const keyword = req.body.keyword;

  const con = pool.getConnection((err, connection) => {
    const sql =
      category == "hashtag"
        ? `select * 
        from post
        where (id in (
            select post_id 
            from post_tag 
            where (tag_id in (select id from tag where (name like '%${keyword}%')))));
        `
        : `select * from post where ${category} like '%${keyword}%'`;
    connection.query(sql, (err, rows) => {
      if (err) res.send(err);
      else {
        res.json(rows);
        console.log(rows)
      }
    });
    connection.release();
  });
});

module.exports = router;
