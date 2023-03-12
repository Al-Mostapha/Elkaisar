/*______________________________________________________________________________*/
/*________________________________________-city PROFILE OBJECT___________________*/


var city_profile = {


  resource_veiw: function () {

    if (!Elkaisar.CurrentCity.City)
      return;
    if (!Elkaisar.City.getCity().Jop)
      return;
    // console.log();
    var taxs = 100 - Number(Elkaisar.CurrentCity.City["taxs"]);
    var pop = Elkaisar.CurrentCity.City.pop;
    var avail_pop = Math.max(0,
      (pop - Elkaisar.City.getCity().Jop.food -
        Elkaisar.City.getCity().Jop.wood -
        Elkaisar.City.getCity().Jop.stone -
        Elkaisar.City.getCity().Jop.metal));

    var coin = Number(Elkaisar.CurrentCity.City.coin);
    var food = Number(Elkaisar.CurrentCity.City.food);
    var wood = Number(Elkaisar.CurrentCity.City.wood);
    var stone = Number(Elkaisar.CurrentCity.City.stone);
    var metal = Number(Elkaisar.CurrentCity.City.metal);
    var coin_total = (Elkaisar.CurrentCity.City.coin_in - Elkaisar.CurrentCity.City.coin_out);
    var food_total = (Elkaisar.CurrentCity.City.food_in - Elkaisar.CurrentCity.City.food_out);
    var wood_total = (Elkaisar.CurrentCity.City.wood_in - Elkaisar.CurrentCity.City.wood_out);
    var stone_total = (Elkaisar.CurrentCity.City.stone_in - Elkaisar.CurrentCity.City.stone_out);
    var metal_total = (Elkaisar.CurrentCity.City.metal_in - Elkaisar.CurrentCity.City.metal_out);


    var output = `<table>
                            <tr>
                                <td>
                                    <div class="left" id="city-taxs-in-cp" title="الضرائب">
                                        <lable class="img" style="background-image: url(images/icons/taxs_collect.png);"></lable>
                                        <span class="count"> ${getArabicNumbers(Elkaisar.CurrentCity.City["taxs"])}% </span>
                                    </div>
                                    <div class="middle_td">
                                        <lable class="img" style="margin-left: 20px; background-image: url(images/icons/loyal.png) ; height:22px"></lable>
                                        <span class="count"> ${getArabicNumbers(Elkaisar.CurrentCity.City.loy)}/${Elkaisar.CurrentCity.City.dis_loy}</span>
                                    </div>
                                    <div class="right">
                                        <lable class="pluse" src="images/icons/plus.png" id="increase-city-loy"></lable>
                                    </div>
                                </td>
                                <td>
                                    <div class="left" title=""تعداد السكان>
                                        <lable class="img" style="background-image: url(images/style/population.png);"></lable>
                                        <span class="count">${getArabicNumbers(parseInt(pop))}</span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate rate"> ${getArabicNumbers(parseInt(avail_pop))}</span>
                                         <lable  class="pluse" src="images/icons/plus.png" id="increase-city-pop"></lable>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="resource" data-count="coin_cap" title="سعة القصر للعملات" data-cap="${Elkaisar.CurrentCity.City.coin_cap}" data-resource="coin">
                                    <div class="left">
                                         <lable class="img" style="background-image: url(images/style/coin.png);"></lable>
                                         <span class="count-wrapper ${coin >= Elkaisar.CurrentCity.City.coin_cap ? "over-rate" : "count"}"> ${Math.floor(coin)} </span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate ${coin_total > 0 ? "rate" : "rate-neg"}" data-rate="${Math.floor(coin_total)}">
                                            ${Math.floor(coin_total)}
                                        </span>
                                        <lable  class="pluse"  src="images/icons/plus.png" id="increase-city-coin"></lable>
                                    </div>
                                </td>
                                <td>
                                    <div class="buy_button">
                                        <div class="full-btn">
                                            شراء موارد
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="resource" data-count="food_cap" data-resource="food" data-cap="${Elkaisar.CurrentCity.City["food_cap"]}">
                                    <div class="left">
                                        <lable class="img" style="background-image: url(images/style/food.png);"></lable>
                                        <span class="count-wrapper ${food >= Elkaisar.CurrentCity.City.food_cap ? "over-rate" : "count"}" title="المحاصيل">
                                            ${Math.floor(food)}
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate ${food_total > 0 ? "rate" : "rate-neg"}" data-rate="${food_total}"> 
                                            ${Math.floor(food_total)}
                                        </span>
                                        <lable class="pluse" src="images/icons/plus.png" id="increase-city-food"></lable>
                                    </div>
                                </td>
                                <td class="resource" data-count="stone_cap" data-resource="stone" data-cap="${Elkaisar.CurrentCity.City["stone_cap"]}">
                                    <div class="left">
                                        <lable class="img" style="background-image: url(images/style/stone.png);"></lable>
                                        <span class="count-wrapper ${stone >= Elkaisar.CurrentCity.City.stone_cap ? "over-rate" : "count"}" title="احجار"> 
                                            ${Math.floor(stone)} 
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate ${stone_total > 0 ? "rate" : "rate-neg"}" data-rate="${stone_total}">
                                            ${Math.floor(stone_total)}
                                        </span>
                                        <lable class="pluse"   id="increase-city-stone"></lable>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="resource" data-count="wood_cap" data-resource="wood" data-cap=" ${Elkaisar.CurrentCity.City["wood_cap"]}">
                                    <div class="left">
                                        <lable class="img" style="background-image: url(images/style/wood.png);"></lable>
                                        <span class="count-wrapper ${wood >= Elkaisar.CurrentCity.City.wood_cap ? "over-rate" : "count"}" title="اخشاب">
                                            ${Math.floor(wood)}
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate ${wood_total > 0 ? "rate" : "rate-neg"}" data-rate="${wood_total}">
                                            ${Math.floor(wood_total)}
                                        </span>
                                        <lable class="pluse" src="images/icons/plus.png" id="increase-city-wood"></lable>
                                    </div>
                                </td>
                                <td class="resource" data-count="metal_cap" data-resource="metal" data-cap="${Elkaisar.CurrentCity.City["metal_cap"]}">
                                    <div class="left">
                                        <lable class="img" style="background-image: url(images/style/iron.png);"></lable>
                                        <span class="count-wrapper ${metal >= Elkaisar.CurrentCity.City.metal_cap ? "over-rate" : "count"}" title="معادن">
                                            ${Math.floor(metal)} 
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="wrapper-rate ${metal_total > 0 ? "rate" : "rate-neg"}"  data-rate="${metal_total}">
                                            ${Math.floor(metal_total)}
                                        </span>
                                        <lable class="pluse" src="images/icons/plus.png" id="increase-city-metal"></lable>
                                    </div>
                                </td>
                            </tr>
                    </table>`;
    $(".page_content").attr("data-view", "resource");
    return output;
  },
  heroList: function () {

    var output = "";
    var idCity = Number(Elkaisar.CurrentCity.City.id_city);
    for (var heroIndex in Elkaisar.DPlayer.Heros) {
      if (!Elkaisar.DPlayer.Heros[heroIndex])
        console.log()
      if (Number(Elkaisar.DPlayer.Heros[heroIndex].Hero.id_city) !== idCity)
        continue;

      var state = '<img src="images/icons/h_s_incity.png" >';
      if (parseInt(Elkaisar.DPlayer.Heros[heroIndex].Hero.id_hero) === Elkaisar.CurrentCity.City.console) {

        state = '<img src="images/icons/h_s_console.png">';
      } else if (parseInt(Elkaisar.DPlayer.Heros[heroIndex].Hero.in_city) === Elkaisar.Hero.HeroState.HERO_IN_BATTEL) {

        state = '<img src="images/icons/h_s_attack_2.png" >';

      } else if (parseInt(Elkaisar.DPlayer.Heros[heroIndex].Hero.in_city) === Elkaisar.Hero.HeroState.HERO_IN_GARISON) {

        state = '<img src="images/icons/h_s_support.png">';

      }

      output += `<li class="hero_profile" id_hero = "${Elkaisar.DPlayer.Heros[heroIndex].Hero.id_hero}" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Elkaisar.DPlayer.Heros[heroIndex].Hero.avatar]})">

                            <div class="hero_state">
                                ${state}
                            </div>
                            <div class="hero_lvl">
                                <div class="hero_lvl-box" style="float: left ;   font-size: 12px ;  color: white">
                                    ${Elkaisar.DPlayer.Heros[heroIndex].Hero.lvl}
                                </div>
                                <img src="images/icons/hero_army.png" style="float: right ;" class="modify-hero-army">
                            </div>
                        </li>`;

    }

    return output;

  },
  hero_veiw: function () {
    var output = '<ul>';
    output += this.heroList();
    output += '</ul>';
    $(".page_content").attr("data-view", "hero");
    return output;
  },
  army_veiw: function () {
    var output = `<div class="army">
                        <div class="left_army">
                            <div class="army_type" data-army="army_a">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier01.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_a >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_a >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_a >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_a)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="army_b">
                               <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier02.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_b >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_b >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_b >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_b)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="army_c">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier03.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_c >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_c >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_c >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_c)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="army_d">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier04.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_d >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_d >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_d >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_d)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="army_e">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier05.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_e >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_e >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_e >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_e)}
                                    </h6>
                               </div>
                            </div>
                            <div class="army_type" data-army="army_f">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/soldier06.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.army_f >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.army_f >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.army_f >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.army_f)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="wall_a">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/defense01.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.wall_a >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.wall_a >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.wall_a >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.wall_a)}
                                    </h6>
                                </div>
                            </div>
           
                            <div class="army_type" data-army="wall_b">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/defense02.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.wall_b >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.wall_b >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.wall_b >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.wall_b)}
                                    </h6>
                                </div>
                            </div>
                            <div class="army_type" data-army="wall_c">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/tech/defense03.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.wall_c >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.wall_c >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.wall_c >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.wall_c)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div class="right_army" >
                            <div class="army_type" data-army="spies">
                                <div class="army_img">
                                    <div class="wrapper">
                                        <lable class="img" style="background-image: url(images/items/item027.jpg);"></lable>
                                    </div>
                                </div>
                                <div  class="army_count">
                                    <h6 class="stroke ${Elkaisar.CurrentCity.City.spies >= 1e5 ? "army-over-100k" : (Elkaisar.CurrentCity.City.spies >= 1e4 ? "army-over-10k" : (Elkaisar.CurrentCity.City.spies >= 1e3 ? "army-over-1k" : ""))}">
                                        ${getArabicNumbers(Elkaisar.CurrentCity.City.spies)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>`;
    $(".page_content").attr("data-view", "army");
    return output;
  },
  wild_veiw: function () {

    var all_list = "";
    for (var iii in Elkaisar.City.getCity().Barray) {

      all_list += `<div class="wild_type">
                            <div class="wild_img" style="background-image: url(images/world/snap-shot/${Elkaisar.World.UnitTypeData[Elkaisar.City.getCity().Barray[iii].Type].WSnapShoot})">
                            </div>
                        </div>`;




    }
    var output = `<div class="wild">
                        <div class="city_wild">
                            ${all_list}
                        </div>
                </div>`;
    $(".page_content").attr("data-view", "wild");
    $(".page_content").html(output);
    return output;
  },
  refresh_resource_view: function () {

    var page = $(".page_content");
    if (page.attr("data-view") === "resource") {

      page.html(this.resource_veiw());

    }

  },
  refresh_wild_view: function () {

    var page = $(".page_content");
    if (page.attr("data-view") === "wild") {

      page.html(this.wild_veiw());

    }

  },
  refresh_hero_view: function () {

    var page = $(".page_content");
    if (page.attr("data-view") === "hero") {

      $(".page_content ul").html(this.heroList());

      if ($(".page_content ul").getNiceScroll(0)) {
        $(".page_content ul").getNiceScroll(0).resize();
      }


    }

  },
  refresh_city_resources: function () {


    if (!Elkaisar.CurrentCity.City)
      return;
    if (!Elkaisar.CurrentCity.City.id_city)
      return;
    const idCity = Elkaisar.CurrentCity.City.id_city;
    return $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACity/refreshCityBase`,
      data: {
        idCity: idCity,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.Base.Error(data);
        var json_data = JSON.parse(data);
        Elkaisar.City.getCity(idCity).City = json_data;
        city_profile.refresh_resource_view();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  },

  startIncreasePop: function () {
  },
  updateCityPop: function (time_out) {

  },
  refresh_city_storage: function () {

    return $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityStorage/getCityStorage`,
      data: {
        idCity: Elkaisar.CurrentCity.City.id_city,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) { },
      success: function (data, textStatus, jqXHR) {

        if (isJson(data)) {

          Elkaisar.CurrentCity.Storage = JSON.parse(data);

          Elkaisar.CurrentCity.City.food_cap = Number(Elkaisar.CurrentCity.Storage.food_storage_ratio * Elkaisar.CurrentCity.Storage.total_cap / 100);
          Elkaisar.CurrentCity.City.wood_cap = Number(Elkaisar.CurrentCity.Storage.wood_storage_ratio * Elkaisar.CurrentCity.Storage.total_cap / 100);
          Elkaisar.CurrentCity.City.stone_cap = Number(Elkaisar.CurrentCity.Storage.stone_storage_ratio * Elkaisar.CurrentCity.Storage.total_cap / 100);
          Elkaisar.CurrentCity.City.metal_cap = Number(Elkaisar.CurrentCity.Storage.metal_storage_ratio * Elkaisar.CurrentCity.Storage.total_cap / 100);

          city_profile.refresh_resource_view();
        } else {
          Elkaisar.LBase.Error(data);
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  },
  refresh_army_view: function () {
    if ($("#city-profile .page_content").attr("data-view") !== "army") {
      return;
    }
    $("#city-profile .army .army_type").each(function () {
      $(this).children(".army_count").children("h6").html(getArabicNumbers(Elkaisar.CurrentCity.City[$(this).data("army")]));
    });
  },
  afterBattelFinish: function () {

    var min_time = 9999 * 9999 * 9999;
    for (var iii in Elkaisar.Battel.Battels) {
      if (min_time > Number(Elkaisar.Battel.Battels[iii].time_end)) {
        min_time = Number(Elkaisar.Battel.Battels[iii].time_end);
      }
    }

    if (min_time - Date.now() / 1000 < 30 && Elkaisar.Battel.Battels.length >= 1) {
      return;
    }

    const idCity = Elkaisar.CurrentCity.City.id_city;

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACity/afterBattelFinishRefresh`,
      data: {
        idCity: idCity,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {},
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        
        var json_data = JSON.parse(data);
        Elkaisar.City.getCity(idCity).City = json_data.City;
        city_profile.refresh_resource_view();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  },
};



$(document).on("click", "#city-taxs-in-cp", function () {

  buildingClick(cityHasType(BUILDING_TYPS.PALACE));
  $("#dialg_box .nav_bar .left-nav li[head_title=taxs]").click();
  //Crafty.audio.play("click_sound");

});


// show  the hero  profile

$(document).on("click", ".hero_profile", function () {
  // get hero id 
  var id_hero = Number($(this).attr("id_hero"));
  // get hero object from city  heros array
  var hero_object;

  Elkaisar.CurrentHero = Elkaisar.Hero.getHero(id_hero);
  var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero);
  var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language], NavBar.Hero, content);

  dialogBoxShow(dialog_box, function () {
    army.getCurrentArmy(Elkaisar.CurrentHero);
    $(".scrollable").niceScroll(SCROLL_BAR_PROP);
    $("#dialg_box").attr("type", "hero");
    $("#dialg_box .nav_bar .left-nav ul li[head_title=camp]").click();
  });
});


$(document).on("click", "#city-profile .hero_profile .modify-hero-army", function (e) {

  e.stopPropagation();
  // get hero id 
  var id_hero = $(this).parents(".hero_profile").attr("id_hero");

  // get hero object from city  heros array
  Elkaisar.CurrentHero = Elkaisar.Hero.getHero(id_hero);

  for (var iii in Elkaisar.DPlayer.Heros) {
    if (Number(Elkaisar.CurrentHero.Hero.id_hero) !== Number(Elkaisar.DPlayer.Heros[iii].id_hero)) {
      Elkaisar.NextHero = Elkaisar.DPlayer.Heros[iii];
      break;
    }

  }
  var content = army.dialogBoxContent_forHeroTrade(Elkaisar.CurrentHero);
  var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language], NavBar.Hero, content);

  dialogBoxShow(dialog_box, function () {


    $(".scrollable").niceScroll(SCROLL_BAR_PROP);
    $("#dialg_box").attr("type", "hero");
    $("#dialg_box .nav_bar .left-nav ul li[head_title=trade]").click();

  });


});


// navigate through city profile
$("#city-profile .upper_nave_bar ul li").click(function () {
  var show = $(this).attr("show");

  if ($(".page_content ul").getNiceScroll(0)) {

    $(".page_content ul").getNiceScroll(0).remove();
  }

  switch (show) {
    case "default":
      var page_content = city_profile.resource_veiw();
      $(".page_content").html(page_content);
      break;
    case "hero":
      var page_content = city_profile.hero_veiw();
      $(".page_content").html(page_content);
      $(".page_content ul").niceScroll(SCROLL_BAR_PROP);

      break;
    case "army":
      var page_content = city_profile.army_veiw();
      $(".page_content").html(page_content);
      break;

    case 'wild':

      var page_content = city_profile.wild_veiw();
      $(".page_content").html(page_content);
      break;

  }
  //Crafty.audio.play("click_sound");
});