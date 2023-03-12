const Contacts = require('./schemas/contacts')

const getAllContacts = async () => {
  return Contacts.find()
}

const getContactById = (id) => {
  return Contacts.findOne({ _id: id })
}

const createContact = ({ name, email, phone }) => {
  return Contacts.create({ name, email, phone })
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
