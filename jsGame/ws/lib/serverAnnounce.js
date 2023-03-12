Elkaisar.WsLib.ServerAnnounce = {};

Elkaisar.WsLib.ServerAnnounce.capitalUnLock = function (data) {

    var WorldUnit = data.WorldUnit;

    var msg = `<div class="msg-unit ann-red announce">تم فتح ${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title} ${Extract.coordDirect(WorldUnit.x, WorldUnit.y)} وسيتم اغلاقها بعد ساعتين من الان للمساعدة اضغط <a class="safe-url" href="commingsoon.php" target="_blank">هنا </a></div>`;
    Chat.append(msg);
};



Elkaisar.WsLib.ServerAnnounce.capitalLock = function (data) {

    var playerName = "---";

    if (data.Player)
        playerName = data.Player.name || "----";

    var WorldUnit = data.WorldUnit;

    var msg = `<div class="msg-unit announce user-group-5">تم اغلاق ${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title} ${Extract.coordDirect(WorldUnit.x, WorldUnit.y)} و كان الفوز بالمركز الاول من  نصيب&nbsp;<span class="ann-red"> ${playerName} </span> </div>`;
    Chat.append(msg);
};




Elkaisar.WsLib.ServerAnnounce.QueenCityOpened = function (data) {

    var WorldUnit = data.WorldUnit;
    var msg = ` <div class="msg-unit battel-f-ann">تم فتح &nbsp;<span class="ann-red">${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title}</span> ${Extract.coordDirect(WorldUnit.x, WorldUnit.y)} &nbsp;
                </div>`;
    Chat.append(msg);
};

Elkaisar.WsLib.ServerAnnounce.QueenCityClosed = function (data) {

    var WorldUnit = data.WorldUnit;
    var msg = ` <div class="msg-unit  battel-f-ann">تم إغلاق &nbsp;<span class="ann-red">${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title}</span> ${Extract.coordDirect(WorldUnit.x, WorldUnit.y)} &nbsp;
                    وكان الفوز من نصيب حلف <span class="ann-red">&nbsp;${data.WinnerGuild.GuildName || " ---"}&nbsp;</span>
                </div>`;
    Chat.append(msg);
};


Elkaisar.WsLib.ServerAnnounce.RepleCastleOpened = function (data) {

    var GuildAtt = "---";
    var GuildDef = "---";
    var WorldUnit = data.WorldUnit;

    if (data.GuildDef)
        var msg = ` <div class="msg-unit  battel-f-ann">
                    تم فتح 
                    <span class="ann-red">&nbsp;${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title}&nbsp;</span>
                     للإستقبال معركة حلف <span class="ann-red">&nbsp;${data.GuildAtt ? data.GuildAtt.GuildName : "----" } (هجوم)&nbsp;</span> ضد حلف <span class="ann-red">&nbsp;${data.GuildDef ? data.GuildAtt.GuildName : "===="} (دفاع)&nbsp;</span> الأن!
                </div>`;
    else
        var msg = ` <div class="msg-unit announce battel-f-ann">تم فتح &nbsp;<span class="ann-red">${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title}</span> ${Extract.coordDirect(WorldUnit.x, WorldUnit.y)} &nbsp;
                   </div>`;


    Chat.append(msg);
};





Elkaisar.WsLib.ServerAnnounce.RepleCastleClosed = function (data) {

    var WorldUnit = data.WorldUnit;
    var msg = ` <div class="msg-unit battel-f-ann">
    تم إغلاق <span class="ann-red">&nbsp;${Elkaisar.World.UnitTypeData[WorldUnit.ut].Title}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
};


Elkaisar.WsLib.ServerAnnounce.Battel = {};

WsBattel.helperList = function (data) {

    var enemyArray = [];
    var allayArray = [];

    var enemyNames = [];
    var allayNames = [];

    data.Joiners.forEach((player, index) => {
        allayNames.push(player.name);
    });
    data.Defender.forEach((player, index) => {
        enemyNames.push(player.name);
    });

    var result = {allaylist: "", enemyList: ""};

    if (allayNames.length > 0)
        result.allaylist = join(`وذالك بمساعدة <span class="red">${allayNames.join(" , ")}</span>`);
    if (allayNames.length > 0)
        result.enemyList = join(` و معاونية <span class="red">${enemyNames.join(" , ")}</span>`);



    return result;
};

Elkaisar.WsLib.ServerAnnounce.Battel.Win = function (data) {


    var playerNames = WsBattel.helperList(data);

    var msg = `<div class="battel-f-ann">
                        قام <span class="red">${data.Attacker.name}</span> بهزيمة بطل النظام ${playerNames.enemyList} فى <span class="red">${Elkaisar.World.UnitTypeData[data.WorldUnit.ut].Title}</span> مستوى <span class="red">${data.WorldUnit.l}</span>.
                        ${playerNames.allaylist},
                        وفى المقابل  حصل على  <span class="red">${Matrial.prizeToString(data.WinPrize)}</span> 
                        وايضا <span class="red">${data.honor}</span> شرف
                 </div>`;
    Chat.append(msg);

};

Elkaisar.WsLib.ServerAnnounce.Battel.GuildWin = function (data) {


    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);

    var msg = `<div class="battel-f-ann">نجح حلف <span class="red">${data.GuildName}</span> بقيادة <span class="red">${data.PlayerName}</span> بالسيطرة على ${Elkaisar.World.UnitTypeData[Unit.ut].Title} ${Extract.coordDirect(Unit.x, Unit.y)}</div>`;
    Chat.append(msg);

};

Elkaisar.WsLib.ServerAnnounce.Battel.Started = function (data)
{

    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    var msg = `<div class="battel-f-ann">بداء حلف <span class="red">${data.GuildName}</span> بقيادة <span class="red">${data.PlayerName}</span> معركة ضد ${Elkaisar.World.UnitTypeData[Unit.ut].Title} ${Extract.coordDirect(Unit.x, Unit.y)} الان</div>`;
    Chat.append(msg);

};


Elkaisar.WsLib.ServerAnnounce.CityColonized = function (data)
{
    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    Unit.CityColonizerFlag = data.CityColonizerFlag;
    Unit.CityColonized = true;
    Unit.ColonizerIdGuild = data.ColonizerIdGuild;
    Unit.ColonizerIdPlayer = data.ColonizerIdPlayer;
    Elkaisar.World.Map.RefreshWorld();
    var msg = `<div class="battel-f-ann">نجح الملك <span class="red">${data.ColonizerName}</span> فى استعمار المدينة <span class="red">${data.CityColonizedName}</span> ${Extract.coordDirect(data.xCoord, data.yCoord)} التابعة للملك <span class="red">${data.ColonizedName}</span> </div>`;
    Chat.append(msg);

};


Elkaisar.WsLib.ServerAnnounce.newMailSent = function (data) {
    var Msg = `<div class="msg-unit ann-red announce">تم وصول رسالة بريد من النظام</div>`;
    Chat['append'](Msg);
    Elkaisar.DPlayer.Notif['msg_in']++;
    Fixed['refreshPlayerNotif']();
}

Elkaisar.WsLib.ServerAnnounce.NewServerAnnounce = function (data) {
    var Msg = `<div class="msg-unit announce server-announce-${data['AnnounceRank']}">[النظام]:  ${data['Announce']} </div>`;
    Chat['append'](Msg);
};


Elkaisar.WsLib.ServerAnnounce.ArenachallangeLvlUp = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! تم ترقية ميدان الملك  
                (<span class="red"> ${data['Player']['PlayerName']}</span>)
              الى مستوى   (<span class="red">  ${(Number(data['ArenaData']['lvl']) + 0x1)}  </span>)  
                </div>'`;
    Chat['append'](Msg);
    if (Elkaisar.DPlayer['Player']['id_player'] == data['Player']['id_player'])
        Elkaisar.ArenaChallange.getArenaData().done(function () {
            $('#SArenaField')['click']();
        });
};

Elkaisar.WsLib.ServerAnnounce.ArenachallangeTeamLvlUp = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! تم ترقية ميدان الفريق  
                (<span class="red"> ${data.Team.TeamName}</span>)
              الى مستوى   (<span class="red">  ${(Number(data.ArenaData.lvl) + 0x1)}  </span>)  
                </div>'`;
    Chat.append(Msg);

    Elkaisar.ArenaChallange.getArenaData().done(function () {
        $('#SArenaField')['click']();
    });
};

Elkaisar.WsLib.ServerAnnounce.ArenachallangeGuildLvlUp = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! تم ترقية ميدان حلف  
                (<span class="red"> ${data.Guild.GuildName}</span>)
              الى مستوى   (<span class="red">  ${(Number(data.ArenaData.lvl) + 0x1)}  </span>)  
                </div>'`;
    Chat.append(Msg);

    Elkaisar.ArenaChallange.getArenaData().done(function () {
        $('#SArenaField')['click']();
    });
};

Elkaisar.WsLib.ServerAnnounce.KingOfArenaChallange = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! اصبح الملك   (<span class="red">  ${data['Player']['PlayerName']}  </span>)   ملك ميدان التحدى الاول!}</div>`;
    Chat.append(Msg);
    Elkaisar.ArenaChallange.getArenaData().done(function () {
        $('#SArenaField')['click']();
    });
};

Elkaisar.WsLib.ServerAnnounce.KingOfArenaTeamChallange = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! اصبح الفريق   (<span class="red">  ${data.Team.TeamName}  </span>)   ملك ميدان تحدى الفرق الاول!}</div>`;
    Chat.append(Msg);
    Elkaisar.ArenaChallange.getArenaData().done(function () {
        $('#SArenaField')['click']();
    });
};


Elkaisar.WsLib.ServerAnnounce.KingOfArenaGuildChallange = function (data) {
    var Msg = `<div class="battel-f-ann">تهانينا! اصبح حلف   (<span class="red">  ${data.Guild.GuildName}  </span>)   ملك ميدان تحدى الأحلاف الاول!}</div>`;
    Chat.append(Msg);
    Elkaisar.ArenaChallange.getArenaData().done(function () {
        $('#SArenaField').click();
    });
};

Elkaisar.WsLib.ServerAnnounce.ArenaChallangeRoundEnd = function (data) {
    var Msg = `<div class="battel-f-ann">تم انهاء جولة ميدان التحدى و فاز الملك   (<span class="red">  ${data['PlayerName']}  </span>)   !</div>`;
    Chat['append'](Msg);
};
Elkaisar.WsLib.ServerAnnounce.ArenaChallangeTeamRoundEnd = function (data) {
    var Msg = `<div class="battel-f-ann">تم انهاء جولة ميدان التحدى و فاز الفريق   (<span class="red">  ${data['TeamName']}  </span>)   !</div>`;
    Chat['append'](Msg);
};
Elkaisar.WsLib.ServerAnnounce.ArenaChallangeGuildRoundEnd = function (data) {
    var Msg = `<div class="battel-f-ann">تم انهاء جولة ميدان التحدى و فاز الحلف   (<span class="red">  ${data['GuildName']}  </span>)   !</div>`;
    Chat['append'](Msg);
};

Elkaisar.WsLib.ServerAnnounce.SeaCityOppend = function (_0xa042dd) {
    var Msg = `<div class="battel-f-ann"> تم فتح قلاع   <span class="red">الغذاء </span> و <span class="red">الاخشاب </span>و  <span class="red"> الحديد</span> و <span class="red">الصخور</span>  وسيتم اغلاقها بعد <span class="red">ساعة</span> !</div>`;
    Chat['append'](Msg);
};

Elkaisar.WsLib.ServerAnnounce.SeaCityClosed = function (data) {
    var Msg = `<div class="battel-f-ann"> تم غلق قلاع <span class="red">الغذاء </span> و <span class="red">الاخشاب</span> و <span class="red">الحديد</span> و <span class="red">الصخور</span> !</div>`;
    Chat['append'](Msg);
};

Elkaisar.WsLib.ServerAnnounce.SeaCityCoinOppend = function (data) {
    var Msg = '<div class="battel-f-ann"> تم فتح قلاع <span class="red">عملات السسترسس </span>  وسيتم اغلاقها بعد <span class="red">ساعة</span> !</div>';
    Chat['append'](Msg);
};

Elkaisar.WsLib.ServerAnnounce.SeaCityCoinClosed = function (data) {
    var Msg = '<div class="battel-f-ann"> تم غلق قلاع <span class="red">عملات السسترسس </span>!</div>';
    Chat['append'](Msg);
};
