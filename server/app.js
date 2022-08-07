const express = require('express')
const path = require('path')

global.__rootDir = path.resolve(__dirname)
const PORT = 5000

const app = express();
app.use(express.urlencoded({extended:false}))

app.use('/post', require('./api/post'))
// app.use('/hashtag', require('./api/hashtag'))
// app.use('/comment', require('./api/comment'))
app.get("/",(req,res)=>{
    res.send('ok')
})
const { sequelize } = require('./models/index'); // 시퀄라이즈

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const server = app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}...`)
})
