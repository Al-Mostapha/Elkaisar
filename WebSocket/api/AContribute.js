class AContribute {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async upgradeEquip() {
    const idCont = Elkaisar.Base.validateGameNames(this.Parm.idCont);
    const idEquip = Elkaisar.Base.validateId(this.Parm.idEquip);
    const Cont = await Elkaisar.DB.ASelectFrom("*", "contribute", "id = ?", [idCont]);
    const Equip = await Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ? AND id_player = ?", [idEquip, this.idPlayer]);

    if (!Cont.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!Equip.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Equip[0].id_hero > 0 || !Equip[0].id_hero === null)
      return { state: "error_2", idHero: Equip[0].id_hero, TryToHack: Elkaisar.Base.TryToHack(this) };
    const Reword = JSON.parse(Cont[0].Reword);

    if (!Reword.length || Reword[0].type != "equip")
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Reword[0].part != Equip[0].part || Reword[0].equip != Equip[0].type)
      return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };

    const ListOfNeed = JSON.parse(Cont[0].ListOfNeed);
    if (!await this.#verifyListOfNeed(ListOfNeed, Equip[0]))
      return { state: "error_5" };
    if (!await this.#takeListOfNeed(ListOfNeed))
      return { state: "error_6" };

    Elkaisar.DB.AUpdate("lvl = ?", "equip", "id_player = ? AND id_equip = ?", [Reword[0].lvl, this.idPlayer, idEquip]);

    return {
      state: "ok",
      Equip: (await Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ?", [idEquip]))[0]
    };

  }


  async contribute() {

    const idCont = Elkaisar.Base.validateGameNames(this.Parm.idCont);
    const Cont = await Elkaisar.DB.ASelectFrom("*", "contribute", "id = ?", [idCont]);
    if (!Cont.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };

    const ListOfNeed = JSON.parse(Cont[0].ListOfNeed);
    const Reword = JSON.parse(Cont[0].Reword);
    if (!await this.#verifyListOfNeed(ListOfNeed))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await this.#takeListOfNeed(ListOfNeed))
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    await this.#giveReword(Reword);
    return { state: "ok" };
  }



  async #verifyListOfNeed(listOfNeed, Equip) {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Player = await Elkaisar.DB.ASelectFrom("porm , prestige, gold", "player", "id_player = ?", [this.idPlayer]);

    if (!Player.length)
      return false;
    for (const one of listOfNeed) {

      if (one.type == "promotion") {
        if (Player[0].porm < one.promotion)
          return false;
      }
      else if (one.type == "item") {
        if (await Elkaisar.Lib.LItem.getAmount(this.idPlayer, one.item) < one.amount)
          return false;
      } else if (one["type"] == 'prestige') {
        if (Player[0].prestige < one.amount)
          return false;
      } else if (one.type == "gold") {
        if (Player[0].gold < one.amount)
          return false;
      } else if (one.type == "building") {
        const Building = await Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, one.buildingType);
        if (Building.Lvl < one.lvl)
          return false;
      } else if (one.type == "resource") {
        if (!await Elkaisar.Lib.LCity.isResourceEnough({ [one.resourceType]: one.amount }, this.idPlayer, idCity))
          return false;
      } else if (one.type == "equip") {
        if (!Equip)
          return false;
        if (Equip.part != one.part || Equip.type != one.equip || Equip.lvl != one.lvl)
          return false;
      }
    }
    return true;
  }

  async #takeListOfNeed(listOfNeed) {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    for (let one of listOfNeed) {
      if (one.type == "item") {
        if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, one.item, one.amount))
          return false;
      } else if (one.type == "gold") {
        if (!await Elkaisar.Lib.LPlayer.takePlayerGold(this.idPlayer, one.amount))
          return false;
      } else if (one.type == "resource") {
        if (!await Elkaisar.Lib.LCity.isResourceTaken({ [one.resourceType]: one.amount }, this.idPlayer, idCity))
          return false;
      }
    }
    return true;
  }

  async #giveReword(Reword) {
    
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    for (let one of Reword) {
      if (one.type == "item")
        await Elkaisar.Lib.LItem.addItem(this.idPlayer, one.item, one.amount);
      else if (one.type == "prestige")
        await Elkaisar.Lib.LPlayer.addPrestige(this.idPlayer, one.amount);
      else if (one.type == "resource")
        await Elkaisar.Lib.LCity.addResource({ [one.resourceType]: one.amount }, this.idPlayer, idCity);
      else if (one.type == "equip")
        for (let ii = 0; ii < one.amount; ii++) {
          await Elkaisar.Lib.LEquip.addEquip(this.idPlayer, one.equip, one.part, one.lvl);
        }
      else
        Elkaisar.Base.TryToHack(this);
    }
  }

}

module.exports = AContribute;