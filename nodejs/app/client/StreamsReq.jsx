/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/lib/card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/lib/table';

import RaisedButton from 'material-ui/lib/raised-button';
import DownloadButton from './DownloadButton';

import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class StreamsReqs extends BaseComponent {
  constructor(props, context) {


    super(props, context);
    this._bind('doGetCreds')
    this.state = {
      errmsg: null,
      sas_creds: null,


    };
  }


  doGetCreds() {
    const self = this;
    if (this.state.sas_creds == null){
      request.post('/api/streams/sacreds')
        .end(function(err, res) {
          if (err) {
            self.setState({
              errmsg: res.body.message || err.message
            });
          } else if (res && !_.isEmpty(res.text)) {
           const obj = JSON.parse(res.text);
            self.setState({
              errmsg: null,
              sas_creds: JSON.stringify(obj['sas']),

            });

          }
        });
    }


  };

    render() {
      const textarea = this.state.errmsg || this.state.sas_creds || 'Click Get Credentials to Retrieve';
      const disableButton = _.isEmpty(this.state.sas_creds);

      return (
        <Card >
          <CardHeader title="Streaming analytics credentials"
          titleColor={AppTheme.cardTitleColor}
          subtitle="Credentials and steps needed for your Streaming Analytics application to receive events from the Watson IoT Platform."
          subtitleColor={AppTheme.cardSubtitleColor} style={{
            backgroundColor: AppTheme.palette.primary2Color}} titleStyle={{
            fontSize: 'large'
          }}/>

          <CardText >
          <h3>1. Watson IoT Platform API Keys</h3>
          You need these credentials to submit the <code>IotPlatformBluemix</code> application. This is a Streams application that pulls events from the Watson IoT Platform. Once the <code>IoTPlatformBluemix</code> application is running, any other Streams application running in the same instance can access those events.
        <br/>
         <DownloadButton name="watson_iot_auth.txt" uri="/api/streams/iotauth" label="Download credentials as property file"/>
          <br/>

          <br/>
          <hr/>
          <h3>2. Streaming Analytics Service credentials</h3>
          These credentials are needed if you are going to create a Streams application using the Python or Java API.
          <br/>  <textarea
              readOnly
              style={{resize: 'none'}}

              id='sas_creds'
              cols={80}
              rows={10}
              value={this.state.sas_creds}
            />

          <br/>
          <RaisedButton label="Get credentials" onTouchTap={this.doGetCreds} />
          <br/>
          <span>{this.state.errmsg}</span>
  </CardText>

        </Card>

      )
    };
  }

  export default StreamsReqs;
