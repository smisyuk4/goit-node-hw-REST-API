const express = require('express')
const { listContacts, 
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')
const router = express.Router()

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
    res.json({ message: 'template message' })    
  } 
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body

  if (name === ''){
    return res.status(400).json({ message: 'missing required name field' })
  }

  if (email === ''){
    return res.status(400).json({ message: 'missing required email field' })
  }

  if (phone === ''){
    return res.status(400).json({ message: 'missing required phone field' })
  }

  const id = new Date().getTime().toString()

  try{
    const data = await addContact({id, name, email, phone})
    res.status(201).send(data)
  } catch (error){
    res.json({ message: 'template message' })
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
    res.json({ message: 'template message' })
  } 
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const data = await updateContact()
    res.status(200).send(data)
  } catch (error){
    res.json({ message: 'template message' })
  } 
})

module.exports = router
