const Contacts = require('./schemas/contacts')
const { WrongParametersError } = require('../helpers/error')

const getAllContacts = async (owner) => {
  return Contacts.find({ owner })
}

const getContactById = async (contactId, owner) => {
  const contact = await Contacts.findOne({ _id: contactId, owner })

  if (!contact){
    throw new WrongParametersError(`Not found contact id: ${contactId}`)
  }

  return contact
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
