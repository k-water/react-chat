import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { 
  Card,
  WhiteSpace,
  WingBlank
} from 'antd-mobile'

function mapStateToProps(state) {
  return {

  }
}

class Boy extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    axios.get('/user/list?type=Girl')
      .then(res => {
        if (res.data.code === 0) {
          this.setState({
            data: res.data.data
          })
        }
      })
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          {this.state.data.map(v => (
            v.avatar ?
            (<Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              >
              </Header>
              <Body>
                {v.desc.split('\n').map(v => (
                  <div key={v}>
                    {v}
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

export default connect(
  mapStateToProps,
)(Boy)