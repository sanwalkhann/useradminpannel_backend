const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  userType : {type: String , enum:["Admin" , "User"]}
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
