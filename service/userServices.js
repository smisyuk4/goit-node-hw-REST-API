const User = require('./schemas/users')
const { NotAuthorizedError } = require('../helpers/error')


const registerUser = ({ email, password, subscription }) => {
  return User.create({ email, password, subscription })
}

const loginUser = async ({ email }) => {
  const user = await User.findOne({ email })

  if (!user){
    throw new NotAuthorizedError(`Not authorized`)
  }
  return user
}

module.exports = {
  registerUser,
  loginUser,
}