Elkaisar.WsLib.Chat = {};

Elkaisar.WsLib.Chat.scrollChat = function (){
    if($("#msg-area").getNiceScroll(0).page.maxh - $("#msg-area").getNiceScroll(0).getScrollTop() < 15 ){
        setTimeout(function (){$("#msg-area").getNiceScroll(0).doScrollTop($("#msg-area").getNiceScroll(0).getContentSize().h , 0);} , 100);
    }
};


Elkaisar.WsLib.Chat.WorldMsg = function (data){
    Chat.worldMessage(data);
    this.scrollChat();
};

Elkaisar.WsLib.Chat.GuildMsg = function (data){
    Chat.guildMessage(data);
    this.scrollChat();
};


Elkaisar.WsLib.Chat.deleteMsg = function (data){
    $(`#msg-area .msg-unit[data-id-msg=${data.idMsg}]`).animate({opacity:0} , 800,function (){
        var msg = `قام ${data.DeletedBy}  بحذف رسالة اللاعب ${data.DeletedFor}`;
       $(this).html(`<div class='d-msg-replacement font-2'>${msg}</div>`) ;
       $(this).css({opacity: 1});
    });
    this.scrollChat();
};

Elkaisar.WsLib.Chat.banPlayer = function (data){
    var msg = `<div class="msg-unit panne-msg font-2">قام ${data.p_name_panner} بحظر اللاعب ${data.p_name_panned} لمدة ${changeTimeFormat(data.duration)}</div>`;
    if(Number(data.idPlayerToPan) === Number(Elkaisar.DPlayer.Player.id_player)){
        alert_box.confirmMessage("  لقد قام المراقب بحظرك من الشات  <br/>\n\
                                 اذا ان لديك اى شكوى يمكنك تقديمها فى صندوق الشكاوى <a href='http://forum.elkaisar.com/index.php?forums/14/' target='_blank'>هنا</a>");
        Elkaisar.DPlayer.Player.chat_panne = Math.floor(Date.now()/1000) + Number(data.duration);
        Fixed.refresePlayerStateList();
        Player_profile.refresh_player_data();
    }

    $("#msg-area").append(msg);
    this.scrollChat();
};



Elkaisar.WsLib.Chat.privateMsg = function (data){
  
    
    
    showPrivateChatNotif(data.idFrom ,data.fromName , data.playerFromAvatar);

    var chatRoom =  $("#SMB-"+data.idFrom);
    var msg_container = `<div class="sender-msg">
                                        <div class="content"><span>[${data.fromName}]:</span> ${extractEmjoi(extractUrl(data.chatMsg))}</div>
                                    </div>`;
    chatRoom.append(msg_container);
    setTimeout(function (){chatRoom.getNiceScroll(0).doScrollTop(chatRoom.getNiceScroll(0).getContentSize().h , 0);} , 35);
    
};

Elkaisar.WsLib.Chat.NotOnline = function (msg){
    alert_box['confirmMessage']('هذا اللاعب غير متصل الان');
}


Elkaisar.WsLib.Chat.sendMsgImage = function (data){
    
    var msg = `<div data-id-msg="${data.idFrom}-${data.idMsg}" 
                        class="msg-unit world_chat ${"user-group-"+data.userGroup}" 
                        data-id-player="${data.idFrom}" data-avatar="${data.playerAvatar}" 
                        data-name="${data.fromName}" data-user-group="${data.userGroup}">
                        <div class="msg-from">
                            [${data.fromName}]:
                        </div>
                        <div class="msg-body">
                            <P>
                              <img style="max-width: 100%;" src="${data.image}"/>
                            </P>
                        </div>
                    </div>`;
    $("#msg-area").append(msg);
    this.scrollChat();
    
};

Elkaisar.WsLib.Chat.QueenPrizeSent = function (data){
    
    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord)
    var msg = ` <div class="msg-unit battel-f-ann">
                    تم فوز حلفك بـ <span class="ann-red">&nbsp;${Elkaisar.World.UnitTypeData[Unit.ut].Title}&nbsp;</span>  و حصلت على قائمة الهدايا (ستجد رسالة فى بريدك)
                </div>`;
    Player_profile.refreshPlayerNotif();
    Chat.append(msg);
};

Elkaisar.WsLib.Chat.PrizeSent = function (data){
    
    var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    var msg = ` <div class="msg-unit  battel-f-ann">
                    تم وصول جوائز الى صندوقك على قائمة الهدايا بعد الفوز على<span class="ann-red">&nbsp;${Elkaisar.World.UnitTypeData[Unit.ut].Title}&nbsp;</span> (ستجد رسالة فى بريدك)
                </div>`;
    Player_profile.refreshPlayerNotif();
    Chat.append(msg);
};


Elkaisar.WsLib.Chat.PlayerTitleChanged = function (data){

    var msg = ` <div class="msg-unit  battel-f-ann">حصل الملك <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> على لقب جديد !! </div>`;
    Chat.append(msg);
};