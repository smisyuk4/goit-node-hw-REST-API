const User = require('./schemas/users')

const registerUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

module.exports = {
  registerUser,
}