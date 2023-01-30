class ARankingCity {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async generalRank() {
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    return await Elkaisar.DB.ASelectFrom(
      " city.name , city.id_city , city.pop , city.lvl , "
      + " player.guild  AS GuildName, player.avatar, player.name AS lord_name, player.porm,"
      + " guild.slog_top, guild.slog_cnt, guild.slog_btm, guild.id_guild",
      "city JOIN player ON  player.id_player = city.id_player "
      + " LEFT JOIN guild ON guild.id_guild = player.id_guild",
      "1 ORDER BY pop DESC LIMIT 10 OFFSET ?", [offset]);
  }

}

module.exports = ARankingCity;