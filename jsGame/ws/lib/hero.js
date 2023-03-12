Elkaisar.WsLib.Hero = {};

Elkaisar.WsLib.Hero.Power = {};

Elkaisar.WsLib.Hero.Power.Added = function (data)
{

    for (var iii in data.Heros)
    {
        if (Elkaisar.Hero.getHero(data.Heros[iii].idHero))
            if (Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero)
                Elkaisar.Hero.getHero(data.Heros[iii].idHero).Hero.power = data.Heros[iii].power;

        if (Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(data.Heros[iii].idHero)) {
            if ($("#dialg_box[type=hero]").length > 0) {
                $("#dialg_box .middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
            }
        }
    }

};


Elkaisar.WsLib.Hero.Back = function (data) {

    var HeroName = '';
    var CityName = 'المدينة';
    var Hero = Elkaisar.Hero.getHero(data['idHero']);
    var City = Elkaisar['City']['getCityByCoord'](data['xTo'], data['yTo']);

    if (Hero && Hero['Hero'] && Hero['Hero']['name'])
        HeroName = Hero['Hero']['name'];
    if (City && City['City'] && City['City']['name'])
        CityName = City['City']['name'];
    Elkaisar.DPlayer.Notif['hero_in_battel'] -= 1;
    Hero['Hero']['in_city'] = data['inCity'];
    if (Number(data['Task']) === Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_SUPPLY'] || data['task'] == Elkaisar['BaseData']['BattelTasks']['BATTEL_TASK_HERO_TRANS']) {
        var idCity = Number(Elkaisar['CurrentCity']['City']['id_city']);
        var CityC = Elkaisar['City']['getCityByCoord'](data['xTo'], data['yTo']);
        if (CityC && CityC['City']){
            Elkaisar.City.getCityHero(CityC['City']['id_city']);
            Elkaisar.City.getCityHeroArmy(CityC['City']['id_city']);
            Elkaisar.City.getCityHeroMedal(CityC['City']['id_city']);
            Elkaisar.City.getCityHeroEquip(CityC['City']['id_city']);
            Elkaisar.City.getCityHero(idCity);
            Elkaisar.City.getCityHeroArmy(idCity);
            Elkaisar.City.getCityHeroMedal(idCity);
            Elkaisar.City.getCityHeroEquip(idCity);
        }
        
    }
    Fixed['refreshPlayerNotif']();
    city_profile['refresh_hero_view']();
    var Msg = ` تم عودة البطل   ${HeroName}   من   ${BATTAL_TASKS[data['Task']]['ar_title']}    [ ${data['xTo']}  ,  ${data['yTo']} ] الى المدينة   ${CityName}  `;
    if(Number(data['Task']) === BATTEL_TYPES_CONST['GARRISON'])
        (Msg = ' تم ارسال البطل ' + HeroName + '  بنجاح الى [' + data['xTo'] + ',' + data['yTo'] + '] لبدء عملية الامداد');
    alert_box['systemChatMessage'](Msg);

};