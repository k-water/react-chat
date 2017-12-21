import React from 'react';
import ReactDOM from 'react-dom';
import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import reducers from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'

const store = createStore(reducers, compose(
  // 开启redux调试
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <div>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </div>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)