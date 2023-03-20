const User = require('./schemas/users')

const createUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

const findUser = ({ email }) => {
  return User.findOne({ email })
}

const updateUser = (email, token) => {
  return User.findOneAndUpdate({ email }, { token }, { new: true })
}

module.exports = {
  createUser,
  findUser,
  updateUser,
}