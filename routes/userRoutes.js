const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

module.exports = { userRouter: router };