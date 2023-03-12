Elkaisar.Ui.Select.menuList = function (list, selectedIndex) {

    var optionList = "";

    for (var iii in list) {
        if (Number(iii) === Number(selectedIndex)) {
            optionList += `<li class="unit-option selected-op" data-title="${list[iii].title}" data-value="${list[iii].value}">${list[iii].title}</li>`;
        } else {
            optionList += `<li class="unit-option" data-title="${list[iii].title}" data-value="${list[iii].value}" data-index="${iii}">${list[iii].title}</li>`;
        }
    }

    return `<ul style="display : none">${optionList}</ul>`;
};


Elkaisar.Ui.Select.make = function (list, selectedIndex, Style) {

    if (typeof selectedIndex != "number")
        selectedIndex = 0;
    var Height = 266;
    var Width   = 160;
    if(typeof Style == "object"){
        Height = Style.height || 266;
        Width  = Style.width  || 160;
    }
        


    return `
            <div class="select-list" data-value="${list[selectedIndex].value}" data-active="false" data-height="${Height}" data-width="${Width}">
                <div class="select select-input">
                    <div class="value">${list[selectedIndex].title}</div>
                </div>
                <div class="option" style="width: ${Width}px;" >${this.menuList(list, selectedIndex)}</div>
            </div>`;

};


$(document).on("click", ".select-list .unit-option", function () {

    var title = $(this).attr("data-title");
    var value = $(this).attr("data-value");
    $(this).parents(".select-list").children('.option').children("ul").children().removeClass("selected-op");
    $(this).addClass("selected-op");
    $(this).parents(".select-list").attr("data-value", value);
    $(this).parents(".select-list").children('.select-input').children('.value').html(title);
    //$(".select-list .value").html(title);


});

$(document)['on']('click', '.uiCheckedBox', function () {
    $(this)['removeClass']('uiCheckedBox'), $(this)['addClass']('uiUnCheckBox');
});
$(document)['on']('click', '.uiUnCheckBox', function () {
    $(this)['addClass']('uiCheckedBox'), $(this)['removeClass']('uiUnCheckBox');
});
$(document)['on']('click', '.uiCheckedRadio', function () {
    $(this)['removeClass']('uiCheckedRadio'), $(this)['addClass']('uiUnCheckedRadio');
});
$(document)['on']('click', '.uiUnCheckedRadio', function () {
    $(this)['addClass']('uiCheckedRadio'), $(this)['removeClass']('uiUnCheckedRadio');
});