class APlayerEdu {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getPlayerEduLvl() {
    return (await Elkaisar.DB.ASelectFrom("*", "player_edu", "id_player = ?", [this.idPlayer]))[0];
  }

  async upgradeStudyLvl() {

    const idStudy = Elkaisar.Base.validateGameNames(this.Parm.idStudy);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Study = await Elkaisar.DB.ASelectFrom("player_edu.?? AS studyLvl", "player_edu", "id_player = ?", [this.Parm.idStudy, this.idPlayer]);
    const StudyReq = await Elkaisar.Lib.LEdu.fulfillCondition(this.idPlayer, idCity, { Type: idStudy, Lvl: Study[0]["studyLvl"] });
    const countSTP = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "study_tasks", "id_player = ? AND study = ?", [this.idPlayer, idStudy]))[0]["c"];
    const countSTC = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "study_tasks", "id_city = ? AND study_in = ?", [idCity, StudyReq["study_in"]]))[0]["c"];

    if (Study.length == 0) return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Study[0]["studyLvl"] >= 30) return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (StudyReq == false) return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (countSTP > 0) return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (countSTC > 0) return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };

    const timeRequired = Number(JSON.parse(StudyReq["up_req"])["time"]);
    const TotalTime = Date.now() / 1000 + timeRequired;

    await Elkaisar.DB.AInsert(
      "id_city = ? ,  id_player = ? , study = ? ,  time_start = ? , lvl_to = ? , time_end = ? , time_end_org = ? , study_in = ?",
      "study_tasks",
      [idCity, this.idPlayer, idStudy, Date.now() / 1000, Study[0]["studyLvl"] + 1, TotalTime, TotalTime, StudyReq["study_in"]])

    return {
      state: "ok",
      list: await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]),
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    }
  }

  async cancelStudyUpgarding() {

    const idTask = Elkaisar.Base.validateId(this.Parm.idTask);
    const StudyTask = await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    const Study = await Elkaisar.DB.ASelectFrom("*", "study", "id_study = ? AND lvl = ?", [StudyTask[0]["study"], StudyTask[0]["lvl_to"] - 1]);
    const gainRes = JSON.parse(Study[0]["up_req"]);

    delete gainRes["condetion"];
    delete gainRes["time"];

    await Elkaisar.Lib.LSaveState.saveCityState(StudyTask[0]["id_city"]);
    if (!StudyTask.length)
      return { state: "error_0" };
    await Elkaisar.DB.ADelete("study_tasks", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    Elkaisar.Lib.LCity.addResource(gainRes, this.idPlayer, StudyTask[0]["id_city"]);

    return {
      state: "ok",
      list: await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id_city = ? AND id_player = ?", [StudyTask[0]["id_city"], this.idPlayer]),
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [StudyTask[0]["id_city"]]))[0]
    }
  }

  async speedUpStudyTask() {

    const idTask = Elkaisar.Base.validateId(this.Parm.idTask);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    const idCity = await Elkaisar.DB.ASelectFrom("id_city", "study_tasks", "id = ? AND id_player = ?", [idTask, this.idPlayer]);
    const now = Date.now() / 1000;

    if (!idCity.length)
      return { state: "error_0" };
    let equation = "";
    if (itemToUse == "archim_a") equation = "time_end = time_end - 15*60";
    else if (itemToUse == "archim_b") equation = "time_end = time_end - 60*60";
    else if (itemToUse == "archim_c") equation = "time_end = time_end - 3*60*60";
    else if (itemToUse == "archim_d") equation = "time_end = time_end - (time_end - $now)*0.3";
    else return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };

    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { state: "error_1" };

    await Elkaisar.DB.AUpdate(equation, "study_tasks", "id = ? AND id_player = ?", [idTask, this.idPlayer]);

    return {
      state: "ok",
      list: await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id_city = ? AND id_player = ?", [idCity[0]["id_city"], this.idPlayer])
    }

  }

}

module.exports = APlayerEdu;