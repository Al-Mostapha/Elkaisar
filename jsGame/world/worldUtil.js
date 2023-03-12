


var CURRENT_CURSOR_COORDS;
var GENERAL_TIMER;

var unitLvlPrize = [
  "هنا يمكنك  بناء مدينة لك ان كنت تمتلك ",
  "",
  "هنا يمكن الهجوم والحصول على صبغً",
  "هنا يمكن الهجوم والحصول على بهارات",
  "هنا يمكن الهجوم والحصول على نبيذ",
  "هنا يمكن الهجوم والحصول على  صوف",
  "هنا يمكن الهجوم والحصول على حرير",
  "هنا يمكن الهجوم والحصول على فرو",
  "هنا يمكن الهجوم والحصول على بخور",
  "هنا يمكن الهجوم والحصول على عاج",
  "هنا يمكن الهجوم والحصول على جواهر"
];

var allUniteType = {
  lake: {
    ar_title: "بحيرة",
    prod: "غذاء"
  },
  mountain: {
    ar_title: " جبال",
    prod: "حديد"
  },
  desert: {
    ar_title: "صحراء",
    prod: "صخور"
  },
  wood: {
    ar_title: "غابات",
    prod: "غذاء"
  },
  city: {
    ar_title: "مدينة",
    prod: ""
  },
  empty: {
    ar_title: "مكان خالى",
    prod: ""
  }


};





var TimeRest = {
  restEvery4: function () {
    var date = new Date();
    var currentHour = date.getUTCHours();
    var currentDay = date.getUTCDate();

    var restDate = new Date();
    restDate.setUTCMinutes(0);
    restDate.setUTCSeconds(2);

    if (currentHour >= 20) {
      restDate.setUTCDate(Number(currentDay) + 1);
      restDate.setUTCHours(0);

    } else if (currentHour >= 16) {
      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(20);
    } else if (currentHour >= 12) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(16);

    } else if (currentHour >= 8) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(12);

    } else if (currentHour >= 4) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(8);

    } else if (currentHour >= 0) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(4);

    }
    return restDate;
  },

  restEvery6: function () {
    var date = new Date();
    var currentHour = date.getUTCHours();
    var currentDay = date.getUTCDate();

    var restDate = new Date();
    restDate.setUTCMinutes(0);
    restDate.setUTCSeconds(2);

    if (currentHour >= 20) {

      restDate.setUTCDate(Number(currentDay) + 1);
      restDate.setUTCHours(0);

    } else if (currentHour >= 14) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(20);

    } else if (currentHour >= 8) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(14);

    } else if (currentHour >= 2) {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(8);

    }
    return restDate;
  },

  restEvery12: function () {

    var date = new Date();
    var currentHour = date.getUTCHours();
    var currentDay = date.getUTCDate();
    var restDate = new Date();
    restDate.setUTCMinutes(0);
    restDate.setUTCSeconds(0);

    if (currentHour >= 20) {

      restDate.setUTCDate(Number(currentDay) + 1);
      restDate.setUTCHours(8);

    } else {

      restDate.setUTCDate(currentDay);
      restDate.setUTCHours(20);

    }
    return restDate;
  }
};




function getUnitObj(type) {

  if (WorldUnit.isEmpty(type)) {
    return allUniteType.empty;
  } else if (WorldUnit.isRiver(type)) {
    return allUniteType.lake;
  } else if (WorldUnit.isMountain(type)) {
    return allUniteType.mountain;
  } else if (WorldUnit.isDesert(type)) {
    return allUniteType.desert;
  } else if (WorldUnit.isWood(type)) {
    return allUniteType.wood;
  }

}



var WorldUtil = {

  tooltipHeader: function (xCoord, yCoord) {
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
    if (Elkaisar.World.UnitTypeData[Unit.ut].lvlChange)
      return `${Elkaisar.World.UnitTypeData[Unit.ut].Title} مستوى ${Elkaisar.World.UnitTypeData[Unit.ut].maxLvl > 0 ? (Elkaisar.World.UnitTypeData[Unit.ut].maxLvl <= Unit.l ? "---" : Unit.l) : Unit.l}`
    else
      return `${Elkaisar.World.UnitTypeData[Unit.ut].Title}`;

  },
  getDesc: function (type, x_coord, y_coord) {

    if (WorldUnit.isBarrary(type)) {

      return unitLvlPrize[WorldUnit.getWorldUnit(x_coord, y_coord).l] === "" ? "" : unitLvlPrize[WorldUnit.getWorldUnit(x_coord, y_coord).l];

    } else if (WorldUnit.isCity(type)) {   // جبال صحراء و غابات

      WorldUtil.descForCity(x_coord, y_coord).done(function (data) {

        var tooltip = ` 
                                <div class="map-tooltip city-unit-tooltip">
                                    <div class="tt-header">
                                        <div class="coords">
                                            [ ${getArabicNumbers(y_coord)} ,  ${getArabicNumbers(x_coord)}]    <span class="distance">${getDistance(x_coord, y_coord)} ميل</span>
                                        </div>

                                    </div>
                                    <div class="tt-desc">
                                        <div class="tt-title friend">
                                            ${data.name}
                                        </div>
                                        <table>
                                            <tr>
                                                <td>الملك</td>
                                                <td class="friend">${data.p_name}</td>
                                            </tr>
                                            <tr>
                                                <td>الاتحاد</td>
                                                <td class="friend">${data.guild}</td>
                                            </tr>
                                            <tr>
                                                <td>البرستيج</td>
                                                <td>${getArabicNumbers(data.prestige)}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>`;

        /*if (Crafty("UnitToolTip").get().length === 0) {

            Crafty.e("HTML , UnitToolTip").append(tooltip).attr({x: x_coord * 64 - y_coord * 64 + 100, y: x_coord * 32 + y_coord * 32 + 100, z: 99999999999});

        } else {

            Crafty("UnitToolTip").get(0).replace(tooltip).attr({x: x_coord * 64 - y_coord * 64 + 100, y: x_coord * 32 + y_coord * 32 + 100, z: 999999999999});

        }*/


      });



    } else if (WorldUnit.isMonawrat(type)) { // مناورات

      return ` يمكنك الحصول على هدايا قيمة م مجلس الشيوخ مثل تسريع التديب ,خبز وايضا قلادات حمراء`;

    } else if (WorldUnit.isCamp(type)) { // معسكرات

      return `من هنا يتم الحصول على الشعارت لتبديلها مع مواد من صندوق المواد وايضا الحصول على معدات`;

    } else if (WorldUnit.isEmpty(type)) {

      return " يمكنك   بناء مدينة هنا";

    } else if (WorldUnit.isAsianSquads(type)) {
      return " مواد بناء وترقية , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات  المتمردة فى اسيا";
    } else if (WorldUnit.isGangStar(type)) {
      return "حزم جيوش , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات المتمردة";
    } else if (WorldUnit.isCarthagianArmies(type)) {
      return "حزم جيوش , رفاهيات, وهدايا قيمة يمكنك الحصول عليها من هذة المجموعات المتمردة";
    } else if (WorldUnit.isArmyCapital(type)) {
      return "حزم جيوش , موارد , خام,...ألخ  يمكن الحصول عليها من عاصمة الجيوش وذالك بسبب قوتها الجبارة";
    } else if (WorldUnit.isArena(type)) {
      return "لتحكم العالم عليك اثبات جدارتك اولا , تحدى الملوك و قم بالفوز...";
    } else if (WorldUnit.isQueenCity(type)) {
      return "تحدى الملكات بين الاحلاف لاثبات  الاجدر بينهم";
    } else if (WorldUnit.isRepelCastle(type)) {
      return "تحدى القلاع بين الاحلاف لاثبات  الاجدر بينهم";
    } else if (WorldUnit.isStatueWalf(type)) {
      return "نافس الذئاب فى وكرهم وسيكون من نصيبك جوائز قيمة";
    } else if (WorldUnit.isStatueWar(type)) {
      return "تمثال الحرب رمز للصمود فى العصور القديمة, اذا تمكنت من هدم الاسطورة سيكون من نصيبك جوائز قيمة";
    }


  },
  descForCity: function (x_coord, y_coord) {

    return $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/ACity/getDataByCoord`,
      data: {
        xCoord: x_coord,
        yCoord: y_coord,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      dataType: 'JSON'
    });

  },

  showMapTooltip: function (xCoord, yCoord) {
    return;
    var unit = WorldUnit.getWorldUnit(Elkaisar.World.Map.realCoord(xCoord), Elkaisar.World.Map.realCoord(yCoord));
    /* var desc = WorldUtil.getDesc(unit.ut, x_coord, y_coord);*/
    if (unit.ut == WUT_BUSY_UNIT)
      return;
    else if (WorldUnit.isEmpty(unit.ut))
      Elkaisar.World.WorldMapIcon.showWorldUnitIcons(xCoord, yCoord);
    else
      Elkaisar.World.WorldMapIcon.showWorldUnitIcons(xCoord, yCoord);

  }



};


function uniteMapClick(x_coord, y_coord) {
  var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
  var type = unit.ut;

  if (WorldUnit.isEmpty(type))
    Elkaisar.World.Map.OnEmptyUnitClick(unit);
  else if (WorldUnit.isBarrary(type))
    Elkaisar.World.Map.onBarrayClicked(unit);
  else if (WorldUnit['isSeaCity'](type)) {
    Elkaisar.World.Map.OnSeaCityClicked(unit);
  } else if (WorldUnit.isCity(type))
    Elkaisar.World.Map.OnCityClicked(unit);
  else
    Elkaisar.World.Map.OnOtherUnitClicked(unit);


  if (WorldUnit['isDominatable'](type))
    campDB.getDominaterName(x_coord, y_coord);
}




function canBuildNewCity(x_coord, y_coord) {
  var city_counts = Object.keys(Elkaisar.DPlayer.City).length;
  if (!WorldUnit.isEmpty(WorldUnit.getWorldUnit(x_coord, y_coord).ut)) {
    return false;
  } else if (Number(Elkaisar.CurrentCity.City.food) < Math.pow(10, city_counts + 3)) {
    return false;
  } else if (Number(Elkaisar.CurrentCity.City.wood) < Math.pow(10, city_counts + 3)) {
    return false;
  } else if (Number(Elkaisar.CurrentCity.City.stone) < Math.pow(10, city_counts + 3)) {
    return false;
  } else if (Number(Elkaisar.CurrentCity.City.metal) < Math.pow(10, city_counts + 3)) {
    return false;
  } else if (Number(Elkaisar.CurrentCity.City.coin) < Math.pow(10, city_counts + 3)) {
    return false;
  } else if (Number(Elkaisar.DPlayer.Player.porm) < city_counts * 2) {
    return false;
  }

  return true;

}


function getDistance(x, y) {
  var difX = Math.abs(Elkaisar.CurrentCity.City.x - x);
  var difY = Math.abs(Elkaisar.CurrentCity.City.y - y);
  console.log(difX, difY)
  if (difX > 249)
    difX -= 500;
  if (difY > 249)
    difY -= 500;
  console.log(difX, difY)
  return (Math.floor(Math.sqrt(Math.pow((difX), 2) + Math.pow((difY), 2))) * 6000);
}


var reviewBox = {

  getSmallBox: function (x_coord, y_coord, type, title, desc, lvl, state, snap_shoot) {


    var box = `<div id="unit_review" class="bg-general" x_coord = "${x_coord}" y_coord="${y_coord}" type="${type}" lvl="${lvl}">
                        <div class="header">
                            <div class="title banner-red">
                                 ${title}
                            </div>
                            <div class="close_RB">
                                <img src="images/btns/close_b.png"/>.
                            </div>
                        </div>
                        <div class="content">
                            <div class="left_cont">
                                <div class="unite_image">
                                    <div style="background-image:url(${snap_shoot})"></div>
                                </div>
                                <button class="battel-field" ${Number(state) === 0 ? " disabled" : ""} data-title="${title}">
                                    ارض المعركة
                                </button>
                            </div>
                             <div class="right_cont">
                                <div class="dist">
                                   <div class="coords" style="margin-right: 37px">
                                       <a href="#">[${y_coord} , ${x_coord}]</a>
                                   </div>
                                   <div class="mile">
                                        ${getDistance(x_coord, y_coord)} ميل
                                   </div>
                                   <div class="copy-coord-icon">
                                        <button class="copy-coord" data-x-coord="${x_coord}" data-y-coord="${y_coord}"></button>
                                    </div>
                                </div>
                                <div class="desc">
                                    <div class="province">${Translate.Text.Province[UserLag.language]}: ${Elkaisar.World.Province.getTitle(x_coord, y_coord)}</div>
                                   ${desc}
                                </div>
                                <div class="under-desc">
                                </div>
                                <div class="prize-list">
                                    <ul></ul>
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            ${this.footer(x_coord, y_coord)}
                        </div>
                    </div>`;
    return box;
  },

  descForBarray: function (type, lvl) {
    return ` <p>
                    زيادة انتاج ${getUnitObj(type).prod} بمقدار ${getArabicNumbers(3 * lvl)}% فى مديتك
               </p>`;
  },
  descForCity: function (JsonData) {



    var desc = `<div class="name bg-btn-blu">
                        <h1>
                            ${JsonData.PlayerName}
                        </h1>
                        <div class="msg_icon">
                            ${Number(JsonData.id_player) === Number(Elkaisar.DPlayer.Player.id_player) ? "" :
        `<img src="images/tech/message_icon.png" 
                                        id="mail-player-from-world" data-id-player="${JsonData.id_player}"
                                        data-player-name="${JsonData.PlayerName}"/>`}
                        </div>
                    </div>
                    <table class="player-table-data">
                        <tr>
                            <td>${getArabicNumbers(JsonData.prestige)}</td>
                            <td>البرستيج</td>
                        </tr>
                        <tr>
                            <td>${JsonData.GuildName}</td>
                            <td>الاتحاد</td>
                        </tr>
                        <tr>
                            <td>طبيعي</td>
                            <td>الحالة </td>
                        </tr>
                    </table>`;
    return desc;
  },
  footer: function (xCoord, yCoord) {

    var recource_supply = "";
    const Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
    for (var ii in Elkaisar.DPlayer.City) {

      var CCity = Elkaisar.DPlayer.City[ii];

      if (Number(CCity.City.x) != Number(xCoord))
        continue;
      if (Number(CCity.City.y) != Number(yCoord))
        continue;
      return ` <ul id="footer_bar">
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY}">
                            <img src="images/icons/war-icon/enter-city.png" /> 
                        </li>
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_HERO_TRANS}">
                            <img src="images/icons/war-icon/supply.png"/> 
                        </li>
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY}">
                            <img src="images/icons/war-icon/resource-supply.png"/> 
                        </li>
                    </ul>`;

    }

    if (WorldUnit.isCity(Unit.ut)) {

      recource_supply = ` <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY}">
                                        <img src="images/icons/war-icon/resource-supply.png"/> 
                                    </li>`;

    }

    if (Number(Unit.idGuild) === Number(Elkaisar.DPlayer.Player.id_guild) && !isNaN(Elkaisar.DPlayer.Player.id_guild)) {

      return `<ul id="footer_bar">
                        <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT}">
                            <img src="images/icons/war-icon/supply.png"/> 
                        </li>
                        ${recource_supply}
                    </ul>`;

    }


    return `<ul id="footer_bar">
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_CONQUER}">
                        <img src="images/icons/war-icon/attack.png" /> 
                    </li>
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE}">
                        <img src="images/icons/war-icon/dominate.png"/> 
                    </li>   
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY}">
                        <img src="images/icons/war-icon/spy.png"/> 
                    </li>
                    <li data-type="${Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT}">
                        <img src="images/icons/war-icon/supply.png"/> 
                    </li>
                    ${recource_supply}
                </ul>`;
  },

  battelField: function (x_coord, y_coord, title, unit_type) {

    var dialoge_box = `<div id="dialg_box_two" type="battel_field" style="top: 125px;" x_coord="${x_coord}" y_coord="${y_coord} data-unit-type="${unit_type}">
                                <div class="head_bar">
                                    <img src="images/style/head_bar.png">
                                    <div class="title">ارض المعركة</div>
                                </div>
                                <div class="nav_bar">
                                    <div class="right-nav">
                                        <div class="nav_icon">

                                            <img class="close_BF_dialog_box" src="images/btns/close_b.png">
                                        </div>
                                     </div>
                                        <div class="left-nav">
                                             <ul>
                                                <li head_title="battle">ارض المعركة</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="box_content for_report">

                                    <div class="left-content " id="reports_list_BF">
                                        <div class="th ellipsis">
                                            ${Translate.Title.TH.Subject[UserLag.language]}
                                        </div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                        <div class="tr"></div>
                                    </div>

                                    <div class="right-content ">
                                        <div class="rest-time">
                                            <h6> الوقت المتبقى: </h6>
                                            <span id="AJAX-REMAIN-TIME">
                                            </span>
                                        </div>
                                        <div class="report_state">
                                            <div class="defense-side">
                                                <div class="banner-red">
                                                    ${title}
                                                </div>
                                                <div class="image">

                                                    <img src="images/style/defense.png" class="big-img">
                                                    <div class="joined-num" id="AJAX-DEF-NUM"></div>
                                                </div>
                                                <div class="full-btn" id="JOIN_DEFENCE_SIDE">

                                                </div>
                                            </div>
                                            <div class="attack-side">
                                                <div class="banner-red" id="AFTER_AJAX_ATTACKER">

                                                </div>
                                                <div class="image">
                                                    <img src="images/style/attack.png" class="big-img">
                                                    <div class="joined-num" id="AJAX-ATK-NUM"></div>
                                                </div>
                                                <div class="full-btn" id="JOIN_ATTACK_SIDE">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="down_report">
                                            <div class="reload">
                                                <div class="full-btn ">
                                                    الاستخبارات
                                                </div>
                                                <div class="full-btn deactive">
                                                    تحديث المعركة 
                                                </div>
                                            </div>
                                            <div class="time_start">
                                                وقت البداء: 
                                                <span>٤٣&nbsp;ث&nbsp;٣٨&nbsp;د&nbsp;٥&nbsp;س&nbsp; </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>                
                            </div>`;


    $("body").append(dialoge_box);


  },

  refreshBattaelField: function () {

    var x_coord = parseInt($("#dialg_box_two").attr("x_coord"));
    var y_coord = parseInt($("#dialg_box_two").attr("y_coord"));
    var id_battel = $("#reports_list_BF .selected").attr("id_battel");

    if (!isNaN(x_coord) || !isNaN(y_coord)) {

      $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getBattelFieldData`,
        data: {
          xCoord: x_coord,
          yCoord: y_coord,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        cache: false,
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
          if(!Elkaisar.Base.isJson(data))
            return Elkaisar.Base.Error(data);
            
          var json_data = JSON.parse(data);
          var all_reportHeader = "";
          for (var iii = 0; iii < 14; iii++) {
            if (json_data[iii]) {
              all_reportHeader += `<div class="tr has_battel_BF ${json_data[iii].id_battel === id_battel || (id_battel === undefined && iii === 0) ? "selected" : ""}"  id_battel="${json_data[iii].id_battel}"  >
                                    قام الملك ${json_data[iii].player_name} بانشاء  معركة    من المدينة  ${json_data[iii].city_name}
                                  </div>`;
            } else {
              all_reportHeader += `<div class="tr"> </div>`;
            }
          }
          $("#reports_list_BF").html(`<div class="th ellipsis">${Translate.Title.TH.Subject[UserLag.language]}</div>` + all_reportHeader);
          reviewBox.refreshBattelDetail();
        },
        error: function (jqXHR, textStatus, errorThrown) {}
      });

    }

  },

  refreshBattelDetail: function () {

    var id_battel = false;

    $("#reports_list .tr , #reports_list_BF .tr").each(function () {

      if ($(this).hasClass("selected")) {

        id_battel = parseInt($(this).attr("id_battel"));

      }

    });

    if (!id_battel) {

      id_battel = parseInt($("#reports_list .tr:first").attr("id_battel")) ||
        parseInt($("#reports_list_BF .tr:first").attr("id_battel")) ||
        false;
    }

    if (!id_battel) {
      return;
    }

    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getBattelFieldDetail`,
      data: {
        idBattel: id_battel,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      cache: false,
      beforeSend: function (xhr) {},
      success: function (data, textStatus, jqXHR) {
        if(!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var json_data = JSON.parse(data);
        $("#AJAX-DEF-NUM").html(getArabicNumbers(json_data.defenceNum));
        $("#AJAX-ATK-NUM").html(getArabicNumbers(json_data.attackNum));
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });

  },
  firstClikBattelData: function (id_battel, x_coord, y_coord) {

    if (id_battel === false) {

      $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getBattelFixedData`,
        data: {
          xCoord: x_coord,
          xCoord: y_coord,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

          /*{"time_end":"1549995750","time_start":"1539888070","name":"MuStapha"}*/
          var json_data = JSON.parse(data);

          $("#AFTER_AJAX_ATTACKER").html(json_data.name);
          $("#AJAX-REMAIN-TIME").addClass("time_counter");
          $("#AJAX-REMAIN-TIME").attr("time-end", json_data.time_end);
          $("#JOIN_ATTACK_SIDE").html("انضمام للهجوم");
          $("#JOIN_DEFENCE_SIDE").html("انضمام للدفاع");
          $("#JOIN_ATTACK_SIDE").attr("data-id-battel", json_data.id_battel);
          $("#JOIN_DEFENCE_SIDE").attr("data-id-battel", json_data.id_battel);

          $("#JOIN_ATTACK_SIDE").attr("data-x_coord", x_coord);
          $("#JOIN_ATTACK_SIDE").attr("data-y_coord", y_coord);
          $("#JOIN_DEFENCE_SIDE").attr("data-x_coord", x_coord);
          $("#JOIN_DEFENCE_SIDE").attr("data-y_coord", y_coord);

          $("#JOIN_ATTACK_SIDE").attr("data-title", $.trim($(".attack-side .banner-red").html()));
          $("#JOIN_DEFENCE_SIDE").attr("data-title", $.trim($(".defense-side .banner-red").html()));



        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

      });

    } else {

      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getBattelFixedData`,
        data: {
          idBattel: id_battel,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

          if (!isJson(data)) {
            Elkaisar.LBase.Error(data);
            return;
          }
          var json_data = JSON.parse(data);

          $("#AFTER_AJAX_ATTACKER").html(json_data.name);
          $("#AJAX-REMAIN-TIME").addClass("time_counter");
          $("#AJAX-REMAIN-TIME").attr("time-end", json_data.time_end);
          $("#JOIN_ATTACK_SIDE").html("انضمام للهجوم");
          $("#JOIN_DEFENCE_SIDE").html("انضمام للدفاع");
          $("#JOIN_ATTACK_SIDE").attr("data-id-battel", json_data.id_battel);
          $("#JOIN_DEFENCE_SIDE").attr("data-id-battel", json_data.id_battel);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

      });

    }


  }
};



$(document).on("click", ".close_RB img", function () {
  $("#unit_review").remove();
});



$(document)['on']('click', '#smallMap-icon img', function () {
  var CityIcons = '';
  for (var idCity in Elkaisar.DPlayer['City']) {
    CityIcons += `<lable type="18" style="background-image: url(images/world/map-icon/myCity.png); width:20px; height:20px; left: ${Elkaisar.DPlayer.City[idCity].City.x}px; top: ${Elkaisar.DPlayer.City[idCity].City.y}px"></lable>'`;
  }
  var Map = `'<div id="smallMap">
                        <img src="images/world/smallMap.jpg"/>
                        <div id="smallMap_close">
                            <img src="images/btns/close_b.png"/>
                        </div>
                        <div class="overMap">
                            <div id="CURRENT_CURSOR_COORDS"></div>
                            <lable type="${WUT_CAMP_ASIANA}" style="background-image: url(images/world/ratterCastle.png); left: 78px; top: 300px"></lable>
                            <lable type="${WUT_CAMP_BRITONS}" style="background-image: url(images/world/ratterCastle.png); left: 88px; top: 444px"></lable>
                            <lable type="${WUT_CAMP_CARTHAGE}" style="background-image: url(images/world/ratterCastle.png); left: 106px;top: 19px"></lable>
                            <lable type="${WUT_CAMP_EGYPT}" style="background-image: url(images/world/ratterCastle.png); left: 136px;top: 160px"></lable>
                            <lable type="${WUT_CAMP_GAULS}" style="background-image: url(images/world/ratterCastle.png); left: 246px;top: 111px"></lable>
                            <lable type="${WUT_CAMP_HISPANIA}" style="background-image: url(images/world/ratterCastle.png); left: 266px;top: 245px"></lable>
                            <lable type="${WUT_CAMP_ITALIA}" style="background-image: url(images/world/ratterCastle.png); left: 316px;top: 450px"></lable>
                            <lable type="${WUT_CAMP_MACEDON}" style="background-image: url(images/world/ratterCastle.png); left: 392px;top: 213px"></lable>
                            <lable type="${WUT_CAMP_PARTHIA}" style="background-image: url(images/world/ratterCastle.png); left: 407px;top: 66px"></lable>
                            <lable type="${WUT_CAMP_REICH}" style="background-image: url(images/world/ratterCastle.png); left: 427px;top: 337px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 20px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 60px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 100px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 140px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 180px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 220px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 260px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 300px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 300px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 340px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 380px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 420px;top: 470px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 100px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 230px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 460px;top: 390px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 30px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 170px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 310px"></lable>
                            <lable type="${WUT_MONAWRAT}" style="background-image: url(images/world/npcCastle.png); left: 490px;top: 470px"></lable>
   
    
    
    
    

    
    
                            <lable type="${WUT_FRONT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 464px;top:  93px"></lable>
                            <lable type="${WUT_FRONT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 463px;top:  86px"></lable>
                            <lable type="${WUT_FRONT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 447px;top:  72px"></lable>
                            <lable type="${WUT_FRONT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 450px;top:  69px"></lable>
                            <lable type="${WUT_FRONT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 432px;top:  52px"></lable>
                            <lable type="${WUT_FRONT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 434px;top:  56px"></lable>
                            <lable type="${WUT_FRONT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 417px;top:  39px"></lable>
                            <lable type="${WUT_FRONT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 412px;top:  37px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 470px;top:  76px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 473px;top:  72px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 458px;top:  62px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 456px;top:  58px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 445px;top:  48px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 442px;top:  47px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 427px;top:  33px"></lable>
                            <lable type="${WUT_ARMY_LIGHT_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 431px;top:  30px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 475px;top:  57px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 479px;top:  60px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 467px;top:  47px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 465px;top:  49px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 453px;top:  37px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 457px;top:  36px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 446px;top:  28px"></lable>
                            <lable type="${WUT_ARMY_HEAVY_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 441px;top:  23px"></lable>
                            <lable type="${WUT_GUARD_SQUAD}" style="background-image: url(images/world/map-icon/dr.png); left: 480px;top:  42px"></lable>
                            <lable type="${WUT_GUARD_BAND}" style="background-image: url(images/world/map-icon/dr.png); left: 475px;top:  35px"></lable>
                            <lable type="${WUT_GUARD_SQUADRON}" style="background-image: url(images/world/map-icon/dr.png); left: 464px;top:  26px"></lable>
                            <lable type="${WUT_GUARD_DIVISION}" style="background-image: url(images/world/map-icon/dr.png); left: 458px;top:  20px"></lable>
                            <lable type="${WUT_BRAVE_THUNDER}" style="background-image: url(images/world/map-icon/dr.png); left: 478px;top:  21px"></lable>
 
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 44px;top:  465px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 353px;top:  233px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 284px;top:  141px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 281px;top:  299px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 264px;top:  458px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 367px;top:  87px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 122px;top:  154px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 74px; top:  33px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 74px; top:  326px"></lable>
                            <lable type="49" style="background-image: url(images/world/map-icon/p33.png); left: 472px;top:  379px"></lable>
    
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 363px;top: 76px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 354px;top: 233px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 59px;top:  456px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 467px;top: 370px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 282px;top: 297px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 77px;top:  33px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 262px;top: 459px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 261px;top: 137px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 136px;top: 158px"></lable>
                            <lable type="50" style="background-image: url(images/world/map-icon/p33.png); left: 75px;top:  325px"></lable>
    
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 474px;top:  378px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 135px;top:  157px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 352px;top:  237px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 286px;top:  296px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 259px;top:  136px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 286px;top:  296px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 135px;top:  157px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 259px;top:  136px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 260px;top:  458px"></lable>
                            <lable type="51" style="background-image: url(images/world/map-icon/p33.png); left: 474px;top:  378px"></lable>
    
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 66px; top:  470px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 220px;top:  463px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 187px;top:  493px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 133px;top:  410px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 58px; top:  452px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 136px;top:  450px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 50px; top:  433px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 150px;top:  433px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 44px; top:  472px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 159px;top:  408px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 32px; top:  495px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 28px; top:  489px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 24px; top:  429px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 11px; top:  400px"></lable>
                            <lable type="52" style="background-image: url(images/world/map-icon/p33.png); left: 79px; top:  490px"></lable>
    
    
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 1px;   top:  380px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 16px;  top:  380px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 47px;  top:  486px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 57px;  top:  410px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 64px;  top:  470px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 73px;  top:  483px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 81px;  top:  425px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 86px;  top:  429px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 104px; top:  469px"></lable>
                            <lable type="53" style="background-image: url(images/world/map-icon/p33.png); left: 109px; top:  440px"></lable>
    
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 40px;  top:  412px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 67px;  top:  395px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 80px;  top:  469px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 83px;  top:  418px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 85px;  top:  428px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 85px;  top:  461px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 95px;  top:  418px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 99px;  top:  392px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 120px; top:  450px"></lable>
                            <lable type="54" style="background-image: url(images/world/map-icon/p33.png); left: 132px; top:  448px"></lable>
    
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 80px;  top:  460px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 88px;  top:  448px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 90px;  top:  476px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 94px;  top:  463px"></lable>
                            <lable type="55" style="background-image: url(images/world/map-icon/p33.png); left: 104px; top:  483px"></lable>
    
                            <lable type="56" style="background-image: url(images/world/map-icon/p33.png); left: 103px; top:  447px"></lable>
                            
                            <lable type="100" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 235px; top:  125px"></lable>
                            <lable type="101" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 140px; top:  170px"></lable>
                            <lable type="102" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 400px; top:  230px"></lable>
                            <lable type="103" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 255px; top:  266px"></lable>
                            <lable type="104" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 80px;  top:  280px"></lable>
                            <lable type="105" style="background-image: url(images/world/map-icon/army-capital.png); width:15px; height:15px; left: 400px; top:  340px"></lable>
    
                            <lable type="${WUT_SEA_CITY_1}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 36px; top:  77px"></lable>
                            <lable type="${WUT_SEA_CITY_2}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 53px; top:  147px"></lable>
                            <lable type="${WUT_SEA_CITY_3}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 20px; top:  357px"></lable>
                            <lable type="${WUT_SEA_CITY_4}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 146px; top:  396px"></lable>
                            <lable type="${WUT_SEA_CITY_5}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 336px;  top:  356px"></lable>
                            <lable type="${WUT_SEA_CITY_6}" style="background-image: url(images/world/seaCity_1.png); width:15px; height:15px; left: 493px; top:  287px"></lable>
                            
                            
                            <lable type="125" style="background-image: url(images/world/map-icon/arena.png); width:15px; height:15px; left: 249px; top:  247px"></lable>
    
                            <lable type="130" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:  100px"></lable>
                            <lable type="131" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:   90px"></lable>
                            <lable type="132" style="background-image: url(images/world/map-icon/matchNpc.png); left: 300px; top:   80px"></lable>
                            <lable type="134" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:  100px"></lable>
                            <lable type="135" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:   90px"></lable>
                            <lable type="136" style="background-image: url(images/world/map-icon/occupy.png); left: 280px; top:   80px"></lable>
    
                            <lable type="150" style="background-image: url(images/world/map-icon/npcBlue.png); left: 320px; top:  410px"></lable>
                            <lable type="151" style="background-image: url(images/world/map-icon/npcBlue.png); left: 330px; top:   410px"></lable>
                            <lable type="152" style="background-image: url(images/world/map-icon/npcBlue.png); left: 340px; top:   410px"></lable>
                            <lable type="153" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 320px; top:  420px"></lable>
                            <lable type="154" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 330px; top:   420px"></lable>
                            <lable type="155" style="background-image: url(images/world/map-icon/ratterCastle1.png); left: 340px; top:   420px"></lable>
    
                            
                            ${CityIcons}
                            
                        </div>
                    </div>`;
  if ($('#smallMap')['length'] > 0x0) {
  } else
    $('body')['append'](Map);
  CURRENT_CURSOR_COORDS = $('#CURRENT_CURSOR_COORDS');
});




$(document).on("mouseover", ".overMap lable", function () {

  var type = parseInt($(this).attr("type"));
  var x_coord = parseInt($(this).css("left").replace("px", ""));
  var y_coord = parseInt($(this).css("top").replace("px", ""));


  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AWorld/refreshWorldUnitLvl`,
    type: 'GET',
    data: {
      xCoord: x_coord,
      yCoord: y_coord,
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken
    },
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonObject = JSON.parse(data);

      WorldUnit.getWorldUnit(x_coord, y_coord).l = JsonObject.l;

      var tooltip = `<div class="map-tooltip" style="left:${x_coord + 15}px; top: ${y_coord + 15}px">
                                    <div class="tt-header">
                                        <div class="coords">
                                           [ ${getArabicNumbers(y_coord) /*هى المفروض بالعكس بس العربى بيعكس يعنى الى بيظهر هنا هو الاكس*/} , ${getArabicNumbers(x_coord)}]  
                                        </div>
                                    </div>
                                    <div class="tt-title">
                                           ${WorldUtil.tooltipHeader(x_coord, y_coord)}
                                    </div>
                                    <div class="tt-desc">
                                        ${WorldUtil.getDesc(WorldUnit.getWorldUnit(x_coord, y_coord).ut, x_coord, y_coord)}
                                    </div>
                                </div>`;
      $(".map-tooltip").remove();
      $(".overMap").append(tooltip);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
});

$(document).on("mouseout", ".overMap lable", function () {
  $(".map-tooltip").remove();
});
$(document).on("click", "#smallMap_close img", function () {
  $("#smallMap").remove();
});
$(document).on("mouseleave", "#cr-stage canvas", function () {
  Crafty("UnitToolTip").each(function () {
    this.destroy()
  });
});





/*
 * عشان اهجم على المعسكرات والمناورات
 */
$(document).on("click", "#START_ATTACK", function () {

  var x_coord = parseInt($(this).attr("data-x-coord"));
  var y_coord = parseInt($(this).attr("data-y-coord"));
  var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
  var type = Unit.ut;
  var lvl = Unit.l;

  var battel = {
    x_coord: x_coord,
    y_coord: y_coord,
    ar_title: Elkaisar.World.UnitTypeData[type].Title,
    task: BATTEL_TYPES_CONST.ATTACK,
    task_title: "هجوم",
    time: calAttakTime(),
    type: type
  };

  var hero_object;

  for (var iii in Elkaisar.DPlayer.Heros) {
    if (Elkaisar.DPlayer.Heros[iii].Hero.id_city != Elkaisar.CurrentCity.City.id_city)
      continue;
    if (Elkaisar.DPlayer.Heros[iii].Hero.in_city == 1 && Elkaisar.DPlayer.Heros[iii].Hero.console == 0) {
      Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
      army.getCurrentArmy(Elkaisar.CurrentHero);
      break;
    }
  }



  $("#dialg_box").remove();

  var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel);
  var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language], NavBar.Hero, content);
  if ($("#dialg_box").length > 0) {
    $("#dialg_box").animate({ top: "-800px" }, 200, "linear", function () {
      $(this).remove();
      $("body").append(dialog_box);
      $("#dialg_box").attr("type", "hero");
      $("#dialg_box").animate({ top: "150px" }, 200);
      $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
    });
  } else {
    $("body").append(dialog_box);

    $("#dialg_box").attr("type", "hero");
    $("#dialg_box").animate({ top: "150px" }, 200);
    $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
  }

  $(".left-nav ul li").each(function () {
    if ($(this).attr("head_title") === "camp") {
      $(this).addClass("selected");
    }
  });


});



$(document).on("click", ".battel-field", function () {

  var title = $(this).attr("data-title");
  var x_coord = parseInt($("#unit_review").attr("x_coord"));
  var y_coord = parseInt($("#unit_review").attr("y_coord"));
  var unite_type = parseInt($("#unit_review").attr("type"));

  $("#unit_review").remove();

  BattelField.battelField({ x_coord: x_coord, y_coord: y_coord, unite_type: unite_type, navBar: BattelFieldNavBar, totalBox: true });

  /*
   reviewBox.battelField(x_coord , y_coord , title , unite_type);
   reviewBox.refreshBattaelField();
   reviewBox.firstClikBattelData(false , x_coord , y_coord);
   
   
   
   
   GENERAL_TIMER = setInterval(function (){
   
   reviewBox.refreshBattaelField();
   
   } , 1000);
   */
});

$(document).on("click", ".close_BF_dialog_box", function () {

  $("#dialg_box_two").remove();
  clearInterval(GENERAL_TIMER);

});



/*   msg fromsmall  box    */
$(document).on("click", "#mail-player-from-world", function () {

  //<img src="images/tech/message_icon.png"  id="mail-player-from-world" data-id-player="${WorldCurrentUnit.__id_player}" data-player-name="${WorldCurrentUnit.__player_name}"/>

  var player_name = $(this).attr("data-player-name");
  var player_id = $(this).attr(" data-id-player");

  $(".close_RB img").trigger("click");
  var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Mail[UserLag.language], msg_nav_bar, message.dialogBoxcontent_msgWrite({ name: player_name, id: player_id }), 0);
  dialogBoxShow(dialog_box);

});



function addRemainBarryData(xCoord, yCoord) {
  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AWorld/getBarrayConolizer`,
    data: {
      xCoord: xCoord,
      yCoord: yCoord,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'GET',
    beforeSend: function (xhr) {
      $("#unit_review .prize-list ul").html(WorldUnit.prize.prizeList(xCoord, yCoord));
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      const JsonObject = JSON.parse(data);
      if (JsonObject.length == 0)
        return;

      var under_desc = `  <ul>
                                    <li> 
                                        <label>المدينة :</label>
                                        <span>${JsonObject[0].CityName}</span>
                                    </li>
                                    <li> 
                                        <label>الاحداثيات :</label>
                                        <span>${JsonObject[0].x} , ${JsonObject[0].y}</span>
                                    </li>
                                    <li> 
                                        <label>الملك :</label>
                                        <span>${JsonObject[0].PlayerName}</span>
                                    </li>
                                    <li> 
                                        <label>${Translate.Button.Chat.League[UserLag.language]} : </label>
                                        <span>${JsonObject[0].GuildName}</span>
                                    </li>
                                </ul>`;
      $("#unit_review .under-desc").html(under_desc);
      $("#unit_review .prize-list ul").html("");
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });



}