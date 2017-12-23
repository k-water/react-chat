import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
@connect (
  state =>  state.user,
  { login }
)
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  register () {
    // console.log(this.props)
    this.props.history.push('./register')
  }
  handleLogin() {
    this.props.login(this.state)
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <WhiteSpace size="sm"></WhiteSpace>
            <InputItem
              onChange = {v => this.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <WhiteSpace size="sm"></WhiteSpace>
            <InputItem
              type="password"
              onChange = {v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace size="lg"></WhiteSpace>
          <Button 
            type="primary"
            onClick={this.handleLogin}
          >
            登录
          </Button>
          <WhiteSpace size="lg"></WhiteSpace>
          <Button 
            onClick={this.register} 
            type="primary"
          >
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login 