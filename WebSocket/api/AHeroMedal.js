class AHeroMedal {

  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async activateCiceroMedal() {

    const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
    const Hero = await Elkaisar.DB.ASelectFrom(
      "hero_medal.*, hero.id_hero, hero.id_city, hero.in_city",
      "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero",
      "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Item.useItem(this.idPlayer, "medal_ceasro", 1))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_2" };

    const timeEnd = Math.max(Date.now() / 1000 + 24 * 7 * 60 * 60, Hero[0]["medal_ceasro"] + 60 * 60 * 24 * 7);

    await Elkaisar.DB.AUpdate("medal_ceasro = ?", "hero_medal", "id_hero = ?", [timeEnd, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(this.idPlayer, Hero[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0]["id_city"]);

    return {
      state: "ok",
      HeroMedal: (await Elkaisar.DB.ASelectFrom("*", "hero_medal", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    };

  }

  async activateDentatusMedal() {

    // global $idPlayer;
    // $idHero = validateID($_POST["idHero"]);
    const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
    // $Hero   = selectFromTable(
    //         "hero_medal.*, hero.id_hero, hero.id_city, hero.in_city",
    //         "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero", "hero.id_hero = :idh AND hero.id_player = :idp",
    //         ["idh" => $idHero, "idp" => $idPlayer]);
    const Hero = await Elkaisar.DB.ASelectFrom(
      "hero_medal.*, hero.id_hero, hero.id_city, hero.in_city",
      "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero",
      "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);
    // if(!count($Hero))
    //     return ["state" => "error_0", "TryToHack" => TryToHack()];
    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    // if(!LItem::useItem("medal_den"))
    //     return ["state" => "error_1", "TryToHack" => TryToHack()];
    if (!await Elkaisar.Item.useItem(this.idPlayer, "medal_den", 1))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    // if($Hero[0]["in_city"] != HERO_IN_CITY)
    //     return ["state" => "error_2"];
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_2" };

    const timeEnd = Math.max(Date.now() / 1000 + 24 * 7 * 60 * 60, Hero[0]["medal_den"] + 60 * 60 * 24 * 7);

    await Elkaisar.DB.AUpdate("medal_den = ?", "hero_medal", "id_hero = ?", [timeEnd, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(this.idPlayer, Hero[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0]["id_city"]);

    return {
      state: "ok",
      HeroMedal: (await Elkaisar.DB.ASelectFrom("*", "hero_medal", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    }
  }


  async activateLeonidasMedal() {

    const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
    const Hero = await Elkaisar.DB.ASelectFrom(
      "hero_medal.*, hero.id_hero, hero.id_city, hero.in_city",
      "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero",
      "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Item.useItem(this.idPlayer, "medal_leo", 1))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_2" };


    const timeEnd = Math.max(Date.now() / 1000 + 24 * 7 * 60 * 60, Hero[0]["medal_leo"] + 60 * 60 * 24 * 7);

    await Elkaisar.DB.AUpdate("medal_leo = ?", "hero_medal", "id_hero = ?", [timeEnd, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(this.idPlayer, Hero[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0]["id_city"]);

    return {
      state: "ok",
      HeroMedal: (await Elkaisar.DB.ASelectFrom("*", "hero_medal", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    };

  }


  async activateCaeserMedal() {

    const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
    const Hero = await Elkaisar.DB.ASelectFrom(
      "hero_medal.*, hero.id_hero, hero.id_city, hero.in_city",
      "hero JOIN hero_medal ON hero_medal.id_hero = hero.id_hero",
      "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);

    if (!Hero.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Item.useItem(this.idPlayer, "ceaser_eagle", 1))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Elkaisar.Lib.LHero.InBattel(idHero))
      return { state: "error_2" }

    const timeEnd = Math.max(Date.now() / 1000 + 24 * 7 * 60 * 60, Hero[0]["ceaser_eagle"] + 60 * 60 * 24 * 7);

    await Elkaisar.DB.AUpdate("ceaser_eagle = ?", "hero_medal", "id_hero = ?", [timeEnd, idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(this.idPlayer, Hero[0]["id_city"]);
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "food");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "wood");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "stone");
    await Elkaisar.Lib.LSaveState.resInState(this.idPlayer, Hero[0]["id_city"], "metal");
    await Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, Hero[0]["id_city"]);

    return {
      state: "ok",
      HeroMedal: (await Elkaisar.DB.ASelectFrom("*", "hero_medal", "id_hero = ?", [idHero]))[0],
      CityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    }

  }

}