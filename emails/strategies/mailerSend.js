const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const {emailConfig} = require('../../configs/config');

function getTransporter () {
  const transport = new MailerSend({
    api_key: emailConfig.mailerSendApiKey,
  });
  return transport;
}

const recipients = [
  new Recipient('sb.teres@gmail.com', 'Tere')
];

const cc = [
  new Recipient('he.acost@gmail.com', 'Adrian')
];
const bcc = [
  new Recipient('hacost@hotmail.com', 'Héctor')
];

const emailParams = new EmailParams()
      .setFrom(emailConfig.emailFrom)
      .setFromName(emailConfig.fromName)
      .setRecipients(recipients)
      .setCc(cc)
      .setBcc(bcc)
      .setSubject('Test email whit mailer send')
      .setHtml('This is the HTML content')
      .setText('This is the text content');

const sendMail = async () => {
  try {
      const transporter = getTransporter();
      await transporter.send(emailParams);    
      console.log('email sent successfully')  
  } catch (error) {
    console.error(error);
  }
}

exports.sendMail = () =>  sendMail();