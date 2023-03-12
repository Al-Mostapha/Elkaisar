"use strict";

var Http = require('http');
const QueryString = require('querystring');

var MySql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars').engine;



const port = process.env.HomePort || 8080;

global.Elkaisar = {};


require("./Lib/LBase");
require("./Lib/LBaseHome");
const ServerList = require("./Run/ServerList").ServerList;

Elkaisar.MysqlHome = MySql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: process.env.DBUser || "root",
  password: process.env.DBPass,
  database: process.env.HomeDBName,
  charset: 'utf8mb4',
  multipleStatements: true
});

/*Elkaisar.WsLib.WS_Guild           = require('./modules/lib/guild');
 Elkaisar.WsLib.WS_GuildReq        = require('./modules/lib/guildReq');
 Elkaisar.WsLib.WS_Mail            = require('./modules/lib/mail');*/

require("./Import/ImportHome");
require("./Import/ImportHomeApi");


const HomeApp = express();

HomeApp.engine('hbs', expressHbs({
  helpers:{
    GetTabs(tab){
      console.log(tab)
      return tab
    }
  } 
}));
HomeApp.set('view engine', 'hbs');
HomeApp.set('views', '../CPanal/Views');
HomeApp.use(express.static("../CPanal/Views/Public"));
HomeApp.use(express.static(path.join(process.env.BasePath)));
HomeApp.use(express.static(path.join(process.env.BasePath, `images`)));
console.log(path.join(process.env.BasePath, `jsGame${process.env.JsVersion}`))
HomeApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
HomeApp.use( bodyParser.json() );       // to support JSON-encoded bodies
HomeApp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// HomeApp.use(function(req, res, next) {
//   const token = req.headers('x-access-token') || req.query.AToken;
//   try{
//     req.User = jwt.verify(token, process.env.JWT_SECRET);
//   }catch(e){
//     console.log(e);
//   }
//   next();
// });


HomeApp.get('/home/Config',async (req, res) => {
  res.send(JSON.stringify({
    "state": "ok",
    "Config": {
      Api: {
        url: process.env.ApiUrl,
        port: process.env.ApiPort
      },
      Home:{
        url: process.env.HomeUrl,
        port: process.env.HomePort
      },
      ServerList: Elkaisar.Config.ServerList
    }
  }));
});


const ReqHandler = async (req, res) => {
  const UrlSig = req.url.split("/");
  const l_Inst = new Elkaisar.HomeApi[UrlSig[2]](req.idPlayer || 0, {...req.query, ...req.body}, req, res);
  res.send(JSON.stringify(await  l_Inst[UrlSig[3]]() ));
}

HomeApp.post('/HomeApi/*', ReqHandler);

HomeApp.get('/HomeApi/*', ReqHandler);

HomeApp.get("/CP/*", function(req, res){
  res.render("PWorldUnitPrize", {layout: false, ...process.env, OuthToken: "Token"});
})


HomeApp.listen(port, () => {
  console.log(`Home app listening at http://:${port}`);
});
