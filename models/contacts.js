// const path = require('path')
// const fs = require('fs').promises

// const contactsPath  = path.join('models', 'contacts.json')

// const writeContact = async (path, content) => {
//   try{
//       await fs.writeFile(path, JSON.stringify(content))   
//   } catch (error) {
//       console.log(error.message)
//   }
// }

// const listContacts = async () => {
//   try{
//     const data = await fs.readFile(contactsPath)   
//     return JSON.parse(data)      
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const data = await listContacts()      
//     return data.find(({id}) => id === contactId)
//   } catch (error) {
//       console.log(error.message)
//   }
// }

// const removeContact = async (contactId) => {
//   const data = await listContacts()

//   if (!data.some(({id}) => id === contactId)){
//     return false
//   }

//   const newArr = data.filter(({id}) => id !== contactId)
//     await writeContact(contactsPath, newArr)
//   return true 
// }

// const addContact = async (body) => {
//   const data = await listContacts() 

//   const newArr = [...data, body]

//     await writeContact(contactsPath, newArr)
//   return newArr
// }

// const updateContact = async (contactId, body) => {
//   const data = await listContacts()

//   let indexContact = null

//   const contact = data.find(({id}, idx) => {
//     indexContact = idx
//     return id === contactId
//   })

//   if (!contact) {
//     return false
//   }

//   const newContact = {
//     id: contactId,
//     name: body.name || contact.name,
//     email: body.email || contact.email,
//     phone: body.phone || contact.phone,
//   }
  
//   data.splice(indexContact, 1, newContact)

//   await writeContact(contactsPath, data)
//   return data
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
