Elkaisar.LBase.Error = function (data) {
  console.log(data);
  throw {}
};

Elkaisar.LBase.isJson = function (str) {
  try {
    const Res = JSON.parse(str);
    if (Res.state == "SysBusy")
      return false;
  } catch (e) {
    return false;
  }
  return true;

};


const THINGS_TO_LOAD = {
  "sprites": {

    "images/world/city_0.png": { "tile": 128, "tileh": 128, "map": { "city_0": [0, 0, 1, 1] } },
    "images/world/city_1.png": { "tile": 128, "tileh": 128, "map": { "city_1": [0, 0, 1, 1] } },
    "images/world/city_2.png": { "tile": 128, "tileh": 128, "map": { "city_2": [0, 0, 1, 1] } },
    "images/world/city_3.png": { "tile": 128, "tileh": 128, "map": { "city_3": [0, 0, 1, 1] } },
    "images/world/city_4.png": { "tile": 128, "tileh": 128, "map": { "city_4": [0, 0, 1, 1] } },

    "images/world/wild/d_1.png": { "tile": 128, "tileh": 128, "map": { "d_1": [0, 0, 1, 1] } },
    "images/world/wild/d_2.png": { "tile": 128, "tileh": 128, "map": { "d_2": [0, 0, 1, 1] } },
    "images/world/wild/d_3.png": { "tile": 128, "tileh": 128, "map": { "d_3": [0, 0, 1, 1] } },
    "images/world/wild/d_4.png": { "tile": 128, "tileh": 128, "map": { "d_4": [0, 0, 1, 1] } },
    "images/world/wild/d_5.png": { "tile": 128, "tileh": 128, "map": { "d_5": [0, 0, 1, 1] } },
    "images/world/wild/d_6.png": { "tile": 128, "tileh": 128, "map": { "d_6": [0, 0, 1, 1] } },
    "images/world/wild/d_7.png": { "tile": 128, "tileh": 128, "map": { "d_7": [0, 0, 1, 1] } },
    "images/world/wild/d_8.png": { "tile": 128, "tileh": 128, "map": { "d_8": [0, 0, 1, 1] } },
    "images/world/wild/d_9.png": { "tile": 128, "tileh": 128, "map": { "d_9": [0, 0, 1, 1] } },
    "images/world/wild/d_10.png": { "tile": 128, "tileh": 128, "map": { "d_10": [0, 0, 1, 1] } },

    "images/world/wild/m_1.png": { "tile": 128, "tileh": 128, "map": { "m_1": [0, 0, 1, 1] } },
    "images/world/wild/m_2.png": { "tile": 128, "tileh": 128, "map": { "m_2": [0, 0, 1, 1] } },
    "images/world/wild/m_3.png": { "tile": 128, "tileh": 128, "map": { "m_3": [0, 0, 1, 1] } },
    "images/world/wild/m_4.png": { "tile": 128, "tileh": 128, "map": { "m_4": [0, 0, 1, 1] } },
    "images/world/wild/m_5.png": { "tile": 128, "tileh": 128, "map": { "m_5": [0, 0, 1, 1] } },
    "images/world/wild/m_6.png": { "tile": 128, "tileh": 128, "map": { "m_6": [0, 0, 1, 1] } },
    "images/world/wild/m_7.png": { "tile": 128, "tileh": 128, "map": { "m_7": [0, 0, 1, 1] } },
    "images/world/wild/m_8.png": { "tile": 128, "tileh": 128, "map": { "m_8": [0, 0, 1, 1] } },
    "images/world/wild/m_9.png": { "tile": 128, "tileh": 128, "map": { "m_9": [0, 0, 1, 1] } },
    "images/world/wild/m_10.png": { "tile": 128, "tileh": 128, "map": { "m_10": [0, 0, 1, 1] } },

    "images/world/wild/w_1.png": { "tile": 128, "tileh": 128, "map": { "w_1": [0, 0, 1, 1] } },
    "images/world/wild/w_2.png": { "tile": 128, "tileh": 128, "map": { "w_2": [0, 0, 1, 1] } },
    "images/world/wild/w_3.png": { "tile": 128, "tileh": 128, "map": { "w_3": [0, 0, 1, 1] } },
    "images/world/wild/w_4.png": { "tile": 128, "tileh": 128, "map": { "w_4": [0, 0, 1, 1] } },
    "images/world/wild/w_5.png": { "tile": 128, "tileh": 128, "map": { "w_5": [0, 0, 1, 1] } },
    "images/world/wild/w_6.png": { "tile": 128, "tileh": 128, "map": { "w_6": [0, 0, 1, 1] } },
    "images/world/wild/w_7.png": { "tile": 128, "tileh": 128, "map": { "w_7": [0, 0, 1, 1] } },
    "images/world/wild/w_8.png": { "tile": 128, "tileh": 128, "map": { "w_8": [0, 0, 1, 1] } },
    "images/world/wild/w_9.png": { "tile": 128, "tileh": 128, "map": { "w_9": [0, 0, 1, 1] } },
    "images/world/wild/w_10.png": { "tile": 128, "tileh": 128, "map": { "w_10": [0, 0, 1, 1] } },

    "images/animation/currentUnit.png": { "tile": 18, "tileh": 21, "map": { "arrow": [0, 0, 1, 1] } },
    "images/godGate/godGate.png": { "tile": 62, "tileh": 65, "map": { "godGateBtn": [0, 0, 1, 1] } },
    "images/animation/fireBtn.png": { "tile": 64, "tileh": 54, "map": { "fireBtn": [0, 1] } },

    "images/world/30.png": { "tile": 128, "tileh": 128, "map": { "mnawrat": [0, 0, 1, 1] } },
    "images/world/front_squad.png": { "tile": 128, "tileh": 128, "map": { "front_squad": [0, 0, 1, 1] } },
    "images/world/front_band.png": { "tile": 128, "tileh": 128, "map": { "front_band": [0, 0, 1, 1] } },
    "images/world/front_squadron.png": { "tile": 128, "tileh": 128, "map": { "front_squadron": [0, 0, 1, 1] } },
    "images/world/front_division.png": { "tile": 128, "tileh": 128, "map": { "front_division": [0, 0, 1, 1] } },
    "images/world/armed_light_squad.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_light_squad": [0, 0, 1, 1]
      }
    },
    "images/world/armed_light_band.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_light_band": [0, 0, 1, 1]
      }
    },
    "images/world/armed_light_squadron.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_light_squadron": [0, 0, 1, 1]
      }
    },
    "images/world/armed_light_division.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_light_division": [0, 0, 1, 1]
      }
    },
    "images/world/armed_heavy_squad.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_heavy_squad": [0, 0, 1, 1]
      }
    },
    "images/world/armed_heavy_band.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_heavy_band": [0, 0, 1, 1]
      }
    },
    "images/world/armed_heavy_squadron.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_heavy_squadron": [0, 0, 1, 1]
      }
    },
    "images/world/armed_heavy_division.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "armed_heavy_division": [0, 0, 1, 1]
      }
    },
    "images/world/guard_squad.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "guard_squad": [0, 0, 1, 1]
      }
    },
    "images/world/guard_band.png": { "tile": 128, "tileh": 128, "map": { "guard_band": [0, 0, 1, 1] } },
    "images/world/guard_squadron.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "guard_squadron": [0, 0, 1, 1]
      }
    },
    "images/world/guard_division.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "guard_division": [0, 0, 1, 1]
      }
    },
    "images/world/brave_thunder.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "brave_thunder": [0, 0, 1, 1]
      }
    },
    "images/world/gang.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "gang": [0, 0, 1, 1]
      }
    },
    "images/world/mugger.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "mugger": [0, 0, 1, 1]
      }
    },
    "images/world/thief.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "thief": [0, 0, 1, 1]
      }
    },
    "images/world/carthage/gang.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "carthage_gang": [0, 0, 1, 1]
      }
    },
    "images/world/carthage/teams.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "carthage_teams": [0, 0, 1, 1]
      }
    },
    "images/world/carthage/rebels.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "carthage_rebels": [0, 0, 1, 1]
      }
    },
    "images/world/carthage/forces.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "carthage_forces": [0, 0, 1, 1]
      }
    },
    "images/world/carthage/capital.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "carthage_capital": [0, 0, 1, 1]
      }
    },
    "images/world/army-capital.png": { "tile": 128, "tileh": 128, "map": { "army_capital": [0, 0, 1, 1] } },
    "images/world/queenCity_1.png": { "tile": 128, "tileh": 128, "map": { "queenCity_1": [0, 0, 1, 1] } },
    "images/world/queenCity_2.png": { "tile": 128, "tileh": 128, "map": { "queenCity_2": [0, 0, 1, 1] } },
    "images/world/queenCity_3.png": { "tile": 128, "tileh": 128, "map": { "queenCity_3": [0, 0, 1, 1] } },

    "images/world/repleCastle_1.png": { "tile": 128, "tileh": 128, "map": { "repleCastle_1": [0, 0, 1, 1] } },
    "images/world/repleCastle_2.png": { "tile": 128, "tileh": 128, "map": { "repleCastle_2": [0, 0, 1, 1] } },
    "images/world/repleCastle_3.png": { "tile": 128, "tileh": 128, "map": { "repleCastle_3": [0, 0, 1, 1] } },
    "images/world/wolf.png": { "tile": 128, "tileh": 128, "map": { "wolfStatue": [0, 0, 1, 1] } },

    "images/world/arena.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "arena": [0, 0, 1, 1]
      }
    },
    'images/world/seaCity_1.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_1': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/seaCity_2.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_2': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/seaCity_3.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_3': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/seaCity_4.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_4': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/seaCity_5.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_5': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/seaCity_6.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'seaCity_6': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/challangeFieldPlayer.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'challangeFieldPlayer': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/challangeFieldGuild.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'challangeFieldGuild': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/challangeFieldTeam.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'challangeFieldTeam': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/challangeFieldServer.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'challangeFieldServer': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/fightChallangePlayer.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'fightChallangePlayer': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/fightChallangeGuild.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'fightChallangeGuild': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/fightChallangeTeam.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'fightChallangeTeam': [0x0, 0x0, 0x1, 0x1]
      }
    },
    'images/world/fightChallangeServer.png': {
      'tile': 0x180,
      'tileh': 0x180,
      'map': {
        'fightChallangeServer': [0x0, 0x0, 0x1, 0x1]
      }
    },
    "images/world/city_shield.png": {
      "tile": 128,
      "tileh": 128,
      "map": {
        "city_shield": [0, 0, 1, 1]
      }
    },
    "images/city/palace.png": {
      "tile": 256,
      "tileh": 162,
      "map": {
        "palace": [0, 0, 1, 1]
      }
    },
    "images/city/wall_0_.png": {
      "tile": 680,
      "tileh": 394,
      "map": {
        "wall_0": [0, 0, 1, 1]
      }
    },
    "images/city/wall_1_.png": {
      "tile": 680,
      "tileh": 394,
      "map": {
        "wall_1": [0, 0, 1, 1]
      }
    },
    "images/city/wall_2_.png": {
      "tile": 680,
      "tileh": 394,
      "map": {
        "wall_2": [0, 0, 1, 1]
      }
    },
    "images/city/wall_3_.png": {
      "tile": 680,
      "tileh": 394,
      "map": {
        "wall_3": [0, 0, 1, 1]
      }
    },
    "images/city/wall_4_.png": {
      "tile": 680,
      "tileh": 394,
      "map": {
        "wall_4": [0, 0, 1, 1]
      }
    },
    "images/city/_seaport.png": { "tile": 518, "tileh": 285, "map": { "seaport": [0, 0, 1, 1] } },
    "images/city/_market.png": {
      "tile": 256,
      "tileh": 256,
      "map": {
        "market": [0, 0, 1, 1]
      }
    },
    "images/city/_farm.png": {
      "tile": 350,
      "tileh": 206,
      "map": {
        "farm": [0, 0, 1, 1]
      }
    },
    "images/city/_mine.png": {
      "tile": 412,
      "tileh": 243,
      "map": {
        "mine": [0, 0, 1, 1]
      }
    },
    "images/city/_mahger.png": {
      "tile": 412,
      "tileh": 243,
      "map": {
        "mahger": [0, 0, 1, 1]
      }
    },
    "images/city/_wood_maker.png": {
      "tile": 192,
      "tileh": 128,
      "map": {
        "wood_maker": [0, 0, 1, 1]
      }
    },
    "images/city/_lighthouse.png": {
      "tile": 160,
      "tileh": 353,
      "map": {
        "lighthouse": [0, 0, 1, 1]
      }
    },
    "images/city/_B1.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B1": [0, 0, 1, 1]
      }
    },
    "images/city/_B2.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B2": [0, 0, 1, 1]
      }
    },
    "images/city/_B3.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B3": [0, 0, 1, 1]
      }
    },
    "images/city/_B4.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B4": [0, 0, 1, 1]
      }
    },
    "images/city/_B5.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B5": [0, 0, 1, 1]
      }
    },
    "images/city/_B6.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B6": [0, 0, 1, 1]
      }
    },
    "images/city/_B7.png": {// 
      "tile": 192,
      "tileh": 192,
      "map": {
        "B7": [0, 0, 1, 1]
      }
    },
    "images/city/_B8.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B8": [0, 0, 1, 1]
      }
    },
    "images/city/_B9.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B9": [0, 0, 1, 1]
      }
    },
    "images/city/_B10.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B10": [0, 0, 1, 1]
      }
    },
    "images/city/_B11.png": {// 
      "tile": 160,
      "tileh": 120,
      "map": {
        "B11": [0, 0, 1, 1]
      }
    },
    "images/city/no_building.png": {
      "tile": 160,
      "tileh": 120,
      "map": {
        "no_building": [0, 0, 1, 1]
      }
    },

    "images/city/city_floor.jpg": {
      "tile": 2500,
      "tileh": 1400,
      "map": {
        "city_floor": [0, 0, 1, 1]
      }
    },
    "images/animation/upgrading_hammer.png": {
      // This is the width of each image in pixels
      tile: 161.3,
      // The height of each image
      tileh: 120,
      // We give names to three individual images
      map: {
        hammer_start: [0, 0],
        hammer_end: [8, 0]
      }
    },
    "images/animation/fountain.png": {
      // This is the width of each image in pixels
      tile: 40,
      // The height of each image
      tileh: 32,
      // We give names to three individual images
      map: {
        fountain: [0, 0]
      }
    },
    "images/animation/wood_maker.png": {
      // This is the width of each image in pixels
      tile: 90.35,
      // The height of each image
      tileh: 64,
      // We give names to three individual images
      map: {
        ani_wood_maker: [0, 0]
      }
    },
    "images/animation/wood_man.png": {
      // This is the width of each image in pixels
      tile: 58,
      // The height of each image
      tileh: 58,
      // We give names to three individual images
      map: {
        ani_wood_man: [0, 0]
      }
    },
    "images/animation/mine_man.png": {
      // This is the width of each image in pixels
      tile: 58,
      // The height of each image
      tileh: 58,
      // We give names to three individual images
      map: {
        mine_man: [0, 0]
      }
    },
    "images/animation/stone_man.png": {
      // This is the width of each image in pixels
      tile: 58,
      // The height of each image
      tileh: 58,
      // We give names to three individual images
      map: {
        stone_man: [0, 0]
      }
    },
    "images/animation/stone_carry.png": {
      // This is the width of each image in pixels
      tile: 58,
      // The height of each image
      tileh: 58,
      // We give names to three individual images
      map: {
        stone_carry: [0, 0]
      }
    },
    "images/animation/no_carry.png": {
      // This is the width of each image in pixels
      tile: 58,
      // The height of each image
      tileh: 58,
      // We give names to three individual images
      map: {
        no_carry: [0, 0]
      }
    },
    "images/animation/attack_fire.png": {
      // This is the width of each image in pixels
      tile: 42,
      // The height of each image
      tileh: 63,
      // We give names to three individual images
      map: {
        fire_start: [0, 0],
        fire_end: [7, 0]
      }
    },
    "images/animation/flags.png": {
      // This is the width of each image in pixels
      tile: 34,
      // The height of each image
      tileh: 24,
      // We give names to three individual images
      map: {
        flag_over_city: [0, 0]
      }
    },
    "images/animation/cloud.png": {
      // This is the width of each image in pixels
      tile: 150,
      // The height of each image
      tileh: 150,
      // We give names to three individual images
      map: {
        cloud: [0, 0]
      }
    },
    "images/world/unit_floor.png": {
      // This is the width of each image in pixels
      tile: 128,
      // The height of each image
      tileh: 96,
      // We give names to three individual images
      map: {
        unit_floor: [0, 0],
      }

    }

  },
  "audio": {
    "war_sound": "sounds/war_sound.mp3",
    "upgrade_done": "sounds/upgrade_done.mp3",
    "bird_sound": "sounds/bird_sound.mp3",
    "click_sound": "sounds/click_sound.mp3",
    "close_sound": "sounds/door_close.mp3"
  },
  'images': [
    'images/style/matrail_bg.png',
    'images/style/head_bar.png',
    'images/background/profile_name.png',
    'images/world/smallMap.jpg',
    'images/background/bar_L.png',
    'images/icons/header_resources4.png',
    'images/background/bg_lvl.png',
    'images/style/attack.png',
    'images/style/defense.png',
    'images/style/sp.jpg', 'images/icon-menu/1_h.png',
    'images/icon-menu/1_n.png', 'images/icon-menu/2_h.png',
    'images/icon-menu/2_n.png', 'images/icon-menu/3_h.png',
    'images/icon-menu/3_n.png', 'images/icon-menu/4_h.png',
    'images/icon-menu/4_n.png', 'images/icon-menu/5_h.png',
    'images/icon-menu/5_n.png', 'images/icon-menu/6_h.png',
    'images/icon-menu/6_n.png', 'images/icon-menu/7_h.png',
    'images/icon-menu/7_n.png', 'images/background/alert_box.png',
    'images/background/frame.png', 'images/btns/building/upgrade.png',
    'images/btns/building/upgrade-a.png', 'images/btns/building/upgrade-h.png',
    'images/btns/global/full-btn-1x.png', 'images/btns/global/full-btn-1x-a.png',
    'images/btns/global/full-btn-1x-h.png', 'images/btns/global/full-btn-2x.png',
    'images/btns/global/full-btn-a-2x.png', 'images/btns/global/full-btn-h-2x.png',
    'images/btn-small/speed-up.png', 'images/btn-small/speed-up-active.png',
    'images/btn-small/speed-up-hover.png', 'images/skins/palace.png',
    'images/skins/desc-rect.png', 'images/skins/table-rect.png',
    'images/tools/luck_wheel.png', 'images/tools/image-frame.png',
    'images/tools/gete-left.png', 'images/tools/gate-right.png',
    'images/tools/gate-left-lion.png', 'images/tools/gate-right-lion.png',
    'images/tools/title-red.png', 'images/tools/title-background.png']


};


Elkaisar.BaseData.Promotion = [
  {
    Title: "مواطن"
  },
  {
    Title: "عريف"
  },
  {
    Title: "رقيب"
  },
  {
    Title: "قسطور"
  },
  {
    Title: "قسطور اعلى"
  },
  {
    Title: "نائب"
  },
  {
    Title: "قاضى"
  },
  {
    Title: "موفد"
  },
  {
    Title: "ديكتاتور"
  },
  {
    Title: "قائد الفيلق الخامس"
  },
  {
    Title: "قائد الفيلق الرابع"
  },
  {
    Title: "قائد الفيلق الثالث"
  },
  {
    Title: "قائد الفيلق الثانى"
  },
  {
    Title: "قائد الفيلق الاول"
  },
  {
    Title: "لواء"
  },
  {
    Title: "فريق"
  },
  {
    Title: "فريق درجة 1"
  },
  {
    Title: "فريق درجة 2"
  },
  {
    Title: "فريق درجة 3"
  },
  {
    Title: "مارشال"
  },
  {
    Title: "رقيب درجة 9"
  },
  {
    Title: "رقيب درجة 8"
  },
  {
    Title: "رقيب درجة 7"
  },
  {
    Title: "رقيب درجة 6"
  },
  {
    Title: "رقيب درجة 5"
  },
  {
    Title: "رقيب درجة 4"
  },
  {
    Title: "رقيب درجة 3"
  },
  {
    Title: "رقيب درجة 2"
  },
  {
    Title: "رقيب درجة 1"
  },
  {
    Title: "قيصر"
  }
];


Elkaisar.BaseData.Building = {};


Elkaisar.BaseData.HeroAvatar = [
  "images/hero/faceA1.jpg",
  "images/hero/faceA2.jpg",
  "images/hero/faceA3.jpg",
  "images/hero/faceA4.jpg",
  "images/hero/faceA5.jpg",
  "images/hero/faceA6.jpg",
  "images/hero/faceA7.jpg",
  "images/hero/faceA8.jpg",
  "images/hero/faceA9.jpg",
  "images/hero/faceA10.jpg",
  "images/hero/faceB1.jpg",
  "images/hero/faceB2.jpg",
  "images/hero/faceB3.jpg",
  "images/hero/faceB4.jpg",
  "images/hero/faceB5.jpg",
  "images/hero/faceB6.jpg",
  "images/hero/faceB7.jpg",
  "images/hero/faceB8.jpg",
  "images/hero/faceB9.jpg",
  "images/hero/faceB9.jpg"
];


const BUILDING_TYPS = {
  SPACE: 0, // 
  COTTAGE: 1, //
  STORE: 2, //
  BARRACKS: 3, //
  STABL: 4, //
  WORKSHOP: 5, //
  THEATER: 6, //
  STATION: 7, //
  UNIVERSITY: 8, //
  ACADEMY: 9, //
  WORSHIP: 10, //
  HOSPITAL: 11, //
  PALACE: 12, //
  WALL: 13, //
  MARKET: 14, //
  WOOD: 15, //
  FARM: 16, //
  MINE: 17, //
  STONE: 18, //
  SEAPORT: 19, //
  LIGHTHOUSE: 20  //
};

Elkaisar.BaseData.Items = {};



$(document).on("PlayerReady", "html", function () {


  $.ajax({
    url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/ItemLang/${Elkaisar.Config.UserLang}.json`,
    success: function (Items, textStatus, jqXHR) {
      $.ajax({
        url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/itemBase.json`,
        success: function (ItemBase, textStatus, jqXHR) {
          $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItem/getAllItemPrice`,
            data: {
              token: Elkaisar.Config.OuthToken,
              server: Elkaisar.Config.idServer
            },
            success: function (ItemPrize, textStatus, jqXHR) {
              if (!Elkaisar.LBase.isJson(ItemPrize))
                return Elkaisar.LBase.Error(ItemPrize);
              var ItemArr = JSON.parse(ItemPrize);

              for (var iii in ItemArr) {
                if (Items[ItemArr[iii].id_item])
                  Items[ItemArr[iii].id_item].gold = ItemArr[iii].gold;

              }

              Elkaisar.BaseData.Items = Items;
              Player_profile.refreshMatrialBox();

              Elkaisar.Item.useItemFunc();
              Elkaisar.Item.useItemBoxFunc();
              Elkaisar.Item.useArmyBackFunc();
            }
          });


        }
      });

    }
  });


});

Elkaisar.BaseData.HeroToCity = {
  "0": 0,
  "1": "army_a",
  "2": "army_b",
  "3": "army_c",
  "4": "army_d",
  "5": "army_e",
  "6": "army_f"
};

Elkaisar.BaseData.ArmyPower = {
  0: { "attack": 0, "def": 0, "vit": 0, "dam": 0, "break": 0, "anti_break": 0, "strike": 0, "immunity": 0, "res_cap": 0 },
  "army_a": { "attack": 8, "def": 8, "vit": 60, "dam": 3, "break": 1, "anti_break": 1, "strike": 3, "immunity": 1, "res_cap": 100 },
  "army_b": { "attack": 30, "def": 20, "vit": 250, "dam": 35, "break": 5, "anti_break": 2, "strike": 2, "immunity": 2, "res_cap": 200 },
  "army_c": { "attack": 25, "def": 30, "vit": 400, "dam": 40, "break": 10, "anti_break": 10, "strike": 10, "immunity": 10, "res_cap": 220 },
  "army_d": { "attack": 9, "def": 5, "vit": 45, "dam": 3, "break": 1, "anti_break": 1, "strike": 4, "immunity": 1, "res_cap": 75 },
  "army_e": { "attack": 19, "def": 25, "vit": 100, "dam": 19, "break": 2, "anti_break": 2, "strike": 12, "immunity": 2, "res_cap": 35 },
  "army_f": { "attack": 40, "def": 20, "vit": 600, "dam": 70, "break": 12, "anti_break": 10, "strike": 10, "immunity": 10, "res_cap": 75 },
  "spies": { "attack": 0, "def": 0, "vit": 0, "dam": 0, "break": 0, "anti_break": 0, "strike": 0, "immunity": 0, "res_cap": 75 },
  "wall_a": { "attack": 20, "def": 10, "vit": 300, "dam": 10, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 },
  "wall_b": { "attack": 19, "def": 25, "vit": 400, "dam": 35, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 },
  "wall_c": { "attack": 40, "def": 20, "vit": 600, "dam": 70, "break": 5, "anti_break": 4, "strike": 15, "immunity": 5, "res_cap": 75 }
};

Elkaisar.BaseData.Army = {
  "0": {
    food: 0,
    wood: 0,
    stone: 0,
    metal: 0,
    coin: 0,
    people: 0,
    time: 0,
    condetion: [

    ],
    ar_title: "جواسيس",
    image: "images/tech/no_army.png",
    desc: `الفرسا اسرع الفرسان مش عارف اى 
                                    ليس على كل لاعب الالتذام بذالك `,
    vit: 0,
    attack: 0,
    defence: 0,
    damage: 0,
    "break": 0,
    anti_break: 0,
    strike: 0,
    immunity: 0,
    eating: 0,
    speed: 0,
    capacity: 0,
    dismess: {
      food: 0,
      wood: 0,
      stone: 0,
      metal: 0
    }
  },
  "spies": {// جواسيس
    food: 600,
    wood: 150,
    stone: 0,
    metal: 350,
    coin: 90,
    people: 1,
    time: 60,
    condetion: {
      place: BUILDING_TYPS.STABL,
      place_lvl: 1,
      study: "riding",
      lvl: 1
    },
    ar_title: "جواسيس",
    image: "images/items/item027.jpg",
    desc: `كانت الجواسيس هى سلاح الاستخبارت فى العصور الوسطى و كانت اهميتها تكمن فى جب الاخبار من المدن الاخرى 
            ولكن لا يمكنك الوثوق بهذه المعلومات بسسب قلة كفائة الجواسيس لديك`,
    vit: 80,
    attack: 10,
    defence: 12,
    damage: "6-9",
    "break": 0,
    anti_break: 0,
    strike: 0,
    immunity: 0,
    eating: 6,
    speed: 200,
    capacity: 1,
    dismess: {
      food: 180,
      wood: 45,
      stone: 0,
      metal: 105
    }
  },
  "army_a": {// مشاه
    food: 150,
    wood: 500,
    stone: 0,
    metal: 100,
    coin: 18,
    people: 1,
    time: 50,
    condetion: {
      place: BUILDING_TYPS.BARRACKS,
      place_lvl: 1,
      study: 'infantry',
      lvl: 1
    },
    ar_title: "مشاه",
    image: "images/tech/soldier01.jpg",
    desc: `اكثر انواع الجيوش استعمالا اثناء الامبراطورية الرومانية 
                وذلك بسسب سهولة تدريبها  وتسليحها وتكمن قوتها  فى  الاسرار الحربية لديها`,
    vit: 60,
    attack: 8,
    defence: 8,
    damage: "3-6",
    "break": 1,
    anti_break: 1,
    strike: 3,
    immunity: 2,
    eating: 4,
    speed: 300,
    capacity: 40,
    dismess: {
      food: 45,
      wood: 150,
      stone: 0,
      metal: 30
    }
  },
  "army_b": {// اسطبل
    food: 1500,
    wood: 800,
    stone: 0,
    metal: 750,
    coin: 500,
    people: 3,
    time: 300,
    condetion: {
      place: BUILDING_TYPS.STABL,
      place_lvl: 5,
      study: "riding",
      lvl: 3
    },
    ar_title: "فرسان",
    image: "images/tech/soldier02.jpg",
    desc: `سلاح الفرسان هو نموذج الفارس الممتاز في الجيش الروماني من حيث تسليحه عالي المستوى. يخيف هجوم سلاح الفرسان الخصم غير المستعدّ على الرغم من أنهم ليسوا أسرع القوات. مشكلتهم تكلفة صيانتهم لما يتوجب على من يدرّبهم من رصدٍ لطعام الفارس وفرسه.`,
    vit: 250,
    attack: 30,
    defence: 20,
    damage: "33-38",
    "break": 10,
    anti_break: 4,
    strike: 1,
    immunity: 2,
    eating: 18,
    speed: 900,
    capacity: 100,
    dismess: {
      food: 450,
      wood: 240,
      stone: 0,
      metal: 225
    }
  },
  "army_c": {// مدرعين
    food: 2000,
    wood: 500,
    stone: 0,
    metal: 2500,
    coin: 600,
    people: 6,
    time: 500,
    condetion: {
      place: BUILDING_TYPS.BARRACKS,
      place_lvl: 9,
      study: 'infantry',
      lvl: 6
    },
    ar_title: "مدرعين",
    image: "images/tech/soldier03.jpg",
    desc: `المدرعين هم اساس القوات الرومانية بتسليحهم المعقد وتدريباتهم المكثفة يمكن الاعتبار انها من اقوى انواع الجيوش
            يستغرق تدريب الابطال كمية كبيرة كدا من الوقت وذلك بسبب الالتزام لصنع اقوى الابطال`,
    vit: 400,
    attack: 25,
    defence: 30,
    damage: "40-60",
    "break": 10,
    anti_break: 5,
    strike: 10,
    immunity: 5,
    eating: 36,
    speed: 600,
    capacity: 120,
    dismess: {
      food: 600,
      wood: 150,
      stone: 0,
      metal: 750
    }
  },
  "army_d": {// رماه
    food: 300,
    wood: 350,
    stone: 0,
    metal: 300,
    coin: 30,
    people: 1,
    time: 120,
    condetion: {
      place: BUILDING_TYPS.BARRACKS,
      place_lvl: 2,
      study: 'infantry',
      lvl: 2
    },
    ar_title: "رماه",
    image: "images/tech/soldier04.jpg",
    desc: `رماة السهم او  النبالين كانوا زمرة الجيش الرومانى.
                يمكنك الاعتماد عليهم فى الهجوم اما  بالنسبة الى الى الدفاع فلا يمكن ابدا الاعتماد عليهم.
                بسبب ضعف البنية الجسمانية لديهم ولكن يمكن لهذة القوات تنفيذ العديد من الاصابات البالغة  للاعداء`,
    vit: 45,
    attack: 9,
    defence: 5,
    damage: "3-5",
    "break": 2,
    anti_break: 2,
    strike: 3,
    immunity: 2,
    eating: 5,
    speed: 250,
    capacity: 25,
    dismess: {
      food: 90,
      wood: 105,
      stone: 0,
      metal: 90
    }
  },
  "army_e": {// مقاليع
    food: 1000,
    wood: 1200,
    stone: 0,
    metal: 800,
    coin: 120,
    people: 4,
    time: 180,
    condetion: {
      place: BUILDING_TYPS.WORKSHOP,
      place_lvl: 3,
      study: 'army',
      lvl: 1
    },
    ar_title: "مقاليع",
    image: "images/tech/soldier05.jpg",
    desc: `كانت العصور الرومانية عصور ازدهار هندسى ومعمارى .
                احد الأدلة على ذلك هو  سلاح المقاليع لدى الجيوش الرمانية .
                يلحق هذا النوع ضرر كبير جدا  بالاعداء  مهما كانت قوتهم ويشتت جمعهم`,
    vit: 100,
    attack: 19,
    defence: 25,
    damage: "18-20",
    "break": 5,
    anti_break: 2,
    strike: 15,
    immunity: 8,
    eating: 20,
    speed: 150,
    capacity: 35,
    dismess: {
      food: 300,
      wood: 360,
      stone: 0,
      metal: 240
    }
  },
  "army_f": {// منجنيق
    food: 3000,
    wood: 3000,
    stone: 6000,
    metal: 1200,
    coin: 450,
    time: 1000,
    people: 8,
    condetion: {
      place: BUILDING_TYPS.WORKSHOP,
      place_lvl: 7,
      study: 'army',
      lvl: 6
    },
    ar_title: "منجنيق",
    image: "images/tech/soldier06.jpg",
    desc: `اقوى  انوع القوات على الاطلاق .
                لا شك فى ذلك حيث ان هذه القوات مسؤلة عن هدم الاسوار والمبانى الشاهقة.
                فليس من الصعب عليها سحق  الاعداء`,
    vit: 600,
    attack: 40,
    defence: 20,
    damage: "70-70",
    "break": 15,
    anti_break: 4,
    strike: 5,
    immunity: 15,
    eating: 150,
    speed: 100,
    capacity: 75,
    dismess: {
      food: 900,
      wood: 900,
      stone: 1800,
      metal: 360
    }
  },
  "wall_a": {//كمائن
    food: 50,
    wood: 500,
    stone: 100,
    metal: 50,
    coin: 0,
    time: 60,
    people: 0,
    condetion: {
      place: BUILDING_TYPS.WALL,
      place_lvl: 1,
      study: "safe",
      lvl: 1
    },
    ar_title: "كمائن",
    image: "images/tech/defense01.jpg",
    desc: `يتم دس الكمائن داخ السور لعرقلة الاعداء.
                ولكن لا يمكن الاعتماد عليها  فى صد الهجمات`,
    vit: 0,
    attack: 0,
    defence: 0,
    damage: "0-0",
    "break": 0,
    anti_break: 0,
    strike: 0,
    immunity: 0,
    eating: 0,
    speed: 0,
    capacity: 0,
    dismess: {
      food: 15,
      wood: 150,
      stone: 30,
      metal: 15
    },
    wall_space: 1

  },
  "wall_b": {// ابراج
    food: 200,
    wood: 2000,
    stone: 1000,
    metal: 500,
    coin: 0,
    people: 0,
    time: 180,
    condetion: {
      place: BUILDING_TYPS.WALL,
      place_lvl: 3,
      study: "safe",
      lvl: 2
    },
    ar_title: "ابراج",
    image: "images/tech/defense02.jpg",
    desc: `لا تنحصر وظيفة الابراج فى الرقابة على المدن, 
            ولكن تلعب دور هام فى الدفاع عن المدينة عند الهجوم عليها.
            تتميز الابراج بارتفاعتها الشاهقة مما يجعل منها افضلية هجومية ودفاعية ايضا`,
    vit: 200,
    attack: 18,
    defence: 15,
    damage: "12-15",
    "break": 0,
    anti_break: 0,
    strike: 0,
    immunity: 0,
    eating: 0,
    speed: 0,
    capacity: 0,
    dismess: {
      food: 60,
      wood: 600,
      stone: 300,
      metal: 150
    },
    wall_space: 3
  },
  "wall_c": {// احجار  متساقطة
    food: 600,
    wood: 0,
    stone: 8000,
    metal: 0,
    coin: 0,
    time: 600,
    people: 0,
    condetion: {
      place: BUILDING_TYPS.WALL,
      place_lvl: 5,
      study: "safe",
      lvl: 6
    },
    ar_title: "احجار متساقطة",
    image: "images/tech/defense03.jpg",
    desc: `الاحجار المتساقطة من اقوى الاسلحة الدفاعية للمدينة .
                يمكن الاعتماد عليها بالحاق الضرر الجسيم للمعتدى`,
    vit: 0,
    attack: 0,
    defence: 40,
    damage: "40-60",
    "break": 0,
    anti_break: 0,
    strike: 0,
    immunity: 0,
    eating: 0,
    speed: 0,
    capacity: 0,
    dismess: {
      food: 180,
      wood: 0,
      stone: 2400,
      metal: 0
    },
    wall_space: 5
  }

};


Elkaisar.BaseData.PlayerStateData = {

  motiv: {
    image: "images/icons/list/motiv.jpg",
    title: "خطبة تحفيزية",
    ar_title: "",
    en_title: ""
  },
  medical: {
    image: "images/icons/list/medical.png",
    title: "تمثال الشفاء",
    ar_title: "",
    en_title: ""
  },
  wheat: {
    image: "images/icons/list/wheat.png",
    title: "انتاح الغذاء",
    ar_title: "",
    en_title: ""
  },
  metal: {
    image: "images/icons/list/metal.png",
    title: "زبادة انتاج الحديد",
    ar_title: "",
    en_title: ""
  },
  stone: {
    image: "images/icons/list/stone.png",
    title: "زبادة انتاج الصخور",
    ar_title: "",
    en_title: ""
  },
  wood: {
    image: "images/icons/list/wood.png",
    title: "زبادة انتاج الاخشاب",
    ar_title: "",
    en_title: ""
  },
  attack_10: {
    image: "images/icons/list/attack.png",
    title: "زبادة نسبة الهجوم",
    ar_title: "",
    en_title: ""
  },
  defence_10: {
    image: "images/icons/list/deff.png",
    title: "زبادة نسبة الدفاع",
    ar_title: "",
    en_title: ""
  },
  peace: {
    image: "images/icons/list/peace.png",
    title: " الحماية",
    ar_title: "",
    en_title: ""
  },
  silance: {
    image: "images/icons/list/silance.png",
    title: "الصمت",
    ar_title: "",
    en_title: ""
  }

};

Elkaisar.BaseData.Edu = {
  "farming": {
    ar_title: "علم الزراعة",
    image: "images/tech/technology01.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "الحقل مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.FARM,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }


      return condtions;
    }
  },
  "wooding": {
    ar_title: "علم الاخشاب",
    image: "images/tech/technology02.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "الغابات مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.WOOD,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }



      return condtions;
    }
  },
  "stoning": {
    ar_title: " علم الاحجار",
    image: "images/tech/technology03.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "المحجر مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.STONE,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }



      return condtions;
    }
  },
  "mining": {
    ar_title: "علم التعدين",
    image: "images/tech/technology04.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "المنجم مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.MINE,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }



      return condtions;
    }
  },
  "accounting": {
    ar_title: "المحاسبة",
    image: "images/tech/technology05.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "دار المساعدة مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.WORSHIP,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }

      return condtions;
    }
  },
  "storing": {
    ar_title: "علم التخزين",
    image: "images/tech/technology06.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "المخازن مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.STORE,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }

      return condtions;
    }
  },
  "building": {
    ar_title: "الهندسة المعمارية",
    image: "images/tech/technology07.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.WALL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }

      return condtions;
    }
  },
  "scholership": {
    ar_title: "المنح الدراسية",
    image: "images/tech/technology08.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.THEATER,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }



      return condtions;
    }
  },
  "maintenace": {
    ar_title: "علم الصيانة",
    image: "images/tech/technology09.jpg",
    StudyPlace: "uni",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.WALL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }

      return condtions;
    }
  },
  "infantry": {
    ar_title: "المشاة",
    image: "images/tech/technology11.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "الثكنات مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.BARRACKS,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }

      return condtions;
    }
  },
  "riding": {
    ar_title: "الفروسية",
    image: "images/tech/technology12.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.STABL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "army": {
    ar_title: "الجيش",
    image: "images/tech/technology13.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "ورشة العمل  مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.WORKSHOP,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "spying": {
    ar_title: "الاستخبارات",
    image: "images/tech/technology14.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.STABL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "leader": {
    ar_title: "القيادة",
    image: "images/tech/technology15.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.THEATER,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "safe": {
    ar_title: "الامن",
    image: "images/tech/technology16.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "medicine": {
    ar_title: "الطب",
    image: "images/tech/technology17.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "logistic": {
    ar_title: "الدعم اللوجستى",
    image: "images/tech/technology18.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        building_lvl: Math.max(1, lvl)
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "navigating": {
    ar_title: "الملاحة",
    image: "images/tech/technology19.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  },
  "supplying": {
    ar_title: "الامداد",
    image: "images/tech/technology20.jpg",
    StudyPlace: "acad",
    getCondetion: function (lvl) {
      var condtions = [];
      condtions[0] = {
        title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
        con_type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        building_lvl: Math.max(1, lvl)
      };
      condtions[1] = {
        title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
        con_type: "building",
        building_type: BUILDING_TYPS.ACADEMY,
        building_lvl: Number(lvl) + 1
      };
      if (lvl >= 25) {
        condtions[2] = {
          title: `1 x قانون رومانى`,
          con_type: "matrial",
          matrial: "law_3",
          amount: 1
        };
      } else if (lvl >= 20) {

        condtions[2] = {
          title: `1 x جدول الثانى عشر`,
          con_type: "matrial",
          matrial: "law_2",
          amount: 1
        };

      } else if (lvl >= 10) {

        condtions[2] = {
          title: ` 1 x  قانون دراكو`,
          con_type: "matrial",
          matrial: "law_1",
          amount: 1
        };

      }
      return condtions;
    }
  }
};


Elkaisar.BaseData.HeroTheaterName = [
  "ماكسيموس",
  "اشرف",
  "مصطفى",
  "اليكس",
  "اليسا",
  "بطليموس",
  "كليوباترا",
  "هكس",
  "ماجد",
  "يويليوس",
  "مارس",
  "ماكس",
  "صلاح الدين",
  "سيورس",
  "سيزار",
  "اغسطس",
  "جلادياتور",
  "سما",
  "زين",
  "شادو",
  "الملك",
  "القاهر",
  "الاسد",
  "اليس",
  "حورس",
  "يورك"
];

Elkaisar.BaseData.BattelTasks = {
  BATTEL_TASK_OPEN_BATTEL_FIELD: -1,
  BATTEL_TASK_CONQUER: 0,
  BATTEL_TASK_DOMINATE: 1,
  BATTEL_TASK_JOIN_ATT: 2,
  BATTEL_TASK_JOIN_DEF: 3,
  BATTEL_TASK_SPY: 4,
  BATTEL_TASK_SUPPORT: 5,
  BATTEL_TASK_HERO_TRANS: 6,
  BATTEL_TASK_SUPPLY: 7,
  BATTEL_TASK_ENTER_CITY: 8,
  BATTEL_TASK_CHALLANGE: 10
};


Elkaisar.BaseData.BattelTaskData = {
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_CONQUER']]: {
    'Title': 'غزو'
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_DOMINATE']]: {
    'Title': 'استيلاء'
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_ATT']]: {
    'Title': 'انضمام للهجوم '
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_DEF']]: {
    'Title': 'انضمام للدفاع'
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SPY']]: {
    'Title': 'تجسس'
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SUPPORT']]: {
    'Title': 'امداد'
  },
  [Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_HERO_TRANS']]: {
    'Title': 'نقل'
  }
};
Elkaisar.BaseData.BattelSides = {
  'SideAttack': 1,
  'SideDefence': 0
};

Elkaisar.BaseData.Building.UpgradeBinfit = {};

Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE] = [
  8e4, 16e4, 32e4, 64e4, 128e4, 256e4, 512e4, 1024e4, 2048e4, 4096e4,
  49152e3, 51200e3, 53248e3, 55296e3, 57344e3, 59392e3, 6144e4, 63488e3, 65536e3, 67584e3,
  69632e3, 7168e4, 73728e3, 75776e3, 77824e3, 79872e3, 8192e4, 83968e3, 86016e3, 88064e3
];

Elkaisar['BaseData']['Building']['UpgradeBinfit'][BUILDING_TYPS['COTTAGE']] =
  [0x64, 0xfa, 0x1f4, 0x2ee, 0x3e8, 0x5dc, 0x7d0, 0xabe, 0xdac, 0x1194, 0x1518, 0x15f9, 0x16da, 0x17bb,
    0x189c, 0x197d, 0x1a5e, 0x1b3f, 0x1c20, 0x1d01, 0x1de2, 0x1ec3, 0x1fa4, 0x2085, 0x2166, 0x2247, 0x2328,
    0x2409, 0x24ea, 0x25cb],
  Elkaisar.BaseData.RankIcon = [
    'images/number/1st.png', 'images/number/2nd.png',
    'images/number/3rd.png', 'images/number/4th.png',
    'images/number/5th.png'];
Elkaisar.BaseData.GuildRelation = {
  'RelationAllay': 0,
  'RelationEnemy': 1,
  'RelationFriend': 2
};
Elkaisar.BaseData.GuildRelationTitle = {
  [Elkaisar.BaseData.GuildRelation.RelationAllay]: 'محايد',
  [Elkaisar.BaseData.GuildRelation.RelationEnemy]: 'عدو',
  [Elkaisar.BaseData.GuildRelation.RelationFriend]: 'صديق'
};


Elkaisar.World.UnitData = {

  "0": {

    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [64, 64, 128, 96, 64, 128, 0, 96],
    tileName: { "0": "floor" },
    getTitle: (x_coord, y_coord) => {
      return "مكان خالى";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "1": {
    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [64, 64, 128, 96, 64, 128, 0, 96],
    tileName: { "0": "river_1" },
    getTitle: (x_coord, y_coord) => {
      return "بحيرة";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "17": {
    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [112, 95, 70, 118, 23, 92, 65, 70],
    tileName: { "0": "city_0" },
    getTitle: (x_coord, y_coord) => {
      return "مدينة مستوى 1";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "18": {

    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [103, 78, 106, 100, 63, 118, 18, 98, 17, 83, 58, 56],
    tileName: { "0": "city_1" },
    getTitle: (x_coord, y_coord) => {
      return "مدينة مستوى 2";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "19": {

    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [105, 72, 107, 100, 63, 125, 15, 97, 21, 72, 61, 50],
    tileName: { "0": "city_2" },
    getTitle: (x_coord, y_coord) => {
      return "مدينة مستوى 3";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "20": {

    snapShoot: "river_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { "0": "city_3" },
    getTitle: (x_coord, y_coord) => {
      return "مدينة مستوى 4";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "21": {

    snapShoot: "mountain_1.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [101, 94, 67, 115, 27, 96, 63, 72],
    tileName: { 1: "m_1", 2: "m_2", 3: "m_3", 4: "m_4" },
    getTitle: (x_coord, y_coord) => {
      return "هضبة";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "22": {

    snapShoot: "mountain_2.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [123, 96, 67, 123, 12, 96, 49, 66, 74, 52],
    tileName: { 5: "m_5", 6: "m_6", 7: "m_7" },
    getTitle: (x_coord, y_coord) => {
      return "جبل";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "23": {

    snapShoot: "mountain_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [119, 92, 70, 122, 11, 90, 61, 27, 88, 31],
    tileName: { 8: "m_8", 9: "m_9", 10: "m_10" },
    getTitle: (x_coord, y_coord) => {
      return "جبال";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "24": {

    snapShoot: "desert_1.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [65, 67, 20, 91, 73, 118, 105, 92],
    tileName: { 1: "d_1", 2: "d_2", 3: "d_3", 4: "d_4" },
    getTitle: (x_coord, y_coord) => {
      return "رمال";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "25": {

    snapShoot: "desert_2.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [112, 98, 60, 120, 15, 96, 60, 72, 86, 66],
    tileName: { 5: "d_5", 6: "d_6", 7: "d_7" },
    getTitle: (x_coord, y_coord) => {
      return "صحراء";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "26": {

    snapShoot: "desert_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [119, 97, 62, 120, 19, 95, 41, 77, 47, 56, 86, 58],
    tileName: { 8: "d_8", 9: "d_9", "10": "d_10" },
    getTitle: (x_coord, y_coord) => {
      return "صحراء";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "27": {

    snapShoot: "wood_1.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [63, 72, 90, 83, 92, 97, 67, 112, 39, 99, 47, 84],
    tileName: { 1: "w_1", 2: "w_2", 3: "w_3", 4: "w_4" },
    getTitle: (x_coord, y_coord) => {
      return "احراش";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "28": {

    snapShoot: "wood_2.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [64, 64, 106, 86, 109, 101, 66, 122, 27, 97, 33, 80],
    tileName: { 5: "w_5", 6: "w_6", 7: "w_7" },
    getTitle: (x_coord, y_coord) => {
      return "اخشاب";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "29": {

    snapShoot: "wood_3.png",
    desc: null,
    maxLvl: 0,
    prom_lvl: 0,
    fitness: 0,
    make_req: [],
    join_req: [],
    hitArea: [62, 48, 116, 77, 120, 97, 65, 127, 15, 100, 16, 74],
    tileName: { 8: "w_8", 9: "w_9", 10: "w_10" },
    getTitle: (x_coord, y_coord) => {
      return "غابات";
    },
    timeNextRest: () => {
      return null;
    }

  },
  "30": {
    snapShoot: "monwrat.png",
    ar_title: "مناورات",
    prom_title: "مواطن",
    prom_lvl: 0,
    fitness: 40,
    make_req: ["necklace_4"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "مناورات";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,
    maxLvl: 50,
    hitArea: [64, 0, 128, 32, 128, 96, 64, 128, 0, 96, 0, 32],
    tileName: { 0: "mnawrat" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }

  },
  "31": {
    snapShoot: "camps.png",
    ar_title: "معسكرات",
    prom_title: "مواطن",
    prom_lvl: 0,
    fitness: 40,
    make_req: ["necklace_4"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      if (x_coord === 136 && y_coord === 160) {
        return `المعسكر الفرنسى المتمرد`;
      } else if (x_coord === 407 && y_coord === 66) {
        return `المعسكر الاسيوى المتمرد`;
      } else if (x_coord === 106 && y_coord === 19) {
        return `المعسكر البريطانى المتمرد`;
      } else if (x_coord === 392 && y_coord === 213) {
        return `المعسكر المقدونى المتمرد`;
      } else if (x_coord === 266 && y_coord === 245) {
        return `المعسكر الايطالى المتمرد`;
      } else if (x_coord === 78 && y_coord === 300) {
        return `المعسكر الاسبانى المتمرد`;
      } else if (x_coord === 427 && y_coord === 337) {
        return `المعسكر الفارسى المتمرد`;
      } else if (x_coord === 316 && y_coord === 450) {
        return `المعسكر المصرى المتمرد`;
      } else if (x_coord === 88 && y_coord === 444) {
        return `المعسكر القرطاجى المتمرد`;
      } else if (x_coord === 246 && y_coord === 111) {
        return `المعسكر الالمانى المتمرد`;
      }
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 50,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "city_4" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "32": {
    snapShoot: "front_squad.png",
    ar_title: "الفرقة الامامية",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    getTitle: function (x_coord, y_coord) {
      return "الفرقة الامامية";
    },
    maxLvl: 40,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "front_squad" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "33": {
    snapShoot: "front_squad.png",
    ar_title: "السرية الامامية",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    getTitle: function (x_coord, y_coord) {
      return "السرية الامامية";
    },
    maxLvl: 40,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "front_band" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "34": {
    snapShoot: "front_band.png",
    ar_title: "الجماعة الامامية",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    getTitle: function (x_coord, y_coord) {
      return "الجماعة الامامية";
    },
    maxLvl: 40,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "front_squadron" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "35": {
    snapShoot: "front_division.png",
    ar_title: "الكتيبة الامامية",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "الكتيبة الامامية";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 40,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "front_division" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "36": {
    snapShoot: "armed_light_squad.png",
    ar_title: "فرقة التسليح الخفيف",
    prom_lvl: 10,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "فرقة التسليح الخفيف";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 30,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_light_squad" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "37": {
    snapShoot: "armed_light_band.png",
    ar_title: "سرية التسليح الخفيف",
    prom_lvl: 10,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "سرية التسليح الخفيف";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 30,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_light_band" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "38": {
    snapShoot: "armed_light_squadron.png",
    ar_title: "جماعة التسليح الخفيف",
    prom_lvl: 10,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "جماعة التسليح الخفيف";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 30,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_light_squadron" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "39": {
    snapShoot: "armed_light_division.png",
    ar_title: "كتيبة التسليح الخفيف",
    prom_lvl: 10,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "كتيبة التسليح الخفيف";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 30,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_light_division" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "40": {
    snapShoot: "armed_heavy_squad.png",
    ar_title: "فرقة التسليح الثقيل",
    prom_lvl: 20,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "فرقة التسليح الثقيل";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_heavy_squad" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "41": {
    snapShoot: "armed_heavy_band.png",
    ar_title: "سرية التسليح الثقيل",
    prom_lvl: 20,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "سرية التسليح الثقيل";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_heavy_band" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "42": {
    snapShoot: "armed_heavy_squadron.png",
    ar_title: "جماعة التسليح الثقيل",
    prom_lvl: 20,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "جماعة التسليح الثقيل";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_heavy_squadron" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "43": {
    snapShoot: "armed_heavy_division.png",
    ar_title: "كتيبة التسليح الثقيل",
    prom_lvl: 20,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "كتيبة التسليح الثقيل";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "armed_heavy_division" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "44": {
    snapShoot: "guard_squad.png",
    ar_title: "فرقة الحراسة",
    prom_lvl: 25,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "فرقة الحراسة";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "guard_squad" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "45": {
    snapShoot: "guard_band.png",
    ar_title: "سرية الحراسة",
    prom_lvl: 25,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "سرية الحراسة";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "guard_band" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "46": {
    snapShoot: "guard_squadron.png",
    ar_title: "جماعة الحراسة",
    prom_lvl: 25,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "جماعة الحراسة";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "guard_squadron" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "47": {
    snapShoot: "guard_division.png",
    ar_title: "كتيبة الحراسة",
    prom_lvl: 25,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "كتيبة الحراسة";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 20,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "guard_division" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "48": {
    snapShoot: "thunder.png",
    ar_title: "الساندرز",
    prom_lvl: 29,
    fitness: 40,
    make_req: ["truce_pack"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "الساندرز الشجاع";
    },
    desc: `
            مرحبا بكم في فتح باب الدم. ثق بي ، هذه مجرد البداية.

            بعد سلسلة من الحروب الطويلة ، أصبحت قوة قوات المتمردين في الجمهورية الرومانية أضعف وأضعف.
             النجاح الكبير لا يرجع فقط إلى تصميم مجلس الشيوخ ، ولكن أيضًا يرتبط ارتباطًا وثيقًا باستراتيجية عسكرية جديدة وافق عليها جميع قضاة المقاطعات سابقًا.
             وفقًا للاستراتيجية ، يلعب مجلس الشيوخ في الواقع لعبة القط والفأر مع المتمردين ، بهدف القضاء عليهم جميعًا في وقت واحد في المستقبل.
             هنا تأتي الفرصة الآن. لقد جمع المتمردون أخيرًا في الشمال الشرقي شديد البرودة كما هو متوقع.
             ومع ذلك ، فقد شكلوا مجموعة قوية للغاية تسمى محور الاستقلال وأعلنت Fearless Skullbearer كزعيم.
              Fearless Skullbearer هو مقاتلة حديدية الوحد الذي يوحد الغشاشين ويلهم قوات المتمردين. 
            مع نظر العالم إلى الشمال الشرقي للجمهورية الرومانية ، ينادي مجلس الشيوخ بهجوم عام ضد محور الاستقلال.`,

    maxLvl: 10,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "brave_thunder" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "49": {
    snapShoot: "gang.png",
    ar_title: "العصابات",
    prom_lvl: 1,
    fitness: 20,
    make_req: ["t_map"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "العصابات";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 2,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "gang" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "50": {
    snapShoot: "mugger.png",
    ar_title: "قطاع الطرق",
    prom_lvl: 1,
    fitness: 20,
    make_req: ["t_map"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "قطاع الطريق";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 2,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "mugger" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "51": {
    snapShoot: "thief.png",
    ar_title: "اللصوص",
    prom_lvl: 1,
    fitness: 20,
    make_req: ["t_map"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "اللصوص";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 2,
    hitArea: [63, 37, 11, 60, 6, 94, 66, 126, 124, 100, 115, 66],
    tileName: { 0: "thief" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "52": {
    snapShoot: "c_gang.png",
    ar_title: "العصابات القرطاجية",
    prom_lvl: 4,
    fitness: 20,
    make_req: ["repel_trumpet_1"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "العصابات القرطاجية";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [69, 110, 90, 101, 90, 69, 63, 53, 42, 64, 41, 97],
    tileName: { 0: "carthage_gang" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "53": {
    snapShoot: "c_teams.png",
    ar_title: "فرق العصيان القرطاجى",
    prom_lvl: 1,
    fitness: 30,
    make_req: ["repel_trumpet_1"],
    join_req: [""],
    getTitle: function (x_coord, y_coord) {
      return "فرق العصيان القرطاجى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [63, 112, 97, 96, 94, 71, 65, 54, 35, 68, 34, 98],
    tileName: { 0: "carthage_teams" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "54": {
    snapShoot: "c_rebels.png",
    ar_title: "متمردى قرطاجة",
    prom_lvl: 7,
    fitness: 40,
    make_req: ["repel_trumpet_2"],
    join_req: ["repel_trumpet_2"],
    getTitle: function (x_coord, y_coord) {
      return "متمردى قرطاجة";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [69, 115, 104, 102, 97, 68, 61, 48, 34, 64, 31, 98],
    tileName: { 0: "carthage_rebels" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "55": {
    snapShoot: "c_forces.png",
    ar_title: "القوات الخاصة القرطاجية",
    prom_lvl: 14,
    fitness: 50,
    make_req: ["repel_trumpet_2"],
    join_req: ["repel_trumpet_2"],
    getTitle: function (x_coord, y_coord) {
      return "القوات الخاصة القرطاجية";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [67, 116, 110, 100, 101, 67, 69, 47, 31, 65, 29, 100],
    tileName: { 0: "carthage_forces" },
    timeNextRest: function () {
      return TimeRest.restEvery6();
    }
  },
  "56": {
    snapShoot: "c_capital.png",
    ar_title: "عاصمة التمرد",
    prom_lvl: 19,
    fitness: 60,
    make_req: ["repel_medal"],
    join_req: ["repel_medal"],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة التمرد";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [62, 116, 108, 97, 102, 67, 71, 46, 29, 64, 27, 98],
    tileName: { 0: "carthage_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "100": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة المشاة",
    prom_lvl: 1,
    fitness: 50,
    make_req: ["warrior_medal"],
    join_req: [],
    hero_army_req: 1,
    getTitle: function (x_coord, y_coord) {
      return "عاصمة المشاة";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "101": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة الفرسان",
    prom_lvl: 1,
    fitness: 50,
    hero_army_req: 2,
    make_req: ["warrior_medal"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة الفرسان";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "102": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة المدرعين",
    prom_lvl: 1,
    fitness: 50,
    hero_army_req: 3,
    make_req: ["warrior_medal"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة المدرعين";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "103": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة رماة السهم",
    prom_lvl: 1,
    fitness: 50,
    hero_army_req: 4,
    make_req: ["warrior_medal"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة رماة السهم";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "104": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة المقاليعٍ",
    prom_lvl: 1,
    fitness: 50,
    hero_army_req: 5,
    make_req: ["warrior_medal"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة المقاليع";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "105": {
    snapShoot: "armyCapital.png",
    ar_title: "عاصمة المنجنيق",
    prom_lvl: 1,
    fitness: 50,
    hero_army_req: 6,
    make_req: ["warrior_medal"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "عاصمة المنجنيق";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "army_capital" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "125": {
    snapShoot: "arena.png",
    ar_title: "حلبة التحدى",
    prom_lvl: 1,
    fitness: 10,
    make_req: [],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "حلبة التحدى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "arena" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "126": {
    snapShoot: "arena.png",
    ar_title: "حلبة الموت",
    prom_lvl: 1,
    fitness: 10,
    make_req: [],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "حلبة الموت";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "arena" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "127": {
    snapShoot: "arena.png",
    ar_title: "حلبة تحدى الاحلاف",
    prom_lvl: 1,
    fitness: 10,
    make_req: [],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "حلبة تحدى الاحلاف";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "arena" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "130": {
    snapShoot: "queenCityS.png",
    ar_title: "الملكة الصغرى",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["bronze_horn"],
    join_req: ["bronze_horn"],
    getTitle: function (x_coord, y_coord) {
      return "الملكة الصغرى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "queenCity_1" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "131": {
    snapShoot: "queenCityM.png",
    ar_title: "الملكة الوسطى",
    prom_lvl: 4,
    fitness: 50,
    make_req: ["silver_horn"],
    join_req: ["silver_horn"],
    getTitle: function (x_coord, y_coord) {
      return "الملكة الصغرى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "queenCity_2" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "132": {
    snapShoot: "queenCityH.png",
    ar_title: "الملكة الكبرى",
    prom_lvl: 5,
    fitness: 60,
    make_req: ["gold_horn"],
    join_req: ["gold_horn"],
    getTitle: function (x_coord, y_coord) {
      return "الملكة الصغرى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "queenCity_3" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "134": {
    snapShoot: "repleCastleS.png",
    ar_title: "القلاع الصغرى",
    prom_lvl: 3,
    fitness: 40,
    make_req: ["bronze_horn"],
    join_req: ["bronze_horn"],
    getTitle: function (x_coord, y_coord) {
      return "القلاع الصغرى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "repleCastle_1" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "135": {
    snapShoot: "repleCastleM.png",
    ar_title: "القلاع الوسطى",
    prom_lvl: 4,
    fitness: 50,
    make_req: ["silver_horn"],
    join_req: ["silver_horn"],
    getTitle: function (x_coord, y_coord) {
      return "القلاع الوسطى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "repleCastle_2" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "136": {
    snapShoot: "repleCastleH.png",
    ar_title: "القلاع الكبرى",
    prom_lvl: 5,
    fitness: 60,
    make_req: ["gold_horn"],
    join_req: ["gold_horn"],
    getTitle: function (x_coord, y_coord) {
      return "القلاع الكبرى";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    hitArea: [81, 30, 39, 32, 26, 110, 62, 129, 106, 118],
    tileName: { 0: "repleCastle_3" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "150": {
    snapShoot: "statueWar_1.png",
    ar_title: "تمثال الحرب الاصغر",
    prom_lvl: 29,
    fitness: 100,
    make_req: ["evil_army_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "تمثال الحرب الاصغر";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 75,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "151": {
    snapShoot: "statueWar_2.png",
    ar_title: "تمثال الحرب الاوسط",
    prom_lvl: 29,
    fitness: 100,
    make_req: ["evil_army_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "تمثال الحرب الاوسط";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 50,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "152": {
    snapShoot: "statueWar_3.png",
    ar_title: "تمثال الحرب الاكبر",
    prom_lvl: 5,
    fitness: 60,
    make_req: ["evil_army_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "تمثال الحرب الاكبر";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 25,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery12();
    }
  },
  "153": {
    snapShoot: "wolf_1.png",
    ar_title: "مجموعة الذئب 1",
    prom_lvl: 29,
    fitness: 100,
    make_req: ["evil_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "مجموعة الذئب 1";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "154": {
    snapShoot: "wolf_2.png",
    ar_title: "مجموعة الذئب 2",
    prom_lvl: 29,
    fitness: 100,
    make_req: ["evil_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "مجموعة الذئب 2";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },
  "155": {
    snapShoot: "wolf_3.png",
    ar_title: "مجموعة الذئب 3",
    prom_lvl: 29,
    fitness: 100,
    make_req: ["evil_pass"],
    join_req: [],
    getTitle: function (x_coord, y_coord) {
      return "مجموعة الذئب 3";
    },
    desc: `التخلي عن النضال عديمة الفائدة! أنا هنا لإنهاء حياتك السلمية.

الجمهورية الرومانية تتعرض للهجوم من قبل              Skullbearer Fearless ويشارك اللوردات في المعركة مع قوات المتمردين.
             وبالتالي لا يوجد عدد كاف من القوات للحفاظ على النظام في المدن.
            في هذا الوقت ، تتعرض الثروة الشعبية للتهديد من قبل مجرمين مثل اللصوص وعصابات العصابات المتجولين وعصابات العصابات ،
             وكلهم يختبئون في الجمهورية الرومانية لفترة طويلة. إنهم يقرعون ويقتلون السكان ، مما يجعل الناس يعانون.
            أيضا ، يحرقون المنازل لإخراج الناس من المكان الذي يعيشون فيه ، مما يسبب عدم استقرار المجتمع.
            الآن المواطنون الرومانيون يتوقون إلى الحياة السلمية وينتظرون المنقذ الذي يمكنه القضاء على الجرائم وتقديمهم إلى الحياة السعيدة السابقة.`,

    maxLvl: 10,
    heroNum: 3,
    techLvl: 10,
    heroLvl: 255,
    hitArea: [33, 111, 56, 126, 85, 113, 78, 37, 53, 34],
    tileName: { 0: "wolfStatue" },
    timeNextRest: function () {
      return TimeRest.restEvery4();
    }
  },

  isPromLvlOk: function (type) {
    var camp = Elkaisar.World.UnitTypeData[type];
    return (Elkaisar.DPlayer.Player.porm >= camp.reqProm);
  },

  isAttackable: function (type) {
    var camp = Elkaisar.World.UnitTypeData[type];
    for (var mat in camp.MakeReq) {
      if (Matrial.getPlayerAmount(camp.MakeReq[mat].Item) < camp.MakeReq[mat].amount) {
        return false;
      }
    }
    return (Elkaisar.DPlayer.Player.porm >= camp.reqProm);
  }
};