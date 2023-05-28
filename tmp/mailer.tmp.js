const mail = require('@sendgrid/mail');
require('dotenv').config();

mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: 'mushfiqurtalha@iut-dhaka.edu',
  to: 'mushfiqurrahman845@gmail.comz',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}

mail.send(msg)
  .then(() => console.log('Email sent'))
  .catch((err) => console.error(err));
