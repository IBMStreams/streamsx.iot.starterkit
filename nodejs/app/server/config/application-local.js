/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const path = require('path');

// To deploy the application locally, there are a few places in this file
// you will need to customize.  Grep for 'FILL IN' to locate these places

const server = {
  port: 3000,
  ssl: {
    enabled: false,
    protocol: 'TLS',
    key: 'private.key',
    certificate: 'public.cert'
  },
  stacktrace: true,

  // Deploy Streaming Analytic SAB file?
  // If true, check if the 'streaming_app' settings are correct
  deploysab: false,

  // Create IOT Device configuration?
  // If true, check if 'edge_device' settings are correct
  createIotDevice: true,
};



// FILL IN with your Streaming Analytic bluemix credential
const streaming_analytics =
{
  }
// FILL IN with your IOT bluemix credential
const iot_platform = {
  };


  const streaming_app = [{
    name: 'com.ibm.streamsx.iot.watson.apps::IotPlatform',
    file: path.resolve('streamsapp', 'com.ibm.streamsx.iot.watson.apps.IotPlatform.sab'),
    submit_config: {
      configurationSettings: {},
      submissionParameters: {
        'IotPlatform.org': iot_platform.org,
        'IotPlatform.authKey': iot_platform.apiKey,
        'IotPlatform.authToken': iot_platform.apiToken
      }
    }
  }];

// Settings for registerting edge device on IOT platform
// FILL IN, change any information necessary to setup the edge device
const edge_device = {
  type: 'iot_device',
  id: 'iot_device_1',
  authtoken: 'streaming',
  // optional meta information
  metadata: {},
  deviceInfo: {}
};
module.exports = {
  server: server,
  streaming_app: streaming_app,
  edge_device: edge_device,
  streaming_analytics: streaming_analytics,
  iot_platform: iot_platform
};
