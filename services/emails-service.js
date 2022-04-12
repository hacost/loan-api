//const boom = require('@hapi/boom');
const {emailConfig} = require('../configs/config');
const sendGrid = require('../emails/strategies/sendGrid');
const mailerSend = require('../emails/strategies/mailerSend');
const nodeMailer = require('../emails/strategies/nodeMailer');

/*emailParams = {
  to: 'mail@hotmail.com',
  cc: 'mail@hotmail.com',
  bcc: 'mail@hotmail.com',
  subject: 'This is the Subject',
  html: '<b> This is the HTML content</b>'
} */
const emailsService = {
  async sendEmail(emailParams, sandboxMode) {
    switch (emailConfig.emailStrategy) {
      case 'SendGrid':
        sendGrid.sendMail(emailParams,sandboxMode);
        break;
      case 'MailerSend':
        mailerSend.sendMail();
        break;
      case 'NodeMailer':
        nodeMailer.sendMail(emailParams,sandboxMode);
        break;
      default:
        console.log(`Sorry, email strategy not found ${emailConfig.emailStrategy}.`);
    }
  }
  
}

module.exports = emailsService;