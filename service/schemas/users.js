const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    trim: true,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: {
    type: String,
    required: [true, 'avatarURL is required']
  },
  subscription: {
    type: String,
    trim: true,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: { 
    type: String, 
    default: null
  },
});

userSchema.pre('save', async function() {
  if(this.isNew){
    this.password = await bcrypt.hash(this.password, 10)
  }
})

// мідлвар щоб влаштувати перевірку полів юзера на редагуванні, тобто якщо змін немає - повернути помилку

// userSchema.pre(['updateOne', 'findOneAndUpdate'], async function() {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   console.log(docToUpdate);
  
  // if(this.isModified){
  //   throw new Error('Sorry, all filds not new!')
  // }
// })

const User = mongoose.model("User", userSchema);

module.exports = User;