class ATradeCenter {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getTradeList() {
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "buy_item.* , player.name AS p_name",
      "buy_item JOIN player ON player.id_player = buy_item.id_player",
      "1 LIMIT 7 OFFSET ?", [offset]
    );
  }

  async getForbiddenItem() {
    return await Elkaisar.DB.ASelectFrom("*", "buy_item_black_list", "1");
  }

  async getPlayerTradeList() {
    return await Elkaisar.DB.ASelectFrom(
      "*", "buy_item", "id_player = ?", [this.idPlayer]
    );
  }

  async getTotalCount() {
    return (await Elkaisar.DB.ASelectFrom("COUNT(*)  AS item_count", "buy_item", "1"))[0];
  }

}
module.exports = ATradeCenter;