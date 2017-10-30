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
import Paper from 'material-ui/lib/paper';
import {Tabs, Tab} from 'material-ui/lib/tabs';
import BaseComponent from './common/BaseComponent';
import DeviceCfg from './DeviceCfg';
import StreamsReqs from './StreamsReq';
class Settings extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const paper_style = {
      margin: 20
    };

    return (

  <Tabs>
 <Tab label="Edgent credentials" >
        <Paper zDepth={2} style={paper_style}>
          <DeviceCfg/>
        </Paper>
        </Tab>
        <Tab label="Streams credentials" >

        <Paper zDepth={2} style={paper_style}>
          <StreamsReqs/>
        </Paper>

        </Tab>
        </Tabs>

    );
  }
}

export default Settings;
