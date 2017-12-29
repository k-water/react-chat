import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Badge
} from 'antd-mobile'

@connect(
  state => state
)
class Msg extends Component {
  getLastInfo(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    // 根据不同的用户进行聊天信息的分组
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastInfo(a).create_time
      const b_last = this.getLastInfo(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLastInfo(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          if(!userinfo[targetId]) {
            return null
          }
          const unreadNum = v.filter(v => !v.read && v.to === userid).length
          return (
            <List key={lastItem._id}>
              <Item
                extra = {<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>
                  {userinfo[targetId].name}
                </Brief>
              </Item>
            </List>
          )
        })}
      </div>
    );
  }
}

export default Msg