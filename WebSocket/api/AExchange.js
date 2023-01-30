module.exports = class AExchange {
  constructor(idPlayer, Param) {
    this.idPlayer = idPlayer;
    this.Param = Param;
  }

  async getExchangeItem() {
    return await Elkaisar.DB.ASelectFrom(
      "exchange.*, exchange_player.take_times",
      "exchange JOIN exchange_player ON exchange.id_ex = exchange_player.id_trade",
      "exchange_player.id_player = ?", [this.idPlayer]
    );
  }

  async buyExchange() {
    const idExchange = Elkaisar.Base.validateId(this.Param.idExchange);
    const idCity = Elkaisar.Base.validateId(this.Param.idCity);
    const amountToTrade = Elkaisar.Base.validateId(this.Param.amountToTrade);
    const Exchnage = await Elkaisar.DB.ASelectFrom(
      "exchange.*, exchange_player.take_times",
      "exchange JOIN exchange_player ON exchange.id_ex = exchange_player.id_trade",
      "exchange_player.id_player = ? AND exchange.id_ex = ?", [this.idPlayer, idExchange]
    );

    const Reword = JSON.parse(Exchnage[0].reword);
    const Req = JSON.parse(Exchnage[0].req);

    if (!Exchnage.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!Reword.length, !Req.length)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (await this.#canHaveMore(Exchnage[0], Reword, amountToTrade))
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (await this.#verifyReq(Exchnage[0], amountToTrade, idCity))
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const rewordAmount = Reword.amount || 1;

    if (Reword.type == "matrial")
      await Elkaisar.Lib.LItem.addItem(this.idPlayer, Reword.matrial, amountToTrade * rewordAmount);
    else if (Reword.type == "equip") {
      for (let iii = 0; iii < amountToTrade; iii++) {
        for (let ii = 0; ii < rewordAmount; ii++) {
          await Elkaisar.Lib.LEquip.addEquip(this.idPlayer, Reword.Equip, Reword.Part, Reword.lvl);
        }
      }
    }

    Elkaisar.DB.AUpdate("exchange", "server_take = server_take + ?", "id_ex = ?", [amountToTrade, idExchange]);
    await Elkaisar.DB.AUpdate("exchange_player", "take_times  = take_times  + ?", "id_trade = ? AND id_player = ?", [amountToTrade, idExchange, this.idPlayer]);

    return {
      "state": "ok",
      "Exchange": await Elkaisar.DB.ASelectFrom("*", "exchange_player", "id_player = ?", [this.idPlayer])
    }
  }

  async #canHaveMore(Exchnage, Reword, Amount) {
    
    let playerAmount = 0;
    if (Reword["type"] === "matrial")
      playerAmount = await Elkaisar.Lib.LItem.getAmount(this.idPlayer, Reword["matrial"]);
    else if (Reword["type"] === "equip")
      playerAmount = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "equip", "id_player = ? AND part = ? AND type = ?", [this.idPlayer, Reword['Part'], Reword["Equip"]]))[0]["c"];

    if(playerAmount + Amount > Exchnage["max_to_have"])
      return false;
    else if(Exchange["server_take"] + Amount > Exchange["server_max"] && Exchange["server_max"] !=  null)
      return false;
    else if(Exchange["take_times"] + Amount > Exchange["player_max"])
      return false;
    return true;
  }

}