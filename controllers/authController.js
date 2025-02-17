const User = require("../models/signUp"); // Bringing in the user
const jwt = require("jsonwebtoken"); // Authenticating the users
const bcrypt = require("bcryptjs"); // Authenticating the users

//Functionality for signing up a user
const signup = async (req, res) => {
  try {
    // Get data from the request body
    const { firstname, lastname, username, password, email, phone } = req.body;

    //Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { firstname },
        { lastname },
        { username },
        { password },
        { email },
        { phone },
      ],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Login details already exist" });
    }

    // creating a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      password,
      email,
      phone,
    });
    await newUser.save();

    //Generating a token to authenticate the user
    const token = new User({ userId: newUser.Id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User Created Successfully",
      token,
      user: {
        Id: newUder._Id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).json({ message: "Error signing up user" });
  }
};

const signin = async (req, res) => {
  try {
    // Get the data from the request body
    const { username, password } = req.body;

    // find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username Or Password" });
    }

    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username Or Password" });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // returning success response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signin Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


module.exports = { signup, signin };
