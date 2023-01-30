class LEquip {

  static async addEquip(idPlayer, Equip, part, lvl = 1) {
    await Elkaisar.DB.AInsert("id_player = ?, type = ?, part = ?, lvl = ?",
      "equip", [idPlayer, Equip, part, lvl]);
  }

  static async addEquipForPlayer(idPlayer, Equip, part, lvl = 1) {
    await Elkaisar.DB.AInsert("id_player = ?, type = ?, part = ?, lvl = ?",
      "equip", [idPlayer, Equip, part, lvl]);
  }
}

module.exports = LEquip;