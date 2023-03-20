const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');

const { asyncWrapper } = require('../helpers/asyncWrapper')

router.post('/register', asyncWrapper(userCtrl.register));

router.post('/login', asyncWrapper(userCtrl.login));

module.exports = { userRouter: router };