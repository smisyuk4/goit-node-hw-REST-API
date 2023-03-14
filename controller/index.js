const service = require('../service')

const { schema } = require('../service/schemas/validationSchema')

const get = async (req, res, next) => {
  try{
    const results = await service.getAllContacts()
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
  try{
    const results = await service.getContactById(contactId)

    if(results){
      return res.json({
        status: 'success',
        code: 200,
        data: {
            contact: results,
          },
      })
    }

    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })   
  } catch (error){
    console.error(error)
    next(error)   
  } 
}

const create = async (req, res, next) => {
  const {name, email, phone, favorite=false} = req.body

  const { error } = schema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.details[0].message,
      })  
    }

  try{
        const result = await service.createContact({name, email, phone, favorite})
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
  try{
    const result = await service.removeContact(contactId)

    if (result) {
        return res.json({
            status: 'success',
            code: 200,
            data: { contact: result },
          })
    }
    
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
  } catch (error){
        console.error(error)
        next(error)    
  } 
}

const update = async (req, res, next) => {
  const contactId = req.params.contactId
  const body = req.body

  if (Object.keys(body).length === 0) {
    return res.status(400).json({
        status: 'error',
        code: 400,
        message: "missing fields",
      })
  }  

  const { error } = schema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.details[0].message,
      })
  }  

  try{
    const result = await service.updateContact(contactId, body)
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
  } catch (error){
        console.error(error)
        next(error)    
  } 
}

const updateStatus = async (req, res, next) => {
  const contactId = req.params.contactId
  const {favorite} = req.body

  if (!favorite) {
    return res.status(400).json({
        status: 'error',
        code: 400,
        message: "missing field favorite",
      })
  }

  try{
    const result = await service.updateStatusContact(contactId, {favorite})
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
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