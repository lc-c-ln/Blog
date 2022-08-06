const express = require('express')


const app = express();

app.use('/post', require('./api/post'))

const server = app.listen(5000, () => {
    console.log("server is runing...")
})
