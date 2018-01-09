/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* This is an automatically generated copyright prolog.             */
/* After initializing,  DO NOT MODIFY OR MOVE                       */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2016, 2018                             */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
const express = require('express');
const path = require('path');
const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connect = require("connect-ensure-login");
const httpProxy = require('http-proxy');

const config = require('./app/server/config/application');
const server = require('./app/server/server');
const logger = require('./app/server/common/logger');
const io = require('./app/server/routes/socket/io-socket');

const iot = require('./app/server/common/iot-api');

// Setup server initialization logic
const isProduction = process.env.NODE_ENV === 'production';
const port = config.server.port;

// Submit streams application to streams instance
if (!config.streaming_analytics) {
  logger.error('You must bind the streaming-analytics service to this application.');
  process.exit(1);
}

// Get device file config
if (!config.iot_platform) {
  logger.error('You must bind the Internet-of-Things-Platform service to this application.');
  process.exit(1);
} else if (config.server.createIotDevice){
  iot.createDeviceConfig(config.iot_platform, config.edge_device, function (err, device_config) {
    if (err) {
      process.exit(1);
    }
  });
}

var staticAssetsPath;
if (isProduction) {
  staticAssetsPath = path.resolve(__dirname, 'dist');
} else {
  staticAssetsPath = path.resolve(__dirname, 'app', 'www');
}

var proxy = httpProxy.createProxyServer();
var app = express();


//Contains the credentials of the owner of this starter kit.
var userObj = {};
var NOT_SET ="Login failed, check that username and password are configured in the IBM Cloud dashboard";
if (process.env.KIT_OWNER && process.env.KIT_PASSWORD) {
  userObj.user = process.env.KIT_OWNER;
  userObj.pass = process.env.KIT_PASSWORD;
}

//called by the passport API to initiate login given  the credentials.
function doLogin(username, password, done){
  console.log("start.js line 70 called do login ");

  if (!auth(username, password)){
    return done({message: "Incorrect username or password. Values must match the SKUSER and SKPASS values you set when you configured your starter kit."})
  }


  return done(null, {user: {id: username}});
}

//This actually checks the credentials match
function auth(username, password){
  console.log("start.js line 81: checking auth function");

  if (userObj.pass && userObj.user){
    if (userObj.pass === password && userObj.user === username){
      return true;
    }
  }
  return false;

}

///Functions for Passport api

passport.use(new LocalStrategy(function(username, password, done) {
  console.log("start.js line 92: ");
  console.log(done.toString())
  if (!auth(username, password)){
    return done({message: "Incorrect username or password. Values must match the SKUSER and SKPASS values you set when you configured your starter kit."})
  }
  else {
    return done(null, {user: {id: username}});
  }
}
));
passport.serializeUser(function (user, cb){
  cb(null, user.user.id);
});

passport.deserializeUser(function(userid, cb){
  console.log("start.js line 107");
  if (userObj.user && userid) {

    if (userid != userObj.user){
      cb("Unknown user, please log in.");
    } else {
      cb(null, {user: {id: userid}});
    }
  } else {
    cb(NOT_SET);
  }
});
var appServer;


if (config.server.ssl.enabled) {
  appServer = server.createSSLServer(config, app, function() {
    logger.info('Server (SSL) listening on port %d.', config.server.port);
  });
} else {
  appServer = server.createServer(config, app, function() {
    logger.info('Server listening on port %d.', config.server.port);
  });
}

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser("so-e-p-c-q-r-3-7"));
//Expire session after 1 hour
var hour = 1000 * 60* 60; //hour in MS
app.use(session({rolling: true, cookie: {maxAge:hour }, resave:false, saveUninitialized: false}));


app.use(passport.initialize());
app.use(passport.session());

///a get request to /LOGIN sends them to home
app.get("/login", function(req, res){
  res.redirect("/");
});

function logRequests(req, res, next){
  console.log("request received ");

  next();
}

//post request to login does authentication
app.post("/login", logRequests, passport.authenticate('local', {failureRedirect: '/login'} ),function(req, res){
  //succesful login
  res.send({auth: true})  ;
}
);
function authenticationMiddleware () {
  return function (req, res, next) {

    if (req.isAuthenticated()) {
      return next()
    } else {
      console.log("unauthorized request received, redirecting.");
    }
    res.redirect('/')
  }
}

//use middleware to intercept requests.
 passport.authenticationMiddleware = authenticationMiddleware();
 //this is the key part of the authentication.
 //authenticationMiddleware function is called on every API call. If they aren't authenticated.
 //we redirect to home.
app.use("/api/*", logRequests, passport.authenticationMiddleware,  function (req, res, next){
    next();
} );
app.use("/main", function(req, res, next){
  console.log(req);
  console.log("back to home");
  res.redirect("/");
});

// Other server side endpoints
app.use('/api/streams', require('./app/server/routes/streams/streams-endpoint'));
app.use('/api/iot', require('./app/server/routes/iot/iot-endpoint'));


// We point to our static assets
app.use(express.static(staticAssetsPath));

// We only want to run the workflow when not in production
if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {target: 'http://localhost:8080'});
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

// Socket listener
io.listen(appServer);





// Common error handler
app.use(function(err, req, res, next) {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

  var errorJson = {
    'status': status,
    'originalErr': err,
    'message': err.message
  };

  if (config.server.stacktrace) {
    if (err.stack){
      errorJson.stack = err.stack.split('\n');
    }
  }

  // Log non-HTTP errors to terminal (could be compilation/runtime errors)
  if (!err.status) {
    // Log 500 errors to terminal as well
    console.log(errorJson);
  }

  logger.error({
    body: errorJson
  }, '%s %s failed.', req.method, req.url);
  res.status(status).json(errorJson);
});

function closeServer(done) {
  appServer.close(done);
}

module.exports = {
  closeServer: closeServer
};
