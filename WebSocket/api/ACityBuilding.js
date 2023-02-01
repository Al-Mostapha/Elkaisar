class ACityBuilding {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getAllCityBuilding() {

    const idCities = await Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
    let playerCities = {};

    for (let oneId of idCities) {
      playerCities[oneId.id_city] = await this.getCityBuilding(oneId.id_city);
    }
    return playerCities;
  }

  async getCityBuilding(idCity = 0) {

    if (!idCity)
      idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const CB = (await Elkaisar.DB.ASelectFrom("*", "city_building", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0];
    const CBL = (await Elkaisar.DB.ASelectFrom("*", "city_building_lvl", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0];

    delete CB.id_player;
    delete CB.id_city;
    delete CBL.id_player;
    delete CBL.id_city;

    return {
      "lvl": CBL,
      "type": CB
    }

  }

  async constructNewBuilding() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const buildingType = Elkaisar.Base.validateId(this.Parm.buildingType);
    const Building = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    if (Building["Type"] != 0)
      return { "state": "error_4", "TryToHack": TryToHack() };
    if (Elkaisar.Lib.LCityBuilding.buildingPlaceExist(idCity, buildingType)["Lvl"] > 0)
      return { "state": "error_6", "TryToHack": TryToHack() };
    if (buildingType == Elkaisar.Config.CITY_BUILDING_HOSPITAL && Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, buildingType)["Lvl"] > 0)
      return { "state": "error_6", "TryToHack": TryToHack() };
    await Elkaisar.DB.AUpdate("`" + buildingPlace + "` = " + buildingType, "city_building", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    const Res = await this.upgrade();
    if (Res["state"] != "ok")
      await Elkaisar.DB.AUpdate("`" + buildingPlace + "` = 0", "city_building", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    return Res;
  }



  async upgrade() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const templePlace = Elkaisar.Base.validateGameNames(this.Parm.templePlace);
    const Building = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    const Temple = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(templePlace, this.idPlayer, idCity);
    const TempleHelper = (await Elkaisar.DB.ASelectFrom("helper", "city", "id_city = ?", [idCity]))[0]["helper"];
    const countBuilder = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "city_worker", "id_city = ?", [idCity]))[0]["c"];
    const motiv = (await Elkaisar.DB.ASelectFrom("motiv", "player_stat", "id_player = ?", [this.idPlayer]))[0]["motiv"];
    const upgradeReq = await Elkaisar.Lib.LBuilding.fulfillCondition(this.idPlayer, idCity, Building);
    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "building_upgrade_req", "building_type = ? AND building_lvl = ?", [Building["Type"], Building["Lvl"]]);

    if (countBuilder >= 3)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (countBuilder > 0)
      if (motiv < Date.now() / 1000) return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (upgradeReq == false) return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (Building["Lvl"] >= 30) return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const timeRequired = JSON.parse(lvlReq[0]["lvl_req"])["time"];
    if (TempleHelper == Elkaisar.Config.CITY_HELPER_BUILD)
      timeRequired -= timeRequired * Temple["Lvl"] * Elkaisar.Config.CITY_HELPER_BUILD_RATE / 100;
    const TotalTime = Math.floor(Date.now() / 1000) + timeRequired;
    await Elkaisar.DB.AInsert(
      "id_city = ?, id_player = ?, place = ?, time_start = ?, lvl_to = ?, time_end = ?, type = ?, state = ?, time_end_org = ?",
      "city_worker", [idCity, this.idPlayer, buildingPlace, Math.floor(Date.now() / 1000), Building["Lvl"] + 1, TotalTime, Building["Type"], "up", TotalTime]);

    return {
      "state": "ok",
      "list": await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_city = ?", [idCity])
    }
  }


  async downgrade() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const templePlace = Elkaisar.Base.validateGameNames(this.Parm.templePlace);
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const countBuilder = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "city_worker", "id_city = ?", [idCity]))[0]["c"];
    const Building = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    const motiv = (await Elkaisar.DB.ASelectFrom("motiv", "player_stat", "id_player = ?", [this.idPlayer]))[0]["motiv"];
    const Temple = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(templePlace, this.idPlayer, idCity);
    const TempleHelper = (await Elkaisar.DB.ASelectFrom("helper", "city", "id_city = ?", [idCity]))[0]["helper"];
    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "building_upgrade_req", "building_type = ? AND building_lvl = ?", [Building["Type"], Math.min(Building["Lvl"] - 1, 29)]);

    if (!lvlReq.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (countBuilder >= 3)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (countBuilder > 0) {
      if (motiv < Date.now() / 1000)
        return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    }

    const LvlReq = JSON.parse(lvlReq[0]["lvl_req"]);
    let timeRequired = LvlReq["time"];
    if (TempleHelper == Elkaisar.Config.CITY_HELPER_BUILD)
      timeRequired -= timeRequired * Temple["Lvl"] * Elkaisar.Config.CITY_HELPER_BUILD_RATE / 100;

    const TotalTime = (Math.floor(Date.now() / 1000) + timeRequired / 2);
    await Elkaisar.DB.AInsert(
      "id_city = ? ,  id_player = ? , place = ? ,  time_start = ? , lvl_to = ? , time_end = ? ,  type = ? , state= 'down', time_end_org = ?",
      "city_worker",
      [
        idCity, this.idPlayer, buildingPlace,
        Math.floor(Date.now() / 1000), Building["Lvl"] - 1, TotalTime,
        Building["Type"], TotalTime
      ]);

    return {
      "state": "ok",
      "list": await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_city = ?", [idCity])
    }

  }


  async speedUp() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const idWorking = Elkaisar.Base.validateGameNames(this.Parm.idWorking);
    const itemUsed = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    const now = Math.floor(Date.now() / 1000);
    let equation = "";
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemUsed, 1))
      return { "state": "error_0" };
    if (itemUsed == "archit_a") equation = `time_end - ${15 * 60}`;
    else if (itemUsed == "archit_b") equation = `time_end - ${60 * 60}`;
    else if (itemUsed == "archit_c") equation = `time_end - ${3 * 60 * 60}`;
    else if (itemUsed == "archit_d") equation = `time_end - (time_end - ${now})*0.9`;
    else return { "state": "error_1" };

    await Elkaisar.DB.AUpdate("time_end = $equation", "city_worker",
      "id_city = ? AND id_player = ? AND id = ?", [idCity, this.idPlayer, idWorking]);
    return {
      "state": "ok",
      "list": await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_city = ?", [idCity])
    }
  }


  async cancelUpgradeing() {

    const idWorking = Elkaisar.Base.validateId(this.Parm.idWorking);
    const upgaradingBuild = await Elkaisar.DB.ASelectFrom("*", "city_worker", "id = ?", [idWorking]);
    const lvlReq = JSON.parse((await Elkaisar.DB.ASelectFrom("*", "building_upgrade_req", "building_type = ? AND building_lvl = ?", [upgaradingBuild[0]["type"], upgaradingBuild[0]["lvl_to"] - 1]))[0]["lvl_req"]);
    delete lvlReq["condetion"];
    delete lvlReq["time"];
    if (!upgaradingBuild.length)
      return { "state": "error_0" };
    await Elkaisar.Lib.LSaveState.saveCityState(upgaradingBuild[0]["id_city"]);
    if (await Elkaisar.DB.ADelete("city_worker", "id = ? AND id_player = ?", [idWorking, this.idPlayer]))
      await Elkaisar.Lib.LCity.addResource(lvlReq, this.idPlayer, upgaradingBuild[0]["id_city"]);
    return {
      "state": "ok",
      "list": await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_city = ?", [upgaradingBuild[0]["id_city"]]),
      "cityRes": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [upgaradingBuild[0]["id_city"]]))[0]
    }

  }

  async explodeBuilding() {

    const BuildingPlace = Elkaisar.Base.validateGameNames(this.Parm.BuildingPlace);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Building = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(BuildingPlace, this.idPlayer, idCity);
    const CurrentUpgrade = await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_player = ? AND id_city = ? AND place = ?", [this.idPlayer, idCity, BuildingPlace]);

    if (!await Elkaisar.Lib.LCityBuilding.buildingPlaceExist(idPlayer, idCity, BuildingPlace))
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (CurrentUpgrade.length > 0)
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };

    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "powder_keg", 1))
      return { "state": "error_0" };
    if (Building["Type"] >= Elkaisar.Config.CITY_BUILDING_PALACE)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate(`${BuildingPlace} = 0`, "city_building", "id_city = ?", [idCity]);
    await Elkaisar.DB.AUpdate(`${BuildingPlace} = 0`, "city_building_lvl", "id_city = ?", [idCity]);
    await Elkaisar.DB.ADelete("build_army", "id_city = ? AND place = ?", [idCity, BuildingPlace]);

    const BuildingTask = {
      "state": "down",
      "id_city": idCity,
      "lvl_to": 0,
      "type": Building["Type"]
    };

    Elkaisar.Lib.LBuilding.buildingUpgraded(BuildingTask);
    return { "state": "ok" };
  }
}

module.exports = ACityBuilding;