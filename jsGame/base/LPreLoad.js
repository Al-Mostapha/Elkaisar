$.ajaxSetup({
  crossDomain: true
});
var FIXED_WORLD_UNIT = [];
var ALL_WORLD_CITY = [];
var WORLD_ALL_UNIT = [];
var Elkaisar = {};
Elkaisar.MAX_SCREEN_WIDTH = $(document).width();
Elkaisar.MAX_SCREEN_HEIGHT = $(document).height();
Elkaisar.worldAllUnits = new Array(500 * 500);
Elkaisar.Player = {};
Elkaisar.DPlayer = {
  Player: {},
  GuildData: {},
  PlayerState: {},
  PlayerEdu: {},
  Items: {},
  City: {},
  Heros: [],
  Equip: [],
  Notif: {}
};
Elkaisar.World = {};
Elkaisar.Ui = {};
Elkaisar.Ui.Select = {};
Elkaisar.World.Province = {};
Elkaisar.World.Map = {};
Elkaisar.MenuList = {};
Elkaisar.Building = {};
Elkaisar.Building.Palace = {};
Elkaisar.Building.Theater = {};
Elkaisar.Animation = {};
Elkaisar.WsLib = {};
Elkaisar.Contribute = {};
Elkaisar.Hero = {};
Elkaisar.CurrentHero = {};
Elkaisar.NextHero = {};
Elkaisar.Army = {};
Elkaisar.Equip = {};
Elkaisar.Item = {};
Elkaisar.Guild = {
  GuildData: {},
  LeaderName: "",
  prizeShare: 0,
  Allay: [],
  Invetaions: [],
  Requests: [],
  MemberList: []
};

Elkaisar.CurrentWorldUnit = {
  AttackQueList: [],
  Army: {
    army_a: 0, army_b: 0, army_c: 0,
    army_d: 0, army_e: 0, army_f: 0
  },
  EQuip: {
    boot: {}, armor: {}, shield: {}, helmet: {}, sword: {},
    belt: {}, necklace: {}, pendant: {}, ring: {}, steed: {}
  },
  xCoord: 0,
  yCoord: 0
};

Elkaisar.TimedTask = {
  TaskList: {
    Building: {},
    Study: {},
    Army: {},
    Jop: {}
  }

};


Elkaisar.Battel = {
  Battels: [],
  LeavinHeros: [],
  HeroBack: [],
  HeroGarrison: [],
  SpyingList: [],
  CurrentBattel: {}
};

Elkaisar.ServerData = {};

Elkaisar.LBase = {};
Elkaisar.Config = {
  WsPort: 0,
  WsHost: "",
  JsVersion: "",
  OuthToken: "",
  idServer: 0,
  UserLang: "ar",
  idCities: []
};


Elkaisar.City = {};
Elkaisar.CurrentCity = {};



Elkaisar.BaseData = {};
Elkaisar.GE = {};

Elkaisar.GE.CLoadingScene = {};
Elkaisar.GE.CCityScene = {};
Elkaisar.GE.CWorldScene = {};
Elkaisar.GE.CWorldDesertScene = {};

Elkaisar.GE.LoadingScene = {};
Elkaisar.GE.CityScene = {};
Elkaisar.GE.WorldScene = {};
Elkaisar.GE.WorldDesertScene = {};

Elkaisar.World.WorldMapIcon = {};


Elkaisar.GE.LPreLoad = function () {
  Elkaisar.GE.LoadingScene.load.image('worldFloor', Elkaisar.Config.AssetPath + '/images/world/worldFloor.jpg');

  Elkaisar.GE.LoadingScene.load.image('city_0', Elkaisar.Config.AssetPath + '/images/world/city_0.png');
  Elkaisar.GE.LoadingScene.load.image('city_1', Elkaisar.Config.AssetPath + '/images/world/city_1.png');
  Elkaisar.GE.LoadingScene.load.image('city_2', Elkaisar.Config.AssetPath + '/images/world/city_2.png');
  Elkaisar.GE.LoadingScene.load.image('city_3', Elkaisar.Config.AssetPath + '/images/world/city_3.png');
  Elkaisar.GE.LoadingScene.load.image('city_4', Elkaisar.Config.AssetPath + '/images/world/city_4.png');
  Elkaisar.GE.LoadingScene.load.image('d_1', Elkaisar.Config.AssetPath + '/images/world/wild/d_1.png');
  Elkaisar.GE.LoadingScene.load.image('d_2', Elkaisar.Config.AssetPath + '/images/world/wild/d_2.png');
  Elkaisar.GE.LoadingScene.load.image('d_3', Elkaisar.Config.AssetPath + '/images/world/wild/d_3.png');
  Elkaisar.GE.LoadingScene.load.image('d_4', Elkaisar.Config.AssetPath + '/images/world/wild/d_4.png');
  Elkaisar.GE.LoadingScene.load.image('d_5', Elkaisar.Config.AssetPath + '/images/world/wild/d_5.png');
  Elkaisar.GE.LoadingScene.load.image('d_6', Elkaisar.Config.AssetPath + '/images/world/wild/d_6.png');
  Elkaisar.GE.LoadingScene.load.image('d_7', Elkaisar.Config.AssetPath + '/images/world/wild/d_7.png');
  Elkaisar.GE.LoadingScene.load.image('d_8', Elkaisar.Config.AssetPath + '/images/world/wild/d_8.png');
  Elkaisar.GE.LoadingScene.load.image('d_9', Elkaisar.Config.AssetPath + '/images/world/wild/d_9.png');
  Elkaisar.GE.LoadingScene.load.image('d_10', Elkaisar.Config.AssetPath + '/images/world/wild/d_10.png');
  Elkaisar.GE.LoadingScene.load.image('m_1', Elkaisar.Config.AssetPath + '/images/world/wild/m_1.png');
  Elkaisar.GE.LoadingScene.load.image('m_2', Elkaisar.Config.AssetPath + '/images/world/wild/m_2.png');
  Elkaisar.GE.LoadingScene.load.image('m_3', Elkaisar.Config.AssetPath + '/images/world/wild/m_3.png');
  Elkaisar.GE.LoadingScene.load.image('m_4', Elkaisar.Config.AssetPath + '/images/world/wild/m_4.png');
  Elkaisar.GE.LoadingScene.load.image('m_5', Elkaisar.Config.AssetPath + '/images/world/wild/m_5.png');
  Elkaisar.GE.LoadingScene.load.image('m_6', Elkaisar.Config.AssetPath + '/images/world/wild/m_6.png');
  Elkaisar.GE.LoadingScene.load.image('m_7', Elkaisar.Config.AssetPath + '/images/world/wild/m_7.png');
  Elkaisar.GE.LoadingScene.load.image('m_8', Elkaisar.Config.AssetPath + '/images/world/wild/m_8.png');
  Elkaisar.GE.LoadingScene.load.image('m_9', Elkaisar.Config.AssetPath + '/images/world/wild/m_9.png');
  Elkaisar.GE.LoadingScene.load.image('m_10', Elkaisar.Config.AssetPath + '/images/world/wild/m_10.png');
  Elkaisar.GE.LoadingScene.load.image('w_1', Elkaisar.Config.AssetPath + '/images/world/wild/w_1.png');
  Elkaisar.GE.LoadingScene.load.image('w_2', Elkaisar.Config.AssetPath + '/images/world/wild/w_2.png');
  Elkaisar.GE.LoadingScene.load.image('w_3', Elkaisar.Config.AssetPath + '/images/world/wild/w_3.png');
  Elkaisar.GE.LoadingScene.load.image('w_4', Elkaisar.Config.AssetPath + '/images/world/wild/w_4.png');
  Elkaisar.GE.LoadingScene.load.image('w_5', Elkaisar.Config.AssetPath + '/images/world/wild/w_5.png');
  Elkaisar.GE.LoadingScene.load.image('w_6', Elkaisar.Config.AssetPath + '/images/world/wild/w_6.png');
  Elkaisar.GE.LoadingScene.load.image('w_7', Elkaisar.Config.AssetPath + '/images/world/wild/w_7.png');
  Elkaisar.GE.LoadingScene.load.image('w_8', Elkaisar.Config.AssetPath + '/images/world/wild/w_8.png');
  Elkaisar.GE.LoadingScene.load.image('w_9', Elkaisar.Config.AssetPath + '/images/world/wild/w_9.png');
  Elkaisar.GE.LoadingScene.load.image('w_10', Elkaisar.Config.AssetPath + '/images/world/wild/w_10.png');
  Elkaisar.GE.LoadingScene.load.spritesheet('f_1', Elkaisar.Config.AssetPath + '/images/world/wild/f_1.png', { frameWidth: 128, frameHeight: 128 });
  Elkaisar.GE.LoadingScene.load.spritesheet('f_2', Elkaisar.Config.AssetPath + '/images/world/wild/f_2.png', { frameWidth: 128, frameHeight: 128 });
  Elkaisar.GE.LoadingScene.load.spritesheet('f_3', Elkaisar.Config.AssetPath + '/images/world/wild/f_3.png', { frameWidth: 128, frameHeight: 128 });
  Elkaisar.GE.LoadingScene.load.spritesheet('flagOverCity', Elkaisar.Config.AssetPath + '/images/animation/flags.png', { frameWidth: 34, frameHeight: 24 });
  Elkaisar.GE.LoadingScene.load.image('arrow', Elkaisar.Config.AssetPath + '/images/animation/currentUnit.png');
  Elkaisar.GE.LoadingScene.load.image('godGateBtn', Elkaisar.Config.AssetPath + '/images/godGate/godGate.png');
  Elkaisar.GE.LoadingScene.load.image('fireBtn', Elkaisar.Config.AssetPath + '/images/animation/fireBtn.png');
  Elkaisar.GE.LoadingScene.load.image('mnawrat', Elkaisar.Config.AssetPath + '/images/world/30.png');
  Elkaisar.GE.LoadingScene.load.image('front_squad', Elkaisar.Config.AssetPath + '/images/world/front_squad.png');
  Elkaisar.GE.LoadingScene.load.image('front_band', Elkaisar.Config.AssetPath + '/images/world/front_band.png');
  Elkaisar.GE.LoadingScene.load.image('front_squadron', Elkaisar.Config.AssetPath + '/images/world/front_squadron.png');
  Elkaisar.GE.LoadingScene.load.image('front_division', Elkaisar.Config.AssetPath + '/images/world/front_division.png');
  Elkaisar.GE.LoadingScene.load.image('armed_light_squad', Elkaisar.Config.AssetPath + '/images/world/armed_light_squad.png');
  Elkaisar.GE.LoadingScene.load.image('armed_light_band', Elkaisar.Config.AssetPath + '/images/world/armed_light_band.png');
  Elkaisar.GE.LoadingScene.load.image('armed_light_squadron', Elkaisar.Config.AssetPath + '/images/world/armed_light_squadron.png');
  Elkaisar.GE.LoadingScene.load.image('armed_light_division', Elkaisar.Config.AssetPath + '/images/world/armed_light_division.png');
  Elkaisar.GE.LoadingScene.load.image('armed_heavy_squad', Elkaisar.Config.AssetPath + '/images/world/armed_heavy_squad.png');
  Elkaisar.GE.LoadingScene.load.image('armed_heavy_band', Elkaisar.Config.AssetPath + '/images/world/armed_heavy_band.png');
  Elkaisar.GE.LoadingScene.load.image('armed_heavy_squadron', Elkaisar.Config.AssetPath + '/images/world/armed_heavy_squadron.png');
  Elkaisar.GE.LoadingScene.load.image('armed_heavy_division', Elkaisar.Config.AssetPath + '/images/world/armed_heavy_division.png');
  Elkaisar.GE.LoadingScene.load.image('guard_squad', Elkaisar.Config.AssetPath + '/images/world/guard_squad.png');
  Elkaisar.GE.LoadingScene.load.image('guard_band', Elkaisar.Config.AssetPath + '/images/world/guard_band.png');
  Elkaisar.GE.LoadingScene.load.image('guard_squadron', Elkaisar.Config.AssetPath + '/images/world/guard_squadron.png');
  Elkaisar.GE.LoadingScene.load.image('guard_division', Elkaisar.Config.AssetPath + '/images/world/guard_division.png');
  Elkaisar.GE.LoadingScene.load.image('brave_thunder', Elkaisar.Config.AssetPath + '/images/world/brave_thunder.png');
  Elkaisar.GE.LoadingScene.load.image('gang', Elkaisar.Config.AssetPath + '/images/world/gang.png');
  Elkaisar.GE.LoadingScene.load.image('mugger', Elkaisar.Config.AssetPath + '/images/world/mugger.png');
  Elkaisar.GE.LoadingScene.load.image('thief', Elkaisar.Config.AssetPath + '/images/world/thief.png');
  Elkaisar.GE.LoadingScene.load.image('carthage_gang', Elkaisar.Config.AssetPath + '/images/world/carthage/gang.png');
  Elkaisar.GE.LoadingScene.load.image('carthage_teams', Elkaisar.Config.AssetPath + '/images/world/carthage/teams.png');
  Elkaisar.GE.LoadingScene.load.image('carthage_rebels', Elkaisar.Config.AssetPath + '/images/world/carthage/rebels.png');
  Elkaisar.GE.LoadingScene.load.image('carthage_forces', Elkaisar.Config.AssetPath + '/images/world/carthage/forces.png');
  Elkaisar.GE.LoadingScene.load.image('carthage_capital', Elkaisar.Config.AssetPath + '/images/world/carthage/capital.png');
  Elkaisar.GE.LoadingScene.load.image('army_capital', Elkaisar.Config.AssetPath + '/images/world/army-capital.png');
  Elkaisar.GE.LoadingScene.load.image('queenCity_1', Elkaisar.Config.AssetPath + '/images/world/queenCity_1.png');
  Elkaisar.GE.LoadingScene.load.image('queenCity_2', Elkaisar.Config.AssetPath + '/images/world/queenCity_2.png');
  Elkaisar.GE.LoadingScene.load.image('queenCity_3', Elkaisar.Config.AssetPath + '/images/world/queenCity_3.png');
  Elkaisar.GE.LoadingScene.load.image('repleCastle_1', Elkaisar.Config.AssetPath + '/images/world/repleCastle_1.png');
  Elkaisar.GE.LoadingScene.load.image('repleCastle_2', Elkaisar.Config.AssetPath + '/images/world/repleCastle_2.png');
  Elkaisar.GE.LoadingScene.load.image('repleCastle_3', Elkaisar.Config.AssetPath + '/images/world/repleCastle_3.png');
  Elkaisar.GE.LoadingScene.load.image('wolfStatue', Elkaisar.Config.AssetPath + '/images/world/wolf.png');
  Elkaisar.GE.LoadingScene.load.image('arena', Elkaisar.Config.AssetPath + '/images/world/arena.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_1', Elkaisar.Config.AssetPath + '/images/world/seaCity_1.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_2', Elkaisar.Config.AssetPath + '/images/world/seaCity_2.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_3', Elkaisar.Config.AssetPath + '/images/world/seaCity_3.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_4', Elkaisar.Config.AssetPath + '/images/world/seaCity_4.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_5', Elkaisar.Config.AssetPath + '/images/world/seaCity_5.png');
  Elkaisar.GE.LoadingScene.load.image('seaCity_6', Elkaisar.Config.AssetPath + '/images/world/seaCity_6.png');
  Elkaisar.GE.LoadingScene.load.image('challangeFieldPlayer', Elkaisar.Config.AssetPath + '/images/world/challangeFieldPlayer.png');
  Elkaisar.GE.LoadingScene.load.image('challangeFieldGuild', Elkaisar.Config.AssetPath + '/images/world/challangeFieldGuild.png');
  Elkaisar.GE.LoadingScene.load.image('challangeFieldTeam', Elkaisar.Config.AssetPath + '/images/world/challangeFieldTeam.png');
  Elkaisar.GE.LoadingScene.load.image('challangeFieldServer', Elkaisar.Config.AssetPath + '/images/world/challangeFieldServer.png');
  Elkaisar.GE.LoadingScene.load.image('fightChallangePlayer', Elkaisar.Config.AssetPath + '/images/world/fightChallangePlayer.png');
  Elkaisar.GE.LoadingScene.load.image('fightChallangeGuild', Elkaisar.Config.AssetPath + '/images/world/fightChallangeGuild.png');
  Elkaisar.GE.LoadingScene.load.image('fightChallangeTeam', Elkaisar.Config.AssetPath + '/images/world/fightChallangeTeam.png');
  Elkaisar.GE.LoadingScene.load.image('fightChallangeServer', Elkaisar.Config.AssetPath + '/images/world/fightChallangeServer.png');
  Elkaisar.GE.LoadingScene.load.image('city_shield', Elkaisar.Config.AssetPath + '/images/world/city_shield.png');
  Elkaisar.GE.LoadingScene.load.image('palace', Elkaisar.Config.AssetPath + '/images/city/palace.png');
  Elkaisar.GE.LoadingScene.load.image('wall_0', Elkaisar.Config.AssetPath + '/images/city/wall_0_.png');
  Elkaisar.GE.LoadingScene.load.image('wall_1', Elkaisar.Config.AssetPath + '/images/city/wall_1_.png');
  Elkaisar.GE.LoadingScene.load.image('wall_2', Elkaisar.Config.AssetPath + '/images/city/wall_2_.png');
  Elkaisar.GE.LoadingScene.load.image('wall_3', Elkaisar.Config.AssetPath + '/images/city/wall_3_.png');
  Elkaisar.GE.LoadingScene.load.image('wall_4', Elkaisar.Config.AssetPath + '/images/city/wall_4_.png');
  Elkaisar.GE.LoadingScene.load.image('seaport', Elkaisar.Config.AssetPath + '/images/city/_seaport.png');
  Elkaisar.GE.LoadingScene.load.image('market', Elkaisar.Config.AssetPath + '/images/city/_market.png');
  Elkaisar.GE.LoadingScene.load.image('farm', Elkaisar.Config.AssetPath + '/images/city/_farm.png');
  Elkaisar.GE.LoadingScene.load.image('mine', Elkaisar.Config.AssetPath + '/images/city/_mine.png');
  Elkaisar.GE.LoadingScene.load.image('stone', Elkaisar.Config.AssetPath + '/images/city/_mahger.png');
  Elkaisar.GE.LoadingScene.load.image('wood', Elkaisar.Config.AssetPath + '/images/city/_wood_maker.png');
  Elkaisar.GE.LoadingScene.load.image('lighthouse', Elkaisar.Config.AssetPath + '/images/city/_lighthouse.png');
  Elkaisar.GE.LoadingScene.load.image('B1', Elkaisar.Config.AssetPath + '/images/city/_B1.png');
  Elkaisar.GE.LoadingScene.load.image('B2', Elkaisar.Config.AssetPath + '/images/city/_B2.png');
  Elkaisar.GE.LoadingScene.load.image('B3', Elkaisar.Config.AssetPath + '/images/city/_B3.png');
  Elkaisar.GE.LoadingScene.load.image('B4', Elkaisar.Config.AssetPath + '/images/city/_B4.png');
  Elkaisar.GE.LoadingScene.load.image('B5', Elkaisar.Config.AssetPath + '/images/city/_B5.png');
  Elkaisar.GE.LoadingScene.load.image('B6', Elkaisar.Config.AssetPath + '/images/city/_B6.png');
  Elkaisar.GE.LoadingScene.load.image('B7', Elkaisar.Config.AssetPath + '/images/city/_B7.png');
  Elkaisar.GE.LoadingScene.load.image('B8', Elkaisar.Config.AssetPath + '/images/city/_B8.png');
  Elkaisar.GE.LoadingScene.load.image('B9', Elkaisar.Config.AssetPath + '/images/city/_B9.png');
  Elkaisar.GE.LoadingScene.load.image('B10', Elkaisar.Config.AssetPath + '/images/city/_B10.png');
  Elkaisar.GE.LoadingScene.load.image('B11', Elkaisar.Config.AssetPath + '/images/city/_B11.png');
  Elkaisar.GE.LoadingScene.load.image('no_building', Elkaisar.Config.AssetPath + '/images/city/no_building.png');
  Elkaisar.GE.LoadingScene.load.image('city_floor', Elkaisar.Config.AssetPath + '/images/city/city_floor.jpg');


  Elkaisar.GE.LoadingScene.load.image('fountain', Elkaisar.Config.AssetPath + '/images/animation/fountain.png');
  Elkaisar.GE.LoadingScene.load.image('ani_wood_maker', Elkaisar.Config.AssetPath + '/images/animation/wood_maker.png');
  Elkaisar.GE.LoadingScene.load.image('ani_wood_man', Elkaisar.Config.AssetPath + '/images/animation/wood_man.png');
  Elkaisar.GE.LoadingScene.load.image('mine_man', Elkaisar.Config.AssetPath + '/images/animation/mine_man.png');
  Elkaisar.GE.LoadingScene.load.image('stone_man', Elkaisar.Config.AssetPath + '/images/animation/stone_man.png');
  Elkaisar.GE.LoadingScene.load.image('stone_carry', Elkaisar.Config.AssetPath + '/images/animation/stone_carry.png');
  Elkaisar.GE.LoadingScene.load.image('no_carry', Elkaisar.Config.AssetPath + '/images/animation/no_carry.png');
  Elkaisar.GE.LoadingScene.load.spritesheet('WorldUnitFire', Elkaisar.Config.AssetPath + '/images/animation/attack_fire.png', { frameWidth: 42, frameHeight: 63 });

  Elkaisar.GE.LoadingScene.load.image('cloud', Elkaisar.Config.AssetPath + '/images/animation/cloud.png');
  Elkaisar.GE.LoadingScene.load.image('unit_floor', Elkaisar.Config.AssetPath + '/images/world/unit_floor.png');
  Elkaisar.GE.LoadingScene.load.image('building_lvl_lable_1', Elkaisar.Config.AssetPath + '/images/background/lvl_lable/lable_1.png');
  Elkaisar.GE.LoadingScene.load.image('building_lvl_lable_2', Elkaisar.Config.AssetPath + '/images/background/lvl_lable/lable_2.png');
  Elkaisar.GE.LoadingScene.load.image('building_lvl_lable_3', Elkaisar.Config.AssetPath + '/images/background/lvl_lable/lable_3.png');
  Elkaisar.GE.LoadingScene.load.image('building_lvl_lable_4', Elkaisar.Config.AssetPath + '/images/background/lvl_lable/lable_4.png');
  Elkaisar.GE.LoadingScene.load.image('building_lvl_lable_5', Elkaisar.Config.AssetPath + '/images/background/lvl_lable/lable_5.png');

  Elkaisar.GE.LoadingScene.load.image('MapIconAttack', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/Attack.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconOccupy', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/Occupy.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconRainForce', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/RainForce.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconSpy', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/Spy.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconTransPort', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/TransPort.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconEnter', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/Enter.png');
  Elkaisar.GE.LoadingScene.load.image('MapIconArena', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/BattelField.png');
  Elkaisar.GE.LoadingScene.load.image('CoordHolder', Elkaisar.Config.AssetPath + '/images/world/WorldFloorIcon/CoordHolder.png');
  Elkaisar.GE.LoadingScene.load.image('DashedLineRed', Elkaisar.Config.AssetPath + '/images/world/DashedLine/DashedLineRed.png');
  Elkaisar.GE.LoadingScene.load.image('DashedLineGreen', Elkaisar.Config.AssetPath + '/images/world/DashedLine/DashedLineGreen.png');
  Elkaisar.GE.LoadingScene.load.image('DashedLineLGreen', Elkaisar.Config.AssetPath + '/images/world/DashedLine/DashedLineLGreen.png');
  Elkaisar.GE.LoadingScene.load.image('DashedLineBlue', Elkaisar.Config.AssetPath + '/images/world/DashedLine/DashedLineBlue.png');
  Elkaisar.GE.LoadingScene.load.image('DashedLineGray', Elkaisar.Config.AssetPath + '/images/world/DashedLine/DashedLineGray.png');


  Elkaisar.GE.LoadingScene.load.image('goSourceA', Elkaisar.Config.AssetPath + '/images/world/DashedLine/goSourceA.png');
  Elkaisar.GE.LoadingScene.load.image('goSourceH', Elkaisar.Config.AssetPath + '/images/world/DashedLine/goSourceH.png');
  Elkaisar.GE.LoadingScene.load.image('goSourceD', Elkaisar.Config.AssetPath + '/images/world/DashedLine/goSourceD.png');
  Elkaisar.GE.LoadingScene.load.image('goSourceN', Elkaisar.Config.AssetPath + '/images/world/DashedLine/goSourceN.png');


  Elkaisar.GE.LoadingScene.load.image('SFaceA1', Elkaisar.Config.AssetPath + '/images/hero/faceA1.png');
  Elkaisar.GE.LoadingScene.load.image('SFaceA1', Elkaisar.Config.AssetPath + '/images/hero/faceA1.png');
  Elkaisar.GE.LoadingScene.load.image('SFaceA1', Elkaisar.Config.AssetPath + '/images/hero/faceA1.png');
  Elkaisar.GE.LoadingScene.load.image('SFaceA1', Elkaisar.Config.AssetPath + '/images/hero/faceA1.png');
  Elkaisar.GE.LoadingScene.load.image('SFaceA1', Elkaisar.Config.AssetPath + '/images/hero/faceA1.png');

  Elkaisar.GE.LoadingScene.load.spritesheet('FarmLabor', Elkaisar.Config.AssetPath + '/images/animation/City/FarmLabor.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('FarmLaborCarryR', Elkaisar.Config.AssetPath + '/images/animation/City/FarmLaborCarryR.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('FarmLaborCarryD', Elkaisar.Config.AssetPath + '/images/animation/City/FarmLaborCarryD.png', { frameWidth: 42, frameHeight: 42 });


  Elkaisar.GE.LoadingScene.load.spritesheet('StoneLabor', Elkaisar.Config.AssetPath + '/images/animation/City/StoneLabor.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('StoneLaborCarryL', Elkaisar.Config.AssetPath + '/images/animation/City/StoneLaborCarryL.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('StoneLaborCarryD', Elkaisar.Config.AssetPath + '/images/animation/City/StoneLaborCarryD.png', { frameWidth: 42, frameHeight: 42 });

  Elkaisar.GE.LoadingScene.load.spritesheet('IronLabor', Elkaisar.Config.AssetPath + '/images/animation/City/IronLabor.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('WoodLabor', Elkaisar.Config.AssetPath + '/images/animation/City/WoodLabor.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('WoodTool', Elkaisar.Config.AssetPath + '/images/animation/City/WoodTool.png', { frameWidth: 65, frameHeight: 46 });

  Elkaisar.GE.LoadingScene.load.spritesheet('Horse', Elkaisar.Config.AssetPath + '/images/animation/City/Horse.png', { frameWidth: 34, frameHeight: 20 });
  Elkaisar.GE.LoadingScene.load.spritesheet('Fountain', Elkaisar.Config.AssetPath + '/images/animation/City/Fountain.png', { frameWidth: 40, frameHeight: 32 });
  Elkaisar.GE.LoadingScene.load.spritesheet('Woman', Elkaisar.Config.AssetPath + '/images/animation/City/Woman.png', { frameWidth: 28, frameHeight: 28 });

  Elkaisar.GE.LoadingScene.load.spritesheet('noCarryWorkerD', Elkaisar.Config.AssetPath + '/images/animation/City/noCarryWorkerD.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('noCarryWorkerR', Elkaisar.Config.AssetPath + '/images/animation/City/noCarryWorkerR.png', { frameWidth: 42, frameHeight: 42 });

  Elkaisar.GE.LoadingScene.load.spritesheet('UpgradingHammer', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingHammer.png', { frameWidth: 161, frameHeight: 120 });

  Elkaisar.GE.LoadingScene.load.spritesheet('UpgradingLaborL', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingLaborL.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.spritesheet('UpgradingLaborR', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingLaborR.png', { frameWidth: 42, frameHeight: 42 });
  Elkaisar.GE.LoadingScene.load.image('UpgradingSupportsU', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingSupportsU.png');
  Elkaisar.GE.LoadingScene.load.image('UpgradingSupportsD', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingSupportsD.png');
  Elkaisar.GE.LoadingScene.load.image('UpgradingPalaceSupU', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingPalaceSupU.png');
  Elkaisar.GE.LoadingScene.load.image('UpgradingPalaceSupD', Elkaisar.Config.AssetPath + '/images/animation/City/UpgradingPalaceSupD.png');
  Elkaisar.GE.LoadingScene.load.image('ConstructingHammer', Elkaisar.Config.AssetPath + '/images/city/Space.png');

  
  Elkaisar.GE.LoadingScene.load.tilemapTiledJSON('WorldDesert', Elkaisar.Config.AssetPath + `/jsGame${Elkaisar.Config.JsVersion}/json/tileMap/WorldDesert.json`);
  Elkaisar.GE.LoadingScene.load.image('World_1', Elkaisar.Config.AssetPath + '/images/worldDesert/World_1.png');
  Elkaisar.GE.LoadingScene.load.image('World_4', Elkaisar.Config.AssetPath + '/images/worldDesert/World_4.png');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_01', 'images/CityFloor/mainCityBGHall_1.png', 'images/CityFloor/mainCityBGHall_1.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_02', 'images/CityFloor/mainCityBGHall_2.png', 'images/CityFloor/mainCityBGHall_2.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_03', 'images/CityFloor/mainCityBGHall_3.png', 'images/CityFloor/mainCityBGHall_3.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_04', 'images/CityFloor/mainCityBGHall_4.png', 'images/CityFloor/mainCityBGHall_4.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_05', 'images/CityFloor/mainCityBGHall_5.png', 'images/CityFloor/mainCityBGHall_5.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_06', 'images/CityFloor/mainCityBGHall_6.png', 'images/CityFloor/mainCityBGHall_6.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_07', 'images/CityFloor/mainCityBGHall_7.png', 'images/CityFloor/mainCityBGHall_7.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_08', 'images/CityFloor/mainCityBGHall_8.png', 'images/CityFloor/mainCityBGHall_8.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_09', 'images/CityFloor/mainCityBGHall_9.png', 'images/CityFloor/mainCityBGHall_9.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_10', 'images/CityFloor/mainCityBGHall_10.png', 'images/CityFloor/mainCityBGHall_10.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_11', 'images/CityFloor/mainCityBGHall_11.png', 'images/CityFloor/mainCityBGHall_11.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_12', 'images/CityFloor/mainCityBGHall_12.png', 'images/CityFloor/mainCityBGHall_12.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_13', 'images/CityFloor/mainCityBGHall_13.png', 'images/CityFloor/mainCityBGHall_13.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_14', 'images/CityFloor/mainCityBGHall_14.png', 'images/CityFloor/mainCityBGHall_14.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_15', 'images/CityFloor/mainCityBGHall_15.png', 'images/CityFloor/mainCityBGHall_15.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_16', 'images/CityFloor/mainCityBGHall_16.png', 'images/CityFloor/mainCityBGHall_16.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_17', 'images/CityFloor/mainCityBGHall_17.png', 'images/CityFloor/mainCityBGHall_17.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_18', 'images/CityFloor/mainCityBGHall_18.png', 'images/CityFloor/mainCityBGHall_18.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_19', 'images/CityFloor/mainCityBGHall_19.png', 'images/CityFloor/mainCityBGHall_19.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_20', 'images/CityFloor/mainCityBGHall_20.png', 'images/CityFloor/mainCityBGHall_20.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_21', 'images/CityFloor/mainCityBGHall_21.png', 'images/CityFloor/mainCityBGHall_21.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_22', 'images/CityFloor/mainCityBGHall_22.png', 'images/CityFloor/mainCityBGHall_22.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_23', 'images/CityFloor/mainCityBGHall_23.png', 'images/CityFloor/mainCityBGHall_23.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_24', 'images/CityFloor/mainCityBGHall_24.png', 'images/CityFloor/mainCityBGHall_24.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_25', 'images/CityFloor/mainCityBGHall_25.png', 'images/CityFloor/mainCityBGHall_25.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_26', 'images/CityFloor/mainCityBGHall_26.png', 'images/CityFloor/mainCityBGHall_26.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_27', 'images/CityFloor/mainCityBGHall_27.png', 'images/CityFloor/mainCityBGHall_27.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_28', 'images/CityFloor/mainCityBGHall_28.png', 'images/CityFloor/mainCityBGHall_28.json');
  // Elkaisar.GE.LoadingScene.load.atlas('MainCityBG_top', 'images/CityFloor/mainCityBGHall_top.png', 'images/CityFloor/mainCityBGHall_top.json');
};

Elkaisar.GE.ConfigCityAnims = function () {


  var Scene = Elkaisar.GE.CityScene;
  Scene.anims.create({ key: 'FarmLabor.A', frames: Scene.anims.generateFrameNumbers('FarmLabor'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'FarmLaborCarryR.A', frames: Scene.anims.generateFrameNumbers('FarmLaborCarryR'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'FarmLaborCarryD.A', frames: Scene.anims.generateFrameNumbers('FarmLaborCarryD'), frameRate: 6, repeat: -1 });

  Scene.anims.create({ key: 'noCarryWorkerD.A', frames: Scene.anims.generateFrameNumbers('noCarryWorkerD'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'noCarryWorkerR.A', frames: Scene.anims.generateFrameNumbers('noCarryWorkerR'), frameRate: 6, repeat: -1 });

  Scene.anims.create({ key: 'StoneLabor.A', frames: Scene.anims.generateFrameNumbers('StoneLabor'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'StoneLaborCarryL.A', frames: Scene.anims.generateFrameNumbers('StoneLaborCarryL'), frameRate: 6, repeat: -1 });

  Scene.anims.create({ key: 'IronLabor.A', frames: Scene.anims.generateFrameNumbers('IronLabor'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'WoodLabor.A', frames: Scene.anims.generateFrameNumbers('WoodLabor'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'WoodTool.A', frames: Scene.anims.generateFrameNumbers('WoodTool'), frameRate: 6, repeat: -1 });


  Scene.anims.create({ key: 'Horse.A', frames: Scene.anims.generateFrameNumbers('Horse'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'Fountain.A', frames: Scene.anims.generateFrameNumbers('Fountain'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'WomanFace.A', frames: Scene.anims.generateFrameNumbers('Woman', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'WomanBack.A', frames: Scene.anims.generateFrameNumbers('Woman', { frames: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] }), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'Woman.A', frames: Scene.anims.generateFrameNumbers('Woman'), frameRate: 6, repeat: -1 });

  Scene.anims.create({ key: 'UpgradingHammer.A', frames: Scene.anims.generateFrameNumbers('UpgradingHammer'), frameRate: 10, repeat: -1 });
  Scene.anims.create({ key: 'UpgradingLaborL.A', frames: Scene.anims.generateFrameNumbers('UpgradingLaborL'), frameRate: 6, repeat: -1 });
  Scene.anims.create({ key: 'UpgradingLaborR.A', frames: Scene.anims.generateFrameNumbers('UpgradingLaborR'), frameRate: 6, repeat: -1 });

  Animation.FixedCityAnimation();
};

Elkaisar.GE.ConfigAnims = function () {

  var Scene = Elkaisar.GE.WorldScene;
  Elkaisar.GE.WorldScene.anims.create({
    key: 'Forest.1',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('f_1'),
    frameRate: 3, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'Forest.2',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('f_2'),
    frameRate: 3, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'Forest.3',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('f_3'),
    frameRate: 3, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.Nut',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [0, 6, 12, 18, 24, 30] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.Fri',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [1, 7, 13, 19, 25, 31] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.All',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [2, 8, 14, 20, 26, 32] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.Min',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [3, 9, 15, 21, 27, 33] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.Ene',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [4, 10, 16, 22, 28, 34] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'CityFlag.Dea',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('flagOverCity', { frames: [5, 11, 17, 23, 29, 35] }),
    frameRate: 6, repeat: -1
  });
  Elkaisar.GE.WorldScene.anims.create({
    key: 'WorldUnitFire.Ani',
    frames: Elkaisar.GE.WorldScene.anims.generateFrameNumbers('WorldUnitFire', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
    frameRate: 6, repeat: -1
  });
};


Elkaisar.GE.Loading = function (percent) {
  $("#load-percent").html(Math.floor(percent) + "%");
  $("#load-bar div").css({ width: percent + "%" });
};


Elkaisar.GE.CLoadingScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { "key": "LoadingScene" });
    Elkaisar.GE.LoadingScene = this;
  },
  init: function () { },
  preload: function () {
    Elkaisar.GE.LPreLoad();
    this.load.on('progress', function (value) {
      Elkaisar.GE.Loading(value * 100);
    });
    this.load.on('complete', function () {
      Elkaisar.GE.PlayerEnterServerWeb();
    });
  },
  create: function () {
    Elkaisar.GE.LoadingScene.events.on('transitionout', function (targetScene, duration) { });
  },
  update: function () { }
});


var game;
var speedMult = 0.7;
var friction = 0.99;

Elkaisar.GE.VerfiyPlayerToken = function () {
  if (!localStorage.getItem(UserToken)) {
    localStorage.clear();
    window.location.href = window.location.origin;
    return;
  }
  return $.ajax({
    url: `${HomeUrl}/HomeApi/ALogin/VerifyPlayerToken`,
    type: 'POST',
    data: {
      UserToken: UserToken,
      LoginToken: LoginToken,
    },
    success: function (data) {
      if (!isJson(data))
        return Elkaisar.LBase.Error(data);
      const JsonData = JSON.parse(data);
      if (JsonData.state == "ok") {
        Elkaisar.Config.idUser = JsonData.idUser;
        Elkaisar.Config.idServer = JsonData.idServer;
        Elkaisar.Config.ServerData = JsonData.ServerData;
        Elkaisar.Config.WsPort = JsonData.WsPort;
        Elkaisar.Config.WsHost = JsonData.WsHost;
        Elkaisar.Config.ApiPort = Elkaisar.Config.ServerData.port;
        Elkaisar.Config.JsVersion = JsonData.JsVersion;
        Elkaisar.Config.ApiUrl = JsonData.ApiUrl;
        Elkaisar.Config.ApiHost = JsonData.ApiHost;
        Elkaisar.Config.AssetPath = JsonData.AssetPath;
        Elkaisar.Config.NodeUrl = `http://${Elkaisar.Config.WsHost}:${Elkaisar.Config.WsPort}`;
        $("#server-name .name").html(Elkaisar.Config.ServerData.name);
        $(document).trigger("GameReady");
      } else {
        window.location.href = "http://www.elkaisar.com";
        window.location.replace("http://www.elkaisar.com");
      }
    },
  });
}

Elkaisar.GE.PlayerEnterServerWeb = function () {

  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ALogin/PlayerEnterServerWeb`,
    type: 'POST',
    data: {
      token: UserToken,
    },
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data)) {
        Elkaisar.LBase.Error(data);
        return;
      }

      var JsonData = JSON.parse(data);
      if (JsonData.state !== 'ok')
        console.log(JsonData);
      Elkaisar.DPlayer.Player = JsonData.Player;
      Elkaisar.Config.idServer = JsonData.idServer;
      Elkaisar.Config.idCities = JsonData.idCities;
      Elkaisar.Config.PayLink = JsonData.PayLink;
      Elkaisar.Config.RechCode = JsonData.RechCode;
      Elkaisar.Config.OuthToken = JsonData.OuthToken;
      Elkaisar.Config.ServerCount = JsonData.Server;
      if (Elkaisar.DPlayer.Player.panned >= $.now() / 1000) {
        Elkaisar.LBase.Error('هذا الحساب محظور');
        return;
      }

      $.ajaxSetup({
        'data': {
          'idPlayerV': Elkaisar.DPlayer.Player.id_player
        }
      });
      Player_profile.refresh_player_data();
      $('html').trigger('PlayerReady');

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    }

  });
}

Elkaisar.GE.CCityScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { "key": "City" });
    Elkaisar.GE.CityScene = this;
  },
  init: function () { },
  preload: function () { },
  create: function () {

    this.events.on('transitionstart', function (fromScene, duration) { });
    var floor_width = 2500;
    var floor_height = 1400;
    this.ConstructingHammer = {};

    Elkaisar.GE.ConfigCityAnims();
    fillCityWithBuilding();
    this.input.mousePointer.motionFactor = 0.5;
    this.input.pointer1.motionFactor = 0.5;

    Elkaisar.GE.Cam = this.cameras.main.setBounds(0, 0, floor_width, floor_height);
    this.add.image(0, 0, "city_floor").setOrigin(0, 0);
    this.Scrolling = {};
    var This = this;
    var downObj;
    this.input.on('gameobjectdown', function (p, obj, E) {
      if (this.isMapDraging)
        return;
      downObj = obj;
      E.stopPropagation();

    });
    this.input.on('gameobjectup', function (P, Obj, E) {

      if (P.downElement !== Elkaisar.GE.Game.canvas || P.getDuration() > 250)
        return;
      Obj.emit("click", Obj, P, E);
      E.stopPropagation();
    });

    this.input.on('pointerdown', function (p) {
      console.log(p.worldX, p.worldY)
      This.Scrolling.movingSpeed = 0;

    });
    this.input.on('pointerup', function (p) {
      This.Scrolling.isBeingDragged = false;
      This.Scrolling.DeltaTime = p.downTime - p.upTime;
      This.Scrolling.Distance = Phaser.Math.Distance.Between(p.downX, p.downY, p.upX, p.upY);
      This.Scrolling.Angle = Phaser.Math.Angle.Between(p.downX, p.downY, p.upX, p.upY);
      This.Scrolling.movingSpeed = This.Scrolling.Distance * 10 / This.Scrolling.DeltaTime;
      This.input.stopPropagation();
    });

    this.input.on('pointermove', function (p) {
      if (!p.isDown)
        return;
      This.Scrolling.isBeingDragged = true;
      Elkaisar.GE.Cam.scrollX -= (p.x - p.prevPosition.x) / Elkaisar.GE.Cam.zoom;
      Elkaisar.GE.Cam.scrollY -= (p.y - p.prevPosition.y) / Elkaisar.GE.Cam.zoom;
    });

    this.input.on('gameobjectover', function (Pointer, GameObject, Event) {
      if (Pointer.isDown)
        return;

      if (This.ConstructingHammer.destroy)
        This.ConstructingHammer.destroy();

      if (GameObject.data) {
        console.log("dasdasdasdadsadsadsad")
        const BuildingPlace = GameObject.data.get("BuildingPlace")
        if (Elkaisar.City.getCity().BuildingType[BuildingPlace] == BUILDING_TYPS.SPACE) {
          This.ConstructingHammer = This.add.image(GameObject.x + 18, GameObject.y + 18, "ConstructingHammer").setDepth(100).setOrigin(0, 0);
        }
      }



    });

    this.input.on('gameobjectout', function (Pointer, GameObject, Event) {
      if (This.ConstructingHammer.destroy)
        This.ConstructingHammer.destroy();
    });



    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

      if (deltaY < 0) {
        if (Elkaisar.GE.Cam.zoom >= 2)
          return Elkaisar.GE.Cam.zoom = 2;
        Elkaisar.GE.Cam.zoom += 0.1;
      } else {
        if (Elkaisar.GE.Cam.zoom <= 1)
          return Elkaisar.GE.Cam.zoom = 1;
        Elkaisar.GE.Cam.zoom -= 0.1;
      }
    });

    if (BuildingOnFloor.palace)
      Elkaisar.GE.Cam.pan(BuildingOnFloor.palace.x, BuildingOnFloor.palace.y, 700);



    var controlConfig = {
      camera: this.cameras.main,
      left: this.input.keyboard.addKey('left'),
      right: this.input.keyboard.addKey('right'),
      up: this.input.keyboard.addKey('up'),
      down: this.input.keyboard.addKey('down'),
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    //Crafty.viewport.centerOn(BuildingOnFloor.palace, 1);
  },
  update: function (time, delta) {
    this.controls.update(delta);
  }
});


Elkaisar.GE.CWorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { "key": "World" });
    Elkaisar.GE.WorldScene = this;
  },
  init: function () { },
  preload: function () { },
  create: function () {

    Elkaisar.GE.ConfigAnims();
    var cam = this.cameras.main;
    cam.scrollX = Elkaisar.World.Map.posX(Elkaisar.CurrentCity.City.x, Elkaisar.CurrentCity.City.y) - Elkaisar.MAX_SCREEN_WIDTH / 2 + 64;
    cam.scrollY = Elkaisar.World.Map.posY(Number(Elkaisar.CurrentCity.City.x), Number(Elkaisar.CurrentCity.City.y)) - Elkaisar.MAX_SCREEN_HEIGHT / 2 + 128;
    Animation.currentUnitArrow.add();
    cam.on("camerapancomplete", function () {

      Elkaisar.World.MapBattel.AddBattels();
      Elkaisar.World.Map.RefreshWorld();
    });

    Elkaisar.World.Map.Scroll(true);

    var This = this;
    var downObj;
    this.isMapDraging = false;

    this.input.on('gameobjectdown', function (p, obj, E) {
      if (this.isMapDraging)
        return;
      downObj = obj;
      E.stopPropagation();

    });
    this.input.on('gameobjectup', function (P, Obj, E) {

      if (P.downElement !== Elkaisar.GE.Game.canvas || P.getDuration() > 250)
        return;
      Obj.emit("click", Obj, P, E);
      E.stopPropagation();
    });


    this.input.on('pointerdown', Elkaisar.World.Map.mouseDownFn);
    this.input.on('pointerup', Elkaisar.World.Map.mouseUpFn);
    this.input.on('pointermove', Elkaisar.World.Map.mouseMoveFn);
    this.UnitFloor = this.add.image(0, 0, "unit_floor").setOrigin(0, 0).setDepth(0);
    this.UnitFloor.ignoreDestroy = true;
    this.WorldUnitIcons = {};

    this.time.delayedCall(1000, function () {
      Elkaisar.World.MapBattel.AddBattels();
    });
    this.cursors = {
      left: this.input.keyboard.addKey('left'),
      right: this.input.keyboard.addKey('right'),
      up: this.input.keyboard.addKey('up'),
      down: this.input.keyboard.addKey('down')
    };
    this.KeySpeed = 4;
    this.input.keyboard.on('keyup', function (eventName, event) {
      This.KeySpeed = 4;
      This.time.delayedCall(500, function () {
        This.isMapDraging = false;
      });

    });
  },
  update: function (time, delta) {

    for (var iii in Elkaisar.World.MapBattel.BattelList) {
      let OneBattel = Elkaisar.World.MapBattel.BattelList[iii];

      if (OneBattel && OneBattel.Line)
        OneBattel.Line.tilePositionX -= 0.25;
    }

    if (this.cursors.up.isDown) {
      this.isMapDraging = true;
      this.cameras.main.scrollY -= this.KeySpeed;
      this.KeySpeed = Math.min(this.KeySpeed + 0.5, 20);
      if (time % 5 == 0)
        Elkaisar.World.Map.Scroll(true);
      if (time % 10 == 0)
        Elkaisar.World.Map.clear();
      if (time % 20 == 0)
        Elkaisar.World.MapBattel.AddBattels();


    } else if (this.cursors.down.isDown) {
      this.isMapDraging = true;
      this.cameras.main.scrollY += this.KeySpeed;
      this.KeySpeed = Math.min(this.KeySpeed + 0.5, 20);
      if (time % 5 == 0)
        Elkaisar.World.Map.Scroll(true);
      if (time % 10 == 0)
        Elkaisar.World.Map.clear();
      if (time % 20 == 0)
        Elkaisar.World.MapBattel.AddBattels();

    }

    if (this.cursors.left.isDown) {
      this.isMapDraging = true;
      this.cameras.main.scrollX -= this.KeySpeed;
      this.KeySpeed = Math.min(this.KeySpeed + 0.5, 20);
      if (time % 5 == 0)
        Elkaisar.World.Map.Scroll(true);
      if (time % 10 == 0)
        Elkaisar.World.Map.clear();
      if (time % 20 == 0)
        Elkaisar.World.MapBattel.AddBattels();

    } else if (this.cursors.right.isDown) {
      this.isMapDraging = true;
      this.cameras.main.scrollX += this.KeySpeed;
      this.KeySpeed = Math.min(this.KeySpeed + 0.5, 20);
      if (time % 5 == 0)
        Elkaisar.World.Map.Scroll(true);
      if (time % 10 == 0)
        Elkaisar.World.Map.clear();
      if (time % 20 == 0)
        Elkaisar.World.MapBattel.AddBattels();
    }
  }
});


$(document).on("GameReady", function(){
  const phaserConfig = {
    type: Phaser.AUTO,
    parent: "GameWindow",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    scene: [
      Elkaisar.GE.CLoadingScene, Elkaisar.GE.CCityScene,
      Elkaisar.GE.CWorldScene, Elkaisar.GE.CWorldDesertScene
    ],
    /* input: {
     windowEvents: false
     }*/
    fps: {
      min: 10,
      target: 20
    }
  };

  Elkaisar.GE.Game = new Phaser.Game(phaserConfig);
});

$(document).ready(function () {
  Elkaisar.GE.VerfiyPlayerToken();
});

