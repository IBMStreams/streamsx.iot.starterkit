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

function getMissingSACredsMsg(next){

    var errmsg = 'You must bind  the  Streaming Analytics service to this application.\n';
    errmsg += 'Check that the service was correctly deployed, is called "Streaming-Analytics", and is bound to this application.'
    err = new Error(errmsg);
    err.status = HttpStatus.BAD_REQUEST;
    return err;

}
function build_credentialsObj(){
  var credsJSON = {}
  var creds = [];
  var obj = {};
  obj.name = "Streaming-Analytics";
  obj.credentials = config.streaming_analytics;
  creds[0] = obj;
  credsJSON["streaming-analytics"] = creds;
  return credsJSON;
}
endpt.post('/sacreds', function(req, res, next) {

  if (!config.streaming_analytics ) {
    err = getMissingSACredsMsg();
    console.log("GET /sacreds request: Error retrieving Streaming analytics credentials");
    return next(err);

  }
  logger.info("returning credentials for service");


  res.send({sas: config.streaming_analytics});

});



endpt.get('/sacfgfile', function(req, res, next) {
  if (!config.streaming_analytics ) {
    err = getMissingSACredsMsg();
    console.log("GET /sacreds request: Error retrieving Streaming analytics credentials");
    return next(err);

  }
  logger.info("returning credentials for SA service as a file");
  // Construct device File
  var credsJSON=JSON.stringify(build_credentialsObj(), null, '\t');
  res.set('Content-Disposition', 'attachment; filename=credentials.cfg');
  res.set('Content-Type', 'application/octet-stream');
  res.send(credsJSON);
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
 logger.info("returning credentials for IOT service");
  // Construct device File
  var auth = 'org=' +config.iot_platform.org;
  auth += '\nauth-key=' + config.iot_platform.apiKey;
  auth += '\nauth-token='+ config.iot_platform.apiToken +'\n';

  res.set('Content-Disposition', 'attachment; filename=watson_iot_credentials.txt');
  res.set('Content-Type', 'application/octet-stream');
  res.send(auth);
  });

module.exports = endpt;
