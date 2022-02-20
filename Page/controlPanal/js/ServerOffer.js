
var EXCHANGE_REWORD = null;
var EXCHANGE_REQ = [];
var EXCHANGE_UNIT = {};


ElkaisarCp.ServerOffer = {
    OfferList: {
        Offers: []
    },
    CurrentOffer: {}
};

ElkaisarCp.ServerOffer.showAllMatrial = function () {
    var allList = "";
    for (var iii in ElkaisarCp.Items) {

        allList += `<div class="matrial-unit add-server-offer-item" data-name="${ElkaisarCp.Items[iii].name}" data-type="matrial" data-matrial="${iii}">
                        <img src="../${ElkaisarCp.Items[iii].image}"/>
                        <div class="amount"></div>
                        <div class="name"><span>${ElkaisarCp.Items[iii].name}</span></div>
                    </div>`;

    }

    $("#matrial-list").html(allList);
};

ElkaisarCp.ServerOffer.showEquipForOffer = function () {

    var allList = "";
    for (var iii in ElkaisarCp.Equips) {

        allList += `<div class="matrial-unit add-server-offer-item" data-name="${ElkaisarCp.Equips[iii].name}" data-type="equip" data-equip="${iii}" data-cat="main">
                        <img src="../${ElkaisarCp.Equips[iii].image}"/>
                        <div class="amount"></div>
                        <div class="name"><span>${ElkaisarCp.Equips[iii].name}</span></div>
                    </div>`;

    }

    $("#matrial-list").html(allList);

};


ElkaisarCp.ServerOffer.getServerOffers = function () {

    $.ajax({
        url: `${BASE_URL}/cp/AServerOffer/getServerOffers`,
        type: 'POST',
        data: {},
        success: function (data, textStatus, jqXHR) {

            if (!isJson(data))
                alert(data);

            ElkaisarCp.ServerOffer.OfferList = JSON.parse(data);
            var List = "";
            var Equip = {};
            for (var Index of ElkaisarCp.ServerOffer.OfferList.Offers) {

                Index.offer = JSON.parse(Index.offer);
                List += `<li class="server-unit-offer" data-id-offer="${Index.id_offer}" data-offer-num="${Index.offer_num}" style="display: flex;flex-flow: row;justify-content: space-between; margin-bottom: 10px">
                           <button class="show-server-offer" data-id-offer="${Index.id_offer}"> ${Index.offer_name} (${Index.offer_num})  </buton><button class="remove-offer" data-id-offer="${Index.id_offer}">-</button>
                        </li>`;

            }
            List += `<li class="server-unit-offer" style="display: flex;flex-flow: row;justify-content: space-around;margin-top: 15px;">
                        <button class="add-server-offer" data-id-offer="2"> إضافة عرض (+)  </button>
                    </li>`;

            $("#current-offers ul").html(List);

        }
    });
};

ElkaisarCp.ServerOffer.getOfferDetails = function () {

    $.ajax({
        url: `${BASE_URL}/cp/AServerOffer/getServerOffers`,
        type: 'POST',
        data: {},
        success: function (data, textStatus, jqXHR) {

            if (!isJson(data))
                alert(data);


            ElkaisarCp.ServerOffer.OfferList = JSON.parse(data);
            var List = "";
            var Equip = {};
            for (var Index of ElkaisarCp.ServerOffer.OfferList.Offers) {

                var OneOffer = JSON.parse(Index.offer);
                if (reword.type === "matrial") {

                    List += `<li>
                            <div class="unit-offer remove-item" data-id-offer="${OneOffer}">
                                <img src="../${ElkaisarCp.Items[OneOffer.matrial].image}"/>
                                <label>${ElkaisarCp.Items[OneOffer.matrial].name}</label>
                            </div>
                        </li>`;

                } else if (reword.type === "equip") {

                    Equip = ElkaisarCp.Equips[`${reword.idEquip}`];
                    if (Equip) {
                        List += `<li>
                                    <div class="unit-exchange remove-exchange" data-id-ex="${Index.id_ex}">
                                        <img src="../${Equip.image}"/>
                                        <label>${Equip.name}</label>
                                    </div>
                                </li>`;
                    }

                }
            }



            $("#current-exchange ul").html(List);

        }
    });
};


$(document).on("change", '#select-prize-type', function () {

    var value = $(this).val();

    if (value === "matrial") {

        ElkaisarCp.ServerOffer.showAllMatrial();

    } else if (value === "equip") {

        ElkaisarCp.ServerOffer.showEquipForOffer();

    }

});



$(document).on("click", '.remove-offer', function () {

    var idOffer = $(this).data('id-offer');

    alertBox.confirm("تاكيد ازالة العرض", function () {

        $.ajax({
            url: `${BASE_URL}/cp/AServerOffer/removeOffer`,
            data: {
                idOffer: idOffer
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                ElkaisarCp.ServerOffer.getServerOffers();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});

function reviewServerOffer() {




    var allList = "";
    var Equip = {};
    var OneOffer = {};
    for (var iii in ElkaisarCp.ServerOffer.CurrentOffer.offer) {
        OneOffer = ElkaisarCp.ServerOffer.CurrentOffer.offer[iii];
        if (OneOffer.type === "matrial") {

            allList += `
                            <div class="matrial-unit remove-offer-prize" data-index="${iii}" data-name="${ElkaisarCp.Items[OneOffer.matrial].name}" data-type="matrial" data-matrial="${OneOffer.matrial}">
                                <img src="../${ElkaisarCp.Items[OneOffer.matrial].image}"/>
                                <div class="amount">${OneOffer.amount}</div>
                                <div class="name"><span>${ElkaisarCp.Items[OneOffer.matrial].name}</span></div>
                            </div>
                        `;


        } else if (OneOffer.type === "equip") {

            Equip = ElkaisarCp.Equips[`${OneOffer.idEquip}`];
            allList += `<div class="matrial-unit remove-offer-prize" data-index="${iii}" data-name="${Equip.name}" data-type="equip" data-equip="${OneOffer.idEquip}">
                            <img src="../${Equip.image}"/>
                            <div class="amount">${OneOffer.amount}</div>
                            <div class="name"><span>${Equip.name}</span></div>
                        </div>`;



        }

    }

    if (ElkaisarCp.ServerOffer.CurrentOffer.gold > 0) {
        allList += `<div  class="line-req matrial-unit"> <img src="../images/icons/resource/gold.png" style="width: 30%"/> ${ElkaisarCp.ServerOffer.CurrentOffer.gold}  </div>`;
    }

    $("#Server-offer-detail").html(allList);
}


$(document).on("click", ".remove-offer-prize", function () {

    var Index = $(this).attr("data-index");
    alertBox.confirm(`تأكيد حذف`, function () {
        ElkaisarCp.ServerOffer.CurrentOffer.offer.splice(Index, 1);
        reviewServerOffer();
    });

    reviewServerOffer();
});

$(document).on("focusout", '#offer-gold', function () {

    if (Number($("#offer-gold").val()) > 0) {

        ElkaisarCp.ServerOffer.CurrentOffer.gold = $("#offer-gold").val();
    }
    reviewServerOffer();

});


$(document).on("click", ".add-server-offer-item", function () {

    var name = $(this).data("name");
    var type = $(this).data("type");
    var self = $(this);
    var EquipData = [];

    alertBox.confirm(`تأكيد اضافة (${name})  الى عرض جديد
                        <br> <input id="PrizeAmount" value="1" placeholder="كمية الجوائز">`, function () {

        if (!ElkaisarCp.ServerOffer.CurrentOffer.offer)
            ElkaisarCp.ServerOffer.CurrentOffer.offer = [];

        ElkaisarCp.ServerOffer.CurrentOffer.offer_name = $("#offer-name").val();
        ElkaisarCp.ServerOffer.CurrentOffer.offer_num = $("#offer-num").val();
        ElkaisarCp.ServerOffer.CurrentOffer.price = $("#offer-price").val();
        ElkaisarCp.ServerOffer.CurrentOffer.gold = $("#offer-gold").val();
        var Offer = {};
        Offer.type = type;
        if (type === "matrial") {

            Offer.matrial = self.data("matrial");

        } else if (type === "equip") {

            Offer.idEquip = self.data("equip");
            EquipData = Offer.idEquip.split("_");
            Offer.Equip = EquipData[0];
            Offer.Part = EquipData[1];
            Offer.lvl = EquipData[2];

        }
        Offer.amount = $("#PrizeAmount").val();

        ElkaisarCp.ServerOffer.CurrentOffer.offer.push(Offer);
        reviewServerOffer();
    });

});



$(document).on("click", ".show-server-offer", function () {

    var idOffer = $(this).attr("data-id-offer");
    for (var iii in ElkaisarCp.ServerOffer.OfferList.Offers) {
        if (ElkaisarCp.ServerOffer.OfferList.Offers[iii].id_offer == idOffer) {
            ElkaisarCp.ServerOffer.CurrentOffer = ElkaisarCp.ServerOffer.OfferList.Offers[iii];
        }

    }

    $("#offer-num").val(ElkaisarCp.ServerOffer.CurrentOffer.offer_num);
    $("#offer-name").val(ElkaisarCp.ServerOffer.CurrentOffer.offer_name);
    $("#offer-price").val(ElkaisarCp.ServerOffer.CurrentOffer.price);
    $("#offer-gold").val(ElkaisarCp.ServerOffer.CurrentOffer.gold);
    $("#offer-server-max").val(ElkaisarCp.ServerOffer.CurrentOffer.server_max);
    $("#offer-player-max").val(ElkaisarCp.ServerOffer.CurrentOffer.player_max);
    $("#offer-avail").prop('checked', false);

    if (ElkaisarCp.ServerOffer.CurrentOffer.avail > 0) {
        $("#offer-avail").prop('checked', true);
    } else {
        $("#offer-avail").prop('checked', false);
    }
    reviewServerOffer();
    $("#ADD_SERVER_OFFER button").html("تعديل العرض");
});


$(document).on("click", ".add-server-offer", function () {


    ElkaisarCp.ServerOffer.CurrentOffer = {};
    reviewServerOffer();
    $("#offer-num").val("");
    $("#offer-name").val("");
    $("#offer-price").val("");
    $("#offer-gold").val("");
    $("#offer-server-max").val("");
    $("#offer-player-max").val("");

    $("#ADD_SERVER_OFFER button").html("إضافة العرض");
});



/*      ADD  UNIT EXCHNAGE*/


$(document).on("click", "#ADD_SERVER_OFFER button", function () {

    reviewServerOffer();

    if (ElkaisarCp.ServerOffer.CurrentOffer == {}) {
        alertBox.confirm("اختار العرض اولا ");
        return;
    }

    if (parseInt(ElkaisarCp.ServerOffer.CurrentOffer.id_offer) > 0) {

        alertBox.confirm("تاكيد تعديل العرض", function () {


            $.ajax({
                url: `${BASE_URL}/cp/AServerOffer/updateOffer`,
                data: {
                    idOffer: ElkaisarCp.ServerOffer.CurrentOffer.id_offer,
                    OfferPrice: $("#offer-price").val(),
                    OfferName: $("#offer-name").val(),
                    OfferNum: $("#offer-num").val(),
                    Offer: JSON.stringify(ElkaisarCp.ServerOffer.CurrentOffer.offer),
                    OfferGold: $("#offer-gold").val(),
                    OfferServerMax: $("#offer-server-max").val(),
                    OfferPlayerMax: $("#offer-player-max").val(),
                    OfferAvail: $("#offer-avail").is(":checked") ? 1 : 0
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    $("#ADD_SERVER_OFFER button").attr("disabled", "disabled");
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $("#ADD_SERVER_OFFER button").removeAttr("disabled");
                    ElkaisarCp.ServerOffer.getServerOffers();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });

        });

    } else {

        alertBox.confirm("تاكيد اضافة العرض", function () {

            $.ajax({
                url: `${BASE_URL}/cp/AServerOffer/addOffer`,
                data: {
                    OfferPrice: $("#offer-price").val(),
                    OfferName: $("#offer-name").val(),
                    OfferNum: $("#offer-num").val(),
                    Offer: JSON.stringify(ElkaisarCp.ServerOffer.CurrentOffer.offer),
                    OfferGold: $("#offer-gold").val(),
                    OfferServerMax: $("#offer-server-max").val(),
                    OfferPlayerMax: $("#offer-player-max").val(),
                    OfferAvail: $("#offer-avail").is(":checked") ? 1 : 0
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    $("#ADD_SERVER_OFFER button").attr("disabled", "disabled");
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $("#ADD_SERVER_OFFER button").removeAttr("disabled");
                    ElkaisarCp.ServerOffer.getServerOffers();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });

        });

    }



});



$(document).on("click", "#SEND_SERVER_OFFER button", function () {

    if (!ElkaisarCp.ServerOffer.CurrentOffer.id_offer)
        alertBox.confirm("إختر العرض أولا");

    alertBox.confirm(`إرسال العرض لللاعب
                <br> <input placeholder="إدخل رقم اللاعب" id="idPlayerInput"/> `, function () {

        $.ajax({

            url: `http://${WS_HOST}:${WS_PORT}/cp/CPSendPrize/sendPlayerOffer`,
            data: {
                idPlayer: $("#idPlayerInput").val(),
                idOffer : ElkaisarCp.ServerOffer.CurrentOffer.id_offer
            },
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
               if(!isJson(data))
                    alert(data);
                let Json = JSON.parse(data);
                
                if(Json.state == "ok")
                    alert("تم إرسال العرض");
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });

    });

});




ElkaisarCp.getItem().done(function () {
    ElkaisarCp.getEquip().done(function () {
        ElkaisarCp.ServerOffer.getServerOffers();
        if ($("#select-prize-type").val() == "equip") {
            ElkaisarCp.ServerOffer.showEquipForOffer();
        } else {
            ElkaisarCp.ServerOffer.showAllMatrial();
        }
    });
});



