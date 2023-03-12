const BattelFieldNavBar =[
    {
        "txt": "أرض المعركة",
        "title":"battelField"
    }
];

var BattelField = {};
BattelField.SIDE_ATTACK = 1;
BattelField.SIDE_DEFENCE = 0;

BattelField.battelList = [];

BattelField.battelField = function (battel , currentBattels){
    
    var list = BattelField.getBattelHeaders(BattelField.battelList, battel.id_battel, false);
    
    var selectedBattel;
    
    if(!currentBattels){
        
       BattelField
               .getBattelForWorldUnit(battel.x_coord , battel.y_coord)
               .done(function (data){
                   
                    if(!isJson(data)){
                        Elkaisar.LBase.Error(data);
                        return ;
                    }
                        
                    console.log(BattelField.battelList)
                    
                    BattelField.addToWatchList(battel.x_coord , battel.y_coord);
                    
                    
                        
                    var stop = Math.max(13 , BattelField.battelList.length);
                    list = "";

                    
                    list = BattelField.getBattelHeaders(BattelField.battelList, 0, false);
                    
                    selectedBattel = BattelField.battelList.length > 0 ? BattelField.battelList[0] : undefined;
                    
                    BattelField.battelModel(selectedBattel , list);
                    
               });
        
    }else if($.isArray(currentBattels)){
    
        selectedBattel = currentBattels.length > 0 ? currentBattels[0] : undefined;
        
       
        
        list = "";
        list += this.getBattelHeaders(currentBattels, battel.id_battel, true);
        
    }
    
    
    
    
    
    if(battel.totalBox){
        
        var box = menu_bar.dialogBox(Translate.Title.MenuList.Report[UserLag.language], battel.navBar, `<div class="box_content"></div>`, 0 );
        
        dialogBoxShow(box , function (){
            
            $("#dialg_box").attr("data-box-for" , "battelField");
            $("#dialg_box").attr("data-x-coord" , battel.x_coord);
            $("#dialg_box").attr("data-y-coord" , battel.y_coord);
            BattelField.battelModel(selectedBattel , list);
            
        }); 
    }
    
    this.battelModel(selectedBattel , list);
   
    
};

BattelField.battelModel = function (battel , list){
    

    var leftTime     = "";  // الوقت المتبقى
    var startTime    = ""; //
    var defenceTitle = "";
    var attackTitle  = "";
    var idBattel     = "";
    var x_coord      = "";
    var y_coord      = "";
    var defenceNum   = "";
    var attackNum    = "";
    var hasBattel    = false;
    
    if(typeof battel === "object"){
        
        var d        = new Date(battel.time_start*1000);
        leftTime     = `<span  class="time_counter" time-end="${battel.time_end}"> ${changeTimeFormat(battel.time_end - (Date.now()/1000))} </span>`;  // الوقت المتبقى
        startTime    = `<span>${(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM")}</span>`; //
        defenceTitle = WorldUtil.tooltipHeader(x_coord , y_coord) ;
        attackTitle  = battel.CityName;
        idBattel     = battel.id_battel;
        x_coord      = battel.x_coord;
        y_coord      = battel.y_coord;
        attackNum    = battel.attackNum;
        defenceNum   = battel.defenceNum;
        hasBattel    = true;
    }
    
    
    var battelList = `<div class="box_content for_report">
                        <div class="left-content " id="reports_list">
                            <div class="th ellipsis">${Translate.Title.TH.Subject[UserLag.language]}</div>
                            <div id="AllBattelLists">
                                ${list}
                            </div>
                        </div>
                        <div class="right-content ">
                            <div class="rest-time">
                                <h6> الوقت المتبقى: </h6>
                                <span>
                                    ${leftTime}
                                </span>
                            </div>
                            <div class="report_state">
                                <div class="defense-side">
                                    <div class="banner-red">
                                        ${defenceTitle}
                                    </div>
                                    <div class="image">
                                        <div class="wrapper">
                                            <div class="bg-image" style="background-image:url(images/style/defense.png) ; "></div>
                                        </div>

                                        <div class="joined-num">${defenceNum}</div>
                                    </div>
                                    <button class="full-btn btn-green-2x" id="JOIN_DEFENCE_SIDE" 
                                        data-id-battel="${idBattel}" 
                                        data-x_coord="${x_coord}" data-y_coord="${y_coord}" 
                                        data-title="" ${!hasBattel ? 'disabled="disabled"' : ""}>
                                       ${Translate.Button.General.JoinDefence[UserLag.language]}
                                    </button>
                                </div>
                                <div class="attack-side">
                                    <div class="banner-red">
                                        ${attackTitle}
                                    </div>
                                    <div class="image">
                                        <div class="wrapper">
                                            <div class="bg-image" style="background-image:url(images/style/attack.png); "></div>
                                        </div>
                                        <div class="joined-num">${attackNum}</div>
                                    </div>
                                    <button class="full-btn btn-red-2x" id="JOIN_ATTACK_SIDE" data-id-battel="${idBattel}" 
                                        data-x_coord="${x_coord}" data-y_coord="${y_coord}" 
                                        data-title="" ${!hasBattel ? 'disabled="disabled"' : ""}>
                                        ${Translate.Button.General.JoinAttack[UserLag.language]}
                                    </button>
                                </div>
                            </div>
                            <div class="down_report">
                                <div class="reload">
                                    <button class="full-btn  btn-yellow-2x ellipsis">
                                        ${Translate.Button.MenuList.Intelligence[UserLag.language]}
                                    </button>
                                    <button class="full-btn  btn-yellow-2x ellipsis" id="REFRESH_BATTEL_DATA" data-id-battel="">
                                        ${Translate.Button.MenuList.RefreshHero[UserLag.language]} 
                                    </button>
                                </div>
                                <div class="time_start">
                                    وقت البداء: ${startTime}

                                </div>
                            </div>
                        </div>
                    </div>`;
    $(".box_content").replaceWith(battelList);
    
    if($("#reports_list .selected").length < 1){
        $("#reports_list .has_battel:first").addClass("selected");
    }
    
    $("#reports_list").niceScroll(SCROLL_BAR_PROP);
};



BattelField.getBattelHeaders = function (battels , selectedBattelId, myBattels){
    
    var stop = Math.max(13 , battels.length);
    var list = "";
    
    for(var iii =0; iii < stop; iii++){
        
        if(battels[iii]){
            list +=  `
                        <div class="tr has_battel ${Number(selectedBattelId) === Number(battels[iii].id_battel) ? "selected" : ""}" 
                            data-id-battel="${battels[iii].id_battel}" data-my-battel="${myBattels}" >
                                        قام الملك ${battels[iii].PlayerName} بانشاء  معركة على ( ${getArabicNumbers(battels[iii].y_coord)} , ${getArabicNumbers(battels[iii].x_coord)})  من المدينة  ${battels[iii].CityName}
                                    </div>`;  
        }else{
            list += `<div class="tr"></div>`;
        }
        
    }
    
    return list;
    
    
    
};



BattelField.getBattelForWorldUnit = function (x_coord, y_coord){
  
        return $.ajax({

                    url: `${Elkaisar.Config.NodeUrl}/api/ABattelRunning/getUnitBattel`,
                    data:{
                        xCoord:x_coord,
                        yCoord: y_coord,
                        token: Elkaisar.Config.OuthToken,
                        server: Elkaisar.Config.idServer
                    },
                    type: 'GET',
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        
                        if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                        var jsonData = JSON.parse(data);
                        
                        BattelField.battelList = jsonData;
                        
                        console.log(BattelField.battelList);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }

                });
    
};



$(document).on("click" , "#AllBattelLists .has_battel" , function (){
   
    
    var idBattel = Number($(this).attr("data-id-battel"));
    var myBattel = isJson($(this).attr("data-my-battel")) ? JSON.parse($(this).attr("data-my-battel")) : false;
    
    var battelList = [];
    
    if(myBattel)
        battelList = Elkaisar.Battel.Battels;
    else
        battelList = BattelField.battelList;
    
    var selectedBattel;
    
    
    
    for (var iii in battelList){
        
        if(Number(battelList[iii].id_battel) === idBattel){
            selectedBattel = battelList[iii];
        }
        
    }
    
    var list = BattelField.getBattelHeaders(battelList ,selectedBattel.id_battel ,myBattel );
    BattelField.battelModel(selectedBattel , list);
    
});



BattelField.addToWatchList = function (x_coord , y_coord){
    return;
    ws.send(
            JSON.stringify(
                {
                    url:"WS_BattelWatchList/addPlayer",
                    data:{
                        id_player:Elkaisar.DPlayer.Player.id_player,
                        x_coord:x_coord,
                        y_coord:y_coord,
                        token:Elkaisar.Config.OuthToken
                    }
                    
                }
            )
        );
    
};

BattelField.removeFromWatchList = function (x_coord , y_coord){
    
   /* ws.send(
        JSON.stringify(
            {
                url:"WS_BattelWatchList/removePlayer",
                data:{
                    id_player:Elkaisar.DPlayer.Player.id_player,
                    x_coord:x_coord,
                    y_coord:y_coord,
                    token:Elkaisar.Config.OuthToken
                }
                
            }
        )
    );*/
    
};

BattelField.getBattel = function (id_battel){
    
    
    
    for (var iii in Elkaisar.Battel.Battels){
        if(Number(Elkaisar.Battel.Battels[iii].id_battel) === Number(id_battel)){
            
            return Elkaisar.Battel.Battels[iii];
            
        }
    }
    
    for (var iii in this.battelList){
        if(Number(this.battelList[iii].id_battel) === Number(id_battel)){
            
            return this.battelList[iii];
            
        }
    }
    return null;
};