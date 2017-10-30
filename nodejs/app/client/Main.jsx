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

import AppBar from 'material-ui/lib/app-bar';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/lib/toolbar';

import BaseComponent from './common/BaseComponent';
import Welcome from './Welcome';
import Settings from './Settings';
import Howto from './Howto';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './style/theme';
import StreamJobs from './StreamJobs';

import IconButton from 'material-ui/lib/icon-button';

import FlatButton from 'material-ui/lib/flat-button';

const _ = require('lodash');
const request = require('superagent');

class Main extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this._bind('showPage','getChildContext');
    //this varible determines which page will be shown; "StreamsJobs/Welcome, or Settings"
    this.state = {
      current_page: "home"
    };
  }

  getChildContext() {
      return {muiTheme: ThemeManager.getMuiTheme(AppTheme)};
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
     fontSize: 15
   };

    return (
      <div>
        <AppBar style={{color: AppTheme.primary1Color}}
          showMenuIconButton={false}
          title={`Streams IoT Starter Kit`}
        />
        <Toolbar>
         <ToolbarGroup firstChild={true}>
        <FlatButton style={button_style} label="Home" onTouchTap={this.showPage('home')}/>
        <FlatButton style={button_style}  label="Tools" onTouchTap={this.showPage('tools')}/>

       <FlatButton style={button_style}  label="View All Credentials" onTouchTap={this.showPage('credentials')}/>
</ToolbarGroup>
  </Toolbar>
  <br/>
      {bodyElement}
      </div>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
}
export default Main;
