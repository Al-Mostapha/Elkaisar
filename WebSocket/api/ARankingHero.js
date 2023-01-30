class ARankingHero {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
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