const express = require('express');
const emailVerificationRouter = express.Router();
const emailVerfictionController = require('../controllers/emailVerificationController.js');

emailVerificationRouter.post('/api/verify-email', emailVerfictionController.verify_email_post);
module.exports = emailVerificationRouter;