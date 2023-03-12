var Player_profile = {


  refresh_view: function () {

    $("#player_honor span").html(Elkaisar.DPlayer.Player.honor);
    $("#player_prestige span").html(Elkaisar.DPlayer.Player.prestige);
    $("#player_rank span").html(Elkaisar.DPlayer.Player.rank);
    $("#player_gold span").html(Elkaisar.DPlayer.Player.gold);
    $("#player_guild span").html(Elkaisar.DPlayer.GuildData ? Elkaisar.DPlayer.GuildData.name : "");
    $("#player_title span").html(Elkaisar.BaseData.Promotion[Elkaisar.DPlayer.Player.porm].Title);
    $(".avatar-name h1").html(Elkaisar.DPlayer.Player.name);
    $(".avatar-img img").attr("src", Elkaisar.BaseData.HeroAvatar[Elkaisar.DPlayer.Player.avatar]);

  },
  getPlayerBaseData: function () {

    return $.ajax({
      url: Elkaisar.Config.NodeUrl + "/api/APlayer/refreshPlayerData",
      type: 'GET',
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      }, beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);
        var jsonObj = JSON.parse(data);
        Elkaisar.DPlayer.Player = jsonObj;
        Player_profile.refresh_view();
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  },
  getPlayerStateData: function () {

    return $.ajax({
      url: Elkaisar.Config.NodeUrl + "/api/APlayer/getPlayerState",
      type: 'GET',
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      }, beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);

        var jsonObj = JSON.parse(data);
        Elkaisar.DPlayer.PlayerState = jsonObj;
        Player_profile.refresh_view();
        Fixed.refresePlayerStateList();

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },
  getPlayerGuildData: function () {

    return $.ajax({
      url: Elkaisar.Config.NodeUrl + "/api/APlayer/getPlayerGuildData",
      type: 'GET',
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      }, beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);

        var jsonObj = JSON.parse(data);
        Elkaisar.DPlayer.GuildData = jsonObj.GuildData;
        Player_profile.refresh_view();

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },
  getPlayerEdu: function () {

    return $.ajax({
      url: Elkaisar.Config.NodeUrl + "/api/APlayerEdu/getPlayerEduLvl",
      type: 'GET',
      data: {
        token: Elkaisar.Config.OuthToken,
        server: Elkaisar.Config.idServer
      }, beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          Elkaisar.LBase.Error(data);

        var jsonObj = JSON.parse(data);
        Elkaisar.DPlayer.PlayerEdu = jsonObj;
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },
  refresh_player_data: function () {
    this.getPlayerBaseData();
    this.getPlayerGuildData();
    this.getPlayerStateData();
    this.refresh_view();
  },

  refreshMatrialBox: function (matrial) {
    return $.ajax({

      url: Elkaisar.Config.NodeUrl + "/api/APlayerItem/getPlayerItems",
      data: {

        server: Elkaisar.Config.idServer,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var json_data = JSON.parse(data);

        for (var ii in json_data) {
          if (!matrial_player[json_data[ii].table])
            matrial_player[json_data[ii].table] = {};

          matrial_player[json_data[ii].table][json_data[ii].id_item] = json_data[ii].amount;
          Elkaisar.DPlayer.Items[json_data[ii].id_item] = json_data[ii].amount;

          if (Elkaisar.BaseData.Items[json_data[ii].id_item])
            Elkaisar.BaseData.Items[json_data[ii].id_item].playerAmount = json_data[ii].amount;

        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  },

  refreshPlayerNotif: function () {

    return $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/APlayer/getAllNotif`,
      data: {
        server: Elkaisar.Config.idServer,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      success: function (data, textStatus, jqXHR) {
        if (isJson(data)) {
          Elkaisar.DPlayer.Notif = JSON.parse(data);
          Fixed.refreshPlayerNotif();
        }
      }
    });
  }




};




$(document).on("PlayerReady", "html", function () {
  Player_profile.getPlayerEdu();
  Player_profile.getPlayerGuildData();
  Player_profile.getPlayerStateData();
  Elkaisar.ArenaChallange.getArenaData();
});