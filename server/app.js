const express = require('express')
const path = require('path')

global.__rootDir = path.resolve(__dirname)
const PORT = 5000

const app = express();

app.use('/post', require('./api/post'))
// app.use('/hashtag', require('./api/hashtag'))
// app.use('/comment', require('./api/comment'))

const server = app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}...`)
})
