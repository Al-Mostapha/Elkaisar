Elkaisar.Team = {};

Elkaisar.Team.Relations = {
    'RelationAllay': 0,
    'RelationEnemy': 1,
    'RelationFriend': 2
};


Elkaisar.Team.RANK_DATA = {
    NORMAL_MEM: 0,
    SENIOR_MEM: 1,
    OLD_MEM: 2,
    SUPERVISOR: 3,
    MENSTER: 4,
    DEPUTY: 5,
    LEADER: 6

};


Elkaisar.Team.getPlayerTeam = function () {

    return $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/getPlayerTeam`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            Elkaisar.Team.PlayerTeam = JSON.parse(data);

            if (Elkaisar.Team.PlayerTeam.Team) {
                for (var ii in Elkaisar.Team.PlayerTeam.TeamMember) {
                    if (Elkaisar.Team.PlayerTeam.TeamMember[ii].id_player == Elkaisar.DPlayer.Player.id_player)
                        Elkaisar.Team.PlayerTeam.Player = Elkaisar.Team.PlayerTeam.TeamMember[ii];
                }
                
                $("#PlayerTeamWrapper").html(
                        `<button class="">
                            <div class="slog slogBtm" style="background-image: url(images/style/bottom-${Elkaisar.Team.PlayerTeam.Team.slog_btm}.png)"></div>
                            <div class="slog slogMid" style="background-image: url(images/style/central-${Elkaisar.Team.PlayerTeam.Team.slog_cnt}.png); margin-top: -64px;" ></div>
                            <div class="slog slogTop" style="background-image: url(images/style/top-${Elkaisar.Team.PlayerTeam.Team.slog_top}.png); margin-top: -64px;"></div>
                        </button>`);
                
                
            }else{
                $("#PlayerTeamWrapper").html(`<button class="NoTeamIcon"></button>`);
            }
            
            

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

};


Elkaisar.Team.showTeamReview = function (idTeam) {

    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/showTeamReview`,
        data: {
            token: Elkaisar.Config.OuthToken,
            idTeam: idTeam
        },

        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            const JsonObject = JSON.parse(data);
            if (!JsonObject.id_team)
                return alert_box.failMessage("هذا الفريق غير موجود");

            console.log(JsonObject)

            const OverLay = `  <div id="over_lay">
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
                                                            <img src="images/style/bottom-${JsonObject.slog_btm}.png" style="position: absolute">
                                                            <img src="images/style/central-${JsonObject.slog_cnt}.png" style="position: absolute">
                                                            <img src="images/style/top-${JsonObject.slog_top}.png" style="position: absolute">
                                                        </div>
                                                        <div class="right">
                                                            <div class="t-r">
                                                                <label>${JsonObject.LeaderName}</label>
                                                                <label>: القائد</label>
                                                            </div>
                                                            <div class="t-r">
                                                                <label>${getArabicNumbers(JsonObject.rank)}</label>
                                                                <label>: تصنيف</label>
                                                            </div>
                                                            <div class="t-r">
                                                                <label>${getArabicNumbers(JsonObject.mem_num)}</label>
                                                                <label>: الاعضاء</label>
                                                            </div>
                                                            <div class="t-r">
                                                                <label>${getArabicNumbers(JsonObject.lvl)}</label>
                                                                <label>: مستوى</label>
                                                            </div>
                                                            <div class="t-r">
                                                                <label>${getArabicNumbers(JsonObject.prestige)}</label>
                                                                <label>: برستيج</label>
                                                            </div>
                                                            <div class="t-r">
                                                                <label>${getArabicNumbers(JsonObject.honor)}</label>
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
                                                                        background-position: center;">${JsonObject.name}</h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="down">
                                                    <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                                    <p>
                                                        ${JsonObject.word || "لا توجد مقدمة"}
                                                    </p>
                                                    ${!Elkaisar.Team.PlayerTeam.Team ? `<div class="flexCenter" id="send-team-req" >
                                                                                            <button id="SendTeamJoinReq" class="full-btn full-btn-3x" data-id-team="${JsonObject.id_team}">ارسال دعوة انضمام</button>
                                                                                        </div>` : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

            $("body").append(OverLay);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }


    });

}

$(document).on("click", ".show-team-review", function () {
    const idTeam = $(this).attr("data-id-team");
    Elkaisar.Team.showTeamReview(idTeam);
});



$(document).on("PlayerReady", "html", function () {
    Elkaisar.Team.getPlayerTeam();
});




Elkaisar.Team.noTeamJoin = function () {

    var InvList = "";
    var TeamInv;
    for (var ii = 0; ii < 5; ii++) {
        TeamInv = Elkaisar.Team.PlayerTeam.TeamInv[ii];
        if (TeamInv) {
            InvList += `<div class="tr" data-id-team="${TeamInv.id_team}">
                            <div class="td_1" style="width: 50%;">${TeamInv.name}</div>
                            <div class="td_2 flex btnList">
                                <button  class="btn full-btn-3x ellipsis rejectTeamInv" data-id-team="${TeamInv.id_team}">الغاء</button>
                                <button  class="btn full-btn-3x ellipsis acceptTeamInv" data-id-team="${TeamInv.id_team}">قبول</button>
                                <button  class="btn full-btn-3x ellipsis show-team-review" data-id-team="${TeamInv.id_team}">عرض</button>
                            </div>
                        </div>`;
        } else {
            InvList += `<div class="tr">
                            <div class="td_1"></div>
                            <div class="td_2"></div>
                        </div>`;
        }

    }
    var TeamReq = "";
    if(Elkaisar.Team.PlayerTeam.TeamReq.length){
        TeamReq = `<div id="PlayerTeamReqList" class="tr" data-id-team="${Elkaisar.Team.PlayerTeam.TeamReq[0].id_team}">
                        <div style="width: 70%;">${Elkaisar.Team.PlayerTeam.TeamReq[0].name}</div>
                        <div class="flexCenter btnList">
                            <button id="CancelTeamJoinReq" class="btn full-btn-3x ellipsis" data-id-team="${Elkaisar.Team.PlayerTeam.TeamReq[0].id_team}">الغاء</button>
                            <button  class="btn full-btn-3x ellipsis show-team-review" data-id-team="${Elkaisar.Team.PlayerTeam.TeamReq[0].id_team}">عرض</button>
                        </div>
                    </div>`
    }else{
        TeamReq = `<div class="tr"></div>`;
    }
    return `   <div id="select_from">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png" class="banner">
                            <div class="title">الفريق</div>
                            <img class="close close_use_menu" id="closeGuildSelFrom" src="images/btns/close_b.png">
                        </div>
                        <p style="clear: both"></p>
                        <div class="container">
                            <div id="two_buttons">
                                <button class="full-btn full-btn-3x pull-R" id="ShowAvailableTeams"> اعرض الفريق المتاح</button>
                                <button class="full-btn full-btn-3x pull-L" id="CreatNewTeam"> انشاء فريق </button>
                            </div>
                            <div id="sent_to">
                                <div class="th">
                                    <div class="td_2 ellipsis">الطلبات المقدمة</div>
                                    <div class="td_1 ellipsis">اختر</div>
                                </div>
                                ${TeamReq}
                            </div>
                            <div id="sent_from">
                                <div class="th">
                                    <div class="td_2 ellipsis">الدعوات من الفرق الأخرى</div>
                                    <div class="td_1 ellipsis">اختر</div>

                                </div>

                                <div id="PlayerTeamInvList">
                                    ${InvList}
                                </div>
                            </div>
                        </div>
                    </div>`;
};


Elkaisar.Team.DialogBox = function () {

    return `<div id="dialg_box" class="" style="top: 125px;">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png">
                            <div class="title">الفريق</div>
                        </div>
                        <div class="nav_bar">
                            <div id="TeamHeaderNavBar" class="left-nav">
                                <ul>
                                    <li data-nav-to="TeamHomePage"    class="selected">الفريق</li>
                                    <li data-nav-to="TeamFriendPage"  class="">أصدقاء</li>
                                    <li data-nav-to="TeamEnemyPage"   class="">أعداء</li>
                                    <li data-nav-to="TeamRankingPage" class="TeamRankPageCl">تصنيف</li>
                                    <li data-nav-to="TeamHistoryPage" class="">تاريخ الفريق</li>
                                    <li data-nav-to="TeamUpgradePage" class="">تطوير</li>
                                </ul>
                            </div>
                            <div id="TeamNavBarList" class="right-nav">
                                ${Elkaisar.Team.PlayerTeam.Team ? `
                                <div class="btn full-btn-3x ellipsis" id="TeamAdmins">
                                    إدارة الفريق
                                </div>
                                <div class="drop-list">
                                    <ul>
                                        ${Elkaisar.Team.PlayerTeam.Player.rank >= Elkaisar.Team.RANK_DATA.DEPUTY ? `<li id="chang-t-word"> تعديل المقدمة</li>` : ""}
                                        ${Elkaisar.Team.PlayerTeam.Player.rank >= Elkaisar.Team.RANK_DATA.DEPUTY ? `<li id="change-t-F_E-list">الاصدقاء والاعداء</li>` : ""}
                                        ${Elkaisar.Team.PlayerTeam.Player.rank >= Elkaisar.Team.RANK_DATA.SUPERVISOR ? ` <li id="invite-t">دعوة ملك</li>` : ""}
                                        ${Elkaisar.Team.PlayerTeam.Player.rank >= Elkaisar.Team.RANK_DATA.MENSTER ? ` <li id="change-t-slog"> تغير الشعار</li>` : ""}
                                        ${Elkaisar.Team.PlayerTeam.Player.rank >= Elkaisar.Team.RANK_DATA.SENIOR_MEM ? ` <li id="resignation-t"> استقالة</li>` : ""}
                                        <li id="PlayerTeamLeave">
                                            الخروج
                                        </li>
                                        ${Elkaisar.Team.PlayerTeam.Player.rank == Elkaisar.Team.RANK_DATA.LEADER ? ` <li id="destroy-t">تفكيك</li>` : ""}

                                    </ul>
                                </div>` : ""}
                                <div class="nav_icon">
                                    <img class="close_dialog" src="images/btns/close_b.png">
                                </div>
                            </div>
                        </div>
                        <div class="box_content"></div>
                    </div>`;
};



Elkaisar.Team.TeamHomePage = function () {
    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    const Page = ` <div id="TeamBox">
                        <div id="TeamBoxLeft">
                            <div id="TeamProfileBox">
                                <div class="ProfileData">
                                    <div class="TeamSlog">
                                        <div class="SlogContainer">
                                            <div class="slog slogBtm" style="background-image: url(images/style/bottom-${PlayerTeam.Team.slog_btm}.png);"></div>
                                            <div class="slog slogMid" style="background-image: url(images/style/central-${PlayerTeam.Team.slog_cnt}.png); margin-top: -150px;"></div>
                                            <div class="slog slogTop" style="background-image: url(images/style/top-${PlayerTeam.Team.slog_top}.png); margin-top: -150px;"></div>
                                        </div>
                                    </div>
                                    <div class="TeamListData">
                                        <ul>
                                            <li>
                                                <div class="icon" style="background-image: url(images/icons/prestige.png);"></div>
                                                <div class="title stroke">${PlayerTeam.Team.prestige}</div>
                                            </li>
                                            <li>
                                                <div class="icon" style="background-image: url(images/icons/rank-player.png);"></div>
                                                <div class="title stroke">${PlayerTeam.Team.rank}</div>
                                            </li>
                                            <li>
                                                <div class="icon" style="background-image: url(images/icons/honor.png);"></div>
                                                <div class="title stroke">${PlayerTeam.Team.honor}</div>
                                            </li>
                                            <li>
                                                <div class="icon" style="background-image: url(images/icons/stat_streak.png);"></div>
                                                <div class="title stroke">${PlayerTeam.Team.mem_num}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="TeamName">
                                    <button class="name stroke">  <div>${PlayerTeam.Team.name}</div> </button>
                                </div>
                            </div>
                            <div id="TeamIntroBox">
                                <div class="Header">
                                    <h1>نبذة  عن الفريق</h1>
                                </div>
                                <div class="Body">
                                ${PlayerTeam.Team.word}
                                </div>
                            </div>
                        </div>
                        <div id="TeamBoxRight">
                            <div class="PlayerList">
                                <div class="Header">
                                    قائمة اللاعبين
                                </div>
                                <div class="Body">
                                    <ul class="LeaderLi">
                                        <li>
                                            <div class="LPlayerAvaterBg">
                                                <div class="LPlayerAvater" style="background-image: url(${PLAYER_FACES[PlayerTeam.TeamMember[0].avatar]});"></div>
                                                <div class="LPlayerTitle stroke">قائد الفريق</div>
                                            </div>
                                            <div class="LPlayerName stroke">
                                                ${PlayerTeam.TeamMember[0].PlayerName}
                                            </div>
                                        </li>
                                    </ul>
                                    <ol class="TeamMateLi flex">
                                        ${PlayerTeam.TeamMember[1] ? `
                                            <li>
                                                <div class="PlayerAvater" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerTeam.TeamMember[1].avatar]});">
                                                    <div class="playerSettingIcon TeamMemberSettingIcon">
                                                        <button class="btn"></button>
                                                    </div>
                                                    <div class="settingList">
                                                        <ul>
                                                            <li>ترقية    &nbsp;&nbsp;↪</li>
                                                            <li>نسبة الجوائز</li>
                                                            <li class="FireGuildMemeber" data-id-player="${PlayerTeam.TeamMember[1].id_player}">طرد</li>
                                                        </ul>
                                                    </div>
                                                    <div class="PlayerAvaterBg"></div>
                                                    <div class="PlayerTitle stroke" style="background-position-y: -48px;">مساعد القائد</div>
                                                </div>
                                                <div class="PlayerName stroke">
                                                    ${PlayerTeam.TeamMember[1].PlayerName}
                                                </div>
                                            </li>` : ``}
                                        
                                        ${PlayerTeam.TeamMember[2] ? `
                                            <li>
                                                <div class="PlayerAvater" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerTeam.TeamMember[2].avatar]});">
                                                    <div class="playerSettingIcon TeamMemberSettingIcon">
                                                        <button class="btn"></button>
                                                    </div>
                                                    <div class="settingList">
                                                        <ul>
                                                            <li>ترقية    &nbsp;&nbsp;↪</li>
                                                            <li>نسبة الجوائز</li>
                                                            <li class="FireGuildMemeber" data-id-player="${PlayerTeam.TeamMember[2].id_player}">طرد</li>
                                                        </ul>
                                                    </div>
                                                    <div class="PlayerAvaterBg"></div>
                                                    <div class="PlayerTitle stroke" style="background-position-y: -72px;">مستشار القائد</div>
                                                </div>
                                                <div class="PlayerName stroke">
                                                    ${PlayerTeam.TeamMember[2].PlayerName}
                                                </div>
                                            </li>` : ``}
                                        
                                        ${PlayerTeam.TeamMember[3] ? `
                                            <li>
                                                <div class="PlayerAvater" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerTeam.TeamMember[3].avatar]});">
                                                    <div class="playerSettingIcon TeamMemberSettingIcon">
                                                        <button class="btn"></button>
                                                    </div>
                                                    <div class="settingList">
                                                        <ul>
                                                            <li>ترقية    &nbsp;&nbsp;↪</li>
                                                            <li>نسبة الجوائز</li>
                                                            <li class="FireGuildMemeber" data-id-player="${PlayerTeam.TeamMember[3].id_player}">طرد</li>
                                                        </ul>
                                                    </div>
                                                    <div class="PlayerAvaterBg"></div>
                                                    <div class="PlayerTitle stroke" style="background-position-y: -96px;">مقاتل الفريق</div>
                                                </div>
                                                <div class="PlayerName stroke">
                                                ${PlayerTeam.TeamMember[3].PlayerName}
                                                </div>
                                            </li>` : ``}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>`;
    $("#dialg_box .box_content").html(Page);
};

Elkaisar.Team.InvList = function () {
    const PlayerTeam = Elkaisar.Team.PlayerTeam;
};

Elkaisar.Team.TeamReqList = function () {

    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    let List = "";
    const ListCount = Math.max(PlayerTeam.TeamReq.length, 5);
    for (var iii = 0; iii < ListCount; iii++) {

        if (PlayerTeam.TeamReq[iii]) {
            List += `   <div class="tr flex">
                            <div class="tc-player-avater" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerTeam.TeamReq[iii].avatar]});"></div>
                            <div class="tc-player-name">${PlayerTeam.TeamReq[iii].PlayerName}</div>
                            <div class="tc-edit-req">
                                <button class="full-btn-3x btn acceptTeamJoinReq" data-id-player="${PlayerTeam.TeamReq[iii].id_player}">قبول</button>
                                <button class="full-btn-3x btn rejectTeamJoinReq" data-id-player="${PlayerTeam.TeamReq[iii].id_player}">رفض</button>
                                <button class="full-btn-3x btn show-player-profile" data-id-player="${PlayerTeam.TeamReq[iii].id_player}">عرض</button>
                            </div>
                        </div>`;
        } else {
            List += `<div class="tr"></div>`;
        }

    }

    return ` <div class="Header">
                <h1>طلبات الإنضمام</h1>
            </div>
            <div class="Body">
                ${List}
            </div>`;
};

Elkaisar.Team.TeamInvList = function () {

    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    let List = "";
    const ListCount = Math.max(PlayerTeam.TeamInv.length, 5);
    for (var iii = 0; iii < ListCount; iii++) {

        if (PlayerTeam.TeamInv[iii]) {
            List += `   <div class="tr flex">
                            <div class="tc-player-avater" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerTeam.TeamInv[iii].avatar]});"></div>
                            <div class="tc-player-name">${PlayerTeam.TeamInv[iii].PlayerName}</div>
                            <div class="tc-edit-req">
                                <button class="full-btn-3x btn cancelTeamInv" data-id-idPlayer="${PlayerTeam.TeamInv[iii].id_player}">حذف</button>
                                <button class="full-btn-3x btn show-player-profile" data-id-player="${PlayerTeam.TeamInv[iii].id_player}">عرض</button>
                            </div>
                        </div> `;
        } else {
            List += `<div class="tr"></div>`;
        }

    }

    return `    <div class="Header">
                    <h1>الدعوات</h1>
                </div>
                <div class="Body">
                    ${List}
                </div>`;
};

Elkaisar.Team.TeamRelationList = function (Relation) {
    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    let List = "";
    var ListArr = [];
    for (var ii in PlayerTeam.TeamRelation)
        if (PlayerTeam.TeamRelation[ii].relation == Relation)
            ListArr.push(PlayerTeam.TeamRelation[ii]);

    const ListCount = Math.max(ListArr.length, 9);
    for (var iii = 0; iii < ListCount; iii++) {

        if (ListArr[iii]) {
            List += `   <div class="tr">
                            <div class="tc-team flex">
                                <div class="team-slog">
                                    <div class="slog" style="background-image: url(images/style/bottom-${ListArr[iii].slog_btm}.png);"></div>
                                    <div class="slog" style="background-image: url(images/style/central-${ListArr[iii].slog_cnt}.png); margin-top: -40px;"></div>
                                    <div class="slog" style="background-image: url(images/style/top-${ListArr[iii].slog_top}.png); margin-top: -40px;"></div>
                                </div>
                                <div class="team-name">${ListArr[iii].name}</div>
                            </div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[ListArr[iii].avater]});"></div>
                                <div class="name"> ${ListArr[iii].PlayerName} </div>
                            </div>
                            <div class="tc-pres flex">${ListArr[iii].prestige}</div>
                            <div class="tc-memNum flex">${ListArr[iii].mem_num}</div>
                            <div class="tc-show">
                                <button class="full-btn-3x btn">عرض</button>
                                <button class="full-btn-3x btn">تعديل</button>
                            </div>
                        </div>`;
        } else {
            List += `<div class="tr"></div>`;
        }
    }
    return `    <div class="Body">
                    <div class="TeamEneFrieList">
                        ${List}
                    </div>
                </div>`
}

Elkaisar.Team.TeamFriendPage = function () {
    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    const Page = ` <div id="TeamBox">
                        <div id="TeamBoxLeft">
                            <div id="TeamJoinReqBox" class="TeamInvJoinBox">
                                ${Elkaisar.Team.TeamReqList()}
                            </div>
                            <div id="TeamInevReqBox" class="TeamInvJoinBox">
                                ${Elkaisar.Team.TeamInvList()}
                            </div>
                        </div>
                        <div id="TeamBoxRight">
                            <div class="PlayerList">
                                <div class="Header HeaderEnemyFrie flex">
                                    <div class="tc-team">فريق</div>
                                    <div class="tc-leader">القائد</div>
                                    <div class="tc-pres">برستيج</div>
                                    <div class="tc-memNum">عضو</div>
                                    <div class="tc-show">إختر</div>
                                </div>
                                ${Elkaisar.Team.TeamRelationList(Elkaisar.Team.Relations.RelationFriend)}
                            </div>
                        </div>
                    </div>`;
    $("#dialg_box .box_content").html(Page);
};

Elkaisar.Team.TeamEnemyPage = function () {
    const PlayerTeam = Elkaisar.Team.PlayerTeam;
    const Page = ` <div id="TeamBox">
                        <div id="TeamBoxLeft">
                            <div id="TeamJoinReqBox" class="TeamInvJoinBox">
                                ${Elkaisar.Team.TeamReqList()}
                            </div>
                            <div id="TeamInevReqBox" class="TeamInvJoinBox">
                                ${Elkaisar.Team.TeamInvList()}
                            </div>
                        </div>
                        <div id="TeamBoxRight">
                            <div class="PlayerList">
                                <div class="Header HeaderEnemyFrie flex">
                                    <div class="tc-team">فريق</div>
                                    <div class="tc-leader">القائد</div>
                                    <div class="tc-pres">برستيج</div>
                                    <div class="tc-memNum">عضو</div>
                                    <div class="tc-show">إختر</div>
                                </div>
                                ${Elkaisar.Team.TeamRelationList(Elkaisar.Team.Relations.RelationEnemy)}
                            </div>
                        </div>
                    </div>`;
    $("#dialg_box .box_content").html(Page);

};

Elkaisar.Team.getTeamRank = function (offset) {

    return $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/getTeamRank`,
        data: {
            token: Elkaisar.Config.OuthToken,
            offset: offset
        },
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            var List = "";
            Elkaisar.Team.RankList = JSON.parse(data);
            for (var iii = 0; iii < 10; iii++) {
                if (Elkaisar.Team.RankList[iii]) {
                    List += ` <div class="tr">
                                <div class="tc-rank">${iii + offset + 1}</div>
                                <div class="tc-team flex">
                                    <div class="team-slog">
                                        <div class="slog" style="background-image: url(images/style/bottom-${Elkaisar.Team.RankList[iii].slog_btm}.png);">
                                        </div>
                                        <div class="slog" style="background-image: url(images/style/central-${Elkaisar.Team.RankList[iii].slog_cnt}.png); margin-top: -37px;">
                                        </div>
                                        <div class="slog" style="background-image: url(images/style/top-${Elkaisar.Team.RankList[iii].slog_top}.png); margin-top: -37px;">
                                        </div>
                                    </div>
                                    <div class="team-name">${Elkaisar.Team.RankList[iii].name}</div>
                                </div>
                                <div class="tc-leader flex">
                                    <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Elkaisar.Team.RankList[iii].avatar]});">
                                        <div class="border"></div>
                                    </div>
                                    <div class="name"> ${Elkaisar.Team.RankList[iii].PlayerName} </div>
                                </div>
                                <div class="tc-pres flex">${Elkaisar.Team.RankList[iii].prestige}</div>
                                <div class="tc-honor flex">${Elkaisar.Team.RankList[iii].honor}</div>
                                <div class="tc-memNum flex">${Elkaisar.Team.RankList[iii].mem_num}</div>
                                <div class="tc-show">
                                    <button class="full-btn-3x btn showTeamReview" data-id-team="${Elkaisar.Team.RankList[iii].id_team}">عرض</button>
                                </div>
                            </div>`;
                } else {
                    List += `<div class="tr"></div>`
                }

                $("#RankList .Body").html(List)
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

};

$(document).on("click", ".showTeamReview", function () {

    const idTeam = $(this).attr("data-id-team");
    Elkaisar.Team.showTeamReview(idTeam);

});

Elkaisar.Team.RankPage = function (offset) {


    const Box = `<div class="box_content">
                    <div id="TeamBox">
                    <div id="RankList" class="RankPage">
                        <div class="">
                            <div class="Header HeaderEnemyFrie flex">
                                <div class="tc-rank">تصنيف</div>
                                <div class="tc-team">فريق</div>
                                <div class="tc-leader">القائد</div>
                                <div class="tc-pres">برستيج</div>
                                <div class="tc-honor">شرف</div>
                                <div class="tc-memNum">عضو</div>
                                <div class="tc-show">إختر</div>
                            </div>
                            <div class="Body">
                                <div class="">
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div id="DialBoxFooter" data-rank-for="">
                    <div id="BesideNavBtns">
                        <div class="NavContBtns">
                            <div class="nav-arrows flex">
                                <div data-move="most-left" class="most-left-btn move_p_rank"></div>
                                <div data-move="left"      class="left-btn move_p_rank"></div>
                                <div class="page-count flex stroke"><span id="current_page_num"></span>/<span id="TotalPageNumber"></span></div>
                                <div data-move="right" class="right-btn move_p_rank"></div>
                                <div data-move="most-right" class="most-right-btn move_p_rank"></div>
                            </div>
                            <div id="goToBtnRankCo">
                                <div class="flex">
                                    <input type="text" class="only_num input">
                                    <button class="goBtn btn full-btn full-btn-1x ellipsis">
                                        اذهب الى
                                    </button>
                                </div>
                            </div>
                            <div id="RankSearchSelect">
                                ${Elkaisar.Ui.Select.make([{value: "ByName", title: "الأسم"}])}
                            </div>
                            <div id="SearchByInput">
                                <div id="nav_search" class="flex">
                                    <input type="text" class="input">
                                    <button class="full-btn full-btn-1x ellipsis">
                                        بحث
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    $("#dialg_box .box_content").replaceWith(Box);
    Elkaisar.Team.getTeamRank(offset);
};

Elkaisar.Team.HistoryPage = function (offset) {


    const Box = `<div id="TeamBox">
                    <div id="RankList">
                        <div class="">
                            <div class="Header HeaderEnemyFrie flex">
                                <div class="tc-rank">تصنيف</div>
                                <div class="tc-team">فريق</div>
                                <div class="tc-leader">القائد</div>
                                <div class="tc-pres">برستيج</div>
                                <div class="tc-honor">شرف</div>
                                <div class="tc-memNum">عضو</div>
                                <div class="tc-show">إختر</div>
                            </div>
                            <div class="Body">
                                <div class="">
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                    <div class="tr"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    $("#dialg_box .box_content").html(Box);
};

Elkaisar.Team.changeTeamRelationBox = function () {
    var army_content = `   <div id="alert_box" class="F_E-list">
                                    <div class="row-1"> 
                                        <input id="TeamEneFriInput" type="text" data-id-team="null" class="input">
                                        <label class="th ellipsis">إسم الفريق</label>
                                        <div id="g-search_result"class="search_res">
                                            <ul> 
                                                
                                            </ul>
                                        </div>

                                    </div>
                                    <div class="row-2">
                                        <ul>
                                            <li>    
                                                <input id="trigger_1" type="radio" name="guild_relation" value="${Elkaisar.Team.Relations.RelationEnemy}" >
                                                <label for="trigger_1" class="checker"></label>
                                                <span> عدو</span>
                                            </li>
                                            <li>    
                                                <input id="trigger_2" type="radio" name="guild_relation" value="${Elkaisar.Team.Relations.RelationFriend}">
                                                <label for="trigger_2" class="checker"></label>
                                                <span>صديق</span>
                                            </li>
                                            <li>    
                                                <input id="trigger_3" type="radio" name="guild_relation"  checked value="${Elkaisar.Team.Relations.RelationAllay}">
                                                <label for="trigger_3" class="checker" ></label>
                                                <span> محايد</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="row-3">
                                        <div class="confim-btn">

                                            <button class="full-btn  full-btn-3x"   id="submit-team-relation">
                                                تأكيد
                                            </button>

                                        </div>

                                    </div>
                                </div> `;

    return army_content;
};

$(document).on("click", "#PlayerTeamWrapper button", function () {
    $("#select_from").remove();
    if (Elkaisar.Team.PlayerTeam.Team)
        dialogBoxShow(Elkaisar.Team.DialogBox(), function () {
            Elkaisar.Team.TeamHomePage();
        });
    else {
        dialogBoxShow(Elkaisar.Team.noTeamJoin());
        Elkaisar.Team.getPlayerTeam().done(function () {
            $("#select_from").replaceWith(Elkaisar.Team.noTeamJoin());
        });
    }
});

$(document).on("click", "#CreatNewTeam", function () {

    var box = `  <div id="alert_container" class="bg-general" style=" position:fixed; width: 560px; 
                        z-index:1000;left: 50%;margin-left: -280px; top: 150px; 
                        height:318px"> 
                    <div id="alert_head">    
                        <div>        
                            <img src="images/panner/king_name.png">    
                        </div>       
                        <div id="alert-title">
                             انشاء فريق
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
                                <button id="ConfCreateTeam" class="full-btn full-btn-2x  enter"  >تاكيد وانشاء</button>    

                            </div>    
                        </div>
                    </div>    
                </div>`;

    $("body").append(box);
    $("#select_from").remove();
});

$(document).on("click", "#ConfCreateTeam", function () {

    if ($("#guild-name").val() === "") {
        alert_box.confirmMessage(" لا يمكن ان يكون اسم الفريق خالى");
        return;
    } else if (Elkaisar.Team.PlayerTeam.Team != false) {
        alert_box.confirmMessage("أنت بالفعل قائد فريق");
        return;
    } else if ($("#guild-name").val().length < 5) {

        alert_box.confirmMessage("اسم الفريق اقل من 5 حروف");
        return;

    } else if ($("#guild-name").val().length > 20) {

        alert_box.confirmMessage("يجب ان لا يتعدى اسم الفريق عن 20 حرف");
        return;

    } else {
        var idCity = Elkaisar.CurrentCity.City.id_city;
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeam/create`,
            data: {
                guildName: $("#guild-name").val(),
                slogBottom: $(".guild_slogan img:first").attr("data-cur_image"),
                slogTop: $(".guild_slogan img:last").attr("data-cur_image"),
                slogMiddle: $(".guild_slogan img:nth-child(2)").attr("data-cur_image"),
                idCity: idCity,
                token: Elkaisar.Config.OuthToken
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    $(".close-alert_container").trigger("click");
                    Elkaisar.Team.getPlayerTeam();
                    alert_box.succesMessage(`تم انشاء فريق ${JsonObject.Team.name} بنجاح`);

                } else if (JsonObject.state == "error_0")
                    return alert_box.confirmMessage("لا يوجد إسم للفريق");
                else if (JsonObject.state == "error_1")
                    return alert_box.confirmMessage("يوجد فريق يحمل نفس الأسم");
                else if (JsonObject.state == "error_2")
                    return alert_box.confirmMessage("أنت بالفعل على قوة فريق أخر");
                else if (JsonObject.state == "error_3")
                    return alert_box.confirmMessage("لا يوجد لديك موارد كافية لإنشاء فريق");
                else if (JsonObject.state == "error_4")
                    return alert_box.confirmMessage("حدث خطاء ما اثناء إنشاء الفريق");
                else
                    Elkaisar.LBase.Error(data);


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
});

$(document).on("click", "#TeamHeaderNavBar li", function () {

    const NavTo = $(this).attr("data-nav-to");

   

    if (!Elkaisar.Team.PlayerTeam.Team && NavTo != "TeamRankingPage") {
        alert_box.failMessage("لست منضم فى أى فريق !");
        $("#TeamHeaderNavBar li").removeClass("selected");
        $("#TeamHeaderNavBar .TeamRankPageCl").addClass("selected");
        return;
    }
    
    $("#DialBoxFooter").remove();


    if (NavTo == "TeamHomePage") {
        Elkaisar.Team.TeamHomePage();
    } else if (NavTo == "TeamFriendPage") {
        Elkaisar.Team.TeamFriendPage();
    } else if (NavTo == "TeamEnemyPage") {
        Elkaisar.Team.TeamEnemyPage();
    } else if (NavTo == "TeamRankingPage") {
        Elkaisar.Team.RankPage(0);
    } else if (NavTo == "TeamHistoryPage") {
        Elkaisar.Team.HistoryPage(0);
    } else if (NavTo == "TeamUpgradePage") {

    } else {
        Elkaisar.LBase.Error("sadsad " + NavTo);
    }

});

$(document).on("click", "#TeamAdmins", function () {

    $(this).next(".drop-list").slideToggle();

});

$(document).on("click", "#chang-t-word", function () {

    $("#over_lay").remove();

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
                                                    <img src="images/style/bottom-${Elkaisar.Team.PlayerTeam.Team.slog_btm}.png" style="position: absolute">
                                                    <img src="images/style/central-${Elkaisar.Team.PlayerTeam.Team.slog_cnt}.png" style="position: absolute">
                                                    <img src="images/style/top-${Elkaisar.Team.PlayerTeam.Team.slog_top}.png" style="position: absolute">
                                                </div>
                                                <div class="right">
                                                    <div class="t-r">
                                                        <label>${Elkaisar.Team.PlayerTeam.TeamMember[0].PlayerName}</label>
                                                        <label>: القائد</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.rank)}</label>
                                                        <label>: تصنيف</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.mem_num)}</label>
                                                        <label>: الاعضاء</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.lvl)}</label>
                                                        <label>: مستوى</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.prestige)}</label>
                                                        <label>: برستيج</label>
                                                    </div>
                                                    <div class="t-r">
                                                        <label>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.honor)}</label>
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
                                                                background-position: center;"> ${Elkaisar.Team.PlayerTeam.Team.name}</h1>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="down">
                                        <div class="th ellipsis">${Translate.Title.TH.Intro[UserLag.language]}</div>
                                        <p>
                                            <textarea value="${Elkaisar.Team.PlayerTeam.Team.word}" class="input">${Elkaisar.Team.PlayerTeam.Team.word}</textarea>
                                            <button class="full-btn full-btn-3x " id="save-t-intro" > تعديل</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;


    $("body").append(current_guild);


});

$(document).on("click", "#save-t-intro", function () {

    var self_ = $(this);
    var new_intro = $(this).prev("textarea").val();

    if (new_intro.length === 0) {
        alert_box.failMessage("مقدمة غير مسموح بها ");
        return;

    }
    if (Elkaisar.Team.PlayerTeam.Player.rank < Elkaisar.Team.RANK_DATA.LEADER) {
        alert_box.failMessage("غير مسموح بتغير المقدمة  الا بواسطة القائد");
        return;
    }
    if (new_intro == Elkaisar.Team.PlayerTeam.Team.word) {
        alert_box.confirmMessage("لم يتم تغير المقدمة");
        return;
    }

    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/modifyTeamWord`,

        data: {
            newWord: new_intro,
            token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok") {

                $("#chang-t-word").click();
                self_.parents("p").html(new_intro);
                alert_box.succesMessage("تم تعديل المقدمة بنجاح");
                Elkaisar.Team.PlayerTeam.Team = JsonObject.Team;
                $("#TeamHeaderNavBar .selected").click();

            } else if (JsonObject.state == "error_0") {
                alert_box.failMessage("لست عضواً بهذا الفريق");
            } else if (JsonObject.state == "error_1") {
                alert_box.failMessage("لا يمكن تعديل المقدمة إلا بواسطة قائد الفريق");
            } else if (JsonObject.state == "error_2") {
                alert_box.failMessage("لا يمكن أن تكون المقدمة أكثر من 512 حرف");
            }
        }
    });

});

$(document).on("click", "#change-t-F_E-list", function () {


    const box = `   <div id="over_lay_alert">   
                            <div id="guild-alert-box">    
                                <div id="alert_head">          
                                    <div>               
                                        <img src="images/panner/king_name.png">       
                                    </div>       
                                    <div id="alert-title">الاصدقاء و الاعداء        
                                    </div>           
                                    <img src="images/btns/close_b.png" class="img-sml close-alert">  
                                </div>  
                                   ${Elkaisar.Team.changeTeamRelationBox()}
                            </div>
                        </div>`;
    $("body").append(box);

});

$(document).on("keyup", "#TeamEneFriInput", function () {

    var search_val = $(this).val();

    if (search_val === "") {

        $("#g-search_result ul").html("");
        $("#g-search_result").hide();
        return;
    }


    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/searchTeamByName`,
        data: {
            token: Elkaisar.Config.OuthToken,
            SearchVal: search_val
        },
        type: 'GET',

        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!isJson(data))
                return Elkaisar.LBase.Error(data);

            var json_data = JSON.parse(data);
            console.log(data);

            var list = "";

            for (var iii = 0; iii < json_data.length; iii++) {

                list += `   <li class="SearchTeamUnitRes" data-id-team="${json_data[iii].id_team}" data-t-name = "${json_data[iii].name}"> 
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

$(document).on("click", "#g-search_result .SearchTeamUnitRes", function () {

    var id_guild = parseInt($(this).attr("data-id-team"));
    var guild_name = $(this).attr("data-t-name");

    $(".F_E-list .row-1 input").val(guild_name);
    $(".F_E-list .row-1 input").attr("data-id-team", id_guild);
    $(".F_E-list .row-1 input").attr("data-t-name", guild_name);


    $("#g-search_result").hide();
    $("#g-search_result ul").html("");

});

$(document).on('click', '#submit-team-relation', function () {
    var TeamREl = $('.F_E-list input[name=guild_relation]:checked').val();
    var idTeam = parseInt($('.F_E-list .row-1 input')['attr']('data-id-team'));
    if (!idTeam)
        return alert_box.confirmMessage('عليك اختيار الفريق اولا');
    else if (!TeamREl['length'])
        return alert_box.confirmMessage('اختار العلاقة بين الفريقين');

    $.ajax({
        'url': `${Elkaisar.Config.NodeUrl}/api/ATeam/changeTeamRelation`,
        'data': {
            'idTeam': idTeam,
            'relation': TeamREl,
            'token': Elkaisar.Config.OuthToken
        },
        'type': 'GET',
        'success': function (data, _0x5b5eee, _0x5af2f1) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            var JsonData = JSON.parse(data);
            if (JsonData.state == 'ok') {
                $('.close-alert').click();
                alert_box.succesMessage('تم اضافة العلاقة بين الفريقين بنجاح');
                $("#TeamHeaderNavBar .selected").click();
            } else if (JsonData['state'] == 'error_0')
                alert_box['failMessage']('لست عضو فى الفريق');
            else if (JsonData['state'] == 'error_1')
                alert_box['failMessage']('رتيتك فى الفريق لا تسمح');
            else if (JsonData['state'] == 'error_2')
                alert_box['failMessage']('نوع العلاقة غير صالحة')
            else
                Elkaisar.LBase.Error(data);

        },
        'error': function (_0xf6addd, _0x324ef9, _0x45d39a) { }
    });
});

$(document).on("click", "#invite-t", function () {

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
                            <div id="alert_box" class="F_E-list">
                                <div class="row-1"> 
                                    <input type="text"  id="SearchByNameForTeam" class="input">
                                    <label class="th ellipsis">${Translate.Title.TH.LordName[UserLag.language]}</label>
                                    <div id="search_result"  class="search_res">
                                        <ul id="SearchTeamRes"> 
                                            
                                        </ul>
                                    </div>

                                </div>
                                
                                <div class="row-3">
                                    <div class="confim-btn">
                                        <button class="full-btn full-btn-3x" id="submit-team-invite">
                                            ارسال دعوة
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>`;
    $("body").append(box);

});

$(document).on("keyup", "#SearchByNameForTeam", function () {

    var segmant = $(this).val();

    if ($.trim(segmant) !== "") {

        searchByName(segmant, true);

    } else {
        $("#search_result ul").empty();
        $("#search_result ").hide();
    }


});

$(document).on("click", "#submit-team-invite", function () {

    var idPlayer = parseInt($("#SearchByNameForTeam").attr("data-id-player"));

    if (!idPlayer)
        return alert_box.confirmMessage("يجب عليك اختيار ملك");


    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/SendPlayerInv`,
        data: {
            token: Elkaisar.Config.OuthToken,
            idPlayer: idPlayer

        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {



            $(".close-alert").click();
            if ($("#guild-g_relation").length > 0) {
                showInVitedMembers();
            }
            alert_box.succesMessage('تم ارسال الدعوة بنجح');
            Elkaisar.Team.getPlayerTeam().done(function () {
                $("#TeamHeaderNavBar .selected").click();
            });



        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

});

$(document).on("click", "#change-t-slog", function () {


    if (!Elkaisar.Team.PlayerTeam.Team)
        return alert_box.confirmMessage("لا يمكن عرض هذا العنصر");
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
                                            <img src="images/style/bottom-${Elkaisar.Team.PlayerTeam.Team.slog_btm}.png" data-place="bottom" data-cur_image="1">
                                            <img src="images/style/central-${Elkaisar.Team.PlayerTeam.Team.slog_cnt}.png" data-place="middle" data-cur_image="1">
                                            <img src="images/style/top-${Elkaisar.Team.PlayerTeam.Team.slog_top}.png" data-place="top" data-cur_image="1">

                                        </div>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="top"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.slog_top)}/21</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="top"></div>
                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="middle"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.slog_cnt)}/4</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="middle"></div>

                                        </div>
                                        <div class="nav_icon">
                                            <div class="pull-L loop-guild-slogan left-btn" data-direction="left" data-place="bottom"></div>
                                            <h1>${getArabicNumbers(Elkaisar.Team.PlayerTeam.Team.slog_top)}/5</h1>
                                            <div class="pull-R loop-guild-slogan right-btn" data-direction="right" data-place="bottom"></div>

                                        </div>
                                    </div>
                                </div>  
                                <div class="row-two bg-btn-blu" style="background-size: 105% 123%;
                                                    background-position: center;
                                                    background-repeat: no-repeat;
                                                    background-position-y: 0px;">
                                    <h1 style="color: white; font-size: 16px; line-height: 36px; text-align: center" >${Elkaisar.Team.PlayerTeam.Team.name}</h1>
                                </div>
                                <div class="row-three">        
                                    <div class="confim-btn">            
                                        <button  class="full-btn full-btn-3x  enter" id="updateTeamSlog"> تعديل الشعار</button>    

                                    </div>    
                                </div>
                            </div>    
                        </div>`;
    $("body").append(new_slogan_co);

});

$(document).on("click", "#updateTeamSlog", function () {
    BoxOfMatrialToUse(['family_slogan'], 'change_g_slog');
});

$(document).on("click", "#SendTeamJoinReq", function () {

    var idTeam = parseInt($(this).attr("data-id-team"));

    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/sendTeamJoinRequest`,
        data: {
            idTeam: idTeam,
            token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok") {
                alert_box.succesMessage("تم ارسال الدعوة الى المسؤلين للانضمام للفريق");
                $(".close_use_menu").click();
                Elkaisar.Team.getPlayerTeam();
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

});

$(document).on("click", ".rejectTeamInv", function () {

    const idTeam = $(this).attr("data-id-team");
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/rejectTeamInv`,
        data: {
            idTeam: idTeam,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {},
        success: function (data, textStatus, jqXHR) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            console.log(JsonObject)

            if (JsonObject.state == "ok") {
                alert_box.succesMessage("تم الغاء  دعوة الانضمام بنجاح");
                Elkaisar.Team.PlayerTeam.TeamInv = JsonObject.TeamInv;
                $("#select_from").replaceWith(Elkaisar.Team.noTeamJoin());

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
});

$(document).on("click", ".acceptTeamInv", function () {
    const idTeam = $(this).attr("data-id-team");
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/acceptTeamInv`,
        data: {
            idTeam: idTeam,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {},
        success: function (data, textStatus, jqXHR) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var JsonObject = JSON.parse(data);

            console.log(JsonObject)

            if (JsonObject.state == "ok") {
                alert_box.succesMessage("تم قبول دعوة الانضمام بنجاح");
                $("#closeGuildSelFrom").click();
                Elkaisar.Team.getPlayerTeam();
            } else if (JsonObject.state == "error_0") {
                alert_box.failMessage("لا يوجد دعوة لك لدخول الفريق");
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
});

$(document).on('click', "#resignation-t", function (){
     if (Elkaisar.Team.PlayerTeam.Player.rank > Elkaisar.Team.RANK_DATA.LEADER) 
        return alert_box.confirmMessage("لا يمكن للقائد الإستقالة");

    

    alert_box.confirmDialog("تاكيد الإستقالة من المنصب", function () {

        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeam/playerTeamResign`,
            data: {
                token: Elkaisar.Config.OuthToken,
                idTeam: Elkaisar.Team.PlayerTeam.Team.id_team
            },
            type: 'POST',
            beforeSend: function (xhr) { },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    $(".close_dialog").click();
                    Elkaisar.Team.getPlayerTeam();
                    alert_box.succesMessage("تم الإستقالة من الفريق بنجاح!");
                    
                } else if(JsonObject.state == "error_0"){
                    alert_box.failMessage("لست عضوا فى هذا الفريق!");
                } else if(JsonObject.state == "error_1"){
                    alert_box.failMessage("لا يمكنك الإستقالة من المنصب و أنت مدير !")
                }

            },
            error: function (jqXHR, textStatus, errorThrown) { }

        });

    });
});

$(document).on("click", "#PlayerTeamLeave", function () {

    if (Elkaisar.Team.PlayerTeam.Player.rank > Elkaisar.Team.RANK_DATA.NORMAL_MEM) 
        return alert_box.confirmMessage("لا يمكنك الخروج من الفريق عليك التخلى عن منصبك اولا ");

    

    alert_box.confirmDialog("تاكيد الخروج من الفريق", function () {

        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeam/playerTeamLeave`,
            data: {
                token: Elkaisar.Config.OuthToken,
                idTeam: Elkaisar.Team.PlayerTeam.Team.id_team
            },
            type: 'POST',
            beforeSend: function (xhr) { },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    $(".close_dialog").click();
                    Elkaisar.Team.getPlayerTeam();
                    alert_box.succesMessage("تم الخروج من الفريق بنجاح!");
                    
                } else if(JsonObject.state == "error_0"){
                    alert_box.failMessage("لست عضوا فى هذا الفريق!");
                } else if(JsonObject.state == "error_1"){
                    alert_box.failMessage("لا يمكنك الخروج من الفريق إلا و انت عضو عادى !")
                } else if(JsonObject.state == "error_2"){
                    alert_box.failMessage("لا يمكنك ترك الفريق فارغ من الأعضاء!");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) { }

        });

    });

});

$(document).on("click", "#destroy-t", function () {

    if (Elkaisar.Team.PlayerTeam.Player.rank != Elkaisar.Team.RANK_DATA.LEADER) 
        return alert_box.confirmMessage("يجب انت تكون مدير الفريق   لتتمكن من تفكيك الفريق");
    

    alert_box.confirmDialog("تاكيد تفكيك الفريق! , اذا تم تاكيد تفكيك الفريق سيتم طرد جميع الاعضاء ولن تتمكن من  ارجاع الفريق ثانية", function () {

        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/ATeam/disbandTeam`,
            data: {
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {},
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    Elkaisar.Team.getPlayerTeam();
                    alert_box.succesMessage("تم تفكيك الفريق بنجاح");
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


$(document).on("click", "#ShowAvailableTeams", function (){
   $("#select_from").remove();
    dialogBoxShow(Elkaisar.Team.DialogBox(), function () {
        $("#TeamHeaderNavBar li").removeClass("selected");
        $("#TeamHeaderNavBar .TeamRankPageCl").addClass("selected");
        Elkaisar.Team.RankPage(0);
    });
});

$(document).on("click", "#CancelTeamJoinReq", function (){
   
     alert_box.confirmDialog("تأكيد إلغاء طلب الإنضمام", function () {
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/cancelTeamJoinReq`,
            data: {
                token: Elkaisar.Config.OuthToken
            },
            type: 'POST',
            beforeSend: function (xhr) { },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    alert_box.succesMessage("تم الغاء طلب الانضمام بنجاح");
                    Elkaisar.Team.getPlayerTeam().done(function (){
                        $("#select_from").replaceWith(Elkaisar.Team.noTeamJoin());
                    });
                    
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });
    
});

/* <button class="full-btn-3x btn acceptTeamJoinReq" data-id-player="${PlayerTeam.TeamReq[iii].id_req}">قبول</button>
                                <button class="full-btn-3x btn rejectTeamJoinReq" */

$(document).on("click", ".acceptTeamJoinReq", function (){
   
    const idPlayer = $(this).attr("data-id-player");
    
    alert_box.confirmDialog("تأكيد قبول طلب الإنضمام", function () {
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/acceptTeamJoinReq`,
            data: {
                token: Elkaisar.Config.OuthToken,
                idPlayer: idPlayer
            },
            type: 'POST',
            beforeSend: function (xhr) { },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    alert_box.succesMessage("تم قبول طلب الانضمام بنجاح");
                    $("#TeamHeaderNavBar .selected").click();
                    Elkaisar.Team.getPlayerTeam().done(function (){
                        $("#TeamHeaderNavBar .selected").click();
                    });
                    
                } else if(JsonObject.state == "error_0"){
                    alert_box.failMessage("لست منضم فى فريق");
                } else if(JsonObject.state == "error_1"){
                    alert_box.failMessage("لا يوجد طلب لهذا اللاعب");
                } else if(JsonObject.state == "error_2"){
                    alert_box.failMessage("رتبتك فى الفريق لا تسمح");
                } else if(JsonObject.state == "error_3"){
                    alert_box.failMessage("اللاعب فى فريق أخر");
                } else if(JsonObject.state == "error_4"){
                    alert_box.failMessage("طلب الإنضمام ليس لنفس الفريق");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });
    
});

$(document).on("click", ".cancelTeamInv", function (){
   
    const idPlayer = $(this).attr("data-id-player");
    
    alert_box.confirmDialog("تأكيد رفض طلب الإنضمام", function () {
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ATeamInvReq/cancelTeamInv`,
            data: {
                token: Elkaisar.Config.OuthToken,
                idPlayer: idPlayer
            },
            type: 'POST',
            beforeSend: function (xhr) { },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    alert_box.succesMessage("تم إلغاء دعوة الانضمام بنجاح");
                    $("#TeamHeaderNavBar .selected").click();
                    Elkaisar.Team.getPlayerTeam().done(function (){
                        $("#TeamHeaderNavBar .selected").click();
                    });
                    
                } else if(JsonObject.state == "error_0"){
                   alert_box.failMessage("لا يوجد طلب لهذا اللاعب");
                } else if(JsonObject.state == "error_1"){
                     alert_box.failMessage("لست منضم فى فريق");
                } else if(JsonObject.state == "error_2"){
                    alert_box.failMessage("رتبتك فى الفريق لا تسمح");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });
    
});



$(document).on("click", ".TeamMemberSettingIcon", function (){
    $(this).next().slideToggle(); 
});

$(document).on("click", ".FireGuildMemeber", function (){
   
    var idPlayer = $(this).attr("data-id-player");
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/fireTeamMember`,
        data:{
            idMember: idPlayer,
            token: Elkaisar.Config.OuthToken
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            $("#TeamHeaderNavBar .selected").click();
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state == "ok"){
                alert_box.succesMessage("تم طرد اللاعب بنجاح");
            }else if(JsonObject.state == "error_0"){
                alert_box.failMessage("اللاعب ليس من ضمن أعضاء الفريق");
            }else if(JsonObject.state == "error_1"){
                alert_box.failMessage("لست مدير الفريق");
            }else if(JsonObject.state == "error_2"){
                alert_box.failMessage("لست قائد الفريق");
            }else if(JsonObject.state == "error_3"){
                alert_box.failMessage("لا يمكنك طرد قائد الفريق");
            }
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
});