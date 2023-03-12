Elkaisar.WsLib.Base = {};


WS_utile.Reqs = {};
WS_utile.CurReqId = 0;
WS_utile.Ack = function (Req) {
    
    var Cu = WS_utile.CurReqId;
    Req.data.ReqId = Cu;
    ws.send(JSON.stringify({
        'url': Req.url,
        'data': Req.data
    }));

    WS_utile.Reqs[Cu] = {
        callBack: Req.callBack
    };
    
    WS_utile.CurReqId++;
};


Elkaisar.WsLib.Base.Ack = function (data){
    if(!WS_utile.Reqs[data.ReqId])
        return ;
    if($.isFunction(WS_utile.Reqs[data.ReqId].callBack))
        WS_utile.Reqs[data.ReqId].callBack(data.Res);
};


Elkaisar.WsLib.Base.CrossReq = function (data)
{

    if($.isFunction(Elkaisar.WsLib.Base.CrossReqFun[data.url]))
        Elkaisar.WsLib.Base.CrossReqFun[data.url](data.Res);
    else 
        console.log(data);

}

Elkaisar.WsLib.Base.CrossReqFun = {};

Elkaisar.WsLib.Base.MakeCrossReq = function (url, Parm, ResFun)
{

    Elkaisar.WsLib.Base.CrossReqFun[url] = ResFun;
    ws.send(
            JSON.stringify({
                url: url,
                data: Parm
            })
            );

};


Elkaisar.WsLib.Base.worldCity = function (data){
    var Unit ;
    
    for(var iii in data.City)
    {
        
        Unit           = WorldUnit.getWorldUnit(data.City[iii].x, data.City[iii].y);
        if(!Unit)
            continue;
        
            
        Unit.idGuild   = data.City[iii].ig;
        Unit.CityLvl   = data.City[iii].l;
        Unit.idCity    = data.City[iii].ic;
        Unit.idPlayer  = data.City[iii].ip;
        Unit.CityFlag  = data.City[iii].f;
        Unit.ut        = Number(data.City[iii].l) + WUT_CITY_LVL_0;
        Unit.l         = data.City[iii].l;
        Unit.t         = Number(data.City[iii].l) + 17;
    }
    
};

Elkaisar.WsLib.Base.worldCityColonized = function (data){
    var Unit ;
    for(var iii in data.City)
    {
        
        Unit           = WorldUnit.getWorldUnit(data.City[iii].x, data.City[iii].y);
        if(!Unit)
          console.log(data.City[iii], Unit);
        Unit.CityColonizerFlag  = data.City[iii].city_flag;
        Unit.CityColonized      = true;
        Unit.ColonizerIdGuild   = data.City[iii].id_guild;
        Unit.ColonizerIdPlayer   = data.City[iii].id_player;
    }
    
};


Elkaisar.WsLib.Base.refreshWorldCitiesForPlayers = function (data){
    var Unit ;

    Unit           = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
    Unit.idGuild   = data.idGuild;
    Unit.CityLvl   = data.CityLvl;
    Unit.idCity    = data.idCity;
    Unit.idPlayer  = data.idPlayer;
    Unit.CityFlag  = data.CityFlag;
    Unit.ut        = 0 + WUT_CITY_LVL_0;
    Unit.l         = 0;
    Unit.t         = 0 + 17;
    if(Unit.entite)
        Unit.entite.destroy();
    Elkaisar.World.Map.Scroll(true);
    Elkaisar.World.Map.RefreshWorld();
    
};


 Elkaisar['WsLib']['Base']['WorldFireUnit'] = function (data) {
    var _0x96c110;
    for (var ii in data['Units']) {
        var xCoord = Math['floor'](ii / 500);
        var yCoord = ii % 500;
        WorldUnit['getWorldUnit'](xCoord, yCoord)['s'] = 1;
    }
    Elkaisar['World']['Map']['Scroll'](false);
    Elkaisar['World']['Map']['RefreshWorld']();
};

Elkaisar['WsLib']['Base']['DailyRest'] = function () {
    alert_box['systemChatMessage']('تمت اعادة التعيين اليومية.');
};
Elkaisar.WsLib.Base.PrizeSent = function () {
    Elkaisar.DPlayer.Notif.msg_diff = Number(Elkaisar.DPlayer.Notif.msg_diff) + 1;
    Fixed.refreshPlayerNotif();
    alert_box['systemChatMessage']('وصلك جوائز فى صندوقك إفحص البريد');
};