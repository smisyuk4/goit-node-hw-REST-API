const Contacts = require('./schemas/contacts')

const getAllContacts = async (owner) => {
  return Contacts.find({ owner })
}

const getContactById = (contactId, owner) => {
  return Contacts.findOne({ _id: contactId, owner })
}

const createContact = ({ name, email, phone, favorite }, owner) => {
  return Contacts.create({ name, email, phone, favorite, owner })
}

const updateContact = (contactId, body, owner) => {
  return Contacts.findOneAndUpdate({ _id: contactId, owner }, body, { new: true })
}

const updateStatusContact = (contactId, favorite, owner) => {
  return Contacts.findOneAndUpdate({ _id: contactId, owner }, favorite, { new: true })
}

const removeContact = (contactId, owner) => {
  return Contacts.findOneAndRemove({ _id: contactId, owner })
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    updateStatusContact,
    removeContact,
}
