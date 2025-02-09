const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//Login Schema
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/,
      "email must contain  an @, a domain and .com",
    ],
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
  },
});

// Pre-save and hash passwords
loginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// Password comparison method
loginSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Create model
const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
