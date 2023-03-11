const Contacts = require('./schemas/contacts')

const getAllContacts = async () => {
  return Contacts.find()
}

const getContactById = (id) => {
  return Contacts.findOne({ _id: id })
}

const createContact = ({ title, text }) => {
  return Contacts.create({ title, text })
}

const updateContact = (id, fields) => {
  return Contacts.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
  return Contacts.findByIdAndRemove({ _id: id })
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
}
