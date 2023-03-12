
function t(x_coord, y_coord)
{
}


Elkaisar.World.Map.OnEmptyUnitClick = function (Unit) {


    var city_counts = Object.keys(Elkaisar.DPlayer.City).length;

    var box = ` <div id="unit_review" class="bg-general" x_coord="${Unit.x}" y_coord="${Unit.y}" type="0" lvl="${Unit.l}">
                        <div class="header">
                            <div class="title banner-red">
                                مكان خالى
                            </div>
                            <div class="close_RB">
                                <img src="images/btns/close_b.png">.
                            </div>
                        </div>
                        <div class="content">
                            <div class="right_cont">
                                <div class="dist">
                                    <div class="coords" style="margin-right: 37px">
                                        <a href="#">[${Unit.y} , ${Unit.x}]</a>
                                    </div>
                                    <div class="mile">
                                        ${getDistance(Unit.x, Unit.y)} ميل
                                    </div>
                                    <div class="copy-coord-icon">
                                        <button class="copy-coord" data-x-coord="${Unit.x}" data-y-coord="${Unit.y}"></button>
                                    </div>
                                </div>
                                <div class="new-city-req-table">
                                    <table class="req_table " border="0"> 
                                        <tbody> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/food.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.food) < Math.pow(10, city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10, city_counts + 3)} 
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/stone.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.stone) < Math.pow(10, city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10, city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                            </tr> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/wood.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.wood) < Math.pow(10, city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10, city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/iron.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.metal) < Math.pow(10, city_counts + 3) ? "not_enough" : "enough"} "> 
                                                        ${Math.pow(10, city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                            </tr> 
                                            <tr> 
                                                <td> 
                                                    <img src="images/style/coin.png"> 
                                                    <div class="amount ${Number(Elkaisar.CurrentCity.City.coin) < Math.pow(10, city_counts + 3) ? "not_enough" : "enough"}"> 
                                                        ${Math.pow(10, city_counts + 3)}  
                                                    </div> 
                                                </td> 
                                                <td> 
                                                    <img src="images/style/wait.png"> 
                                                    <div class="amount sol-people"> 
                                                        0 ث
                                                    </div> 
                                                </td> 
                                            </tr> 
                                        </tbody> 
                                    </table> 
                                    
                                    <div class="province">${Translate.Text.Province[UserLag.language]}: ${Elkaisar.World.Province.getTitle(Unit.x, Unit.y)}</div>
                                    
                                </div>
                            </div>
                            <div class="left_cont">
                                <div class="unite_image">
                                    <div style="background-image:url(images/world/snap-shot/empty-place.jpg)"></div>
                                </div>
                                <div class="required-prom">
                                    <label>تصنيف لنبيل:</label><span class="${Number(Elkaisar.DPlayer.Player.porm) < city_counts * 2 ? "not_enough" : "enough" }">${Elkaisar.BaseData.Promotion[city_counts * 2].Title}</span>
                                </div>
                            </div>
                        </div>
                        <div class="footer  new-city-footer">
                            <ul>
                                <div class="inputs">
                                    <div class="input-wrapper pull-L">
                                        <input id="new-city-name" ${canBuildNewCity(Unit.x, Unit.y) ? "" : "disabled='disabled'"} type="text" class="input" placeholder="اسم المدينة الجديدة"/>
                                    </div>
                                    <div  id="new-city-confirm" class="pull-R">
                                        <button class="full-btn-3x" ${canBuildNewCity(Unit.x, Unit.y) ? "" : "disabled='disabled'"} data-x-coord="${Unit.x}" data-y-coord="${Unit.y}"> بناء مدينة</button>
                                    </div>
                                </div>
                            </ul>

                        </div>
                    </div>`;

    $("#unit_review").remove();
    $("body").append(box);



};

Elkaisar.World.Map.onBarrayClicked = function (Unit) {
    var unitObj = getUnitObj(Unit.ut);
    var title = `${Elkaisar.World.UnitTypeData[Unit.ut].Title}  مستوى ${getArabicNumbers(Unit.l)}`;
    var desc = reviewBox.descForBarray(Unit.ut, Unit.l);
    var box = reviewBox.getSmallBox(Unit.x, Unit.y, Unit.ut, title, desc, Unit.l, Unit.s, `images/world/snap-shot/${Elkaisar.World.UnitTypeData[Unit.ut].WSnapShoot}`);
    $("#unit_review").remove();
    $("body").append(box);
    addRemainBarryData(Unit.x, Unit.y);
};



Elkaisar.World.Map.OnSeaCityClicked = function (Unit) {
    var Box = reviewBox.getSmallBox(Unit.x, Unit.y, Unit.ut, Elkaisar.World.UnitTypeData[Unit.ut].Title, Elkaisar.World.UnitTypeData[Unit.ut].Desc, Unit.l, Unit.s, 'images/world/snap-shot/' + Elkaisar.World.UnitTypeData[Unit.ut].WSnapShoot);
    $('#unit_review')['remove'](), $('body')['append'](Box);
};

Elkaisar.World.Map.OnCityClicked = function (Unit) {

    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/AWorld/getCityData`,
        data: {
            xCoord: Unit.x,
            yCoord: Unit.y,
            server: Elkaisar.Config.idServer,
            token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (!Elkaisar.LBase.isJson(data))
                return  Elkaisar.LBase.Error(data);
            var JsonData = JSON.parse(data);


            var desc = reviewBox.descForCity(JsonData);

            var box = reviewBox.getSmallBox(Unit.x, Unit.y,
                    Unit.ut, JsonData.CityName, desc, Unit.l,
                    Unit.s, PLAYER_FACES[JsonData.avatar]);

            $("#unit_review").remove();
            $("body").append(box);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    });

};

Elkaisar.World.Map.OnOtherUnitClicked = function (Unit) {
    
    campDB.showDialogBox(Unit.x, Unit.y);
    $("#camp-over-view-desc").niceScroll(SCROLL_BAR_PROP);

    WorldUnit.refreshUnitData(Unit.x, Unit.y).done(function (data) {

        if (isJson(data)) {
            var jsonData = JSON.parse(data);
            Unit.l = jsonData.l;
        } else {
            Elkaisar.LBase.Error(data);
            return;
        }
        campDB.equipRow(jsonData.equip);
        campDB.armyRow(jsonData.hero);

        $('#lvlChangableUnit')['html'](campDB['armyContainer'](Unit.x, Unit.y));

        if (Number(jsonData.l) > Elkaisar.World.UnitTypeData[Unit.ut].maxLvl) {
            return;
        } else if (!Elkaisar.World.UnitData.isAttackable(Unit.ut)) {
            return;
        } else if (Number(jsonData.lo) === 1) {
            return;
        } else {
            $("#JOIN_ATTACK").removeAttr("disabled");
            $("#START_ATTACK").removeAttr("disabled");
        }




    });
}

Elkaisar.World.MapBattel = {};







Elkaisar.World.MapBattel.BattelList = {};


Elkaisar.World.MapBattel.getAllBattels = function () {
    WS_utile.Ack({
        url: "Battel/getAllWorldBattels",
        data: {},
        callBack: function (Res) {
            if(Res && Res.length)
                Elkaisar.World.MapBattel.BattelList = Res;
            else 
                Elkaisar.World.MapBattel.BattelList = [];
            
            console.log(Res);
        }
    });
};


Elkaisar.World.MapBattel.removeBattel = function (Battel) {
    const BattelKey = `${Battel.xCity}.${Battel.yCity}-${Battel.xCoord}.${Battel.yCoord}`;
    
    if (Elkaisar.World.MapBattel.BattelList[BattelKey].Line)
        Elkaisar.World.MapBattel.BattelList[BattelKey].Line.destroy();
    if (Elkaisar.World.MapBattel.BattelList[BattelKey].GoSourceBtn)
        Elkaisar.World.MapBattel.BattelList[BattelKey].GoSourceBtn.destroy();
    if (Elkaisar.World.MapBattel.BattelList[BattelKey].GoDistBtn)
        Elkaisar.World.MapBattel.BattelList[BattelKey].GoDistBtn.destroy();
    if (Elkaisar.World.MapBattel.BattelList[BattelKey].GoHeroAvatarBtn)
        Elkaisar.World.MapBattel.BattelList[BattelKey].GoHeroAvatarBtn.destroy();
    if (Elkaisar.World.MapBattel.BattelList[BattelKey].TimeElapsed)
        Elkaisar.World.MapBattel.BattelList[BattelKey].TimeElapsed.destroy();
    
    delete Elkaisar.World.MapBattel.BattelList[BattelKey];
};


Elkaisar.World.MapBattel.LineColor = function (OneBattel) {
    var LineKey = "DashedLineGray";
    if (OneBattel.idPlayer == Elkaisar.DPlayer.Player.id_player)
        LineKey = "DashedLineBlue";
    else if (!OneBattel.idGuild || !Elkaisar.Guild.GuildData)
        LineKey = "DashedLineGray";
    else if (OneBattel.idGuild == Elkaisar.DPlayer.Player.id_guild)
        LineKey = "DashedLineLGreen";
    else {
        for (var jjj in Elkaisar.Guild.Allay) {
            if (Number(Elkaisar.Guild.Allay[jjj].idGuild) === Number(OneBattel.idGuild)) {

                if (Number(Elkaisar.Guild.Allay[jjj].state) === 1) {
                    LineKey = "DashedLineRed";

                } else if (Number(Elkaisar.Guild.Allay[jjj].state) === 2) {
                    LineKey = "DashedLineGreen";
                }
            }
        }
    }

    return LineKey;
};

Elkaisar.World.MapBattel.AddBattels = function () {


    var OneBattel;
    for (var iii in Elkaisar.World.MapBattel.BattelList) {

        OneBattel = Elkaisar.World.MapBattel.BattelList[iii];
        if (OneBattel.Line)
            continue;
        if (OneBattel.timeEnd < Date.now() / 1000) {
            Elkaisar.World.MapBattel.removeBattel(OneBattel);
            continue;
        }

        let x1 = Elkaisar.World.Map.posX(OneBattel.xCity, OneBattel.yCity) + 64;
        let y1 = Elkaisar.World.Map.posY(OneBattel.xCity, OneBattel.yCity) + 64;
        let x2 = Elkaisar.World.Map.posX(OneBattel.xCoord, OneBattel.yCoord) + 64;
        let y2 = Elkaisar.World.Map.posY(OneBattel.xCoord, OneBattel.yCoord) + 64;

        if (!Phaser.Geom.Intersects.LineToRectangle(new Phaser.Geom.Line(x1, y1, x2, y2), Elkaisar.World.getRectView()))
            continue;



        Elkaisar.World.MapBattel.BattelLine(OneBattel, x1, y1, x2, y2);


    }
};


Elkaisar.World.MapBattel.BattelLine = function (OneBattel, x1, y1, x2, y2) {


    const LineWidth = Phaser.Math.Distance.Between(x1, y1, x2, y2);
    const LineAngle = Phaser.Math.Angle.Between(x1, y1, x2, y2);
    OneBattel.Line = Elkaisar.GE.WorldScene.add.tileSprite(x1, y1, LineWidth, 4, this.LineColor(OneBattel)).setDepth(Elkaisar.World.Map.posZ(255, 255))
            .setInteractive({cursor: 'pointer'});
    OneBattel.Line.input.hitArea.setTo(0, -4, LineWidth, 12);
    OneBattel.Line.setOrigin(0, 0);
    OneBattel.Line.setRotation(LineAngle);
    OneBattel.Line.on("destroy", function () {
        delete OneBattel.Line;
    });
    this.BattelLineOver(OneBattel, x1, y1, x2, y2);

    OneBattel.Line.on("pointerup", function (P, X, Y, E) {
        Elkaisar.World.WorldMapIcon.removeWorldUnitIcons();
        Elkaisar.World.WorldMapIcon.removeUnitCoords();
        Elkaisar.GE.WorldScene.tweens.add({
            targets: OneBattel.GoSourceBtn,
            x: x1 + (X - 60) * Math.cos(LineAngle) - 25*Math.cos(Math.PI/2 - LineAngle),
            y: y1 + (X - 60) * Math.sin(LineAngle) + 25*Math.sin(Math.PI/2 - LineAngle),
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 600
        });
        Elkaisar.GE.WorldScene.tweens.add({
            targets: OneBattel.GoDistBtn,
            x: x1 + (X + 60)  * Math.cos(LineAngle) - 25*Math.cos(Math.PI/2 - LineAngle),
            y: y1 + (X + 60)  * Math.sin(LineAngle) + 25*Math.sin(Math.PI/2 - LineAngle),
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 600
        });
        Elkaisar.GE.WorldScene.tweens.add({
            targets: OneBattel.GoHeroAvatarBtn,
            x: x1 + (X)  * Math.cos(LineAngle) - 25*Math.cos(Math.PI/2 - LineAngle),
            y: y1 + (X)  * Math.sin(LineAngle) + 25*Math.sin(Math.PI/2 - LineAngle),
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 600
        });
        Elkaisar.GE.WorldScene.tweens.add({
            targets: OneBattel.TimeElapsed,
            x: x1 + (X)  * Math.cos(LineAngle) - 50*Math.cos(Math.PI/2 - LineAngle),
            y: y1 + (X)  * Math.sin(LineAngle) + 50*Math.sin(Math.PI/2 - LineAngle),
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 600
        });
        E.stopPropagation();
    });

    
};
Elkaisar.World.MapBattel.changeTimeFormat = function (time_diff) {
    if (isNaN(time_diff))
        return "---";
    time_diff = parseInt(time_diff);
    var days = Math.floor(time_diff / (60 * 60 * 24));
    var hours = Math.floor((time_diff % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((time_diff % (60 * 60)) / (60));
    var seconds = Math.floor((time_diff % (60)) / 1);
    return ` ث ${seconds} د ${minutes} س ${hours} ي ${days} `;
    return (getArabicNumbers(seconds) + " ث " + (minutes > 0 ? getArabicNumbers(minutes)
            + " د " : "") + (hours > 0 ? getArabicNumbers(hours)
            + " س " : "") + (days > 0 ? getArabicNumbers(days)
            + " ي " : ""));
}

Elkaisar.World.MapBattel.BattelLineOver = function (OneBattel, x1, y1, x2, y2){

    const LineAngle = Phaser.Math.Angle.Between(x1, y1, x2, y2);
    OneBattel.GoSourceBtn     = Elkaisar.GE.WorldScene.add.image(x1, y1, "goSourceN").setDepth(Elkaisar.World.Map.posZ(255, 255)).setRotation(LineAngle);
    OneBattel.GoHeroAvatarBtn = Elkaisar.GE.WorldScene.add.image(x1, y1, "SFaceA1").setDepth(Elkaisar.World.Map.posZ(255, 255)).setRotation(LineAngle);
    OneBattel.TimeElapsed     = Elkaisar.GE.WorldScene.add.text(x1, y1, `${this.changeTimeFormat(OneBattel.timeEnd - Date.now()/1000)}`, 
                                    {fixedHeight: 20, fontStyle: "bold", fontSize: 14, stroke: '#000000', strokeThickness: 3, backgroundColor: "#000000"})
                                            .setDepth(Elkaisar.World.Map.posZ(255, 255)).setOrigin(0.5, 0.5).setRotation(LineAngle);
    OneBattel.GoDistBtn       = Elkaisar.GE.WorldScene.add.image(x1, y1, "goSourceN").setDepth(Elkaisar.World.Map.posZ(255, 255)).setRotation(LineAngle).setFlipX(true);

    OneBattel.GoSourceBtn.setInteractive().on("pointerover", function (P){
        if(P.isDown)
            OneBattel.GoSourceBtn.setTexture("goSourceA");
        else
            OneBattel.GoSourceBtn.setTexture("goSourceH");
    }).on("pointerout", function (P){
            OneBattel.GoSourceBtn.setTexture("goSourceN");
    }).on("pointerup", function (){
        alert_box.confirmDialog("تأكيد الذهاب الى مصدر الهجوم", function (){
            Elkaisar.World.navigateTo(OneBattel.xCity, OneBattel.yCity);
        });
    });
    
    OneBattel.GoDistBtn.setInteractive().on("pointerover", function (P){
        if(P.isDown)
            OneBattel.GoDistBtn.setTexture("goSourceA");
        else
            OneBattel.GoDistBtn.setTexture("goSourceH");
    }).on("pointerout", function (P){
            OneBattel.GoDistBtn.setTexture("goSourceN");
    }).on("pointerup", function (){
        alert_box.confirmDialog("تأكيد الذهاب الى جهة الهجوم", function (){
            Elkaisar.World.navigateTo(OneBattel.xCoord, OneBattel.yCoord);
        });
    });
    
    
    OneBattel.GoHeroAvatarBtn.setInteractive().on("click", function (){
        alert_box.confirmMessage("Clicked")
    })
   
};


Elkaisar.World.MapBattel.newBattel = function (Battel) {
    const BattelKey = `${Battel.xCity}.${Battel.yCity}-${Battel.xCoord}.${Battel.yCoord}`;
    Elkaisar.World.MapBattel.BattelList[BattelKey] = Battel;
    Elkaisar.World.MapBattel.AddBattels();


};


Elkaisar.World.MapBattel.battelEnded = function (Battel) {

};