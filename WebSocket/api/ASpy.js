class ASpy {

  async start() {

    const spyNum = Elkaisar.Base.validateAmount(this.Parm.spyNum);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const xCoord = Elkaisar.Base.validateCount(this.Parm.xCoord);
    const yCoord = Elkaisar.Base.validateCount(this.Parm.yCoord);

    const City = await Elkaisar.DB.ASelectFrom("spies, x, y", "city", "id_city = ?", [idCity]);
    const Unit = Elkaisar.World.getUnit(xCoord, yCoord);
    if (!Unit || !City.length)
      return { state: "error_0", TryTOHack: Elkaisar.Base.TryToHack(this) };
    if (City[0].spies < spyNum)
      return { state: "error_1", TryTOHack: Elkaisar.Base.TryToHack(this) };

    let spyOn = "barrary";
    if (Elkaisar.Lib.LWorldUnit.isCity(Unit[0].ut))
      spyOn = "city";


    const distance = Elkaisar.Lib.LWorldUnit.calDist(City[0]["x"], xCoord, City[0]["y"], yCoord);
    const timeArrive = Date.now() / 1000 + distance / 2000;
    await Elkaisar.DB.ASelectFrom("spies = spies - ?", 'city', "id_city = ?", [spyNum, idCity]);

    const quary = "id_player = ? , id_city = ? , x_to = ? , "
      + "y_to = ? , spy_num = ? , time_arrive = ? ,"
      + " spy_on = ?";
    await Elkaisar.DB.AInsert(quary, "spy", [
      idPlayer, idCity, xCoord, yCoord, spyNum,
      timeArrive, spyOn
    ]);

    await Elkaisar.Lib.LSaveState.saveCityState(idCity);
    return {
      state: "ok",
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
    };

  }


  async cancel() {

    const idSpy = Elkaisar.Base.validateId(this.Parm.idSpy);
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);

    await Elkaisar.DB.ADelete("spy", "id_spy = ? AND id_player = ?", [idSpy, idPlayer]);
    await Elkaisar.Lib.LSaveState.saveCityState(idCity);

    return {
      state: "ok",
      City: (await Elkaisar.DB.ASelectFrom("*", "city", "id_player = ? AND id_city = ?", [idPlayer, idCity]))[0]
    }

  }
}

module.exports = ASpy;

