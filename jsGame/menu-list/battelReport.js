var BATTEL_REPORTS = {};

var Reports = {
    chang_content_leaving: function () {

        var all_lines = "";
        Reports.refresh_content_leaving();
        
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getLeavingHero`,
            data: {
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                Elkaisar.Battel.LeavinHeros = JSON.parse(data);
                Reports.refresh_content_leaving();


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },
    refresh_content_leaving: function () {
        var all_lines = "";
        var all = Elkaisar.Battel.LeavinHeros;
        for (var iii = 0; iii < 16; iii++) {



            if (all[iii]) {
                var arrive_date = new Date(all[iii].time_end * 1000);
                var Hero = Elkaisar.Hero.getHero(all[iii].id_hero);
                all_lines += `<div class="tr" id_battel = "${all[iii].id_battel}"  id_hero="${all[iii].id_hero}">
                                    <div class="td_1">${BATTAL_TASKS[all[iii].task].ar_title}</div>
                                    <div class="td_2">[${(all[iii].y_city)} , ${(all[iii].x_city)} ] &nbsp; &nbsp; ${Elkaisar.City.getCity(Hero.Hero.id_city).City.name}</div>
                                    <div class="td_3">[${(all[iii].y_coord)} , ${(all[iii].x_coord)} ]</div>
                                    <div class="td_4">${(arrive_date.getHours()) + ":" + (arrive_date.getMinutes()) + ':' + (arrive_date.getSeconds())}</div>
                                    <div class="td_5 time_counter" time-end="${all[iii].time_end}"> ${changeTimeFormat(all[iii].time_end - Date.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x battel_hero_back"> استرجاع</button>
                                    </div>
                                </div>
                                `;
            } else {
                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }

        var output = `<div class="box_content for_report ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_4 ellipsis">${Translate.Title.TH.ArrivalTime[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                   ${all_lines} 
                            </div>
                        </div>`;

        $(".for_report").replaceWith(output);
    },
    change_content_heroBack: function () {

        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getHeroBack`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            beforeSend: function (xhr) {
                Reports.refresh_content_heroBack();
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data)) 
                    return Elkaisar.LBase.Error(data);
                
                Elkaisar.Battel.HeroBack = JSON.parse(data);
                Reports.refresh_content_heroBack();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });


    },
    refresh_content_heroBack: function (){
        var all_lines = "";
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.HeroBack[iii]) {

                var arrive_date = new Date(Elkaisar.Battel.HeroBack[iii].time_back * 1000);

                all_lines += `<div class="tr" id_hero="${Elkaisar.Battel.HeroBack[iii].id_hero}">
                                    <div class="td_1">${Elkaisar.Battel.HeroBack[iii].Task < 5 ? "عودة من" : ""} ${BATTAL_TASKS[Elkaisar.Battel.HeroBack[iii].Task].ar_title}</div>
                                    <div class="td_2">[${(Elkaisar.Battel.HeroBack[iii].yFrom)} , ${(Elkaisar.Battel.HeroBack[iii].xFrom)} ] &nbsp; &nbsp; ${Elkaisar.City.getCityByCoord(Elkaisar.Battel.HeroBack[iii].xTo, Elkaisar.Battel.HeroBack[iii].yTo).City.name}</div>
                                    <div class="td_3">[${(Elkaisar.Battel.HeroBack[iii].yTo)} , ${(Elkaisar.Battel.HeroBack[iii].xTo)} ]</div>
                                    <div class="td_4">${(arrive_date.getHours()) + ":" + (arrive_date.getMinutes())}</div>
                                    <div class="td_5 time_counter" time-end="${Elkaisar.Battel.HeroBack[iii].time_back}"> ${changeTimeFormat(Elkaisar.Battel.HeroBack[iii].time_back - Date.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x show_hero_back show-hero-detailed-review" data-id-hero="${Elkaisar.Battel.HeroBack[iii].id_hero}"> ${Translate.Button.MenuList.View[UserLag.language]}</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }



        var output = `<div class="box_content for_report hero_back_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_4 ellipsis">${Translate.Title.TH.ArrivalTime[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                    ${all_lines} 
                            </div>  
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
        $("#dialg_box .nicescroll-rails").remove();
    },
    change_content_GarrisonUnits: function () {
        Reports.refresh_content_GarrisonUnits();
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getGarrisonHeros`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                
                Elkaisar.Battel.HeroGarrison = JSON.parse(data);
                Reports.refresh_content_GarrisonUnits();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });



    },
    refresh_content_GarrisonUnits: function (){
        
        var all_lines = "";
       
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.HeroGarrison[iii]) {
                 var Unit = WorldUnit.getWorldUnit(Elkaisar.Battel.HeroGarrison[iii].x_coord, Elkaisar.Battel.HeroGarrison[iii].y_coord);
                all_lines += `<div class="tr">
                                    <div class="td_1">[${Elkaisar.Battel.HeroGarrison[iii].x_coord} , ${Elkaisar.Battel.HeroGarrison[iii].y_coord}]</div>
                                    <div class="td_2">${Elkaisar.City.getCity(Elkaisar.Hero.getHero(Elkaisar.Battel.HeroGarrison[iii].id_hero)).City.name}</div>
                                    <div class="td_3">${Elkaisar.Hero.getHero(Elkaisar.Battel.HeroGarrison[iii].id_hero).Hero.name}</div>
                                    <div class="td_4">${WorldUnit.isCity(Unit.ut) ? "مدينة" : `${Elkaisar.World.UnitTypeData[Unit.ut].Title} مستوى ${Unit.l}`}</div>
                                    <div class="td_5"> ----</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x small show_hero show-hero-detailed-review" data-id-hero="${Elkaisar.Battel.HeroGarrison[iii].id_hero}"> ${Translate.Button.MenuList.View[UserLag.language]}</button>
                                        <button class="full-btn full-btn-3x small hero_back_from_garrison" data-id-hero="${Elkaisar.Battel.HeroGarrison[iii].id_hero}"> استرجاع</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }


        }



        var output = ` <div class="box_content for_report hero_garrison_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.Hero[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                  ${all_lines} 
                            </div>
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
        $("#dialg_box .nicescroll-rails").remove();
        
    },
    change_content_SpyTask: function () {
        
        Reports.refresh_content_SpyTask();
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getSpyRuning`,
            data: {
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                Elkaisar.Battel.SpyingList = JSON.parse(data);
                Reports.refresh_content_SpyTask();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });



    },
    refresh_content_SpyTask: function (){
        var all_lines = "";
        for (var iii = 0; iii < 16; iii++) {
            if (Elkaisar.Battel.SpyingList[iii]) {
                var Unit = WorldUnit.getWorldUnit(Elkaisar.Battel.SpyingList[iii].x_to, Elkaisar.Battel.SpyingList[iii].y_to)
                all_lines += `<div class="tr">
                                    <div class="td_1">[${Elkaisar.Battel.SpyingList[iii].x_to} , ${Elkaisar.Battel.SpyingList[iii].y_to}]</div>
                                    <div class="td_2">${Elkaisar.City.getCity(Elkaisar.Battel.SpyingList[iii].id_city).City.name}</div>
                                    <div class="td_3">${Elkaisar.Battel.SpyingList[iii].spy_num}</div>
                                    <div class="td_4">${WorldUnit.isCity(Unit.ut) ?  "مدينة" : `${getUnitTitle(Unit.ut)} مستوى ${Unit.l}`}</div>
                                    <div class="td_5 time_counter" time-end="${Elkaisar.Battel.SpyingList[iii].time_arrive}">${changeTimeFormat(Elkaisar.Battel.SpyingList[iii].time_arrive - $.now() / 1000)}</div>

                                    <div class="td_6">
                                        <button class="full-btn full-btn-3x cansel_spy" data-id-spy="${Elkaisar.Battel.SpyingList[iii].id_spy}">${Translate.Button.General.Cancel[UserLag.language]}</button>
                                    </div>
                                </div>
                                `;
            } else {

                all_lines += `<div class="tr">

                                </div>
                                `;
            }
        }
        
        var output = `<div class="box_content for_report spy_task_list">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Expedition[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.HomeCity[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.Scout[UserLag.language]}</div>
                                    <div class="td_3 ellipsis">${Translate.Title.TH.TargetArena[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.RemainingTime[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>
                                  ${all_lines}
                            </div>
                        </div>`;
        $("#dialg_box .for_report").replaceWith(output);
    }

};



/*  retreat from battel */
$(document).on("click", ".battel_hero_back, #getHeroFromBattel", function () {

    var id_hero = $(this).parents(".tr").attr("id_hero");
    var id_battel = $(this).parents(".tr").attr("id_battel");
    var self_ = $(this);
    alert_box.confirmDialog("تاكيد انسحاب البطل ", function () {


        var flag_check = false;

        var json_obj = {
            url: "Battel/abort",
            data: {
                idHero: id_hero
            }
        };
        ws.send(JSON.stringify(json_obj));
        flag_check = true;
    });

});



$(document).on("click", ".cansel_spy", function () {

    var id_spy = $(this).attr("data-id-spy");

    alert_box.confirmDialog("تاكيد الغاء عملية التجسس", function () {
        var idCity = Elkaisar.CurrentCity.City.idCity;
        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/ASpy/cancel`,
            data: {
                idSpy  : id_spy,
                idCity : idCity,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                Reports.change_content_SpyTask();
                alert_box.succesMessage("تم الغاء عملبة التجسس بنجاح");
                Elkaisar.DPlayer.Notifayer.Notif.spy_task -= 1;
                Fixed.refreshPlayerNotif();
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                city_profile.refresh_army_view();
                city_profile.refresh_resource_view();
                


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });

});


$(document).on("click", ".hero_back_from_garrison", function () {

    var id_hero = Number($(this).attr("data-id-hero"));
    var self_ = $(this);

    alert_box.confirmDialog("تأكيد سحب البطل ", function () {
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/removeHeroFromGarrison`,
            data: {
                idHero : id_hero,
                idCity : idCity,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                if (JsonObject.state === "ok") {

                    alert_box.succesMessage("تم  سحب البطل بنجاح");
                    
                    Elkaisar.Battel.HeroGarrison        =  JsonObject.Garrison;
                    Elkaisar.Hero.getHero(id_hero).Hero = JsonObject.Hero;
                    Reports.refresh_content_GarrisonUnits();
                    city_profile.refresh_hero_view();

                } else {
                    Elkaisar.LBase.Error(data);
                    console.log(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});