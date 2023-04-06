const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const { asyncWrapper } = require('../helpers/asyncWrapper')
const { authMiddleware } =  require('../middlewares/authMiddleware')
const { upload } = require('../middlewares/uploadMiddleware')

router.post('/register', asyncWrapper(userCtrl.register));

router.post('/login', asyncWrapper(userCtrl.login));

router.post('/logout', authMiddleware, asyncWrapper(userCtrl.logout));

router.post('/current', authMiddleware, asyncWrapper(userCtrl.current));

router.patch('/change', authMiddleware, asyncWrapper(userCtrl.change));

router.patch('/avatars', authMiddleware, upload.single('avatar'), asyncWrapper(userCtrl.updateAvatar));

router.get('/verify/:verificationToken', asyncWrapper(userCtrl.verifyEmail))

router.post('/verify', asyncWrapper(userCtrl.resendVerifyEmail))


module.exports = { userRouter: router };