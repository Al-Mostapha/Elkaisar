class AGuild {

  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async create() {

    const guildName = Elkaisar.Base.validatePlayerWord(this.Parm["guildName"]);
    const slogTop = Elkaisar.Base.validateAmount(this.Parm["slogTop"]);
    const slogMiddle = Elkaisar.Base.validateAmount(this.Parm["slogMiddle"]);
    const slogBottom = Elkaisar.Base.validateAmount(this.Parm["slogBottom"]);
    const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
    const guildWithSameName = await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "guild", "name = ?", [guildName]);
    const PlayerGuildMem = await Elkaisar.DB.ASelectFrom("COUNT(*) AS C", "guild_member", "id_player = ?", [this.idPlayer]);

    if (guildName.length > 15) return { "state": "error_0" };
    if (guildWithSameName[0]["c"] > 0) return { "state": "error_1" };
    if (PlayerGuildMem[0]["C"] > 0) return { "state": "error_2" };
    if (!await Elkaisar.Lib.LCity.isResourceTaken({ "coin": 1e5 }, this.idPlayer, idCity)) return { "state": "error_3" };

    const idGuild = await Elkaisar.DB.AInsert(
      "id_leader = ?, name = ?, slog_top = ?, slog_cnt = ?, slog_btm = ?", "guild",
      [this.idPlayer, guildName, slogTop, slogMiddle, slogBottom]);
    Elkaisar.DB.AUpdate("guild_num = (SELECT COUNT(*) FROM guild), city_num = (SELECT count(*) from city )", "server_data", "1");
    await Elkaisar.DB.AInsert("id_guild = ?, rank = ?", "arena_guild_challange",
      [idGuild, (await Elkaisar.DB.ASelectFrom('COUNT(*) AS c', "arena_guild_challange", '1'))[0]["c"] + 1]);
    const GuildData = await Elkaisar.Lib.LGuild.getGuildData(idGuild);

    if (!GuildData)
      return { "state": "error_4" };

    await Elkaisar.Lib.LGuild.addPlayer(idGuild, this.idPlayer, Elkaisar.Config.GUILD_R_LEADER);
    const PlayerGuild = await Elkaisar.Lib.LGuild.getPlayerGuildData(this.idPlayer);
    const Guild = { "state": "ok" };
    if (PlayerGuild) Guild["PlayerGuild"] = PlayerGuild;
    if (GuildData) Guild["GuildData"] = GuildData;
    Guild["Player"] = await Elkaisar.Lib.LPlayer.getData();
    return Guild;
  }


  async changeGuildName() {

    const idPlayer = Elkaisar.Base.validateId(this.Parm["idPlayer"]);
    const slog_top = Elkaisar.Base.validateId(this.Parm["slog_top"]);
    const slog_cnt = Elkaisar.Base.validateId(this.Parm["slog_cnt"]);
    const slog_btm = Elkaisar.Base.validateId(this.Parm["slog_btm"]);
    const newGuildName = Elkaisar.Base.validatePlayerWord(this.Parm["newGuildName"]).trim();

    const playerGuild = await Elkaisar.DB.ASelectFrom("guild_member.*, player.name AS PlayerName",
      "guild_member JOIN player ON player.id_player = guild_member.id_player", "guild_member.id_player = ?", [this.idPlayer]);
    if (!playerGuild)
      return { "state": "error_0" };
    if (playerGuild[0].rank < Elkaisar.Config.GUILD_R_DEPUTY_2)
      return { "state": "error_1" };
    if (newGuildName.length > 15)
      return { "state": "error_2" };

    if (!(await Elkaisar.Lib.LItem.isEnough(this.idPlayer, "family_slogan", 1)))
      return { "state": "error_3" };

    Elkaisar.Lib.LItem.useItem(this.idPlayer, "family_slogan", 1);
    const OldGuildName = await Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [playerGuild[0].id_guild]);
    Elkaisar.DB.AUpdate("slog_top = ? , slog_cnt = ? ,slog_btm = ?, name = ?", "guild",
      "id_guild = ?", [slog_top, slog_cnt, slog_btm, newGuildName, playerGuild[0].id_guild]);
    if (OldGuildName[0].name != newGuildName) {
      var msg = JSON.stringify({
        "classPath": "Guild.GuildNameChanged",
        "OldName": OldGuildName[0].name,
        "NewName": newGuildName,
        "ChangeBy": playerGuild[0].PlayerName,
        "idGuild": playerGuild[0].id_guild
      });
      Elkaisar.Base.broadcast(msg);
    }
    return { "state": "ok" };
  }

  async getGuildData() {
    const idGuild = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
    if (!idGuild.length) return { "state": "noGuild" };
    return {
      "state": "ok",
      "Guild": await Elkaisar.Lib.LGuild.getGuildData(idGuild[0]["id_guild"])
    }
  }

  async getGuildDetail() {

    const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
    return (await Elkaisar.DB.ASelectFrom(
      "col.*, rank_g , player.name as p_name",
      "(SELECT guild.*, @row:=@row+1 as 'rank_g' FROM guild , (SELECT @row:=0) r  )"
      + " AS col JOIN player ON col.id_guild = :idg  AND col.id_leader = player.id_player", "1", [idGuild]))[0];
  }

  async getUnJoinedPlayerData() {
    const guildReq = await Elkaisar.DB.ASelectFrom("guild_req.* , guild.name", " guild_req JOIN guild ON  guild.id_guild = guild_req.id_guild", "guild_req.id_player = ?", [this.idPlayer]);
    const guildInv = await Elkaisar.DB.ASelectFrom("guild_inv.id_guild , guild.name", "guild_inv JOIN guild ON guild.id_guild = guild_inv.id_guild", "guild_inv.id_player = ?", [this.idPlayer]);
    return {
      state: "ok",
      "guild_inv": guildInv,
      "guild_req": guildReq
    }
  }

  async getGuildResource() {
    const idGuild = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
    if (!idGuild.length) return { "state": "noGuild" };
    return {
      "state": "ok",
      "Guild": (await Elkaisar.DB.ASelectFrom(
        "food , wood ,stone ,lvl , metal , coin , mem_num ", "guild", "id_guild = ?", [idGuild[0]["id_guild"]]))[0]
    }
  }

  async searchGuildName() {
    const searchVal = Elkaisar.Base.validatePlayerWord(this.Parm["searchVal"]);
    const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
    const GuildList = await Elkaisar.DB.ASelectFrom(
      "id_guild , name , lvl , slog_cnt , slog_top , slog_btm",
      "guild", "name LIKE ? AND id_guild != ?  ORDER BY prestige DESC LIMIT 10",
      ["%" + searchVal + "%", idGuild]);
    return GuildList;
  }
}
module.exports = AGuild;