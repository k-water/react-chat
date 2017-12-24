import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavBar
} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function Boss() {
  return <h2>Boy首页</h2>
}

class DashBoard extends Component {
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    // console.log(user)
    const navList = [
      {
        path: '/boy',
        text: 'Girl',
        icon: 'boss',
        title: 'Girl List',
        component: Boss,
        hide: user.type === 'Girl'
      },
      {
        path: '/girl',
        text: 'boy',
        icon: 'job',
        title: 'Boy List',
        component: Boss,
        hide: user.type === 'Boy'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Boss
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Boss
      }
    ]
    return (
      <div>
        <NavBar
          mode='dard'
        >
          {navList.find(v => v.path === pathname).title}
        </NavBar>

        <NavLinkBar
          data={navList}
        >
        </NavLinkBar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(DashBoard)