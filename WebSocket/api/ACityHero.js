class ACityHero {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async addFromTheater() {
    const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    const Hero = await Elkaisar.DB.ASelectFrom("*", "hero_theater", "id_hero = ?", [idHero]);
    const HeroCount = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "hero", "id_city = ?", [Hero[0]["id_city"]]))[0]["c"];
    if (!Hero.length)
      return { "state": "error_0", "TryToHack": Elkaisar.Config.TryToHack(this) };
    if (HeroCount > Elkaisar.Config.CITY_HERO_MAX_COUNT)
      return { "state": "error_1", "MaxCount": Elkaisar.Config.CITY_HERO_MAX_COUNT };
    const idNewHero = await Elkaisar.Lib.LHero.addNew(
      this.idPlayer, Hero[0].id_city, Hero[0]["hero_lvl"], Hero[0]["hero_image"],
      Elkaisar.Config.CHero.HeroNames[Hero[0]["hero_name"]],
      Hero[0]["ultra_p"]);
    if (!idNewHero)
      return { "state": "error_2" };
    Elkaisar.DB.ADelete("hero_theater", "id_hero = ?", [idHero]);
    await Elkaisar.Lib.LSaveState.saveCityState(Hero[0].id_city);
    await Elkaisar.Lib.LSaveState.coinOutState(this.idPlayer, Hero[0]["id_city"]);
    return {
      state: "ok",
      Hero: (await Elkaisar.DB.ASelectFrom("*", "hero", "id_hero = ?", [idNewHero]))[0],
      TheaterHeros: await Elkaisar.DB.ASelectFrom("hero_name as name, hero_lvl AS lvl, hero_image AS avatar, hero_theater.*", "hero_theater", "id_city = ?", [Hero[0]["id_city"]]),
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
    }
  }

  async getHeroTheater() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    await this.refreshHeroTheater();
    return await Elkaisar.DB.ASelectFrom("hero_name as name, hero_lvl AS lvl, hero_image AS avatar, hero_theater.*", "hero_theater", "id_city = ? ORDER BY ord", [idCity]);
  }

  async getCityFullHero() {
    return {
      "Hero": await this.getCityHero(),
      "HeroArmy": await this.getCityHeroArmy(),
      "HeroMedal": await this.getCityHeroMedal(),
      "HeroEquip": await this.getCityHeroEquip(),
    };
  }

  async getCityHero() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "hero", "id_city = ? AND id_player = ? ORDER BY ord", [idCity, this.idPlayer]);
  }

  async getCityHeroArmy() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("hero_army.*", "hero_army JOIN hero ON hero.id_hero = hero_army.id_hero", "hero.id_city = ? AND hero.id_player = ?", [idCity, this.idPlayer]);
  }

  async getCityHeroMedal() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("hero_medal.*", "hero_medal JOIN hero ON hero.id_hero = hero_medal.id_hero", "hero.id_city = ? AND hero.id_player = ?", [idCity, this.idPlayer]);
  }

  async getCityHeroEquip() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("equip.*, hero.id_city", "equip JOIN hero ON hero.id_hero = equip.id_hero", "hero.id_city = ? AND hero.id_player = ?", [idCity, this.idPlayer]);
  }

  async refreshHeroTheater() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);

    const cityTheater = await Elkaisar.DB.ASelectFrom("lvl , last_update", "city_theater", "id_city = ?", [idCity]);
    if (!cityTheater.length)
      return { "state": "error_0" };

    const Heros = await Elkaisar.DB.ASelectFrom("hero_name as name, hero_lvl AS lvl, hero_image AS avatar, hero_theater.*", "hero_theater", "id_city = ?", [idCity]);
    cityTheater[0]["lvl"] = Math.min(cityTheater[0]["lvl"], 30);
    const refreshTime = Math.max(120 - 4 * cityTheater[0]["lvl"], 6) * 60;
    if (Math.floor(Date.now() / 1000) < cityTheater[0]["last_update"] + refreshTime)
      return {
        "state": "ok",
        "HeroList": Heros,
        "lastUpdate": cityTheater[0]["last_update"],
        "lvl": cityTheater[0]["lvl"],
        "refreshTime": refreshTime
      };

    const MaxNumHeros = Math.min(cityTheater[0]["lvl"], 10);
    const NumberOfNewHeros = Math.min(Math.floor((Date.now() / 1000 - cityTheater[0]["last_update"] + 120) / refreshTime), MaxNumHeros);

    const NumToInsert = MaxNumHeros - Heros.length;
    const NumToUpdate = NumberOfNewHeros - NumToInsert;
    return await this.#heroTheaterRef(NumToUpdate, NumToInsert, cityTheater);

  }

  async refreshHeroTheaterWithLetter() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const cityTheater = await Elkaisar.DB.ASelectFrom("lvl , last_update", "city_theater", "id_city = ?", [idCity]);
    if (!cityTheater.length)
      return { "state": "error_0" };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "rec_letter", 1))
      return { "state": "error_1" };

    await Elkaisar.DB.ADelete("hero_theater", "id_city = ?", [idCity]);
    return await this.#heroTheaterRef(0, Math.min(cityTheater[0]["lvl"], 10), cityTheater);
  }

  async #heroTheaterRef(num_to_update, num_to_insert, cityTheater) {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const TeaterLvl = Math.min(cityTheater[0]["lvl"], 30);
    if (num_to_update > 0)
      await Elkaisar.DB.AUpdate(`hero_name = FLOOR(RAND()*25), hero_lvl =  FLOOR(1+RAND() * 5 *${TeaterLvl}) ,
      hero_image = FLOOR( RAND()*19), ultra_p = FLOOR( GREATEST( CEIL( 1 + RAND()*-90) , 0) * (3 + RAND()*4))`,
        "hero_theater", "id_city = ? ORDER BY time_stamp ASC LIMIT ?", [idCity, num_to_update]);


    for (let index = 0; index < num_to_insert; index++)
      await Elkaisar.DB.AInsert(`hero_name = FLOOR(RAND()*25) , hero_lvl = FLOOR(1+RAND() * 5 *${TeaterLvl}) , hero_image = FLOOR( RAND()*19),
      ultra_p = FLOOR( GREATEST( CEIL( 1 + RAND()*-90) , 0) * (3 + RAND()*4)) , id_city = ?`,
        "hero_theater", [idCity]);

    if (num_to_update + num_to_insert >= 1)
      await Elkaisar.DB.AUpdate("last_update = ?", "city_theater", "id_city = ?", [Math.floor(Date.now() / 1000), idCity]);

    const Heros = Elkaisar.DB.ASelectFrom("hero_name as name, hero_lvl AS lvl, hero_image AS avatar, hero_theater.*", "hero_theater", "id_city = ?", [idCity]);
    return {
      "state": "ok",
      "HeroList": Heros,
      "lastUpdate": Math.floor(Date.now() / 1000),
      "refreshTime": Math.max(120 - 4 * TeaterLvl, 6) * 60,
      "lvl": TeaterLvl
    }
  }

};

module.exports = ACityHero;