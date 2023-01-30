class ACityBarrary {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getAllCitiesBarray() {
    return await Elkaisar.DB.ASelectFrom(
      "world.l AS Lvl, world.ut AS Type, city_bar.*",
      "city_bar JOIN world ON world.x = city_bar.x_coord AND world.y = city_bar.y_coord",
      "city_bar.id_player = ?", [this.idPlayer]);

  }

  async getCityBarray() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom(
      "world.l AS Lvl, world.ut AS Type, city_bar.*",
      "city_bar JOIN world ON world.x = city_bar.x_coord AND world.y = city_bar.y_coord",
      "city_bar.id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
  }
};

module.exports = ACityBarrary;