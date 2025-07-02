const express = require('express');
const registerRouter = express.Router();
const registerController = require('../controllers/registerController');
const registerErrorHandler = require('../middleware/registerErrorHandler');

registerRouter.post('/api/register', registerErrorHandler, registerController.register_post);

module.exports = registerRouter;