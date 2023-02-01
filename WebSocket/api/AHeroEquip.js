class AHeroEquip {

  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getHeroEquip(){
    // const idHero = Elkaisar.Base.validateId(this.Parm.idHero);
    // $id_hero   = validateId($_GET["id_hero"]);
    // $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    // $hero_equip = Equipment::retriveEquipByIdHero($id_hero, $id_player);
    
    // $boot["boot"]          = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
    // $armor["armor"]        = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
    // $shield["shield"]      = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
    // $helmet["helmet"]      = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
    // $sword["sword"]        = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
    // $belt["belt"]          = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
    // $necklace["necklace"]  = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
    // $pendant["pendant"]    = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
    // $ring["ring"]          = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
    // $steed["steed"]        = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);
    // $player["id_player"]   = $id_player;
    // $player["id_hero"]     = $id_hero;
   
    // echo json_encode(array_merge($sword , $helmet , $shield , $armor , $boot , $player, $belt, $necklace, $pendant, $ring, $steed));
  }

  async putEquipOnHero() {

    const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
    const idEquip = Elkaisar.Base.validateGameNames(this.Parm["idEquip"]);
    const Equip = await Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ? AND id_player = ?", [idEquip, this.idPlayer]);
    const Hero = await Elkaisar.DB.ASelectFrom("in_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);

    if (!Equip.length)
      return { state: "error_0" };
    if (!Hero.length)
      return { state: "error_1" };
    if (Equip[0]["id_hero"] > 0)
      return { state: "error_2", "idHero": Equip[0]["id_hero"] };
    if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
      return { "state": "error_3", "Console": Console.log("Doublicate Hero Equip On", idHero) };
    await Elkaisar.DB.AUpdate("id_hero = NULL, on_hero = 0", "equip", "id_hero = ? AND part = ?", [idHero, Equip[0]["part"]]);
    await Elkaisar.DB.AUpdate("id_hero = ?, on_hero = 1", "equip", "id_equip = ?", [idHero, Equip[0]["id_equip"]]);

    return {
      "state": "ok",
      "PlayerEquip": await Elkaisar.DB.ASelectFrom("id_equip, on_hero, id_hero", "equip", "id_player = ?", [this.idPlayer])
    };

  }

  async putEquipOffHero() {
    const idEquip = Elkaisar.Base.validateId(this.Parm["idEquip"]);
    const Equip = await Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ? AND id_player = ?", [idEquip, this.idPlayer]);


    if (!Equip.length)
      return { state: "error_0" };
    const Hero = await Elkaisar.DB.ASelectFrom("in_city", "hero", "id_hero = ? AND id_player = ?", [Equip[0]["id_hero"], this.idPlayer]);
    if (!Hero.length)
      return { state: "error_1" };
    if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[Equip[0]["id_hero"]] > Date.now() / 1000)
      return { "state": "error_2", "Console": Console.log("Doublicate Hero Equip Off", Equip) };

    await Elkaisar.DB.AUpdate("id_hero = NULL, on_hero = 0", "equip", "id_equip = ?", [idEquip]);

    return {
      "state": "ok",
      "PlayerEquip": await Elkaisar.DB.ASelectFrom("id_equip, on_hero, id_hero", "equip", "id_player = ?", [this.idPlayer])
    };

  }

}

module.exports = AHeroEquip;