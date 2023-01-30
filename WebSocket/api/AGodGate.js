class AGodGate {

  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }


  async getRankEffect() {
    return Elkaisar.Lib.LPlayer.RANK_POINT_PLUSE;
  }

  async getGodGateData() {
    const GodGateData = await Elkaisar.DB.ASelectFrom("*", "god_gate", "id_player = ?", [this.idPlayer]);
    const GodGate = {};
    if (!GodGateData.length)
      return {};

    const GodGate1 = await Elkaisar.DB.ASelectFrom("*", "god_gate_1", "id_player = ?", [this.idPlayer]);
    const GodGate2 = await Elkaisar.DB.ASelectFrom("*", "god_gate_2", "id_player = ?", [this.idPlayer]);
    const GodGate3 = await Elkaisar.DB.ASelectFrom("*", "god_gate_3", "id_player = ?", [this.idPlayer]);
    const GodGate4 = await Elkaisar.DB.ASelectFrom("*", "god_gate_4", "id_player = ?", [this.idPlayer]);

    GodGate.GodGate1 = GodGate1.length > 0 ? GodGate1[0] : null;
    GodGate.GodGate2 = GodGate2.length > 0 ? GodGate2[0] : null;
    GodGate.GodGate3 = GodGate3.length > 0 ? GodGate3[0] : null;
    GodGate.GodGate4 = GodGate4.length > 0 ? GodGate4[0] : null;

    GodGate.GodGateData = GodGateData[0];
    return GodGate;
  }

  async openGate() {

    const gateIndex = Elkaisar.DB.validateAmount(this.Parm.gateIndex);
    const godGate = await Elkaisar.DB.ASelectFrom("god_gate.points , player.porm",
      "player JOIN god_gate ON player.id_player = god_gate.id_player",
      "player.id_player = ?", [this.idPlayer]);
    const godGateData = Elkaisar.Config.CGodGate.getGateData()[("gate_" + gateIndex)]

    if (!godGate.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!godGateData)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (godGate[0].porm < godGateData.porm)
      return { state: "error_2", porm: godGateData.porm, TryToHack: Elkaisar.Base.TryToHack(this) };
    if (godGate[0].points < godGateData.points)
      return { state: "error_3", points: godGateData.points, TryToHack: Elkaisar.Base.TryToHack(this) };
    const p_1 = Elkaisar.Base.rand(1, 20);
    const p_2 = Elkaisar.Base.rand(1, 20);
    const p_3 = Elkaisar.Base.rand(1, 20);
    const p_4 = 0;

    const quary = "cell_1_type =  'vit' , cell_2_type = 'attack' , cell_3_type = 'damage', cell_4_type = 'defence',"
      + `cell_1_score = ${p_1}, cell_2_score = ${p_2}, cell_3_score = ${p_3} , cell_4_score = ${p_4} , id_player = ?`;
    await Elkaisar.DB.AInsert(quary, `god_gate_${gateIndex}`, [this.idPlayer]);
    await Elkaisar.DB.AUpdate(`gate_${gateIndex} = ${p_1} + ${p_2} + ${p_3} + ${p_4}`, "god_gate", "id_player = ?", [this.idPlayer]);
    await Elkaisar.DB.AUpdate(`points = points - ${godGateData.points}`, "god_gate", "id_player = ?", [this.idPlayer]);

    return {
      state: "ok",
      Gate: (await Elkaisar.DB.ASelectFrom("*", `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]))[0],
      PlayerGate: (await Elkaisar.DB.ASelectFrom("*", "god_gate", "id_player = ?", [this.idPlayer]))[0],
      score: p_1 + p_2 + p_3 + p_4
    }
  }

  async changeGateCellState() {

    const gateIndex = Elkaisar.DB.validateAmount(this.Parm.gateIndex);
    const cellIndex = Elkaisar.DB.validateAmount(this.Parm.cellIndex);
    const state = Elkaisar.DB.validateAmount(this.Parm.state);

    const Gate = await Elkaisar.DB.ASelectFrom(`c_${cellIndex}_s`, `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]);
    if (!Gate.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (state != 0 && state != 1)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (Gate[0][`c_${cellIndex}_s`] == 2)
      return { state: "error_0" };

    await Elkaisar.DB.AUpdate(`c_${cellIndex}_s = '${state}'`, `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]);
    return {
      state: "ok",
      Gate: (await Elkaisar.DB.ASelectFrom("*", `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]))[0]
    }
  }

  async changeGateUnlockedCells() {

    const gateIndex = Elkaisar.DB.validateAmount(this.Parm.gateIndex);
    const godGate = await Elkaisar.DB.ASelectFrom("*", `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]);
    const playerPoint = (await Elkaisar.DB.ASelectFrom("points", "god_gate", "id_player = ?", [this.idPlayer]))[0].points;
    const MaxVal = Elkaisar.Config.CGodGate.getMaxVal();

    if (!godGate.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };

    let lockCells = 0;
    let lockedTypes = [];

    for (let iii = 1; iii <= 4; iii++) {

      if (godGate[0][`c_${iii}_s`] == 0) {
        lockCells++;
        lockedTypes.push(godGate[0][`cell_${iii}_type`]);
      }
    }

    const reqPoints = 50 + 50 * lockCells;
    if (playerPoint < reqPoints)
      return { state: "error_2", point: reqPoints };

    let totalScore = 0;

    for (let iii = 1; iii <= 4; iii++) {

      if (godGate[0][`c_${iii}_s`] == 2)
        continue;
      if (godGate[0][`c_${iii}_s`] == 0) {
        totalScore += floor((godGate[0][`cell_${iii}_score`] / MaxVal[godGate[0][`cell_${iii}_type`]]) * 100);
        continue;
      }

      const unlockedTyps = ["vit", "attack", "defence", "damage", "break", "anti_break", "strike", "immunity"].filter(function (i) { return lockedTypes.indexOf(i) < 0; });
      const newType = Elkaisar.Base.rand(0, unlockedTyps.length - 1);
      lockedTypes.push(unlockedTyps[newType]);

      godGate[0][`cell_${iii}_type`] = unlockedTyps[newType];

      let score = 0;
      const randLH = Elkaisar.Base.rand(0, 100);

      if (randLH > 100 - MaxVal["rate_1"]) {
        score = Elkaisar.Base.rand(Math.floor(MaxVal[unlockedTyps[newType]] * 0.97), MaxVal[unlockedTyps[newType]]);
      } else if (randLH > 100 - MaxVal["rate_2"]) {
        score = Elkaisar.Base.rand(Math.floor(MaxVal[unlockedTyps[newType]] * 0.5), Math.floor(MaxVal[unlockedTyps[newType]] * 0.97));
      } else if (randLH > 100 - MaxVal["rate_3"]) {
        score = Elkaisar.Base.rand(1, Math.floor(MaxVal[unlockedTyps[newType]] * 0.7));
      } else {
        score = Elkaisar.Base.rand(1, Math.floor(MaxVal[unlockedTyps[newType]] * 0.5));
      }

      godGate[0][`cell_${iii}_score`] = score;
      totalScore += Math.floor((score / MaxVal[godGate[0][`cell_${iii}_type`]]) * 100);
    }

    const quary = `cell_1_type = '${godGate[0]["cell_1_type"]}' , cell_2_type = '${godGate[0]["cell_2_type"]}' ,`
      + ` cell_3_type = '${godGate[0]["cell_3_type"]}' ,  cell_4_type = '${godGate[0]["cell_4_type"]}' , `
      + ` cell_1_score = ${godGate[0]["cell_1_score"]} ,  cell_2_score = ${godGate[0]["cell_2_score"]} ,`
      + ` cell_3_score = ${godGate[0]["cell_3_score"]} ,  cell_4_score = ${godGate[0]["cell_4_score"]}  `;
    await Elkaisar.DB.AUpdate(`points  = points - ?, gate_${gateIndex} = ?`, `god_gate_${gateIndex}`,
      "id_player = ?", [reqPoints, totalScore, this.idPlayer]);

    await Elkaisar.DB.AUpdate(quary, `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]);

    return {
      state: "ok",
      Gate: (await Elkaisar.DB.ASelectFrom("*", `god_gate_${gateIndex}`, "id_player = ?", [this.idPlayer]))[0],
      PlayerGate: (await Elkaisar.DB.ASelectFrom("*", "god_gate", "id_player = ?", [this.idPlayer]))[0]
    }
  }

  async addGatePoints() {

    const Item = Elkaisar.Base.validateGameNames(this.Parm.Item);
    const amount = Elkaisar.Base.validateId(this.Parm.amount);

    if (amount <= 0)
      return { state: "error_0" };

    let pointToAdd = 0;

    if (Item == "god_point_5")
      pointToAdd = 5;
    else if (Item == "god_point_30")
      pointToAdd = 30;
    else if (Item == "god_point_75")
      pointToAdd = 75;
    else if (Item == "god_point_175")
      pointToAdd = 175;
    else if (Item == "god_point_750")
      pointToAdd = 750;
    else if (Item == "god_point_1k")
      pointToAdd = 1000;
    else if (Item == "god_point_2k")
      pointToAdd = 2000;
    else if (Item == "god_point_5k")
      pointToAdd = 5000;
    else if (Item == "god_point_10k")
      pointToAdd = 10000;
    else if (Item == "god_point_50k")
      pointToAdd = 50000;
    else {
      Elkaisar.Base.TryToHack(this);
    }

    if (! await Elkaisar.Item.useItem(this.idPlayer, Item, amount))
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };

    pointToAdd *= amount;
    await Elkaisar.DB.AUpdate("points = points + ?", "god_gate", "id_player = ?", [pointToAdd, this.idPlayer]);
    return {
      state: "ok",
      PlayerGate: (await Elkaisar.DB.ASelectFrom("*", "god_gate", "id_player = ?", [this.idPlayer]))[0],
      PointToAdd: pointToAdd
    }
  }

  async getGateRank() {

    const gateIndex = Elkaisar.Base.validateId(this.Parm.gateIndex);
    const offset = Elkaisar.Base.validateAmount(this.Parm.offset);

    const quary = "god_gate JOIN player ON player.id_player = god_gate.id_player";
    return await Elkaisar.DB.ASelectFrom("player.name AS PlayerName, player.avatar, player.porm, player.id_player AS idPlayer, god_gate.`gate_${gateIndex}` AS score", quary, "1 ORDER BY god_gate.`gate_${gateIndex}` DESC, player.prestige DESC LIMIT 10 OFFSET ?", [offset]);
  }

  async getGodGateRankPointPlus() {
    return Elkaisar.Config.CGodGate.getRankPointPluse();
  }

  async OpenFourthCell() {

    const GateIndex = Elkaisar.Base.validateAmount(this.Parm.GateIndex);
    const godGateData = await Elkaisar.DB.ASelectFrom("*", "god_gate", "id_player = ?", [this.idPlayer]);
    if (!GateIndex)
      return { state: "error_0" };
    if (GateIndex > 4 || GateIndex <= 0)
      return { state: "error_1" };

    const Gate = await Elkaisar.DB.ASelectFrom("*", `god_gate_${GateIndex}`, "id_player = ?", [this.idPlayer]);
    if (!Gate.length)
      return { state: "error_2" };
    if (godGateData[0]["points"] < GateIndex * 5000)
      return { state: "error_3" };
    if (!await Elkaisar.Item.useItem(this.idPlayer, "skill_book", GateIndex * 10))
      return { state: "error_4" };

    const newPoint = ["break", "anti_break", "strike", "immunity"];
    await Elkaisar.DB.AUpdate(`c_4_s = 1, cell_4_score = 0, cell_4_type = ?`, `god_gate_${GateIndex}`, "id_player = ?", [newPoint[Elkaisar.Base.rand(0, 3)], this.idPlayer]);
    await Elkaisar.DB.AUpdate("points  = points - ?", "god_gate", "id_player = ?", [this.idPlayer, GateIndex * 5000]);

    return { state: "ok" };
  }

}

module.exports = AGodGate;