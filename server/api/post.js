const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
});

router.get("/:idx", (req, res) => {
  const idx = req.params.idx;
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from POST where id == ${idx}`;
    connection.query(sql, (err, rows) => {
      res.send(rows);
      console.log(rows);
    });
    connection.release();
  });
});

// router.post("/", (req, res) => {
//   const reqData = req.body;
//   pool.getConnection((err, connection) => {
//     const sql = `insert into post(title,writer,content,password) values(${
//       (reqData.title, reqData.writer, reqData.content, reqData.password)
//     }, `;

//     connection.query(sql, (err, rows) => {
//       console.log(rows);
//     });
//     connection.release();
//   });
// });
module.exports = router;
