
setInterval(function () {
    
    
    Elkaisar.DB.SelectFrom("id_hero, id_player, power, power_max", "hero", "power < power_max", [], function (Heros){
        
        var Players = {};
        
        Heros.forEach(function(Hero, Index){
            
            var powerToAdd = Math.min(1 + Hero["power"], Hero["power_max"]);
            var idPlayer = Hero.id_player;
            Elkaisar.DB.Update("power = ?", "hero", "id_hero = ?", [powerToAdd, Hero["id_hero"]]);
            
            if(!Players[idPlayer])
                Players[idPlayer] = [];
            Players[idPlayer].push({
                "idHero" : Hero["id_hero"],
                "power"  : powerToAdd
            });
        });
        for(var idPlayer in Players){
            var player = Elkaisar.Base.getPlayer(idPlayer);
            if(player)
                player.connection.sendUTF(JSON.stringify({
                    "classPath" : "Hero.Power.Added",
                    "Heros"     : Players[idPlayer]
                }));
        }
    });
}, 6*60*1000);
