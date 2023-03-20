class ACity {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getAllCities(){
    return await  Elkaisar.DB.ASelectFrom( "*",
      "city", "id_player = ? LIMIT 5", [this.idPlayer]);
  }

  async resetCityHelper()
  {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const currentCityHelper = await Elkaisar.DB.ASelectFrom("helper", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    if(!currentCityHelper.length)
      return {state: "error_0"};
    if(currentCityHelper[0].helper == Elkaisar.Config.CITY_HELPER_NONE)
      return {state: "error_1"};
    if(!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "help_house_chng", 1))
      return {state: "error_2"};
    await Elkaisar.DB.AUpdate("helper = ?", "city", "id_city = ? AND id_player = ?", [Elkaisar.Config.CITY_HELPER_NONE, idCity, this.idPlayer]);
    const City = await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    return {
      state: "ok",
      City: City[0]
    }
  }

  async changeCityHelper()
  {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const newHelper = Elkaisar.Base.validateCount(this.Parm.newHelper);
    const currentCityHelper = await Elkaisar.DB.ASelectFrom("helper", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    if(!currentCityHelper.length) return {state: "error_0"};
    if(currentCityHelper[0].helper != Elkaisar.Config.CITY_HELPER_NONE)
        return {state: "error_1"};
    await Elkaisar.DB.AUpdate("helper = ?", "city", "id_city = ? AND id_player = ?", [newHelper, idCity, this.idPlayer]);
    const City = await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    return {
      state: "ok",
      City: City[0]
    }
  }

  async cureCityWounded()
  {
      const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
      const armyType = Elkaisar.Base.validateGameNames(this.Parm.armyType);
      const cureUnitPrice = Elkaisar.Config.CArmy.CurePrice[armyType];
      if(!cureUnitPrice) return {state: "error_0"};
      const armyAmount = (await Elkaisar.DB.ASelectFrom("`"+armyType+"`", "city_wounded", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0][armyType];
      
      await Elkaisar.Lib.LSaveState.saveCityState(idCity);
      if(!await Elkaisar.Lib.LCity.isResourceTaken({coin: cureUnitPrice*armyAmount}, this.idPlayer, idCity))
        return {state: "error_1", coinAmount: cureUnitPrice*armyAmount};
      Elkaisar.DB.AUpdate("`"+armyType+"` = 0 ", "city_wounded", "id_city = ?  AND id_player = ?", [idCity, this.idPlayer]);
      Elkaisar.DB.AUpdate("`"+armyType+"` = `"+armyType+"` + ?", "city", "id_city = ? AND id_player = ?", [armyAmount, idCity, this.idPlayer]);
      await Elkaisar.Lib.LSaveState.foodOutState(idCity);
      await Elkaisar.Lib.LSaveState.saveCityState(idCity);
      
      return {
        state: "ok",
        cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0],
        cityWounded: (await Elkaisar.DB.ASelectFrom("*", "city_wounded", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0],
        coinAmount: cureUnitPrice*armyAmount
      };
  }

  async fireCityWounded(){
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const armyType = Elkaisar.Base.validateGameNames(this.Parm.armyType);
    
    if(!Elkaisar.Lib.LArmy.neededResources(armyType))
        return {state: "error_0"};
    const ArmyAmount = ASelectFrom("`"+armyType+"`", "city_wounded", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
    if(!ArmyAmount.length)
        return {state: "error_1"};

    const GainRes = {
      food:  Elkaisar.Lib.LArmy.neededResources(armyType).food  * ArmyAmount[0][armyType]/3,
      wood:  Elkaisar.Lib.LArmy.neededResources(armyType).wood  * ArmyAmount[0][armyType]/3,
      stone: Elkaisar.Lib.LArmy.neededResources(armyType).stone * ArmyAmount[0][armyType]/3,
      metal: Elkaisar.Lib.LArmy.neededResources(armyType).metal * ArmyAmount[0][armyType]/3,
      coin:  Elkaisar.Lib.LArmy.neededResources(armyType).coin  * ArmyAmount[0][armyType]/3
    };
    Elkaisar.Lib.LSaveState.saveCityState(idCity);
    Elkaisar.Lib.LCity.addResource(GainRes, this.idPlayer, idCity);
    Elkaisar.DB.AUpdate("`"+armyType+"` = 0 ", "city_wounded", "id_city = ?  AND id_player = ?", [idCity, this.idPlayer]);
   
    Elkaisar.DB.AInsert("id_player = ?, id_city = ?, army_type = ?, amount = ?", "city_wounded_fired", [this.idPlayer, idCity, armyType, ArmyAmount[0][armyType]]);
    Elkaisar.Lib.LSaveState.saveCityState(idCity);
    return {
      state: "ok",
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0],
      cityWounded: (await Elkaisar.DB.ASelectFrom("*", "city_wounded", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]))[0]
    };
  }

  async fireArmy()
  {
      const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
      const armyType = Elkaisar.Base.validateGameNames(this.Parm.armyType);
      const amount = Elkaisar.Base.validateId(this.Parm.amount);
      const CityArmy = await Elkaisar.DB.ASelectFrom("army_a, army_b, army_c, army_d, army_e, army_f, wall_a, wall_b, wall_c, spies", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
      const ResNeed = Elkaisar.Lib.LArmy.neededResources(armyType);
      if(!CityArmy.length)
          return {state: "error_0", "TryToHack": Elkaisar.Lib.Log.Hack(this)};
      if(!ResNeed)
          return {state: "error_1", "TryToHack": Elkaisar.Lib.Log.Hack(this)};
      if(amount <= 0 || amount > CityArmy[0][armyType])
          return {state: "error_2", "TryToHack": Elkaisar.Lib.Log.Hack(this)};
      
      const Res = {
        food: ResNeed.food * amount * 0.3, wood: ResNeed.wood * amount * 0.3,
        stone: ResNeed.stone * amount * 0.3, metal: ResNeed.metal * amount * 0.3,
        pop: ResNeed.pop * amount * 0.3, coin: ResNeed.coin * amount * 0.3
      };
      
      await Elkaisar.Lib.LCity.addResource(Res, this.idPlayer, idCity);
      await Elkaisar.DB.AUpdate("`"+armyType+"` = `"+armyType+"` - ?", "city", "id_city = ? AND id_player = ?", [amount, idCity, this.idPlayer]);
      return {
        state: "ok",
        city: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]))[0]
      }
  } 

  async refreshCityBase()
  {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const City = await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    if(!City.length)
      return {state: "error_0", "TryToHack": Elkaisar.Lib.Log.Hack(this)};
    return City[0];
  }
  
  async afterBattelFinishRefresh(){

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LSaveState.foodOutState(this.idPlayer, idCity);
    return {
      state: "ok",
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async searchCity()
  {
    const NameSeg = Elkaisar.Base.validatePlayerWord(this.Parm.CityName);
    return await Elkaisar.DB.ASelectFrom(
      "player.name AS PlayerName, player.id_player AS idPlayer, city.name AS CityName, city.id_city AS idCity, player.avatar",
      "city JOIN player ON city.id_player = player.id_player", "city.name LIKE ?", ["%"+NameSeg+"%"]);
  }

  async getDataByCoord(){
    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);
    const City = await Elkaisar.DB.ASelectFrom(
      "city.id_player, city.name, city.id_city, player.name AS p_name, player.prestige ,player.guild, player.avatar, player.id_guild ",
      "player JOIN city ON city.x = ? AND city.y = ? AND city.id_player = player.id_player", [xCoord, yCoord]);
    return City[0] || {};
  }

};

module.exports = ACity;