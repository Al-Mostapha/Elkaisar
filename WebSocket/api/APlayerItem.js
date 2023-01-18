module.exports = class APlayerItem {
  constructor(idPlayer, Param) {
    this.idPlayer = idPlayer;
    this.Param = Param;
  }
  async getPlayerItems(){
    return await Elkaisar.DB.ASelectFrom("*", "player_item", "id_player = ?", [this.idPlayer]);
  }
}