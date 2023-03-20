const { getAllContacts,
  getContactById, 
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../service/contactServices')

const { contactValidSchema } = require('../service/schemas/contactValidSchema')
// const { ValidationError, WrongParametersError } = require('../helpers/error')

const get = async (req, res, next) => {
  const { _id: owner } = req.user

  try{
    const results = await getAllContacts(owner)
    res.json({
        status: 'success',
        code: 200,
        data: {
          contacts: results,
        },
      }) 
  } catch (error){
    console.error(error)
    next(error) 
  }  
}

const getById = async (req, res, next) => {
  const contactId = req.params.contactId
  const { _id: owner } = req.user

  const results = await getContactById(contactId, owner)

  res.json({
    status: 'success',
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
    // return next(new ValidationError(error.details[0].message))
    // return res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: error.details[0].message,
    // })  
  }

  try{
        const result = await createContact({ name, email, phone, favorite }, owner )
        res.status(201).json({
            status: 'success',
            code: 201,
            data: { contact: result },
        })
    } catch (error){
        console.error(error)
        next(error)     
    } 
}

const remove = async (req, res, next) => {
  const contactId = req.params.contactId
  const { _id: owner } = req.user
  try{
    const result = await removeContact(contactId, owner)

    if (result) {
        return res.json({
            status: 'success',
            code: 200,
            data: { contact: result },
          })
    }
    
    // res.status(404).json({
    //     status: 'error',
    //     code: 404,
    //     message: `Not found contact id: ${contactId}`,
    //     data: 'Not Found',
    //   })
  } catch (error){
        console.error(error)
        next(error)    
  } 
}

const update = async (req, res, next) => {
  const contactId = req.params.contactId
  const body = req.body
  const { _id: owner } = req.user

  if (Object.keys(body).length === 0) {
    // return res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: "missing fields",
    //   })
  }  

  const { error } = contactValidSchema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    // return res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: error.details[0].message,
    // })
  }  

  try{
    const result = await updateContact(contactId, body, owner)
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }
    // res.status(404).json({
    //     status: 'error',
    //     code: 404,
    //     message: `Not found contact id: ${contactId}`,
    //     data: 'Not Found',
    // })
  } catch (error){
        console.error(error)
        next(error)    
  } 
}

const updateStatus = async (req, res, next) => {
  const contactId = req.params.contactId
  const { favorite } = req.body
  const { _id: owner } = req.user

  if (!favorite) {
    // return res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: "missing field favorite",
    //   })
  }

  try{
    const result = await updateStatusContact(contactId, {favorite}, owner)
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }
    // res.status(404).json({
    //     status: 'error',
    //     code: 404,
    //     message: `Not found contact id: ${contactId}`,
    //     data: 'Not Found',
    //   })
  } catch (error){
        console.error(error)
        next(error)    
  } 
}

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
  }