class APlayer {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getOtherPlayerData() {
    const idOtherPlayer = Elkaisar.Base.validateId(this.Parm.idOtherPlayer)
    return {
      state: "ok",
      Player: await Elkaisar.Lib.LPlayer.getOthersData(idOtherPlayer)
    }
  }

  async getServerData(){
    return (await Elkaisar.DB.ASelectFrom("*", "server_data", "id = 1"))[0];
  }

  async changePlayerName() {

    const newName = Elkaisar.Base.validatePlayerWord(this.Parm.NewName);
    const playerWithSameName = await Elkaisar.DB.ASelectFrom("id_player", "player", "name = ?", [newName]);

    if (newName.length < 3)
      return { state: "error_0" };
    if (newName.length > 10)
      return { state: "error_1" };
    if (playerWithSameName.length > 0)
      return { state: "error_2" };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "change_name", 1))
      return { state: "error_3" };

    await Elkaisar.DB.AUpdate("name = ?", "player", "id_player = ?", [newName, this.idPlayer]);

    return {
      state: "ok",
      Player: await Elkaisar.Lib.LPlayer.getData(this.idPlayer)
    }
  }

  async changePlayerAvatar(){
    const imageIndex = Elkaisar.Base.validateAmount(this.Parm.imageIndex);
    
    // updateTable("avatar = :ain", "player", "id_player = :idp", ["ain" => $image_index, "idp" => $id_player]);
    await Elkaisar.DB.AUpdate("avatar = ?", "player", "id_player = ?", [imageIndex, this.Parm.idPlayer]);
    // echo 'done';
    return {
      state: "ok",
      Player: await Elkaisar.Lib.LPlayer.getData(this.idPlayer)
    };
  }

  async getPlayerState() {
    return (await Elkaisar.DB.ASelectFrom("*", "player_stat", "id_player = ?", [this.idPlayer]))[0];
  }

  async getPlayerGuildData() {
    return {
      "GuildData": await Elkaisar.Lib.LGuild.getPlayerGuildData(this.idPlayer)
    };
  }

  async getPlayerGuildReqInv() {
    return await Elkaisar.Lib.LGuild.PlayerGuildInvReq(this.idPlayer);
  }

  async getPlayerHeros() {
    return await Elkaisar.DB.ASelectFrom("*", "hero", "id_player = ? ORDER BY id_city, ord", [this.idPlayer]);
  }

  

  async getAllNotif() {

    const Q = await Elkaisar.DB.AQueryExc(`SELECT
      (SELECT COUNT(*) FROM msg_income WHERE msg_income.id_to = ${this.idPlayer} AND seen = 0) AS msg_in,
      (SELECT COUNT(*) FROM msg_diff WHERE msg_diff.id_to = ${this.idPlayer} AND seen = 0) AS msg_diff,
      (SELECT COUNT(*) FROM report_player WHERE report_player.id_player = ${this.idPlayer} AND seen = 0) AS msg_report,
      (SELECT COUNT(*) FROM spy_report WHERE spy_report.id_player = ${this.idPlayer} AND seen = 0) AS spy_report,
      (SELECT COUNT(*) FROM battel WHERE id_player = ${this.idPlayer}) AS battel_number ,
      (SELECT COUNT(*) FROM battel_member WHERE id_player = ${this.idPlayer}) AS hero_in_battel, 
      (SELECT COUNT(*) FROM hero_back WHERE id_player = ${this.idPlayer}) AS hero_back ,
      (SELECT COUNT(*) FROM spy  WHERE id_player = ${this.idPlayer}) AS spy_task `, []);

    const notif = Q[0];
    const query = `battel JOIN world_unit_garrison ON battel.x_coord = world_unit_garrison.x_coord AND battel.y_coord = world_unit_garrison.y_coord`;

    notif.battel_number += (await Elkaisar.DB.ASelectFrom(`COUNT(DISTINCT battel.id_battel) AS count`, query, `world_unit_garrison.id_player = ${this.idPlayer}`))[0].count;
    notif.battel_number += (await Elkaisar.DB.ASelectFrom(`COUNT(DISTINCT battel.id_battel) AS count`,
      `battel JOIN city ON city.x = battel.x_coord AND city.y = battel.y_coord`,
      `city.id_player = ${this.idPlayer}`))[0].count;
    return notif;
  }

  async getNotif() {

    const server = await Elkaisar.DB.ASelectFrom("*", "server_data", "1");

    return {
      "incomeMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "msg_income", "id_to     = ? AND seen = 0", [this.idPlayer]))[0]["c"],
      "totalIncomMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "msg_income", "id_to     = ?", [this.idPlayer]))[0]["c"],
      "miscMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "msg_diff", "id_to     = ? AND seen = 0", [this.idPlayer]))[0]["c"],
      "totalMiscsMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "msg_diff", "id_to     = ?", [this.idPlayer]))[0]["c"],
      "reportMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "report_player", "id_player = ? AND seen = 0", [this.idPlayer]))[0]["c"],
      "totalReportCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "report_player", "id_player = ?", [this.idPlayer]))[0]["c"],
      "spyMailCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "spy_report", "id_player = ? AND seen = 0", [this.idPlayer]))[0]["c"],
      "totalSpyReportCount": (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "spy_report", "id_player = ?", [this.idPlayer]))[0]["c"],
      "totalPlayerCount": server[0]["player_num"],
      "totalGuildCount": server[0]["guild_num"],
      "totalCityCount": server[0]["city_num"],
      "totalHeroCount": server[0]["hero_num"]
    };
  }

  async refreshPlayerData() {
    return await Elkaisar.Lib.LPlayer.getData(this.idPlayer);
  }

  async searchByName(){
    const segment = Elkaisar.Base.validatePlayerWord(this.Parm.name);
    const condetion = "";
    let bind = [`%${segment}%`];
    if(this.Parm.idGuildNo){
      const idGuild = Elkaisar.Base.validateId(this.Parm.idGuild);
      condetion = `AND id_guild IS NULL AND  player.id_player NOT IN (SELECT guild_inv.id_player FROM  guild_inv WHERE  guild_inv.id_guild = ? AND guild_inv.id_player = player.id_player )`;
      bind.push(idGuild);
    }
    return await Elkaisar.DB.ASelectFrom(
      "name,id_player , porm , avatar ", "player",
      `name LIKE ?  ${condetion} ORDER BY prestige DESC LIMIT 7 `, bind
    );
  }

  async searchPlayer() {
    const GuildMembareName = Elkaisar.Base.validatePlayerWord(this.PlayerName);
    return await Elkaisar.DB.ASelectFrom(
      "player.name AS PlayerName, guild.name AS GuildName, player.id_player AS idPlayer, "
      + "guild.id_guild AS idGuild, guild.slog_top, guild.slog_cnt, guild.slog_btm",
      "player LEFT JOIN guild ON player.id_guild = guild.id_guild", "player.name LIKE ?", [`%${GuildMembareName}%`]);
  }

  async playLuckWheel() {

    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "luck_play", 1))
      return { "state": "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    const Prize = await Elkaisar.DB.ASelectFrom("*", "luck_wheel_prize", "1 ORDER BY RAND() LIMIT 20");
    const PlayerLuck = Elkaisar.Base.rand(1, 100);
    let index = 0;
    for (let one of Prize) {
      if (one["luck"] >= PlayerLuck)
        break;
      index++;
    }

    Elkaisar.Lib.LItem.addItem(this.idPlayer, Prize[index]["Prize"], Prize[index]["amount"]);

    return {
      "state": "ok",
      "Prize": Prize,
      "winIndex": index
    }
  }

  async chatPann() {

    const idPlayerTOPan = Elkaisar.Base.validateId(this.Parm.idPlayerTOPan);
    const duration = Elkaisar.Base.validateAmount(this.Parm.duration);
    const SuperVisor = await Elkaisar.DB.ASelectFrom("id_player, user_group, name", "player", "id_player = ?", [this.idPlayer]);
    const PlayerTOPann = await Elkaisar.DB.ASelectFrom("id_player, user_group, name", "player", "id_player = ?", [idPlayerTOPan]);


    if (!PlayerTOPann.length)
      return { "state": "error_0" };
    if (!SuperVisor.length)
      return { "state": "error_1" };
    if (PlayerTOPann[0]["user_group"] >= SuperVisor[0]["user_group"])
      return { "state": "error_2" };
    if (SuperVisor[0]["user_group"] < 3)
      return { "state": "error_3", "TryToHack": Elkaisar.Base.TryToHack(this) };

    await Elkaisar.DB.AUpdate("player", "chat_panne = ?", "id_player = ?",
      [Math.floor(Date.now() / 1000) + duration, idPlayerTOPan]);

    Elkaisar.WsLib.Ban.worldChat(null, {
      "PannedName": PlayerTOPann[0]["name"], "PannerName": SuperVisor[0]["name"],
      "duration": duration, "idPlayerToPan": idPlayerTOPan
    });

    return {
      "state": "ok",
    }
  }

};

module.exports = APlayer;