const path = require('path')
const fs = require('fs').promises

const contactsPath  = path.join('models', 'contacts.json')

async function writeContact(path, content) {
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
  try {
    const data = await listContacts()

    const newArr = data.filter(({id}) => id !== contactId)

    if (newArr.length > 0) {
      await writeContact(contactsPath, newArr)
      return true
    }

    return false         
} catch (error){
    console.log(error.message)
}
}

const addContact = async (body) => {
  return 'hello addContact'
}

const updateContact = async (contactId, body) => {
  return 'hello updateContact'
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
