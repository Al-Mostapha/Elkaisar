var Dominant = {};



$(document).on("click", ".left-nav ul  li", function () {
    $(".left-nav ul  li").each(function (el) {
        $(this).removeClass("selected")
    });
    $(this).addClass("selected");
    $("#dialg_box .nicescroll-rails").remove();

    var head_title = $(this).attr("head_title");
    switch (head_title) {
        // فيها صفحة الرئيسى ف الموارد
        case "colonizer-city":
            Dominant.cityColonizer();
            break;
        case "my-colonized-city":
            Dominant.MyColonizedCity();
            break;
    }
});

Dominant.dialogBox = function () {

    return  menu_bar.dialogBox(Translate.Title.MenuList.Dominance[UserLag.language], NavBar.Dominance, `<div id="WORLD_UNIT_DOMINANT" class="box_content"></div>`, 0);
};

Dominant.armyCapital = function () {
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ADominant/getArmyCapitalDominant`,
        data: {
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            if(!Elkaisar.LBase.isJson(data))
              return Elkaisar.LBase.Error(data);
      
            var jsonData = JSON.parse(data);
            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:25%">${Translate.Title.TH.Capital[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:30%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:10%">${Translate.Title.TH.Duration[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width:15%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii in jsonData.unit) {

                if (jsonData.unit[iii].rank.length > 0) {
                    var duration = 0;
                    if (jsonData.type === "rank") {
                        duration = jsonData.unit[iii].rank[0].d_sum;
                    } else if (jsonData.type === "domain") {

                        duration = Math.floor(Date.now() / 1000 - jsonData.unit[iii].rank[0].time_stamp);

                    }


                    list += `<div class="tr">
                                 <div class="td_1" style="width:25%">${jsonData.unit[iii].title}</div>
                                 <div class="td_2" style="width:20%">[${jsonData.unit[iii].x} , ${jsonData.unit[iii].y}]</div>
                                 <div class="td_3" style="width:30%">${jsonData.unit[iii].rank[0].name}</div>
                                 <div class="td_4 rtl" style="width:10%">${`${Math.floor(duration / 60)} د ${duration % 60} ث`}</div>
                                 <div class="td_5" style="width:15%">
                                     <button class="full-btn-3x open-world-unit" data-x-coord="${jsonData.unit[iii].x}" data-y-coord="${jsonData.unit[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                 </div>
                             </div>`;
                } else {

                    list += `<div class="tr">
                                <div class="td_1" style="width:25%">${jsonData.unit[iii].title}</div>
                                <div class="td_2" style="width:20%">[${jsonData.unit[iii].x} , ${jsonData.unit[iii].y}]</div>
                                <div class="td_3" style="width:30%">----</div>
                                <div class="td_4" style="width:10%">----</div>
                                <div class="td_5" style="width:15%">
                                    <button class="full-btn-3x open-world-unit"  data-x-coord="${jsonData.unit[iii].x}" data-y-coord="${jsonData.unit[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                </div>
                            </div>`;

                }

            }
            var content = `<div class="left-content full">
                            ${list}
                            <div class="tr"></div><div class="tr"></div>
                            <div class="tr"></div><div class="tr"></div>
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};

Dominant.cityColonizer = function () {
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ADominant/getCityColonizer`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var jsonData = JSON.parse(data);

            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:15%">المدينة</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:15%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:25%">التاريخ</div>
                            <div class="td_5 ellipsis" style="width:25%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii = 0; iii < 10; iii++)
            {
                if (jsonData[iii]) {
                    list += `<div class="tr">
                                 <div class="td_1" style="width:15%">${jsonData[iii].CityName}</div>
                                 <div class="td_2" style="width:20%">[${jsonData[iii].x} , ${jsonData[iii].y}]</div>
                                 <div class="td_3" style="width:15%">${jsonData[iii].PlayerName}</div>
                                 <div class="td_4 rtl" style="width:25%">${dateTimeFormatShort(new Date(jsonData[iii].time_stamp))}</div>
                                 <div class="td_5" style="width:25%">
                                     <button class="full-btn-3x open-world-unit" style="width: 25%" data-x-coord="${jsonData[iii].x}" data-y-coord="${jsonData[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                     <button class="full-btn-3x abondonColonizedCity" style="width: 25%; height: 26px" data-id-city="${jsonData[iii].id_city_colonized}">تخلى</button>
                                 </div>
                             </div>`;
                } else {
                    list += `<div class="tr"></div>`;
                }
            }

            var content = `<div class="left-content full">
                            ${list}
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};

Dominant.MyColonizedCity = function () {
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ADominant/getCityColonized`,
        data: {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);

            var jsonData = JSON.parse(data);

            var list = `<div class="th">
                            <div class="td_1 ellipsis" style="width:25%">المدينة</div>
                            <div class="td_2 ellipsis" style="width:20%">${Translate.Title.TH.Coordinate[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width:30%">${Translate.Title.TH.Dominant[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width:10%">${Translate.Title.TH.Duration[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width:15%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;

            for (var iii = 0; iii < 10; iii++)
            {
                if (jsonData[iii]) {
                    list += `<div class="tr">
                                 <div class="td_1" style="width:25%">${jsonData[iii].CityName}</div>
                                 <div class="td_2" style="width:20%">[${jsonData[iii].x} , ${jsonData[iii].y}]</div>
                                 <div class="td_3" style="width:30%">${jsonData[iii].PlayerName}</div>
                                 <div class="td_4 rtl" style="width:10%">${dateTimeFormatShort(new Date(jsonData[iii].time_stamp))}</div>
                                 <div class="td_5" style="width:15%">
                                     <button class="full-btn-3x open-world-unit" style="width: 25%" data-x-coord="${jsonData[iii].x}" data-y-coord="${jsonData[iii].y}">${Translate.Button.MenuList.View[UserLag.language]}</button>
                                     <button class="full-btn-3x  fireColonizer" style="width: 25%; height: 26px" data-id-city="${jsonData[iii].id_city_colonized}">طرد المستعمر</button>
                                 </div>
                             </div>`;
                } else {
                    list += `<div class="tr"></div>`;
                }
            }

            var content = `<div class="left-content full">
                            ${list}
                        </div>`;

            $("#WORLD_UNIT_DOMINANT").html(content);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });
};




$(document).on("click", ".open-world-unit", function () {

    var x_coord = $(this).attr("data-x-coord");
    var y_coord = $(this).attr("data-y-coord");
    $("#dialg_box").slideUp("fast", function () {
        $("#dialg_box").remove();
        uniteMapClick(x_coord, y_coord);
    });

});


$(document).on("click", ".abondonColonizedCity", function () {

    var idCity = $(this).attr("data-id-city");
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ADominant/abondonColonizedCity`,
        data: {
            idCity: idCity,
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
            Dominant.cityColonizer();
            if (JsonObject.state === "ok") {
                alert_box.succesMessage("تم التخلى بنجاح");
                Elkaisar.City.getCityBase();
            } else {
                alert_box.confirmMessage("لست المسيطر على المدينة");
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});


$(document).on("click", ".fireColonizer", function () {

    var idCity = $(this).attr("data-id-city");

    alert_box.confirmDialog("تاكيد طرد المستعمر مقابل 1 مساعدة حرية", function () {
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ADominant/fireColonizer`,
            data: {
                idCity: idCity,
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
                Dominant.cityColonizer();
                if (JsonObject.state === "ok") {
                    alert_box.succesMessage("تم  الطرد بنجاح");
                    Elkaisar.City.getCityBase();
                } else if (JsonObject.state === "error_1") {
                    alert_box.confirmMessage("لا توجد مواد كافية ");
                } else {
                    alert_box.confirmMessage("لست المسيطر على المدينة");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    });
});