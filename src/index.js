import React from 'react';
import ReactDOM from 'react-dom';
import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux'
import thunk from 'react-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
  // 开启redux调试
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  (
    <Provider store = {store}>
      <Router>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)