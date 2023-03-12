var GodGate = {};

GodGate.pointTotxt = {

  "attack": "هجوم",
  "def": "دفاع",
  "dam": "انجراح",
  "vit": "حيوية",
  "break": "إجتياح",
  "anti_break": "تصدى",
  "strike": "تدمير",
  "immunity": "حصانة"

};

GodGate.navBar = [{
  "txt": "أمون رع",
  "title": "god-gate-1"
}, {
  "txt": "خنوم",
  "title": "god-gate-2"
}, {
  "txt": "انوبيس",
  "title": "god-gate-3"
}, {
  "txt": "حورس",
  "title": "god-gate-4"
}
];


GodGate.playerGate = {};

GodGate.closed = 0;
GodGate.open = 1;

GodGate.data = {

  point: {
    attack: {
      ar_title: "هجوم",
      max: 50
    },
    defence: {
      ar_title: "دفاع",
      max: 50
    },
    vit: {
      ar_title: "حيوية",
      max: 100
    },
    damage: {
      ar_title: "انجراح",
      max: 50
    },
    "break": {
      ar_title: "إجتياح",
      max: 15
    },
    anti_break: {
      ar_title: "تصدى",
      max: 15
    },
    strike: {
      ar_title: "تدمير",
      max: 15
    },
    immunity: {
      ar_title: "حصانة",
      max: 15
    }
  },
  godName: {
    gate_1: "أمون رع",
    gate_2: "خنوم",
    gate_3: "أنوبيس",
    gate_4: "حورس"
  }

};


GodGate.matrialUse = ["god_point_5", "god_point_30", "god_point_75", "god_point_175", "god_point_750", "god_point_1k", "god_point_2k", "god_point_5k", "god_point_10k", "god_point_50k"];
GodGate.gateRequireMents =
{
  gate_1: {
    points: 500,
    porm: 4,
    godName: "امون رع"
  },
  gate_2: {
    points: 1500,
    porm: 10,
    godName: "خنوم"
  },
  gate_3: {
    points: 2500,
    porm: 18,
    godName: "انوبيس"
  },
  gate_4: {
    points: 4000,
    porm: 28,
    godName: "حورس"
  }
};


GodGate.getPlayerGates = function () {

  return $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/getGodGateData`,
    data: {
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      GodGate.playerGate = JSON.parse(data);

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

};

$(document).on("PlayerReady", "html", function () {
  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/getRankEffect`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      GodGate.rankEffect = JSON.parse(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/getGlobalGateData`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      GodGate.globalData = JSON.parse(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
  GodGate.getPlayerGates();
});



GodGate.godGateContent = function () {


  var content = `  
                    <div id="god-gate" class="box_content">
                        <div class="content-wrapper">
                            <div id="godGate-rank">
                                <div class="text">
                                    الترتيب
                                </div>
                            </div>
                            <div id="godGate-help"></div>
                            <div  id="god-1" class="god-container ${GodGate.playerGate.GodGateData.gate_1 ? "" : "gray-filter"}" style="left: 50%; margin-left: -75px;" data-gate="1">
                                <div class="text-val stroke" style="top:112px; margin-left: -45px"> ${GodGate.playerGate.GodGateData.gate_1 ? GodGate.playerGate.GodGateData.gate_1 : "0"} </div>
                            </div>
                            <div id="god-2" class="god-container ${GodGate.playerGate.GodGateData.gate_2 ? "" : "gray-filter"}" style="right: 0px; top: 50%; margin-top: -80px  " data-gate="2">
                                <div class="text-val stroke" style="margin-left: -45px ; top: 108px"> ${GodGate.playerGate.GodGateData.gate_2 ? GodGate.playerGate.GodGateData.gate_2 : "0"} </div>
                            </div>
                            <div id="god-3" class="god-container  ${GodGate.playerGate.GodGateData.gate_3 ? "" : "gray-filter"}"  style="left: 50%; bottom: 0px;  margin-left: -75px;" data-gate="3">
                                <div class="text-val stroke" style="top: 108px; margin-left: -45px"> ${GodGate.playerGate.GodGateData.gate_3 ? GodGate.playerGate.GodGateData.gate_3 : "0"} </div>
                            </div>
                            <div id="god-4" class="god-container  ${GodGate.playerGate.GodGateData.gate_4 ? "" : "gray-filter"}" style="left: 0px; top: 50%; margin-top: -80px " data-gate="4">
                                <div class="text-val stroke" style="margin-left: -67px; top: 94px"> ${GodGate.playerGate.GodGateData.gate_4 ? GodGate.playerGate.GodGateData.gate_4 : "0"} </div>
                            </div>


                            <div class="player-points">
                                <label>${GodGate.playerGate.GodGateData.points}/4000</label>
                                <div class="wrapper">
                                    <button class="pluse add-god-points"></button>
                                </div>
                            </div>
                        </div>
                    </div>`;

  return content;

};



GodGate.askToOpenGate = function (gate) {


  var Needs = GodGate.gateRequireMents["gate_" + gate];

  if (!Needs)
    return;

  if (Number(Elkaisar.DPlayer.Player.porm) < Needs.porm) {

    alert_box.failMessage(`لا يمكنك فتح البوابة و رتبتك اقل من ${Elkaisar.BaseData.Promotion[Needs.porm].Title}`);
    return;

  }

  if (Number(GodGate.playerGate.GodGateData.points) < Needs.points) {
    alert_box.failMessage(`ليس لديك (${Needs.points}) نقطة لفتح البوابة`);
    return;
  }


  alert_box.confirmDialog(`تأكيد فتح بوبة التسليح ${GodGate.data.godName["gate_" + gate]}`, function () {


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/openGate`,
      data: {
        gateIndex: gate,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {


        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var jsonData = JSON.parse(data);

        if (jsonData.state === "error_2") {

          alert_box.confirmMessage(`لا يمكنك فتح البوابة و رتبتك اقل من ${Elkaisar.BaseData.Promotion[Needs.porm].Title}`);

        } else if (jsonData.state === "error_3") {

          alert_box.confirmMessage(`ليس لديك (${Needs.points}) نقطة لفتح البوابة`);

        } else if (jsonData.state === "ok") {

          GodGate.playerGate.GodGateData = jsonData.PlayerGate;
          GodGate.playerGate[("GodGate" + gate)] = jsonData.Gate;

          $("#god-gate").replaceWith(GodGate.godGateContent());
          alert_box.succesMessage("تم فتح البوابة بنجاح");

        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  });



};



GodGate.BoxContent = function (gate) {

  var godGate = this.playerGate[("GodGate" + gate)];
  if (!godGate)
    return;


  var totalLocks = 0;

  var listItem = "";

  for (var iii = 1; iii <= 4; iii++) {

    var state = "c_" + iii + "_s";
    var score = "cell_" + iii + "_score";
    var type = "cell_" + iii + "_type";
    if (!GodGate.data.point[godGate[type]]) {
      console.log(godGate[type])
      console.log(type)
      console.log(godGate)
    }

    listItem += `<li class="${Number(godGate[state]) == 2 ? "gray-filter" : ""}" data-index="${iii}" data-score="${score}">
                        <div class="lock">
                            ${Number(godGate[state]) === 0 ? '<label class="chackable"></label>' : ""}
                        </div>
                        <div class="effect score-${GodGate.scoreColor(godGate[type], godGate[score])}">
                            <div class="effct-type font-2 ">${godGate[type] == "" ? "---" : (GodGate.data.point[godGate[type]].ar_title)}</div>
                            <div class="effct-renge font-2">(${Math.floor(Math.max(godGate[score], 1))})</div>
                            <div class="effct-score font-2">${Number(godGate[state]) == 2 ? "(0%)" : `(${Math.floor((godGate[score] / GodGate.data.point[godGate[type]].max) * 100)}%)`}</div>
                        </div>
                        <div class="checkBox">
                            <input type="checkbox" checked="checked">
                            <button class="checkmark ${Number(godGate[state]) === 0 ? "checked" : ""} chackable"></button>
                        </div>
                        <div class="closeWord font-2 ${Number(godGate[state]) != 2 ? "chackable" : ""}">
                            ${godGate[state] == 2 ? `<div class="open-fourth-cell">
                                                        <button id="OpenForthCellGG" data-gate="${gate}" class="pluse"></button>
                                                    </div>` : (Number(godGate[state]) != 1 ? "مغلق" : "")}
                        </div>
                    </li>`;

    totalLocks += Number(godGate[state]) === 0 ? 1 : 0;

  }

  var box = ` <div id="godGateBox" data-gate="${gate}">
                    <div class="content-wrapper">
                        <div class="close-godGateBox">
                            <button></button>
                        </div>
                        <div class="scoreBord">
                            <div class="font-2">
                                ${this.playerGate.GodGateData[("gate_" + gate)]} 
                            </div>
                        </div>
                        <div class="godName">
                            <div class="name font-2">${this.data.godName["gate_" + gate]}</div>
                        </div>
                        <ul>
                            ${listItem}
                            
                        </ul>
                    </div>
                    <div class="btn-wrapper">
                        <div class="btns-group">
                            <button id="change-gate-cell" ${Number(this.playerGate.GodGateData.points) < 50 + totalLocks * 50 ? 'disabled = "disabled"' : ""} class="btn-red-2x">تغير</button>
                            <button class="pluse add-god-points"></button>
                        </div>
                        <div class="text-group">
                            <label>التكلفة : <span >${50 + totalLocks * 50}</span> نقطة</label>
                            <label>لدبك : <span >${this.playerGate.GodGateData.points}</span>  نقطة </label>
                        </div>
                    </div>
                </div>`;

  return box;

};



GodGate.changeGateCells = function (gate) {

  return $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/changeGateUnlockedCells`,
    data: {
      gateIndex: gate,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'POST',
    beforeSend: function (xhr) {
      waitCursor();
      $("#change-gate-cell").attr("disabled", 'disabled');
    },
    success: function (data, textStatus, jqXHR) {
      unwaitCursor();

      $("#change-gate-cell").removeAttr("disabled");

      if (isJson(data)) {

        GodGate.getPlayerGates().done(function (data) {
          $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
        });


      } else {
        Elkaisar.LBase.Error(data);
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

};

GodGate.useBoxPoint = function (box, amount) {

  if (!amount) {
    amount = 1;
  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrlr.Config.NodeUrl}/api/AGodGate/addGatePoints`,
    data: {
      Item: box,
      amount: amount,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      $("#useItemButton").removeAttr("disabled");
      if (!isJson(data)) {
        Elkaisar.LBase.Error(data);
        return;
      }

      var jsonData = JSON.parse(data);

      GodGate.getPlayerGates().done(function (data) {

        $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
        if ($("#godGateBox").length > 0) {
          var gate = $("#godGateBox").attr("data-gate");
          $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
        }

        alert_box.succesMessage(`تم اضافة ${jsonData.PointToAdd} نقطة بنجاح`);

        $("#god-gate").replaceWith(GodGate.godGateContent());
      });
      $(".close_select_menu").trigger("click");
      $("#alert_container .close-alert").trigger("click");

      Matrial.takeFrom(box, amount);


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
};



GodGate.OpenFourthCell = function (Gate) {

  var Mat = "skill_book";

  if (Matrial.getPlayerAmount(Mat) <= Gate * 5) {

    $("#over_lay_alert").remove();
    alert_box.confirmMessage(`لا يوجد لديك عدد (${Gate * 10}) من ${Matrial.getMatrialName(Mat)}  فى صندوق الموارد خاصتك`);
    return;

  }
  if (GodGate.playerGate.GodGateData.points < Gate * 5000) {
    $("#over_lay_alert").remove();
    alert_box.confirmMessage(`يجب ان تمتلك اكثر من ${Gate * 5000} نقطة من نقاط التسليح`);
    return;
  }

  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/OpenFourthCell`,
    data: {
      GateIndex: Gate,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {


      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonData = JSON.parse(data);


      if (JsonData.state == "ok") {
        GodGate.getPlayerGates().done(function (data) {
          $("#godGateBox").replaceWith(GodGate.BoxContent(Gate));
        });
        $(".close_select_menu").trigger("click");
        $("#alert_container .close-alert").trigger("click");
      } else if (JsonData.state == "error_0") {
        alert_box.failMessage(`خطاء نوع البوبة`);
      } else if (JsonData.state == "error_1") {
        alert_box.failMessage(`خطاء نوع البوبة`);
      } else if (JsonData.state == "error_2") {
        alert_box.failMessage(`البوابة مغلقة`);
      } else if (JsonData.state == "error_3") {
        alert_box.failMessage(`ليس لديك نقاط كافية`);
      } else if (JsonData.state == "error_4") {
        alert_box.failMessage(`ليس لديك مواد كافية`);
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

};

GodGate.scoreColor = function (pointFor, score) {


  if (GodGate.data.point[pointFor]) {
    return Math.floor((score / GodGate.data.point[pointFor].max) * 5);
  }


};



GodGate.rank = function (gate, offset) {

  offset = offset || 0;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/getGateRank`,
    data: {
      gate: gate,
      offset: offset
    },
    type: 'GET',
    beforeSend: function (xhr) { },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var jsonData = JSON.parse(data);

      var list = "";
      for (var iii = 0; iii < 10; iii++) {

        if (jsonData[iii]) {
          let Key = GodGate.rankEffect ? Object.keys(GodGate.rankEffect[gate]) : [];
          let GR = Key.length ? GodGate.rankEffect[gate][Key[0]] : null;
          ;

          list += `
                            <div class="tr" data-rank="1">
                                 <div class="td_1" style="width: 18%">${Number(offset) + iii + 1}</div>
                                <div class="td_2" style="width: 28%">${jsonData[iii].name}</div>
                                <div class="td_3" style="width: 18%">${Number(jsonData[iii].score)}</div>
                                <div class="td_4" style="width: 18%">${GR ? GR[offset + iii] || 0 : 0}</div>
                                <div class="td_5" style="width: 18%">---</div>
                            </div>`;

        } else {

          list += `<div class="tr" rank="1"></div>`;

        }

      }
      let Key = GodGate.rankEffect ? Object.keys(GodGate.rankEffect[gate]) : [];
      var content = ` <div class="content rank-list">
                                <div class="th">
                                    <div class="td_1 ellipsis" style="width: 18%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                                    <div class="td_2 ellipsis" style="width: 28%">${Translate.Title.TH.Lord[UserLag.language]}</div>
                                    <div class="td_3 ellipsis" style="width: 18%">${Translate.Title.TH.TotalPoints[UserLag.language]}</div>
                                    <div class="td_4 ellipsis" style="width: 18%">+ ${GodGate.pointTotxt[Key.length ? Key[0] : "attack"]}</div>
                                    <div class="td_5 ellipsis" style="width: 18%">${Translate.Button.General.Soon[UserLag.language]}</div>
                                </div>
                                ${list}
                            </div>
                            <div class="footer">
                                <div class="li"></div>
                                <div class="li"></div>
                                <div class="li">
                                    <div class="nav_icon" id="nav-gate-rank" data-gate="${gate}" data-offset="${offset}">
                                        <div data-move="most-left"  class="pull-L most-left-btn"></div>
                                        <div data-move="left"       class="pull-L left-btn"></div>
                                        <h1 class="pull-L">  
                                            <span>${Number(offset) / 10 + 1}</span>/${Math.ceil(GodGate.globalData[(gate + "_count")] / 10)}
                                        </h1>
                                        <div data-move="most-right" class="pull-R most-right-btn"></div>        
                                        <div data-move="right"      class="pull-R right-btn"></div>
            
                                  </div>
                                </div>
                                <div class="li">
                                    <button class="show-my-rank btn-yellow-2x font-2"> تصنيفى</button>
                                </div>
                            </div>`;

      $("#Box-mid .content-wrapper").html(content);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

};




/*  show gode gate*/
$(document).on("click", "#godGateBtnWrapper button", function () {


  var dialog = menu_bar.dialogBox(Translate.Title.MenuList.GodGate[UserLag.language], [], GodGate.godGateContent(), 0);

  dialogBoxShow(dialog);

});




$(document).on("click", "#god-gate .content-wrapper .god-container", function () {

  var gate = $(this).attr("data-gate");

  if (!GodGate.playerGate.GodGateData["gate_" + gate]) {

    GodGate.askToOpenGate(gate);

  } else {

    var over_lay = `<div id="over_lay">${GodGate.BoxContent(gate)}</div>`;
    $("body").append(over_lay);

  }





});


$(document).on("click", "#godGateBox  .content-wrapper .close-godGateBox", function () {

  $("#over_lay").remove();

});


$(document).on("click", "#godGateBox .content-wrapper ul li .chackable", function () {

  var gate = $("#godGateBox").attr("data-gate");
  var index = $(this).parents("li").attr("data-index");

  var godGate = GodGate.playerGate[("GodGate" + gate)];

  godGate[("c_" + index + "_s")] = 1 - godGate[("c_" + index + "_s")];

  $("#godGateBox").replaceWith(GodGate.BoxContent(gate));


  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AGodGate/changeGateCellState`,
    data: {
      cellIndex: index,
      gateIndex: gate,
      state: godGate[("c_" + index + "_s")],
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'POST',
    beforeSend: function (xhr) {
      waitCursor();
    },
    success: function (data, textStatus, jqXHR) {
      unwaitCursor();
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);


      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {
        GodGate.playerGate[("GodGate" + gate)] = JsonObject.Gate;

      }


      $("#godGateBox").replaceWith(GodGate.BoxContent(gate));
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

});


$(document).on("click", "#change-gate-cell", function () {

  var gate = $("#godGateBox").attr("data-gate");

  if (!gate)
    return;

  var godGate = GodGate.playerGate[("GodGate" + gate)];
  var itemHeigh = false;

  for (var iii = 1; iii <= 3; iii++) {

    var state = "c_" + iii + "_s";
    var score = "cell_" + iii + "_score";
    var type = "cell_" + iii + "_type";

    console.log(type)

    var score_precent = (godGate[score] / GodGate.data.point[godGate[type]].max) * 100;

    if (Number(godGate[state]) === GodGate.open && score_precent >= 90) {
      itemHeigh = true;
    }

  }

  if (itemHeigh) {

    alert_box.confirmDialog("تأكيد تغير نقاط البوابة! <br>  (قد تكون بعض النقاط الحالية عالية ويصعب الحصول عليها مرة اخرى)", function () {
      GodGate.changeGateCells(gate);
    });

  } else {

    GodGate.changeGateCells(gate);

  }




});



$(document).on("click", ".add-god-points", function () {

  var matrial = GodGate.matrialUse;
  BoxOfMatrialToUse(matrial, "add-god-points");

});



$(document).on("click", "#godGate-rank", function () {
  BoxMid.box("تصنيف", GodGate.navBar, "");
  GodGate.rank("gate_1", 0);
  $("#Box-mid .nav-bar ul li:first").addClass("selected")
});


$(document).on("click", "#nav-gate-rank div", function () {

  var direction = $(this).attr("data-move");
  var offset = Number($(this).parents("#nav-gate-rank").attr("data-offset"));
  var gate = $(this).parents("#nav-gate-rank").attr("data-gate");
  var newOffset = 0;

  var maxOffset = Number(GodGate.globalData[(gate + "_count")]);

  if (direction === "left") {

    if (offset <= 0)
      return;

    newOffset = Math.max(0, offset - 10);

  } else if (direction === "most-left") {

    newOffset = 0;

  } else if (direction === "right") {

    newOffset = offset + 10;
    if (newOffset >= maxOffset)
      return;

  } else if (direction === "most-right") {

    newOffset = Math.floor(maxOffset / 10) * 10;

  }


  GodGate.rank(gate, newOffset);
});



$(document).on("click", "#OpenForthCellGG", function () {
  var matrial = ["skill_book"];
  var Gate = $(this).attr("data-gate");

  alert_box.confirmDialog(`تأكيد إستعمال عدد(${Gate * 10}) من ${Matrial.getMatrialName(matrial[0])} + ${Gate * 5000} نقطة تسليح لفتح المهارة الرابعة للبوابة`, function () {
    BoxOfMatrialToUse(matrial, "open-fourth-cell", Gate, Gate);
  });


});