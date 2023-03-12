global.Elkaisar = {};

const DotEnv = require('dotenv');
DotEnv.config();
Elkaisar.CONST = {};
Elkaisar.CONST.SERVER_ID  = 3;
Elkaisar.CONST.ServerPort = process.env.Server1Port;
Elkaisar.CONST.DBName = process.env.Server1DBName;
require('../server');