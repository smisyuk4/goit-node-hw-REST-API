const { getAllContacts,
  getContactById, 
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../service/contactServices')

const { contactValidSchema } = require('../service/schemas/contactValidSchema')
const { ValidationError } = require('../helpers/error')

const get = async (req, res) => {
  const { _id: owner } = req.user

  const results = await getAllContacts(owner)

  res.json({
    status: 'Success',
    code: 200,
    data: {
      contacts: results,
    },
  })  
}

const getById = async (req, res) => {
  const contactId = req.params.contactId
  const { _id: owner } = req.user

  const results = await getContactById(contactId, owner)

  res.json({
    status: 'Success',
    code: 200,
    data: {
        contact: results,
      },
  })
}

const create = async (req, res, next) => {
  const { name, email, phone, favorite=false } = req.body
  const { _id: owner } = req.user

  const { error } = contactValidSchema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return next(new ValidationError(error.details[0].message)) 
  }

  const result = await createContact({ name, email, phone, favorite }, owner )

  res.status(201).json({
      status: 'Success',
      code: 201,
      data: { contact: result },
  })
}

const remove = async (req, res, next) => {
  const contactId = req.params.contactId
  const { _id: owner } = req.user

  await removeContact(contactId, owner)

  res.json({
    status: 'Success',
    code: 200,
    message: 'Contact deleted',
  })
}

const update = async (req, res, next) => {
  const contactId = req.params.contactId
  const body = req.body
  const { _id: owner } = req.user

  if (Object.keys(body).length === 0) {
    return next(new ValidationError('Missing fields')) 
  }  

  const { error } = contactValidSchema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return next(new ValidationError(error.details[0].message)) 
  }  

  const result = await updateContact(contactId, body, owner)

  res.json({
    status: 'success',
    code: 200,
    data: { contact: result },
  })
}

const updateStatus = async (req, res) => {
  const contactId = req.params.contactId
  const { favorite } = req.body
  const { _id: owner } = req.user

  if(!favorite){
    throw new ValidationError('Missing field favorite')
  }

  const result = await updateStatusContact(contactId, {favorite}, owner)

  res.json({
    status: 'success',
    code: 200,
    data: { contact: result },
  })
}

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
  }