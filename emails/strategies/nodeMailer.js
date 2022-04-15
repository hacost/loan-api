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
      if (emailParams.to) {
        emailParams.from = `${emailConfig.fromName} <${emailConfig.emailFrom}>`;
        if (!sandboxMode) {
          await transport.sendMail(emailParams);     
          console.log('email sent successfully')            
        } else {
          //sandboxMode
        }         
      } else {
        throw new Error('emailParams.to is Empty');
      } 
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }
}

module.exports = nodeMailer;