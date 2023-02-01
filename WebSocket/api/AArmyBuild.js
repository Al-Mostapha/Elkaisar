class AArmyBuild {

  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async buildArmy() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const amount = Elkaisar.Base.validateAmount(this.Parm.amount);
    const armyType = Elkaisar.Base.validateGameNames(this.Parm.armyType);
    const buildingPlace = Elkaisar.Base.validateGameNames(this.Parm.buildingPlace);
    const worshipPlace = Elkaisar.Base.validateGameNames(this.Parm.templePlace);
    const divideBy = Elkaisar.Base.validateGameNames(this.Parm.divideBy);
    const resNeeded = Elkaisar.LArmy.neededResources(armyType);

    const Res = {
      food: resNeeded.food * amount, wood: resNeeded.wood * amount,
      stone: resNeeded.stone * amount, metal: resNeeded.metal * amount,
      pop: resNeeded.pop * amount, coin: resNeeded.coin * amount
    };

    if (this.idPlayer) return { "state": "error_0" };
    if (!idCity) return { "state": "error_1" };
    if (!(armyType == "army_a" || armyType == "army_b" || armyType == "army_c" ||
      armyType == "army_d" || armyType == "army_e" || armyType == "army_f" ||
      armyType == "wall_a" || armyType == "wall_b" || armyType == "wall_c" ||
      armyType == "spies"))
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!(divideBy == "none" || divideBy == "time" || divideBy == "amount"))
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!Number(amount) || amount <= 0)
      return { "state": "error_4", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LCity.isResourceTaken(Res, this.idPlayer, idCity))
      return { "state": "error_5", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const bBuilding = await this.#checkBuilding(resNeeded["condetion"][0], buildingPlace, idCity);
    const bStudy = this.#checkEdu(resNeeded["condetion"][1]);
    if (bBuilding !== true) return bBuilding;
    if (bStudy !== true) return bStudy;

    if (divideBy == "none")
      return this.#buildArmyDiviedByNone(armyType, amount, idCity, buildingPlace, worshipPlace);
    if (divideBy == "time")
      return this.#buildArmyDiviedByTime(armyType, amount, idCity, worshipPlace);
    if (divideBy == "amount")
      return this.#buildArmyDiviedByAmount(armyType, amount, idCity, worshipPlace);
    Elkaisar.Base.TryToHack();
  }

  async #addArmyBatch(armyType, amount, idCity, buildingTrain, templeEffect) {

    amount = Math.floor(amount);
    const timeStart = await Elkaisar.Lib.LArmy.getLastbatchArmyBuilding(idCity, buildingTrain["Place"]);
    let timePerUnit = Elkaisar.LArmy.neededResources(armyType)["time"];
    timePerUnit = timePerUnit - (timePerUnit * buildingTrain["Lvl"] * Elkaisar.Config.ARMY_TRAIN_BUILDING_T_FAC / 100);
    timePerUnit = timePerUnit - (timePerUnit * templeEffect);

    const timeEnd = timeStart + (amount * timePerUnit);
    const idBatch = await Elkaisar.DB.AInsert(
      "id_player = ?, id_city = ?, place = ?, army_type = ?, amount = ?, duration = ?, time_start = ?, time_end = ?", "build_army",
      [this.idPlayer, idCity, buildingTrain["Place"], armyType, amount, amount * timePerUnit, timeStart, timeEnd]);

    return {
      "id": idBatch,
      "time_end": timeEnd,
      "time_start": timeStart,
      "amount": amount,
      "place": buildingTrain["Place"],
      "duration": amount * timePerUnit,
      "army_type": armyType,
      "id_city": idCity
    };
  }

  async #buildArmyDiviedByNone(armyType, amount, idCity, buildingPlace, worshipPlace) {

    const buildingTrain = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);

    if (Elkaisar.Config.CArmy.BuildingTypeForArmy[armyType] != buildingTrain["Type"])
      return {
        "state": "error_6", "armyBatches": [],
        "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
      };

    const workingCount = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "build_army", "id_city = ? AND place = ? AND id_player = ?", [idCity, buildingTrain["Place"], this.idPlayer]))[0]["c"];
    if (workingCount >= Math.min(Elkaisar.Config.ARMY_MAX_NUM_BATCH, buildingTrain["Lvl"]))
      return {
        "state": "error_7", "armyBatches": [],
        "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
      };

    const templeEffect = await Elkaisar.Lib.LCityBuilding.getTempleEffectRateOnArmy(idCity, worshipPlace);
    return {
      "state": "ok",
      "armyBatches": [await this.#addArmyBatch(armyType, amount, idCity, buildingTrain, templeEffect)],
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async #buildArmyDiviedByTime(armyType, amount, idCity, worshipPlace) {

    const BuildingList = await Elkaisar.Lib.LCityBuilding.canBuildArmy(idPlayer, idCity, armyType);
    const templeEffect = await Elkaisar.Lib.LCityBuilding.getTempleEffectRateOnArmy(idCity, worshipPlace);
    let batches = [];
    const timePerUnit = Elkaisar.LArmy.neededResources(armyType)["time"];
    for (let oneBuilding of BuildingList)
      oneBuilding["TimePerUnit"] = (timePerUnit - timePerUnit * templeEffect - timePerUnit * oneBuilding["Lvl"] * Elkaisar.Config.ARMY_TRAIN_BUILDING_T_FAC / 100);
    const totalTime = BuildingList.reduce((a, b) => a + b["TimePerUnit"], 0);
    for (let oneBuilding of BuildingList)
      oneBuilding["TimePerBuilding"] = Math.max(totalTime - oneBuilding["TimePerUnit"], 1);
    const totalTimeBuilding = BuildingList.reduce((a, b) => a + b["TimePerBuilding"], 0);

    const amountUnit = amount / totalTimeBuilding;
    for (let oneBuilding of BuildingList) {
      const batch = await this.#addArmyBatch(armyType, Math.floor(amountUnit * oneBuilding["TimePerBuilding"]), idCity, oneBuilding, templeEffect);
      if (batch) batches.push(batch);
    }
    return {
      "state": "ok",
      "armyBatches": batches,
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async #buildArmyDiviedByAmount(armyType, amount, idCity, worshipPlace) {

    const BuildingList = await Elkaisar.Lib.LCityBuilding.canBuildArmy(idPlayer, idCity, armyType);
    const templeEffect = await Elkaisar.Lib.LCityBuilding.getTempleEffectRateOnArmy(idCity, worshipPlace);
    let batches = [];
    const amountFactor = amount / BuildingList.length;
    for (let oneBuilding of BuildingList) {
      const batch = await this.#addArmyBatch(armyType, amountFactor, idCity, oneBuilding, templeEffect);
      if (batch) batches.push(batch);
    }

    return {
      "state": "ok",
      "armyBatches": batches,
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }

  }

  async #checkEdu(Condetion) {

    if (Condetion["type"] == "study") return { "state": "error_6_0" };
    const playerEdu = await Elkaisar.DB.ASelectFrom(Condetion["study"], "player_edu", "id_player = ?", [this.idPlayer]);
    if (playerEdu.length == 0) return { "state": "error_6_1" };
    if (playerEdu[0][Condetion["study"]] < Condetion["lvl"])
      return { "state": "error_6_2" };
    return true;

  }

  async #checkBuilding(Condetion, buildingPlace, idCity) {

    if (Condetion["type"] != "building") return { "state": "error_7_0" };
    const Building = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace(buildingPlace, this.idPlayer, idCity);
    if (Building["Lvl"] < Condetion["lvl"])
      return { "state": "error_7_1" };
    if (Building["Type"] != Condetion["buildingType"])
      return { "state": "error_7_2" };
    return true;

  }

};


module.exports = AArmyBuild;