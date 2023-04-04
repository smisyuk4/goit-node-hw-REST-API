const nodemailer = require('nodemailer')
require('dotenv').config()

const { MAIL_USER, MAIL_PASS } = process.env

const emailTransport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

const emailconfig = {
    from: "from@example.com",
    to: 'to@example.com',
    subject: 'Nodemailer test',
    text: 'Привіт. Ми тестуємо надсилання листів!',
};

emailTransport
  .sendMail(emailconfig)
  .then(info => console.log("info", info))
  .catch(err => console.log("err", err));
