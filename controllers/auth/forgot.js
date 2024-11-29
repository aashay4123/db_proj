const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/sendMail");

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist.",
      });
    }
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      },
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password reset link`,
      text: `
                  Please use the following link to Reset your Password
                  ${process.env.CLIENT_URL}/auth/password/reset/${token}
                  
                  This email may contain sensetive information
                  ${process.env.CLIENT_URL}
              `,
    };
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        "RESET PASSWORD LINK ERROR", err;
        return res.status(400).json({
          error: `datase Connection reset password error ${err}`,
        });
      } else {
        sendEmail(emailData)
          .then((info) => {
            return res.json({
              message: `Email has been sent to ${emailData.to}. Follow the instruction to activate your account`,
            });
          })
          .catch((err) => {
            return res.json({
              message: err,
            });
          });
      }
    });
  });
};
