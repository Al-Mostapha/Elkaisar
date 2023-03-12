Elkaisar.Rank = {};


Elkaisar.Rank.RankFor = {

    Player: "Players",
    Guild: "unuions",
    Hero: "heros",
    City: "cities",

};



Elkaisar.Rank.RankLastCount = {

    [Elkaisar.Rank.RankFor.Player]: "player_num",
    [Elkaisar.Rank.RankFor.Guild]: "guild_num",
    [Elkaisar.Rank.RankFor.Hero]: "hero_num",
    [Elkaisar.Rank.RankFor.City]: "city_num",

};

Elkaisar.Rank.EmptyBox = function () {
    return ` <div class="box_content">
                <div id="TeamBox">
                    <div id="RankList" class="RankPage">
                        <div class="List">
                            <div class="Body">
                                <div class="RankRows"> </div>
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
};
Elkaisar.Rank.PlayerGeneralRank = function (offset) {
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingPlayer/generalRank`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer,
            offset: offset
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            console.log(data)
            if (isJson(data)) {
                Elkaisar.Rank.playerRow(offset, JSON.parse(data));
            } else {
                Elkaisar.LBase.Error(data);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
Elkaisar.Rank.playerRow = function (offset, PlayerList) {
    var _return = "";

    _return += `<div class="Header HeaderEnemyFrie flex">
                    <div class="tc-rank">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                    <div class="tc-leader">${Translate.Title.TH.Lord[UserLag.language]}</div>
                    <div class="tc-team">${Translate.Title.TH.League[UserLag.language]}</div>
                    <div class="tc-pres">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                    <div class="tc-honor">${Translate.Title.TH.Honor[UserLag.language]}</div>
                    <div class="tc-memNum">${Translate.Title.TH.NobleRank[UserLag.language]}</div>
                    <div class="tc-show">${Translate.Button.General.Action[UserLag.language]}</div>
                </div>`;



    var title_count = 0;
    var p_name = "";
    var name = "";

    for (var iii = 0; iii < 10; iii++) {

        if (!PlayerList[iii]) {

            _return += `<div class="tr" data-rank="${offset + iii + 1}"></div>`
            continue;
        }

        name = "";
        p_name = "";
        title_count = 0;

        // if (PlayerList[iii].title_1) {
        //     p_name += `<div class="rank-title rank-title_1" style="width: 15px;">${PlayerList[iii].title_1}</div>`;
        //     title_count++;
        // }
        // if (PlayerList[iii].title_2) {
        //     p_name += `<div class="rank-title rank-title_2" style="width: 15px; margin-right: -65px;">${PlayerList[iii].title_2}</div>`;
        //     title_count++;
        // }
        // if (PlayerList[iii].title_3) {
        //     p_name += `<div class="rank-title rank-title_3" style="width: 15px; margin-right: -65px;">${PlayerList[iii].title_3}</div>`;
        //     title_count++;
        // }
        // if (PlayerList[iii].title_4) {
        //     p_name += `<div class="rank-title rank-title_4" style="width: 15px; margin-right: -65px;">${PlayerList[iii].title_4}</div>`;
        //     title_count++;
        // }
        // if (PlayerList[iii].title_5) {
        //     p_name += `<div class="rank-title rank-title_5" style="width: 15px; margin-right: -65px;">${PlayerList[iii].title_5}</div>`;
        //     title_count++;
        // }
        // if (PlayerList[iii].title_6) {
        //     p_name += `<div class="rank-title rank-title_6" style="width: 15px; margin-right: -65px;">${PlayerList[iii].title_6}</div>`;
        //     title_count++;
        // }


        name = `<div class="name">${PlayerList[iii].name}</div>`;


        _return += `<div class="tr" data-rank="${offset + iii + 1}">
                            <div class="tc-rank" data-rank="${offset + Number(iii) + 1}">${offset + Number(iii) + 1}</div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[PlayerList[iii].avatar]});">
                                    <div class="border"></div>
                                </div>
                                ${name + p_name}
                            </div>
                            <div class="tc-team flex">
                            ${PlayerList[iii].id_guild ? `
                                <div class="team-slog">
                                    <div class="slog" style="background-image: url(images/style/bottom-${PlayerList[iii].slog_btm}.png);">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/central-${PlayerList[iii].slog_cnt}.png); margin-top: -37px;">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/top-${PlayerList[iii].slog_top}.png); margin-top: -37px;">
                                    </div>
                                </div>` : ""}
                                
                                <div class="team-name">${PlayerList[iii].guild || "-----"}</div>
                            </div>
                            
                            <div class="tc-pres flex">${getArabicNumbers(PlayerList[iii].prestige)}</div>
                            <div class="tc-honor flex">${getArabicNumbers(PlayerList[iii].honor)}</div>
                            <div class="tc-memNum flex">${Elkaisar.BaseData.Promotion[PlayerList[iii].porm].Title}</div>
                            <div class="tc-show">
                                <button class="full-btn-3x btn show-player-profile"  data-id-player="${PlayerList[iii].id_player}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                            </div>
                        </div>`;

    }

    $("#RankList .RankRows").html(_return);
    $("#current_page_num").html(getArabicNumbers(Math.ceil(offset / 10) + 1));
    $("#TotalPageNumber").html(Math.ceil(Elkaisar.Config.ServerCount.player_num / 10));
};
Elkaisar.Rank.GuildGeneralRank = function (offset) {

    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingGuild/generalRank`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer,
            offset: offset
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
                Elkaisar.LBase.Error(data);
            }
            Elkaisar.Rank.GuildRow(offset, JSON.parse(data))



        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
Elkaisar.Rank.GuildRow = function (offset, GuildList) {
    var _return = "";

    _return += `<div class="Header HeaderEnemyFrie flex">
                    <div class="tc-rank">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                    <div class="tc-team">${Translate.Title.TH.League[UserLag.language]}</div>
                    <div class="tc-leader">${Translate.Title.TH.Host[UserLag.language]}</div>
                    <div class="tc-pres">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                    <div class="tc-honor">${Translate.Title.TH.Honor[UserLag.language]}</div>
                    <div class="tc-memNum">${Translate.Title.TH.Members[UserLag.language]}</div>
                    <div class="tc-show">${Translate.Button.General.Action[UserLag.language]}</div>
                </div>`;


    for (var iii = 0; iii < 10; iii++) {

        if (!GuildList[iii]) {
            _return += `<div class="tr" data-rank="${offset + iii + 1}"></div>`
            continue;
        }
        _return += `<div class="tr" data-rank="${offset + iii + 1}">
                            <div class="tc-rank" data-rank="${offset + Number(iii) + 1}">${offset + Number(iii) + 1}</div>
                            <div class="tc-team flex">
                            ${GuildList[iii].id_guild ? `
                                <div class="team-slog">
                                    <div class="slog" style="background-image: url(images/style/bottom-${GuildList[iii].slog_btm}.png);">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/central-${GuildList[iii].slog_cnt}.png); margin-top: -37px;">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/top-${GuildList[iii].slog_top}.png); margin-top: -37px;">
                                    </div>
                                </div>` : ""}
                                
                                <div class="team-name">${GuildList[iii].GuildName || "-----"}</div>
                            </div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[GuildList[iii].avatar]});">
                                    <div class="border"></div>
                                </div>
                                <div class="name">${GuildList[iii].lord_name}</div>
                            </div>
                            <div class="tc-pres flex">${getArabicNumbers(GuildList[iii].prestige)}</div>
                            <div class="tc-honor flex">${getArabicNumbers(GuildList[iii].honor)}</div>
                            <div class="tc-memNum flex">${GuildList[iii].mem_num}</div>
                            <div class="tc-show">
                                <button class="full-btn-3x btn show-guild-prev"  data-id-guild="${GuildList[iii].id_guild}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                            </div>
                        </div>`;

    }

    $("#RankList .RankRows").html(_return);
    $("#current_page_num").html(getArabicNumbers(Math.ceil(offset / 10) + 1));
    $("#TotalPageNumber").html(Math.ceil(Elkaisar.Config.ServerCount.guild_num / 10));

}
Elkaisar.Rank.HeroGeneralRank = function (offset) {
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingHero/generalRank`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer,
            offset: offset
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            Elkaisar.Rank.HeroRow(offset, JSON.parse(data));

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
Elkaisar.Rank.HeroRow = function (offset, HeroList) {

    var List = "";


    List += `<div class="Header HeaderEnemyFrie flex">
                <div class="tc-rank">${Translate.Title.MenuList.Ranking[UserLag.language]}</div>
                <div class="tc-leader">${Translate.Title.TH.Hero[UserLag.language]}</div>
                <div class="tc-leader">${Translate.Title.TH.Lord[UserLag.language]}</div>
                <div class="tc-hero-lvl">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                <div class="tc-hero-point_a">${Translate.Title.TH.Sway[UserLag.language]}</div>
                <div class="tc-hero-point_b">${Translate.Title.TH.Bravery[UserLag.language]}</div>
                <div class="tc-hero-point_c">${Translate.Title.TH.Parry[UserLag.language]}</div>
                <div class="tc-show">${Translate.Button.General.Action[UserLag.language]}</div>
            </div>`;


    for (var iii = 0; iii < 10; iii++) {

        if (!HeroList[iii]) {
            List += `<div class="tr" data-rank="${offset + iii + 1}"></div>`;
            continue;
        }
        List += `<div class="tr" data-rank="${offset + iii + 1}">
                            <div class="tc-rank" data-rank="${offset + Number(iii) + 1}">${offset + Number(iii) + 1}</div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[HeroList[iii].heroAvatar]});">
                                    <div class="border"></div>
                                </div>
                                <div class="name">${HeroList[iii].name}</div>
                            </div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[HeroList[iii].avatar]});">
                                    <div class="border"></div>
                                </div>
                                <div class="name">${HeroList[iii].lord_name}</div>
                            </div>
                            <div class="tc-hero-lvl stroke flex">${HeroList[iii].lvl}</div>
                            <div class="tc-hero-point_a flex">${HeroList[iii].point_a}</div>
                            <div class="tc-hero-point_b flex">${HeroList[iii].point_b}</div>
                            <div class="tc-hero-point_c flex">${HeroList[iii].point_c}</div>
                            <div class="tc-show">
                                <button class="full-btn-3x btn show-guild-prev"  data-id-guild="${HeroList[iii].id_guild}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                            </div>
                        </div>`;

    }

    $("#RankList .RankRows").html(List);
    $("#current_page_num").html(getArabicNumbers(Math.ceil(offset / 10) + 1));
    $("#TotalPageNumber").html(Math.ceil(Elkaisar.Config.ServerCount.hero_num / 10));

}
Elkaisar.Rank.CityGeneralRank = function (offset) {

    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingCity/generalRank`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer,
            offset: offset
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            Elkaisar.Rank.CityRow(offset, JSON.parse(data));

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


}
Elkaisar.Rank.CityRow = function (offset, CityList) {

    var List = "";
    List += `<div class="th">
                <div class="tc-rank">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                <div class="tc-memNum">${Translate.Title.TH.Name[UserLag.language]}</div>
                <div class="tc-pres">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                <div class="tc-leader">${Translate.Title.TH.Lord[UserLag.language]}</div>
                <div class="tc-team">${Translate.Title.MenuList.League[UserLag.language]}</div>
                <div class="tc-honor">${Translate.Title.TH.Population[UserLag.language]}</div>
                <div class="tc-show">${Translate.Button.General.Action[UserLag.language]}</div>
            </div>`;



    for (var iii = 0; iii < 10; iii++) {

        if (!CityList[iii]) {
            List += `<div class="tr" data-rank="${offset + iii + 1}"></div>`;
            continue;
        }


        List += `<div class="tr" data-rank="${offset + iii + 1}">
                            <div class="tc-rank" data-rank="${offset + Number(iii) + 1}">${offset + Number(iii) + 1}</div>
                            <div class="tc-memNum flex">${CityList[iii].name}</div>
                            <div class="tc-pres flex">${getArabicNumbers(CityList[iii].lvl)}</div>
                            <div class="tc-leader flex">
                                <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[CityList[iii].avatar]});">
                                    <div class="border"></div>
                                </div>
                                <div class="name">${CityList[iii].lord_name}</div>
                            </div>
                            <div class="tc-team flex">
                            ${CityList[iii].id_guild ? `
                                <div class="team-slog">
                                    <div class="slog" style="background-image: url(images/style/bottom-${CityList[iii].slog_btm}.png);">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/central-${CityList[iii].slog_cnt}.png); margin-top: -37px;">
                                    </div>
                                    <div class="slog"
                                        style="background-image: url(images/style/top-${CityList[iii].slog_top}.png); margin-top: -37px;">
                                    </div>
                                </div>` : ""}
                                
                                <div class="team-name">${CityList[iii].GuildName || "-----"}</div>
                            </div>
                            <div class="tc-honor flex">${getArabicNumbers(CityList[iii].pop)}</div>
                            <div class="tc-show">
                                <button class="full-btn-3x btn" >${Translate.Button.MenuList.View[UserLag.language]}</button>
                            </div>
                        </div>`;

    }

    $("#RankList .RankRows").html(List);
    $("#current_page_num").html(getArabicNumbers(Math.ceil(offset / 10) + 1));
    $("#TotalPageNumber").html(Math.ceil(Elkaisar.Config.ServerCount.city_num / 10));


}


$(document).on("click", ".move_p_rank", function () {

    var move = $(this).attr("data-move");
    var rank_for = $("#DialBoxFooter").attr("data-rank-for");

    var offset = (Math.ceil($("#RankList .tr:last-child").attr("data-rank") / 10)) * 10;

    if (move === "right" && Elkaisar.Config.ServerCount[Elkaisar.Rank.RankLastCount[rank_for]] > offset) {


        menu_bar.getContentForRanks(rank_for, offset);




    } else if (move === "left") {
        offset = Math.max(0, offset - 20);

        menu_bar.getContentForRanks(rank_for, offset);






    } else if (move === "most-left") {

        menu_bar.getContentForRanks(rank_for, 0);


    } else if (move === "most-right") {

        menu_bar.getContentForRanks(rank_for, Math.floor(Elkaisar.Config.ServerCount[Elkaisar.Rank.RankLastCount[rank_for]] / 10) * 10);

    }

});


$(document).on("click", "#goToBtnRankCo  .goBtn", function () {



    const page_number = $("#goToBtnRankCo .input").val() - 1;
    const rank_for = $("#DialBoxFooter").attr("data-rank-for");
    let Offset = page_number * 10;
    if (page_number * 10 > Elkaisar.Config.ServerCount[Elkaisar.Rank.RankLastCount[rank_for]])
        Offset = Math.floor(Elkaisar.Config.ServerCount[Elkaisar.Rank.RankLastCount[rank_for]] / 10) * 10;
    menu_bar.getContentForRanks(rank_for, Offset);
    
});