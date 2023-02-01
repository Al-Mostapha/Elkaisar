class APlayerQuest {

  constructor(idPlayer, Param) {
    this.idPlayer = idPlayer;
    this.Param = Param;
  }

  async getPlayerQuest() {
    // global $idPlayer;
    // return 
    //         selectFromTable("*", "quest_player", "id_player = :idp", ["idp" => $idPlayer]);
    return await Elkaisar.DB.ASelectFrom("*", "quest_player", "id_player = ?", [this.idPlayer]);

  }


  async acceptQuest() {

    const idQuest = Elkaisar.Base.validateGameNames(this.Param.idQuest);
    const Quest = await Elkaisar.DB.ASelectFrom("*", "quest", "id_quest = ?", [idQuest]);
    const playerQuest = await Elkaisar.DB.ASelectFrom("*", "quest_player", "id_player = ? AND id_quest = ?", [this.idPlayer, idQuest]);
    const lsitOfNeed = JSON.parse(Quest[0].ListOfNeed);
    const Reword = JSON.parse(Quest[0].Reword);

    if (!Quest.length)
      return { "state": "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!playerQuest.length)
      return { "state": "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (playerQuest[0].done != 0)
      return { "state": "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await this.#verifyListOfNeed(lsitOfNeed))
      return { "state": "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!await this.#takeListOfNeed(lsitOfNeed))
      return { "state": "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };

    await this.#giveReword(Reword);
    Elkaisar.DB.AUpdate("done = 1", "quest_player", "id_player = ? AND id_quest = ?", [this.idPlayer, idQuest]);
    return { "state": "ok" };

  }


  async #verifyListOfNeed(listOfNeed) {

    const idCity = Elkaisar.Base.validateId(this.Param.idCity);
    const player = await Elkaisar.DB.ASelectFrom("porm , prestige, gold", "player", "id_player = ?", [this.idPlayer]);
    if (!player.length) return false;

    for (let one of listOfNeed) {
      if (one.type == "promotion") {
        if (player[0]["porm"] < one["promotion"]) return false;
      } else if (one.type == "item") {
        if (await Elkaisar.Lib.LItem.getAmount(this.idPlayer, one.item) < one.amount) return false;
      } else if (one.type == 'prestige') {
        if (player[0]["prestige"] < one.amount) return false;
      } else if (one["type"] == "gold") {
        if (player[0]["gold"] < one["amount"]) return false;
      } else if (one.type == "building") {
        const Building = await Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, one.buildingType);
        if (Building["Lvl"] < one.lvl) return false;
      } else if (one.type == "resource") {
        if (!await Elkaisar.Lib.LCity.isResourceEnough(this.idPlayer, { [one.resourceType]: one.amount }, idCity))
          return false;
      } else if (one.type == "population") {
        const cityPop = await Elkaisar.DB.ASelectFrom("pop", "city", "id_city = ?", [idCity]);
        if (cityPop[0]["pop"] < one["amount"]) return false;
      } else if (one.type == "jop") {
        const cityJop = await Elkaisar.DB.ASelectFrom(one.jopFor, "city_jop", "id_city = ?", [idCity]);
        if (cityJop[0][one.jopFor] < one.amount) return false;
      } else if (one.type == "playerState") {
        const playerState = await Elkaisar.DB.ASelectFrom(one.stateFor, "player_stat", "id_player = ?", [this.idPlayer]);
        if (playerState[0][one.stateFor] < Date.now() / 1000)
          return false;
      }
    }
    return true;
  }

  async #takeListOfNeed(listOfNeed) {

    const idCity = Elkaisar.Base.validateId(this.Param.idCity);

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

    const idCity = Elkaisar.Base.validateId(this.Param.idCity);
    for (let one of Reword) {
      if (one.type == "item")
        await Elkaisar.Lib.LItem.addItem(this.idPlayer, one.item, one.amount);
      else if (one.type == "prestige")
        await Elkaisar.Lib.LPlayer.addPrestige(this.idPlayer, one.amount);
      else if (one.type == "resource")
        await Elkaisar.Lib.LCity.addResource(this.idPlayer, { [one.resourceType]: one.amount }, idCity);
      else if (one.type == "population")
        await Elkaisar.DB.AUpdate("pop = pop + ?", "city", "id_city = ?", [one.amount, idCity]);
      else if (one.type == "equip") {
        for (let ii = 0; ii < one.amount; ii++) {
          Elkaisar.Lib.LEquip.addEquip(this.idPlayer, one.equip, one.part, one.lvl);
        }
      } else if (one.type == "jop")
        await Elkaisar.DB.AUpdate(`${one["jopFor"]} = ${one["jopFor"]} + ?`, "city_jop", "id_city = ?", [one.amount, idCity]);
      else if (one.type == "promotion")//     else if($one["type"] == "promotion")
        await Elkaisar.DB.AUpdate("porm = porm + ?", "player", "id_player = ?", [one.amount, this.idPlayer]);
      else
        Elkaisar.Base.TryToHack(this);
    }

  }


};

module.exports = APlayerQuest;