const express = require('express');
const request = require('request-promise');
const querystring = require('querystring');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../util/auth0-config');

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${config.domain}/.well-known/jwks.json`
});

const jwtCheck = jwt({
  secret,
  audience: config.audience,
  issuer: `https://${config.domain}/`,
  algorithms: ['RS256']
});

const router = express.Router();

const updateSearches = (req, res, next) => {
  console.log(`Updating searches for ${req.user.sub}`);
  const headers = {
    url: `https://${config.domain}/api/v2/users/${querystring.escape(req.user.sub)}`,
    headers: {
      Authorization: `Bearer ${config.managementToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({
      user_metadata: {
        saved_searches: req.body
      }
    })
  };

  request(headers)
    .then(() => res.json('ok'))
    .catch(next);
};

router.post(
  '/savedsearches',
  jwtCheck,
  updateSearches
);

module.exports = router;
