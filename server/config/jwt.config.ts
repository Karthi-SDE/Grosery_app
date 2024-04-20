'use strict';
console.log('process.env.APP_DOMAIN',process.env.APP_DOMAIN);

export default {
  issuer: process.env.APP_DOMAIN,
  audience: 'localhost',
  expiresIn: '30d',
  secretKey: process.env.JWT_SECRET_KEY
};
