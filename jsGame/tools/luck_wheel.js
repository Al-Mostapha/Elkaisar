var MATIAL_FOR_LUCK_WHEEL = [];

var LuckWheel = {};

for(var iii = 0; iii <  20; iii ++)
{
    MATIAL_FOR_LUCK_WHEEL.push({
        Prize: "motiv_60",
        amount: 0
    });
}

LuckWheel.holes = function () {

    return `<ul>
                <li class="cell corner" style="left: 50%; margin-top: 13px; margin-left: -32px;
                    background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[0]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[0]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[0]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 313px; top: 30.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[1]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[1]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[1]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 375px; top: 62.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[2]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[2]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[2]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 425px; top: 112.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[3]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[3]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[3]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 32px; top: 175.8px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[4]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[4]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[4]["amount"]}</h1>
                </li>
                <li class="cell corner" style="right: 13px; top: 237.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[5]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[5]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[5]["amount"]}</h1>
                </li>
                <li class="cell" style="right:32px; top: 312px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[6]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[6]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[6]["amount"]}</h1>
                </li>
                <li class="cell" style="left:425px; top: 375.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[7]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[7]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[7]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 375.5px; top: 425px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[8]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[8]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[8]["amount"]}</h1>
                </li>
                <li class="cell" style="left: 313.5px; top: 457.2px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[9]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[9]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[9]["amount"]}</h1>
                </li>
                <li class="cell corner" style="left: 50%;bottom: 13.5px; margin-left: -32px ;background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[10]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[10]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[10]["amount"]}</h1>
                </li>

                <li class="cell" style="right: 313.5px; top: 457.2px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[11]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[11]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[11]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 375.5px; top: 425px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[12]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[12]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[12]["amount"]}</h1>
                </li>
                <li class="cell" style="right:425px; top: 375.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[13]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[13]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[13]["amount"]}</h1>
                </li>
                <li class="cell" style="left:32px; top: 312px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[14]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[14]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[14]["amount"]}</h1>
                </li>
                <li class="cell corner" style="left: 13px; top: 237.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[15]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[15]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[15]["amount"]}</h1>
                </li>


                <li class="cell" style="left: 31.5px; top: 175.7px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[16]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[16]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[16]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 425.5px; top: 112.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[17]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[17]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[17]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 375px; top: 62.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[18]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[18]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[18]["amount"]}</h1>
                </li>
                <li class="cell" style="right: 313.5px; top: 30.5px; background-image: url(${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[19]["Prize"]].image})"
                    data-matrial-name="${MATIAL_FOR_LUCK_WHEEL[19]["Prize"]}">
                    <div class="left-gate pull-L"></div>
                    <div class="right-gate pull-R"></div>
                    <div class="pulse"></div>
                    <h1>${MATIAL_FOR_LUCK_WHEEL[19]["amount"]}</h1>
                </li>



            </ul>`;

};


LuckWheel.show = function () {



    var content = `  <div id="luck-wheel-over-lay">
                        <div id="luck-wheel" data-gate-open="false">
                            <div class="holes">
                                ${this.holes()}
                            </div>
                            <div class="control">
                                <button id="hide-luck-wheel"></button>
                                <div class="title font-2">
                                       خطبة تحفيزية 
                                </div>
                                <h1 id="playeLuckTitle"> دولاب الحظ:${Matrial.getPlayerAmount("luck_play")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; كمية الذهب: ${Elkaisar.DPlayer.Player.gold}</h1>

                                <div class="image-frame">
                                    <img src="images/items/item001.jpg"/>
                                </div>
                                <div class="input-number">
                                    <input class="only_num input"  type="text" max="${Matrial.getPlayerAmount("luck_play") + Math.floor(Elkaisar.DPlayer.Player.gold / 5)}" step="1" min="0" value="1"/>
                                </div>
                                <div id="start-wheel">
                                    <button class="font-2">
                                        بدء 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;

    $("body").append(content);
    $("#luck-wheel").animate({top: "80px"}, 150, "linear", function () {
        $(this).animate({top: "100px"}, 100, "linear");
    });
};


/*
 * 
 * hide luck wheel
 * 
 */
LuckWheel.hide = function () {

    $("#luck-wheel").animate({top: "70px"}, 200, "linear", function () {
        $(this).animate({top: "60%"}, 180, "linear", function () {
            $("#luck-wheel-btn").animate({bottom: "213px"}, 180, "linear");
            $(this).animate({top: "100%"}, 100, "linear", function () {
                $("#luck-wheel-over-lay").remove();
            });
        });
    });

};


/*
 * 
 *LucLuckWheel open gates 
 * 
 */
LuckWheel.openGates = function (call_back) {

    $('#luck-wheel').attr("data-gate-open", "true");

    $('#luck-wheel .cell .left-gate').animate({
        'background-position-x': '-32px'
    }, 500, 'linear');

    $.when.apply($, [$('#luck-wheel .cell .right-gate').animate({
            'background-position-x': '32px'
        }, 500, 'linear')]).then(function () {
        // all complete
        $('#luck-wheel ul li h1').show();
        call_back();
    });

};

/*
 * 
 *LucLuckWheel open gates 
 * 
 */
LuckWheel.closeGates = function () {

    $('#luck-wheel').attr("data-gate-open", "false");
    $('#luck-wheel .cell .left-gate').animate({
        'background-position-x': '0px'
    }, 500, 'linear');
    $('#luck-wheel .cell .right-gate').animate({
        'background-position-x': '0px'
    }, 500, 'linear', function () {
        $('#luck-wheel ul li h1').hide();
    });


};

$(document).on("click", "#hide-luck-wheel", function () {

    LuckWheel.hide();

});


$("#luck-wheel-btn").click(function () {
    $(this).animate({bottom: '180px'}, 250, 'linear', function () {
        LuckWheel.show();
    });

});


LuckWheel.playLuck = function () {

    return $.ajax({
        url:`${Elkaisar.Config.NodeUrl}/api/APlayer/playLuckWheel`,
        type: 'POST',
        data: {
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

};

LuckWheel.spinWheel = function () {

    LuckWheel.playLuck().done(function (data) {
        
        if(isJson(data)){
            var jsonData =  JSON.parse(data);
        }else{
            Elkaisar.LBase.Error(data);
            return ;
        }
        
        
        MATIAL_FOR_LUCK_WHEEL = jsonData.Prize;
        $("#luck-wheel .holes").html(LuckWheel.holes());
        LuckWheel.openGates(function () {
            
            var all_pulses = $("#luck-wheel ul li .pulse");
            var cell = jsonData.winIndex;
            var element_to = $("#luck-wheel .control .image-frame img");
            var title_to = $("#luck-wheel .control .title");
            
            Matrial.takeFrom("luck_play", 1);
            Matrial.givePlayer(MATIAL_FOR_LUCK_WHEEL[jsonData.winIndex].Prize, MATIAL_FOR_LUCK_WHEEL[jsonData.winIndex].amount);
            $("#playeLuckTitle").replaceWith(`<h1 id="playeLuckTitle"> دولاب الحظ:${Matrial.getPlayerAmount("luck_play")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; كمية الذهب: ${Elkaisar.DPlayer.Player.gold}</h1>`)

            for (var iii = 0; iii <= 20 + cell; iii++) {

                LuckWheel.sequanceTimer(iii, all_pulses[iii % 20], 20 + cell, element_to, title_to);

            }

        });


    });


};

$(document).on("click", "#start-wheel", function () {


    if (Number(Matrial.getPlayerAmount("luck_play")) < 1) {

        alert_box.confirmDialog("لا يوجد لديك  عدد كافى من دولاب الحظ يمكنك شراء دولاب الحظ من مول المواد", function () {

            $('#hide-luck-wheel').click();
            setTimeout(function () {
                $(".menu-list[data-show='matrial']").click();
                $("#dialg_box .left-nav li[head_title='mall-box']").click();
            }, 500);

        });
        return;

    }



    $(this).prop("disabled", true);


    if ($("#luck-wheel").attr("data-gate-open") === "false") {

        LuckWheel.spinWheel();

    } else if ($("#luck-wheel").attr("data-gate-open") === "true") {

        $(".pulse").css({"-webkit-animation": "", animation: "", opacity: 0});
        LuckWheel.closeGates();
        LuckWheel.spinWheel();
       

    }



});

LuckWheel.sequanceTimer = function (index, element, last, element_to, title_to) {

    setTimeout(function () {
        if (index === last) {
            $(element).css({"-webkit-animation": "pulse 1s infinite linear",
                animation: "pulse 1s infinite linear", opacity: 1});

            var message = `لقد تحصلت على ${MATIAL_FOR_LUCK_WHEEL[last - 20].amount} &times; ${Elkaisar.BaseData.Items[MATIAL_FOR_LUCK_WHEEL[last - 20].Prize].name} من دولاب الحظ`;
            alert_box.systemChatMessage(message);
            /*  u  disable the button*/
            $("#start-wheel").prop("disabled", false);

        } else {
            $(element).css({opacity: 1}).animate({opacity: 0}, 1500, "linear");
        }


        var bg = $(element).parent("li").css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
        $(element_to).attr("src", bg);
        $(title_to).html(Elkaisar.BaseData.Items[$(element).parent("li").attr("data-matrial-name")].name);

    }, ((300 - Math.floor(200 * Math.exp(-(Math.pow((index - 20) / 20, 2))))) * index));

};