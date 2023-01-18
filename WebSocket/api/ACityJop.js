module.exports = class ACityJop {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async getCityJop(){
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const CityJop =  (await Elkaisar.DB.ASelectFrom(
      "*", "city_jop", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0];
    return CityJop;
  }
};