class LHero {

  static async addNew(idPlayer, idCity, lvl, avatar, name, ultraPoint) {

    ultraPoint = ultraPoint || 0;
    const Points = LHero.pointsForLvl(lvl);
    const lastOrder = await Elkaisar.DB.ASelectFrom("ord", "hero", "id_city = ? ORDER BY ord DESC LIMIT 1", [idCity]);
    const power = Math.min(150, 50 + lvl);
    const ord = lastOrder.length > 0 ? lastOrder[0].ord + 1 : 0;
    const idHero = await LHero.getNewHeroId(idPlayer);
    if (!idHero) return false;

    await Elkaisar.DB.AInsert("id_hero = ?, name = ? , lvl = ? ,  avatar = ? , power = ? , id_city = ? , id_player = ? ,"
      + "point_a = ? , point_b = ? , point_c = ? , cap = ? , ultra_p = ? , ord = ? , p_b_a = ? , p_b_b = ? ,"
      + " p_b_c = ? , b_lvl = ? , power_max = ?", "hero",
      [idHero, name, lvl, avatar, power, idCity, idPlayer, Points.pointA, Points.pointB, Points.pointC,
        Points.cap, ultraPoint, ord, Points.pba, Points.pbb, Points.pbc, lvl, power]);

    await Elkaisar.DB.AInsert("id_hero = ?, id_player = ?", "hero_army", [idHero, idPlayer]);
    await Elkaisar.DB.AInsert("id_hero = ?", "hero_medal", [idHero]);
    Elkaisar.DB.AUpdate("hero_num  = hero_num  + 1", "server_data", "id = 1");
    return true;
  }

  static pointsForLvl(lvl) {
    let points = {};
    points["pba"] = Elkaisar.Base.rand(0, 25);
    points["pbb"] = Elkaisar.Base.rand(0, 25);
    let pointsSum = Elkaisar.Base.rand(50, 60);
    points["pbc"] = pointsSum - (points["pba"] + points["pbb"]);
    points["pointA"] = points["pba"] + (lvl * 1);
    points["pointB"] = points["pbb"] + (lvl * 1);
    points["pointC"] = points["pbc"] + (lvl * 1);
    points["cap"] = 30000 + points["pointA"] * 500;
    return points;
  }

  static async getNewHeroId(idPlayer) {
    
    const HeroCount = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "hero", "id_player = ?", [idPlayer]))[0].c;
    const idHero = (idPlayer - 1) * 1000 + HeroCount + 1;
    if (HeroCount == 0)
      return idHero;
    const LastHeroId = (await Elkaisar.DB.ASelectFrom("id_hero", "hero", "id_player = ? ORDER BY id_hero DESC LIMIT 1", [idPlayer]))[0].id_hero;
    if (LastHeroId >= idHero) {
      const idHeroGap = (await Elkaisar.DB.AQueryExc(`SELECT 
              id_hero + 1 AS idHero
              FROM hero mo WHERE
                      NOT EXISTS ( SELECT NULL FROM hero mi WHERE mi.id_hero = mo.id_hero + 1 ) 
                  AND id_player = ?
                  ORDER BY id_hero  LIMIT 1`, [idPlayer]))[0]["idHero"]
      if (idHeroGap > (idPlayer - 1) * 1000 && idHeroGap < (idPlayer) * 1000)
        return idHeroGap;
    }
    return Math.max(idHero, LastHeroId + 1);
  }

  static prepareHeroEquipPower(Hero, Battel) {
    var Unit = Elkaisar.World.getUnit(Battel.Battel.x_coord, Battel.Battel.y_coord);

    if (!Elkaisar.Lib.LWorldUnit.isEquipEfeective(Unit.ut))
      return Hero;


    for (var iii in Hero.Equip) {

      if (Hero.Equip[iii].id_equip && Battel.EquipList[Hero.Equip[iii].id_equip]) {
        console.log(Date() + "Equip Battel Duplicated");
        console.log(Hero.Equip[iii].id_equip);
        return Hero;
      }
      Battel.EquipList[Hero.Equip[iii].id_equip] = true;


      Hero.Equip[iii].lvl = Math.max(Hero.Equip[iii].lvl, 1);
      var EquipEff = Elkaisar.Equip.EquipPower[`${Hero.Equip[iii].type}.${Hero.Equip[iii].part}.${Hero.Equip[iii].lvl}`];
      Hero.EquipSpAt[EquipEff.sp_attr] = true;
      for (var ii in Hero.real_eff) {
        let lArmyType = Hero.real_eff[ii].armyType;
        Hero.real_eff[ii].attack     += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].attack * EquipEff.attack;
        Hero.real_eff[ii].def        += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].def * EquipEff.defence;
        Hero.real_eff[ii].vit        += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].vit * EquipEff.vitality;
        Hero.real_eff[ii].dam        += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].dam * EquipEff.damage;
        Hero.real_eff[ii].break      += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].break * EquipEff.break;
        Hero.real_eff[ii].anti_break += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].anti_break * EquipEff.anti_break;
        Hero.real_eff[ii].strike     += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].strike * EquipEff.strike;
        Hero.real_eff[ii].immunity   += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].immunity * EquipEff.immunity;
      }


    }
    return Hero;
  }

  static studyEffectOnForces(armyType, Study) {
    if (armyType === Elkaisar.Config.ARMY_A || armyType === Elkaisar.Config.ARMY_C || armyType === Elkaisar.Config.ARMY_D) {
      return 0.03 * Study["infantry"];
    }
    if (armyType === Elkaisar.Config.ARMY_B) {
      return 0.03 * Study["riding"];
    }
    if (armyType === Elkaisar.Config.ARMY_E || armyType === Elkaisar.Config.ARMY_F) {
      return 0.03 * Study["army"];
    }
    return 0;
  }

  static prepareHeroPowerBattel(Hero, Battel) {
    if (Hero.id_player <= 0)
      return Hero;
    if (!Battel.Players)
      return Hero;
    if (!Battel.Players[Hero.id_player])
      return Hero;
    var BattelPlayer = Battel.Players[Hero.id_player];

    if (!BattelPlayer.Study || !BattelPlayer.State || !BattelPlayer.GodGate)
      return Hero;

    var attackPercent = 0;
    var defencePercent = 0;

    if (Battel.Players[Hero.id_player].State && Battel.Players[Hero.id_player].State.attack_10 > Date.now() / 1000)
      attackPercent = 0.1;
    if (Battel.Players[Hero.id_player].State && Battel.Players[Hero.id_player].State.defence_10 > Date.now() / 1000)
      defencePercent = 0.1;

    for (var iii in Hero.real_eff) {
      let lArmyType = Hero.real_eff[iii].armyType;
      Hero.real_eff[iii].attack += Hero.point_atk;
      Hero.real_eff[iii].attack += Hero.real_eff[iii].attack * LHero.studyEffectOnForces(Hero.real_eff[iii].armyType, Battel.Players[Hero.id_player].Study) || 0;
      if (!LHero.studyEffectOnForces(Hero.real_eff[iii].armyType, Battel.Players[Hero.id_player].Study) && LHero.studyEffectOnForces(Hero.real_eff[iii].armyType, Battel.Players[Hero.id_player].Study) != 0)
        console.log("Error Player Study", Battel.Players[Hero.id_player]);

      Hero.real_eff[iii].attack += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].attack * Battel.Players[Hero.id_player].GodGate.attack || 0;
      Hero.real_eff[iii].attack += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].attack * attackPercent * Hero.real_eff[iii].attack || 0;

      Hero.real_eff[iii].def += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].def * Hero.point_def;
      Hero.real_eff[iii].def += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].def * Hero.real_eff[iii].def * Battel.Players[Hero.id_player].Study.safe * 0.03 || 0;
      Hero.real_eff[iii].def += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].def * Battel.Players[Hero.id_player].GodGate.defence || 0;
      Hero.real_eff[iii].def += defencePercent * Hero.real_eff[iii].def;
      
      Hero.real_eff[iii].vit += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].vit * Hero.real_eff[iii].vit * Battel.Players[Hero.id_player].Study.medicine * 0.03 || 0;
      Hero.real_eff[iii].vit += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].vit * Battel.Players[Hero.id_player].GodGate.vit || 0;

      Hero.real_eff[iii].dam        += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].dam * Battel.Players[Hero.id_player].GodGate.damage || 0;
      Hero.real_eff[iii].break      += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].break * Battel.Players[Hero.id_player].GodGate.break || 0;
      Hero.real_eff[iii].anti_break += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].anti_break * Battel.Players[Hero.id_player].GodGate.anti_break || 0;
      Hero.real_eff[iii].strike     += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].strike * Battel.Players[Hero.id_player].GodGate.strike || 0;
      Hero.real_eff[iii].immunity   += Elkaisar.Config.CArmy.ArmyPowerFactor[lArmyType].immunity * Battel.Players[Hero.id_player].GodGate.immunity || 0;
    }

    return Hero;
  }

  static prepareForBattel(Hero, Battel) {

    var now = Math.floor(Date.now() / 1000);

    var leoMedalEff = Hero.Hero.medal_leo > now ? 0.25 : 0;
    var denMedalEff = Hero.Hero.medal_den > now ? 0.25 : 0;
    var pointAttack = Hero.Hero.point_b + Hero.Hero.point_b * denMedalEff + Hero.Hero.point_b_plus;
    var pointDeffence = Hero.Hero.point_c + Hero.Hero.point_c * denMedalEff + Hero.Hero.point_c_plus;

    var HeroArmy = LHero.HeroArmyBattel(Hero);

    var HeroPower = {
      "idHero": Hero.Hero.id_hero,
      "id_hero": Hero.Hero.id_hero,
      "id_player": Hero.Hero.id_player,
      "id_city": Hero.Hero.id_city,
      "x_coord": Hero.Hero.x,
      "y_coord": Hero.Hero.y,
      "Hero": Hero.Hero,
      "side": Hero.side,
      "type": HeroArmy.type,
      "pre": HeroArmy.pre,
      "post": HeroArmy.post,
      "real_eff": {
        "0": Elkaisar.Config.CHero.EmptyBattelHeroEff(0, HeroArmy.type.f_1), 
        "1": Elkaisar.Config.CHero.EmptyBattelHeroEff(1, HeroArmy.type.f_2),
        "2": Elkaisar.Config.CHero.EmptyBattelHeroEff(2, HeroArmy.type.f_3), 
        "3": Elkaisar.Config.CHero.EmptyBattelHeroEff(3, HeroArmy.type.b_1),
        "4": Elkaisar.Config.CHero.EmptyBattelHeroEff(4, HeroArmy.type.b_2), 
        "5": Elkaisar.Config.CHero.EmptyBattelHeroEff(5, HeroArmy.type.b_3)
      },
      "Equip": Hero.Equip,
      "EquipSpAt": {},
      "is_garrsion": Hero.isGarrison,
      "point_atk": pointAttack,
      "point_def": pointDeffence,
      "honor": 0,
      "points": 0,
      "resource_capacity": 0,
      "gainXp": 0,
      "standTillRound": 0,
      "troopsKilled": 0,
      "troopsKills": 0
    };

    LHero.prepareHeroPowerBattel(
      LHero.prepareHeroEquipPower(
        Elkaisar.Lib.LArmy.prepareHeroBattel(HeroPower)
        , Battel)
        , Battel
        );
    Battel.HeroReadyList.push(HeroPower);
  }

  static HeroArmyBattel(Hero) {
    if (!Hero.Army)
      console.log("Hero Has No Army", Hero);
    return {
      "pre": {
        "f_1": Hero.Army.f_1_num,
        "f_2": Hero.Army.f_2_num,
        "f_3": Hero.Army.f_3_num,
        "b_1": Hero.Army.b_1_num,
        "b_2": Hero.Army.b_2_num,
        "b_3": Hero.Army.b_3_num
      },
      "type": {
        "f_1": Hero.Army.f_1_type,
        "f_2": Hero.Army.f_2_type,
        "f_3": Hero.Army.f_3_type,
        "b_1": Hero.Army.b_1_type,
        "b_2": Hero.Army.b_2_type,
        "b_3": Hero.Army.b_3_type
      },
      "post": {
        "f_1": 0,
        "f_2": 0,
        "f_3": 0,
        "b_1": 0,
        "b_2": 0,
        "b_3": 0
      }
    };
  }

  static getHeroEquip(Hero, callBack) {
    Elkaisar.DB.SelectFrom(`*`, `equip`, `id_hero = ?`, [Hero.idHero],
      function (Res) {
        Hero.Equip = Res;

        if (callBack)
          callBack(Hero);
      });
  }


  static getHeroArmy(Hero, callBack) {

    if (Hero.AttackTask == Elkaisar.Config.BATTEL_TASK_CHALLANGE) {
      const Unit = Elkaisar.World.getUnit(Hero.xTo, Hero.yTo);
      var Table = "arena_player_challange_hero";
      if (Unit.ut == Elkaisar.Config.WUT_CHALLAGE_FIELD_TEAM)
        Table = "arena_team_challange_hero";
      else if (Unit.ut == Elkaisar.Config.WUT_CHALLAGE_FIELD_GUILD)
        Table = "arena_guild_challange_hero";

      Elkaisar.DB.SelectFrom("*", Table, "id_hero = ?", [Hero.idHero], function (Army) {

        if (!Army.length)
          return console.log("Error Adding Hero Army", Army, Hero);

        Hero.Army = Army[0];

        if (callBack)
          callBack(Hero);
      });


    } else {
      Elkaisar.DB.SelectFrom(`*`, `hero_army`, `id_hero = ?`, [Hero.idHero],
        function (Res) {

          var Army = Res[0];
          if (!Army)
            return;

          Hero.Army = Army;

          if (callBack)
            callBack(Hero);
        });
    }

  }

  static getReturningSlowestSpeed(Hero) {
    var SlowestSpeed = Elkaisar.Config.CArmy.AmySpeed[2];
    var Entered = false;



    for (var iii in Hero.real_eff) {
      if (Hero.real_eff[iii].unit <= 0 || Hero.real_eff[iii].armyType === 0)
        continue;
      Entered = true;

      if (SlowestSpeed > Elkaisar.Config.CArmy.AmySpeed[Hero.real_eff[iii].armyType])
        SlowestSpeed = Elkaisar.Config.CArmy.AmySpeed[Hero.real_eff[iii].armyType];
    }

    if (!Entered)
      return Elkaisar.Config.CArmy.AmySpeed[0];

    return SlowestSpeed;

  }

  static async reqExp(idPlayer, lvl) {

    const studyLvl = await Elkaisar.DB.ASelectFrom("scholership", "player_edu", "id_player = ?", [idPlayer]);
    if (!studyLvl.length) return Infinity;

    const base = Math.pow(lvl, 2);
    let studyEffect = 0;

    if (studyLvl[0]["scholership"] >= 20)
      studyEffect = 0.3 + 0.2 + (studyLvl[0]["scholership"] - 20) * 0.015;
    else if (studyLvl[0]["scholership"] >= 10)
      studyEffect = 0.3 + (studyLvl[0]["scholership"] - 10) * 0.02;
    else
      studyEffect = studyLvl[0]["scholership"] * 0.03;

    return base * (1 - studyEffect) * 125;
  }

  static reOrderHero(idCity, callBack) {

    Elkaisar.DB.SelectFrom("id_hero", "hero", "id_city = ? ORDER BY ord ASC", [idCity], function (Heros) {

      Heros.forEach(function (Hero, Index) {
        Elkaisar.DB.Update("ord = ?", "hero", "id_hero = ?", [Index, Hero.id_hero])
      });
      if (callBack)
        callBack();
    });
  }

  static InBattel(idHero){
    if(!Elkaisar.Lib.LBattel.HeroListInBattel[idHero])
      return false;
    if(Elkaisar.Lib.LBattel.HeroListInBattel[idHero] > Date.now()/1000)
      return true;
    return false;
  }
}

module.exports = LHero;