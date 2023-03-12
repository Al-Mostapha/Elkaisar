$(document).on("click", "#JOIN_ATTACK", function () {

    var x_coord = Number($(this).attr("data-x-coord"));
    var y_coord = Number($(this).attr("data-y-coord"));


    $("#dialg_box").remove();

    BattelField.battelField({x_coord: x_coord, y_coord: y_coord, navBar: BattelFieldNavBar, totalBox: true});

});



$(document).on("click", "#REQUEST_ORDER", function () {

    var xCoord = Number($(this).attr("data-x-coord"));
    var yCoord = Number($(this).attr("data-y-coord"));


    alert_box.confirmDialog("تأكيد طلب الهجوم", function () {

        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/ABattel/applyForRoleInAttQue`,
            data: {
                xCoord: xCoord,
                yCoord: yCoord,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    Elkaisar.CurrentWorldUnit.AttackQueList = JsonObject.QueueList;
                    campDB.refreshQueAttackList(xCoord, yCoord);
                    alert_box.succesMessage("تم تفعيل الطلب بنجاح");
                    
                } else if (JsonObject.state === "error_0") {
                    alert_box.confirmMessage("تم حجز دور بالفعل");
                } else if (JsonObject.state === "error_1") {
                    alert_box.confirmMessage("لا يوجد مكان خالى لك اقصى عدد 10");
                } else if (JsonObject.state === "error_3") {
                    alert_box.confirmMessage("رتبتك فى الحلف لا تكفى");
                } else if (JsonObject.state === "error_4") {
                    alert_box.confirmMessage("ليس لديك مواد كافية");
                }

            }

        });

    });

});

$(document).on("click", "#PLUNDE_PRIZE", function () {

    var xCoord = Number($(this).attr("data-x-coord"));
    var yCoord = Number($(this).attr("data-y-coord"));


    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/AWorldUnit/plundePrize`,
        data: {
            xCoord: xCoord,
            yCoord: yCoord,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            console.log(data)
            var JsonObject = JSON.parse(data);

            if (JsonObject.state === "ok") {
                alert_box.succesMessage(Matrial.prizeToString(JsonObject.PrizeList));
            } else if (JsonObject.state === "error_1_0") {
                alert_box.confirmMessage("لست عضو فى الحلف المسيطر");
            } else if (JsonObject.state === "error_1_1") {
                alert_box.confirmMessage("لست عضوا فى اى حلف");
            } else if (JsonObject.state === "error_1_2") {
                alert_box.confirmMessage("لست عضو فى الحلف المسيطر");
            } else if (JsonObject.state === "error_1_3") {
                alert_box.confirmMessage("لقد حصلت على غنيمة بالفعل");
            } else if (JsonObject.state === "error_1_4") {
                alert_box.confirmMessage("عليك انتظار 72 ساعة داخل الحلف");
            }

        },
        error: function (data, textStatus, jqXHR) {
            console.log(textStatus);
        }

    });

});




$(document).on("click", "#JOIN_ATTACK_SIDE , #JOIN_DEFENCE_SIDE", function () {

    if ($(this).attr("id") === "JOIN_DEFENCE_SIDE") {

        battel_data = {
            x_coord: parseInt($(this).attr("data-x_coord")),
            y_coord: parseInt($(this).attr("data-y_coord")),
            ar_title: $(this).attr("data-title"),
            task: BATTEL_JOIN_DEFENCE,
            time: 0,
            task_title: "انضمام للدفاع مع",
            type: null,
            side: 0,
            id_battel: parseInt($(this).attr("data-id-battel")),
            city_name: "name"
        };

    } else {

        battel_data = {
            x_coord: parseInt($(this).attr("data-x_coord")),
            y_coord: parseInt($(this).attr("data-y_coord")),
            ar_title: $(this).attr("data-title"),
            task: BATTEL_JOIN_ATTACK,
            time: 0,
            task_title: "انضمام للهجوم مع",
            type: null,
            side: 1,
            id_battel: parseInt($(this).attr("data-id-battel")),
            city_name: "name"
        };


    }


    // get hero id 
    var hero_object;

    for (var iii in Elkaisar.DPlayer.Heros)
    {
        if(parseInt(Elkaisar.DPlayer.Heros[iii].Hero.in_city) !== Elkaisar.Hero.HeroState.HERO_IN_CITY)
            continue;
        if(parseInt(Elkaisar.DPlayer.Heros[iii].Hero.console) !== 0)
            continue;
        if(Elkaisar.DPlayer.Heros[iii].Hero.id_city == Elkaisar.CurrentCity.idCity){
             Elkaisar.CurrentHero = Elkaisar.DPlayer.Heros[iii];
             break;
        }
    }

    $(".close_dialog").click();
    $("#dialg_box").remove();

    var content = army.dialogBoxContent_forCamp(Elkaisar.CurrentHero, battel_data);
    var dialog_box = army.dialogBox(Translate.Title.Box.Hero[UserLag.language], NavBar.Hero, content);

    dialogBoxShow(dialog_box, function () {

        army.getCurrentArmy(Elkaisar.CurrentHero);
        $(".left-nav ul li").each(function () {
            if ($(this).attr("head_title") === "camp") {
                $(this).addClass("selected");
            }
        });
        $("#dialg_box").attr("type", "hero");
        $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);

    });





});