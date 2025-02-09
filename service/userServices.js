const { User } = require('./schemas/users')

const createUser = ({ email, password, avatarURL, subscription, verificationToken }) => {
  return User.create({ email, password, avatarURL, subscription, verificationToken })
}

const findUser = (conditions) => {
  return User.findOne(conditions)
}

const updateUser = (conditions, update) => {
  const option = {
    new: true,
    runValidators: true,
  }

  return User.findOneAndUpdate(conditions, update, option)
}

module.exports = {
  createUser,
  findUser,
  updateUser,
}