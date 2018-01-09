/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const request = require('superagent');
import Main from "./Main";

import {BrowserRouter as Router,
  Route,
  Link, Redirect
} from 'react-router-dom'

class Login extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this._bind('componentDidMount','onPwdChange','onUnameChange','handleSubmit','getChildContext');
    this.state ={
      user:null, logged_in:false,
      pwd:null, failed:""
    };
  }
  getChildContext() {
      return {muiTheme: getMuiTheme(AppTheme)};
    }
  handleSubmit(event){
    const self = this;
    event.preventDefault();
    request.post('/login', {"username": this.state.user, "password":this.state.pwd},
      function(err, res) {
        if (!err) {
          if (res.body.auth){
              self.setState({logged_in: true, failed:""});
          }
        } else {
          self.setState({failed: "Login failed, try again."});

        }
      });

  }

onPwdChange(event){
  this.setState({pwd: event.target.value});
}
onUnameChange(event){
  this.setState({user: event.target.value});

}

  componentDidMount() {
    const self = this;

  }

  render() {
    if (this.state.logged_in === true) {
      return(
        <Main/>
      )
      } else {

      return (
      <div align="center">  <h3>Please log in</h3>
        <form   method="post" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username: </label><input onChange={this.onUnameChange} type="text" id="username" name="username"/>
        <br/>
        <label htmlFor="password">Password: </label><input  onChange={this.onPwdChange} type="password" id="password" name="password"/>
        <br/>
        <RaisedButton  primary={true} type="submit" label="Login" value="Login"/>
        <p>{this.state.failed}</p>

        </form>
        </div>
    )
    }
  };
}
Login.childContextTypes = {
  muiTheme: PropTypes.object
}
export default Login;
