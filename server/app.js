const express = require('express')
const path = require('path')
const cors = require('cors')
global.__rootDir = path.resolve(__dirname)
const PORT = 5000

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json())
app.use('/post', require('./api/post'))
app.use('/tag', require('./api/tag'))
app.use('/comment', require('./api/comment'))
app.use('/search', require('./api/search'))
app.use('/postlist', require('./api/postlist'))
app.use('/auth', require('./api/auth'))
app.use('/counter', require('./api/counter'))


app.get("/",(req,res)=>{
    res.send('ok')
})

const server = app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}...`)
})
