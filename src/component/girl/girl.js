import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
function mapStateToProps(state) {
  return {
    chatUser: state.chatUser
  }
}

class Girl extends Component {
  componentDidMount() {
    this.props.getUserList('Boy')
  }
  render() {
    return (
      <UserCard userList={this.props.chatUser.userList}>
      </UserCard>
    )
  }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(Girl)