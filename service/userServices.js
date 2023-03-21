const User = require('./schemas/users')

const createUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

const findUser = (query) => {
  return User.findOne(query)
}

const updateUser = (email, token) => {
  return User.findOneAndUpdate({ email }, { token }, { new: true })
}

module.exports = {
  createUser,
  findUser,
  updateUser,
}