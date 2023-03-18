const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.register);

module.exports = { userRouter: router };