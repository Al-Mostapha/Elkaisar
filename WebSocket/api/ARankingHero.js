class ARankingHero {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getRankHeroBySearch(){
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
      "col.name , col.lvl , col.point_a , col.point_b , col.point_c, rank_h , player.name as p_name",
      `(SELECT hero.*, @row:=@row+1 as 'rank_h' FROM hero , (SELECT @row:=0) r ORDER BY hero.lvl DESC ) 
      AS col JOIN player  ON ${condetion} AND col.id_player = player.id_player`,
      "1  LIMIT 10", [searchBy, sv]
      );
  }

  async generalRank() {

    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);

    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "1  ORDER BY hero.lvl DESC, point_a DESC LIMIT 10 OFFSET ?", [offset]);
  }

  async swayRank() {
    
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    
    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "1  ORDER BY point_a DESC LIMIT 10 OFFSET ?", [offset]);
  }

  async braveryRank() {
    
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    
    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "1  ORDER BY point_b DESC LIMIT 10 OFFSET ?", [offset]);
  }

  async parryRank() {
    
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    
    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "1  ORDER BY point_c DESC LIMIT 10 OFFSET ?", [offset]);
  }

  async searchByHeroName() {
    const heroName = Elkaisar.Base.validatePlayerWord(this.Parm.heroName);
    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "hero.name LIKE ?  ORDER BY point_c DESC LIMIT 10", ["%"+heroName+"%"]);
  }

  async searchByPlayerName() {
    const playerName = Elkaisar.Base.validatePlayerWord(this.Parm.playerName);
    return await Elkaisar.Base.selectFromTable(
      "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b , "
      + "hero.point_c , player.name AS lord_name, player.avatar, hero.avatar AS heroAvatar",
      "hero JOIN player  ON player.id_player = hero.id_player",
      "player.name LIKE ?  ORDER BY point_c DESC LIMIT 10", ["%"+playerName+"%"]);
  }

}

module.exports = ARankingHero;