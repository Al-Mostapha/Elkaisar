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
class AHeroArmy {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    transArmyFromHeroToCity() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
            const ArmyPlace = Elkaisar.Base.validateGameNames(this.Parm["ArmyPlace"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const Hero = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero Join hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);
            if (!Array.isArray(Hero) || Hero.length < 1)
                return { "state": "error_0" };
            if (!Hero[0][`${ArmyPlace}_num`])
                return { "state": "error_1" };
            if (Hero[0][`${ArmyPlace}_type`] < 1 || Hero[0][`${ArmyPlace}_type`] > 6)
                return { "state": "error_2" };
            if (Number(amount) && amount <= 0)
                return { "state": "error_3" };
            if (Hero[0][`${ArmyPlace}_num`] < amount)
                return { "state": "error_4" };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
                return { "state": "error_5", "Console": Console.log("Doublicate Hero", idHero) };
            const CityType = Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0][`${ArmyPlace}_type`]];
            yield Elkaisar.DB.AUpdate("`" + CityType + "` = `" + CityType + "` + ?", "city", "id_city = ? AND id_player = ?", [amount, Hero[0]["id_city"], this.idPlayer]);
            if (Hero[0][`${ArmyPlace}_num`] <= amount)
                yield Elkaisar.DB.AUpdate("`" + ArmyPlace + "_type` = 0, `" + ArmyPlace + "_num` = 0", "hero_army", "id_hero = ?", [idHero]);
            else
                yield Elkaisar.DB.AUpdate("`" + ArmyPlace + "_num` = `" + ArmyPlace + "_num` - ?", "hero_army", "id_hero = ?", [amount, idHero]);
            Elkaisar.Lib.LSaveState.saveCityState(Hero[0]["id_city"]);
            return {
                "state": "ok",
                "HeroArmy": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHero]))[0],
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
            };
        });
    }
    transArmyFromCityToHero() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
            const ArmyPlace = Elkaisar.Base.validateGameNames(this.Parm["ArmyPlace"]);
            const ArmyType = Elkaisar.Base.validateGameNames(this.Parm["ArmyType"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const Hero = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero Join hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);
            const CityArmy = (yield (Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]])))[0][ArmyType];
            const EmptyPlaces = yield Elkaisar.Lib.LHeroArmy.emptyPlacesSize(this.idPlayer, idHero);
            const OnArmyUnitSize = Elkaisar.Config.CArmy.ArmyCap[Elkaisar.Config.CArmy.ArmyCityToArmyHero[ArmyType]];
            const HeroArmyType = Elkaisar.Config.CArmy.ArmyCityToArmyHero[ArmyType];
            if (!Array.isArray(Hero) || Hero.length < 1)
                return { "state": "error_0" };
            if (!Hero[0].hasOwnProperty(`${ArmyPlace}_num`))
                return { "state": "error_1" };
            if (Hero[0][`${ArmyPlace}_type`] != 0 && ArmyType != Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0][`${ArmyPlace}_type`]] || !HeroArmyType)
                return { "state": "error_2", "t": console.log("Army Type Error", this.Parm) };
            if (Hero[0][`${ArmyPlace}_type`] == 0 && Hero[0][`${ArmyPlace}_num`] > 0)
                return { "state": "error_2", "t": console.log("Bug Found 12", this.Parm) };
            if (Number(amount) && amount <= 0)
                return { "state": "error_3" };
            if (EmptyPlaces < amount * OnArmyUnitSize)
                return { "state": "error_4" };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
                return { "state": "error_5", "Console": Console.log("Doublicate Hero", idHero) };
            if (CityArmy < amount)
                return { "state": "error_6" };
            yield Elkaisar.DB.AUpdate(`${ArmyType} = ${ArmyType} - ?`, "city", "id_city = ? AND id_player = ?", [amount, Hero[0]["id_city"], this.idPlayer]);
            yield Elkaisar.DB.AUpdate(`${ArmyPlace}_type = ?, ${ArmyPlace}_num = ${ArmyPlace}_num + ?`, "hero_army", "id_hero = ? ", [Elkaisar.Config.CArmy.ArmyCityToArmyHero[ArmyType], amount, idHero]);
            Elkaisar.Lib.LSaveState.saveCityState(Hero[0]["id_city"]);
            return {
                "state": "ok",
                "HeroArmy": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHero]))[0],
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
            };
        });
    }
    transArmyFromHeroToHero() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHeroFrom = Elkaisar.Base.validateId(this.Parm["idHeroFrom"]);
            const idHeroTo = Elkaisar.Base.validateId(this.Parm["idHeroTo"]);
            const ArmyPlaceTo = Elkaisar.Base.validateGameNames(this.Parm["ArmyPlaceTo"]);
            const ArmyPlaceFrom = Elkaisar.Base.validateGameNames(this.Parm["ArmyPlaceFrom"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const HeroFrom = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero JOIN hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHeroFrom, this.idPlayer]);
            const HeroTo = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero JOIN hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHeroTo, this.idPlayer]);
            if (!Array.isArray(HeroFrom) || !Array.isArray(HeroTo) || HeroTo.length < 1 || HeroFrom.length < 1)
                return { "state": "error_0" };
            if (!HeroTo[0].hasOwnProperty(ArmyPlaceTo + "_num") || !HeroFrom[0].hasOwnProperty(ArmyPlaceFrom + "_num"))
                return { "state": "error_1" };
            if (HeroTo[0][(ArmyPlaceTo + "_type")] != 0 && HeroFrom[0][(ArmyPlaceFrom + "_type")] != HeroTo[0][(ArmyPlaceTo + "_type")])
                return { "state": "error_2" };
            if (amount <= 0 || amount > HeroFrom[0][(ArmyPlaceFrom + "_num")] || HeroFrom[0][(ArmyPlaceFrom + "_type")] == 0)
                return { "state": "error_3" };
            if ((yield Elkaisar.Lib.LHeroArmy.emptyPlacesSize(this.idPlayer, idHeroTo)) < amount * Elkaisar.Config.CArmy.ArmyCap[HeroFrom[0][(ArmyPlaceFrom + "_type")]])
                return { "state": "error_4" };
            if (HeroFrom[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHeroFrom] > Date.now() / 1000)
                return { "state": "error_5", "Console": Console.log("Doublicate Hero From", idHeroFrom) };
            if (HeroTo[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHeroTo] > Date.now() / 1000)
                return { "state": "error_5", "Console": Console.log("Doublicate Hero To", idHeroTo) };
            if (HeroFrom[0]["id_city"] != HeroTo[0]["id_city"])
                return { "state": "error_6" };
            if (HeroFrom[0][`${ArmyPlaceFrom}_type`] == 0 && HeroFrom[0][`${ArmyPlaceFrom}_num`] > 0)
                return { "state": "error_2", "t": console.log("Bug Found 1200", this.Parm) };
            if (HeroTo[0][`${ArmyPlaceTo}_type`] == 0 && HeroTo[0][`${ArmyPlaceTo}_num`] > 0)
                return { "state": "error_2", "t": console.log("Bug Found 1201", this.Parm) };
            if (HeroFrom[0][(ArmyPlaceFrom + "_num")] == amount)
                yield Elkaisar.DB.AUpdate("`" + ArmyPlaceFrom + "_type` = ?, `" + ArmyPlaceFrom + "_num` = `" + ArmyPlaceFrom + "_num` - ?", "hero_army", "id_hero = ?", [0, amount, idHeroFrom]);
            else
                yield Elkaisar.DB.AUpdate("`" + ArmyPlaceFrom + "_type` = ?, `" + ArmyPlaceFrom + "_num` = `" + ArmyPlaceFrom + "_num` - ?", "hero_army", "id_hero = ?", [HeroFrom[0][(ArmyPlaceFrom + "_type")], amount, idHeroFrom]);
            yield Elkaisar.DB.AUpdate("`" + ArmyPlaceTo + "_type`   = ?, `" + ArmyPlaceTo + "_num`   = `" + ArmyPlaceTo + "_num`   + ?", "hero_army", "id_hero = ?", [HeroFrom[0][(ArmyPlaceFrom + "_type")], amount, idHeroTo]);
            return {
                "state": "ok",
                "HeroArmyFrom": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHeroFrom]))[0],
                "HeroArmyTo": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHeroTo]))[0]
            };
        });
    }
    swapHeroArmy() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHeroLeft = Elkaisar.Base.validateId(this.Parm["idHeroLeft"]);
            const idHeroRight = Elkaisar.Base.validateId(this.Parm["idHeroRight"]);
            const HeroLeft = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero JOIN hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHeroLeft, this.idPlayer]);
            const HeroRight = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero JOIN hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHeroRight, this.idPlayer]);
            const HeroLeftCap = yield Elkaisar.Lib.LHeroArmy.heroFullCap(this.idPlayer, idHeroLeft);
            const HeroLeftFill = yield Elkaisar.Lib.LHeroArmy.filledPlacesSize(idHeroLeft);
            const HeroRightCap = yield Elkaisar.Lib.LHeroArmy.heroFullCap(this.idPlayer, idHeroRight);
            const HeroRightfill = yield Elkaisar.Lib.LHeroArmy.filledPlacesSize(idHeroRight);
            if (!HeroLeft.length || !HeroRight.length)
                return { "state": "error_0" };
            if (HeroLeftCap < HeroRightfill || HeroRightCap < HeroLeftFill)
                return { "state": "error_1" };
            if (HeroRight[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHeroRight] > Date.now() / 1000)
                return { "state": "error_2", "Console": Console.log("Doublicate Hero Right", idHeroRight) };
            if (HeroLeft[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHeroLeft] > Date.now() / 1000)
                return { "state": "error_2", "Console": Console.log("Doublicate Hero Left", idHeroRight) };
            const quary_1 = `f_1_type = ${HeroLeft[0]["f_1_type"]} , f_1_num = ${HeroLeft[0]["f_1_num"]},
                    f_2_type = ${HeroLeft[0]["f_2_type"]} , f_2_num = ${HeroLeft[0]["f_2_num"]},
                    f_3_type = ${HeroLeft[0]["f_3_type"]} , f_3_num = ${HeroLeft[0]["f_3_num"]}, 
                    b_1_type = ${HeroLeft[0]["b_1_type"]} , b_1_num = ${HeroLeft[0]["b_1_num"]}, 
                    b_2_type = ${HeroLeft[0]["b_2_type"]} , b_2_num = ${HeroLeft[0]["b_2_num"]}, 
                    b_3_type = ${HeroLeft[0]["b_3_type"]} , b_3_num = ${HeroLeft[0]["b_3_num"]}`;
            const quary_2 = `f_1_type = ${HeroRight[0]["f_1_type"]} , f_1_num = ${HeroRight[0]["f_1_num"]}, 
                    f_2_type = ${HeroRight[0]["f_2_type"]} , f_2_num = ${HeroRight[0]["f_2_num"]}, 
                    f_3_type = ${HeroRight[0]["f_3_type"]} , f_3_num = ${HeroRight[0]["f_3_num"]}, 
                    b_1_type = ${HeroRight[0]["b_1_type"]} , b_1_num = ${HeroRight[0]["b_1_num"]}, 
                    b_2_type = ${HeroRight[0]["b_2_type"]} , b_2_num = ${HeroRight[0]["b_2_num"]}, 
                    b_3_type = ${HeroRight[0]["b_3_type"]} , b_3_num = ${HeroRight[0]["b_3_num"]}`;
            yield Elkaisar.DB.AUpdate(quary_2, "hero_army", "id_hero = ? AND id_player = ?", [idHeroLeft, this.idPlayer]);
            yield Elkaisar.DB.AUpdate(quary_1, "hero_army", "id_hero = ? AND id_player = ?", [idHeroRight, this.idPlayer]);
            return {
                "state": "ok",
                "HeroArmyLeft": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHeroLeft]))[0],
                "HeroArmyRight": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHeroRight]))[0]
            };
        });
    }
    clearHeroArmy() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
            const Hero = yield Elkaisar.DB.ASelectFrom("hero.id_city, hero.in_city, hero_army.*", "hero Join hero_army ON hero.id_hero = hero_army.id_hero", "hero.id_hero = ? AND hero.id_player = ?", [idHero, this.idPlayer]);
            if (Hero.length <= 0)
                return { "state": "error_0" };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
                return { "state": "error_1", "Console": Console.log("Doublicate Hero Clear", idHero) };
            let cityArmy = { 0: 0, "army_a": 0, "army_b": 0, "army_c": 0, "army_d": 0, "army_e": 0, "army_f": 0 };
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["f_2_type"]]] += Hero[0]["f_2_num"];
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["f_3_type"]]] += Hero[0]["f_3_num"];
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["f_1_type"]]] += Hero[0]["f_1_num"];
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["b_1_type"]]] += Hero[0]["b_1_num"];
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["b_2_type"]]] += Hero[0]["b_2_num"];
            cityArmy[Elkaisar.Config.CArmy.ArmyCityPlace[Hero[0]["b_3_type"]]] += Hero[0]["b_3_num"];
            yield Elkaisar.DB.AUpdate(`army_a = army_a + ?, army_b = army_b + ?, army_c = army_c + ?, army_d = army_d + ?, 
                army_e = army_e + ?, army_f = army_f + ?`, "city", "id_city = ?", [
                cityArmy["army_a"], cityArmy["army_b"], cityArmy["army_c"], cityArmy["army_d"],
                cityArmy["army_e"], cityArmy["army_f"], Hero[0]["id_city"]
            ]);
            yield Elkaisar.DB.AUpdate(`f_1_type = 0, f_1_num = 0, f_2_type = 0, f_2_num = 0, 
                f_3_type = 0, f_3_num = 0, b_1_type = 0, b_1_num = 0, 
                b_2_type = 0, b_2_num = 0, b_3_type = 0, b_3_num = 0`, "hero_army", "id_hero = ?", [idHero]);
            Elkaisar.Lib.LSaveState.saveCityState(Hero[0]["id_city"]);
            return {
                "state": "ok",
                "HeroArmy": (yield Elkaisar.DB.ASelectFrom("*", "hero_army", "id_hero = ?", [idHero]))[0],
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Hero[0]["id_city"]]))[0]
            };
        });
    }
}
module.exports = AHeroArmy;
