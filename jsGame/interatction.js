var PLAYER_ALL_HEROS;
$(document).ready(function () {

  $("#msg-area").niceScroll({
    autohidemode: false,
    cursorwidth: "10px",
    background: "url(images/bars/scroll_rail.png) center",
    railalign: "left",
    cursorborderradius: "0px",
    cursorborder: "none"
  });

});
// get city from data base



const SCROLL_BAR_PROP = {
  autohidemode: false,
  cursorwidth: "10px",
  background: "center 5% / 100% auto repeat-y url(images/bars/scroll_rail.png)     ",
  cursorborderradius: "0px",
  cursorborder: "none",
  horizrailenabled: false,
  railpadding: { top: 0, right: 0, left: 0, bottom: 0 }

};
// get all matrial

var EDUCATION_REQ = {};
var matrial_trade = {};
var SERVER_DATA;
var matrial_player = {};
var player_state;

const PLAYER_FACES = [
  "images/player/faceA1_.jpg",
  "images/player/faceA2_.jpg",
  "images/player/faceA3_.jpg",
  "images/player/faceA4_.jpg",
  "images/player/faceA5_.jpg",
  "images/player/faceA6_.jpg",
  "images/player/faceA7_.jpg",
  "images/player/faceA8_.jpg",
  "images/player/faceA9_.jpg",
  "images/player/faceA10_.jpg",
  "images/player/faceB1_.jpg",
  "images/player/faceB2_.jpg",
  "images/player/faceB3_.jpg",
  "images/player/faceB4_.jpg",
  "images/player/faceB5_.jpg",
  "images/player/faceB6_.jpg",
  "images/player/faceB7_.jpg",
  "images/player/faceB8_.jpg",
  "images/player/faceB9_.jpg"
];

var available_Equip;
var ArabicNumber =
{
  "0": "&\#1632;",
  "1": "&\#1633;",
  "2": "&\#1634;",
  "3": "&\#1635;",
  "4": "&\#1636;",
  "5": "&\#1637;",
  "6": "&\#1638;",
  "7": "&\#1639;",
  "8": "&\#1640;",
  "9": "&\#1641;",
  "-": "-"
};
function getArabicNumbers(str) {
  /* var newStr = "";
   
   str = String(str);
   
   for(var i=0; i<str.length; i++)
   {
   newStr += ArabicNumber[(str.charAt(i))];
   }*/

  return str;
}

function getServerData() {

  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/APlayer/getServerData`,
    data: {
      token: Elkaisar.Config.OuthToken,
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data)) {
        return Elkaisar.LBase.Error(data);
      }

      Elkaisar.Config.ServerCount = JSON.parse(data);

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

}




$(document).on("PlayerReady", "html", function () {

  Player_profile.refreshMatrialBox();
  $.ajax({
    url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/education.json`,
    dataType: 'JSON',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      EDUCATION_REQ = data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  $.ajax({
    url: `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/matrial_trade.json`,
    data: { get_matrial: true },
    type: 'GET',
    dataType: 'JSON',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      matrial_trade = data;
      // console.log((data));
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  getServerData();
  Elkaisar.Equip.getPlayerEquip();
});



const image_for_fa3lia = "images/style/t-map.png";
const paragraph_for_fa3lia = "الفاعلية ممتدة حتى هاية مارس";
// get  matrial 




function calPageNumber(type, isMall) {
  var content_keys = Object.keys(Matrial.listOf(type));


  var mat_counter = 0;

  if (isMall) {

    for (var iii = 0; iii < content_keys.length; iii++) {

      if (Elkaisar.BaseData.Items[content_keys[iii]].gold > 0) {
        // console.log(content_keys[iii])
        mat_counter++;
      }
    }

    return Math.ceil(mat_counter / 12);
  }





  for (var iii = 0; iii < content_keys.length; iii++) {

    if (Matrial.getPlayerAmount(content_keys[iii]) !== 0) {
      // console.log(content_keys[iii])
      mat_counter++;
    }
  }
  // console.log(mat_counter)
  return Math.ceil(mat_counter / 12);

}

// creat conent  unite 
/*
 * 
 * @param {string} image
 * @param {string} name
 * @param {json} req
 * @returns {String}
 */
function content_unit(image, name, req, player_amount, matrial_type, for_) {

  var total = "";
  if (for_ === "mall") {


    total = ` <li class="pull-L">
                           <div class="pic">
                               <img src="images/icons/resource/gold.png">
                           </div>
                           <div class="num txt-shadow">${getArabicNumbers(Elkaisar.BaseData.Items[matrial_type].gold)}</div>
                       </li>
                       <li class="pull-R">
                             <div class="buy_mat_btn">
                                <button class="full-btn full-btn-1x ellipsis">${Translate.Button.MenuList.Buy[UserLag.language]}</button>
                            </div>
                       </li>
`;

  }

  var list = `<li matrial_type="${matrial_type}" class="tooltip_mat matrial_unit">
                   <img src=" images/style/Border-up.png" class="border_up"/>
                   <div class="img-inside-box">
                       <div class="player_amount">
                            <img src="images/icons/shopQuantityBG.png"/>
                             <p>${getArabicNumbers(Matrial.getPlayerAmount(matrial_type))}</p>
                        </div>
                        <div class="wrapper big-img" >
                            <div class="image" style="background-image: url(${Elkaisar.BaseData.Items[matrial_type].image})"></div>
                        </div>
                        <div class="matrial">
                            <ul>
                            ${for_ === "mall" ? "" : `<button class="full-btn-3x sell-matrial" data-matrial="${matrial_type}"> عرض المادة للبيع</button>`}
                            `;


  list += total + "</ul>"
    + "</div>"
    + "</div>";
  var tail = ' <div class="txt-inside-box">'
    + '<h2>' + name + '</h2>'
    + '</div>'
    + '<div  class="tooltip_desc"></div>'
    + '</li>';

  return list + tail + "";
}
// creat conent  unite 
/*
 * 
 * @param {string} image
 * @param {string} name
 * @param {json} req
 * @returns {String}
 */
function content_unit_equip(image, name, equi_type, equi_part, index) {

  var total = "";

  var list = `<li class="matrial_unit" data-equip-index="${index}">
                   <img src=" images/style/Border-up.png" class="border_up"/>
                   <div class="img-inside-box">
                        <img src="${image}" class="big-img equip-unit" data-equi-part="${equi_part}" data-equi-type="${equi_type}">
                    </div>
                    <div class="txt-inside-box">
                        <h2>${name}</h2>
                    </div>
                </li>`;





  return list;
}

// change content for matrial box
function change_content(content, condtion, for_) {


  var all_content_unite = "";
  // console.log(condtion);
  var content_keys = Object.keys(content);
  var counter = 0;
  if (content_keys.length > 13) {
    for (var iii = 0; counter < 12 && iii < content_keys.length; iii++) {
      if (parseInt(content[content_keys[iii]]) !== condtion) {

        var image = Elkaisar.BaseData.Items[content_keys[iii]].image;
        var name = Elkaisar.BaseData.Items[content_keys[iii]].name;
        var req = Elkaisar.BaseData.Items[content_keys[iii]].req;
        all_content_unite += Matrial.itemUnitWidget(content_keys[iii], for_ === "mall");
        counter++;
      }
    }
  } else {
    for (var iii = 0; iii < content_keys.length; iii++) {

      if (parseInt(content[content_keys[iii]]) !== condtion) {
        var image = Elkaisar.BaseData.Items[content_keys[iii]].image;
        var name = Elkaisar.BaseData.Items[content_keys[iii]].name;
        var req = Elkaisar.BaseData.Items[content_keys[iii]].req;
        all_content_unite += Matrial.itemUnitWidget(content_keys[iii], for_ === "mall");
        counter++;
      }
    }
  }

  if (counter > 12) {
    $("#dialg_box .right-content .total").attr("data-num", "1-12");
  } else {
    $("#dialg_box .right-content .total").attr("data-num", "all");
  }

  var page_num = Math.ceil(content_keys.length / 12);
  $("#dialg_box .nav_icon h1").html(1 + "/" + page_num);

  return all_content_unite;
}

// change content for matrial box
function change_content_player_box(content, offset_mat) {


  var all_content_unite = "";
  // console.log(condtion);
  var content_keys = [];
  for (var key in content) {
    if (Number(content[key].playerAmount) > 0) {
      content_keys.push(key);
    }
  }
  var counter = 0;
  if (!offset_mat) {
    var offset = 0;
  } else {
    var offset = content_keys.indexOf(offset_mat);
  }
  if (content_keys.length > 13) {
    for (var iii = 0 + offset; counter < 12 && iii < content_keys.length; iii++) {
      if (Matrial.getPlayerAmount(content_keys[iii]) !== 0) {
        all_content_unite += Matrial.itemUnitWidget(content_keys[iii], false);
        counter++;
      }
    }
  } else {
    for (var iii = 0 + offset; iii < content_keys.length; iii++) {

      if (Matrial.getPlayerAmount(content_keys[iii]) !== 0) {
        all_content_unite += Matrial.itemUnitWidget(content_keys[iii], false);
        counter++;
      }
    }
  }


  var page_num = Math.ceil(content_keys.length / 12);
  $("#dialg_box .nav_icon h1").html((Math.floor(offset / 12) + 1) + "/" + page_num);

  return all_content_unite;
}


function resourcesRefresh() {

  var food_rate = (Elkaisar.CurrentCity.City.food_in - Elkaisar.CurrentCity.City.food_out) / (60 * 60);
  var wood_rate = (Elkaisar.CurrentCity.City.wood_in - Elkaisar.CurrentCity.City.wood_out) / (60 * 60);
  var stone_rate = (Elkaisar.CurrentCity.City.stone_in - Elkaisar.CurrentCity.City.stone_out) / (60 * 60);
  var metal_rate = (Elkaisar.CurrentCity.City.metal_in - Elkaisar.CurrentCity.City.metal_out) / (60 * 60);
  var coin_rate = (Elkaisar.CurrentCity.City.coin_in - Elkaisar.CurrentCity.City.coin_out) / (60 * 60);

  Elkaisar.CurrentCity.City.food = food_rate < 0 ? Math.max(0, Number(Elkaisar.CurrentCity.City.food) + food_rate) : ((Elkaisar.CurrentCity.City.food >= Elkaisar.CurrentCity.City.food_cap) ? Number(Elkaisar.CurrentCity.City.food) : Number(Elkaisar.CurrentCity.City.food) + food_rate);
  Elkaisar.CurrentCity.City.wood = wood_rate < 0 ? Math.max(0, Number(Elkaisar.CurrentCity.City.wood) + wood_rate) : ((Elkaisar.CurrentCity.City.wood >= Elkaisar.CurrentCity.City.wood_cap) ? Number(Elkaisar.CurrentCity.City.wood) : Number(Elkaisar.CurrentCity.City.wood) + wood_rate);
  Elkaisar.CurrentCity.City.coin = coin_rate < 0 ? Math.max(0, Number(Elkaisar.CurrentCity.City.coin) + coin_rate) : ((Elkaisar.CurrentCity.City.coin >= Elkaisar.CurrentCity.City.coin_cap) ? Number(Elkaisar.CurrentCity.City.coin) : Number(Elkaisar.CurrentCity.City.coin) + coin_rate);
  Elkaisar.CurrentCity.City.stone = stone_rate < 0 ? Math.max(0, Number(Elkaisar.CurrentCity.City.stone) + stone_rate) : ((Elkaisar.CurrentCity.City.stone >= Elkaisar.CurrentCity.City.stone_cap) ? Number(Elkaisar.CurrentCity.City.stone) : Number(Elkaisar.CurrentCity.City.stone) + stone_rate);
  Elkaisar.CurrentCity.City.metal = metal_rate < 0 ? Math.max(0, Number(Elkaisar.CurrentCity.City.metal) + metal_rate) : ((Elkaisar.CurrentCity.City.metal >= Elkaisar.CurrentCity.City.metal_cap) ? Number(Elkaisar.CurrentCity.City.metal) : Number(Elkaisar.CurrentCity.City.metal) + metal_rate);



  $("#city-profile .resource").each(function () {
    $(this).children(".left").children(".count-wrapper ").html(Math.ceil(Elkaisar.CurrentCity.City[$(this).attr("data-resource")]));
  });


}

function dialogBoxClose() {

  var box = $("#dialg_box");

  if (box.attr("data-box-for") === "battelField") {
    var x_coord = Number(box.attr("data-x-coord"));
    var y_coord = Number(box.attr("data-y-coord"));

    BattelField.removeFromWatchList(x_coord, y_coord);
  }
}

function dialogBoxShow(dialog_box, callBack) {

  if ($("#dialg_box").length > 0) {
    $("#dialg_box").animate({ top: "-800px" }, 200, "linear", function () {
      $(this).remove();
      dialogBoxClose();
      $("body").append(dialog_box);

      if (typeof callBack === "function") {
        callBack();
      }
      //Crafty.audio.play("click_sound");
      $("#dialg_box").animate({ top: "125" }, 200);
    });
  } else {
    $("body").append(dialog_box);
    if (typeof callBack === "function") {
      callBack();
    }
    //Crafty.audio.play("click_sound");
    $("#dialg_box").animate({ top: "125" }, 200);
  }

}
var menu_bar = {
  dialogBox: function (title, nav_bar, content, page_num) {

    var nav_list = "";
    nav_bar.forEach(function (one, index) {
      nav_list += ` <li head_title = "${one["title"]}" class="${index === 0 ? "selected" : ""}" >
                                   ${one[("title_" + UserLag.language)]}
                               </li>`;
    });



    return `
                    <div id='dialg_box'>
                        <div class="head_bar">
                           <img src="images/style/head_bar.png">
                           <div class="title">${title} </div>
                        </div>
                        <div class="nav_bar">
                            <div class="left-nav">
                                <ul>${nav_list}</ul>
                            </div>
                            <div class="right-nav">
                                <div class="nav_icon">
                                    <img  class ="close_dialog" src="images/btns/close_b.png">
                                 ${parseInt(page_num) === 0 ? "" : `
                                    <img id="nav-item-box-right" data-current-offset="1" src="images/btns/right.png" class="right">
                                    <h1 id="page-nav-holder"> 1/${page_num}</h1>
                                    <img id="nav-item-box-left" data-current-offset="1" src="images/btns/left.png" class="left">
                                                                        `
      }
                                
                                </div>
                            </div>
                        </div>
                        ${content}
                    </div>`;

  },
  dialogBoxContent_mall: function (Box) {

    return `<div class="box_content" id="mall-matrial" data-page-for="mall" data-item-box="${Box}"> 
                    <div class="right-content full show-item-list">
                        <ul class='total total_mat' mat_table='${Box}'>${Elkaisar.Item.ItemMallBox(Box)} </ul>
                    </div>
                    <div class="right-content-footer">
                        <div class="buttons pull-R">
                            <ul>
                                <li>
                                    <div class="full-btn full-btn-2x">${Translate.Button.MenuList.BuyGold[UserLag.language]}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="budget pull-L">
                            <div class="txt">
                                 ${Translate.Title.TH.YouHave[UserLag.language]}:${getArabicNumbers(Elkaisar.DPlayer.Player.gold)}
                            </div>
                            <div>
                                <img src="images/icons/gold_money.jpg">
                            </div>
                        </div>
                    </div>
                </div>`;
  },

  dialogBoxContent_ItemBox: function (Box) {


    return ` <div class="box_content" id="matrial-player" data-page-for="box-item" data-item-box="${Box}">
                     <div class="right-content full show-item-list">
                         <ul class='total total_mat' mat_table='${Box}'>${Elkaisar.Item.ItemBox(Box)}</ul>
                     </div>
                     <div class="right-content-footer">
                         <div class="buttons pull-R">
                             <ul>
                                 <li>
                                     <div class="full-btn full-btn-3x" id="goToMall">
                                         ${Translate.Button.MenuList.GetSomeGold[UserLag.language]}
                                     </div>
                                 </li>
                                 <li>
                                     <div class="full-btn full-btn-3x">
                                         ${Translate.Button.MenuList.BuyItems[UserLag.language]}
                                     </div>
                                 </li>
                             </ul>
                         </div>
                         <div class="budget pull-L">
                             <div class="txt">
                                 ${getArabicNumbers(Elkaisar.DPlayer.Player.gold)}: لديك
                             </div>
                             <div>
                                 <img src="images/icons/gold_money.jpg">
                             </div>
                         </div>
                     </div>
                 </div>`;
  },
  dialogBoxContent_trade: function (content) {

    return Trading.dailogBox_allMat();
  },

  dialogBoxcontent_Ranks: function (union = "") {
    return Elkaisar.Rank.EmptyBox();

    var output = `  <div class="box_content for_Ranks ">  
                                   <div class="left-content full">  
                                         
                                        
                                   </div>  
                                   <div class="right-content-footer" rank_for="${union === true ? "unuions" : "players"}">  
                                      <div class="buttons">  
                                          <ul class="flex">  
                                              <li id="show-my-rank">  
                                                    <button class="full-btn full-btn-2x full">${Translate.Button.General.ViewRank[UserLag.language]}</button>  
                                              </li> 
                                              <li>
                                                    <div class="nav_icon flex">
                                                        <div data-move="most-left" src="images/style/left.jpg" class="left move_p_rank pull-L most-left-btn"></div>
                                                        <div data-move="left" src="images/style/left.jpg" class="left move_p_rank  pull-L left-btn"></div>
                                                        <h1>  <span  id="current_page_num">1</span>/${union ? getArabicNumbers(Math.ceil(Elkaisar.Config.ServerCount.guild_num / 10)) : getArabicNumbers(Math.ceil(Elkaisar.Config.ServerCount.player_num / 10))}</h1>
                                                        <div data-move="right" src="images/style/right.jpg" class="right move_p_rank pull-R right-btn"></div>
                                                        <div data-move="most-right" src="images/style/right.jpg" class="right move_p_rank pull-R most-right-btn"></div>  
                                                  </div>
                                              </li>
                                              
                                              <li id="nav_input" class="flex">  
                                                    <input type="text"  class="only_num input"/>
                                                    <button class="full-btn full-btn-1x ellipsis">  
                                                        ${Translate.Button.General.GoTo[UserLag.language]}    
                                                    </button>
                                              </li>
        
                                              <li id="search_select" style=" float: left; width: 85px;">  
                                                    <select>
                                                        <option value="name" selected>الاسم</option>
                                                    </select>
                                              </li>
                                              <li id="nav_search" class="flex">  
                                                    <input type="text" class="input"/>
                                                    <button class="full-btn full-btn-1x ellipsis">  
                                                     ${Translate.Button.General.Search[UserLag.language]}
                                                   </button>
                                              </li>
                                              
                                          </ul>  
                                      </div>  
                                       
                                  </div>  
                               </div>`;
    return output;
  },
  getContentForRanks: function (rank_for, offset) {
    $("#DialBoxFooter").attr("data-rank-for", rank_for)
    switch (rank_for) {

      case Elkaisar.Rank.RankFor.Player:
        return Elkaisar.Rank.PlayerGeneralRank(offset);

      case Elkaisar.Rank.RankFor.Guild:
        return Elkaisar.Rank.GuildGeneralRank(offset);

      case Elkaisar.Rank.RankFor.Hero:
        return Elkaisar.Rank.HeroGeneralRank(offset);
      case Elkaisar.Rank.RankFor.City:
        return Elkaisar.Rank.CityGeneralRank(offset);

    }




  }
};



/*____________________________________________________________________________*/
/*_________________________REPORTS OBJECT ____________________________________*/
/*____________________________________________________________________________*/

// show dialog box  from  th menue bar
$(document).on("click", ".menu-list", function (e) {

  var data_show = $(this).attr("data-show");
  switch (data_show) {

    case "trade":
      var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Exchange[UserLag.language], NavBar.Exchange, Trading.dailogBox_allMat());

      dialogBoxShow(dialog_box, function () {
        var page_num = Trading.calPageNum();
        $("#dialg_box .nav_icon h1").html(1 + "/" + page_num);
        $("#dialg_box").attr("type", "exchange");
        $("#dialg_box").attr("data-cat", "trade-all");
        $("#dialg_box .right-content .total").attr("mat_table")
        Trading.dailogBox_allMat();
      });


      break;
    case "matrial":
      var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.ItemMall[UserLag.language], NavBar.ItemMall, menu_bar.dialogBoxContent_mall("matrial_main"), calPageNumber("matrial_main", true));
      Player_profile.refreshMatrialBox();

      dialogBoxShow(dialog_box, function () {
        $("#dialg_box .left-content").remove();
        $("#dialg_box").attr("type", "mall");
        $("#dialg_box .right-content").addClass("full");
        $("#dialg_box .right-content .total").attr("data-num", "1-12");
        $("#dialg_box .right-content .total").attr("mat_table", "matrial_main");
      });



      break;

    case "reports":

      playerBattels();

      BattelField.battelField({ navBar: NavBar.Report, totalBox: true }, Elkaisar.Battel.Battels);


      break;


    case "quests":

      var content = Quest.dialogBoxcontent_qusets();
      var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Quest[UserLag.language], NavBar.Quest, content, 0);
      dialogBoxShow(dialog_box, function () {

        $("#quest-page").niceScroll(SCROLL_BAR_PROP);
        $("#sub_quest").niceScroll(SCROLL_BAR_PROP);
        $("#quest_pack").niceScroll(SCROLL_BAR_PROP);
        $("#dialg_box").attr("type", "quests");

        Quest.refrehQuestNotif();

      });

      break;
    case "messages":

      var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Mail[UserLag.language], NavBar.Mail, "<div class='box_content'></div>", 0);
      dialogBoxShow(dialog_box, function () {

        message.dialogBoxcontent_msgIncome();

      });
      break;

    case "ranks":

      var content = menu_bar.dialogBoxcontent_Ranks();
      var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.Ranking[UserLag.language], NavBar.Ranking, content, 0);
      dialogBoxShow(dialog_box, function () {

        $("#dialg_box").attr("type", "messages");
        menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Player, 0);

      });


      break;

    case "union":
      Guild.guild_click();
      break;

    case "dominant":
      var dialog_box = Dominant.dialogBox();
      dialogBoxShow(dialog_box, function () {
        Dominant.armyCapital();

      });
      break;


  }

});



$(document).on("click", ".close_dialog", function (e) {

  var box = $("#dialg_box");
  dialogBoxClose();
  box.animate({ top: "-250px" }, 200, "linear", function () {
    $(this).remove();
  });
});



// navigate in  sources
// to  navgatein content 
$(document).on("click", ".left-nav ul  li", function () {

  $(".left-nav ul  li").each(function (el) {
    $(this).removeClass("selected")
  });
  $(this).addClass("selected");
  $("#dialg_box .nicescroll-rails").remove();

  var head_title = $(this).attr("head_title");
  if ($(this).parents("#dialg_box").attr("type") === "box") {
    var condtion = 0;
  } else if ($(this).parents("#dialg_box").attr("type") === "mall") {
    var condtion = -1;
  }
  switch (head_title) {
    // فيها صفحة الرئيسى ف الموارد
    case "main":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_main"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_main");

      // console.log(new_content)
      break;
    // فيها التسريع ف الموارد
    case "finishing":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_acce"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_acce");
      break;
    // فيها المنتجات
    case "prouducts":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_product"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_product");
      break;
    //  فيها صندوق الموارد
    case "box":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_box"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_box");
      break;
    // فيها الرفاهية
    case "walfare":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_luxury"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_luxury");
      break;
    // فيها المعدات
    case "equipments":
      if (condtion === 0) {
        $("#dialg_box .right-content .total").html(Elkaisar.Item.EquipBox());
        $("#dialg_box .right-content .total").attr("mat_table", "equip");
        $("#dialg_box .box_content").attr("data-page-for", "equip");
        $("#dialg_box .right-content .total").attr("mat_table", "equip");
        Elkaisar.Equip.getPlayerEquip();
      }

      break;
    //فسها الشعارات
    case "sologn":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox("matrial_flags"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_flags");
      break;



    // فيها صفحة الرئيسى ف الموارد
    case "mall-main":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_main"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_main");

      // console.log(new_content)
      break;
    // فيها التسريع ف الموارد
    case "mall-finishing":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_acce"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_acce");
      break;
    // فيها المنتجات
    case "mall-prouducts":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_product"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_product");
      break;
    //  فيها صندوق الموارد
    case "mall-box":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_box"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_box");
      break;
    // فيها الرفاهية
    case "mall-walfare":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_luxury"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_luxury");
      break;
    // فيها المعدات
    case "mall-equipments":


      $("#dialg_box .right-content .total").html("");
      $("#dialg_box .right-content .total").attr("mat_table", "equip");
      $("#dialg_box .nav_icon h1").html("0/0");


      break;
    //فسها الشعارات
    case "mall-sologn":
      $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox("matrial_flags"));
      $("#dialg_box .right-content .total").attr("mat_table", "matrial_flags");
      break;



    /*____________________________________________________________________*/

    /*ناف بار بتاعة تبادل المواد*/
    case "trade-all":

      var content = Trading.dailogBox_allMat("trade-all");
      $("#dialg_box .box_content").replaceWith(content);
      $("#dialg_box .right-content .total").attr("mat_table", "trade-all");
      break;
    case "trade-daily":
      var content = Trading.dailogBox_allMat("trade-daily");
      $("#dialg_box .box_content").replaceWith(content);
      $("#dialg_box .right-content .total").attr("mat_table", "trade-daily");
      break;
    case "trade-plassing":
      var content = Trading.dailogBox_allMat("trade-plassing");
      $("#dialg_box .box_content").replaceWith(content);
      $("#dialg_box .right-content .total").attr("mat_table", "trade-plassing");
      break;
    case "trade-millirty":
      var content = Trading.dailogBox_allMat("trade-milli");
      $("#dialg_box .box_content").replaceWith(content);
      $("#dialg_box .right-content .total").attr("mat_table", "trade-milli");
      break;
    case "trade-gifts":
      var content = Trading.dailogBox_allMat("trade-event");
      $("#dialg_box .box_content").replaceWith(content);
      $("#dialg_box .right-content .total").attr("mat_table", "trade-event");
      break;



    /*_____________________________________________________________________*/
    /*                              ناف  بار  بتاع التقارير*/

    case "battle":


      BattelField.battelField({ navBar: NavBar.Report, totalBox: false }, Elkaisar.Battel.Battels);

      break;
    case "attacking":
      Reports.chang_content_leaving();
      break;
    case "army_moving":
      Reports.change_content_heroBack();

      break;
    case "allais":
      Reports.change_content_GarrisonUnits();
      break;
    case "spy":
      Reports.change_content_SpyTask();
      break;


    /**************_________________________________________****************/
    /*___________________________FOR RANKS_________________________________*/


    case "rank_player":
      menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Player, 0);
      break;


    case "rank_union":
      menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Guild, 0);
      break;
    case "rank_hero":
      var new_rows = menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.Hero, 0);
      break;

    case "rank_city":
      var new_rows = menu_bar.getContentForRanks(Elkaisar.Rank.RankFor.City, 0);
      break;


    /*______________________________________________-FOR_msg_____________________________*/

    case "mail_in":
      message.dialogBoxcontent_msgIncome();
      break;
    case "battel_report":
      message.dialogBoxContent_battelReport();
      break;
    case "spy_report":
      message.dialogBoxContent_spyReport();
      break;
    case "coll_report":
      message.dialogBoxcontent_msgDiff();
      break;
    case "mail_out":
      message.dialogBoxcontent_msgOutcome();
      break;
    case "mail_write":
      $(".box_content").replaceWith(message.dialogBoxcontent_msgWrite());
      break;


    /*______________________________________FOR GUILD DIALOG BOX_______________________*/

    case "guild_data":
      var content = Guild.content_forGuild_data();
      $(".box_content").replaceWith(content);
      break;

    case "g_relation":
      var content = Guild.content_forRelation();

      break;

    case "upgrade_guild":
      Guild.content_forUpgrade();
      break;


    /*         ناف بار بتاع المهمات                 */

    case "growth_quest":
      Quest.changeContent("QuestGrowth");
      break;

    // فيها صفحة الرئيسى ف الموارد
    case "daily_quest_trade":

      /*
       *   أول حاجة هعملها  انى هشوف انهى مهمة اللاعب دة معملهاش
       */


      Quest.changeContent("QuestTrade");

      break;
    // فيها صفحة الرئيسى ف الموارد
    case "daily_quest":

      /*
       *   أول حاجة هعملها  انى هشوف انهى مهمة اللاعب دة معملهاش
       */


      Quest.changeContent("QuestDaily");

      break;

  }


});



// open  your matrial box
$("#matrial-box button").click(function () {

  var content = menu_bar.dialogBoxContent_ItemBox("matrial_main");// will be player matrial
  var dialog_box = menu_bar.dialogBox(Translate.Title.MenuList.MyItems[UserLag.language], NavBar.MatrialBox, content, calPageNumber("matrial_main", false));

  Player_profile.refreshMatrialBox().done(function () {
    $("#dialg_box .nav_bar .left-nav .selected").click();
  });

  dialogBoxShow(dialog_box, function () {
    $("#dialg_box").attr("type", "box");
  });

  Elkaisar.Item.useItemFunc();
  Elkaisar.Item.useItemBoxFunc();
  Elkaisar.Item.useArmyBackFunc();
});

/*    SHOW TOOLTIP   FOR MATRIAL */
/*
 *  هنا انا عامل كلاس لكل الى ليهم تول تيب صغيرة
 *  اى حاجة مش شرط فى  صندوق الموارد
 */
$(document).on("mouseenter", ".tooltip_mat", function () {

  const Item = $(this).attr("matrial_type");
  const MatType = $(this).attr("data-mat-type");
  let ItemName = "";
  let ItemGold = "";
  let ItemImage = "";
  let ItemDes = "";
  let ItemLongDes = "";

  if (MatType === "equip") {
    const Equip = Item.split("_")
    ItemImage = Equipment.getImage(Equip[0], Equip[1], Equip[2]);
    ItemName = Equipment.getName(Equip[0], Equip[1], Equip[2]);
    ItemDes = Equipment.getData(Equip[0], Equip[1], Equip[2]).desc;
    ItemLongDes = Equipment.getData(Equip[0], Equip[1], Equip[2]).long_desc;

  } else {
    ItemImage = Matrial.image(Item);
    ItemName = Matrial.getMatrialName(Item);
    ItemGold = Matrial.gold(Item);
    ItemDes = Elkaisar.BaseData.Items[Item]?.desc;
    ItemLongDes = Elkaisar.BaseData.Items[Item]?.long_desc;
  }
  var toolTip = ` <div class="tooltip-container">
                    <div class="header">
                      <div class="mat_name pull-R">
                        ${ItemName}
                      </div>
                      <div class="mat_price pull-L">
                        <p class="pull-L"> ${ItemGold}</p>
                        <div class="pull-R">
                          <img src="images/icons/resource/gold.png"/>
                        </div>
                      </div>
                    </div>
                    <div class="desc">
                      ${ItemDes}
                    </div>
                    <div class="desc">
                      ${ItemLongDes}
                    </div>
                  </div>`;
  $(this).children(".tooltip_desc").html(toolTip);
});


/*   REMOVE TOOLTIP  */
$(document).on("mouseleave", ".tooltip_mat", function () {

  $(this).children(".tooltip_desc").empty();

});

/*                   intract matrial on click                   */

$(document).on('click', '#matrial-player .matrial_unit', function () {
  var idItem = $(this).attr('matrial_type');
  var Item = Elkaisar.BaseData.Items[idItem];
  var PlayerAmount = Matrial.getPlayerAmount(idItem);
  $('#alert_container').remove();
  var ExtraString = '';
  switch (idItem) {
    case 'certain_move':
      ExtraString = `  <div class="extra_html">
                            ادخل الاحداثيات 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
                                X <input id="new-city-y-coord" type="text" class="only_num input" min="0" max="499">
                                Y <input id="new-city-x-coord" type="text" class="only_num input" min="0" max="499">
                            </div>`;
      break;
    case 'random_move':
      break;
  }
  var Box = ` <div id="matral-box-use" class="bg-general"> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">${Translate['Title']['Box']['pleaseSelect'][UserLag['language']]}</div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="matrial-show">        
                                <div class="row-2">
                                    <div class="pull-L left">
                                        <img src="${Item['image']}"/>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="name ellipsis">
                                            ${Item['name']} 
                                        </div>
                                        <div class="amount">
                                            ${Translate['Title']['TH']['YouHave'][UserLag['language']]} ${PlayerAmount}
                                        </div>
                                    </div>
                                </div>  
                                <div class="mat_desc">
                                    ${Item['desc']}
                                </div>
                                ${ExtraString}
                                <div class="row-3">       
                                    <div class="confim-btn">            
                                        ${Item['use'] === 'none' ? '' : `<button class="full-btn full-btn-3x  pull-R enter" data-item-name="${idItem}" id="${Item['use'] == 'Box' ? 'openPlayerItemBox' : 'usePlayerItemBox'}">${(Item['use'] == 'Box' ? 'فتح' : 'تأكيد')}</button>  `}  
                                        ${Item['use'] === 'many' ? `<input type="text" max="${PlayerAmount}" min="0" step="1" class="pull-L only_num input" id="amount_to_use">
                                                                        <div class="number-arrow-wrapper pull-L">
                                                                            <label class="number-arrow up"></label>
                                                                            <label class="number-arrow down"></label>
                                                                        </div>` : ""} 
                                        
                                    </div>    
                                </div>
                            </div>    
                        </div>`;

  $('body')['append'](Box);
});


$(document).on("click", ".buy_mat_btn button", function () {

  var matrial_name = $(this).parents(".matrial_unit").attr("matrial_type");

  var mat_obj = Elkaisar.BaseData.Items[matrial_name];
  var amount = Elkaisar.BaseData.Items[matrial_name].playerAmount;

  $("#alert_container").remove();

  var confirm_box = ` <div id="matral-box-use" class="bg-general"> 
                            <div id="alert_head">    
                                <div>        
                                    <img src="images/panner/king_name.png">    
                                </div>       
                                <div id="alert-title">${Translate.Button.MenuList.Buy[UserLag.language]} </div>            
                                <img src="images/btns/close_b.png" class="img-sml close-alert_container">       
                            </div>
                            <div id="alert_box" class="matrial-show">        
                                <div class="row-2">
                                    <div class="pull-L left">
                                        <img src="${mat_obj.image}"/>
                                        <ul> 
                                            <li class="pull-L">
                                                <div class="pic">
                                                    <img src="images/icons/resource/gold.png">
                                                </div>
                                                <div class="num txt-shadow">${mat_obj.gold}</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="pull-R right">
                                        <div class="name ellipsis">
                                            ${mat_obj.name} 
                                        </div>
                                        <div class="amount">
                                            ${Translate.Title.TH.YouHave[UserLag.language]} ${getArabicNumbers(amount)}
                                        </div>
                                    </div>
                                </div>  
                                <div class="mat_desc">
                                    ${mat_obj.long_desc}
                                </div>
                                <div class="row-3">        
                                    <div class="confim-btn">            
                                        <button class="full-btn full-btn-3x pull-R enter" id="buyNewItem" data-item-name="${matrial_name}">${Translate.Button.MenuList.Buy[UserLag.language]}</button>  
                                        <input type="text" min="1" step="1" class="pull-L only_num input" max="${Math.floor(Elkaisar.DPlayer.Player.gold / mat_obj.gold)}" id="amount_to_buy" value="1">
                                        <div class="number-arrow-wrapper pull-L">
                                            <label class="number-arrow up"></label>
                                            <label class="number-arrow down"></label>
                                        </div>
                                    </div>    
                                </div>
                            </div>    
                        </div>`;
  $("body").append(confirm_box);
});


$(document).on("click", ".close-alert_container", function () {
  $("#alert_container").remove();
  $("#matral-box-use").remove();
  $("#over_lay_alert").remove();
});





function refreshArmy_view() {
  $(".left_army .army_type").each(function () {
    $(this).children(".army_count").children("h6").html(getArabicNumbers(Elkaisar.CurrentCity.City[$(this).data("army")]));
  });
}


/**
 * 
 * @param {string} matrial
 * @param {json} json_obj
 * @returns {undefined}
 */












/*______________________________________________________________________________*/
/*    navigate in rank page */






/*____________________________________________________________________________*/
/*__________________________GO TO BUTTON______________________________________*/





/*____________________________________________________________________________*/
/*______________________________SEARSH NAV ___________________________________*/

$(document).on("click", "#nav_search button", function () {


  var search_value = $("#nav_search input").val();

  var rank_for = $(this).parents(".right-content-footer").attr("rank_for");

  var searsh_By = $("#search_select  select").val();



  switch (rank_for) {

    case "players":

      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingPlayer/getRankPlayerBySearch`,
        data: {
          searshBy: searsh_By,
          searchValue: search_value,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

          var json_data = JSON.parse(data);
          var _return = `<div class="th">
                            <div class="td_1 ellipsis">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                            <div class="td_2 ellipsis">${Translate.Title.TH.Lord[UserLag.language]}</div>
                            <div class="td_3 ellipsis subject">${Translate.Title.TH.LeagueName[UserLag.language]}</div>
                            <div class="td_5 ellipsis">${Translate.Title.TH.NobleRank[UserLag.language]}</div>
                            <div class="td_6 ellipsis">${Translate.Title.TH.Honor[UserLag.language]}</div>
                            <div class="td_7 ellipsis">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                        </div>`;

          if (json_data.length > 0) {

            for (var iii = 0; iii < json_data.length; iii++) {


              _return += `<div class="tr" rank="${json_data[iii].rank}" >
                              <div class="td_1">${getArabicNumbers(json_data[iii].rank)}</div>
                              <div class="td_2">${json_data[iii].name}</div>
                              <div class="td_3"> ${json_data[iii].guild || ""}</div>
                              <div class="td_4">${Elkaisar.BaseData.Promotion[json_data[iii].porm].Title}</div>
                              <div class="td_5">${getArabicNumbers(json_data[iii].honor)}</div>
                              <div class="td_7">${getArabicNumbers(json_data[iii].prestige)}</div>
                          </div>`;

            }
            $("#dialg_box .nav_icon h1").html("٠/٠");
            $(".for_Ranks .left-content").html(_return);

          } else {
            $('body').append(alert_box.confirmMessage("لا يوجد لاعب  يحمل هذا الاسم"))
          }


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });



      break;



    case "unuions":
      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingGuild/getRankGuildBySearch`,
        data: {
          searshBy: searsh_By,
          searchValue: search_value,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

          var json_data = JSON.parse(data);
          var _return = `<div class="th">
                            <div class="td_1" style="width: 14.5%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                            <div class="td_2" style="width: 14.5%">${Translate.Title.TH.League[UserLag.language]}</div>
                            <div class="td_3" style="width: 14.5%">${Translate.Title.TH.Host[UserLag.language]}</div>
                            <div class="td_4" style="width: 14.5%">${Translate.Title.TH.Members[UserLag.language]}</div>
                            <div class="td_5" style="width: 14.5%">${Translate.Title.TH.Honor[UserLag.language]}</div>
                            <div class="td_6" style="width: 14.5%">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                            <div class="td_7" style="width: 13.0%">${Translate.Button.General.Action[UserLag.language]}</div>
                        </div>`;
          if (json_data.length > 0) {
            for (var iii = 0; iii < json_data.length; iii++) {
              _return += `<div class="tr" rank="${json_data[iii].rank_g}" data-id_guild = "${json_data[iii].id_guild}">
                              <div class="td_1 ellipsis" style="width: 14.5%">${getArabicNumbers(json_data[iii].rank_g)}</div>
                              <div class="td_2 ellipsis" style="width: 14.5%">${json_data[iii].name}</div>
                              <div class="td_3 ellipsis" style="width: 14.5%"> ${json_data[iii].p_name}</div>
                              <div class="td_4 ellipsis" style="width: 14.5%">${json_data[iii].mem_num}</div>
                              <div class="td_5 ellipsis" style="width: 14.5%">${json_data[iii].honor}</div>
                              <div class="td_6 ellipsis" style="width: 14.5%">${json_data[iii].prestige}</div>
                              <div class="td_7 ellipsis" style="width: 13%"  ><button class="full-btn show-guild-prev"> ${Translate.Button.MenuList.View[UserLag.language]}</buton></div>
                          </div>`;
            }
            $(".for_Ranks .left-content").html(_return);
          } else {
            $('body').append(alert_box.confirmMessage("لا يوجد حلف  يحمل هذا الاسم"));
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
      });



      break;

    case "heros":
      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingHero/getRankHeroBySearch`,
        data: {
          searshBy: searsh_By,
          searchValue: search_value,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

          var json_data = JSON.parse(data);
          var _return = `    <div class="th">
                                <div class="td_1" style="width: 14.25%;">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                                <div class="td_2" style="width: 14.25%;">${Translate.Title.TH.Hero[UserLag.language]}</div>
                                <div class="td_3" style="width: 14.25%;">${Translate.Title.TH.Lord[UserLag.language]}</div>
                                <div class="td_5" style="width: 14.25%;">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                                <div class="td_6" style="width: 14.25%;">${Translate.Title.TH.Sway[UserLag.language]}</div>
                                <div class="td_7" style="width: 14.25%;">${Translate.Title.TH.Bravery[UserLag.language]}</div>
                                <div class="td_8" style="width: 14.25%;">${Translate.Title.TH.Parry[UserLag.language]}</div>
                            </div>`;

          if (json_data.length > 0) {
            for (var iii = 0; iii < json_data.length; iii++) {


              _return += `<div class="tr" rank="${json_data[iii].rank_h}">
                                                    <div class="td_1 ellipsis" style="width: 14.25%;">${getArabicNumbers(json_data[iii].rank_h)}</div>
                                                    <div class="td_2 ellipsis" style="width: 14.25%;">${json_data[iii].name}</div>
                                                    <div class="td_3 ellipsis" style="width: 14.25%;"> ${json_data[iii].p_name}</div>
                                                    <div class="td_4 ellipsis" style="width: 14.25%;">${getArabicNumbers(json_data[iii].lvl)}</div>
                                                    <div class="td_5 ellipsis" style="width: 14.25%;">${getArabicNumbers(json_data[iii].point_a)}</div>
                                                    <div class="td_7 ellipsis" style="width: 14.25%;">${getArabicNumbers(json_data[iii].point_b)}</div>
                                                    <div class="td_8 ellipsis" style="width: 14.25%;">${getArabicNumbers(json_data[iii].point_c)}</div>
                                                </div>`;

            }

            $(".for_Ranks .left-content").html(_return);

          } else {

            $('body').append(alert_box.confirmMessage("لا يوجد بطل  يحمل هذا الاسم"));

          }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });



      break;

    case "cities":
      $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ARankingCity/getRankCityBySearch`,
        data: {
          searshBy: searsh_By,
          searchValue: search_value,
          token: Elkaisar.Config.OuthToken
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
          var json_data = JSON.parse(data);
          var _return = `<div class="th">
                            <div class="td_1 ellipsis">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                            <div class="td_2 ellipsis">${Translate.Title.TH.Name[UserLag.language]}</div>
                            <div class="td_3 ellipsis">${Translate.Title.TH.Lvl[UserLag.language]}</div>
                            <div class="td_5 ellipsis">${Translate.Title.TH.Lord[UserLag.language]}</div>
                            <div class="td_6 ellipsis">${Translate.Title.TH.League[UserLag.language]}</div>
                            <div class="td_7 ellipsis">${Translate.Title.TH.Population[UserLag.language]}</div>
                        </div>`;

          if (json_data.length > 0) {

            for (var iii = 0; iii < json_data.length; iii++) {


              _return += `<div class="tr" rank="${json_data[iii].rank_g}">
                                                    <div class="td_1">${getArabicNumbers(json_data[iii].rank_g)}</div>
                                                    <div class="td_2">${json_data[iii].name}</div>
                                                    <div class="td_3"> ${json_data[iii].lvl}</div>
                                                    <div class="td_4">${json_data[iii].p_name}</div>
                                                    <div class="td_5">${json_data[iii].g_name || ""}</div>
                                                    <div class="td_7">${json_data[iii].pop}</div>
                                                </div>`;

            }

            $(".for_Ranks .left-content").html(_return);

          } else {

            $('body').append(alert_box.confirmMessage("لا توجد مدينة  تحمل هذا الاسم"));

          }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });



      break;

  }

});


/*show my rank*/
$(document).on("click", "#show-my-rank button", function () {



  var rank_for = $(this).parents(".right-content-footer").attr("rank_for");



  switch (rank_for) {

    case "players":
      $("#search_select  select").val("name");
      $("#nav_search input").val(Elkaisar.DPlayer.Player.name);
      $("#nav_search button").click();

      break;
    case "unuions":

      $("#search_select  select").val("name");
      $("#nav_search input").val(Elkaisar.DPlayer.Player.guild);
      $("#nav_search button").click();

    case "heros":
      $("#search_select  select option:selected").attr("value", "id_player");
      $("#nav_search input").val(Elkaisar.DPlayer.Player.id_player);
      $("#nav_search button").click();


      break;

    case "cities":

      $("#search_select  select option:selected").attr("value", "id_player");
      $("#nav_search input").val(Elkaisar.DPlayer.Player.id_player);
      $("#nav_search button").click();

      break;

  }

  $("#search_select  select option:selected").attr("value", "name");


});



//<button class="full-btn full-btn-3x  pull-R enter" class="usePlayerItemBox"  onClick="useMatrialBox('${matrial_name}')" >تاكيد</button>
$(document).on("click", "#usePlayerItemBox", function () {
  var item = $(this).attr("data-item-name");
  $("#useItemButton").attr("disabled", true);
  useMatrialBox(item);
});
//<button class="full-btn full-btn-3x pull-R enter" id="buyNewItem" data-item-name="${matrial_name}"  onClick="buyMatrial('${matrial_name}')" >${Translate.Button.MenuList.Buy[UserLag.language]}</button>  


window.addEventListener("orientationchange", function () {
  // Announce the new orientation number
  MAX_SCREEN_WIDTH = $(document).width();
  MAX_SCREEN_HEIGHT = $(document).height();

}, false);

$(document)['on']('click', '#openPlayerItemBox', function () {
  var idItem = $(this)['attr']('data-item-name');
  $['ajax']({
    'url': Elkaisar.Config.NodeUrl + '/api/AItem/openItemBox',
    'data': {
      'server': Elkaisar['Config']['idServer'],
      'token': Elkaisar['Config']['OuthToken'],
      'idItem': idItem
    },
    'type': 'POST',
    'success': function (data, _0x106300, _0x509fc4) {
      if (!Elkaisar['LBase']['isJson'](data))
        Elkaisar['LBase']['Error'](data);
      var JsonObject = JSON['parse'](data);
      if (JsonObject['state'] === 'ok') {
        showMatrialGiftList(JsonObject['Item']);
        for (var ii in JsonObject['Item']) {
          if (JsonObject['Item']['prizeType'] == 'E') {
            Elkaisar['Equip']['getPlayerEquip']();
          } else {
            Matrial['givePlayer'](JsonObject['Item'][ii]['Item'], JsonObject['Item'][ii]['amount']);
          }

        }
        Elkaisar['Item']['ItemBox']('matrial_box', $('#nav-item-box-left')['attr']('data-current-offset'));
        Player_profile['refreshMatrialBox']()['done'](function () {
          Elkaisar['Item']['ItemBox']('matrial_box', $('#nav-item-box-left')['attr']('data-current-offset'));
        });
      } else if (JsonObject['state'] === 'error_1') {
        alert_box['failMessage']('ليس لديك مواد كافية');
      }
    }
  });
});

