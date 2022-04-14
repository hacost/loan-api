const sgMail = require('@sendgrid/mail');
const {emailConfig} = require('../../configs/config');
const {stringToArray} = require('../../utils/helper-util');

//private
const transport = sgMail.setApiKey(emailConfig.sendGridApiKey);

const processEmailParams = (emailParams) => {
  emailParams.from = `${emailConfig.fromName} <${emailConfig.emailFrom}>`;  
  emailParams.to = stringToArray(emailParams.to);
  if (emailParams.cc) {
    emailParams.cc = stringToArray(emailParams.cc); 
  }
  if (emailParams.bcc) {
    emailParams.bcc = stringToArray(emailParams.bcc);
  }
  return emailParams;
};
// public
const sendGrid = {
  async sendMail (emailParams, sandboxMode = false) {
  try {
    if (emailParams.to) {
      emailParams.mail_settings = {
        sandbox_mode: {
          enable: sandboxMode
        }
      }
      await transport.send(processEmailParams(emailParams)); 
      console.log('email sent successfully'); 
    } else {
      throw new Error('emailParams.to is Empty');
    } 
   } catch (error) {
    console.log(`error: ${error.message}`);
    if (error.response) {
      console.error(error.response.body)
    }
  } 
  }

};

module.exports = sendGrid;


