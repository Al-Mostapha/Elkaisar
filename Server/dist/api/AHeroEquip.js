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
class AHeroEquip {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    putEquipOnHero() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
            const idEquip = Elkaisar.Base.validateGameNames(this.Parm["idEquip"]);
            const Equip = yield Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ? AND id_player = ?", [idEquip, this.idPlayer]);
            const Hero = yield Elkaisar.DB.ASelectFrom("in_city", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
            if (!Equip.length)
                return { state: "error_0" };
            if (!Hero.length)
                return { state: "error_1" };
            if (Equip[0]["id_hero"] > 0)
                return { state: "error_2", "idHero": Equip[0]["id_hero"] };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
                return { "state": "error_3", "Console": Console.log("Doublicate Hero Equip On", idHero) };
            yield Elkaisar.DB.AUpdate("id_hero = NULL, on_hero = 0", "equip", "id_hero = ? AND part = ?", [idHero, Equip[0]["part"]]);
            yield Elkaisar.DB.AUpdate("id_hero = ?, on_hero = 1", "equip", "id_equip = ?", [idHero, Equip[0]["id_equip"]]);
            return {
                "state": "ok",
                "PlayerEquip": yield Elkaisar.DB.ASelectFrom("id_equip, on_hero, id_hero", "equip", "id_player = ?", [this.idPlayer])
            };
        });
    }
    putEquipOffHero() {
        return __awaiter(this, void 0, void 0, function* () {
            const idEquip = Elkaisar.Base.validateId(this.Parm["idEquip"]);
            const Equip = yield Elkaisar.DB.ASelectFrom("*", "equip", "id_equip = ? AND id_player = ?", [idEquip, this.idPlayer]);
            if (!Equip.length)
                return { state: "error_0" };
            const Hero = yield Elkaisar.DB.ASelectFrom("in_city", "hero", "id_hero = ? AND id_player = ?", [Equip[0]["id_hero"], this.idPlayer]);
            if (!Hero.length)
                return { state: "error_1" };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY || Elkaisar.Lib.LBattel.HeroListInBattel[Equip[0]["id_hero"]] > Date.now() / 1000)
                return { "state": "error_2", "Console": Console.log("Doublicate Hero Equip Off", Equip) };
            yield Elkaisar.DB.AUpdate("id_hero = NULL, on_hero = 0", "equip", "id_equip = ?", [idEquip]);
            return {
                "state": "ok",
                "PlayerEquip": yield Elkaisar.DB.ASelectFrom("id_equip, on_hero, id_hero", "equip", "id_player = ?", [this.idPlayer])
            };
        });
    }
}
module.exports = AHeroEquip;
