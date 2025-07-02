const exprees = require('express');
const registerRouter = exprees.Router();
const registerController = require('../controllers/registerController');

registerRouter.post('/api/register', registerController.register_post);

module.exports = registerRouter;