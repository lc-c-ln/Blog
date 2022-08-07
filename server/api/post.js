const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.get("/", (req, res) => {
  const idx = req.query["id"];
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from POST where (id=${idx})`;
    connection.query(sql, (err, rows) => {
      res.json({ id: `받은 것 : ${idx + rows}+1` });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  reqData = req.body;
  const title = pool.getConnection((err, connection) => {
    const sql = `insert into post(title, writer, content, password) values(${
      "\""+reqData.title +
      "\", \"" +
      reqData.writer +
      "\", \"" +
      reqData.content +
      "\", \"" +
      reqData.password
    }")`;
    console.log(sql);
    connection.query(sql, (err, rows) => {
      console.log(rows + err);
      
    });
    connection.release();
  });
});

// router.post("/", (req, res) => {
//   const reqData = req.body;
//   pool.getConnection((err, connection) => {
//     }, `;

//   });
// });
module.exports = router;
