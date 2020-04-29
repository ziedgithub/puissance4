const UserController = require('../controllers/user.controller');
const Router = require('express').Router();

Router.post('/exists', [
  UserController.newUser
]);

Router.get('/', [
  UserController.getUsers
]);

module.exports = Router;
