function isUpgradingNow(place) {
  for (var obj in Elkaisar.TimedTask.TaskList.Building) {

    if (Number(Elkaisar.TimedTask.TaskList.Building[obj].id_city) === Number(Elkaisar.CurrentCity.City.id_city)) {
      if (Elkaisar.TimedTask.TaskList.Building[obj].place === place) {
        return Elkaisar.TimedTask.TaskList.Building[obj];
      }
    }

  }
  return false;
}





$("#UPDOWN-chat img").click(function () {

  if ($(this).hasClass("smalled")) {

    $(this).css("transform", "rotateZ(180deg)");
    $("#chat-box").css("bottom", "0px");
    $(this).removeClass("smalled");

  } else {

    $(this).css("transform", "rotateZ(0deg)");
    $("#chat-box").css("bottom", "-220px");
    $(this).addClass("smalled");
  }
  // Crafty.audio.play("close_sound");
});
$("#p-provile-slider img").click(function () {

  if ($(this).hasClass("smalled")) {

    $(this).css("transform", "rotateZ(-90deg)");
    $("#player-profile").css("left", "0px");
    $("#luck-wheel-btn").css("left", "310px");
    $(this).removeClass("smalled");

  } else {

    $(this).css("transform", "rotateZ(90deg)");
    $("#player-profile").css("left", "-380px");
    $("#luck-wheel-btn").css("left", "-75px");
    $(this).addClass("smalled");
  }
  //Crafty.audio.play("close_sound");
});

$("#city-profile-slider img").click(function () {

  if ($(this).hasClass("smalled")) {

    $(this).css("transform", "rotateZ(90deg)");
    $("#city-profile").css("right", "4px");
    $(this).removeClass("smalled");

  } else {

    $(this).css("transform", "rotateZ(-90deg)");
    $("#city-profile").css("right", "-425px");
    $(this).addClass("smalled");
  }
  // Crafty.audio.play("close_sound");
});


/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
  Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}

/**
 * document.exitFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.exitFullscreen) {
  document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

/**
 * document.fullscreenElement polyfill
 * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.fullscreenElement) {

  Object.defineProperty(document, 'fullscreenElement', {
    get: function () {
      return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
    }
  });

  Object.defineProperty(document, 'fullscreenEnabled', {
    get: function () {
      return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
    }
  });
}




document.getElementById('ToggelFullSrc').addEventListener('click', function () {
  return;
  if (document.fullscreenElement) {
    document.exitFullscreen().then(function () {
      Crafty.viewport.height = $(document).height();
      Crafty.viewport.width = $(document).width();
      Crafty.viewport.reload();
    });
    if (isMobile) {
      $('body').css("zoom", "0.5");

    }
  } else {
    document.documentElement.requestFullscreen().then(function () {
      Crafty.viewport.height = $(document).height();
      Crafty.viewport.width = $(document).width();
      Crafty.viewport.reload();
    });
    if (isMobile) {
      /*$("body").css("zoom" , "0.5");
       $("#cr-stage *").css("zoom" , "1");*/
      //$('#cr-stage').css("zoom" , "1");
      //alert_box.confirmMessage($('#cr-stage').css("zoom"));
    }

  }


  Crafty.viewport.height = $(document).height();
  Crafty.viewport.width = $(document).width();

  Crafty.viewport.reload();
});

$(document).on("click", "#ToggelSound", function () {
  if ($(this).attr("data-state") === "on") {
    $(this).attr("data-state", "off");
    // Crafty.audio.mute();
    $(this).css({ "background-image": "url(images/btns/withBg/buttonSoundOptions.png)" });
  } else {
    $(this).attr("data-state", "on");
    //Crafty.audio.unmute();
    $(this).css({ "background-image": "url(images/btns/withBg/sound_on_off.png)" });

  }

});


$(document).on("click", "#player_rank", function () {


  $(".menu-list").each(function () {
    if ($(this).data("show") === "ranks") {
      $(this).trigger("click");
    }
  });


});


/*
 * show player editable data
 * 
 */
$(document).on("click", ".avatar-name h1 , .avatar-img img", function () {

  showEditablePlayerProfile();

});



function showEditablePlayerProfile() {
  var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);

  if (!id_player) {
    return;
  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/APlayer/refreshPlayerData`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {
      var player_review = `<div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">ملف الملك</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review" class="player-review">
                                            <div class="upper">
                                                <div class="left pull-L">
                                                    <div class="player-avatar">
                                                        <div id="change-avatar-left" class="left-btn pull-L" style="margin-left: 5px;margin-top: 13px;"></div>
                                                        <img src="${Elkaisar.BaseData.HeroAvatar[1]}" id="A-A-P-image" data-index="${1}"/>
                                                        <div id="change-avatar-right" class="right-btn pull-R" style="margin-right: 5px;margin-top: 13px;"></div>
                                                        
                                                    </div>
                                                    <div id="confirm-player-new-img">
                                                        <img src="images/btns/done.png" class="img-sml"  >
                                                    </div>

                                                </div>
                                                <div class="right pull-R">
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.League[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-guild">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.NobleRank[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-promotion">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.Ranking[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-rank">
                                                       ----
                                                    </div>
                                                </div>
                                                <p style="clear: both"></p>
                                                <h1 class="player-name" id="A-A-P-name">----- 
                                                   
                                                </h1>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Info[UserLag.language]}</div>
                                                <div class="li" style="margin-top: 15px;">
                                                    <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/prestige.png"/>
                                                        </div>
                                                        <div class="title pull-R  " id="A-A-P-prestige">
                                                           ------
                                                        </div>
                                                    </div>
                                                    <div class="li-d pull-R bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/honor.png"/>
                                                        </div>
                                                        <div class="title pull-R " id="A-A-P-honor">
                                                            ----
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="li" style="margin-top: 5px; width: 125px; margin: auto">
                                                     <div id="change-player-password" class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/stat_login.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            تغير كلمة المرور
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="li buttons" style="margin-top: 15px; width: 95%">
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/message.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            مراسلة
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/chat.png"/>
                                                        </div>
                                                        <div class="title pull-R selectable">${Elkaisar.Config.RechCode}</div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/friend.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            صديق
                                                        </div>
                                                    </div>

                                                </div>

                                                <span style="clear: both"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

      $("body").append(player_review);
    },
    success: function (data, textStatus, jqXHR) {

      var json_data = JSON.parse(data);

      $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[json_data.avatar]);
      $("#A-A-P-image").attr("data-index", json_data.avatar);
      $("#A-A-P-guild").html(json_data.guild || "----");
      $("#A-A-P-promotion").html(Elkaisar.BaseData.Promotion[json_data.porm].Title);
      $("#A-A-P-rank").html(getArabicNumbers(json_data.rank));
      $("#A-A-P-name").html(json_data.name + ' <img src="images/btns/edit.png" class="img-sml" style="vertical-align: middle; margin-left: 15px" id="edit-player-name-btn">');
      $("#A-A-P-prestige").html(getArabicNumbers(json_data.prestige));
      $("#A-A-P-honor").html(getArabicNumbers(json_data.honor));

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });




}

$(document).on("click", "#edit-player-name-btn", function () {

  $("#A-A-P-name").html(`<input type="text" class="input" id="playe-new-name" style="text-align: center" value="${Elkaisar.DPlayer.Player.name}" data-pastable="true"/>
                            <img src="images/btns/done.png" class="img-sml" style="margin-left: 15px" id="save-player-name-btn">`);


});


$(document).on("click", "#save-player-name-btn", function () {

  var matrial = ["change_name"];
  BoxOfMatrialToUse(matrial, "change_player_name");

});


/*
 * change player Avatar
 */

$(document).on("click", "#change-avatar-left", function () {

  var image_index = parseInt($("#A-A-P-image").attr("data-index"));

  if (Elkaisar.BaseData.HeroAvatar[image_index - 1]) {

    $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[--image_index]);
    $("#A-A-P-image").attr("data-index", image_index);

  } else {

    $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[Elkaisar.BaseData.HeroAvatar.length - 1]);
    $("#A-A-P-image").attr("data-index", Elkaisar.BaseData.HeroAvatar.length - 1);

  }

});


$(document).on("click", "#change-avatar-right", function () {

  var image_index = parseInt($("#A-A-P-image").attr("data-index"));

  if (Elkaisar.BaseData.HeroAvatar[image_index + 1]) {

    $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[++image_index]);
    $("#A-A-P-image").attr("data-index", image_index);

  } else {

    $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[0]);
    $("#A-A-P-image").attr("data-index", 0);

  }

});


/*   save new avatar  */

$(document).on("click", "#confirm-player-new-img", function () {

  var image_index = parseInt($("#A-A-P-image").attr("data-index"));

  if (image_index === parseInt(Elkaisar.DPlayer.Player.avatar)) {

    alert_box.confirmMessage("لتغير الصورة الشخصية عليك اختيار صورة اخرى");
    return;

  } else {


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/APlayer/changePlayerAvatar`,
      data: {
        imageIndex: image_index,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        
        if(!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        const JsonData = JSON.parse(data);
        Elkaisar.DPlayer.Player = JsonData.Player;
        Player_profile.refresh_view();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  }



});



/*
 * 
 * city profile add btns
 * 
 */
$(document).on("click", "#increase-city-loy", function () {

  var matrial = ["a_play"];
  BoxOfMatrialToUse(matrial, "increase-city-util");


});


$(document).on("click", "#increase-city-pop", function () {

  var matrial = ["prot_pop"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});


$(document).on("click", "#increase-city-coin", function () {

  var matrial = ["coin_1", "coin_7"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});


$(document).on("click", "#increase-city-food", function () {

  var matrial = ["wheat_1", "wheat_7"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});


$(document).on("click", "#increase-city-stone", function () {

  var matrial = ["stone_1", "stone_7"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});


$(document).on("click", "#increase-city-wood", function () {

  var matrial = ["wood_1", "wood_7"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});


$(document).on("click", "#increase-city-metal", function () {

  var matrial = ["metal_1", "metal_7"];
  BoxOfMatrialToUse(matrial, "increase-city-util");

});



/**______________________________WORLD chat ________________________________________*/





$(document).on("click", "#chat-to", function () {


  var chat_to = $(this).attr("data-chat-to");

  if (chat_to === "world") {

    $(this).attr("data-chat-to", "guild");
    $(this).html(`<img src="images/icons/chat/guild.png"/>
                        <label>${Translate.Button.Chat.League[UserLag.language]}</label>`);
  } else {

    $(this).attr("data-chat-to", "world");
    $(this).html(`<img src="images/icons/chat/world.png"/><label>${Translate.Button.Chat.World[UserLag.language]}</label>`);

  }

});



$(document).on("click", ".msg-from .name", function () {

  //showPlayerProfile($(this).parents(".msg-unit").attr("data-id-player"));
  var id_player = $(this).parent(".msg-from").parent(".msg-unit").attr('data-id-player');
  var name = $(this).parent(".msg-from").parent(".msg-unit").attr('data-name');
  var avatar = $(this).parent(".msg-from").parent(".msg-unit").attr('data-avatar');
  var user_group = $(this).parent(".msg-from").parent(".msg-unit").attr('data-user-group');
  var id_msg = $(this).parent(".msg-from").parent(".msg-unit").attr('data-id-msg');

  var pann_div = ``;
  if (Elkaisar.DPlayer.Player.user_group > 0) {

    pann_div = `<div id="clear-world-chat-msg"> ازالة الرسالة</div>
                    <div id="chat-forbide">كتم شات</div>`;

  }

  var list = `<div class="drop-down-li  "  data-id-player="${id_player}" data-name="${name}" data-avatar="${avatar}" data-id-msg="${id_msg}">
                    <button></button>
                    <lable class="user-group-${user_group}">${name}</lable>
                    <div class="private-chat">انشاء دردشة خاصة</div>
                    <div class="show-player-from-chat">الملف الشخصى للملك</div>
                    <div>اضافة صديق</div>
                    ${pann_div}
                </div>`;

  $("#drop-down-list-wrapper").html(list);
});


$(document).on("click", "#chat-icons ul li", function () {

  $("#chat-icons ul li").removeClass("active");
  $(this).addClass("active");
  var data_show = $(this).attr("data-show");
  if (data_show === "anounce") {

    $("#msg-area .guild_msg").hide();
    $("#msg-area .world_chat").hide();

  } else if (data_show === "world") {

    $("#msg-area .guild_msg").show();
    $("#msg-area .world_chat").show();
    $("#msg-area .announce").show();


  } else if (data_show === "guild") {

    $("#msg-area .world_chat").hide();
    $("#msg-area .announce").hide();

  } else if (data_show === "private") {



  }

});

$(document).on("click", "#expand-chat .expand", function () {

  var width = $("#chat-area").attr("data-width");

  if (width === "x") {

    $("#chat-area").css({ height: 350 });
    $("#chat-area").attr("data-width", "xx");

  } else if (width === "xx") {

    $("#chat-area").css({ height: 580 });
    $("#chat-area").attr("data-width", "xxx");
  } else {

    $("#chat-area").css({ height: 160 });
    $("#chat-area").attr("data-width", "x");

  }

  $("#msg-area").getNiceScroll(0).resize();

});


$(document).on("click", ".show-player-from-chat", function () {

  showPlayerProfile($(this).parents(".drop-down-li").attr("data-id-player"));

});


$(document).on("click", ".private-chat", function () {

  var id_player = $(this).parents(".drop-down-li").attr("data-id-player");
  var avatar = $(this).parents(".drop-down-li").attr("data-avatar");
  var name = $(this).parents(".drop-down-li").attr("data-name");
  creatChatRoom(id_player, name, avatar);

});


/*
 *    PRIVATE CHATE with player
 */

function creatChatRoom(id_player_with, name, avatar) {
  var found = false;

  $(".chat-room").each(function () {

    if (parseInt($(this).attr("data-id-player")) === parseInt(id_player_with)) {


      found = true;

    }

  });



  if (found === false) {

    chatRoomTemplate(id_player_with, name, avatar);

    $("#active-chat-rooms ul").append(`<li class="unit-chat-icon pull-R" 
                                            data-id-player = "${id_player_with}" 
                                            data-name= "${name}"
                                            data-avatar= "${avatar}"
                                            style="background-image: url(${Elkaisar.BaseData.HeroAvatar[avatar]})"></li>
                                        `);


  }

}

function chatRoomTemplate(id_player_with, name, avatar, visable) {

  var style = "";
  if (visable === false) {

    style = "style='display: none'";

  }
  var id = Math.random() * 1000000;

  var chat_room = `<div class="chat-room" ${style} data-id-player="${id_player_with}">
                            <div class="head_bar">
                                <img src="images/panner/king_name.png" class="banner">
                                <div class="title">${name}</div>
                                <div class="window-icon">
                                    <img  src="images/btns/close_b.png" class="close-chat-room">
                                    <img  src="images/btns/close_b.png" class="minmize-chat-room">
                                </div>
                            </div>
                            <p style="clear: both"></p>
                            <div class="container">
                                <div class="upper">
                                    <div class="body">
                                        <div id="SMB-${id_player_with}" class="scrollable-msg-body">
                                          
                                        </div>
                                    </div>
                                    <div class="recieve-avatar">
                                        <div class="image">
                                            <img src="${Elkaisar.BaseData.HeroAvatar[avatar]}"/>
                                        </div>
                                        <div class="name">
                                            ${name}
                                        </div>
                                        <div class="btns">
                                            <button class="full-btn show-player-profile" data-id-player="${id_player_with}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="msg-input">
                                        <textarea class="private-chat-input" ></textarea>
                                    </div>
                                    <div class="your-avatar">
                                        <div class="image">
                                            <img src="images/hero/faceA1.jpg"/>
                                        </div>
                                    </div>
                                    <div class="btns">
                                        <button class="full-btn pull-R">تصغير</button>
                                        <button class="full-btn pull-R send-private-msg"  data-id-player="${id_player_with}">ارسال</button>
                                        <button class="full-btn pull-L">غلق</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

  $("body").append(chat_room);
  $("#SMB-" + id_player_with).niceScroll(SCROLL_BAR_PROP);
  $(".chat-room").each(function () {

    if (parseInt($(this).attr("data-id-player")) === parseInt(id_player_with)) {

      $(this).draggable();

      return;

    }

  });

}

/*
 * 
 *  when chat icon is clicked 
 */
$(document).on("click", "#active-chat-rooms ul li", function () {

  var id_player = parseInt($(this).attr("data-id-player"));
  var found = false;

  $(".chat-room").each(function () {

    if (parseInt($(this).attr("data-id-player")) === id_player) {

      found = true;
      if ($(this).css("display") === "none") {
        $(this).show();
        $(this).animate({ top: "130px", left: "50%", height: "400px", width: "600px" }, "slow", function () { });

      } else {

        $(this).animate({ top: "500px", left: "60%", height: "0px", width: "0px" }, "slow", function () {

          $(this).hide();

        });

      }

    }

  });

  if (found === false) {

    chatRoomTemplate(id_player, $(this).attr("data-name"), $(this).attr("data-avatar"))

  } else {

    $(".chat-room").each(function () {

      if (parseInt($(this).attr("data-id-player")) === parseInt(id_player)) {

        $(this).css({ top: "150px", left: "50%", "margin-left": "-300px" })
        return;

      }

    });

  }


});



$(document).on("click", ".close-chat-room", function () {

  var id_player = parseInt($(this).parents(".chat-room").attr("data-id-player"));

  $("#active-chat-rooms ul li").each(function () {

    if (parseInt($(this).attr("data-id-player")) === id_player) {

      $(this).remove();

    }

  });
  $(this).parents(".chat-room").remove();

});

/* minimize chat*/
$(document).on("click", ".minmize-chat-room", function () {

  $(this).parents(".chat-room").animate({ top: "500px", left: "60%", height: "0px", width: "0px" }, "slow", function () {

    $(this).hide();

  });

});


/*
 *   TRIGGER CLICK  WHEN enter is preesed in private chat input 
 */
$(document).on("keydown", ".private-chat-input", function (e) {

  if (e.keyCode === 13) {
    e.preventDefault();

    $(this).parents(".bottom").children(".btns").children(".send-private-msg").click();


  }

});

/*  SEND message*/
$(document).on("click", ".send-private-msg", function () {

  var id_player = parseInt($(this).attr("data-id-player"));

  var msg = $(this).parents(".bottom").children(".msg-input").children(".private-chat-input").val();

  $(this).parents(".bottom").children(".msg-input").children(".private-chat-input").val("");


  var json_obj = {
    url: "Chat/sendPrivate",
    data: {
      idPlayerTo: id_player,
      chat_msg: msg
    }

  };

  ws.send(JSON.stringify(json_obj));


});



function showPrivateChatNotif(id_player_with, name, avatar) {

  var found = false;

  $("#active-chat-rooms ul li").each(function () {

    if (parseInt($(this).attr("data-id-player")) === parseInt(id_player_with)) {


      found = true;

    }

  });

  if (found === false) {

    $("#active-chat-rooms ul").append(`<li class="unit-chat-icon pull-R" 
                                            data-id-player = "${id_player_with}" 
                                            data-nam = "${name}" data-avatar="${avatar}"
                                            style="background-image: url(${Elkaisar.BaseData.HeroAvatar[avatar]})"></li>
                                        `);
    chatRoomTemplate(id_player_with, name, avatar, false);

  }


}


$(document).on("click", "#clear-world-chat-msg", function () {

  var id_msg = $(this).parent(".drop-down-li").attr("data-id-msg");
  var id_player = $(this).parent(".drop-down-li").attr("data-id-player");
  var player_name = $(this).parent(".drop-down-li").attr("data-name");

  var msg = $.trim($(`#msg-area .msg-unit[data-id-msg=${id_msg}]`).children(".msg-body").children("p").html());

  ws.send(
    JSON.stringify({
      url: "Chat/delete",
      data: {
        msg: msg,
        id_msg: id_msg,
        p_name_delete_for: player_name
      }
    })
  );

});



$(document).on("click", "#chat-forbide", function () {




  var id_msg = $(this).parent(".drop-down-li").attr("data-id-msg");
  var id_player = $(this).parent(".drop-down-li").attr("data-id-player");
  var player_name = $(this).parent(".drop-down-li").attr("data-name");

  var msg = $.trim($(`#msg-area .msg-unit[data-id-msg=${id_msg}]`).children(".msg-body").children("p").html());

  var alert_box_content = `
                            ادخل مدة الحظر 
                            <br/>
                            <br/>
                            <input type="text" placeholder="ادخل مدة الحظر بالثوانى" class="chat-forbid-duration only_num input" min="0"  max="99999999"/>
                        `;

  alert_box.confirmDialog(alert_box_content, function () {

    var duration_val = Number($('#alert_box .chat-forbid-duration').val()) || 3600;


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/APlayer/chatPann`,
      type: 'POST',
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer,
        duration: duration_val,
        playerToPan: id_player
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok")
          alert_box.succesMessage("تم حظر اللاعب بنجاح");
        else if (JsonObject.state === "error_1")
          alert_box.failMessage("لست مشرفا");
        else if (JsonObject.state === "error_2")
          alert_box.failMessage("لا يمكنك حظر مشرف اعلى منك فى الرتبة");
        else if (JsonObject.state === "error_3")
          alert_box.failMessage("لا تمتلك الرتبة المطلوبة");
      }
    });

  });



});





$(document).on("click", "#chat-box .drop-down-li button", function () {
  $("#chat-box .drop-down-li").fadeOut(250, function () {
    $(this).remove();
  });
});

Fixed = {};

Fixed.refresePlayerStateList = function () {
  if (!Elkaisar.DPlayer.PlayerState)
    return;
  $("#player_stat_bar ul").html("");
  for (var key in Elkaisar.DPlayer.PlayerState) {
    if (key !== "id_player") {

      if (parseInt(Elkaisar.DPlayer.PlayerState[key]) > Date.now() / 1000) {

        var list_i = `<li>
                                 <img src="${Elkaisar.BaseData.PlayerStateData[key].image}"/>
                                 <div class="duration stroke">${changeTimeFormat(Elkaisar.DPlayer.PlayerState[key] - (Date.now() / 1000))}</div>
                             </li> `;
        $("#player_stat_bar ul").append(list_i);
      }

    }

  }

  if (Elkaisar.DPlayer.Player > Date.now() / 1000) {
    var list_i = `<li>
                        <img src="${Elkaisar.BaseData.PlayerStateData.silance.image}"/>
                        <div class="duration stroke">${changeTimeFormat(playerElkaisar.DPlayer.Player.chat_panne - (Date.now() / 1000))}</div>
                    </li> `;
    $("#player_stat_bar ul").append(list_i);


  }

};

Fixed.getArmyAmountColor = function (amount) {
  return amount >= 1e5 ? "army-over-100k" : (amount >= 1e4 ? "army-over-10k" : (amount >= 1e3 ? "army-over-1k" : ""))
};





Fixed.refeshColorArmyHeroTrans = function () {
  army.rightTrade(Elkaisar.NextHero);
  Hero.refreshCurrentHeroArmy().done(function () {
    army.refreshArmy_leftTrade();
  });

};

Fixed.refreshPlayerNotif = function () {
  var green_msg = Number(Elkaisar.DPlayer.Notif.msg_diff) + Number(Elkaisar.DPlayer.Notif.msg_in);
  $("#green-msg-notif").html(green_msg > 0 ? green_msg : "");
  var red_msg = Number(Elkaisar.DPlayer.Notif.msg_report) + Number(Elkaisar.DPlayer.Notif.spy_report);
  $("#red-msg-notif").html(red_msg > 0 ? red_msg : "");
  var green_report = Number(Elkaisar.DPlayer.Notif.hero_in_battel) + Number(Elkaisar.DPlayer.Notif.hero_back) + Number(Elkaisar.DPlayer.Notif.spy_task);
  $("#hero-not-in-city").html(green_report > 0 ? green_report : "");
  $("#hero-attacking").html(Elkaisar.DPlayer.Notif.battel_number > 0 ? Elkaisar.DPlayer.Notif.battel_number : "");

  Quest.refrehQuestNotif();
};

$(document).on("CityReady", function () {
  Player_profile.getPlayerStateData().done(function (data) {
    Fixed.refreshPlayerNotif();
    console.log("CityReady")
  });
});