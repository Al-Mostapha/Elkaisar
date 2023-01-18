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
exports.ALogin = void 0;
const HomeDB_1 = require("../../../DB/HomeDB");
const LCred_1 = require("../../../Lib/LCred");
const ServerList_1 = require("../../../Run/ServerList");
const joi = require('@hapi/joi');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ALogin {
    constructor(idPlayer, Param, res) {
        this.idPlayer = idPlayer;
        this.Param = Param;
        this.res = res;
    }
    LogFailUserName() {
        return "";
    }
    ;
    LogFailPassWord(User) {
        return "";
    }
    ;
    UserLogedIn(idPlayer) {
    }
    static SignIds(idUser) {
        let TokenMap = {};
        for (let serverIndex in ServerList_1.ServerList) {
            TokenMap[serverIndex] = jsonwebtoken_1.default.sign({ idUser, idServer: serverIndex }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 10 });
        }
        return TokenMap;
    }
    ;
    Login() {
        return __awaiter(this, void 0, void 0, function* () {
            const Email = Elkaisar.Base.validateEmail(this.Param.userName);
            const password = this.Param.password;
            const User = yield HomeDB_1.HomeDB.ASelectFrom("id_user, user_name, last_server, enc_pass, panned", "game_user", "( user_name = ? OR email = ? )", [Email, Email]);
            if (User.length == 0)
                return { state: "error_0", UserNameFail: this.LogFailUserName() };
            if (!(yield LCred_1.LCred.PassCheck(password, User[0].enc_pass)))
                return { state: "error_1", PasswordFail: this.LogFailPassWord(User[0]) };
            if (User[0].panned > Date.now() / 1000)
                return { state: "error_2" };
            HomeDB_1.HomeDB.AInsert("id_user = ?, ip_address = ?", "user_log", [User[0].id_user, this.Param.ip]);
            this.UserLogedIn(User[0].id_user);
            delete User[0].enc_pass;
            return {
                state: "ok",
                User: User[0],
                Tokens: ALogin.SignIds(User[0].id_user),
                serverName: ServerList_1.ServerList[User[0]["last_server"]] ? ServerList_1.ServerList[User[0]["last_server"]].name : "---"
            };
        });
    }
}
exports.ALogin = ALogin;
;
