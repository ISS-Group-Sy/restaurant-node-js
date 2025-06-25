const express = require('express');
const registerRouter = express.Router();
const registerController = require('../controllers/registerController');
const registerErrorHandler = require('../middleware/registerErrorHandler');

registerRouter.post('/api/register', registerController.register_post);
registerRouter.use(registerErrorHandler);

module.exports = registerRouter;