const User = require('./schemas/users')

const registerUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

const loginUser = ({ email }) => {
  return User.findOne({ email })
}

module.exports = {
  registerUser,
  loginUser,
}