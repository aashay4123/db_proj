const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

exports.resetPassword = (req, res, next) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, response) {
        if (err) {
          return res.status(400).json({
            error: `Expired reset password link error ${err}`,
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: `NO user Found ${err}`,
            });
          }
          const updatePassword = {
            password: newPassword,
            resetPasswordLink: "",
          };
          user = _.extend(user, updatePassword);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: `reset password saving ERROR ${err}`,
              });
            }
            res.json({
              message: `Great ,${result.name} now you can login with new password`,
            });
          });
        });
      },
    );
  }
};
