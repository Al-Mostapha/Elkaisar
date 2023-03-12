var army_icon = {
  "0": "",
  "1": '<img src="images/tech/soldier_1.jpg"/>',
  "2": '<img src="images/tech/soldier_2.jpg"/>',
  "3": '<img src="images/tech/soldier_3.jpg"/>',
  "4": '<img src="images/tech/soldier_4.jpg"/>',
  "5": '<img src="images/tech/soldier_5.jpg"/>',
  "6": '<img src="images/tech/soldier_6.jpg"/>',
  "10": '<img src="images/tech/defense01.jpg"/>',
  "11": '<img src="images/tech/defense02.jpg"/>',
  "12": '<img src="images/tech/defense03.jpg"/>'
};


const BATTEL_TYPES_CONST = {
  ATTACK: 0,
  DOMINATE: 1,
  JOIN_ATTACK: 2,
  JOIN_DEFENCE: 3,
  SPY: 4,
  SUPPLY: 5,
  GARRISON: 6,
  resourceSupply: 7,
  enterCity: 8

};

speeds = [
  100, //البطل  فاضى
  300, //مشاة
  900, //فرسان
  600, //مدرعين
  250, //رماة
  150, //مقاليع
  100 //منجنيق
];

const BATTEL_JOIN_ATTACK = 2;
const BATTEL_JOIN_DEFENCE = 3;


Elkaisar.World.WorldMapIcon.Clicked = function (xCoord, yCoord, BattelTask) {

  var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

  if (Number(BattelTask) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY) {

    buildingClick("market");
    $(".nav_bar .left-nav li[head_title=transport_resources]").click();
    $("#transport-distin input[data-coord=x]").val(xCoord);
    $("#transport-distin input[data-coord=y]").val(yCoord);
    $(".close_RB img").trigger("click");

    return;
  }
  /*
   if (Number(Elkaisar.DPlayer.PlayerState.peace) - 12 * 60 * 60 > ($.now() / 1000)) {
   alert_box.failMessage("لا  يمكنك الهجوم و انت  فى حالة هدنة");
   return;
   } else if (world_unit.__peace && world_unit.__peace > $.now() / 1000) {
   alert_box.succesMessage("لا يمكنك الهجوم على هذه المدينة  </br> ( ملك المدينة قام بتفعيل هدنة)");
   
   return;
   }
   */

  if (Number(BattelTask) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY) {

    SPY.sendSpy(xCoord, yCoord);

    return;

  } else if (Number(BattelTask) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY) {

    $("#WorldCity").trigger("click");
    $(".close_RB img").trigger("click");

    return;

  }

  // get hero id 
  var hero_object;

  for (var iii in Elkaisar.DPlayer.Heros) {
    if (Elkaisar.DPlayer.Heros[iii].Hero.id_city != Elkaisar.CurrentCity.City.id_city)
      continue;
    if (Elkaisar.DPlayer.Heros[iii].Hero.in_city != Elkaisar.Hero.HeroState.HERO_IN_CITY)
      continue;
    if (Elkaisar.Hero.isConsole(Elkaisar.DPlayer.Heros[iii].Hero.id_hero))
      continue;
    Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
    break;
  }

  if (typeof Elkaisar.CurrentHero !== "object" || !Elkaisar.CurrentHero.Hero) {

    if (!cityHasType(BUILDING_TYPS.THEATER)) {
      alert_box.confirmMessage("لا يوجد ابطال او مسارح لتجنيد ابطال داخل المدينة");
      return;
    }

    buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
    return;

  }

  var battel = {
    x_coord: xCoord,
    y_coord: yCoord,
    ar_title: WorldUtil.tooltipHeader(xCoord, yCoord),
    task: BattelTask,
    task_title: "غزو",
    time: 60,
    type: Unit.ut,
    lvl: Unit.l
  };

  var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel);
  var dialog_box = army.dialogBox("الابطال", NavBar.Hero, content);


  dialogBoxShow(dialog_box, function () {
    army.getCurrentArmy(Elkaisar.CurrentHero);
    getHeroEquip(Elkaisar.CurrentHero.Hero.id_hero);
    $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
  });

  /*     HEILIGHT   THE CAMP TAB */
  $(".left-nav ul li").each(function () {
    if ($(this).attr("head_title") === "camp") {
      $(this).addClass("selected");
    }
  });

  // close  samll box
  $(".close_RB img").trigger("click");

};

$(document).on("click", "#footer_bar li", function () {

  var xCoord = parseInt($("#unit_review").attr("x_coord"));
  var yCoord = parseInt($("#unit_review").attr("y_coord"));
  var BattelTask = $(this).attr("data-type");

  Elkaisar.World.WorldMapIcon.Clicked(xCoord, yCoord, BattelTask);



});



function getUnitTitle(type) {
  if (Elkaisar.World.UnitTypeData[type])
    return Elkaisar.World.UnitTypeData[type].Title;
  return "---";
}


//                              START BATTEL BUTTON
$(document).on("click", "#start_battel", function () {

  if (battel_data.x_coord === null || battel_data.y_coord == null) {

    $("body").append(alert_box.confirmMessage("برجاء اختيار واجهة الهجوم"));
    return;

  }

  if (Number(Elkaisar.CurrentHero.Hero.power) < Hero.getPowerRequired(battel_data.x_coord, battel_data.y_coord)) {
    alert_box.confirmMessage("لا توجد لياقة بدنية كافية للبطل");
    return;
  }

  if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero))
    return alert_box.confirmMessage("لا يمكنك ارسال البطل الى المعركة وهو فى مهمة ");



  $(this).attr("disabled", "disabled");
  var coords = `[${getArabicNumbers(battel_data.x_coord)},${getArabicNumbers(battel_data.y_coord)}]`;
  var task = `تاكيد ${BATTAL_TASKS[battel_data.task].ar_title} ${battel_data.ar_title}`;
  alert_box.confirmDialog(`${task}</br> ${coords}`, function () {

    battelStart();
    $(this).removeAttr("disabled");
  });

});

function isMyBarr(_0x22de03, _0x4dcc19) {
  var _0x46bfff, _0x179d13;
  for (var _0x4d186f in Elkaisar.DPlayer['City']) {
    _0x46bfff = Elkaisar.DPlayer['City'][_0x4d186f];
    for (var _0x215ce1 in _0x46bfff['Barray']) {
      if (_0x46bfff['Barray'][_0x215ce1]['x_coord'] == _0x22de03 && _0x46bfff['Barray'][_0x215ce1]['y_coord'] == _0x4dcc19)
        return !![];
    }
  }
  return ![];
}


function battelStart() {

  if (Number(Elkaisar.CurrentHero.Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
    $('.close-alert').click();
    alert_box.failMessage('لا يمكنك ارسال بطل الى بعثة و هو فى ليس داخل المدينة');
    return;
  }
  if (Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(Elkaisar['CurrentCity']['City']['console'])) {
    $('.close-alert').click();
    alert_box['failMessage']('لا يمكنك ارسال بطل الى بعثة و هو قنصل');
    return;
  }
  var _0x2d501c = WorldUnit['getWorldUnit'](battel_data['x_coord'], battel_data['y_coord']);
  if (!Elkaisar['World']['UnitData']['isPromLvlOk'](_0x2d501c['ut'])) {
    alert_box['failMessage']('لا يمكنك الهجو..م تحقق من توافق الشروط');
    return;
  }
  var _0x2a0e73 = 0x0,
    idCity = Number(Elkaisar.CurrentHero.Hero.id_city);
  for (var heroIndex in Elkaisar.DPlayer.Heros) {
    if (Number(Elkaisar.DPlayer.Heros[heroIndex].Hero.id_city) !== idCity)
      continue;
    Number(Elkaisar.DPlayer.Heros[heroIndex].Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY && _0x2a0e73++;
  }
  var _0x24c850 = cityHasType(BUILDING_TYPS['HOSPITAL']);
  if (!_0x24c850) {
    $('.close-alert')['click'](), alert_box['failMessage']('لا يمكنك ارسال بعثات خارج المدينة حيث لا يوجد بلازا داخل المدينة');
    return;
  }
  var _0x63b21d = Math['min'](Number(Elkaisar['City']['getCity']()['BuildingLvl'][_0x24c850]), 0x14);
  if (_0x2a0e73 >= _0x63b21d) {
    $('.close-alert')['click'](), alert_box['failMessage']('وصل عدد الابطال بالخارج الى الحد الاقصى لا يمكنك ارسال قوات اخرى</br> (يمكنك الانتظار حتى عودة الابطال من الخارج)');
    return;
  }
  if (!Battel['isAttackable'](Elkaisar['CurrentHero']['Hero']['id_hero'], _0x2d501c['ut'])) {
    alert_box['failMessage']('لا يمكنك الهجوم بالبطل الحالى! ');
    return;
  }
  if (Number(battel_data['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SUPPORT']) {
    Battel['millertySupply'](battel_data['x_coord'], battel_data['y_coord']);
    Elkaisar['CurrentHero']['Hero']['in_city'] = 0;
    city_profile['refresh_hero_view']();
    return;
  }
  if (isMyBarr(_0x2d501c['x'], _0x2d501c['y'])) {
    alert_box['failMessage']('لا يمكنك الهجوم على البرارى الخاصة بك');
    return;
  }
  if (Number(battel_data['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_ATT'] || Number(battel_data['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_JOIN_DEF']) {
    if (!Battel['checkJoinReq'](battel_data['x_coord'], battel_data['y_coord'])) {
      alert_box['failMessage']('لا يوجد لديك مواد كافية للانضمام');
      return;
    }
    $.ajax({
      'url': `${Elkaisar.Config.NodeUrl}/api/ABattel/joinBattel`,
      'data': {
        'idBattel': battel_data['id_battel'],
        'idHero': Elkaisar.CurrentHero.Hero.id_hero,
        'side': battel_data['side'],
        'token': Elkaisar.Config.OuthToken,
        'server': Elkaisar.Config.idServer
      },
      'type': 'POST',
      'success': function (data, _0x4f103d, _0x3e9120) {
        if (isJson(data))
          var JsonObject = JSON['parse'](data);
        else
          Elkaisar.LBase.Error(data);
        if (JsonObject['state'] === 'ok') {
          $('.close_dialog')['trigger']('click');
          Elkaisar['CurrentHero']['Hero']['in_city'] = 0x0;
          $('.close-alert')['trigger']('click');
          battel_data['type'] = JsonObject['unit_type'];
          battel_data['lvl'] = JsonObject['unit_lvl'];
          Hero['heroAttackProc']();
          Elkaisar.DPlayer.Notif['hero_in_battel'] = Number(Elkaisar.DPlayer.Notif['hero_in_battel']) + 0x1, city_profile['refresh_hero_view']();
          var Battel = JsonObject['Battel'];

          var found = false;
          for (var iii in Elkaisar['Battel']['Battels']) {
            if (Number(Elkaisar['Battel']['Battels'][iii]['id_battel']) === Number(battel_data['id_battel'])) {
              found = true;
              Elkaisar['Battel']['Battels'][iii] = Battel;
            }
            ;
          }

          if (!found) {
            Elkaisar.DPlayer.Notif['battel_number'] = Number(Elkaisar.DPlayer.Notif['battel_number']) + 0x1;
            if (!Elkaisar['Battel']['Battels']) {
              Elkaisar['Battel']['Battels'] = [];
            }
            Elkaisar['Battel']['Battels']['push'](Battel);
            Fixed['refreshPlayerNotif']();
            Battel['afterJoin'](battel_data['x_coord'], battel_data['y_coord'])
          }
        } else if (JsonObject['state'] === 'error_1') {
          alert_box['confirmMessage']('البطل ليس فى المدينة');
        } else if (JsonObject['state'] === 'error_2') {
          alert_box['confirmMessage']('انتهت المعركة لا يمكنك الانضمام');
        } else if (JsonObject['state'] === 'error_3') {
          alert_box['confirmMessage']('لا يمكنك الانضمام للدفاع </br> (وصل عدد المنضمين الى الحد الاقصى)');
        } else if (JsonObject['state'] === 'error_5') {
          alert_box['confirmMessage']('لا يمكنك الدفاع ضد هذا الحلف');
        } else if (JsonObject.state == "error_6") {
          alert_box['confirmMessage'](`متطلبات الإنضمام غير مكتملة`);
        } else if (JsonObject.state == "error_7") {
          alert_box['confirmMessage'](`البطل ليس لدية لياقة كافية`);
        } else if (JsonObject.state == "error_9") {
          alert_box['confirmMessage'](`وصل عدد الأبطال بالخارج للحد الأقصى`);
        } else if (JsonObject.state == "error_8_1") {
          alert_box['confirmMessage'](`لا يمكنك الإنضمام`);
        } else if (JsonObject.state == "error_8_2") {
          alert_box['confirmMessage'](`لا يمكنك الإنضمام`);
        }
      },
      'error': function (_0x9c1e15, _0x370e1e, _0x58f5ad) { }
    });
  } else {
    if (Number(battel_data['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SUPPORT'])
      Elkaisar.Battel.supportByHero();
    else
      Number(battel_data['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_HERO_TRANS'] ? Elkaisar['Battel']['TransHero']() : ws['send'](JSON['stringify']({
        'url': 'Battel/start',
        'data': {
          'xCoord': battel_data['x_coord'],
          'yCoord': battel_data['y_coord'],
          'idHero': Elkaisar['CurrentHero']['Hero']['id_hero'],
          'attackTask': battel_data['task']
        }
      }));
  }
}



function getReportTitle(type, lvl, x_coord, y_coord) {

  var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
  if (WorldUnit.isArmyCapital(Unit.ut) || WorldUnit.isArena(Unit.ut)) {
    return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord)} ,${getArabicNumbers(x_coord)}] `;
  } else {
    return `تقرير المعركة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${getArabicNumbers(y_coord)} ,${getArabicNumbers(x_coord)}] مستوى ${lvl}`;
  }

}
function getSpyReportTitle(type, lvl, x_coord, y_coord) {
  var Unit = WorldUnit.getWorldUnit(x_coord, y_coord);
  return `تقرير التجسس على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} [${(y_coord)} ,${(x_coord)}] مستوى ${(lvl)}`;
}

$(document).on("click", ".battel-con", function () {
  $("#confirm_battel").trigger("click");
});



var Back_heros = new Array();

function playerBattels() {

  return $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getBattels`,
    data: {
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'GET',
    success: function (data, textStatus, jqXHR) {


      Elkaisar.Battel.Battels = JSON.parse(data);

      if ($("#dialg_box").attr("type") === "reports" && Elkaisar.Battel.Battels && Elkaisar.Battel.Battels.length > 0) { // if opened menu is for reports

        if ($("#reports_list .selected").length > 0) {   // if there selected  battel

          $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, $("#reports_list .selected").attr("id_battel"), true));
          BattelField.battelField({ navBar: NavBar.Report, totalBox: false, id_battel: $("#reports_list .selected").attr("id_battel") }, Elkaisar.Battel.Battels);
          //$(".box_content").replaceWith(Reports.dialogBoxcontent_reports($("#reports_list .selected").attr("id_battel")));


        } else if ($("#reports_list").length > 0) {   // no battels

          $("#reports_list").html(BattelField.getBattelHeaders(Elkaisar.Battel.Battels, 0, true));

        }

      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

}

$(document).on("PlayerReady", "html", function () {
  playerBattels();
});



Elkaisar.Battel.supportByHero = function (idHero) {
  if (!idHero)
    idHero = Elkaisar.CurrentHero.Hero.id_hero;

  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AWorldUnit/supportByHero`,
    type: 'POST',
    data: {

      xTo: battel_data.x_coord,
      yTo: battel_data.y_coord,
      idHero: idHero,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        alert_box.succesMessage("تم ارسال البطل الى البعثة");
        Elkaisar.DPlayer.Notif.hero_in_battel = Number(Elkaisar.DPlayer.Notif.hero_in_battel) + 1;
        Fixed.refreshPlayerNotif();
        Elkaisar.Hero.getHero(idHero).Hero.in_city = Elkaisar.Hero.HeroState.HERO_IN_BATTEL;
        city_profile.refresh_hero_view();
        $(".nav_icon .close_dialog").click();

      } else if (JsonObject.state === "error_0") {
        alert_box.failMessage("لا تمتلك هذا البطل");
      } else if (JsonObject.state === "error_1") {
        alert_box.failMessage("لا توجد هذة الوحدة");
      } else if (JsonObject.state === "error_2") {
        alert_box.failMessage("البطل ليس فى المدينة");
      } else if (JsonObject.state === "error_3") {
        alert_box.failMessage("لا يمكنك ارسال البطل");
      }


    }
  });

};

Elkaisar.Battel.TransHero = function (idHero) {

  if (!idHero)
    idHero = Elkaisar.CurrentHero.Hero.id_hero;

  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AWorldUnit/transHero`,
    type: 'POST',
    data: {

      xTo: battel_data.x_coord,
      yTo: battel_data.y_coord,
      idHero: idHero,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {
        Elkaisar.Hero.getHero(idHero).in_city = Elkaisar.Hero.HeroState.HERO_IN_BATTEL;
        alert_box.succesMessage("تم ارسال البطل الى البعثة");
        Elkaisar.DPlayer.Notif.hero_in_battel = Number(Elkaisar.DPlayer.Notif.hero_in_battel) + 1;
        Fixed.refreshPlayerNotif();
        city_profile.refresh_hero_view();
        $(".nav_icon .close_dialog").click();

      } else if (JsonObject.state === "error_0") {
        alert_box.failMessage("لا تمتلك هذا البطل");
      } else if (JsonObject.state === "error_1") {
        alert_box.failMessage("لا توجد هذة الوحدة");
      } else if (JsonObject.state === "error_2") {
        alert_box.failMessage("البطل ليس فى المدينة");
      } else if (JsonObject.state === "error_3") {
        alert_box.failMessage("لا يمكنك ارسال البطل");
      }
    }
  });
};




$(document).on("click", "#REFRESH_BATTEL_DATA", function () {

  var idBattel = parseInt($(this).attr("data-id-battel"));

  if (!idBattel) {

    alert_box.confirmMessage("برجاء اختيار المعركة");

  } else {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ABattelRuning/refreshBattelData`,
      data: {
        token: Elkaisar.Config.OuthToken,
        idBattel: idBattel
      },
      type: 'GET',
      beforeSend: function (xhr) {
        console.log(this.data)
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);



        $(".attack-side .joined-num").html(JsonObject.attackNum || 0);
        $(".defense-side .joined-num").html(JsonObject.defenceNum || 0); // refresh defence num

      },
      error: function (jqXHR, textStatus, errorThrown) {



      }

    });


  }

});

Battel = {

  millertySupply: function (x_coord, y_coord) {


    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AWorldUnit/supportByHero`,
      data: {
        xTo: x_coord,
        yTo: y_coord,
        idHero: Elkaisar.CurrentHero.Hero.id_hero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {
        console.log(this.data)
      },
      success: function (data, textStatus, jqXHR) {
        if (isJson(data)) {

        } else {
          Elkaisar.LBase.Error(data);
        }
        $(".close_dialog").click();
        Elkaisar.DPlayer.Notif.hero_in_battel = Number(Elkaisar.DPlayer.Notif.hero_in_battel) + 1;
        Fixed.refreshPlayerNotif();

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },

  afterFininsh: function (Battel) {



    var hero_dialog = $("#dialg_box[type='hero'] .hero-profile");




    if (hero_dialog.length > 0) {
      hero_dialog.replaceWith(army.middle_content(Elkaisar.CurrentHero));
    }

    for (var iii in Battel.ItemPrize) {

      Matrial.givePlayer(Battel.ItemPrize[iii].Item, Battel.ItemPrize[iii].amount);

    }
    Elkaisar.DPlayer.Player.honor = Number(Elkaisar.DPlayer.Player.honor) + Number(Battel.Player.Honor);


    if (Number(Battel.Battel.task) === Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE) {
      Elkaisar.City.getCityBarray();
    }

    if (Number(Battel['Battel']['task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_CHALLANGE']) {
      if (Battel['Battel']['id_player'] == Elkaisar.DPlayer['Player']['id_player']) {
        alert_box['systemChatMessage']('النتيجة ' + (Battel['sideWin'] == Elkaisar['BaseData']['BattelSides']['SideAttack'] ? 'فوز' : 'خسارة'));
        Elkaisar['ArenaChallange']['Arena']['Arena']['lastAttackTime'] = Math['floor'](Date['now']() / 0x3e8);
      }
      Elkaisar['ArenaChallange']['getFightList']()['done'](function () {
        Elkaisar['ArenaChallange']['ArenaField']();
      });
    }


  }
};

Battel.checkJoinReq = function (x_coord, y_coord) {

  var unit = WorldUnit.getWorldUnit(x_coord, y_coord);


  for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

    if (Matrial.getPlayerAmount(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item) < Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount) {
      return false;
    }

  }



  return true;

};



Battel.afterJoin = function (x_coord, y_coord) {

  var unit = WorldUnit.getWorldUnit(x_coord, y_coord);



  for (var iii in Elkaisar.World.UnitTypeData[unit.ut].JoinReq) {

    Matrial.takeFrom(Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].Item, Elkaisar.World.UnitTypeData[unit.ut].JoinReq[iii].amount);

  }
  return true;

};

Battel.isAttackable = function (idHero, type) {


  if (WorldUnit.isArmyCapital(type)) {
    return Battel.heroArmiesAre(idHero, Elkaisar.World.UnitTypeData[type].ArmyReq);
  }


  return true;
};

Battel.heroArmiesAre = function (idHero, armyType) {

  var hero = getHeroById(idHero);

  armyType = Number(armyType);

  if (Number(hero.Army.f_1_type) > 0 && Number(hero.Army.f_1_type) !== armyType)
    return false;
  if (Number(hero.Army.f_2_type) > 0 && Number(hero.Army.f_2_type) !== armyType)
    return false;
  if (Number(hero.Army.f_3_type) > 0 && Number(hero.Army.f_3_type) !== armyType)
    return false;

  if (Number(hero.Army.b_1_type) > 0 && Number(hero.Army.b_1_type) !== armyType)
    return false;
  if (Number(hero.Army.b_2_type) > 0 && Number(hero.Army.b_2_type) !== armyType)
    return false;
  if (Number(hero.Army.b_3_type) > 0 && Number(hero.Army.b_3_type) !== armyType)
    return false;


  return true;
};