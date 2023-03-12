Elkaisar.Contribute.For = {
  'Contribute': 'contribute',
  'EquipUpgrade': 'upgrade'
};

Elkaisar.Contribute.List = {};

Elkaisar.Contribute.getList = function () {
  $.ajax({
    'url': `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/contribute.json`,
    success: function (data) {
      Elkaisar.Contribute.List = data;
    }
  });
};

$(document).on("GameReady", function () {
  Elkaisar.Contribute.getList();
  console.log("Contribute Ready")
});
Elkaisar.Contribute.ToUpgradeBox = function (idCont) {
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var ListOfNeed = Cont['ListOfNeed'][0];
  var Name = '';
  var Image = 'images/tech/no_army.png';
  var Desc = '';
  if (ListOfNeed) {
    if (ListOfNeed['type'] == 'equip') {
      var EquipData = Equipment.getData(ListOfNeed['equip'], ListOfNeed['part'], ListOfNeed['lvl']);
      Image = EquipData['image'];
      Name = EquipData['name'];
      Desc = `   <li>هجوم  + ${EquipData['Power']['attack']} </li>
                            <li>دفاع  + ${EquipData['Power']['defence']} </li>
                            <li>انجراح  + ${EquipData['Power']['damage']} </li>
                            <li>حيوية  + ${EquipData['Power']['vitality']} </li>`;
    } else if (ListOfNeed['type'] == 'item') {
      Image = Elkaisar['BaseData']['Items'][ListOfNeed['item']]['image'];
      Name = Elkaisar['BaseData']['Items'][ListOfNeed['item']]['name'];
    }
  }
  return `<div class="flex">
                <div class="prizeCol">
                    <div class="imageCol">
                        <div class="prizeBg">
                            <div class="prizeimage">
                                <div class="matrial_unit">
                                    <img src="images/style/Border-up.png" class="border_up">
                                    <div class="img-inside-box">
                                        <div class="wrapper big-img">
                                            <div class="image" style="background-image: url(${Image})"></div>
                                        </div>
                                    </div> 
                                    <div class="txt-inside-box">
                                        <h2>${Name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wordsCol">
                    <ul>
                        ${Desc}
                    </ul>
                </div>
            </div>`;
};


Elkaisar.Contribute.PrizeBox = function (idCont) {
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var Reword = Cont['Reword'][0];
  var Name = '';
  var Image = 'images/tech/no_army.png';
  var Desc = '';
  if (Reword) {
    if (Reword['type'] == 'equip') {
      var EquipData = Equipment['getData'](Reword['equip'], Reword['part'], Reword['lvl']);
      Image = EquipData['image'];
      Name = EquipData['name'];
      Desc = `' <li>هجوم  + ${EquipData['Power']['attack']} </li>
                            <li>دفاع  + ${EquipData['Power']['defence']} </li>
                            <li>انجراح  + ${EquipData['Power']['damage']} </li>
                            <li>حيوية  + ${EquipData['Power']['vitality']} </li>`;
    } else if (Reword['type'] == 'item') {
      Image = Elkaisar['BaseData']['Items'][Reword['item']]['image'];
      Name = Elkaisar['BaseData']['Items'][Reword['item']]['name'];
    }
  }
  var ListOfNeed = {};
  for (var ii in Cont['ListOfNeed']) {
    if (Cont['ListOfNeed'][ii]['type'] == 'promotion')
      ListOfNeed = Cont['ListOfNeed'][ii];
  }
  return ` <div class="flex">
                <div class="prizeCol">
                    <div class="imageCol">
                        <div class="prizeBg">
                            <div class="prizeimage">
                                <div class="matrial_unit">
                                    <img src=" images/style/Border-up.png" class="border_up">
                                    <div class="img-inside-box">
                                        <div class="wrapper big-img">
                                            <div class="image" style="background-image: url(${Image})"></div>
                                        </div>
                                    </div> 
                                    <div class="txt-inside-box">
                                        <h2>${Name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wordsCol">
                    <ul>
                       ${Desc}
                    </ul>
                </div>
            </div>
            <div class="ReqFixed">
                <ul>
                    <li class="not-achieved">عدد الجائزة:${Reword['amount']}</li>
                    <li class="${ListOfNeed['promotion'] <= Elkaisar.DPlayer['Player']['porm'] ? 'achieved' : 'not-achieved'}">الرتبة: ${Elkaisar['BaseData']['Promotion'][ListOfNeed['promotion']]['Title']}</li>
                    <li class="rtl">نسبة الحصول: 100%</li>
                </ul>
            </div>`;
};


Elkaisar.Contribute.RequireList = function (idCont) {
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var List = '';

  for (var ii = 0; ii < 5; ii++) {
    var amount = 0;
    var amountNeeded = 0;
    var Image = 'images/tech/no_army.png';
    var Btn = '<div class="full-btn-3x">شراء</div>';
    if (Cont['ListOfNeed'][ii]) {
      if (Cont['ListOfNeed'][ii]['type'] == 'equip') {
        amount = Cont['ListOfNeed'][ii]['SelectedList']['length'];
        var Equip = Equipment['getData'](Cont['ListOfNeed'][ii]['equip'], Cont['ListOfNeed'][ii]['part'], Cont['ListOfNeed'][ii]['lvl']);
        Image = Equip['image'];
        Btn = `<div class="full-btn-3x SelectContReq" data-id-cont="${idCont}" data-cont-req-index="${ii}">اختيار</div>`;
        amountNeeded = Cont['ListOfNeed'][ii]['amount'];
      } else if (Cont['ListOfNeed'][ii]['type'] == 'item') {

        amount = Matrial['getPlayerAmount'](Cont['ListOfNeed'][ii]['item']);
        Image = Matrial['getMatrial'](Cont['ListOfNeed'][ii]['item'])['image'];
        Btn = `<div class="full-btn-3x BuyContReq" data-cont-req-index="${ii}">شراء</div>`;
        amountNeeded = Cont['ListOfNeed'][ii]['amount'];

      }
    }
    List += `   <li>
                        <div class="ReqUnit">
                            <div class="Reqimage">
                                <div class="ReqBg">
                                    <div class="Reqimg" style="background-image: url(${Image})"></div>
                                </div>
                            </div>
                            <div class="ReqAmount ${amount >= amountNeeded ? 'achieved' : 'not-achieved'}">${amount} / ${amountNeeded}</div>
                            <div class="ReqTitle">
                                ${Btn}
                            </div>
                        </div>
                    </li>`;
  }
  return `<ul class="flex">
                ${List}
            </ul>`;
};


Elkaisar['Contribute']['ContributeBox'] = function (idCont) {

  var Cat = Elkaisar['Contribute']['List'][idCont]['cat'];
  for (var ii in Elkaisar['Contribute']['List'][idCont]['ListOfNeed'])
    Elkaisar['Contribute']['List'][idCont]['ListOfNeed'][ii]['SelectedList'] = [];

  return `<div class="topBox flex">
                <div id="contributeBoxToUpgrade" class="col-ii">
                    ${Elkaisar['Contribute']['ToUpgradeBox'](idCont)}
                </div>
                <div class="col-i">
                    <div class="midCol">
                        <div class="success-rate font-2">
                            نسبة النجاح <br> 100%
                        </div>
                        <div id="${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'ContributeUpStart' : 'ContributeStart'}" data-id-cont="${idCont}" class="full-btn-3x">${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'تطوير' : 'مساهمة'}</div>
                    </div>
                </div>
                <div class="col-ii">
                   ${Elkaisar['Contribute']['PrizeBox'](idCont)}
                </div>
            </div>
            <div class="bottomBox flex">
                <div class="col-ii" style="width: 25%;">
                    <div class="buttonLList">
                        <div class="buttonWrapper">
                            <div class="full-btn-3x ${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'UpOther' : 'ConOther'}">${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'تطوير اخر' : 'مساهمة اخرى'}</div>
                        </div>
                        <div class="buttonWrapper">
                            <div class="full-btn-3x ${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'ContributeForC' : 'ContributeForUp'}">${Cat == Elkaisar['Contribute']['For']['EquipUpgrade'] ? 'مساهمة' : 'تطوير'}</div>
                        </div>
                        <div class="buttonWrapper">
                            <div class="full-btn-3x">المعدات الخاصة</div>
                        </div>
                        <div class="buttonWrapper">
                            <div class="full-btn-3x">شراء ذهب</div>
                        </div>
                        <div class="buttonWrapper font-2" style="width: 70%">
                             <img src="images/icons/gold.png" style="width: 18px; vertical-align: middle;"> <label style="line-height: 40px;"> لديك: ${Elkaisar.DPlayer['Player']['gold']}</label>
                        </div>
                    </div>
                </div>
                <div id="contributReqList" class="col-iii flex">
                    <div id="ReqListBox" class="ReqList flex">
                        ${Elkaisar['Contribute']['RequireList'](idCont)}
                    </div>
                </div>
            </div>`;
};


Elkaisar['Contribute']['DialogBox'] = function (ContFor) {
  var idCont;
  for (var iii in Elkaisar['Contribute']['List']) {
    if (Elkaisar['Contribute']['List'][iii]['cat'] === ContFor) {
      idCont = iii;
      break;
    }
  }
  return `<div id="dialg_box" class="fullBoxContent" style="top: 125px;">
                <div class="head_bar">
                    <img src="images/style/head_bar.png">
                    <div class="title">المساهمة</div>
                </div>
                <div class="nav_bar">
                    <div class="left-nav">
                        <ul> 
                            <li class="ContributeForUp ${ContFor == Elkaisar['Contribute']['For']['EquipUpgrade'] ? ' selected' : ''}" >
                                تطوير
                            </li> 
                            <li class="ContributeForC ${ContFor == Elkaisar['Contribute']['For']['Contribute'] ? ' selected' : ''}">
                                مساهمة
                            </li>
                        </ul>
                    </div>
                    <div class="right-nav">
                        <div class="nav_icon">
                            <img class="close_dialog" src="images/btns/close_b.png">
                        </div>
                    </div>
                </div>
                <div class="box_content contributeBox solidBg">
                    ${Elkaisar['Contribute']['ContributeBox'](idCont)}
                </div>
            </div>`;
};


Elkaisar.Contribute.ReqSelectListContent = function (idCont, ReqIndex) {
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var ReqList = Cont['ListOfNeed'][ReqIndex];
  var List = `<div class="th">
                            <div class="td_1 ellipsis" style="width: 60%">المطلوب</div>
                            <div class="td_2 ellipsis" style="width: 20%">متاح</div>
                            <div class="td_3 ellipsis" style="width: 20%">اختر</div>
                        </div>`;
  var Count = 0x0;
  for (var UEqui in Elkaisar.DPlayer['Equip']) {
    if (Elkaisar.DPlayer['Equip'][UEqui]['type'] != ReqList['equip'])
      continue;
    if (Elkaisar.DPlayer['Equip'][UEqui]['part'] != ReqList['part'])
      continue;
    if (Elkaisar.DPlayer['Equip'][UEqui]['lvl'] != ReqList['lvl'])
      continue;
    var Btn = `<button class="rightMark" style="background-size: auto 70%; height: 100%; width: 100%; margin: 0px; vertical-align: top"></button>`;
    if (Elkaisar.DPlayer['Equip'][UEqui]['id_hero'] > 0x0)
      var Btn = `<button class="uiBtnCloseDown downEquipFromHero"
                                    style="background-size: 85%; height: 100%; width: 100%; margin: 0px; vertical-align: top"
                                    data-id-cont="${idCont}" data-cont-req-index="${ReqIndex}" data-id-equip="${Elkaisar.DPlayer['Equip'][UEqui]['id_equip']}" 
                                    data-id-hero="${Elkaisar.DPlayer['Equip'][UEqui]['id_hero']}"></button>`;
    List += `'<li class="tr">
                            <div class="td_1" style="width: 20%">
                                <div class="wrapper">
                                    <div class="image" style="background-image: url(${Equipment['getData'](ReqList['equip'], ReqList['part'], ReqList['lvl'])['image']})"></div>
                                </div>
                            </div>
                            <div class="td_1" style="width: 40%">${Equipment['getData'](ReqList['equip'], ReqList['part'], ReqList['lvl'])['name']}</div>
                            <div class="td_3" style="width: 20%">${Btn}</div>
                            <div class="td_4" style="width: 20%">
                                <button style="margin:0px; height: 100%; width: 100%; vertical-align: top;"
                                class="${Cont['ListOfNeed'][ReqIndex]['SelectedList']['indexOf'](Elkaisar.DPlayer['Equip'][UEqui]['id_equip']) >= 0x0 ? 'uiCheckedBox' : 'uiUnCheckBox'}  full ConSelectReqItem"
                                 data-id-cont="${idCont}" data-cont-req-index="${ReqIndex}" data-id-equip="${Elkaisar.DPlayer['Equip'][UEqui]['id_equip']}"></button>
                            </div>
                        </li>`;
    Count++;
    console['log'](Cont['ListOfNeed'][ReqIndex]['SelectedList']['indexOf'](Elkaisar.DPlayer['Equip'][UEqui]['id_equip']));
  }
  for (var In = 0x9 - Count; In > 0x0; In--)
    List += '<li class="tr"></li>';
  $('#ContSelList')['html'](List);
};


Elkaisar.Contribute.ReqSelectList = function (idCont, ReqIndex) {
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var ListOfNeed = Cont['ListOfNeed'][ReqIndex];
  if (!ListOfNeed)
    return alert_box['failMessage']('لا يمكن اختيار المتاح');
  if (ListOfNeed['type'] != 'equip')
    return alert_box['failMessage']('المعدات فقط هى ما يمكن اختيارها');
  var List = `   <div id="over_lay" class="select_over_lay">
                            <div id="select_from">
                                <div class="head_bar">
                                    <img src="images/style/head_bar.png" class="banner">
                                    <div class="title">قائمة المتاح</div>
                                    <img class="close close_select_menu" src="images/btns/close_b.png">
                                </div>
                                <p style="clear: both"></p>
                                <div id="hero-select-list">
                                    <ol id="ContSelList" style="overflow-y: hidden; outline: currentcolor none medium;" tabindex="4"></ol>
                                    <div>
                                        <div class="configBtn" id="ContSelectedReqConf">
                                            <button class="full-btn-3x" data-id-cont="${idCont}">تأكيد</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
  $('body')['append'](List);
  Elkaisar.Contribute.ReqSelectListContent(idCont, ReqIndex);
  $('#ContSelList')['niceScroll'](SCROLL_BAR_PROP);
};



Elkaisar.Contribute.GetSelectList = function (ContFor, Offset, EquipType = 'all') {
  var StartFrom = 0x0;

  var FoundCount = 0x0;
  var ContUnit = '';
  for (var List in Elkaisar['Contribute']['List']) {

    var Reword = Elkaisar['Contribute']['List'][List]['Reword'][0];
    if (Elkaisar['Contribute']['List'][List]['cat'] != ContFor)
      continue;
    if (Reword['type'] == 'equip' && EquipType != 'all' && Reword['part'] != EquipType)
      continue;
    if (StartFrom < Offset) {
      StartFrom++;
      continue;
    }
    var Name = ' ';
    var Image = 'images/tech/no_army.png';
    if (Reword['type'] == 'equip') {
      Image = Equipment['getData'](Reword['equip'], Reword['part'], Reword['lvl'])['image'];
      Name = Equipment['getData'](Reword['equip'], Reword['part'], Reword['lvl'])['name'];
    } else if (Reword['type'] == 'item') {
      Image = Matrial['getMatrial'](Reword['item'])['image'];
      Name = Matrial['getMatrial'](Reword['item'])['name'];
    }

    ContUnit += `  <div class="unit-contribute" data-id-cont="${List}">
                            <div class="unite-eq">
                                <button style="background-image: url(${Image})" class="avail_equip unitCont"></button>
                            </div>  
                            <div class="title">${Name}</div>
                        </div>`;
    FoundCount++;
    if (FoundCount == 16)
      break;
  }

  for (var iii = FoundCount - 16; iii > 0x0; iii--)
    ContUnit += `  <div class="unit-contribute">
                            <div class="unite-eq">
                                <button style="background-image: url(${Image})" class="avail_equip unitCont"></button>
                            </div>  
                            <div class="title">${Name}</div>
                        </div>`;

  $('#SelectContributeList')['html'](ContUnit);

  var offsetMax = 0x0;
  for (var Listi in Elkaisar['Contribute']['List'])
    if (Elkaisar['Contribute']['List'][Listi]['cat'] == ContFor) {
      var RewordI = Elkaisar['Contribute']['List'][Listi]['Reword'][0];
      if (RewordI['type'] == 'equip' && EquipType != 'all' && RewordI['part'] != EquipType)
        continue;
      offsetMax++;
    }

  var Footer = `<div class="wrapper">
                        <div class="left">
                            <button class="GO_L_1 goContListL" data-offset="${Offset}" data-cont-for="${ContFor}" data-offset-max="${offsetMax}" data-filter="${EquipType}"></button>
                        </div>
                        <div class="lable">${(Math['ceil'](Offset / 16) + 1)}/${Math['ceil'](offsetMax / 16)}</div>
                        <div class="right">
                            <button class="GO_R_1 goContListR"  data-offset="${Offset}" data-cont-for="${ContFor}" data-offset-max="${offsetMax}" data-filter="${EquipType}"></button>
                        </div>
                    </div>`;
  $('#navigate-btn')['html'](Footer);
};



$(document)['on']('click', '#select_from #navigate-btn .goContListL', function () {
  var Offset = Number($(this)['attr']('data-offset'));
  var ContFor = $(this)['attr']('data-cont-for');
  var Filter = $(this)['attr']('data-filter');
  if (Offset - Offset % 16 - 16 < 0)
    return;
  Elkaisar.Contribute.GetSelectList(ContFor, Math.max(0x0, Offset - Offset % 16 - 16), Filter);
});


$(document)['on']('click', '#select_from #navigate-btn .goContListR', function () {
  var Offset = Number($(this)['attr']('data-offset'));
  var ContFor = $(this)['attr']('data-cont-for');
  var Filter = $(this)['attr']('data-filter');
  if (Offset - Offset % 16 + 16 >= $(this).attr('data-offset-max'))
    return;
  Elkaisar.Contribute.GetSelectList(ContFor, Math['max'](0, Offset - Offset % 16 + 16), Filter);
});


Elkaisar.Contribute.SelectContBox = function (ContFor) {

  var Box = `<div id="over_lay" class="select_over_lay">
                        <div id="select_from" style="width: 520px;margin-left: -260px;">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">قائمة المساهمة</div>
                                <img class="close close_select_menu" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div style="width: 84%;margin: auto; margin-top: 35px;">
                                <div class="right-content blue-ribbon"> 
                                    <div id="eq-part-select" class="eq-select-bar">
                                        <ul${ContFor == Elkaisar.Contribute.For.Contribute ? ' style="display: none;"' : ''} id="FilterContList" data-cont-for="${ContFor}">
                                            <li class="selected">
                                                <button data-equi-part="all"      class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-all.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="sword"    class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-sword.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="shield"   class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-shield.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="helmet"   class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-helmet.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="armor"    class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-armor.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="belt"     class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-belt.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="ring"     class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-ring.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="necklace" class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-necklase.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="boot"     class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-boot.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="pendant"  class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-meskah.png)"></button>
                                            </li>
                                            <li>
                                                <button data-equi-part="steed"    class="eq-unit-select-forCont" style="background-image: url(images/icons/hero/eq-list-horse.png)"></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="SelectContributeList" class="all-eq-table"></div>
                                    <div id="navigate-btn" class="ContNavBtn" style="margin-bottom: 10px;margin-top: 10px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
  $('body')['append'](Box);
  Elkaisar.Contribute.GetSelectList(ContFor, 0);

};

$(document)['on']('click', '#helpGateBtnWrapper', function () {
  dialogBoxShow(Elkaisar.Contribute.DialogBox(Elkaisar.Contribute.For.EquipUpgrade));
});


$(document)['on']('click', '.ContributeForUp', function () {
  $('#dialg_box').replaceWith(Elkaisar['Contribute']['DialogBox'](Elkaisar['Contribute']['For']['EquipUpgrade']));
});

$(document)['on']('click', '.ContributeForC', function () {
  $('#dialg_box').replaceWith(Elkaisar['Contribute']['DialogBox'](Elkaisar['Contribute']['For']['Contribute']));
});

$(document)['on']('click', '.SelectContReq', function () {
  var idCont = $(this)['attr']('data-id-cont');
  var ReqIndex = $(this)['attr']('data-cont-req-index');
  Elkaisar['Contribute']['ReqSelectList'](idCont, ReqIndex);
});

$(document)['on']('click', '.downEquipFromHero', function () {
  var idEquip = $(this)['attr']('data-id-equip');
  var idHero = $(this)['attr']('data-id-hero');
  var Hero = Elkaisar.Hero.getHero(idHero);
  var idCont = $(this)['attr']('data-id-cont');
  var ReqIndex = $(this)['attr']('data-cont-req-index');
  if (!Hero) {
    Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
    return alert_box['failMessage']('هذة المعدة ليست بالبطل');
  }


  var Equip = Elkaisar['Equip']['getEquipUnit'](idEquip);
  var EquipData = Equipment['getData'](Equip['type'], Equip['part'], Equip['lvl']);

  alert_box['confirmDialog'](`'تاكيد سحب ${EquipData['name']} من البطل ${Hero['Hero']['name']} (${Hero['Hero']['lvl']})'`,
    function () {
      Elkaisar.Hero.getEquipOffHero(idEquip)['done'](function (data) {
        Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
        var JsonData = JSON['parse'](data);
        if (JsonData['state'] == 'ok')
          alert_box['succesMessage']('تم سحب المعدة بنجاح');
      });
    });
});



$(document)['on']('click', '.ConSelectReqItem', function () {
  var idEquip = Number($(this)['attr']('data-id-equip'));
  var idCont = $(this)['attr']('data-id-cont');
  var ReqIndex = $(this)['attr']('data-cont-req-index');
  var Cont = Elkaisar['Contribute']['List'][idCont];
  var Count = $('#ContSelList .uiCheckedBox')['length'];
  var Equip = Elkaisar['Equip']['getEquipUnit'](idEquip);

  if (Equip['id_hero'] > 0) {
    alert_box['failMessage']('عليك سحب المعدة من البطل اولا');
    $(this)['removeClass']('uiCheckedBox');
    $(this)['addClass']('uiUnCheckBox');
    Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
    return;
  }
  if (Count > Cont['ListOfNeed'][ReqIndex]['amount']) {
    $(this)['removeClass']('uiCheckedBox');
    $(this)['addClass']('uiUnCheckBox');
    Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
    alert_box['succesMessage']('تم تحديد العدد المطلوب');
    return;
  }
  if (Cont['ListOfNeed'][ReqIndex]['SelectedList']['indexOf'](idEquip) >= 0) {
    $(this)['removeClass']('uiCheckedBox');
    $(this)['addClass']('uiUnCheckBox');
    Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
    return;
  }
  Cont['ListOfNeed'][ReqIndex]['SelectedList'].push(idEquip);
  Elkaisar['Contribute']['ReqSelectListContent'](idCont, ReqIndex);
});


$(document)['on']('click', '#ContSelectedReqConf button', function () {
  var idCont = $(this)['attr']('data-id-cont');
  $('#over_lay')['remove']();
  $('#ReqListBox')['html'](Elkaisar['Contribute']['RequireList'](idCont));
});

$(document)['on']('click', '.UpOther', function () {
  Elkaisar['Contribute']['SelectContBox'](Elkaisar['Contribute']['For']['EquipUpgrade']);
});

$(document)['on']('click', '.ConOther', function () {
  Elkaisar['Contribute']['SelectContBox'](Elkaisar['Contribute']['For']['Contribute']);
});

$(document)['on']('click', '#FilterContList li', function () {
  $('#FilterContList li')['removeClass']('selected');
  $(this)['addClass']('selected');
  var EquiPart = $(this)['children']()['attr']('data-equi-part');
  var ContFor = $('#FilterContList')['attr']('data-cont-for');
  Elkaisar['Contribute']['GetSelectList'](ContFor, 0, EquiPart);
});


$(document)['on']('click', '.unit-contribute', function () {
  var idCont = $(this)['attr']('data-id-cont');
  $('.close_select_menu')['click']();
  $('.contributeBox')['html'](Elkaisar['Contribute']['ContributeBox'](idCont));
});



$(document)['on']('click', '#ContributeUpStart', function () {

  var idCont = $(this)['attr']('data-id-cont');
  var Cont = Elkaisar['Contribute']['List'][idCont];
  if (!Cont['ListOfNeed'][0]['SelectedList'][0])
    return alert_box['failMessage']('عليك اختيار المعدة اولا');

  $.ajax({
    'url': `${Elkaisar.Config.NodeUrl}/api/AContribute/upgradeEquip`,
    'data': {
      'idCont': idCont,
      'idEquip': Cont['ListOfNeed'][0]['SelectedList'][0],
      'idCity': Elkaisar['CurrentCity']['idCity'],
      server: Elkaisar['Config']['idServer'],
      token: Elkaisar['Config']['OuthToken']
    },
    'type': 'POST',
    beforeSend: function (_0x138564) { },
    success: function (data, _0x555139, _0x357269) {

      if (!Elkaisar['LBase']['isJson'](data))
        return Elkaisar['LBase']['Error'](data);
      var JsonData = JSON['parse'](data);

      if (JsonData['state'] === 'ok') {

        Elkaisar['Equip']['getEquipUnit'](JsonData['Equip']['id_equip'])['id_hero'] = JsonData['Equip']['id_hero'];
        Elkaisar['Equip']['getEquipUnit'](JsonData['Equip']['id_equip'])['on_hero'] = JsonData['Equip']['on_hero'];
        Elkaisar['Equip']['getEquipUnit'](JsonData['Equip']['id_equip'])['lvl'] = JsonData['Equip']['lvl'];
        Elkaisar['Equip']['distributeEquip']();
        alert_box['succesMessage']('تم تطوير المعدة بنجاح');
        $('.contributeBox')['html'](Elkaisar['Contribute']['ContributeBox'](idCont));

      } else if (JsonData['state'] === 'error_0') {

        alert_box['failMessage']('المساهمة غير موجودة');

      } else if (JsonData['state'] === 'error_1') {

        alert_box['failMessage']('لا تمتلك هذة المعدة');

      } else if (JsonData['state'] === 'error_2') {

        alert_box['failMessage']('لا يمكن تطوير معده يستخدمها بطل');

      } else if (JsonData['state'] === 'error_5') {

        alert_box['failMessage']('المتطلبات غير موجودة');
      }
    }
  });
});


$(document)['on']('click', '#ContributeStart', function () {
  var idCont = $(this)['attr']('data-id-cont');
  var Cont = Elkaisar['Contribute']['List'][idCont];

  $.ajax({
    'url': `${Elkaisar.Config.NodeUrl}/api/AContribute/contribute`,
    'data': {
      'idCont': idCont,
      'idCity': Elkaisar['CurrentCity']['idCity'],
      server: Elkaisar['Config']['idServer'],
      token: Elkaisar['Config']['OuthToken']
    },
    'type': 'POST',
    beforeSend: function (_0x489a69) { },
    success: function (data, _0xbb6f87, _0x319448) {

      if (!Elkaisar['LBase']['isJson'](data))
        return Elkaisar['LBase']['Error'](data);
      var JsonData = JSON['parse'](data);

      if (JsonData['state'] === 'ok') {
        alert_box['succesMessage']('تم المساهمة بنجاح');
        Player_profile['refreshMatrialBox']()['done'](function () {
          $('.contributeBox')['html'](Elkaisar['Contribute']['ContributeBox'](idCont));
        });
      } else if (JsonData['state'] === 'error_0') {

        alert_box['failMessage']('المساهمة غير موجودة');

      } else if (JsonData['state'] === 'error_5') {

        alert_box['failMessage']('المتطلبات غير موجودة');
      }
    }
  });
});


