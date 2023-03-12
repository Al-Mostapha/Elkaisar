class AWorld {

  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }


  getWorldCity() {
    return Elkaisar.AllWorldCity
  }

  async getWorldUnitPrize() {
    return Elkaisar.World.AllWorldUnitPrize;
  }

  async getBarrayConolizer() {

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);

    const Barr = await Elkaisar.DB.ASelectFrom(
      "p.name as PlayerName, p.id_player AS idPlayer ,p.guild AS GuildName ,  p.id_guild , c.name as CityName , c.x , c.y",
      "player p, city_bar b, city c",
      "c.id_player = p.id_player  AND b.x_coord = ? AND b.y_coord = ? AND b.id_city = c.id_city ", [xCoord, yCoord]);
    if (!Barr.length)
      return [];
    if (!Barr[0].id_guild)
      return Barr;

    const Guild = await Elkaisar.DB.ASelectFrom(
      "name AS GuildName, slog_top, slog_btm, slog_cnt",
      "guild", "id_guild = ? ", [Barr[0].id_guild]);
    if (!Guild.length)
      return Barr;
    Barr[0].GuildName = Guild[0].GuildName;
    Barr[0].slog_top = Guild[0].slog_top;
    Barr[0].slog_btm = Guild[0].slog_btm;
    Barr[0].slog_cnt = Guild[0].slog_cnt;
    return Barr;
  }


  async BuildNewCity() {

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const CityName = Elkaisar.Base.validatePlayerWord(this.Parm.CityName);
    const Player = await Elkaisar.DB.ASelectFrom("porm", "player", "id_player = ?", [this.idPlayer]);
    const cityCount = await Elkaisar.DB.ASelectFrom("COUNT(*) AS c_count", "city", "id_player = ?", [this.idPlayer]);
    const unit = Elkaisar.World.getUnit(xCoord, yCoord);

    if (!Player.length || !cityCount.length || unit)
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (unit.ut != Elkaisar.Config.WUT_EMPTY)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (CityName.length > 8)
      return { "state": "error_2" };
    if (cityCount[0].c_count > 4)
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (Player[0].porm < cityCount[0].c_count * 2)
      return { "state": "error_4", "TryToHack": Elkaisar.Base.TryToHack(this) };

    const Res = {
      "food": Math.pow(10, cityCount[0].c_count + 2),
      "wood": Math.pow(10, cityCount[0].c_count + 2),
      "stone": Math.pow(10, cityCount[0].c_count + 2),
      "metal": Math.pow(10, cityCount[0].c_count + 2),
      "coin": Math.pow(10, cityCount[0].c_count + 2)
    }

    if (! await Elkaisar.Lib.LCity.isResourceTaken(Res, this.idPlayer, idCity))
      return { "state": "error_5", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.Lib.LCity.addCity(this.idPlayer, xCoord, yCoord, CityName);

    Elkaisar.WsLib.World.refreshWorldCities(null, {
      "x": xCoord, "y": yCoord
    });

    return {
      "state": "ok",
      "City": (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async refreshWorldUnitLvl() {
    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    return Elkaisar.World.getUnit(xCoord, yCoord);
  }


  async getWorldUnitRank() {
    // $xCoord = validateID($_GET["xCoord"]);
    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    // $yCoord = validateID($_GET["yCoord"]);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    // $UnitType = validateId($_GET["unitType"]);
    const UnitType = Elkaisar.World.getUnit(xCoord, yCoord).ut;

    let names = "";
    let joiner = "";
    
    if (Elkaisar.Lib.LWorldUnit.isArenaGuild(UnitType)
      || Elkaisar.Lib.LWorldUnit.isQueenCity(UnitType)
      || Elkaisar.World.isRepelCastle(UnitType)) {
      names = "guild.name AS GuildName,guild.slog_top, guild.slog_btm, guild.slog_cnt";
      joiner = "JOIN guild ON guild.id_guild = world_unit_rank.id_dominant";

    } else {
      names = "player.name  PlayerName, player.guild AS GuildName";
      joiner = "JOIN player ON player.id_player = world_unit_rank.id_dominant";
    }

    return await Elkaisar.DB.ASelectFrom(
      `world_unit_rank.id_dominant ,
        SUM(world_unit_rank.duration) AS totalDuration, SUM(world_unit_rank.win_num) AS roundNum, ${names}`,
      `world_unit_rank ${joiner}`,
      ` world_unit_rank.x = ? AND world_unit_rank.y = ? GROUP BY world_unit_rank.id_dominant ORDER BY totalDuration DESC LIMIT 5`,
      [xCoord, yCoord]);
  }

  async getCityData() {
    
    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);

    const City = await Elkaisar.DB.ASelectFrom(
      "city.name AS CityName, player.name AS PlayerName, player.id_guild, player.id_player, player.avatar, city.id_city, player.prestige",
      "city JOIN player ON player.id_player = city.id_player", "city.x = ? AND city.y = ?", [xCoord, yCoord]);
    if (!City.length)
      return [];
    if (!City[0]["id_guild"])
      return City[0];

    const Guild = await Elkaisar.DB.ASelectFrom(
      "id_guild, name, slog_top, slog_btm, slog_cnt", "guild", "id_guild = ?", [City[0]["id_guild"]]);

    if (Guild.length) {
      City[0]["GuildName"] = Guild[0]["name"];
      City[0]["slog_top"] = Guild[0]["slog_top"];
      City[0]["slog_btm"] = Guild[0]["slog_btm"];
      City[0]["slog_cnt"] = Guild[0]["slog_cnt"];
    }else {
      City[0]["GuildName"] = "----";
    }

    return City[0];
  }

  async getUnitEquip() {

    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    const lvl = Elkaisar.Base.validateCount(this.Parm.lvl);
    return Elkaisar.Lib.LWorld.unitEquip({
      "x": xCoord, "y": yCoord, "l": lvl
    });
  }

  async getFavUnit() {

    // global $idPlayer;
    // return
    // selectFromTable("*", "world_unit_fav", "id_player = :idp", ["idp" => $idPlayer]);

  }

  async addUnitToFav() {
    // global $idPlayer;
    // $xCoord = validateID($_POST["xCoord"]);
    // $yCoord = validateID($_POST["yCoord"]);
    // insertIntoTable("id_player = :idp, x =:x, y = :y", "world_unit_fav", ["idp" => $idPlayer, "x" => $xCoord, "y" => $yCoord]);
  }

  async getGuildAttackQue() {
    // $xCoord = validateID($_GET["xCoord"]);
    
    // $yCoord = validateID($_GET["yCoord"]);

    // return LWorld:: getWorldAttackQueueForGuild(["x" => $xCoord, "y" => $yCoord]);
  }

}

module.exports = AWorld;