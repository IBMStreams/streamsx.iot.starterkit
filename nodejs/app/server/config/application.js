/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const logger = require.main.require('./app/server/common/logger');


const config = require('./streams-apps-config');

logger.info({
  server: config.server
}, 'Reading Configuration file: %s.js', config.configFile);

module.exports = config;
