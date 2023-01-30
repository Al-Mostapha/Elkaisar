class ACityWounded {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getCityWounded() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return (await Elkaisar.DB.ASelectFrom("*", "city_wounded", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0];
  }
}

module.exports = ACityWounded;