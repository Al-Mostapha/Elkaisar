Elkaisar.WsLib.TimedTask = {};






Elkaisar.TimedTask.refreshListView = function () {
  $("#build-tsk").html("");
  $("#study-tsk").html("");
  $("#jop-tsk").html("");

  var idCity = Number(Elkaisar.CurrentCity.idCity);

  for (var iii in this.TaskList.Building) {
    var Task = this.TaskList.Building[iii];
    if (idCity !== Number(Task.id_city))
      continue;
    $("#build-tsk").append(` <div class="task-unite upgrade-task" type ="${Task.type}"  place="${Task.place}" lvl_to="${Task.lvl_to}">
                                <div class="wrapper">
                                    <div  class="prog-bar"></div>
                                    <div class="over-prog-bar">
                                        <div class="icon pull-L">
                                            <img src="images/icons/task_building_icon.png"/>
                                        </div>
                                        <div class="task-time  pull-L">
                                            <h1 class="title stroke">${BuildingConstData[Task.type].title} >lv.${Task.lvl_to}</h1>
                                            <h1 class="time_counter tc-with-prog building_counter rtl stroke" time-end-org="${Task.time_end_org}" time-start = "${Task.time_start}" time-end="${Task.time_end}"></h1>
                                        </div>
                                        <div class="reduce-time reduce-time-for-building pull-L"  >
                                            <img src="images/btns/m_right.png" class="img-sml" data-id-task="${Task.id}"/>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
  }
  for (var iii in this.TaskList.Study) {
    var Task = this.TaskList.Study[iii];
    if (idCity !== Number(Task.id_city))
      continue;
    $("#study-tsk").append(` <div class="task-unite upgrade-task" type ="${Task.study}"  place="${Task.study_in}" lvl_to="${Task.lvl_to}">
                                <div class="wrapper">
                                    <div  class="prog-bar"></div>
                                    <div class="over-prog-bar">
                                        <div class="icon pull-L">
                                            <img src="images/icons/task_tech_icon.png"/>
                                        </div>
                                        <div class="task-time  pull-L">
                                            <h1 class="title stroke">${Elkaisar.BaseData.Edu[Task.study].ar_title} >lv.${Task.lvl_to}</h1>
                                            <h1 class="time_counter tc-with-prog study_counter rtl stroke" time-end-org="${Task.time_end_org}" time-start = "${Task.time_start}" time-end="${Task.time_end}"></h1>
                                        </div>
                                        <div class="reduce-time reduce-time-for-study pull-L"  >
                                            <img src="images/btns/m_right.png" class="img-sml"/>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
  }
  for (var iii in this.TaskList.Jop) {
    var Task = this.TaskList.Jop[iii];
    if (idCity !== Number(Task.id_city))
      continue;
    $("#jop-tsk").append(` <div class="task-unite upgrade-task" type ="${Task.jop_place}"  place="${Task.jop_place}" lvl_to="${Task.lvl_to}">
                                <div class="wrapper">
                                    <div  class="prog-bar"></div>
                                    <div class="over-prog-bar">
                                        <div class="icon pull-L">
                                            <img src="images/icons/task_jop_icon.png"/>
                                        </div>
                                        <div class="task-time  pull-L">
                                            <h1 class="title stroke">${CITY_JOP_REQ[Task.jop_place.toUpperCase()].ar_title}</h1>
                                            <h1 class="time_counter tc-with-prog study_counter rtl stroke" time-end-org="${Task.time_end_org}" time-start = "${Task.time_start}" time-end="${Task.time_end}"></h1>
                                        </div>
                                        <div class="reduce-time reduce-time-for-jop pull-L"  >
                                            <img src="images/btns/m_right.png" class="img-sml" data-id-task="${Task.id}"/>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
  }


  refreshTime();
}
  ;


Elkaisar.TimedTask.getCityBuildingTasks = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ATimedTask/getCityBuildingTasks`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var JsonData = JSON.parse(data);
      for (var iii in JsonData)
        Elkaisar.TimedTask.TaskList.Building[JsonData[iii].id] = JsonData[iii];
      Elkaisar.TimedTask.refreshListView();
    }

  });

};

Elkaisar.TimedTask.getCityStudyTasks = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ATimedTask/getCityStudyTasks`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var JsonData = JSON.parse(data);
      for (var iii in JsonData)
        Elkaisar.TimedTask.TaskList.Study[JsonData[iii].id] = JsonData[iii];
      Elkaisar.TimedTask.refreshListView();
    }

  });

};

Elkaisar.TimedTask.getCityArmyTasks = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ATimedTask/getCityArmyTasks`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var JsonData = JSON.parse(data);
      for (var iii in JsonData)
        Elkaisar.TimedTask.TaskList.Army[JsonData[iii].id] = JsonData[iii];
      Elkaisar.TimedTask.refreshListView();
    }

  });

};

Elkaisar.TimedTask.getCityJopTasks = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.idCity;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ATimedTask/getCityJopTasks`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var JsonData = JSON.parse(data);
      for (var iii in JsonData)
        Elkaisar.TimedTask.TaskList.Jop[JsonData[iii].id] = JsonData[iii];
      Elkaisar.TimedTask.refreshListView();
    }

  });

};

const JOP_AVAIL_PLACE = [
  10, 30, 60, 100, 150, 200,
  300, 500, 750, 1000, 1200, 1250,
  1300, 1350, 1400, 1450, 1500, 1550,
  1600, 1650, 1700, 1750, 1800, 1850,
  1900, 1950, 2000, 2050, 2100, 2150
];

const CITY_JOP_REQ = {

  FARM: { food: 10, wood: 20, stone: 30, metal: 15, time: 31, pop: 1, produce: "food", ar_title: "وظائف الحقل" },
  WOOD: { food: 15, wood: 10, stone: 20, metal: 30, time: 31, pop: 1, produce: "wood", ar_title: "وظائف الاخشاب" },
  STONE: { food: 30, wood: 15, stone: 10, metal: 20, time: 31, pop: 1, produce: "stone", ar_title: "وظائف المحجر" },
  MINE: { food: 20, wood: 30, stone: 15, metal: 10, time: 31, pop: 1, produce: "metal", ar_title: "وظائف المنجم" }

};




$(document).on("keyup change", "#jop-num-input input", function () {


  var current_val = $(this).val() || 0;
  var jop = $("#job-typs .selected").attr("place");


  $("#jop_req_table .food").html(Math.max(CITY_JOP_REQ[jop.toUpperCase()].food * current_val, CITY_JOP_REQ[jop.toUpperCase()].food));
  $("#jop_req_table .wood").html(Math.max(CITY_JOP_REQ[jop.toUpperCase()].wood * current_val, CITY_JOP_REQ[jop.toUpperCase()].wood));
  $("#jop_req_table .metal").html(Math.max(CITY_JOP_REQ[jop.toUpperCase()].metal * current_val, CITY_JOP_REQ[jop.toUpperCase()].metal));
  $("#jop_req_table .stone").html(Math.max(CITY_JOP_REQ[jop.toUpperCase()].stone * current_val, CITY_JOP_REQ[jop.toUpperCase()].stone));
  $("#jop_req_table .time").html(changeTimeFormat(Math.max(CITY_JOP_REQ[jop.toUpperCase()].time * current_val, CITY_JOP_REQ[jop.toUpperCase()].time)));

});


/*____________________________________________________________________________*/
/*_____________________START TIMing___________________________________________*/
function refreshTime() {
  $(".time_counter").each(function () {

    var timeEnd = parseInt($(this).attr("time-end"));
    var now = Date.now() / 1000;
    var time_diff = Math.floor((timeEnd - now));



    if (time_diff > 0) {
      $(this).html(changeTimeFormat(time_diff));

      if ($(this).hasClass("tc-with-prog")) {
        var timeStart = $(this).attr("time-start");
        var timeEndOrg = $(this).attr("time-end-org");
        var progWidth = (((timeEndOrg - timeEnd) + (now - timeStart)) / (timeEndOrg - timeStart)) * 100;
        $(this).parents(".task-unite").children(".wrapper").children(".prog-bar").width(progWidth + "%");
      }

    } else {

      $(this).html(changeTimeFormat(0));
      if ($(this).hasClass("building_counter")) {
        $(this).parents(".task-unite").remove();
      } else if ($(this).hasClass("study_counter")) {
        $(this).parents(".task-unite").remove();
      } else if ($(this).hasClass("refresh_hero_counter")) {
        buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
      } else if ($(this).hasClass("counter_worker_in_palace")) {
        buildingClick(cityHasType(BUILDING_TYPS.PALACE), true);
      } else if ($(this).hasClass("inner_market_nav")) {
        $("#transport-res-inner-nav .selected").click();
      }

    }



  });
}







Elkaisar.WsLib.TimedTask.Army = function (data) {

  Elkaisar.City.getCity(data.City.id_city).City = data.City;
  Elkaisar.DPlayer.Player.prestige = Number(Elkaisar.DPlayer.Player.prestige) + data.prestige;






  $(".middle-content .soldier").each(function () {

    $(this).children(".amount").html((Elkaisar.CurrentCity.City[$(this).attr("army_type")]));

  });

  var id_console = Elkaisar.CurrentCity.City.console;
  if (id_console) {
    var hero = getHeroById(id_console);
    hero.exp = Number(hero.exp) + Number(data.prestige) * 2;
    $("#dialg_box[type='hero'] .hero-profile").replaceWith(army.middle_content(hero));
  }


  Player_profile.refresh_view();
  city_profile.refresh_army_view();
  city_profile.refresh_resource_view();
  delete (Elkaisar.TimedTask.TaskList.Army[data.Task.id]);
  Elkaisar.TimedTask.refreshListView();
  Building.militrayProduction.RefreshLeft();


};

Elkaisar.WsLib.TimedTask.Building = function (data) {

  // Crafty.audio.play("upgrade_done");

  Elkaisar.City.getCity(data.Task.id_city).BuildingLvl[data.Task.place] = data.Task.lvl_to;

  fillCityWithBuilding();


  $("#palace_content .right-content .worker").each(function () {
    if ($(this).attr("place") === data.Task.place && Number(Elkaisar.CurrentCity.City.id_city) === Number(data.Task.id_city)) {
      $(this).remove();
    }

  });


  /* increment the cild atteched lvl panel*/

  if (Number(Elkaisar.CurrentCity.City.id_city) === Number(data.Task.id_city)) {

    if (Number(data.Task.type) === BUILDING_TYPS.COTTAGE) {

      Elkaisar.City.getCityBase();

    } else if (Number(data.Task.type) === BUILDING_TYPS.STORE) {

      Elkaisar.City.getCityBase();
      Elkaisar.City.getCityStorage();

    } else if (Number(data.Task.type) === BUILDING_TYPS.PALACE) {
      Elkaisar.City.getCityBase();
    } else if (Number(data.Task.type) === BUILDING_TYPS.WORSHIP) {
      Elkaisar.City.getCityBase();
    } else if (Number(data.Task.type) === BUILDING_TYPS.WALL) {
      Elkaisar.City.getCityBase();

    }

  }








  city_profile.refresh_city_resources();
  delete (Elkaisar.TimedTask.TaskList.Building[data.Task.id]);
  Elkaisar.TimedTask.refreshListView();
  fillCityWithBuilding();

  if ($("#dialg_box .box_header").attr("place") === data.Task.place && Number(Elkaisar.CurrentCity.City.id_city) === Number(data.Task.id_city)) {
    buildingClick(data.Task.place, true);
  }

  var id_console = Elkaisar.CurrentCity.City.console;

  var hero = getHeroById(id_console);
  if (hero) {
    hero.exp = Number(hero.exp) + Number(data.prestige) * 2;
    $("#dialg_box[type='hero'] .middle-content").replaceWith(army.middle_content(hero));
  }

};


Elkaisar.WsLib.TimedTask.Jop = function (data) {
  Elkaisar.DPlayer.Player.prestige = Number(Elkaisar.DPlayer.Player.prestige) + data.prestige;
  $("#job-typs .selected").click();
  city_profile.refresh_city_resources();
  delete (Elkaisar.TimedTask.TaskList.Jop[data.Task.id]);
  Elkaisar.TimedTask.refreshListView();
  Player_profile.refresh_view();
  Elkaisar.City.getCityBase();
  Elkaisar.City.getCityJop();
  var id_console = Elkaisar.CurrentCity.City.console;
  var hero = getHeroById(id_console);
  if (hero) {
    hero.exp = Number(hero.exp) + Number(data.prestige) * 2;
    $("#dialg_box[type='hero'] .middle-content").replaceWith(army.middle_content(hero));
  }
};


Elkaisar.WsLib.TimedTask.Study = function (data) {



  //Crafty.audio.play("upgrade_done");
  Elkaisar.DPlayer.Player.prestige = Number(Elkaisar.DPlayer.Player.prestige) + data.prestige;
  Player_profile.getPlayerEdu().done(function () {
    $(".uni_tech .left-content .total").replaceWith(edu.getUniTech());
    $(".acad_tech .left-content .total").replaceWith(edu.getAcadTech());
  });





  city_profile.refresh_city_resources();
  delete (Elkaisar.TimedTask.TaskList.Study[data.Task.id]);
  Elkaisar.TimedTask.refreshListView();
  Player_profile.refresh_view();

  var id_console = Elkaisar.CurrentCity.City.console;
  var hero = getHeroById(id_console);
  if (hero) {
    hero.exp = Number(hero.exp) + Number(data.prestige) * 2;
    $("#dialg_box[type='hero'] .middle-content").replaceWith(army.middle_content(hero));
  }
};








function changeTimeFormat(time_diff) {
  if (isNaN(time_diff))
    return "---";
  time_diff = parseInt(time_diff);
  var days = Math.floor(time_diff / (60 * 60 * 24));
  var hours = Math.floor((time_diff % (60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((time_diff % (60 * 60)) / (60));
  var seconds = Math.floor((time_diff % (60)) / 1);
  return (getArabicNumbers(seconds) + "&nbsp;ث&nbsp;" + (minutes > 0 ? getArabicNumbers(minutes)
    + "&nbsp;د&nbsp;" : "") + (hours > 0 ? getArabicNumbers(hours)
      + "&nbsp;س&nbsp;" : "") + (days > 0 ? getArabicNumbers(days)
        + "&nbsp;ى&nbsp;" : " "));
}

function lastSeen(last_seen) {
  var time_diff = Math.floor($.now() / 1000 - last_seen);

  if (time_diff < 60) {
    return `منذ ${Math.floor(time_diff)} ثانية`;
  } else if (time_diff < 60 * 11) {
    return `منذ ${Math.floor(time_diff / 60)} دقائق`;
  } else if (time_diff < 60 * 60) {
    return `منذ ${Math.floor(time_diff / 60)} دقيقة`;
  } else if (time_diff < 60 * 60 * 11) {
    return `منذ ${Math.floor(time_diff / (60 * 60))} ساعات`;
  } else if (time_diff < 60 * 60 * 24) {
    return `منذ ${Math.floor(time_diff / (60 * 60))} ساعة`;
  } else if (time_diff < 60 * 60 * 24 * 7) {
    return "يوم" + Math.floor(time_diff / (60 * 60 * 24)) + "منذ ";
  } else {
    return "منذ فترة طويلة";
  }
}

function checkTimeFinish(time, place, type, lvl, time_end, el) {
  if ((time - Date.now()) < 1) {

  }
}

Max_of = {

  city_jop: function (jop, building_place) {

    return Math.min(
      Math.floor(Elkaisar.CurrentCity.City.pop),
      Math.floor(Elkaisar.CurrentCity.City.food / jop.food),
      Math.floor(Elkaisar.CurrentCity.City.wood / jop.wood),
      Math.floor(Elkaisar.CurrentCity.City.stone / jop.stone),
      Math.floor(Elkaisar.CurrentCity.City.metal / jop.metal),
      JOP_AVAIL_PLACE[Elkaisar.City.getCity().BuildingLvl[building_place] - 1]

    );


  },
  buildingTypeLvl: function (buiding_type) {
    var max = -1;
    for (var index in Elkaisar.City.getCity().BuildingType) {

      if (index !== "id_player" && index !== "id_player" && Number(Elkaisar.City.getCity().BuildingType[index]) === Number(buiding_type)) {
        if (Elkaisar.City.getCity().BuildingLvl[index] > max) {
          max = Number(Elkaisar.City.getCity().BuildingLvl[index]);
        }
      }

    }
    return max;

  }

};



function dateTimeFormat(time) {

  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  return `${time.getUTCDate()} ${monthNames[time.getUTCMonth()]} ${time.getUTCFullYear()}  &nbsp; &nbsp; &nbsp; &nbsp; ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;

}

function dateTimeFormatShort(time) {

  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  return `${time.getUTCDate()} ${monthNames[time.getUTCMonth()]} ${time.getUTCFullYear()} ${time.getUTCHours()}:${time.getUTCMinutes()}`;

}

var SERVER_CLOCK = $("#server-name .time");

setInterval(function () {
  SERVER_CLOCK.html(dateTimeFormat(new Date(Date.now())));
}, 1000);