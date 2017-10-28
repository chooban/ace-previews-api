const fs = require('fs');

const clientIdPath = '/run/secrets/auth0_client_id';
const authDomainPath = '/run/secrets/auth0_domain';
const clientSecret = '/run/secrets/auth0_client_secret';
const managementToken = '/run/secrets/auth0_management_token';
const config = {
  domain: 'domain',
  secret: 'secret',
  audience: 'audience',
  managementToken: 'token'
};

if (process.env.SECRET) {
  config.secret = process.env.SECRET;
  config.audience = process.env.AUDIENCE;
  config.managementToken = process.env.MANAGEMENT;
  config.domain = process.env.DOMAIN;
} else if (fs.existsSync(clientIdPath)) {
  config.secret = fs.readFileSync(clientSecret, 'utf8').trim();
  config.audience = fs.readFileSync(clientIdPath, 'utf8').trim();
  config.managementToken = fs.readFileSync(managementToken, 'utf8').trim();
  config.domain = fs.readFileSync(authDomainPath, 'utf8').trim();
}

module.exports = config;

