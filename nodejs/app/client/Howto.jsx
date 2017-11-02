/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2017                              */
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

class Howto extends BaseComponent {
  constructor(props, context) {
  super(props,context);
  }

  render(){

    return(
    <div>


    <CustomCard align="left" title="Create your own Edgent-Streams application">


<ol><li><b>Create an Edgent application that sends data to the Watson IoT Platform </b><br/>
  <a target="blank" href="https://developer.ibm.com/recipes/tutorials/send-events-to-the-watson-iot-platform-from-a-raspberry-pi-running-apache-edgent/">Follow this recipe to see how to do so on a device such as a Raspberry Pi</a>
  <br/> You will need a <a href="/api/iot/devicecfg">device.cfg file</a> file to follow along.

</li>
<li><b>Submit the <code>IotPlatform</code> application</b><br/>
                        Click "Tools" above to submit the job if it is not running.
</li>
<li>
<b>Create a Streams application to process events from Edgent</b><br/>
                            <a href="https://developer.ibm.com/recipes/tutorials/connect-apache-edgent-to-the-streaming-analytics-service-using-the-watson-iot-platform/">Complete the follow up to the Edgent recipe</a>

        </li>
</ol>


                            <h4>More Resources</h4>
                            <a target="blank" href="https://developer.ibm.com/streamsdev/docs/cheat-sheet-connecting-edgent-streams-applications/">Cheatsheet for connecting Edgent and Streams applications</a>
                            <br/><a href="https://github.com/IBMStreams/samples/blob/master/IoT/">Sample Streams applications on Github</a>

    </CustomCard  >

      </div>
    )


  }
}

export default Howto;
