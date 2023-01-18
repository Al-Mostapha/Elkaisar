const ServerList = {
  "1": {
    name: "TestServer",
    port: process.env.Server1Port || 8081,
    DBName: process.env.Server1DBName,
  },
  "2": {
    name: "TestServer",
    port: process.env.Server2Port,
    DBName: process.env.Server2DBName,
  },
};

module.exports = ServerList;
Elkaisar.Config  = Elkaisar.Config || {};
Elkaisar.Config.ServerList = ServerList;