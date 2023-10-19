const express = require('express');
const authController = require('../controllers/authController')

const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verify);
router.post('/change-password-request', authController.forgotPasswordSend);
router.post('/change-password', authController.changePassword);

module.exports = router;
