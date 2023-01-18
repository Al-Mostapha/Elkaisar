"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ALogin_1 = require("../api/Home/Login/ALogin");
const ServerList_1 = require("./ServerList");
const HomeApp = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.HomePort || 8080;
HomeApp.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
HomeApp.post('/home/HLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const log = new ALogin_1.ALogin(0, req.query, res);
    res.send(yield log.Login());
}));
HomeApp.get('/home/Config', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Config");
    res.send(JSON.stringify({
        "state": "ok",
        "Config": {
            Api: {
                url: process.env.ApiUrl,
                port: process.env.ApiPort
            },
            Home: {
                url: process.env.HomeUrl,
                port: process.env.HomePort
            },
            ServerList: ServerList_1.ServerList
        }
    }));
}));
HomeApp.listen(port, () => {
    console.log(`Home app listening at http://localhost:${port}`);
});
