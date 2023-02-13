class ATradeCenter {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getPlayerTradeList() {
    return await Elkaisar.DB.ASelectFrom(
      "*", "buy_item", "id_player = ?", [this.idPlayer]
    );
  }

}
module.exports = ATradeCenter;