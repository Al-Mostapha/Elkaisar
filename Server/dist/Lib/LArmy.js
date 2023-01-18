"use strict";
class LArmy {
    static prepareHeroBattel(Hero) {
        var Index = -1;
        for (var jjj in Hero.type) {
            Index++;
            if (Hero.type[jjj] === 0)
                continue;
            Hero.real_eff[Index].attack = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].attack;
            Hero.real_eff[Index].def = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].def;
            Hero.real_eff[Index].vit = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].vit;
            Hero.real_eff[Index].dam = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].dam;
            Hero.real_eff[Index].break = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].break;
            Hero.real_eff[Index].anti_break = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].anti_break;
            Hero.real_eff[Index].strike = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].strike;
            Hero.real_eff[Index].immunity = Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]].immunity;
            Hero.real_eff[Index].unit = Hero.pre[jjj];
            Hero.real_eff[Index].armyType = Hero.type[jjj];
            Hero.resource_capacity += Elkaisar.Config.CArmy.ArmyPower[Hero.type[jjj]]["res_cap"] * Hero.pre[jjj];
        }
        return Hero;
    }
    static deathFactor($unitType) {
        if (Elkaisar.Lib.LWorldUnit.isBarrary($unitType) || Elkaisar.Lib.LWorldUnit.isArenaDeath($unitType))
            return 1;
        if (Elkaisar.Lib.LWorldUnit.isArmyCapital($unitType))
            return 0;
        if (Elkaisar.Lib.LWorldUnit.isAsianSquads($unitType)
            || Elkaisar.Lib.LWorldUnit.isCarthagianArmies($unitType)
            || Elkaisar.Lib.LWorldUnit.isStatueWalf($unitType)
            || Elkaisar.Lib.LWorldUnit.isRepelCastle($unitType)
            || Elkaisar.Lib.LWorldUnit.isStatueWar($unitType))
            return 0.2;
        if (Elkaisar.Lib.LWorldUnit.isCamp($unitType) || Elkaisar.Lib.LWorldUnit.isQueenCity($unitType) || Elkaisar.Lib.LWorldUnit.isSeaCity($unitType))
            return 0.1;
        if (Elkaisar.Lib.LWorldUnit.isMonawrat($unitType)
            || Elkaisar.Lib.LWorldUnit.isGangStar($unitType)
            || Elkaisar.Lib.LWorldUnit.isArenaChallange($unitType)
            || Elkaisar.Lib.LWorldUnit.isArenaGuild($unitType))
            return 0;
        else
            return 1;
        return 1;
    }
    static killHeroArmy(Hero, Battel) {
        if (Battel.Battel.task === Elkaisar.Config.BATTEL_TASK_CHALLANGE)
            return;
        var Unit = Elkaisar.World.getUnit(Battel.Battel.x_coord, Battel.Battel.y_coord);
        var factor = LArmy.deathFactor(Unit.ut);
        if (factor <= 0 || Hero["id_player"] <= 0)
            return;
        var medical_status_effect = Battel.Players[Hero["id_player"]].State.medical;
        var loseRatio = medical_status_effect > Date.now() / 1000 ? 0.6 : 0.1;
        var RemainType = {};
        var cityWound = [0, 0, 0, 0, 0, 0, 0];
        var amount = 0;
        Elkaisar.DB.SelectFrom("*", "hero_army", "id_hero = ?", [Hero["id_hero"]], function (OneHeroNew) {
            if (!OneHeroNew[0])
                return console("Error 1231", Hero);
            for (var Place of ["f_1", "f_2", "f_3", "b_1", "b_2", "b_3"]) {
                cityWound[OneHeroNew[0][Place + "_type"]] += Hero["post"][Place] * factor * loseRatio;
            }
            var Query = `
                    f_1_num  = ${Math.max(OneHeroNew[0].f_1_num - Math.ceil(Hero["post"]["f_1"] * factor), 0)}, f_1_type =  ${(OneHeroNew[0].f_1_num - Math.ceil(Hero["post"]["f_1"] * factor)) > 0 ? OneHeroNew[0].f_1_type : 0}, 
                    f_2_num  = ${Math.max(OneHeroNew[0].f_2_num - Math.ceil(Hero["post"]["f_2"] * factor), 0)}, f_2_type =  ${(OneHeroNew[0].f_2_num - Math.ceil(Hero["post"]["f_2"] * factor)) > 0 ? OneHeroNew[0].f_2_type : 0}, 
                    f_3_num  = ${Math.max(OneHeroNew[0].f_3_num - Math.ceil(Hero["post"]["f_3"] * factor), 0)}, f_3_type =  ${(OneHeroNew[0].f_3_num - Math.ceil(Hero["post"]["f_3"] * factor)) > 0 ? OneHeroNew[0].f_3_type : 0},  
                    b_1_num  = ${Math.max(OneHeroNew[0].b_1_num - Math.ceil(Hero["post"]["b_1"] * factor), 0)}, b_1_type =  ${(OneHeroNew[0].b_1_num - Math.ceil(Hero["post"]["b_1"] * factor)) > 0 ? OneHeroNew[0].b_1_type : 0}, 
                    b_2_num  = ${Math.max(OneHeroNew[0].b_2_num - Math.ceil(Hero["post"]["b_2"] * factor), 0)}, b_2_type =  ${(OneHeroNew[0].b_2_num - Math.ceil(Hero["post"]["b_2"] * factor)) > 0 ? OneHeroNew[0].b_2_type : 0},  
                    b_3_num  = ${Math.max(OneHeroNew[0].b_3_num - Math.ceil(Hero["post"]["b_3"] * factor), 0)}, b_3_type =  ${(OneHeroNew[0].b_3_num - Math.ceil(Hero["post"]["b_3"] * factor)) > 0 ? OneHeroNew[0].b_3_type : 0} `;
            Elkaisar.DB.Update(Query, "hero_army", "id_hero = ?", [Hero["id_hero"]]);
            var Query2 = ` army_a = army_a + ${cityWound[1]} ,army_b = army_b + ${cityWound[2]} ,
                  army_c = army_c + ${cityWound[3]} ,army_d = army_d + ${cityWound[4]} ,
                  army_e = army_e + ${cityWound[5]} ,army_f = army_f + ${cityWound[6]} `;
            Elkaisar.DB.Update(Query2, "city_wounded", "id_city = ?", [Hero["id_city"]]);
        });
        /*var Query = `f_1_num  = GREATEST(f_1_num - ${Hero["post"]["f_1"]*factor}, 0), f_1_type =  SELECT if(f_1_num - ${Hero["post"]["f_1"]*factor} >= 1 , f_1_type, 0),
         f_2_num = ${RemainAmount["f_2"]}, f_2_type = ${RemainType["f_2"]},
         f_3_num = ${RemainAmount["f_3"]}, f_3_type = ${RemainType["f_3"]},
         b_1_num = ${RemainAmount["b_1"]}, b_1_type = ${RemainType["b_1"]},
         b_2_num = ${RemainAmount["b_2"]}, b_2_type = ${RemainType["b_2"]},
         b_3_num = ${RemainAmount["b_3"]}, b_3_type = ${RemainType["b_3"]} `;*/
    }
}
module.exports = LArmy;
