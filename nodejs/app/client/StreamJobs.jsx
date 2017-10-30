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
import { Card, CardText, CardHeader, CardActions } from 'material-ui/lib/card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/lib/table';

import RaisedButton from 'material-ui/lib/raised-button';
import Refresh from 'material-ui/lib/svg-icons/navigation/refresh';
import Report from 'material-ui/lib/svg-icons/content/report';
import Publish from 'material-ui/lib/svg-icons/editor/publish';

import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class StreamJobs extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this._bind('componentDidMount', 'refreshJobStatus', 'stopJobs', 'submitJobs');
    this.state = {
      foundJob : false,
      healthy  : false,
      disableActions: false,
      jobCount: 0,
      recentSubmit:  false
    };
  }

  refreshJobStatus() {
    //see server/routes/jobs-endpoint
    request.get('/api/streams/jobs/iotplatformjob')
      .end(null);
  }


  stopJobs() {
    request.delete('/api/streams/jobs')
      .end(null);
  }

  submitJobs() {

    this.setState({disableActions: true, recentSubmit : true});
    request.post('/api/streams/jobs')
      .end(null);
  }

  componentDidMount() {
    const self = this;
    this.socket = io();
    //this connection uses a socket, so that there is a push of the
    //results of the REST request to stop a job.
    this.socket.on('iotplatformjob', function(status) {
      if (status == null) {
        self.setState({
          disableActions: true,

        });
      } else {
        if (status.found && status.healthy){
           if (self.state.recentSubmit){
             self.setState({recentSubmit: false});
          }
        }
        //json object is returned with the state of the iotplatformbluemix job
        self.setState({
            foundJob: status.found,
            disableActions: false,
            jobCount: status.job_count,
            healthy: status.healthy,
            id : status.id
          });
        }
    });
    this.refreshJobStatus();
  }

  render() {
    const refreshText = this.state.disableActions ? 'Updating..' : 'Refresh Status';
    const refreshDisable = this.state.disableActions;


    let message = this.state.disableActions ? "Updating..." : "";
    let found = this.state.foundJob;

    const jobButtonText = found ? 'Stop Job' : 'Submit IoTPlatform Job';
    const jobButtonIcon = found ?  (<Report />): (<Publish />);
    const jobButtonAction = found ? this.stopJobs :  this.submitJobs;


    if (!this.state.disableActions) {
        if (found && this.state.healthy) {
          message = "The IotPlatform application is running and healthy in your instance. You're all set! Job Id: " + this.state.id;
        } else if (found && !this.state.healthy && !this.state.recentSubmit) {
          message = "The IotPlatform application is running but is unhealthy. You might need to stop the job and re-start it. Job Id: " + this.state.id + ". Visit the Streams Console for more information.";
        } else if (found && !this.state.healthy && this.state.recentSubmit) {
          message = "The IotPlatform application is starting up. If it remains in this state for a long time, please check the job in the Streams Console.";
        } else if  (!found && this.state.recentSubmit) {
          message = "The IotPlatform application is starting up.";
          setTimeout(this.refreshJobStatus, 4000);
        } else {
          message = "The IotPlatform application is not currently running in your instance. Click 'Submit Jobs' below to start it.";
        }
    }




    return (
      <Card>
        <CardHeader
          title="Submit the IotPlatform application"
        titleColor={AppTheme.cardTitleColor} subtitleColor={AppTheme.cardSubtitleColor}
          style={{
            backgroundColor: AppTheme.palette.primary2Color
          }}
          titleStyle={{
            fontSize: 'large'
          }}
        />
        <CardText>
        The <code>IotPlatform</code> or <code>IotPlatformBluemix</code> application is a helper application that connects to the Watson IoT Platform.  This job must first be running in your instance before your Streams application can ingest data from IoT devices.  The current status of the application in your instance is displayed below. <br/>For your convenience, you can submit the application here if it is not running.<br/>
        </CardText>
        <CardText>{message} </CardText>
        <CardActions>
          <RaisedButton
            label={refreshText}
            disabled={refreshDisable}
            icon={<Refresh />}
            onMouseDown={this.refreshJobStatus}
          />
          <RaisedButton
            label={jobButtonText}
            icon={jobButtonIcon}
            disabled={refreshDisable}
            onMouseDown={jobButtonAction}
          />
        </CardActions>
        <CardText><h3>More information</h3>Go to the <a target="blank" href="https://console.bluemix.net/dashboard/">Bluemix dashboard</a> to launch the Streams Console.</CardText>

      </Card>
    )
  };
}

export default StreamJobs;
