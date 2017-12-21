import { combineReducers } from 'redux'

export default combineReducers({
  friends: FriendListReducer
})

export function FriendListReducer(state = {friends : []}, action) {
  switch (action.type) {
    case 'ADD_FRIEND':
      return [
        { friends : action.payload.friend }, ...state.friends
      ]     
    default:
      return state
  }
}