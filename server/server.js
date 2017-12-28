const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const log4js = require('log4js')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./db/model')
const Chat = model.getModel('chat')

var logger = log4js.getLogger()
logger.level = 'debug'
logger.debug("Some debug messages")

// Chat.remove({}, function(e, d){})

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
      console.log('send')
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}))
const userRouter = require('./user')
app.use('/user', userRouter)


server.listen(9093, function() {
  console.log('Node app start at port 9093')
})