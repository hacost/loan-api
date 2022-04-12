const mustache = require('mustache');
const fileSystem = require('fs');
const path = require('path');
const {TEMPLATES} = require('../utils/constants');
         
// private
function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
  })
}

async function readTemplate(templateName) {
  const templatePath = path.resolve(__dirname, `../emails/templates/${templateName}`);
  const readableStream = fileSystem.createReadStream(templatePath, 'utf-8');
  return await streamToString(readableStream);
}

//public
const templatesService = {
 async getTemplate(templateName, templateParams = 'null'){
    try {
      return mustache.render(
        await readTemplate(TEMPLATES.header)  + 
        await readTemplate(templateName) + 
        await readTemplate(TEMPLATES.footer) ,
        templateParams);  
    } catch (error) {
      console.log(`error: ${error.message}`);
      throw 'Error getTemplate ';
    }     
  }
};

module.exports = templatesService;
