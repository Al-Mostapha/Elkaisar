class ATimedTask {

  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getAllTasks() {
    let Tasks = {};
    Tasks.Building = await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_player = ?", [this.idPlayer]);
    Tasks.Study = await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id_player = ?", [this.idPlayer]);
    Tasks.Army = await Elkaisar.DB.ASelectFrom("*", "build_army", "id_player = ?", [this.idPlayer]);
    Tasks.Jop = await Elkaisar.DB.ASelectFrom("*", "city_jop_hiring", "id_player = ?", [this.idPlayer]);
    return Tasks;

  }

  async getCityBuildingTasks() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "city_worker", "id_player = ? AND id_city = ?",
      [this.idPlayer, idCity]);
  }
  async getCityStudyTasks() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "study_tasks", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
  }
  async getCityArmyTasks() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "build_army", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
  }

  async getCityJopTasks() {
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    return await Elkaisar.DB.ASelectFrom("*", "city_jop_hiring", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
  }

};

module.exports = ATimedTask;