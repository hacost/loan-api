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
  from: emailConfig.emailFrom,
  to: 'hacost@hotmail.com',
  subject: 'Test email',
  text: 'Hello world',
  html: '<b> Hello World...</b>'
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