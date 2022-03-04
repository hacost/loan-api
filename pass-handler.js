const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  console.log(await bcrypt.hash(password, 10));
}

async function verifyPassword() {
  const myPassword = 'Abrir.1903';
  const hash = '$2b$10$jbDWZ4.KxLGHQ4bWFJ.Isurh.7JEVgRY9/K.iy010QewRf/1pnSkS';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}
verifyPassword();

encryptPassword('Abrir.1903');