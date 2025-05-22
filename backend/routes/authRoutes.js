const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Esta ruta debería usar el middleware de autenticación de passport
router.post('/login', passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

module.exports = router;