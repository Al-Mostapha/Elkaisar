var QuestGrowth = {};
var QuestTrade = {};
var QuestDaily = {};
var ALL_AVAIL_QUEST = {};
var QUESTS_LIST = {};
var Quest = {};
const QUEST_PACKAGE_NAME = {
    promotion: "الترقية",
    infrastructure: "البنية الاساسية",
    cityPlanning: "تخطيط المدينة",
    cityManagement: "ترتيب المدينة",
    resourceProduction: "انتاج الموارد",
    civilTechnology: "التكنولوجيا المدنية",
    militaryStudy: "الدراسات العسكرية",
    cityDefence: "تحصين المدينة",
    cityHero: "ابطال المدينة",
    religion: "المعتقدات الدينية",
    warPreparation: "التجهيزات الحربية",
    dailyQuest: "مهام يومية",
    system_quest: "مهام النظام",
    expMap: "خريطة التوسعة",
    armyPacks: "حزم الاسرى",
    mnawratQuest: "جوائز المناورات",
    rebelCity: "المدينة المتمردة",
    macedonHero: "البطل المقدونى",
    lionEquip: "معدات الاسد",
    loyEquip: "معدات الولاء",
    miliEquip: "معدات حربية",
    brightEquip: "معدات ضوئية",
    fearlessEquip: "معدات جسارة"

};

const  RESOURCE_AR_NAME = {
    coin: "سسترسس",
    food: "غذاء",
    wood: "خشب",
    stone: "حجارة",
    metal: "حديد",
    population: "سكان"
};


var PLAYER_QUEST_DONE = {};
















Quest = {

    dialogBoxcontent_qusets: function (section, package) {
        if (!section)
            section = "QuestGrowth";

        if (!package)
            package = "promotion";


        var counter = 0;

        var quest = this.completeQuestModel(ALL_AVAIL_QUEST[section][package][0]);

        var input = `<div class="box_content for_quest">
                        <div class="left-content">
                            <div class="top-left" id="quest_pack" data-id-section="${section}">
                                ${this.getPackageList(ALL_AVAIL_QUEST[section])}
                            </div>
                            <div class="bottom-left" id="sub_quest">
                                ${this.getQuestInPackageList(section, package)}
                            </div>
                        </div>
                        <div class="right-content" >
                            <div id="quest-page">
                                ${quest}
                            </div>
                            <div class="right-content-footer" rank_for="players">  
                                <div class="buttons">  
                                    <ul style=" margin-top: 8px;">  
                                        <li  style=" float: none; width: 100px; margin: auto;">  
                                            <button data-id-quest="${ALL_AVAIL_QUEST[section][package][0]}" class="full-btn full-btn-3x full" ${this.checkComplete(ALL_AVAIL_QUEST[section][package][0]) ? "" : "disabled='disabled'"}  id="accept_quest">
                                                ${Translate.Button.MenuList.AcceptReward[UserLag.language]}
                                            </button>
                                        </li>
                                    </ul>  
                                </div>  
                            </div>
                        </div>
                    </div>`;
        return input;
    },

    changeContent: function (section, package, quest) {

        var temp = null;
        var idQuest = null;
        if (!package) {
            for (var iii in ALL_AVAIL_QUEST[section]) {

                temp = temp === null ? iii : temp;

                if (this.checkForPackagePrize(ALL_AVAIL_QUEST[section][iii], ALL_AVAIL_QUEST[section])) {
                    package = iii;
                    break;
                }
            }
        }

        if (!package) {
            package = temp;
        }
        temp = null;
        if (!quest) {
            for (var iii in ALL_AVAIL_QUEST[section][package]) {

                temp = temp === null ? ALL_AVAIL_QUEST[section][package][iii] : temp;

                if (this.checkComplete(ALL_AVAIL_QUEST[section][package][iii])) {
                    quest = ALL_AVAIL_QUEST[section][package][iii];
                    break;
                }

            }
        }

        if (!quest) {
            quest = temp;
        }

        $("#quest_pack").attr("data-id-section", section);
        $("#quest_pack").html(this.getPackageList(ALL_AVAIL_QUEST[section], package));
        $("#quest-page").html(this.completeQuestModel(quest));
        $("#sub_quest").html(this.getQuestInPackageList(section, package, quest));
        $("#accept_quest").attr("data-id-quest", quest);

        this.checkComplete(quest) ? $("#accept_quest").removeAttr("disabled") : $("#accept_quest").attr("disabled", "disabled");
        $("#accept_quest").attr("data-id-quest", quest);

    },

    getPackageList: function (section, quest_pack) {

        var Qpackages = "";
        var packaCount = 0;

        for (var package in section) {

            if (Quest.getQuestNumberInBackage(section[package]) > 0) {
                packaCount++;

                if (!QUEST_PACKAGE_NAME[package]) {
                    console.error(package);
                }

                Qpackages += `  <div class="tr ellipsis ${ quest_pack === package ? "selected" : ""}" data-id-package="${package}">
                                    <span>${QUEST_PACKAGE_NAME[package]}</span>
                                   ${this.checkForPackagePrize(package, section) ? `<span class="right_mark"><lable class="img" src="images/btns/done.png" class="img-sml"></lable></span>` : `<span class="right_mark"></span>`}
                                </div>`;
            }

        }

        if (packaCount < 9) {

            for (var iii = 0; iii < 9 - packaCount; iii++) {
                Qpackages += `<div class="tr"></div>
                              `;
            }

        }
        return Qpackages;
    },
    getQuestInPackageList: function (section, package, questId) {
        var Qpackages = "";
        var packaCount = 0;

        for (var idQuest in ALL_AVAIL_QUEST[section][package]) {
            if (Quest.isShowYes(ALL_AVAIL_QUEST[section][package][idQuest]) && Number(PLAYER_QUEST_DONE[ALL_AVAIL_QUEST[section][package][idQuest]]) === 0) {

                packaCount++;
                Qpackages += `  <div class="tr ellipsis ${ questId === ALL_AVAIL_QUEST[section][package][idQuest] ? "selected" : ""}"  data-id-quest="${ALL_AVAIL_QUEST[section][package][idQuest]}" data-id-section="${section}" data-id-package="${package}">
                                    <span>${QUESTS_LIST[ALL_AVAIL_QUEST[section][package][idQuest]].title}</span>
                                    ${this.checkComplete(ALL_AVAIL_QUEST[section][package][idQuest]) ? `<span class="right_mark"><lable class="img" src="images/btns/done.png" class="img-sml"></lable></span>` : `<span class="right_mark"></span>`}
                                </div>`;
            }


        }
        if (packaCount < 5) {

            for (var iii = 0; iii < 5 - packaCount; iii++) {
                Qpackages += `<div class="tr"></div>
                              `;
            }

        }
        return Qpackages;
    },
    getQuestNumberInBackage(package) {

        var num = 0;

        for (var idQuest in  package) {

            if (Quest.isShowYes(package[idQuest]) && Number(PLAYER_QUEST_DONE[package[idQuest]]) === 0) {
                num++;
            }

        }
        return num;
    },
    isShowYes: function (idQuest) {
        var quest = QUESTS_LIST[idQuest];

        if (!quest) {
            console.error(idQuest + "=== not found");
            return false;
        }
        var show = true;
        for (var iii in quest.showCond) {
            if (quest.showCond[iii].type === "quest") {
                show = (Number(PLAYER_QUEST_DONE[quest.showCond[iii].id_quest]) >= 1);
            }
        }
        return show;
    },
    listOfNeed: function (idQuest) {

        var done = true;
        if (!QUESTS_LIST[idQuest])
            return {
                list: "",
                done: done
            };

        var list_of_need = QUESTS_LIST[idQuest].ListOfNeed;



        var list = ``;

        for (var jjj = 0; jjj < list_of_need.length; jjj++) {

            var unit_list = list_of_need[jjj];

            if (unit_list.type === "promotion") {
                console.log(list_of_need[jjj])
                list += `<li>
                            <span> تصنيف النبيل ${Elkaisar.BaseData.Promotion[list_of_need[jjj].promotion].Title}</span>
                            <span class=" state ${Elkaisar.DPlayer.Player.porm >= list_of_need[jjj].promotion ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                        </li>`;

                done = Elkaisar.DPlayer.Player.porm < list_of_need[jjj].promotion ? false : done;

            } else if (unit_list.type === "item") {

                done = Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? done : false;

                list += `<li class="${Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? 'done_all' : '' }">
                            <span> لديك ${(unit_list.amount)} ${Matrial.getMatrialName(unit_list.item)}</span>
                            <span class=" state ${Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)' }</span>
                            <span>تمتلك (${Matrial.getPlayerAmount(unit_list.item)}) وحدة</span>
                        </li>`;

            } else if (unit_list.type === 'building') {

                list += `  <li class="done_all">
                                <span> ${BuildingConstData[unit_list.buildingType].title} مستوى ${unit_list.lvl}</span>
                                <span class=" state ${Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                            </li>`;
                done = Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? done : false;

            } else if (unit_list.type === 'prestige') {

                /*   prestige of player */
                list += `<li class="done_all">
                        <span>نقاط البرستيج ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'resource') {
                /*   prestige of player */
                list += `<li class="done_all">
                        <span>  ${RESOURCE_AR_NAME[unit_list.resourceType]} ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? done : false;


            } else if (unit_list.type === "population") {

                list += `<li class="done_all">
                        <span>  عدد السكان وصل الى  ${unit_list.amount}</span>
                        <span class=" state ${Elkaisar.CurrentCity.City.pop >= unit_list.amount ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.CurrentCity.City.pop >= unit_list.amount ? done : false;

            } else if (unit_list.type === "playerState") {

                list += `<li class="done_all">
                        <span>تفعيل ${Elkaisar.BaseData.PlayerStateData[unit_list.stateFor].title} </span>
                        <span class=" state ${Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? 'done">(تم)' : 'required">(لم يتم)'}</span>
                    </li>`;
                done = Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? done : false;

            }

        }
        return list;

    },

    completeQuestModel: function (idQuest) {

        var title = "-----------";
        var header = "-----------";
        var listOfNeed = "-----------";
        var desc = "-----------";
        var reword = "-----------";

        if (QUESTS_LIST[idQuest]) {
            title = QUESTS_LIST[idQuest].title;
            header = QUESTS_LIST[idQuest].header;
            desc = QUESTS_LIST[idQuest].desc;
            listOfNeed = this.listOfNeed(idQuest);
            reword = this.rewordToString(idQuest);
        }

        var quest = `<div class="quest">
                        <div class="quest-header banner-red">
                            ${title}
                        </div>
                        <div class="quest-desc">
                            <p>
                                ${header}
                            </p>
                        </div>
                        <hr/>
                        <div class="quset-req">
                            <ol>
                                ${listOfNeed}

                            </ol>
                        </div>
                        <hr/>
                        <div class="quest-expl">
                            <div class="quest-expl-head ">
                                <img src="images/icons/quest.png">
                                <span>
                                    شرح المهمة
                                </span>
                            </div>
                            <p>
                                ${desc}
                            </p>
                        </div>
                        <hr/>
                        <div class="quest-reward">
                            <div class="quest-expl-head ">
                                <img src="images/style/matrial-box.png">
                                <span>
                                     مكافأة المهام
                                </span>
                            </div>
                            <p>
                                ${reword}
                            </p>
                        </div>
                    </div>
                `;
        return quest;
    },

    checkComplete: function (idQuest) {

        var done = true;
        if (!QUESTS_LIST[idQuest])
            return false;

        if (Number(PLAYER_QUEST_DONE[idQuest]) !== 0) {
            return false;
        }

        var list_of_need = QUESTS_LIST[idQuest].ListOfNeed;
        var list = ``;

        for (var jjj = 0; jjj < list_of_need.length; jjj++) {

            var unit_list = list_of_need[jjj];
            if (unit_list.type === "promotion") {
                done = Elkaisar.DPlayer.Player.porm < unit_list.promotion ? false : done;
            } else if (unit_list.type === "item") {

                done = Matrial.getPlayerAmount(unit_list.item) >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'building') {

                done = Max_of.buildingTypeLvl(unit_list.buildingType) >= unit_list.lvl ? done : false;

            } else if (unit_list.type === 'prestige') {

                done = Elkaisar.DPlayer.Player.prestige >= unit_list.amount ? done : false;

            } else if (unit_list.type === 'resource') {
                /*   prestige of player */

                done = Elkaisar.CurrentCity.City[unit_list.resourceType] >= unit_list.amount ? done : false;


            } else if (unit_list.type === "population") {

                done = Elkaisar.CurrentCity.City.pop >= unit_list.amount ? done : false;

            } else if (unit_list.type === "playerState") {

                if (Elkaisar.DPlayer.PlayerState)
                    done = Elkaisar.DPlayer.PlayerState[unit_list.stateFor] >= $.now() / 1000 ? done : false;

            }

        }

        return done;
    },

    checkForPackagePrize: function (package, Quest) {

        for (var iii in  Quest[package]) {
            /*  make sure quest has prize  and quest is not done*/
            if (this.checkComplete(Quest[package][iii])) {
                return true;
            }
        }
        return false;
    },

    getCompletedSections: function (sec) {
        var completeCount = 0;
        for (var backage in sec) {
            for (var quest in sec[backage]) {
                completeCount = Quest.checkComplete(sec[backage][quest]) && Quest.isShowYes(sec[backage][quest]) ? completeCount + 1 : completeCount;
            }
        }
        return completeCount;
    },
    refrehQuestNotif: function () {

        var c_1 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestGrowth);
        var c_2 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestDaily);
        var c_3 = Quest.getCompletedSections(ALL_AVAIL_QUEST.QuestTrade);

        $("#Quests-ready-notif").html(c_1 + c_2 + c_3);
        $("#Quest-growth-notif").html(c_1 || '');
        $("#Quest-daily-notif").html(c_2 || '');
        $("#Quest-trade-notif").html(c_3 || '');

    },
    givePrize: function (reward) {

        for (var iii in reward) {

            if (reward[iii].type === "item") {

                Matrial.givePlayer(reward[iii].item, reward[iii].amount)

            } else if (reward[iii].type === "prestige") {

                Elkaisar.DPlayer.Player.prestige = Number(Elkaisar.DPlayer.Player.prestige)
                        +
                        Number(reward[iii].amount);
                Player_profile.refresh_view();
                Player_profile.refresh_player_data();

            } else if (reward[iii].type === "resource") {

                Elkaisar.CurrentCity.City[reward[iii].resourceType] =
                        Number(Elkaisar.CurrentCity.City[reward[iii].resourceType])
                        +
                        Number(reward[iii].amount);
                city_profile.refresh_resource_view();


            } else if (reward[iii].type === "population") {

                Elkaisar.CurrentCity.City.pop = Number(Elkaisar.CurrentCity.City.pop) + reward[iii].amount;
                city_profile.refresh_resource_view();

            } else if (reward[iii].type === "equip") {

                Elkaisar.Equip.getPlayerEquip();

            } else if (reward[iii].type === "jop") {

                Jop.addLabor(reward[iii].jop_for, reward[iii].amount);
                city_profile.refresh_resource_view();

            } else if (reward[iii].type === "promotion") {

                Player_profile.refresh_player_data();


            }


        }

    },
    takeNeeds: function (listOfNeed) {

        for (var jjj = 0; jjj < listOfNeed.length; jjj++) {

            var unit_list = listOfNeed[jjj];
            if (unit_list.type === "item") {

                Matrial.takeFrom(unit_list.item, unit_list.amount);

            } else if (unit_list.type === 'resource') {
                Elkaisar.CurrentCity.City[unit_list.resourceType] -= Number(unit_list.amount);

            }



        }
    },
    isPackageAvailable: function (Package) {
        var counter = 0;
        for (var one in Package) {
            if (Package[one].DB_name && Number(PLAYER_QUEST[Package[one].DB_name]) === 0) {
                return  true;
            }
        }

        return false;
    },

    rewordToString: function (idQuest) {

        if (!QUESTS_LIST[idQuest])
            return "";
        var questPrize = QUESTS_LIST[idQuest].Reword;


        return this.prizeArrayToString(questPrize);
    },

    prizeArrayToString: function (questPrize) {


        var prizeString = "";
        for (var iii in questPrize) {

            if (questPrize[iii].type === "item") {

                prizeString += ` ${questPrize[iii].amount} * ${Matrial.getMatrialName(questPrize[iii].item)}, `;

            } else if (questPrize[iii].type === "prestige") {

                prizeString += ` ${questPrize[iii].amount} * بريستيج, `;

            } else if (questPrize[iii].type === "resource") {

                prizeString += ` ${questPrize[iii].amount} * ${RESOURCE_AR_NAME[questPrize[iii].resourceType]}, `;

            } else if (questPrize[iii].type === "population") {

                prizeString += ` ${questPrize[iii].amount} * سكان, `;

            } else if (questPrize[iii].type === "equip") {

                prizeString += ` ${questPrize[iii].amount} * ${Equipment.getName(questPrize[iii].equip, questPrize[iii].part)}, `;

            } else if (questPrize[iii].type === "jop") {

                prizeString += ` ${questPrize[iii].amount} * ${CITY_JOP_REQ[questPrize[iii].jop_for.toUpperCase()].ar_title}, `;

            } else if (questPrize[iii].type === "promotion") {

                prizeString += ` ${Elkaisar.BaseData.Promotion[Math.min(Number(Elkaisar.DPlayer.Player.porm) + 1, 29)].Title} `;

            } else {
                console.log(questPrize)
                prizeString += "ERROR_NOT_FOUND";
            }
        }

        return prizeString.replace(/, +$/g, '');
    },

};



Quest.getPlayerQuestState = function ()
{
    
    return $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/APlayerQuest/getPlayerQuest`,
        data:{
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            for(var iii in JsonObject)
            {
                PLAYER_QUEST_DONE[JsonObject[iii].id_quest] = JsonObject[iii].done
            }
        }
    });  
    
};

$(document).on("PlayerReady", "html", function () {
    $.getJSON(`${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/questBase.json`, function (questList) {
        QUESTS_LIST = questList;
        QuestGrowth.promotion = [
            "prom_1", "prom_2", "prom_3", "prom_4",
            "prom_5", "prom_6", "prom_7", "prom_8",
            "prom_9", "prom_10", "prom_11", "prom_12",
            "prom_13", "prom_14", "prom_15", "prom_16",
            "prom_17", "prom_18", "prom_19", "prom_20",
            "prom_21", "prom_22", "prom_23", "prom_24",
            "prom_25", "prom_26", "prom_27", "prom_28",
            "prom_29"
        ];

        QuestGrowth.infrastructure = [
            "cottage_1", "cottage_2", "cottage_3", "cottage_4", "cottage_5",
            "store_1", "store_2", "store_3", "store_4", "store_5",
            "palace_2", "palace_3", "palace_4", "palace_5"
        ];

        QuestGrowth.cityPlanning = [
            "pop_1", "pop_2", "pop_3", "pop_4"
        ];

        QuestGrowth.cityManagement = [
            "jop_1", "jop_2"
        ];

        QuestGrowth.resourceProduction = [
            "farm_2", "wood_2"
        ];

        QuestGrowth.civilTechnology = [
            "uni_1", "uni_2", "uni_3", "uni_4", "uni_5"
        ];

        QuestGrowth.militaryStudy = [
            "acad_1", "acad_2", "acad_3", "acad_4", "acad_5"
        ];

        QuestGrowth.cityDefence = [
            "wall_1", "wall_2", "wall_3", "wall_4", "wall_5"
        ];

        QuestGrowth.cityHero = [
            "theat_1", "theat_2", "theat_3", "theat_4", "theat_5"
        ];

        QuestGrowth.religion = [
            "worship_1", "worship_2", "worship_3", "worship_4", "worship_5"
        ];

        QuestGrowth.warPreparation = [
            "barracks_1", "barracks_2", "barracks_3", "barracks_4", "barracks_5",
            "stabl_1", "stabl_2", "stabl_3", "stabl_4", "stabl_5",
            "workshop_1", "workshop_2", "workshop_3", "workshop_4", "workshop_5"
        ];


        QuestDaily.dailyQuest = [
            "lucky", "t_map", "repel_trumpet", "copper_medal"
        ];

        QuestTrade.expMap = ["exp_map"];

        QuestTrade.armyPacks = [
            "army_s_1",
            "army_s_3",
            "army_m_1",
            "army_m_3",
            "army_l_1",
            "army_l_3"
        ];

        QuestTrade.mnawratQuest = [
            "m1_x20",
            "m2_x20",
            "m3_x20",
            "mr_x10",
            "mr_x2",
            "mr_x4",
            "mr_x300",
            "mb_x1"
        ];
        QuestTrade.rebelCity = [
            "pres_20k",
            "pres_80k",
            "union_era",
            "free_help",
            "motiv_60",
            "helper_chng"
        ];
        QuestTrade.macedonHero = [
            "pres_5k",
            "pres_50k",
            "pres_100k",
            "pres_400k",
            "pres_500k"
        ];
        QuestTrade.loyEquip = [
            "loy_boot",
            "loy_shield",
            "loy_helmet",
            "loy_armor",
            "loy_sword"
        ];

        QuestTrade.lionEquip = [
            "lion_boot",
            "lion_shield",
            "lion_helmet",
            "lion_armor",
            "lion_sword"
        ];
        QuestTrade.fearlessEquip = [
            "fearless_boot",
            "fearless_shield",
            "fearless_helmet",
            "fearless_armor",
            "fearless_sword"
        ];
        QuestTrade.miliEquip = [
            "mili_boot",
            "mili_shield",
            "mili_helmet",
            "mili_armor",
            "mili_sword"
        ];
        QuestTrade.brightEquip = [
            "bright_boot",
            "bright_shield",
            "bright_helmet",
            "bright_armor",
            "bright_sword"
        ];


        ALL_AVAIL_QUEST = {

            QuestTrade: QuestTrade,
            QuestDaily: QuestDaily,
            QuestGrowth: QuestGrowth

        };
        
        $.getJSON(`${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/quest/${UserLag.language}.json`, function (QL) {
            for(var iii in QUESTS_LIST)
            {
                
               if(QL[iii]){
                   QUESTS_LIST[iii].title = QL[iii].title;
                   QUESTS_LIST[iii].header = QL[iii].header;
                   QUESTS_LIST[iii].desc = QL[iii].desc;
               }
                   
                
            }
        });
        
        Quest.getPlayerQuestState().done(function (){
            Fixed.refreshPlayerNotif();
        });
        

    });
});



$(document).on("click", "#sub_quest .tr", function () {

    var section = $(this).data("id-section");
    var package = $(this).data("id-package");
    var idQuest = $(this).data("id-quest");

    console.log(section, package, idQuest)

    Quest.changeContent(section, package, idQuest);

});



$(document).on("click", "#quest_pack .tr", function () {


    var sectionId = $("#quest_pack").attr("data-id-section");
    var package = $(this).attr("data-id-package");

    Quest.changeContent(sectionId, package);

});


$(document).on("click", "#accept_quest", function () {

    var idQuest = $(this).attr("data-id-quest");

    if (!Quest.checkComplete(idQuest)) {
        alert_box.confirmMessage("تأكد من تحقق شروط المهمة");
        return;
    }
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({

        url: `${Elkaisar.Config.NodeUrl}/api/APlayerQuest/acceptQuest`,
        data: {
            idCity: idCity,
            idQuest: idQuest,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer

        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
            $("#accept_quest").attr("disabled", "disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            $("#accept_quest").removeAttr("disabled");
            if (isJson(data)) {      /*           هنا  بقى مهمة الترقية لما تتم بنجاح**/

                var jsonData = JSON.parse(data);
                if (jsonData.state === "ok") {

                    
                    alert_box.succesMessage(Quest.prizeArrayToString(QUESTS_LIST[idQuest].Reword));
                    PLAYER_QUEST_DONE[idQuest] = 1;
                    $("#dialg_box .nav_bar .left-nav .selected").click();
                    Quest.givePrize(QUESTS_LIST[idQuest].Reword);

                } else if (jsonData.state === "error_1") {

                    alert_box.failMessage("لا توجد هذة المهمة فى الوقت الحالى ");

                } else if (jsonData.state === "error_2") {

                    alert_box.failMessage("لا يمكنك قبول المهمة مرتين فى يوم واحد");

                } else if (jsonData.state === "error_3") {

                    alert_box.failMessage("لم يتم التحقق من شروط المهمة");

                } else if (jsonData.state === "error_4") {
                    alert_box.failMessage("شروط المهمة غير مكتملة");
                }



            } else {

                Elkaisar.LBase.Error(data);

            }
            Quest.refrehQuestNotif();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }

    });



});