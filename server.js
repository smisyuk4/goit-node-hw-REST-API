const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const { contactRouter } = require('./routes/contactRoutes')
const { userRouter } = require('./routes/userRoutes')
const { errorMiddleware } = require('./middlewares/errorMiddeware')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/api/contacts', contactRouter)
app.use('/users', userRouter)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URI;

// const connection = mongoose.connect(uriDb, {
//   dbName: 'db-contacts',
// });
const connection = mongoose.connect(uriDb)
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