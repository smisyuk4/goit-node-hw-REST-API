const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');

const { asyncWrapper } = require('../helpers/asyncWrapper')
const { authMiddleware } =  require('../middlewares/authMiddleware')

router.post('/register', asyncWrapper(userCtrl.register));

router.post('/login', asyncWrapper(userCtrl.login));

router.post('/logout', authMiddleware, asyncWrapper(userCtrl.logout));

router.post('/current', authMiddleware, asyncWrapper(userCtrl.current));

module.exports = { userRouter: router };