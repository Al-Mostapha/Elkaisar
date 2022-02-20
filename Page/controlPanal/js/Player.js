


$(document).on("click", ".change-player-name", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير اسم للاعب", function () {

        var newName = $("#alert-input").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerName",
            data: {
                idPlayer: idPlayer,
                newName: newName
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل الاسم  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});



$(document).on("click", ".change-player-group", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير صلاحيات للاعب", function () {

        var newGroup = $("#select-new-player-group").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerGroup",
            data: {
                idPlayer: idPlayer,
                newGroup: newGroup
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل صلاحيات  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

    var list = "";
    for (var one in PLAYER_GROUP)
    {
        list += `<option value="${one}">${PLAYER_GROUP[one]}</option>`;

    }

    $("#alert-input").replaceWith(`
            <select id="select-new-player-group">${list}</select>
`);



});


$(document).on("click", ".change-player-prestige", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير برستيج للاعب", function () {

        var newVal = $("#alert-input").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerPrestige",
            data: {
                idPlayer: idPlayer,
                newVal: newVal
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل البرستيج  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});

$(document).on("click", ".change-player-honor", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير شرف للاعب", function () {

        var newVal = $("#alert-input").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerHonor",
            data: {
                idPlayer: idPlayer,
                newVal: newVal
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل الشرف  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});


$(document).on("click", ".change-player-porm", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير ترقية للاعب", function () {

        var newVal = $("#select-new-player-porm").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerPorm",
            data: {
                idPlayer: idPlayer,
                newVal: newVal
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل ترقية  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

    var list = "";
    for (var one in pormotion)
    {
        list += `<option value="${one}">${pormotion[one].ar_title}</option>`;

    }

    $("#alert-input").replaceWith(`
            <select id="select-new-player-porm">${list}</select>
`);



});


$(document).on("click", ".change-player-gold", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد تغير ذهب للاعب", function () {

        var newVal = $("#alert-input").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/changePlayerGold",
            data: {
                idPlayer: idPlayer,
                newVal: newVal
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم تعديل الذهب  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});

$(document).on("click", ".pannPlayer", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog("تاكيد حظر للاعب", function () {

        var newVal = $("#alert-input").val();

        $.ajax({
            url: BASE_URL + "/cp/APlayer/pannPlayer",
            data: {
                idPlayer: idPlayer,
                newVal: newVal
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم الحظر  بنجاح");

                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});



$(document).on("click", "#searchByPlayerName", function () {

    var name = $("#UserSearchInput").val();

    $.ajax({
        url: BASE_URL + "/cp/APlayer/searchByName",
        data: {
            seg: name
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {


            if (!isJson(data))
                alert(data);

            var jsonData = JSON.parse(data);

            var userTable = `<tr>
                                    <th class="first" width="177"> الاعضاء</th>
                                    <th> صلاحية</th>
                                    <th>برستيج</th>
                                    <th>شرف</th>
                                    <th>ترقية</th>
                                    <th>ذهب</th>
                                    <th>حظر</th>
                                    <th>حذف</th>
                                    <th class="last">نقل</th>
                                </tr>`;

            for (var ii in jsonData) {

                userTable += `  <tr data-id-player="${jsonData[ii].id_player}">
                                            <td class="first change-player-name" data-id-player="${jsonData[ii].id_player}">- ${jsonData[ii].name}</td>
                                            <td class="change-player-group"      data-id-player="${jsonData[ii].id_player}"> ${PLAYER_GROUP[jsonData[ii].user_group]}(${jsonData[ii].user_group})</td>
                                            <td class="change-player-prestige"   data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].prestige} </td>
                                            <td class="change-player-honor"      data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].honor}    </td>
                                            <td class="change-player-porm"       data-id-player="${jsonData[ii].id_player}">  ${pormotion[Math.min(Math.max(jsonData[ii].porm, 0), 29)].ar_title} (${jsonData[ii].porm})</td>
                                            <td class="change-player-gold"       data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].gold} </td>
                                            <td class="pannPlayer"               data-id-player="${jsonData[ii].id_player}">   ${(new Date(jsonData[ii].panned * 1000))}</td>
                                            <td class="deletePlayer"             data-id-player="${jsonData[ii].id_player}"  data-player-name="${jsonData[ii].name}" >   <img src="../img/hr.gif" width="16" height="16" alt="" /></td>
                                            <td class="examinPlayer"             data-id-player="${jsonData[ii].id_player}"  data-player-name="${jsonData[ii].name}" >   <img src="../img/hr.gif" width="16" height="16" alt="" /></td>
                                            <td class="transPlayer"              data-id-player="${jsonData[ii].id_player}">   <img src="../img/save-icon.gif" width="16" height="16" alt="" /></td>
                                        </tr>`;

            }

            $("#user-table").html(userTable);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


});


$(document).on("click", "#searchByPlayerGuild", function () {

    var name = $("#UserSearchInput").val();

    $.ajax({
        url: BASE_URL + "/cp/APlayer/searchByGuild",
        data: {
            seg: name
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {


            if (!isJson(data))
                alert(data);

            var jsonData = JSON.parse(data);

            var userTable = `<tr>
                                    <th class="first" width="177"> الاعضاء</th>
                                    <th> صلاحية</th>
                                    <th>برستيج</th>
                                    <th>شرف</th>
                                    <th>ترقية</th>
                                    <th>حظر</th>
                                    <th>حذف</th>
                                    <th class="last">نقل</th>
                                </tr>`;

            for (var ii in jsonData) {

                userTable += `  <tr data-id-player="${jsonData[ii].id_player}">
                                            <td class="first change-player-name" data-id-player="${jsonData[ii].id_player}">- ${jsonData[ii].name}</td>
                                            <td class="change-player-group"      data-id-player="${jsonData[ii].id_player}"> ${PLAYER_GROUP[jsonData[ii].user_group]}(${jsonData[ii].user_group})</td>
                                            <td class="change-player-prestige"   data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].prestige} </td>
                                            <td class="change-player-honor"      data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].honor}    </td>
                                            <td class="change-player-porm"       data-id-player="${jsonData[ii].id_player}">  ${pormotion[Math.min(Math.max(jsonData[ii].porm, 0), 29)].ar_title} (${jsonData[ii].porm})</td>
                                            <td class="change-player-gold"       data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].gold} </td>
                                            <td class="pannPlayer"               data-id-player="${jsonData[ii].id_player}">   ${(new Date(jsonData[ii].panned * 1000))}</td>
                                            <td class="deletePlayer"             data-id-player="${jsonData[ii].id_player}"  data-player-name="${jsonData[ii].name}">   <img src="../img/hr.gif" width="16" height="16" alt="" /></td>
                                            <td class="examinPlayer"             data-id-player="${jsonData[ii].id_player}"  data-player-name="${jsonData[ii].name}">   <img src="../img/hr.gif" width="16" height="16" alt="" /></td>
                                            <td class="transPlayer"              data-id-player="${jsonData[ii].id_player}">   <img src="../img/save-icon.gif" width="16" height="16" alt="" /></td>
                                        </tr>`;

            }

            $("#user-table").html(userTable);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


});

$(document).on("click", "#searchByPlayerAdmin", function () {

    var name = $("#UserSearchInput").val();

    $.ajax({
        url: BASE_URL + "/cp/APlayer/searchForAdmin",
        data: {
            seg: name
        },
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {


            if (!isJson(data))
                alert(data);

            var jsonData = JSON.parse(data);

            var userTable = `<tr>
                                    <th class="first" width="177"> الاعضاء</th>
                                    <th> صلاحية</th>
                                    <th>برستيج</th>
                                    <th>شرف</th>
                                    <th>ترقية</th>
                                    <th>ذهب</th>
                                    <th>حظر</th>
                                    <th>حذف</th>
                                    <th class="last">نقل</th>
                                </tr>`;

            for (var ii in jsonData) {

                userTable += `  <tr data-id-player="${jsonData[ii].id_player}">
                                            <td class="first change-player-name" data-id-player="${jsonData[ii].id_player}">- ${jsonData[ii].name}</td>
                                            <td class="change-player-group"      data-id-player="${jsonData[ii].id_player}"> ${PLAYER_GROUP[jsonData[ii].user_group]}(${jsonData[ii].user_group})</td>
                                            <td class="change-player-prestige"   data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].prestige} </td>
                                            <td class="change-player-honor"      data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].honor}    </td>
                                            <td class="change-player-porm"       data-id-player="${jsonData[ii].id_player}">  ${pormotion[Math.min(Math.max(jsonData[ii].porm, 0), 29)].ar_title} (${jsonData[ii].porm})</td>
                                            <td class="change-player-gold"  data-player-name="${jsonData[ii].name}"       data-id-player="${jsonData[ii].id_player}">  ${jsonData[ii].gold} </td>
                                            <td class="pannPlayer"  data-id-player="${jsonData[ii].id_player}">   ${(new Date(jsonData[ii].panned * 1000))}</td>
                                        </tr>`;

            }

            $("#user-table").html(userTable);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


});




$(document).on("click", ".deletePlayer", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmDialog(`تأكيد حذف اللاعب ${$(this).attr("data-player-name")} من السيرفر يالكامل!!`, function () {

        $.ajax({
            url: BASE_URL + "/cp/ATransferPlayer/deletePlayer",
            data: {
                idPlayer: idPlayer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    $(".close-alert").click();
                    alert("تم  حذف اللاعب  بنجاح");

                } else if (jsonData.state === "error_0") {
                    alert("عليك تسجيل الدخول");
                } else if (jsonData.state === "error_1") {
                    alert("لست عضوا بالادارة");
                } else if (jsonData.state === "error_2") {
                    alert("هذا اللاعب مدير لحلف عليه اولا ترك الحلف");
                } else if (jsonData.state === "error_3") {
                    alert("هذا اللاعب غير موجود بالسيرفر");
                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});


$(document).on("click", ".restore-player", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmDialog(`تأكيد استعادة اللاعب ${$(this).attr("data-player-name")} !!`, function () {

        $.ajax({
            url: BASE_URL + "/cp/ATransferPlayer/restorPlayer",
            data: {
                idPlayer: idPlayer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    alert("تم استعادة اللاعب بنجاح");

                } else if (jsonData.state === "error_0") {
                    alert("عليك تسجيل الدخول");
                } else if (jsonData.state === "error_1") {
                    alert("لست عضوا بالادارة");
                } else if (jsonData.state === "error_2") {
                    alert("هذا اللاعب غير موجود بالسيرفر");
                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });

});



$(document).on("click", ".transPlayer", function () {

    var idPlayer = $(this).attr("data-id-player");

    alertBox.confirmInputDialog(`تأكيد نقل اللاعب ${$(this).attr("data-player-name")} !!`, function () {

        var serverTo = $("#select-server-to-travel").val();

        $.ajax({
            url: BASE_URL + "/cp/ATransferPlayer/startTrans",
            data: {
                idPlayer: idPlayer,
                idServerFrom: SERVER_ID,
                idServerTo: serverTo
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {


                if (!isJson(data))
                    alert(data);

                var jsonData = JSON.parse(data);

                if (jsonData.state === "ok") {

                    alert("تم نقل اللاعب بنجاح");

                } else if (jsonData.state === "error_0") {
                    alert("عليك تسجيل الدخول");
                } else if (jsonData.state === "error_1") {
                    alert("لست عضوا بالادارة");
                } else if (jsonData.state === "error_2") {
                    alert("هذا اللاعب غير موجود بالسيرفر");
                } else if (jsonData.state === "error_3") {
                    alert("هذا اللاعب مدير لحلف عليه اولا ترك الحلف");
                } else {

                    alert("لست عضو فى الادارة" + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });




    });



    var list = "";
    for (var one in SERVER_LIST)
    {
        list += `<option value="${one}">${SERVER_LIST[one]}</option>`;

    }

    $("#alert-input").replaceWith(`<select id="select-server-to-travel">${list}</select>`);

});



$(document).on("click", ".changePlayerTitle", function () {

    var idPlayer = $(this).attr("data-id-player");
    $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/cp/CPPlayer/getPlayerTitle`,
        data: {
            idPlayer: idPlayer
        },
        success: function (data, textStatus, jqXHR) {

            if (!isJson(data))
                return alert(data);
            let PlayerTitle = JSON.parse(data)[0];
            alertBox.confirm(
                    `تغير لقب اللاعب <br>
                    <input id="player-title-1" placeholder="اللقب 1" value="${PlayerTitle.title_1 ? PlayerTitle.title_1 : ""}"/>
                    <input id="player-title-2" placeholder="اللقب 2" value="${PlayerTitle.title_2 ? PlayerTitle.title_2 : ""}"/>
                    <input id="player-title-3" placeholder="اللقب 3" value="${PlayerTitle.title_3 ? PlayerTitle.title_3 : ""}"/>
                    <input id="player-title-4" placeholder="اللقب 4" value="${PlayerTitle.title_4 ? PlayerTitle.title_4 : ""}"/>
                    <input id="player-title-5" placeholder="اللقب 5" value="${PlayerTitle.title_5 ? PlayerTitle.title_5 : ""}"/>
                    <input id="player-title-6" placeholder="اللقب 6" value="${PlayerTitle.title_6 ? PlayerTitle.title_6 : ""}"/>
                    <input id="player-title-7" placeholder="اللقب 7" value="${PlayerTitle.title_7 ? PlayerTitle.title_7 : ""}"/>
                    <input id="player-title-8" placeholder="اللقب 8" value="${PlayerTitle.title_8 ? PlayerTitle.title_8 : ""}"/>
                    <input id="player-title-9" placeholder="اللقب 9" value="${PlayerTitle.title_9 ? PlayerTitle.title_9 : ""}"/>
                    <input id="player-title-10" placeholder="اللقب 10" value="${PlayerTitle.title_10 ? PlayerTitle.title_10 : ""}"/>
                        `, function () {
                        $.ajax({
                            url: `http://${WS_HOST}:${WS_PORT}/cp/CPPlayer/changePlayerTitles`,
                            data: {
                                idPlayer: idPlayer,
                                Title_1 : $("#player-title-1").val(),
                                Title_2 : $("#player-title-2").val(),
                                Title_3 : $("#player-title-3").val(),
                                Title_4 : $("#player-title-4").val(),
                                Title_5 : $("#player-title-5").val(),
                                Title_6 : $("#player-title-6").val(),
                                Title_7 : $("#player-title-7").val(),
                                Title_8 : $("#player-title-8").val(),
                                Title_9 : $("#player-title-9").val(),
                                Title_10: $("#player-title-10").val()
                            },
                            success: function (data, textStatus, jqXHR) {
                                
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                
                                
                            }
                        });
                    });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


});
