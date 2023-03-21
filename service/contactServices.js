const Contacts = require('./schemas/contacts')
const { WrongParametersError } = require('../helpers/error')

const getAllContacts = async (owner, skip, limit ) => {
  return Contacts.find({ owner }, "", { skip, limit })
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

const updateContact = async (contactId, body, owner) => {
  const contact = await Contacts.findOneAndUpdate({ _id: contactId, owner }, body, { new: true })

  if (!contact){
    throw new WrongParametersError(`Not found`)
  }

  return contact
}

const updateStatusContact = async (contactId, favorite, owner) => {
  const contact = await Contacts.findOneAndUpdate({ _id: contactId, owner }, favorite, { new: true })

  if (!contact){
    throw new WrongParametersError(`Not found`)
  }
  return contact
}

const removeContact = async (contactId, owner) => {
  const contact = await Contacts.findOneAndRemove({ _id: contactId, owner })

  if (!contact){
    throw new WrongParametersError(`Not found`)
  }

  return contact
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    updateStatusContact,
    removeContact,
}
