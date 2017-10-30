/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const express = require('express');
const endpt = express.Router();
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const config = require.main.require('./app/server/config/application');
const streams = require.main.require('./app/server/common/streams-api');
const utils = require.main.require('./app/server/common/utils');
const io = require.main.require('./app/server/routes/socket/io-socket');
const logger = require.main.require('./app/server/common/logger');

// Common streams status to return
const status_in_progress = null;
const status_failed = { job_count: 0 };

// Get Jobs that are currently running
endpt.get('/', function(req, res, next) {
  io.emit('streamjobs', status_in_progress);
  streams.getRunningJobs(config.streaming_analytics, function (err, status) {
    if (err) {
      io.emit('streamjobs', status_failed);
      return next(err);
    }
    //var r

    io.emit('streamjobs', status);
    res.send(status);
  });
});

function getIotJobStatus(status){
  var jobs = status.jobs;
  var i = 0;
  var health = false;
  var found = false;
  var id = 0;
    //find out if one of the running jobs is the
  for (i = 0; i < status.job_count; i++){
      if (jobs[i].application === "com.ibm.streamsx.iot.watson.apps::IotPlatform" || jobs[i].application === "com.ibm.streamsx.iot.watson.apps::IotPlatformBluemix"){
        found= true;
        if (jobs[i].health === "unhealthy"){
          health = false;
        } else {
           health = true;
        }
        id = jobs[i].jobId;
        break;
    }
  }
  iot_job_status = {"id"  : id, state: status.state, "found": found, "healthy": health, "job_count": status.job_count};

  return iot_job_status;
}
// Get Jobs that are currently running
endpt.get('/iotplatformjob', function(req, res, next) {
  io.emit('iotplatformjob', status_in_progress);
  streams.getRunningJobs(config.streaming_analytics, function (err, status) {
    if (err) {
      io.emit('iotplatformjob', status_failed);
      return next(err);
    }
    //var r
    //a JSON object is returned: {job_count, state: STARTED/STOPPED, jobs: [{name, application and jobId}]}
    io.emit('iotplatformjob', getIotJobStatus(status));
    res.send(iot_job_status);
  });
});

// Submit SABs to Streaming Analytics service
endpt.post('/', function(req, res, next) {
  io.emit('iotplatformjob', status_in_progress);
  streams.deploysab(config.streaming_analytics, config.streaming_app, function (err, status) {
    if (err) {
      io.emit('iotplatformjob', status_failed);
      return next(err);
    }

    //io.emit('streamjobs', status);
    logger.info("Sending updated status: " + getIotJobStatus(status));
    io.emit('iotplatformjob', getIotJobStatus(status));
    res.send(status);
  });
});

// Delete all jobs that are currently running
endpt.delete('/', function(req, res, next) {
  io.emit('iotplatformjob', status_in_progress);
  streams.stopJobs(config.streaming_analytics, config.streaming_app, function (err, status) {
    io.emit('iotplatformjob', status_failed);
    if (err) {
      return next(err);
    }

    res.sendStatus(HttpStatus.NO_CONTENT);
  });
});

module.exports = endpt;
