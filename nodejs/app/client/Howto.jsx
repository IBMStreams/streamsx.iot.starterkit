/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/lib/card';
import {Tabs, Tab} from 'material-ui/lib/tabs';
import DownloadButton from './DownloadButton';
import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class Howto extends BaseComponent {
  constructor(props, context) {
  super(props,context);
  }

  render(){
  const card_style = {
    margin: 20
  };

    return(
    <div>



    <Card style={card_style} >
      <CardHeader title="Overview"

      subtitle="Summary of the steps required to create an Edgent-Streams application."
      subtitleColor={AppTheme.cardSubtitleColor}
      style={{backgroundColor:
       AppTheme.palette.primary2Color}}
        titleStyle={{fontSize: 'large'
      }}/>
<CardText>
      <Tabs>
      <Tab label="1. Send events from Edgent to Streams">
      <ul>
      <li><a href="https://edgent.apache.org">Download Edgent</a>
      </li>
      <li> To send data to the Watson IoT platform you need a registered device and its credentials.
      A device has been registered for you, so just download its credentials so you can  use it from your Edgent application to connect to the platform.
    <br/>
    <DownloadButton
    name="device.cfg"
     label="Download device credentials" uri="/api/iot/devicecfg"/>

      </li>
      <li>Create an application and send a data stream, using your device.cfg file.<br/><a href="https://developer.ibm.com/streamsdev/docs/cheat-sheet-connecting-edgent-streams-applications/#sendedgent">See this cheat sheet for examples</a></li>
      </ul>

</Tab>
      <Tab label="2. Process events from Edgent with Streams">

      You need to:
      <ul>
      <li> Connect to the Watson IoT platform to retreive data from your edge device. To do this,  launch the <code>IotPlatform</code> application by going to the "Tools" page above.
        </li>
        <li> Create a Streams application using Java, SPL or Python,  <a href="https://developer.ibm.com/streamsdev/docs/cheat-sheet-connecting-edgent-streams-applications/">as documented in this cheat sheet</a>.</li>

        </ul>
      </Tab>
      </Tabs>
      </CardText>
      </Card>
        <br/>
      </div>
    )


  }
}

export default Howto;
