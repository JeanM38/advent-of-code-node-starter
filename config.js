// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  session: process.env.SESSION_COOKIE,
};