const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./db/model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {
  'pwd': 0,
  '__v': 0
}

Router.get('/info', function (req, res) {
  const {
    userid
  } = req.cookies
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  User.findOne(({
    _id: userid
  }), _filter, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: '服务端错误'
      })
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

Router.get('/list', function (req, res) {
  const {
    type
  } = req.query
  // const query = type !== '' ? { type } : null
  User.find({
    type
  }, function (err, doc) {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/login', function (req, res) {
  const {
    user,
    pwd
  } = req.body
  User.findOne({
    user,
    pwd: md5Salt(pwd)
  }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    }
    res.cookie('userid', doc._id)
    return res.json({
      code: 0,
      data: doc,
      msg: '登录成功'
    })
  })
})

Router.post('/register', function (req, res) {
  const {
    user,
    pwd,
    type
  } = req.body
  User.findOne({
    user
  }, function (err, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }
    const userModel = new User({
      user,
      pwd: md5Salt(pwd),
      type
    })
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({
          code: 1,
          msg: '服务端错误'
        })
      }
      const {
        user,
        type,
        _id
      } = doc
      // 保存cooike跳转到对应用户页面
      res.cookie('userid', _id)
      return res.json({
        code: 0,
        data: {
          user,
          type,
          _id
        },
        msg: '注册成功'
      })
    })
  })
})

Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({
      code: 0,
      data
    })
  })
})

Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userid
  User.find({}, function (err, doc) {
    let users = {}
    doc.forEach(v => {
      users[v._id] = {
        name: v.user,
        avatar: v.avatar
      }
    })
    Chat.find({
      '$or': [{
        from: user
      }, {
        to: user
      }]
    }, function (err, doc) {
      if (!err) {
        return res.json({
          code: 0,
          msgs: doc,
          users: users
        })
      } else {
        return res.json({
          code: 1,
          msg: err
        })
      }
    })
  })
})

Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid
  const {
    from
  } = req.body
  // console.log(userid, from)
  // from 我发给对方消息的ID
  // to 我自己的ID
  Chat.update({
    from,
    to: userid
  }, {
    '$set': {
      read: true
    }
  }, {
    'multi': true
  }, function (err, doc) {
    // console.log(doc)
    if (!err) {
      return res.json({
        code: 0,
        num: doc.nModified,
        msg: '修改成功'
      })
    }
    return res.json({
      code: 1,
      msg: err
    })
  })
})

function md5Salt(pwd) {
  const salt = 'water is a good boy%@@!#!@@$!@'
  return utils.md5(utils.md5(pwd + salt))
}


module.exports = Router