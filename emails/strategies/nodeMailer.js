const nodemailer = require('nodemailer');
const {emailConfig} = require('../../configs/config');
// private
  const transport = nodemailer.createTransport({
    host: emailConfig.magicHost,
    port: emailConfig.magicPort,
    auth: {
      user: emailConfig.magicUser,
      pass: emailConfig.magicPass
    }
  });

// public 
const nodeMailer = {
  async sendMail(emailParams, sandboxMode = false) {
    try {
        emailParams.from = `${emailConfig.fromName} <${emailConfig.emailFrom}>`;
        if (!sandboxMode) {
          await transport.sendMail(emailParams);     
          console.log('email sent successfully')            
        } else {
          //sandboxMode

        }  
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }
}

module.exports = nodeMailer;