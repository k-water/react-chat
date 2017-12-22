import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'

// const alert = Modal.alert

// connect包裹Register 返回高阶组件 传递state
@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'Boy'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    this.props.register(this.state)
  }

  // componentDidUpdate () {
  //   if (this.props.msg === '用户名重复') {
  //     alert('警告', this.props.msg, [
  //       { text: '确定', onPress: () => console.log('ok') },
  //     ])
  //   } else {
  //     return null
  //   }
  // }

  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem
              onChange = {v => this.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange = {v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange = {v => this.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={this.state.type ==='Boy'}
              onChange = {v => this.handleChange('type', 'Boy')}
            >
              Boy
            </RadioItem>
            <RadioItem 
              checked={this.state.type ==='Girl'}
              onChange = {v => this.handleChange('type', 'Girl')}
            >
              Girl
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button 
            type="primary"
            onClick={this.handleRegister}
          >
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register 