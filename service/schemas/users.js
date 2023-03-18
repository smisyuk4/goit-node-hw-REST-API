const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String,
});

userSchema.pre('save', async function() {
  if(this.isNew){
    this.password = await bcrypt.hash(this.password, 10)
  }
  // todo if user change password
})

const User = mongoose.model("User", userSchema);

module.exports = User;