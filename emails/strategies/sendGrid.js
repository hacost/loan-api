const sgMail = require('@sendgrid/mail');
const {emailConfig} = require('../../configs/config');
//private
const transporter = sgMail.setApiKey(emailConfig.sendGridApiKey);
// public
const sendGrid = {
  async sendMail (emailParams, sandboxMode = false) {
  try {
     emailParams.from = `${emailConfig.fromName} <${emailConfig.emailFrom}>`;
     emailParams.mail_settings = {
        sandbox_mode: {
          enable: sandboxMode
        }
      }
      await transporter.send(emailParams);    
      console.log('email sent successfully')  
  } catch (error) {
    console.log(`error: ${error.message}`);
    if (error.response) {
      console.error(error.response.body)
    }
  }
  }

};

module.exports = sendGrid;


