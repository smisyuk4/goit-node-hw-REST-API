const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactControllers');

router.get('/', contactCtrl.get);

router.get('/:contactId', contactCtrl.getById);

router.post('/', contactCtrl.create);

router.put('/:contactId', contactCtrl.update);

router.delete('/:contactId', contactCtrl.remove);

router.patch('/:contactId/favorite', contactCtrl.updateStatus)

module.exports = router;