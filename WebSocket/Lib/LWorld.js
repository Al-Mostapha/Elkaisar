
Elkaisar.World.WorldUnits = [];
Elkaisar.World.WorldUnitData = {};
Elkaisar.World.WorldUnitPrize = {};
Elkaisar.World.WorldUnitLosePrize = {};
Elkaisar.World.OnFireUnits = {};
Elkaisar.World.WorldBattels = {};

Elkaisar.World.refreshWorldUnit = async function (callBack) {

  console.log(Date.now());
  const Units = await Elkaisar.DB.ASelectFrom("x, y, l, t, ut, lo", "world", "1", []);
  var ii;
  for (ii in Units) {
    const Unit = Units[ii];
    if (!Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y])
      Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y] = Unit;
    else {
      Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y].ut = Unit.ut;
      Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y].l = Unit.l;
      Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y].lo = Unit.lo;
      Elkaisar.World.WorldUnits[Unit.x * 500 + Unit.y].s = Unit.s;
    }
  }
  console.log("ًWorldUnit Refrehed...");
  if (callBack)
    callBack();
};



Elkaisar.World.getEquipPower = async function (callBack) {
  const EquipList = await Elkaisar.DB.ASelectFrom("*", "equip_power", "1", []);
  for (var iii in EquipList) {
    Elkaisar.Equip.EquipPower[`${EquipList[iii].equip}.${EquipList[iii].part}.${EquipList[iii].lvl}`] = EquipList[iii];
  }
  if (callBack)
    callBack();
};


Elkaisar.World.getUnit = function (xCoord, yCoord) {
  return Elkaisar.World.WorldUnits[xCoord * 500 + yCoord];
};

Elkaisar.World.getUnitPrize = function (Battel) {
  var xCoord = Battel.Battel.x_coord;
  var yCoord = Battel.Battel.y_coord;
  var Unit = Elkaisar.World.WorldUnits[xCoord * 500 + yCoord];

  var PrizeList = [];
  if (Battel.Fight.sideWin === Elkaisar.Config.BATTEL_SIDE_ATT)
    PrizeList = Elkaisar.World.WorldUnitPrize[`${Unit.ut}.${Battel.WinLvl}`];
  else
    PrizeList = Elkaisar.World.WorldUnitPrize[`${Unit.ut}.${Battel.WinLvl}.Lose`];

  if (!PrizeList)
    return [];
  for (var i = PrizeList.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = PrizeList[i];
    PrizeList[i] = PrizeList[j];
    PrizeList[j] = temp;
  }

  return PrizeList;
};

Elkaisar.World.getUnitData = async function (callBack) {
  Elkaisar.World.WorldUnitData = require(`${process.env.BasePath}/jsGame${process.env.JsVersion}/json/worldUnitData.json`);
  if (callBack)
    callBack();
};

Elkaisar.World.refreshWorldUnitHeros = async function (callBack) {
  const Res = await Elkaisar.DB.ASelectFrom("*", "world_unit_hero", "1", []);
  console.log(`World HerosLen is ${Res.length}`);
  for (var ii in Res) {

    if (!Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitHero)
      Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitHero = {};
    if (!Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitHero[Res[ii].lvl])
      Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitHero[Res[ii].lvl] = [];
    Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitHero[Res[ii].lvl].push({
      Hero: {
        point_a: 0,
        point_a_plus: 0,
        point_b: 0,
        point_b_plus: 0,
        point_c: 0,
        point_c_plus: 0,
        id_player: 0,
        medal_den: 0,
        medal_leo: 0,
        x: 0, y: 0,
        id_hero: Res[ii].id_hero * -1,
        id_city: 0,
        avatar: Res[ii].avatar,
        HeroName: Res[ii].name,
        idHero: Res[ii].id_hero * -1
      },
      Army: {
        id_hero: 0,
        id_player: 0,
        f_1_type: Res[ii].f_1_type,
        f_2_type: Res[ii].f_2_type,
        f_3_type: Res[ii].f_3_type,
        f_1_num: Res[ii].f_1_num,
        f_2_num: Res[ii].f_2_num,
        f_3_num: Res[ii].f_3_num,
        b_1_type: Res[ii].b_1_type,
        b_2_type: Res[ii].b_2_type,
        b_3_type: Res[ii].b_3_type,
        b_1_num: Res[ii].b_1_num,
        b_2_num: Res[ii].b_2_num,
        b_3_num: Res[ii].b_3_num
      }
    });
  }
  if (callBack)
    callBack();
};


Elkaisar.World.refreshWorldUnitEquip = async function (callBack) {
  const Res = await Elkaisar.DB.ASelectFrom("*, world_unit_equip.equip AS type", "world_unit_equip", "1", []);
  for (var ii in Res) {
    if (!Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitEquip)
      Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitEquip = {};
    if (!Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitEquip[Res[ii].l])
      Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitEquip[Res[ii].l] = [];

    Elkaisar.World.WorldUnits[Res[ii].x * 500 + Res[ii].y].UnitEquip[Res[ii].l].push(Res[ii]);
  }
  if (callBack)
    callBack();
};



Elkaisar.World.refreshWorldUnitPrize = async function (callBack) {

  // "Win" => selectFromTable("*", "world_unit_prize", "1"),
  // "Lose" => selectFromTable("*", "world_unit_prize_lose", "1"),
  // "Sp" => selectFromTable("*", "world_unit_prize_sp", "1"),
  // "Plunder" => selectFromTable("*", "world_unit_prize_plunder", "1")
  Elkaisar.World.AllWorldUnitPrize = {
    Win: await Elkaisar.DB.ASelectFrom("*", "world_unit_prize", "1", []),
    Lose: await Elkaisar.DB.ASelectFrom("*", "world_unit_prize_lose", "1", []),
    Sp: await Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", "1", []),
    Plunder: await Elkaisar.DB.ASelectFrom("*", "world_unit_prize_plunder", "1", [])
  };

  Elkaisar.DB.SelectFrom("*", "world_unit_prize", "1", [], function (Res) {
    Elkaisar.DB.SelectFrom("*", "world_unit_prize_lose", "1", [], function (LP) {
      Elkaisar.World.WorldUnitPrize = {};
      for (var iii in Res) {

        var UnitPrize = Res[iii];
        if (!Elkaisar.World.WorldUnitPrize[`${UnitPrize.unitType}.${UnitPrize.lvl}`])
          Elkaisar.World.WorldUnitPrize[`${UnitPrize.unitType}.${UnitPrize.lvl}`] = [];
        Elkaisar.World.WorldUnitPrize[`${UnitPrize.unitType}.${UnitPrize.lvl}`].push(Res[iii]);

      }

      for (var ii in LP) {

        var UnitLPrize = LP[ii];
        if (!Elkaisar.World.WorldUnitPrize[`${UnitLPrize.unitType}.${UnitLPrize.lvl}.Lose`])
          Elkaisar.World.WorldUnitPrize[`${UnitLPrize.unitType}.${UnitLPrize.lvl}.Lose`] = [];
        Elkaisar.World.WorldUnitPrize[`${UnitLPrize.unitType}.${UnitLPrize.lvl}.Lose`].push(LP[ii]);

      }
      if (callBack)
        callBack();
    });
  });

};

(async ()=>{
  await Elkaisar.World.refreshWorldUnit();
  await  Elkaisar.World.refreshWorldUnitHeros();
  await Elkaisar.World.refreshWorldUnitEquip();
  await Elkaisar.World.getUnitData();
  await Elkaisar.World.refreshWorldUnitPrize();
  Elkaisar.OnEvent.emit("OnServerReady");
  await Elkaisar.DB.AUpdate("s = 0", "world", "1", []);
  await Elkaisar.World.getEquipPower();
  console.log("Server Data ReadyNow");
})();






class LWorld {

  static unitHeros(Unit, callBack) {
    var herosToSend = [];
    var WorldUnit = Elkaisar.World.getUnit(Unit.x, Unit.y);
    if (!WorldUnit)
      return herosToSend;
    if (!WorldUnit.UnitHero)
      return herosToSend;
    if (!WorldUnit.UnitHero[Unit.l])
      return herosToSend;

    var ii;
    var HeroUnitList = WorldUnit.UnitHero[Unit.l];


    var UnitHero;

    if (callBack)
      callBack(HeroUnitList);

    return HeroUnitList;
  }

  static unitEquip(Unit, callBack) {
    var WorldUnit = Elkaisar.World.getUnit(Unit.x, Unit.y);
    if (!WorldUnit.UnitEquip)
      return [];
    if (!WorldUnit.UnitEquip[WorldUnit.l])
      return [];
    return WorldUnit.UnitEquip[WorldUnit.l];
  }


  static battelHeros(Battel, callBack) {
    Elkaisar.DB.SelectFrom(
      `battel_member.id_hero , battel_member.id_player ,
                hero.point_b, hero.point_b_plus, hero.point_c, hero.point_c_plus  , 
                hero_medal.medal_den , hero_medal.medal_leo , battel_member.ord , 
                hero.id_city  , battel_member.side , city.x, city.y `,
      `battel_member JOIN  hero ON hero.id_hero = battel_member.id_hero JOIN hero_medal  ON hero_medal.id_hero = battel_member.id_hero JOIN city ON hero.id_city = city.id_city`,
      `battel_member.id_battel = ? ORDER BY battel_member.ord ASC`, [Battel.id_battel],
      function (Res) {
        callBack(Res);
      });
  }

  static removeCityColonizer(idCity) {

    Elkaisar.DB.Delete("city_colonize", "id_city_colonized = ?", [idCity]);

  }

  static async getWorldAttackQueueForGuild(Unit) {
    return await Elkaisar.DB.ASelectFrom(
      "guild.name AS GuildName, guild.id_guild, guild.slog_top,"
      + "guild.slog_cnt, guild.slog_btm, world_attack_queue.time_start,"
      + " world_attack_queue.time_end",
      "world_attack_queue LEFT JOIN guild ON guild.id_guild = world_attack_queue.id_guild",
      "world_attack_queue.x_coord = ? AND world_attack_queue.y_coord = ?",
      [Unit["x"], Unit["y"]]);
  }

  static async distanceBetweenCities(idCityFrom, idCityTo) {
    const coordFrom = await Elkaisar.DB.ASelectFrom("x, y", "city", "id_city = ?", [idCityFrom]);
    const coordTo = await Elkaisar.DB.ASelectFrom("x, y", "city", "id_city = ?", [idCityTo]);
    return LWorld.distanceBetween(coordFrom[0]["x"], coordFrom[0]["y"], coordTo[0]["x"], coordTo[0]["y"]);
  }

  static async distanceBetween(xFrom, yFrom, xTo, yTo) {
    return Math.floor(Math.sqrt(Math.pow((xFrom - xTo), 2) + Math.pow((yFrom - yTo), 2)) * 6000);
  }
}

module.exports = LWorld;