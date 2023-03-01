class ABattelRunning {

  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }


  async refreshBattelData() {

    const BattelRaw = Elkaisar.DB.ASelectFrom("*", "battel", "id_battel = ?", [this.Parm.idBattel]);
    if (!BattelRaw.legnth)
      return {};
    return BattelRaw;

  }

  async getBattels() {
    const Battels = await Elkaisar.DB.AQueryExc(
      `SELECT DISTINCT battel.*, city.name AS CityName, player.name AS PlayerName FROM battel
                                JOIN battel_member ON battel_member.id_battel = battel.id_battel
                                JOIN city ON city.x = battel.x_city AND city.y = battel.y_city
                                JOIN player ON player.id_player = battel.id_player 
                            WHERE battel_member.id_player = ? 
                            UNION
                            SELECT DISTINCT battel.*, AttCi.name AS CityName, player.name AS PlayerName FROM battel
                                JOIN city AS myC ON myC.x = battel.x_coord AND myC.y = battel.y_coord 
                                JOIN city AS AttCi ON AttCi.x = battel.x_city AND AttCi.y = battel.y_city
                                JOIN player ON player.id_player = battel.id_player 
                                WHERE AttCi.id_player = ?
                            UNION
                            SELECT DISTINCT battel.*, city.name AS CityName, player.name AS PlayerName FROM battel
                                JOIN world_unit_garrison ON world_unit_garrison.x_coord = battel.x_coord AND world_unit_garrison.y_coord  = battel.y_coord 
                                JOIN city ON city.x = battel.x_city AND city.y = battel.y_city
                                JOIN player ON player.id_player = battel.id_player 
                                WHERE world_unit_garrison.id_player = ?`,
      [this.idPlayer, this.idPlayer, this.idPlayer]
    );
    return Battels;
  }

  async getUnitBattel() {

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    return await Elkaisar.DB.ASelectFrom(
      "battel.*, city.name AS CityName, player.name AS PlayerName",
      `battel LEFT JOIN battel_member ON battel_member.id_battel = battel.id_battel
            LEFT JOIN city ON city.x = battel.x_city AND city.y = battel.y_city
            LEFT JOIN player ON player.id_player = battel.id_player `,
      "battel.x_coord = ? AND battel.y_coord = ? GROUP BY battel.id_battel", [xCoord, yCoord]);

  }

  async getLeavingHero() {

    return await Elkaisar.DB.ASelectFrom(
      "battel_member.id_hero, battel_member.id_battel , battel.task,  battel_member.side ,"
      + " battel.time_start , battel.time_end , battel.x_coord , battel.y_coord , battel.x_city , battel.y_city",
      "battel_member JOIN  battel ON battel.id_battel = battel_member.id_battel", "battel_member.id_player = ?", [this.idPlayer]);
  }

  async getHeroBack() {
    return await Elkaisar.DB.ASelectFrom(
      "id_hero AS idHero, x_from AS xFrom, x_to AS xTo, y_from AS yFrom, y_to AS yTo, time_back, task AS Task",
      "hero_back", "hero_back.id_player = ?", [this.idPlayer]);
  }

  async getGarrisonHeros() {
    return await Elkaisar.DB.ASelectFrom("*", "world_unit_garrison", "id_player = ?", [this.idPlayer]);
  }


  async getSpyRuning() {
    return await Elkaisar.DB.ASelectFrom("*", "spy", "id_player = ?", [this.idPlayer]);
  }

  async getBattelFieldData() {

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    const BattelList = await Elkaisar.DB.ASelectFrom(
      "battel.id_battel , battel.x_city , battel.y_city, player.name AS player_name, city.name AS city_name",
      "battel JOIN city on city.x = battel.x_coord AND city.y = battel.y_coord JOIN player ON player.id_player = city.id_player"
      , "battel.x_coord = ? AND battel.y_coord = ?", [xCoord, yCoord]);
    return BattelList;

  }

  async getBattelFieldDetail() {

    const idBattel = Elkaisar.Base.validateId(this.Parm.idBattel);
    const defenceNum = await Elkaisar.DB.ASelectFrom("COUNT(*) as r_c", "battel_member",
      "id_battel = ? AND side = ?", [idBattel, Elkaisar.Config.SIDE_DEFANCE]);
    const attackNum = await Elkaisar.DB.ASelectFrom("COUNT(*) as r_c", "battel_member",
      "id_battel = ? AND side = ?", [idBattel, Elkaisar.Config.SIDE_ATTACK]);
    return {
      defenceNum: defenceNum[0]["r_c"],
      attackNum: attackNum[0]["r_c"]
    }

  }


  async getBattelFixedData() {

    let idBattel = this.Parm.idBattel;
    if (idBattel) {
      idBattel = Elkaisar.Base.validateId(this.Parm.idBattel);
      const Battel = await Elkaisar.DB.ASelectFrom(
        "battel.id_battel , battel.time_end , battel.time_start , city.name",
        "city ON city.x = battel.x_city AND city.y = battel.y_city",
        "battel.id_battel = ?", [idBattel]
      );
      return Battel[0];
    }

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);

    const BattelByCoord =  await Elkaisar.DB.ASelectFrom(
      "battel.id_battel ,  battel.time_end , battel.time_start , city.name",
      "city ON city.x = battel.x_city AND city.y = battel.y_city",
      " battel.x_coord = ? AND battel.y_coord = ?", [xCoord, yCoord]
    );

    return BattelByCoord[0]
  }


}

module.exports = ABattelRunning;