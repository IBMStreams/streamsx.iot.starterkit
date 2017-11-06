/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const ENV = process.env.NODE_ENV || 'local';

const configFile = './application-' + ENV;
const config = require(configFile);


const path = require('path');

/* Add additional appplications to the list below to have them deployed when your toolchain is deployed.
Must have the following fields:
{
//   name: 'namespace::composite',                  // name of application to submit
//   file: path.resolve('streamsapp', 'xxx.sab'),   // location of sab file
//   submit_config: { }                             // submission configurations
// }
For example
/*{
  name: 'com.ibm.streamsx.smartsprinkler.streams::DecisionMaker',
  file: path.resolve('streamsapp', 'com.ibm.streamsx.smartsprinkler.streams.DecisionMaker.sab'),
  submit_config: {
    configurationSettings: {},
    submissionParameters: {
      'DecisionMaker.host': server.ui_host,
      'DecisionMaker.weather_url': 'https://' + weather.host + ':' + weather.port,
      'DecisionMaker.weather_user': weather.username,
      'DecisionMaker.weather_pw': weather.password,
    }
  }
}
*/
config.configFile = configFile;
config.streaming_app = [{
  name: 'com.ibm.streamsx.iot.watson.apps::IotPlatform',
  file: path.resolve('streamsapp', 'com.ibm.streamsx.iot.watson.apps.IotPlatform.sab'),
  submit_config: {
    configurationSettings: {},
    submissionParameters: {
      'IotPlatform.org': config.iot_platform.org,
      'IotPlatform.authKey': config.iot_platform.apiKey,
      'IotPlatform.authToken': config.iot_platform.apiToken
    }
  }
}];


module.exports = config;
