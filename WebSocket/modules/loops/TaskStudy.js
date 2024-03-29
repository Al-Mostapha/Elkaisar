setInterval(function () {

  var Now = Date.now() / 1000;
  Elkaisar.DB.SelectFrom("*", "study_tasks", "time_end <= ?", [Now], function (Tasks) {
    Elkaisar.DB.Delete("study_tasks", "time_end <= ?", [Now]);
    Tasks.forEach(function (Task, Index) {
      var PrestigeGain = Elkaisar.Config.STUDING_PRESTIGE[Task.study][Task.lvl_to - 1];
      Elkaisar.DB.Update("prestige = prestige + ?", "player", "id_player = ?", [PrestigeGain, Task.id_player]);
      Elkaisar.DB.Update("exp = exp + ?", "hero", "id_hero = (SELECT console FROM city WHERE id_city = ?)", [PrestigeGain * 2, Task["id_city"]]);
      Elkaisar.DB.Update("`" + Task.study + "` = ?", "player_edu", "id_player = ?", [Task["lvl_to"], Task["id_player"]]);
      var Player = Elkaisar.Base.getPlayer(Task.id_player);
      if (!Player)
        return;
      Player.connection.sendUTF(JSON.stringify({
        classPath: "TimedTask.Study",
        Task: Task,
        prestige: PrestigeGain
      }));
    });
  });
}, 1000);