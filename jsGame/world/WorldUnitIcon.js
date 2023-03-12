Elkaisar.World.WorldMapIcon.MapIcon = {};

Elkaisar.World.WorldMapIcon.Rad = 70;

Elkaisar.World.WorldMapIcon.MapIcon = {
    AttackOnlyUnit: [
        {
            Deg: -90,
            Icon: "MapIconAttack",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_CONQUER,
            YOffset: 0
        },
        {
            Deg: 90,
            Icon: "MapIconArena",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_OPEN_BATTEL_FIELD,
            YOffset: -15
        },
        {
            Deg: 90,
            Icon: "Text",
            Id: "Title",
            YOffset: -15
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "Coord",
            YOffset: 40
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "CoordBg",
            YOffset: 38
        }
    ],
    BarrayAttack: [
        {
            Deg: -15,
            Icon: "MapIconRainForce",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT,
            YOffset: 0
        },
        {
            Deg: -65,
            Icon: "MapIconSpy",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY,
            YOffset: 0
        },
        {
            Deg: -115,
            Icon: "MapIconOccupy",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE,
            YOffset: 0
        },
        {
            Deg: -165,
            Icon: "MapIconAttack",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_CONQUER,
            YOffset: 0
        },
        {
            Deg: 90,
            Icon: "MapIconArena",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_OPEN_BATTEL_FIELD,
            YOffset: -15
        },
        {
            Deg: 90,
            Icon: "Text",
            Id: "Title",
            YOffset: -15
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "Coord",
            YOffset: 40
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "CoordBg",
            YOffset: 38
        }
    ],
    CityAttack: [
        {
            Deg: 10,
            Icon: "MapIconTransPort",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY,
            YOffset: 0
        },
        {
            Deg: -40,
            Icon: "MapIconRainForce",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPORT,
            YOffset: 0
        },
        {
            Deg: -90,
            Icon: "MapIconSpy",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SPY,
            YOffset: 0
        },
        {
            Deg: -140,
            Icon: "MapIconOccupy",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_DOMINATE,
            YOffset: 0
        },
        {
            Deg: -190,
            Icon: "MapIconAttack",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_CONQUER,
            YOffset: 0
        },
        {
            Deg: 90,
            Icon: "MapIconArena",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_OPEN_BATTEL_FIELD,
            YOffset: -15
        },
        {
            Deg: 90,
            Icon: "Text",
            Id: "Title",
            YOffset: -15
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "Coord",
            YOffset: 40
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "CoordBg",
            YOffset: 38
        }
    ],
    MyCity: [
        {
            Deg: -45,
            Icon: "MapIconTransPort",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_SUPPLY,
            YOffset: 0
        },
        {
            Deg: -90,
            Icon: "MapIconRainForce",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_HERO_TRANS,
            YOffset: 0
        },
        {
            Deg: -135,
            Icon: "MapIconEnter",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_ENTER_CITY,
            YOffset: 0
        },
        {
            Deg: 90,
            Icon: "MapIconArena",
            Task: Elkaisar.BaseData.BattelTasks.BATTEL_TASK_OPEN_BATTEL_FIELD,
            YOffset: -15
        },
        {
            Deg: 90,
            Icon: "Text",
            Id: "Title",
            YOffset: -15
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "Coord",
            YOffset: 40
        },
        {
            Deg: -90,
            Icon: "Text",
            Id: "CoordBg",
            YOffset: 38
        }
    ]
};




Elkaisar.World.WorldMapIcon.getIconList = function (xCoord, yCoord) {

    var Unit = WorldUnit.getWorldUnit(Elkaisar.World.Map.realCoord(xCoord), Elkaisar.World.Map.realCoord(yCoord));

    if (
            WorldUnit.isArena(Unit.ut)
            || WorldUnit.isArmyCapital(Unit.ut) || WorldUnit.isAsianSquads(Unit.ut)
            || WorldUnit.isCamp(Unit.ut) || WorldUnit.isCarthagianArmies(Unit.ut)
            || WorldUnit.isSeaCity(Unit.ut) || WorldUnit.isQueenCity(Unit.ut)
            || WorldUnit.isRepelCastle(Unit.ut) || WorldUnit.isThiefs(Unit.ut)
            || WorldUnit.isGang(Unit.ut) || WorldUnit.isMugger(Unit.ut)
            || WorldUnit.isStatueWar(Unit.ut) || WorldUnit.isStatueWalf(Unit.ut)
            )
        return Elkaisar.World.WorldMapIcon.MapIcon.AttackOnlyUnit;
    if (WorldUnit.isBarrary(Unit.ut))
        return Elkaisar.World.WorldMapIcon.MapIcon.BarrayAttack;
    if (WorldUnit.isCity(Unit.ut))
        return Elkaisar.World.WorldMapIcon.MapIcon.CityAttack;

    return Elkaisar.World.WorldMapIcon.MapIcon.AttackOnlyUnit;
};

Elkaisar.World.WorldMapIcon.IconClicked = function (xCoord, yCoord, BattelTask) {
    Elkaisar.World.WorldMapIcon.Clicked(Elkaisar.World.Map.realCoord(xCoord), Elkaisar.World.Map.realCoord(yCoord), BattelTask);
};



Elkaisar.World.WorldMapIcon.showWorldUnitIcons = function (xCoord, yCoord) {

    this.removeWorldUnitIcons();
    var x = Elkaisar.World.Map.posX(xCoord, yCoord) + 64;
    var y = Elkaisar.World.Map.posY(xCoord, yCoord) + 80;
    var z = Elkaisar.World.Map.posZ(xCoord, yCoord) + 15;

    var IconList = Elkaisar.World.WorldMapIcon.getIconList(xCoord, yCoord);
    var xPos, yPos;

    //var Icon = {0: "MapIconAttack", "1": "MapIconOccupy", "2": "MapIconRainForce", "3": "MapIconSpy", "4": "MapIconTransPort", "5": "MapIconEnter", "5": "MapIconEnter", "6": "MapIconArena"};

    for (var iii in IconList) {
        xPos = Math.cos(Phaser.Math.DegToRad(IconList[iii].Deg));
        yPos = Math.sin(Phaser.Math.DegToRad(IconList[iii].Deg));
        if (IconList[iii].Icon == "Text") {
            if (IconList[iii].Id == "Title") {
                Elkaisar.GE.WorldScene.WorldUnitIcons[iii] = Elkaisar.GE.WorldScene.add.text(0, 0, "أرض المعركة",
                        {fixedHeight: 20, fontStyle: "bold", fontSize: 14, stroke: '#000000', strokeThickness: 3}).setDepth(z + 10).setOrigin(0.5, 0.5);
            } else if (IconList[iii].Id == "Coord") {
                Elkaisar.GE.WorldScene.WorldUnitIcons[iii] = Elkaisar.GE.WorldScene.add.text(0, 0, `${xCoord}  ${yCoord}`,
                        {fixedHeight: 20, fontStyle: "bold", fontSize: 14, stroke: '#000000', strokeThickness: 3}).setDepth(z + 10).setOrigin(0.5, 0.5);
            } else if (IconList[iii].Id == "CoordBg") {
                Elkaisar.GE.WorldScene.WorldUnitIcons[iii] = Elkaisar.GE.WorldScene.add.image(x + 20 * xPos, y + 20 * yPos, "CoordHolder").setDepth(z + 9).setScale(0.8, 0.6)
            }


        } else {
            Elkaisar.GE.WorldScene.WorldUnitIcons[iii] = Elkaisar.GE.WorldScene.add.image(x + 20 * xPos, y + 20 * yPos, IconList[iii].Icon).setDepth(z + 10)
                    .setInteractive()
                    .on("click", function (Obj) {
                        Elkaisar.World.WorldMapIcon.IconClicked(Obj.data.get("xCoord"), Obj.data.get("yCoord"), Obj.data.get("BattelTask"));
                    });
            Elkaisar.GE.WorldScene.WorldUnitIcons[iii].setDataEnabled();
            Elkaisar.GE.WorldScene.WorldUnitIcons[iii].data.set('BattelTask', IconList[iii].Task);
            Elkaisar.GE.WorldScene.WorldUnitIcons[iii].data.set('xCoord', Elkaisar.World.Map.realCoord(xCoord));
            Elkaisar.GE.WorldScene.WorldUnitIcons[iii].data.set('yCoord', Elkaisar.World.Map.realCoord(yCoord));
        }

    }

    this.tweenWorldUnitIcons(x, y, IconList);

    Elkaisar.GE.WorldScene.CircleUnitIcon = Elkaisar.GE.WorldScene.add.circle(x, y, Elkaisar.World.WorldMapIcon.Rad).setStrokeStyle(4, 0x000000)
            .setDepth(z + 9)
            .setInteractive(new Phaser.Geom.Circle(70, 70, Elkaisar.World.WorldMapIcon.Rad + 10), Phaser.Geom.Circle.Contains)
            .on("pointerover", function (P, X, Y, E) {
                E.stopPropagation();
            })
            .on("pointerdown", function (P, X, Y, E) {
                Elkaisar.World.WorldMapIcon.removeWorldUnitIcons();
            });
    Elkaisar.GE.WorldScene.CircleUnitIcon.canClickThrough = true;
    Elkaisar.GE.WorldScene.tweens.add({
        targets: Elkaisar.GE.WorldScene.CircleUnitIcon,
        scale: {from: 0.75, to: 1},
        ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 600
    });
};

Elkaisar.World.WorldMapIcon.removeWorldUnitIcons = function () {

    for (var ii in Elkaisar.GE.WorldScene.WorldUnitIcons) {
        if (Elkaisar.GE.WorldScene.WorldUnitIcons[ii])
            Elkaisar.GE.WorldScene.WorldUnitIcons[ii].destroy();
    }
    if (Elkaisar.GE.WorldScene.Tween)
        Elkaisar.GE.WorldScene.Tween.remove();
    if (Elkaisar.GE.WorldScene.CircleUnitIcon)
        Elkaisar.GE.WorldScene.CircleUnitIcon.destroy();
};


Elkaisar.World.WorldMapIcon.removeUnitCoords = function (){
     if (Elkaisar.GE.WorldScene.UnitCoords && Elkaisar.GE.WorldScene.UnitCoords.Bg) {
        Elkaisar.GE.WorldScene.UnitCoords.Bg.destroy();
        Elkaisar.GE.WorldScene.UnitCoords.Text.destroy();
    }
};
Elkaisar.World.WorldMapIcon.showUnitCoords = function (xCoord, yCoord) {

   
    Elkaisar.World.WorldMapIcon.removeUnitCoords ();
    
    var x = Elkaisar.World.Map.posX(xCoord, yCoord) + 64;
    var y = Elkaisar.World.Map.posY(xCoord, yCoord) + 80;
    var z = Elkaisar.World.Map.posZ(xCoord, yCoord) + 15;
    Elkaisar.GE.WorldScene.UnitCoords = {};
    Elkaisar.GE.WorldScene.UnitCoords.Text = Elkaisar.GE.WorldScene.add.text(x, y, `${xCoord}  ${yCoord}`,
            {fixedHeight: 20, fontStyle: "bold", fontSize: 14, stroke: '#000000', strokeThickness: 3}).setDepth(z + 10).setOrigin(0.5, 0.5);
    Elkaisar.GE.WorldScene.UnitCoords.Bg = Elkaisar.GE.WorldScene.add.image(x, y , "CoordHolder").setDepth(z + 9).setScale(0.8, 0.6);


};

Elkaisar.World.WorldMapIcon.tweenWorldUnitIcons = function (x, y, IconList) {
    var Rad = 70;
    var xPos, yPos;
    Elkaisar.GE.WorldScene.Tween = Elkaisar.GE.WorldScene.tweens.add({
        targets: Object.values(Elkaisar.GE.WorldScene.WorldUnitIcons),
        x: {
            getStart: function (target, key, value, targetIndex, totalTargets, tween) {
                if (!IconList[targetIndex]) {
                    console.log(targetIndex, target, key)
                    return 0;
                }


                return x + 52.5 * Math.cos(Phaser.Math.DegToRad(IconList[targetIndex].Deg));
            },
            getEnd: function (target, key, value, targetIndex, totalTargets, tween) {
                if (!IconList[targetIndex]) {
                    console.log(targetIndex, target, key)
                    return 0;
                }
                return x + Rad * Math.cos(Phaser.Math.DegToRad(IconList[targetIndex].Deg));
            }
        },
        y: {
            getStart: function (target, key, value, targetIndex, totalTargets, tween) {
                if (!IconList[targetIndex]) {
                    console.log(targetIndex, target, key)
                    return 0;
                }
                return y + 52.5 * Math.sin(Phaser.Math.DegToRad(IconList[targetIndex].Deg));
            },
            getEnd: function (target, key, value, targetIndex, totalTargets, tween) {
                if (!IconList[targetIndex]) {
                    console.log(targetIndex, target, key)
                    return 0;
                }
                return y + Rad * Math.sin(Phaser.Math.DegToRad(IconList[targetIndex].Deg)) + IconList[targetIndex].YOffset;
            }
        },
        ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 600
    });

};
  