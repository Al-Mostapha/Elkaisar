var DailyTradeMatrialPlayer = {};
var EXCHANGE_ITEM;
const RESOURCE_IMAGE = {
  coin: "images/style/coin.png",
  food: "images/style/food.png",
  wood: "images/style/wood.png",
  stone: "images/style/stone.png",
  metal: "images/style/iron.png",
  population: "images/style/population.png",
  gold: 'images/icons/gold.png'
};



var Trading = {

  getTradeList: function () {
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AExchange/getExchangeItem`,
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);
        EXCHANGE_ITEM = JSON.parse(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

  },

  content_unit: function (Item) {
    let req_list = "";
    let req = JSON.parse(Item.req);
    let reword = JSON.parse(Item.reword);
    let image = "";

    for (let iii in req) {
      if (req[iii].type === "resource" || req[iii].type === "gold") {
        image = RESOURCE_IMAGE[req[iii].resource_type];
      } else if (req[iii].type === "matrial") {
        image = Matrial.image(req[iii].matrial);
      } else if (req[iii].type === "equip") {
        image = Equipment.getImage(req[iii].Equip, req[iii].Part, req[iii].lvl);
      }
      req_list += ` <li class="pull-L">
                      <div class="pic pull-L">
                        <div class="req-unit-image" style="background-image: url(${image})">
                        </div>
                      </div>
                      <div class="num stroke ellipsis pull-R">${req[iii].amount}</div>
                    </li>`;
    }

    let prize_image = "";
    let prize_name = "";
    let player_amount = "--";

    if (reword.type === "matrial") {

      prize_image = Matrial.image(reword.matrial);
      prize_name = Matrial.getMatrialName(reword.matrial);
      player_amount = Matrial.getPlayerAmount(reword.matrial);

    } else if (reword.type === "equip") {
      prize_image = Equipment.getImage(reword.Equip, reword.Part, reword.lvl);
      prize_name = Equipment.getName(reword.Equip, reword.Part, reword.lvl);
      player_amount = Equipment.getPlayerAmount(reword.Equip, reword.Part, reword.lvl);
    }



    var list = `<li data-index="${Item.id_ex}" data-mat-type="${reword.type}" 
                  matrial_type="${reword.matrial || reword.idEquip}" 
                  class="tooltip_mat matrial_unit exchange-item">
                  <img src=" images/style/Border-up.png" class="border_up"/>
                  <div class="img-inside-box">
                    <div class="player_amount">
                      <img src="images/icons/shopQuantityBG.png"/>
                      <p>${player_amount}</p>
                    </div>
                    <div class="wrapper big-img">
                      <div class="image" style="background-image: url(${prize_image})"></div>
                    </div>
                    <div class="matrial">
                      <ul class="req-list">
                        ${req_list}
                      </ul>
                    </div>
                  </div>
                  <div class="txt-inside-box">
                    <h2>${prize_name}</h2>
                  </div>
                  <div  class="tooltip_desc"></div>
                </li>`;
    return list;
  },
  dailogBox_allMat: function (category, offset = 1) {
    category = category || "trade-all";
    var all_content_unite = Elkaisar.Item.ItemExchangeBox(category, offset);
    return `<div class="box_content for_mat_trade" data-page-for="exchange">
                        <div class="left-content">
                            <div class="banner-red">
                                لا توجد فاعلية
                            </div>
                            <div class="fa3lia-img">
                                <img src="images/style/sp.jpg">
                            </div>
                            <p class="fa3lia-p">لا توجد  فاعلية حالية  يمكنك متابعة اخبار الفاعليات  من خلال <a href="http://forum.elkaisar.com/index.php" target="_blank">المنتدى</a></p>
                        </div>
                        <div class="right-content">
                            <ul class='total' mat_table="trade-all">${all_content_unite}</ul>
                            <div class="right-content-footer">
                                <div class="buttons pull-R">
                                    <ul>
                                        <li>
                                            <div class="full-btn full-btn-3x" id="goToMall">
                                                ${Translate.Button.MenuList.BuyItems[UserLag.language]}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="full-btn full-btn-3x">
                                                ${Translate.Button.MenuList.GetSomeGold[UserLag.language]}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="budget pull-L">
                                    <div class="txt">
                                        ${getArabicNumbers(Elkaisar.DPlayer.Player.gold)}: لديك
                                    </div>
                                    <div>
                                        <img src="images/icons/gold_money.jpg">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
  },

  calPageNum: function (cat) {

    var count = 0;

    for (var iii in EXCHANGE_ITEM) {

      if (EXCHANGE_ITEM[iii].cat === cat || !cat) {
        count++;
      }

    }

    return Math.ceil(count / 9);
  }


};


$(document).on("PlayerReady", "html", function () {

  Trading.getTradeList();

});
$('.menu-list[data-show="trade"]').click(function () {
  Trading.getTradeList();
});

$(document).on("click", "#dialg_box .for_mat_trade .matrial_unit", function () {


  var matrial_type = $(this).attr("matrial_type");
  var index = $(this).data("index");

  for (var iii in EXCHANGE_ITEM)
    if (Number(EXCHANGE_ITEM[iii].id_ex) === Number(index))
      var exchange = EXCHANGE_ITEM[iii];

  var req = JSON.parse(exchange.req);
  var reword = JSON.parse(exchange.reword);

  var image = "";
  var req_list = "";
  var right_req_list = "";


  for (var iii in req) {

    if (req[iii].type === "resource") {
      image = RESOURCE_IMAGE[req[iii].resource_type];

    } else if (req[iii].type === "matrial") {
      image = Matrial.image(req[iii].matrial);
    } else if (req[iii].type === "equip") {
      image = Equipment.getImage(req[iii].Equip, req[iii].Part, req[iii].lvl);
    }

    req_list += `<li class="pull-L">
                        <div class="pic pull-L">
                            <img src="${image}">
                        </div>
                        <div class="num stroke ellipsis pull-R">${req[iii].amount}</div>
                    </li>`;

  }
  for (var iii in req) {

    if (req[iii].type === "resource") {
      image = RESOURCE_IMAGE[req[iii].resource_type];

    } else if (req[iii].type === "matrial") {
      image = Matrial.image(req[iii].matrial);
    } else if (req[iii].type === "equip") {
      image = Equipment.getImage(req[iii].Equip, req[iii].Part, req[iii].lvl);
    }

    right_req_list += `<li>
                        <div class="image pull-L">
                            <img src="${image}"/>
                        </div>
                        <div class="amount pull-L">
                            ${req[iii].amount}
                        </div>
                    </li>`;

  }

  var prize_image = "";
  var prize_name = "";
  var player_amount = "--";
  var desc = "";
  var long_desc = "";
  if (reword.type === "matrial") {

    prize_image = Matrial.image(reword.matrial);
    prize_name = Matrial.getMatrialName(reword.matrial);
    player_amount = Matrial.getPlayerAmount(reword.matrial);
    long_desc = Matrial.getMatrial(reword.matrial).long_desc;
    desc = Matrial.getMatrial(reword.matrial).desc;

  } else if (reword.type === "equip") {

    prize_image = Equipment.getImage(reword.Equip, reword.Part, reword.lvl);
    prize_name = Equipment.getName(reword.Equip, reword.Part, reword.lvl);
    long_desc = Equipment.getEquipData(reword.Equip, reword.Part, reword.lvl).long_desc;
    desc = Equipment.getEquipData(reword.Equip, reword.Part, reword.lvl).desc;
    player_amount = Equipment.getPlayerAmount(reword.Equip, reword.Part, reword.lvl);
  }


  var confirm_box = `<div id="matral-box-use" class="bg-general"> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">${Translate.Button.MenuList.Buy[UserLag.language]}</div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="matrial-show matrial-trade-show">        
                                <div class="row-2">
                                    <div class="pull-L left">
                                        <img src="${prize_image}">
                                        <ul> 
                                            ${req_list}
                                        </ul>

                                        <div class="mat_desc">
                                            ${long_desc}
                                        </div>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="name">
                                            ${prize_name} 
                                        </div>
                                        <div class="req">
                                            <ul>
                                                ${right_req_list}
                                            </ul>
                                        </div>
                                        <div class="item-left">
                                            <label>المواد المتبقية:</label>
                                            <span>${exchange.player_max - exchange.take_times}</span>
                                        </div>
                                        <div class="prom">
                                            <label>قسطور</label>
                                        </div>
                                        <div class="max-limit">
                                            <label>الحد الاقصى للمواد:</label>
                                            <span>${exchange.player_max} </span>
                                        </div>
                                    </div>
                                </div>  

                                <div class="row-3">        
                                    <div class="confim-btn">            
                                        <button class="full-btn full-btn-3x  pull-R enter" id="buyTradeItem" data-trade-index="${index}">${Translate.Button.MenuList.Buy[UserLag.language]}</button>  
                                        <input type="text" min="1" step="1" class="pull-L only_num input" max="${exchange.player_max - exchange.take_times}" id="amount_to_trade" value="1">
                                        <div class="number-arrow-wrapper pull-L">
                                            <label class="number-arrow up"></label>
                                            <label class="number-arrow down"></label>
                                        </div>
                                    </div>    
                                </div>
                            </div>    
                        </div>`;
  $("body").append(confirm_box);

});


function buyTradeMatral(index) {

  for (var iii in EXCHANGE_ITEM)
    if (Number(EXCHANGE_ITEM[iii].id_ex) === Number(index))
      var exchange = EXCHANGE_ITEM[iii];

  var req = JSON.parse(exchange.req);
  var reword = JSON.parse(exchange.reword);
  var amountToTrade = Number($("#amount_to_trade").val()) || 1;
  if (amountToTrade < 1)
    return;
  for (var iii in req) {
    if (req[iii].type === "matrial") {
      if (Number(Matrial.getPlayerAmount(req[iii].matrial)) < Number(req[iii].amount) * amountToTrade) {
        alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المواد");
        return;
      }
    } else if (req[iii].type === "resource") {
      if (Number(Elkaisar.CurrentCity.City[req[iii].resource_type]) < Number(req[iii].amount) * amountToTrade) {
        alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من الموارد");
        return;
      }
    } else if (req[iii].type === "equip") {
      if (Equipment.getPlayerAvailAmount(req[iii].Equip, req[iii].Part, req[iii].lvl) < req[iii].amount * amountToTrade) {
        alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المعدات");
        return;
      }
    }
  }

  if (reword.type === "matrial") {
    if (Number(exchange.max_to_have) < Number(Matrial.getPlayerAmount(reword.matrial)) + amountToTrade) {
      alert_box.confirmMessage("لقد تجاوزت الحد الاقصى للمواد");
      return;
    }
  } else if (reword.type === "equip") {
    if (Number(exchange.max_to_have) < Number(Equipment.getPlayerAmount(reword.Equip, reword.Part, reword.lvl)) + amountToTrade) {
      alert_box.confirmMessage("لقد تجاوزت الحد الاقصى للمعدات");
      return;
    }
  }


  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AExchange/buyExchange`,
    type: 'POST',
    data: {
      idExchange: exchange.id_ex,
      idCity: Elkaisar.CurrentCity.City.id_city,
      amountToTrade: amountToTrade,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    beforeSend: function (xhr) {
      waitCursor();
      $("#alert_box button").attr("disabled", "disabled");
    },
    success: function (data, textStatus, jqXHR) {
      unwaitCursor();
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var jsonData = JSON.parse(data);
      if (jsonData.state === 'ok') {
        exchange.take_times = Number(exchange.take_times) + amountToTrade;
        $(".close-alert_container").click();
        var reword = JSON.parse(exchange.reword);
        if (reword.type === "matrial") {
          Matrial.givePlayer(reword.matrial, reword.amount * amountToTrade);
        } else if (reword.type === "equip") {
          Elkaisar.Equip.getPlayerEquip().done(function () {
            $("#dialg_box .nav_bar .left-nav .selected").click();
          });
        }
        for (var iii in req) {
          if (req[iii].type === "matrial") {
            Matrial.takeFrom(req[iii].matrial, req[iii].amount * amountToTrade);
          } else if (req[iii].type === "resource") {
            Elkaisar.CurrentCity.City[req[iii].resource_type] -= req[iii].amount * amountToTrade;
          }
        }
        alert_box.succesMessage("تم التبادل بنجاح");
      }else if(jsonData.state == "error_0"){
        alert_box.confirmMessage("التبادل غير صالح");
      } else if (jsonData.state === "error_1") {
        alert_box.confirmMessage("التبادل غير صالح (لا توجد جوائز او متطلبات)");
      } else if (jsonData.state === "error_2") {
        alert_box.confirmMessage("لا يمكنك الحصول على التبادل");
      } else if (jsonData.state === "error_3") {
        alert_box.confirmMessage("المتطلبات غير كافية");
      } else if (jsonData.state === "error_4") {
        alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المواد");
      } else if (jsonData.state === "error_5") {
        alert_box.confirmMessage("للاسف لا تمتلك عدد كافى من المعدات");
      } else if (jsonData.state === "error_over_max") {
        alert_box.confirmMessage("لقد وصلت الى الحد الاقصى من الجوائز");
      } else {
        Elkaisar.LBase.Error(data);
      }
      city_profile.refresh_resource_view();
      $("#dialg_box .nav_bar .left-nav .selected").click();


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

}

//<button class="full-btn full-btn-3x  pull-R enter" id="buyTradeItem" data-trade-index="${index}" onclick="buyTradeMatral('${index}')">${Translate.Button.MenuList.Buy[UserLag.language]}</button>
$(document).on("click", "#buyTradeItem", function () {
  var index = $(this).attr("data-trade-index");
  buyTradeMatral(index);
});