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

const { errorMiddleware } = require('./middlewares/errorMiddeware')
app.use(errorMiddleware)

// app.use((_, res, __) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Use api on routes:',
//     data: 'Not found',
//   });
// });

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