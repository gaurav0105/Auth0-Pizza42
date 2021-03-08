const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const authConfig = require('./auth_config.json');
const jwtAuthz = require('express-jwt-authz');

const app = express();

if (!authConfig.domain || !authConfig.audience) {
  throw 'Please make sure that auth_config.json is in place and populated';
}

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: authConfig.appUri,
  })
);

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  //scope: 'pizza:yes',
  audience: 'http://localhost:3001',
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
  
});

const checkScopes = jwtAuthz([ 'pizza:yes' ]);

app.get('/api/orderPizza', checkJwt, checkScopes, (req, res) => {
  res.send({
    msg: 'Your Pizza order has been accepted!',
   });
   console.log('Order placed')
});

const port = process.env.API_SERVER_PORT || 3001;

app.listen(port, () => console.log(`Api started on port ${port}`));
