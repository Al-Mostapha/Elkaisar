module.exports = class LGuild{
  static async getPlayerGuildData(idPlayer){
    const PlayerGuild = await Elkaisar.DB.ASelectFrom("guild_member.* , guild.name",
                 "guild_member JOIN guild  ON guild.id_guild = guild_member.id_guild",
                 "guild_member.id_player = ?", [idPlayer]);
    if(PlayerGuild.length)
      return PlayerGuild[0];
    return null;
  }

  static async getGuildData(idGuild){
    const Guild = await Elkaisar.DB.ASelectFrom("*", "guild", "id_guild = ?", [idGuild]);

    if(!Guild.length)
      return false;
    
    const GuildData = {};
    GuildData["GuildData"] = Guild[0];
    GuildData["leaderName"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = (SELECT id_player FROM guild_member WHERE id_guild = ? AND rank = ? LIMIT 1)", [idGuild, Elkaisar.Config.GUILD_R_LEADER]))[0]["name"];
    GuildData["Allay"] = await Elkaisar.DB.ASelectFrom("guild.id_guild AS idGuild, guild.name , guild_relation.state", "guild JOIN guild_relation ON guild.id_guild = guild_relation.id_guild_2", "guild_relation.id_guild_1 = ?", [idGuild]);
    GuildData["prizeShare"] = (await Elkaisar.DB.ASelectFrom("SUM(prize_share) AS total_prize_share ", "guild_member", "id_guild = ?", [idGuild]))[0]["total_prize_share"];
    return GuildData;
  }

}