var WS_utile = {};
var ws;
WS_utile.failsConTime = 0;



WS_utile.onopen = function () {
  WS_utile.failsConTime = 0;
  ws.send(JSON.stringify({
    url: "Player/addPlayer",
    data: {
      idPlayer: Elkaisar.DPlayer.Player.id_player
    }
  }));

  Elkaisar.World.Map.getWorldCity().done(function () {
    Elkaisar.Team.getPlayerTeam();
  });
  if (Elkaisar.Config.isWorldReady) {
    Elkaisar.World.Map.getWorldCityColonized();
    Elkaisar.World.Map.getWorldFiredUnit();
    Elkaisar.World.MapBattel.getAllBattels();
    console.log("One ----")
  } else {
    $(document).on("WorldReady", function () {
      Elkaisar.World.Map.getWorldCityColonized();
      Elkaisar.World.Map.getWorldFiredUnit();
      Elkaisar.World.MapBattel.getAllBattels();
      console.log("One ---- 33")
    });
    console.log("One ----2")
  }
};

WS_utile.onmessage = function (e) {

  console.log(e.data);

  if (isJson(e.data)) {
    var data = JSON.parse(e.data);
  } else {

    Elkaisar.LBase.Error(e.data);
    console.log(e);
  }

  var classPath = data.classPath.split(".");

  if (!$.isArray(classPath)) {
    alert_box.confirmMessage("برجاء تصوير الرسالة وارسالها الى فريق الدعم" + e.data);
  }

  if (classPath.length === 2)
    Elkaisar.WsLib[classPath[0]][classPath[1]](data);
  else if (classPath.length === 3)
    Elkaisar.WsLib[classPath[0]][classPath[1]][classPath[2]](data);

};

WS_utile.onclose = function (event) {

  alert_box.confirmMessage("انقطاع الاتصال");

  $(".close-alert").remove();
  $(".confim-btn").off("click");
  $(".confim-btn").click(function () {
    window.location.href = "http://www.elkaisar.com";
    window.location.replace("http://www.elkaisar.com");
  });


};


WS_utile.connect = function () {

  ws = new WebSocket(`ws://${Elkaisar.Config.WsHost}:${Elkaisar.Config.WsPort}?token=${Elkaisar.Config.OuthToken}`);
  ws.onopen = WS_utile.onopen;
  ws.onmessage = WS_utile.onmessage;
  ws.onclose = WS_utile.onclose;
  console.log("connected");
};
