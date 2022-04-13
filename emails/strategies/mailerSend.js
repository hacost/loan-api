const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const {emailConfig} = require('../../configs/config');

const transport = new MailerSend({
    api_key: emailConfig.mailerSendApiKey,
});
 
const processEmailParams = (emailParams) => {
  const recipients = [
    new Recipient(emailParams.to)
  ];
  
  const cc = [
    new Recipient(emailParams.cc)
  ];
  const bcc = [
    new Recipient(emailParams.bcc)
  ];
  return new EmailParams()
      .setFrom(emailConfig.emailFrom)
      .setFromName(emailConfig.fromName)
      .setRecipients(recipients)
      .setCc(cc)
      .setBcc(bcc)
      .setSubject(emailParams.subject)
      .setHtml(emailParams.html);
} 
// public 
const mailerSend = {
 async sendMail (emailParams, sandboxMode = false) {
    try {
        if (!sandboxMode) {
          console.log(await transport.send(processEmailParams(emailParams)));    
          console.log('email sent successfully')           
        } else {
          //sandboxMode
        }
     } catch (error) {
      console.error(error);
    }
  }
}

module.exports = mailerSend;