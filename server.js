const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())

const { contactRouter } = require('./routes/contactRoutes')
app.use('/api/contacts', contactRouter)

const { userRouter } = require('./routes/userRoutes')
app.use('/users', userRouter)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes:',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.message)
  res.status(409).json({
    status: 'Conflict',
    code: 409,
    message: "Email in use",
  });
});

app.use((err, _, res, __) => {
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
  dbName: 'db-contacts',
});
mongoose.Promise = global.Promise;

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
  );