const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

const userRouter = require('./user')
app.use('/user', userRouter)


app.listen(9093, function() {
  console.log('Node app start at port 9093')
})