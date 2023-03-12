$(document).on("click" , "#mili-inner-nav .nav-title" , function (){
    
    
    
    var selected_type = $("#dialg_box .mili_building .middle-content .selected_sol");
    if(selected_type.length  < 1){
        
        alert_box.confirmMessage("عليك اختيار نوع الجنود اولا ");
        return ;
        
    }
    
   
    
    
    var army_type = selected_type.attr("army_type");
    var inner_nav_selection = $(this).attr("data-inner-nav");
    var army_obj = Elkaisar.BaseData.Army[army_type];
     
 
        
        if(inner_nav_selection === "army-train") {
             var content = `<div id="mili-inner-nav" class="inner_nav">
                                <div class="nav-title" data-inner-nav="army-dismiss">${Translate.Button.Hero.Dismiss[UserLag.language]}</div>
                                <div class="nav-title" data-inner-nav="army-data">
                                    بيانات
                               </div>
                                <div class="nav-title selected" data-inner-nav="army-train">
                                    تدريب القوات
                               </div>
                            </div>`;
            
            $("#dialg_box .mili_building .right-content").html(content +Building.militrayProduction.right() );
            $(".sol-food").html(
            army_obj.food === 0 ? "---":getArabicNumbers(army_obj.food)
                    );
            $(".sol-stone").html(
                    army_obj.stone === 0 ? "---":getArabicNumbers(army_obj.stone)
                    );
            $(".sol-wood").html(
                    army_obj.wood === 0 ? "---":getArabicNumbers(army_obj.wood)
                    );
            $(".sol-metal").html(
                    army_obj.metal === 0 ? "---":getArabicNumbers(army_obj.metal)
                    );
            $(".sol-coin").html(
                    army_obj.coin === 0 ? "---":getArabicNumbers(army_obj.coin)
                    );
            $(".sol-people").html(
                    army_obj.people === 0 ? "---":getArabicNumbers(army_obj.people)
                    );

            $("#max_num_army span").html(getArabicNumbers(findMaxNumForArmyBuild(army_type)));
            $(".sol-2-build-amount").attr("max" ,findMaxNumForArmyBuild(army_type));
            $(".sol-2-build-amount").attr("step" ,findMaxNumForArmyBuild(army_type));
            
        }else if(inner_nav_selection === "army-dismiss"){
            
            var content = ` <div id="mili-inner-nav" class="inner_nav">
                                <div class="nav-title selected" data-inner-nav="army-dismiss">${Translate.Button.Hero.Dismiss[UserLag.language]}</div>
                                <div class="nav-title" data-inner-nav="army-data">
                                    بيانات
                                </div>
                                <div class="nav-title" data-inner-nav="army-train">
                                    تدريب القوات
                                </div>
                            </div>       
                            <div class="army-dismis">
                                <p>يمكنك طرد  القوات والاستفادة من الموارد </p>
                                <div>
                                    <button id="dismis-army" class="full-btn full-btn-2x">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                </div>
                            </div>`;
            $("#dialg_box .mili_building .right-content").html(content);
        }
    
});



// to heighlight   the wanted  army type 
$(document).on("click" , ".sol-2-build" , function (){
    
     $(".build_army").removeAttr("disabled");
     $(".sol-2-build-amount").removeAttr("disabled");
    
    var army_type = $(this).attr("army_type");
    var army_obj = Elkaisar.BaseData.Army[army_type];
    var building_place =$(".box_header").attr("place");
    $(".sol-2-build").each(function(){
        if($(this).hasClass("selected_sol")){
            $(this).removeClass("selected_sol");
        }
    });
    
    var condetion = `<li class="${army_obj.condetion.place_lvl > Elkaisar.City.getCity().BuildingLvl[building_place]? "not-enough" :"enough"}"> ${BuildingConstData[army_obj.condetion.place].title} مستوى  ${army_obj.condetion.place_lvl} </li>
                    <li class="${army_obj.condetion.lvl > Elkaisar.DPlayer.PlayerEdu[army_obj.condetion.study]? "not-enough" :"enough"}"> ${Elkaisar.BaseData.Edu[army_obj.condetion.study].ar_title} مستوى ${army_obj.condetion.lvl}</li>`;
    
    if(army_obj.condetion.place_lvl > Elkaisar.City.getCity().BuildingLvl[building_place] ||
           army_obj.condetion.lvl > Elkaisar.DPlayer.PlayerEdu[army_obj.condetion.study] ){
                        $(".build_army").attr("disabled" , "disabled");
                        $(".sol-2-build-amount").attr("disabled" , "disabled");
           }
    
    $("#army-condtions").html(condetion);
    
    $(this).addClass("selected_sol");
    
    $(".sol-food").html(
            army_obj.food === 0 ? "---":getArabicNumbers(army_obj.food)
            );
    $(".sol-stone").html(
            army_obj.stone === 0 ? "---":getArabicNumbers(army_obj.stone)
            );
    $(".sol-wood").html(
            army_obj.wood === 0 ? "---":getArabicNumbers(army_obj.wood)
            );
    $(".sol-metal").html(
            army_obj.metal === 0 ? "---":getArabicNumbers(army_obj.metal)
            );
    $(".sol-coin").html(
            army_obj.coin === 0 ? "---":getArabicNumbers(army_obj.coin)
            );
    $(".sol-people").html(
            army_obj.people === 0 ? "---":getArabicNumbers(army_obj.people)
            );
    
    $("#max_num_army span").html(getArabicNumbers(findMaxNumForArmyBuild(army_type)));
    $(".sol-2-build-amount").attr("max" ,findMaxNumForArmyBuild(army_type));
    $(".sol-2-build-amount").attr("step" ,findMaxNumForArmyBuild(army_type));
    
});


$(document).on("change, keyup" , "#number-to-dismiss" , function (){
    
    var selected_type = $("#dialg_box .mili_building .middle-content .selected_sol").attr("army_type");
    var val_ = $("#number-to-dismiss").val();
    
    $('#dismiss-army-box .tr').each(function (){
        
        var res = $(this).attr("data-resouce");
        $(this).children(".td_2").html(val_*Elkaisar.BaseData.Army[selected_type].dismess[res]);
    });
    
});

Elkaisar.Army.armyDismes = function (){
    
    var selected_type = $("#dialg_box .mili_building .middle-content .selected_sol").attr("army_type");
    var amount = $("#number-to-dismiss").val();
    if(Number(amount) < 1){
        alert_box.confirmMessage("لا يمكنك طرد هذة الكمية من المدينة");
        return ;
    }
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    alert_box.confirmDialog(`تأكيد طرد ${amount} ${Elkaisar.BaseData.Army[selected_type].ar_title}  ` , function (){
        
        
        
        $.ajax({
        
            url: `${Elkaisar.Config.NodeUrl}/api/ACity/fireArmy`,
            data:{
                armyType : selected_type,
                amount   : amount,
                idCity   : Elkaisar.CurrentCity.City.id_city,
                server   : Elkaisar.Config.idServer,
                token    : Elkaisar.Config.OuthToken
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                
                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data)
                
                var jsonObj = JSON.parse(data);
                
                $(".close-alert").click();
                
                if(jsonObj.state === "ok"){
                    
                    Elkaisar.City.getCity(idCity).City = jsonObj.City;
                    
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                    $("#dialg_box .mili_building .middle-content .selected_sol .amount").html( Elkaisar.CurrentCity.City[selected_type]);
                }
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });
        
    });
    
};



//<button id="dismis-army"  onclick="" class="full-btn full-btn-2x">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
$(document).on("click", "#dismis-army", function (){
    alert_box.dismisArmy();
});