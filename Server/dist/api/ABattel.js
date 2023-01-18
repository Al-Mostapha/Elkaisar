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
class ABattel {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    static MaxJoinNum(type) {
        if (Elkaisar.Lib.LWorldUnit.isCarthasianGang(type)
            || Elkaisar.Lib.LWorldUnit.isCarthageTeams(type)
            || Elkaisar.Lib.LWorldUnit.isCarthageRebals(type)
            || Elkaisar.Lib.LWorldUnit.isArmyCapital(type)
            || Elkaisar.Lib.LWorldUnit.isStatueWalf(type) ||
            Elkaisar.Lib.LWorldUnit.isStatueWar(type)) {
            return 3;
        }
        else if (Elkaisar.Lib.LWorldUnit.isCarthageForces(type) || Elkaisar.Lib.LWorldUnit.isCarthageCapital(type)) {
            return 5;
        }
        else if (Elkaisar.Lib.LWorldUnit.isSeaCity(type))
            return 200;
        else if (Elkaisar.Lib.LWorldUnit.isRepelCastle(type) || Elkaisar.Lib.LWorldUnit.isQueenCity(type))
            return 100;
        return 750;
    }
    reachedLimitHero(Battel, side) {
        return __awaiter(this, void 0, void 0, function* () {
            const countAttack = (yield Elkaisar.DB.ASelectFrom("COUNT(*) AS joiner", "battel_member", "id_battel = ? AND side = ?", [Battel["id_battel"], Elkaisar.Config.BATTEL_SIDE_ATT]))[0]["joiner"];
            const countDef = (yield Elkaisar.DB.ASelectFrom("COUNT(*) AS joiner", "battel_member", "id_battel = ? AND side = ?", [Battel["id_battel"], Elkaisar.Config.BATTEL_SIDE_DEF]))[0]["joiner"];
            if (countAttack >= ABattel.MaxJoinNum(Battel["ut"]) && side == Elkaisar.Config.BATTEL_SIDE_ATT)
                return true;
            else if (countDef >= ABattel.MaxJoinNum(Battel["ut"]) && side == Elkaisar.Config.BATTEL_SIDE_DEF)
                return true;
            return false;
        });
    }
    canPlayerJoinDef(Battel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Elkaisar.Lib.LWorldUnit.isArmyCapital(Battel.ut)) {
                return ELip.LWUArmyCapital.canDefend(this.idPlayer, Battel.x_coord, Battel.y_coord);
            }
            return true;
        });
    }
    canPlayerJoinAttack(Battel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Elkaisar.Lib.LWorldUnit.isArmyCapital(Battel.ut)) {
                return Battel.id_player == this.idPlayer;
            }
            return true;
        });
    }
    joinBattel() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHero = Elkaisar.Base.validateId(this.Parm["idHero"]);
            const side = Elkaisar.Base.validateId(this.Parm["side"]);
            const idBattel = Elkaisar.Base.validateId(this.Parm["idBattel"]);
            const Hero = yield Elkaisar.DB.ASelectFrom("id_city, in_city, id_player, id_hero, power", "hero", "id_hero = ? AND id_player = ?", [idHero, this.idPlayer]);
            const Battel = yield Elkaisar.DB.ASelectFrom("*", "battel JOIN world ON world.x = battel.x_coord AND world.y = battel.y_coord ", "battel.id_battel = ?", [idBattel]);
            if (Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now() / 1000)
                return { "state": "error_1", "T": console.log("Hero Dub Here", this.Parm) };
            else
                Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = Date.now() / 1000 + 120;
            if (!Hero.length)
                return { "state": "error_0", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (Hero[0]["in_city"] != Elkaisar.Config.HERO_IN_CITY)
                return { "state": "error_1", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (!Battel.length)
                return { "state": "error_2", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = Battel[0].time_end;
            if (Elkaisar.Lib.LWorldUnit.limitedHero(Battel[0]["ut"])) {
                if (yield this.reachedLimitHero(Battel[0], side))
                    return { "state": "error_3", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            }
            if (Elkaisar.Lib.LWorldUnit.isGuildWar(Battel[0]["ut"])) {
                if (!(yield Elkaisar.Lib.ALGuild.inSameGuild(this.idPlayer, Battel[0]["id_player"])) && side == Elkaisar.Config.BATTEL_SIDE_ATT)
                    return { "state": "error_5", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
                if (!(yield Elkaisar.Lib.ALGuild.canDefenceGuildWar(this.idPlayer, Battel[0])) && side == Elkaisar.Config.BATTEL_SIDE_DEF)
                    return { "state": "error_5_1", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            }
            if (side == Elkaisar.Config.BATTEL_SIDE_DEF && !this.canPlayerJoinDef(Battel[0]))
                return { "state": "error_8_1", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (side == Elkaisar.Config.BATTEL_SIDE_ATT && !this.canPlayerJoinAttack(Battel[0]))
                return { "state": "error_8_2", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (side == Elkaisar.Config.BATTEL_SIDE_DEF && !Elkaisar.Lib.LWorldUnit.isDefencable(Battel[0]["ut"]))
                return { "state": "error_8", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (!(yield Elkaisar.Lib.LBattelUnit.takeJoinPrice(this.idPlayer, Battel[0]["ut"])))
                return { "state": "error_6", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            const TakenPower = Elkaisar.Lib.LBattelUnit.takeHeroPower(idHero, Battel[0]["ut"]);
            if (TakenPower == false)
                return { "state": "error_7", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            if (!(yield Elkaisar.Lib.LCity.heroCityCanFight(Hero[0].id_city)))
                return { "state": "error_9", "TT": Elkaisar.Lib.LBattel.HeroListInBattel[idHero] = 0 };
            Elkaisar.Lib.LBattelUnit.join(this.idPlayer, Battel[0], Hero[0], side);
            Elkaisar.DB.Update("in_city = ?", "hero", "id_hero = ?", [Elkaisar.Config.HERO_IN_BATTEL, idHero]);
            Elkaisar.Base.sendMsgToPlayer(this.idPlayer, JSON.stringify({
                "classPath": "Hero.Power.Added",
                "Heros": [{ idHero: idHero, power: Hero[0].power - TakenPower }]
            }));
            return {
                "state": "ok",
                "Battel": yield Elkaisar.Lib.LBattelUnit.getBattelById(idBattel)
            };
        });
    }
}
module.exports = ABattel;
