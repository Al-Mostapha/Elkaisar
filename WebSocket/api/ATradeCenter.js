class ATradeCenter {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async buyItem() {

    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);
    const idItem = Elkaisar.Base.validateId(this.Parm.idItem);

    const item = await Elkaisar.DB.ASelectFrom("*", "buy_item", "id_item = ?", [idItem]);
    if (item.length <= 0)
      return { state: "error_1" };
    if (isNaN(Number(amount)) || amount <= 0 || amount < item[0].amount)
      return { state: "error_2" }

    const buyVoucherCheck = await Elkaisar.Lib.LItem.useItem(this.idPlayer, "buy_voucher", amount);
    if (!buyVoucherCheck)
      return { state: "error_6" }
    if (item[0].price <= 0)
      return { state: "error_1" }

    const gold = amount * item[0].price;

    if (gold < 0)
      return { state: "error_5" }
    const player = await Elkaisar.DB.ASelectFrom("gold, porm", "player", "id_player = ?", [this.idPlayer]);
    if (player.length != 1)
      return { state: "error_4" }
    if (player[0].porm < 5)
      return { state: "error_4" }

    if (!(await Elkaisar.Lib.LPlayer.takePlayerGold(this.idPlayer, amount)))
      return { state: "error_4" }
    Elkaisar.Lib.LItem.addItem(this.idPlayer, item[0].item, amount);
    Elkaisar.Lib.LPlayer.givePlayerGold(this.idPlayer, gold);
    if (amount == item[0].amount)
      await Elkaisar.DB.ADelete("buy_item", "id_item = ?", [idItem]);
    else
      await Elkaisar.DB.AUpdate("amount = amount - ?", "buy_item", "id_item = ?", [amount, idItem]);
  }

  async sellItem() {

    const item = Elkaisar.Base.validateGameNames(this.Parm.item);
    const price = Elkaisar.Base.validateFloat(this.Parm.price);
    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);

    if (!(await Elkaisar.Lib.LItem.useItem(this.idPlayer, "sell_voucher", amount)))
      return { state: "error_2" }
    if (!(await Elkaisar.Lib.LItem.useItem(this.idPlayer, item, amount)))
      return { state: "error_1" }
    const blackList = await Elkaisar.DB.ASelectFrom("*", "buy_item_black_list", "item = ?", [item]);
    const playerPorm = await Elkaisar.DB.ASelectFrom("porm", "player", "id_player = ?", [this.idPlayer]);
    if (playerPorm.length == 0)
      return { state: "error" }
    if (isNaN(Number(amount)) || amount <= 0)
      return { state: "error_0" }
    if (isNaN(Number(price)) || price <= 0)
      return { state: "error_0" }
    if (blackList.length > 0)
      return { state: "error_3" }

    const now = Math.floor(Date.now() / 1000);
    const idItem = await Elkaisar.DB.AInsert(
      "id_player = ?, amount = ?, price = ?, item = ?, time_stamp = ?", "buy_item",
      [this.idPlayer, amount, price, item, now]);
    return {
      state: "ok",
      idItem: idItem.insertId
    }
  }

  async cancellSellItem() {
    const idItem = Elkaisar.Base.validateId(this.Parm.idItem);
    const Item = await Elkaisar.DB.ASelectFrom("*", "buy_item",
      "id_item = ? AND id_player = ?", [idItem, this.idPlayer]);
    if (Item.length < 1)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    await Elkaisar.DB.ADelete("buy_item", "id_item = ? AND id_player = ?", [idItem, this.idPlayer]);
    Elkaisar.Lib.LItem.addItem(this.idPlayer, Item[0].item, Item[0].amount);
    return {
      state: "ok",
      item: Item[0].item,
      amount:  Item[0].amount
    }
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