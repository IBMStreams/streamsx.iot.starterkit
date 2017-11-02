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

import AppTheme from './style/theme';

class Settings extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
  const paper_style = {
    padding: 20
  };
  const tab_style = {
    fontSize: "13pt", color: AppTheme.cardTitleColor
  };


    return (

  <Tabs style={{margin: 20}}>
 <Tab  style={tab_style} label="Edgent credentials" >
        <Paper style={paper_style} zDepth={2} >
          <DeviceCfg/>
        </Paper>
        </Tab>
        <Tab style={tab_style} label="Streams credentials" >

        <Paper style={paper_style} zDepth={2} >
          <StreamsReqs/>
        </Paper>

        </Tab>
        </Tabs>

    );
  }
}

export default Settings;
