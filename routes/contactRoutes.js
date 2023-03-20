const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactControllers');
const { authMiddleware } =  require('../middlewares/authMiddleware')
const { asyncWrapper } = require('../helpers/asyncWrapper')

router.use(authMiddleware)

router.get('/', contactCtrl.get);

router.get('/:contactId', asyncWrapper(contactCtrl.getById));

router.post('/', contactCtrl.create);

router.put('/:contactId', contactCtrl.update);

router.delete('/:contactId', contactCtrl.remove);

router.patch('/:contactId/favorite', contactCtrl.updateStatus)

module.exports = { contactRouter: router };