const nodeMailer = require("nodemailer");
// const config = require("../config");

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail(emailData);
};
