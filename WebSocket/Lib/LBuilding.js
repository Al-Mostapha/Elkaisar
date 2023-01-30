class LBuilding {

  static async isConditionsTrue(idCity, Building) {
    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "building_upgrade_req", "building_type = ? AND building_lvl = ?", [Building.Type, Building.Lvl]);
    if (!lvlReq.length)
      return false;
    const condetion = JSON.parse(lvlReq[0]["lvl_req"]);
    for (let one of condetion["condetion"]) {
      if (one["type"] == "building") {
        if ((await Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, one["BuildingType"]))["Lvl"] < one["lvl"])
          return false;
      }
      if (one["type"] == "population") {
        if ((await Elkaisar.DB.ASelectFrom("pop", "city", "id_city = ?", [idCity]))[0]["pop"] < one["amount"])
          return false;
      }
      if (one["type"] == "item") {
        if ((await Elkaisar.Lib.LItem.getAmount(this.idPlayer, one["item"])) < one["amount"])
          return false;
      }
    }
    return true;
  }

  static async fulfillCondition(idPlayer, idCity, Building) {
    //     if(!static::isConditionsTrue($idCity, $Building))
    //         return false;
    if (!(await LBuilding.isConditionsTrue(idCity, Building)))
      return false;


    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "building_upgrade_req", "building_type = ? AND building_lvl = ?", [Building.Type, Building.Lvl]);
    const condetion = JSON.parse(lvlReq[0]["lvl_req"]);
    const ReqRes = condetion;
    delete ReqRes["condetion"];
    delete ReqRes["time"];

    if (!(await Elkaisar.Lib.LCity.isResourceTaken(ReqRes, idPlayer, idCity)))
      return false;
    for (let one of condetion["condetion"]) {
      if (one["type"] == "item")
        if (!(await Elkaisar.Lib.LItem.useItem(idPlayer, one["item"], one["amount"])))
          return false;
    }
    return lvlReq[0];
  }



  static async buildingUpgraded(BuildingTask) {

    let GaindePres = 0;

    if (BuildingTask["state"] == "up") {
      GaindePres = await Elkaisar.Lib.LPrestige.buildGainPrestige({ Lvl: BuildingTask["lvl_to"] - 1, Type: BuildingTask["type"] });
      Elkaisar.Lib.LPrestige.addPres(BuildingTask["id_player"], GaindePres);
    }
    Elkaisar.DB.AUpdate("exp = exp + ?", "hero", "id_hero = (SELECT console FROM city WHERE id_city = ?)", [GaindePres * 2, BuildingTask["id_city"]]);

    if (BuildingTask["type"] == Elkaisar.Config.CITY_BUILDING_COTTAGE)
      Elkaisar.Lib.LCity.refreshPopCap(BuildingTask["id_city"]);
    else if (BuildingTask["type"] == Elkaisar.Config.CITY_BUILDING_STORE)
      Elkaisar.Lib.LSaveState.storeRatio(BuildingTask["id_city"]);
    else if (BuildingTask["type"] == Elkaisar.Config.CITY_BUILDING_THEATER)
      Elkaisar.DB.AUpdate("lvl = ?", "city_theater", "id_city = ?", [BuildingTask["lvl_to"], BuildingTask["id_city"]]);
    else if (BuildingTask["type"] == Elkaisar.Config.CITY_BUILDING_PALACE) {
      await Elkaisar.Lib.LSaveState.saveCityState(BuildingTask["id_city"]);
      Elkaisar.DB.AUpdate("coin_cap = ?", "city", "id_city = ?", [Elkaisar.Config.CCity.PalaceCoinCap[BuildingTask["lvl_to"] - 1], BuildingTask["id_city"]]);
    } else if (BuildingTask["type"] == Elkaisar.Config.CITY_BUILDING_WALL) {
      const wallCap = 10000 * (BuildingTask["lvl_to"]);
      Elkaisar.DB.AUpdate("wall_cap = ?", "city", "id_city = ?", [wallCap, BuildingTask["id_city"]]);
    }
    BuildingTask["prestige"] = GaindePres;
  }
};


module.exports = LBuilding;