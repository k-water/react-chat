const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./db/model')
const Chat = model.getModel('chat')

io.on('connection', function(socket) {
  // console.log('user login')
  // 监听发送信息的socket事件
  socket.on('sendmsg', function(data) {
    // console.log(data)
    // io.emit('recvmsg', data)
    // 获取发送的消息数据
    // 保存到数据库
    // 同时触发收到消息的事件 recvmsg
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())

const userRouter = require('./user')
app.use('/user', userRouter)


server.listen(9093, function() {
  console.log('Node app start at port 9093')
})