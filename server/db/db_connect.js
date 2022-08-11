const mysql = require("mysql2");
const config = require("../config/config");
require("dotenv").config();

const pool = mysql.createPool({
  ...config[process.env.NODE_ENV],
  connectionLimit: 20,
});

pool.getConnection(function (err) {
  if (err) throw err;
  else console.log("Connencted");
});

module.exports = pool;
