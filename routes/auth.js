module.exports = router;


const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/authController");
const { signupValidationRules, signinValidationRules, validate } = require("../validators/authValidators");

// Apply validation rules and middleware
router.post("/signup", signupValidationRules, validate, signup);
router.post("/signin", signinValidationRules, validate, signin);

module.exports = router;
