const fs = require('node:fs');
const path = require('node:path');

function loadCredentials() {
  const credentialFile = path.resolve(__dirname, '../.credentials.json');
  const localCredentials = fs.existsSync(credentialFile)
    ? JSON.parse(fs.readFileSync(credentialFile, 'utf8'))
    : {};

  const username = process.env.LOGIN_USERNAME || localCredentials.username;
  const password = process.env.LOGIN_PASSWORD || localCredentials.password;

  if (!username || !password) {
    throw new Error(
      'Set LOGIN_USERNAME and LOGIN_PASSWORD or add username and password to the ignored root .credentials.json file.'
    );
  }

  return { username, password };
}

module.exports = { loadCredentials };
