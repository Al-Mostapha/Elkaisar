$("#WorldCity").click(function () {

    afterChangeView();

    if ($(this).attr("data-view") === "world") {


        Elkaisar.GE.WorldScene.scene.start("City");


        if (!$.isEmptyObject(Animation.currentUnitArrow.arrow)) {
            Animation.currentUnitArrow.arrow.destroy();
            delete(Animation.currentUnitArrow.arrow);
        }

        $(this).attr("data-view", "city");
        $(this).html(Translate.Button.Chat.World[UserLag.language]);
        $("#hide-show").hide();
        //Crafty.audio.stop("bird_sound");
        $("#smallMap-icon").fadeOut();
        $(".nav-to-city").fadeOut();
        setTimeout(function () {
            var iii = 0;
            for (iii; iii < 500 * 500; iii++) {
                delete Elkaisar.worldAllUnits[iii].entite;
                delete Elkaisar.worldAllUnits[iii].floor;
                delete Elkaisar.worldAllUnits[iii].CityFlagEntite;
                delete Elkaisar.worldAllUnits[iii].UnitFire;
            }
        });

    } else if ($(this).data("view") === "city") {
        if (!Elkaisar.World.Map.CityFound)
            Elkaisar.World.Map.getWorldCity().done(function () {
                Elkaisar.GE.CityScene.scene.start("World");
            });
        else
            Elkaisar.GE.CityScene.scene.start("World");

        $(this).attr("data-view", "world");
        $(this).html("المدينة");
        $("#hide-show").show();

        $("#smallMap-icon").fadeIn();
        $(".nav-to-city").fadeIn();
        setTimeout(function () {
            Elkaisar.World.Map.RefreshWorld();
        }, 1000);
    }

});




$(document).on("click", "#player-city-list ul li", function () {

    afterChangeView();

    var index = Number($(this).attr("data-index"));
    var id_city = Number($(this).attr("data-id-city"));

    $("#player-city-list ul .selected").removeClass("selected");
    $(this).addClass("selected");

    var view = $("#WorldCity").attr("data-view");


    Elkaisar.City.getCityHero(id_city);
    Elkaisar.City.getCityBarray(id_city);
    Elkaisar.City.getCityHeroArmy(id_city);
    Elkaisar.City.getCityHeroEquip(id_city);
    Elkaisar.City.getCityHeroMedal(id_city);
    Elkaisar.City.getCityGarrison(id_city);
    Elkaisar.TimedTask.getCityBuildingTasks(id_city);
    Elkaisar.TimedTask.getCityJopTasks(id_city);
    Elkaisar.TimedTask.getCityStudyTasks(id_city);

    city_profile.refresh_resource_view();
    city_profile.refresh_hero_view();
    city_profile.refresh_army_view();
    Elkaisar.TimedTask.refreshListView();
    Elkaisar.City.refreshBtnList();

    Elkaisar.CurrentCity = Elkaisar.City.getCity(id_city);

    Elkaisar.City.getCityBuilding().done(function (data) {

        if (view === "city") {
            fillCityWithBuilding();
        }

        Elkaisar.City.getCityBase();


    });



    $("#city-data .name").html(Elkaisar.CurrentCity.City.name);
    $("#city-data .coords").html(`[ ${Elkaisar.CurrentCity.City.y} , ${Elkaisar.CurrentCity.City.x} ]`);




    if (view === "world") {

        $("#x_coord-input input").val(Elkaisar.CurrentCity.City.x);
        $("#y_coord-input input").val(Elkaisar.CurrentCity.City.y);
        $("#nav-btn button").click();

    }

});



$(document).on("click", ".nav-to-city", function () {

    var xCoord = $(this).attr("data-x-coord");
    var yCoord = $(this).attr("data-y-coord");

    $("#x_coord-input input").val(xCoord);
    $("#y_coord-input input").val(yCoord);
    $("#nav-btn button").click();

});


$(document).on("click", ".copy-coord", function () {
    var coord = `[${$(this).attr("data-x-coord")},${$(this).attr("data-y-coord")}]`;
    var inputVal = $("#input-chat input").val();
    $("#input-chat input").val(inputVal + " " + coord);
    $("#input-chat input").focus();
});



function afterChangeView() {
    $(".close_dialog").click();
    $(".close_select_menu").click();
}



$(document).on("click", "#chat-box", function (e) {
    e.stopPropagation();
});


$("#nav-btn .full-btn").click(function () {

    var x_coord = parseInt($("#x_coord-input input").val()) || 0;
    var y_coord = parseInt($("#y_coord-input input").val()) || 0;
    const cam = Elkaisar.GE.WorldScene.cameras.main;
    const x = Elkaisar.World.Map.posX(Number(x_coord), Number(y_coord)) + 64;
    const y = Elkaisar.World.Map.posY(Number(x_coord), Number(y_coord)) + 128;
    const Dist = Phaser.Math.Distance.Between(cam.scrollX, cam.scrollY, x, y);

    if ($("#FastNav").is(':checked')) {

        Elkaisar.GE.WorldScene.cameras.main.scrollX = Elkaisar.World.Map.posX(Number(x_coord), Number(y_coord)) - Math.floor(MAX_SCREEN_WIDTH / 2 - 128);
        Elkaisar.GE.WorldScene.cameras.main.scrollY = Elkaisar.World.Map.posY(Number(x_coord), Number(y_coord)) - Math.floor(MAX_SCREEN_HEIGHT / 2 - 128);


        Animation.currentUnitArrow.put(x_coord, y_coord);
        Elkaisar.World.Map.Scroll(true);

        Elkaisar.GE.WorldScene.time.delayedCall(500, function () {
            Elkaisar.World.Map.clear();
            Elkaisar.World.Map.clear();
            Elkaisar.World.MapBattel.AddBattels();
            Elkaisar.World.Map.RefreshWorld();
        });

    } else {
        cam.pan(x, y, Math.max(Dist / 2, 1500), "Sine.easeInOut", false, function (camera, progress, x, y) {
            Elkaisar.World.Map.Scroll(true);
            Elkaisar.World.Map.clear();
        });

        Animation.currentUnitArrow.put(x_coord, y_coord);


    }


});