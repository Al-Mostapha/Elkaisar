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




const HomeApp = express();


HomeApp.get('/',async (req, res) => {
  // res.send(JSON.stringify({
  //   "state": "ok",
  //   "Config": {
  //     Api: {
  //       url: process.env.ApiUrl,
  //       port: process.env.ApiPort
  //     },
  //     Home:{
  //       url: process.env.HomeUrl,
  //       port: process.env.HomePort
  //     }
  //   }
  // }));
  console.log("Res Come ", req);
  setTimeout(() => {
    res.send("ok");
  }, 1000 * 550);
});

HomeApp.listen(port, () => {
  console.log(`Home app listening at http://localhost:${port}`);
});
