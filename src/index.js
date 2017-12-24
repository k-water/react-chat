import './index.css'
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
  Route,
  Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'

import AuthRoute from './component/authroute/authroute'

import BoyInfo from './container/boyinfo/boyinfo'
import GirlInfo from './container/girlinfo/girlinfo'

import DashBoard from './component/dashboard/dashboard'

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
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/boyinfo' component={BoyInfo}></Route>
            <Route path='/girlinfo' component={GirlInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route component={DashBoard}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)