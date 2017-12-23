const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./db/model')
const User = model.getModel('user')

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
  // User.remove({}, function(err, doc) {
  //   return res.json(doc)
  // })
  User.find({}, function (err, doc) {
    return res.json(doc)
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

function md5Salt(pwd) {
  const salt = 'water is a good boy%@@!#!@@$!@'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router