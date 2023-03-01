const path = require('path')
const fs = require('fs').promises

const contactsPath  = path.join('models', 'contacts.json')

const writeContact = async (path, content) => {
  try{
      await fs.writeFile(path, JSON.stringify(content))   
  } catch (error) {
      console.log(error.message)
  }
}

const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath)   
    return JSON.parse(data)      
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await listContacts()      
    return data.find(({id}) => id === contactId)
  } catch (error) {
      console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  const data = await listContacts()

  if (!data.some(({id}) => id === contactId)){
    return false
  }

  const newArr = data.filter(({id}) => id !== contactId)
    await writeContact(contactsPath, newArr)
  return true 
}

const addContact = async (body) => {
  const data = await listContacts() 

  const newArr = [...data, body]

    await writeContact(contactsPath, newArr)
  return newArr
}

const updateContact = async (contactId, body) => {
  const data = await listContacts()

  const contact = data.find(({id}) => id === contactId)

  if (!contact) {
    return false
  }
  
  const {
    name: oldName, 
    email: oldEmail, 
    phone: oldPhone,
  } = contact  

  const {
    name: newName, 
    email: newEmail, 
    phone: newPhone,
  } = body

  const newContact = {
    id: contactId,
    name: newName || oldName,
    email: newEmail || oldEmail, 
    phone: newPhone || oldPhone,
  }

//  знайти індекс комірки контакту 
//  замінити контакт за індексом
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
