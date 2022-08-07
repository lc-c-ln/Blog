const express = require('express')
const path = require('path')

global.__rootDir = path.resolve(__dirname)
const PORT = 5000

const app = express();
app.use(express.urlencoded({extended:false}))

app.use('/post', require('./api/post'))
app.use('/tag', require('./api/tag'))
app.use('/comment', require('./api/comment'))
app.use('/search', require('./api/search'))

app.get("/",(req,res)=>{
    res.send('ok')
})

const server = app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}...`)
})
