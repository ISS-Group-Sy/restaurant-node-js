const express = require('express');
const profilRouter = express.Router();
const isAuth = require('../middleware/auth');
const profileController = require('../controllers/profileController');

profilRouter.get('/api/get-profile', isAuth, profileController.get_profile);

module.exports = profilRouter;