module.exports = class APlayerEquip {
  constructor(idPlayer, Param) {
    this.idPlayer = idPlayer;
    this.Param = Param;
  }
  async getPlayerEquip(){
    return await Elkaisar.DB.ASelectFrom("*", "equip", "id_player = ?", [this.idPlayer]);
  }
}