const express = require('express');
const resetPasswordRouterr = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

resetPasswordRouterr.post('/api/request-password-reset', resetPasswordController.requestPasswordReset_post);
resetPasswordRouterr.post('/api/reset-password', resetPasswordController.resetPassword_post);

module.exports = resetPasswordRouterr;