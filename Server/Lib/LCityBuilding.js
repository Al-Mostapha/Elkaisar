//01033488458
class LCityBuilding {

    static async  buildingWithHeighestLvl(idCity, BuildingType){
        
        var buildingLvl = {
                "Place": "",
                "Type":"",
                "Lvl": 0
            };
        let cityBuildingType = (await Elkaisar.DB.ASelectFrom("*", "city_building", "id_city = ? ", [idCity]))[0]; 
        let cityBuildingLvl  = (await Elkaisar.DB.ASelectFrom("*", "city_building_lvl", "id_city = ?", [idCity]))[0]; 
        
       
        delete(cityBuildingType["id_city"]);
        delete(cityBuildingType["id_playe"]);
        
        for(var onePlace in cityBuildingType){
            let oneType = cityBuildingType[onePlace];
            if(oneType != BuildingType)
            continue;
            if(buildingLvl["Lvl"] < cityBuildingLvl[onePlace])
               buildingLvl = {
                        "Place" : onePlace,
                        "Type": oneType,
                        "Lvl" : Number(cityBuildingLvl[onePlace])
                    };
        }
        
        return buildingLvl;
        
    }

    static async getBuildingAtPlace(buildingPlace, idPlayer, idCity)
    {
      if(!buildingPlace.length || buildingPlace == false || buildingPlace == "false")
          return {"Type": 0, "Lvl": 0, "Place": buildingPlace};
      const building = await Elkaisar.DB.ASelectFrom(
        "city_building.`"+buildingPlace+"` AS Type, city_building_lvl.`"+buildingPlace+"` AS Lvl",
        "city_building JOIN city_building_lvl ON city_building.id_city = city_building_lvl.id_city",
        "city_building.id_city = ? AND city_building.id_player = ?",
        [idCity, idPlayer]);
      if(building.length == 0)
          return {"Type": 0, "Lvl": 0, "Place": buildingPlace};
      building[0]["Place"] = buildingPlace;
      return building[0];
    }

    static async getTempleEffectRateOnArmy(idPlayer, idCity, worshipPlace){
      const cityHelp = await Elkaisar.DB.ASelectFrom("helper", "city", "id_city = ? And id_player = ?", [idCity, idPlayer]);
      if(cityHelp.length == 0)
          return 0;
      else if(cityHelp[0]["helper"] != Elkaisar.Config.CITY_HELPER_ARMY)
          return 0;
      
      const cityHelperBuilding = await LCityBuilding.getBuildingAtPlace(worshipPlace, idPlayer, idCity);
      if(cityHelperBuilding["Type"] != Elkaisar.Config.CITY_BUILDING_WORSHIP)
          return 0;
      return cityHelperBuilding["Lvl"]*Elkaisar.Config.ARMY_TRAIN_TEMPLE_T_FAC/100;
    }

    static async canBuildArmy(idPlayer, idCity, armyType){
      
      const cityBuildingType = (await Elkaisar.DB.ASelectFrom("*", "city_building", "id_city = ? AND id_player = ?", [idCity, idPlayer]))[0];
      const cityBuildingLvl  = (await Elkaisar.DB.ASelectFrom("*", "city_building_lvl", "id_city = ? AND id_player = ?", [idCity, idPlayer]))[0];
      delete cityBuildingType["id_city"];
      delete cityBuildingType["id_player"];

      let buildingList = [];
      for(var onePlace in cityBuildingType){
        let oneType = cityBuildingType[onePlace];
        if(oneType != Elkaisar.Config.CArmy.BuildingTypeForArmy[armyType])
            continue;
        if(cityBuildingLvl[onePlace] < Elkaisar.Config.CArmy.BuildingMinLvlReq[armyType])
            continue;
        
        let countOfBatchs = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "build_army", "id_city = ? AND id_player = ? AND place = ?", [idCity, idPlayer, onePlace]))[0]["c"];
        
        if(countOfBatchs >= Math.min(cityBuildingLvl[onePlace], Elkaisar.Config.ARMY_MAX_NUM_BATCH))
            continue;
        
        buildingList.push({
            "Place" : onePlace,
            "Type": oneType,
            "Lvl" : cityBuildingLvl[onePlace]
        });
      }
      return buildingList;
    }

}


module.exports = LCityBuilding;


