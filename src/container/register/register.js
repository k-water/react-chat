import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import hocForm from '../../component/hocform/hocform' 
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
@hocForm
class Register extends Component {
  constructor (props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type', 'Boy')
  }
  handleRegister() {
    this.props.register(this.props.state)
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
              onChange = {v => this.props.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange = {v => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange = {v => this.props.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={this.props.state.type ==='Boy'}
              onChange = {v => this.props.handleChange('type', 'Boy')}
            >
              Boy
            </RadioItem>
            <RadioItem 
              checked={this.props.state.type ==='Girl'}
              onChange = {v => this.props.handleChange('type', 'Girl')}
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