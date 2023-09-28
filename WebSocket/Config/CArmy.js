class CArmy {

  static ArmyCap = {
    0: 0,
    [Elkaisar.Config.ARMY_A]: 1,
    [Elkaisar.Config.ARMY_B]: 3,
    [Elkaisar.Config.ARMY_C]: 6,
    [Elkaisar.Config.ARMY_D]: 1,
    [Elkaisar.Config.ARMY_E]: 4,
    [Elkaisar.Config.ARMY_F]: 8,
    [Elkaisar.Config.ARMY_WALL_A]: 0,
    [Elkaisar.Config.ARMY_WALL_B]: 0,
    [Elkaisar.Config.ARMY_WALL_C]: 0
  };
  static ArmyCityToArmyHero = {
    0: 0,
    "army_a": 1,
    "army_b": 2,
    "army_c": 3,
    "army_d": 4,
    "army_e": 5,
    "army_f": 6
  };
  static ArmyCapCity = {
    "army_a": 1,
    "army_b": 3,
    "army_c": 6,
    "army_d": 1,
    "army_e": 4,
    "army_f": 8
  };
  static ArmyCityPlace = {
    0: 0,
    1: "army_a",
    2: "army_b",
    3: "army_c",
    4: "army_d",
    5: "army_e",
    6: "army_f"
  };
  static AmySpeed = [
    100, //البطل  فاضى
    300, //مشاة
    900, //فرسان
    600, //مدرعين
    250, //رماة
    150, //مقاليع
    100 //منجنيق
  ];
  static ArmyPower = {
    0: { "attack": 0, "def": 0, "vit": 0, "dam": 0, "break": 0, "anti_break": 0, "strike": 0, "immunity": 0, "res_cap": 0 },
    [Elkaisar.Config.ARMY_A]: { "attack": 8, "def": 8, "vit": 60, "dam": 3, "break": 1, "anti_break": 1, "strike": 3, "immunity": 1, "res_cap": 100 },
    [Elkaisar.Config.ARMY_B]: { "attack": 30, "def": 20, "vit": 250, "dam": 35, "break": 5, "anti_break": 2, "strike": 2, "immunity": 2, "res_cap": 200 },
    [Elkaisar.Config.ARMY_C]: { "attack": 25, "def": 30, "vit": 400, "dam": 40, "break": 10, "anti_break": 10, "strike": 10, "immunity": 10, "res_cap": 220 },
    [Elkaisar.Config.ARMY_D]: { "attack": 9, "def": 5, "vit": 45, "dam": 3, "break": 1, "anti_break": 1, "strike": 4, "immunity": 1, "res_cap": 75 },
    [Elkaisar.Config.ARMY_E]: { "attack": 19, "def": 25, "vit": 100, "dam": 19, "break": 2, "anti_break": 2, "strike": 12, "immunity": 2, "res_cap": 35 },
    [Elkaisar.Config.ARMY_F]: { "attack": 40, "def": 20, "vit": 600, "dam": 70, "break": 12, "anti_break": 10, "strike": 10, "immunity": 10, "res_cap": 75 },
    [Elkaisar.Config.ARMY_WALL_A]: { "attack": 20, "def": 10, "vit": 300, "dam": 10, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 },
    [Elkaisar.Config.ARMY_WALL_B]: { "attack": 19, "def": 25, "vit": 400, "dam": 35, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 },
    [Elkaisar.Config.ARMY_WALL_C]: { "attack": 40, "def": 20, "vit": 600, "dam": 70, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 }
  };

  static ArmyPowerFactor = {
    0: { attack: 0, def: 0, vit: 0, dam: 0, break: 0, anti_break: 0, strike: 0, immunity: 0 },
    [Elkaisar.Config.ARMY_A]: { attack: 1, def: 1, vit: 1, dam: 1, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_B]: { attack: 3, def: 3, vit: 2.3, dam: 2.4, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_C]: { attack: 6, def: 3.5, vit: 2.5, dam: 7.6, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_D]: { attack: 1, def: 1, vit: 1, dam: 1, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_E]: { attack: 4, def: 4, vit: 1.75, dam: 5, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_F]: { attack: 8, def: 5.5, vit: 2.85, dam: 10, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_WALL_A]: { attack: 1, def: 1, vit: 1, dam: 1, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_WALL_B]: { attack: 1, def: 1, vit: 1, dam: 1, break: 1, anti_break: 1, strike: 1, immunity: 1 },
    [Elkaisar.Config.ARMY_WALL_C]: { attack: 1, def: 1, vit: 1, dam: 1, break: 1, anti_break: 1, strike: 1, immunity: 1 }
  };

  static FoodEat = [0, 4, 18, 36, 5, 20, 150];
  static CurePrice = {
    "army_a": 18, // مشاة
    "army_b": 500, // فرسان
    "army_c": 600, // مدرعين
    "army_d": 30, // رماة
    "army_e": 120, // مقاليع
    "army_f": 450 // منجنيق
  };
  static ResourcseNeeded = {
    "army_a": {
      "food": 150, "wood": 500, "stone": 0, "metal": 100, "coin": 18, "time": 60, "pop": 1,
      "condetion": [
        { "type": "building", "lvl": 1, "buildingType": Elkaisar.Config.CITY_BUILDING_BARRACKS },
        { "type": "study", "lvl": 1, "study": "infantry" }
      ],
    },
    "army_b": {
      "food": 1500, "wood": 800, "stone": 0, "metal": 750, "coin": 500, "time": 300, "pop": 3,
      "condetion": [
        { "type": "building", "lvl": 5, "buildingType": Elkaisar.Config.CITY_BUILDING_STABL },
        { "type": "study", "lvl": 3, "study": "riding" }
      ]
    },
    "army_c": {
      "food": 2000, "wood": 500, "stone": 0, "metal": 2500, "coin": 600, "time": 500, "pop": 6,
      "condetion": [
        { "type": "building", "lvl": 9, "buildingType": Elkaisar.Config.CITY_BUILDING_BARRACKS },
        { "type": "study", "lvl": 6, "study": "infantry" }
      ]
    },
    "army_d": {
      "food": 300, "wood": 350, "stone": 0, "metal": 300, "coin": 30, "time": 120, "pop": 1,
      "condetion": [
        { "type": "building", "lvl": 2, "buildingType": Elkaisar.Config.CITY_BUILDING_BARRACKS },
        { "type": "study", "lvl": 2, "study": "infantry" }
      ]
    },
    "army_e": {
      "food": 1000, "wood": 1200, "stone": 0, "metal": 800, "coin": 120, "time": 180, "pop": 4,
      "condetion": [
        { "type": "building", "lvl": 3, "buildingType": Elkaisar.Config.CITY_BUILDING_WORKSHOP },
        { "type": "study", "lvl": 1, "study": "army" }
      ]
    },
    "army_f": {
      "food": 3000, "wood": 3000, "stone": 6000, "metal": 1200, "coin": 450, "time": 1000, "pop": 8,
      "condetion": [
        { "type": "building", "lvl": 7, "buildingType": Elkaisar.Config.CITY_BUILDING_WORKSHOP },
        { "type": "study", "lvl": 6, "study": "army" }
      ]
    },
    "spies": {
      "food": 600, "wood": 150, "stone": 0, "metal": 350, "coin": 90, "time": 60, "pop": 1,
      "condetion": [
        { "type": "building", "lvl": 1, "buildingType": Elkaisar.Config.CITY_BUILDING_STABL },
        { "type": "study", "lvl": 1, "study": "riding" }
      ]
    },
    "wall_a": {
      "food": 50, "wood": 500, "stone": 100, "metal": 50, "coin": 0, "time": 60, "pop": 0,
      "condetion": [
        { "type": "building", "lvl": 1, "buildingType": Elkaisar.Config.CITY_BUILDING_WALL },
        { "type": "study", "lvl": 1, "study": "safe" }
      ]
    },
    "wall_b": {
      "food": 200, "wood": 2000, "stone": 1000, "metal": 500, "coin": 0, "time": 180, "pop": 0,
      "condetion": [
        { "type": "building", "lvl": 3, "buildingType": Elkaisar.Config.CITY_BUILDING_WALL },
        { "type": "study", "lvl": 2, "study": "safe" }
      ]
    },
    "wall_c": {
      "food": 600, "wood": 0, "stone": 8000, "metal": 0, "coin": 0, "time": 600, "pop": 0,
      "condetion": [
        { "type": "building", "lvl": 5, "buildingType": Elkaisar.Config.CITY_BUILDING_WALL },
        { "type": "study", "lvl": 6, "study": "safe" }
      ]
    }
  };
  static CommonBlocks = {
    "light_house" : ["light_house_1", "light_house_2", "light_house_3", "light_house_4", "light_house_5", "light_house_6", "light_house_7", "light_house_8", "light_house_9", "light_house_10"],
    "above_palace": ["above_palace_1", "above_palace_2", "above_palace_3", "above_palace_4", "above_palace_5", "above_palace_6"],
    "under_palace": ["under_palace_1", "under_palace_2", "under_palace_3", "under_palace_4", "under_palace_5", "under_palace_6", "under_palace_7", "under_palace_8", "under_palace_9", "under_palace_10", "under_palace_11", "under_palace_12"],
    "hill"        : ["hill_1", "hill_2", "hill_3", "hill_4", "hill_5", "hill_6", "hill_7", "hill_8", "hill_9", "hill_10", "hill_11", "hill_12"],
    "under_wall"  : ["under_wall_1", "under_wall_2", "under_wall_3", "under_wall_4", "under_wall_5", "under_wall_6", "under_wall_7", "under_wall_8", "under_wall_9", "under_wall_10", "under_wall_11", "under_wall_12"],
    "around_wood" : ["around_wood_1", "around_wood_2", "around_wood_3"]
  };

  static BuildingTypeForArmy = {
      "army_a": Elkaisar.Config.CITY_BUILDING_BARRACKS, "army_b": Elkaisar.Config.CITY_BUILDING_STABL, "army_c": Elkaisar.Config.CITY_BUILDING_BARRACKS,
      "army_d": Elkaisar.Config.CITY_BUILDING_BARRACKS, "army_e": Elkaisar.Config.CITY_BUILDING_WORKSHOP, "army_f": Elkaisar.Config.CITY_BUILDING_WORKSHOP,
      "wall_a": Elkaisar.Config.CITY_BUILDING_WALL, "wall_b": Elkaisar.Config.CITY_BUILDING_WALL, "wall_c": Elkaisar.Config.CITY_BUILDING_WALL,
      "spies": Elkaisar.Config.CITY_BUILDING_STABL
  };

  static BuildingMinLvlReq = {
    "army_a": 1, "army_b" : 5, "army_c" : 9,
    "army_d": 2, "army_e" : 3, "army_f" : 7,
    "wall_a": 1, "wall_b" : 3, "wall_c" : 5,
    "spies": 1
  };
}


module.exports = CArmy;