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
import CustomCard from './CustomCard';

import DownloadButton from './DownloadButton';

import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class DeviceCfg extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this._bind('componentDidMount');
    this.state = {
      errmsg: null,
      devicecfg: null
    };
  }

  componentDidMount() {
    const self = this;
    request.get('/api/iot/devicecfg')
      .end(function(err, res) {
        if (err) {
          self.setState({
            errmsg: res.body.message || err.message
          });
        } else if (!_.isEmpty(res.text)) {
          self.setState({
            errmsg: null,
            devicecfg: res.text
          });
        }
      });
  }


  render() {
    const textarea = this.state.errmsg || this.state.devicecfg || 'Updating...';
    const disableButton = _.isEmpty(this.state.devicecfg);
    const appVersion = process.env.npm_package_version;

    return (
    <div>
        <b>Registered device info</b>
        <br/>
        A device has already been registered with the Watson IoT platform. Use these credentials to send events from your Edgent application to the Streams via the Watson IoT platform.
        <br/><br/>


          <textarea
            readOnly
            style={{resize: 'none'}}
            id='devicecfg'
            cols={80}
            rows={textarea.split('\n').length}
            value={textarea}
          />
          <br />
          <DownloadButton name="device.cfg" uri="/api/iot/devicecfg"  label="Download device.cfg"/>
          <br/>

          </div>
    )
  };
}

export default DeviceCfg;
