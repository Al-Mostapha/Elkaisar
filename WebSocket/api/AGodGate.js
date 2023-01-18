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

}

module.exports = AGodGate;