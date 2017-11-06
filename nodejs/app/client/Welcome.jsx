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
import Download from 'material-ui/lib/svg-icons/file/file-download';
import Howto from './Howto';
import Paper from 'material-ui/lib/paper';
import CustomCard from './CustomCard';

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
    color: AppTheme.palette.primary2Color
  };





  return (
        <div>
        <div style={header_style}>
        <h1>Welcome to the Streams IoT Starter Kit</h1>
        </div>


              <p >  The Streaming Analytics service and Watson IoT Platform services have been set up.
                <br/>
                 In addition, all the necessary credentials for the services have been created for you.
                 When you need these credentials you can retrieve them by clicking <b>View all Credentials</b> above.
                  </p>



                <CustomCard title="Overview" align="center">

                   This animation shows how data moves from IoT devices to Streams applications.<br/>
                  <video
                    autoPlay="autoPlay"
                    width="700" height="600"
                    controls
                    src="https://developer.ibm.com/streamsdev/wp-content/uploads/sites/15/2017/10/iotanimation-video.mp4" type="video/mp4">
                               Your browser does not support the video tag. <a href="https://developer.ibm.com/streamsdev/wp-content/uploads/sites/15/2017/10/iotanimation-video.mp4">Watch it here.</a>
                          </video>

                          </CustomCard>


      <CustomCard title="Try it Out" align="left" >

                    You can try out a complete Edgent-Streams scenario with the IoT sensors application. The Edgent part of the application sends events from a simulated sensor to the Watson IoT Platform. The Streams application retrieves those events and sends commands back to the Edgent application.
                          <ol><li><b>Run the sample Edgent application on your device:</b>
                            <ul>
                            <li><a href="/api/iot/devicecfg">Download your device.cfg file</a></li>
                            <li><a href="https://edgent.apache.org/docs/downloads.html">Download and unpack Edgent</a>, choose a binary release</li>
                            <li><code>cd &lt;edgent&gt;/java8/scripts/connectors/iotp</code></li>
                            <li>Edgent 1.1.0+: Edit <code>runiotpsensors.sh</code> to uncomment out the line starting with <code>USE_OLD_EVENT_FORMAT</code></li>
                            <li><code>./runiotpsensors.sh device.cfg </code>
                            <br/>The application will start sending simulated temperature readings to the Watson IoT Platform.
                          <br/><br/></li>  </ul>
                          </li>
        <li><b>Submit the <code>IotPlatform</code> application</b><br/>
                          Click "Tools" above to submit the job if it is not running.<br/><br/>
                          </li>
                          <li><b>Run the Streams application</b><br/>
                           <ul><li>Submit the <a href="https://github.com/IBMStreams/streamsx.iot/releases/download/v1.1.1/com.ibm.streamsx.iot.sample.edgent.IotpSensors.sab">SPL sample application</a> to your Streams instance.</li>
                          <li> For Python and Java applications, first download your Streaming Analytics <a href="/api/streams/sacfgfile">credentials</a> file, and follow the instructions in the sample to run it.</li>
   <li><a href="https://streams-github-samples.mybluemix.net/?get=IoT%2FReadEdgentEvents%2Fjava%2FStreamingAnalyticsAndEdgent">Java sample application</a></li>
                            <li><a href="https://streams-github-samples.mybluemix.net/?get=IoT%2FReadEdgentEvents%2Fpython%2FStreamsPythonAndEdgent%2F">Python sample application</a></li>
</ul>

                            Once the application is running, it will start sending commands back to your Edgent application. You should see output like this:
                            <br/><code>{'"name":"A","reading":....'}<br/>
        <b>Alert code: 249<br/></b>
        {'"name":"A","reading":....'}</code>
        </li>
                           </ol>
                           <h3>Next, create your own application by following the steps below.</h3>

                           </CustomCard>


<Howto/>
        </div>
    )
  };
}

export default Welcome;
