


const EnLan = "en";
const ArLang = "ar";
const EsLang = "es";
const PtLang = "pt";
const DeLang = "de";
const CnLang = "zh";
const DefaultLang = EnLan;


var UserLag = {};
UserLag.isDefault = false;



$(document).on("PlayerReady", function () {
  if (Elkaisar.DPlayer.Player.lang) {
    UserLag.language = Elkaisar.DPlayer.Player.lang;
  } else {

    var lang = (navigator.language || navigator.userLanguage).slice(0, 2);

    if (lang === ArLang) {
      UserLag.language = ArLang;
    } else if (lang === EsLang) {
      UserLag.language = EsLang;
    } else if (lang === PtLang) {
      UserLag.language = PtLang;
    } else if (lang === DeLang) {
      UserLag.language = DeLang;
    } else if (lang === CnLang) {
      UserLag.language = CnLang;
    } else {
      UserLag.language = EnLan;
    }

    UserLag.isDefault = true;
  }
  Elkaisar.MenuList.menu();
});


UserLag.LANG_DIC = {
  "ar": /[\u0600-\u06FF]/
};

UserLag.Translte = function (text) {



  return $.ajax({
    url: "https://translation.googleapis.com/language/translate/v2",
    type: 'GET',
    data: {
      q: text,
      target: UserLag.language,
      key: "AIzaSyD8OF2mZYMNT2o4ASG6eRUFZGX_ecQLIZA"
    },
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    }
  });

};

UserLag.TranslateChatMsg = function (msg) {

  if ((/\[\s*\d{1,3}\,\s*\d{1,3}\s*\]/g).test(msg.text))
    return;

  if (UserLag.language === ArLang && (/[\u0600-\u06FF\u0750-\u077F]/g).test(msg.text)) {


  } else {
    UserLag.Translte(msg.text).done(function (data) {
      if (data.data && data.data.translations[0]) {
        $("#mg-id-" + msg.id + " .msg-text").html(Extract.coords(extractEmjoi(extractUrl(data.data.translations[0].translatedText))) + `<i class="translated trans">مترجم</i>`);
        $("#mg-id-" + msg.id + " .msg-text").attr("data-msg-translated", data.data.translations[0].translatedText);

      }
    });
  }



};



$(document).on("click", "#msg-area .msg-body .trans", function () {

  var orgMsg = $(this).parent(".msg-text").attr("data-msg-org");
  $(this).parent(".msg-text").html(orgMsg + `<i class="translated antiTrans">ترجم</i>`);
});

$(document).on("click", "#msg-area .msg-body .antiTrans", function () {

  var orgMsg = $(this).parent(".msg-text").attr("data-msg-translated");
  $(this).parent(".msg-text").html(orgMsg + `<i class="translated trans">مترجم</i>`);
});

