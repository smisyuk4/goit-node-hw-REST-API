const nodemailer = require('nodemailer')
require('dotenv').config()

const { MAIL_USER, MAIL_PASS, MAIL_SENDER } = process.env

const emailTransport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

const sendEmail = async (data) => {
  const email = { ...data, from: MAIL_SENDER}
  await emailTransport.sendMail(email)
  return true
}

module.exports = {
  sendEmail
}