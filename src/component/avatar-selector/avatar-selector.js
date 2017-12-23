import React, { Component } from 'react'
import {
  Grid,
  List
} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequire
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  render() {
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippo,koala,lemur,man,pig,tiger,whale,woman,zebra'
                       .split(',')
                       .map(v => ({
                         icon: require(`../img/${v}.png`),
                         text: v
                       }))
    const gridHeader = this.state.icon
                        ? (<div>
                            <span>已选择头像</span>
                            <img src={this.state.icon} style={{width: 20}} alt=""/>
                          </div>)
                        : <div>请选择头像</div>
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
            data={avatarList}
            columnNum={5}
            onClick={ele => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
          >
          </Grid>
        </List>
      </div>
    );
  }
}

export default AvatarSelector