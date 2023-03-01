class ADominant {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getCityColonizer() {
    return await Elkaisar.DB.ASelectFrom(
      "city_colonize.*, city.name AS CityName, player.name AS PlayerName, city.x, city.y",
      "city_colonize JOIN city ON city.id_city = city_colonize.id_city_colonized JOIN player ON player.id_player = city_colonize.id_colonized",
      "city_colonize.id_colonizer = ?", [this.idPlayer]);

  }

  async getCityColonized() {
    return await Elkaisar.DB.ASelectFrom(
      "city_colonize.*, city.name AS CityName, player.name AS PlayerName, city.x, city.y",
      "city_colonize JOIN city ON city.id_city = city_colonize.id_city_colonizer JOIN player ON player.id_player = city_colonize.id_colonizer",
      "city_colonize.id_colonized = ?", [this.idPlayer]);

  }

  async abondonColonizedCity() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Colonize = await Elkaisar.DB.ASelectFrom("*", "city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    if (!Colonize.length)
      return { state: "error_0" };

    await Elkaisar.DB.ADelete("city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(Colonize[0].id_city_colonizer);

    await Elkaisar.Lib.LSaveState.afterCityColonizer(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(Colonize[0].id_city_colonizer);

    return { state: "ok" };
  }


  async fireColonizer() {

    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Colonize = await Elkaisar.DB.ASelectFrom("*", "city_colonize", "id_colonized = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);

    if (!Colonize.length)
      return { state: "error_0" };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, "freedom_help", 1))
      return { state: "error_1" };

    await Elkaisar.DB.ADelete("city_colonize", "id_colonizer = ? AND id_city_colonized = ?", [this.idPlayer, idCity]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonized(idCity);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(Colonize[0].id_city_colonizer);
    await Elkaisar.Lib.LSaveState.afterCityColonized(Colonize[0].id_city_colonizer);
    await Elkaisar.Lib.LSaveState.afterCityColonizer(idCity);

    return {
      state: "ok"
    }
  }

  async getArmyCapitalDominant() {

    const unit = Elkaisar.World.getUnit(235, 125);
    let armyCapital = [];
    if (unit.lo == Elkaisar.Config.lOCKED_UNIT) {

      const names = "player.name, player.guild";
      const joiner = "JOIN player ON player.id_player = world_unit_rank.id_dominant";
      const quary = `world_unit_rank.id_dominant, SUM(world_unit_rank.duration) AS d_sum,
      SUM(world_unit_rank.win_num) AS w_num, ${names}`;
      const table = `world_unit_rank ${joiner}`
      armyCapital.type = "rank";
      army_capital.unit = [];
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 235  AND world_unit_rank.y = 125  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 235, y: 125, title: "عاصمة المشاة" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 140  AND world_unit_rank.y = 170  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 140, y: 170, title: "عاصمة الفرسان" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 400  AND world_unit_rank.y = 230  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 400, y: 230, title: "عاصمة المدرعين" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 255  AND world_unit_rank.y = 266 GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 255, y: 266, title: "عاصمة الرماه" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 80  AND world_unit_rank.y = 280 GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 80, y: 280, title: "عاصمة المقاليع" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            " world_unit_rank.x = 400  AND world_unit_rank.y = 340 GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),
          x: 400, y: 340, title: "عاصمة المنجنيق" 
        }
      );
    } else {
      
      armyCapital.type = "domain";
      const quary = "world_unit_rank.id_dominant , player.name, world_unit_rank.time_stamp";
      const table = "world_unit_rank JOIN player ON player.id_player = world_unit_rank.id_dominant";
      army_capital.unit = [];
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 235  AND world_unit_rank.y = 125 ORDER BY id_round DESC LIMIT 1"),
          x: 235, y: 125, title: "عاصمة المشاة" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 140  AND world_unit_rank.y = 170 ORDER BY id_round DESC LIMIT 1"),
          x: 140, y: 170, title: "عاصمة الفرسان" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 400 AND world_unit_rank.y = 230 ORDER BY id_round DESC LIMIT 1"),
          x: 400, y: 230, title: "عاصمة المدرعين" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 255 AND world_unit_rank.y = 266 ORDER BY id_round DESC LIMIT 1"),
          x: 255, y: 266, title: "عاصمة الرماه" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 80 AND world_unit_rank.y = 280 ORDER BY id_round DESC LIMIT 1"),
          x: 80, y: 280, title: "عاصمة المقاليع" 
        }
      );
      army_capital.unit.push(
        { 
          "rank": await Elkaisar.DB.ASelectFrom(quary, table, 
            "world_unit_rank.x = 400 AND world_unit_rank.y = 340 ORDER BY id_round DESC LIMIT 1"),
          x: 400, y: 340, title: "عاصمة المنجنيق" 
        }
      );
    }
    return armyCapital;
  }
}

module.exports = ADominant;