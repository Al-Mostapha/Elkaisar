/*
 * 
 * @param {string} user_for   اسم الحالة الى هتستعمل فيها الحاجة دى 
 * @param {string} matrial هنا اسم المتريل الى  هيستملوها 
 * 
 * @returns {undefined}
 */

/*special material*/
/* global matrial_player, Elkaisar.CurrentCity.City, city_profile */

const SPECIAL_MATRIAL = ["certain_move", "random_move", "tagned_3p", "tagned_4p", "tagned_5p", "tagned_6p", "tagned_7p", "tagned_8p"];
/**
 * 
 * @param {type} user_for
 * @param {sting} matrial
 * @param {object} other  optional
 * @returns {undefined}
 */
function useMatrial(user_for, matrial, other) {

  var idCity = Number(Elkaisar.CurrentCity.City.id_city);
  $("#useItemButton").attr("disabled", true);
  if (Matrial.getPlayerAmount(matrial) <= 0) {

    $("#over_lay_alert").remove();
    alert_box.confirmMessage("لا يوجد لديك " + Matrial.getMatrial(matrial).name + "  فى صندوق الموارد خاصتك");
    return;
  }

  /*
   *  user wants to add xp to hero
   */
  if (user_for === "add_xp") {

    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero)) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.confirmMessage("لا يمكن اضافة خبرة للبطل حيث ان البطل بالخارج");
      return;
    }

    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AHero/addExp`,
      data: {
        itemToUse: matrial,
        idHero: idHero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {
          Elkaisar.Hero.getHero(idHero).Hero = JsonObject.Hero;
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          Matrial.takeFrom(matrial, 1);
          $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
          alert_box.succesMessage(` +${JsonObject.Exp} EXP`);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
    /*
     *  user wants to add power to hero
     */
  } else if (user_for === "add_power") {

    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero)) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.confirmMessage("لا يمكن اضافة قوة بدنية للبطل حيث ان البطل بالخارج");
      return;
    }
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AHero/addPower`,
      data: {
        itemToUse: matrial,
        idHero: idHero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {

          Elkaisar.Hero.getHero(idHero).Hero = JsonObject.Hero;
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          Matrial.takeFrom(matrial, 1);
          $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
          alert_box.succesMessage(` +${JsonObject.power} قوة بدنية`);
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("البطل ليس ملك لك");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("البطل فى اعلى قدرة بدنية ممكنة");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("لا تمتلك مواد كافية");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
    /*
     *  user wants to add loyality to hero
     */
  } else if (user_for === "add_loy") {

    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero)) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.confirmMessage("لا يمكن اضافة  ولاء للبطل حيث ان البطل بالخارج");
      return;
    }
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AHero/addLoy`,
      data: {
        itemToUse: matrial,
        idHero: idHero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {
          Elkaisar.Hero.getHero(idHero).Hero = JsonObject.Hero;
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          Matrial.takeFrom(matrial, 1);
          $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
          alert_box.succesMessage(` +${JsonObject.loy}  ولاء`);
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("البطل ليس ملك لك");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("البطل فى اعلى قدرة ولاء ممكنة");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("لا تمتلك مواد كافية");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }/* end add loyality*/
  else if (user_for === "retreat_points") {


    if (Matrial.getPlayerAmount(matrial) < Math.floor(Elkaisar.CurrentHero.Hero.lvl / 10) + 1) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.failMessage("لا توجد لديك موارد كافية");
      return;
    }
    if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero)) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.confirmMessage("البطل خارج المدينة");
      return;
    }

    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AHero/resetHeroPoints`,
      data: {
        idHero: idHero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {
          Elkaisar.Hero.getHero(idHero).Hero = JsonObject.Hero;
          Elkaisar.City.getCity(idCity).City = JsonObject.CityRes;
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
          Matrial.takeFrom(matrial, Math.floor(Elkaisar.CurrentHero.Hero.lvl / 10) - 1);
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("البطل ليس ملك لك");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا تمتلك مواد كافية");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  } /*  end else if  */

  else if (user_for === "add_medal") {
    var url = "";
    if (matrial === "medal_ceasro")
      url = `${Elkaisar.Config.NodeUrl}/api/AHeroMedal/activateCiceroMedal`;
    if (matrial === "medal_den")
      url = `${Elkaisar.Config.NodeUrl}/api/AHeroMedal/activateDentatusMedal`;
    if (matrial === "medal_leo")
      url = `${Elkaisar.Config.NodeUrl}/api/AHeroMedal/activateLeonidasMedal`;
    if (matrial === "ceaser_eagle")
      url = `${Elkaisar.Config.NodeUrl}/api/AHeroMedal/activateCaeserMedal`;
    if (Number(Elkaisar.CurrentHero.Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY) {
      $("#over_lay_alert").remove();
      $("#over_lay").remove();
      alert_box.confirmMessage("البطل خارج المدينة");
      return;
    }


    $.ajax({
      url: url,
      type: 'POST',
      data: {
        idHero: Elkaisar.CurrentHero.Hero.id_hero,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        $("#over_lay_alert").remove();
        $("#over_lay").remove();
        if (JsonObject.state === "ok") {

          Elkaisar.CurrentHero.Medal = JsonObject.HeroMedal;
          Elkaisar.City.getCity(idCity).City = JsonObject.CityRes;
          $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
          city_profile.refresh_resource_view();
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("البطل ليس ملك لك");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا تمتلك مواد كافية");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("البطل ليس فى المدينة");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }
  /**************************************************************************/
  /*_________________________   UPGRADE GUILD  _____________________________*/

  else if (user_for === "upgrade_guild") {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/upgradeUsingItem`,
      data: {
        itemToUse: matrial,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var jsonObject = JSON.parse(data);
        if (jsonObject.state === "ok") {
          Elkaisar.Guild.GuildData = jsonObject.GuildData;
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          Matrial.takeFrom(matrial, 1);
          Guild.content_forUpgrade();
        } else if (jsonObject.state === "error_0") {
          alert_box.failMessage("لست عضو باى حلف");
        } else if (jsonObject.state === "error_1") {
          alert_box.failMessage("رتبتك اقل من المطلوب");
        } else if (jsonObject.state === "error_3") {
          alert_box.failMessage("نوع المادة غير معروف");
        } else if (jsonObject.state === "error_4") {
          alert_box.failMessage("لا يوجد مواد كافية");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }



  /*___________________________________________________________________*/
  /*                                    buildind acce                 */
  else if (user_for === "building_acce") {

    var idTask = other;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/speedUp`,
      data: {
        idCity: idCity,
        itemToUse: matrial,
        idWorking: idTask,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {

          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          $(".close_select_menu").click();
          Matrial.takeFrom(matrial, 1);
          for (var iii in Elkaisar.TimedTask.TaskList.Building)
            if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(idCity))
              delete (Elkaisar.TimedTask.TaskList.Building[iii]);
          for (var iii in JsonObject.list)
            Elkaisar.TimedTask.TaskList.Building[JsonObject.list[iii].id] = JsonObject.list[iii];
          Elkaisar.TimedTask.refreshListView();
          $("#dialg_box .nav_bar .left-nav ul li[head_title=motiv]").hasClass("selected") ?
            $("#dialg_box .nav_bar .left-nav ul li[head_title=motiv]").trigger("click")
            : "";
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("لا توجد مواد كافية");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("نوع المادة غير معروف");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  } else if (user_for === "jop_acce") {

    var idTask = other;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityJop/speedUpHiring`,
      data: {
        idTask: idTask,
        itemToUse: matrial,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {

          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          $(".close_select_menu").click();
          Matrial.takeFrom(matrial, 1);
          for (var iii in Elkaisar.TimedTask.TaskList.Jop)
            if (Number(Elkaisar.TimedTask.TaskList.Jop[iii].id_city) === Number(idCity))
              delete (Elkaisar.TimedTask.TaskList.Jop[iii]);
          for (var iii in JsonObject.JopTaskList)
            Elkaisar.TimedTask.TaskList.Jop[JsonObject.JopTaskList[iii].id] = JsonObject.JopTaskList[iii];
          Elkaisar.TimedTask.refreshListView();
          $("#dialg_box .nav_bar .left-nav ul li[head_title=motiv]").hasClass("selected") ?
            $("#dialg_box .nav_bar .left-nav ul li[head_title=motiv]").trigger("click")
            : "";
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("دفعة التوظيف غير موجودة");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا توجد مواد كافية");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("نوع المادة غير معروف");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }



  /*   _________________________________________________________________    */
  /*                           study acce                                  */
  else if (user_for === "study_acce") {

    var idTask = other;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/APlayerEdu/speedUpStudyTask`,
      data: {
        itemToUse: matrial,
        idTask: idTask,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {

        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);

        if (JsonObject.state === "ok") {
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
          Matrial.takeFrom(matrial, 1);
          for (var iii in Elkaisar.TimedTask.TaskList.Study)
            if (Number(Elkaisar.TimedTask.TaskList.Study[iii].id_city) === Number(idCity))
              delete (Elkaisar.TimedTask.TaskList.Study[iii]);

          for (var iii in JsonObject.list)
            Elkaisar.TimedTask.TaskList.Study[JsonObject.list[iii].id] = JsonObject.list[iii];
          Elkaisar.TimedTask.refreshListView();
          buildingClick($("#dialg_box .box_header").attr("place"), true);
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("دفعة الدراسة غير موجودة");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا توجد مواد كافية");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("نوع المادة غير معروف");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }

  /*   house   change    */

  else if (user_for === "reset_helper") {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACity/resetCityHelper`,
      data: {
        itemToUse: matrial,
        idCity: Elkaisar.CurrentCity.City.id_city,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {

          Elkaisar.City.getCity(idCity).City = JsonObject.City;
          alert_box.succesMessage("تم تعديل المساعد بنجاح");
          $(".building_worship").replaceWith(Building.dialogBoxContnet_forworship());
          city_profile.refresh_resource_view();
        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage("خطاء بالمدينة");
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا يوجد مساعد بالمدينة");
        } else if (JsonObject.state === "error_2") {
          alert_box.failMessage("لا توجد مواد كافية");
        }

        $("#over_lay_alert").remove();
        $("#over_lay").remove();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }


  /*  acce trainning       in  the all building   */
  else if (user_for === "army_build_acce") {

    var idTask = other;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AArmyBatch/speedUpBatches`,
      data: {
        idBatch: idTask,
        itemToUse: matrial,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {

          for (var iii in JsonObject.armyBatches) {
            if (Elkaisar.TimedTask.TaskList.Army[JsonObject.armyBatches[iii].id]) {
              Elkaisar.TimedTask.TaskList.Army[JsonObject.armyBatches[iii].id].time_start = JsonObject.armyBatches[iii].time_start;
              Elkaisar.TimedTask.TaskList.Army[JsonObject.armyBatches[iii].id].time_end = JsonObject.armyBatches[iii].time_end;
              Elkaisar.TimedTask.TaskList.Army[JsonObject.armyBatches[iii].id].acce = JsonObject.armyBatches[iii].acce;
            }
          }

        }


        Matrial.takeFrom(matrial, 1);
        Building.militrayProduction.left($(".box_header").attr("place"));
        $("#over_lay_alert").remove();
        $("#over_lay").remove();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  } else if (user_for === "add_city_builder") {
    $("#useItemButton").removeAttr("disabled");
    useMatrialBox(matrial);
    $("#over_lay_alert").remove();
    $("#over_lay").remove();
  }



  /*_________________________CHANGE GUILD SLOGAN___________________________________*/

  else if (user_for === "change_g_slog") {

    var slog_btm = $(".guild_slogan img:first").attr("data-cur_image");
    var slog_top = $(".guild_slogan img:last").attr("data-cur_image");
    var slog_cnt = $(".guild_slogan img:nth-child(2)").attr("data-cur_image");
    const newGuildName = $("#newGuildNameInput").val();


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AGuild/changeGuildName`,
      data: {
        slog_top,
        slog_cnt,
        slog_btm,
        newGuildName,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer

      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        const JsonObjet = JSON.parse(data);
        if (JsonObjet.state === "ok") {
          Matrial.takeFrom(matrial, 1);
          $(".close-alert_container").click();
          $(".guild_dialog_box .nav_bar .left-nav .selected").click();
          Guild.getGuildData();
          alert_box.succesMessage("تم تعديل الشعار بنجاح");
          $("#over_lay_alert").remove();
          $("#over_lay").remove();
        } else if (JsonObjet.state == "error_0") {
          alert_box.failMessage("لست عضو فى الحلف")
        } else if (JsonObjet.state == "error_1") {
          alert_box.failMessage("رتبتك لا تسمح");
        } else if (JsonObjet.state == "error_2") {
          alert_box.failMessage("لا يمكن لإسم الخلف أن يكون أكثر من 15 حرف ")
        } else if (JsonObjet.state == "error_3") {
          alert_box.failMessage("لا يوجد مواد كافية");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  } else if (user_for === "change_player_name") {


    var new_name = $("#playe-new-name").val();
    if (new_name.length < 3) {

      alert_box.confirmMessage("اسم الملك صغير ");
      $("#over_lay_alert").remove();
      $(".select_over_lay").remove();
      return;
    } else if (new_name.length > 10) {

      alert_box.confirmMessage("اسم الملك كبير ");
      $("#over_lay_alert").remove();
      $(".select_over_lay").remove();
      return;
    } else if (new_name === Elkaisar.DPlayer.Player.name) {

      alert_box.confirmMessage("يجب ان يكون الاسم الجديد مختلف");
      $("#over_lay_alert").remove();
      $(".select_over_lay").remove();
      return;
    } else {


      $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/APlayer/changePlayerName`,
        data: {
          NewName: new_name,
          token: Elkaisar.Config.OuthToken,
          server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
          $("#useItemButton").removeAttr("disabled");
          if (!Elkaisar.LBase.isJson(data))
            return Elkaisar.LBase.Error(data);
          var JsonObject = JSON.parse(data);
          if (JsonObject.state === "ok") {

            $("#A-A-P-name").html(new_name + '<img src="images/btns/edit.png" class="img-sml" style="vertical-align: middle; margin-left: 15px" id="edit-player-name-btn">');
            $(".avatar-name h1").html(new_name);
            $("#over_lay_alert").remove();
            $(".select_over_lay").remove();
            Elkaisar.DPlayer.Player = JsonObject.Player;
            Player_profile.refresh_view();
            alert_box.succesMessage("تم تغير الإسم بنجاح");

          } else if (JsonObject.state === "error_2")
            alert_box.failMessage("يوجد لاعب يحمل نفس الاسم");
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

      });
    }

  } else if (user_for === "increase-city-util") {

    useMatrialBox(matrial);
    $("#over_lay_alert").remove();
    $("#over_lay").remove();
  }


  /* refresh city theater with matrial*/
  else if (user_for === "refresh_theater_with_mat") {


    var all_heros = "";
    var left_content = "";


    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityHero/refreshHeroTheaterWithLetter`,
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer,
        idCity: Elkaisar.CurrentCity.City.id_city

      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);

        var JsonObject = JSON.parse(data);

        $("#over_lay_alert").remove();
        $("#over_lay").remove();
        Matrial.takeFrom(matrial, 1);
        alert_box.succesMessage("تم تحديث قائمة الابطال");
        buildingClick(cityHasType(BUILDING_TYPS.THEATER), true);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }


  /*  accelerate arriving deals*/
  else if (user_for === "acce-arriving-deal") {

    if (isNaN(other)) {
      Elkaisar.LBase.Error("error here");
      console.log(other);
      return;
    }


    var id_deal = Number(other);
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/ACityMarket/speedUpDealTrans`,
      data: {
        idDeal: id_deal,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (isJson(data)) {
          console.log(data);
          var json_data = JSON.parse(data);
          Elkaisar.CurrentCity.City = json_data.cityRes;
          city_profile.refresh_resource_view();
          $("#my-comming-offers .tr[data-id-deal='" + id_deal + "']").remove();
          $("#my-comming-offers").append('<div class="tr"></div>');
          $(".close_select_menu").trigger("click");
          $("#alert_container .close-alert").trigger("click");
          Matrial.takeFrom(matrial, 1);
        } else {

          Elkaisar.LBase.Error(data);
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });
  }


  /* ازالة المبنى */
  else if (user_for === "downgrade-building-lvl") {

    var building_place = other;
    if (Elkaisar.City.getCity().BuildingType[building_place] > 12) {
      alert_box.failMessage(`لا يمكنك هدم ${BuildingConstData[Elkaisar.City.getCity().BuildingType[building_place]].title} `);
      return;
    }
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/explodeBuilding`,
      data: {
        BuildingPlace: building_place,
        idCity: idCity,
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      },
      type: 'POST',
      success: function (data, textStatus, jqXHR) {
        $("#useItemButton").removeAttr("disabled");
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.state === "ok") {


          Elkaisar.City.getCity().BuildingType[building_place] = 0;
          Elkaisar.City.getCity().BuildingLvl[building_place] = 0;
          fillCityWithBuilding();
          alert_box.close();
          $('.close_select_menu').trigger("click");
          $('.close_dialog').trigger("click");
          alert_box.succesMessage("تم  ازالة المبنى بنجاح");
          Matrial.takeFrom(matrial, 1);
          if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.COTTAGE) {

            Elkaisar.City.getCityBase();
          } else if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.STORE) {

            Elkaisar.City.getCityBase();
            Elkaisar.City.getCityStorage();
          } else if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.PALACE) {
            Elkaisar.City.getCityBase();
          } else if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.WORSHIP) {
            Elkaisar.City.getCityBase();
          } else if (Number(Elkaisar.City.getCity().BuildingType[building_place]) === BUILDING_TYPS.WALL) {
            Elkaisar.City.getCityBase();
          }


        } else if (JsonObject.state === "error_0") {
          alert_box.failMessage('لا يوجد لديك براميل بارود كافية');
        } else if (JsonObject.state === "error_1") {
          alert_box.failMessage("لا يمكنك هدم هذا المبنى");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }

  /*------------------------------------------------------------------------*/
  /*____________________________GOD_GATE____________________________________*/

  else if (user_for === "add-god-points") {

    GodGate.useBoxPoint(matrial);
  } else if (user_for === "open-fourth-cell") {
    GodGate.OpenFourthCell(other);
  }

}



/* الفنكشن دى الى هستعملها مع كل المواد الى فى صندوق المود*/

function useMatrialBox(matrial_name) {
  var amount = parseInt($("#amount_to_use").val() || 1);
  if (amount <= 0) {

    $(".close-alert_container").trigger("click");
    alert_box.confirmMessage("عدد الاستخدام غير صالح");
    return;
  }
  if (!isInt(Number(amount))) {

    alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
    return;
  }

  if (Matrial.getPlayerAmount(matrial_name) < amount) {
    $(".close-alert_container").trigger("click");
    alert_box.confirmMessage("لا يوجد لديك عدد كافى من المواد");
    return;
  }
  if (matrial_name === "luck_play") {
    $(".close-alert_container").click();
    $(".close_dialog").click();
    $("#luck-wheel-btn").click();
    return;
  }

  /* some matrial need values before thay send to server*/
  if (SPECIAL_MATRIAL.indexOf(matrial_name) > -1) {

    switch (matrial_name) {


      case "certain_move":

        if (isNaN($("#new-city-y-coord").val()) || isNaN($("#new-city-x-coord").val())) {
          alert_box.confirmMessage("عفوا عليك تحديد امكان المراد الانتقال له");
          return;
        }

        break;
    }

  }

  if (matrial_name === "beginner_back_1" && Elkaisar.City.getCity().BuildingLvl.palace < 2) {
    $(".close-alert_container").click();
    alert_box.failMessage("يجب ان يكون القصر مستوى 2 لتستطيع فتح الصندوق");
    return;
  } else if (matrial_name === "beginner_back_2" && Elkaisar.City.getCity().BuildingLvl.palace < 4) {
    $(".close-alert_container").click();
    alert_box.failMessage("يجب ان يكون القصر مستوى 4 لتستطيع فتح الصندوق");
    return;
  } else if (matrial_name === "beginner_back_3" && Elkaisar.City.getCity().BuildingLvl.palace < 6) {
    $(".close-alert_container").click();
    alert_box.failMessage("يجب ان يكون القصر مستوى 6 لتستطيع فتح الصندوق");
    return;
  } else if (matrial_name === "beginner_back_4" && Elkaisar.City.getCity().BuildingLvl.palace < 8) {
    $(".close-alert_container").click();
    alert_box.failMessage("يجب ان يكون القصر مستوى 8 لتستطيع فتح الصندوق");
    return;
  } else if (matrial_name === "beginner_back_5" && Elkaisar.City.getCity().BuildingLvl.palace < 10) {
    $(".close-alert_container").click();
    alert_box.failMessage("يجب ان يكون القصر مستوى 10 لتستطيع فتح الصندوق");
    return;
  } else if (GodGate.matrialUse.indexOf(matrial_name) > -1) {

    GodGate.useBoxPoint(matrial_name, amount);
    return;
  }

  if (Elkaisar.BaseData.Items[matrial_name])
    if ($.isFunction(Elkaisar.BaseData.Items[matrial_name][`UseFunc`])) {
      Elkaisar.BaseData.Items[matrial_name][`UseFunc`](amount).done(function (data) {
        $("#useItemButton").removeAttr("disabled");
        $("#usePlayerItemBox").removeAttr("disabled");
        if (Elkaisar.LBase.isJson(data))
          if (JSON.parse(data).state === "ok")
            Matrial.takeFrom(matrial_name, amount);
        $("#alert_head .close-alert_container").click();
        alert_box.succesMessage(`تم  استعمال ${amount} ${Elkaisar.BaseData.Items[matrial_name].name} بنجاح`);
        $(".matrial_unit").each(function (el) {
          var Mat = $(this).attr("matrial_type");
          $(this).children(".img-inside-box").children(".player_amount").children("p").html(Matrial.getPlayerAmount(Mat))
        });
      });
    } else {
      Elkaisar.LBase.Error("Item FunctionNot Found");
      Elkaisar.LBase.Error(matrial_name);
      Elkaisar.LBase.Error(JSON.stringify(Elkaisar.BaseData.Items[matrial_name]));
    }
  else
    Elkaisar.LBase.Error("Item Not Found");
}


function buyMatrial(matrial, amount) {

  if (amount === undefined) {
    amount = Number($("#amount_to_buy").val()) || 1;
  }

  if (!isInt(Number(amount))) {

    alert_box.failMessage("لا يمكن ان تكون الارقام عشرية");
    return;
  }

  if (amount <= 0) {
    alert_box.failMessage("لا يمكن  شراء هذة الكمية");
    return;
  }

  if (Elkaisar.DPlayer.Player.gold < Elkaisar.BaseData.Items[matrial].gold * amount) {

    $("body").append(alert_box.confirmMessage(" ليس لديك قطع ذهب كافية<br> <a href='gold_buy.php'> لشراء ذهب اضغط هنا</a>"));
    return;
  }


  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AItem/buyItem`,
    data: {
      item: matrial,
      amount: amount,
      token: Elkaisar.Config.OuthToken,
      server: Elkaisar.Config.idServer

    },
    type: 'GET',
    success: function (data, textStatus, jqXHR) {
      $("#useItemButton").removeAttr("disabled");
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var JsonObject = JSON.parse(data);
      if (JsonObject.state === "ok") {

        Player_profile.refreshMatrialBox().done(function (data) {
          $(".matrial_unit").each(function () {

            if ($(this).attr("matrial_type") === matrial) {

              $(this).children(".img-inside-box").children(".player_amount").children("p").html(getArabicNumbers(Matrial.getPlayerAmount(matrial)));
            }


          });
        });
        Player_profile.getPlayerBaseData().done(function (data) {
          $(".budget .txt").html("لديك:" + getArabicNumbers(Elkaisar.DPlayer.Player.gold));
        });
        $(".close-alert_container").click();
        alert_box.succesMessage("تمت عملية الشراء بنجاح");
      } else {
        Elkaisar.LBase.Error(data);
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });
}




function successfulUse(matrial, json_obj, amount) {

  $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox($("#dialg_box .right-content .total").attr("mat_table"), $("#nav-item-box-right").attr("data-current-offset")));
}




$(document).on("click", "#goToMall", function () {

  $(".menu-list").each(function () {

    if ($(this).data("show") === "matrial") {

      $(this).click();
    }

  });
});
function BoxOfMatrialToUse(matrials, use_for, amount, other) {

  var all_list = "";
  if (amount === undefined) {
    amount = 1;
  }

  for (var index in matrials) {

    all_list += `<li>
                        <div  class=" pull-L left">
                            <div class="ar_title">${Elkaisar.BaseData.Items[matrials[index]].name}</div>
                            <div class="quant">
                                ${getArabicNumbers(Matrial.getPlayerAmount(matrials[index]))}
                            </div>
                            <div class="image">
                                <img src="${Elkaisar.BaseData.Items[matrials[index]].image}"/>
                            </div>
                        </div>
                        <div class="pull-R right">
                            <div class="header">
                                <button class="full-btn full-btn-3x use_matrial_hero" use_for="${use_for}" matrial_name="${matrials[index]}" amount="${amount}" data-other="${other}"> ${Translate.Button.General.Use[UserLag.language]}</button>
                            </div> 
                            <div class="desc">
                                ${Elkaisar.BaseData.Items[matrials[index]].desc}
                            </div>
                        </div>
                    </li>`;
  }

  var box = `<div id="over_lay" class="select_over_lay" >
                <div id="select_from">
                    <div class="head_bar">
                        <img src="images/style/head_bar.png" class="banner">
                        <div class="title">${Translate.Button.General.Use[UserLag.language]}</div>
                        <img class="close close_select_menu" src="images/btns/close_b.png">
                    </div>
                    <p style="clear: both"></p>
                    <ul class="select_item">
                       ${all_list}
                    </ul>
                </div>
            </div>`;
  $("body").append(box);
}




function showMatrialGiftList(list) {


  var list_item = "";
  for (var iii in list) {
    list_item += `<li>
                        <div class="image">
                            <img  src="${Elkaisar.BaseData.Items[list[iii].Item].image}"/>
                        </div>
                        <div class="amount stroke">
                            ${list[iii].amount} X
                        </div>
                    </li>`;
  }



  var mat_list = `<div id="over_lay">
                        <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">قائمة المواد</div>
                                <img class="close close_use_menu" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div id="matrial-box-gift">
                                <ul class="matrial-list">
                                    ${list_item}
                                </ul>
                            </div>
                        </div>
                    </div>`;
  $("body").append(mat_list);
}

var Matrial = {

  getPlayerAmount: function (matrial) {
    if (Elkaisar.BaseData.Items[matrial])
      return Number(Elkaisar.BaseData.Items[matrial].playerAmount);
    return 0;
  },
  gold: function(matrial){
    if (Elkaisar.BaseData.Items[matrial])
      return Number(Elkaisar.BaseData.Items[matrial].gold);
    return 0;
  },
  getMatrial: function (matrial) {

    return Elkaisar.BaseData.Items[matrial];
  },
  getMatrialName: function (matrial) {

    return Elkaisar.BaseData.Items[matrial].name;
  },
  givePlayer: function (matrial, amount) {
    if (!amount) {
      amount = 1;
    }
    if (!Elkaisar.BaseData.Items[matrial]) {
      return;
    }
    Elkaisar.BaseData.Items[matrial].playerAmount =
      Number(Elkaisar.BaseData.Items[matrial].playerAmount) + Number(amount);
  },
  takeFrom: function (matrial, amount) {
    if (!amount) {
      amount = 1;
    }
    if (!matrial)
      return;
    Elkaisar.BaseData.Items[matrial].playerAmount -= Number(amount);
  },
  takeNeedsForAttack: function (type) {

    if (WorldUnit.isAsianSquads(type)) {
      Matrial.takeFrom("truce_pack", 1);
    } else if (WorldUnit.isGangStar(type)) {
      Matrial.takeFrom("t_map", 1);
    } else if (WorldUnit.isCamp(type) || WorldUnit.isMonawrat(type)) {
      Matrial.takeFrom("necklace_4", 1);
    }

  },
  image: function (mat) {
    return Elkaisar.BaseData.Items[mat].image;
  },
  table: function (mat) {
    return Elkaisar.BaseData.Items[mat].db_tab;
  },
  listOf: function (table) {

    var List = {};
    for (var ii in Elkaisar.BaseData.Items)
      if (Elkaisar.BaseData.Items[ii].table === table)
        List[ii] = Elkaisar.BaseData.Items[ii];
    return List;
  }

};
Matrial.prizeToString = function (PrizeList) {

  var stringArray = [];
  for (var jjj in PrizeList) {

    stringArray.push(` x ${PrizeList[jjj].amount} ${this.getMatrialName(PrizeList[jjj].Item)}`);
  }



  return stringArray.join(" , ");
};
Matrial.itemUnitWidget = function (Item, isMall = false) {
  var total = "";
  if (isMall) {
    total = ` <li class="pull-L">
                <div class="pic">
                  <img src="images/icons/resource/gold.png">
                </div>
                <div class="num txt-shadow">${getArabicNumbers(Elkaisar.BaseData.Items[Item].gold)}</div>
              </li>
              <li class="pull-R">
                <div class="buy_mat_btn">
                  <button class="full-btn full-btn-1x ellipsis">${Translate.Button.MenuList.Buy[UserLag.language]}</button>
                </div>
              </li>`;
  }

  var list = `<li matrial_type="${Item}" class="tooltip_mat matrial_unit">
                   <img src=" images/style/Border-up.png" class="border_up"/>
                   <div class="img-inside-box">
                       <div class="player_amount">
                            <img src="images/icons/shopQuantityBG.png"/>
                             <p>${getArabicNumbers(Matrial.getPlayerAmount(Item))}</p>
                        </div>
                        <div class="wrapper big-img" >
                            <div class="image" style="background-image: url(${Elkaisar.BaseData.Items[Item].image})"></div>
                        </div>
                        <div class="matrial">
                            <ul>
                            ${isMall ? "" : `<button class="full-btn-3x sell-matrial" data-matrial="${Item}"> عرض المادة للبيع</button>`}
                            `;
  list += total + "</ul>"
    + "</div>"
    + "</div>";
  var tail = ' <div class="txt-inside-box">'
    + '<h2>' + Elkaisar.BaseData.Items[Item].name + '</h2>'
    + '</div>'
    + '<div  class="tooltip_desc"></div>'
    + '</li>';
  return list + tail + "";
};


$(document).on("click", "#buyNewItem", function () {
  var item = $(this).attr("data-item-name");
  $("#useItemButton").attr("disabled", true);
  buyMatrial(item);
});