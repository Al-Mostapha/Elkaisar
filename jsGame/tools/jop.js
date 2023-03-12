var Jop = {
    
    addLabor: function( jopFor , amount){
        
        if(jopFor === "farm" || jopFor === "food"){
            
            Elkaisar.City.getCity().Jop.food  =  Number(Elkaisar.City.getCity().Jop.food) + Number(amount);
            
        }else if(jopFor === "wood"){
            
            Elkaisar.City.getCity().Jop.wood  =  Number(Elkaisar.City.getCity().Jop.wood) + Number(amount);
            
        } else if(jopFor === "stone"){
            
            Elkaisar.City.getCity().Jop.stone  =  Number(Elkaisar.City.getCity().Jop.stone) + Number(amount);
            
        } else if(jopFor === "metal"){
            
            Elkaisar.City.getCity().Jop.metal  =  Number(Elkaisar.City.getCity().Jop.metal) + Number(amount);
            
        } 
        
    },
    
    
    
    fireLabor: function (jopFor){
        
        var amount = Number($("#number-to-dismiss").val());
        
        if(amount <= 0){
            
            alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
            return ;
            
        }else if(amount > Number(Elkaisar.City.getCity().Jop[jopFor])){
            
            alert_box.confirmMessage("لا يمكن طرد  كمية لا تملكها");
            return ;
            
        }
        var idCity = Elkaisar.CurrentCity.idCity;
        
        $.ajax({
            
            url: `${Elkaisar.Config.NodeUrl}/api/ACityJop/fireLabor`,
            data:{
                idCity        : idCity,
                amountToFire  : amount,
                buildingPlace : $(".box_content").attr("data-building-place"),
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                Elkaisar.City.getCity().Jop[jopFor] -= amount;
                waitCursor();
                $("#dismiss-army-box .two-btn button").attr("disabled" , "disabled");
            },
            success: function (data, textStatus, jqXHR) {
                $("#dismiss-army-box .two-btn button").removeAttr("disabled");
                unwaitCursor();
                alert_box.close();
                
                if(!isJson(data)){
                    
                    Elkaisar.LBase.Error(data);
                    return ;
                    
                }
                
                
                var jsonData = JSON.parse(data);
                
                if(jsonData.state === "ok"){
                    Elkaisar.City.getCity(idCity).Jop = jsonData.cityJop;
                    Elkaisar.City.getCity(idCity).city = jsonData.cityRes;
                    
                    city_profile.refresh_resource_view();
                    alert_box.succesMessage("تم طرد العمال بنجاح");
                    
                }else if(jsonData.state === "error_0"){
                    
                    alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
                    
                }else if(jsonData.state === "error_1"){
                    
                    alert_box.confirmMessage("لا يمكن طرد هذه الكمية");
                    
                }
                
                buildingClick($(".box_content").attr("data-building-place") , true);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
        
    }
    
};


Jop.jops = {
    
    farm :{
        require : {food:10 ,wood:20, stone:30, metal:15, time:31, pop:1}, 
        produce:"food",
        ar_title: "وظائف الحقل",
        fireBenfit: {food:5 ,wood:10, stone:15, metal:7},
        image:"images/building/building18.jpg"
    },
    wood :{
        require : {food:15 ,wood:10, stone:20, metal:30, time:31, pop:1}, 
        produce:"wood",
        ar_title: "وظائف الاخشاب",
        fireBenfit: {food:7 ,wood:5, stone:10, metal:15},
        image:"images/building/building19.jpg"
    },
    stone:{
        require : {food:30 ,wood:15, stone:10, metal:20, time:31, pop:1},
        produce:"stone",
        ar_title: "وظائف المحجر",
        fireBenfit: {food:15 ,wood:7, stone:5, metal:10},
        image:"images/building/building20.jpg"
    },
    mine :{
        require:{food:20 ,wood:30, stone:15, metal:10, time:31, pop:1},
        produce:"metal",
        ar_title: "وظائف المنجم",
        fireBenfit: {food:10 ,wood:15, stone:15, metal:5},
        image:"images/building/building21.jpg"
    }
    
};


$(document).on("click", "#hire-btn button", function () {

    var num_to_hire = Number($("#jop-num-input input").val()) || false;
    var building_type = Number($(".box_content").attr("data-building-type")) || false;
    var building_place = $(".box_content").attr("data-building-place") || false;
    
    if(num_to_hire < 1){
        alert_box.confirmMessage("لا يمكنك توظيف هذة الكمية ");
        return ;
    }
    
    for (var index in Elkaisar.TimedTask.TaskList.Jop) {
        
        if(Number(Elkaisar.TimedTask.TaskList.Jop[index].id_city) === Number(Elkaisar.CurrentCity.City.id_city)){
            
                    alert_box.confirmMessage("لا يمكنك توظيف اكثر من دفعة عمال فى نفس الوقت");
                    return ;
                    
                }
        
    }

    if(Max_of.city_jop(CITY_JOP_REQ[building_place.toUpperCase()] , building_place) < num_to_hire){
        
        alert_box.confirmMessage("عفوا لا توجد موارد كافية لتوظيف هذا العدد من العمال");
        return;
        
    }else if (!num_to_hire) {

        alert_box.confirmMessage("عفوا عليك اختيار عدد العمال المراد توظيفهم.");
        return;

    } else if (!building_type) {

        alert_box.confirmMessage("عفوا عليك اختيار نوع التوظيف .");
        return;

    } else if (!building_place) {

        alert_box.confirmMessage("عفوا عليك اختيار مكان التوظيف .");
        return;

    } else {

        var idCity = Elkaisar.CurrentCity.City.id_city;
        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/ACityJop/hire`,
            data: {
                amountToHire  : num_to_hire,
                buildingPlace : building_place,
                idCity        : idCity,
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer

            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data)

                var JsonObject = JSON.parse(data);

                if (JsonObject.state === "ok") {

                    /* calculate the decrease in city resources*/
                    Elkaisar.City.getCity(idCity).City = JsonObject.cityRes;

                    for (var index in Elkaisar.TimedTask.TaskList.Jop) 
                        if(Number(Elkaisar.TimedTask.TaskList.Jop[index].id_city) === Number(idCity))
                            delete(Elkaisar.TimedTask.TaskList.Jop[index]);
                    for(var ii in JsonObject.JopTaskList)
                        Elkaisar.TimedTask.TaskList.Jop[JsonObject.JopTaskList[ii].id] = JsonObject.JopTaskList[ii];
                    city_profile.refresh_resource_view();
                    Elkaisar.TimedTask.refreshListView();
                    

                } else if(json_data.state === "error_1"){

                    alert_box.confirmMessage("لا يمكنك توظيف هذة الكمية ");

                } else if(json_data.state === "error_2"){

                    alert_box.confirmMessage("لا يمكنك توظيف اكثر من دفعة عمال فى نفس الوقت");

                }else if(json_data.state === "no_pop"){
                    alert_box.confirmMessage("لا يوجد سكان كافية للتوظيف");
                }else if(json_data.state === "no_food"){
                    alert_box.confirmMessage("لا يوجد غذاء كافى للتوظيف");
                }else if(json_data.state === "no_wood"){
                    alert_box.confirmMessage("لا يوجد اخشاب كافية للتوظيف");
                }else if(json_data.state === "no_stone"){
                    alert_box.confirmMessage("لا يوجد احجار كافية للتوظيف");
                }else if(json_data.state === "no_metal"){
                    alert_box.confirmMessage("لا يوجد حديد كافى للتوظيف");
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    }

});




$(document).on("click" ,"#FIRE-EMPLOYEE button"  , function (){
   
    var building_place = $(".box_content").attr("data-building-place") || false;
    alert_box.jopFireEmployee(building_place);
    
});


$(document).on("click" , "#change-city-pro-rate" , function (){
     
    var foodRate  = Number($("#food-rate-input").val());
    var woodRate  = Number($("#wood-rate-input").val());
    var stoneRate = Number($("#stone-rate-input").val());
    var metalRate = Number($("#metal-rate-input").val());
    
    
    if(foodRate > 100 || foodRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(woodRate > 100 || woodRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(stoneRate > 100 || stoneRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    if(metalRate > 100 || metalRate < 0){
        
        alert_box.failMessage("معدل الغذاء كمية غير مسموحة");
        return ;
        
    }
    
    var idCity = Elkaisar.CurrentCity.idCity;
    
    $.ajax({
        
        url: `${Elkaisar.Config.NodeUrl}/api/ACityPalace/updateProductionRate`,
        data:{
            foodRate  : foodRate,
            woodRate  : woodRate,
            stoneRate : stoneRate,
            metalRate : metalRate,
            idCity    : idCity,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer
            
        },
        type: 'POST',
        beforeSend: function (xhr) {
            $("#change-city-pro-rate").attr("disabled" , "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            
            $("#change-city-pro-rate").removeAttr("disabled");
            unwaitCursor();
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var jsonData = JSON.parse(data);
            
            if(jsonData.state === "ok")
            {
                
                Elkaisar.City.getCity(idCity).City = jsonData.City;
                Elkaisar.City.getCity(idCity).Jop  = jsonData.CityJop;
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم تعديل معدل التوظيف بنجاح");

                $("#dialg_box .left-nav ul .selected").click();
                
            }
            
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
});