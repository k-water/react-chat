import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'
// 合并多个reducer

export default combineReducers({
  user,
  chatUser,
  chat
})
