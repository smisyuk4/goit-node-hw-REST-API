const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
// const { authMiddleware } =  require('../middlewares/authMiddleware')
const { asyncWrapper } = require('../helpers/asyncWrapper')

// router.use(authMiddleware)

router.post('/register', asyncWrapper(userCtrl.register));

router.post('/login', asyncWrapper(userCtrl.login));

module.exports = { userRouter: router };