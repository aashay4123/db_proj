const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(400).json({
      error: "User with that email does not exist. Please signup",
    });
  }
  // authenticate
  if (!checkUser.authenticate(password)) {
    return res.status(400).json({
      error: "Email and password do not match",
    });
  }
  // generate a token and send to client
  const token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });

  return res.json({
    token,
    user: checkUser,
  });
};
