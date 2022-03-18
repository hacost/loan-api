const sgMail = require('@sendgrid/mail');
const {emailConfig} = require('../../configs/config');

function getTransporter () {
  const transport = sgMail.setApiKey(emailConfig.sendGridApiKey);
  return transport;
}

const mailOptions = {
  from: emailConfig.emailFrom,
  to: 'hacost@hotmail.com',
  subject: 'Hello Tere',
  text: 'Hello world',
  html: '<b> Hello Tere...</b>'
}

const sendMail = async () => {
  try {
      const transporter = getTransporter();
      await transporter.send(mailOptions);    
      console.log('email sent successfully')  
  } catch (error) {
    console.error(error);
    
/*     if (error.response) {
      console.error(error.response.body);
    } */
  }
}

exports.sendMail = () =>  sendMail();