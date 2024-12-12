const User = require("../../models/user");
const { sendEmail } = require("../../utils/sendMail");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const newuser = new User({ name, email, password });

    newuser.save((err, user) => {
      if (err) {
        return res.status(401).json({
          error: "Error saving user in database. Try signup again",
        });
      }
      return res.json({
        message: "Signup success. Please signin.",
      });
    });
  });
};
