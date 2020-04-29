/* jshint esversion: 8 */

'use strict';

const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message,{metadata: err});
    res.status(500).send({message: '500 Internal Server Error'});
};
