import { HomeDB } from "../../../DB/HomeDB";
import { LCred } from "../../../Lib/LCred";
import { ServerList } from "../../../Run/ServerList";
const joi = require('@hapi/joi');
import jwt from 'jsonwebtoken';
import { Response } from "express";

export class ALogin{
  
    public idPlayer: number;
    public Param: any;
    public res: Response;
    constructor(idPlayer: number, Param :any, res: Response){
      this.idPlayer = idPlayer;
      this.Param = Param;
      this.res = res;
    }
    public LogFailUserName(){
      return "";
    };
    public LogFailPassWord(User: any){
      return "";
    };

    public UserLogedIn(idPlayer: number){

    }

    private static SignIds(idUser:  number){
      let TokenMap: any = {};
      for(let serverIndex in ServerList){
        TokenMap[serverIndex] = jwt.sign({idUser, idServer: serverIndex}, process.env.JWT_SECRET as string, {expiresIn: 60*60*24*10});
      }
      return TokenMap;
    };

    public async Login(){

      const Email = Elkaisar.Base.validateEmail(this.Param.userName);
      const password = this.Param.password;
      const User = await HomeDB.ASelectFrom("id_user, user_name, last_server, enc_pass, panned", "game_user", "( user_name = ? OR email = ? )", [Email, Email]);
      if(User.length == 0)
        return {state: "error_0", UserNameFail: this.LogFailUserName()};
      if(!await LCred.PassCheck(password, User[0].enc_pass))
        return {state: "error_1", PasswordFail: this.LogFailPassWord(User[0])};
      if(User[0].panned > Date.now()/1000)
        return {state: "error_2"};

      HomeDB.AInsert("id_user = ?, ip_address = ?", "user_log", [User[0].id_user, this.Param.ip]);
      this.UserLogedIn(User[0].id_user);
      delete User[0].enc_pass;
      return {
        state: "ok",
        User: User[0],
        Tokens: ALogin.SignIds(User[0].id_user),
        serverName: ServerList[User[0]["last_server"]] ? ServerList[User[0]["last_server"]].name : "---"
      };
    }
      
};