const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())

const routerApi = require('./app/contacts')
app.use('/api/contacts', routerApi)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URI;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
  );





// const { MongoClient } = require('mongodb');

// const client = new MongoClient(process.env.MONGO_URI);
// const dbName = 'db-contacts';

// const start = async () => {
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('contacts');

//   const contacts = await collection.find({}).toArray()
//   console.log(contacts)

//   app.listen(process.env.PORT, () => {
//     console.log(`Server running. Use our API on port: ${process.env.PORT}`)
//   })

//   return 'done.';
// }


// start()


