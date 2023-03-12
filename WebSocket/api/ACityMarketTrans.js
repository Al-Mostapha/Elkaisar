class ACityMarketTrans {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getCityTransportResource() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return Elkaisar.Lib.LCityMarket.getTransList(idCity);
  }

  async getCityTransportBackResource() {
    const idCity = Elkaisar.Base.validateId($_GET["idCity"]);
    return Elkaisar.Lib.LCityMarket.getTransBackList(idCity);
  }


  async transportResource() {

    const food = Elkaisar.Base.validateAmount(this.Parm.food);
    const wood = Elkaisar.Base.validateAmount(this.Parm.wood);
    const stone = Elkaisar.Base.validateAmount(this.Parm.stone);
    const metal = Elkaisar.Base.validateAmount(this.Parm.metal);
    const coin = Elkaisar.Base.validateAmount(this.Parm.coin);
    const idCityTo = Elkaisar.Base.validateId(this.Parm.idCityTo);
    const idCityFrom = Elkaisar.Base.validateId(this.Parm.idCityFrom);

    const Market = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace("market", this.idPlayer, idCityFrom);
    const OutTransCount = (await Elkaisar.DB.ASelectFrom("COUNT(*) as count", "market_transport", "id_city_from = ?", [idCityFrom]))[0]['count'] +
      (await Elkaisar.DB.ASelectFrom("COUNT(*) as count", "market_transport_back", "id_city_to = ?", [idCityFrom]))[0]['count'];

    if (food < 0 || wood < 0 || stone < 0 || metal < 0 || coin < 0)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (OutTransCount >= Math.min(Market["Lvl"], Elkaisar.Config.MARKET_MAX_OUT))
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (food + wood + stone + metal + coin > Market["Lvl"] * 100000)
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LCity.isResourceTaken({ "food": food, "wood": wood, "stone": stone, "metal": metal, "coin": coin, }, idCityFrom))
      return { "state": "error_3" };

    const distance = await Elkaisar.Lib.LWorld.distanceBetweenCities(idCityFrom, idCityTo);
    const timeArrive = Math.floor(Date.now() / 1000) + Math.floor(distance / 300);
    let loseRatio = Math.max(20 - Market["Lvl"], 0);
    loseRatio += Math.max(Math.floor(distance / 1200000) - Market["Lvl"], 0);

    const quary = "id_city_from = ? , id_city_to = ? , time_arrive = ? , food = ? , wood = ? , stone = ? , metal = ? , coin = ? , lose_ratio = ?";
    await Elkaisar.DB.AInsert(quary, 'market_transport',
      [idCityFrom, idCityTo, timeArrive, food, wood, stone, metal, coin, loseRatio]);

    return {
      'state': "ok",
      "cityRes": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCityFrom]))[0],
      "transList": await Elkaisar.Lib.LCityMarket.getTransList(idCityFrom)
    }

  }

  async speedUpTransport() {

    const idTrans = Elkaisar.Base.validateId(this.Parm.idTrans);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Trans = await Elkaisar.DB.ASelectFrom(
      "market_transport.*",
      "market_transport JOIN city ON city.id_city = market_transport.id_city_to OR city.id_city = market_transport.id_city_from",
      "market_transport.id_trans = ? AND city.id_player = ?", [this.idPlayer, idTrans]);

    if (!Trans.length)
      return { "state": "error_0" };
    if (Trans[0].accet != 0)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "shopping_car", 1))
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    await Elkaisar.DB.AUpdate("time_arrive = time_arrive - (time_arrive - ?)/2 , acce  = 1", "market_transport", "id_trans = ?", [Math.floor(Date.now() / 1000), idTrans]);

    return {
      'state': "ok",
      "transList": await Elkaisar.Lib.LCityMarket.getTransList(idCity)
    };
  }
};

module.exports = ACityMarketTrans;