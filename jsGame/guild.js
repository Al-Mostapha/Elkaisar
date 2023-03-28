var guild_Detail;

function showInVitedMembers() {

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/getGuildInvReq`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var json_data = JSON.parse(data);
      Elkaisar.Guild.Requests = json_data.GuildReq;
      Elkaisar.Guild.Invetaions = json_data.GuildInv;
      var total_inv_list = "";
      var total_req_list = "";

      for (var index in Elkaisar.Guild.Invetaions) {
        var Inv = Elkaisar.Guild.Invetaions[index];
        total_inv_list +=
          ` <li data-id-player="${Inv.id_player}" data-player-name="${Inv.name}"> 
            <div class="pull-L">
              <img src="${Elkaisar.BaseData.HeroAvatar[Inv.avatar]}">
            </div>
            <h1 class="pull-L">${Inv.name}</h1>
            <div class="select-button">
              <button class="show-player-profile full-btn full-btn-1x ellipsis pull-R" data-id-player="${Inv.id_player}">${Translate.Button.MenuList.View[UserLag.language]}</button>
              <button class="full-btn full-btn-1x pull-L cansel-inv-action ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank) < 4 ? "disabled" : ""}>${Translate.Button.General.Cancel[UserLag.language]}</button>
            </div>
        </li>`;
      }
      $("#AFTER-AJAX-invited-mem").html(total_inv_list);
      $("#AFTER-AJAX-invited-mem").niceScroll(SCROLL_BAR_PROP);
      for (var index in Elkaisar.Guild.Requests) {
        var Req = Elkaisar.Guild.Requests[index];
        total_req_list += ` <li data-id-player="${Req.id_player}" data-player-name="${Req.name}"> 
                                  <div class="pull-L">
                                    <img src="${Elkaisar.BaseData.HeroAvatar[Req.avatar]}">
                                  </div>
                                  <h1 class="pull-L">${Req.name}</h1>
                                  <div class="select-button">
                                    <button class="show-player-profile full-btn  full-btn-1x  full-btn-1x pull-R" data-id-player="${Req.id_player}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                    <button class="full-btn full-btn-1x pull-L select-req-action ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank) < Guild.RANK_DATA.MENSTER ? "disabled" : ""}>اختيار</button>
                                    <div class="drop-down-li">
                                      ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.MENSTER ? `<div class="accept-guild-req">قبول</div>` : ""}
                                      ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY ? ` <div class="cansel-guild-req">الغاء</div>` : ""}
                                    </div>
                                  </div>
                                </li>`;
      }
      $("#AFTER-AJAX-join-req-mem").html(total_req_list);
      $("#AFTER-AJAX-join-req-mem").niceScroll(SCROLL_BAR_PROP);
    }
  });

}

$(document).on("click", ".select-req-action , .guild-mem-action-for_admins", function () {

  $(".drop-down-li").hide(function () {
    $(this).removeClass("active");
  });

  if (!$(this).next(".drop-down-li").hasClass("active")) {

    $(this).next(".drop-down-li").slideDown(function () {
      $(this).addClass("active");
    });

  } else {

    $(this).next(".drop-down-li").hide(function () {
      $(this).removeClass("active");
    });


  }

});



/*
 *   accept guild reqest buy guild admin 
 */
$(document).on("click", ".accept-guild-req", function () {

  var id_player = $(this).parents("li").attr("data-id-player");
  var self_ = $(this).parents("li");

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/acceptGuildReq`,
    data: {
      idPlayerToAccept: id_player,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'POST',
    beforeSend: function (xhr) {
    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        alert_box.succesMessage("تم اضافة الملك بنجاح");
        self_.remove();

        Guild.getGuildData().done(function () {
          $("#dialg_box .left-nav li[head_title='g_relation']").click();
        });

      } else if (JsonObject.state == "error_0") {
        alert_box.failMessage("اللاعب منضم فى حلف بالفعل");
      } else if (JsonObject.state == "error_1") {
        alert_box.failMessage("لست منضم فى أى حلف");
      } else if (JsonObject.state == "error_2") {
        alert_box.failMessage("رتبتك فى الحلف لا تسمح");
      } else if (JsonObject.state == "error_3") {
        alert_box.failMessage("طلب الانضمام ليس لهذا الحلف");
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
});
/*
 *   cansel guild reqest buy guild member 
 */
$(document).on("click", ".cansel-guild-req", function () {

  var id_player = $(this).parents("li").attr("data-id-player");
  var self_ = $(this).parents("li");

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/rejectGuildJoinReq`,
    data: {
      idPlayerToAccept: id_player,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        alert_box.succesMessage("تم الغاء الطلب بنجاح");
        self_.remove();
        Guild.getGuildData().done(function () {
          $("#dialg_box .left-nav li[head_title='g_relation']").click();
        });


      } else if (JsonObject.state == "error_0") {
        alert_box.failMessage("اللاعب منضم فى حلف بالفعل");
      } else if (JsonObject.state == "error_1") {
        alert_box.failMessage("لست منضم فى أى حلف");
      } else if (JsonObject.state == "error_2") {
        alert_box.failMessage("رتبتك فى الحلف لا تسمح");
      } else if (JsonObject.state == "error_3") {
        alert_box.failMessage("طلب الانضمام ليس لهذا الحلف");
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
});


/*
 *   cansel guild inv buy guild admin 
 */
$(document).on("click", ".cansel-inv-action", function () {

  var id_player = $(this).parents("li").attr("data-id-player");
  var self_ = $(this).parents("li");

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/cancelGuildInv`,
    data: {
      idPlayerToInvite: id_player,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var jsonObject = JSON.parse(data);

      if (jsonObject.state === "ok") {

        alert_box.succesMessage("تم الغاء الطلب بنجاح");
        self_.remove();
        showInVitedMembers();

      } else if (jsonObject.state == "error_0")
        alert_box.failMessage("لست عضو فى أى حلف");
      else if (jsonObject.state == "error_1")
        alert_box.failMessage("رتبتك فى الحلف لا تسمح");

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
});


/*
 * 
 * if  the user have now guild he can show all list of guilds
 * this button to show   the all list 
 * 
 */
$(document).on("click", "#show_avail_guild", function () {


  var content = menu_bar.dialogBoxcontent_Ranks(true);
  var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Ranking[UserLag.language], NavBar.Ranking, content, 0);
  if ($("#dialg_box").length > 0) {
    $("#dialg_box").animate({ top: "-800px" }, 200, "linear", function () {
      $(this).remove();
      $("body").append(dialog_box);
      menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Guild, 0);
      $("#dialg_box").attr("type", "messages");
      $("#dialg_box").animate({ top: "125" }, 200);

    });
  } else {
    $("body").append(dialog_box);
    menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Guild, 0);
    $("#dialg_box").attr("type", "messages");
    $("#dialg_box").animate({ top: "125" }, 200);

  }

  $("#select_from").remove();
});



/*
 * 
 * @type type
 *   when  one result is clicked in  ranks
 *   
 *   
 */
$(document).on("click", ".show-guild-prev", function () {

  var id_guild = $(this).attr("data-id-guild");


  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/getGuildDetail`,
    data: {
      idGuild: id_guild,
      token: Elkaisar.Config.OuthToken
    },

    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (isJson(data)) {
        var json_data = JSON.parse(data);
      } else {
        Elkaisar.LBase.Error(data);
        return;
      }

      var over_layer = `  <div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review">
                                            <div class="upper" style="height: 185px;">
                                                <div class="table flex">
                                                    <div class="left">
                                                        <img src="images/style/bottom-${json_data.slog_btm}.png" style="position: absolute">
                                                        <img src="images/style/central-${json_data.slog_cnt}.png" style="position: absolute">
                                                        <img src="images/style/top-${json_data.slog_top}.png" style="position: absolute">
                                                    </div>
                                                    <div class="right">
                                                        <div class="t-r">
                                                            <label>${json_data.p_name}</label>
                                                            <label>: المدير</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.rank_g)}</label>
                                                            <label>: تصنيف</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.mem_num)}</label>
                                                            <label>: الاعضاء</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.lvl)}</label>
                                                            <label>: مستوى</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.prestige)}</label>
                                                            <label>: برستيج</label>
                                                        </div>
                                                        <div class="t-r">
                                                            <label>${getArabicNumbers(json_data.honor)}</label>
                                                            <label>: شرف</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <table>
                                                    <tbody>

                                                        <tr>
                                                            <td colspan="3" style="text-align: center; line-height: 34px;">
                                                                <h1 style="background-image: url(&quot;images/background/profile_name.png&quot;);
                                                                    background-size: 75% 100%;
                                                                    background-repeat: no-repeat;
                                                                    background-position: center;"> ${json_data.name}</h1>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                                <p>
                                                    ${json_data.word || "لا توجد مقدمة"}
                                                </p>
                                                ${!Elkaisar.DPlayer.GuildData || !Elkaisar.DPlayer.GuildData.id_guild ? `<div id="send-guild-req" >
                                                                                    <button class="full-btn full-btn-2x" data-id-guild="${json_data.id_guild}">ارسال دعوة انضمام</button>
                                                                                </div>` : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

      $("body").append(over_layer);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }


  });

});



var Guild = {

  dialogBox: function (title, nav_bar, content) {

    var nav_list = "";
    nav_bar.forEach(function (one, index) {
      nav_list += ` <li head_title = "${one["title"]}" class="${index === 0 ? "selected" : ""}" >
                               ${one[("title_" + UserLag.language)]}
                           </li>`;
    });

    var nav_bar_list = ` `;


    return `
            <div id='dialg_box' class='guild guild_dialog_box'>
                <div class="head_bar">
                    <img src="images/style/head_bar.png">
                    <div class="title">${title}</div>
                </div>
                ${nav_bar_list}
                <div class="nav_bar">
                    <div class="left-nav">
                         <ul>${nav_list}</ul>
                    </div>
                    <div class="right-nav">
                        <div class="nav_icon">
                            <img  class ="close_dialog" src="images/btns/close_b.png">
                            <div class="full-btn full-btn-1x ellipsis" id="guild_lead">
                                ${Translate.Button.MenuList.LeagueManagement[UserLag.language]}
                            </div>
                            <div class="drop-list">
                                <ul>
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY ? `<li id="chang-g-word"> تعديل المقدمة</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.DEPUTY ? `<li id="change-g-F_E-list">الاصدقاء والاعداء</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SUPERVISOR ? ` <li id="invite-g">دعوة ملك</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SUPERVISOR ? ` <li id="send-g-msg"> ارسال رسالة</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.MENSTER ? ` <li id="change-g-slog"> تغير الشعار</li>` : ""}
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) >= Guild.RANK_DATA.SENIOR_MEM ? ` <li id="resignation-g"> استقالة</li>` : ""}
                                    <li id="leave-g">
                                        الخروج
                                    </li>
                                    ${Number(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER ? ` <li id="destroy-g">تفكيك</li>` : ""}

                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
                ${content}
            </div>`;
  },

  guild_click: function () {
    if (!Elkaisar.DPlayer.GuildData || !Elkaisar.DPlayer.GuildData.id_guild) {
      var box = ` <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">${Translate.Button.General.Use[UserLag.language]}</div>
                                <img class="close close_use_menu" id="closeGuildSelFrom" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div class="container">
                                <div id="two_buttons">
                                    <button class="full-btn full-btn-3x pull-R" id="show_avail_guild"> اعرض الحلف المتاح</button>
                                    <button class="full-btn full-btn-3x pull-L" id="creat_guild"> انشاء حلف </button>
                                </div>
                                <div id="sent_to">
                                    <div class="th">
                                        <div class="td_2 ellipsis">${Translate.Title.TH.PendingLeagueApplication[UserLag.language]}</div>
                                        <div class="td_1 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                    </div>
                                    <div class="tr" id="A-A-guild_req-list">
                                        <div class="td_1 ellipsis"></div>
                                        <div class="td_2 ellipsis"></div>
                                    </div>
                                </div>
                                <div id="sent_from">
                                    <div class="th">
                                        <div class="td_2 ellipsis">${Translate.Title.TH.PendingLeagueInvitation[UserLag.language]}</div>
                                        <div class="td_1 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>

                                    </div>
                                    
                                    <div id="A-A-guild_inv-list">
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                        <div class="tr" rank="2">
                                            <div class="td_1 ellipsis"></div>
                                            <div class="td_2 ellipsis"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
      this.unJoinedPlayer();
      $("body").append(box);

    } else {
      var content = Guild.content_forGuild_data();
      var dialog_box = Guild.dialogBox(Translate.Button.Chat.League[UserLag.language], NavBar.League, content);
      dialogBoxShow(dialog_box);
    }
  },

  unJoinedPlayer: function () {
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/getUnJoinedPlayerData`,
      data: {
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var json_data = JSON.parse(data);
        if (json_data.guild_req.length > 0) {
          var guild = `<div class="td_1" style="width: 70%;">${json_data.guild_req[0].name}</div>
                                <div class="td_2" style="width: 30%;">
                                    <button  class="full-btn full-btn-1x ellipsis" style="width: 80%; margin: auto" id="cansel-guild_req" data-id-guild="${json_data.guild_req[0].id_guild}">${Translate.Button.General.Cancel[UserLag.language]}</button>
                                </div>`;
          $("#A-A-guild_req-list").html(guild);
        }
        if (json_data.guild_inv.length > 0) {
          var guilds = "";
          for (var iii = 0; iii < 5; iii++) {
            if (json_data.guild_inv[iii]) {
              guilds += `  <div class="tr" data-id_guild="${json_data.guild_inv[iii].id_guild}">
                              <div class="td_1" style="width: 50%;">${json_data.guild_inv[iii].name}</div>
                              <div class="td_2" style="width: 48%; margin-right: 2%">
                                <button  class="full-btn full-btn-1x pull-R ellipsis" style="width: 30%;" id="cansel-guild_inv" data-id-guild="${json_data.guild_inv[iii].id_guild}">الغاء</button>
                                <button  class="full-btn full-btn-1x ellipsis" style="width: 30%; display: inline-block; " class="accept-guild-inv" data-id-guild="${json_data.guild_inv[iii].id_guild}" >قبول</button>
                                <button  class="full-btn full-btn-1x pull-R show-guild-prev ellipsis" style="width: 30%; margin-right:3%" >${Translate.Button.MenuList.View[UserLag.language]}</button>
                              </div>
                            </div>`;
            } else {
              guilds += `<div class="tr">
                            <div class="td_1"></div>
                            <div class="td_2"></div>
                          </div>`;
            }
          }
          $("#A-A-guild_inv-list").html(guilds);
        }
      }
    });
  },

  create: function () {
    if ($("#guild-name").val() === "") {
      alert_box.confirmMessage(" لا يمكن ان يكون اسم الحلف خالى");
      return;
    } else if (player.guild_data !== false) {
      return;
    } else if ($("#guild-name").val().length < 5) {
      alert_box.confirmMessage("اسم الحلف اقل من 5 حروف");
      return;
    } else if ($("#guild-name").val().length > 20) {
      alert_box.confirmMessage("يجب ان لا يتعدى اسم الحلف عن 20 حرف");
      return;
    } else {
      var idCity = Elkaisar.CurrentCity.City.id_city;
      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/AGuild/create`,
        data: {
          guildName: $("#guild-name").val(),
          slogBottom: $(".guild_slogan img:first").attr("data-cur_image"),
          slogTop: $(".guild_slogan img:last").attr("data-cur_image"),
          slogMiddle: $(".guild_slogan img:nth-child(2)").attr("data-cur_image"),
          idCity: idCity,
          token: Elkaisar.Config.OuthToken,
          server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
          if (!Elkaisar.LBase.isJson(data))
            return Elkaisar.LBase.Error(data);
          var JsonObject = JSON.parse(data);
          if (JsonObject.state === "ok") {
            $(".close-alert_container").trigger("click");
            Player_profile.getPlayerGuildData();
            Guild.getGuildData();
            Player_profile.refresh_player_data();
            alert_box.succesMessage(`تم انشاء حلف ${JsonObject.GuildData.GuildData.name} بنجاح`);
          } else if (JsonObject.state == "error_0")
            return alert_box.confirmMessage("لا يوجد إسم للحلف");
          else if (JsonObject.state == "error_1")
            return alert_box.confirmMessage("يوجد حلف يحمل نفس الأسم");
          else if (JsonObject.state == "error_2")
            return alert_box.confirmMessage("أنت بالفعل على قوة حلف أخر");
          else if (JsonObject.state == "error_3")
            return alert_box.confirmMessage("لا يوجد لديك موارد كافية لإنشاء حلف");
          else if (JsonObject.state == "error_4")
            return alert_box.confirmMessage("حدث خطاء ما اثناء إنشاء حلف"); else {
            Elkaisar.LBase.Error(data);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
      });
    }

  },
  getGuildData: function () {
    return $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/getGuildData`,
      data: {
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state == "ok") {
          Elkaisar.Guild.GuildData = JsonObject.Guild.GuildData;
          Elkaisar.Guild.LeaderName = JsonObject.Guild.leaderName;
          Elkaisar.Guild.Allay = JsonObject.Guild.Allay;
          Elkaisar.Guild.prizeShare = JsonObject.Guild.prizeShare;
        }
      }
    });
  },
  content_forGuild_data: function () {
    this.getGuildData();
    var all_allaies = "";
    var allaies_count = 0;
    for (var iii = 0; iii < Elkaisar.Guild.Allay.length; iii++) {



      if (Number(Elkaisar.Guild.Allay[iii]["state"]) === 2) {
        all_allaies += `<div class="tr" data-id_guild="${Elkaisar.Guild.Allay[iii]["id_guild"]}">
                                <div class="td friend">${Elkaisar.Guild.Allay[iii]["name"]}</div>
                                <div class="td">
                                    <button class="full-btn full-btn-1x show-guild-prev ellipsis">${Translate.Button.MenuList.View[UserLag.language]} </button>
                                 </div>
                            </div>`;
        allaies_count++;
      }
    }

    for (var iii = 0; iii < 13 - allaies_count; iii++) {
      all_allaies += `<div class="tr">
                                    <div class="td"></div>
                                    <div class="td"></div>
                                </div>`;
    }


    var all_enemy = "";
    var enemy_count = 0;

    for (var iii = 0; iii < Elkaisar.Guild.Allay.length; iii++) {



      if (Number(Elkaisar.Guild.Allay[iii]["state"]) === 1) {
        all_enemy += `<div class="tr" data-id_guild="${Elkaisar.Guild.Allay[iii]["id_guild"]}">
                                <div class="td enemy">${Elkaisar.Guild.Allay[iii]["name"]}</div>
                                <div class="td">
                                    <button class="full-btn full-btn-1x show-guild-prev ellipsis">${Translate.Button.MenuList.View[UserLag.language]} </button>
                                 </div>
                            </div>`;
        enemy_count++;
      }
    }
    for (var iii = 0; iii < 13 - enemy_count; iii++) {
      all_enemy += `<div class="tr">
                                </div>`;
    }


    var content = ` <div class="box_content for_guild" id="guild-guild_data">
                            <div class="left-content">
                                <div class="upper">
                                    <div class="table">
                                        <div class="t-row">
                                            <div class="t-d">
                                                <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" style="position: absolute">
                                                <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" style=" position: absolute">
                                                <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" style="position: absolute">
                                            </div>
                                        </div>
                                        <div class="t-row">
                                            <div class="t-r">
                                                <div class="t-d"> :مدير</div>
                                                <div class="t-d">${Elkaisar.Guild.LeaderName}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : الاعضاء</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.mem_num}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : مستوى</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.lvl}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : برستيج</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.prestige}</div>
                                            </div>
                                            <div class="t-r">
                                                <div class="t-d"> : شرف</div>
                                                <div class="t-d">${Elkaisar.Guild.GuildData.honor}</div>
                                            </div>
                                        </div>
                                        <p style="clear: both"></p>
                                        <div class="t-row">
                                            <h1>
                                                ${Elkaisar.Guild.GuildData.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="down">
                                    <div class="th ellipsis"><div class="td_1 ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div></div>
                                    <p>
                                       ${Elkaisar.Guild.GuildData.word || "لا توجد مقدمة"}   
                                    </p>
                                </div>
                            </div>
                            <div class="right-content">
                                <div id="leftofright" class="pull-L">
                                    <div id="guild_domain">
                                        <img src="images/world/smallMap.jpg"/>
                                    </div>
                                </div>
                                <div id="rightofright" class="pull-R">

                                        <div class="th">
                                            <div class="td ellipsis" id="show_allay">${Translate.Title.TH.Friendly[UserLag.language]}</div>
                                            <div class="td ellipsis" id="show_enemy">${Translate.Title.TH.Hostile[UserLag.language]}</div>
                                        </div>
                                        <div id="guild_allaies">${all_allaies}</div>
                                        <div id="guild_enemy" style="display: none">${all_enemy}</div>
                                  
                                </div>
                            </div>
                        </div>`;

    return content;
  },

  getGuildMemeber: function (offset) {

    if (!offset) {
      offset = 0;
    }
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/getGuildMember`,
      data: {
        offset: offset,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        const guild_data = JSON.parse(data);
        var all_member = "";
        for (var iii = 0; iii < guild_data.length; iii++) {
          all_member += ` <div class="tr" data-offset="${offset + iii}" 
                                          data-id-member="${guild_data[iii].id_player}" 
                                          data-member-rank="${guild_data[iii].rank}"
                                          data-prize-share="${guild_data[iii].prize_share}">
                      
                                          <div class="td_1 ellipsis" style="width : 17%">${guild_data[iii].name}</div>
                                          <div class="td_2 ellipsis" style="width : 12%">${guild_ranks[guild_data[iii].rank].ar_title}</div>
                                          <div class="td_3 ellipsis" style="width : 14%">${guild_data[iii].prize_share}%</div>
                                          <div class="td_4 ellipsis" style="width : 13%">${Elkaisar.BaseData.Promotion[guild_data[iii].porm].Title}</div>
                                          <div class="td_5 ellipsis" style="width : 16%"> ${getArabicNumbers(guild_data[iii].prestige)}</div>
  
                                          <div class="td_6 ellipsis" style="width : 12%">${Number(guild_data[iii].online) === 1 ? "<span style='color:#34740e'>متصل الان</span>" : lastSeen(guild_data[iii].last_seen)}</div>
                                          <div class="td_7 ellipsis" style="width : 16%">
                                              <button class="full-btn full-btn-1x pull-L show-player-profile ellipsis" data-id-player=${guild_data[iii].id_player}>${Translate.Button.MenuList.View[UserLag.language]} </button>
                                              <button class="full-btn full-btn-1x pull-R guild-mem-action-for_admins ellipsis" ${parseInt(Elkaisar.DPlayer.GuildData.rank) < 2 ? "disabled" : ""}>${Translate.Button.General.Action[UserLag.language]}</button>
                                              <div class="drop-down-li">
                      
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) > parseInt(guild_data[iii].rank) && parseInt(guild_data[iii].rank) > 0 ? `<div id="isolate-guild-member">عزل من المنصب</div>` : ""}
                                                  
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= 5 &&
              parseInt(guild_data[iii].rank) < 6 &&
              parseInt(Elkaisar.DPlayer.Player.id_player) !== parseInt(guild_data[iii].id_player) ?
              `<div id="promote-guild-member">ترقية    &nbsp;&nbsp;&#8618;</div>` : ""}
                                                  
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) > parseInt(guild_data[iii].rank) ? `<div id="trade-guild-position">تبادل المناصب</div>` : ""}
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= Number(Guild.RANK_DATA.LEADER) ? `<div class="mem-prize-percent">نسبة الجوائز</div>` : ""}
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= 4 && parseInt(guild_data[iii].rank) === 0 ? ` <div id="fire-guild-mamber">${Translate.Button.Hero.Dismiss[UserLag.language]}</div>` : ""}
                                                  ${parseInt(Elkaisar.DPlayer.GuildData.rank) >= 1 && parseInt(guild_data[iii].id_player) === parseInt(Elkaisar.DPlayer.Player.id_player) && parseInt(Elkaisar.DPlayer.GuildData.rank) !== 6 ? ` <div id="stepdown-guild-mamber">تنحى من المنصب</div>` : ""}
                                                  ${parseInt(guild_data[iii].id_player) === parseInt(Elkaisar.DPlayer.Player.id_player) ? ` <div id="get-out-guild">خروج</div>` : ""}
                                                  
                                                  
                                              </div>
                                          </div>
                                      </div>`;
        }


        for (var iii = 0; iii < 10 - guild_data.length; iii++) {
          all_member += ` <div class="tr" ></div>`;
        }
        $("#AFTER-AJAX-allMember").html(all_member);
      }
    });
  },
  content_forRelation: function () {

    var guild_data;
    var content = ` <div class="box_content for_guild" id="guild-g_relation">
                            <div class="left-content">
                                <div class="upper" id="join-req-list">
                                    <div class="th"><div class="td_1 ellipsis">${Translate.Title.TH.PendingApplicationApproval[UserLag.language]}</div></div>
                                    <div  class="search_res" style="display: block;">
                                        <ul id="AFTER-AJAX-join-req-mem">

                                        </ul>
                                    </div>
                                </div>
                                <div class="down" id="invited-list">
                                    <div class="th">
                                        <div class="td_1 ellipsis">${Translate.Title.TH.Invite[UserLag.language]}</div>
                                    </div>
                                    <div  class="search_res" style="display: block;">
                                        <ul id="AFTER-AJAX-invited-mem"> 

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="right-content">
                                <div class="left-content full">  

                                    <div class="th">
                                        <div class="td_1 ellipsis" style="width : 17%">${Translate.Title.TH.Member[UserLag.language]}</div>
                                        <div class="td_2 ellipsis" style="width : 12%">${Translate.Title.TH.Post[UserLag.language]}</div>
                                        <div class="td_2 ellipsis" style="width : 14%">${Translate.Title.TH.PrizeShare[UserLag.language]}</div>
                                        <div class="td_3 ellipsis" style="width : 13%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                                        <div class="td_5 ellipsis" style="width : 16%">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                                        <div class="td_6 ellipsis" style="width : 12%">${Translate.Title.TH.LastSeen[UserLag.language]}</div>
                                        <div class="td_7 ellipsis" style="width : 16%">${Translate.Button.General.Action[UserLag.language]}</div>
                                    </div>
                                    <div id="AFTER-AJAX-allMember"></div>
                                </div>  

                            </div>
                            <div class="right-content-footer" >  
                                <div class="buttons">  
                                    <ul>  
                                        <li>  
                                            <div class="full-btn full-btn-2x">  
                                                ${Translate.Button.MenuList.ViewLeagueRank[UserLag.language]}  
                                            </div>  
                                        </li> 
                                        <li>
                                            <div class="nav_icon flex" id="navigate-member-guild-list">
                                                <button data-move="most-left" class="left move_g_page most-left-btn pull-L"></button>
                                                <button data-move="left"  class="left move_g_page left-btn pull-L"></button>
                                                <h1> 1/${Math.ceil(Elkaisar.Guild.GuildData.mem_num / 10)}</h1>
                                                <button data-move="most-right"  class="right move_g_page pull-R most-right-btn"></button>
                                                <button data-move="right"  class="right move_g_page pull-R right-btn"></button>
                                            </div>
                                        </li>

                                        <li id="nav_input" class="flex">  
                                            <input type="text" class="input">
                                            <div class="full-btn full-btn-1x ellipsis">  
                                                ${Translate.Button.General.GoTo[UserLag.language]}   
                                            </div>
                                        </li>

                                        <li id="search_select" style=" width: 85px;">  
                                            <select>
                                                <option selected="">الاسم</option>
                                            </select>
                                        </li>
                                        <li id="nav_search" class="flex"> 
                                            <input type="text" class="input">
                                            <div class="full-btn full-btn-1x ellipsis">  
                                                ${Translate.Button.General.Search[UserLag.language]}
                                            </div>
                                        </li>

                                    </ul>  
                                </div>  

                            </div> 
                        </div>`;

    $(".for_guild").replaceWith(content);
    showInVitedMembers();
    this.getGuildMemeber(0);
  },

  content_forUpgrade: function () {

    var guild_data;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/getGuildResource`,
      data: {
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (isJson(data)) {
          var guild_data = JSON.parse(data);
        } else {
          Elkaisar.LBase.Error(data);
          return;
        }

        var content = `  <div class="box_content for_guild up_guild">
                            <div class="left-content">
                                <div class="upper">
                                    <div class="banner-red">تطوير الحلف</div>
                                    <div class="guild-banner">
                                      <div id="guild-lvl">${getArabicNumbers(guild_data.lvl)}</div>
                                      <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png">
                                      <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" >
                                      <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png">
                                    </div>
                                </div>
                                <button class="full-btn  full-btn-2x" id="upgrade_guild" ${Guild.isUpgradable(guild_data) ? "" : "disabled"}>
                                    ${Translate.Button.General.Upgrade[UserLag.language]}
                                </button>
                            </div>
                            <div class="right-content">
                                <div class="left pull-L">
                                    <table border="1">
                                      <td colspan="6" class="th ellipsis">
                                        ${guild_data.lvl < 10 ? "المواد المطلوبة لتطوير الحلف" : "لا يمكنك تطوير الحلف بالموارد مرة اخرى"}
                                      </td>
                                      <tr>
                                          <td>
                                            <img src="images/style/food.png"/>
                                          </td>
                                          <td class="${guild_data.food >= guild_data.lvl * 1250000 ? 'enough' : 'not_enough'}">
                                            ${guild_data.lvl < 10 ? getArabicNumbers(guild_data.lvl * 1250000) : "----"}
                                          </td>
                                          <td>
                                            <img src="images/style/stone.png"/>
                                          </td>
                                          <td class="${guild_data.stone >= guild_data.lvl * 1250000 ? 'enough' : 'not_enough'}">
                                            ${guild_data.lvl < 10 ? getArabicNumbers(guild_data.lvl * 1250000) : "----"}
                                          </td>
                                          <td>
                                            <img src="images/style/coin.png"/>
                                          </td>
                                          <td class="${guild_data.coin >= guild_data.lvl * 1000000 ? 'enough' : 'not_enough'}">
                                            ${guild_data.lvl < 10 ? getArabicNumbers(guild_data.lvl * 1000000) : "----"}
                                          </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src="images/style/wood.png"/>
                                        </td>
                                        <td class="${guild_data.wood >= guild_data.lvl * 1250000 ? 'enough' : 'not_enough'}">
                                          ${guild_data.lvl < 10 ? getArabicNumbers(guild_data.lvl * 1250000) : "----"}
                                        </td>
                                        <td>
                                          <img src="images/style/iron.png"/>
                                        </td>
                                        <td class="${guild_data.metal >= guild_data.lvl * 1250000 ? 'enough' : 'not_enough'}">
                                          ${guild_data.lvl < 10 ? getArabicNumbers(guild_data.lvl * 1250000) : "----"}
                                        </td>
                                      </tr>
                                    </table>
                                    <div class="up_with_mat">
                                      <button class="full-btn pull-L" id="up_with_mat">
                                          <img src="images/icons/pluse.png">
                                          ${Translate.Button.General.Use[UserLag.language]}
                                      </button>
                                      <h1 class="pull-R">
                                        (استعمال احد شعارات الحلف لتطوير الحلف) 
                                      </h1>
                                    </div>
                                </div>
                                <div class="right pull-R ">
                                    <h1 class="header-2 th">
                                        المستوى الحالى
                                    </h1>
                                    <div>
                                        <p>
                                            عدد اعضاء الحلف الحالى هم ${getArabicNumbers(guild_data.mem_num)} عضو
                                            سعة الحلف الاجمالية ${getArabicNumbers(guild_data.lvl * 10)} عضو 
                                            وسعة استيعاب الموارد هى ${getArabicNumbers(guild_data.lvl * 1000000)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="right-content-footer" >  
                                <div class="left pull-L">
                                  <div class="table" id="guild-res-table">
                                      <div class="td"  style="width: 13.4%;"></div>
                                      <div  class="td" style="width: 73px;" data-resource="wood" data-count="${guild_data.wood}">
                                        ${getArabicNumbers(guild_data.wood)}
                                      </div>
                                      <div  class="td" style="width: 73px;" data-resource="stone" data-count="${guild_data.stone}">
                                        ${getArabicNumbers(guild_data.stone)}
                                      </div> 
                                      <div  class="td" style="width: 73px;" data-resource="metal" data-count="${guild_data.metal}">
                                        ${getArabicNumbers(guild_data.metal)}
                                      </div>
                                      <div  class="td" style="width: 73px;"  data-resource="food" data-count="${guild_data.food}">
                                        ${getArabicNumbers(guild_data.food)}
                                      </div>
                                      <div  class="td" style="width: 73px;" >
                                        ----
                                      </div> 
                                      <div  class="td" style="width: 73px; margin-top: 10px;">
                                        <img src="images/style/coin.png" style="margin-bottom: -26px;"/>
                                        <div  data-resource="coin" data-count="${guild_data.coin}" >${getArabicNumbers(guild_data.coin)}</div>
                                      </div> 
                                    </div>
                                    <ol id="input-guild-donate">
                                        <li>
                                          <input type="text" value="0" class="only_num input"  min="0" data-resource="wood" max="${Math.floor(Elkaisar.CurrentCity.City.wood)}" min="0" step="${Math.floor(Elkaisar.CurrentCity.City.wood)}"/>
                                        </li>
                                        <li>
                                          <input type="text" value="0" class="only_num input"  min="0" data-resource="stone" max="${Math.floor(Elkaisar.CurrentCity.City.stone)}" step="${Math.floor(Elkaisar.CurrentCity.City.stone)}"/>
                                        </li>
                                        <li>
                                          <input type="text" value="0" class="only_num input"  min="0" data-resource="metal" max="${Math.floor(Elkaisar.CurrentCity.City.metal)}" step="${Math.floor(Elkaisar.CurrentCity.City.metal)}"/>
                                        </li>
                                        <li>
                                          <input type="text" value="0" class="only_num input"  min="0" data-resource="food" max="${Math.floor(Elkaisar.CurrentCity.City.food)}" step="${Math.floor(Elkaisar.CurrentCity.City.food)}"/>
                                        </li>
                                        <li>
                                          <input type="text" value="0" class="only_num input" style="margin-left: 82px;"  min="0"  data-resource="coin" max="${Math.floor(Elkaisar.CurrentCity.City.coin)}" step="${Math.floor(Elkaisar.CurrentCity.City.coin)}"/>
                                        </li>
                                    </ol>
                                </div>
                                <div class="right pull-R">
                                    <button class="full-btn full-btn-3x" id="guild-donate">
                                        ${Translate.Button.MenuList.Deposite[UserLag.language]}
                                    </button>
                                </div>
                            </div> 
                        </div>`;

        $(".for_guild").replaceWith(content);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });


  },

  isUpgradable(guild_data) {

    if (parseInt(Elkaisar.DPlayer.GuildData.rank) < 4) {

      return false;

    } else if (guild_data.food < guild_data.lvl * 1250000) {

      return false;

    } else if (guild_data.wood < guild_data.lvl * 1250000) {

      return false;

    } else if (guild_data.metal < guild_data.lvl * 1250000) {

      return false;

    } else if (guild_data.stone < guild_data.lvl * 1250000) {

      return false;

    } else if (guild_data.coin < guild_data.lvl * 1000000) {

      return false;

    }

    return true;


  }




};

$(document).on("PlayerReady", "html", function () {
  Guild.getGuildData();
});


const guild_ranks = {
  "0": {
    "ar_title": "عضو عادى"
  },
  "1": {
    "ar_title": "عضو رسمى"
  },
  "2": {
    "ar_title": "عضو كبير"
  },
  "3": {
    "ar_title": "المستشار"
  },
  "4": {
    "ar_title": "الوزير"
  },
  "5": {
    "ar_title": "نائب المدير"
  },
  "6": {
    "ar_title": " المدير"
  }

};
Guild.RANK_DATA = {
  NORMAL_MEM: 0,
  SENIOR_MEM: 1,
  OLD_MEM: 2,
  SUPERVISOR: 3,
  MENSTER: 4,
  DEPUTY: 5,
  LEADER: 6

};

/*
 * 
 * GUILD MATRIAL DONAtE
 * 
 */

$(document).on("click", "#guild-donate", function () {

  var food = parseInt($('#input-guild-donate input[data-resource="food"]').val()) || 0;
  var wood = parseInt($('#input-guild-donate input[data-resource="wood"]').val()) || 0;
  var stone = parseInt($('#input-guild-donate input[data-resource="stone"]').val()) || 0;
  var metal = parseInt($('#input-guild-donate input[data-resource="metal"]').val()) || 0;
  var coin = parseInt($('#input-guild-donate input[data-resource="coin"]').val()) || 0;

  if (food + wood + stone + metal + coin < 10000) {

    alert_box.confirmMessage("لا يمكنك التبرع باقل من 10 الاف  مورد");
    return;

  }
  var idCity = Elkaisar.CurrentCity.City.id_city;

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/donateRes`,
    data: {
      idCity: idCity,
      food: food,
      wood: wood,
      stone: stone,
      metal: metal,
      coin: coin,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        Elkaisar.City.getCity(idCity).City = JsonObject.CityRes;
        Elkaisar.Guild.GuildData = JsonObject.GuildData.GuildData;
        Elkaisar.Guild.Allay = JsonObject.GuildData.Allay;
        Elkaisar.Guild.LeaderName = JsonObject.GuildData.leaderName;
        Elkaisar.Guild.prizeShare = JsonObject.GuildData.prizeShare;

        /* zero the inputs*/
        $('#input-guild-donate input').val("0");

        city_profile.refresh_resource_view();
        city_profile.refresh_army_view();
        /*refresh the view*/
        resourcesRefresh();

        /*  refresh  the data in page*/
        Guild.content_forUpgrade();

      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

});


$(document).on("click", "#creat_guild", function () {

  var box = `  <div id="alert_container" class="bg-general" style=" position:fixed; width: 560px; 
                        z-index:1000;left: 50%;margin-left: -280px; top: 150px; 
                        height:318px"> 
                    <div id="alert_head">    
                        <div>        
                            <img src="images/panner/king_name.png">    
                        </div>       
                        <div id="alert-title">
                             انشاء حلف
                        </div>            
                        <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                    </div>
                    <div id="alert_box" class="guild_creat" >        
                        <div class="row-one">
                            <div class="pull-L left">
                                <div class="guild_slogan" >
                                    <img src="images/style/bottom-1.png" data-place="bottom" data-cur_image="1">
                                    <img src="images/style/central-1.png" data-place="middle" data-cur_image="1">
                                    <img src="images/style/top-1.png" data-place="top" data-cur_image="1">
                                        
                                </div>
                            </div>
                            <div class="pull-R right">
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="top"></div>
                                    <h1>1/21</h1>
                                    <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="top"></div>
                                </div>
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left"  data-place="middle"></div>
                                    <h1>1/4</h1>
                                    <div class="pull-R loop-guild-slogan right-btn"  data-direction="right"  data-place="middle"></div>

                                </div>
                                <div class="nav_icon">
                                    <div class="pull-L loop-guild-slogan left-btn" data-direction="left"  data-place="bottom"></div>
                                    <h1>1/5</h1>
                                    <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="bottom"></div>

                                </div>
                            </div>
                        </div>  
                        <div class="row-two bg-btn-blu" style="background-size: 105% 123%;
                                            background-position: center;
                                            background-repeat: no-repeat;
                                            background-position-y: 0px;">
                            <input type="text" class="input" placeholder="اسم الحلف" id="guild-name"/>
                        </div>
                        <div class="row-three">        
                            <div class="confim-btn">            
                                <button id="conf_creat_guild" class="full-btn full-btn-2x  enter"  >تاكيد وانشاء</button>    

                            </div>    
                        </div>
                    </div>    
                </div>`;

  $("body").append(box);
  $("#select_from").remove();
});


/*
 * 
 * player   change the slogan
 * 
 */

$(document).on("click", ".loop-guild-slogan", function () {

  var direction = $(this).data("direction");
  var place = $(this).data("place");
  var counter;
  if (direction === "right") {

    if (place === "top") {

      if (parseInt($(".guild_slogan img:last").attr("data-cur_image")) < 21) {

        var next_img = `images/style/top-${parseInt($(".guild_slogan img:last").attr("data-cur_image")) + 1}.png`;
        counter = parseInt($(".guild_slogan img:last").attr("data-cur_image")) + 1;

      } else {

        var next_img = `images/style/top-21.png`;
        counter = 21;

      }

      $(".guild_slogan img:last").attr("src", next_img);
      $(".guild_slogan img:last").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:first h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(21));

    } else if (place === "bottom") {


      if (parseInt($(".guild_slogan img:first").attr("data-cur_image")) < 5) {

        var next_img = `images/style/bottom-${parseInt($(".guild_slogan img:first").attr("data-cur_image")) + 1}.png`;
        counter = parseInt($(".guild_slogan img:first").attr("data-cur_image")) + 1;

      } else {

        var next_img = `images/style/bottom-5.png`;
        counter = 5;

      }

      $(".guild_slogan img:first").attr("src", next_img);
      $(".guild_slogan img:first").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:nth-child(3) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(5));


    } else if (place === "middle") {


      if (parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) < 4) {

        var next_img = `images/style/central-${parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) + 1}.png`;
        counter = parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) + 1;

      } else {

        var next_img = `images/style/central-4.png`;
        counter = 4;

      }

      $(".guild_slogan img:nth-child(2)").attr("src", next_img);
      $(".guild_slogan img:nth-child(2)").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:nth-child(2) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(4));

    }


  } else {


    if (place === "top") {

      if (parseInt($(".guild_slogan img:last").attr("data-cur_image")) > 1) {

        var next_img = `images/style/top-${parseInt($(".guild_slogan img:last").attr("data-cur_image")) - 1}.png`;
        counter = parseInt($(".guild_slogan img:last").attr("data-cur_image")) - 1;

      } else {

        var next_img = `images/style/top-1.png`;
        counter = 1;

      }

      $(".guild_slogan img:last").attr("src", next_img);
      $(".guild_slogan img:last").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:first h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(21));

    } else if (place === "bottom") {


      if (parseInt($(".guild_slogan img:first").attr("data-cur_image")) > 1) {

        var next_img = `images/style/bottom-${parseInt($(".guild_slogan img:first").attr("data-cur_image")) - 1}.png`;
        counter = parseInt($(".guild_slogan img:first").attr("data-cur_image")) - 1;

      } else {

        var next_img = `images/style/bottom-1.png`;
        counter = 1;

      }

      $(".guild_slogan img:first").attr("src", next_img);
      $(".guild_slogan img:first").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:nth-child(3) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(5));


    } else if (place === "middle") {


      if (parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) > 1) {

        var next_img = `images/style/central-${parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) - 1}.png`;
        counter = parseInt($(".guild_slogan img:nth-child(2)").attr("data-cur_image")) - 1;

      } else {

        var next_img = `images/style/central-1.png`;
        counter = 1;

      }

      $(".guild_slogan img:nth-child(2)").attr("src", next_img);
      $(".guild_slogan img:nth-child(2)").attr("data-cur_image", counter);
      $(".guild_creat .nav_icon:nth-child(2) h1").html(getArabicNumbers(counter) + "/" + getArabicNumbers(4));

    }



  }




});



/*____________________________________________________________________________*/
$(document).on("click", "#show_enemy", function () {
  $("#guild_enemy").show();
  $("#guild_allaies").hide();
  $("#show_enemy").addClass("selected");
  $("#show_allay").removeClass("selected");
});

$(document).on("click", "#show_allay", function () {
  $("#guild_enemy").hide();
  $("#guild_allaies").show();
  $("#show_allay").addClass("selected");
  $("#show_enemy").removeClass("selected");
});



/*                              تطوير الحلف  بالشعارات*/

$(document).on("click", "#up_with_mat", function () {
  BoxOfMatrialToUse(
    ["union_slogan", "union_declar", "union_era"],
    "upgrade_guild",
    1
  );
});


$(document).on("click", ".use_to_up_guild", function () {
  var matrial_name = $(this).attr("matrial_name");
  var use_for = $(this).attr("use_for");
  var amount = $(this).attr("amount");
  var title = `تأكيد استعمال ${getArabicNumbers(amount)} ${Elkaisar.BaseData.Items[matrial_name].name} من  صندوق المواد الخاص`;
  var content = alert_box.confirmUse_single(use_for, matrial_name, title);
  var alert = alert_box.alert(Translate.Button.Building.Confirm[UserLag.language], content);

  $("body").append(alert);
});






// when player click his guild_name

$("#player_guild").click(function () {
  $(".menu-list").each(function () {
    if ($(this).data("show") === "union") {
      $(this).trigger("click");
    }
  });
});




/*   show guild leading list  */
$(document).on("click", "#guild_lead", function () {

  $(this).next(".drop-list").slideToggle();

});





/*   CHANGE GUILD WORD   */
$(document).on("click", "#chang-g-word", function () {

  var current_guild = `<div id="over_lay">
                            <div id="select_from">
                                <div class="head_bar">
                                    <img src="images/style/head_bar.png" class="banner">
                                    <div class="title">المقدمة</div>
                                    <img class="close close_use_menu" src="images/btns/close_b.png">
                                </div>
                                <p style="clear: both"></p>
                                <div id="rank-review">
                                    <div class="upper">
                                        <div class="upper" style="height: 185px;">
                                            <div class="table flex">
                                                <div class="left">
                                                    <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" style="position: absolute">
                                                    <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" style="position: absolute">
                                                    <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" style="position: absolute">
                                                </div>
                                                <div class="right">
                                                    <div class="t-r">
                                                        <label>${Elkaisar.Guild.GuildData.p_name}</label>
                                                        <label>: المدير</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.rank_g)}</label>
                                                        <label>: تصنيف</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.mem_num)}</label>
                                                        <label>: الاعضاء</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.lvl)}</label>
                                                        <label>: مستوى</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.prestige)}</label>
                                                        <label>: برستيج</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Guild.GuildData.honor)}</label>
                                                        <label>: شرف</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <table>
                                                <tbody>

                                                    <tr>
                                                        <td colspan="3" style="text-align: center; line-height: 34px;">
                                                            <h1 style="background-image: url(&quot;images/background/profile_name.png&quot;);
                                                                background-size: 75% 100%;
                                                                background-repeat: no-repeat;
                                                                background-position: center;"> ${Elkaisar.Guild.GuildData.name}</h1>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="down">
                                        <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                        <p>
                                            <textarea value="${Elkaisar.Guild.GuildData.word}" class="input">${Elkaisar.Guild.GuildData.word}</textarea>
                                            <button class="full-btn full-btn-2x " id="save-g-intro" > تعديل</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;


  $("body").append(current_guild);


});


/*      MDIFY   THE INTODUCTION FOR  GUILD    */
$(document).on("click", "#save-g-intro", function () {

  var self_ = $(this);
  var new_intro = $(this).prev("textarea").val();

  if (new_intro.length === 0) {
    alert_box.failMessage("مقدمة غير مسموح بها ");
    return;

  }
  if (Number(Elkaisar.DPlayer.GuildData.rank) < 6) {
    alert_box.failMessage("غير مسموح بتغير المقدمة  الا بواسطة المدير");
    return;
  }
  if (new_intro === Elkaisar.Guild.GuildData.word) {
    alert_box.confirmMessage("لم يتم تغير المقدمة");
    return;
  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/modifyGuildWord`,

    data: {
      newWord: new_intro,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'POST',
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        Elkaisar.Guild.GuildData = JsonObject.GuildData.GuildData;
        Elkaisar.Guild.Allay = JsonObject.GuildData.Allay;
        Elkaisar.Guild.LeaderName = JsonObject.GuildData.leaderName;
        Elkaisar.Guild.prizeShare = JsonObject.GuildData.prizeShare;
        self_.parents("p").html(new_intro);
        Elkaisar.Guild.GuildData.word = new_intro;
        alert_box.succesMessage("تم تعديل المقدمة بنجاح");
      } else if (JsonObject.state == "error_0") {
        alert_box.failMessage("لست عضواً بهذا الحلف");
      } else if (JsonObject.state == "error_1") {
        alert_box.failMessage("لا يمكن تعديل المقدمة إلا بواسطة قائد الحلف");
      } else if (JsonObject.state == "error_2") {
        alert_box.failMessage("لا يمكن أن تكون المقدمة أكثر من 512 حرف");
      }
    }

  });

});

$(document).on("click", "#change-g-F_E-list", function () {

  var content = alert_box.alert_content_Guild_FE_list();
  var box = `   <div id="over_lay_alert">   
                            <div id="guild-alert-box">    
                                <div id="alert_head">          
                                    <div>               
                                        <img src="images/panner/king_name.png">       
                                    </div>       
                                    <div id="alert-title">الاصدقاء و الاعداء        
                                    </div>           
                                    <img src="images/btns/close_b.png" class="img-sml close-alert">  
                                </div>  
                                   ${content}
                            </div>
                        </div>`;
  $("body").append(box);

});

$(document).on("keyup", "#GuildEneFriInput", function () {

  var search_val = $(this).val();

  if (search_val === "") {

    $("#g-search_result ul").html("");
    $("#g-search_result").hide();
    return;
  }


  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/searchGuildName`,
    data: {
      searchVal: search_val,
      idGuild: Elkaisar.DPlayer.Player.id_guild,
      token: Elkaisar.Config.OuthToken

    },
    type: 'GET',

    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      var json_data = JSON.parse(data);
      var list = "";
      for (var iii = 0; iii < json_data.length; iii++) {
        list += `   <li class="SearchGuildUnitRes" data-id-guild="${json_data[iii].id_guild}" data-g-name = "${json_data[iii].name}"> 
                                <div class="pull-L image">
                                    <img src="images/style/bottom-${json_data[iii].slog_btm}.png">
                                    <img src="images/style/central-${json_data[iii].slog_cnt}.png">
                                    <img src="images/style/top-${json_data[iii].slog_top}.png" >
                                </div>
                                <h1 class="pull-L">${json_data[iii].name}</h1>
                                <h2 class="pull-L">(${getArabicNumbers(json_data[iii].lvl)})</h2>
                            </li>`;
      }

      if (json_data.length) {

        $("#g-search_result").show();
        $("#g-search_result ul").html(list);

      } else {

        $("#g-search_result").hide();
        $("#g-search_result ul").html("");

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
});


$(document).on("click", "#g-search_result .SearchGuildUnitRes", function () {

  var id_guild = parseInt($(this).attr("data-id-guild"));
  var guild_name = $(this).attr("data-g-name");

  $(".F_E-list .row-1 input").val(guild_name);
  $(".F_E-list .row-1 input").attr("data-id-guild", id_guild);
  $(".F_E-list .row-1 input").attr("data-g-name", guild_name);


  $("#g-search_result").hide();
  $("#g-search_result ul").html("");

});


$(document)['on']('click', '#submit-guild-relation', function () {
  var GuildRel = $('.F_E-list input[name=guild_relation]:checked')['val']();
  var idGuild = parseInt($('.F_E-list .row-1 input')['attr']('data-id-guild'));
  if (!idGuild) {
    alert_box.confirmMessage('عليك اختيار الحلف اولا');
    return;
  } else if (!GuildRel['length']) {
    alert_box.confirmMessage('اختار العلاقة بين الحلفين');
    return;
  }
  $.ajax({
    'url': Elkaisar.Config.NodeUrl + '/api/AGuild/changeGuildRelation',
    'data': {
      'idGuild': idGuild,
      'relation': GuildRel,
      'token': Elkaisar.Config.OuthToken,
      'server': Elkaisar.Config.idServer
    },
    'type': 'POST',
    'success': function (data, _0x5b5eee, _0x5af2f1) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonData = JSON.parse(data);
      if (JsonData.state == 'ok') {
        $('.close-alert').click();
        alert_box.succesMessage('تم اضافة العلاقة بين الحلفين بنجاح');
        Guild.getGuildData().done(function () {
          if ($('.left-nav .selected')['attr']('head_title') === 'guild_data') {
            $('.left-nav .selected').click();
            Elkaisar.World.Map.RefreshWorld();
          }
        });
      } else if (JsonData['state'] == 'error_0')
        alert_box['failMessage']('لست عضو فى الحلف');
      else if (JsonData['state'] == 'error_1')
        alert_box['failMessage']('رتيتك فى الحلف لا تسمح');
      else if (JsonData['state'] == 'error_2')
        alert_box['failMessage']('نوع العلاقة غير صالحة')
      else
        Elkaisar.LBase.Error(data);

    },
    'error': function (_0xf6addd, _0x324ef9, _0x45d39a) { }
  });
});


/*
 * 
 *        GUILD INVITE PLAYER 
 */

$(document).on("click", "#invite-g", function () {

  var content = alert_box.alert_content_Guild_Invite();
  var box = `   <div id="over_lay_alert">   
                            <div id="guild-alert-box">    
                                <div id="alert_head">          
                                    <div>               
                                        <img src="images/panner/king_name.png">       
                                    </div>       
                                    <div id="alert-title">دعوة املك
                                    </div>           
                                    <img src="images/btns/close_b.png" class="img-sml close-alert">  
                                </div>  
                                   ${content}
                            </div>
                        </div>`;
  $("body").append(box);

});


$(document).on("keyup", "#search_by_name_forGuild", function () {

  var segmant = $(this).val();

  if ($.trim(segmant) !== "") {

    searchByName(segmant, true);

  } else {
    $("#search_result ul").empty();
    $("#search_result ").hide();
  }


});


$(document).on("click", "#submit-guild-invite", function () {

  var id_player = parseInt($("#search_by_name_forGuild").attr("id_player"));

  if (!id_player) {

    alert_box.confirmMessage("يجب عليك اختيار ملك");
    return;

  }


  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/sendGuildJoinInv`,
    data: {
      idPlayerToInvite: id_player,
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) { },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state == "ok") {
        $(".close-alert").click();
        if ($("#guild-g_relation").length > 0) {
          showInVitedMembers();
        }
        alert_box.succesMessage('تم ارسال الدعوة بنجح');
        Guild.getGuildData();
      } else if (JsonObject.state == "error_0")
        alert_box.failMessage("اللاعب منضم فى حلف بالفعل");
      else if (JsonObject.state == "error_1")
        alert_box.failMessage("لست عضو فى أى حلف");
      else if (JsonObject.state == "error_3")
        alert_box.failMessage("رتبتك فى الحلف لا تسمح");


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

});


/*  change  guild  slogan*/
$(document).on("click", "#change-g-slog", function () {


  if (!Elkaisar.Guild.GuildData) {
    alert_box.confirmMessage("لا يمكن عرض هذا العنصر");
    return;
  }

  $("#alert_container").remove();

  var new_slogan_co = `<div id="alert_container" class="bg-general" style=" position:fixed; width: 560px; 
                                z-index:1000;left: 50%;margin-left: -280px; top: 150px; height: auto;
                                "> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">
                                    تعديل شعار
                                </div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="guild_creat">        
                                <div class="row-one">
                                    <div class="pull-L left">
                                        <div class="guild_slogan">
                                            <img src="images/style/bottom-${Elkaisar.Guild.GuildData.slog_btm}.png" data-place="bottom" data-cur_image="1">
                                            <img src="images/style/central-${Elkaisar.Guild.GuildData.slog_cnt}.png" data-place="middle" data-cur_image="1">
                                            <img src="images/style/top-${Elkaisar.Guild.GuildData.slog_top}.png" data-place="top" data-cur_image="1">

                                        </div>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="top"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_top)}/21</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="top"></div>
                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="middle"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_cnt)}/4</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="middle"></div>

                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="bottom"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Guild.GuildData.slog_top)}/5</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="bottom"></div>

                                        </div>
                                    </div>
                                </div>  
                                <div class="row-two bg-btn-blu" style="background-size: 105% 123%;
                                                    background-position: center;
                                                    background-repeat: no-repeat;
                                                    background-position-y: 0px;">
                                <input class="input" data-pastable="true" value="${Elkaisar.Guild.GuildData.name}" id="newGuildNameInput">
                                </div>
                                <div class="row-three">        
                                    <div class="confim-btn">            
                                        <button  class="full-btn full-btn-2x  enter" id="updateGuildSlog"> تعديل الشعار</button>    

                                    </div>    
                                </div>
                            </div>    
                        </div>`;
  $("body").append(new_slogan_co);

});


/*
 * send join reqest for guild
 */
$(document).on("click", "#send-guild-req button", function () {

  var id_guild = parseInt($(this).attr("data-id-guild"));

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/sendGuildRequest`,
    data: {
      idGuild: id_guild,
      token: Elkaisar.Config.OuthToken,
    },
    type: 'POST',
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonObject = JSON.parse(data);
      if (JsonObject.state === "ok") {
        alert_box.succesMessage("تم ارسال الدعوة الى المسؤلين للانضمام للحلف");
        $(".close_use_menu").click();
      } else if (JsonObject.state == "error_0")
        alert_box.failMessage("لست منضم فى أى حلف");
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

});


/*
 *  player cansel his own invetation  
 * 
 */

function canselGuildInvetation(id_player, id_guild) {

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/rejectGuildInv`,
    data: {
      idGuild: id_guild,
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        alert_box.succesMessage("تم الغاء  دعوة الانضمام بنجاح");
        $(".close_use_menu").click();
        Guild.getGuildData();
      }


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

}


/*
 *  player cansel his own invetation  
 * 
 */

function canselGuildJoinRequest(id_player, id_guild) {

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/cancelGuildRequest`,
    data: {
      idGuild: id_guild,
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        alert_box.succesMessage("تم الغاء طلب الانضمام بنجاح");
      }


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

}


$(document).on("click", "#cansel-guild_inv", function () {

  var id_guild = parseInt($(this).attr("data-id-guild"));
  var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);

  canselGuildInvetation(id_player, id_guild);
  $(this).parents(".tr").html("");

});


$(document).on("click", "#cansel-guild_req", function () {

  var id_guild = parseInt($(this).attr("data-id-guild"));
  var id_player = parseInt(Elkaisar.DPlayer.Player.id_player);

  canselGuildJoinRequest(id_player, id_guild);
  $(this).parents(".tr").html("");
  $(".close_use_menu").click();
});



/*
 * 
 * accept guild invetation
 * 
 */
$(document).on("click", ".accept-guild-inv", function () {

  var id_guild = parseInt($(this).attr("data-id-guild"));

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuildInvReq/acceptGuildInv`,
    data: {
      idGuild: id_guild,
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {

        Player_profile.getPlayerGuildData();

        Guild.getGuildData();
        $("#select_from").remove();
        alert_box.succesMessage("تم انضمامك للحلف واصبحت عضو فيه");
        Player_profile.refresh_player_data();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

});

/*________________________________ACTIONS MADE PY GUILD ADMINS ____________________*/


$(document).on("click", "#isolate-guild-member", function () {

  var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
  var id_member = parseInt($(this).parents(".tr").attr("data-id-member"));

  if (rank_member < parseInt(Elkaisar.DPlayer.GuildData.rank)) {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/removeFromPosition`,
      data: {

        idMember: id_member,
        offset: 0,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer

      },
      type: 'POST',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok") {

          if ($("#guild-g_relation").length > 0) {
            var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
            Guild.getGuildMemeber(offset);
          }

          alert_box.succesMessage("تم عزل الملك بنجاح!")
        }else if(JsonObject.state == "error_3")
          alert_box.failMessage("لا يمكنك عزل ملك أعلى منك بالرتبة ");

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });


  } else {

    alert_box.confirmMessage("لا يمكنك عزل هذا العضو حيث ان رتبته اعلى منك");
    return;

  }

});


/*                  ترقية عضو داخل الحلف*/
$(document).on("click", "#promote-guild-member", function () {


  $(".promote-guild-member").remove();
  var adder = `<ul class="drop-down-li promote-guild-member" style="display: block;">

                        ${Elkaisar.DPlayer.GuildData.rank > 5 ? `<div data-promrote-to="5"> نائب مدير</div>` : ""}
                        <div data-promrote-to="4">وزير</div>
                        <div data-promrote-to="3">مستشار</div>
                        <div data-promrote-to="2">عضو كبير</div>
                        <div data-promrote-to="1">عضو رسمى</div>
                </ul>`;

  $(adder).insertAfter($(this));

});

$(document).on("click", ".promote-guild-member div", function () {

  var id_member = parseInt($(this).parents(".drop-down-li").parents(".tr").attr("data-id-member")) || 0;
  var promotion = $(this).attr("data-promrote-to");

  if (parseInt(Elkaisar.DPlayer.Player.id_player) === parseInt(id_member)) {

    alert_box.confirmMessage("لا يمكنك ترقية نفسك  يا حج :D");
    return;

  } else if (parseInt(Elkaisar.DPlayer.GuildData.rank < 5)) {

    alert_box.confirmMessage("انت فى منصب  لا يسمح لك بترقية الاخرين");
    return;

  } else {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/promotMember`,
      data: {
        idMember: id_member,
        offset: 0,
        newRank: promotion,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer

      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {


        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok") {

          if ($("#guild-g_relation").length > 0) {

            var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
            Guild.getGuildMemeber(offset);

          }
          alert_box.succesMessage("تمت الترقية بنجاح");

        } else if (JsonObject.state === "error_6") {

          alert_box.confirmMessage(`يوجد عدد كافى من ${guild_ranks[promotion].ar_title} لتتطوير هذا العضو عليك عزل ${guild_ranks[promotion].ar_title} اخر`);

        } else if (JsonObject.state === "error_3") {

          alert_box.confirmMessage("انت لا تملك المنصب المناسب لترقة هذا العضو");

        } else {

          Elkaisar.LBase.Error(data)

        }

      },
      beforeSend: function (xhr) {

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  }



});


/*                             تبادل المناصب                                 */
$(document).on("click", "#trade-guild-position", function () {

  var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
  var id_member = parseInt($(this).parents(".tr").attr("data-id-member"));

  if (parseInt(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER) {




    if (!confirm("تاكيد نقل منصب المدير الى شخص اخر بالحلف")) {

      alert_box.confirmMessage("تم الغاء الطلب");
      return;

    }

  }

  if (rank_member >= parseInt(Elkaisar.DPlayer.GuildData.rank)) {


    alert_box.confirmMessage("لا يمكنك تبادل مناصب اعلى او فى نفس مستوى منصبك");
    return;

  } else if (id_member === parseInt(Elkaisar.DPlayer.Player.id_player)) {

    alert_box.confirmMessage("لا يمكنك تبادل مناصب مع نفسك");
    return;

  } else {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/tradePosition`,
      data: {
        idMember: id_member,
        offset: 0,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {
          //Guild.content_forRelation();
          var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
          Guild.getGuildMemeber(offset);
          alert_box.succesMessage("تم تبادل المناصب بنجاح!");
        } else if (JsonObject.state === "error_3") {
          alert_box.confirmMessage("لا يمكنك تبادل مناصب اعلى او فى نفس مستوى منصبك");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }
});
$(document).on("click", ".mem-prize-percent", function () {

  var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));
  var id_member = parseInt($(this).parents(".tr").attr("data-id-member"));
  var prize_share = parseInt($(this).parents(".tr").attr("data-prize-share"));

  if (Number(Elkaisar.DPlayer.GuildData.rank) < Guild.RANK_DATA.LEADER) {

    alert_box.confirmMessage("لا يمكن الا للمدير بتعديل نسب الجوائز للاعب")

  }

  var content = `
                تاكيد تعديل نسبة الجوائز للاعب </br>
                <input id="modfie-prize-share-input" type="text" class="only_num input" value="${prize_share}" 
                    max="${Math.max(100 - Number(Elkaisar.Guild.GuildData.total_prize_share) + prize_share, 0)}" 
                    min="0" step="1"/>`;

  alert_box.confirmDialog(content, function () {

    var newVal = Number($("#modfie-prize-share-input").val());
    if (newVal > Math.max(100 - Number(Elkaisar.Guild.GuildData.total_prize_share) + prize_share, 0)
      || newVal < 0) {
      alert_box.failMessage("نسبة الجوائز غير مسموح بيها");
      return;
    }
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/modifyPrizeShare`,
      data: {
        idMember: id_member,
        offset: 0,
        newPrizeShare: newVal,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (isJson(data)) {

          var jsonData = JSON.parse(data);

          if (jsonData.state === "ok") {

            var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
            Guild.getGuildMemeber(offset);

          } else if (jsonData.state === "error_1") {
            alert_box.failMessage("هذا اللاعب غير موجود بالحلف الحالى");
          } else if (jsonData.state === "error_4") {
            alert_box.failMessage("النسبة الجديدة غير مسموح بها");
          } else if (jsonData.state === "error_5") {
            alert_box.failMessage("لا توجد نسب كافية لهذا اللاعب");
          }


        } else {
          Elkaisar.LBase.Error(data);
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  });




});

/*                     طرد لاعب  */
$(document).on("click", "#fire-guild-mamber", function () {

  var id_member = parseInt($(this).parents(".tr").attr("data-id-member"));
  var rank_member = parseInt($(this).parents(".tr").attr("data-member-rank"));

  if (!id_member) {

    return;

  }

  alert_box.confirmDialog("تاكيد طرد اللاعب ", function () {

    if (rank_member === 0) {

      $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/fireMember`,
        data: {
          idMember: id_member,
          offset: 0,
          token: Elkaisar.Config.OuthToken,
          server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {

          if (!Elkaisar.LBase.isJson(data))
            return Elkaisar.LBase.Error(data);

          var JsonObject = JSON.parse(data);

          if (JsonObject.state === "ok") {

            var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
            Guild.getGuildMemeber(offset);
            alert_box.succesMessage("تم حذف العضو بنجاح");

          } else if (data === "error_0") {

            alert_box.confirmMessage("انت لست فى منصب يسمح لك ذالك");

          }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

      });


    } else {

      alert_box.confirmMessage("لا يمكنك طرد عضو موجود بمنصب");

    }


  });

});


/*                                                 خروج من الحلف*/
$(document).on("click", '#get-out-guild , #leave-g', function () {


  if (parseInt(Elkaisar.DPlayer.GuildData.rank) > 0) {

    alert_box.confirmMessage("لا يمكنك الخروج من الحلف عليك التخلى عن منصبك اولا ");
    return;

  }

  alert_box.confirmDialog("تاكيد الخروج من الحلف", function () {

    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/quitFromGuild`,
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {
          $(".close_dialog").click();
          Player_profile.getPlayerGuildData();
          Player_profile.getPlayerBaseData();
          $("#player_guild span").html("");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  });

});

$(document).on("click", "#stepdown-guild-mamber , #resignation-g", function () {

  if (parseInt(Elkaisar.DPlayer.GuildData.rank) === Guild.RANK_DATA.LEADER) {

    alert_box.confirmMessage("عليك التنازل  لاحد اعضاء الحلف بمنصب المدير");
    return;

  }

  alert_box.confirmDialog("تاكيد الاستقالة من الحلف ( ستصبح عضو عادى تاخل الحلف)", function () {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuildMember/resignFromPosition`,
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok") {

          Player_profile.getPlayerGuildData();
          var offset = Number($("#AFTER-AJAX-allMember .tr:first-child").attr("data-offset")) || 0;
          Guild.getGuildMemeber(offset);

        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  });

});


/*                                   distroy guild                             */
$(document).on("click", "#destroy-g", function () {

  if (Number(Elkaisar.DPlayer.GuildData.rank) !== Guild.RANK_DATA.LEADER) {

    alert_box.confirmMessage("يجب انت تكون مدير الحلف   لتتمكن من تفكيك الحلف");
    return;

  }

  alert_box.confirmDialog("تاكيد تفكيك الحلف , اذا تم تاكيد تفكيك الحلف سيتم طرد جميع الاعضاء ولن تتمكن من  ارجاع الحلف ثانية", function () {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/disbandGuild`,
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok") {

          Player_profile.getPlayerGuildData();
          alert_box.succesMessage("تم تفكيك الحلف بنجاح");
          $(".close_dialog").click();

        } else {
          Elkaisar.LBase.Error(data);
        }


      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });

  });

});



/*  upgrade guild page*/

$(document).on("click", "#upgrade_guild", function () {

  if (Elkaisar.DPlayer.GuildData.rank < Guild.RANK_DATA.MENSTER) {

    alert_box.confirmMessage("منصبك  لا يسمح لك بتتطوير الحلف");
    return;

  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AGuild/upgradeUsingRes`,
    data: {
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {


      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var JsonObject = JSON.parse(data);

      if (JsonObject.state === "ok") {
        alert_box.succesMessage("تم تطوير الحلف");
        Guild.getGuildData();
        $(".left-nav .selected").click();
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });

});

$(document).on("click", "#navigate-member-guild-list .move_g_page", function () {

  var move_direction = $(this).attr("data-move");
  var last_offset = $("#guild-g_relation .left-content .tr:last-child").attr("data-offset");
  var first_offset = $("#guild-g_relation .left-content .tr:first-child").attr("data-offset");
  if (move_direction === "right") {
    if (Number(last_offset) === Number(Elkaisar.Guild.GuildData.mem_num) - 1 || !last_offset) {
      return;
    } else {
      Guild.getGuildMemeber(Number(last_offset) + 1);
    }
  } else if (move_direction === "left") {
    if (Number(first_offset) === 0) {
      return;
    } else {
      Guild.getGuildMemeber(Number(first_offset) - 10);
    }
  } else if (move_direction === 'most-right') {
    Guild.getGuildMemeber(Math.floor(Elkaisar.Guild.GuildData.mem_num - Elkaisar.Guild.GuildData.mem_num % 10));
  } else {
    Guild.getGuildMemeber(0);
  }

});

//<img class="close close_use_menu" id="closeGuildSelFrom" src="images/btns/close_b.png" onclick="">
$(document).on("click", "#closeGuildSelFrom", function () {
  $('#select_from').remove();
});
//<button id="conf_creat_guild" class="full-btn full-btn-2x  enter" onclick="Guild.create()" >تاكيد وانشاء</button> 
$(document).on("click", "#conf_creat_guild", function () {
  Guild.create();
});

//<button  class="full-btn full-btn-2x  enter" id="updateGuildSlog" onclick="BoxOfMatrialToUse(['family_slogan'], 'change_g_slog')"> تعديل الشعار</button>
$(document).on("click", "#updateGuildSlog", function () {
  BoxOfMatrialToUse(['family_slogan'], 'change_g_slog');
});