"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//01033488458
class LCityBuilding {
    static buildingWithHeighestLvl(idCity, BuildingType) {
        return __awaiter(this, void 0, void 0, function* () {
            var buildingLvl = {
                "Place": "",
                "Type": "",
                "Lvl": 0
            };
            let cityBuildingType = (yield Elkaisar.DB.ASelectFrom("*", "city_building", "id_city = ? ", [idCity]))[0];
            let cityBuildingLvl = (yield Elkaisar.DB.ASelectFrom("*", "city_building_lvl", "id_city = ?", [idCity]))[0];
            delete (cityBuildingType["id_city"]);
            delete (cityBuildingType["id_playe"]);
            for (var onePlace in cityBuildingType) {
                let oneType = cityBuildingType[onePlace];
                if (oneType != BuildingType)
                    continue;
                if (buildingLvl["Lvl"] < cityBuildingLvl[onePlace])
                    buildingLvl = {
                        "Place": onePlace,
                        "Type": oneType,
                        "Lvl": Number(cityBuildingLvl[onePlace])
                    };
            }
            return buildingLvl;
        });
    }
}
module.exports = LCityBuilding;
