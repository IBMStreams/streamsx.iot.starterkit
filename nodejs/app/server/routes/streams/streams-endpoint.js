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
const async = require('async');
const request = require('request');
const url = require('url');

const logger = require.main.require('./app/server/common/logger');
const utils = require.main.require('./app/server/common/utils');
const config = require.main.require('./app/server/config/application');

endpt.use('/jobs', require('./jobs-endpoint'));

endpt.post('/sacreds', function(req, res, next) {
  if (!config.streaming_analytics ) {
    var errmsg = 'You must bind  the  Streaming Analytics service to this application.\n';
    errmsg += 'Check that the service was correctly deployed, is called "Streaming-Analytics", and is bound to this application.'
    err = new Error(errmsg);
    err.status = HttpStatus.BAD_REQUEST;
    console.log("GET /creds request: Error retrieving Streaming analytics credentials");
    return next(err);

  }
  res.send({sas: config.streaming_analytics});

});



endpt.get('/iotauth', function(req, res, next) {
  if (!config.iot_platform) {
    var errmsg = 'You must bind the Watson IoT Platform to this application.\n';
    errmsg += 'Check that the service was correctly deployed, is called "Internet-of-Things-Platform", and is bound to this application.'
    err = new Error(errmsg);
    err.status = HttpStatus.BAD_REQUEST;
    console.log("GET /creds request: Error retrieving IoT platform credentials");
    return next(err);

 }
  logger.info("returning credentials for service");
  // Construct device File
  var auth = 'org=' +config.iot_platform.org;
  auth += '\napiKey=' + config.iot_platform.apiKey;
  auth += '\napiToken='+ config.iot_platform.apiToken +'\n';

  res.set('Content-Disposition', 'attachment; filename=watson_iot_credentials.txt');
  res.set('Content-Type', 'application/octet-stream');
  res.send(auth);
  });

module.exports = endpt;
