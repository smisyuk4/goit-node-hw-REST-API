const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller');

router.get('/', ctrlContacts.get);

router.get('/:contactId', ctrlContacts.getById);

router.post('/', ctrlContacts.create);

router.put('/:contactId', ctrlContacts.update);

// router.patch('/:contactId/status', ctrlContacts.updateStatus);

router.delete('/:contactId', ctrlContacts.remove);

module.exports = router;