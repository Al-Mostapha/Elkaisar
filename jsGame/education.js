var study_lvl;





var edu = {

    isUpInOntherCity: function (study) {

        for (var iii in Elkaisar.TimedTask.TaskList.Study) {
            if (Elkaisar.TimedTask.TaskList.Study[iii].study === study) {
                return true;
            }
        }
        return false;

    },

    getUniTech: function () {

        var studyTask = {};

        if (isBusyNow("uni") !== false) {
            studyTask = isBusyNow("uni");
        }



        var total_study = "<ul class='total'>";
        for(var tech in Elkaisar.BaseData.Edu)
        {
            if(Elkaisar.BaseData.Edu[tech].StudyPlace !== "uni")
                continue;
            
            if (this.isUpgradable(tech, Elkaisar.DPlayer.PlayerEdu[tech]) === false || (isBusyNow("uni") !== false && isBusyNow("uni").study !== tech) || this.isUpInOntherCity(tech)) {

                var disabled = "disabled = 'disabled'";
                var permit = '<div class="permit-layer"></div>';

            } else {
                var disabled = "";
                var permit = "";
            }

            var button = "";
            if (studyTask.study === tech) {

                button = `  <button class="speed-up-btn edu_acce" data-id-task="${studyTask.id}">
                                <h6> تسريع </h6>
                            </button>
                            <button data-tech="${tech}" class="cancel-study cancel-btn"></button>`;

            } else {

                button = `<button data-tech="${tech}" class="full-btn full-btn-2x edu_study study_btn"  ${disabled}>${Translate.Button.Building.Study[UserLag.language]}</button>`;

            }


            total_study += ` <li class="study_unite uni_std"  type="${tech}" lvl="${Elkaisar.DPlayer.PlayerEdu[tech]}">
                                
                                <div class="img-inside-box">
                                    <div class="current_lvl_study">${Elkaisar.DPlayer.PlayerEdu[tech]}</div>
                                    <img src="${Elkaisar.BaseData.Edu[tech].image}" class="big-img">
                                    ${permit}
                                    <div class="city_lvl_study">${Math.min(Elkaisar.DPlayer.PlayerEdu[tech], Elkaisar.City.getCity().BuildingLvl[cityHasType(BUILDING_TYPS.UNIVERSITY)])}</div>
                                </div> 
                                <div class="txt-inside-box">
                                    <h2>${Elkaisar.BaseData.Edu[tech].ar_title}</h2>
                                </div>
                                <div class="btn-wrapper">
                                    ${button}
                                </div>
                               <div class="study_req_tooltip_con"></div>
                            </li>`;
        }
        total_study += "</ul>";
        return total_study;
    },

    getAcadTech: function () {


        var studyTask = {};

        if (isBusyNow("acad") !== false) {
            studyTask = isBusyNow("acad");
        }



        var total_study = "<ul class='total'>";
        for(var tech in Elkaisar.BaseData.Edu)
        {
            if(Elkaisar.BaseData.Edu[tech].StudyPlace !== "acad")
                continue;
            
            if (this.isUpgradable(tech, Elkaisar.DPlayer.PlayerEdu[tech]) === false ||
                    (isBusyNow("acad") !== false && isBusyNow("acad").study !== tech) ||
                    this.isUpInOntherCity(tech)) {

                var disabled = "disabled = 'disabled'";
                var permit = '<div class="permit-layer"></div>';

            } else {
                var disabled = "";
                var permit = "";
            }

            var button = "";
            if (studyTask.study === tech) {

                button = `  <button class="speed-up-btn edu_acce" data-id-task="${studyTask.id}">
                                <h6> تسريع </h6>
                            </button>
                            <button data-tech="${tech}" class="cancel-study cancel-btn"></button>`;

            } else {

                button = `<button data-tech="${tech}" class="full-btn full-btn-2x edu_study study_btn"  ${disabled}>${Translate.Button.Building.Study[UserLag.language]}</button>`;

            }


            total_study += ` <li class="study_unite uni_std"  type="${tech}" lvl="${Elkaisar.DPlayer.PlayerEdu[tech]}">
                                
                                <div class="img-inside-box">
                                    <div class="current_lvl_study">${Elkaisar.DPlayer.PlayerEdu[tech]}</div>
                                    <img src="${Elkaisar.BaseData.Edu[tech].image}" class="big-img">
                                    ${permit}
                                    <div class="city_lvl_study">${Math.min(Elkaisar.DPlayer.PlayerEdu[tech], Elkaisar.City.getCity().BuildingLvl[cityHasType(BUILDING_TYPS.ACADEMY)])}</div>
                                </div> 
                                <div class="txt-inside-box">
                                    <h2>${Elkaisar.BaseData.Edu[tech].ar_title}</h2>
                                </div>
                                <div class="btn-wrapper">
                                    ${button}
                                </div>
                               <div class="study_req_tooltip_con"></div>
                            </li>`;
        }
        total_study += "</ul>";
        return total_study;
    },

    getReqTable: function (type, lvl) {

        var food = EDUCATION_REQ[type].lvl_req[lvl].food;
        var wood = EDUCATION_REQ[type].lvl_req[lvl].wood;
        var stone = EDUCATION_REQ[type].lvl_req[lvl].stone;
        var metal = EDUCATION_REQ[type].lvl_req[lvl].metal;
        var coin = EDUCATION_REQ[type].lvl_req[lvl].coin;
        var time = EDUCATION_REQ[type].time_req[lvl];

        // get condetion list item
        var condetion_list = "";
        var obj = Elkaisar.BaseData.Edu[type];

        var condetions = obj.getCondetion(lvl);

        for (var one in condetions) {

            if (condetions[one].con_type === "building") {

                condetion_list += ` <li class="${Building.BuildingWithMaxLvl(condetions[one].building_type) >= condetions[one].building_lvl ? "enough" : "not_enough" }">
                                        ${condetions[one].title}
                                    </li>`;

            } else if (condetions[one].con_type === "matrial") {

                condetion_list += ` <li class="${Matrial.getPlayerAmount(condetions[one].matrial) >= condetions[one].amount ? "enough" : "not_enough" }">
                                        ${condetions[one].title}
                                    </li>`;

            }


        }



        var content = ` <table class="req_table" border="0">
                            <thead>
                                <tr>                 
                                    <td colspan="2" style="direction: rtl">                    
                                        <ol>               
                                            ${condetion_list}             
                                        </ol>              
                                    </td>            
                                </tr>       
                            </thead>       
                            <tbody>             
                                <tr>                 
                                    <td>                  
                                        <img src="images/style/food.png">                     
                                        <div class="amount ${Elkaisar.CurrentCity.City.food < Number(food) ? "not_enough" : ""}">
                                            ${lvl >= 30 ? "--" : food}
                                        </div>                  
                                    </td>                    
                                    <td>                          
                                        <img src="images/style/stone.png">                  
                                        <div class="amount ${Elkaisar.CurrentCity.City.stone < Number(stone) ? "not_enough" : ""}">
                                            ${lvl >= 30 ? "--" : stone}
                                        </div>                   
                                    </td>               
                                </tr>          
                                <tr>                
                                    <td>                 
                                        <img src="images/style/wood.png">                  
                                        <div class="amount ${Elkaisar.CurrentCity.City.wood < Number(wood) ? "not_enough" : ""}">
                                            ${lvl >= 30 ? "--" : wood}
                                        </div>                   
                                    </td>            
                                    <td>                  
                                        <img src="images/style/iron.png">                      
                                        <div class="amount ${Elkaisar.CurrentCity.City.metal < Number(metal) ? "not_enough" : ""}">
                                            ${lvl >= 30 ? "--" : metal}
                                        </div>                      
                                    </td>         
                                </tr>             
                                <tr>                  
                                    <td>                   
                                        <img src="images/style/coin.png">                 
                                            <div class="amount ${Elkaisar.CurrentCity.City.coin < Number(coin) ? "not_enough" : ""}">
                                                ${lvl >= 30 ? "--" : coin}
                                            </div>                  
                                    </td>               
                                    <td>                    
                                        <img src="images/style/wait.png">                       
                                        <div class="amount">${lvl >= 30 ? "--" : changeTimeFormat(time)}</div>             
                                    </td>              
                                </tr>     
                            </tbody>
                        </table>  `;
        return content;
    },

    getReqBox: function (study_type, lvl) {
        switch (study_type) {

            case "farming":  // 
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم الزراعة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                               <h1 class="header-2 green">الزراعة  مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من انتاج المحاصيل بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 7)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "wooding":  //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم الاخشاب مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الورشة  مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من انتاج الاخشاب بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 7)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "stoning":  //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم الاحجار مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">التحجير  مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من انتاج الحجارة بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 7)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "mining":   //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم التعدين مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">التعدين  مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من انتاج الحديد بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 7)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "accounting":   //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  المحاسبة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">المحاسبة مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد  (عائدات الضرائب) بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 7)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "storing":
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم التخزين مستوى${lvl >= 30 ? "---" : lvl + 1}</h1>
                                    </div>
                                <h1 class="header-2 green">التخزين مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيد من سعة التخزين بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 5)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "building":    //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الهندسة المعمارية مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الهندسة المعمارية مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من متانة السور  ونوبات الحراسة  بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 10)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "scholership":          //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  المنح الدراسية مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">البعثات الخارجية مستوى ${lvl >= 30 ? "---" : lvl + 1 } تقلل منطلب الخبرة وتزيدمن الخبرة المكتسبة بمقدار ${lvl >= 30 ? "---" : ((lvl + 1))}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;


            case "maintenace":     //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  علم الصيانة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الترميم مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيدمن قوة ومتانة التحصينات  بمقدار  ${lvl >= 30 ? "---" : ((lvl + 1) * 100)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "infantry":          //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  المشاة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">المشاة مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من قوة وصلابة الفرسان المدرعين  بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "riding":        //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الفروسية مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الفروسية مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من قوة وصلابة الفرسان والجواسيس  بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "army":               //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الجيش مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الجيش مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيد من قوة المقاليع ورماة النبل السهام والمنجنيق بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "spying":          //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الاستخبارات مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">كلما زادت الاستخبارت زادت قوة الجواسيس   وتمنحنا معلومات ادق  عند ارسال جواسيس للاسطلاع</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "leader":        //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  القيادة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green"> القيادة  مستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من قدرة الابطال على  التحكم وفرض السيطرة بين القوات بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "safe":     //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الامن مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الطب  مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيد من القدرة الدفاعية لدى القوات بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "medicine":       //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الطب مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الطب مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيد من متانة القوات وسلامتها بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 5)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "logistic":        //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الدعم اللوجستى مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">اللوجستية مستوى ${lvl >= 30 ? "---" : lvl + 1 } يزيد من قوة التعبئة والدعم اللوجستى بالمواد بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 5)}%!</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "navigating":          //
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الملاحة مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الملاحة بمستوى ${lvl >= 30 ? "---" : lvl + 1 } تزيد من سرعة و ايقاع القوات بنسبة ${lvl >= 30 ? "---" : ((lvl + 1) * 5)}%</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;

            case "supplying":        // الامداد
                var box = ` <div class="study_req_tooltip">
                                <div class="upgrade-info">
                                    <div class="header-1">
                                        <h1>تحديث الى :  الامداد مستوى${lvl >= 30 ? "---" : lvl + 1 }</h1>
                                    </div>
                                <h1 class="header-2 green">الامداد مستوى ${lvl >= 30 ? "---" : lvl + 1 } يقلل من استهلاك الغذاء بمقدار ${lvl >= 30 ? "---" : ((lvl + 1) * 3)}%</h1>
                            </div>
                            ${this.getReqTable(study_type, lvl)}
                        </div>`;
                return box;
                break;
        }
    },
    checkCondetions: function (study_type, lvl) {
        
        var obj = Elkaisar.BaseData.Edu[study_type];

        var condetions = obj.getCondetion(lvl);

        for (var one in condetions) {

            if (condetions[one].con_type === "building") {
                if (Building.BuildingWithMaxLvl(condetions[one].building_type) < condetions[one].building_lvl) {
                    return  false;
                }

            } else if (condetions[one].con_type === "matrial") {

                if (Matrial.getPlayerAmount(condetions[one].matrial) < condetions[one].amount) {
                    return false;
                }

            }
        }

        return true;
    },

    isUpgradable: function (study, lvl) {
        if (Number(lvl) >= 30) {
            return false;
        } else if (Elkaisar.CurrentCity.City.food < this.calResource.food(study, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.wood < this.calResource.wood(study, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.stone < this.calResource.stone(study, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.metal < this.calResource.metal(study, lvl)) {
            return false;
        } else if (Elkaisar.CurrentCity.City.coin < this.calResource.coin(study, lvl)) {
            return false;
        } else if (!this.checkCondetions(study, lvl)) {
            return false;
        } else {
            return true;
        }
    },
    calResource: {

        food: function (study, lvl) {
            if (!EDUCATION_REQ[study].lvl_req[lvl]) {

            }
            return EDUCATION_REQ[study].lvl_req[lvl].food;
        },
        wood: function (study, lvl) {
            return EDUCATION_REQ[study].lvl_req[lvl].wood;
        },
        stone: function (study, lvl) {
            return EDUCATION_REQ[study].lvl_req[lvl].stone;
        },
        metal: function (study, lvl) {
            return EDUCATION_REQ[study].lvl_req[lvl].metal;
        },
        coin: function (study, lvl)
        {
            return EDUCATION_REQ[study].lvl_req[lvl].coin;
        }
    }
};

edu.refreshStudyLvl = function () {
    return Player_profile.getPlayerEdu();
};



$(document).on("mouseover", ".study_unite .img-inside-box", function () {

    var study_type = $(this).parent(".study_unite").attr("type");
    var study_lvl = $(this).parent(".study_unite").attr("lvl");

    if (!$(this).hasClass("hover")) {
        $(this).parent(".study_unite").children(".study_req_tooltip_con").html(edu.getReqBox(study_type, parseInt(study_lvl)));
        $(this).addClass("hover");
    }
});

$(document).on("mouseleave", ".study_unite .img-inside-box", function () {
    $(this).parent(".study_unite").children(".study_req_tooltip_con").empty();
    $(this).removeClass("hover");

});



$(document).on("click", ".edu_study", function () {

    var study_type = $(this).attr("data-tech");
    var sLvl = Number(Elkaisar.DPlayer.PlayerEdu[study_type]);
    var category = $(".for_building_box").attr("category");
    var self_ = $(this);
    var buildingPlace = $("#dialg_box .box_header").attr("place");

    if (!category) {
        alert_box.failMessage("نوع الدراسة غير معروف");
        return;
    }

    if (typeof sLvl === undefined || !category || !study_type) {
        alert_box.failMessage("يوجد خطاء  بالمبنى  اغلق الصفحة وافتحها مرة اخرى");
        return;
    }





    if (!$(this).hasClass("disabled") && edu.isUpgradable(study_type, sLvl)) {

    var idCity = Number(Elkaisar.CurrentCity.idCity);
        $.ajax({

            url: `${Elkaisar.Config.NodeUrl}/api/APlayerEdu/upgradeStudyLvl`,
            data: {
                idStudy : study_type,
                idCity  : idCity,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                waitCursor();
                self_.attr("disabled", "disabled");
            },
            success: function (data, textStatus, jqXHR) {

                self_.removeAttr("disabled");
                unwaitCursor();
               
                if(!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);
                
                if(JsonObject.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = JsonObject.cityRes;
                    city_profile.refresh_resource_view();
                    Elkaisar.TimedTask.refreshListView();
                    
                    for(var iii in Elkaisar.TimedTask.TaskList.Study)
                        if(Number(Elkaisar.TimedTask.TaskList.Study[iii].id_city) === idCity)
                            delete(Elkaisar.TimedTask.TaskList.Study[iii]);
                    for(var iii in JsonObject.list)
                        Elkaisar.TimedTask.TaskList.Study[JsonObject.list[iii].id] = JsonObject.list[iii];
                    
                    buildingClick(buildingPlace, true);
                    Elkaisar.TimedTask.refreshListView();
                }
             

             

            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);

            }

        });

    } else {

        alert_box.confirmMessage("لا يمكنك تطوير هذه الدراسة");

    }

});


function upgradeStudy(index)
{
    
}


function isBusyNow(study_place)
{

    var return_ = false;
    var idCity = Number(Elkaisar.CurrentCity.idCity);

    for(var iii in Elkaisar.TimedTask.TaskList.Study)
    {
        if(idCity !== Number(Elkaisar.TimedTask.TaskList.Study[iii].id_city))
            continue;
        if(Elkaisar.BaseData.Edu[Elkaisar.TimedTask.TaskList.Study[iii].study].StudyPlace !== study_place )
            continue;
        return Elkaisar.TimedTask.TaskList.Study[iii]; 

    }

    return  return_;
}


$(document).on("click", ".edu_acce", function () {

    var idTask = $(this).attr("data-id-task");
    var matrial_to_use = [
        "archim_a",
        "archim_b",
        "archim_c",
        "archim_d"
    ];

    BoxOfMatrialToUse(matrial_to_use, "study_acce", 1, idTask);

});

$(document).on("click", ".reduce-time-for-study img", function () {
    var place = $(this).parents(".task-unite").attr("place");

    if (place === "U") {

        for (var key in Elkaisar.City.getCity().BuildingType) {

            if (parseInt(Elkaisar.City.getCity().BuildingType[key]) === 8) {
                buildingClick(key);

            }

        }


    } else if (place === "A") {

        for (var key in Elkaisar.City.getCity().BuildingType) {

            if (parseInt(Elkaisar.City.getCity().BuildingType[key]) === 9) {
                buildingClick(key);

            }

        }


    }


    var sleep = setTimeout(function () {
        $(".edu_acce").trigger("click");
    }, 120);
});