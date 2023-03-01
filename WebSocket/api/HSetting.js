class HSetting{
  Parm;
  idPlayer;
  constructor(idPlayer, Url){
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async changePlayerPassword(){
    const newPass = Elkaisar.Base.validatePlayerWord(this.Parm.newPassword);
    const oldPass = Elkaisar.Base.validatePlayerWord(this.Parm.oldPassword);
    const idUser  = Elkaisar.DB.ASelectFrom("id_user", "player", "id_player = ?", [this.idPlayer]);
    const User    = Elkaisar.HomeDB.ASelectFrom("id_user, enc_pass","game_user", "id_user = ?", [idUser[0].id_user]);
    if(User.length == 0)
      return {state: "error_0"}
    const checkPass = await Elkaisar.LCred.PassCheck(oldPass, User[0].enc_pass);
    if(!checkPass)
      return { state: "error_1" }
      
    const enc_pass = Elkaisar.LCred.PassEnc(newPass);
    await Elkaisar.DB.AUpdate("enc_pass = ?", "game_user", "id_user = ?", [enc_pass, idUser]);
    return {
      state: "ok"
    }
  }

  async chanegPlayerLang(){
    const newLang = Elkaisar.Base.validateGameNames(this.Parm.newLang);
    await Elkaisar.DB.AUpdate("lang = ?", "player", "id_player = ?", [newLang, this.idPlayer]);
    return {
      state: "ok"
    }
  }
};


module.exports = HSetting;