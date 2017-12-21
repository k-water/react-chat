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
      type: 'Boy'
    }
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem>用户名</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
            <WhiteSpace />
            <InputItem>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.state.type ==='Boy'}>
              Boy
            </RadioItem>
            <RadioItem checked={this.state.type ==='Girl'}>
              Girl
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register 