import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
class Login extends Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }
  register () {
    console.log(this.props)
    this.props.history.push('./register')
  }
  render () {
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <WhiteSpace size="sm"></WhiteSpace>
            <InputItem>用户名</InputItem>
            <WhiteSpace size="sm"></WhiteSpace>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace size="lg"></WhiteSpace>
          <Button type="primary">登录</Button>
          <WhiteSpace size="lg"></WhiteSpace>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login 