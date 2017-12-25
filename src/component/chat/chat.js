import React, { Component } from 'react'
import {
  List,
  InputItem
} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    // 获取聊天列表
    this.props.getMsgList()
    // 监听收到的消息
    this.props.recvMsg()
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }
  render() {
    return (
      <div>
        {this.state.msg.map(v => {
          return <p key={v}>{v}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <span
                  onClick={() => this.handleSubmit()}
                >
                  发送
                </span>
              }
            >
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat