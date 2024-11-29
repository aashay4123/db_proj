const User = require("../models/user");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    user.__v = undefined;
    res.json(user);
  });
};
exports.update = (req, res) => {
  const { name, password } = req.body;

  User.findById({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `User Not found ${err}`,
      });
    }
    if (!name) {
      return res.status(400).json({
        error: `Name is required`,
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: `password should be more than 6 char`,
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: `USER UPDATE FAIL ${err}`,
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
