const fs = require('fs');
const dataDirectory = () => process.env.DATA_DIR || '/data/';

const clientIdPath = '/run/secrets/auth0_client_id';
const authDomainPath = '/run/secrets/auth0_domain';
const config = {
  domain: '',
  clientId: ''
};

if (process.env.SECRET) {
  config.clientId = process.env.CLIENT_ID;
  config.domain = process.env.DOMAIN;
} else if (fs.existsSync(clientIdPath)) {
  config.clientId = fs.readFileSync(clientIdPath, 'utf8').trim();
  config.domain = fs.readFileSync(authDomainPath, 'utf8').trim();
}

module.exports = {
  dataDirectory,
  config
};
