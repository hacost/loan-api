const sgMail = require('@sendgrid/mail');
const {emailConfig} = require('../../configs/config');

const sandboxMode = false;
function getTransporter () {
  const transport = sgMail.setApiKey(emailConfig.sendGridApiKey);
  return transport;
}

const emailParams = {
  from: `${emailConfig.fromName} <${emailConfig.emailFrom}>`,
  to: 'sb.teres@hotmail.com',
  cc: 'hector_acost@hotmail.com',
  bcc: 'hacost@hotmail.com',
  subject: 'Test email whit sendgrid',
  text:'This is the text content',
  html: '<b> This is the HTML content</b>',
  mail_settings: {
    sandbox_mode: {
      enable: sandboxMode
    }
  }
}

const sendMail = async () => {
  try {
      const transporter = getTransporter();
      await transporter.send(emailParams);    
      console.log('email sent successfully')  
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

exports.sendMail = () =>  sendMail();