const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactControllers');
const { authMiddleware } =  require('../middlewares/authMiddleware')
const { asyncWrapper } = require('../helpers/asyncWrapper')

router.use(authMiddleware)

router.get('/', asyncWrapper(contactCtrl.get));

router.get('/:contactId', asyncWrapper(contactCtrl.getById));

router.post('/', asyncWrapper(contactCtrl.create));

router.put('/:contactId', asyncWrapper(contactCtrl.update));

router.delete('/:contactId', asyncWrapper(contactCtrl.remove));

router.patch('/:contactId/favorite', asyncWrapper(contactCtrl.updateStatus));

module.exports = { contactRouter: router };