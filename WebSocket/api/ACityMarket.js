class ACityMarket {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getOffersList() {
    const Resource = Elkaisar.Base.validateGameNames(this.Parm.offerFor);
    return {
      sellOffers: await Elkaisar.DB.ASelectFrom("*", "market_deal", " deal = 'sell' AND resource = ? ORDER BY unit_price ASC  LIMIT 5", [Resource]),
      buyOffers: await Elkaisar.DB.ASelectFrom("*", "market_deal", " deal = 'buy' AND  resource = ? ORDER BY unit_price DESC  LIMIT 5", [Resource])
    };
  }

  async getCityOffers() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "market_deal", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
  }

  async getCityOffersTrans() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "market_buy_transmit", "id_city_to = ?", [idCity]);
  }

  async proposeSellOffer() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const ResType = Elkaisar.Base.validateGameNames(this.Parm.ResType);
    const unitPrice = Elkaisar.Base.validateFloat(this.Parm.unitPrice);
    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);
    const fees = unitPrice * amount * 0.75 / 100;

    if (amount <= 0)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (unitPrice <= 0)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!["food", "wood", "stone", "metal"].includes(ResType))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LCity.isResourceTaken({ [ResType]: amount, coin: fees }, this.idPlayer, idCity))
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AInsert(
      "deal = 'sell', unit_price = ?, amount = ?, done = 0, resource = ?, id_player = ?, id_city = ?",
      "market_deal", [unitPrice, amount, ResType, this.idPlayer, idCity]);
    await this.#buyAuctionOffer(ResType);

    return {
      state: "ok",
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0],
      cityOffers: await Elkaisar.DB.ASelectFrom("*", "market_deal", "id_city = ? AND id_player = ?", [idCity, this.idPlayer])
    };
  }


  async proposeBuyOffer() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const ResType = Elkaisar.Base.validateGameNames(this.Parm.ResType);
    const unitPrice = Elkaisar.Base.validateFloat(this.Parm.unitPrice);
    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);
    const fees = unitPrice * amount * 0.75 / 100;
    const cost = unitPrice * amount;
    if (amount <= 0)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (unitPrice <= 0)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack() };
    if (!["food", "wood", "stone", "metal"].includes(ResType))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LCity.isResourceTaken({ coin: fees + cost }, this.idPlayer, idCity))
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AInsert(
      "deal = 'buy', unit_price = ?, amount = ?, done = 0, resource = ?, id_player = ?, id_city = ?",
      "market_deal", [unitPrice, amount, ResType, this.idPlayer, idCity]);

    await this.#buyAuctionOffer(ResType);
    return {
      state: "ok",
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0],
      cityOffers: await Elkaisar.DB.ASelectFrom("*", "market_deal", "id_city = ? AND id_player = ?", [idCity, this.idPlayer])
    };
  }

  async #buyAuctionOffer(ResType) {

    const sellOffers = await Elkaisar.DB.ASelectFrom("*", "market_deal", "resource = ? AND deal = 'sell' ORDER BY unit_price ASC LIMIT 10", [ResType]);
    const now = Math.floor(Date.now() / 1000);
    const timeArrive = now + 30 * 60;

    for (let oneSellOffer of sellOffers) {
      const buyOffers = await Elkaisar.DB.ASelectFrom("*", "market_deal", "resource = ? AND deal = 'buy' AND unit_price >= ? ORDER BY unit_price DESC LIMIT 10", [ResType, oneSellOffer["unit_price"]]);
      if (!buyOffers.length)
        break;
      for (let oneBuyOffer of buyOffers) {
        const idCityBuyer = oneBuyOffer["id_city"];
        const idBuyer = oneBuyOffer["id_player"];
        const amountNeeded = oneBuyOffer["amount"] - oneBuyOffer["done"];
        const amountSellerHas = oneSellOffer["amount"] - oneSellOffer["done"];
        let amountToAdd = 0;

        if (amountSellerHas < amountNeeded)
          amountToAdd = amountSellerHas;
        else
          amountToAdd = amountNeeded;

        oneBuyOffer["done"] += amountToAdd;
        oneSellOffer["done"] += amountToAdd;
        if (oneBuyOffer.done >= oneBuyOffer.amount)
          await Elkaisar.DB.ADelete("market_deal", "id_deal = ?", [oneBuyOffer.id_deal]);
        else
          await Elkaisar.DB.AUpdate("done = ?", "market_deal", "id_deal = ?", [oneBuyOffer.done, oneBuyOffer.id_deal]);

        await Elkaisar.DB.AInsert(
          "id_to = ?, head = 'تقرير شراء الموارد', body = ?, time_stamp = ?",
          "msg_diff", [idBuyer, `تمت عملية شراء ${amountToAdd} وحدة من ${ResType} بسعر ${oneSellOffer["unit_price"]}`, now]);
        await Elkaisar.DB.AInsert(
          "id_to = ?, head = 'تقرير بيع الموارد', body = ?, time_stamp = ?",
          "msg_diff", [oneSellOffer["id_player"], `تمت عملية بيع ${amountToAdd} وحدة من ${ResType} بسعر ${oneSellOffer["unit_price"]}`, now]);


        await Elkaisar.DB.AInsert(
          "id_city_to = ?, amount = ?, id_player_to = ?, resource = ?, time_arrive = ?, unit_price = ?",
          "market_buy_transmit", [idCityBuyer, amountToAdd, idBuyer, ResType, timeArrive, oneSellOffer["unit_price"]]);

        await Elkaisar.DB.AUpdate(
          "coin = coin + ?", "city", "id_city = ? AND id_player = ?", [oneSellOffer["unit_price"] * amountToAdd, oneSellOffer["id_city"], oneSellOffer["id_player"]]);
        if (oneSellOffer["done"] >= oneSellOffer["amount"])
          break;

      }
      
      if (oneSellOffer.done >= oneSellOffer.amount)
        await Elkaisar.DB.ADelete("market_deal", "id_deal = ?", [oneSellOffer.id_deal]);
      else
        await Elkaisar.DB.AUpdate("done = ?", "market_deal", "id_deal = ?", [oneSellOffer.done, oneSellOffer.id_deal]);

    }
  }

  async cancelMyOffer() {

    const idOffer = Elkaisar.Base.validateId(this.Parm.idOffer);
    const Offer = await Elkaisar.DB.ASelectFrom("*", "market_deal", "id_deal = ? AND id_player = ?", [idOffer, this.idPlayer]);
    if (!Offer.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.ADelete("market_deal", "id_deal = ? AND id_player = ?", [idOffer, this.idPlayer]);
    const amount = Offer[0].amount - Offer[0].done;
    const GainRes = {};
    if (Offer[0].deal == "sell")
      GainRes[Offer[0].resource] = amount;
    if (Offer[0].deal == "buy")
      GainRes.coin = amount * Offer[0].unit_price;

    await Elkaisar.Lib.LSaveState.saveCityState(Offer[0].id_city);
    await Elkaisar.Lib.LCity.addResource(GainRes, this.idPlayer, Offer[0].id_city);

    return {
      state: "ok",
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Offer[0].id_city]))[0],
      cityOffers: await Elkaisar.DB.ASelectFrom("*", "market_deal", "id_city = ? AND id_player = ?", [Offer[0].id_city, this.idPlayer])
    }

  }


  async speedUpDealTrans() {
    const idTrans = Elkaisar.Base.validateId(this.Parm.idOffer);
    const Trans = await Elkaisar.DB.ASelectFrom("*", "market_buy_transmit", "id_deal = ? AND id_player_to = ?", [idTrans, this.idPlayer]);
    if (!Trans.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "shopping_car", 1))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.Lib.LSaveState.saveCityState(Trans[0].id_city_to);
    await Elkaisar.DB.ADelete("market_buy_transmit", "id_deal = ? AND id_player_to = ?", [idTrans, this.idPlayer]);
    await Elkaisar.Lib.LCity.addResource({
      [Trans[0].resource]: Trans[0]["amount"]
    }, this.idPlayer, Trans[0]["id_city_to"]);
    return {
      state: "ok",
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Trans[0]["id_city_to"]]))[0],
      cityBuyTransMits: await Elkaisar.DB.ASelectFrom("*", "market_buy_transmit", "id_city_to = ?", [Trans[0]["id_city_to"]])
    }
  }
};

module.exports = ACityMarket;