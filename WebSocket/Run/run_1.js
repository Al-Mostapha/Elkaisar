
const DotEnv = require('dotenv');
DotEnv.config();
console.log({ user: process.env.HomeDBUser,
password: process.env.HomeDBPass,
database: process.env.HomeDBName});
require('../serverHome');