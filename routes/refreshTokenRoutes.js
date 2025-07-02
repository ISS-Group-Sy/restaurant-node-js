const express= require('express');
const refreshTokenRouter = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

refreshTokenRouter.post('/api/refresh-token', refreshTokenController.refresh_token_post);

module.exports = refreshTokenRouter;