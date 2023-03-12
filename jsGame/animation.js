Animation = {};
Animation.ProductioRats = [];
Animation.ProductionTweens = [];
Animation.PluseProFontStyle = {
    fixedHeight: 20,
    fontStyle: "bold",
    fontSize: 14,
    stroke: '#000000',
    strokeThickness: 3,
    color: "#a7e328"
};
Animation.MinusProFontStyle = {
    fixedHeight: 20,
    fontStyle: "bold",
    fontSize: 14,
    stroke: '#000000',
    strokeThickness: 3,
    color: "#a7e328"
};
Animation.cityProductionRate = function () {

    Animation.ProductioRats.forEach(function(OneRate){
        OneRate.destroy();
    });
    Animation.ProductionTweens.forEach(function(OneTween){
        OneTween.remove();
    });
    Animation.ProductioRats = [];
    Animation.ProductionTweens = [];

    /* resource  in city animation*/
    const coin_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.coin_in - Elkaisar.CurrentCity.City.coin_out) / (30 * 60)) * 100) / 100);
    Animation.ProductioRats.push(Elkaisar.GE.CityScene.add.text(
        BuildingOnFloor.palace.x + 0.6 * X_GRID,
        BuildingOnFloor.palace.y + 1.85 * Y_GRID ,
        coin_in_ratio >= 0 ? "+" + coin_in_ratio : '-' + coin_in_ratio,
        coin_in_ratio >= 0 ? Animation.PluseProFontStyle : Animation.MinusProFontStyle ).setDepth(1000).setOrigin(0, 0));

    const food_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.food_in - Elkaisar.CurrentCity.City.food_out) / (30 * 60)) * 100) / 100);
    Animation.ProductioRats.push(Elkaisar.GE.CityScene.add.text(
        BuildingOnFloor.farm.x + 0.6 * X_GRID,
        BuildingOnFloor.farm.y + 1.85 * Y_GRID,
        food_in_ratio >= 0 ? "+" + food_in_ratio : '-' + food_in_ratio,
        food_in_ratio >= 0 ? Animation.PluseProFontStyle : Animation.MinusProFontStyle ).setDepth(1000).setOrigin(0, 0));

    var wood_in_ratio = parseFloat(Math.round(((Elkaisar.CurrentCity.City.wood_in - Elkaisar.CurrentCity.City.wood_out) / (30 * 60)) * 100) / 100);
    Animation.ProductioRats.push(Elkaisar.GE.CityScene.add.text(
        BuildingOnFloor.wood.x + 0.6 * X_GRID,
        BuildingOnFloor.wood.y + 1.85 * Y_GRID,
        wood_in_ratio >= 0 ? "+" + wood_in_ratio : '-' + wood_in_ratio,
        wood_in_ratio >= 0 ? Animation.PluseProFontStyle : Animation.MinusProFontStyle ).setDepth(1000).setOrigin(0, 0));


    var stone_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.stone_in / (30 * 60)) * 100) / 100);
    Animation.ProductioRats.push(Elkaisar.GE.CityScene.add.text(
        BuildingOnFloor.stone.x + 0.6 * X_GRID,
        BuildingOnFloor.stone.y + 1.85 * Y_GRID,
        stone_in_ratio >= 0 ? "+" + stone_in_ratio : '-' + stone_in_ratio,
        stone_in_ratio >= 0 ? Animation.PluseProFontStyle : Animation.MinusProFontStyle ).setDepth(1000).setOrigin(0, 0));

    var metal_in_ratio = parseFloat(Math.round((Elkaisar.CurrentCity.City.metal_in / (30 * 60)) * 100) / 100);
    Animation.ProductioRats.push(Elkaisar.GE.CityScene.add.text(
        BuildingOnFloor.mine.x + 1.6 * X_GRID,
        BuildingOnFloor.mine.y + 2.25 * Y_GRID,
        metal_in_ratio >= 0 ? "+" + metal_in_ratio : '-' + metal_in_ratio,
        metal_in_ratio >= 0 ? Animation.PluseProFontStyle : Animation.MinusProFontStyle ).setDepth(1000).setOrigin(0, 0));



    Animation.ProductioRats.forEach(function (El, Ind) {
        Animation.ProductionTweens.push(Elkaisar.GE.CityScene.tweens.add({
            targets: El, y: "-=50", alpha: 0.2 ,ease: 'Linear',
            repeat: -1, duration: 3000
        }));
    });
    return;

};

Animation.FarmAnimation = function () {

    Elkaisar.GE.CityScene.add.sprite(1895, 1083, "FarmLabor").setDepth(100).play("FarmLabor.A");
    Elkaisar.GE.CityScene.add.sprite(1804, 1129, "FarmLabor").setDepth(100).playAfterDelay("FarmLabor.A", 500);
    Elkaisar.GE.CityScene.add.sprite(1777, 1059, "FarmLabor").setDepth(100).playAfterDelay("FarmLabor.A", 250);


    var CarryOne = Elkaisar.GE.CityScene.add.sprite(1929, 1086, "FarmLabor").setDepth(100).playAfterDelay("FarmLaborCarryR.A", 250).setDepth(1);
    var CarryTwo = Elkaisar.GE.CityScene.add.sprite(2071, 1013, "FarmLabor").setDepth(100).playAfterDelay("FarmLaborCarryR.A", 250).setFlipX(true).setDepth(1);
    var CarryThree = Elkaisar.GE.CityScene.add.sprite(2100, 1000, "FarmLabor").setDepth(100).playAfterDelay("FarmLaborCarryR.A", 250).setFlipX(true).setDepth(1);
    var CarryFour = Elkaisar.GE.CityScene.add.sprite(2050, 1030, "FarmLabor").setDepth(100).playAfterDelay("FarmLaborCarryR.A", 250).setFlipX(true).setDepth(1);
    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryOne, x: 2071, y: 1013, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 15000, yoyo: true,
        onYoyo: function () {
            CarryOne.play("noCarryWorkerD.A").setFlipX(true);
        },
        onRepeat: function () {
            CarryOne.play("FarmLaborCarryR.A").setFlipX(false);
        }
    });
    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryTwo, x: 1450, y: 664, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 45000, yoyo: true,
        onYoyo: function () {
            CarryTwo.play("noCarryWorkerD.A").setFlipX(false);
        },
        onRepeat: function () {
            CarryTwo.play("FarmLaborCarryR.A").setFlipX(true);
        }
    });
    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryThree, x: 1431, y: 678, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 45000, yoyo: true, delay: 15000,
        onYoyo: function () {
            CarryThree.play("noCarryWorkerD.A").setFlipX(false);
        },
        onRepeat: function () {
            CarryThree.play("FarmLaborCarryR.A").setFlipX(true);
        }
    });
    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryFour, x: 1410, y: 683, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 45000, yoyo: true, delay: 30000,
        onYoyo: function () {
            CarryFour.play("noCarryWorkerD.A").setFlipX(false);
        },
        onRepeat: function () {
            CarryFour.play("FarmLaborCarryR.A").setFlipX(true);
        }
    });
};


Animation.StoneAnimation = function () {

    Elkaisar.GE.CityScene.add.sprite(1523, 442, "StoneLabor").setDepth(100).playAfterDelay("StoneLabor.A", 250).setDepth(100).setScale(1.2, 1.2);
    Elkaisar.GE.CityScene.add.sprite(1642, 453, "StoneLabor").setDepth(100).playAfterDelay("StoneLabor.A", 0).setDepth(100).setScale(1.2, 1.2);
    Elkaisar.GE.CityScene.add.sprite(1731, 461, "StoneLabor").setDepth(100).playAfterDelay("StoneLabor.A", 150).setDepth(100).setFlipX(true).setScale(1.2, 1.2);
    Elkaisar.GE.CityScene.add.sprite(1630, 525, "StoneLabor").setDepth(100).playAfterDelay("StoneLabor.A", 100).setDepth(100).setFlipX(true).setScale(1.2, 1.2);

    var CarryOne = Elkaisar.GE.CityScene.add.sprite(1563, 537, "FarmLabor").setDepth(150).playAfterDelay("StoneLaborCarryL.A", 250).setDepth(1);
    var CarryTwo = Elkaisar.GE.CityScene.add.sprite(1508, 503, "FarmLabor").setDepth(150).playAfterDelay("StoneLaborCarryL.A", 250).setDepth(1);

    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryOne, x: 1395, y: 645, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 15000, yoyo: true,
        onYoyo: function () {
            CarryOne.play("noCarryWorkerR.A");
        },
        onRepeat: function () {
            CarryOne.play("StoneLaborCarryL.A").setFlipX(false);
        }
    });
    Elkaisar.GE.CityScene.tweens.add({
        targets: CarryTwo, x: 1312, y: 609, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 15000, yoyo: true, delay: 10000,
        onYoyo: function () {
            CarryTwo.play("noCarryWorkerR.A");
        },
        onRepeat: function () {
            CarryTwo.play("StoneLaborCarryL.A").setFlipX(false);
        }
    });

};



Animation.IronAnimation = function () {


    Elkaisar.GE.CityScene.add.sprite(1319, 279, "IronLabor").playAfterDelay("IronLabor.A", 0).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(1173, 326, "IronLabor").playAfterDelay("IronLabor.A", 100).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(1061, 317, "IronLabor").playAfterDelay("IronLabor.A", 200).setDepth(100);

};


Animation.WoodAnimation = function () {


    Elkaisar.GE.CityScene.add.sprite(437, 477, "WoodLabor").playAfterDelay("WoodLabor.A", 0).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(399, 550, "WoodLabor").playAfterDelay("WoodLabor.A", 100).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(303, 563, "WoodLabor").playAfterDelay("WoodLabor.A", 200).setDepth(100);

    Elkaisar.GE.CityScene.add.sprite(348, 547, "WoodTool").playAfterDelay("WoodTool.A", 200).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(470, 549, "WoodTool").playAfterDelay("WoodTool.A", 100).setFlipX(true).setDepth(100);


};

Animation.FixedCityAnimation = function () {

    Animation.FarmAnimation();
    Animation.StoneAnimation();
    Animation.IronAnimation();
    Animation.WoodAnimation();

    Elkaisar.GE.CityScene.add.sprite(1412, 445, "Horse").playAfterDelay("Horse.A", 0).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(1420, 455, "Horse").playAfterDelay("Horse.A", 100).setFlipX(true).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(1430, 458, "Horse").playAfterDelay("Horse.A", 150).setDepth(100);


    Elkaisar.GE.CityScene.add.sprite(1285, 716, "Fountain").playAfterDelay("Fountain.A", 150).setDepth(100);
    Elkaisar.GE.CityScene.add.sprite(1235, 680, "Fountain").playAfterDelay("Fountain.A", 150).setDepth(100);


    var Woman1 = Elkaisar.GE.CityScene.add.sprite(1696, 555, "Woman").playAfterDelay("WomanFace.A", 150).setDepth(100);
    Elkaisar.GE.CityScene.tweens.add({
        targets: Woman1, x: 1178, y: 790, ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1, duration: 45000, yoyo: true,
        onYoyo: function () {
            Woman1.play("WomanBack.A");
        },
        onRepeat: function () {
            Woman1.play("WomanFace.A");
        }
    });

    return;

    Crafty.cityClouds = [];
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 150, y: 100, vx: 14, z: 5000, __offsetX: -150
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: -100, y: 250, vx: 10, z: 5000, __offsetX: -100
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 180, y: 350, vx: 10, z: 5000, __offsetX: -180
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 360, y: 600, vx: 14, z: 5000, __offsetX: -360
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 660, y: 750, vx: 14, z: 5000, __offsetX: -660
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 540, y: 250, vx: 14, z: 5000, __offsetX: -540
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 110, y: 750, vx: 14, z: 5000, __offsetX: -110
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 160, y: 900, vx: 14, z: 5000, __offsetX: -160
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1800, y: 750, vx: 14, z: 5000, __offsetX: -1800
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1250, y: 900, vx: 14, z: 5000, __offsetX: -1250
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1500, y: 430, vx: 14, z: 5000, __offsetX: -1500
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 830, y: 360, vx: 14, z: 5000, __offsetX: -830
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1140, y: 540, vx: 10, z: 5000, __offsetX: -1140
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 850, y: 350, vx: 10, z: 5000, __offsetX: -850
    }));

    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 980, y: 250, vx: 14, z: 5000, __offsetX: -980
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1480, y: 750, vx: 14, z: 5000, __offsetX: -1480
    }));
    Crafty.cityClouds.push(Crafty.e('2D, DOM, cloud ,Motion , city_ani').attr({
        x: 1600, y: 900, vx: 14, z: 5000, __offsetX: -1600
    }));

};


//setTimeout(function (){Animation.FixedCityAnimation();} , 3000)
/*var CLOUD_RESET_TIMER = setInterval(function () {
 for (var cloud in Crafty.cityClouds) {
 
 if (Crafty.cityClouds[cloud]._x > 2500) {
 Crafty.cityClouds[cloud].x = Crafty.cityClouds[cloud].__offsetX;
 }
 
 }
 }, 40 * 1000);*/



function building_hammer_animate(BuildingPlace) {

    if (!isUpgradingNow(BuildingPlace))
        return;

    var x = BuildingOnFloor[BuildingPlace].x;
    var y = BuildingOnFloor[BuildingPlace].y;
    var x_1 = x - 25;
    var x_2 = x + 20;
    var y_1 = y - 10;
    var y_2 = y;
    if (BuildingOnFloor[BuildingPlace].BuildingAni) {
        for (var ii in BuildingOnFloor[BuildingPlace].BuildingAni) {
            BuildingOnFloor[BuildingPlace].BuildingAni[ii].destroy();
            delete BuildingOnFloor[BuildingPlace].BuildingAni[ii];
        }
    }
    BuildingOnFloor[BuildingPlace].BuildingAni = [];

    if (BuildingPlace === "palace") {
        x_1 = x + 25;
        x_2 = x + 80;
        y_1 = y + 5;
        y_2 = y;
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.image(x + 55, y + 55, "UpgradingPalaceSupD").setOrigin(0, 0).setDepth(3));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.image(x + 55, y + 55, "UpgradingPalaceSupU").setOrigin(0, 0).setDepth(1));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 165, y + 120, "UpgradingLaborR").play("UpgradingLaborR.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 200, y + 100, "UpgradingLaborR").play("UpgradingLaborR.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 70, y + 120, "UpgradingLaborL").play("UpgradingLaborL.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));

    } else if (BuildingPlace === "wall") {
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(1.5 * X_GRID, 3.25 * Y_GRID, "UpgradingHammer").play("UpgradingHammer.A", Math.random() * 500).setOrigin(0, 0).setDepth(10));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(0.5 * X_GRID, 4.25 * Y_GRID, "UpgradingHammer").play("UpgradingHammer.A", Math.random() * 500).setOrigin(0, 0).setDepth(10));
        x_2 = 3.5 * X_GRID;
        y_2 = 1.25 * Y_GRID;
    } else if (BuildingPlace === "farm") {
        x_1 = x + 0.5 * X_GRID;
        x_2 = x + X_GRID;
        y_1 = y + Y_GRID;
        y_2 = y + 0.5 * Y_GRID;
    } else if (BuildingPlace === "mine") {
        x_1 = x - 25 + X_GRID;
        x_2 = x + 20 + X_GRID;
        y_1 = y - 10 + Y_GRID;
        y_2 = y + Y_GRID;
    } else if (BuildingPlace === "stone") {
        x_1 = x - 25 + 0.5 * X_GRID;
        x_2 = x + 20 + 0.5 * X_GRID;
        y_1 = y - 10 + 0.5 * Y_GRID;
        y_2 = y + 0.5 * Y_GRID;
    } else if (BuildingPlace == "wood") {

    } else {

        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x, y + 60, "UpgradingLaborL").play("UpgradingLaborL.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 45, y + 80, "UpgradingLaborL").play("UpgradingLaborL.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 120, y + 60, "UpgradingLaborR").play("UpgradingLaborR.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x + 80, y + 80, "UpgradingLaborR").play("UpgradingLaborR.A", Math.random() * 500).setOrigin(0, 0).setDepth(5));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.image(x, y, "UpgradingSupportsD").setOrigin(0, 0).setDepth(4));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.image(x, y, "UpgradingSupportsU").setOrigin(0, 0).setDepth(3));


    }

    if (BuildingPlace !== "wall") {
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x_1, y_1, "UpgradingHammer").play("UpgradingHammer.A", Math.random() * 500).setFlipX(true).setOrigin(0, 0).setDepth(10));
        BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x_1, y_1, "UpgradingHammer").play("UpgradingHammer.A", Math.random() * 500).setFlipX(true).setOrigin(0, 0).setDepth(10));
    }


    BuildingOnFloor[BuildingPlace].BuildingAni.push(Elkaisar.GE.CityScene.add.sprite(x_2, y_2, "UpgradingHammer").play("UpgradingHammer.A", Math.random() * 500).setOrigin(0, 0).setDepth(10));


    return;


}

function fire_attack_animation() {
    return;
    Crafty.e('2D, Canvas, fire_start, SpriteAnimation, worldEnt')
        .reel("walking", 650, [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]
        ])
        .animate("walking", -1)
        .attr({ x: 800 + 100, y: 600 + 50, z: 50 });


}
var WORLD_NUIT_ON_FIRE = [];


Animation.fireWorldUnit = function (xCoord, yCoord) {


    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

    if (!Unit.s)
        return;

    if (!Unit.entite || $.isEmptyObject(Unit.entite)) {
        return;
    }

    if (Unit.UnitFire && Unit.UnitFire.length > 0)
        return;
    Unit.UnitFire = [];

    const x = Elkaisar.World.Map.posX(xCoord, yCoord);
    const y = Elkaisar.World.Map.posY(xCoord, yCoord);
    const z = Elkaisar.World.Map.posZ(xCoord, yCoord);
    const lvl = Unit.l;
    const type = Unit.ut;
    const Scene = Elkaisar.GE.WorldScene;

    if (WorldUnit.isRiver(type))
        return;
    if (Unit.entite.data.get("HasFire"))
        return;


    if (WorldUnit.isBarrary(type) && lvl < 4 || WorldUnit.isGangStar(type)) {
        Unit.UnitFire[0] = Scene.add.sprite(x + 52, y + 24, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
    } else if (WorldUnit.isBarrary(type)) {

        Unit.UnitFire[0] = Scene.add.sprite(x + 32, y + 16, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 72, y + 16, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 52, y + 42, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");

    } else if (WorldUnit.isCityLv1(type)) {

        Unit.UnitFire[0] = Scene.add.sprite(x + 42, y + 12, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 75, y + 20, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 12, y + 20, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[3] = Scene.add.sprite(x + 46, y + 42, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");

    } else if (WorldUnit.isCityLv2(type)) {

        Unit.UnitFire[0] = Scene.add.sprite(x + 42, y, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 80, y + 16, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 12, y + 12, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[3] = Scene.add.sprite(x + 52, y + 30, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");

    } else if (WorldUnit.isCityLv3(type)) {

        Unit.UnitFire[0] = Scene.add.sprite(x + 48, y - 10, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 88, y + 12, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 8, y + 8, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[3] = Scene.add.sprite(x + 60, y + 32, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");

    } else if (WorldUnit.isSeaCity(type)) {

        Unit.UnitFire[0] = Scene.add.sprite(x + 240, y + 70, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 150, y + 75, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 275, y + 150, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[3] = Scene.add.sprite(x + 175, y + 190, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[4] = Scene.add.sprite(x + 60, y + 175, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[5] = Scene.add.sprite(x + 175, y + 260, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");

    } else {

        Unit.UnitFire[0] = Scene.add.sprite(x + 42, y, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[1] = Scene.add.sprite(x + 80, y + 16, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[2] = Scene.add.sprite(x + 12, y + 12, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
        Unit.UnitFire[3] = Scene.add.sprite(x + 52, y + 30, "WorldUnitFire").setDepth(z).setOrigin(0, 0).play("WorldUnitFire.Ani");
    }

    Unit.entite.data.set("HasFire", true);

};


Elkaisar.Animation.cityFlagProp = {

};
Animation.WorldFire = function () {
    Elkaisar.GE.WorldScene.children.list.forEach(function (El) {
        if (!El.data)
            return;

        const xCoord = El.data.get("xCoord");
        const yCoord = El.data.get("yCoord");
        const Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
        Animation.fireWorldUnit(xCoord, yCoord);

    });
};

Animation.cityFlag = function () {

    Elkaisar.GE.WorldScene.children.list.forEach(function (El) {
        if (!El.data)
            return;

        const xCoord = El.data.get("xCoord");
        const yCoord = El.data.get("yCoord");
        const Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

        if (Unit.CityFlagEntite)
            return;
        if (!WorldUnit.isCity(Unit.ut))
            return;
        const x = Elkaisar.World.Map.posX(xCoord, yCoord);
        const y = Elkaisar.World.Map.posY(xCoord, yCoord);
        const z = Elkaisar.World.Map.posZ(xCoord, yCoord);
        const lvl = Unit.l;
        let FramName = "CityFlag.Nut";
        if (Unit.idPlayer == Elkaisar.DPlayer.Player.id_player)
            FramName = "CityFlag.Min";
        else if (!Unit.idGuild || !Elkaisar.Guild.GuildData)
            FramName = "CityFlag.Nut";
        else if (Unit.idGuild == Elkaisar.DPlayer.Player.id_guild)
            FramName = "CityFlag.All";
        else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(Unit.idGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        FramName = "CityFlag.Ene";

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        FramName = "CityFlag.Fri";
                    }
                }
            }
        }

        let Pos = { x: 0, y: 0 };
        if (Number(Unit.ut) === WUT_CITY_LVL_0)
            Pos = { x: x + 36, y: y + 50, z: z + 10 };
        else if (Number(Unit.ut) === WUT_CITY_LVL_1)
            Pos = { x: x + 36, y: y + 50, z: z + 10 };
        else if (Number(Unit.ut) === WUT_CITY_LVL_2)
            Pos = { x: x + 36, y: y + 50, z: z + 10 };
        else if (Number(Unit.ut) === WUT_CITY_LVL_3)
            Pos = { x: x + 30, y: y + 45, z: z + 10 };

        Unit.CityFlagEntite = Elkaisar.GE.WorldScene.add.sprite(Pos.x, Pos.y, 'flagOverCity').setOrigin(0, 0).play(FramName).setDepth(Pos.z);


    });


};


Animation.cityColonizerFlag = function () {
    return;
    Crafty("WorldUnit").each(function (index) {

        var world_unit = WorldUnit.getWorldUnit(this.coord_x, this.coord_y);

        if (!$.isEmptyObject(world_unit.CityColonizerFlagEntite)) {
            return;
        }
        if (!WorldUnit.isCity(world_unit.ut) || !world_unit.CityColonized) {
            return;
        }

        console.log(world_unit);
        var x = Elkaisar.World.Map.posX(this.coord_x, this.coord_y);
        var y = Elkaisar.World.Map.posY(this.coord_x, this.coord_y);
        var z = Elkaisar.World.Map.posZ(this.coord_x, this.coord_y);

        var lvl = world_unit.l;






        var flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        if (world_unit.ColonizerIdPlayer === Elkaisar.DPlayer.Player.id_player) {
            flag_array = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]];
        } else if (!Elkaisar.Guild.GuildData || !world_unit.ColonizerIdGuild) {

            flag_array = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

        } else if (Number(Elkaisar.DPlayer.Player.id_guild) === Number(world_unit.ColonizerIdGuild)) {
            flag_array = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
        } else {
            for (var jjj in Elkaisar.Guild.Allay) {
                if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(world_unit.ColonizerIdGuild)) {

                    if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                        flag_array = [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]];

                    } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                        flag_array = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]];
                    }
                }
            }
        }


        if (Number(world_unit.ut) === WUT_CITY_LVL_0) {

            world_unit.CityFlagEntite =
                Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({ x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y })
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                        .attr({ x: x + 34, y: y + 38, w: 35, h: 20, avoidCss3dTransforms: true, z: 9 ** 9 })
                        .text("")
                        .textColor('white')
                        .textFont({ size: '12px', lineHeight: "20px" })
                        .textAlign("center"));


        } else if (Number(world_unit.ut) === WUT_CITY_LVL_1) {

            world_unit.CityFlagEntite =
                Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({ x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y })
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                        .attr({ x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e15 })
                        .text("")
                        .textColor('white')
                        .textFont({ size: '12px', lineHeight: "20px" })
                        .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_2) {

            world_unit.CityFlagEntite =
                Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({ x: x + 36, y: y + 35, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y })
                    .attach(Crafty.e('2D, Canvas, Text, stroke')
                        .attr({ x: x + 34, y: y + 48, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29 })
                        .text("")
                        .textColor('white')
                        .textFont({ size: '12px', lineHeight: "20px" })
                        .textAlign("center"));

        } else if (Number(world_unit.ut) === WUT_CITY_LVL_3) {

            world_unit.CityFlagEntite =
                Crafty.e('2D, Canvas, flag_over_city, SpriteAnimation, worldEnt')
                    .reel("city_flag", 650, flag_array)
                    .animate("city_flag", -1)
                    .attr({ x: x + 30, y: y + 30, z: z + 10, coord_x: world_unit.x, coord_y: world_unit.y })
                    .attach(Crafty.e('2D, Canvas, Text, stroke, worldEnt')
                        .attr({ x: x + 34, y: y + 60, w: 35, h: 20, avoidCss3dTransforms: true, z: 9e29 })
                        .text("" + world_unit.CityFlag)
                        .textColor('white')
                        .textFont({ size: '12px', lineHeight: "20px" })
                        .textAlign("center"));

        } else {
            console.log(world_unit)
        }
    });


};

Animation.currentUnitArrow = {};

Animation.currentUnitArrow.arrow = {};
Animation.currentUnitArrow.x = 0;
Animation.currentUnitArrow.y = 0;
Animation.currentUnitArrow.z = 0;



Animation.currentUnitArrow.add = function () {

    Animation.currentUnitArrow.arrow = Elkaisar.GE.WorldScene.add.image(0, 0, "arrow").setDepth(0).setVisible(false);
    return;


};

Animation.currentUnitArrow.put = function (x, y) {

    Animation.currentUnitArrow.x = Elkaisar.World.Map.posX(x, y) + 50;
    Animation.currentUnitArrow.y = Elkaisar.World.Map.posY(x, y) + 5;
    Animation.currentUnitArrow.z = Elkaisar.World.Map.posZ(x, y) + 1;
    Animation.currentUnitArrow.arrow.setVisible(true);
    Animation.currentUnitArrow.arrow.setPosition(Animation.currentUnitArrow.x, Animation.currentUnitArrow.y);
    Animation.currentUnitArrow.arrow.setDepth(Animation.currentUnitArrow.z);


    if (Animation.currentUnitArrow.tween)
        Animation.currentUnitArrow.tween.remove();

    Animation.currentUnitArrow.tween = Elkaisar.GE.WorldScene.tweens.add({
        targets: Animation.currentUnitArrow.arrow,
        x: Animation.currentUnitArrow.arrow.x,
        y: Animation.currentUnitArrow.arrow.y + 30,
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        repeat: -1,
        duration: 1000,
        yoyo: true,
        onYoyo: function () { },
        onRepeat: function () { }
    });


    return;
    if (!$.isEmptyObject(Animation.currentUnitArrow.arrow)) {
        Animation.currentUnitArrow.arrow.setPosition(Animation.currentUnitArrow.x, Animation.currentUnitArrow.y).setDepth(Animation.currentUnitArrow.z);
    } else {

        Animation.currentUnitArrow.arrow =
            Elkaisar.GE.WorldScene.add.image(Animation.currentUnitArrow.x, Animation.currentUnitArrow.y).setDepth(Animation.currentUnitArrow.z);

        Crafty.e("2D, Canvas, Tween, arrow")
            .attr({
                x: Animation.currentUnitArrow.x,
                y: Animation.currentUnitArrow.y,
                z: Animation.currentUnitArrow.z
            })
            .tween({ y: Animation.currentUnitArrow.y + 30 }, 1000, "easeInOutQuad")
            .bind("TweenEnd", function () {
                this.tween({ y: Animation.currentUnitArrow.y + (dir ? 30 : 0) }, 1000, "easeInOutQuad");
                dir = 1 - dir;
            });

    }


};