const bcrypt = require('bcrypt');

async function hashPassword(plainPassword, saltRounds) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

module.exports = hashPassword;
