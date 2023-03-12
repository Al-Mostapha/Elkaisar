var WorldCurrentUnit = {};


Elkaisar.World.unitWidth = 128;
Elkaisar.World.unitHeight = 128;

MAX_SCREEN_WIDTH = $(document).width();
MAX_SCREEN_HEIGHT = $(document).height();




const TILE_SIZE = 128;








//Crafty.WORLD_MOVES = 0;



function loading(percent)
{

    $("#load-percent").html(Math.floor(percent) + "%");
    $("#load-bar div").css({width: percent + "%"});

}













Elkaisar.World.navigateTo = function (x, y) {
    $("#x_coord-input input").val(x);
    $("#y_coord-input input").val(y);
    $("#nav-btn button").trigger("click");
    
    
};




Elkaisar.World.getRectView = function () {
    var camView = Elkaisar.GE.WorldScene.cameras.main.worldView;
    return  new Phaser.Geom.Rectangle(camView.x - 600, camView.y - 300, camView.width + 1200, camView.height + 600);
};


/*____________________________________________________________________________*/
/*__________________________NAVIGET IN WORLD MAP______________________________*/







$(document).on("mousemove", "#smallMap .overMap", function (evt) {

    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);

    CURRENT_CURSOR_COORDS.css({left: x + 25, top: y + 25});
    CURRENT_CURSOR_COORDS.html(`[${x} , ${y}]`);


});
$(document).on("mouseout", "#smallMap .overMap", function () {
    CURRENT_CURSOR_COORDS.html("");

});

$(document).on("click", "#smallMap .overMap", function (evt) {

    var x = Math.floor(evt.pageX - $(this).offset().left);
    var y = Math.floor(evt.pageY - $(this).offset().top);

    $("#x_coord-input input").val(x);
    $("#y_coord-input input").val(y);


    $("#nav-btn button").trigger("click");

});







/*+___________________________________________________________________________*/
/*___________________________________CHAT BOX_________________________________*/

/*$(document).on("keydown", "#input-chat input", function (e){
 if(e.keyCode ===13 && !e.shiftKey){
 var msg = `<div class="msg-unit">
 <div class="msg-from">
 [Mustapha]:
 </div>
 <div class="msg-body">
 <P>
 ${$("#input-chat input").val()}
 </P>
 </div>
 </div>`;
 $("#msg-area").append(msg);
 $("#input-chat input").val("");
 setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
 }
 });
 */