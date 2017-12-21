import axios from 'axios'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERRPR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

export function user (state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        // redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        // redirectTo: getRedirectPath(action.payload),
        isAuth: true,
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

function registerSuccess (data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

function errorMsg (msg) {
  return {
    msg,
    type: ERRPR_MSG
  }
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名和密码必须输入')
  }

  if(pwd !== repeatpwd) {
    return errorMsg('两次输入密码不一致')
  }

  // redux 异步
  return dispatch => {
    // console.log('send')
    axios.post('/user/register', {user, pwd, type})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  // redux 异步
  return dispatch => {
    // console.log('send')
    axios.post('/user/login', {user, pwd})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}