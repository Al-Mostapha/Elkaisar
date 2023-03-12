Elkaisar.Item.ItemBox = function (Box, pageOffset = 1) {
    var ListString = "";
    var ListOfItem = Matrial.listOf(Box);
    var FilteredList = {};
    var currentOffset = 0;

    var maxPageCount = Math.ceil(Object.keys(ListOfItem).filter(It => Matrial.getPlayerAmount(It) > 0).length / 12);

    if (pageOffset > maxPageCount)
        return "";
    if (pageOffset < 1)
        return "";




    $("#page-nav-holder").html(`${pageOffset}/${Math.ceil(Object.keys(ListOfItem).filter(It => Matrial.getPlayerAmount(It) > 0).length / 12)}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "box-item");
    for (var iii in ListOfItem) {

        if (Matrial.getPlayerAmount(iii) <= 0)
            continue;
        currentOffset++;

        if (currentOffset > pageOffset * 12)
            break;
        if (currentOffset <= (pageOffset - 1) * 12)
            continue;

        FilteredList[iii] = ListOfItem[iii];
    }

    for (var iii in FilteredList)
        ListString += Matrial.itemUnitWidget(iii, false);

    return ListString;

};


Elkaisar.Item.ItemMallBox = function (Box, pageOffset = 1) {

    var ListString = "";
    var ListOfItem = Matrial.listOf(Box);
    var FilteredList = {};
    var currentOffset = 0;

    var maxPageCount = Math.ceil(Object.keys(ListOfItem).filter(It => ListOfItem[It].gold > 0).length / 12);

    if (pageOffset > maxPageCount)
        return;
    if (pageOffset < 1)
        return;

    $("#page-nav-holder").html(`${pageOffset}/${Math.ceil(Object.keys(ListOfItem).filter(It => ListOfItem[It].gold > 0).length / 12)}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "mall");
    for (var iii in ListOfItem) {

        if (ListOfItem[iii].gold <= 0)
            continue;
        currentOffset++;

        if (currentOffset > pageOffset * 12)
            break;
        if (currentOffset <= (pageOffset - 1) * 12)
            continue;

        FilteredList[iii] = ListOfItem[iii];
    }

    for (var iii in FilteredList)
        ListString += Matrial.itemUnitWidget(iii, true);

    return ListString;

};

Elkaisar.Item.ItemExchangeBox = function (Box, pageOffset = 1) {

    var ListString = "";
    var FilteredList = [];
    var currentOffset = 0;

    var maxPageCount = Math.ceil(EXCHANGE_ITEM.filter(It => It.cat === Box || Box === "trade-all").length / 9);

    if (pageOffset > maxPageCount)
        return "";
    if (pageOffset < 1)
        return "";

    $("#page-nav-holder").html(`${pageOffset}/${maxPageCount}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", Box);
    $(".box_content").attr("data-page-for", "exchange");



    for (var iii in EXCHANGE_ITEM) {
        currentOffset++;

        if (currentOffset > pageOffset * 9)
            break;
        if (currentOffset <= (pageOffset - 1) * 9)
            continue;

        FilteredList.push(EXCHANGE_ITEM[iii]);
    }

    for (var iii in FilteredList)
        ListString += Trading.content_unit(FilteredList[iii]);


    return ListString;

};

Elkaisar.Item.EquipBox = function (pageOffset = 1) {

    var all_equip = "";
    var FilteredList = [];
    var currentOffset = 0;

    var maxPageCount = Math.ceil(Elkaisar.DPlayer.Equip.filter(It => !It.id_hero).length / 12);

    if (pageOffset > maxPageCount)
        return;
    if (pageOffset < 1)
        return;

    $("#page-nav-holder").html(`${pageOffset}/${maxPageCount}`);
    $("#nav-item-box-right").attr("data-current-offset", pageOffset);
    $("#nav-item-box-left").attr("data-current-offset", pageOffset);
    $("#dialg_box .right-content .total").attr("mat_table", "equip");
    $(".box_content").attr("data-page-for", "equip");

    for (var iii in Elkaisar.DPlayer.Equip) {

        if (Elkaisar.DPlayer.Equip[iii].id_hero)
            continue;
        currentOffset++;

        if (currentOffset > pageOffset * 12)
            break;
        if (currentOffset <= (pageOffset - 1) * 12)
            continue;

        FilteredList.push(Elkaisar.DPlayer.Equip[iii]);
    }

    for (var iii in FilteredList)
        all_equip += `  <li class="matrial_unit" data-id-equip="${FilteredList[iii].id_equip}">
                            <img src=" images/style/Border-up.png" class="border_up"/>
                            <div class="img-inside-box">
                                 <img src="${Equipment.getImage(FilteredList[iii].type, FilteredList[iii].part, FilteredList[iii].lvl)}" class="big-img equip-unit" data-equi-part="${FilteredList[iii].part}" data-equi-type="${FilteredList[iii].type}" data-equi-lvl="${FilteredList[iii].lvl}">
                             </div>
                             <div class="txt-inside-box">
                                 <h2>${Equipment.getName(FilteredList[iii].type, FilteredList[iii].part, FilteredList[iii].lvl)}</h2>
                             </div>
                         </li>`;

    return all_equip;

};


$(document).on("click", "#nav-item-box-right", function () {

    var currentOffset = Number($(this).attr("data-current-offset"));
    var PageFor = $(".box_content").attr("data-page-for");

    if (PageFor === "mall")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1));
    if (PageFor === "box-item") {
        let Cont = Elkaisar.Item.ItemBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1);
        if (Cont == "")
            return;
        return $("#dialg_box .right-content .total").html(Cont);
    }

    if (PageFor === "equip")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.EquipBox(currentOffset + 1));
    if (PageFor === "exchange")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemExchangeBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset + 1));

});


$(document).on("click", "#nav-item-box-left", function () {

    var currentOffset = Number($(this).attr("data-current-offset"));
    var PageFor = $(".box_content").attr("data-page-for");

    if (PageFor === "mall")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemMallBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));
    if (PageFor === "box-item")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));
    if (PageFor === "equip")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.EquipBox(currentOffset - 1));
    if (PageFor === "exchange")
        return $("#dialg_box .right-content .total").html(Elkaisar.Item.ItemExchangeBox($("#dialg_box .right-content .total").attr("mat_table"), currentOffset - 1));

});