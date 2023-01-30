class LEdu {
  static async isConditionsTrue(idPlayer, idCity, Study) {

    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "study", "id_study = ? AND lvl = ?", [Study["Type"], Study["Lvl"]]);
    if (!lvlReq.length)
      return false;
    const condetion = JSON.parse(lvlReq[0]["up_req"]);
    for (let one of condetion["condetion"]) {

      if (one["type"] == "building") {
        if (await LCityBuilding.buildingWithHeighestLvl(idCity, one["buildingType"])["Lvl"] < one["lvl"]) {
          return false;
        }
      } else if (one["type"] == "population") {
        if((await Elkaisar.DB.ASelectFrom("pop", "city", "id_city = ?", [idCity]))[0]["pop"] < one["amount"])
          return false;
      } else if (one["type"] == "item") {
        if(await Elkaisar.Lib.LItem.getAmount(idPlayer, one["item"]) < one["amount"])
          return false;
      }

    }
    return true;
  }

  static async fulfillCondition(idPlayer, idCity, Study) {

    if(!(await LEdu.isConditionsTrue(idPlayer, idCity, Study)))
      return false;

    const lvlReq = await Elkaisar.DB.ASelectFrom("*", "study", "id_study = ? AND lvl = ?", [Study["Type"], Study["Lvl"]]);
    const condetion = JSON.parse(lvlReq[0]["up_req"]);
    const ReqRes = condetion;

    delete ReqRes["condetion"];
    delete ReqRes["time"];

    if(!(await Elkaisar.Lib.LCity.isResourceTaken(ReqRes, idPlayer, idCity)))
      return false;

    for (let one of condetion["condetion"]) {
      if (one["type"] == "item")
        if(!(await Elkaisar.Lib.LItem.useItem(idPlayer, one["item"], one["amount"])))
          return false;
    }
    return lvlReq[0];

  }
};

module.exports = LEdu;