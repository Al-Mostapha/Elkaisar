$(document).on("click", "#change-player-password", function () {

  var msg = ` <div>
                    تاكيد تغير كلمة المرور
                </div>
                <div id="change-pass-input-group">
                    <input class="current-pass" type="password" placeholder="كلمة المرور الحالية"/>
                    <input class="new-pass"     type="password" placeholder="كلمة المرور الجديدة"/>
                    <input class="new-pass-con" type="password" placeholder="تأكيد كلمة المرور الجديدة"/>
                </div>`;

  alert_box.confirmDialog(msg, function () {

    var currentPassword = $("#change-pass-input-group .current-pass").val();
    var newPassword = $("#change-pass-input-group .new-pass").val();
    var conNewPassword = $("#change-pass-input-group .new-pass-con").val();

    if (conNewPassword !== newPassword) {
      alert_box.failMessage("كلمة السر غير متطابقة مع كلمة التاكيد");
      return;
    }

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/HSetting/changePlayerPassword`,
      data: {
        oldPassword: currentPassword,
        newPassword: newPassword,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) { },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var jsonData = JSON.parse(data);
        if (jsonData.state === "ok") {
          Elkaisar.LBase.Error("تم تغير كلمة المرور بنجاح");
          location.reload();
        } else {
          alert_box.failMessage("كلمة المرور غير صحيحة");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  });

});




$(document).on("click", "#OpenSettingsBox", function () {


  var box = ` <div id="over_lay">
                    <div id="select_from">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png" class="banner">
                            <div class="title">اعدادات</div>
                            <img class="close close_use_menu" src="images/btns/close_b.png">
                        </div>
                        <p style="clear: both"></p>
                        <div id="rank-review" class="player-review">
                            <div class="upper">
                                <div class="th ellipsis">${Translate.Title.TH.Language[UserLag.language]}</div>
                                <div>
                                    <ul id="game-lang-list" class="flex">
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_1" class="choose-lang" type="radio" name="choseLang"  ${UserLag.language === ArLang ? 'checked="true"' : ""} value="${ArLang}">
                                                <label for="trigger_1" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/ar.png)"></label>
                                                </div>
                                                <div class="text">
                                                    العربية
                                                </div>
                                            </div>

                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_2" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === EnLan ? 'checked="true"' : ""} value="${EnLan}">
                                                <label for="trigger_2" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/en.png)"></label>
                                                </div>
                                                <div class="text">
                                                    English
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_3" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === EsLang ? 'checked="true"' : ""} value="${EsLang}">
                                                <label for="trigger_3" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/es.png)"></label>
                                                </div>
                                                <div class="text">
                                                    español
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_4" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === PtLang ? 'checked="true"' : ""} value="${PtLang}">
                                                <label for="trigger_4" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/pt.png)"></label>
                                                </div>
                                                <div class="text">
                                                    Português
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_5" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === DeLang ? 'checked="true"' : ""} value="${DeLang}">
                                                <label for="trigger_5" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/de.png)"></label>
                                                </div>
                                                <div class="text">
                                                    Deutsch
                                                </div>
                                            </div>
                                        </li>
                                        <li class="red-btn-wide">
                                            <div class="content-wrapper flex">
                                                <input id="trigger_6" class="choose-lang" type="radio" name="choseLang" ${UserLag.language === CnLang ? 'checked="true"' : ""} value="${CnLang}">
                                                <label for="trigger_6" class="checker"></label>
                                                <div class="flag">
                                                    <label style="background-image: url(images/style/langFlag/cn.png)"></label>
                                                </div>
                                                <div class="text">
                                                    中文(简体)
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="down">
                                <div class="th ellipsis"></div>
                            </div>
                        </div>
                    </div>
                </div>`;

  $("#over_lay").remove();
  $("body").append(box);

});




$(document).on("change", "#game-lang-list .choose-lang", function () {

  var lang = $(this).val();
  var oldLang = UserLag.language;
  UserLag.language = lang;
  alert_box.confirmDialog(Translate.Msg.ConfirmChanegeLanguage[lang], function () {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/HSetting/chanegPlayerLang`,
      data: {
        token: Elkaisar.Config.OuthToken,
        newLang: lang
      },
      type: 'POST',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data)
        location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
    UserLag.language = oldLang;

  });





});



if (UserLag.isDefault) {
  $("#OpenSettingsBox").click();
}