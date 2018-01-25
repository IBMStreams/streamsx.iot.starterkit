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
import {BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseComponent from './common/BaseComponent';
import Welcome from './Welcome';
import Settings from './Settings';
import Howto from './Howto';

//import ThemeManager from 'material-ui/styles/theme-manager';
import AppTheme from './style/theme';
import StreamJobs from './StreamJobs';

import IconButton from 'material-ui/IconButton';

import FlatButton from 'material-ui/FlatButton';

const _ = require('lodash');
const request = require('superagent');



class Main extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this._bind('showPage','getChildContext');
    //this variable determines which page will be shown; "StreamsJobs/Welcome, or Settings"
    this.state = {
      current_page: "home"
    };
  }

  getChildContext() {
      return {muiTheme: getMuiTheme(AppTheme)};
    }


  showPage(page){
    const self = this;
    return function (event) {
      self.setState({current_page: page});

      };
    }


  render() {
    //this determines which page to show, the full "Settings page " (see settings.jsx)
    //or the home page (welcome.jsx)

   let bodyElement = <Welcome/>
   if (this.state.current_page === 'credentials') {
     bodyElement = <Settings />;
   } else if (this.state.current_page === 'tools') {
      bodyElement = <StreamJobs/>;
   }

   const button_style = {
     margin: 12,
     fontSize: "13pt"
   };

    return (
      <div>

        <AppBar style={{color: AppTheme.palette.primary1Color}}
          showMenuIconButton={false}
          title={`Streams IoT Starter Kit`} titleStyle={{fontSize: "25pt", color: AppTheme.cardTitleColor}}
        />
        <Toolbar  >
         <ToolbarGroup firstChild={true}>
        <FlatButton style={button_style} label="Home" onClick={this.showPage('home')}/>
        <FlatButton style={button_style}  label="Tools" onClick={this.showPage('tools')}/>

       <FlatButton style={button_style}  label="View All Credentials" onClick={this.showPage('credentials')}/>
</ToolbarGroup>
  </Toolbar>
  <br/>
      {bodyElement}
      </div>
    );
  }
}

Main.childContextTypes = {
  muiTheme: PropTypes.object
}
export default Main;
