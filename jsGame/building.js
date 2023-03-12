/* global Elkaisar.CurrentCity.City, alert_box */
$(document).on("GameReady", function () {
  $.ajax({
    url:  `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/building.json`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

        BUILDING_JSON_DATA = data;

    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});
});





const wall_nav_bar = [{
        "txt": "قائمة التحصينات",
        "title": "uni_sub"
    }, {
        "txt": "معلومات التحديث",
        "title": "upgrade_req"
    }
];


var BUILDING_JSON_DATA;


function getUpgradeData(place) {

    var type = parseInt(Elkaisar.City.getCity().BuildingType[place]);
    var lvl = parseInt(Elkaisar.City.getCity().BuildingLvl[place]);
    var table = getReqTable(type, lvl);

    switch (type) {
        case 0:            // مكان خالى 
            //  dialog box for empty place

            break;

        case 1 :          // كوخ
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : كوخ مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green"> كوخ مستوى ' + getArabicNumbers(lvl + 1) + ' يتسع لحوالى ' + getArabicNumbers((lvl) * 250) + ' فرد</h1>'
                    + '</div>';
            break;

        case 2 : // مخزن
            // dialog box for store 
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : مخزن مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green"> مخزن مستوى' + getArabicNumbers(lvl + 1) + ' يتسع لحوالى ' + getArabicNumbers(Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE][Math.min(lvl, 29)]) + ' من الموارد</h1>'
                    + '</div>';
            break;

        case 3 : // ثكنات
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : ثكنات مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">  ثكنات مستوى'
                    + getArabicNumbers(lvl + 1)
                    + ' تسريع التدريب القوات بمقدار ' + getArabicNumbers(lvl < 7 ? (lvl + 1) * 5 : 30)
                    + '%   و سوف  يسمح بتدريب ' + getArabicNumbers(lvl > 9 ? 10 : lvl + 1)
                    + '</h1>'
                    + '</div>';
            break;

        case 4 : // اسطبل
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : اسطبل مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">  اسطبل مستوى'
                    + getArabicNumbers(lvl + 1)
                    + ' تسريع التدريب القوات بمقدار ' + getArabicNumbers(lvl < 7 ? (lvl + 1) * 5 : 30)
                    + '%   و سوف  يسمح بتدريب ' + getArabicNumbers(lvl > 9 ? 10 : lvl + 1)
                    + '</h1>'
                    + '</div>';
            break;

        case 5 :     // ورشة عمل
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : ورشة عمل مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">   ورشة عمل مستوى'
                    + getArabicNumbers(lvl + 1)
                    + '  تسريع التدريب القوات بمقدار ' + getArabicNumbers(lvl < 7 ? (lvl + 1) * 5 : 30)
                    + '%   و سوف  يسمح بتدريب ' + getArabicNumbers(lvl > 9 ? 10 : lvl + 1)
                    + '</h1>'
                    + '</div>';
            break;

        case 6 :    // مسرح
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : المسرح مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">المسرح مستوى '
                    + getArabicNumbers(lvl + 1)
                    + ' يسمح بخروج '
                    + getArabicNumbers(lvl > 14 ? 15 : lvl + 1)
                    + ' بطل مستوى ١ الى ' + getArabicNumbers((lvl + 1) * 5) + ' كل ' + getArabicNumbers(lvl > 8 ? 12 : 84 - (lvl * 12)) + ' دقيقة</h1>'
                    + '</div>';
            break;


        case 7 :    // مركز
            var info = `<div class="upgrade-info">
                            <div class="header-1">
                                <h1>تحديث الى :  المركز مستوى${getArabicNumbers(lvl + 1)}</h1>
                            </div>
                            <h1 class="header-2 green">يمكنك عرض ${getArabicNumbers(lvl + 1)}  من المواد الخاصة بك فى صندوق المواد واختيارها للبيع</h1>
                        </div>`;
            break;

        case 8 :   // جامعة
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى :  الجامعة مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">الجامعة مستوى '
                    + getArabicNumbers(lvl + 1)
                    + ' تقلل المدة الدراسية  بمقدار'
                    + getArabicNumbers(lvl > 20 ? 60 : (lvl + 1) * 3) + '% وهذا  المستوى للجامعة يتيح لك دراسة التكنولوجيا المتاحة حتى مستوى '
                    + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>';
            break;

        case 9 : // اكاديمية
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى :  الاكاديمية مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">الاكاديمية مستوى '
                    + getArabicNumbers(lvl + 1)
                    + ' تقلل المدة الدراسية  بمقدار'
                    + getArabicNumbers(lvl > 20 ? 60 : (lvl + 1) * 3) + '% وهذا  المستوى للاكاديمية يتيح لك دراسة التكنولوجيا المتاحة حتى مستوى '
                    + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>';
            break;


        case 10 :  //دار مساعدة 
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى :  دار المساعدة مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">دار المساعدة  مستوى ' + getArabicNumbers(lvl + 1)
                    + '  يزيد نسبة السكان بنسبة ' + getArabicNumbers((lvl + 1) * 2)
                    + '% او يسرع من تدريب القوات بنسبة ' + getArabicNumbers((lvl + 1) * 2)
                    + '% او يزيد من سرعة البناء  بنسبة ' + getArabicNumbers((lvl + 1) * 2) + '% حسب اختيار المساعد</h1>'
                    + '</div>';
            break;



        case 11 : // البلازا
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى :  البلازا  مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">البلازا مستوى ' + getArabicNumbers(lvl + 1) + ' يمكنها ارسال حتى ' + getArabicNumbers(lvl > 10 ? 10 : lvl + 1) + ' ابطال خارج المدينة</h1>'
                    + '</div>';
            break;


        case 12 : // القصر
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى :  القصر  مستوى' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">القصر مستوى  يزيد مخزون السسترسس وعدد البرارى المملوكة</h1>'
                    + '</div>';
            break;


        case 13 : // السور
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';

            break;


        case 14 : // السوق
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';

            break;


        case 15 : // الغابات
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';

            break;


        case 16 : // الحقل
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';

            break;


        case 17 : // المنجمم
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';

            break;


        case 18 : // المحجر
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>تحديث الى : السور مستوى ' + getArabicNumbers(lvl + 1) + '</h1>'
                    + '</div>'
                    + '<h1 class="header-2 green">السور مستوى ' + getArabicNumbers(lvl + 1)
                    + ' يمتلك مساحة ' + getArabicNumbers((lvl + 1) * 100000) + ' لبناء الدفاعات  ويتحمل ايضاً ' + getArabicNumbers((lvl) * (lvl + 1) * 100000) + '</h1>'
                    + '</div>';


            break;
        case 19 : // الميناء
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>لا يمكنك تطوير المبنى فى الاصدار الحالى </h1>'
                    + '</div>'
                    + '<h1 class="header-2 green"> سيتم تحديث الاصدار الحالى لاضافة الحروب والقوات البحرية  قريبا</h1>'
                    + '</div>';

            break;
        case 20 : // المنارة
            var info = '<div class="upgrade-info">'
                    + '<div class="header-1">'
                    + '<h1>لا يمكنك تطوير المبنى فى الاصدار الحالى </h1>'
                    + '</div>'
                    + '<h1 class="header-2 green"> سيتم تحديث الاصدار الحالى لاضافة الحروب والقوات البحرية  قريبا</h1>'
                    + '</div>';

            break;
    }

    info = lvl < 30 ? info : `<div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى : ------</h1>
                                    </div>
                                    <h1 class="header-2 green"> لقد وصل المبنى الى اعلى مستوى ممكن لا يمكنك تطويرة الى مستوى اعلى</h1>
                                </div>`;
    return '<div class="upgrade_req_tooltip">' + info + table + '</div>';
}

function getReqTable(type, lvl) {

var LvlReq = Elkaisar.Building.BuildingData[type].lvlRequirment[Math.min(lvl, 29)];
    var wood       = lvl < 30 ? LvlReq.wood  : "---";
    var food       = lvl < 30 ? LvlReq.food  : "---";
    var stone      = lvl < 30 ? LvlReq.stone : "---";
    var metal      = lvl < 30 ? LvlReq.metal : "---";
    var coin       = lvl < 30 ? LvlReq.coin  : "---";
    var condetions = Elkaisar.Building.verfiyCondetion(type, lvl);
    var time       = lvl < 30 ? LvlReq.time  : "---";

    var all_con = "";
    var enough = "";
    
    for(var ii in condetions)
    {
        enough = "";
        if(condetions[ii].verfied)
            enough = "enough";
        else 
            enough = "not-enough";
        
        all_con += `<li class="${enough}">` + condetions[ii].Txt + "</li>";
    }
    
    all_con = lvl < 30 ? all_con : `<li class="not-enough">-------</li>`;

    var table = `<div class="req_table_container">
                     <table class="req_table" border="0">   
                        <thead>      
                            <tr>     
                                <td colspan="2" style="direction: rtl">             
                                    <ol>               
                                        ${all_con}
                                    </ol>  
                                </td>    
                            </tr>   
                        </thead>   
                        <tbody>      
                            <tr>     
                                <td>   
                                    <img src="images/style/food.png">     
                                    <div class="amount ${Elkaisar.CurrentCity.City.food < Number(food) ? "not_enough" : ""}">         
                                           ${food}
                                    </div>      
                                </td>        
                                <td>          
                                    <img src="images/style/iron.png">  
                                    <div class="amount ${Elkaisar.CurrentCity.City.metal < Number(metal) ? "not_enough" : ""}">           
                                           ${metal}
                                    </div>       
                                </td>       
                            </tr>  
                            <tr>       
                                <td>      
                                    <img src="images/style/wood.png">   
                                    <div class="amount ${Elkaisar.CurrentCity.City.wood < Number(wood) ? "not_enough" : ""}">               
                                          ${ wood}
                                    </div>       
                                </td>
                                <td>            
                                    <img src="images/style/stone.png">      
                                    <div class="amount ${Elkaisar.CurrentCity.City.stone < Number(stone) ? "not_enough" : ""}">           
                                           ${stone}
                                    </div>          
                                </td> 
                            </tr>     
                            <tr>      
                                <td>   
                                    <img src="images/style/coin.png"> 
                                    <div class="amount ${Elkaisar.CurrentCity.City.coin < Number(coin) ? "not_enough" : ""}">             
                                           ${coin}
                                    </div>      
                                </td>     
                                <td>    
                                    <img src="images/style/wait.png">       
                                    <div class="amount">        
                                           ${changeTimeFormat(time)}
                                    </div>   
                                </td>      
                            </tr> 
                        </tbody>
                    </table>
                </div>`;
    return table;
}



function cityHasType(building_type) {
    for (var building in Elkaisar.City.getCity().BuildingType) {
        if (Number(Elkaisar.City.getCity().BuildingType[building]) == building_type && building != "id_city" && building != "id_player") {
            return building;
        }

    }
    return false;
}



// get content acording to  building type

function getContentForBuilding(place) {

    var type = parseInt(Elkaisar.City.getCity().BuildingType[place]);
    var lvl = parseInt(Elkaisar.City.getCity().BuildingLvl[place]);

    switch (type) {
        case 0:            // مكان خالى 
            //  dialog box for empty place
            var content = `<div class="box_content empty_place for_building_box" data-building-type="${type}" data-building-place="${place}" data-building-lvl="${lvl}">
                                ${Building.contentfor_emptyPlace()}
                            </div>`;
            $(".box_content").replaceWith(content);
            break;

        case BUILDING_TYPS.COTTAGE :          // كوخ
            // dialog box for coach
            var left_content = `<div class="left-content ">${upgradeBenefits(type, Elkaisar.City.getCity().BuildingLvl[place])}</div>`;


            var right_content = Building.upgradeReqTable(`يتطلب التحديث الى المستوى ${getArabicNumbers(lvl)}`, 1, lvl, changeTimeFormat(BUILDING_JSON_DATA[type].time_req[lvl]), `الكوخ مستوى ${getArabicNumbers(lvl)}`);

            var content = `<div class="box_content building_cottage for_building_box"
                                data-building-type="${type}" data-building-place="${place}"
                                data-building-lvl="${lvl}">` + left_content + right_content + '</div>';
            $(".box_content").replaceWith(content);

            break;

        case BUILDING_TYPS.STORE : // مخزن
            // dialog box for store 
            var left_content = `<div class="left-content ">${upgradeBenefits(type, Elkaisar.City.getCity().BuildingLvl[place])}</div>`;

            var right_content = Building.dialogBoxContent_forstore(place);

            var content = `<div class="box_content building_store for_building_box"
                                data-building-type="${type}" data-building-place="${place}"
                                data-building-lvl="${lvl}">` + left_content + right_content + '</div>';

            $(".box_content").replaceWith(content);
            break;

        case BUILDING_TYPS.BARRACKS : // ثكنات
            var thknat_army = [
                {
                    type: "army_a",
                    amount: Elkaisar.CurrentCity.City.army_a,
                    image: "images/tech/soldier01.jpg",
                    title: "مشاة",
                    ar_title: "مشاة",
                    en_title: "Hastatus(i)"
                }, {
                    type: "army_d",
                    amount: Elkaisar.CurrentCity.City.army_d,
                    image: "images/tech/soldier04.jpg",
                    title: "رماة",
                    ar_title: "رماة",
                    en_title: "Segittarius(i)"
                }, {
                    type: "army_c",
                    amount: Elkaisar.CurrentCity.City.army_c,
                    image: "images/tech/soldier03.jpg",
                    title: "مدرعين",
                    ar_title: "مدرعين",
                    en_title: "Principes"
                }
            ];
            var content = Building.dialogBoxContent_forMili(thknat_army, place);
            $(".box_content").replaceWith(content);
            Building.militrayProduction.left(place);
            var max_count = 0;
            var index = 0;

            for (var obj in Elkaisar.City.getCity().BuildingType) {
                if (obj !== "id_player" && obj !== "id_city" && Number(Elkaisar.City.getCity().BuildingType[obj]) === BUILDING_TYPS.BARRACKS) {
                    if (obj === place) {
                        index = max_count;
                    }
                    max_count++;

                }
            }

            var right_nav = `<div class="right-nav" data-current-index="${index}" data-building-type="${type}">
                                <div class="wrapper flex">
                                    <div class="nav-building">
                                        <button class="GO_L_1" id="go-building-left"></button>
                                    </div>
                                    <div class="nav-building">
                                        ${max_count}/${index + 1}
                                    </div>
                                    <div class="nav-building">
                                        <button class="GO_R_1"  id="go-building-right"></button>
                                    </div>
                                </div>
                            </div>`;

            $(".right-nav").replaceWith(right_nav);


            break;

        case BUILDING_TYPS.STABL : // اسطبل
            var stabl_army = [
                {
                    type: "spies",
                    amount: Elkaisar.CurrentCity.City.spies,
                    image: "images/items/item027.jpg",
                    title: "الجواسيس",
                    ar_title: "الجواسيس",
                    en_title: "Speculatores(i)"
                }, {
                    type: "army_b",
                    amount: Elkaisar.CurrentCity.City.army_b,
                    image: "images/tech/soldier02.jpg",
                    title: "فرسان",
                    ar_title: "فرسان",
                    en_title: "Equites"
                }
            ];
            var content = Building.dialogBoxContent_forMili(stabl_army, place);
            $(".box_content").replaceWith(content);
            Building.militrayProduction.left(place);
            var max_count = 0;
            var index = 0;

            for (var obj in Elkaisar.City.getCity().BuildingType) {
                if (obj !== "id_player" && obj !== "id_city" && Number(Elkaisar.City.getCity().BuildingType[obj]) === BUILDING_TYPS.STABL) {
                    if (obj === place) {
                        index = max_count;
                    }
                    max_count++;

                }
            }

            var right_nav = `<div class="right-nav" data-current-index="${index}" data-building-type="${type}">
                                <div class="wrapper flex">
                                    <div class="nav-building">
                                        <button class="GO_L_1" id="go-building-left"></button>
                                    </div>
                                    <div class="nav-building">
                                        ${max_count}/${index + 1}
                                    </div>
                                    <div class="nav-building">
                                        <button class="GO_R_1"  id="go-building-right"></button>
                                    </div>
                                </div>
                            </div>`;

            $(".right-nav").replaceWith(right_nav);
            break;

        case BUILDING_TYPS.WORKSHOP :     // ورشة عمل
            var workshop_army = [
                {
                    type: "army_e",
                    amount: Elkaisar.CurrentCity.City.army_e,
                    image: "images/tech/soldier05.jpg",
                    title: "مقاليع",
                    ar_title: "مقاليع",
                    en_title: "Ballistae"
                }, {
                    type: "army_f",
                    amount: Elkaisar.CurrentCity.City.army_f,
                    image: "images/tech/soldier06.jpg",
                    title: "منجنيق",
                    ar_title: "منجنيق",
                    en_title: "Onagers"
                }
            ];
            var content = Building.dialogBoxContent_forMili(workshop_army, place);
            $(".box_content").replaceWith(content);
            Building.militrayProduction.left(place);
            
            var max_count = 0;
            var index = 0;

            for (var obj in Elkaisar.City.getCity().BuildingType) {
                if (obj !== "id_player" && obj !== "id_city" && Number(Elkaisar.City.getCity().BuildingType[obj]) === BUILDING_TYPS.WORKSHOP) {
                    if (obj === place) {
                        index = max_count;
                    }
                    max_count++;

                }
            }

            var right_nav = `<div class="right-nav" data-current-index="${index}" data-building-type="${type}">
                                <div class="wrapper flex">   
                                    <div class="nav-building">
                                        <button class="GO_L_1" id="go-building-left"></button>
                                    </div>
                                    <div class="nav-building">
                                        ${max_count}/${index + 1}
                                    </div>
                                    <div class="nav-building">
                                        <button class="GO_R_1" id="go-building-right"></button>
                                    </div>
                                </div>
                            </div>`;

            $(".right-nav").replaceWith(right_nav);

            break;

        case BUILDING_TYPS.THEATER :    // مسرح

            var all_heros = "";
            var left_content = "";
            Elkaisar.Building.Theater.RefreshTheaterListView (place);
           
            Elkaisar.City.getCityHeroTheater().done(function (){
                Elkaisar.Building.Theater.RefreshTheaterListView (place);
            });
            break;


        case BUILDING_TYPS.STATION :    // مركز
            $(".box_content").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));
            waitCursor();
            TradeCenter.getTradeList(0).done(function () {
                $(".box_content").replaceWith(TradeCenter.TradeListContent(TradeCenter.currentList));
                unwaitCursor();
            });
            break;

        case BUILDING_TYPS.UNIVERSITY :   // جامعة

            city_profile.refresh_city_resources();
            var content = Building.dialogBoxContent_forUni(type, lvl, place);
            $(".box_content").replaceWith(content);

            break;

        case BUILDING_TYPS.ACADEMY : // اكاديمية

            city_profile.refresh_city_resources();
            var content = Building.dialogBoxContent_for_acad(type, lvl, place);
            $(".box_content").replaceWith(content);
            break;


        case BUILDING_TYPS.WORSHIP :  //دار مساعدة 
            // var left_content = `<div class="left-content ">${upgradeBenefits(type ,Elkaisar.City.getCity().BuildingLvl[place] )}</div>`;


            // var right_content = building.upgradeReqTable(`يتطلب التحديث الى المستوى ${getArabicNumbers(lvl+1)}`  ,10 , Elkaisar.City.getCity().BuildingLvl[place],"20د",`دار المساعدة مستوى ${getArabicNumbers(lvl)}`);

            // return '<div class="box_content building_cottage">' + left_content + right_content + '</div>';
            var content = Building.dialogBoxContnet_forworship(place);
            $(".box_content").replaceWith(content);
            break;



        case 11 : // البلازا


            Building.dialogBoxContnet_forblaza(place);

            break;
        case BUILDING_TYPS.PALACE : // palace 

            var content = Building.dialogBoxContent_forpalace();
            $(".box_content").replaceWith(content);

            break;

        case 13: // wall

            var wall_army = [
                {
                    type: "wall_a",
                    amount: Elkaisar.CurrentCity.City.wall_a,
                    image: "images/tech/defense01.jpg",
                    ar_title: "كمائن"
                }, {
                    type: "wall_b",
                    amount: Elkaisar.CurrentCity.City.wall_b,
                    image: "images/tech/defense02.jpg",
                    ar_title: "ابراج"
                }, {
                    type: "wall_c",
                    amount: Elkaisar.CurrentCity.City.wall_c,
                    image: "images/tech/defense03.jpg",
                    ar_title: "احجار"
                }
            ];
            var content = Building.dialogBoxContent_forMili(wall_army, place);
            $(".box_content").replaceWith(content);
            Building.militrayProduction.left(place);

            break;

        case BUILDING_TYPS.MARKET : // market 

            var content = Market.dialogBoxContent();
            $(".box_content").replaceWith(content);
            Market.innerNav_myOffers();
            Market.innerNav_TradingStatus();
            Market.dealsList("food");

            break;
        case 15 : // wood 

            var content = Building.dialogBoxContent_forjop(type, place);
            $(".box_content").replaceWith(content);
            break;

        case 16 : // farm 

            var content = Building.dialogBoxContent_forjop(type, place);
            $(".box_content").replaceWith(content);
            break;
        case 17 : // mine 

            var content = Building.dialogBoxContent_forjop(type, place);
            $(".box_content").replaceWith(content);
            break;
        case 18 : // stone 

            var content = Building.dialogBoxContent_forjop(type, place);
            $(".box_content").replaceWith(content);
            break;
        case 19 : // sea port 

            var content = `<div class="box_content coming-soon-building">
                                <div class="logo">
                                    <img src="images/Logo-wow.png" id="logo-img" style="width: 120px;">
                                </div>
                                <div class="text">
                                    coming soon <br/>
                                    قريباَ
                                </div>
                                <hr/>
                                <div class="time_counter" time-end="1549460509"><div>
                            </div>`;
            $(".box_content").replaceWith(content);
            break;
        case 20 : // lighthouse 

            var content = `<div class="box_content coming-soon-building">
                                <div class="logo">
                                    <img src="images/Logo-wow.png" id="logo-img" style="width: 120px;">
                                </div>
                                <div class="text">
                                    coming soon <br/>
                                    قريباَ
                                </div>
                                <hr/>
                                <div class="time_counter" time-end="1549460509"><div>
                            </div>`;
            $(".box_content").replaceWith(content);
            break;
    }
}

var Building = {
    
    dialogBox: function (title, header, nav_bar, content, nav_right) {
        var head_bar = `<div class="head_bar">
                                    <img src="images/style/head_bar.png">
                                    <div class="title">
                                    ${title}
                                    </div>
                                </div>`;
        var nav_bar_list = `<div class="nav_bar">
                            
                                     <div class="left-nav">
                                         <ul>`;
        var nav_list = "";
        nav_bar.forEach(function (one)
        {
            nav_list += `<li head_title = '${one["title"]}'>
                                      ${one["title_"+UserLag.language] }
                                 </li>`;
        });

        var right_nav = "";



        nav_bar_list += nav_list + `</ul>
                                   </div>
                                 <div class="right-nav">
                                </div>
                                </div>`;
        
        if(nav_bar.length === 0){
            nav_bar_list = "";
        }
        return "<div id='dialg_box' class='for_building'>" + head_bar + header + nav_bar_list + content + "</div>";
    },

    returnDiallogBox: function (place) {
        /*
         *    GET object that holds the detail of each building 
         */
        var building_obj = BuildingConstData[Elkaisar.City.getCity().BuildingType[place]];

        /*
         *  image holds jpg image in header 
         * 
         */
        var icon = building_obj.icon;
        if (place === "wall") {
            icon = building_obj.getIcon();
        }

        /*
         * title in  the header  of building
         */
        var paragraph = building_obj.functionDesc;


        /*if  the  building is empty place i will not  show upgrade data*/

        if (parseInt(Elkaisar.City.getCity().BuildingType[place]) !== 0) {

            /*  see if its upgradale  or not*/
            var Upgradable = this.isUpgradable(Elkaisar.City.getCity().BuildingType[place], Elkaisar.City.getCity().BuildingLvl[place]);

            // prevent upgrading lighthouse(20)  and seaport(19)
            if (parseInt(Elkaisar.City.getCity().BuildingType[place]) === BUILDING_TYPS.LIGHTHOUSE || parseInt(Elkaisar.City.getCity().BuildingType[place]) === BUILDING_TYPS.SEAPORT) {

                Upgradable = false;
            }

            /*  get the  complete header  after the icon added and also th paragraph*/
            var header = Building.dialogBoxHeader(icon, Elkaisar.City.getCity().BuildingType[place], Elkaisar.City.getCity().BuildingLvl[place], paragraph, Upgradable, place);

            /* upgrade table will be addad*/
            header += getUpgradeData(place);

        } else {
            var header = `<div class="box_header">
                            <div class="close_dialog">
                               <img src="images/btns/close_b.png">
                           </div>
                           
                       </div>`;
        }



        var title = building_obj.title;

        return  Building.dialogBox(title, header, building_obj.nav_bar, "<div class='box_content for_building_box'></div>");
    },
    showDialogBox: function (place, fast) {
        var dialog_box = Building.returnDiallogBox(place);
        if (fast) {
            $("#dialg_box").replaceWith(dialog_box);
            getContentForBuilding(place);
            $(".for_building .left-nav ul li:first").addClass("selected");
        } else {

            dialogBoxShow(dialog_box, function () {
                getContentForBuilding(place);
                $(".for_building .left-nav ul li:first").addClass("selected");
            });

        }


    },

    dialogBoxContent_forpalace: function () {

        var all_workers = "";

        for(var iii in Elkaisar.TimedTask.TaskList.Building)
        {
            var Task = Elkaisar.TimedTask.TaskList.Building[iii];
            if(Number(Task.id_city) !== Number(Elkaisar.CurrentCity.City.id_city))
                continue;
            all_workers += `<div class="worker_1 worker" type="${Task.type}" place="${Task.place}">
                                    <div class="being_upgrade">
                                        <img  src="${BuildingConstData[Task.type].icon}"/>
                                    </div>
                                    <div class="building-data">
                                        <h2>
                                            مستوى ${getArabicNumbers(Task.lvl_to)}
                                        </h2>
                                        <h3> 
                                            جارى التطوير
                                        </h3>
                                    </div>
                                    <div class="right-all">
                                         <div class="time-rest">
                                            <h4> اوقت المتبقى :</h4>
                                            <span class="time_counter counter_worker_in_palace" time-end="${Task.time_end}">
                                                ${changeTimeFormat(Task.time_end - parseInt(Date.now() / 1000))}
                                            </span>
                                        </div>
                                        <div class="acce-btn">
                                            <div class="btn-wrapper">
                                                <button class="cancel-study cancel-btn"></button>
                                                <button class="acce-building-from-palace speed-up-btn edu_acce" data-id-task="${Task.id}">
                                                  <h6> تسريع </h6>
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        }
       

        var motiv = "";

        if (parseInt(Elkaisar.DPlayer.PlayerState.motiv) > Date.now() / 1000) {

            motiv = `<p>
                        فى الوقت الحالى كل مدينة تستطيع توظيف اثنان من الموظفسن
                        لذا سيكون لديك ثلاثة من البنائين يستطيعوا التعامل معهم
                    </p>
                    <div class="btn_2">
                        <button class="full-btn full-btn-2x full" id="add-motiv-palace">
                            تجديد المدة
                        </button>
                    </div>
                    <div>
                        <span class="time_counter counter_worker_in_palace" time-end="${Elkaisar.DPlayer.PlayerState.motiv}" style="display: block;text-align: center;margin-top: 15px;font-size: 16px;">
                            ${changeTimeFormat(Elkaisar.DPlayer.PlayerState.motiv - $.now() / 1000)}
                        </span>
                    </div>`;

        } else {

            motiv = `<p>
                        يمكنك زيادة عدد عمال البناءالى ثلاثة عمال فى كل المدن
                        من خلال استخدم الخطب التحفيزية فى صندوق الموارد
                    </p>
                    <div class="btn_2">
                        <button class="full-btn full-btn-2x full" id="add-motiv-palace" >${Translate.Button.Building.ContractBuilders[UserLag.language]}</button>
                    </div>`;

        }

        var output = `<div class="box_content" id="palace_content">
                            <div class="left-content ">
                                <h1>وظيفة المزيد من البنائين</h1>
                                ${motiv}
                            </div>
                            <div class="right-content">
                                ${all_workers}

                            </div>
                        </div>`;
        return output;
    },

    dialogBoxHeader: function (icon, type, lvl, paragraph, upgradable, place) {
        
        var UpgradeTask = isUpgradingNow(place); 

        if (upgradable === false && UpgradeTask === false) {
            var disabled = "disabled";
        } else {
            var disabled = "";
        }


        var header = `<div class="box_header" type="${type}" lvl="${lvl}" place ="${place}">
        
                            <div class="close_dialog">
                               <img src="images/btns/close_b.png">
                           </div>
                           <div class="${UpgradeTask !== false ? "acce-upgrade-btn" : "upgrade-btn"} big-btn ${disabled}" ${UpgradeTask !== false ? `data-id-task="${UpgradeTask.id}"` : ""} >
                               <button class="full-btn ${disabled}" ${disabled}>
                                   ${UpgradeTask !== false ? "تسريع" : Translate.Button.General.Upgrade[UserLag.language]}
                               </button>
                           </div>
                           <div class="desc flex">
                               <p class="functionDesc ellipsis">
                                  ${paragraph}
                               </p>
                                <div id="upgrade-action">
                                    ${UpgradeTask !== false ? `<div  id="cansel-building-upgrade" data-id-task="${UpgradeTask.id}"></div>` : `<div  id="building-lvl-down"></div>`}
                                </div>
                           </div>
                           <div class="building-img">
                                <div id="building-lvl-inheader">${getArabicNumbers(lvl)}</div>
                               <img src="${icon}"/>  
                           </div>
                       </div>`;
        return header;
    },

    dialogBoxContent_forUni: function (type, lvl, place) {//<div class="box_content building_theater for_building_box" >
        var uni_content = `<div class="box_content uni_tech for_building_box" category="study_uni" data-building-type="${type}" data-building-place="${place}" data-building-lvl="${lvl}">
                                <div class="left-content  full">
                               ${edu.getUniTech()}
                                </div>
                            </div>`;
        return uni_content;
    },
    dialogBoxContent_for_acad: function (type, lvl, place) {
        var acad_content = `<div class="box_content acad_tech for_building_box" category="study_acad" data-building-type="${type}" data-building-place="${place}" data-building-lvl="${lvl}">
                                <div class="left-content  full">
                                ${edu.getAcadTech()}
                                 </div>
                            </div>`;
        return acad_content;
    },
    militrayProduction: {
        left: function (place) {

            
                    
            var left_content = `<div class="left-content">
                                    <div class="header-2">
                                        <h2>الزمن الكلى</h2>
                                        <h3 id="total-time-pro" class="time_counter" time-end="0">0</h3>
                                    </div>
                                        <h2 class="roof-decor">  </h2>
                                    <div class="total-work"></div>
                                </div>`;
           
            $("#A_A_mill_LEFT").replaceWith(left_content);
            $(".mili_building  .total-work").niceScroll(SCROLL_BAR_PROP);

            this.RefreshLeft(place);
        },
        RefreshLeft: function (place) {
            
         
                        
                        
                        

            if(!place)
                place = $(".box_content").attr("data-building-place");
            
           

            var content = "";
            var total_time = 0;
            var end = 0;
            var c = 0;
          
            for( var OneTask in Elkaisar.TimedTask.TaskList.Army)
            {
                var Task = Elkaisar.TimedTask.TaskList.Army[OneTask];
                if(Task.place != place)
                    continue;
                if(Number(Task.id_city) != Number(Elkaisar.CurrentCity.City.id_city))
                    continue;
                
                
                if (c === 0) {
                    var counter = "time_counter";
                } else {
                    var counter = "";
                }
                
                content += `<div class="current-working" id_work = "${Task.id}">
                                           <div class="soldier type_1">
                                               <img src="${Elkaisar.BaseData.Army[Task.army_type].image}"/>
                                               <div class="amount">${getArabicNumbers(Task.amount)}</div>
                                               <div class="title">${Elkaisar.BaseData.Army[Task.army_type].ar_title}</div>
                                           </div>
                                           <div class="current-unite nl-b">
                                               <div class="time-rest header-2">
                                                   <span class="counter ${counter}" time-end="${Task.time_end}">
                                                    ${counter === "" ? changeTimeFormat(Task.time_end - Task.time_start) : changeTimeFormat(Task.time_end - Date.now() / 1000) }
                                                    </span>
                                                </div>
                                                <div class="acce-btn">
                                                    <button class="speed-up-btn ${Number(Task.acce) === 1 ? "acced" : "acce-army-build"}" ${parseInt(Task.acce) === 1 ? "disabled" : ""} data-id-task="${Task.id}"> تسريع</button>
                                                    <img src="images/btns/close_b.png" class="cancel-army-build">
                                                </div>
                                           </div>
                                        </div>`;

              
                end = Math.max(Task.time_end, end);
                
                c++;
            };
            
            total_time = Math.floor( end - Date.now()/1000);
            
            $(".total-work").html(content);
            $("#total-time-pro").html(changeTimeFormat(total_time));
            $("#total-time-pro").addClass("time_counter");
            $("#total-time-pro").attr("time-end", end);

        },

        middle: function (army_type) {
            var middle_content = '    <div class="middle-content">';
            for (var iii = 0; iii < army_type.length; iii++) {
                middle_content += '        <div class="soldier sol-2-build"  army_type="' + army_type[iii].type + '">'
                        + '            <img src="' + army_type[iii].image + '"/>'
                        + '            <div class="amount">' + getArabicNumbers(army_type[iii].amount) + '</div>'
                        + '            <div class="title">' + army_type[iii][(UserLag.language+"_title")] + '</div>'
                        + '        </div>';
            }
            middle_content += '    </div>';
            return middle_content;
        },

        right: function () {
            var right_content = `          <div class="rightOfRight">
                                                <div class="header-2 th" id="max_num_army">
                                                    <h1 class="nl-b "> العدد الكلى للقوات</h1>
                                                    <span></span>
                                                </div>
                                                <div class="header-2">
                                                    <input type="text" min="0" step="0" max="0" class="sol-2-build-amount only_num input numeric pull-L"/>
                                                    <div class="number-arrow-wrapper pull-L">
                                                        <label class="number-arrow up"></label>
                                                        <label class="number-arrow down"></label>
                                                    </div>
                                                </div>
                                                <div id="select-production">
                                                    <select>
                                                        <option value="none">بدون تقسيم</option>
                                                        <option value="time">حسب الوقت</option>
                                                        <option value="amount">حسب الكمية</option>
                                                    </select>
                                                </div>
                                                <div class="btn_2">
                                                    <button class="full-btn full-btn-2x build_army">${Translate.Button.Building.Produce[UserLag.language]}</button>
                                                </div>
                                            </div>
                                            <div class="leftOfRight">
                                                <h1 class="header-2 th">الشروط الاساسية للتدريب</h1>
                                                <div class="army_req_table">
                                                    <table border="0" class="req_table x-2"> 
                                                        <thead> 
                                                            <tr> 
                                                               <td colspan="2" style="direction: rtl"> 
                                                                    <ol id="army-condtions"> 
                                                                        <li> 
                                                                            ----------
                                                                        </li> 
                                                                    </ol> 
                                                                </td> 
                                                            </tr> 
                                                        </thead> 
                                                        <tbody> 
                                                            <tr> 
                                                                <td > 
                                                                    <img src="images/style/food.png"/> 
                                                                    <div class="amount sol-food"> 
                                                                       --- 
                                                                    </div> 
                                                                </td> 
                                                                <td> 
                                                                    <img src="images/style/stone.png"/> 
                                                                    <div class="amount sol-stone"> 
                                                                        ---- 
                                                                    </div> 
                                                                </td> 
                                                            </tr> 
                                                            <tr> 
                                                                <td> 
                                                                    <img src="images/style/wood.png"/> 
                                                                    <div class="amount sol-wood"> 
                                                                        --- 
                                                                    </div> 
                                                                </td> 
                                                                <td> 
                                                                    <img src="images/style/iron.png"/> 
                                                                    <div class="amount sol-metal"> 
                                                                        --- 
                                                                    </div> 
                                                                </td> 
                                                            </tr> 
                                                            <tr> 
                                                                <td> 
                                                                    <img src="images/style/coin.png"/> 
                                                                    <div class="amount sol-coin"> 
                                                                        ---- 
                                                                    </div> 
                                                                </td> 
                                                                <td> 
                                                                    <img src="images/style/population.png"/> 
                                                                    <div class="amount sol-people"> 
                                                                        ----
                                                                    </div> 
                                                                </td> 
                                                            </tr> 
                                                            <tr> 
                                                                <td colspan="2"> 
                                                                    <img src="images/style/wait.png"/> 
                                                                    <div class="amount sol-time"> 
                                                                        ---- 
                                                                    </div> 
                                                                </td>
                                                            </tr> 
                                                        </tbody> 
                                                    </table> 
                                                </div>
                                            </div>
                                        </div>`;
            return right_content;
        }
    },
    dialogBoxContent_forMili: function (army_type, place) {

        /*   refresh resource in case you need to build army*/
        city_profile.refresh_city_resources();

        var mili_contetnt = `<div class="box_content mili_building for_building_box"
                                data-building-type="${Elkaisar.City.getCity().BuildingType[place]}" data-building-place="${place}"
                                data-building-lvl="${Elkaisar.City.getCity().BuildingLvl[place]}">
                                <div id="A_A_mill_LEFT" class="left-content"></div>
                                ${this.militrayProduction.middle(army_type)}
                                <div class="right-content">
                                    <div id="mili-inner-nav" class="inner_nav">
                                        <div class="nav-title" data-inner-nav="army-dismiss">${Translate.Button.Hero.Dismiss[UserLag.language]}</div>
                                        <div class="nav-title" data-inner-nav="army-data">
                                            بيانات
                                       </div>
                                        <div class="nav-title selected" data-inner-nav="army-train">
                                            تدريب القوات
                                       </div>
                                    </div>
                                ${this.militrayProduction.right()}
                                </div>
                            </div>`;

        this.militrayProduction.left(place);
        return mili_contetnt;
    },
    dialogBoxContnet_forworship: function (place) {
        var desc = "";
        var helper = "";
        if (parseInt(Elkaisar.CurrentCity.City.helper) === 0) {

            helper = `<ul id="helper-choose">
                                <li index="0"  helper-type="1" class="selected">
                                    <div class="image">
                                        <img src="images/city/Jupiter.jpg"/>
                                    </div>
                                    <div>
                                        <h1 class="header">
                                            المساعد الاول
                                        </h1>
                                    </div>
                                </li>
                                <li index="1" helper-type="2">
                                    <div class="image">
                                        <img src="images/city/Junon.jpg"/>
                                    </div>
                                    <div>
                                        <h1 class="header">
                                            المساعد الثانى
                                        </h1>
                                    </div>
                                </li>
                                <li index="2" helper-type="3">
                                    <div class="image">
                                        <img src="images/city/Minerva.jpg"/>
                                    </div>

                                    <h1 class="header-1">
                                        المساعد الثالث
                                    </h1>

                                </li>
                            </ul>`;


            desc = `<div id="helper-desc">
                                المساعد الاول :>   يقصر المدة الزمية اللازمة للباء وتطوير المبانى   فى المدينة
                            </div>
                            <div id="confirmChoose">
                                <button class="full-btn full-btn-3x" helper-type="1">${Translate.Button.Building.ChooseDeity[UserLag.language]}</button>
                            </div> `;
        } else {

            helper = `<div id="choosen-helper">
                        <div class="header">
                            ${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[Elkaisar.CurrentCity.City.helper - 1].title}
                        </div>
                        <div class="image">
                            <img src="${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[Elkaisar.CurrentCity.City.helper - 1].image}">
                        </div>
                        <div id="changeChoose">
                            <button class="full-btn full-btn-3x">
                               تغير المساعد
                            </button>
                        </div> 
                    </div>`;
            desc = ` <div id="helper-desc">
                         ${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[Elkaisar.CurrentCity.City.helper - 1].title} :>   ${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[Elkaisar.CurrentCity.City.helper - 1].desc}
                    </div>`;
        }


        var content = `<div class="box_content building_worship for_building_box" data-building-type="${Elkaisar.City.getCity().BuildingType[place]}" data-building-place="${place}"
                                data-building-lvl="${Elkaisar.City.getCity().BuildingLvl[place]}">
                        <div class="left-content ">
                            ${helper}
                        </div>
                        <div class="right-content ">
                              ${desc}
                        </div>

                    </div>`;

        return content;
    },

    dialogBoxContnet_forblaza: function (place) {

        var wounded_army;

        Elkaisar.City.getCityWounded().done(function (data){
                var content = `     <div class="box_content building_blaza for_building_box " data-building-type="${Elkaisar.City.getCity().BuildingType[place]}" data-building-place="${place}"
                                            data-building-lvl="${Elkaisar.City.getCity().BuildingLvl[place]}">
                                        <div class="left-content ">
                                                    <h1> معالجة القوات </h1>
                                                    <p>  10 % من القوات التى تفقدها فى المعركة<br>
                                                        يتم تحويلها تلقائيا الى مشفى الموجود فى المدينة
                                                        <br>
                                                        يمكنك زيادة نسبة الاجنود المصابة من خلال تفعيل نصب الطب 
                                                        او تمثال الطب لزيادة النسبة الى 60%
                                                        <br>
                                                        تتم المعالجة باستخدام العملات فقط   
                                                    </p>

                                        </div>
                                        <div class="right-content ">
                                            <ol id="wounded_list">

                                                <li>

                                                    <div class="image">
                                                        <img src="images/tech/soldier_1.jpg"/>
                                                    </div>
                                                    <div class="amount">${Elkaisar.CurrentCity.Wounded.army_a}</div>
                                                    <div class="cure" army_type="army_a"  amount="${Elkaisar.CurrentCity.Wounded.army_a}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="image">
                                                        <img src="images/tech/soldier_2.jpg"/>
                                                    </div>
                                                    <div class="amount">${getArabicNumbers(Elkaisar.CurrentCity.Wounded.army_b)}</div>
                                                    <div class="cure" army_type="army_b" amount="${Elkaisar.CurrentCity.Wounded.army_b}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="image">
                                                        <img src="images/tech/soldier_3.jpg"/>
                                                    </div>
                                                    <div class="amount">${getArabicNumbers(Elkaisar.CurrentCity.Wounded.army_c)}</div>
                                                    <div class="cure" army_type="army_c" amount="${Elkaisar.CurrentCity.Wounded.army_c}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="image">
                                                        <img src="images/tech/soldier_4.jpg"/>
                                                    </div>
                                                    <div class="amount">${getArabicNumbers(Elkaisar.CurrentCity.Wounded.army_d)}</div>
                                                    <div class="cure" army_type="army_d" amount="${Elkaisar.CurrentCity.Wounded.army_d}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="image">
                                                        <img src="images/tech/soldier_5.jpg"/>
                                                    </div>
                                                    <div class="amount">${getArabicNumbers(Elkaisar.CurrentCity.Wounded.army_e)}</div>
                                                    <div class="cure"  army_type="army_e" amount="${Elkaisar.CurrentCity.Wounded.army_e}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                                 <li>
                                                    <div class="image">
                                                        <img src="images/tech/soldier_6.jpg"/>
                                                    </div>
                                                    <div class="amount">${getArabicNumbers(Elkaisar.CurrentCity.Wounded.army_f)}</div>
                                                    <div class="cure" army_type="army_f" amount="${Elkaisar.CurrentCity.Wounded.army_f}">
                                                        <button class="full-btn full-btn-1x ellipsis therapy pull-L">مداوة</button>
                                                        <button class="full-btn full-btn-1x ellipsis fire-wounded pull-R">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </div>
                                                </li>
                                            </ol>  
                                        </div>
                                    </div>`;

                $(".box_content").replaceWith(content);
        });
        



    },
    // content  dialogbox of empty places 
    contentfor_emptyPlace: function () {
        var content = `
                                <div class="left-content  full">
                                    <ul class="total">
                                        <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building01.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>كوخ</h2>
                                            </div>
                                            <div class="full-btn full-btn-2x construct_building" data-building="1">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>
                                        <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building02.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>مخازن</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="2">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>
                                        <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building03.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>ثكنات</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="3">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>
                                        <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building04.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>اسطبل</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="4">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>
                                        <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building05.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>ورشة عمل</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="5">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        // check for مسرح
        if (!cityHasType(6)) {
            content += `               <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building06.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>مسرح</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="6" >${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }

        // check for مركز
        if (!cityHasType(7)) {
            content += `               <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building08.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>مركز</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x"  data-building="7">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }

        if (!cityHasType(8)) {
            content += `              <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building09.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>الجامعة</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x"  data-building="8">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }
        if (!cityHasType(9)) {
            content += `             <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building10.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>اكاديمية</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x"  data-building="9">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }

        if (!cityHasType(10)) {
            content += `            <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building11.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>دار المساعدة</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="10">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }

        if (!cityHasType(11)) {
            content += `             <li>
                                            <div class="img-inside-box">
                                                <img src="images/building/building12.jpg" class="big-img">
                                            </div> 
                                            <div class="txt-inside-box">
                                                <h2>البلازا</h2>
                                            </div>
                                            <div class="full-btn construct_building full-btn-2x" data-building="11">${Translate.Button.Building.Erect[UserLag.language]}</div>
                                        </li>`;
        }
        content += '        </ul>'
                + '    </div>';
        return content;
    },
    /**/

    dialogBoxContent_forjop: function (building_type, place) {

        city_profile.refresh_city_resources();
        building_type = parseInt(building_type);
        if (building_type === undefined) {
            building_type = 15;
        }

        var content = `<div class="box_content for_city_jop for_building_box " data-building-type="${Elkaisar.City.getCity().BuildingType[place]}" data-building-place="${place}"
                                            data-building-lvl="${Elkaisar.City.getCity().BuildingLvl[place]}">
                            <div class="left-content">
                                <table id="job-typs">
                                    <tbody>
                                        <tr>
                                            <td class="${building_type === 16 ? "selected" : ""}" building_type="16" place="farm">
                                                <div class="select-layer">
                                                    <div class="fram">
                                                        <div class="over-text" style="background-image: url(images/building/building18.jpg)">
                                                            <h1 class="stroke"> وظائف الحقل</h1>
                                                            <h2>${getArabicNumbers(Elkaisar.City.getCity().Jop.food)}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="${building_type === 15 ? "selected" : ""}" building_type="15" place="wood">
                                                <div class="select-layer">
                                                    <div class="fram">
                                                        <div class="over-text" style="background-image: url(images/building/building19.jpg)">
                                                            <h1 class="stroke"> وظائف الغابات</h1>
                                                            <h2>${getArabicNumbers(Elkaisar.City.getCity().Jop.wood)}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="${building_type === 18 ? "selected" : ""}" building_type="18" place="stone">
                                                <div class="select-layer">
                                                    <div class="fram">
                                                        <div class="over-text" style="background-image: url(images/building/building20.jpg)">
                                                            <h1 class="stroke"> وظائف المحجر</h1>
                                                            <h2>${getArabicNumbers(Elkaisar.City.getCity().Jop.stone)}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="${building_type === 17 ? "selected" : ""}" building_type="17" place="mine">
                                                <div class="select-layer">
                                                    <div class="fram">
                                                        <div class="over-text" style="background-image: url(images/building/building21.jpg)">
                                                            <h1 class="stroke"> وظائف المناجم</h1>
                                                            <h2>${getArabicNumbers(Elkaisar.City.getCity().Jop.metal)}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="right-content">
                                <div id="pay-for-jop">
                                    <h1 id="jop-title">
                                        انشاء وظائف ${BuildingConstData[building_type].title} فى المدينة
                                    </h1>
                                    <div id="jop_req_table">
                                        <table class="req_table" border="0">            
                                            <tbody>       
                                                <tr>        
                                                    <td>     
                                                        <img src="images/style/food.png">    
                                                        <div class="amount food">
                                                            ${getArabicNumbers(BuildingConstData[building_type].res_for_jop.food)}
                                                        </div>     
                                                    </td>                
                                                    <td>                 
                                                        <img src="images/style/iron.png">   
                                                        <div class="amount metal">
                                                            ${getArabicNumbers(BuildingConstData[building_type].res_for_jop.metal)}
                                                        </div>    
                                                    </td>            
                                                </tr>       
                                                <tr>          
                                                    <td>          
                                                        <img src="images/style/wood.png">         
                                                        <div class="amount wood">
                                                            ${getArabicNumbers(BuildingConstData[building_type].res_for_jop.wood)}
                                                        </div>     
                                                    </td>  
                                                    <td>         
                                                        <img src="images/style/stone.png">           
                                                        <div class="amount stone">
                                                            ${getArabicNumbers(BuildingConstData[building_type].res_for_jop.stone)}
                                                        </div>    
                                                    </td>      
                                                </tr>           
                                                <tr>            
                                                    <td>           
                                                        <img src="images/style/coin.png">         
                                                        <div class="amount">
                                                            ----
                                                        </div>    
                                                    </td>      
                                                    <td>        
                                                        <img src="images/style/wait.png">    
                                                        <div class="amount time">
                                                            ${changeTimeFormat(BuildingConstData[building_type].res_for_jop.time)}
                                                        </div>  
                                                    </td>     
                                                </tr>     
                                            </tbody>
                                        </table>
                                    </div>
                                    <h1 class="header-2"> اقصى عدد للوظايف فى المدينة: <span>${getArabicNumbers(Max_of.city_jop(CITY_JOP_REQ[place.toUpperCase()], place))}</span></h1>
                                    <div id="jop-num-input">
                                        <span>
                                            المبلغ المطلوب
                                        </span>
                                        <input  type="text" step="${Max_of.city_jop(CITY_JOP_REQ[place.toUpperCase()], place)}" max="${Max_of.city_jop(CITY_JOP_REQ[place.toUpperCase()], place)}" min="0" class="only_num input numeric pull-L" value="0"/>
                                        <div class="number-arrow-wrapper pull-L">
                                            <label class="number-arrow up"></label>
                                            <label class="number-arrow down"></label>
                                        </div>
                                    </div>
                                </div>
                                <div id="jop_desc">
                                    <p>
                                        الجدول المقابل يوضح  الموارد  المطلوبة لتوظيف 
                                        عدد معين من الموظفين ليعمل فى الحقول او انتاج الصخور او انتاج الحديدوالخشب من الغابات
                                        وكذالك ايضا يوضح المدة المستغرقة لانشاء هذه الوظائف
                                        اذا كان عدد السكان كافى وعدد الوظائف كبيرة فان ذالك يذيد من انتاجية الموارد فى المدينة 
                                        اما اذا كان عدد السكان اقل من عدد الوظائف المتوفرةفذالك يقلل انتاج الموارد فى المدينة
                                        يمكنك تعديل نسب  الوظائف من خلال نشاطات الانتاج فى القصر
                                    </p>
                                    <div id="hire-btn">
                                        <button class="full-btn full-btn-2x ">${Translate.Button.Building.CreatJops[UserLag.language]}</button>
                                    </div>
                                    <div id="FIRE-EMPLOYEE">
                                        <button class="full-btn full-btn-3x"> ${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                    </div>
                                </div>

                            </div>
                        </div>`;

        return content;
    },
    /**
     * 
     * @param {string} header
     * @param {int} food
     * @param {int} wood
     * @param {int} stone
     * @param {int} metal
     * @param {int} coin
     * @param {text} time
     * @param {text} condtion
     * @returns {String}
     */
    upgradeReqTable: function (header, type, lvl, time, condtion) {
        var right_content = '<div class="right-content ">'
                + '<h1 class="header-1">'
                + header
                + '</h1>'
                + getReqTable(type, lvl)
                + '</div>';
        return right_content;
    },

    isUpgradable: function (type, lvl) {

        var condetions = Elkaisar.Building.verfiyCondetion(type, lvl);
        for(var ii in condetions)
        {
            
            if(!condetions[ii].verfied)
                return false;
            
        }
        if (Number(lvl) > 29) {

            return false;
        } else if (Elkaisar.CurrentCity.City.food < this.calResource.food(type, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.wood < this.calResource.wood(type, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.stone < this.calResource.stone(type, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.metal < this.calResource.metal(type, lvl)) {
            return false;
        } else {
            return true;
        }
    },
    calResource: {

        food: function (type, lvl) {

            return lvl < 30 ? BUILDING_JSON_DATA[type]["lvl_req"][lvl]["food"] : "--";
        },
        wood: function (type, lvl) {

            return lvl < 30 ? BUILDING_JSON_DATA[type]["lvl_req"][lvl]["wood"] : "--";
        },
        stone: function (type, lvl) {

            return lvl < 30 ? BUILDING_JSON_DATA[type]["lvl_req"][lvl]["stone"] : "--";
        },
        metal: function (type, lvl) {

            return lvl < 30 ? BUILDING_JSON_DATA[type]["lvl_req"][lvl]["metal"] : "--";
        }
    }

};


/*
 * 
 * @param {number} building_Type
 * @returns {number}
 */
Building.countOf = function (building_Type) {

    building_Type = Number(building_Type);
    var total = 0;

    for (var index in Elkaisar.City.getCity().BuildingType) {

        if (Number(Elkaisar.City.getCity().BuildingType[index]) === building_Type
                && index !== "id_player"
                && index !== "id_city") {

            total++;

        }

    }
    return total;

};


Building.dialogBoxContent_forstore = function (place) {

    var box_content = `<div class="right-content">
                    <div class="stat-table">
                        <div class="th">
                            <div class="td_1 ellipsis" style="width: 25%;">${Translate.Title.TH.Resource[UserLag.language]}</div>
                            <div class="td_2 ellipsis" style="width: 25%;">${Translate.Title.TH.YouHave[UserLag.language]}</div>
                            <div class="td_3 ellipsis" style="width: 25%;">${Translate.Title.TH.StorageCapacity[UserLag.language]}</div>
                            <div class="td_4 ellipsis" style="width: 25%;">${Translate.Title.TH.StorageRatio[UserLag.language]}</div>
                        </div>
                        <ul>
                            <li class="font-2">
                                <div class="resource-icon">
                                    <img src="images/style/food.png"/>
                                </div>
                                <div class="resource-qun">
                                    ${Math.floor(Elkaisar.CurrentCity.City.food)}
                                </div>
                                <div class="stor-cap">
                                    ${Elkaisar.CurrentCity.City.food_cap}
                                </div>
                                <div class="stor-percent">
                                    <input type="text" class="only_num input numeric pull-L" max="100" step="1"  min="0" value="${Elkaisar.CurrentCity.Storage.food_storage_ratio}" id="cap-food-input"/>
                                    <div class="number-arrow-wrapper pull-L" >
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                </div>
                            </li>
                            <li class="font-2">
                                <div class="resource-icon">
                                    <img src="images/style/wood.png"/>
                                </div>
                                <div class="resource-qun">
                                    ${Math.floor(Elkaisar.CurrentCity.City.wood)}
                                </div>
                                <div class="stor-cap">
                                    ${Elkaisar.CurrentCity.City.wood_cap}
                                </div>
                                <div class="stor-percent">
                                    <input type="text" class="only_num input numeric pull-L" max="100" step="1"  min="0" value="${Elkaisar.CurrentCity.Storage.wood_storage_ratio}" id="cap-wood-input"/>
                                    <div class="number-arrow-wrapper pull-L" >
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                </div>
                            </li>
                            <li class="font-2">
                                <div class="resource-icon">
                                    <img src="images/style/stone.png"/>
                                </div>
                                <div class="resource-qun">
                                    ${Math.floor(Elkaisar.CurrentCity.City.stone)}
                                </div>
                                <div class="stor-cap">
                                    ${Elkaisar.CurrentCity.City.stone_cap}
                                </div>
                                <div class="stor-percent">
                                    <input type="text" class="only_num input numeric pull-L" max="100" step="1" min="0" value="${Elkaisar.CurrentCity.Storage.stone_storage_ratio}" id="cap-stone-input"/>
                                    <div class="number-arrow-wrapper pull-L" >
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                </div>
                            </li>
                            <li class="font-2">
                                <div class="resource-icon">
                                    <img src="images/style/iron.png"/>
                                </div>
                                <div class="resource-qun">
                                    ${Math.floor(Elkaisar.CurrentCity.City.metal)}
                                </div>
                                <div class="stor-cap">
                                    ${Elkaisar.CurrentCity.City.metal_cap}
                                </div>
                                <div class="stor-percent">
                                    <input type="text" class="only_num input numeric pull-L" max="100" step="1" min="0" value="${Elkaisar.CurrentCity.Storage.metal_storage_ratio}"  id="cap-metal-input"/>
                                    <div class="number-arrow-wrapper pull-L" >
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                </div>
                            </li>
                           <li class="font-2 total-storage">
                                اجمالى  سعة التخزين: ${Elkaisar.CurrentCity.Storage.total_cap}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; اجمالى المساحة الفارغة: ${
            Math.floor(Math.max(0, (Elkaisar.CurrentCity.Storage.total_cap -
                    Math.min(Elkaisar.CurrentCity.City.food, Elkaisar.CurrentCity.City.food_cap) -
                    Math.min(Elkaisar.CurrentCity.City.wood, Elkaisar.CurrentCity.City.wood_cap) -
                    Math.min(Elkaisar.CurrentCity.City.stone, Elkaisar.CurrentCity.City.stone_cap) -
                    Math.min(Elkaisar.CurrentCity.City.metal, Elkaisar.CurrentCity.City.metal_cap))))}
                            </li>
                        </ul>
                        
                        <div id="accept-store-new-val">
                            <button class="full-btn full-btn-2x">${Translate.Button.Building.Confirm[UserLag.language]}</button>
                        </div>
                    </div>
                </div>
                `;
    return box_content;
};


Building.BuildingWithMaxLvl = function (type) {

    var max_lvl = 0;

    for (var building in Elkaisar.City.getCity().BuildingLvl) {

        if (Number(Elkaisar.City.getCity().BuildingType[building]) === Number(type)
                && Elkaisar.City.getCity().BuildingLvl[building] > max_lvl
                && building !== "id_player"
                && building !== "id_city") {
            max_lvl = Number(Elkaisar.City.getCity().BuildingLvl[building]);
        }

    }

    return max_lvl;


};


Elkaisar.Building.lvlFunc = function (type, lvl, thirdPar, forthPar, fifthPar, sixthPar){
    
    lvl = Number(lvl);
    var Building = BuildingConstData[type];
    var func     = BuildingConstData[type].func;
   
    func = func.replace( /\{1\}/g,   Building.title);
    func = func.replace( /\{0\}/g,   lvl);
    func = func.replace( /\{2\}/g,  thirdPar);
    if(forthPar){
        console.log(forthPar)
      func = func.replace( /\{3\}/g,  forthPar);  
    }
    if(fifthPar){
      func = func.replace( /\{4\}/g,  fifthPar);  
    }
    if(sixthPar){
      func = func.replace( /\{5\}/g,  sixthPar);  
    }
    
  
    return `<p>${func}<br></p>`;
};

function upgradeBenefits(type, lvl)
{
    var building_type = parseInt(type);
    lvl = Number(lvl);
    switch (type) {
        case 0: // empty place 
            break;
        case BUILDING_TYPS.COTTAGE: // cottage

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl) * 250)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, (lvl + 1) * 250)}`;
            break;
        case BUILDING_TYPS.STORE:  // stores

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE][Math.min(lvl - 1 , 29)])}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE][Math.min(lvl , 29)])}`;
            break;
        case BUILDING_TYPS.BARRACKS:  // thaknat

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, lvl * 3 , Math.min(lvl, 10))}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, (lvl + 1) * 3 , Math.min(lvl + 1, 10))}`;
            break;
        case BUILDING_TYPS.STABL:   // stabl

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, lvl * 3 , Math.min(lvl, 10))}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, (lvl + 1) * 3 , Math.min(lvl + 1, 10))}`;
            break;
        case BUILDING_TYPS.WORKSHOP:   // workshop 

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, lvl * 3 , Math.min(lvl, 10))}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, (lvl + 1) * 3 , Math.min(lvl + 1, 10))}`;
            break;
        case BUILDING_TYPS.THEATER:   // theater

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, Math.min(lvl, 10) , (lvl) * 5)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, Math.min(lvl + 1, 10) , (lvl + 1) * 5)}`;
            break;
        case BUILDING_TYPS.STATION:   // station

            var benefit      = ` <h1>المستوى الحالى </h1>`;
            var benefit_next = `<h1>المستوى التالى </h1>`;
            break;
        case BUILDING_TYPS.UNIVERSITY:   // univeisty

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, lvl * 3, lvl )}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl + 1) * 3, lvl + 1 )}`;
            break;
        case BUILDING_TYPS.ACADEMY: // acadmy   

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, lvl * 3, lvl )}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl + 1) * 3, lvl + 1 )}`;
            break;
        case BUILDING_TYPS.WORSHIP: //  warship place

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl)}`;
            var benefit_next = `<h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl)}`;
            break;
        case BUILDING_TYPS.HOSPITAL:  // hospital

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, Math.min(lvl, 20))}`;
            var benefit_next = `<h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, Math.min(lvl, 20))}`;
            break;
        case BUILDING_TYPS.PALACE:    // palace 

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 2 + 3),(lvl > 10 ? 10 : lvl),(lvl * 20000000), (lvl * 2))}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1)* 2 + 3),(lvl + 1 > 10 ? 10 : lvl + 1),((lvl + 1) * 20000000), ((lvl + 1) * 2))}`;

            break;
        case 13: // wall

            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 10000), (lvl * 1000000))}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1) * 10000), ((lvl + 1) * 1000000))}`;

            break;
        case 14: // market
            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 10000), Math.min(lvl , 10))}`;
            var benefit_next = `<h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1)* 10000), Math.min(lvl + 1 , 10))}`;
            break;

        case 15: // wood  الغابات
            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 100) , lvl)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1) * 100), lvl + 1)}`;
            break;

        case 16: // farm  المزارع
            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 100) , lvl)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1) * 100), lvl + 1)}`;
            break;

        case 17: // mine  المناجم
            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 100) , lvl)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1) * 100), lvl + 1)}`;
            break;

        case 18: // stone  المحجر
            var benefit      = ` <h1>المستوى الحالى </h1>${Elkaisar.Building.lvlFunc(type, lvl, (lvl * 100) , lvl)}`;
            var benefit_next = ` <h1>المستوى التالى </h1>${Elkaisar.Building.lvlFunc(type, lvl + 1, ((lvl + 1) * 100), lvl + 1)}`;
            break;

    }

    benefit_next = lvl < 30 ? benefit_next : `<h1>المستوى التالى </h1>
                            <p>لا يوجد مستوى تالى المستوى الحالى اعلى مستوى للمبنى</p>`;
    return benefit + benefit_next;
}





function buildingClick(place, fast) {
    if (!fast) {
        fast = false;
    }
    //if (Elkaisar.GE.CityScene.Scrolling.isBeingDragged) {
        if(place)
            Building.showDialogBox(place, fast);

    //}
}



// get upgrade data acording to  building type








$(document).on("click", ".reduce-time-for-jop img", function () {



    var idTask = $(this).attr("data-id-task");
    var matrial_to_use = [
        "polit_a",
        "polit_b",
        "polit_c",
        "polit_d"
    ];

    BoxOfMatrialToUse(matrial_to_use, "jop_acce", 1, idTask);




});




/*____________________________________________________________________________*/
/*------------------------NAVIGATE INTO WORSHIP HELPER--------------------*/

$(document).on("click", "#helper-choose li", function () {

    $("#helper-choose li").removeClass("selected");
    $(this).addClass("selected");

    var index = $(this).attr("index");
    var helper = $(this).attr("helper-type");

    var desc = ` ${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[index][(UserLag.language+"_title")]} :> ${BuildingConstData[BUILDING_TYPS.WORSHIP].helpers[index].desc}  `;

    $("#helper-desc").html(desc);
    $("#confirmChoose button").attr("helper-type", helper);

});



/*confirm  usinng helper*/
$(document).on("click", "#confirmChoose button", function () {

    var helper = $(this).attr("helper-type");
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ACity/changeCityHelper`,
        data: {
            idCity: Elkaisar.CurrentCity.City.id_city,
            newHelper: helper,
            token: Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
              Elkaisar.LBase.Error(data);
                return;
            }

            if (json_data.state === "ok")
            {
                Elkaisar.CurrentCity.City = json_data.City;
                $(".box_content").replaceWith(Building.dialogBoxContnet_forworship());
                alert_box.succesMessage("تم تعديل المساعد بنجاح");

            } else {

                alert_box.confirmMessage(" لم يتم تغير المساعد");

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });


});


/*___________________________________________________________________________*/
/*                                          changeChoose                     */

$(document).on("click", "#changeChoose button", function () {

    var matrial_to_use = [
        "help_house_chng"
    ];

    BoxOfMatrialToUse(matrial_to_use, "reset_helper");

});



/*___________________________________________________________________________*/
/*-----------------------------WOUNDED THERYPY-------------------------------*/

$(document).on("click", ".cure .therapy ", function () {

    var army_type = $(this).parent().attr("army_type");
    var amount = $(this).parent().attr("amount");
    var self_ = $(this);

    if (Number(amount) === 0) {

        alert_box.confirmMessage("لا  يوجد قوات لمداواتها");
        return;

    }

    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    alert_box.confirmDialog(`تأكيد مداواة ${amount} ${Elkaisar.BaseData.Army[army_type].ar_title} مقابل ${amount*Elkaisar.BaseData.Army[army_type].coin} عملة سسترسس`, function (){
        
        $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/ACity/cureCityWounded`,
            data: {
                idCity: idCity,
                armyType: army_type,
                server: Elkaisar.Config.idServer,
                token : Elkaisar.Config.OuthToken
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                if (isJson(data)) {
                    var json_data = JSON.parse(data);
                } else {
                    Elkaisar.LBase.Error(data);
                }


                if (json_data.state === "ok") {

                    self_.parent().prev(".amount").html(getArabicNumbers(0));
                    self_.parent().attr("amount", 0);

                    Elkaisar.City.getCity(idCity).Wounded = json_data.cityWounded;
                    Elkaisar.City.getCity(idCity).City    = json_data.cityRes;


                }else if(json_data.state === "error_1"){
                    alert_box.confirmMessage(`ليس لديك عملات كافية لمداوة الجرحى </br> 
                                                    كمية العملات المطلوية ${json_data.coinAmount}`);
                }else if(json_data.state === "error_0"){

                    alert_box.confirmMessage("لا يمكن   مداوة هذة القوات");

                } else {

                    alert_box.confirmMessage("لا يمكن   مداوة هذة القوات");

                }

                city_profile.refresh_army_view();
                city_profile.refresh_resource_view();

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });
        
    });
    

});





/*----------------------------------------------------------------------------*/
/*                              FIRE WOUNDED SOLIDIER                         */
$(document).on("click", ".cure .fire-wounded", function () {

    var army_type = $(this).parent().attr("army_type");
    var amount = $(this).parent().attr("amount");
    var self_ = $(this);

    if (Number(amount) === 0) {

        alert_box.confirmMessage("لا  يوجد قوات لطردها");
        return;

    }
    var idCity = Elkaisar.CurrentCity.City.id_city
    alert_box.confirmDialog(`تأكيد طرد ${amount} ${Elkaisar.BaseData.Army[army_type].ar_title}`, function (){
            $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/ACity/fireCityWounded`,
                data: {
                    idCity: idCity,
                    armyType: army_type,
                    server : Elkaisar.Config.idServer,
                    token: Elkaisar.Config.OuthToken
                },
                type: 'POST',
                success: function (data, textStatus, jqXHR) {

                    if(!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);

                    var json_data = JSON.parse(data);

                    if (json_data.state === "ok") {

                        self_.parent().prev(".amount").html(getArabicNumbers(0));
                        self_.parent().attr("amount", 0);

                        Elkaisar.City.getCity(idCity).Wounded = json_data.cityWounded;
                        Elkaisar.City.getCity(idCity).City    = json_data.cityRes;


                    } else {

                        alert_box.confirmMessage("لا يمكن طرد او مداوة هذة القوات");

                    }
                    city_profile.refresh_army_view();
                    city_profile.refresh_resource_view();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }

            });
        })

});






$(document).on("click", "#add-motiv-palace", function () {

    var matrial_to_use = [
        "motiv_60",
        "motiv_7"
    ];

    BoxOfMatrialToUse(matrial_to_use, "add_city_builder");

});











$(document).on("click", "#job-typs td", function () {

    var building_type = $(this).attr("building_type");
    var place = $(this).attr("place");

    $(".box_content").replaceWith(Building.dialogBoxContent_forjop(building_type, place));

    var building_obj = BuildingConstData[Elkaisar.City.getCity().BuildingType[place]];
    var icon = building_obj.icon;
    var paragraph = building_obj.functionDesc;
    var Upgradable = Building.isUpgradable(building_type, Elkaisar.City.getCity().BuildingLvl[place]);
    var header = Building.dialogBoxHeader(icon, Elkaisar.City.getCity().BuildingType[place], Elkaisar.City.getCity().BuildingLvl[place], paragraph, Upgradable, place);


    $(".box_header").replaceWith(header);

    $(".upgrade_req_tooltip").replaceWith(getUpgradeData(place));


});




/*
 *    cunstruct building
 */

$(document).on("click", ".construct_building", function () {

    var building_place = $(".for_building_box").attr("data-building-place");
    var building_type = Number($(".for_building_box").attr("data-building-type"));
    var building_lvl = Number($(".for_building_box").attr("data-building-lvl"));
    var building_to_build = Number($(this).attr("data-building"));

    if (parseInt(building_lvl) !== 0 || parseInt(building_type) !== 0 || !building_place) {

        alert_box.confirmMessage(" لا يمكنك بناء  مبنى جديد هنا !");
        return;
        /*   this buildings sould be one in the city*/
    } else if (cityHasType(building_to_build) !== false && (building_to_build >= 6)) {

        alert_box.confirmMessage(`لا يمكنك بناء اكثر من ${BuildingConstData[building_to_build].title} فى المدينة`);
        return;

    } else {

        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/ACityBuilding/constructNewBuilding`,
            data: {
                buildingPlace: building_place,
                buildingType: building_to_build,
                templePlace: cityHasType(BUILDING_TYPS.WORSHIP),
                idCity: Elkaisar.CurrentCity.City.id_city,
                server: Elkaisar.Config.idServer,
                token : Elkaisar.Config.OuthToken

            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {

                if(!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                
                var json_data = JSON.parse(data)

                if (json_data.state === "ok") {

                    for (var iii in Elkaisar.TimedTask.TaskList.Building)
                        if (Number(Elkaisar.TimedTask.TaskList.Building[iii].id_city) === Number(Elkaisar.CurrentCity.City.id_city))
                            delete(Elkaisar.TimedTask.TaskList.Building[iii]);
                    for (var iii in json_data.list)
                        Elkaisar.TimedTask.TaskList.Building[json_data.list[iii].id] = json_data.list[iii];

                    Elkaisar.City.getCity().BuildingLvl[building_place] = 1;
                    Elkaisar.City.getCity().BuildingType[building_place] = building_to_build;
                    
                    
                    $(".close_dialog").click();
                    
                    buildingClick(building_place, true);
                    fillCityWithBuilding();
                    Elkaisar.TimedTask.refreshListView();
                    Elkaisar.City.getCityBase();

                } else if (json_data.state === "error_0") {
                    alert_box.failMessage("لا يوجد بنائين فى المدينة");
                } else if (json_data.state === "error_1") {
                    alert_box.failMessage("عليك توظيف المزيد من البنائين");
                } else if (json_data.state === "error_2") {
                    alert_box.failMessage("شروط البناء غير كافية");
                } else if (json_data.state === "error_3") {
                    alert_box.failMessage("اقصى مستوى للوصول اليه هو 30");
                } else {

                    alert_box.confirmMessage("حدث خطأ");

                }

                    

                  

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    }



});



/*
 *    change  city storage ration
 */
$(document).on("click", "#accept-store-new-val button", function () {

    var food_val = Number($("#cap-food-input").val());
    var wood_val = Number($("#cap-wood-input").val());
    var stone_val = Number($("#cap-stone-input").val());
    var metal_val = Number($("#cap-metal-input").val());

    if (food_val < 0 || wood_val < 0 || stone_val < 0 || metal_val < 0) {


        alert_box.failMessage("احد القيم غير صحيحية ");
        return;
    }

    if ((food_val + wood_val + stone_val + metal_val) > 100) {

        alert_box.confirmMessage("لا يمكن ان تكون نسبة التخزين اكبر من %100");
        return ;
    } 

    var idCity = Elkaisar.CurrentCity.idCity;
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/ACityStorage/updatePercentage`,
        data: {
            foodPerc  : food_val,
            woodPerc  : wood_val,
            stonePerc : stone_val,
            metalPerc : metal_val,
            idCity    : idCity,
            token     : Elkaisar.Config.OuthToken,
            server    : Elkaisar.Config.idServer

        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            
            if(JsonObject.state === "ok")
            {
                Elkaisar.City.getCity(idCity).City   = JsonObject.City;
                Elkaisar.City.getCity(idCity).Storage = JsonObject.cityStorage;
                buildingClick($(".box_content").attr("data-building-place"), true);
                city_profile.refresh_resource_view();
                alert_box.succesMessage("تم تعديل النسب بنجاح");
            } else if(JsonObject.state === "error_0"){
                alert_box.failMessage("لا يمكن ان يكون  مجموع النسب اعلى من 100%");
            } else if(JsonObject.state === "error_1"){
                alert_box.failMessage("احد القيم غير صحيحية ");
            }

            /*if (isJson(data)) {
                var json_data = JSON.parse(data);
                console.log(json_data)
                if (json_data.state === "ok") {
                    alert_box.succesMessage("تم تعديل نسب التخزين بنجاح");
                    Elkaisar.CurrentCity.City.food_cap = json_data.food_cap;
                    Elkaisar.CurrentCity.City.wood_cap = json_data.wood_cap;
                    Elkaisar.CurrentCity.City.stone_cap = json_data.stone_cap;
                    Elkaisar.CurrentCity.City.metal_cap = json_data.metal_cap;
                    Elkaisar.CurrentCity.Storage.total_cap = json_data.total_cap;
                    Elkaisar.CurrentCity.City.LS = json_data.LS;

                    Elkaisar.CurrentCity.Storage.food_storage_ratio = food_val;
                    Elkaisar.CurrentCity.Storage.wood_storage_ratio = wood_val;
                    Elkaisar.CurrentCity.Storage.stone_storage_ratio = stone_val;
                    Elkaisar.CurrentCity.Storage.metal_storage_ratio = metal_val;

                    $(".building_store")
                            .children(".right-content")
                            .replaceWith(
                                    Building
                                    .dialogBoxContent_forstore(
                                            $(".box_content")
                                            .attr("data-building-place")
                                            )
                                    );

                } else {

                    console.log(data);
                    alert_box.failMessage("فشل تعديل نسب التخزين");
                }


            } else {
                alert(data);
                console.log(data);
            }*/

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });

    

});



$(document).on("click", "#go-building-left", function () {

    var current_index = $(this).parents(".right-nav").attr("data-current-index");
    var building_type = $(this).parents(".right-nav").attr("data-building-type");

    var max_count = 0;
    var index = 0;
    var building_places = [];

    for (var obj in Elkaisar.City.getCity().BuildingType) {
        if (obj !== "id_player" && obj !== "id_city" && Number(Elkaisar.City.getCity().BuildingType[obj]) === Number(building_type)) {
            max_count++;
            building_places.push(obj);
        }
    }

    var coming_place = building_places[current_index - 1] || building_places[0];
    buildingClick(coming_place, true);


});

$(document).on("click", "#go-building-right", function () {

    var current_index = Number($(this).parents(".right-nav").attr("data-current-index"));
    var building_type = $(this).parents(".right-nav").attr("data-building-type");

    var max_count = 0;
    var index = 0;
    var building_places = [];

    for (var obj in Elkaisar.City.getCity().BuildingType) {
        if (obj !== "id_player" && obj !== "id_city" && Number(Elkaisar.City.getCity().BuildingType[obj]) === Number(building_type)) {
            max_count++;
            building_places.push(obj);
        }
    }

    var coming_place = building_places[current_index + 1] || building_places[max_count - 1];
    buildingClick(coming_place, true);


});





$(document).on("PlayerReady", "html", function () {
    $.ajax({
        url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/buildingReqData.json`,
        success: function (data, textStatus, jqXHR) {
            Elkaisar.Building.BuildingData = data;
        }
    });
});