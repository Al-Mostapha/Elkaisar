class ARankingGuild {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getRankGuildBySearch(){
    const searchBy = Elkaisar.Base.validateGameName(this.Parm.searchBy);
    const searchValue = Elkaisar.Base.validatePlayerWord(this.Parm.searchValue);
    return await Elkaisar.DB.ASelectFrom(
      "col.id_guild , col.mem_num , col.name , col.prestige , rank_g , col.honor , player.name as p_name", 
      "(SELECT guild.*, @row:=@row+1 as 'rank_g' FROM guild , (SELECT @row:=0)"
      + " r ORDER BY guild.prestige DESC ) AS col "
      + " JOIN player ON col.?? LIKE ? "
      + " AND col.id_leader = player.id_player",
      "1 LIMIT 10", [searchBy, searchValue]
    );
  }

  async generalRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
      + "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
      + "guild.slog_top, guild.slog_cnt, guild.slog_btm",
      `guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE 
        guild_member.id_guild = guild.id_guild AND guild_member.rank = ${Elkaisar.Config.GUILD_R_LEADER} LIMIT 1)`,
      "1 ORDER BY guild.mem_num DESC, guild.prestige DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async prestigeRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
      + "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
      + "guild.slog_top, guild.slog_cnt, guild.slog_btm",
      `guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE
        guild_member.id_guild = guild.id_guild AND guild_member.rank = ${Elkaisar.Config.GUILD_R_LEADER} LIMIT 1)`,
      "1 ORDER BY guild.prestige DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async honorRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
      + "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
      + "guild.slog_top, guild.slog_cnt, guild.slog_btm",
      `guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE
      guild_member.id_guild = guild.id_guild AND guild_member.rank = ${Elkaisar.Config.GUILD_R_LEADER} LIMIT 1)`,
      "1 ORDER BY guild.honor DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async searchByName() {

    const searchName = Elkaisar.Base.validatePlayerWord(this.Parm.searchName);
    return await Elkaisar.DB.ASelectFrom(
      "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
      + "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
      + "guild.slog_top, guild.slog_cnt, guild.slog_btm",
      `guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE 
        guild_member.id_guild = guild.id_guild AND guild_member.rank = ${Elkaisar.Config.GUILD_R_LEADER} LIMIT 1)`,
      "guild.name LIKE ? ORDER BY guild.mem_num DESC  LIMIT 10", [`%${searchName}%`]);

  }

  async searchByRank() {

    const rank = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
      + "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
      + "guild.slog_top, guild.slog_cnt, guild.slog_btm",
      `guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE
      guild_member.id_guild = guild.id_guild AND guild_member.rank = ${Elkaisar.Config.GUILD_R_LEADER} LIMIT 1)`,
      "1 ORDER BY guild.mem_num DESC  LIMIT 1 OFFSET ?", [Math.max(rank, 10)]);

  }

}

module.exports = ARankingGuild;