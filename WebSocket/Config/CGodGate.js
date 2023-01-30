class CGodGate {

  static GateData = null;
  static GateMaxVal = null;

  static Gate1PP = null;
  static Gate2PP = null;
  static Gate3PP = null;
  static Gate4PP = null;

  static GateData = {
    "gate_1": {
      "points": 500,
      "porm": 4
    },
    "gate_2": {
      "points": 1500,
      "porm": 10
    },
    "gate_3": {
      "points": 2500,
      "porm": 18
    },
    "gate_4": {
      "points": 4000,
      "porm": 28
    }
  };

  static async getGateData() {
    if (!CGodGate.GateData)
      CGodGate.GateData = await Elkaisar.DB.ASelectFrom("*", "god_gate_req", "1");
    return {
      "gate_1": {
        "points": CGodGate.GateData[0]["god_gate_1_points"],
        "porm": CGodGate.GateData[0]["god_gate_1_porm"]
      },
      "gate_2": {
        "points": CGodGate.GateData[0]["god_gate_2_points"],
        "porm": CGodGate.GateData[0]["god_gate_2_porm"]
      },
      "gate_3": {
        "points": CGodGate.GateData[0]["god_gate_3_points"],
        "porm": CGodGate.GateData[0]["god_gate_3_porm"]
      },
      "gate_4": {
        "points": CGodGate.GateData[0]["god_gate_4_points"],
        "porm": CGodGate.GateData[0]["god_gate_4_porm"]
      }
    }
  }

  static MaxVal = {
    "vit": 100,
    "attack": 50,
    "damage": 50,
    "defence": 50,
    "break": 15,
    "anti_break": 15,
    "strike": 15,
    "immunity": 15
  };

  static async getMaxVal() {
    if (!CGodGate.GateMaxVal)
      CGodGate.GateMaxVal = await Elkaisar.DB.ASelectFrom("*", "god_gate_max_val", "1");
    return $GateData[0];
  }

  static RankPointPluse = {
    "1": {
      //  1     2     3     4     5     6     7     8    9      10
      "attack": [
        300, 300, 300, 200, 200, 200, 200, 200, 150, 150,
        145, 145, 140, 140, 130, 130, 120, 120, 110, 110,
        100, 100, 100, 100, 100, 75, 75, 75, 75, 75
      ]
    },
    "2": {
      "def": [
        300, 300, 300, 200, 200, 200, 200, 200, 150, 150,
        145, 145, 140, 140, 130, 130, 120, 120, 110, 110,
        100, 100, 100, 100, 100, 75, 75, 75, 75, 75
      ]
    },
    "3": {
      "vit": [
        750, 700, 700, 700, 600, 600, 600, 450, 450, 450,
        300, 300, 300, 300, 300, 250, 250, 250, 250, 250,
        150, 150, 150, 150, 150, 100, 100, 100, 100, 100
      ]
    },
    "4": {
      "dam": [
        200, 200, 200, 150, 150, 150, 150, 150, 140, 140,
        140, 130, 130, 130, 120, 120, 120, 110, 110, 100,
        100, 80, 80, 80, 80, 50, 50, 50, 50, 50
      ]
    }
  };

  static async getRankPointPluse() {
    if (!CGodGate.Gate1PP)
      CGodGate.Gate1PP = await Elkaisar.DB.ASelectFrom("*", "god_gate_point_plus_1", "1");
    if (!CGodGate.Gate2PP)
      CGodGate.Gate2PP = await Elkaisar.DB.ASelectFrom("*", "god_gate_point_plus_2", "1");
    if (!CGodGate.Gate3PP)
      CGodGate.Gate3PP = await Elkaisar.DB.ASelectFrom("*", "god_gate_point_plus_3", "1");
    if (!CGodGate.Gate4PP)
      CGodGate.Gate4PP = await Elkaisar.DB.ASelectFrom("*", "god_gate_point_plus_4", "1");


    RankPointPluse = {
      "1": CGodGate.getRankPP(CGodGate.Gate1PP),
      "2": CGodGate.getRankPP(CGodGate.Gate2PP),
      "3": CGodGate.getRankPP(CGodGate.Gate3PP),
      "4": CGodGate.getRankPP(CGodGate.Gate4PP)
    };
    return RankPointPluse;
  }

  static async getRankPP(Gate) {

    let GatePoints = {};
    for (let oneRow of Gate) {
      for (let oneKey in oneRow) {
        if (oneKey == "id" || oneKey == "rank")
          continue;
        if (oneRow[oneKey] == 0)
          continue;
        if (!GatePoints[oneKey])
          GatePoints[oneKey] = [];
        GatePoints[oneKey].push(oneRow[oneKey]);
      }
    }
    return GatePoints;

  }

}


module.exports = CGodGate;