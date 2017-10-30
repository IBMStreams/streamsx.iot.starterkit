/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const io = require('socket.io')();
const request = require('request');
const url = require('url');
const _ = require('lodash');

const config = require.main.require('./app/server/config/application');
const logger = require.main.require('./app/server/common/logger');

module.exports = io;
