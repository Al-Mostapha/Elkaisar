class ACityPalace {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getCityGarrison() {
    let xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    let yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    return await Elkaisar.Lib.LCity.getCityGarrison(xCoord, yCoord);
  }

  async updateTaxs() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const newTaxRate = Elkaisar.Base.validateId(this.Parm.newTaxRate);
    if (newTaxRate < 0 || newTaxRate > 100)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };

    let City = (await Elkaisar.DB.ASelectFrom("pop, pop_cap, taxs, helper, id_city", "city", "id_city = ?", [idCity]))[0];
    City.taxs = newTaxRate;
    await Elkaisar.DB.AUpdate(
      "taxs = ?, loy_max = 100 - ?, pop_max = ?", "city", "id_city = ? AND id_player = ?",
      [newTaxRate, newTaxRate, await Elkaisar.Lib.LCity.maxPop(City), idCity, this.idPlayer]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, idCity);
    return {
      "state": "ok",
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
    }
  }

  async updateProductionRate() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const foodRate = Elkaisar.Base.validateFLoat(this.Parm.foodRate);
    const woodRate = Elkaisar.Base.validateFLoat(this.Parm.woodRate);
    const stoneRate = Elkaisar.Base.validateFLoat(this.Parm.stoneRate);
    const metalRate = Elkaisar.Base.validateFLoat(this.Parm.metalRate);

    if (!foodRate || foodRate > 100 || foodRate < 0)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!woodRate || woodRate > 100 || woodRate < 0)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!stoneRate || stoneRate > 100 || stoneRate < 0)
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!metalRate || metalRate > 100 || metalRate < 0)
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    Elkaisar.Lib.LSaveState.saveCityState(idCity);
    const quary = "food_rate = ?, wood_rate = ?, stone_rate = ?, metal_rate = ?";
    const upParm = [foodRate, woodRate, stoneRate, metalRate, idCity, this.idPlayer];

    await Elkaisar.DB.AUpdate(quary, "city_jop", "id_city = ? AND id_player = ?", upParm);

    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "metal");

    return {
      "state": "ok",
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0],
      "CityJop": (await Elkaisar.DB.ASelectFrom("*", "city_jop", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
    };
  }

  async updateName() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const newName = Elkaisar.Base.validatePlayerWord(this.Parm.NewName);

    if (newName.length > 10)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    Elkaisar.DB.AUpdate("name = ?", "city", "id_player = ? AND id_city = ?", [newName, this.idPlayer, idCity]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    return {
      "state": "ok",
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
    }

  }

  async expandCity() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const City = await Elkaisar.DB.ASelectFrom("lvl, x, y", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    if (!City.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (City[0]["lvl"] >= 3)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "expan_plan", Math.pow(2, City[0]["lvl"])))
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const Palace = await Elkaisar.Lib.LCityBuilding.getBuildingAtPlace("palace", idCity);
    if (Palace["Lvl"] < (City[0]["lvl"] + 1) * 4)
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("ut = ?, l = ?", "world", "x = ? AND y =  ?", [Elkaisar.Lib.LWorld.WUT_CITY_LVL_0 + City[0]["lvl"], City[0]["lvl"] + 1, City[0]["x"], City[0]["y"]]);
    await Elkaisar.DB.AUpdate("lvl = ?", "city", "id_city = ? AND id_player = ?", [City[0]["lvl"] + 1, this.idPlayer, idCity]);

    return {
      "state": "ok",
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
    }
  }


  async barryAbandon() {
    const xCoord = Elkaisar.Base.validateId(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateId(this.Parm.yCoord);
    const Barrary = await Elkaisar.DB.ASelectFrom("*", "city_bar", "x_coord = ? AND y_coord = ?", [xCoord, yCoord]);
    if (!Barrary.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (Barrary[0]["id_player"] != this.idPlayer)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.ADelete("city_bar", "x_coord = ? AND y_coord = ? AND id_player = ?", [xCoord, yCoord, this.idPlayer]);
    await Elkaisar.Lib.LSaveState.saveCityState(Barrary[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Barrary[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Barrary[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Barrary[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Barrary[0]["id_city"], "metal");

    return { "state": "ok" };

  }

  async removeHeroFromGarrison() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Hero = await Elkaisar.DB.ASelectFrom("*", "world_unit_garrison", "id_hero = ?", [idHero]);
    const CityCoords = await Elkaisar.DB.ASelectFrom("x, y", "city", "id_city = ?", [idCity]);

    if (!Hero.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!CityCoords.length)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (Hero[0]["id_player"] != this.idPlayer && CityCoords[0]["id_city"] != idCity)
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.ADelete("world_unit_garrison", "id_hero = ?", [idHero]);
    await Elkaisar.DB.AUpdate("in_city = ?", "hero", "id_hero = ? AND in_city != ?", [Elkaisar.Config.HERO_IN_CITY, idHero, Elkaisar.Config.HERO_IN_BATTEL]);

    return {
      "state": "ok",
      "Garrison": await Elkaisar.Lib.LCity.getCityGarrison(CityCoords[0]["x"], CityCoords[0]["y"]),
      "Hero": (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [idHero]))[0]
    }
  }

  async addCityGarrison() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom(
      "hero.in_city, city.x, city.y", "hero JOIN city ON city.id_city = hero.id_city",
      "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);
    const lastOrd = await Elkaisar.DB.ASelectFrom("ord", "world_unit_garrison", "x_coord = ? AND y_coord = ? ORDER BY ord DESC LIMIT 1", [Hero[0]["x"], Hero[0]["y"]]);

    let ord = 0;
    if (!Hero.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LBattel.HeroListInBattel[idHero] && Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };

    if (lastOrd.length)
      ord = lastOrd[0]["ord"] + 1;

    await Elkaisar.DB.ASelectFrom(
      "x_coord = ?, y_coord = ?, id_hero = ?, id_player = ?, ord = ?",
      "world_unit_garrison", [Hero[0]["x"], Hero[0]["y"], idHero, this.idPlayer, ord]);
    return {
      "state": "ok",
      "Garrison": await Elkaisar.Lib.LCity.getCityGarrison(Hero[0]["x"], Hero[0]["y"])
    }
  }

  async reordCityGarrison() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const ordDirection = Elkaisar.Base.validateGameNames(this.Parm.Direction);
    const Hero = await Elkaisar.DB.ASelectFrom("*", "world_unit_garrison", "id_hero = ?", [idHero]);
    const City = await Elkaisar.DB.ASelectFrom(
      "city.id_city, city.x, city.y",
      "world_unit_garrison JOIN city ON city.x = world_unit_garrison.x_coord AND city.y = world_unit_garrison.y_coord",
      "world_unit_garrison.id_hero = ?", [idHero]);

    if (!City.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };

    let theOtherHero = null;
    if (ordDirection == "up")
      theOtherHero = await Elkaisar.DB.ASelectFrom("*", "world_unit_garrison", "x_coord = ? AND y_coord = ? AND ord < ? ORDER BY ord DESC LIMIT 1", [Hero[0]["x_coord"], Hero[0]["y_coord"], Hero[0]["ord"]]);
    else
      theOtherHero = await Elkaisar.DB.ASelectFrom("*", "world_unit_garrison", "x_coord = ? AND y_coord = ? AND ord > ? ORDER BY ord ASC LIMIT 1", [Hero[0]["x_coord"], Hero[0]["y_coord"], Hero[0]["ord"]]);

    if (!theOtherHero.length)
      return {
        "state": "ok",
        "Garrison": await Elkaisar.Lib.LCity.getCityGarrison(Hero[0]["x_coord"], Hero[0]["y_coord"])
      };
    await Elkaisar.DB.AUpdate("ord = ?", "world_unit_garrison", "id_hero = ?", [Hero[0]["ord"], theOtherHero[0]["id_hero"]]);
    await Elkaisar.DB.AUpdate("ord = ?", "world_unit_garrison", "id_hero = ?", [theOtherHero[0]["ord"], Hero[0]["id_hero"]]);

    return {
      "state": "ok",
      "Garrison": await Elkaisar.Lib.LCity.getCityGarrison(Hero[0]["x_coord"], Hero[0]["y_coord"])
    };
  }

}

module.exports = ACityPalace;