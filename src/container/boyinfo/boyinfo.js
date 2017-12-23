import React, { Component } from 'react'
import { 
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BoyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      salary: '',
      desc: ''
    }
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
        >
          Boy完善信息页面
        </NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}
        >
        </AvatarSelector>
        <InputItem
          onChange={v => this.handleChange('title', v)}
        >
          招聘职位
        </InputItem>
        <InputItem
          onChange={v => this.handleChange('company', v)}
        >
          公司名称
        </InputItem>
        <InputItem
          onChange={v => this.handleChange('salary', v)}
        >
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
        >
        </TextareaItem>
        <Button type="primary">
          保存
        </Button>
      </div>
    )
  }
}

export default BoyInfo