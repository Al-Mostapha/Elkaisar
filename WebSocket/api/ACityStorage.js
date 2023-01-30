class ACityStorage {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }
  async getCityStorage() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return (await Elkaisar.DB.ASelectFrom("*", "city_storage", "id_city = ?", [idCity]))[0];

  }

  async updatePercentage() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const foodPerc = Elkaisar.Base.validateFloat(this.Parm.foodPerc);
    const woodPerc = Elkaisar.Base.validateFloat(this.Parm.woodPerc);
    const stonePerc = Elkaisar.Base.validateFloat(this.Parm.stonePerc);
    const metalPerc = Elkaisar.Base.validateFloat(this.Parm.metalPerc);

    if (foodPerc + woodPerc + stonePerc + metalPerc > 100)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!foodPerc || !woodPerc || !stonePerc || !metalPerc)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (foodPerc < 0 || woodPerc < 0 || stonePerc < 0 || metalPerc < 0)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    await Elkaisar.DB.AUpdate(
      "food_storage_ratio = ? , wood_storage_ratio = ? , metal_storage_ratio = ? , stone_storage_ratio = ?",
      'city_storage', "id_city = ? AND id_player = ?",
      [foodPerc, woodPerc, stonePerc, metalPerc, idCity, this.idPlayer]);

    await Elkaisar.Lib.LSaveState.storeRatio(idCity);
    return {

      "state": "ok",
      "cityStorage": (await Elkaisar.DB.ASelectFrom("*", "city_storage", "id_city = ?", [idCity]))[0],
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
    }
  }
}

module.exports = ACityStorage;