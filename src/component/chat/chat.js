import React, { Component } from 'react'
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
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
    if (!this.props.chat.chatmsg.length) {
      // 获取聊天列表
      this.props.getMsgList()
      // 监听收到的消息
      this.props.recvMsg()
    }
    // 解决Grid刷新布局问题 emoji
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    // 若没有获取到users 返回null
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    const emoji = '😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍ 👩‍ 👨‍ 👮 🕵 💂 👷 👸 👳 👲 🧕 🧔 👱 👱‍ 🤵 👰 🤰 🤱 👼 🎅 🤶 🧙‍ 🧚‍ 🧛‍ 🧜‍ 🧝‍ 🧞‍ 🧟‍ 🚶 🚶‍ 🚶‍ ‍💃 🕺 👯 👯‍ 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 ✊ 👊 🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 ☂ 💼'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({text: v}))
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id+Math.random()}>
                <Item
                  thumb={avatar}
                >
                  {v.content}
                </Item>
            </List>
          ) : (
            <List key={v._id+Math.random()}>
              <Item 
                className='chat-me'
                extra={<img src={avatar} alt="" />}
              >
                {v.content}
              </Item>
            </List>           
          )
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
                <div style={{cursor:'pointer'}}>
                  <span
                    role="img"
                    aria-label="smile"
                    style = {{marginRight: 15}}
                    onClick = {() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >
                    😁
                  </span>
                  <span
                    className='send'
                    onClick={() => this.handleSubmit()}
                  >
                    发送
                  </span>
                </div>
              }
            >
            </InputItem>
          </List>
          {this.state.showEmoji ? 
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={5}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            >
            </Grid>
            : null
          }
        </div>
      </div>
    )
  }
}

export default Chat