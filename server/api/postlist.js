const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

// 전체 페이지 개수랑 현재 페이지의 10개 정보 줘야 함.
router.get("/", (req, res) => {
  const page  = req.query["page"];
  pool.getConnection((err, connection) => {
    const sql = `SELECT id, title, writer, reg_date, comment_cnt, view_cnt, like_cnt from POST LIMIT 10 OFFSET ${(page-1)*10}`;
    connection.query(sql, (err, rows) => {
        res.json({page:rows, cnt:rows.length})
    });
    connection.release();
  });
});

module.exports= router;