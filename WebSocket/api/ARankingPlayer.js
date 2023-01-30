class ARankingPlayer {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async generalRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.Base.selectFromTable(
      "player.name , player.prestige , player.guild ,player.honor, "
      + "player.avatar, player.id_player , player.porm, "
      + "player_title.*, guild.slog_top, guild.slog_cnt, guild.slog_btm, "
      + "guild.lvl AS guildLvl, guild.id_guild",
      "player JOIN player_title ON player.id_player = player_title.id_player LEFT JOIN guild "
      + "ON guild.id_guild = player.id_guild",
      "1 ORDER BY  porm DESC , prestige DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async honorRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.Base.selectFromTable(
      "player.name , player.prestige , player.guild ,player.honor, "
      + "player.avatar, player.id_player , player.porm, "
      + "player_title.*, guild.slog_top, guild.slog_cnt, guild.slog_btm, "
      + "guild.lvl AS guildLvl, guild.id_guild",
      "player JOIN player_title ON player.id_player = player_title.id_player LEFT JOIN guild "
      + "ON guild.id_guild = player.id_guild",
      "1 ORDER BY  prestige DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async prestigeRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      "player.name , player.prestige , player.guild ,player.honor, "
      + "player.avatar, player.id_player , player.porm, "
      + "player_title.*, guild.slog_top, guild.slog_cnt, guild.slog_btm, "
      + "guild.lvl AS guildLvl, guild.id_guild",
      "player JOIN player_title ON player.id_player = player_title.id_player LEFT JOIN guild "
      + "ON guild.id_guild = player.id_guild",
      "1 ORDER BY  honor DESC  LIMIT 10 OFFSET ?", [offset]);

  }

  async searchByName() {

    const name = Elkaisar.Base.validatePlayerWord(this.Parm.searchName);
    return await Elkaisar.DB.ASelectFrom(
      "player.name , player.prestige , player.guild ,player.honor, "
      + "player.avatar, player.id_player , player.porm, "
      + "player_title.*, guild.slog_top, guild.slog_cnt, guild.slog_btm, "
      + "guild.lvl AS guildLvl, guild.id_guild",
      "player JOIN player_title ON player.id_player = player_title.id_player LEFT JOIN guild "
      + "ON guild.id_guild = player.id_guild",
      " player.name LIKE ? ORDER BY prestige DESC  LIMIT 10", [`%${name}%`]);
  }

  async searchByRank() {

    const rank = Elkaisar.Base.validateId(this.Parm.rank);
    return await Elkaisar.DB.ASelectFrom(
      "player.name , player.prestige , player.guild ,player.honor, "
      + "player.avatar, player.id_player , player.porm, "
      + "player_title.*, guild.slog_top, guild.slog_cnt, guild.slog_btm, "
      + "guild.lvl AS guildLvl, guild.id_guild",
      "player JOIN player_title ON player.id_player = player_title.id_player LEFT JOIN guild "
      + "ON guild.id_guild = player.id_guild",
      " 1 ORDER BY porm DESC , prestige DESC   LIMIT 1 OFFSET ?", [rank]);

  }

}

module.exports = ARankingPlayer;