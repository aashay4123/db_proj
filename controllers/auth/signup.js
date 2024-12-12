const User = require("../../models/user");
const { sendEmail } = require("../../utils/sendMail");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: "Email is taken",
    });
  }
  const newuser = new User({ name, email, password });
  try {
    await newuser.save();
    return res.json({
      message: "Signup success. Please signin.",
    });
  } catch (error) {
    return res.status(401).json({
      error: "Error saving user in database. Try signup again",
    });
  }
};
