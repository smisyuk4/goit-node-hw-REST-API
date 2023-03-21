const User = require('./schemas/users')

const createUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

const findUser = (conditions) => {
  return User.findOne(conditions)
}

const updateUser = (conditions, update) => {
  return User.findOneAndUpdate(conditions, update, { new: true })
}

module.exports = {
  createUser,
  findUser,
  updateUser,
}