const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//User Schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  lastname: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{10,15}$/, "phone number must be 10 to 15 digits"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,

    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/,
      "email must contain  an @, a domain and .com",
    ],
  },
});

// Encrypt the password before sending it
userSchema.pre("save", async function (next) {
  // only encrypt if password is modified
  if (!this.isModified("password")) return next();

  //encrypt the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// create model
const User = mongoose.model("User", userSchema);
module.exports = User;
