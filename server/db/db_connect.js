const mysql = require("mysql2");
const config = require("../config/config");
const env = process.env.NODE_ENV || "development"

const pool = mysql.createPool({
  ...config[env],
  connectionLimit: 20,
});

pool.getConnection(function (err) {
  if (err) throw err;
  else console.log("Connencted");
});

module.exports = pool;
  