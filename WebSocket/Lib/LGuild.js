class LGuild {

  static G_POSITION_MAX_NUM = {

    0: 300,// عضو عادى
    1: 10,  //  عضو رسمى
    2: 6,   //  عضو كبير
    3: 4,   //  مستشار
    4: 3,  //  وزير
    5: 2,  //  نائب المدير
    6: 1   //  المدير

  };

  static async inSameGuild(idPlayer1, idPlayer2) {
    const idGuild1 = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayer1]);
    if (!idGuild1.length) return false;
    const idGuild2 = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayer2]);
    if (!idGuild2.length) return false;
    if (idGuild1[0]["id_guild"] != idGuild2[0]["id_guild"]) return false;
    return true;
  }

  static async canDefenceGuildWar(idPlayer, Battel) {
    if (Elkaisar.Lib.LWorldUnit.isRepelCastle(Battel["ut"]) || Elkaisar.Lib.LWorldUnit.isQueenCity(Battel["ut"])) {
      const PlayerGuild = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayer]);
      if (!PlayerGuild.length)
        return false;
      const GuildDominant = await Elkaisar.DB.ASelectFrom("*", "world_unit_rank", "x = ? AND y = ? ORDER BY id_round DESC LIMIT 1", [Battel["x"], Battel["y"]]);
      if (!GuildDominant.length)
        return false;
      return GuildDominant[0]["id_guild"] == PlayerGuild[0]["id_guild"];
    }
    return true;
  }

  static async addPlayer(idGuild, idPlayer, Post) {
    Post = Post || Elkaisar.Config.GUILD_R_MEMBER;
    Elkaisar.DB.ADelete("guild_inv", "id_player = ?", [idPlayer]);
    Elkaisar.DB.ADelete("guild_req", "id_player = ?", [idPlayer]);
    Elkaisar.DB.AInsert("id_player = ? , id_guild = ?  , rank = ? , time_join = ?",
      "guild_member", [idPlayer, idGuild, Post, Date.now() / 1000]);
    Elkaisar.DB.AUpdate("id_guild = ? , guild = (SELECT name FROM guild WHERE id_guild = ?)", "player", "id_player = ?", [idGuild, idGuild, idPlayer]);
  }

  static async getPlayerGuildData(idPlayer) {
    const PlayerGuild = await Elkaisar.DB.ASelectFrom("guild_member.* , guild.name",
      "guild_member JOIN guild  ON guild.id_guild = guild_member.id_guild",
      "guild_member.id_player = ?", [idPlayer]);
    if (PlayerGuild.length)
      return PlayerGuild[0];
    return null;
  }

  static async getGuildData(idGuild) {

    const Guild = await Elkaisar.DB.ASelectFrom("*", "guild", "id_guild = ?", [idGuild]);
    if (!Guild.length)
      return false;

    const GuildData = {};
    GuildData["GuildData"] = Guild[0];
    GuildData["leaderName"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = (SELECT id_player FROM guild_member WHERE id_guild = ? AND rank = ? LIMIT 1)", [idGuild, Elkaisar.Config.GUILD_R_LEADER]))[0]["name"];
    GuildData["Allay"] = await Elkaisar.DB.ASelectFrom("guild.id_guild AS idGuild, guild.name , guild_relation.state", "guild JOIN guild_relation ON guild.id_guild = guild_relation.id_guild_2", "guild_relation.id_guild_1 = ?", [idGuild]);
    GuildData["prizeShare"] = (await Elkaisar.DB.ASelectFrom("SUM(prize_share) AS total_prize_share ", "guild_member", "id_guild = ?", [idGuild]))[0]["total_prize_share"];
    return GuildData;
  }


  static async getGuildReqInv(idGuild) {

    return {
      "GuildReq": await Elkaisar.DB.ASelectFrom("guild_req.*, player.name, player.porm, player.avatar", "guild_req JOIN player ON player.id_player = guild_req.id_player", "guild_req.id_guild = ?", [idGuild]),
      "GuildInv": await Elkaisar.DB.ASelectFrom("guild_inv.*, player.name, player.porm, player.avatar", "guild_inv JOIN player ON player.id_player = guild_inv.id_player", "guild_inv.id_guild = ?", [idGuild])
    };

  }

  static async updateGuildData(idGuild) {

    await Elkaisar.DB.AUpdate(
      " mem_num = (SELECT COUNT(*) FROM guild_member WHERE id_guild = ?) ,"
      + " prestige = (SELECT SUM(player.prestige) FROM player JOIN guild_member ON player.id_player = guild_member.id_player WHERE guild_member.id_guild = ?) ,"
      + " honor = (SELECT SUM(player.honor) FROM player JOIN guild_member ON player.id_player = guild_member.id_player WHERE guild_member.id_guild = ?)"
      , "guild", "id_guild = ?", [idGuild, idGuild, idGuild, idGuild]);
  }

  static async getGuildMember(idGuild, offset) {
    return await Elkaisar.DB.ASelectFrom(
      "player.name , guild_member.rank , guild_member.prize_share ,player.prestige , player.id_player , player.`online`, player.last_seen, player.porm",
      "player JOIN  guild_member ON player.id_player = guild_member.id_player",
      "guild_member.id_guild = ? ORDER BY guild_member.rank DESC, player.prestige DESC LIMIT 15 OFFSET ?", [idGuild, offset]);

  }

}


module.exports = LGuild;