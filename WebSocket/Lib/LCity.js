class LCity {

  static refreshPopCap(idCity) {

    Elkaisar.DB.SelectFrom("*", "city_building", "id_city = ?", [idCity], function (CityBuilding) {
      Elkaisar.DB.SelectFrom("*", "city_building_lvl", "id_city = ?", [idCity], function (CityBuildingLvl) {
        var TotalCap = 300;
        var TampleLvl = 0;
        var TheaterLvl = 0;

        for (var iii in CityBuilding[0]) {
          if (iii === "id_player")
            continue;
          if (iii === "id_city")
            continue;

          if (CityBuilding[0][iii] === Elkaisar.Config.CITY_BUILDING_WORSHIP)
            TampleLvl = CityBuildingLvl[0][iii];
          if (CityBuilding[0][iii] === Elkaisar.Config.CITY_BUILDING_THEATER)
            TheaterLvl = CityBuildingLvl[0][iii];

          if (CityBuilding[0][iii] != Elkaisar.Config.CITY_BUILDING_COTTAGE)
            continue;

          TotalCap += Elkaisar.Config.CottagePopCap[Math.max(CityBuildingLvl[0][iii] - 1, 1)];
        }
        Elkaisar.DB.Update("lvl = ?", "city_theater", "id_city = ?", [TheaterLvl, idCity]);
        Elkaisar.DB.SelectFrom("pop, pop_cap, taxs, helper", "city", "id_city = ?", [idCity], function (City) {

          if (City[0].helper === Elkaisar.Config.CITY_HELPER_POP)
            Elkaisar.DB.Update("pop_cap = ?, pop_max = ?", "city", "id_city = ?", [TotalCap + (TotalCap * 0.02 * TampleLvl), Math.ceil((TotalCap + TotalCap * 0.02 * TampleLvl) - ((City[0]["taxs"] * TotalCap) / 100)), idCity]);
          else
            Elkaisar.DB.Update("pop_cap = ?, pop_max = ?", "city", "id_city = ?", [TotalCap, Math.ceil(TotalCap - ((City[0]["taxs"] * TotalCap) / 100)), idCity]);

        });

      });
    });

  }


  static refreshStoreCap(idCity, callBack) {

    Elkaisar.DB.SelectFrom("*", "city_building", "id_city = ?", [idCity], function (CityBuilding) {
      Elkaisar.DB.SelectFrom("*", "city_building_lvl", "id_city = ?", [idCity], function (CityBuildingLvl) {
        var TotalCap = 0;
        for (var iii in CityBuilding[0]) {

          if (CityBuilding[0][iii] !== Elkaisar.Config.CITY_BUILDING_STORE)
            continue;
          if (iii === "id_player")
            continue;
          if (iii === "id_city")
            continue;
          TotalCap = Elkaisar.Config.StorageCap[CityBuildingLvl[0][iii] - 1];
        }

        if (callBack)
          callBack(TotalCap);
        Elkaisar.DB.Update("total_cap = ?", "city_storage", "id_city = ?", [TotalCap, idCity]);
      });
    });
  }

  static async heroCityCanFight(idCity) {

    const CityCount = await Elkaisar.DB.ASelectFrom("id_hero", "battel_member", "id_city = ?", [idCity]);
    const OutHero = await Elkaisar.DB.ASelectFrom("hero_back.id_hero", "hero_back", "id_hero IN (SELECT id_hero FROM hero WHERE id_city = ?)", [idCity]);
    const BlazaBuilding = await Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, Elkaisar.Config.CITY_BUILDING_HOSPITAL);

    if (CityCount.length + OutHero.length >= Math.min(BlazaBuilding.Lvl, 20)) {
      console.log(`Hero City Error Mor Hero Count `, idCity);
      return false;

    }


    return true;

  }

  static async isResourceEnough(ReqRes, idPlayer, idCity) {
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    const CityRes = await Elkaisar.DB.ASelectFrom(Object.keys(ReqRes).join(","), "city", "id_city = ? AND id_player = ?", [idCity, idPlayer]);
    if (!CityRes.length)
      return false;
    for (var iii in ReqRes) {
      if (CityRes[0][iii] < ReqRes[iii] || ReqRes[iii] < 0)
        return false;
    }
    return true;
  }

  static async isResourceTaken(Resource, idPlayer, idCity) {
    if(!await LCity.isResourceEnough(Resource, idPlayer, idCity))
      return false;
    await Elkaisar.DB.AUpdate(Object.keys(Resource).map(e => "`" + e + "` = `" + e + "` - " + Resource[e]).join(", "), "city", "id_city = ? AND id_player = ?", [idCity, idPlayer]);
    return true;
  }

  static async addResource(gainRes, idPlayer,idCity)
  {
    await Elkaisar.DB.AUpdate(
      Object.keys(gainRes).map(e => "`" + e + "` = `" + e + "` + " + gainRes[e]).join(", "),
      "city", "id_city = ? AND id_player = ?", [idCity, idPlayer]);
    return true;
  }

}


module.exports = LCity;


