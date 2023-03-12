var alert_box = {
  alert: function (title, content) {

    var box = '<div id="over_lay_alert">'
      + '    <div id="alert_container">'
      + '        <div id="alert_head">'
      + '            <div>'
      + '                <img src="images/panner/king_name.png"/>'
      + '            </div>'
      + '            <div id="alert-title">'
      + title
      + '            </div>'
      + '            <img src="images/btns/close_b.png" class="img-sml close-alert"/>'
      + '        </div>'
      + content
      + '    </div>'
      + '</div>';
    return box;
  },
  alert_content_army: function (el_from, el_to, max) {

    var army_content = ` <div id="alert_box" class="alert_for_hero_trade">
                                <div class="row-1"> 
                                    <label class="remin">
                                        0
                                    </label>
                                    <input type="range" min="1" max="${max}" id="range_input" value="1"/>
                                    <label class="avail">
                                         ${max}
                                    </label>
                                </div>
                                <div class="row-2">
                                    <input type="text" max="${max}" min="1" step="${(max - 1)}" id="input-army-move"  class="amount-input only_num input numeric pull-L" value="${(max > 0 ? 1 : 0)}"/> 
                                    <div class="number-arrow-wrapper pull-L" style="margin-left: -31px; margin-top: 4.5px;">
                                        <label class="number-arrow up"></label>
                                        <label class="number-arrow down"></label>
                                    </div>
                                    <label style="line-height: 38px;"> / ${max}</label>
                                    
                                </div>
                                <div  class="row-3">
                                    <div class="confim-btn">
                                        <button class="full-btn full-btn-3x trans-con enter ellipsis">${Translate.Button.General.Confirm[UserLag.language]}</button>
                                    </div>
                                </div>
                            </div>`;

    return army_content;
  },
  alert_content_Guild_FE_list: function () {

    var army_content = `   <div id="alert_box" class="F_E-list">
                                    <div class="row-1"> 
                                        <input id="GuildEneFriInput" type="text" data-id-guild="null" class="input">
                                        <label class="th ellipsis">${Translate.Title.TH.LeagueName[UserLag.language]}</label>
                                        <div id="g-search_result"class="search_res">
                                            <ul> 
                                                
                                            </ul>
                                        </div>

                                    </div>
                                    <div class="row-2">
                                        <ul>
                                            <li>    
                                                <input id="trigger_1" type="radio" name="guild_relation" value="${Elkaisar.BaseData.GuildRelation.RelationEnemy}" >
                                                <label for="trigger_1" class="checker"></label>
                                                <span> عدو</span>
                                            </li>
                                            <li>    
                                                <input id="trigger_2" type="radio" name="guild_relation" value="${Elkaisar.BaseData.GuildRelation.RelationFriend}">
                                                <label for="trigger_2" class="checker"></label>
                                                <span>صديق</span>
                                            </li>
                                            <li>    
                                                <input id="trigger_3" type="radio" name="guild_relation"  checked value="${Elkaisar.BaseData.GuildRelation.RelationAllay}">
                                                <label for="trigger_3" class="checker" ></label>
                                                <span> محايد</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="row-3">
                                        <div class="confim-btn">

                                            <button class="full-btn  full-btn-3x"   id="submit-guild-relation">
                                                تأكيد
                                            </button>

                                        </div>

                                    </div>
                                </div> `;

    return army_content;
  },
  alert_content_Guild_Invite: function () {

    var army_content = `   <div id="alert_box" class="F_E-list">
                                    <div class="row-1"> 
                                        <input type="text"  id="search_by_name_forGuild" class="input">
                                        <label class="th ellipsis">${Translate.Title.TH.LordName[UserLag.language]}</label>
                                        <div id="search_result"  class="search_res">
                                            <ul> 
                                                
                                            </ul>
                                        </div>

                                    </div>
                                    
                                    <div class="row-3">
                                        <div class="confim-btn">

                                            <button class="full-btn full-btn-3x"   id="submit-guild-invite">
                                                ارسال دعوة
                                            </button>

                                        </div>

                                    </div>
                                </div> `;

    return army_content;
  },
  alert_content_attack: function (task, coords) {
    var content = `<div id="alert_box" class="for_battel">        
                            <div class="row-2">
                                ${task}</br>
                                ${coords}
                            </div>    
                            <div class="row-3">        
                                <div class="confim-btn">            
                                    <button class="full-btn full-btn-3x battel-con pull-R enter ellipsis">${Translate.Button.Building.Confirm[UserLag.language]}</button>    
                                    <button class="full-btn full-btn-3x battel-can pull-L ellipsis">${Translate.Button.General.Cancel[UserLag.language]}</button>  
                                </div>    
                            </div>
                        </div> `;


    return content;
  },
  confirmUse_single: function (use_for, matrial, title, other) {
    var content = `<div id="alert_box" class="for_battel">        
                            <div class="row-2">
                                ${title}
                            </div>    
                            <div class="row-3">        
                                <div class="confim-btn">            
                                    <button id="useItemButton" class="full-btn  full-btn-3x pull-R enter ellipsis" data-use-for="${use_for}" data-item="${matrial}" data-other="${other}" >${Translate.Button.Building.Confirm[UserLag.language]}</button>    
                                    <button class="full-btn full-btn-3x battel-can pull-L ellipsis">${Translate.Button.General.Cancel[UserLag.language]}</button>  
                                </div>    
                            </div>
                        </div> `;
    return content;
  },
  confirmMessage: function (title) {
    var content = `<div id="alert_box">        
                            <div class="row-2" style="text-align:center">
                                ${title}
                            </div>    
                            <div class="row-3">        
                                <div class="confim-btn">            
                                    <button id="closeAlertBoxButton" class="full-btn full-btn-3x pull-R enter ellipsis">${Translate.Button.Building.Confirm[UserLag.language]}</button>    
                                    
                                </div>    
                            </div>
                        </div> `;


    $("body").append(this.alert("تنبيه", content));

  },
  close: function () { $('.close-alert').trigger('click'); },

  succesMessage: function (msg) {


    var box = `<div id="fade-msg">
                        <p class="success stroke">
                            ${msg}
                        </p>
                    </div>`;

    $("#fade-msg").remove();
    $("body").append(box);
    $("#fade-msg").animate({ top: "30%" }, 3000, "linear", function () {
      $(this).animate({ top: "150px", opacity: '0' }, 2000, "linear", function () {

        $(this).remove();

      });
    });

  },
  failMessage: function (msg) {


    var box = `<div id="fade-msg">
                        <p class="fail stroke">
                            ${msg}
                        </p>
                    </div>`;

    $("#fade-msg").remove();
    $("body").append(box);
    $("#fade-msg").animate({ top: "30%" }, 3000, "linear", function () {
      $(this).animate({ top: "150px", opacity: '0' }, 2000, "linear", function () {

        $(this).remove();

      });
    });

  },

  confirmDialog: function (msg, yesCallBack) {

    var content = ` <div id="alert_box" class="for_battel">        
                            <div class="row-2">
                                ${msg}
                            </div>    
                            <div class="row-3">        
                                <div class="confim-btn">            
                                    <button class="full-btn full-btn-3x pull-R enter ellipsis" id="btn-confirm-yes">${Translate.Button.Building.Confirm[UserLag.language]}</button>    
                                    <button class="full-btn full-btn-3x pull-L ellipsis" id="btn-confirm-no">${Translate.Button.General.Cancel[UserLag.language]}</button>  
                                </div>    
                            </div>
                        </div> `;

    $("body").append(alert_box.alert(Translate.Button.Building.Confirm[UserLag.language], content));

    $("#btn-confirm-yes").click(function () {


      if (typeof yesCallBack === "function") {

        yesCallBack();

      }

      alert_box.close();

    });

    $("#btn-confirm-no").click(function () {

      alert_box.close();

    });

  },
  confirmWithInput: function (msg, container, yesCallBack) {

    var content = `<div id="alert-with-input">
                            <div class="wrapper">
                                <div class="paragraph">
                                    ${msg}
                                </div>
                                <div class="container">
                                    ${container}
                                </div>
                            </div>
                            <div class="row-3">        
                                <div class="confim-btn">            
                                    <button class="full-btn full-btn-3x pull-R ellipsis" id="btn-confirm-yes">${Translate.Button.Building.Confirm[UserLag.language]}</button>    
                                    <button class="full-btn full-btn-3x pull-L ellipsis" id="btn-confirm-no">${Translate.Button.General.Cancel[UserLag.language]}</button>  
                                </div>    
                            </div>
                        </div> `;

    $("body").append(alert_box.alert(Translate.Button.Building.Confirm[UserLag.language], content));

    $("#btn-confirm-yes").click(function () {


      if (typeof yesCallBack === "function") {

        yesCallBack();

      }

      alert_box.close();

    });

    $("#btn-confirm-no").click(function () {

      alert_box.close();

    });

  }

};




alert_box.systemChatMessage = function (message) {


  var msg = `<div class="msg-unit sysetm-chat-notif"  >
                            <div class="msg-body">
                                <P>
                                   ${message}
                                </P>
                            </div>
                        </div>`;
  $("#msg-area").append(msg);

  if ($("#msg-area").getNiceScroll(0).page.maxh - $("#msg-area").getNiceScroll(0).getScrollTop() < 5) {
    setTimeout(function () { $("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h, 0); }, 100);
  }


};



alert_box.downGradeBuilding = function (place) {

  var content = ` <div id="downdrade-box">
                        <div class="paragraph">
                            هل انت متاكد من انزل  المستوى الحالى للمبنى
                        </div>
                        <div class="two-btn">
                            <button class="full-btn pull-R full-btn-2x ellipsis" id="btn-confirm-no" id="closeAlertBoxButton">${Translate.Button.General.Cancel[UserLag.language]}</button>
                            <button class="full-btn pull-R full-btn-2x" id="downgrade-building-lvl" data-place="${place}">خفض المستوى</button>
                            <button class="full-btn pull-R full-btn-2x" id="downgradeBuildingConfirmButton" data-building-place="${place}">تفجير</button>
                        </div>
                    </div>`;

  $("body").append(alert_box.alert(`خفض مستوى ${BuildingConstData[Elkaisar.City.getCity().BuildingType[place]].title}`, content));


};

alert_box.dismisArmy = function (place) {

  var selected_type = $("#dialg_box .mili_building .middle-content .selected_sol").attr("army_type");
  var content = ` 
                    <div id="over_lay_alert">  
                        <div  id="dismiss-army-container" class="bg-general">    
                            <div id="alert_head">        
                                <div>             
                                    <img src="images/panner/king_name.png">     
                                </div>  
                                <div id="alert-title">طرد الجنود            </div>    
                                <img src="images/btns/close_b.png" class="img-sml close-alert">    
                            </div> 
                            <div id="dismiss-army-box">
                                <div class="table">
                                    <div class="th">
                                        <div class="td_1 ellipsis">${Translate.Title.TH.Resource[UserLag.language]}</div>
                                        <div class="td_2 ellipsis">${Translate.Title.TH.AcquiredAmount[UserLag.language]}</div>
                                        <div class="td_3 ellipsis">${Translate.Title.TH.YouHave[UserLag.language]}</div>
                                    </div>
                                    <div class="tr" data-resouce="food">
                                        <div class="td_1 ellipsis">غذاء</div>
                                        <div class="td_2 ellipsis">${Elkaisar.BaseData.Army[selected_type].dismess.food}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.food)}</div>
                                    </div>
                                    <div class="tr" data-resouce="wood">
                                        <div class="td_1 ellipsis">اخشاب</div>
                                        <div class="td_2 ellipsis">${Elkaisar.BaseData.Army[selected_type].dismess.wood}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.wood)}</div>
                                    </div>
                                    <div class="tr" data-resouce="stone">
                                        <div class="td_1 ellipsis">احجار</div>
                                        <div class="td_2 ellipsis">${Elkaisar.BaseData.Army[selected_type].dismess.stone}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.stone)}</div>
                                    </div>
                                    <div class="tr" data-resouce="metal">
                                        <div class="td_1 ellipsis">حديد</div>
                                        <div class="td_2 ellipsis">${Elkaisar.BaseData.Army[selected_type].dismess.metal}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.metal)}</div>
                                    </div>
                                </div>
                                <div class="dismiss-amount-input">
                                    <div class="pull-L">
                                        <img  src="${Elkaisar.BaseData.Army[selected_type].image}"/>
                                    </div>
                                    <div class="pull-R">
                                        <div class="wrapper">
                                            <label class="pull-L">${Translate.Button.Hero.Dismiss[UserLag.language]}</label>
                                            <input type="text" id="number-to-dismiss" class="only_num input numeric pull-L" step="${Elkaisar.CurrentCity.City[selected_type]}" max="${Elkaisar.CurrentCity.City[selected_type]}" min="0"/>
                                            <div class="number-arrow-wrapper pull-L">
                                                <label class="number-arrow up"></label>
                                                <label class="number-arrow down"></label>
                                            </div>
                                            <div class="possess">
                                                تمتلك  ${Elkaisar.CurrentCity.City[selected_type]}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="two-btn">
                                    <button class="full-btn pull-R full-btn-2x" id="closeAlertBoxButton">الغاء</button>
                                    <button class="full-btn pull-L full-btn-2x" id="dismissArmyButton" data-place="undefined">طرد</button>
                                </div>
                            </div>  
                        </div>`;

  $("body").append(content);


};

alert_box.jopFireEmployee = function (place) {

  var fireBenfit = Jop.jops[place].fireBenfit;
  var content = ` 
                    <div id="over_lay_alert">  
                        <div  id="dismiss-army-container" class="bg-general">    
                            <div id="alert_head">        
                                <div>             
                                    <img src="images/panner/king_name.png">     
                                </div>  
                                <div id="alert-title">طرد الجنود            </div>    
                                <img src="images/btns/close_b.png" class="img-sml close-alert">    
                            </div> 
                            <div id="dismiss-army-box">
                                <div class="table">
                                    <div class="th">
                                        <div class="td_1 ellipsis">${Translate.Title.TH.Resource[UserLag.language]}</div>
                                        <div class="td_2 ellipsis">${Translate.Title.TH.AcquiredAmount[UserLag.language]}</div>
                                        <div class="td_3 ellipsis">${Translate.Title.TH.YouHave[UserLag.language]}</div>
                                    </div>
                                    <div class="tr" data-resouce="food">
                                        <div class="td_1 ellipsis">غذاء</div>
                                        <div class="td_2 ellipsis">${fireBenfit.food}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.food)}</div>
                                    </div>
                                    <div class="tr" data-resouce="wood">
                                        <div class="td_1 ellipsis">اخشاب</div>
                                        <div class="td_2 ellipsis">${fireBenfit.wood}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.wood)}</div>
                                    </div>
                                    <div class="tr" data-resouce="stone">
                                        <div class="td_1 ellipsis">احجار</div>
                                        <div class="td_2 ellipsis">${fireBenfit.stone}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.stone)}</div>
                                    </div>
                                    <div class="tr" data-resouce="metal">
                                        <div class="td_1 ellipsis">حديد</div>
                                        <div class="td_2 ellipsis">${fireBenfit.metal}</div>
                                        <div class="td_3 ellipsis">${Math.floor(Elkaisar.CurrentCity.City.metal)}</div>
                                    </div>
                                </div>
                                <div class="dismiss-amount-input">
                                    <div class="pull-L">
                                        <img  src="${Jop.jops[place].image}"/>
                                    </div>
                                    <div class="pull-R">
                                        <div class="wrapper">
                                            <label class="pull-L">${Translate.Button.Hero.Dismiss[UserLag.language]}</label>
                                            <input type="text" id="number-to-dismiss" class="only_num numeric pull-L input" step="${Elkaisar.City.getCity().Jop[Jop.jops[place].produce]}" max="${Elkaisar.City.getCity().Jop[Jop.jops[place].produce]}" min="0"/>
                                            <div class="number-arrow-wrapper pull-L">
                                                <label class="number-arrow up"></label>
                                                <label class="number-arrow down"></label>
                                            </div>
                                            <div class="possess">
                                                تمتلك  ${Elkaisar.City.getCity().Jop[Jop.jops[place].produce]}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="two-btn">
                                    <button class="full-btn pull-R full-btn-2x" id="closeAlertBoxButton">${Translate.Button.General.Cancel[UserLag.language]}</button>
                                    <button class="full-btn pull-L full-btn-2x" id="fireJopLaborButton" data-produce="${Jop.jops[place].produce}">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                </div>
                            </div>  
                        </div>`;

  $("body").append(content);


};

alert_box.alert3X2 = function (title, content) {

  var content = ` <div id="over_lay">
                        <div id="overview-palace-bg">
                            <div class="header">
                                <div class="right">
                                    <div id="close-over-lay" class="close"></div>
                                </div>
                                <div class="middel">
                                    <div class="title">
                                        ${title}
                                    </div>
                                </div>
                                <div class="left">
                                </div>
                            </div>
                            <div class="content">
                                ${content}
                            </div>
                        </div>
                    </div>`;

  $("body").append(content);
  $("#close-over-lay").click(function () {
    $("#over_lay").remove();
  });
};

alert_box.heroReviewDetail = function (hero) {

  if (!hero)
    hero = Elkaisar.CurrentHero;

  var sword = getEquipData(hero.Equip.sword);
  var helmet = getEquipData(hero.Equip.helmet);
  var boot = getEquipData(hero.Equip.boot);
  var armor = getEquipData(hero.Equip.armor);
  var shield = getEquipData(hero.Equip.shield);

  var container = `<div id="hero-over-view">
                        <div class="right">
                            <div class="equip-review">
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(${helmet.image})"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/no_army.png)"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(${armor.image})"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(${boot.image})"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(${sword.image})"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(${shield.image})"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/no_army.png)"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/no_army.png)"></div>
                                        </div>
                                    </li>
                                    <li style="margin-left: 25%;">
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/no_army.png)"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/no_army.png)"></div>
                                        </div>
                                    </li>
                                </ul>
                                    
                            </div>
                            <div class="row row-3">
                                <div class="pull-L col-1">الجنود- الفيلق</div>                       
                                <div class="pull-L col-2">
                                    <div class="over-text">${getHeroCapById(hero.Hero.id_hero) + "/" + getHeroMaxCap(hero)}</div>
                                    <div class="colored-bar filak" style="width: ${(getHeroCap(hero.Army) * 100 / getHeroMaxCap(hero))}%"></div>
                                </div>
                                <div class="pull-L col-3">
                                </div>
                            </div>
                            <div class="dicor"></div>
                            
                            <div class="army-review">
                                
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.f_1_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.f_1_num)}"> ${hero.Army.f_1_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.f_2_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.f_2_num)}"> ${hero.Army.f_2_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.f_3_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.f_3_num)}"> ${hero.Army.f_3_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.b_1_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.b_1_num)}"> ${hero.Army.b_1_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.b_2_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.b_2_num)}"> ${hero.Army.b_2_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <div class="img" style="background-image: url(images/tech/${army_typs[hero.Army.b_3_type]})">
                                                <div class="amount ${Fixed.getArmyAmountColor(hero.Army.b_3_num)}"> ${hero.Army.b_3_num}</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="middel">
                            
                        </div>
                        <div class="left">
                            <div class="hero-data">
                                <div class="name">
                                    <div class="wrapper">
                                        Mutapha
                                    </div>
                                </div>
                                <div class="image">
                                    <div class="wrapper">
                                        <div class="avatar-hero" style="background-image: url(${Elkaisar.BaseData.HeroAvatar[hero.Hero.avatar]})">
                                            <div class="lvl">${hero.Hero.lvl}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hero-points">
                                <table border="1">
                                    <tr>
                                        <td>قوة السيطرة</td>
                                        <td> <span style=" color: #008c10;"> ${hero.Hero.point_a} + ${hero.Hero.point_a_plus}</span></td>
                                    </tr>
                                    <tr>
                                        <td>الشجاعة</td>
                                        <td> <span style="color: #b43d02;"> ${hero.Hero.point_b} + ${hero.Hero.point_b_plus}</span></td>
                                    </tr>
                                    <tr>
                                        <td>الدفاع</td>
                                        <td> <span style="color: #0065ac;"> ${hero.Hero.point_c} + ${hero.Hero.point_c_plus}</span></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>`;
  alert_box.alert3X2(Translate.Title.Alert.ShowHero[UserLag.language], container);
};



alert_box.randomMove = function () {
  var list = [];

  for (var iii in Elkaisar.World.Province.Title) {
    list.push({
      title: Elkaisar.World.Province.Title[iii][UserLag.language],
      value: iii
    });
  }



  var box = ` <div id="matral-box-use" class="bg-general"> 
                <div id="alert_head">    
                    <div>        
                        <img src="images/panner/king_name.png">    
                    </div>       
                    <div id="alert-title">${Translate.Button.MenuList.RelocateNow[UserLag.language]}</div>            
                    <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                </div>
                <div id="alert_box" class="matrial-show">        
                    <div id="move-city-to">
                        <div class="header-wrapper">
                            <div class="wrapper flex">
                                <div class="name">${Translate.Text.Province[UserLag.language]}:</div>
                                ${Elkaisar.Ui.Select.make(list, 0)}
                                <div class="con-btn">
                                    <button id="relocate-city-now" class="red-btn-wide relocate">${Translate.Button.MenuList.RelocateNow[UserLag.language]}</button>
                                </div>
                            </div>
                        </div>
                        <div class="body-wrapper">
                            <div class="content">
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
                `;
  $("#matral-box-use").remove();
  $("body").append(`<div id="over_lay_alert">${box}</div>`);
};

$(document).on("click", ".close-alert", function () {
  $(document).off("click", ".trans-con");
  $("#over_lay_alert").remove();
});

/*  
 * هظبط الانبوت بتاع الجيش*/
$(document).on("keydown", ".amount-input", function () {

  var max_val = parseInt($(this).attr("max"));
  var amount = parseInt($(this).val()) || 0;
  if (amount > max_val) {
    $(this).val(max_val);
  }

  $("#range_input").val(amount);
});

/*    RANGE INPUT  */
$(document).on("input", "#range_input", function () {
  $(".amount-input").val($(this).val());
});




$(document).on("click", "#useItemButton", function () {
  var useFor = $(this).attr("data-use-for");
  var item = $(this).attr("data-item");
  var other = $(this).attr("data-other");
  useMatrial(useFor, item, other);
});



$(document).on("click", "#closeAlertBoxButton", function () {
  alert_box.close();
});

//<button class="full-btn pull-R full-btn-2x" id="downgradeBuildingConfirmButton" onclick="BoxOfMatrialToUse(['powder_keg'], 'downgrade-building-lvl', 1 , '${place}');">تفجير</button>
$(document).on("click", "#downgradeBuildingConfirmButton", function () {
  var place = $(this).attr("data-building-place");
  BoxOfMatrialToUse(['powder_keg'], 'downgrade-building-lvl', 1, place);
});

//<button class="full-btn pull-L full-btn-2x" id="dismissArmyButton" onclick="" data-place="undefined">طرد</button>

$(document).on("click", "#dismissArmyButton", function () {
  $("#dismissArmyButton").prop("disabled", true);
  Elkaisar.Army.armyDismes();
});


//<button class="full-btn pull-L full-btn-2x" id="fireJopLaborButton" data-produce="${Jop.jops[place].produce}" onclick="Jop.fireLabor('${Jop.jops[place].produce}');">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
$(document).on("click", "#fireJopLaborButton", function () {
  var produce = $(this).attr("data-produce");
  Jop.fireLabor(produce);
});