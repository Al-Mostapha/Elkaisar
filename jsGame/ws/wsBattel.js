var WsBattel = {};

WsBattel.started = function (battel) {

    if (Number(battel.id_battel) < 0) {
        alert_box.failMessage("حدث خطاء");
        return;
    }

    $(".close-alert").click();
    $(".close_dialog").click();

    Hero.heroAttackProc();
    Elkaisar.DPlayer.Notif.battel_number = Number(Elkaisar.DPlayer.Notif.battel_number) + 1;
    Elkaisar.DPlayer.Notif.hero_in_battel = Number(Elkaisar.DPlayer.Notif.hero_in_battel) + 1;
    Fixed.refreshPlayerNotif();

    //Crafty.audio.play("war_sound");
    city_profile.refresh_hero_view();

    var world_unit = WorldUnit.getWorldUnit(battel_data.x_coord, battel_data.y_coord).entite;
    Matrial.takeNeedsForAttack(world_unit.t);

    if (!Elkaisar.Battel.Battels) {

        Elkaisar.Battel.Battels = [battel.Battel];

    } else {

        Elkaisar.Battel.Battels.push(battel.Battel);

    }



    for (var ii in battel.StartingPrice)
    {
        Matrial.takeFrom(battel.StartingPrice[ii].Item, battel.StartingPrice[ii].amount);
    }

};

WsBattel.effectedPlayer = function (battel) {

    var Unit = WorldUnit['getWorldUnit'](battel['Battel']['x_coord'], battel['Battel']['y_coord']);
    var Msg = "";
    if (WorldUnit['isArmyCapital'](Unit['ut'])) {
        alert_box['systemChatMessage'](`<p class="round-announce">بداء <span class="red">  ${battel['Attacker']['PlayerName']} </span>بالهجوم على 
                 <span class="red">  ${Elkaisar['World']['UnitTypeData'][Unit['ut']]['Title']} </span> ${Extract['coordDirect'](battel['Battel']['x_coord'], battel['Battel']['y_coord'])}
                   التى تسيطر عليها القوات الخاصة بك!</p>`);
    } else {
        if (WorldUnit['isCity'](Unit['ut']))
            if (Elkaisar['City']['getCityByCoord'](Unit['x'], Unit['y']) != null) {
                Msg = `<div class="battel-f-ann">بداء الملك  (<span class="red">${battel['Attacker']['PlayerName']}</span>) 
                         حملة (<span class="red"> ${Elkaisar['BaseData']['BattelTaskData'][battel['Battel']['task']]['Title']} </span>)  من المدينة                     
                         (<span class="span"> ${battel['Attacker']['CityName']}</span>
                         ${Extract['coordDirect'](battel['Battel']['x_city'], battel['Battel']['y_city'])}  على المدينة 
                          ('<span class="red">${ battel['Defender']['CityName']}</span> ${ Extract['coordDirect'](battel['Battel']['x_coord'], battel['Battel']['y_coord'])})
                         التابعة لك.</div>`;
                Chat['append'](Msg);
                Fixed['refreshPlayerNotif']();
                city_profile['afterBattelFinish']();
                playerBattels();
            } else {
                Msg = `<div class="guild_msg">بداء الملك 
                        (<span class="red"> ${battel['Attacker']['PlayerName']} </span>)} حملة 
                        ('<span class="red">  ${Elkaisar['BaseData']['BattelTaskData'][battel['Battel']['task']]['Title']}  </span>)}
                         من المدينة (<span class="span">  ${battel['Attacker']['CityName']} </span> ${Extract['coordDirect'](battel['Battel']['x_city'], battel['Battel']['y_city'])})
                         على المدينة (<span class="red"> ${battel['Defender']['CityName']}  </span>   ${Extract['coordDirect'](battel['Battel']['x_coord'], battel['Battel']['y_coord'])})
                         التابعة للملك <span class="red"> ${battel['Defender']['PlayerName']} </span>. 
                      </div>`;
                Chat['append'](Msg);
            }
    }


};



WsBattel.ended = function (data) {

    for (var iii = 0; iii < Elkaisar.Battel.Battels.length; iii++) {

        if (Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(data.Battel.id_battel)) {
            Elkaisar.Battel.Battels.splice(iii, 1);
            break;
        }

    }

    $("#dialg_box[type=reports] .left-nav .selected").click();

    city_profile.afterBattelFinish(data);

    Battel.afterFininsh(data);

    Elkaisar.DPlayer.Notif.msg_report = Number(Elkaisar.DPlayer.Notif.msg_report) + 1;
    Elkaisar.DPlayer.Notif.battel_number = Number(Elkaisar.DPlayer.Notif.battel_number) - 1;
    Fixed.refreshPlayerNotif();


};


WsBattel.cityIsOnFire = function (data) {

    alert_box.failMessage(`يبداء الان الهجوم على المدينة ${data.city_name}(${data.x_to},${data.y_to})  من [${data.x_from},${data.y_from}]`);
    alert_box.systemChatMessage(`يبداء الان الهجوم على المدينة ${data.city_name}(${data.x_to},${data.y_to})  من [${data.x_from},${data.y_from}]`);
   // Crafty.audio.play("war_sound");
    Elkaisar.DPlayer.Notif.battel_number = Number(Elkaisar.DPlayer.Notif.battel_number) + 1;
    Fixed.refreshPlayerNotif();
    city_profile.afterBattelFinish();
    playerBattels();

};


WsBattel.helperList = function (data) {

    var enemyArray = [];
    var allayArray = [];

    var enemyNames = [];
    var allayNames = [];

    data.players.forEach((player, index) => {

        data.playersName.forEach((p) => {
            if (Number(p.id_player) === Number(player.id_player)) {
                player.name = p.name;
            }
        });

        if (Number(player.id_player) === Number(data.attacker)) {

        } else if (Number(player.side) === 1) {
            enemyArray.push(player);
        } else if (Number(player.side) === 0) {
            allayArray.push(player);
        }

    });

    allayArray.forEach((p) => {
        allayNames.push(p.name);
    });
    enemyArray.forEach((p) => {
        enemyNames.push(p.name);
    });

    var result = {allaylist: "", enemyList: ""};

    if (allayNames.length > 0)
        result.allaylist = join(`وذالك بمساعدة <span class="red">${allayNames.join(" , ")}</span>`);
    if (allayNames.length > 0)
        result.enemyList = join(` و معاونية <span class="red">${enemyNames.join(" , ")}</span>`);



    return result;
};



WsBattel.announceHonorGained = function (data) {

    var honor = 0;
    data.players.forEach(function (player) {
        if (Number(player.id_player) === Number(data.attacker)) {
            honor = player.prize.honor;
        }

    });

    return honor;

};

WsBattel.announceAttackerName = function (data) {

    var name = '';
    data.playersName.forEach(function (player) {

        if (Number(player.id_player) === Number(data.attacker)) {
            name = player.name;
        }

    });

    return name;
};

WsBattel.endedAnnounce = function (data) {


    var playerNames = this.helperList(data);

    var msg = `<div class="battel-f-ann">
                        قام <span class="red">${data.Attacker.name}</span> بهزيمة بطل النظام ${playerNames.enemyList} فى <span class="red">${Elkaisar.World.UnitTypeData[data.WorldUnit.t].Title}</span> مستوى <span class="red">${data.WorldUnit.l}</span>.
                        ${playerNames.allaylist},
                        وفى المقابل  حصل على  <span class="red">${Matrial.prizeToString(data.WinPrize)}</span> 
                        وايضا <span class="red">${data.honor}</span> شرف
                 </div>`;
    Chat.append(msg);

};


$(document).on("PlayerReady", "html", function () {
    WS_utile.connect();
});