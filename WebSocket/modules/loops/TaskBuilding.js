

Elkaisar.Helper.AfterBuildingUpGraded = function (Task) {

  var GaindePres = 0;
  if (Task["state"] === "up") {
    GaindePres = Elkaisar.Config.BUILDING_PRESTIGE[Task["type"]][Task["lvl_to"] - 1];
    Elkaisar.DB.Update("prestige = prestige + ?", "player", "id_player = ?", [GaindePres, Task.id_player]);
    Elkaisar.DB.Update("exp = exp + ?", "hero", "id_hero = (SELECT console FROM city WHERE id_city = ?)", [GaindePres * 2, Task["id_city"]]);
  }




  if (Task["type"] === Elkaisar.Config.CITY_BUILDING_COTTAGE)
    Elkaisar.Lib.LCity.refreshPopCap(Task["id_city"]);

  else if (Task["type"] === Elkaisar.Config.CITY_BUILDING_STORE)
    Elkaisar.Lib.LSaveState.storeRatio(Task["id_city"]);

  else if (Task["type"] === Elkaisar.Config.CITY_BUILDING_THEATER)
    Elkaisar.DB.Update("lvl = ?", "city_theater", "id_city = ?", [Task["lvl_to"], Task["id_city"]]);

  else if (Task["type"] === Elkaisar.Config.CITY_BUILDING_PALACE) {
    Elkaisar.Lib.LSaveState.saveCityState(Task["id_city"]);
    Elkaisar.DB.Update("coin_cap = ?", "city", "id_city = ?", [Elkaisar.Config.PalaceCoinCap[Task["lvl_to"] - 1], Task["id_city"]]);

  } else if (Task["type"] === Elkaisar.Config.CITY_BUILDING_WALL) {
    Elkaisar.DB.Update("wall_cap = ?", "city", "id_city = ?", [10000 * Task["lvl_to"], Task["id_city"]]);

  }

  return GaindePres;

};

setInterval(async function () {
  var Now = Date.now() / 1000;
  const Tasks = await Elkaisar.DB.ASelectFrom("*", "city_worker", "time_end <= ?", [Now]);
  Elkaisar.DB.Delete("city_worker", "time_end <= ?", [Now]);
  Tasks.forEach(async function (Task) {
    if (Task.lvl_to > 30)
      return;
    await Elkaisar.DB.AUpdate(Task.place + " = ?", "city_building_lvl", "id_city = ? AND id_player = ?", [Task["lvl_to"], Task["id_city"], Task["id_player"]]);
    if (Task["lvl_to"] === 0){
      Elkaisar.DB.Update(Task.place + " = 0", "city_building", "id_city = ? AND id_player = ?", [Task["id_city"], Task["id_player"]]);
      Elkaisar.DB.Delete("")
    }
    Task.prestige = Elkaisar.Helper.AfterBuildingUpGraded(Task);
    var Player = Elkaisar.Base.getPlayer(Task.id_player);
    if (!Player)
      return;
    Player.connection.sendUTF(JSON.stringify({
      "classPath": "TimedTask.Building",
      Task: Task,
      prestige: Task.prestige
    }));
  });
}, 1000);