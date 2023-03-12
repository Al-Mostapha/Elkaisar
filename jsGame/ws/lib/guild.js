Elkaisar.WsLib.Guild = {};
Elkaisar.WsLib.Team = {};



Elkaisar.WsLib.Guild.GuildInvSent = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                تم إرسال دعوة إلى الملك <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>
                 بواسطة الملك <span class="ann-red">&nbsp;${data.InvByName}&nbsp;</span> قائد حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span> 
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};

Elkaisar.WsLib.Guild.PlayerInvRejected = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم رفض دعوة إنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
};


Elkaisar.WsLib.Guild.PlayerInvAccepted = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم قبول دعوة إنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
};


Elkaisar.WsLib.Guild.PlayerInvCanceled = function (data) {

     var msg = ` <div class="msg-unit team-ann">
                تم إلغاء  دعوة  الملك <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>
                 بواسطة الملك <span class="ann-red">&nbsp;${data.CancelledBy}&nbsp;</span> قائد حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span> 
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};

Elkaisar.WsLib.Guild.joinReqSent = function (data) {

     var msg = ` <div class="msg-unit team-ann">
                    قام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> بإرسال طلب إنضمام لحلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span>
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};

Elkaisar.WsLib.Guild.joinReqCanceled = function (data) {

     var msg = ` <div class="msg-unit team-ann">
                    قام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> بإلغاء طلب الإنضمام لحلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span>
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};



Elkaisar.WsLib.Guild.joinReqAccepted = function (data) {

     var msg = ` <div class="msg-unit team-ann">
                    قام اللاعب <span class="ann-red">&nbsp;${data.AcceptBy}&nbsp;</span> بقبول طلب إنضمام <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span>
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};


Elkaisar.WsLib.Guild.joinReqRejected= function (data) {

     var msg = ` <div class="msg-unit team-ann">
                    قام اللاعب <span class="ann-red">&nbsp;${data.RejectedBy}&nbsp;</span> برفض طلب إنضمام <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى حلف <span class="ann-red">&nbsp;${data.GuildName}&nbsp;</span>
                </div>`;
    Chat.append(msg);
    Guild.getGuildData();
    
};




Elkaisar.WsLib.Guild.announceRelation = function (data) {

    var relation_title = Elkaisar.BaseData.GuildRelationTitle;

    var msg = `تم تغير العلاقة بين حلف ${data.GuildNameOne} وحلف ${data.GuildNameTwo} الى -${relation_title[data.relation]}- بواسطة  ${data.PlayerName}`;
    alert_box.systemChatMessage(msg);
    if (Number(data.idGuildOne) === Number(Elkaisar.DPlayer.Player.id_guild) || Number(data.idGuildTwo) === Number(Elkaisar.DPlayer.Player.id_guild)) {
        Guild.getGuildData();
    }

};




Elkaisar.WsLib.Guild.msgSent = function (data) {

    Elkaisar.DPlayer.Notif.msg_in = Number(Elkaisar.DPlayer.Notif.msg_in) + 1;
    Fixed.refreshPlayerNotif();

};


Elkaisar.WsLib.Guild.PrizeSent = function (data) {
    alert_box.systemChatMessage(`تم إرسال هدايا إلى جميع أعضاء حلف ${data.GuildName} الأن !`);
}




Elkaisar.WsLib.Guild.GuildNameChanged = function (data) {
    
    var msg = `قام الملك <span class="ann-red">&nbsp;${data.ChangeBy}&nbsp;</span> بتغير إسم حلفه <span class="ann-red">&nbsp;(${data.OldName})&nbsp;</span> إلى <span class="ann-red">&nbsp;${data.NewName}&nbsp;</span> !`;
    alert_box.systemChatMessage(msg);
    if (Number(data.idGuild) === Number(Elkaisar.DPlayer.Player.id_guild)) {
        Guild.getGuildData();
    }
}


Elkaisar.WsLib.Team.announceRelation = function (data) {

    var relation_title = Elkaisar.BaseData.GuildRelationTitle;

    var msg = `<div class="msg-unit team-ann">تم تغير العلاقة بين الفريق ${data.TeamNameOne} و الفريق ${data.TeamNameTwo} الى -${relation_title[data.relation]}- بواسطة  ${data.PlayerName}</div>`;
    alert_box.systemChatMessage(msg);
    if (!Elkaisar.Team.PlayerTeam.Team)
        return;

    if (Number(data.idTeamOne) === Number(Elkaisar.Team.PlayerTeam.Team.id_team))
        Elkaisar.Team.getPlayerTeam();
    if (Number(data.idTeamTwo) === Number(Elkaisar.Team.PlayerTeam.Team.id_team))
        Elkaisar.Team.getPlayerTeam();

};


Elkaisar.WsLib.Team.TeamInvSent = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                تم إرسال دعوة إلى الملك <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>
                 بواسطة الملك <span class="ann-red">&nbsp;${data.InvByName}&nbsp;</span> قائد فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> 
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
    
};

Elkaisar.WsLib.Team.TeamReqSent = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                تم إرسال طلب للإنضمام إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> من اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.PlayerInvRejected = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم رفض دعوة إنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};


Elkaisar.WsLib.Team.PlayerAcceptInv = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم قبول دعوة إنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.playerTeamLeave = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    غادر اللاعب<span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>  فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.TeamDisbanded = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم تفكيك فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>!
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.playerTeamResign = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    إستقال اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span>  من منصبة فى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span> !
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.TeamMemberFired = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                    تم طرد اللاعب <span class="ann-red">&nbsp;${data.FiredName}&nbsp;</span> من فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>!
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam().done(function (){
        $("#TeamHeaderNavBar .selected").click();
    });
};

Elkaisar.WsLib.Team.TeamReqCanceled = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                   تم ألغاء طلب أنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>! 
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};


Elkaisar.WsLib.Team.TeamReqAccepted = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                   تم قبول طلب أنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>! 
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};


Elkaisar.WsLib.Team.TeamReqRejected = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                   تم رفض طلب أنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>! 
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};

Elkaisar.WsLib.Team.TeamInvCanceled = function (data) {

    var msg = ` <div class="msg-unit team-ann">
                   تم إلغاء دعوة أنضمام اللاعب <span class="ann-red">&nbsp;${data.PlayerName}&nbsp;</span> إلى فريق <span class="ann-red">&nbsp;${data.TeamName}&nbsp;</span>! 
                </div>`;
    Chat.append(msg);
    Elkaisar.Team.getPlayerTeam();
};