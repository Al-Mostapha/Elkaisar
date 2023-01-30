class ADominant {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getCityColonizer() {
    return await Elkaisar.DB.ASelectFrom(
      "city_colonize.*, city.name AS CityName, player.name AS PlayerName, city.x, city.y",
      "city_colonize JOIN city ON city.id_city = city_colonize.id_city_colonized JOIN player ON player.id_player = city_colonize.id_colonized",
      "city_colonize.id_colonizer = ?", [this.idPlayer]);

  }

  async getCityColonized() {
    return await Elkaisar.DB.ASelectFrom(
      "city_colonize.*, city.name AS CityName, player.name AS PlayerName, city.x, city.y",
      "city_colonize JOIN city ON city.id_city = city_colonize.id_city_colonizer JOIN player ON player.id_player = city_colonize.id_colonizer",
      "city_colonize.id_colonized = ?", [this.idPlayer]);

  }

  async abondonColonizedCity() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Colonize = await Elkaisar.DB.ASelectFrom("*", "city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    if (!Colonize.length)
      return { state: "error_0" };

    await Elkaisar.DB.ADelete("city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(Colonize[0].id_city_colonizer);

    await Elkaisar.Lib.LSaveState.afterCityColonizer(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(Colonize[0].id_city_colonizer);

    return { state: "ok" };
  }


  async fireColonizer() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Colonize = await Elkaisar.DB.ASelectFrom("*", "city_colonize", "id_colonized = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);

    if (!Colonize.length)
      return { state: "error_0" };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "freedom_help", 1))
      return { state: "error_1" };

    await Elkaisar.DB.ADelete("city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(Colonize[0].id_city_colonizer);
    await Elkaisar.Lib.LSaveState.afterCityColonized(Colonize[0].id_city_colonizer);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(idCity);

    return {
      state: "ok"
    }
  }

}

module.exports = ADominant;