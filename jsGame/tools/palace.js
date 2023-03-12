/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Palace = {
    
    isExpanable: function (){
        
        
        if(Number(Elkaisar.City.getCity().BuildingLvl.palace ) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*4){
            return false;
        }else if (Matrial.getPlayerAmount("expan_plan") < Math.pow(2 , Elkaisar.CurrentCity.City.lvl) ){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.food) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000 ){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.wood) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.stone) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.coin) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else if (Number(Elkaisar.CurrentCity.City.metal) < (Number(Elkaisar.CurrentCity.City.lvl)+1)*3000){
            return false;
        }else {
            return true;
        }
    }
};

Palace.getBarrayEffect = function (){
    
    var food_bar_effect  = 0;
    var wood_bar_effect  = 0;
    var stone_bar_effect = 0;
    var metal_bar_effect = 0;
    
    
    
    for (var index in Elkaisar.CurrentCity.Barray){
        
        var Unit =  WorldUnit.getWorldUnit(Elkaisar.CurrentCity.Barray[index].x_coord, Elkaisar.CurrentCity.Barray[index].y_coord);
        
        if(WorldUnit.isRiver(Unit.ut)){
            food_bar_effect  += 0.03*Unit.l;
        }else if(WorldUnit.isWood(Unit.ut)){
            wood_bar_effect  += 0.03*Unit.l;
        }else if(WorldUnit.isDesert(Unit.ut)){
            stone_bar_effect += 0.03*Unit.l;
        }else if(WorldUnit.isMountain(Unit.ut)){
            metal_bar_effect += 0.03*Unit.l;
        }
    }
    
    return {
        food:food_bar_effect,
        wood:wood_bar_effect,
        stone:stone_bar_effect,
        metal:metal_bar_effect
    };
    
};

Palace.getTotalProduction = function (){
    var city_console = Elkaisar.Hero.getHero(Elkaisar.CurrentCity.City.console);
    
    var console_effect = 0;
    if(city_console){
        console_effect = (Number(city_console.Hero.point_a) + Number(city_console.Hero.point_a_plus))/200;
        console_effect = city_console.Medal.medal_ceasro > $.now()/1000 ? console_effect : console_effect*1.25;
    }
    
    var food_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.food*Elkaisar.City.getCity().Jop.food_rate/100)   , Elkaisar.CurrentCity.City.pop)*10;
    var wood_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.wood*Elkaisar.City.getCity().Jop.wood_rate/100)   , Elkaisar.CurrentCity.City.pop , Elkaisar.CurrentCity.City.pop - food_effective )*10;
    var stone_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.stone*Elkaisar.City.getCity().Jop.stone_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective , 0))*10;
    var metal_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.metal*Elkaisar.City.getCity().Jop.metal_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective - stone_effective, 0))*10;
    
    
    var BarrayEffect = Palace.getBarrayEffect();
    
    
    return {
        food :food_effective  + food_effective*console_effect +BarrayEffect.food*food_effective     + Elkaisar.DPlayer.PlayerEdu.farming*0.1*food_effective,
        wood :wood_effective  + wood_effective*console_effect +BarrayEffect.wood*wood_effective     + Elkaisar.DPlayer.PlayerEdu.wooding*0.1*wood_effective,
        stone:stone_effective + stone_effective*console_effect +BarrayEffect.stone*stone_effective  + Elkaisar.DPlayer.PlayerEdu.stoning*0.1*stone_effective,
        metal:metal_effective + metal_effective*console_effect +BarrayEffect.metal*metal_effective  + Elkaisar.DPlayer.PlayerEdu.mining*0.1*metal_effective
    };
    
};


Palace.productionReport =  function (){
        
    var food_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.food*Elkaisar.City.getCity().Jop.food_rate/100)   , Elkaisar.CurrentCity.City.pop);
    var wood_effective  = Math.min(Math.floor(Elkaisar.City.getCity().Jop.wood*Elkaisar.City.getCity().Jop.wood_rate/100)   , Elkaisar.CurrentCity.City.pop , Elkaisar.CurrentCity.City.pop - food_effective );
    var stone_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.stone*Elkaisar.City.getCity().Jop.stone_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective , 0));
    var metal_effective = Math.min(Math.floor(Elkaisar.City.getCity().Jop.metal*Elkaisar.City.getCity().Jop.metal_rate/100) , Elkaisar.CurrentCity.City.pop , Math.max(Elkaisar.CurrentCity.City.pop - food_effective - wood_effective - stone_effective, 0));
    
    var console_effect = 0;
    var city_console = Elkaisar.Hero.getHero(Elkaisar.CurrentCity.City.console);
    if(city_console){
        console_effect = (Number(city_console.Hero.point_a) + Number(city_console.Hero.point_a_plus))/200;
        console_effect = city_console.Medal.medal_ceasro > $.now()/1000 ? console_effect : console_effect*1.25;
    }
    
    
    
    var BarrayEffect = Palace.getBarrayEffect();
    
    var totalProduction = Palace.getTotalProduction();
        
    var left_content = `<div class="left-content full production-report"  style="background: url(images/icons/bg_patern.png);">
                            <div class="th">
                                <div class="td_1 ellipsis">${Translate.General.Iron[UserLag.language]}</div>
                                <div class="td_2 ellipsis">${Translate.General.Stone[UserLag.language]}</div>
                                <div class="td_3 ellipsis subject">${Translate.General.Lumber[UserLag.language]}</div>
                                <div class="td_5 ellipsis">${Translate.General.Crops[UserLag.language]}</div>
                                <div class="td_6 ellipsis"></div>
                                <div class="td_6 ellipsis"></div>
                            </div>
                            <div id="scroll-production-report" class="scroll">
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal*10}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone*10}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood*10}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food*10}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> القدرة الانتاجية من المواد</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الوظائف المتاحة</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.City.getCity().Jop.metal - metal_effective}</div>
                                    <div class="td_2">${Elkaisar.City.getCity().Jop.stone - stone_effective}</div>
                                    <div class="td_3">${Elkaisar.City.getCity().Jop.wood  - wood_effective}</div>
                                    <div class="td_5">${Elkaisar.City.getCity().Jop.food  - food_effective}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> عدد المطلوب من العمال</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${metal_effective}</div>
                                    <div class="td_2">${stone_effective}</div>
                                    <div class="td_3">${wood_effective}</div>
                                    <div class="td_5">${food_effective}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> عدد العاملين</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1"><input id="metal-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.metal_rate}"/></div>
                                    <div class="td_2"><input id="stone-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.stone_rate}"/></div>
                                    <div class="td_3"><input id="wood-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.wood_rate}"/></div>
                                    <div class="td_5"><input id="food-rate-input" type="text" class="only_num input" style="width: 60%; height: 69%; margin-top: 6px;" max="100" min="0" step="1" value="${Elkaisar.City.getCity().Jop.food_rate}"/></div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> <button id="change-city-pro-rate" class="full-btn-3x">تعديل النسب</button></div>
                                </div>

                                <div class="tr green">
                                    <div class="td_1">${metal_effective*10}</div>
                                    <div class="td_2">${stone_effective*10}</div>
                                    <div class="td_3">${wood_effective*10}</div>
                                    <div class="td_5">${food_effective*10}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الانتاج الاساسى</div>
                                </div>

                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*console_effect*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*console_effect*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*console_effect*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*console_effect*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم الابطال</div>
                                </div>

                                <div class="tr">
                                    <div class="td_1">${Math.floor(Elkaisar.DPlayer.PlayerEdu.mining*0.1*metal_effective*10)}</div>
                                    <div class="td_2">${Math.floor(Elkaisar.DPlayer.PlayerEdu.stoning*0.1*stone_effective*10)}</div>
                                    <div class="td_3">${Math.floor(Elkaisar.DPlayer.PlayerEdu.wooding*0.1*wood_effective*10)}</div>
                                    <div class="td_5">${Math.floor(Elkaisar.DPlayer.PlayerEdu.farming*0.1*food_effective*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم الدراسات</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*BarrayEffect.metal*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*BarrayEffect.stone*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*BarrayEffect.wood*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*BarrayEffect.food*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم البرارى</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*BarrayEffect.metal*10)}</div>
                                    <div class="td_2">${Math.floor(stone_effective*BarrayEffect.stone*10)}</div>
                                    <div class="td_3">${Math.floor(wood_effective*BarrayEffect.wood*10)}</div>
                                    <div class="td_5">${Math.floor(food_effective*BarrayEffect.food*10)}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px"> دعم البرارى</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Math.floor(metal_effective*10* (Elkaisar.DPlayer.PlayerState.metal > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_2">${Math.floor(stone_effective*10* (Elkaisar.DPlayer.PlayerState.stone > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_3">${Math.floor(wood_effective*10 * (Elkaisar.DPlayer.PlayerState.wood > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_5">${Math.floor(food_effective*10 * (Elkaisar.DPlayer.PlayerState.food > $.now()/1000 ? 0.25 : 0))}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">مواد زيادة الانتاج</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.CurrentCity.City.metal_out}</div>
                                    <div class="td_2">${Elkaisar.CurrentCity.City.stone_out}</div>
                                    <div class="td_3">${Elkaisar.CurrentCity.City.wood_out}</div>
                                    <div class="td_5 red">-${Elkaisar.CurrentCity.City.food_out}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الاستهلاك</div>
                                </div>
                                <div class="tr">
                                    <div class="td_1">${Elkaisar.CurrentCity.City.metal_in - Elkaisar.CurrentCity.City.metal_out}</div>
                                    <div class="td_2">${Elkaisar.CurrentCity.City.stone_in - Elkaisar.CurrentCity.City.stone_out}</div>
                                    <div class="td_3">${Elkaisar.CurrentCity.City.wood_in  - Elkaisar.CurrentCity.City.wood_out}</div>
                                    <div class="td_5">${Elkaisar.CurrentCity.City.food_in  - Elkaisar.CurrentCity.City.food_out}</div>
                                    <div class="td_6" style="width: 32%; font-size: 14px">الناتج الاجمالى</div>
                                </div>
                            </div>
                        </div>`;


    return left_content;
};

Palace.cityGarrison = function (offset , id_hero){
    
    if(!offset)
        offset = 0;
    
    var heroList = '';
    
    var Garrison = Elkaisar.City.getCity().Garrison;
    
    for(var iii = 0 + offset ; iii < 7 + offset; iii ++){
        
        if(Garrison[iii]){
            
            heroList += `<li class="tr ${Number(id_hero) === Number(Garrison[iii].id_hero) ?  "selected" : ""}" data-offset="${iii}" data-id-hero="${Garrison[iii].id_hero}">
                            <div class="td_1" style="width: 24%; margin-left: 2%;">
                                <div class="image">
                                    <div class="wrapper">
                                        <div class="hero-avatar" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Garrison[iii].avatar]})">
                                        </div>
                                    </div>
                                </div>
                                <div class="name ellipsis">
                                    (${Garrison[iii].HeroName})
                                </div>
                            </div>
                            <div class="td_2" style="width: 24%;">${Garrison[iii].LordName}</div>
                            <div class="td_3" style="width: 24%;">
                                <div class="hero-lvl">
                                    ${Garrison[iii].lvl}
                                </div>
                            </div>
                            <div class="td_5" style="width: 24%;">
                                <button class="full-btn-3x remove-hero-city-garrison" data-hero-name="${Garrison[iii].HeroName}" data-id-hero="${Garrison[iii].id_hero}" style="width: 50%;float: left">ازالة البطل</button>
                                    <button class="full-btn-3x show-hero-detailed-review" data-id-hero="${Garrison[iii].id_hero}"  style="width: 45%; float: right"> عرض</button>
                            </div>
                        </li>`;
            
        }else{
            heroList += `<li class="tr"></li>`;
        }
        
    }
    
    var content = ` <div class="left-content ">
                        <h1> قائمة البرارى</h1>
                    <p>
                        من هنا تسطيع عرض البرارى المملوكة<br>
                        <br>
                        <br>

                    </p>
                    <h1>ملحوظة:</h1>
                    <p>
                          لا يمكنك امتلاك اكثر من 10 برارى
                    </p>
                    </div>
                    <div class="right-content">
                        <div class="th">
                            <div class="td_1 ellipsis" style="width: 24%; margin-left: 2%;">${Translate.Title.TH.Hero[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width: 24%;">${Translate.Title.TH.Lord[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width: 24%;">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                            <div class="td_5 ellipsis" style="width: 24%;">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>
                        <ol id="city-garrison-list">
                            ${heroList}
                        </ol>
                        <div id="city-garrison-footer" class="right-content-footer">
                            <div class="right">
                                <div class="wrapper" id="change-garrison-order">
                                    <button data-direction="up" class="order-up pull-R"></button>
                                    <button data-direction="down" class="order-down pull-L"></button>
                                </div>
                            </div>
                            <div class="middle">
                                <div class="wrapper">
                                    <button class="GO_L_1" data-direction="dec"></button>
                                    <label>${Math.floor(offset/7) + 1}/${Math.floor((Garrison.length - 1)/7) + 1}</label>
                                    <button class="GO_R_1" data-direction="inc"></button>
                                </div>
                            </div>
                            <div class="left">
                                <button id="add-city-garrison" class="full-btn-3x">${Translate.Button.Building.AddHero[UserLag.language]}</button>
                            </div>
                        </div>
                    </div>`;
    
    return content;
};

Palace.cityGarrisonHeros = [];

Palace.getCityGarison =  function (){
  
    return Elkaisar.City.getCityGarrison();
    
};




$(document).on("click" , ".acce-building-from-palace" , function (){
   
   var idTask = $(this).attr("data-id-task");
   
    var matrial_to_use = [
        "archit_a",
        "archit_b",
        "archit_c",
        "archit_d"
    ];
    
    BoxOfMatrialToUse(matrial_to_use , "building_acce" , 1 , idTask);
    
});



$(document).on("click" , "#change-city-taxs" , function (){
    
    var new_val = Number($("#city-name-val").val());
    
    if(typeof new_val !== "number" || new_val > 100){
        
        alert_box.failMessage("لا يمكن ان تكون قيمة الضرائب اكثر من 100%");
        return ;
        
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
        url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/updateTaxs`,
        data:{
            idCity     : idCity,
            newTaxRate : new_val,
            token      : Elkaisar.Config.OuthToken,
            server     : Elkaisar.Config.idServer
        },
        
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var JsonObject = JSON.parse(data);
           
            if(JsonObject.state === "ok"){
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم تعديل قيمة الضرائب بنجاح");
                $("#dialg_box .left-nav ul .selected").click();
                
            }else{
                
                
                Elkaisar.LBase.Error(data);
                
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});

$(document).on("click" , "#change-city-name" , function (){
    
    var new_name = $("#city-name-val").val();
    
    if(new_name.length < 1){
        alert_box.failMessage("لا يجب ان تكون اسم المدينة خالية");
        return ;
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
        url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/updateName`,
        data:{
            NewName : new_name,
            idCity  : Elkaisar.CurrentCity.City.id_city,
            token   : Elkaisar.Config.OuthToken,
            server  : Elkaisar.Config.idServer
        },
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
            var JsonObject = JSON.parse(data);
           
            if(JsonObject.state === "ok"){
                
                Elkaisar.City.getCity(idCity).City = JsonObject.City;
                alert_box.succesMessage("تم تعديل اسم الدينة بنجاح");
                $("#city-data .name").html(new_name);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});



$(document).on("click" , "#expan-city button" , function (){
    
    alert_box.confirmDialog("تاكيد توسيع المدينة" , function (){
        
     if(!Palace.isExpanable() || Elkaisar.CurrentCity.City.lvl > 2){
        alert_box.failMessage("لا يمكن توسيع المدينة");
        return ;
     }
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        
            url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/expandCity`,
            data:{
                idCity  : Elkaisar.CurrentCity.City.id_city,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            
                var JsonObject = JSON.parse(data);

                if(JsonObject.state === "ok"){
                    
                    Matrial.takeFrom("expan_plan", Math.pow(2 , Elkaisar.CurrentCity.City.lvl));
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    fillCityWithBuilding();
                    
                    $(".nav_bar .left-nav ul li").each( function (){
                        
                        if($(this).attr("head_title") === "expantion"){
                            $(this).trigger("click");
                        }
                        
                    });
                    
                   alert_box.succesMessage("تم توسيع المدينة بنجاح");   
                   
                    
                }else{
                    
                    Elkaisar.LBase.Error(data);
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
            
        });
        
    
        
    });
    
});

$(document).on("click" ,  "#bar_list .abandon" , function (){
    
    var list_ = $(this).parents("li");
    var x_coord = list_.attr("data-x-coord");
    var y_coord = list_.attr("data-y-coord");
    var unite_type = list_.attr("data-unit-type");
    var unit_for  = null;
  
    if(WorldUnit.isDesert(unite_type)){
       unit_for = "stone";
    }else if(WorldUnit.isRiver(unite_type)){
       unit_for = "food";
    }else if(WorldUnit.isWood(unite_type)){
       unit_for = "wood";
    }else if(WorldUnit.isMountain(unite_type)){
       unit_for = "metal";
    }
    
    
    if(unit_for === null){
        alert_box.failMessage("in valid barray");
        return ;
    }
    
    alert_box.confirmDialog("تاكيد تخلى عن البرارى" , function (){
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        
        $.ajax({
            url:`${Elkaisar.Config.NodeUrl}/api/ACityPalace/barryAbandon`,
            data:{
                xCoord : x_coord,
                yCoord : y_coord,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    
                    var json_data = JSON.parse(data);
                    
                }else{
                    console.log(data);
                    Elkaisar.LBase.Error(data);
                    return ;
                }
               
                alert_box.succesMessage("تم التخلى عن البرية بنجاح");  
                list_.remove();
                Elkaisar.City.getCityBase(idCity);
                Elkaisar.City.getCityBarray(idCity).done(function (){
                    $("#dialg_box .left-nav ul .selected").click();
                });
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
    
});



/*     chanege garrio  list*/
$(document).on("click" , "#city-garrison-footer .middle .wrapper button"  , function (){
    
    var direction = $(this).data("direction");
    
    
    if(direction === "inc"){
        
        var lastOffset = Number($("#city-garrison-list .tr:last-child").data("offset"));
        if(isNaN(lastOffset))
            return ;
        
        if(Number(lastOffset) >= Elkaisar.City.getCity().Garrison.length - 1)
            return ;
        
        $("#palace_content").html(Palace.cityGarrison(lastOffset + 1));
        
    }else if(direction === 'dec'){
        
        var firstOffset = Number($("#city-garrison-list .tr:first-child").data("offset"));
        if(isNaN(firstOffset))
            return ;
        
        if(Number(firstOffset) <= 0)
            return ;
        
        $("#palace_content").html(Palace.cityGarrison(firstOffset - 7));
        
    }
    
});
Elkaisar.Building.Palace.HeroGarrisonList = function ()
{
    var heroList = "";
    var counter = 0;
    
    var idCity = Number(Elkaisar.CurrentCity.City.id_city);
    
    for(var jjj in Elkaisar.DPlayer.Heros){
        
        var HeroIn = Elkaisar.DPlayer.Heros[jjj];
        var alreadyInGarr = false;
        if(Number(Elkaisar.DPlayer.Heros[jjj].Hero.id_city) !== idCity)
            continue;
        for(var iii in Elkaisar.CurrentCity.Garrison){
            if(Elkaisar.CurrentCity.Garrison[iii].id_hero === HeroIn.Hero.id_hero)
                alreadyInGarr = true;
        }
        if(alreadyInGarr)
            continue;
        
        if(Hero.readyForBattel(Elkaisar.DPlayer.Heros[jjj])){
            counter++;
            heroList += `<li class="tr">
                            <div class="td_1" style="width: 25%">
                                <div class="wrapper">
                                    <div class="image" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[Elkaisar.DPlayer.Heros[jjj].Hero.avatar]})">

                                    </div>
                                </div>
                            </div>
                            <div class="td_2" style="width: 30%">
                                <div class="name" style="width: 100%">(${Elkaisar.DPlayer.Heros[jjj].Hero.name})</div>
                            </div>
                            <div class="td_3" style="width: 20%">
                                <div class="lvl"> ${Elkaisar.DPlayer.Heros[jjj].Hero.lvl}</div>
                            </div>
                            <div class="td_4" style="width: 25%">
                                <button class="full-btn-3x add-city-hero-garrison" data-id-hero="${Elkaisar.DPlayer.Heros[jjj].Hero.id_hero}">اضافة</button>
                            </div>
                        </li>`;

        }

    }
    
    var loopEnd = Math.max(0 , 10 - counter);
    
    for(var iii = 0 ; iii < loopEnd ; iii++){
        
        heroList += "<li class='tr'></li>"
        
    }
    return  heroList ;
   
   
};


$(document).on("click" , "#add-city-garrison" , function (){
   
   
    var heroList =  Elkaisar.Building.Palace.HeroGarrisonList();
    
    
    
    var overLay = ` <div id="over_lay" class="select_over_lay">
                        <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">قائمة الابطال</div>
                                <img class="close close_select_menu" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div id="hero-select-list">
                                <ol>
                                    ${heroList}
                                </ol>
                            </div>
                        </div>
                    </div>`;
    
    
    $("body").append(overLay);
    $("#hero-select-list ol").niceScroll(SCROLL_BAR_PROP);
    
});


/*   add hero to city Garrison   */
$(document).on("click" , "#hero-select-list .add-city-hero-garrison" ,  function (e){
   
   e.stopPropagation();
    var id_hero = $(this).data("id-hero");
    
    if(!id_hero)
        return ;
    
    var self = $(this);
    
    for (var iii in Elkaisar.City.getCity().Garrison){
        if(Number(id_hero) === Elkaisar.City.getCity().Garrison[iii].id_hero){
            
            alert_box.failMessage("لا يمكنك اضافة هذا البطل </br>   ( هذا االبطل موجود بحراسة المدينة  بالفعل )");
            self.parents(".tr").remove();
            $("#hero-select-list ol").append("<li class='tr'></li>");
            return ;
            
        }
        
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    alert_box.confirmDialog(" تأكيد اضافة البطل الى حراسة المدينة"  , function (){
       
       
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/addCityGarrison`,
            data:{
                idHero : id_hero,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                self.attr("disabled" , "disabled");
                
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                
                if(JsonObject.state === "ok"){

                    self.parents(".tr").remove();
                    $("#hero-select-list ol").append("<li class='tr'></li>");
                    alert_box.succesMessage("تم اضافة البطل بنجاح");
                    Elkaisar.City.getCity(idCity).Garrison = JsonObject.Garrison;
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset")));
                    $("#hero-select-list ol").html(Elkaisar.Building.Palace.HeroGarrisonList());

                }else{

                    self.removeAttr("disabled");
                    alert_box.failMessage(" لا يمكن اضافة البطل");

                }
               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
        
    });
    
});





/*   remove hero from garrison  */
$(document).on("click" , ".remove-hero-city-garrison" , function (e){
    
    e.stopPropagation();
    
    var id_hero = $(this).data("id-hero");
    var h_name  = $(this).data("hero-name");
    var self    = $(this);
    var idCity = Elkaisar.CurrentCity.City.id_city;
    alert_box.confirmDialog(`تأكيد سحب البطل ${h_name} من حراسة المدينة (${Elkaisar.CurrentCity.City.name})` , function (){
        
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/removeHeroFromGarrison`,
            data:{
                idHero  : id_hero,
                idCity  : idCity,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            beforeSend: function (xhr) {
                self.attr("disabled" , "disabled");
                waitCursor();
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);
                
                var JsonObject = JSON.parse(data);
                
                
                if(JsonObject.state === "ok"){
                    
                    alert_box.succesMessage("تم سحب البطل بنجاح");
                    Elkaisar.City.getCity(idCity).Garrison  = JsonObject.Garrison;
                    Elkaisar.Hero.getHero(id_hero).Hero     = JsonObject.Hero;
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset")));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    });
    
    
});



/* select from current city garrison */
$(document).on("click" , "#city-garrison-list .tr" , function (e){
    e.stopPropagation();
    if($(this).data("id-hero") !== undefined){
        
        $("#city-garrison-list .selected").removeClass("selected");
        $(this).addClass("selected");  
        
    }
    
});




/*    change cityGarison- order*/
$(document).on("click" , "#city-garrison-footer button" , function (){
   
    var id_hero = Number($("#city-garrison-list .selected").data("id-hero"));
    
    var self = $(this);
    var offset = Number($("#city-garrison-list .selected").data("offset"));
    var direction = $(this).data("direction");
    
    var id_to_change = null;
    if(direction === "up"){
        
        if (offset === 0)
            return ;
        
        var temp = Elkaisar.City.getCity().Garrison[offset - 1];
        id_to_change = temp.id_hero;
        Elkaisar.City.getCity().Garrison[offset - 1] =   Elkaisar.City.getCity().Garrison[offset] ;
        Elkaisar.City.getCity().Garrison[offset] = temp;
        
    }else if(direction === "down"){
        
        if(offset === Elkaisar.City.getCity().Garrison.length)
            return ;
        
        var temp = Elkaisar.City.getCity().Garrison[offset + 1];
        id_to_change = temp.id_hero;
        Elkaisar.City.getCity().Garrison[offset + 1] =   Elkaisar.City.getCity().Garrison[offset] ;
        Elkaisar.City.getCity().Garrison[offset] = temp;
        
        
    }
    
    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset") , id_hero));
   
    if(id_to_change === null)
        return ;
   
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/reordCityGarrison`,
        data:{
            idHero    : id_hero,
            Direction : direction,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
            $("#city-garrison-footer button").attr("disabled" ,"disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            $("#city-garrison-footer button").removeAttr("disabled");
            
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === "ok"){
                
                Palace.getCityGarison().done(function (){
                    $("#palace_content").html( Palace.cityGarrison($("#city-garrison-list .tr:first-child").data("offset") , id_hero));
                    $("#city-garrison-footer button").removeAttr("disabled");
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});