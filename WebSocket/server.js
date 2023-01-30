"use strict";

var webSocketServer = require('websocket').server;
var Http = require('http');
const QueryString = require('querystring');
const DotEnv = require('dotenv');
const jwt = require("jsonwebtoken")
Elkaisar.URL = require('url');
var MySql = require('mysql');
Elkaisar.ZLib = require('zlib');
Elkaisar.Event = require('events');
Elkaisar.Cron = require('node-cron');

DotEnv.config();




const startTime = Date.now();

Elkaisar.Mysql = MySql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: Elkaisar.CONST.DBUserName,
    password: Elkaisar.CONST.DBPassWord,
    database: Elkaisar.CONST.DBName,
    charset: 'utf8mb4',
    multipleStatements: true
});


Elkaisar.MysqlBattelReplay = MySql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: Elkaisar.CONST.DBUserName,
    password: Elkaisar.CONST.DBPassWord,
    database: "elkaisar_battel_replay",
    charset: 'utf8mb4',
    multipleStatements: true
});

Elkaisar.MysqlHome = MySql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: process.env.HomeDBUser,
  password: process.env.HomeDBPass,
  database: process.env.HomeDBName,
  charset: 'utf8mb4',
  multipleStatements: true
});

Elkaisar.Arr = {};
Elkaisar.data = {};
Elkaisar.Arr.Players = {};
Elkaisar.Arr.BattelWatchList = {};
Elkaisar.DB = {};
Elkaisar.HomeDB = {};
Elkaisar.Config = {};
Elkaisar.AllWorldCity = [];
Elkaisar.AllWorldCityColonized = [];
Elkaisar.Helper = {};
Elkaisar.API = {};

Elkaisar.World = {};
Elkaisar.Battel = {
    BattelList: {}
};

Elkaisar.Equip = {
    EquipPower: {}
};

Elkaisar.OnEvent = new Elkaisar.Event();


Elkaisar.WsLib = {};
Elkaisar.Lib = {};
Elkaisar.CP = {};

Elkaisar.Base = require('./modules/lib/base');
Elkaisar.data = require('./modules/util/world/unitData');

require("./Import/ImportLib");

Elkaisar.Config.CHero = require('./Config/CHero');
Elkaisar.Config.CArmy = require('./Config/CArmy');
Elkaisar.Config.CCity = require('./Config/CCity');
Elkaisar.Config.CPlayer = require('./Config/CPlayer');
Elkaisar.Config.CItem = require('./Config/CItem');

require("./Import/ImportWsLib");
require("./Import/ImportApiLib");
require("./Import/ImportApi");
require("./Import/ImportCp");



/*Elkaisar.WsLib.WS_Guild           = require('./modules/lib/guild');
 Elkaisar.WsLib.WS_GuildReq        = require('./modules/lib/guildReq');
 Elkaisar.WsLib.WS_Mail            = require('./modules/lib/mail');*/




/* inf Loops */
require("./Import/ImportLoop");
require("./PreLoad")
require("./Cach")



Elkaisar.Base.HandleReq = async function(Path, Parm){
    
    var Res  = ""; 
   
    let User = null;
    try {
      User = jwt.verify(Parm.token, process.env.JWT_SECRET)
    } catch (error) {
      
    }
    const idPlayer = User.idPlayer || User.idUser;
    const ReqId = JSON.stringify(Path) + idPlayer;
    console.log(Parm, User);
    if (Elkaisar.Cach.BusyPlayers[ReqId]) {
        Res = JSON.stringify({state: "SysBusy"});
    } else {
      Elkaisar.Cach.BusyPlayers[ReqId] = true;
        if (Path[1] == "api") {
          if(!User)
            return console.log("Error No User Found", Path, Parm);
          if(User.panned > Date.now()/1000)
              return console.log(Date(), "Panned Player Try To Open", Path, Parm);
          Res = JSON.stringify(await (new Elkaisar.API[Path[2]](idPlayer, Parm))[Path[3]]());
        } else if(Path[1] == "cp") {
            Res = JSON.stringify(await (new Elkaisar.CP[Path[2]](Parm))[Path[3]]());
        }


        Elkaisar.Cach.BusyPlayers[ReqId] = false;
    }
    
    return Res;
};


var server = Http.createServer(async function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("Content-Type", "text/plain");
    var data = "";
    
    const Url = Elkaisar.URL.parse(request.url, true);
    const Path = Url.pathname.split("/");
    const Method = request.method;
    
    if(Method == "POST"){
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', async () => {
            const PostPar = QueryString.parse(data);
            response.end(await Elkaisar.Base.HandleReq(Path, PostPar));
        });
        
        return ;
    }
    
    
    const Parm = Url.query;
    response.end(await Elkaisar.Base.HandleReq(Path, Parm));
   
   


});

server.listen(Elkaisar.CONST.ServerPort, function () { });




var wsServer = new webSocketServer({httpServer: server});


wsServer.on('request', function (request) {

    var connection = request.accept(null, request.origin);
    connection.idPlayer = request.resourceURL.query.idPlayer;
    connection.idGameServer = request.resourceURL.query.server;
    connection.ComeFrom = request.origin;
    connection.ComeFromHeader = request.httpRequest.headers;
    connection.token = request.resourceURL.query.token;
    connection.ip = request.remoteAddress;


    connection.on('message', function (message) {


        if (message.type === 'utf8') {
            var msg = JSON.parse(message.utf8Data);

            if (!msg.url && !msg.uRL) {
                console.log(msg);
            } else if (!msg.uRL) {

            }
            var url = (msg.url || msg.uRL).split("/");

            try {
                Elkaisar.WsLib[url[0]][url[1]](connection, msg.data);
            } catch (e) {
                console.log(message);
                console.log(e);
            }
        }


    });

    connection.on('close', function (code) {

        if (connection.idPlayer && connection.idPlayer > 0)
            Elkaisar.WsLib.Player.offline(connection);
        delete Elkaisar.Cach.BusyPlayers[connection.idPlayer];
    });
});


process.on('uncaughtException', (err, origin) => {
    console.error("uncaughtException");
    console.log(err);
    console.log(origin);
});


process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code, `after ${startTime - Date.now()}`);

});
