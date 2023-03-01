class ARankingCity {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  
  async getRankCityBySearch(){
    const searchBy = Elkaisar.Base.validateGameName(this.Parm.searchBy);
    const searchValue = Elkaisar.Base.validatePlayerWord(this.Parm.searchValue);
    let sv = "";
    let condetion = "";
    if(Number(searchValue)){
      condetion = "col.?? = ?";
      sv = searchValue;
    }else{
      condetion = 'col.?? LIKE ?';
      sv = `%${searchValue}%`;
    }
    return await Elkaisar.DB.ASelectFrom(
      "col.name , col.lvl , col.pop, rank_g , player.name as p_name  ,  guild.name AS g_name",
      `(SELECT city.*, @row:=@row+1 as 'rank_g' FROM city ,(SELECT @row:=0) r ORDER BY city.pop DESC ) 
      AS col JOIN player ON   ${condetion} AND col.id_player = player.id_player LEFT JOIN guild ON player.id_guild = guild.id_guild`,
      `1 LIMIT 10` , [searchBy, sv]
      );
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