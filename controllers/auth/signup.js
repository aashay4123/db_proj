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

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" },
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      text: `
                  Please use the following link to activate your account
                  ${process.env.CLIENT_URL}/auth/activate/${token}
                
                 This email may contain sensetive information
                  ${process.env.CLIENT_URL}
              `,
    };

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
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: `${err}Expired link. Signup again`,
          });
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: "Error saving user in database. Try signup again",
            });
          }
          return res.json({
            message: "Signup success. Please signin.",
          });
        });
      },
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};
