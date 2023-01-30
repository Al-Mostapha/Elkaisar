class ABlackMarket {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getItemList() {
    const offset = Elkaisar.Base.validateCount(this.Parm.offset);
    const ItemList = await Elkaisar.DB.ASelectFrom(
      "buy_item.* , player.name AS p_name",
      "buy_item JOIN player ON player.id_player = buy_item.id_player",
      " 1 LIMIT 10 OFFSET ?", [offset]
    );
    return ItemList;
  }

  // function getItemCount() {

  //     return ["Count" => selectFromTable("COUNT(*)  AS item_count", "buy_item", "1")[0]["item_count"]];
  // }
  async getItemCount() {
    return {
      Count: await Elkaisar.DB.ASelectFrom("COUNT(*)  AS item_count", "buy_item", "1")[0]["item_count"]
    }
  }

  // function getItemBlackList() {
  //     return ["BlackList" => selectFromTable("*", "buy_item_black_list", "1")];
  // }
  async getItemBlackList() {
    return {
      BlackList: await Elkaisar.DB.ASelectFrom("*", "buy_item_black_list", "1")
    }
  }

  async buyItem() {

    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);
    const idItem = Elkaisar.Base.validateId(this.Parm.idItem);
    const Item = await Elkaisar.DB.ASelectFrom("*", "buy_item", "id_item = ?", [idItem]);
    const BuyerGold = (await Elkaisar.DB.ASelectFrom("gold", "player", "id_player = ?", [this.idPlayer]))[0]["gold"];

    if (amount <= 0)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Item.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Item[0]["amount"] < amount)
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (BuyerGold < amount * Item[0]["price"])
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "buy_voucher", amount))
      return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("gold = gold - ?", "player", "id_player = ? AND porm >= 5 ", [amount * Item[0]["price"], this.idPlayer]);
    await Elkaisar.DB.AUpdate("gold = gold + ?", "player", "id_player = ?", [amount * Item[0]["price"], Item[0]['id_player']]);

    if (amount == Item[0]["amount"])
      await Elkaisar.DB.ADelete("buy_item", "id_item = ?", [idItem]);
    else
      await Elkaisar.DB.AUpdate("amount = amount - ?", "buy_item", "id_item = ?", [amount, idItem]);

    await Elkaisar.DB.AInsert(
      "id_buyer = ?, id_seller = ?, amount = ?, old_amount = ?, item = ?, gold = ?, unit_price = ?, total_price = ?",
      "buy_item_history", [this.idPlayer, Item[0]["id_player"], amount, Item[0]["amount"], Item[0]["item"], BuyerGold, Item[0]["price"], amount * Item[0]["price"]]);
    return {
      state: "ok"
    }
  }

}

module.exports = ABlackMarket;