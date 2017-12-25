import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Card,
  WhiteSpace,
  WingBlank
} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
         <WingBlank>
          <WhiteSpace></WhiteSpace>
          {this.props.userList.map(v => (
            v.avatar ?
            (<Card 
              key={v._id}
              onClick={() => this.props.history.push(`/chat/${v._id}`)}
            >
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              >
              </Header>
              <Body>
                {v.desc.split('\n').map(desc => (
                  <div key={desc}>
                    {desc}
                  </div>
                ))}
              </Body>
            </Card>) : null
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default UserCard