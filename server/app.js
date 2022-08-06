const express = require('express')

const app = express();
const PORT = 5000

app.use('/post', require('./api/post'))
// app.use('/hashtag', require('./api/hashtag'))
// app.use('/comment', require('./api/comment'))

const server = app.listen(PORT, () => {
    console.log(`server is runing on${PORT}...`)
})


const mysql = require("mysql2")
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"0000"
});

con.connect(function(err){
    if(err) throw err;
    console.log('Connencted');
})