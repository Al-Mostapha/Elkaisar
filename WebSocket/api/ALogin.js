const jwt = require('jsonwebtoken');
class ALogin {

  idPlayer;
  Param;
  req;
  res;
  constructor(idPlayer, Param, req, res) {
    this.idPlayer = idPlayer;
    this.Param = Param;
    this.res = res;
    this.req = req;
  }
  LogFailUserName() {
    return "";
  };
  LogFailPassWord(User) {
    return "";
  };

  UserLogedIn(idPlayer) {

  }

  static SignIds(idUser) {
    let TokenMap = {};
    for (let serverIndex in Elkaisar.Config.ServerList) {
      TokenMap[serverIndex] = jwt.sign({ idUser, idServer: serverIndex }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 10 });
    }
    return TokenMap;
  };

  async Login() {
    const Email = Elkaisar.Base.validateEmail(this.Param.userName);
    const password = this.Param.password;
    const User = await Elkaisar.HomeDB.ASelectFrom("id_user, user_name, last_server, enc_pass, panned", "game_user", "( user_name = ? OR email = ? )", [Email, Email]);
    if (User.length == 0)
      return { state: "error_0", UserNameFail: this.LogFailUserName() };
    if (!await Elkaisar.LCred.PassCheck(password, User[0].enc_pass))
      return { state: "error_1", PasswordFail: this.LogFailPassWord(User[0]) };
    if (User[0].panned > Date.now() / 1000)
      return { state: "error_2" };
    Elkaisar.HomeDB.AInsert("id_user = ?, ip_address = ?", "user_log", [User[0].id_user, this.Param.ip]);
    this.UserLogedIn(User[0].id_user);
    delete User[0].enc_pass;
    const LastServer = Elkaisar.Config.ServerList[User[0]["last_server"]];
    const LoginToken = jwt.sign({ idUser: User[0].id_user }, process.env.JWT_SECRET, { expiresIn: "10d" });
    Elkaisar.HomeDB.AUpdate("auth_token = ?", "user_auth", "id_user = ?", [LoginToken, User[0].id_user]);
    return {
      state: "ok",
      User: User[0],
      Tokens: ALogin.SignIds(User[0].id_user),
      serverName: LastServer ? LastServer.name : "---",
      LoginToken: LoginToken
    };
  }

  async Logout() {
    try {
      const User = jwt.verify(this.Param.LoginToken, process.env.JWT_SECRET);
      Elkaisar.HomeDB.AUpdate("auth_token = ?", "user_auth", "id_user = ?", ["", User.idUser]);
      console.log(User);
      return { state: "ok" };
    } catch (e) {
      return { state: "error_0" };
    }
  }

  async VerifyPlayerToken() {
    try {
      const User = jwt.verify(this.Param.LoginToken, process.env.JWT_SECRET);
      if (!User.idUser)
        return { state: "error_0" };
      const Auth = await Elkaisar.HomeDB.ASelectFrom("id_user, auth_token", "user_auth", "auth_token = ?", [this.Param.LoginToken]);
      if (Auth.length == 0)
        return { state: "error_0" };
      if (Auth[0].id_user != User.idUser)
        return { state: "error_1" };
      const UserServer = jwt.verify(this.Param.UserToken, process.env.JWT_SECRET);
      return {
        state: "ok",
        idUser: UserServer.idUser,
        idServer: UserServer.idServer,
        ServerData: Elkaisar.Config.ServerList[UserServer.idServer],
        ApiHost: process.env.ApiHost,
        ApiUrl: process.env.ApiUrl,
        WsHost: process.env.WsHost,
        WsPort: process.env.WsPort,
        PhpApiUrl: process.env.PhpApiUrl,
        AssetPath: process.env.AssetPath
      }
    } catch (e) {
      return { state: "error_0" };
    }
  }


  async PlayerEnterServerWeb() {
    const UserToken = this.Param.token;
    try {
      const User = jwt.verify(UserToken, process.env.JWT_SECRET);
      if (!User.idUser)
        return { state: "error_0" };
      const Player = await Elkaisar.DB.ASelectFrom("*", "player", "id_user = ?", [User.idUser]);
      if (Player.length == 0)
        return { state: "error_1" };
      if (Player[0].panned > Date.now() / 1000)
        return { state: "error_2" };
      const Token = jwt.sign({ idUser: User.idUser, idPlayer: Player[0].id_player , panned: Player[0].panned}, process.env.JWT_SECRET, { expiresIn: "10h" });
      Elkaisar.DB.AUpdate("auth_token = ?", "player_auth", "id_player = ?", [Token, Player[0].id_player]);
      Elkaisar.HomeDB.AUpdate("last_server = ?", "game_user", "id_user = ?", [User.idServer, User.idUser]);
      let idCities = [];
      const Cities = await Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [Player[0].id_player]);
      for (let City of Cities) {
        await Elkaisar.Lib.LSaveState.afterCityColonized(City.id_city);
        await Elkaisar.Lib.LSaveState.afterCityColonizer(City.id_city);
        idCities.push(City.id_city);
      }
      return {
        state: "ok",
        Player: Player[0],
        Server: (await Elkaisar.DB.ASelectFrom("*", "server_data", "id = 1"))[0],
        OuthToken: Token,
        idCities: idCities,
        PayLink: process.env.PayUrl,
        JsVersion: process.env.JsVersion,
        RechCode: (await Elkaisar.HomeDB.ASelectFrom("rech_code", "game_user", "id_user = ?", [User.idUser]))[0]["rech_code"]
      }
    } catch (error) {
      return {
        state: "error_0"
      }
    }
  };
};

module.exports = ALogin;