class AArmyBatch {
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async cancelBatch() {
    const idBatch = Elkaisar.Base.validateId(this.Parm.idBatch);
    const Batch = await Elkaisar.DB.ASelectFrom("*", "build_army", "id = ? AND id_player = ?", [idBatch, this.idPlayer]);
    let timeStart = Math.floor(Date.now() / 1000);
    if (!Batch.length)
      return { state: "error_0", TryToHack: await Elkaisar.Base.TryToHack(this) };
    const allNextBatches = await Elkaisar.DB.ASelectFrom("*", "build_army", "id > ? AND place = ? AND id_player = ? AND id_city = ?", [idBatch, Batch[0].place, this.idPlayer, Batch[0].id_city]);
    const oneBeforeDelete = await Elkaisar.DB.ASelectFrom("*", "build_army", "id_city = ? AND place = ? AND id_player = ? AND id < ? LIMIT 1", [Batch[0].id_city, Batch[0].place, this.idPlayer, idBatch]);
    if (oneBeforeDelete.length)
      timeStart = oneBeforeDelete[0].time_end;

    for (let oneBatch of allNextBatches) {
      let timeEnd = timeStart + (oneBatch.time_end - oneBatch.time_start);
      await Elkaisar.DB.AUpdate("time_start = ? , time_end = ?", "build_army", "id = ?", [timeStart, timeEnd, oneBatch.id]);
      timeStart += (oneBatch.time_end - oneBatch.time_start);
    }

    this.#gainFromCanceling(Batch[0].id_city, Batch[0].army_type, Batch[0].amount);
    await Elkaisar.DB.ADelete("build_army", "id = ? AND id_player = ?", [idBatch, this.idPlayer]);
    return {
      state: "ok",
      armyBatches: await Elkaisar.DB.ASelectFrom("*", "build_army", "id_city = ? AND id_player = ? AND place = ?", [Batch[0].id_city, this.idPlayer, Batch[0].place]),
      cityRes: (await Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [Batch[0].id_city]))[0]
    };
  }

  async #gainFromCanceling($idCity, $armyType, $amount) {
    const armyGainRes = Object.assign({}, Elkaisar.Army.ResourcseNeeded[$armyType]);
    delete armyGainRes.pop;
    delete armyGainRes.time;
    delete armyGainRes.condetion;
    for (let one in armyGainRes)
      armyGainRes[one] = armyGainRes[one] * Elkaisar.Config.CANCELING_GAIN_RATE * $amount;
    await Elkaisar.Lib.LSaveState.saveCityState($idCity);
    await Elkaisar.Lib.LCity.addResource(armyGainRes, this.idPlayer, $idCity);
  }


  async speedUpBatches() {
    const idBatch = Elkaisar.Base.validateId(this.Parm.idBatch);
    const itemToUse = Elkaisar.Base.validateGameNames(this.Parm.itemToUse);
    $speedUpFact = 0;
    const Batch = await Elkaisar.DB.ASelectFrom("*", "build_army", "id = ? AND id_player = ?", [idBatch, this.idPlayer]);
    if (!Batch.length)
      return { state: "error_0", TryToHack: await Elkaisar.Base.TryToHack(this) };
    if (Batch[0].acce)
      return { state: "error_1", TryToHack: await Elkaisar.Base.TryToHack(this) };

    if (itemToUse == "train_acce_30")
      $speedUpFact = Elkaisar.Config.ARMY_SPEED_UP_FACT_MIN;
    else if (itemToUse == "train_acce_50")
      $speedUpFact = Elkaisar.Config.ARMY_SPEED_UP_FACT_MAX;
    else if (Batch[0].place == "wall" && itemToUse == "wall_acce")
      $speedUpFact = Elkaisar.Config.ARMY_SPEED_UP_FACT_MAX;
    else
      return { state: "error_2", TryToHack: await Elkaisar.Base.TryToHack(this) };
    if (!await Elkaisar.Lib.LItem.useItem(this.idPlayer, itemToUse, 1))
      return { state: "error_3", TryToHack: await Elkaisar.Base.TryToHack(this) };

    Batch[0].SpeedUpFact = $speedUpFact;
    return await this.#goAndSpeedUp(Batch[0]);
  }

  async #getBlockToSpeedUp($buildingPlace) {
    let blockPlaces = [];
    if ($buildingPlace == "wall") {
      blockPlaces = ["wall"];
    } else {
      let blockKey = buildingPlace.split("_");
      array_pop($blockKey);
      blockKey.pop();
      const blockBelong = blockKey.join("_");

      blockPlaces = Elkaisar.Config.CArmy.CommonBlocks[blockBelong];
    }

    return blockPlaces;
  }

  async #goAndSpeedUp($Batch) {

    const commonBlocks = this.#getBlockToSpeedUp($Batch["place"]);

    for (let onePlace of commonBlocks) {
      const BatchesInBuilding = await Elkaisar.DB.ASelectFrom("*", "build_army", "id_city = ? AND id_player = ? AND place = ? AND acce = 0", [Batch["id_city"], this.idPlayer, onePlace]);
      await this.#speedUpOnePlace(BatchesInBuilding, $Batch["SpeedUpFact"]);
    }
    const Places = commonBlocks.map(function (el) {
      return `'${el}'`
    }).join(",");
    return {
      state: "ok",
      armyBatches: await Elkaisar.DB.ASelectFrom(
        "id, time_end, time_start, acce", "build_army",
        `id_city = ? AND id_player = ? AND place IN (${Places})`,
        [Batch["id_city"], this.idPlayer])
    }

  }

  async #speedUpOnePlace($Batches, $speedUpFactor) {
    const $newDuration = 0;
    const $now = Date.now();
    const $timeStart = $now;
    for (let index = 0; index < $Batches.length; index++) {
      if ($Batches[index]["acce"] == 1) {
        $timeStart = $Batches[index]["time_end"];
      } else {
        $newDuration = ($Batches[index]["time_end"] - Math.max($Batches[index]["time_start"], $now)) - (($Batches[index]["time_end"] - Math.max($Batches[index]["time_start"], $now)) * $speedUpFactor);
        await Elkaisar.DB.AUpdate("build_army", "time_start = ?, time_end = ?, acce = 1", "id = ?", [$timeStart, $timeStart + $newDuration, $Batches[index]["id"]]);
        $timeStart += $newDuration;
      }
    }
  }

  

}
