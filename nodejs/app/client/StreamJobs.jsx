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
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import CustomCard from './CustomCard';

import RaisedButton from 'material-ui/RaisedButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Report from 'material-ui/svg-icons/content/report';
import Publish from 'material-ui/svg-icons/editor/publish';

import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
const _ = require('lodash');
const request = require('superagent');

class StreamJobs extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this._bind('componentDidMount', 'updateStatus', 'refreshJobStatus', 'stopJobs', 'submitJobs');
    this.state = {
      foundJob : false,
      healthy  : false,
      disableActions: false,
      jobCount: 0, failed: false, err: "",
      recentSubmit:  false
    };
  }

  refreshJobStatus() {
    //see server/routes/jobs-endpoint
    request.get('/api/streams/jobs/iotplatformjob')
      .end(null);
  }

  updateStatus() {
    //clear this so it doesn't keep refreshing indefinitely.
    if (this.state.recentSubmit){
      this.setState({recentSubmit: false});
   }
    this.refreshJobStatus();
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
      //null status means in progress
        self.setState({
          disableActions: true,

        });
      } else {
        if (status.failed){
          self.setState({
            disableActions: false,
              failed: true, err: status.error
          });
        } else {
           if (status.found && status.healthy){
             if (self.state.recentSubmit){
               self.setState({recentSubmit: false});
            }
          }
          //json object is returned with the state of the iotplatformbluemix job
          self.setState({
              failed: false,
              foundJob: status.found,
              disableActions: false,
              jobCount: status.job_count,
              healthy: status.healthy,
              id : status.id
            });

        }
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
        if (this.state.failed){
          if (this.state.recentSubmit){
            message = "Failed to start the  IotPlatform application: " + this.state.err + ". Please try again later";
          } else {
          message = "Error occurred contacting the Streaming Analytics service: " + this.state.err + ". Please try again later";
          }
        } else {
          if (found && this.state.healthy) {
            message = "The IotPlatform application is running and healthy in your instance. You're all set! Job Id: " + this.state.id;
          } else if (found && !this.state.healthy && !this.state.recentSubmit) {
            message = "The IotPlatform application is running but is unhealthy. You might need to stop the job and re-start it. Job Id: " + this.state.id + ". Visit the Streams Console for more information.";
          } else if (found && !this.state.healthy && this.state.recentSubmit) {
            message = "The IotPlatform application is starting up. If it remains in this state for a long time, please check the job in the Streams Console.";
          } else if  (!found && this.state.recentSubmit) {
            message = "The IotPlatform application is starting up. If it remains in this state for a long time, please check the job in the Streams Console.";
            setTimeout(this.updateStatus, 4000);
          } else {
            message = "The IotPlatform application is not currently running in your instance. Click 'Submit Jobs' below to start it.";
          }
        }
    }




    return (
      <CustomCard
          title="Submit the IotPlatform application">
        The <code>IotPlatform</code> or <code>IotPlatformBluemix</code> application is a helper application that connects to the Watson IoT Platform.  This job must first be running in your instance before your Streams application can ingest data from IoT devices.  The current status of the application in your instance is displayed below. <br/>For your convenience, you can submit the application here if it is not running.<br/>

        {message}
        <CardActions>
          <RaisedButton
            label={refreshText}
            disabled={refreshDisable}
            icon={<Refresh />} primary={true}
            onMouseDown={this.refreshJobStatus}
          />
          <RaisedButton primary={true}
            label={jobButtonText}
            icon={jobButtonIcon}
            disabled={refreshDisable}
            onMouseDown={jobButtonAction}
          />
        </CardActions>
        <h4>Manage your instance</h4>Go to the <a target="blank" href="https://console.bluemix.net/dashboard/">IBM Cloud dashboard</a> to launch the Streams Console.

      </CustomCard>
    )
  };
}

export default StreamJobs;
