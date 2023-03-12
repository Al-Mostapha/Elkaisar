Elkaisar.WsLib.Mail = {};


Elkaisar.WsLib.Mail.sentTo = function (data){
    Elkaisar.DPlayer.Notif.msg_in = Number(Elkaisar.DPlayer.Notif.msg_in) + 1;
    Fixed.refreshPlayerNotif();
};

Elkaisar.WsLib.Mail.someOneSpy = function (data){
    Elkaisar.DPlayer.Notif.spy_report = Number(Elkaisar.DPlayer.Notif.spy_report) +  1;
    Fixed.refreshPlayerNotif();
    city_profile.afterBattelFinish();
};