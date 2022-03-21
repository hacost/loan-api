const nodemailer = require('nodemailer');
const {emailConfig} = require('../../configs/config');

function getTransporter () {
  const transport = nodemailer.createTransport({
    host: emailConfig.magicHost,
    port: emailConfig.magicPort,
    auth: {
      user: emailConfig.magicUser,
      pass: emailConfig.magicPass
    }
  });
  return transport;
}

const mailOptions = {
  from: `${emailConfig.fromName} <${emailConfig.emailFrom}>`,
  to: 'sb.teres@hotmail.com',
  cc: 'hector_acost@hotmail.com',
  bcc: 'hacost@hotmail.com',
  subject: 'Test email whit NodeMailer',
  text: 'This is the text content',
  html: '<b> This is the HTML content</b>'
}

const sendMail = async () => {
  try {
      const transporter = getTransporter();
      await transporter.sendMail(mailOptions);     
      console.log('email sent successfully')  
 
  } catch (error) {
    console.error(error);
  }
}

exports.sendMail = () =>  sendMail();