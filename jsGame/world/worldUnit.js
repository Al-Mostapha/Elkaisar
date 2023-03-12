const WUT_EMPTY = 0;

const WUT_RIVER_LVL_1 = 1;
const WUT_RIVER_LVL_2 = 2;
const WUT_RIVER_LVL_3 = 3;
const WUT_RIVER_LVL_4 = 4;
const WUT_RIVER_LVL_5 = 5;
const WUT_RIVER_LVL_6 = 6;
const WUT_RIVER_LVL_7 = 7;
const WUT_RIVER_LVL_8 = 8;
const WUT_RIVER_LVL_9 = 9;
const WUT_RIVER_LVL_10 = 10;

const WUT_BUSY_UNIT = 12;
const WUT_WORLD_FLOOR = 11;

const WUT_MOUNT_LVL_1 = 30;
const WUT_MOUNT_LVL_2 = 31;
const WUT_MOUNT_LVL_3 = 32;
const WUT_MOUNT_LVL_4 = 33;
const WUT_MOUNT_LVL_5 = 34;
const WUT_MOUNT_LVL_6 = 35;
const WUT_MOUNT_LVL_7 = 36;
const WUT_MOUNT_LVL_8 = 37;
const WUT_MOUNT_LVL_9 = 38;
const WUT_MOUNT_LVL_10 = 39;

const WUT_DESERT_LVL_1 = 40;
const WUT_DESERT_LVL_2 = 41;
const WUT_DESERT_LVL_3 = 42;
const WUT_DESERT_LVL_4 = 43;
const WUT_DESERT_LVL_5 = 44;
const WUT_DESERT_LVL_6 = 45;
const WUT_DESERT_LVL_7 = 46;
const WUT_DESERT_LVL_8 = 47;
const WUT_DESERT_LVL_9 = 48;
const WUT_DESERT_LVL_10 = 49;

const WUT_WOODS_LVL_1 = 50;
const WUT_WOODS_LVL_2 = 51;
const WUT_WOODS_LVL_3 = 52;
const WUT_WOODS_LVL_4 = 53;
const WUT_WOODS_LVL_5 = 54;
const WUT_WOODS_LVL_6 = 55;
const WUT_WOODS_LVL_7 = 56;
const WUT_WOODS_LVL_8 = 57;
const WUT_WOODS_LVL_9 = 58;
const WUT_WOODS_LVL_10 = 59;

const WUT_CITY_LVL_0 = 60;
const WUT_CITY_LVL_1 = 61;
const WUT_CITY_LVL_2 = 62;
const WUT_CITY_LVL_3 = 63;

const WUT_MONAWRAT = 70;

const WUT_CAMP_BRITONS = 71;
const WUT_CAMP_REICH = 72;
const WUT_CAMP_ASIANA = 73;
const WUT_CAMP_GAULS = 74;
const WUT_CAMP_MACEDON = 75;
const WUT_CAMP_HISPANIA = 76;
const WUT_CAMP_ITALIA = 77;
const WUT_CAMP_PARTHIA = 78;
const WUT_CAMP_CARTHAGE = 79;
const WUT_CAMP_EGYPT = 80;



const WUT_FRONT_SQUAD = 81;
const WUT_FRONT_BAND = 82;
const WUT_FRONT_SQUADRON = 83;
const WUT_FRONT_DIVISION = 84;


const WUT_ARMY_LIGHT_SQUAD = 85;
const WUT_ARMY_LIGHT_BAND = 86;
const WUT_ARMY_LIGHT_SQUADRON = 87;
const WUT_ARMY_LIGHT_DIVISION = 88;

const WUT_ARMY_HEAVY_SQUAD = 89;
const WUT_ARMY_HEAVY_BAND = 90;
const WUT_ARMY_HEAVY_SQUADRON = 91;
const WUT_ARMY_HEAVY_DIVISION = 92;

const WUT_GUARD_SQUAD = 93;
const WUT_GUARD_BAND = 94;
const WUT_GUARD_SQUADRON = 95;
const WUT_GUARD_DIVISION = 96;

const WUT_BRAVE_THUNDER = 97;

const WUT_GANG = 98;
const WUT_MUGGER = 99;
const WUT_THIEF = 100;

/* CARTAGE */

const WUT_CARTHAGE_GANG = 101;
const WUT_CARTHAGE_TEAMS = 102;
const WUT_CARTHAGE_REBELS = 103;
const WUT_CARTHAGE_FORCES = 104;
const WUT_CARTHAGE_CAPITAL = 105;


const WUT_ARMY_CAPITAL_A = 150;
const WUT_ARMY_CAPITAL_B = 151;
const WUT_ARMY_CAPITAL_C = 152;
const WUT_ARMY_CAPITAL_D = 153;
const WUT_ARMY_CAPITAL_E = 154;
const WUT_ARMY_CAPITAL_F = 155;


const WUT_ARENA_CHALLANGE = 175;
const WUT_ARENA_DEATH = 176;
const WUT_ARENA_GUILD = 177;


const WUT_QUEEN_CITY_A = 180;
const WUT_QUEEN_CITY_B = 181;
const WUT_QUEEN_CITY_C = 182;

const WUT_REPLE_CASTLE_A = 184;
const WUT_REPLE_CASTLE_B = 185;
const WUT_REPLE_CASTLE_C = 186;

const WUT_WAR_STATUE_A = 200;
const WUT_WAR_STATUE_B = 201;
const WUT_WAR_STATUE_C = 202;


const WUT_WOLF_STATUE_A = 203;
const WUT_WOLF_STATUE_B = 204;
const WUT_WOLF_STATUE_C = 205;


const WUT_CHALLAGE_FIELD_PLAYER = 220;
const WUT_CHALLAGE_FIELD_TEAM = 221;
const WUT_CHALLAGE_FIELD_GUILD = 222;
const WUT_CHALLAGE_FIELD_SERVER = 223;

const WUT_FIEGHT_FIELD_PLAYER = 224;
const WUT_FIEGHT_FIELD_TEAM = 225;
const WUT_FIEGHT_FIELD_GUILD = 226;
const WUT_FIEGHT_FIELD_SERVER = 227;

const WUT_SEA_CITY_1 = 231;
const WUT_SEA_CITY_2 = 232;
const WUT_SEA_CITY_3 = 233;
const WUT_SEA_CITY_4 = 234;
const WUT_SEA_CITY_5 = 235;
const WUT_SEA_CITY_6 = 236;

var WorldUnit = {

  isBarrary: function (unitType) {
    return (Number(unitType) >= WUT_RIVER_LVL_1 && unitType <= WUT_WOODS_LVL_10);
  },

  isRiver: function (unitType) {
    return (Number(unitType) >= WUT_RIVER_LVL_1 && unitType <= WUT_RIVER_LVL_10);
  },

  isEmpty: function (unitType) {
    return (Number(unitType) === WUT_EMPTY);
  },

  isCity: function (unitType) {
    return (Number(unitType) >= WUT_CITY_LVL_0 && unitType <= WUT_CITY_LVL_3);
  },
  isCityLv0: function (unitType) {
    return (Number(unitType) === WUT_CITY_LVL_0);
  },
  isCityLv1: function (unitType) {
    return (Number(unitType) === WUT_CITY_LVL_1);
  },
  isCityLv2: function (unitType) {
    return (Number(unitType) === WUT_CITY_LVL_2);
  },
  isCityLv3: function (unitType) {
    return (Number(unitType) === WUT_CITY_LVL_3);
  },

  isMountain: function (unitType) {
    return (Number(unitType) >= WUT_MOUNT_LVL_1 && unitType <= WUT_MOUNT_LVL_10);
  },

  isDesert: function (unitType) {
    return (Number(unitType) >= WUT_DESERT_LVL_1 && unitType <= WUT_DESERT_LVL_10);
  },

  isWood: function (unitType) {
    return (Number(unitType) >= WUT_WOODS_LVL_1 && unitType <= WUT_WOODS_LVL_10);
  },

  isMonawrat: function (unitType) {
    return (Number(unitType) === WUT_MONAWRAT);
  },

  isCamp: function (unitType) {
    return (Number(unitType) >= WUT_CAMP_BRITONS && unitType <= WUT_CAMP_EGYPT);
  },

  isAsianSquads: function (unitType) {
    return (Number(unitType) >= WUT_FRONT_SQUAD && unitType <= WUT_BRAVE_THUNDER);
  },

  isOneFRONT: function (unitType) {
    return (Number(unitType) >= WUT_FRONT_SQUAD && unitType <= WUT_FRONT_DIVISION);
  },

  isFrontSquad: function (unitType) {
    return (Number(unitType) === WUT_FRONT_SQUAD);
  },

  isFrontBand: function (unitType) {
    return (Number(unitType) === WUT_FRONT_BAND);
  },

  isFrontSquadron: function (unitType) {
    return (Number(unitType) === WUT_FRONT_SQUADRON);
  },

  isFrontDivision: function (unitType) {
    return (Number(unitType) === WUT_FRONT_DIVISION);
  },

  isOneLight: function (unitType) {
    return (Number(unitType) >= WUT_ARMY_LIGHT_SQUAD && unitType <= WUT_ARMY_LIGHT_DIVISION);
  },

  isLightSquad: function (unitType) {
    return (Number(unitType) === WUT_ARMY_LIGHT_SQUAD);
  },

  isLightBand: function (unitType) {
    return (Number(unitType) === WUT_ARMY_LIGHT_BAND);
  },

  isLightSquadron: function (unitType) {
    return (Number(unitType) === WUT_ARMY_LIGHT_SQUADRON);
  },

  isLightDivision: function (unitType) {
    return (Number(unitType) === WUT_ARMY_LIGHT_DIVISION);
  },

  isOneHeavy: function (unitType) {
    return (Number(unitType) >= WUT_ARMY_HEAVY_SQUAD && unitType <= WUT_ARMY_HEAVY_DIVISION);
  },

  isHeavySquad: function (unitType) {
    return (Number(unitType) === WUT_ARMY_HEAVY_SQUAD);
  },

  isHeavyBand: function (unitType) {
    return (Number(unitType) === WUT_ARMY_HEAVY_SQUAD);
  },

  isHeavySquadron: function (unitType) {
    return (Number(unitType) === WUT_ARMY_HEAVY_SQUADRON);
  },

  isHeavyDivision: function (unitType) {
    return (Number(unitType) === WUT_ARMY_HEAVY_DIVISION);
  },

  isOneGuard: function (unitType) {
    return (Number(unitType) >= WUT_GUARD_SQUAD && unitType <= WUT_GUARD_DIVISION);
  },

  isGuardSquad: function (unitType) {
    return (Number(unitType) === WUT_GUARD_SQUAD);
  },

  isGuardBand: function (unitType) {
    return (Number(unitType) === WUT_GUARD_BAND);
  },

  isGuardSquadron: function (unitType) {
    return (Number(unitType) === WUT_GUARD_SQUADRON);
  },

  isGuardDivision: function (unitType) {
    return (Number(unitType) === WUT_GUARD_DIVISION);
  },

  isBraveThunder: function (unitType) {
    return (Number(unitType) === WUT_BRAVE_THUNDER);
  },

  isGangStar: function (unitType) {
    return (Number(unitType) >= WUT_GANG && unitType <= WUT_THIEF);
  },

  isGang: function (unitType) {
    return (Number(unitType) === WUT_GANG);
  },

  isMugger: function (unitType) {
    return (Number(unitType) === WUT_MUGGER);
  },

  isThiefs: function (unitType) {
    return (Number(unitType) === WUT_THIEF);
  },

  isCarthagianArmies: function (unitType) {
    return (Number(unitType) >= WUT_CARTHAGE_GANG && unitType <= WUT_CARTHAGE_CAPITAL);
  },

  isCarthasianGang: function (unitType) {
    return (Number(unitType) === WUT_CARTHAGE_GANG);
  },

  isCarthageTeams: function (unitType) {
    return (Number(unitType) === WUT_CARTHAGE_TEAMS);
  },

  isCarthageRebals: function (unitType) {
    return (Number(unitType) === WUT_CARTHAGE_REBELS);
  },

  isCarthageForces: function (unitType) {
    return (Number(unitType) === WUT_CARTHAGE_FORCES);
  },

  isCarthageCapital: function (unitType) {
    return (Number(unitType) === WUT_CARTHAGE_CAPITAL);
  },

  isArmyCapital: function (unitType) {
    return (Number(unitType) >= WUT_ARMY_CAPITAL_A && unitType <= WUT_ARMY_CAPITAL_F);
  },

  isArmyCapitalA: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_A);
  },

  isArmyCapitalB: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_B);
  },

  isArmyCapitalC: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_C);
  },

  isArmyCapitalD: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_D);
  },

  isArmyCapitalE: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_E);
  },

  isArmyCapitalF: function (unitType) {
    return (Number(unitType) === WUT_ARMY_CAPITAL_F);
  },

  isQueenCity: function (unitType) {
    return (Number(unitType) >= WUT_QUEEN_CITY_A && unitType <= WUT_QUEEN_CITY_C);
  },

  isQueenCityS: function (unitType) {
    return (Number(unitType) === WUT_QUEEN_CITY_A);
  },

  isQueenCityM: function (unitType) {
    return (Number(unitType) === WUT_QUEEN_CITY_B);
  },

  isQueenCityH: function (unitType) {
    return (Number(unitType) === WUT_QUEEN_CITY_C);
  },

  isRepelCastle: function (unitType) {
    return (Number(unitType) >= WUT_REPLE_CASTLE_A && unitType <= WUT_REPLE_CASTLE_C);
  },

  isRepelCastleS: function (unitType) {
    return (Number(unitType) === WUT_REPLE_CASTLE_A);
  },

  isRepelCastleM: function (unitType) {
    return (Number(unitType) === WUT_REPLE_CASTLE_B);
  },

  isRepelCastleH: function (unitType) {
    return (Number(unitType) === WUT_REPLE_CASTLE_C);
  },

  isStatueWar: function (unitType) {
    return (Number(unitType) >= WUT_WAR_STATUE_A && unitType <= WUT_WAR_STATUE_C);
  },

  isStatueWarS: function (unitType) {
    return (Number(unitType) === WUT_WAR_STATUE_A);
  },

  isStatueWarM: function (unitType) {
    return (Number(unitType) === WUT_WAR_STATUE_B);
  },

  isStatueWarH: function (unitType) {
    return (Number(unitType) === WUT_WAR_STATUE_C);
  },

  isStatueWalf: function (unitType) {
    return (Number(unitType) >= WUT_WOLF_STATUE_A && unitType <= WUT_WOLF_STATUE_C);
  },

  isStatueWalfS: function (unitType) {
    return (Number(unitType) === WUT_WOLF_STATUE_A);
  },

  isStatueWalfM: function (unitType) {
    return (Number(unitType) === WUT_WOLF_STATUE_B);
  },

  isStatueWalfH: function (unitType) {
    return (Number(unitType) === WUT_WOLF_STATUE_C);
  },

  canHasGarrison: function (unitType) {
    return (isCity(unitType) || isBarrary(unitType));
  },

  isArena: function (unitType) {
    return (Number(unitType) >= WUT_ARENA_CHALLANGE && unitType <= WUT_ARENA_GUILD);
  },

  isArenaChallange: function (unitType) {
    return (Number(unitType) === WUT_ARENA_CHALLANGE);
  },
  isDominatable: function (unitType) {
    return WorldUnit['isQueenCity'](unitType) || WorldUnit['isRepelCastle'](unitType) || WorldUnit['isArmyCapital'](unitType);
  },
  'isSeaCity': function (unitType) {
    return Number(unitType) >= WUT_SEA_CITY_1 && unitType <= WUT_SEA_CITY_6;
  },
  isArenaDeath: function (unitType) {
    return (Number(unitType) === WUT_ARENA_DEATH);
  },

  isArenaGuild: function (unitType) {
    return (Number(unitType) === WUT_ARENA_GUILD);
  },

  getWorldUnit: function (x, y) {
    return Elkaisar.worldAllUnits[x * 500 + Number(y)];
  },
  getUnitData: function (unitType) {
    return Elkaisar.World.UnitTypeData[unitType];
  },

  refreshUnitData: function (x, y) {


    return $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AWorld/refreshWorldUnitLvl`,
      data: {
        xCoord: x,
        yCoord: y,
        server: Elkaisar.Config.idServer,
        token: Elkaisar.Config.OuthToken
      },
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var jsonData = JSON.parse(data);
        WorldUnit.getWorldUnit(x, y).l = jsonData.l;
        WorldUnit.getWorldUnit(x, y).t = jsonData.t;
        WorldUnit.getWorldUnit(x, y).ut = jsonData.ut;

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },

  getCampFlage(x, y) {

    x = Number(x);
    y = Number(y);

    var Unit = WorldUnit.getWorldUnit(x, y);
    $flag = "";
    if (Number(Unit.ut) === WUT_CAMP_GAULS) {
      $flag = "flag_france";
    } else if (Number(Unit.ut) === WUT_CAMP_ASIANA) {
      $flag = "flag_magul";
    } else if (Number(Unit.ut) === WUT_CAMP_BRITONS) {
      $flag = "flag_england";
    } else if (Number(Unit.ut) === WUT_CAMP_MACEDON) {
      $flag = "flag_macdoni";
    } else if (Number(Unit.ut) === WUT_CAMP_ITALIA) {
      $flag = "flag_roma";
    } else if (Number(Unit.ut) === WUT_CAMP_HISPANIA) {
      $flag = "flag_spain";
    } else if (Number(Unit.ut) === WUT_CAMP_PARTHIA) {
      $flag = "flag_greek";
    } else if (Number(Unit.ut) === WUT_CAMP_EGYPT) {
      $flag = "flag_egypt";
    } else if (Number(Unit.ut) === WUT_CAMP_CARTHAGE) {
      $flag = "flag_cartaga";
    } else if (Number(Unit.ut) === WUT_CAMP_REICH) {
      $flag = "flag_germany";
    }

    return $flag;

  },

  refreshUnitView(x, y) {

    Elkaisar.World.Map.DeletUnit(Elkaisar.World.Map.realCoord(x), Elkaisar.World.Map.realCoord(y))
    addMapUnite({
      x: x,
      y: y
    });
    Animation.cityFlag();
    Animation.fireWorldUnit(x, y);

  }
};



WorldUnit.WorldUnitRank = function (x, y) {

  var unitType = Number(WorldUnit.getWorldUnit(x, y).ut);
  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AWorld/getWorldUnitRank`,
    data: {
      xCoord: x,
      yCoord: y,
      unitType: unitType,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'GET',
    success: function (data, textStatus, jqXHR) {

      if (isJson(data)) {
        var jsonData = JSON.parse(data);
      } else {
        Elkaisar.LBase.Error(data);
      }
      var icon = ["1st", "2nd", "3rd", "4th", "5th"];

      var list = "";
      var name = "";
      var guild = "";
      var duration = "";
      var innerList = "";

      for (var iii = 0; iii < 5; iii++) {

        if (jsonData[iii]) {

          name = jsonData[iii].PlayerName || jsonData[iii].GuildName;
          guild = jsonData[iii].GuildName === "NULL" ? "---" : jsonData[iii].GuildName;
          duration = `${Math.floor(jsonData[iii].totalDuration / 60)}د ${jsonData[iii].totalDuration % 60} ث`;

        } else {

          name = "";
          guild = "";
          duration = "";

        }

        if (WorldUnit.isArenaGuild(unitType)) {

          innerList = `   <div class="td_1" style="width: 30%">
                                        <div class="rank-image" style="background-image: url(images/number/${icon[iii]}.png)"></div>
                                    </div>
                                    <div class="td_1" style="width: 40%">${name}</div>
                                    <div class="td_1 rtl font-2"  style="width: 30%">${duration}</div>`;
        } else {

          innerList = `<div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/${icon[iii]}.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%">${name}</div>
                                <div class="td_1" style="width: 30%">${guild}</div>
                                <div class="td_1 rtl font-2"  style="width: 20%">${duration}</div>`;

        }

        list += `<div class="tr">
                            ${innerList}
                        </div>`;

      }

      var content = ` <div class="unit-with-rank">
                        
                                <div class="rank-list">

                                    <div class="inner_nav">
                                        ${WorldUnit.isArenaGuild(unitType) ?
          `<div class="td_1 font-2" style="width:30%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 30%">المدة</div>`
          :
          `<div class="td_1 font-2" style="width:20%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 30%">الملك</div>
                                            <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 20%">المدة</div>`

        }
                                    </div>
                                    ${list}
                                </div>
                            </div>`;


      $(".unit-with-rank").replaceWith(content);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

};

$(document).on("click", "#new-city-confirm button", function () {

  var city_new_name = $("#new-city-name").val();
  var xCoord = $(this).attr("data-x-coord");
  var yCoord = $(this).attr("data-y-coord");

  if (city_new_name.length < 1) {
    alert_box.confirmMessage("لا يمكنك ترك اسم المدينة خالى ");
    return;
  }

  alert_box.confirmDialog("تأكيد  بناء مدينة ", function () {

    var idCity = Elkaisar.CurrentCity.City.id_city;

    if (canBuildNewCity(xCoord, yCoord)) {

      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/AWorld/BuildNewCity`,
        data: {
          idCity: idCity,
          xCoord: xCoord,
          yCoord: yCoord,
          CityName: city_new_name,
          token: Elkaisar.Config.OuthToken,
          server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {

          if (!Elkaisar.LBase.isJson(data))
            return Elkaisar.LBase.Error(data);

          var json_data = JSON.parse(data);



          var json_data = JSON.parse(data);
          if (json_data.state === "error_0") {

          } else if (json_data.state === "error_1") {

          } else if (json_data.state === "error_2") {

          } else if (json_data.state === "ok") {

            if (json_data.City) {

              Elkaisar.DPlayer.City[json_data.City.id_city].City = json_data.City;
              Elkaisar.City.refreshBtnList();
              $(".close_RB img").click();
              $("#x_coord-input input").val(xCoord);
              $("#y_coord-input input").val(yCoord);
              $("#nav-btn button").click();


            } else {
              Elkaisar.LBase.Error("error add city");
            }


          } else {

            Elkaisar.LBase.Error(data);

          }



        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });


    } else {

      alert_box.failMessage("لا يمكنك  بناء مدينة جديدة");
      return;

    }

  });

});