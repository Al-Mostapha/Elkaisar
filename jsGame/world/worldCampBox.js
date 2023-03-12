var campDB = {
    
    
    
    showDialogBox: function (x_coord , y_coord){
        
        var unit     = WorldUnit.getWorldUnit(x_coord , y_coord);
        var lvl      = unit.l;
        var type     = unit.ut;
        var now_date = new Date();
        
       
        
        var box = ` <div id="dialg_box" class="world" style="top: -500px;">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png">
                            <div class="title">${Elkaisar.World.UnitTypeData[type].Title}</div>
                        </div>
                        <div class="nav_bar">
                            <div class="right-nav">
                                <div class="nav_icon">
                                    <img class="close_dialog" src="images/btns/close_b.png" style="float: right; margin-right: 15px; margin-top: 20px">
                                </div>
                            </div>   
                        </div>
                        <div class="box_content camps">
                            ${this.left_content(x_coord , y_coord)}
                            <div class="right-content  camps">
                                ${this.overview(x_coord , y_coord)}
                                <div class="th ellipsis">
                                    استخبارات المدينة
                                </div>
                                ${this.armyContainer(x_coord, y_coord)}
                            </div>
                            <div id="camp-panal-equip-row" class="footer camp-equip flex"></div>
                        </div>
                    </div>`;
        
        if($("#dialg_box").length === 0){
            $("body").append(box );
            $("#dialg_box").animate({top:"150px"}, 200);
            campDB.equipRow([]);
       }else {
            $("#dialg_box").remove(function (){
                $("body").append(box );
                $("#dialg_box").animate({top:"150px"}, 200);
                campDB.equipRow([]);
            });              
       }
    },
    
    armyContainer: function (x_coord , y_coord){
        
        var unit   = WorldUnit.getWorldUnit(x_coord, y_coord);
        var lvl    = unit.l;
        var type   = unit.ut;
        
        
        if(WorldUnit.isArmyCapital(type) 
                || WorldUnit.isArenaChallange(type)
                || WorldUnit.isArenaDeath(type)              
                || WorldUnit.isQueenCity(type)               
                ){
            WorldUnit.WorldUnitRank(x_coord , y_coord);
            return `<div class="unit-with-rank">
                        <div class="army-col">
                            <ul>
                                <li>
                                    <div class="image" style="background-image: url(images/tech/soldier_3.jpg)"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="rank-list">
                          
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width:20%">التصنيف</div>
                                <div class="td_1 font-2" style="width: 30%">الملك</div>
                                <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 20%">المدة</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/1st.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/2nd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/3rd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/4th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                    <div class="rank-image" style="background-image: url(images/number/5th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                        </div>
                    </div>`;
        }else if( WorldUnit.isRepelCastle(type) ){
            campDB.getQueAttackList(x_coord, y_coord);
            return `<div class="unit-with-rank">
                        <div class="rank-list">
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 30%">وقت البداء</div>
                                <div class="td_1 font-2" style="width: 30%">وقت الانتهاء</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1" style="width: 30%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                                <div class="td_1 rtl font-2"  style="width: 20%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 20%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                        </div>
                    </div>`;
        }
        else if( WorldUnit.isArenaGuild(type) ){
            WorldUnit.WorldUnitRank(x_coord , y_coord);
            return `<div class="unit-with-rank">
                        <div class="army-col">
                            <ul>
                                <li>
                                    <div class="image" style="background-image: url(images/tech/soldier_3.jpg)"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="rank-list">
                          
                            <div class="inner_nav">
                                <div class="td_1 font-2" style="width: 30%">التصنيف</div>
                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                <div class="td_1 font-2" style="width: 30%">المدة</div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/1st.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/2nd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1"  style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/3rd.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/4th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                            <div class="tr">
                                <div class="td_1" style="width: 30%">
                                    <div class="rank-image" style="background-image: url(images/number/5th.png)"></div>
                                </div>
                                <div class="td_1" style="width: 40%"></div>
                                <div class="td_1 rtl font-2"  style="width: 30%"></div>
                            </div>
                        </div>
                    </div>`;
        }
        
        var renew_time = Elkaisar.World.UnitData[unit.t].timeNextRest().getTime();
        return `<div class="camp-data">
                    <div class="left pull-L blue-ribbon">
                        <table id="camp-army-table">
                            <tr>
                                <td>
                                    <img src="images/tech/soldier_1.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_a"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type , lvl ,"army_a") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_2.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_b"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_b") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_3.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_c"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_c") : "0"}
                                    </h1>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <img src="images/tech/soldier_4.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_d"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_d") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_5.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_e"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_e") : "0"}
                                    </h1>
                                </td>
                                <td>
                                    <img src="images/tech/soldier_6.jpg"/>
                                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(this.getArmyAmountForUnit(type ,lvl ,"army_f"))}">
                                        ${lvl <= Elkaisar.World.UnitTypeData[type].maxLvl ? this.getArmyAmountForUnit(type ,lvl ,"army_f") : "0"}
                                    </h1>
                                </td>

                            </tr>

                        </table>
                    </div>
                    <div class="right pull-R">
                        <div class="refresh_time">
                            <div class="pull-R" >
                                <h1>وقت اعادة التعيين</h1>
                                <h2 class="time_counter  rtl attack_time_reset"  time-end="${renew_time/1000}"></h2>
                            </div>
                            <div class="pull-L">
                                <h1>المستوى</h1>
                                <h3><span>${Math.min(lvl , Elkaisar.World.UnitTypeData[type].maxLvl)}/</span>${Elkaisar.World.UnitTypeData[type].maxLvl}</h3>
                            </div>
                        </div>
                        <table border="1">
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].heroLvl ? Elkaisar.World.UnitTypeData[type].heroLvl :getArabicNumbers(5+(lvl*5))}</td>
                                <td>مستوى البطل</td>
                            </tr>
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].heroNum ? Elkaisar.World.UnitTypeData[type].heroNum : getArabicNumbers( lvl%10 === 0? 3 : 1)}</td>
                                <td>عدد الابطال</td>
                            </tr>
                            <tr>
                                <td>${Elkaisar.World.UnitTypeData[type].techLvl ? Elkaisar.World.UnitTypeData[type].techLvl :  getArabicNumbers(Math.floor(lvl/10)*2+2)}</td>
                                <td>مستوى الدراسة</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
        
    },
    
    overview: function (x_coord , y_coord){
        var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
        var type = unit.ut;
        var list = `<ul>`;
        
        list += WorldUnit.prize.prizeAllLvlsList(x_coord, y_coord);
            
        list += `</ul>`;
        
        var ov = `<div class="overview" >
                        <div class="th ellipsis">
                            نظرة عامة
                        </div>
                        <div  class="wrapper" style=" height: 80%">
                            <p id="camp-over-view-desc"  style=" outline: currentcolor none medium;" tabindex="4">
                                ${Elkaisar.World.UnitTypeData[type].Desc}
                           </p>
                            <div class="image pull-R" id="camp-prize">
                             ${list}
                            </div>
                        </div>
                    </div>`;
        return ov;
    },
    left_content: function (x_coord , y_coord){
      
        var unit = WorldUnit.getWorldUnit(x_coord, y_coord);
        var type = unit.ut;
        var lvl  = unit.l;
        var title = Elkaisar.World.UnitTypeData[type].Title;
        
        var left_content = `<div class="left-content ">
                                <table border="1" class="camp_review">
                                    <tr>
                                        <td rowspan="4" class="camp_snap_shot" style="background: url(images/background/frame.png) 100% 80%">
                                            <img src="images/world/snap-shot/${Elkaisar.World.UnitTypeData[type].WSnapShoot}"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="reviewUnitBoxName" colspan="2">
                                            ${title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div class="coord-txt">[${getArabicNumbers(x_coord)},${getArabicNumbers(y_coord)}]</div>
                                            <div class="copy-coord-icon">
                                                <button class="copy-coord" data-x-coord="${x_coord}" data-y-coord="${y_coord}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>${Translate.Text.Province[UserLag.language]}</td>
                                        <td>${Elkaisar.World.Province.getTitle(x_coord , y_coord)}</td>
                                    </tr>
                                    <tr>

                                        <td>
                                            <div class="${Number(Elkaisar.World.UnitTypeData[type].reqProm) > Number(Elkaisar.DPlayer.Player.porm) ? "not-enough" : "enough"}">
                                                ${Elkaisar.BaseData.Promotion[Elkaisar.World.UnitTypeData[type].reqProm].Title}
                                            </div>
                                        </td>
                                        <td colspan="2">
                                            تصنيف النبيل المطلوب
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>
                                            ${(Elkaisar.World.UnitTypeData[type].reqFitness)} 
                                        </td>
                                        <td colspan="2">
                                              اللياقة البدنية
                                        </td>
                                    </tr>
                                </table>
                                ${this.attackBtns(x_coord, y_coord)}
                                <div class="battel_req">
                                    <ul>
                                        ${this.get_req(type)}
                                    </ul>
                                </div>
                            </div>`;
         return left_content;
    },
    
    attackBtns: function (xCoord, yCoord)
    {
        
        var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
        if(WorldUnit.isQueenCity(Unit.ut) || WorldUnit.isRepelCastle(Unit.ut))
            return `<div class="attakBtns four-btn-camp">
                        <div class="container">
                            <div class="attck_start pull-L" id="attack_camp">
                                <button id="START_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x enter"> انشاء</button>
                            </div>
                            <div class="attack_join pull-R">
                                <button id="JOIN_ATTACK"  data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> انضمام</button>
                            </div>
                            <div class="request-order pull-L">
                                <button id="REQUEST_ORDER" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> طلب</button>
                            </div>
                            <div class="plunde-prize pull-R">
                                <button id="PLUNDE_PRIZE"  data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x"> غنيمة</button>
                            </div>
                        </div>
                    </div>`;
        
        
        return `<div class="attakBtns">
                    <div class="container">
                        <div class="attck_start pull-L" id="attack_camp">
                            <button id="START_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x enter" disabled='disabled' > انشاء</button>
                        </div>
                        <div class="attack_join pull-R">
                            <button id="JOIN_ATTACK" data-x-coord="${xCoord}" data-y-coord="${yCoord}" class="full-btn full-btn-3x" disabled='disabled' > انضمام</button>
                        </div>
                    </div>
                </div>`;
        
    },
    
    get_req: function(type){
        var camp_obj = Elkaisar.World.UnitTypeData[type];
        
        var total_req = "";
        var total_join_req = "";
        var total = "";
        
        camp_obj.MakeReq.forEach(function(el){  // هنجيب المتطلبات بتاعة  الهجوم ونحطها  فى ليست
            if(el !== ""){
                total_req += `<span class="${Matrial.getPlayerAmount(el.Item) < el.amount ? "not-enough" : "enough"} "> ${el.amount} من  ${Elkaisar.BaseData.Items[el.Item].name}</span>`;
            }
        });
         if(total_req !==""){
             total += `<li>
                        يستهلك${total_req} لانشاء معركة
                    </li>`;
         }
        camp_obj.JoinReq.forEach(function(el){  // هنجيب المتطلبات بتاعة  الانضمام ونحطها  فى ليست
            if(el !== ""){
                total_join_req += `<span  class="${Matrial.getPlayerAmount(el.Item) < 1 ? "not-enough" : "enough"} "> ${el.amount} من  ${Elkaisar.BaseData.Items[el.Item].name}</span>`;
            }
        });
        if(total_join_req !==""){
            total += `<li>
                        يستهلك${total_join_req} لانشاء معركة
                    </li>`;
        }
        return total;
    },
    'getArmyAmountForUnit'(unitType, Lvl, ArmyType) {
        if (!Elkaisar['World']['UnitArmy'][unitType]) return 0x0;
        if (!Elkaisar['World']['UnitArmy'][unitType][Lvl]) return 0x0;
        if (!Elkaisar['World']['UnitArmy'][unitType][Lvl][ArmyType]) return 0x0;
        return Elkaisar['World']['UnitArmy'][unitType][Lvl][ArmyType];
    },
    'getDominaterName'(xCoord, yCoord) {
        var Unit = WorldUnit['getWorldUnit'](xCoord, yCoord);
        $.ajax({
            'url': Elkaisar.Config.NodeUrl + '/api/AWorldUnit/getWorldUnitDominator',
            'type': 'GET',
            'data': {
                'xCoord': xCoord,
                'yCoord': yCoord,
                'unitType': Unit.ut,
                server: Elkaisar.Config.idServer,
                token: Elkaisar.Config.OuthToken
            },
            success: function (data, _0x2bf316, _0x1a4707) {
                if (!Elkaisar['LBase']['isJson'](data)) 
                    return Elkaisar['LBase']['Error'](data);
                var JsonData = JSON['parse'](data);
                if (JsonData['Name'] != '') 
                    $('#reviewUnitBoxName').html(JsonData['Name']);
            },
            'error': function (_0x1ed427, _0xebf258, _0x2fd59e) {}
        });
    }
};


campDB.equipRow = function (equip){
    
    var returnEquiImage = function (part){
        var ii;
        for(ii in equip){
            if(equip[ii].part === part){
                return Equipment.getImage(equip[ii].equip, equip[ii].part, equip[ii].lvl);
            }
        }
        return "images/tech/no_army.png";
    };
    
    $("#camp-panal-equip-row").html(
    `
        <ul>
            <li equi_type="helmet"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("helmet")})"></div>
                        <div class="icon" style="background-image: url(images/box/helmet.png)"></div>
                    </div>
                </li>
                <li equi_type="necklace"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("necklace")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="armor"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("armor")})"></div>
                        <div class="icon" style="background-image: url(images/box/armor.png)"></div>
                    </div>
                </li>
                <li equi_type="boot"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("boot")})"></div>
                        <div class="icon" style="background-image: url(images/box/boots.png)"></div>
                    </div>
                </li>
                <li equi_type="sword"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("sword")})"></div>
                        <div class="icon" style="background-image: url(images/box/sword.png)"></div>
                    </div>
                </li>
                <li equi_type="shield"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("shield")})"></div>
                        <div class="icon" style="background-image: url(images/box/shield.png)"></div>
                    </div>
                </li>
                <li equi_type="horse"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("steed")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>

                <li equi_type="ring"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("ring")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="belt"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("belt")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
                <li equi_type="niche"> 
                    <div class="image-wrapper">
                        <div class="equip" style="background-image: url(${returnEquiImage("pendant")})"></div>
                        <div class="icon" style="background-image: url(images/box/lock.png)"></div>
                    </div>
                </li>
            </ul>`);
};

campDB.armyRow  = function (heroList){
    
    var armyObj = Hero.calWorldUnitArmy(heroList);
    var tb = "<tr>";
    for(var iii = 1 ; iii <= 3; iii++){
        tb += `<td>
                    <img src="images/tech/soldier_${iii}.jpg"/>
                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(armyObj[iii])}">
                        ${armyObj[iii]}
                    </h1>
                </td>`;
    }
     tb += "</tr><tr>";
    for(var iii = 4 ; iii <= 6; iii++){
        tb += `<td>
                    <img src="images/tech/soldier_${iii}.jpg"/>
                    <h1 class="army_count stroke ellipsis ${Fixed.getArmyAmountColor(armyObj[iii])}">
                        ${armyObj[iii]}
                    </h1>
                </td>`;
    }
    tb +="</tr>";
    $("#camp-army-table").html(`<tr> ${tb} </tr>`);
};

campDB.getQueAttackList    = function (xCoord, yCoord)
{
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);
    
    if(!WorldUnit.isRepelCastle(Unit.ut))
        return ;
    return $.ajax({
       
        url: `${Elkaisar.Config.NodeUrl}/api/AWorld/getGuildAttackQue`,
        type: 'GET',
        data: {
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer,
            xCoord : xCoord,
            yCoord : yCoord
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data)
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            Elkaisar.CurrentWorldUnit.AttackQueList = JsonObject;
            campDB.refreshQueAttackList(xCoord, yCoord);
        }
        
    });
};

campDB.refreshQueAttackList = function (xCoord, yCoord)
{
    var Unit = WorldUnit.getWorldUnit(xCoord, yCoord);

            var icon = ["1st","2nd","3rd","4th","5th"];
            
            var list = "";
            var name = "";
            var guild = "";
            var timeEnd = "";
            var timeStart = "";
            var innerList = "";
            for(var iii = 0; iii < 5; iii++){
                var ListItem =  Elkaisar.CurrentWorldUnit.AttackQueList [iii];
                if(ListItem){
                    
                    
                    name = ListItem.PlayerName || ListItem.GuildName;
                    guild = ListItem.GuildName === "NULL" ? "---" : ListItem.GuildName;
                    timeEnd  = `${dateTimeFormatShort(new Date(ListItem.time_end*1000))}`;
                    timeStart = `${dateTimeFormatShort(new Date(ListItem.time_start*1000))}`;
                   
                }else{
                   
                    name = "";
                    guild = "";
                    timeEnd = '';
                    timeStart = "";
                    
                }
                
                if(WorldUnit.isRepelCastle(Unit.ut)){
                    
                    innerList = `   <div class="td_1" style="width: 30%">${name}</div>
                                    <div class="td_1" style="width: 35%">${timeStart}</div>
                                    <div class="td_1" style="width: 35%">${timeEnd}</div>`;
                }
                
                list += `<div class="tr">
                            ${innerList}
                        </div>`;
                
            }
            
            var content = ` <div class="unit-with-rank">
                        
                                <div class="rank-list">
                                        ${
                                            WorldUnit.isRepelCastle(Unit.ut) ? 
                                            `<div class="inner_nav">
                                                <div class="td_1 font-2" style="width: 40%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                                <div class="td_1 font-2" style="width: 30%">وقت البداء</div>
                                                <div class="td_1 font-2" style="width: 30%">وقت الانتهاء</div>
                                            ` 
                                        : 
                                                
                                            `<div class="td_1 font-2" style="width:20%">التصنيف</div>
                                            <div class="td_1 font-2" style="width: 30%">الملك</div>
                                            <div class="td_1 font-2" style="width: 30%">${Translate.Button.Chat.League[UserLag.language]}</div>
                                            <div class="td_1 font-2" style="width: 20%">المدة</div>`
            
                                        }
                                    </div>
                                    ${list}
                                </div>
                            </div>`;
            
            
           $(".unit-with-rank").replaceWith(content);
};