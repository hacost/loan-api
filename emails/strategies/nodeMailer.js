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

const emailParams = {
  from: `${emailConfig.fromName} <${emailConfig.emailFrom}>`,
  to: 'sb.teres@hotmail.com',
  cc: 'hector_acost@hotmail.com',
  bcc: 'hacost@hotmail.com',
  subject: 'Test email whit NodeMailer',
  html: '<b> This is the HTML content</b>'
}

const sendMail = async () => {
  try {
    
      const transporter = getTransporter();
      await transporter.sendMail(emailParams);     
      console.log('email sent successfully')  
 
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
}

exports.sendMail = () =>  sendMail();