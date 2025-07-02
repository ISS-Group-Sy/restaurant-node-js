const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');
const loginErroeHandler = require('../middleware/loginErrorHandler');

loginRouter.post('/api/login', loginController.login_post);
loginRouter.use(loginErroeHandler);
module.exports = loginRouter;