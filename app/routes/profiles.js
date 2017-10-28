const express = require('express');
const request = require('request-promise');
const querystring = require('querystring');
const jwt = require('express-jwt');

const config = require('../util/auth0-config');

const jwtCheck = jwt({
  secret: config.secret,
  audience: config.audience
});

const router = express.Router();

const updateSearches = (req, res, next) => {
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

