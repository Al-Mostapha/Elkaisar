class AHero {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async changeHeroName() {
    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const newName = Elkaisar.Base.validatePlayerWord(this.Parm.newName);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero", "hero", "id_hero = ? AND id_player = ?", [this.idPlayer, idHero]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (newName.length >= 15)
      return { state: "error_1" };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("name = ?", "hero", "id_hero = ? AND id_player = ?", [newName, idHero, this.idPlayer]);
    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]))[0]
    }
  }

  async upgradeHeroLvl() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, lvl, exp, b_lvl, ultra_p, in_city, id_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    const reqExp = Elkaisar.Lib.LHero.reqExp(this.idPlayer, Hero[0].lvl);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0].lvl >= 255)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0].exp < reqExp)
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0].in_city != Elkaisar.Config.HERO_IN_CITY)
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    let Points = 3;
    if ((Hero[0].lvl + 1) % 10 == 0)
      Points += Hero[0].ultra_p;

    await Elkaisar.DB.AUpdate(
      "lvl = lvl + 1 , points = points + ? ,  exp = exp - ? , power_max = ?",
      "hero", "id_hero = ? AND id_player = ?  AND in_city = ?",
      [Points, reqExp, Math.min(150, Hero[0].lvl + 51), idHero, this.idPlayer, Elkaisar.Config.HERO_IN_CITY]);
    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.coinOutState(this.idPlayer, Hero[0].id_city);

    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]))[0],
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0].id_city]))[0]
    }

  }

  async fireHero() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    const heroEquip = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "equip", "id_hero = ?", [idHero]))[0]["c"];

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (heroEquip > 0)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.ADelete("hero_army", "id_hero  = ? AND id_player = ?", [idHero, this.idPlayer]);
    await Elkaisar.DB.ADelete("hero_medal", "id_hero = ?", [idHero]);
    await Elkaisar.DB.ADelete("world_unit_garrison", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    await Elkaisar.DB.ADelete("hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    await Elkaisar.Lib.LHero.reOrderHero(Hero[0]["id_city"]);

    return {
      state: "ok",
      CityHero: await Elkaisar.DB.ASelectFrom("*", "hero", "id_city = ? ORDER BY ord ASC", [Hero[0]["id_city"]])
    }
  }

  async addExp() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, exp, lvl", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0].lvl >= 255)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) }
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    const exp = await Elkaisar.Lib.LHero.reqExp(this.idPlayer, Hero[0].lvl);
    let amount = 0;

    if (itemToUse == "exp_hero_8")
      amount = exp * 8 / 100 > 1000 ? exp * 8 / 100 : 1000;
    else if (itemToUse == "exp_hero_30")
      amount = exp * 0.3 > 100000 ? exp * 0.3 : 100000;
    else if (itemToUse == "exp_hero_100")
      amount = exp > 1000000 ? exp : 1000000;
    else
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("exp = exp + ?", "hero", " id_player = ?  AND id_hero = ? ", [amount, this.idPlayer, idHero]);
    return {
      state: "ok",
      Exp: amount,
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [Hero[0]["id_hero"]]))[0]
    };

  }

  async addPower() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, power, lvl", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    const maxPower = Math.min(150, Hero[0]["lvl"] + 50);
    const currentPower = Hero[0]["power"];

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (currentPower >= maxPower)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    let amount = 0;
    if (itemToUse == "bread")
      amount = (maxPower * 10 / 100);
    else if (itemToUse == "fruit")
      amount = maxPower * 30 / 100;
    else if (itemToUse == "milk")
      amount = maxPower * 60 / 100;
    else if (itemToUse == "meat")
      amount = maxPower;
    else
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("power = ?", "hero", " id_player = ?  AND id_hero = ? ", [Math.min((currentPower + amount), maxPower), this.idPlayer, idHero]);

    return {
      state: "ok",
      power: amount,
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [Hero[0]["id_hero"]]))[0]
    };

  }

  async addLoy() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, loyal, lvl", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0]["loyal"] >= 100)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    if (itemToUse == "luxury_1") $amount = 5;
    else if (itemToUse == "luxury_2") $amount = 10;
    else if (itemToUse == "luxury_3") $amount = 15;
    else if (itemToUse == "luxury_4") $amount = 20;
    else if (itemToUse == "luxury_5") $amount = 25;
    else if (itemToUse == "luxury_6") $amount = 30;
    else if (itemToUse == "luxury_7") $amount = 35;
    else if (itemToUse == "luxury_8") $amount = 40;
    else if (itemToUse == "luxury_9") $amount = 45;
    else
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("loyal = ?", "hero", " id_player = ?  AND id_hero = ? ", [Math.min((Hero[0]["loyal"] + amount), 100), this.idPlayer, idHero]);
    return {
      state: "ok",
      loy: amount,
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [Hero[0]["id_hero"]]))[0]
    };
  }

  async resetHeroPoints() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, lvl, b_lvl, ultra_p, id_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "retreat_point", Math.floor((Hero[0]["lvl"] / 10) + 1)))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };

    const points = Hero[0]["lvl"] * 3 + Math.floor((Hero[0]["lvl"] - Hero[0]["b_lvl"]) / 10) * Hero[0]["ultra_p"];
    await Elkaisar.DB.AUpdate("points = ?, point_a = p_b_a , point_b = p_b_b  , point_c = p_b_c", "hero", "id_player = ? AND id_hero = ?", [points, this.idPlayer, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0]["id_city"]);

    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    }

  }


  async setHeroPoints() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const pointA = Elkaisar.Base.validateAmount(this.Parm.pointA);
    const pointB = Elkaisar.Base.validateAmount(this.Parm.pointB);
    const pointC = Elkaisar.Base.validateAmount(this.Parm.pointC);
    const Hero = await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
    const HeroMaxPoint = (Hero[0]["lvl"] * 3 + Math.floor(Hero[0]["lvl"] / 10) * Hero[0]["ultra_p"] + 60);

    if (Hero[0]["point_a"] + Hero[0]["point_b"] + Hero[0]["point_c"] + pointA + pointB + pointC > HeroMaxPoint)
      return { state: "error_5", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (pointA < 0 || pointB < 0 || pointC < 0)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Hero[0]["points"] < pointA + pointB + pointC)
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_3" };
    if (Hero[0].point_a + pointA > Hero[0].point_b + pointB + Hero[0]["point_c"] + pointC)
      return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) }
    if (Hero[0].point_b + pointB > Hero[0].point_a + pointA + Hero[0].point_c + pointC)
      return { state: "error_5", TryToHack: Elkaisar.Base.TryToHack(this) }
    if (Hero[0].point_c + pointC > Hero[0].point_b + pointB + Hero[0].point_a + pointA)
      return { state: "error_6", TryToHack: Elkaisar.Base.TryToHack(this) }

    await AUpdate(
      "point_a = point_a + ?, point_b = point_b + ?, point_c = point_c + ?, points = points - ?", "hero", "id_hero = ?",
      [pointA, pointB, pointC, pointA + pointB + pointC, idHero]);

    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0].id_city);

    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0].id_city]))[0]
    }
  }

  async addConsole() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("id_hero, lvl, b_lvl, ultra_p, id_city, in_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattle(idHero))
      return { state: "error_1" };

    await Elkaisar.DB.AUpdate("console = 0", "hero", "id_city = ?", [Hero[0].id_city]);
    await Elkaisar.DB.AUpdate("console = 1", "hero", "id_hero = ?", [idHero]);
    await Elkaisar.DB.AUpdate("console = ?", "city", "id_city = ?", [idHero, Hero[0].id_city]);
    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0].id_city);

    return {
      state: "ok",
      HeroList: await Elkaisar.DB.ASelectFrom("*", "hero", "id_city = ?", [Hero[0].id_city]),
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0].id_city]))[0]
    }
  }

  async removeConsole() {

    const idCity = ELkaisar.Base.validateId(this.Parm.idCity);
    await Elkaisar.DB.AUpdate("console = 0", "hero", "id_city = ?", [idCity]);
    await Elkaisar.DB.AUpdate("console = NULL", "city", "id_city = ?", [idCity]);

    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0].id_city);

    return {
      state: "ok",
      HeroList: await Elkaisar.DB.ASelectFrom("*", "hero", "id_city = ?", [idCity]),
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    };

  }

  async educate() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const pointFor = Elkaisar.Base.validateGameNames(this.Parm.pointFor);
    const medalToUse = Elkaisar.Base.validateGameNames(this.Parm.medalToUse);
    const Hero = await Elkaisar.DB.ASelectFrom("id_city, in_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!["point_a_plus", "point_b_plus", "point_c_plus"].includes(pointFor))
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!Hero.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    let maxPoint = 0;
    if (medalToUse == "medal_bronz") {
      const rand = Elkaisar.Base.rand(-100, 100);
      maxPoint = rand > 0 ? (rand > 50 ? 2 : 1) : -1;
    } else if (medalToUse == "medal_silver") {
      const rand = Elkaisar.Base.rand(-50, 100);
      maxPoint = rand > 0 ? (rand > 50 ? 2 : 1) : -1;
    } else if (medalToUse == "medal_gold") {
      const rand = Elkaisar.Base.rand(-30, 100);
      maxPoint = rand > 0 ? (rand > 50 ? (rand > 75 ? 3 : 2) : 1) : 0;
    } else {
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    }

    if (!await Elkaisar.Lib.LItem.useItem(medalToUse, 10))
      return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("`" + pointFor + "` = GREATEST(0 , LEAST(`" + pointFor + "` + ? , 10) )", "hero",
      "id_player = ? AND  id_hero = ? AND in_city = 1", [maxPoint, this.idPlayer, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0].id_city, "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0].id_city);

    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [idHero]))[0],
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0].id_city]))[0],
      PointAdded: maxPoint
    }

  }

  async searchHero() {

    const HeroName = Elkaisar.Base.validatePlayerWord(this.Parm.HeroName);
    return await Elkaisar.DB.ASelectFrom(
      "name AS HeroName, id_hero AS idHero, avatar", "hero", "name LIKE ?", ["%" + HeroName + "%"]);
  }


  async reOrderHero() {

    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const MoveDir = Elkaisar.Base.validateId(this.Parm.MoveDir);
    const Hero = await Elkaisar.DB.ASelectFrom("ord, id_city, id_hero", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };

    const HeroBefore = await Elkaisar.DB.ASelectFrom("ord, id_hero", "hero", "id_city = ? AND ord < ? ORDER BY ord DESC LIMIT 1", [Hero[0].id_city, Hero[0].ord]);
    const HeroAfter = await Elkaisar.DB.ASelectFrom("ord, id_hero", "hero", "id_city = ? AND ord > ? ORDER BY ord ASC  LIMIT 1", [Hero[0].id_city, Hero[0].ord]);
    if (MoveDir == "up") {
      if (!HeroBefore.length)
        return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
      await Elkaisar.DB.AUpdate("ord = ?", "hero", "id_hero = ?", [HeroBefore[0].ord, Hero[0].id_hero]);
      await Elkaisar.DB.AUpdate("ord = ?", "hero", "id_hero = ?", [Hero[0].ord, HeroBefore[0].id_hero]);

    } else {
      if (!HeroAfter.length)
        return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
      await Elkaisar.DB.AUpdate("ord = ?", "hero", "id_hero = ?", [HeroAfter[0].ord, Hero[0].id_hero]);
      await Elkaisar.DB.AUpdate("ord = ?", "hero", "id_hero = ?", [Hero[0].ord, HeroAfter[0].id_hero]);
    }

    return {
      state: "ok",
      HeroList: await Elkaisar.DB.ASelectFrom("ord, id_hero", "hero", "id_city = ? ORDER BY ord", [Hero[0].id_city])
    };
  }

}

module.exports = AHero;