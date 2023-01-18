module.exports = class APlayerEdu{
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async getPlayerEduLvl(){
    return (await Elkaisar.DB.ASelectFrom("*", "player_edu", "id_player = ?", [this.idPlayer]))[0];
  }
}