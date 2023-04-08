const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer')
const path = require('path')
const pug = require('pug');
const  { convert }  =  require ('html-to-text')
require('dotenv').config()

const { 
  MAIL_SENDER,
  BASE_URL,
  MAILTRAP_HOST, 
  MAILTRAP_PORT, 
  MAILTRAP_USER, 
  MAILTRAP_PASS, 
  SENDGRID_API_KEY,
  NODE_ENV,
} = process.env

const option = {
  wordwrap: 130,
  selectors: [{
      selector: 'a', 
      options: { 
        linkBrackets: false , 
        baseUrl: 'https://example.com' 
      }},
  ]
}

const sendEmail = async (address, verificationToken) => {
  const html = pug.renderFile(path.join(__dirname, '..', 'template', 'verify', 'verifyLetter.pug'),{
        name: address,
        link: `${BASE_URL}/users/verify/${verificationToken}`
  })

  const text = convert(html, option);

  const mail = {
    to: address,
    from: MAIL_SENDER,
    subject: "Verify email",
    html,
    text,
  }

  if(NODE_ENV === 'development'){
    const emailTransport = nodemailer.createTransport({
      host: MAILTRAP_HOST,
      port: MAILTRAP_PORT,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS
      }
    });

    await emailTransport.sendMail(mail)
    console.log(`Email sent to ${mail.to} from ${mail.from}`)
    return true
  }

  if (NODE_ENV === 'production') {
    sgMail.setApiKey(SENDGRID_API_KEY);

    await sgMail.send(mail)
    console.log(`Email sent to ${mail.to} from ${mail.from}`)
    return true
  }
}

module.exports = {
  sendEmail
}