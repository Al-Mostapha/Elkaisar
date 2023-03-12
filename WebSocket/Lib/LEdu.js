class LEdu {

  static StudyReq = {};

  static async getStudyReq(studyType, studyLvl) {
    const idReq = `${studyType}.${studyLvl}`;
    if (LEdu.StudyReq[idReq])
      return LEdu.StudyReq[idReq];
    const l_StudyReq = await Elkaisar.DB.ASelectFrom("*", "study", "id_study = ? AND lvl = ?", [studyType, studyLvl]);
    if (l_StudyReq.length == 0)
      return console.log("StudyReq Is Not Found", studyType, "+++", studyLvl);
    LEdu.StudyReq[idReq] = l_StudyReq;
    return LEdu.StudyReq[idReq];
  }

  static async isConditionsTrue(idPlayer, idCity, Study) {

    const lvlReq = await LEdu.getStudyReq(Study.Type, Study.Lvl);
    if (!lvlReq)
      return false;
    const condetion = JSON.parse(lvlReq[0]["up_req"]);
    for (let one of condetion["condetion"]) {

      if (one["type"] == "building") {
        if (await Elkaisar.Lib.LCityBuilding.buildingWithHeighestLvl(idCity, one["buildingType"])["Lvl"] < one["lvl"]) {
          return false;
        }
      } else if (one["type"] == "population") {
        if ((await Elkaisar.DB.ASelectFrom("pop", "city", "id_city = ?", [idCity]))[0]["pop"] < one["amount"])
          return false;
      } else if (one["type"] == "item") {
        if (await Elkaisar.Lib.LItem.getAmount(idPlayer, one["item"]) < one["amount"])
          return false;
      }

    }
    return true;
  }

  static async fulfillCondition(idPlayer, idCity, Study) {

    if (!(await LEdu.isConditionsTrue(idPlayer, idCity, Study)))
      return false;

    const lvlReq = await LEdu.getStudyReq(Study.Type, Study.Lvl);
    const condetion = Object.assign({}, JSON.parse(lvlReq[0]["up_req"]));
    const ReqRes = Object.assign({}, condetion);
    delete ReqRes["condetion"];
    delete ReqRes["time"];
    if (!(await Elkaisar.Lib.LCity.isResourceTaken(ReqRes, idPlayer, idCity)))
      return false;
    for (let one of condetion["condetion"]) {
      if (one["type"] == "item")
        if (!(await Elkaisar.Lib.LItem.useItem(idPlayer, one["item"], one["amount"])))
          return false;
    }
    return lvlReq[0];
  }
};

module.exports = LEdu;