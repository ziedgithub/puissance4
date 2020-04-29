/* jshint esversion: 8 */

'use strict';
const express = require('express');

// Middlewares
const error = require('../middleware/error');

// Routers
const UserRouter = require('../routes/user.routes');

const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {

  app.use(cors());

  app.use(helmet());

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      return res.status(200);
    } else {
      return next();
    }
  });

  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// using routes
  app.use('/api/users', UserRouter);

// using error middleware
  app.use(error);

};
