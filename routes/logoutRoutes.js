const express = require('express');
const logoutRouter = express.Router();
const isAuth = require('../middleware/auth');
const logoutController = require('../controllers/logoutController');

logoutRouter.post('/api/logout', isAuth, logoutController.logout_post);

module.exports = logoutRouter;