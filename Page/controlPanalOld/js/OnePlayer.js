


$(document).on("focusin" , "#SearchOnePlayerVal" , function (){
    $("#drop-down ul").show();
});

$(document).on("keyup" ,"#SearchOnePlayerVal" ,function (){
    
    var searchVal = $(this).val();
   
    if(searchVal.length < 2)
         return ;
     
    $("#drop-down ul").html("");
    $.ajax({
        url: `${BASE_URL}/cp/APlayer/searchByName`,
        data:{
            seg: searchVal
            
        },
        type: 'GET',
        beforeSend: function (xhr) {
           
        },
        success: function (data, textStatus, jqXHR) {
            $("#drop-down ul").html("");
          
          console.log(data);
            var jsonData =  JSON.parse(data);
            var list = "";
            
            for(var iii in jsonData){
                
                list += ` <li class="selectUserToShow" data-id-player = "${jsonData[iii].id_player}">${jsonData[iii].name} (${pormotion[jsonData[iii].porm].ar_title})</li>`;
                
            }
            
            
            $("#drop-down ul").html(list);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }

    });
    
});

$(document).on("click" , ".selectUserToShow" , function (){
    
    var idPlayer = $(this).attr("data-id-player");
    
    $("#drop-down ul").hide();
    
   ID_PLAYER_TO_SHOW = idPlayer;
    showPlayer(idPlayer);
    
});



function showPlayer (idPlayer){
    
    
    idPlayer = ID_PLAYER_TO_SHOW;
    console.log(idPlayer)
     $.ajax({
        url: `${BASE_URL}/cp/APlayer/getPlayerData`,
        data:{
            idPlayer: idPlayer
        },
        type: 'GET',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
           
           if(!isJson(data))
                return console.log(data);
            var jsonData = JSON.parse(data);
            var table = `<tr>
                            <th class="first"> اللاعب</th>
                            <th>غذاء</th>
                            <th>اخشاب</th>
                            <th>احجار</th>
                            <th>حديد</th>
                            <th>عملات</th>
                            <th>ذهب</th>
                            <th class="last">فحص</th>
                        </tr>`;
            
            for(var iii in jsonData.City){
                
                table += `<tr data-p-name="${jsonData.Player.name}" data-id-user="${jsonData.Player.id_player}" data-id-city="${jsonData.City[iii].id_city}">
                            <td>${jsonData.Player.name}</td>
                            <td class="update-resource-player" data-resource="food" data-amount="${jsonData.City[iii].food}">${jsonData.City[iii].food}</td>
                            <td class="update-resource-player" data-resource="wood" data-amount="${jsonData.City[iii].wood}">${jsonData.City[iii].wood}</td>
                            <td class="update-resource-player" data-resource="stone" data-amount="${jsonData.City[iii].stone}">${jsonData.City[iii].stone}</td>
                            <td class="update-resource-player" data-resource="metal" data-amount="${jsonData.City[iii].metal}">${jsonData.City[iii].metal}</td>
                            <td class="update-resource-player" data-resource="coin" data-amount="${jsonData.City[iii].coin}">${jsonData.City[iii].coin}</td>
                            <td class="update-resource-player" data-resource="gold" data-amount="${jsonData.City[iii].gold}">${jsonData.Player.gold}</td>
                            <td><a target="_blank" href="http://www.elkaisar.com/player-examine-99.php?idPlayer=${jsonData.Player.id_player}&server=${SERVER_ID}"><img src="img/add-icon.gif" alt="add" width="16" height="16"></a></td>
                        </tr>`;
                
                
            }
            
           
            
            $("#playerCityResource").html(table);
            
            var tableArmy = `<tr>
                                <th class="first"> اللاعب</th>
                                <th>مشاة</th>
                                <th>فرسان</th>
                                <th>مدرعين</th>
                                <th>رماة</th>
                                <th>مقاليع</th>
                                <th>منجنيق</th>
                                <th>جواسيس</th>
                                <th class="last">فحص</th>
                            </tr>`;
            
            for(var iii in jsonData.City){
                
                tableArmy += `<tr data-p-name="${jsonData.Player.name}" data-id-user="${jsonData.Player.id_player}" data-id-city="${jsonData.City[iii].id_city}">
                                    <td>${jsonData.Player.name}</td>
                                    <td class="update-army-player" data-army="army_a" data-amount="${jsonData.City[iii].army_a}">${jsonData.City[iii].army_a}</td>
                                    <td class="update-army-player" data-army="army_b" data-amount="${jsonData.City[iii].army_b}">${jsonData.City[iii].army_b}</td>
                                    <td class="update-army-player" data-army="army_c" data-amount="${jsonData.City[iii].army_c}">${jsonData.City[iii].army_c}</td>
                                    <td class="update-army-player" data-army="army_d" data-amount="${jsonData.City[iii].army_d}">${jsonData.City[iii].army_d}</td>
                                    <td class="update-army-player" data-army="army_e" data-amount="${jsonData.City[iii].army_e}">${jsonData.City[iii].army_e}</td>
                                    <td class="update-army-player" data-army="army_f" data-amount="${jsonData.City[iii].army_f}">${jsonData.City[iii].army_f}</td>
                                    <td class="update-army-player" data-army="spies"  data-amount="${jsonData.City[iii].spies}">${jsonData.City[iii].spies}</td>
                                    <td><a target="_blank" href="http://www.elkaisar.com/player-examine-99.php?idPlayer=${jsonData.Player.id_player}&server=${SERVER_ID}"><img src="img/add-icon.gif" alt="add" width="16" height="16"></a></td>
                                </tr>`;
            }
            
           
            
            $("#playerCityArmy").html(tableArmy);
            
            
            var matrialList = "";
            
            for(var iii in jsonData.Items){
                let Item = jsonData.Items[iii];
                if(ElkaisarCp.Items[Item.id_item] && Number(jsonData.Items[iii].amount) > 0){
                    
                    matrialList += `<div class="matrial-unit update-player-matrial" data-matrial="${Item.id_item}"  data-matrial-table="${ElkaisarCp.Items[Item.id_item].db_tab}" data-amount = "${jsonData.Items[iii].amount}" prize-type="matrial" data-matrial="0" style="width: 10%; height:50px;">
                                        <img src="../${ElkaisarCp.Items[Item.id_item].image}">
                                        <div class="amount">${jsonData.Items[iii].amount}</div>
                                        <div class="name"><span>${ElkaisarCp.Items[Item.id_item].name}</span></div>
                                    </div>`;
                }
                
            }
            
            $("#playerMatrialList").html(matrialList);
            
            
            var EquipList = "";
            for(var iii in jsonData.Equip){
                let OneEquip = jsonData.Equip[iii];
                let IdEquip = `${OneEquip.type}_${OneEquip.part}_${OneEquip.lvl}`;
                if(ElkaisarCp.Equips[IdEquip]){
                    
                    EquipList += `<div class="matrial-unit delete-equip-player" data-id-equip="${OneEquip.id_equip}" data-part="${OneEquip.part}" data-name="${ElkaisarCp.Equips[IdEquip].name}" prize-type="matrial" data-matrial="0" style="width: 10%; height:50px;">
                                        <img src="../${ElkaisarCp.Equips[IdEquip].image}">
                                        <div class="amount"></div>
                                        <div class="name"><span>${ElkaisarCp.Equips[IdEquip].name}</span></div>
                                    </div>`;
                    
                }
                
            }
            
            var Count = 1;
            
            console.log(jsonData.Heros)
            for(var idCity in jsonData.Heros){
                let CityHero = jsonData.Heros[idCity];
                let List = "";
                for(var index in CityHero){
                    let Hero = CityHero[index];
                    
                    List += `<div class="matrial-unit edit-player-hero" data-id-hero="${Hero.id_hero}" data-name="${Hero.name}" style="width: 10%; height:60px;">
                                <img src="../${ElkaisarCp.BaseData.HeroAvatar[Hero.avatar]}">
                                <div class="amount">${Hero.name}</div>
                                <div class="name"><span style="color : #008c10">${Hero.point_a}</span>-<span style="color: #b43d02">${Hero.point_b}</span>-<span style="color: #0065ac">${Hero.point_c}</span></div>
                                <div class="name"><span style="color : #008c10">${Hero.point_a_plus}</span>-<span style="color: #b43d02">${Hero.point_b_plus}</span>-<span style="color: #0065ac">${Hero.point_c_plus}</span></div>
                            </div>`;
                    
                }
                $("#playerHeros"+Count++).html(List);
            }
            
            $("#playerEquipList").html(EquipList);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
    
}


$(document).on("click" ,".update-resource-player", function (){
   
    var idPlayer = $(this).parents("tr").attr("data-id-user");
    var idCity = $(this).parents("tr").attr("data-id-city");
    var name  = $(this).parents("tr").attr("data-p-name");
    var resource = $(this).attr("data-resource");
    var amount  = $(this).attr("data-amount");
    
    alertBox.confirm(`تعديل الموارد للاعب (${name}) </br> </br>
                        <input id="newValue" type="text"  value="${amount}"/>` , function (){
        
        $.ajax({
            
            url: `${BASE_URL}/cp/`,
            data:{
                UPDATE_PLAYER_RESOURCES:true,
                id_player:idPlayer,
                id_city:idCity,
                resource:resource,
                amount:Number($("#newValue").val())
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                showPlayer();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
    
    
});



$(document).on("click" ,".update-army-player", function (){
   
    var idPlayer = $(this).parents("tr").attr("data-id-user");
    var idCity = $(this).parents("tr").attr("data-id-city");
    var name  = $(this).parents("tr").attr("data-p-name");
    var army = $(this).attr("data-army");
    var amount  = $(this).attr("data-amount");
    
    alertBox.confirm(`تعديل القوات للاعب (${name}) </br> </br>
                        <input id="newValue" type="text"  value="${amount}"/>` , function (){
        
        $.ajax({
            
            url: "api/player.php",
            data:{
                UPDATE_PLAYER_ARMY:true,
                id_player:idPlayer,
                id_city:idCity,
                army:army,
                amount:Number($("#newValue").val())
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                showPlayer();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
    
    
});



$(document).on("click" ,".update-player-matrial" , function (){
    
   var idPlayer = ID_PLAYER_TO_SHOW;
   var matrial  =  $(this).attr("data-matrial");
   var table    = $(this).attr("data-matrial-table");
   var amount    = $(this).attr("data-amount");
   
   
   alertBox.confirm(`تعديل المواد للاعب  </br> </br>
                        <input id="newValue" type="text"  value="${amount}"/>` , function (){
        
        $.ajax({
            
            url: "api/onePlayer.php",
            data:{
                UPDATE_PLAYER_MATRIAL:true,
                id_player:idPlayer,
                mat_table:table,
                matrial:matrial,
                amount:Number($("#newValue").val())
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
               
                showPlayer();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
   
    
});



$(document).on("click" ,".delete-equip-player" , function (){
    
    var name     = $(this).attr("data-name");
    var id_equip = $(this).attr("data-id-equip");
    var part = $(this).attr("data-part");
    
    alertBox.confirm(`  حذف المعدة ( ${name} ) للاعب  </br> </br> ` , function (){
        
        $.ajax({
            
            url: "api/onePlayer.php",
            data:{
                DELETE_EQUIP:true,
                id_player:ID_PLAYER_TO_SHOW,
                part: part,
                id_equip: id_equip
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data)
                showPlayer();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
});


$(document).on("click", ".edit-player-hero", function (){
    
    
    
});