import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'


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
    console.log(this.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
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