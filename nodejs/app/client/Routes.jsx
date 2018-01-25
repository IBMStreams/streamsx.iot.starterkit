import React from 'react';
import Main from './Main';
import Login from './Login'
import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');


import {BrowserRouter as Router,
  Route,
  Link,  Switch
} from 'react-router-dom'

class  Routes extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this._bind('componentDidMount');

  }




  componentDidMount() {
    const self = this;

  }

  render() {


    return (
    <Router>
<Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/main" exact component={Main}/>

      </Switch>
      </Router>
    )
  };
}

export default Routes;
