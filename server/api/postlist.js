const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

// 전체 페이지 개수랑 현재 페이지의 10개 정보 줘야 함.
router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from POST`;
    connection.query(sql, (err, r1) => {
      const commentsql = `SELECT * from COMMENT`;
      connection.query(commentsql, (err, r2) => {
        res.json({ postCnt: r1.length, commentCnt: r2.length });
      });
    });
    connection.release();
  });
});

module.exports = router;
