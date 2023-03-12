Elkaisar.World.Map.posX = function (xCoord, yCoord) {
    return  xCoord * 64 - yCoord * 64;
};

Elkaisar.World.Map.posY = function (xCoord, yCoord) {
    return  xCoord * 32 + yCoord * 32;
};


Elkaisar.World.Map.xCoord = function (x, y) {
    return Math.round((2 * y + x) / 128);
};
Elkaisar.World.Map.yCoord = function (x, y) {
    return Math.round((2 * y - x) / 128);
};

Elkaisar.World.Map.widthInTile = function () {
    return Math.ceil(Elkaisar.MAX_SCREEN_WIDTH / 128);
};
Elkaisar.World.Map.heightInTile = function () {
    return Math.ceil(Elkaisar.MAX_SCREEN_HEIGHT / 64);
};



Elkaisar.World.Map.realCoord = function (coord) {
    return (500 * 500 + Number(coord)) % 500;
};

Elkaisar.World.Map.posZ = function (xCoord, yCoord) {

    var z_offset_x = (xCoord) < 0 ? -500 : (xCoord) > 499 ? 500 : 1;
    var z_offset_y = (yCoord) < 0 ? -500 : (yCoord) > 499 ? 500 : 1;

    return  500 * 500 * 500 + Math.max(this.realCoord(xCoord) + this.realCoord(yCoord)) + z_offset_y + z_offset_x;

};

Elkaisar.World.Map.getEntity = function (xCoord, yCoord) {

    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

    if (WorldUnit.isRiver(Unit.ut) || WorldUnit.isEmpty(Unit.ut) || (Unit.ut) == WUT_BUSY_UNIT) {
        return Elkaisar.GE.WorldScene.add.rectangle(Elkaisar.World.Map.posX(xCoord, yCoord), Elkaisar.World.Map.posY(xCoord, yCoord), 128, 128).setOrigin(0, 0).setDepth(0);
    } else if (WorldUnit.isWood(Unit.ut))
        return Elkaisar.GE.WorldScene.add
                .sprite(
                        Elkaisar.World.Map.posX(xCoord, yCoord),
                        Elkaisar.World.Map.posY(xCoord, yCoord),
                        Elkaisar.World.UnitTypeData[Unit.ut].tileName).setDepth(Elkaisar.World.Map.posZ(xCoord, yCoord)).setOrigin(0, 0).play(Elkaisar.World.UnitTypeData[Unit.ut].AnimKey);


    return Elkaisar.GE.WorldScene.add
            .image(
                    Elkaisar.World.Map.posX(xCoord, yCoord),
                    Elkaisar.World.Map.posY(xCoord, yCoord),
                    Elkaisar.World.UnitTypeData[Unit.ut].tileName).setDepth(Elkaisar.World.Map.posZ(xCoord, yCoord)).setOrigin(0, 0);


};




Elkaisar.World.Map.base = {x: 0, y: 0};
Elkaisar.World.Map.active = false;
Elkaisar.World.Map.dragging = false;
Elkaisar.World.Map.dragStartOn = 0;
Elkaisar.World.Map.dragStartAt = {x: 0, y: 0};
Elkaisar.World.Map.lastMouse = {x: 0, y: 0};
Elkaisar.World.Map.diff = {x: 0, y: 0};


Elkaisar.World.Map.deltaDrag = {x: 0, y: 0};



Elkaisar.World.Map.DeletUnit = function (xCoord, yCoord) {
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
    delete Unit.entite;
    delete Unit.floor;

    if ($.isArray(Unit.UnitFire)) {
        for (var iii in Unit.UnitFire) {
            Unit.UnitFire[iii].destroy();
        }
        delete(Unit.UnitFire);
    }

    if (Unit.CityFlagEntite) {
        Unit.CityFlagEntite.destroy();
        delete Unit.CityFlagEntite;
    }



};


function  addMapUnite(el) {

    var unit = Elkaisar
            .worldAllUnits
    [Elkaisar.World.Map.realCoord(el.x) * 500 + Number(Elkaisar.World.Map.realCoord(el.y))];

    if (!$.isEmptyObject(unit.entite)) {
        unit.entite.setPosition(Elkaisar.World.Map.posX(el.x, el.y), Elkaisar.World.Map.posY(el.x, el.y));
        return false;

    }




    var tile = Elkaisar.World.Map.getEntity(unit.x, unit.y);



    tile.setInteractive({
        hitArea: new Phaser.Geom.Polygon(Elkaisar.World.UnitTypeData[unit.ut].hitArea),
        hitAreaCallback: Phaser.Geom.Polygon.Contains
    })
            .on("click", function (e) {
                uniteMapClick(unit.x, unit.y);
            })
            .on("pointerover", function (P) {
                Elkaisar.GE.WorldScene.UnitFloor.setPosition(Elkaisar.World.Map.posX(el.x, el.y), Elkaisar.World.Map.posY(el.x, el.y) + TILE_SIZE / 2);

                if (tile.PointerOver)
                    return;
                tile.PointerOver = true;
                
                if (WorldUnit.isEmpty(unit.ut) || true) {
                    Elkaisar.World.WorldMapIcon.removeWorldUnitIcons();
                    Elkaisar.World.WorldMapIcon.showUnitCoords(el.x, el.y);
                    return;
                }

                WorldUtil.showMapTooltip(el.x, el.y);

            })
            .on("pointerout", function () {
                tile.PointerOver = false;
                Elkaisar.World.WorldMapIcon.removeUnitCoords();
            }).setOrigin(0, 0);

    unit.entite = tile;
    tile.setDataEnabled();
    tile.data.set("xCoord", unit.x);
    tile.data.set("yCoord", unit.y);


    return true;





}

function addMapWorldFloor(el) {

    var realX = Elkaisar.World.Map.realCoord(el.x);
    var realY = Elkaisar.World.Map.realCoord(el.y);

    var unit = WorldUnit.getWorldUnit(realX, realY);


    if (typeof unit.floor === "object" && !$.isEmptyObject(unit.floor)) {

        unit.floor.setPosition(
                Elkaisar.World.Map.posX(el.x, el.y),
                Elkaisar.World.Map.posY(el.x, el.y)
                );
        return false;
    }
    unit.floor = Elkaisar.GE.WorldScene.add.image(Elkaisar.World.Map.posX(el.x, el.y), Elkaisar.World.Map.posY(el.x, el.y), "worldFloor").setDepth(-1).setOrigin(0, 0);
    unit.floor.setDataEnabled();
    unit.floor.data.set("xCoord", realX);
    unit.floor.data.set("yCoord", realY);
    return true;
}



Elkaisar.World.Map.mouseMoveFn = function (Pointer, ObjArr) {


    var cam = Elkaisar.GE.WorldScene.cameras.main;
    if (!Pointer.isDown) {
        return;
    }


    if (Elkaisar.World.Map.dragStartOn === 0) {
        Elkaisar.World.Map.dragStartOn = Date.now();
        Elkaisar.World.Map.dragStartAt.x = cam.x;
        Elkaisar.World.Map.dragStartAt.y = cam.y;
    }
    Elkaisar.GE.WorldScene.isMapDraging = true;
    cam.scrollX -= (Pointer.x - Pointer.prevPosition.x) / cam.zoom;
    cam.scrollY -= (Pointer.y - Pointer.prevPosition.y) / cam.zoom;
    Elkaisar.World.Map.Scroll();

};


Elkaisar.World.Map.mouseUpFn = function (e) {

    Elkaisar.World.Map.clear();
    Elkaisar.World.Map.clear();
    Elkaisar.World.Map.RefreshWorld();
    Elkaisar.World.MapBattel.AddBattels();
    Elkaisar.World.Map.dragging = false;
    Elkaisar.World.Map.dragStartOn = 0;

    Elkaisar.GE.WorldScene.time.delayedCall(500, function () {
        Elkaisar.GE.WorldScene.isMapDraging = false;
    });

};



Elkaisar.World.Map.mouseDownFn = function (P) {


    if (Elkaisar.World.Map.dragging)
        return;

    Elkaisar.World.Map.base.x = Elkaisar.GE.WorldScene.cameras.main.scrollX;
    Elkaisar.World.Map.base.y = Elkaisar.GE.WorldScene.cameras.main.scrollY;
    Elkaisar.World.Map.dragging = true;



};





Elkaisar.World.Map.Scroll = function (Force) {

    var viewport = {
        x: Elkaisar.GE.WorldScene.cameras.main.scrollX,
        y: Elkaisar.GE.WorldScene.cameras.main.scrollY
    };



    if (Math.abs(viewport.x - Elkaisar.World.Map.base.x) >= 50 || Math.abs(viewport.y - Elkaisar.World.Map.base.y) >= 50 || Force) {

        var FloorCount = 0;
        var UnitCount = 0;

        Elkaisar.World.Map.base.x = viewport.x;
        Elkaisar.World.Map.base.y = viewport.y;

        var xCoord = Elkaisar.World.Map.xCoord(viewport.x, viewport.y) - 2;
        var yCoord = Elkaisar.World.Map.yCoord(viewport.x, viewport.y);
        var widthInTile = Elkaisar.World.Map.widthInTile() + 4;
        var heightInTile = Elkaisar.World.Map.heightInTile() + 4;
        console.log("Coord ", xCoord, yCoord);

        var vvv = 0;
        var kkk = 0;

        for (; vvv <= heightInTile; vvv++) {
            for (; kkk <= widthInTile; kkk++) {

                UnitCount += addMapUnite({x: xCoord + vvv + kkk, y: yCoord + vvv - kkk});
                UnitCount += addMapUnite({x: xCoord + vvv + kkk + 1, y: yCoord + vvv - kkk});

            }
            kkk = 0;
        }




        var floorXStart = Math.round(xCoord / 10) * 10 - 20;
        var floorYStart = Math.round(yCoord / 10) * 10 - 10;
        var iii = 0;
        var jjj = 0;

        for (; iii <= heightInTile + 20; iii += 10) {
            for (; jjj <= widthInTile + 10; jjj += 10) {


                FloorCount += addMapWorldFloor({x: floorXStart + iii + jjj, y: floorYStart + iii - jjj});
                FloorCount += addMapWorldFloor({x: floorXStart + iii + jjj + 10, y: floorYStart + iii - jjj});

            }
            jjj = 0;
        }
    }


};



Elkaisar.World.Map.RefreshWorld = function () {
    Animation.cityFlag();
    Animation.cityColonizerFlag();
    Animation.WorldFire();
};

Elkaisar.World.Map.clear = function () {


    if (Elkaisar.GE.WorldScene.children.list.length < 500)
        return;

    var R = Elkaisar.World.getRectView();
    Elkaisar.GE.WorldScene.children.list.forEach(function (Obj, Index) {
        if (!Phaser.Geom.Rectangle.Overlaps(Obj.getBounds(), R)) {
            if (Obj.data)
                Elkaisar.World.Map.DeletUnit(Obj.data.get("xCoord"), Obj.data.get("yCoord"));

            Obj.destroy();
        }
    });

};

Elkaisar.World.Map.CityFound = false;

Elkaisar.World.Map.getWorldCity = function () {
    
    return $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/AWorld/getWorldCity`,
        type: 'GET',
        crossDomain: true,
        data:{
            token: Elkaisar.Config.OuthToken,
            idPlayer: Elkaisar.DPlayer.Player.id_player
        },
        success: function (data, textStatus, jqXHR) {
           
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            console.log(data)
            var JsonObject = JSON.parse(data);
            console.log(JsonObject)
            var Unit;
            for (var iii in JsonObject)
            {

                Unit = WorldUnit.getWorldUnit(JsonObject[iii].x, JsonObject[iii].y);
                if (!Unit)
                    continue;


                Unit.idGuild = JsonObject[iii].ig;
                Unit.CityLvl = JsonObject[iii].l;
                Unit.idCity = JsonObject[iii].ic;
                Unit.idPlayer = JsonObject[iii].ip;
                Unit.CityFlag = JsonObject[iii].f;
                Unit.ut = Number(JsonObject[iii].l) + WUT_CITY_LVL_0;
                Unit.l = JsonObject[iii].l;
                Unit.t = Number(JsonObject[iii].l) + 17;
                Elkaisar.World.Map.CityFound = true;
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(arguments)
        }
    });

    /*
     
     ws.send(JSON.stringify({
     url: "World/getWorldCity"
     }));*/


};

Elkaisar.World.Map.getWorldCityColonized = function () {

    ws.send(JSON.stringify({
        url: "World/getWorldCityColonized"
    }));
};

Elkaisar.World.Map.getWorldFiredUnit = function () {

    ws.send(JSON.stringify({
        url: "World/getWorldFireUnit"
    }));
};