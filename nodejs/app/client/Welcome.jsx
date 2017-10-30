/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp. 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/lib/table';
import { Card, CardHeader, CardText } from 'material-ui/lib/card';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import Howto from './Howto';

import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class Welcome extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this._bind('componentDidMount');
    this.state = {
      current_menu: "Home"
    };
  }

  componentDidMount() {
    const self = this;

  }





  render() {
  const header_style = {
    textAlign: 'center',
    color: AppTheme.palette.primary1Color
  };
  const div_style = {
    display: 'inline-block'
  };
  const button_style = {
    margin: 20,
    fontSize: 20
  };



  return (
        <div>
        <div style={header_style}>
        <h1>Welcome to the Streams IoT Starter Kit</h1>
        <h3>Your Streaming Analytics service and Watson IoT Platform services have been set up. You are now ready to create Streams applications to analyze data from edge devices.</h3>
      </div>
      <Card style={button_style}><CardHeader   subtitleColor={AppTheme.cardSubtitleColor}
          style={{backgroundColor:      AppTheme.palette.primary2Color}}
            titleStyle={{fontSize: 25}}  title="Get Started"
            />
         <CardText>

        <br/>

        <Table width="100%" selectable={false}>

       <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} width="50%"><h3>This short animation shows how data moves from IoT devices to Streams applications.</h3><br/>
                  <video width="600" height="400" controls src="https://developer.ibm.com/streamsdev/wp-content/uploads/sites/15/2017/10/iotanimation-video.mp4" type="video/mp4">
                       Your browser does not support the video tag. <a href="https://developer.ibm.com/streamsdev/wp-content/uploads/sites/15/2017/10/iotanimation-video.mp4">Watch it here.</a>
                  </video>
                  </TableRowColumn>
                  <TableRowColumn style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} width="50%"><h3>Get Started</h3>
                  <p><b>1. Create an Edgent application</b><br/>Follow this recipe to <a href="https://developer.ibm.com/recipes/tutorials/send-events-to-the-watson-iot-platform-from-a-raspberry-pi-running-apache-edgent/">
                                        create an Edgent application that sends data to the Watson IoT platform</a>.
                  </p>
                  <p><b>2. Submit the <code>IotPlatform</code> application</b><br/>
                  Click "Tools" above to submit the job if it is not running.
                  </p>
                  <p><b>3. Create a Streams application</b><br/>
                    For <b>SPL and Java</b>, complete the follow up to the Edgent recipe to
                    <br/>
<a href="https://developer.ibm.com/recipes/tutorials/connect-apache-edgent-to-the-streaming-analytics-service-using-the-watson-iot-platform/">
                  Create a Streams application that processes the data from Edgent</a>
                  </p>
                  <p><b>For Python,</b> this Python notebook walks you through creating a Streams application. <br/> An Edgent application that generates data is provided.


                   Note: Some of these tutorials give instructions to<br/>create credentials.These credentials have already been created for you.<br/> Retrieve them by clicking "View Credentials" above.
                  </p>
                  <h4>More Resources</h4>
                  <a href="https://developer.ibm.com/streamsdev/docs/cheat-sheet-connecting-edgent-streams-applications/">Cheatsheet for connecting Edgent and Streams applications</a>
                  <br/><a href="https://github.com/IBMStreams/samples/blob/master/IoT/ReadEdgentEvents/">Sample Streams applications on Github</a>
</TableRowColumn>
                </TableRow>          </TableBody>
        </Table>


            </CardText></Card>


        </div>
    )
  };
}

export default Welcome;
