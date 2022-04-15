const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const {emailConfig} = require('../../configs/config');
const {stringToArray} = require('../../utils/helper-util');

const transport = new MailerSend({
    api_key: emailConfig.mailerSendApiKey,
});

const getRecipients = (string) => {
  const emails = stringToArray(string);
  const recipients = [];
  emails.forEach((email) => {
    recipients.push(new Recipient(email))
  });
  return recipients;
}

const processEmailParams = (params) => {
  const emailParams = new EmailParams();

  emailParams.setFrom(emailConfig.emailFrom);
  emailParams.setFromName(emailConfig.fromName);
  emailParams.setSubject(params.subject);
  emailParams.setHtml(params.html);
  emailParams.setRecipients(getRecipients(params.to));
  if (params.cc) {
    emailParams.setCc(getRecipients(params.cc))
  };
  if (params.bcc) {
    emailParams.setBcc(getRecipients(params.bcc))
  }
  return emailParams;
} 

// public 
const mailerSend = {
 async sendMail (emailParams, sandboxMode = false) {
    try {
      if (emailParams.to) {
        if (!sandboxMode) {
         await transport.send(processEmailParams(emailParams)); 
         console.log('email sent successfully')           
        } else {
          //sandboxMode
        }        
      } else {
        throw new Error('emailParams.to is Empty');
      } 
     } catch (error) {
      console.error(error);
    }
  }
}

module.exports = mailerSend;