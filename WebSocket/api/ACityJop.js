class ACityJop {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getCityJop() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const CityJop = (await Elkaisar.DB.ASelectFrom(
      "*", "city_jop", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0];
    return CityJop;
  }


  async updateJopProductionRate() {
    //     global $idPlayer;
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const foodRate = Elkaisar.Base.validateFloat(this.Parm.foodRate);
    const woodRate = Elkaisar.Base.validateFloat(this.Parm.woodRate);
    const stoneRate = Elkaisar.Base.validateFloat(this.Parm.stoneRate);
    const metalRate = Elkaisar.Base.validateFloat(this.Parm.metalRate);

    if (!foodRate || foodRate > 100 || foodRate < 0) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!woodRate || woodRate > 100 || woodRate < 0) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!stoneRate || stoneRate > 100 || stoneRate < 0) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!metalRate || metalRate > 100 || metalRate < 0) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    const upParm = {
      "fr": foodRate, "wr": woodRate, "sr": stoneRate,
      "mr": metalRate, "idc": idCity, "idp": this.idPlayer
    };

    await Elkaisar.DB.AUpdate(
      "food_rate = ?, wood_rate = ?, stone_rate = ?, metal_rate = ?",
      "city_jop", "id_city = ? AND id_player = ?",
      [upParm.fr, upParm.wr, upParm.sr, upParm.mr, upParm.idc, upParm.idp]
    );

    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "metal");

    return {
      "state": "ok",
      "city": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0],
      "cityJop": (await Elkaisar.DB.ASelectFrom("*", "city_jop", "id_city = ?", [idCity]))[0]
    }
  }

  async hire() {
    //     global $idPlayer;
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const amountToHire = Elkaisar.Base.validateId(this.Parm.amountToHire);
    const JopPlace = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    let UnitReq = Object.assign({}, Elkaisar.Config.CJop.JopReq[JopPlace["Place"]]);

    if (amountToHire <= 0) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!UnitReq) return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!Elkaisar.Config.CJop.JOP_AVAIL_PLACE[JopPlace["Lvl"]] || Elkaisar.Config.CJop.JOP_AVAIL_PLACE[JopPlace["Lvl"]] < amountToHire)
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    UnitReq.food = UnitReq.food * amountToHire; UnitReq.wood = UnitReq.wood * amountToHire;
    UnitReq.stone = UnitReq.stone * amountToHire; UnitReq.metal = UnitReq.metal * amountToHire;
    const totalTime = amountToHire * (UnitReq.time - JopPlace["Lvl"]);

    delete UnitReq.condetion;
    delete UnitReq.time;
    delete UnitReq.produce;
    if (!await Elkaisar.Lib.LCity.isResourceTaken(UnitReq, this.idPlayer, idCity))
      return { "state": "error_2" };

    const now = Math.floor(Date.now() / 1000);
    await Elkaisar.DB.AInsert(
      "id_player = ?, id_city = ?, jop_place = ?, num = ?, time_end = ?, time_start = ?, time_end_org = ?",
      "city_jop_hiring",
      [this.idPlayer, idCity, JopPlace["Place"], amountToHire, now + totalTime, now, now + totalTime]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);

    return {
      "state": "ok",
      "JopTaskList": await Elkaisar.DB.ASelectFrom("*", "city_jop_hiring", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]),
      "cityRes": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async cancelHiring() {

    const idTask = Elkaisar.Base.validateId(this.Parm.idTask);
    const JopTask = await Elkaisar.DB.ASelectFrom("id_city, jop_place, num", "city_jop_hiring", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    if (!JopTask.length) return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };

    let UnitReq = Object.assign({}, Elkaisar.Config.CJop.JopReq[JopTask[0]["jop_place"]]);
    UnitReq.food *= JopTask[0]["num"] * Elkaisar.Config.JOP_CANCELING_GAIN_RATE;
    UnitReq.wood *= JopTask[0]["num"] * Elkaisar.Config.JOP_CANCELING_GAIN_RATE;
    UnitReq.stone *= JopTask[0]["num"] * Elkaisar.Config.JOP_CANCELING_GAIN_RATE;
    UnitReq.metal *= JopTask[0]["num"] * Elkaisar.Config.JOP_CANCELING_GAIN_RATE;

    delete UnitReq.condetion;
    delete UnitReq.time;
    delete UnitReq.produce;

    await Elkaisar.Lib.LSaveState.saveCityState(JopTask[0]["id_city"]);
    await Elkaisar.Lib.LCity.addResource(UnitReq, this.idPlayer, JopTask[0]["id_city"]);
    await Elkaisar.DB.ADelete("city_jop_hiring", "id = ? AND id_player = ?", [idTask, this.idPlayer]);

    return {
      "state": "ok",
      "JopTaskList": await Elkaisar.DB.ASelectFrom("*", "city_jop_hiring", "id_city = ? AND id_player = ?", [JopTask[0]["id_city"], this.idPlayer]),
      "cityRes": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [JopTask[0]["id_city"]]))[0]
    }
  }

  async speedUpHiring() {
    //     global $idPlayer;
    const idTask = Elkaisar.Base.validateId(this.Parm.idTask);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    const JopTask = await Elkaisar.DB.ASelectFrom("id_city, jop_place, num", "city_jop_hiring", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    const now = Math.floor(Date.now() / 1000);

    if (!JopTask.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    let equation = "";
    if (itemToUse == "polit_a") equation = "time_end - 15*60";
    else if (itemToUse == "polit_b") equation = "time_end - 60*60";
    else if (itemToUse == "polit_c") equation = "time_end - 3*60*60";
    else if (itemToUse == "polit_d") equation = `time_end - (time_end - ${now})*0.3`;
    else return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };

    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { "state": "error_1" };

    await Elkaisar.DB.AUpdate(`time_end = ${equation}`, "city_jop_hiring", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    return {
      "state": "ok",
      "JopTaskList": await Elkaisar.DB.ASelectFrom("*", "city_jop_hiring", "id_city = ? AND id_player = ?", [JopTask[0]["id_city"], this.idPlayer])
    }
  }

  async fireLabor() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const amountToFire = Elkaisar.Base.validateGameNames(this.Parm.amountToFire);
    const JopPlace = await Elkaisar.Libs.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    let UnitReq = Object.assign({}, Elkaisar.Config.CJop.JopReq[JopPlace["Place"]]);

    if (amountToFire <= 0)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!UnitReq)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const JopNum = await Elkaisar.DB.ASelectFrom(UnitReq["produce"], "city_jop", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
    if (!JopNum.length || !JopNum[0][UnitReq["produce"]] || JopNum[0][UnitReq["produce"]] < amountToFire)
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };

    UnitReq["food"] *= amountToFire; UnitReq["wood"] *= amountToFire
    UnitReq["stone"] *= amountToFire; UnitReq["metal"] *= amountToFire;

    await Elkaisar.DB.AUpdate(`${UnitReq["produce"]} = ${UnitReq["produce"]} - ${amountToFire}`, "city_jop", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);

    delete UnitReq["condetion"];
    delete UnitReq["time"];
    delete UnitReq["produce"];

    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LCity.addResource(UnitReq, this.idPlayer, idCity);

    return {
      "state": "ok",
      "cityJop": (await Elkaisar.DB.ASelectFrom("*", "city_jop", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0],
      "cityRes": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }
};

module.exports = ACityJop;