const mysql = require("mysql2")
const config = require('../config/config')

const pool = mysql.createPool({
    ...config.dev,
    connectionLimit:20,
});

pool.getConnection(function(err){
    if(err) throw err;
    else
    console.log('Connencted');
})

module.exports = pool