const Emjoi = {

  ":D": "iconfinder_01_EmoticonsHDcom_343133.png",
  ";)": "iconfinder_02_EmoticonsHDcom_343145.png",
  "o{|": "iconfinder_03_EmoticonsHDcom_343126.png",
  ":x)": "iconfinder_04_EmoticonsHDcom_343148.png",
  ":*": "iconfinder_11_EmoticonsHDcom_343153.png",
  ":|": "iconfinder_14_EmoticonsHDcom_343141.png",
  "8)": "iconfinder_18_EmoticonsHDcom_343124.png",
  "8>": "iconfinder_19_EmoticonsHDcom_343161.png",
  ":o": "iconfinder_20_EmoticonsHDcom_343139.png",
  "3:)": "iconfinder_22_EmoticonsHDcom_343170.png",
  "*_*": "iconfinder_26_EmoticonsHDcom_343122.png",
  "._.*": "iconfinder_28_EmoticonsHDcom_343128.png",
  "8o:": "iconfinder_30_EmoticonsHDcom_343169.png",
  "Dx:": "iconfinder_30_EmoticonsHDcom_343169.png",
  ":8*": "iconfinder_31_EmoticonsHDcom_343146.png",
  ":)": "iconfinder_32_EmoticonsHDcom_343171.png",
  "*,": "iconfinder_34_EmoticonsHDcom_343142.png",
  "8:D": "iconfinder_35_EmoticonsHDcom_343158.png",
  "*._.*": "iconfinder_36_EmoticonsHDcom_343143.png",
  "8o": "iconfinder_38_EmoticonsHDcom_343162.png",
  "^._.^": "iconfinder_39_EmoticonsHDcom_343137.png",
  ":/": "iconfinder_42_EmoticonsHDcom_343138.png",
  "^=^": "iconfinder_46_EmoticonsHDcom_343155.png",
  ":lol:": "iconfinder_49_EmoticonsHDcom_343130.png",
  ":'D": "iconfinder_49_EmoticonsHDcom_343130.png",
  ":')": "iconfinder_49_EmoticonsHDcom_343130.png",
  "xD": "iconfinder_49_EmoticonsHDcom_343130.png",
  "XD": "iconfinder_49_EmoticonsHDcom_343130.png",
  "*^_^*": "iconfinder_50_EmoticonsHDcom_343163.png",
  ".^_^.": "iconfinder_50_EmoticonsHDcom_343163.png",
  ":z": "iconfinder_51_EmoticonsHDcom_343165.png",
  ":}": "iconfinder_51_EmoticonsHDcom_343165.png",
  ":3": "iconfinder_51_EmoticonsHDcom_343165.png",
  ":<3": "iconfinder_56_EmoticonsHDcom_343159.png",
  "':D": "iconfinder_58_EmoticonsHDcom_343166.png",
  ":'o": "iconfinder_59_EmoticonsHDcom_343167.png",
  ":'(": "iconfinder_59_EmoticonsHDcom_343167.png",
  "'^o^'": "iconfinder_61_EmoticonsHDcom_343131.png",
  "(^_^)": "iconfinder_65_EmoticonsHDcom_343144.png",
  "^_^)": "iconfinder_69_EmoticonsHDcom_343154.png",
  "^_^": "iconfinder_69_EmoticonsHDcom_343154.png",
  ";):": "iconfinder_67_EmoticonsHDcom_343136.png",
  ">:(": "iconfinder_70_EmoticonsHDcom_343164.png",
  ">:/": "iconfinder_70_EmoticonsHDcom_343164.png",
  ">:@": "iconfinder_70_EmoticonsHDcom_343164.png",
  "<(": "iconfinder_71_EmoticonsHDcom_343132.png",
  "=_=": "iconfinder_79_EmoticonsHDcom_343140.png"

};

var Chat = {};
Chat.msgId = 0;

Chat.msgFrom = function (data) {


  var name = `<div class="reply" data-msg="${data.chatMsg}" data-from="${data.fromName}">(رد)</div>
                <div class="name">[${data.fromName}]:</div> `;

  for (var iii in data.playerTitle) {
    if (!data.playerTitle[iii])
      continue;
    name += `<div class="rank-title rank-title_${iii}">${data.playerTitle[iii]}</div>`;
  }
  return name;
};

Chat.worldMessage = function (data) {


  var user_group_class = data.userGroup;
  var chatMsg = Extract.coords(extractEmjoi(extractUrl(data.chatMsg)));
  var idMsg = (++Chat.msgId);
  var msgContent = ``;
  if (data.quoted) {

    msgContent = `  <div class="with-reply">
                            <p class="quote ellipsis">[${data.quoteFrom}]: ${data.quote}</p>
                            <p class="q-r msg-text" data-msg-org="${data.chatMsg}">${chatMsg}</p>
                        </div>`;
  } else {
    msgContent = `<p class="msg-text flex"  data-msg-org="${data.chatMsg}">
                        ${chatMsg}
                     </p>`;
  }

  var msg = `<div id="mg-id-${idMsg}" data-id-msg="${data.idFrom}-${data.idMsg}" 
                    class="msg-unit world_chat ${"user-group-" + user_group_class}" 
                    data-id-player="${data.idFrom}" data-avatar="${data.p_avatar}" 
                    data-name="${data.fromName}" data-user-group="${data.userGroup}">
                    <div class="msg-from flex">
                        ${Chat.msgFrom(data)}
                    </div>
                    <div class="msg-body flex">${msgContent}</div>
                    <label class="msg-time">${('00' + new Date().getHours()).slice(-2)}:${('00' + new Date().getMinutes()).slice(-2)}</label>
                </div>`;

  UserLag.TranslateChatMsg({ id: idMsg, text: data.chatMsg });
  var htmlMsg = $($.parseHTML(msg));
  htmlMsg.children(".msg-from").children(".rank-title").css("width", "60px");
  setTimeout(function () {
    htmlMsg.children(".msg-from").children(".rank-title").css("width", "15px");
  }, 1000);

  $("#msg-area").append(htmlMsg);

};

Chat.guildMessage = function (data) {

  var user_group_class = data.userGroup;
  var chatMsg = Extract.coords(extractEmjoi(extractUrl(data.chatMsg)));
  var idMsg = (++Chat.msgId);

  var msg = `<div id="mg-id-${idMsg}" class="msg-unit guild_msg" data-id-player="${data.idFrom}" data-avatar="${data.playerAvatar}" data-name="${data.fromName}">
                    <div class="msg-from flex">
                        ${Chat.msgFrom(data)}
                    </div>
                    <div class="msg-body flex">
                        <p class="msg-text flex" data-msg-org="${data.chatMsg}">
                           ${chatMsg}
                        </p>
                    </div>
                </div>`;

  UserLag.TranslateChatMsg({ id: idMsg, text: data.chatMsg });
  var htmlMsg = $($.parseHTML(msg));
  htmlMsg.children(".msg-from").children(".rank-title").css("width", "60px");
  setTimeout(function () {
    htmlMsg.children(".msg-from").children(".rank-title").css("width", "15px");
  }, 1000);
  $("#msg-area").append(htmlMsg);
};

$(document).on("click", "#msg-area .msg-from  .rank-title", function () {

  if ($(this).hasClass("active")) {
    $(this).css({ "width": "10px", "margin-left": "0px" });
    $(this).removeClass("active");
  } else {
    $(this).css({ "width": "60px", "margin-left": "5px" });
    $(this).addClass("active");
  }
});




Chat.append = function (message) {

  console.log(message)

  var msg = `<div class="msg-unit"  >
                            <div class="msg-body">
                                <P>
                                   ${message}
                                </P>
                            </div>
                        </div>`;
  $("#msg-area").append(msg);

  if ($("#msg-area").getNiceScroll(0).page.maxh - $("#msg-area").getNiceScroll(0).getScrollTop() < 5) {
    setTimeout(function () { $("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h, 0); }, 100);
  }


};




var Announce = {};


Announce.queu = [];

Announce.global = function (text) {

  Announce.queu.push(text);

  setTimeout(() => {

    var duration = 6000;
    var dest = -500;
    var container = $("#global-announce");


    $("#global-announce .wrapper .text").html(Announce.queu[0]);
    console.log(Announce.queu[0])
    container.css("transform", "rotateX(0deg)");


    setTimeout(() => {

      container.attr("date-statge", "1");
      $("#global-announce .text").animate({ right: dest }, {
        duration: duration,

        complete: function () {

          container.removeAttr("style");
          $("#global-announce .wrapper .text").removeAttr("style");
          // $("#global-announce .wrapper .text").html("");
          Announce.queu.splice(0, 1);
        },
        step: function (now, fx) {

          container.attr("data-now", Math.floor((now * duration) / dest));

        }

      });

    }, 1800 + duration - Number(container.attr("data-now")), container);


  }, (Announce.queu.length - 1) * 9000);



};



$(document).on("click", "#msg-area .reply", function () {

  var msg = $(this).attr("data-msg");
  var from = $(this).attr("data-from");

  var Quot = `
                <button class="close-btn"></button>
                <div class="msg-to-reply ellipsis">
                    <bold>[${from}]: </bold>${msg}
                </div>`;

  $("#input-area .quote-wrapper").html(Quot);
  $("#input-area .quote-wrapper").attr("data-quote", msg);
  $("#input-area .quote-wrapper").attr("data-from", from);
  $("#input-area .quote-wrapper .msg-to-reply").width("100%");
  $("#input-area .quote-wrapper").attr("data-has-quote", "true");

});


$(document).on("click", "#input-area .quote-wrapper .close-btn", function () {
  $("#input-area .quote-wrapper").attr("data-has-quote", "false");
  $("#input-area .quote-wrapper").removeAttr("data-quote");
  $("#input-area .quote-wrapper").removeAttr("data-from");
  $("#input-area .quote-wrapper").html("");
});

$(document).on("keyup", "#input-chat input", function (e) {

  e.preventDefault();
  e.stopPropagation();

  if (e.keyCode === 13) {

    $("#expand-chat .send").click();

  }
});


$(document).on("keydown", "#input-chat input", function (e) {

  e.stopPropagation();
});


$(document).on("click", "#expand-chat .send", function () {


  var chat_to = $("#chat-to").attr("data-chat-to");

  if (!chat_to) {

    chat_to = "world";
  }

  var msg = $("#input-chat input").val();

  if (msg.length < 1) {

    return;

  }

  if (chat_to === "world" && Elkaisar.DPlayer.Player.chat_panne > Date.now() / 1000) {
    alert_box.confirmMessage("  لقد قام المراقب بحظرك من الشات  <br/>\n\
                                            اذا ان لديك اى شكوى يمكنك تقديمها فى صندوق الشكاوى <a href='http://forum.elkaisar.com/index.php?forums/14/' target='_blank'>هنا</a>");
    $("#input-chat input").val("");
    return;
  }

  var quoteWrapper = $("#input-area .quote-wrapper");

  if (quoteWrapper.attr("data-has-quote") === "true") {

    var json_obj = {
      url: "Chat/sendMsg",
      data: {
        chat_to: chat_to,
        chat_msg: msg,
        p_name: Elkaisar.DPlayer.Player.name,
        idPlayer: Elkaisar.DPlayer.Player.id_player,
        p_avatar: Elkaisar.DPlayer.Player.avatar,
        quoted: true,
        quote: quoteWrapper.attr("data-quote"),
        quoteFrom: quoteWrapper.attr("data-from")
      }
    };

  } else {

    var json_obj = {

      url: "Chat/sendMsg",
      data: {
        chat_to: chat_to,
        chat_msg: msg,
        p_avatar: Elkaisar.DPlayer.Player.avatar,
        id_guild: Elkaisar.DPlayer.Player.id_guild,
      }
    };
  }



  ws.send(JSON.stringify(json_obj));
  $("#input-chat input").val("");
  $("#input-area .quote-wrapper .close-btn").click();


});





$(document).on("click", ".select-list", function () {

  var active = $(this).attr("data-active");

  if (active === "true") {

    $(this).attr("data-active", "false");
    $(this).children(".option").children("ul").hide();
    $(this).children(".option").animate({ "height": 0 });

  } else {
    $(this).attr("data-active", "true");
    $(this).children(".option").animate({ "height": $(this).attr("data-height") + "px" }, function () {
      $(this).children("ul").show();
    });
  }

});
/*

Chat.openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
};

try {
    const stream = Chat.openMediaDevices({'video':false,'audio':true});
    console.log('Got MediaStream:', stream);
} catch(error) {
    console.error('Error accessing media devices.', error);
}*/

