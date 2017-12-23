import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'
// withRouter 包裹非路由组件 获取路由信息
@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends Component {
  componentDidMount () {
    const routerPath = ['/login', '/register']
    // 当前路由path
    const pathName = this.props.location.pathname
    if (routerPath.indexOf(pathName) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('./login')
          }
        }
      })
      .catch(err => {

      })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
  
}

export default AuthRoute