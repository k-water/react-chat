import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavBar
} from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boy from '../boy/boy'
import Girl from '../girl/girl'
import User from '../user/user'

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function Msg() {
  return <h2>Msg首页</h2>
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
        component: Boy,
        hide: user.type === 'Girl'
      },
      {
        path: '/girl',
        text: 'boy',
        icon: 'job',
        title: 'Boy List',
        component: Girl,
        hide: user.type === 'Boy'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar
          mode='dard'
          className='fixed-header'
        >
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}>
              </Route>
            ))}
          </Switch>
        </div>
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