const fs = require('fs');

const dataDirectory = () => process.env.DATA_DIR || '/data/';

const clientIdPath = '/run/secrets/auth0_client_id';
const authDomainPath = '/run/secrets/auth0_domain';

const contentsOrEmptyString = (path) => (
  fs.existsSync(path) ? fs.readFileSync(path, 'utf8').trim() : ''
);

const config = () => ({
  clientId: contentsOrEmptyString(clientIdPath),
  domain: contentsOrEmptyString(authDomainPath)
});

module.exports = {
  dataDirectory,
  config
};
