class APlayerEquip {
  constructor(idPlayer, Param) {
    this.idPlayer = idPlayer;
    this.Param = Param;
  }

  async getPlayerEquip(){
    return await Elkaisar.DB.ASelectFrom("*", "equip", "id_player = ?", [this.idPlayer]);
  }

  async getEquipPower()
  {
      
      return await Elkaisar.DB.ASelectFrom("*", "equip_power", "1");
      
  }

}

module.exports = APlayerEquip;