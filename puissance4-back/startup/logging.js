/* jshint esversion: 8 */

'use strict';

const winston = require('winston');
const config = require('config');
const debug = require('debug')('app:startup');
require('winston-mongodb');
require('express-async-errors');

const env = config.get('env');

module.exports = function (app) {

// Winston config
    winston.add(new winston.transports.File({
        filename: 'logger.log',
        level: 'debug'
    }));

// Uncaught exceptions
    winston.exceptions.handle(
        new winston.transports.File({filename: 'unhandledExceptions.log'})
    );

// Unhandled Rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    if (env === 'development'){
        const morgan = require('morgan');
        app.use(morgan('tiny'));
        debug('Morgan enabled...');
    }
    if (config.get('winston.enable_console') === '1') {
        winston.add(new winston.transports.Console({
            format: winston.format.combine(winston.format.simple(), winston.format.prettyPrint()),
            handleExceptions: true,
            level: 'info',
        }));
    }
};
