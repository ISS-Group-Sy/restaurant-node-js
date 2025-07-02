const express = require('express');
const changePasswordRouter = express.Router();
const changePasswordController = require('../controllers/changePasswordCotroller');
const isAuth = require('../middleware/auth');

changePasswordRouter.patch('/api/change-password', isAuth, changePasswordController.change_password_patch);

module.exports = changePasswordRouter;