'use strict';

const winston = require('winston');

winston.emitErrs = true;

let configuredTransport = undefined;
let logger = undefined;

const logFileTransport = new winston.transports.File({
  level: process.env.LOG_LEVEL || 'info',
  handleExceptions: true,
  json: true,
  maxsize: 5242880,
  maxFiles: 5,
  colorize: false,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  filename: 'previews-service.log',
});

const consoleTransport = new winston.transports.Console({
  level: process.env.LOG_LEVEL || 'debug',
  json: false,
  colorize: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
});

if (process.env.NODE_ENV === 'production') {
  logger = new winston.Logger({
    transports: [logFileTransport],
    exitOnError: false,
  });
} else if (process.env.NODE_ENV === 'test') {
  require('winston-null');
  logger = new winston.Logger({
    transports: [new winston.transports.NullTransport()],
    exitOnError: false,
  });
} else {
  logger = new winston.Logger({
    transports: [consoleTransport],
    exitOnError: false,
  });
}

module.exports = logger;
module.exports.logFileTransport = logFileTransport;
