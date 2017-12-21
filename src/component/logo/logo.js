import React, { Component } from 'react'
import LogoImg from './logo.png'
import './logo.css'
class Logo extends Component {
  render () {
    return (
      <div className="logo-container">
        <img src={LogoImg} alt=""/>
      </div>  
    )
  }
}

export default Logo