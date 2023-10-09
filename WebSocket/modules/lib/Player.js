
module.exports.online = async function (con) {

  var idPlayer = con.idPlayer;


  await Elkaisar.DB.AUpdate("`online` = 1", "player", "id_player = ?", [idPlayer]);
  await Elkaisar.DB.AInsert("id_player = ?, ipv4 = ?", "player_logs", [idPlayer, con.ip]);
  const PlayerTitle = await Elkaisar.DB.ASelectFrom("*", "player_title", "id_player = ?", [idPlayer]);
  const PlayerData = await Elkaisar.DB.ASelectFrom("*",
    "(SELECT player.*, @row:=@row+1 as 'rank' FROM player,(SELECT @row:=0) r ORDER BY player.prestige DESC ) AS col ",
    "col.id_player = ?", [idPlayer]);
  Elkaisar.Arr.Players[idPlayer] = {
    connection: con,
    playerTitles: [
      PlayerTitle[0].title_1, PlayerTitle[0].title_2, PlayerTitle[0].title_3,
      PlayerTitle[0].title_4, PlayerTitle[0].title_5, PlayerTitle[0].title_6,
      PlayerTitle[0].title_5, PlayerTitle[0].title_8, PlayerTitle[0].title_7,
      PlayerTitle[0].title_2
    ],
    playerData: PlayerData[0]
  };

};

module.exports.offline = async function (con) {
  Elkaisar.DB.AUpdate("`online` = 0  , last_seen = ? ", "player", "id_player = ?", [Math.floor(Date.now() / 1000), con.idPlayer])
  Elkaisar.DB.AUpdate("time_leave = CURRENT_TIME ", "player_logs", "id_log = ?", [con.idLog]);
};



module.exports.addPlayer = async function (con) {
  var idPlayer = con.idPlayer;
  var player = Elkaisar.Arr.Players[idPlayer];
  if (player && player.connection) {
    player.connection.sendUTF(JSON.stringify({ "classPath": "Player.someOneOppend" }));
    player.connection.close();
    delete (Elkaisar.Arr.Players[idPlayer]);
  }
  setTimeout(function () {
    module.exports.online(con);
  }, 1000);
  
  var lTitles = await Elkaisar.DB.ASelectFrom("*", "player_title", "id_player = ?", [idPlayer]);
  var Player = await Elkaisar.DB.ASelectFrom("*", "player", "id_player = ?", [idPlayer]);
  var lPlayerRank = await Elkaisar.DB.ASelectFrom("*", "arena_player_challange", "id_player = ?", [idPlayer]);

  if(lTitles.length > 0){
    for(var lOneTitle in lTitles[0]){
      if(lTitles[0][lOneTitle]  != null && lOneTitle != "id_player"){
        Elkaisar.Base.broadcast(JSON.stringify({
          classPath: "Chat.TitledPlayerOpen",
          PlayerName: Player[0].name,
          Title: lTitles[0][lOneTitle]
        }))
      }
    }
  }

  if(lPlayerRank.length > 0){
      if(lPlayerRank[0].rank == 1){
        Elkaisar.Base.broadcast(JSON.stringify({
          classPath: "Chat.TitledPlayerOpen",
          PlayerName: Player[0].name,
          Title: "ملك الميدان"
        }))
      }
  }
};


