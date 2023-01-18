import dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';
import { ALogin } from '../api/Home/Login/ALogin';
import { ServerList } from './ServerList';

const HomeApp: Express = express();

dotenv.config();
const port = process.env.HomePort || 8080;
require


HomeApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


HomeApp.post('/home/HLogin',async (req: Request, res : Response) => {
  const log =  new ALogin(0, req.query, res);
  res.send(await log.Login());
});

HomeApp.get('/home/Config',async (req: Request, res : Response) => {

  console.log("Config");
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
      ServerList: ServerList
    }
  }));
});


HomeApp.listen(port, () => {
  console.log(`Home app listening at http://localhost:${port}`);
});



