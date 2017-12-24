import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatuser.redux'

// 合并多个reducer

export default combineReducers({
  user,
  chatUser
})
