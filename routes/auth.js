const express = require("express");
const router = express.Router();
const {
  userSignupValidator,
  userSigninValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
} = require("../validators/auth");

const { runValidation } = require("../validators");

const { accountActivation, signup } = require("../controllers/auth/signup");
const { signin } = require("../controllers/auth/signin");
const { forgotPassword } = require("../controllers/auth/forgot");
const { resetPassword } = require("../controllers/auth/reset");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account_activate", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);

//forgot reset routes
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword,
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword,
);
module.exports = router;
