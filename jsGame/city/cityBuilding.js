Elkaisar.Building.verfiyCondetion = function (BuildingType, BuildingLvl) {

  var LvlReq = Elkaisar.Building.BuildingData[BuildingType].lvlRequirment[Math.min(BuildingLvl, 29)].condetion;

  var condetion = [];

  for (var iii in LvlReq) {
    var verfied = true;
    var text = "";

    if (LvlReq[iii].type === "building") {
      if (Building.BuildingWithMaxLvl(LvlReq[iii].BuildingType) < LvlReq[iii].lvl)
        verfied = false;
      text = `${BuildingConstData[LvlReq[iii].BuildingType].title} مستوى ${LvlReq[iii].lvl}`

    } else if (LvlReq[iii].type === "item") {
      if (Matrial.getPlayerAmount(LvlReq[iii].item) < LvlReq[iii].amount)
        verfied = false;
      text = `${LvlReq[iii].amount} ${Matrial.getMatrialName(LvlReq[iii].item)}`;
    } else if (LvlReq[iii].type === "population") {
      if (Elkaisar.CurrentCity.City.pop < LvlReq[iii].amount)
        verfied = false;
      text = `${LvlReq[iii].amount} سكان`;
    }
    condetion.push({
      Txt: text,
      verfied: verfied
    });
  }

  return condetion;
};

Elkaisar.Building.refreshView = function () {
  buildingClick($(".box_content").attr("data-building-place"), true);
};




Elkaisar.Building.Theater.RefreshTheaterListView = function (BuildingPlace) {

  if (!Elkaisar.CurrentCity.HeroTheater)
    Elkaisar.CurrentCity.HeroTheater = {
      lastUpdate: $.now() / 1000,
      refreshTime: 0,
      HeroList: []
    };
  var all_heros = "";
  var left_content = "";
  var right_nav = `   <div class="time-to-refresh">
                            <label>وقت التحديث:</label>
                            <label class="time_counter refresh_hero_counter"  time-end="${Number(Elkaisar.CurrentCity.HeroTheater.lastUpdate) + Number(Elkaisar.CurrentCity.HeroTheater.refreshTime)}">
                                ${changeTimeFormat(Number(Elkaisar.CurrentCity.HeroTheater.lastUpdate) + Number(Elkaisar.CurrentCity.HeroTheater.refreshTime) - $.now() / 1000)}
                            </label>
                        </div>`;
  var heros = Elkaisar.CurrentCity.HeroTheater.HeroList;

  $(".right-nav").html(right_nav);

  for (var iii = 0; iii < 10; iii++) {

    if (heros && heros[iii]) {

      all_heros += `  <div class="tr" data-id-hero-theater="${heros[iii].id_hero}">
                                <div class="td_1">${Elkaisar.BaseData.HeroTheaterName[heros[iii].name]}</div>
                                <div class="td_2">${heros[iii].lvl}</div>
                                <div class="td_3">${heros[iii].ultra_p}</div>
                                <div class="td_4">${(parseInt(heros[iii].lvl) + 20)} </div>
                                <div class="td_5">${(parseInt(heros[iii].lvl) + 15)}</div>
                                <div class="td_6">${(parseInt(heros[iii].lvl) + 16)} </div>
                                <div class="td_7">${(parseInt(heros[iii].lvl) * 10)} </div>
                                <div class="td_8">${(parseInt(heros[iii].lvl) * 1000)} </div>
                                <div class="td_9">
                                    <button class="full-btn full-btn-1x ellipsis show-hero-theater" data-hero='${JSON.stringify(heros[iii])}'>${Translate.Button.MenuList.View[UserLag.language]}</button>
                                </div>

                             </div>`;

    } else {

      all_heros += '<div class="tr"></div>';

    }

  }




  left_content += `       <div class="left-content theater full">
                                <div class="th">
                                   <div class="td_1 ellipsis">${Translate.Title.TH.Hero[UserLag.language]}</div>
                                   <div class="td_2 ellipsis">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                                   <div class="td_3 ellipsis">${Translate.Title.TH.Potential[UserLag.language]}</div>
                                   <div class="td_4 ellipsis">${Translate.Title.TH.Sway[UserLag.language]}</div>
                                   <div class="td_5 ellipsis">${Translate.Title.TH.Bravery[UserLag.language]}</div>
                                   <div class="td_6 ellipsis">${Translate.Title.TH.Parry[UserLag.language]}</div>
                                   <div class="td_7 ellipsis">${Translate.Title.TH.Retainer[UserLag.language]}</div>
                                   <div class="td_8 ellipsis">${Translate.Title.TH.SignUpFee[UserLag.language]}</div>
                                   <div class="td_9 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                  ${all_heros}
                            </div>`;

  $(".box_content").replaceWith(`<div class="box_content building_theater for_building_box" data-building-type="${Elkaisar.CurrentCity.BuildingType[BuildingPlace]}" data-building-place="${BuildingPlace}" data-building-lvl="${Elkaisar.CurrentCity.BuildingLvl[BuildingPlace]}">` + left_content + '</div>');


};

$(document).on("click", ".for_building .nav_bar .left-nav ul li", function () {

  $("#dialg_box .scroll").getNiceScroll().remove();
  var head_title = $(this).attr("head_title");
  var building_place = $(document.getElementById("dialg_box")).children(".box_header").attr("place");
  var building_lvl = Number($(document.getElementById("dialg_box")).children(".box_header").attr("lvl"));
  var building_type = Number($(document.getElementById("dialg_box")).children(".box_header").attr("type"));

  switch (head_title) {
    case "motiv":

      $(".box_content").replaceWith(Building.dialogBoxContent_forpalace());
      break;

    /*________________________________________________________________________*/

    case "city_name":
      var left_content = `<div class="left-content ">
                                <h1 style="margin-bottom: 30px;">تعديل اسم المدينة</h1>
                                <h1 style="margin-bottom: 30px;">ادخل الاسم الجديد</h1>
                                <div class="li">
                                    <input type="text" style="width: 60%; display:block ; margin: 5px auto" value="${Elkaisar.CurrentCity.City.name}" id="city-name-val" class="input"/>
                                </div>
                                <div class="btn_2">
                                    <button class="full-btn full-btn-2x full" id="change-city-name">${Translate.Button.Building.Confirm[UserLag.language]}</button>
                                </div>
                            </div>`;
      var right_content = `<div class="right-content ">
                                <h1 class="header-1">
                                   تعديل اسم المدينة
                                </h1>
                                <p>
                                   من هنا تستطيع تغير اسم مدينتك
                                </p>
                            </div>`;
      $(".box_content").html(left_content + right_content);
      break;

    /*________________________________________________________________________*/
    case "taxs":
      var left_content = `<div class="left-content ">
                                <h1 style="margin-bottom: 30px;">تعديل  الضريبة</h1>
                                <h1 > عدد السكان: &nbsp;&nbsp;&nbsp;&nbsp;${getArabicNumbers(Elkaisar.CurrentCity.City.pop)}</h1>
                                <h1 > نسبة الولاء: &nbsp;&nbsp;&nbsp;&nbsp;<span id="loy-in-city">${getArabicNumbers(100 - Elkaisar.CurrentCity.City.taxs)}</span></h1>
                                <h1 style="margin-bottom: 30px;">مقدار الضرائب</h1>
                                <div class="li">
                                    <input type="text" max="100"  min="0" style="width: 60%; display:block ;" value="${Elkaisar.CurrentCity.City.taxs}" class="only_num numeric input pull-L"  id="city-name-val"/>
                                    <div class="number-arrow-wrapper pull-L">
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                </div>
                                <div class="btn_2">
                                    <button class="full-btn full-btn-2x full" id="change-city-taxs">${Translate.Button.Building.Confirm[UserLag.language]}</button>
                                </div>
                            </div>`;
      var right_content = `<div class="right-content ">
                                <h1 class="header-1">
                                   تعديل الضريبة فى  المدينة
                                </h1>
                                <p>
                                   من هنا تستطيع تغير الضريبة فى المدينة مدينتك<br>
                                   الضريبة المتحصلة من السكان <span id="collected-taxs">${getArabicNumbers(Math.floor(Elkaisar.CurrentCity.City.pop * Elkaisar.CurrentCity.City.taxs / 100))}</span> عملة  بالساعة <br>
                                   زيادة الضرائب فى المدينة تعنى زيادة عملات سسترسس!<br>
                                   كلما زاد عدد السكان زاد انتاج العملات فى المدينة
                                </p>
                               
                            </div>`;
      $(".box_content").html(left_content + right_content);
      break;



    /*________________________________________________________________________*/
    case "production":

      var left_content = Palace.productionReport();
      $(".box_content").html(left_content);
      $("#scroll-production-report").niceScroll(SCROLL_BAR_PROP);

      break;
    /*________________________________________________________________________*/

    case "expantion":
      var left_content = ` <div class="left-content ">
                                <div class="li">
                                    <h5>${Translate.Button.Building.ExpandCity[UserLag.language]}</h5>
                                    <p>
                                        توسيع المدينة للمستوى الثانى للحصول على    12 اماكن اضافية <br/>
                                    </p>
                                    <h5>المستوى الحالى </h5>
                                    <p>
                                        المستوى احالى يتيح لك ${getArabicNumbers(22 + 12 * Elkaisar.CurrentCity.City.lvl)} مكان خالى <br/>
                                    </p>
                                    <h5>اعلى مستوى</h5>
                                    <p>
                                         يتيح لك المستوى الرابع 55 مكان خالى<br/>
                                    </p>
                                </div>
                            </div>`;
      var right_content = `<div class="right-content ">
                                <h1 class="header-1">  
                                    توسيع المدينة الى مستوى ${getArabicNumbers(parseInt(Elkaisar.CurrentCity.City.lvl) + 1)}
                                </h1>   
                                 <div id="req-table-wrapper">
                                    <table class="req_table expantion-req-table" border="0">        
                                        <thead>             
                                            <tr>               
                                                <td colspan="2" style="direction: rtl">     
                                                    <ol> 
                                                        <li class="${Number(Elkaisar.City.getCity().BuildingLvl.palace) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 4 ? "enough" : "not_enough"}">
                                                            القصر مستوى ${getArabicNumbers((Number(Elkaisar.CurrentCity.City.lvl) + 1) * 4)}
                                                        </li>     
                                                        <li class="${Matrial.getPlayerAmount("expan_plan") >= Math.pow(2, Elkaisar.CurrentCity.City.lvl) ? "enough" : "not_enough"}">
                                                            خطة توسيع ${getArabicNumbers(Math.pow(2, Elkaisar.CurrentCity.City.lvl))}
                                                        </li>     
                                                    </ol>          
                                                </td>           
                                            </tr>      
                                        </thead>       
                                        <tbody>         
                                            <tr>         
                                                <td>       
                                                    <img src="images/style/food.png">     
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.food) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000 ? "enough" : "not_enough"}">
                                                        ${getArabicNumbers((Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000)}
                                                    </div> 
                                                </td>    
                                                <td>         
                                                    <img src="images/style/iron.png">   
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.metal) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000 ? "enough" : "not_enough"}"> 
                                                        ${getArabicNumbers((parseInt(Elkaisar.CurrentCity.City.lvl) + 1) * 3000)}              
                                                    </div>
                                                </td>              
                                            </tr>        
                                            <tr>          
                                                <td>      
                                                    <img src="images/style/wood.png">   
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.wood) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000 ? "enough" : "not_enough"}">     
                                                        ${getArabicNumbers((parseInt(Elkaisar.CurrentCity.City.lvl) + 1) * 3000)}               
                                                    </div>                
                                                </td>        
                                                <td>       
                                                    <img src="images/style/stone.png">     
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.stone) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000 ? "enough" : "not_enough"}">      
                                                        ${getArabicNumbers((parseInt(Elkaisar.CurrentCity.City.lvl) + 1) * 3000)}               
                                                    </div>                 
                                                </td>      
                                            </tr>          
                                            <tr>             
                                                <td>          
                                                    <img src="images/style/coin.png">  
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.coin) >= (Number(Elkaisar.CurrentCity.City.lvl) + 1) * 3000 ? "enough" : "not_enough"}">   
                                                        ${getArabicNumbers((parseInt(Elkaisar.CurrentCity.City.lvl) + 1) * 3000)}                
                                                    </div>   
                                                </td>        
                                                <td>         
                                                    <img src="images/style/wait.png">  
                                                    <div class="amount">انهاء فى الحال</div> 
                                                </td>          
                                            </tr>  
                                        </tbody>
                                    </table>
                                </div>
                                <div id="expan-city">
                                    <button  class="full-btn full-btn-1x ellipsis full ${Palace.isExpanable() ? "" : "disabled"}" ${Palace.isExpanable() ? "" : "disabled='disabled'"}>${Translate.Button.Building.ExpandCity[UserLag.language]}</button>
                                </div>
                            </div>`;


      if (Elkaisar.CurrentCity.City.lvl > 2) {
        right_content = `<div class="right-content ">
                                                    <h1 class="header-1">لا يمكنك توسيع المدينة المستوى الحالى اعلى مستوى</h1>   
                                                </div>`;
      }

      $(".box_content").html(left_content + right_content);
      break;


    case "city_wilds":

      var wilds = Elkaisar.CurrentCity.City.wild;
      var all_list = "";

      for (var index in wilds) {

        all_list += `<li data-unit-type="${wilds[index].t}"  data-x-coord="${wilds[index].x}" data-y-coord="${wilds[index].y}">
                            <div>
                                <h1>${getUnitTitle(wilds[index].t)}</h1>
                            </div>
                            <div>
                                <h1>[ ${getArabicNumbers(wilds[index].x)} , ${getArabicNumbers(wilds[index].y)}]</h1>
                            </div>
                            <div>
                                <h1>${getArabicNumbers(wilds[index].l)}</h1>
                            </div>
                            <div>
                                <button class="full-btn full-btn-1x ellipsis abandon">تخلى</button>
                            </div>
                        </li>`;

      }

      var content = ` <div id="palace_content" class="box_content">
                    <div class="left-content ">
                        <h1> قائمة البرارى</h1>
                    <p>
                        من هنا تسطيع عرض البرارى المملوكة<br>
                        <br>
                        <br>
                        
                    </p>
                    <h1>ملحوظة:</h1>
                    <p>
                          لا يمكنك امتلاك اكثر من ${Elkaisar.City.getCity().BuildingLvl.palace > 10 ? getArabicNumbers(10) : getArabicNumbers(Elkaisar.City.getCity().BuildingLvl.palace)} برارى
                    </p>
                    </div>
                    <div class="right-content">
                        <div class="th">
                            <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%">${Translate.Title.TH.Wilderness[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width: 24%;">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width: 24%;">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width: 24%;"> ${Translate.Button.General.Action[UserLag.language]} </div>

                        </div>
                        <ol id="bar_list">
                             ${all_list}
                        </ol>
                    </div>
                </div>`;
      $(".box_content").replaceWith(content);
      $("#bar_list").niceScroll(SCROLL_BAR_PROP);
      Elkaisar.City.getCityBarray().done(data => {
            if (isJson(data)) {
              var json_data = JSON.parse(data);
            } else {
              Elkaisar.LBase.Error(data);
              return;
            }
            Elkaisar.CurrentCity.City.wild = json_data;

            var all_list = "";

            for (var index in json_data) {

              all_list += `<li data-unit-type="${json_data[index].ut}"  data-x-coord="${json_data[index].x}" data-y-coord="${json_data[index].y}">
                                <div>
                                    <h1>${getUnitTitle(json_data[index].ut)}</h1>
                                </div>
                                <div>
                                    <h1>[ ${getArabicNumbers(json_data[index].x)} , ${getArabicNumbers(json_data[index].y)}]</h1>
                                </div>
                                <div>
                                    <h1>${getArabicNumbers(json_data[index].l)}</h1>
                                </div>
                                <div>
                                    <button class="full-btn full-btn-1x ellipsis abandon">تخلى</button>
                                </div>
                            </li>`;

            }

            var content = ` <div id="palace_content" class="box_content">
                        <div class="left-content ">
                            <h1> قائمة البرارى</h1>
                        <p>
                            من هنا تسطيع عرض البرارى المملوكة<br>
                            <br>
                            <br>
                            
                        </p>
                        <h1>ملحوظة:</h1>
                        <p>
                          لا يمكنك امتلاك اكثر من ${Elkaisar.City.getCity().BuildingLvl.palace > 10 ? getArabicNumbers(10) : getArabicNumbers(Elkaisar.City.getCity().BuildingLvl.palace)} برارى
                        </p>
                        </div>
                        <div class="right-content">
                            <div class="th">
                                <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%">${Translate.Title.TH.Wilderness[UserLag.language]}</div>
                                <div class="td_2 ellipsis" style="width: 24%;">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                                <div class="td_3 ellipsis" style="width: 24%;">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                                <div class="td_5 ellipsis" style="width: 24%;"> ${Translate.Button.General.Action[UserLag.language]} </div>
                            </div>
                            <ol id="bar_list">
                              ${all_list}
                            </ol>
                        </div>
                    </div>`;
            $(".box_content").replaceWith(content);
            $("#bar_list").niceScroll(SCROLL_BAR_PROP);
          })

      break;

    case "city_garrison":
      $('#palace_content').html(Palace.cityGarrison());
      break;
    /*________________________________________________________________________*/
    case "upgrade_req":
      var table_req = getReqTable(building_type, building_lvl);
      var ar_title = BuildingConstData[building_type].title;
      var left_content = '<div class="left-content " style="width: 28%">'
        + '<div class="li">'
        + upgradeBenefits(Number(building_type), Number(building_lvl))
        + '</div>'
        + '</div>';
      var right_content = `<div class="right-content" style="width: 72%">
                                        <h1 class="header-1">
                                         ${building_lvl < 30 ? `تطوير ${ar_title} الى مستوى ${(Number(building_lvl) + 1)} يتطلب ` : "المبنى فى اعلى مستوياته ولا يمكن تطويره"}
                                        </h1>
                                        ${table_req}
                                    </div>`;
      $(".box_content").html(left_content + right_content);
      break;

    /*______________________________________MILIRETY BUILDINGS__________________*/
    case "go_stabl":

      var found = false;
      for (var building_place in Elkaisar.City.getCity().BuildingType) {
        if (parseInt(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.STABL) {
          buildingClick(building_place, true);
          found = true;
          break;
        }
      }
      if (found === false) {
        alert_box.confirmMessage("لا يوجد  اسطبل  فى المدينة");
      }
      break;

    case "go_workShop":

      var found = false;
      for (var building_place in Elkaisar.City.getCity().BuildingType) {
        if (parseInt(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.WORKSHOP) {
          buildingClick(building_place, true);
          found = true;
        }
      }
      if (found === false) {
        alert_box.confirmMessage("لا يوجد ورش عمل  فى المدينة");
      }
      break;

    case "go_thaknat":

      var found = false;
      for (var building_place in Elkaisar.City.getCity().BuildingType) {
        if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.BARRACKS) {
          buildingClick(building_place, true);
          found = true;
          break;
        }
      }
      if (found === false) {
        alert_box.confirmMessage("لا يوجد  ثكنات  فى المدينة");
      }
      break;

    case "build_army":

      var building_place = $(document.getElementById("dialg_box")).children(".box_header").attr("place");
      getContentForBuilding(building_place);

      //$(".box_content").replaceWith(content);

      break;

    case "go_uni":

      var found = false;
      for (var building_place in Elkaisar.City.getCity().BuildingType) {
        if (parseInt(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.UNIVERSITY) {
          buildingClick(building_place, true);
          found = true;
          break;
        }
      }
      if (found === false) {
        alert_box.confirmMessage("لا يوجد  جامعة  فى المدينة");
      }

      break;

    case "go_acad":

      var found = false;
      for (var building_place in Elkaisar.City.getCity().BuildingType) {
        if (parseInt(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.ACADEMY) {
          buildingClick(building_place, true);
          found = true;
          break;
        }
      }
      if (found === false) {
        alert_box.confirmMessage("لا يوجد  اكاديمية  فى المدينة");
      }

      break;
    case "acad_tech":
      $(".box_content").replaceWith(Building.dialogBoxContent_for_acad());
      break;
    case "uni_tech":
      $(".box_content").replaceWith(Building.dialogBoxContent_forUni());
      break;



    /*               HELPER     IN WOR SHIP             */
    case "choose_helper":

      $(".box_content").replaceWith(Building.dialogBoxContnet_forworship());

      break;



    /*            WOUNDED  SOLIDIER IN BLAZA       */
    case "wounded_forces":

      Building.dialogBoxContnet_forblaza();

      break;

    case "wall_army_list":
      var wall_army = [
        {
          type: "wall_a",
          amount: Elkaisar.CurrentCity.City.wall_a,
          image: "images/tech/defense01.jpg",
          title: "كمائن"
        }, {
          type: "wall_b",
          amount: Elkaisar.CurrentCity.City.wall_b,
          image: "images/tech/defense02.jpg",
          title: "ابراج"
        }, {
          type: "wall_c",
          amount: Elkaisar.CurrentCity.City.wall_c,
          image: "images/tech/defense03.jpg",
          title: "ابراج"
        }
      ];
      var content = Building.dialogBoxContent_forMili(wall_army, "wall");

      $(".box_content").replaceWith(content);
      break;

    case "jop_list":

      $(".box_content").replaceWith(Building.dialogBoxContent_forjop(BUILDING_TYPS.FARM, "farm"));
      break;

    case "refresh_hero_with_mat":

      BoxOfMatrialToUse(['rec_letter'], "refresh_theater_with_mat", 1);
      break;
    case "produce_heros":

      buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
      break;


    case "sell_buy_resources":

      $("#dialg_box .box_content").replaceWith(Market.dialogBoxContent("food"))
      break;


    case "transport_resources":

      $("#dialg_box .box_content").replaceWith(Market.transportResources());
      break;

    case "storage_management":
      getContentForBuilding(building_place);
      break;


    case "matrial_trade":

      $("#dialg_box .box_content").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList, 0));

      TradeCenter.getTradeList(0).done(function () {
        $("#dialg_box .box_content").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList, 0));
      });
      break;
    case "equip_trade":

      alert_box.confirmMessage("لم يتم تفعيلها بعد");
      break;
    case "resource_trade":

      alert_box.confirmMessage("لم يتم تفعيلها بعد");
      break;
    case "hero_trade":

      alert_box.confirmMessage("لم يتم تفعيلها بعد");

      break;
  }


});






/*______________________________________UPGRADE BUILing________________________*/

/*_________________________show upgrade table of requires________________*/
$(document).on("mouseenter", ".upgrade-btn", function () {
  if (!$(this).hasClass("hover")) {
    $(this).addClass("hover");
    $(this).parent(".box_header").next(".upgrade_req_tooltip").show();
  }
});
$(document).on("mouseleave", ".upgrade-btn", function () {
  if ($(this).hasClass("hover")) {
    $(this).removeClass("hover");
    $(this).parent(".box_header").next(".upgrade_req_tooltip").hide();
  }
});



/*UPGRADE BULDING*/

$(document).on("click", ".upgrade-btn", function () {

  if ($(this).hasClass("disabled"))
    return;

  var building_type = $(".box_header").attr("type");
  var building_lvl = $(".box_header").attr("lvl");
  var building_place = $(".box_header").attr("place");
  var building_ob = building_type;
  var id_city = Elkaisar.CurrentCity.City.id_city;
  var self_ = $(this);

  var upgrading_num = 0;

  for (var iii in Elkaisar.TimedTask.TaskList.Building) {

    if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city)) {

      upgrading_num++;

    }


  }

  /* if more than 3 building are upgrading*/
  if (Number(Elkaisar.DPlayer.PlayerState.motiv) > Math.floor(Date.now() / 1000)) {

    if (upgrading_num > 2) {

      alert_box.confirmMessage("لا يمكنك تطوير اكثر من 3 مبانى فى نفس الوقت");
      return;
    }

  } else {

    if (upgrading_num > 0) {


      alert_box.confirmDialog("عدد البنائين واحد فقط عليك تشغيل خطبة تحفيزية لزيادة عدد البنائين الى ثلاثة", function () {

        var matrial_to_use = [
          "motiv_60",
          "motiv_7"
        ];

        BoxOfMatrialToUse(matrial_to_use, "add_city_builder");

      });
      return;
    }

  }


  if (Building.isUpgradable(building_type, building_lvl) !== true) {
    alert_box.confirmMessage("لا يمكنك تطوير المبنى الحالى ");
    buildingClick(building_place, true);
    return;
  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/upgrade`,
    data: {
      idCity: Elkaisar.CurrentCity.City.id_city,
      buildingPlace: building_place,
      templePlace: cityHasType(BUILDING_TYPS.WORSHIP),
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },

    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!isJson(data)) {
        Elkaisar.LBase.Error(data);
        alert_box.confirmMessage("حدث خطاء");
        buildingClick(building_place, true);
        return;
      }


      var json_data = JSON.parse(data);

      if (json_data.state === "ok") {

        for (var iii in Elkaisar.TimedTask.TaskList.Building)
          if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city))
            delete (Elkaisar.TimedTask.TaskList.Building[iii]);
        for (var iii in json_data.list)
          Elkaisar.TimedTask.TaskList.Building[json_data.list[iii].id] = json_data.list[iii];


        buildingClick(building_place, true);
        fillCityWithBuilding();
        Elkaisar.TimedTask.refreshListView();

        if (Number(building_type) === BUILDING_TYPS.PALACE && Number(building_lvl) >= 25) {
          Matrial.takeFrom("law_3", 5);
        } else if (Number(building_type) === BUILDING_TYPS.PALACE && Number(building_lvl) >= 25) {
          Matrial.takeFrom("law_2", 5);
        } else if (Number(building_type) === BUILDING_TYPS.PALACE && Number(building_lvl) >= 10) {
          var amount_array = [5, 5, 5, 8, 8, 8, 10, 10, 10, 10];
          Matrial.takeFrom("law_1", amount_array[building_lvl - 10]);
        }

        Elkaisar.City.getCityBase();

      } else if (json_data.state === "error_0") {
        alert_box.failMessage("لا يوجد بنائين فى المدينة");
      } else if (json_data.state === "error_1") {
        alert_box.failMessage("عليك توظيف المزيد من البنائين");
      } else if (json_data.state === "error_2") {
        alert_box.failMessage("شروط البناء غير كافية");
        console.log(data);
      } else if (json_data.state === "error_3") {
        alert_box.failMessage("اقصى مستوى للوصول اليه هو 30");
      } else {

        alert_box.confirmMessage("حدث خطأ");

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });





});



/*DOWNGRADE BULDING*/

$(document).on("click", "#downgrade-building-lvl", function () {

  if (!$(this).hasClass("disabled")) {

    var building_type = $('#dialg_box .box_header').attr("type");
    var building_lvl = $('#dialg_box .box_header').attr("lvl");
    var building_place = $('#dialg_box .box_header').attr("place");
    var building_ob = building_type;
    var id_city = Elkaisar.CurrentCity.City.id_city;
    var self_ = $(this);

    var upgrading_num = 0;
    for (var iii in Elkaisar.TimedTask.TaskList.Building) {

      if (Elkaisar.TimedTask.TaskList.Building[iii].task === "building" && Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city)) {

        upgrading_num++;

      }


    }

    /* if more than 3 building are upgrading*/
    if (Number(Elkaisar.DPlayer.PlayerState.motiv) > Math.floor(Date.now() / 1000)) {

      if (upgrading_num > 2) {

        alert_box.confirmMessage("لا يمكنك تطوير اكثر من 3 مبانى فى نفس الوقت");
        return;
      }

    } else {

      if (upgrading_num > 0) {


        alert_box.confirmDialog("عدد البنائين واحد فقط عليك تشغيل خطبة تحفيزية لزيادة عدد البنائين الى ثلاثة", function () {

          var matrial_to_use = [
            "motiv_60",
            "motiv_7"
          ];

          BoxOfMatrialToUse(matrial_to_use, "add_city_builder");

        });
        return;
      }

    }


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/downgrade`,
      data: {
        idCity: Elkaisar.CurrentCity.City.id_city,
        buildingPlace: building_place,
        templePlace: cityHasType(BUILDING_TYPS.WORSHIP),
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },

      type: 'POST',
      success: function (data, textStatus, jqXHR) {

        if (!isJson(data)) {
          Elkaisar.LBase.Error(data);
          alert_box.confirmMessage("حدث خطاء");
          buildingClick(building_place, true);
          return;
        }


        var json_data = JSON.parse(data);

        if (json_data.state === "ok") {

          for (var iii in Elkaisar.TimedTask.TaskList.Building)
            if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city))
              delete (Elkaisar.TimedTask.TaskList.Building[iii]);
          for (var iii in json_data.list)
            Elkaisar.TimedTask.TaskList.Building[json_data.list[iii].id] = json_data.list[iii];


          buildingClick(building_place, true);
          fillCityWithBuilding();
          Elkaisar.TimedTask.refreshListView();

        } else if (json_data.state === "error_0") {
          alert_box.failMessage("لا يوجد بنائين فى المدينة");
        } else if (json_data.state === "error_1") {
          alert_box.failMessage("عليك توظيف المزيد من البنائين");
        } else if (json_data.state === "error_2") {
          alert_box.failMessage("شروط البناء غير كافية");
        } else if (json_data.state === "error_3") {
          alert_box.failMessage("اقصى مستوى للوصول اليه هو 30");
        } else {

          alert_box.confirmMessage("حدث خطأ");

        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });



  }

});



/*  cancel upgrading building  */
$(document).on("click", "#cansel-building-upgrade", function () {

  var building_place = $('#dialg_box .box_header').attr("place");
  var idWorking = $(this).attr("data-id-task");

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/cancelUpgradeing`,
    data: {
      idCity: Elkaisar.CurrentCity.City.id_city,
      idWorking: idWorking,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },

    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!isJson(data)) {
        Elkaisar.LBase.Error(data);
        alert_box.confirmMessage("حدث خطاء");
        buildingClick(building_place, true);
        return;
      }


      var json_data = JSON.parse(data);

      if (json_data.state === "ok") {

        for (var iii in Elkaisar.TimedTask.TaskList.Building)
          if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city))
            delete (Elkaisar.TimedTask.TaskList.Building[iii]);
        for (var iii in json_data.list)
          Elkaisar.TimedTask.TaskList.Building[json_data.list[iii].id] = json_data.list[iii];


        buildingClick(building_place, true);
        fillCityWithBuilding();
        Elkaisar.TimedTask.refreshListView();

        Elkaisar.City.getCityBase();

      } else if (json_data.state === "error_0") {
        alert_box.failMessage("لا يوجد بنائين فى المدينة");
      } else if (json_data.state === "error_1") {
        alert_box.failMessage("عليك توظيف المزيد من البنائين");
      } else if (json_data.state === "error_2") {
        alert_box.failMessage("شروط البناء غير كافية");
      } else if (json_data.state === "error_3") {
        alert_box.failMessage("اقصى مستوى للوصول اليه هو 30");
      } else {

        alert_box.confirmMessage("حدث خطأ");

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
});



/*downgradde building*/
$(document).on("click", "#building-lvl-down", function () {

  var place = $(".box_header").attr("place");
  alert_box.downGradeBuilding(place);

});


$(document).on("click", ".acce-upgrade-btn", function () {
  var idTask = $(this).attr("data-id-task");
  var matrial_to_use = [
    "archit_a",
    "archit_b",
    "archit_c",
    "archit_d"
  ];

  BoxOfMatrialToUse(matrial_to_use, "building_acce", 1, idTask);

});



/*   if accelerated from the task bar */

$(document).on("click", ".reduce-time-for-building img", function () {



  var idTask = $(this).attr("data-id-task");
  var matrial_to_use = [
    "archit_a",
    "archit_b",
    "archit_c",
    "archit_d"
  ];

  BoxOfMatrialToUse(matrial_to_use, "building_acce", 1, idTask);




});