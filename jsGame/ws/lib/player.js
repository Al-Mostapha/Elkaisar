Elkaisar.WsLib.Player = {};

Elkaisar.WsLib.Player.someOneOppend = function (){
    
    alert_box.confirmMessage("هذا الحساب مفتوح فى  مكان اخر");
    $(".close-alert").remove();
    $(".confim-btn").off("click");
    $(".confim-btn").click(function (){
        window.location.href = "http://www.elkaisar.com";
        window.location.replace("http://www.elkaisar.com");
    });
    
};