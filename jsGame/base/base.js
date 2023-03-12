
const NODE_URL = `${Elkaisar.Config.NodeUrl}`;

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


$.ajaxSetup({
  data: {
    server: Elkaisar.Config.idServer
  }
});

function isInt(num) {
  return num % 1 === 0;
}


FAVORIT_LIST = [
  {
    id: 1,
    x_coord: 200,
    y_coord: 150,
    type: 27,
    lvl: 5,
    title: "mohamed"
  },
  {
    id: 2,
    x_coord: 458,
    y_coord: 125,
    type: 27,
    lvl: 5,
    title: "Mosta"
  },
  {
    id: 3,
    x_coord: 45,
    y_coord: 52,
    type: 27,
    lvl: 5,
    title: "morad"
  },
  {
    id: 4,
    x_coord: 45,
    y_coord: 52,
    type: 27,
    lvl: 5,
    title: "نغم"
  }
];


$(document).on("mouseenter", "#city-profile .page_content .army_type", function () {

  var army = $(this).attr("data-army");



  var tooltip = `  <div class="tooltip tooltip-army">
                        <div class="top">
                            <div class="left">
                                <div class="title">
                                    ${Elkaisar.BaseData.Army[army].ar_title}
                                </div>
                                <div class="image">
                                    <img src="${Elkaisar.BaseData.Army[army].image}"/>
                                </div>
                            </div>
                            <div class="right" >
                                <p class="desc">${Elkaisar.BaseData.Army[army].desc}</p>
                            </div>

                        </div>
                        <div class="bottom">
                            <ul>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/vitilty.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].vit}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/attack.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].attack}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/defence.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].def}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/damage.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].dam}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/break.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].break}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/anti-break.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].anti_break}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/strike.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].strike}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/immunity.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].immunity}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/food.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.ArmyPower[army].eating}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/speed.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].speed}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/capacity.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].capacity}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/pop.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].people}</div>
                                </li>
                            </ul>
                        </div>
                    </div>`;

  $("#city-profile-tooltipe").html(tooltip);

});


$(document).on("mouseleave", "#city-profile .page_content .army_type", function () {
  $("#city-profile-tooltipe").html("");
});


var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  isMobile = true;
}



$(document).on("PlayerReady", "html", function () {

  $.getJSON(`${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/UnitArmy.json`,
    function (UnitArmy) {
      Elkaisar.World.UnitArmy = UnitArmy;
    });
  $.getJSON(
    `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/worldUnitData.json`,
    function (data) {
      Elkaisar.World.UnitTypeData = data;
    }
  );

  $.ajax({

    url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/WorldBarrary.json`,
    data: {},
    type: 'GET',
    cache: true,
    beforeSend: function (xhr) {},
    success: function (data) {
      var data_array = data.split(",");
      var iii = 0;
      var end = data_array.length;
      for (; iii < end; iii++) {
        var temp = data_array[iii].split("_");

        Elkaisar.worldAllUnits[Number(temp[0]) * 500 + Number(temp[1])] = {
          x: temp[0],
          y: temp[1],
          ut: temp[2],
          l: temp[3],
          p: temp[4],
          t: temp[5],
          on_map: false
        };
      }

      var xxx = 0;
      var yyy = 0;
      var crEl;

      setTimeout(function () {
        for (xxx = 0; xxx < 500; xxx++) {
          for (yyy = 0; yyy < 500; yyy++) {



            if (!Elkaisar.worldAllUnits[xxx * 500 + yyy]) {

              Elkaisar.worldAllUnits[xxx * 500 + yyy] = {
                x: xxx,
                y: yyy,
                t: 0,
                ut: 0,
                l: 0,
                on_map: false
              };

            }


          }
        }
        $(document).trigger("WorldReady");
        Elkaisar.Config.isWorldReady = true;
      });
      $("#WorldCity").removeAttr("disabled");

    }, error: function (jqXHR, textStatus, errorThrown) {

    }
  });


});



function waitCursor() {
  $("body").attr("id", "wait");
}
function unwaitCursor() {
  $("body").removeAttr("id");
}


var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

const SAVE_URL = [
  "www.elkaisar.com",
  "elkaisar.com",
  "forum.elkaisar.com",
  "stackoverflow.com",
  "ar.islamway.net",
  "en.islamway.net",
  "fr.islamway.net",
  "du.islamway.net",
  "www.facebook.com",
  "www.fb.com",
  "www.anghami.com",
  "soundcloud.com",
  "www.instagram.com",
  "prnt.sc",
  "prntscr.com",
  "egy.best",
  "www.yallakora.com",
  "www.netflix.com"
];
function extractUrl(text) {
  if (!text)
    return;
  function checkBaseUrl(match, offset, string) {
    var hostName = extractHostname(match);
    return `<a rel="no-follow" href="${match}" class=" ${SAVE_URL.indexOf(hostName) > -1 ? "safe-url" : "not-safe-url"}" target="_blank">` + hostName + `</a>`;
  }
  return text.replace(uri_pattern, checkBaseUrl);
}



function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}




$(document).ready(function () {
  var ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    vKey = 86,
    cKey = 67;

  $(document).keydown(function (e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
      ctrlDown = true;
  }).keyup(function (e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
      ctrlDown = false;
  });



  // Document Ctrl + C/V 
  $(document).keydown(function (e) {
    if (ctrlDown && (e.keyCode == cKey))
      document.execCommand("copy");
    if (ctrlDown && (e.keyCode == vKey))
      document.execCommand("paste");
  });


  document.onpaste = function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function (event) {

          if (Number(USER_GROUP) < 3) {
            alert_box.confirmMessage("هذة الخاصية متاحة فقط للادارة");
            return;
          }

          var json_obj = {

            type: "CHAT_IMAGE_PUBLIC",
            url: "Chat/publicMsgImage",
            data: {
              image: event.target.result,
              idPlayer: Elkaisar.DPlayer.Player.id_player,
              token: Elkaisar.Config.OuthToken,
              p_name: Elkaisar.DPlayer.Player.name,
              p_avatar: Elkaisar.DPlayer.Player.avatar,
              userGroup: USER_GROUP
            }
          };

          ws.send(JSON.stringify(json_obj));

        }; // data url!

        reader.readAsDataURL(blob);
      }
    }
  }
});

function getSelectionText() {
  var selectedText = ""
  if (window.getSelection) { // all modern browsers and IE9+
    selectedText = window.getSelection().toString();
  }
  return selectedText
}

function extractEmjoi(str) {

  if (!str)
    return;
  return str.replace(/("[^"]+")|\S+/g, function (match, em) {

    if (Emjoi[match]) {
      return `<label class="emjoi" style="background-image: url(images/emjoi/${Emjoi[match]})"></label>`;

    }
    return match;
  });

}


var Extract = {

  coords: function (txt) {
    if (!txt)
      return;
    return txt.replace(/\[\s*\d{1,3}\s*\,\s*\d{1,3}\s*\]/g, function (match) {
      var coords = Extract.digits(match);
      return `<label class="clickable-coords font-2" data-x-coord="${coords[0]}" data-y-coord="${coords[1]}"><i>${match}</i></label>`;

    });
  },
  'coordDirect': function (xCoord, yCoord) {
    return ` <label class="clickable-coords font-2"  data-x-coord="${xCoord}" data-y-coord="${yCoord}"> <i>[${xCoord},${yCoord}]</i></label> `;
  },
  digits: function (txt) {
    if (!txt)
      return;
    return txt.match(/\d+/g);

  }

};







$(document).on("click", ".clickable-coords", function () {

  var coordX = Number($(this).attr("data-x-coord"));
  var coordY = Number($(this).attr("data-y-coord"));



  if ($("#WorldCity").attr("data-view") === "city") {
    $("#WorldCity").trigger("click");
  }




  $("#x_coord-input input").val(coordX);
  $("#y_coord-input input").val(coordY);
  $("#nav-btn button").click();

});





$(document).on("input keydown keyup mousedown mouseup select contextmenu drop", ".only_num", function (e) {

  var val = this.value;
  var max = $(this).attr("max") || 999999;
  var regExpVal = /^\d*$/;

  if ($(this).attr("fraction") === "true") {
    regExpVal = /^\d*[.]?\d*$/;
  }

  if ((regExpVal.test(val) && (val === "" || Number(val) <= max))) {

    this.oldValue = this.value;
    this.oldSelectionStart = this.selectionStart;
    this.oldSelectionEnd = this.selectionEnd;

  } else if (Number(val) > max) {

    this.value = max;
    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

  } else if (this.hasOwnProperty("oldValue")) {

    this.value = this.oldValue;
    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

  }

});


$(document).on("click", ".number-arrow-wrapper .up", function () {

  var input = $(this).parents(".number-arrow-wrapper").prev(".only_num");
  input.val(Math.min(Number(input.val() || 0) + Number(input.attr("step") || 1), Number(input.attr("max"))));
  input.trigger("keyup");

});

$(document).on("click", ".number-arrow-wrapper .down", function () {

  var input = $(this).parents(".number-arrow-wrapper").prev(".only_num");
  input.val(Math.max(Number(input.val() || 0) - Number(input.attr("step") || 1), 0));
  input.trigger("keyup");

});



$(document).on("mouseup", "#dialg_box", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#dialg_box", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#over_lay_alert", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#over_lay_alert", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#over_lay", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#over_lay", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#alert_container", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#alert_container", function (e) {
  e.stopPropagation();
});


$(document).on("mouseup", "#city-profile", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#city-profile", function (e) {
  e.stopPropagation();
});


$(document).on("mouseup", "#chat-box", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#chat-box", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#current-tasks", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#current-tasks", function (e) {
  e.stopPropagation();
});
$(document).on("mouseup", "#city_col", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#city_col", function (e) {
  e.stopPropagation();
});
$(document).on("mouseup", "#player-profile", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#player-profile", function (e) {
  e.stopPropagation();
});


$(document).on("mouseup", "#godGateBtnWrapper", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#godGateBtnWrapper", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#helpGateBtnWrapper", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#helpGateBtnWrapper", function (e) {
  e.stopPropagation();
});

$(document).on("mouseup", "#ArenaChallangeBtnWrapper", function (e) {
  e.stopPropagation();
});
$(document).on("mousedown", "#ArenaChallangeBtnWrapper", function (e) {
  e.stopPropagation();
});



$(document).keydown(function (event) {
  var keyCode = (event.keyCode ? event.keyCode : event.which);
  if (keyCode == 13) {
    $('.enter').last().trigger('click');
    event.preventDefault();
    event.stopPropagation();
  }
});