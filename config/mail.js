const mail = require('@sendgrid/mail');
require('dotenv').config();

/**
 * send message to the given email address
 * @param {*} message object must contain from, to, subject, text, html
 */
module.exports = async (message) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
  await mail.send(message)
    .then(() => console.log('Email sent'))
    .catch((err) => console.error(err));
};
