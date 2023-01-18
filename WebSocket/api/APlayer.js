module.exports = class APlayer {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async getPlayerGuildData(){
    return {
      "GuildData" : await Elkaisar.Lib.LGuild.getPlayerGuildData(this.idPlayer)
    }
  }

  async getPlayerState(){
    const State =  (await Elkaisar.DB.ASelectFrom("*", "player_stat", "id_player = ?", [this.idPlayer]))[0];
    return State;
  }

};