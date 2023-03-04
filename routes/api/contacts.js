const express = require('express')
const router = express.Router()
const { listContacts, 
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')
const { schema } = require('./validationSchema')

const TEMPLATE_MSG = 'Stand with Ukraine'

router.get('/', async (req, res, next) => {
  try{
    const data = await listContacts()
    res.status(200).json(data)
  } catch (error){
    res.json({ message: 'template message' })   
  }  
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  try{
    const data = await getContactById(contactId)

    if(data){
      return res.status(200).json(data)
    }

    res.status(404).json({ message: 'Not found' })    
  } catch (error){
    res.json({ message: TEMPLATE_MSG })    
  } 
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body

  const { error } = schema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return res.status(400).json({ message: error.details[0].message })
  }

  const id = new Date().getTime().toString()

  try{
    const data = await addContact({id, name, email, phone})
    res.status(201).send(data)
  } catch (error){
    res.json({ message: TEMPLATE_MSG })
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  try{
    const data = await removeContact(contactId)

    if (data) {
      return res.status(200).json({ message: "contact deleted" })
    }
    
    res.status(404).json({ message: "Not found" })
  } catch (error){
    res.json({ message: TEMPLATE_MSG })
  } 
})

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const body = req.body

  if (Object.keys(body).length === 0) {
    return  res.status(400).json({ message: "missing fields" })
  }  

  const { error } = schema.validate(req.body, { context: { requestMethod: req.method } });

  if (error){
    return res.status(400).json({ message: error.details[0].message })
  }  

  try{
    const data = await updateContact(contactId, body)
    if (data) {
      return res.status(200).json(data)
    }
    res.status(404).json({ message: "Not found" })
  } catch (error){
    res.json({ message: TEMPLATE_MSG })
  } 
})

module.exports = router