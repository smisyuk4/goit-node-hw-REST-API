const app = require('./app')
require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);
const dbName = 'db-contacts';

const start = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('contacts');

  const contacts = await collection.find({}).toArray()
  console.log(contacts)

  app.listen(process.env.PORT, () => {
    console.log(`Server running. Use our API on port: ${process.env.PORT}`)
  })

  return 'done.';
}

start()


