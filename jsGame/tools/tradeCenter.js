var TradeCenter = {};

TradeCenter.currentList = [];
TradeCenter.forbiddenList = [];
TradeCenter.playerList = [];

TradeCenter.getTradeList = function (offset) {

  if (!offset)
    offset = 0;
  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/getTradeList`,
    data: {
      token: Elkaisar.Config.OuthToken,
      offset: offset
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (isJson(data)) {
        TradeCenter.currentList = JSON.parse(data);
      } else {
        Elkaisar.LBase.Error(data);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

};


TradeCenter.getListItemById = function (id_item) {

  for (var iii in this.currentList) {
    if (Number(this.currentList[iii].id_item) === Number(id_item)) {
      return this.currentList[iii];
    }
  }

};

TradeCenter.getTradeListTotalCount = function () {


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/getTotalCount`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (Elkaisar.LBase.isJson(data)) {
        TradeCenter.totalCount = JSON.parse(data).item_count;
      } else {
        Elkaisar.LBase.Error(data);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

};

TradeCenter.getTradeListForbidden = function () {


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/getForbiddenItem`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (isJson(data)) {
        var jsonData = JSON.parse(data);
        for (var iii in jsonData) {
          TradeCenter.forbiddenList.push(jsonData[iii].item);
        }
      } else {
        Elkaisar.LBase.Error(data);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

};


TradeCenter.getPlayerTradeList = function () {


  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/getPlayerTradeList`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {
    },
    success: function (data, textStatus, jqXHR) {
      if (isJson(data)) {
        var jsonData = JSON.parse(data);
        TradeCenter.playerList = jsonData;
      } else {
        Elkaisar.LBase.Error(data);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
    }
  });

};




$(document).on("PlayerReady", function () {
  TradeCenter.getTradeList(0);
  TradeCenter.getTradeListTotalCount();
  TradeCenter.getTradeListForbidden();
  TradeCenter.getPlayerTradeList();
});



TradeCenter.TradeListContent = function (list, offset) {

  if (!offset)
    offset = 0;

  var tradeList = "";

  for (var iii = 0; iii < 7; iii++) {

    if (list[iii]) {

      tradeList += `<li class="tr " data-offset="${Number(offset) + iii}" data-id-hero="25">
                            <div class="td_1" style="width: 24%; margin-left: 2%;">
                                <div class="image">
                                    <div class="wrapper">
                                        <div class="item-image" style="background-image: url(${Matrial.image(list[iii].item)})">
                                        </div>
                                    </div>
                                </div>
                                <div class="name ellipsis">
                                    ${Matrial.getMatrialName(list[iii].item)}
                                </div>
                            </div>
                            <div class="td_2" style="width: 20%;">${list[iii].p_name}</div>
                            <div class="td_3" style="width: 11%;">
                                <div class="amount">
                                    ${list[iii].amount}
                                </div>
                            </div>
                            <div class="td_4" style="width: 11%;">
                                <div class="amount">
                                    ${list[iii].price}
                                </div>
                            </div>
                            <div class="td_5" style="width: 14%;">
                                ${lastSeen(list[iii].time_stamp)}
                            </div>
                            <div class="td_6" style="width: 18%;">
                                ${Number(Elkaisar.DPlayer.Player.id_player) !== Number(list[iii].id_player) ? `<button class="full-btn-3x buy-item-trade-center"
                                        data-item="${list[iii].item}"
                                        data-price="${list[iii].price}" 
                                        data-id-item="${list[iii].id_item}" 
                                        style="width: 45%; margin: auto;"> ${Translate.Button.MenuList.Buy[UserLag.language]}</button>`
          :
          `<button class="full-btn-3x cancel-buy-item-trade-center"
                                        data-item="${list[iii].item}"
                                        data-price="${list[iii].price}" 
                                        data-id-item="${list[iii].id_item}" 
                                        style="width: 45%; margin: auto;">الغاء العرض</button>`}
                            </div>
                        </li>
                       `;

    } else {
      tradeList += ` <li class="tr"></li>`;
    }

  }

  var content = `<div id="city-trade-center" class="box_content">
                
                    <div class="th">
                        <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%;">${Translate.General.Item[UserLag.language]}</div>
                        <div class="td_2 ellipsis" style="width: 20%;">${Translate.Title.TH.Lord[UserLag.language]}</div>
                        <div class="td_3 ellipsis" style="width: 11%;">${Translate.Title.TH.Quantity[UserLag.language]}</div>
                        <div class="td_3 ellipsis" style="width: 11%;">${Translate.Title.TH.UnitePrice[UserLag.language]}</div>
                        <div class="td_5 ellipsis" style="width: 14%;">${Translate.Title.TH.Time[UserLag.language]}</div>
                        <div class="td_6 ellipsis" style="width: 18%;">${Translate.Button.General.Action[UserLag.language]}</div>
                    </div>
                    <ol id="trade-list">
                        ${tradeList}
                    </ol>
                    <div  class="right-content-footer cell-3-footer">
                        <div class="right">
                           
                        </div>
                        <div class="middle">
                            <div id="navigate-trade-list" class="wrapper">
                                <button class="GO_L_1" data-direction="dec"></button>
                                <label>${Math.floor(offset / 7) + 1}/${Math.floor(TradeCenter.totalCount / 7) + 1}</label>
                                <button class="GO_R_1" data-direction="inc"></button>
                            </div>
                        </div>
                        <div class="left">
                            <button id="addMatrialToBuy" class="full-btn-3x">${Translate.Button.Building.AddItem[UserLag.language]}</button>
                        </div>
                    </div>
                
            </div>`;
  return content;
};




$(document).on("click", ".buy-item-trade-center", function () {

  var id_item = $(this).data("id-item");

  var listItem = TradeCenter.getListItemById(id_item);


  var msg = `<p>تأكيد استعمال  ( قسائم شراء) لشراء ${Matrial.getMatrialName(listItem.item)} مقابل ${listItem.price} ذهبة للمادة  الواحدة  </p>
                <div><input id="get-amount-to-buy" type="text"  class="only_num input" placeholder="كمية الشراء" min="0"  step="1" max="${Math.min(listItem.amount, Math.floor(Elkaisar.DPlayer.Player.gold / listItem.price))}" ></div>`;


  alert_box.confirmDialog(msg, function () {

    var amount_to_buy = Math.abs(Number($("#get-amount-to-buy").val() || 0));


    if (!isInt(Number(amount_to_buy))) {
      alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
      return;
    }

    if (amount_to_buy <= 0 || amount_to_buy > listItem.amount) {

      alert_box.failMessage("الكمية المطلوب شرائها غير صحيحة  برجاء  حاول مرة اخرى");
      return;

    } else if (amount_to_buy > Math.floor(Elkaisar.DPlayer.Player.gold / listItem.price)) {
      alert_box.failMessage("عذرا ليس لديك ذهب كافى");
      return;
    } else if (Matrial.getPlayerAmount("buy_voucher") < amount_to_buy) {

      alert_box.failMessage("لا يوجد لديك عقود شراء كافية");
      return;
    }

    if (Number(Elkaisar.DPlayer.Player.porm) < 5) {
      alert_box.failMessage(`لا يمكنك شراء اى صفقة  ورتبتك اقل من ${Elkaisar.BaseData.Promotion[5].Title}`);
      return;
    }


    if (TradeCenter.forbiddenList.indexOf(listItem.item) >= 0) {

      alert_box.failMessage("غير مسموح بشراء او  بيع هذه المادة فى الوقت الحالى ");
      return;

    }

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/buyItem`,
      data: {
        idItem: id_item,
        amount: amount_to_buy,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {
        $(".buy-item-trade-center").attr("disabled", "disabled");
        waitCursor();
      },
      success: function (data, textStatus, jqXHR) {

        $(".buy-item-trade-center").removeAttr("disabled");
        unwaitCursor();

        if (isJson(data)) {
          var jsonData = JSON.parse(data);
        } else {
          Elkaisar.LBase.Error(data);
          return;
        }


        if (jsonData.state === "ok") {

          Matrial.givePlayer(listItem.item, amount_to_buy);
          alert_box.succesMessage("تمت عملية الشراء بنجاح");

        } else if (jsonData.state === "error_1") {

          alert_box.failMessage("لم تعد هذة الصفقة موجودة فى الوقت الحالى ");

        } else if (jsonData.state === "error_2") {

          alert_box.failMessage("اختر عدد صحيح من المواد لشرائة");


        } else if (jsonData.state === "error_3") {

          alert_box.failMessage("لا يوجد لديك ذهب كافى");

        } else if (jsonData.state === "error_4") {

          alert_box.failMessage("لم يتم اضافة المواد");

        } else if (jsonData.state === "error_5") {

          alert_box.failMessage("عدد المواد غير صحيح");

        } else if (jsonData.state === "error_6") {

          alert_box.failMessage("لا يوجد لديك عقود شراء كافية");

        }


        var firstOffset = $("#trade-list li:first-child").data("offset") || 0;

        TradeCenter.getTradeList(firstOffset).done(function () {

          $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));

        });


      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });


  });


});



$(document).on("click", "#addMatrialToBuy", function () {
  $("#matrial-box button").click();
});




$(document).on("click", ".sell-matrial", function (e) {

  e.stopPropagation();

  var matrial = $(this).data("matrial");

  var msg = `
        <p>تأكيد بيع ${Matrial.getMatrialName(matrial)} </p>
        <div>
            <input  id="amount-to-sell-trade-center" type="text" class="only_num input"  min="0"  max="${Math.min(Matrial.getPlayerAmount(matrial), Matrial.getPlayerAmount("sell_voucher"))}" placeholder="الكمية"/>
        </div>
        <div>
            <input id="item-price"  type="text" class="only_num input"  min="0"  max="999" placeholder="السعر"/>
        </div>
`;

  alert_box.confirmDialog(msg, function () {

    var amountToSell = Number($("#amount-to-sell-trade-center").val());
    var itemPrice = Number($("#item-price").val());

    if (!isInt(Number(amountToSell)) || !isInt(Number(itemPrice))) {
      alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
      return;
    }

    if (itemPrice <= 0) {
      alert_box.failMessage(" لا يمكنك بيع المادة  بهذا السعر");
      return;
    }

    if (amountToSell <= 0) {

      alert_box.failMessage("لا يمكنك بيع هذة الكمية");
      return;

    }
    if (amountToSell > Matrial.getPlayerAmount("sell_voucher")) {

      alert_box.failMessage("لا يوجد لديك عقود بيع كافية");
      return;

    }
    if (amountToSell > Matrial.getPlayerAmount(matrial)) {
      alert_box.failMessage(`لا يوجد لديك عدد كافى من (${Matrial.getMatrialName(matrial)})`);
      return;
    }


    if (TradeCenter.forbiddenList.indexOf(matrial) > -1) {
      alert_box.failMessage("غير مسموح بشراء او  بيع هذه المادة فى الوقت الحالى ");
      return;
    }

    if (Number(Elkaisar.DPlayer.Player.porm) < 7) {
      alert_box.failMessage("لا يمكنك عرض المادة للبيع و رتبتك اقل من موفد");
      return;
    }

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/sellItem`,
      data: {
        item: matrial,
        price: itemPrice,
        amount: amountToSell,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (isJson(data))
          var jsonData = JSON.parse(data);
        else {
          Elkaisar.LBase.Error(data);
          return;
        }


        if (jsonData.state === "ok") {

          Matrial.takeFrom(matrial, amountToSell);
          Matrial.takeFrom("sell_voucher", amountToSell);
          TradeCenter.playerList.push({
            id_item: jsonData.idItem,
            price: itemPrice,
            item: matrial,
            time_stamp: $.now() / 1000
          });
          $("#dialg_box .nav_bar .left-nav ul .selected").click();
          alert_box.succesMessage(`تم  اضافة ${amountToSell} ${Matrial.getMatrialName(matrial)}  الى قائمة البيع بنجاح`);
        } else if (jsonData.state === "error_0") {
          alert_box.failMessage("لا يمكنك بيع هذة الكمية");
        } else if (jsonData.state === "error_1") {
          alert_box.failMessage(" لا يوجد لديك عدد كافى من المواد");
        } else if (jsonData.state === "error_2") {
          alert_box.failMessage("");
        } else if (jsonData.state === "error_3") {
          alert_box.failMessage("لا يوجد لديك عقود بيع كافية");
        } else if (jsonData.state === "error") {
          alert_box.failMessage("اقل رتبة للبيع  هى موفد");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });


  });

});



$(document).on("click", "#navigate-trade-list button", function () {


  var direction = $(this).data("direction");

  if (direction === "inc") {

    var firstOffset = $("#trade-list .tr:first-child").data("offset");

    console.log(firstOffset);

    if (firstOffset >= TradeCenter.totalCount - 7) {
      return;
    }


    TradeCenter.getTradeList(Number(firstOffset) + 7).done(function () {

      $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList, Number(firstOffset) + 7));

    });


  } else if (direction === "dec") {
    var firstOffset = $("#trade-list .tr:first-child");

    if (firstOffset <= 0) {
      return;
    }


    TradeCenter.getTradeList(Number(firstOffset) - 7).done(function () {

      $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList, Number(firstOffset) - 7));

    });

  }


});



$(document).on("click", ".cancel-buy-item-trade-center", function () {

  var id_item = $(this).data("id-item");


  alert_box.confirmDialog("ـاكيد الغاء عرض  البيع", function () {

    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/ATradeCenter/cancellSellItem`,
      data: {
        idPlayer: Elkaisar.DPlayer.Player.id_player,
        idItem: id_item,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) { },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var jsonData = JSON.parse(data);
        if (jsonData.state === "ok") {
          alert_box.succesMessage("تم سحب المادة من قائمة البيع بنجاح");
          Matrial.givePlayer(jsonData.item, jsonData.amount);
          TradeCenter.totalCount--;
        } else if (jsonData.state === "error_0") {
          alert_box.failMessage(" لا يوجد هذا العرض");
        } else if (jsonData.state === "error_1") {
          alert_box.failMessage("لست صاحب هذا العرض");
        } else if (jsonData.state === "error_2") {
          alert_box.failMessage("حدث خطاء حاول مرة اخرى");
        }
        var firstOffset = $("#trade-list li:first-child").data("offset") || 0;
        TradeCenter.getTradeList(firstOffset).done(function () {
          $("#city-trade-center").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {}
    });

  });

});