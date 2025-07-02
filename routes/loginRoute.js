const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');
const loginErroeHandler = require('../middleware/loginErrorHandler');

loginRouter.post('/api/login', loginErroeHandler, loginController.login_post);

module.exports = loginRouter;