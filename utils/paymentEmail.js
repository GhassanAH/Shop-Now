const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');
const keys = require("../config/keys")

const paymentEmail = (options) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: keys.EMAIL_PASSWORD
    })
  );

  const mailOptions = {
    from: keys.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    templateId: 'd-179df816f6954000ac62bf5a7f3fc50f',
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = paymentEmail;