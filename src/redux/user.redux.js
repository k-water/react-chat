import axios from 'axios'
import {
  getRedirectPath
} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERRPR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

// 初始化state
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// user reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA: 
      return {
        ...state,
        ...action.payload
      }
    case ERRPR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      }
    default:
      return state
  }
}

// user 触发器

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERRPR_MSG
  }
}

// user dispatch 更新reducer

export function register({
  user,
  pwd,
  repeatpwd,
  type
}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名和密码必须输入')
  }

  if (pwd !== repeatpwd) {
    return errorMsg('两次输入密码不一致')
  }

  // redux 异步
  return dispatch => {
    // console.log('send')
    axios.post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({
            user,
            pwd,
            type
          }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 登录
export function login({
  user,
  pwd
}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  // redux 异步
  return dispatch => {
    // console.log('send')
    axios.post('/user/login', {
        user,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}


export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))          
        }
      })
      .catch(err => {

      })
  }
}