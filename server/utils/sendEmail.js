const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');
const keys = require("../config/keys")

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: keys.EMAIL_PASSWORD
    })
  );

  const mailOptions = {
    from: keys.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
    } else {
    }
  });
};

module.exports = sendEmail;