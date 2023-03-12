var city_building;


Elkaisar.City.getCity = function (idCity) {

  if (!idCity)
    return Elkaisar.CurrentCity;

  for (var id in Elkaisar.DPlayer.City)
    if (Number(id) === Number(idCity))
      return Elkaisar.DPlayer.City[id];

  return Elkaisar.CurrentCity;
};


Elkaisar.City.getCityBase = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACity/refreshCityBase`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var City = JSON.parse(data);


      Elkaisar.City.getCity(idCity).City = JSON.parse(data);
      city_profile.refresh_resource_view();
      city_profile.refresh_army_view();
      city_profile.refresh_hero_view();
      city_profile.refresh_wild_view();
      Elkaisar.City.refreshBtnList();

    }
  });

};

Elkaisar.City.getCityBuilding = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;

  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/getCityBuilding`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var City = JSON.parse(data);

      Elkaisar.City.getCity(idCity).BuildingLvl = City.lvl;
      Elkaisar.City.getCity(idCity).BuildingType = City.type;


    }
  });

};


Elkaisar.City.getCityJop = function (idCity) {
  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityJop/getCityJop`,
    type: 'GET',
    data: {
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      Elkaisar.City.getCity(idCity).Jop = JSON.parse(data);
    }
  });

};

Elkaisar.City.getCityWounded = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityWounded/getCityWounded`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.City.getCity(idCity).Wounded = JSON.parse(data);


    }
  });

};

Elkaisar.City.getCityStorage = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityStorage/getCityStorage`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.City.getCity(idCity).Storage = JSON.parse(data);


    }
  });

};


Elkaisar.City.getCityBarray = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;

  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityBarrary/getCityBarray`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.City.getCity(idCity).Barray = JSON.parse(data);
      city_profile.refresh_wild_view();
      $(".for_building .left-nav .selected").click();

    }
  });

};


Elkaisar.City.getCityGarrison = function (idCity) {

  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/getCityGarrison`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity,
      xCoord: Elkaisar.City.getCity(idCity).City.x,
      yCoord: Elkaisar.City.getCity(idCity).City.y
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.City.getCity(idCity).Garrison = JSON.parse(data);

    }
  });

};

Elkaisar.City.getCityHeroTheater = function (idCity) {
  if (!idCity)
    idCity = Elkaisar.CurrentCity.idCity;


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityHero/refreshHeroTheater`,
    type: 'POST',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.City.getCity(idCity).HeroTheater = JSON.parse(data);

    }
  });
};

Elkaisar.City.getCityHero = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityHero/getCityHero`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var HeroList = JSON.parse(data);

      for (var iii in HeroList) {

        if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
          Elkaisar.DPlayer.Heros.push({ idHero: HeroList[iii].id_hero });

        var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);

        Hero.Hero = HeroList[iii];
        Hero.idHero = HeroList[iii].id_hero;


      }

      Elkaisar.Hero.orderHeors();
      if (!Elkaisar.CurrentHero.Hero && Elkaisar.DPlayer.Heros[0])
        Elkaisar.CurrentHero = Elkaisar.Hero.getHero(Elkaisar.DPlayer.Heros[0].idHero);

      Elkaisar.City.getCityHeroEquip(idCity);
      city_profile.refresh_hero_view();
    }
  });

};

Elkaisar.City.getCityHeroArmy = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityHero/getCityHeroArmy`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var HeroList = JSON.parse(data);

      for (var iii in HeroList) {

        if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
          Elkaisar.DPlayer.Heros.push({ idHero: HeroList[iii].id_hero });


        var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);
        Hero.Army = HeroList[iii];
        Hero.idHero = HeroList[iii].id_hero;

      }


    }
  });

};

Elkaisar.City.getCityHeroMedal = function (idCity) {


  if (!idCity)
    idCity = Elkaisar.CurrentCity.City.id_city;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ACityHero/getCityHeroMedal`,
    type: 'GET',
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken,
      idCity: idCity
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      var HeroList = JSON.parse(data);

      for (var iii in HeroList) {

        if (!Elkaisar.Hero.getHero(HeroList[iii].id_hero))
          Elkaisar.DPlayer.Heros.push({ idHero: HeroList[iii].id_hero });


        var Hero = Elkaisar.Hero.getHero(HeroList[iii].id_hero);
        Hero.Medal = HeroList[iii];
        Hero.idHero = HeroList[iii].id_hero;
      }


    }
  });

};


Elkaisar.City.getCityHeroEquip = function (idCity) {

  Elkaisar.Equip.distributeEquip();

};


Elkaisar.City.getCityByCoord = function (xCoord, yCoord) {

  for (var iii in Elkaisar.DPlayer.City) {

    if (Number(Elkaisar.DPlayer.City[iii].City.x) !== Number(xCoord))
      continue;
    if (Number(Elkaisar.DPlayer.City[iii].City.y) !== Number(yCoord))
      continue;

    return Elkaisar.DPlayer.City[iii];
  }

  return Elkaisar.CurrentCity;
};


Elkaisar.City.RefreshCityHeros = function (idCity) {

  Elkaisar.City.getCityHero(idCity);
  Elkaisar.City.getCityHeroArmy(idCity);
  Elkaisar.City.getCityHeroMedal(idCity);
  Elkaisar.City.getCityHeroEquip(idCity);

};





Elkaisar.City.refreshBtnList = function () {
  var BtnList = "";
  var idCity = Number(Elkaisar.CurrentCity.idCity);
  for (var iii = Object.keys(Elkaisar.DPlayer.City).length - 1; iii >= 0; iii--) {

    var CCity = Elkaisar.DPlayer.City[Object.keys(Elkaisar.DPlayer.City)[iii]];

    if (!CCity.City) {
      continue;
    }

    var console_hero = Elkaisar.Hero.getHero(CCity.City.console);
    BtnList += `<li data-index="${iii}" data-id-city="${CCity.City.id_city}" ${idCity === Number(CCity.City.id_city) ? `class="selected"` : ""}>
                                 <div class="console pull-R" style="background-image: url(${console_hero ? Elkaisar.BaseData.HeroAvatar[console_hero.Hero.avatar] : "images/world/city-list/no-console.png"})">
                                        <label class="stroke">${CCity.City.name}</label>
                                 </div>
                                <button class="nav-to-city pull-L" data-x-coord="${CCity.City.x}" data-y-coord="${CCity.City.y}"></button>
                             </li>`;

  }

  $("#player-city-list ul").html(BtnList);
  if ($("#player-city-list ul .selected").length <= 0)
    $("#player-city-list ul li:last-child").addClass("selected");
};


Elkaisar.City.prepareCity = async function (idCity) {
  Elkaisar.DPlayer.City[idCity] = { idCity: idCity };

  if (Number(idCity) === Number(Elkaisar.Config.idCities[0]))
    Elkaisar.CurrentCity = Elkaisar.City.getCity(idCity);
  await Elkaisar.City.getCityJop(idCity);
  await Elkaisar.City.getCityBase(idCity);
  setInterval(function () {
    resourcesRefresh();
    refreshTime();
  }, 1000);
  await Elkaisar.City.getCityBuilding(idCity);
  await Elkaisar.City.getCityGarrison(idCity);
  await Elkaisar.Building.getJsonData()

  await Elkaisar.TimedTask.getCityBuildingTasks(idCity);
  await Elkaisar.TimedTask.getCityStudyTasks(idCity);
  await Elkaisar.TimedTask.getCityJopTasks(idCity);
  await Elkaisar.TimedTask.getCityArmyTasks(idCity);
  await Elkaisar.City.getCityBarray(idCity);
  await Elkaisar.City.getCityWounded(idCity);
  await Elkaisar.City.getCityStorage(idCity);
  await Elkaisar.City.getCityHero(idCity);
  await Elkaisar.City.getCityHeroArmy(idCity);
  await Elkaisar.City.getCityHeroEquip(idCity);
  await Elkaisar.City.getCityHeroMedal(idCity);
  await Elkaisar.City.refreshBtnList();

  if (Number(idCity) === Number(Elkaisar.Config.idCities[0])) {
    Elkaisar.GE.LoadingScene.scene.transition({
      target: "City",
      duration: 1000,
      remove: true,
      data: {
        idCity: 0
      }
    });
    $("#loader-layer").remove();
    $(document).trigger("CityReady");
  }
}

$(document).on("PlayerReady", "html", async function () {
  for (var ii in Elkaisar.Config.idCities) {
    await Elkaisar.City.prepareCity(Elkaisar.Config.idCities[ii]);
  }
});



var city_heros = [];
var city_floor;
var interv = false;
var BuildingConstData = [
  {
    image: "images/city/no_building.png", // مكان خالى0
    icon: "images/building/building01.jpg",
    nav_bar: [],
    sprit_name: "no_building",
    hitArea: [83, 46, 4, 84, 83, 120, 155, 85]
  },
  {
    image: "images/city/_B1.png", // كوخ1
    icon: "images/building/building01.jpg",
    nav_bar: NavBar.Building.Cottage,
    getCondetion: function (lvl) {

      var condtions = [];
      var palace_lvl = Math.max(lvl - 1, 1);

      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: palace_lvl,
        txt: "القصر مستوى " + getArabicNumbers(palace_lvl)
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B1",
    hitArea: [138, 66, 79, 40, 23, 70, 83, 112, 138, 96]

  },
  {
    image: "images/city/_B2.png", //2 مخزن 
    icon: "images/building/building02.jpg",
    nav_bar: NavBar.Building.Warehouse,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.COTTAGE,
        lvl: lvl_array[lvl - 1],
        txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B2",
    hitArea: [119, 87, 79, 106, 40, 89, 41, 60, 72, 25, 103, 36, 120, 56]
  },
  {
    image: "images/city/_B3.png", //3 ثكنات
    icon: "images/building/building03.jpg",
    nav_bar: NavBar.Building.Barracks,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        lvl: lvl_array[lvl - 1],
        txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B3",
    hitArea: [131, 89, 82, 116, 27, 88, 27, 59, 85, 30, 126, 50]
  },
  {
    image: "images/city/_B4.png", //4 اسطبل
    icon: "images/building/building04.jpg",
    nav_bar: NavBar.Building.Stable,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        lvl: lvl_array[lvl - 1],
        txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B4",
    hitArea: [129, 92, 76, 118, 22, 92, 63, 30, 120, 48]
  },
  {
    image: "images/city/_B5.png", //5 ورشة عمل
    icon: "images/building/building05.jpg",
    nav_bar: NavBar.Building.Workshop,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        lvl: lvl_array[lvl - 1],
        txt: "البلازا مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B5",
    hitArea: [79, 28, 135, 60, 137, 90, 88, 112, 24, 90, 23, 55]
  },
  {
    image: "images/city/_B6.png", // 6 مسرح
    icon: "images/building/building06.jpg",
    nav_bar: NavBar.Building.Amphitheatre,
    getCondetion: function (lvl) {
      var lvl_array = [2, 2, 2, 2, 5, 5, 5, 5, 9, 9, 12, 12, 12, 12, 15, 15, 15, 15, 19, 19, 22, 22, 22, 22, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.COTTAGE,
        lvl: lvl_array[lvl - 1],
        txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B6",
    hitArea: [123, 36, 38, 37, 32, 92, 75, 106, 127, 93, 139, 67]
  },
  {
    image: "images/city/_B7.png", //7 مركز  
    icon: "images/building/building08.jpg",
    nav_bar: NavBar.Building.BarterCenter,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.COTTAGE,
        lvl: lvl_array[lvl - 1],
        txt: "الكوخ مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B7",
    hitArea: [133, 84, 82, 112, 31, 95, 37, 68, 56, 57, 55, 36, 82, 27, 119, 44]
  },
  {
    image: "images/city/_B8.png", //8  جامعة
    icon: "images/building/building09.jpg",
    nav_bar: NavBar.Building.University,
    getCondetion: function (lvl) {
      var lvl_array = [2, 2, 2, 2, 5, 5, 5, 5, 9, 9, 12, 12, 12, 12, 15, 15, 15, 15, 19, 19, 22, 22, 22, 22, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array[lvl - 1],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B8",
    hitArea: [75, 24, 138, 56, 140, 85, 79, 117, 20, 88, 24, 60]
  },
  {
    image: "images/city/_B9.png", // 9  اكاديمية
    icon: "images/building/building10.jpg",
    nav_bar: NavBar.Building.Academy,
    getCondetion: function (lvl) {
      var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var lvl_array_uni = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.UNIVERSITY,
        lvl: lvl_array_uni[lvl - 1],
        txt: "الجامعة مستوى " + getArabicNumbers(lvl_array_uni[lvl - 1])
      };
      condtions[1] = {
        type: "building",
        building_type: BUILDING_TYPS.HOSPITAL,
        lvl: lvl_array_hos[lvl - 1],
        txt: "البلازا  مستوى " + getArabicNumbers(lvl_array_hos[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B9",
    hitArea: [75, 24, 138, 56, 140, 85, 79, 117, 20, 88, 24, 60]
  },
  {
    image: "images/city/_B10.png", //10 دار المساعدة
    icon: "images/building/building11.jpg",
    nav_bar: NavBar.Building.Temple,
    getCondetion: function (lvl) {
      var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_hos[lvl - 1],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_hos[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    helpers: [
      {
        title: "المساعد الاول ",
        ar_title: "المساعد الاول ",
        en_title: "Jupiter",
        image: "images/city/Jupiter.jpg",
        desc: " يقصر المدة الزمية اللازمة للباء وتطوير المبانى فى المدينة"
      },
      {
        title: "المساعد الثانى ",
        ar_title: "المساعد الثانى ",
        en_title: "Juno",
        image: "images/city/Junon.jpg",
        desc: "يساعد هذا المساعد على زيادة واكثار السكان فى المدينة"
      },
      {
        title: "المساعد الثالث ",
        ar_title: "المساعد الثالث ",
        en_title: "Minerva",
        image: "images/city/Minerva.jpg",
        desc: "يقصر المدة الزمية اللازمة لبناء وتطوير القوات"
      }
    ],
    sprit_name: "B10",
    hitArea: [143, 88, 85, 118, 19, 80, 52, 58, 59, 20, 102, 25, 114, 68]
  },
  {
    image: "images/city/_B11.png", //بلازة11 
    icon: "images/building/building12.jpg",
    nav_bar: NavBar.Building.Plaza,
    getCondetion: function (lvl) {
      var lvl_array = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array[lvl - 1],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    sprit_name: "B11",
    hitArea: [147, 82, 78, 112, 17, 77, 23, 51, 84, 24, 138, 47]
  },
  {
    image: "images/city/palace.png", //palace 12 القصر 
    icon: "images/building/building13.jpg",
    nav_bar: NavBar.Building.Palace,
    getCondetion: function (lvl) {
      var lvl_array_hos = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.WALL,
        lvl: Math.max(1, lvl - 2),
        txt: "السور مستوى " + getArabicNumbers(Math.max(1, lvl - 2))
      };
      if (lvl < 10) {
        condtions[1] = {
          type: "people",
          amount: Math.ceil(Math.min(Math.pow(1.8, lvl - 1) * 100, 45 * 1000)),
          txt: " عدد السكان " + Math.ceil(Math.min(Math.pow(1.8, lvl - 1) * 100, 45 * 1000))
        };
      } else if (lvl < 20) {
        var require = [5, 5, 5, 8, 8, 8, 10, 10, 10, 10]
        condtions[1] = {
          type: "matrial",
          amount: require[lvl - 10],
          mat_type: "law_1",
          txt: " قانون دراكو " + getArabicNumbers(require[lvl - 10])
        };
      } else if (lvl < 25) {
        condtions[1] = {
          type: "matrial",
          amount: 5,
          mat_type: "law_2",
          txt: "  قانون الجداول " + getArabicNumbers(5)
        };
      } else {
        condtions[1] = {
          type: "matrial",
          amount: 5,
          mat_type: "law_3",
          txt: "  قانون الرومانى " + getArabicNumbers(5)
        };
      }
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [147, 10, 133, 48, 100, 53, 67, 125, 139, 157, 229, 125, 221, 76]
  },
  {
    image: "images/stabl_1.png", //wall 13 السور 
    icon: "images/building/building16.jpg",
    getIcon: function () {
      if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
        return "images/building/building17.jpg";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
        return "images/building/building16.jpg";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
        return "images/building/building15.jpg";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
        return "images/building/building14.jpg";
      } else {
        return "images/building/building14.jpg";
      }
    },
    nav_bar: NavBar.Building.Wall,
    getCondetion: function (lvl) {
      var lvl_array_stone = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22];
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.STONE,
        lvl: lvl_array_stone[Math.max(lvl - 1, 1)],
        txt: "المحجر مستوى " + getArabicNumbers(lvl_array_stone[Math.max(lvl - 1, 1)])
      };
      condtions[1] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[Math.max(lvl - 1, 1)],
        txt: "القصر  مستوى " + getArabicNumbers(lvl_array_palace[Math.max(lvl - 1, 1)])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    getHitArea: function () {
      if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
        return [510, 3, 1, 256, 5, 388, 576, 104, 609, 11];
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
        return [598, 11, 588, 92, 9, 391, 7, 299, 267, 161, 259, 150, 295, 130, 323, 133, 560, 12];
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
        return [559, 37, 4, 328, 26, 391, 565, 136, 577, 53];
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
        return [5, 342, 564, 51, 579, 39, 596, 51, 560, 122, 41, 392];
      } else {
        return [564, 92, 1, 369, 22, 389, 565, 120];
      }
    },
    sprit_name: "wall_1",
    getSpriteName: function () {
      if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 10) {
        return "wall_4";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 8) {
        return "wall_3";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 4) {
        return "wall_2";
      } else if (Number(Elkaisar.City.getCity().BuildingLvl.wall) >= 1) {
        return "wall_1";
      } else {
        return "wall_0";
      }
    }
  },
  {
    image: "images/stabl_1.png", //market 14 السوق 
    icon: "images/building/building07.jpg",
    nav_bar: NavBar.Building.Market,
    getCondetion: function (lvl) {
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[lvl],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
      };
      if (lvl < 10) {
        condtions[1] = {
          type: "people",
          amount: Math.pow(2, lvl - 1) * 100,
          txt: " عدد السكان " + getArabicNumbers(Math.max(1, lvl - 2))
        };
      }
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [160, 90, 87, 124, 17, 87, 18, 52, 97, 28, 155, 48],
    sprit_name: "market",

  },

  {
    image: "images/stabl_1.png", //wood 15 غايات 
    icon: "images/building/building19.jpg",
    nav_bar: NavBar.Building.Sawmill,
    res_for_jop: {
      food: "15",
      wood: "10",
      stone: "20",
      metal: "30",
      coin: "0",
      time: 30
    },
    getCondetion: function (lvl) {
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[lvl],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1]) + "</li>"
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [173, 97, 97, 124, 30, 84, 59, 56, 108, 8, 158, 40]
  },
  {
    image: "images/stabl_1.png", // farm 16 مزارع 
    icon: "images/building/building18.jpg",
    nav_bar: NavBar.Building.Farm,
    res_for_jop: {
      food: "10",
      wood: "20",
      stone: "30",
      metal: "15",
      coin: "0",
      time: 30
    },
    getCondetion: function (lvl) {
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[lvl],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [333, 116, 164, 204, 7, 134, 152, 12, 244, 55]
  },
  {
    image: "images/stabl_1.png", //mine 17 مناجم 
    icon: "images/building/building21.jpg",
    nav_bar: NavBar.Building.IronMine,
    res_for_jop: {
      food: "20",
      wood: "30",
      stone: "15",
      metal: "10",
      coin: "0",
      time: 30
    },
    getCondetion: function (lvl) {
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[lvl],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1])
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [349, 130, 178, 236, 4, 145, 173, 16, 287, 43]
  },
  {
    image: "images/stabl_1.png", //stone 18 محاجر  
    icon: "images/building/building20.jpg",
    nav_bar: NavBar.Building.Quarry,
    res_for_jop: {
      food: "30",
      wood: "15",
      stone: "10",
      metal: "20",
      coin: "0",
      time: 30
    },
    getCondetion: function (lvl) {
      var lvl_array_palace = [1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 11, 11, 11, 11, 15, 15, 15, 15, 19, 19, 21, 21, 21, 21, 25, 25, 25, 25, 29, 29];
      var condtions = [];
      condtions[0] = {
        type: "building",
        building_type: BUILDING_TYPS.PALACE,
        lvl: lvl_array_palace[lvl],
        txt: "القصر مستوى " + getArabicNumbers(lvl_array_palace[lvl - 1]) + "</li>"
      };
      return condtions;
    },
    getTime: function (lvl) {
      return lvl * 3 * 60;
    },
    hitArea: [297, 114, 200, 194, 94, 190, 16, 101, 51, 21, 206, 15]
  },
  {
    image: "images/stabl_1.png", //seaport 19 الميناء  
    title: "الميناء",
    ar_title: "الميناء",
    en_title: "Seaport",
    icon: "images/building/building20.jpg",
    nav_bar: NavBar.Building.SeaPort,
    func: "",
    paragraph: " المبنى المسؤل عن انشاء وادارة القوات البحرية فى المدينة ",
    getCondetion: function (lvl) {
      var condtions = [];
      return condtions;
    },
    getTime: function (lvl) {
      return 0;
    },
    hitArea: [129, 3, 41, 59, 2, 163, 60, 191, 110, 176, 201, 178, 290, 135, 257, 55]
  },
  {
    image: "images/stabl_1.png", //lighthouse 20 المنارة  
    title: "المنارة",
    ar_title: "المنارة",
    en_title: "Lighthouse",
    icon: "images/building/building20.jpg",
    nav_bar: NavBar.Building.Lighthouse,
    food: "1800",
    wood: "2500",
    stone: "350",
    metal: "850",
    coin: "0",
    func: "",
    paragraph: " المبنى المسؤل عن ارسال البعثات البحرية",
    getCondetion: function (lvl) {
      var condtions = [];
      return condtions;
    },
    getTime: function (lvl) {
      return 0;
    },
    hitArea: [109, 283, 1, 280, 3, 235, 19, 226, 22, 136, 33, 139, 34, 8, 73, 8, 82, 137, 95, 174, 106, 217]
  }

];

Elkaisar.Building.getJsonData = function () {
  return $.getJSON(
    `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/building/${UserLag.language}.json`
    , function (BuildingText) {
      BuildingConstData[BUILDING_TYPS.SPACE].title = BuildingText[BUILDING_TYPS.SPACE].name;

      BuildingConstData[BUILDING_TYPS.COTTAGE].title = BuildingText[BUILDING_TYPS.COTTAGE].name;
      BuildingConstData[BUILDING_TYPS.COTTAGE].func = BuildingText[BUILDING_TYPS.COTTAGE].func;
      BuildingConstData[BUILDING_TYPS.COTTAGE].functionDesc = BuildingText[BUILDING_TYPS.COTTAGE].functionDesc;

      BuildingConstData[BUILDING_TYPS.STORE].title = BuildingText[BUILDING_TYPS.STORE].name;
      BuildingConstData[BUILDING_TYPS.STORE].func = BuildingText[BUILDING_TYPS.STORE].func;
      BuildingConstData[BUILDING_TYPS.STORE].functionDesc = BuildingText[BUILDING_TYPS.STORE].functionDesc;

      BuildingConstData[BUILDING_TYPS.BARRACKS].title = BuildingText[BUILDING_TYPS.BARRACKS].name;
      BuildingConstData[BUILDING_TYPS.BARRACKS].func = BuildingText[BUILDING_TYPS.BARRACKS].func;
      BuildingConstData[BUILDING_TYPS.BARRACKS].functionDesc = BuildingText[BUILDING_TYPS.BARRACKS].functionDesc;

      BuildingConstData[BUILDING_TYPS.STABL].title = BuildingText[BUILDING_TYPS.STABL].name;
      BuildingConstData[BUILDING_TYPS.STABL].func = BuildingText[BUILDING_TYPS.STABL].func;
      BuildingConstData[BUILDING_TYPS.STABL].functionDesc = BuildingText[BUILDING_TYPS.STABL].functionDesc;

      BuildingConstData[BUILDING_TYPS.WORKSHOP].title = BuildingText[BUILDING_TYPS.WORKSHOP].name;
      BuildingConstData[BUILDING_TYPS.WORKSHOP].func = BuildingText[BUILDING_TYPS.WORKSHOP].func;
      BuildingConstData[BUILDING_TYPS.WORKSHOP].functionDesc = BuildingText[BUILDING_TYPS.WORKSHOP].functionDesc;

      BuildingConstData[BUILDING_TYPS.THEATER].title = BuildingText[BUILDING_TYPS.THEATER].name;
      BuildingConstData[BUILDING_TYPS.THEATER].func = BuildingText[BUILDING_TYPS.THEATER].func;
      BuildingConstData[BUILDING_TYPS.THEATER].functionDesc = BuildingText[BUILDING_TYPS.THEATER].functionDesc;

      BuildingConstData[BUILDING_TYPS.STATION].title = BuildingText[BUILDING_TYPS.STATION].name;
      BuildingConstData[BUILDING_TYPS.STATION].func = BuildingText[BUILDING_TYPS.STATION].func;
      BuildingConstData[BUILDING_TYPS.STATION].functionDesc = BuildingText[BUILDING_TYPS.STATION].functionDesc;

      BuildingConstData[BUILDING_TYPS.UNIVERSITY].title = BuildingText[BUILDING_TYPS.UNIVERSITY].name;
      BuildingConstData[BUILDING_TYPS.UNIVERSITY].func = BuildingText[BUILDING_TYPS.UNIVERSITY].func;
      BuildingConstData[BUILDING_TYPS.UNIVERSITY].functionDesc = BuildingText[BUILDING_TYPS.UNIVERSITY].functionDesc;

      BuildingConstData[BUILDING_TYPS.ACADEMY].title = BuildingText[BUILDING_TYPS.ACADEMY].name;
      BuildingConstData[BUILDING_TYPS.ACADEMY].func = BuildingText[BUILDING_TYPS.ACADEMY].func;
      BuildingConstData[BUILDING_TYPS.ACADEMY].functionDesc = BuildingText[BUILDING_TYPS.ACADEMY].functionDesc;

      BuildingConstData[BUILDING_TYPS.WORSHIP].title = BuildingText[BUILDING_TYPS.WORSHIP].name;
      BuildingConstData[BUILDING_TYPS.WORSHIP].func = BuildingText[BUILDING_TYPS.WORSHIP].func;
      BuildingConstData[BUILDING_TYPS.WORSHIP].functionDesc = BuildingText[BUILDING_TYPS.WORSHIP].functionDesc;

      BuildingConstData[BUILDING_TYPS.HOSPITAL].title = BuildingText[BUILDING_TYPS.HOSPITAL].name;
      BuildingConstData[BUILDING_TYPS.HOSPITAL].func = BuildingText[BUILDING_TYPS.HOSPITAL].func;
      BuildingConstData[BUILDING_TYPS.HOSPITAL].functionDesc = BuildingText[BUILDING_TYPS.HOSPITAL].functionDesc;

      BuildingConstData[BUILDING_TYPS.PALACE].title = BuildingText[BUILDING_TYPS.PALACE].name;
      BuildingConstData[BUILDING_TYPS.PALACE].func = BuildingText[BUILDING_TYPS.PALACE].func;
      BuildingConstData[BUILDING_TYPS.PALACE].functionDesc = BuildingText[BUILDING_TYPS.PALACE].functionDesc;

      BuildingConstData[BUILDING_TYPS.WALL].title = BuildingText[BUILDING_TYPS.WALL].name;
      BuildingConstData[BUILDING_TYPS.WALL].func = BuildingText[BUILDING_TYPS.WALL].func;
      BuildingConstData[BUILDING_TYPS.WALL].functionDesc = BuildingText[BUILDING_TYPS.WALL].functionDesc;

      BuildingConstData[BUILDING_TYPS.MARKET].title = BuildingText[BUILDING_TYPS.MARKET].name;
      BuildingConstData[BUILDING_TYPS.MARKET].func = BuildingText[BUILDING_TYPS.MARKET].func;
      BuildingConstData[BUILDING_TYPS.MARKET].functionDesc = BuildingText[BUILDING_TYPS.MARKET].functionDesc;

      BuildingConstData[BUILDING_TYPS.WOOD].title = BuildingText[BUILDING_TYPS.WOOD].name;
      BuildingConstData[BUILDING_TYPS.WOOD].func = BuildingText[BUILDING_TYPS.WOOD].func;
      BuildingConstData[BUILDING_TYPS.WOOD].functionDesc = BuildingText[BUILDING_TYPS.WOOD].functionDesc;

      BuildingConstData[BUILDING_TYPS.FARM].title = BuildingText[BUILDING_TYPS.FARM].name;
      BuildingConstData[BUILDING_TYPS.FARM].func = BuildingText[BUILDING_TYPS.FARM].func;
      BuildingConstData[BUILDING_TYPS.FARM].functionDesc = BuildingText[BUILDING_TYPS.FARM].functionDesc;

      BuildingConstData[BUILDING_TYPS.MINE].title = BuildingText[BUILDING_TYPS.MINE].name;
      BuildingConstData[BUILDING_TYPS.MINE].func = BuildingText[BUILDING_TYPS.MINE].func;
      BuildingConstData[BUILDING_TYPS.MINE].functionDesc = BuildingText[BUILDING_TYPS.MINE].functionDesc;

      BuildingConstData[BUILDING_TYPS.STONE].title = BuildingText[BUILDING_TYPS.STONE].name;
      BuildingConstData[BUILDING_TYPS.STONE].func = BuildingText[BUILDING_TYPS.STONE].func;
      BuildingConstData[BUILDING_TYPS.STONE].functionDesc = BuildingText[BUILDING_TYPS.STONE].functionDesc;


      Elkaisar.TimedTask.refreshListView();


    });
};







/*
 * 
 *   Variable holds all  building on floor
 */

var BuildingOnFloor = {
};

const X_GRID = 128;
const Y_GRID = 64;

function MouseOverBuilding() {

  this.attr({ alpha: 0.8 });
  if (this._children[1]) {

    this._children[1].attr({ alpha: 1.0 });

  }

}
function MouseOutBuilding() {

  this.attr({ alpha: 1.0 });
  if (this._children[1]) {

    this._children[1].attr({ alpha: 0.0 });

  }

}


function building_title(x, y, place) {

  return Elkaisar.GE.CityScene.add.text(x + 0.25 * X_GRID, y + 1.5 * Y_GRID, BuildingConstData[Elkaisar.City.getCity().BuildingType[place]].title, Elkaisar.GE.TextConfig);


}
function building_lvl_lable(x, y, place) {

  var lvl = Number(Elkaisar.City.getCity().BuildingLvl[place]);
  if (lvl == 0)
    return;


  var lable = "building_lvl_lable_1";

  if (Elkaisar.City.getCity().BuildingLvl[place] > 20) {
    lable = "building_lvl_lable_5";
  } else if (Elkaisar.City.getCity().BuildingLvl[place] > 15) {
    lable = "building_lvl_lable_4";
  } else if (Elkaisar.City.getCity().BuildingLvl[place] > 10) {
    lable = "building_lvl_lable_3";
  } else if (Elkaisar.City.getCity().BuildingLvl[place] > 5) {
    lable = "building_lvl_lable_2";
  }

  BuildingOnFloor[place].LvlText = Elkaisar.GE.CityScene.add.text(x + 0.5 * X_GRID, y + 1 * Y_GRID, lvl, {
    color: '#FFFFFF',
    stroke: '#000000',
    strokeThickness: 3,
    fontStyle: "bold",
    align: "center",
    fontSize: 14,
    fixedWidth: 30,
    fixedHeight: 30
  }).setOrigin(0, 0).setDepth(4);
  BuildingOnFloor[place].LvlImage = Elkaisar.GE.CityScene.add.image(x + 0.5 * X_GRID, y + 1 * Y_GRID - 10, lable).setOrigin(0, 0).setDisplaySize(30, 30).setDepth(3)

  return BuildingOnFloor[place].LvlImage;

}

var Check = true;

Elkaisar.GE.AddCityBuilding = function (x, y, BuildingPlace) {
  BuildingOnFloor[BuildingPlace] = Elkaisar.GE.CityScene.add.image(x, y, BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].sprit_name).setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on("click", function () {
      buildingClick(BuildingPlace);
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  BuildingOnFloor[BuildingPlace].Lable = building_lvl_lable(x, y, BuildingPlace);
  building_hammer_animate(BuildingPlace);
  return BuildingOnFloor[BuildingPlace];
};


Elkaisar.GE.AddCityFixedBuilding = function () {

  BuildingOnFloor.palace = Elkaisar.GE.CityScene.add.image(1190, 545, "palace").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["palace"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("palace");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(1260, 580, "palace");
  building_hammer_animate("palace");


  BuildingOnFloor.wall = Elkaisar.GE.CityScene.add.image(0, 0, BuildingConstData[Elkaisar.City.getCity().BuildingType["wall"]].getSpriteName()).setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["wall"]].getHitArea()),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("wall");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(1.75 * X_GRID, 2.5 * Y_GRID, "wall");
  building_hammer_animate("wall");




  BuildingOnFloor.seaport = Elkaisar.GE.CityScene.add.image(16 * X_GRID, 9.75 * Y_GRID, "seaport").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["seaport"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("seaport");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(14 * X_GRID, 3.25 * Y_GRID, "seaport");
  building_hammer_animate("seaport");


  BuildingOnFloor.lighthouse = Elkaisar.GE.CityScene.add.image(15.5 * X_GRID, 5 * Y_GRID, "lighthouse").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["lighthouse"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("lighthouse");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(14 * X_GRID, 3.25 * Y_GRID, "lighthouse");
  building_hammer_animate("lighthouse");


  BuildingOnFloor.farm = Elkaisar.GE.CityScene.add.image(13 * X_GRID, 14.25 * Y_GRID, "farm").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["farm"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("farm");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(13.5 * X_GRID, 14.75 * Y_GRID, "farm");
  building_hammer_animate("farm");



  BuildingOnFloor.mine = Elkaisar.GE.CityScene.add.image(7.75 * X_GRID, 2.25 * Y_GRID, "mine").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["mine"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("mine");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(8.5 * X_GRID, 3.25 * Y_GRID, "mine");
  building_hammer_animate("mine");



  BuildingOnFloor.stone = Elkaisar.GE.CityScene.add.image(11.5 * X_GRID, 5.5 * Y_GRID, "stone").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["stone"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("stone");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(12.25 * X_GRID, 5.5 * Y_GRID, "stone");
  building_hammer_animate("stone");


  BuildingOnFloor.wood = Elkaisar.GE.CityScene.add.image(2 * X_GRID, 6.5 * Y_GRID, "wood").setInteractive({
    hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType["wood"]].hitArea),
    hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, function () {
      buildingClick("wood");
    })
    .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
    .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  building_lvl_lable(2.25 * X_GRID, 6.25 * Y_GRID, "wood");
  building_hammer_animate("wood");

};
Elkaisar.GE.TextConfig = {
  color: '#FFFFFF',
  stroke: '#000000',
  strokeThickness: 3,
  fontStyle: "bold",
  align: "center",
  fontSize: 14,
  fixedWidth: 100,
  fixedHeight: 24,
  backgroundColor: "#000000",
  padding: {
    y: 5
  }
};
function fillCityWithBuilding() {
  for (var prop in BuildingOnFloor) {
    BuildingOnFloor[prop].destroy();
    if (BuildingOnFloor[prop].LvlImage)
      BuildingOnFloor[prop].LvlImage.destroy();
    if (BuildingOnFloor[prop].LvlText)
      BuildingOnFloor[prop].LvlText.destroy();
    for (var iii in BuildingOnFloor[prop].BuildingAni)
      if (BuildingOnFloor[prop].BuildingAni[iii] && BuildingOnFloor[prop].BuildingAni[iii].destroy)
        BuildingOnFloor[prop].BuildingAni[iii].destroy();
    delete BuildingOnFloor[prop];
  }
  /*Crafty("hammer_start").each(function () {
   this.destroy();
   });*/

  if (!Elkaisar.City.getCity().BuildingType) {
    if (Check)
      Elkaisar.City.getCityBuilding().done(function () {
        fillCityWithBuilding();
      });
    Check = false;
    return;
  }


  Elkaisar.GE.AddCityFixedBuilding();
  Elkaisar.GE.AddCityBuilding(14 * X_GRID, 3.25 * Y_GRID, "market");
  Elkaisar.GE.AddCityBuilding(1780, 461, "light_house_1");
  Elkaisar.GE.AddCityBuilding(1685, 506, "light_house_2");
  Elkaisar.GE.AddCityBuilding(1587, 556, "light_house_3");
  Elkaisar.GE.AddCityBuilding(1487, 603, "light_house_4");
  Elkaisar.GE.AddCityBuilding(1792, 557, "light_house_5");
  Elkaisar.GE.AddCityBuilding(1695, 609, "light_house_6");
  Elkaisar.GE.AddCityBuilding(1595, 659, "light_house_7");
  Elkaisar.GE.AddCityBuilding(1807, 663, "light_house_8");
  Elkaisar.GE.AddCityBuilding(1702, 714, "light_house_9");
  Elkaisar.GE.AddCityBuilding(1802, 775, "light_house_10");


  Elkaisar.GE.AddCityBuilding(1353, 673, "under_palace_1");
  Elkaisar.GE.AddCityBuilding(1249, 715, "under_palace_2");
  Elkaisar.GE.AddCityBuilding(1145, 763, "under_palace_3");
  Elkaisar.GE.AddCityBuilding(1458, 724, "under_palace_4");
  Elkaisar.GE.AddCityBuilding(1353, 769, "under_palace_5");
  Elkaisar.GE.AddCityBuilding(1246, 813, "under_palace_6");
  Elkaisar.GE.AddCityBuilding(1568, 779, "under_palace_7");
  Elkaisar.GE.AddCityBuilding(1464, 822, "under_palace_8");
  Elkaisar.GE.AddCityBuilding(1352, 876, "under_palace_9");
  Elkaisar.GE.AddCityBuilding(1674, 829, "under_palace_10");
  Elkaisar.GE.AddCityBuilding(1565, 880, "under_palace_11");
  Elkaisar.GE.AddCityBuilding(1457, 923, "under_palace_12");


  if (Number(Elkaisar.CurrentCity.City.lvl) > 0)
    fillCityLvl_1();
  if (Number(Elkaisar.CurrentCity.City.lvl) > 1)
    fillCityLvl_2();
  if (Number(Elkaisar.CurrentCity.City.lvl) > 2)
    fillCityLvl_3();
  if (Elkaisar.CurrentCity.City.food)
    Animation.cityProductionRate();

  for (var BuildingPlace in BuildingOnFloor) {
    BuildingOnFloor[BuildingPlace].setDataEnabled();
    BuildingOnFloor[BuildingPlace].data.set("BuildingPlace", BuildingPlace);
  }

}




function fillCityLvl_3() {

  Elkaisar.GE.AddCityBuilding(1172, 368, "above_palace_1").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(1070, 417, "above_palace_2").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(1278, 420, "above_palace_3").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(1173, 469, "above_palace_4").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(1012, 554, "above_palace_5").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(904, 606, "above_palace_6").setFlipX(true);

  Elkaisar.GE.AddCityBuilding(471, 413, "around_wood_1").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(580, 464, "around_wood_2").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(479, 516, "around_wood_3").setFlipX(true);

}



function fillCityLvl_2() {

  Elkaisar.GE.AddCityBuilding(628, 139, "under_wall_1").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(525, 185, "under_wall_2").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(423, 229, "under_wall_3").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(728, 187, "under_wall_4").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(628, 233, "under_wall_5").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(526, 279, "under_wall_6").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(823, 239, "under_wall_7").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(725, 284, "under_wall_8").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(627, 333, "under_wall_9").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(930, 287, "under_wall_10").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(836, 337, "under_wall_11").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(737, 383, "under_wall_12").setFlipX(true);



}


function fillCityLvl_1() {

  Elkaisar.GE.AddCityBuilding(625, 918, "hill_1").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(732, 864, "hill_2").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(832, 814, "hill_3").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(517, 867, "hill_4").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(628, 810, "hill_5").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(729, 759, "hill_6").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(820, 712, "hill_7").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(478, 785, "hill_8").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(575, 733, "hill_9").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(672, 685, "hill_10").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(374, 732, "hill_11").setFlipX(true);
  Elkaisar.GE.AddCityBuilding(478, 680, "hill_12").setFlipX(true);
}


