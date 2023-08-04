

class LPrize {
    Battel = {};
    PlayerCities = {
        [Elkaisar.Config.BATTEL_SIDE_DEF]: {},
        [Elkaisar.Config.BATTEL_SIDE_ATT]: {}
    };
    Unit;
    heros;
    totalResources = {
        "food": 0,
        "wood": 0,
        "stone": 0,
        "metal": 0,
        "coin": 0
    };
    cityAvailResources = {
        food: 0, wood: 0, stone: 0, metal: 0, coin: 0
    };
    totalResCap = 0;
    static CITY_RES_TAKE_RATE = {
        "food": 0.4,
        "wood": 0.3,
        "stone": 0.15,
        "metal": 0.1,
        "coin": 0.05
    };
    static SEA_CITY_RES_TAKE_RATE = {
        "food": 0.4,
        "wood": 0.3,
        "stone": 0.15,
        "metal": 0.1,
        "coin": 0.05,
        "gold": 1e-6
    };

    seaCityTakenAmount = 0;
    SeaCityMaxTakenAmount = 1e9;
    SeaCityMaxGoldTakenAmount = 150;

    static SEA_CITY_RES = {
        [Elkaisar.Config.WUT_SEA_CITY_1]: "food",
        [Elkaisar.Config.WUT_SEA_CITY_2]: "wood",
        [Elkaisar.Config.WUT_SEA_CITY_3]: "stone",
        [Elkaisar.Config.WUT_SEA_CITY_4]: "metal",
        [Elkaisar.Config.WUT_SEA_CITY_5]: "coin",
        [Elkaisar.Config.WUT_SEA_CITY_6]: "gold"
    };

    constructor(Battel) {
        this.Battel = Battel;
    }

    static giveImediatly(Unit) {
        return true;
    }

    async getCityAvailRes() {
        const Res = await Elkaisar.DB.ASelectFrom(
            "id_city,food,wood,stone,metal,coin, id_player,food_cap,wood_cap, stone_cap,metal_cap,coin_cap",
            "city", "x = ? AND y = ?", [this.Battel.Battel.x_coord, this.Battel.Battel.y_coord]);
        if (Res[0])
            this.cityAvailResources = Res[0];
    }

    async takeCityRes() {
        await Elkaisar.Lib.LSaveState.saveCityState(this.cityAvailResources.id_city);
        var food = Math.max(this.cityAvailResources["food"] - this.totalResCap * LPrize.CITY_RES_TAKE_RATE["food"], 0);
        var wood = Math.max(this.cityAvailResources["wood"] - this.totalResCap * LPrize.CITY_RES_TAKE_RATE["wood"], 0);
        var stone = Math.max(this.cityAvailResources["stone"] - this.totalResCap * LPrize.CITY_RES_TAKE_RATE["stone"], 0);
        var metal = Math.max(this.cityAvailResources["metal"] - this.totalResCap * LPrize.CITY_RES_TAKE_RATE["metal"], 0);
        var coin = Math.max(this.cityAvailResources["coin"] - this.totalResCap * LPrize.CITY_RES_TAKE_RATE["coin"], 0);
        Elkaisar.DB.Update(`food = ${food}, wood = ${wood}, stone = ${stone}, metal = ${metal}, coin = ${coin}`, "city", "id_city = ?", [this.cityAvailResources.id_city]);

    }

    heroShare() {

        for (var iii in this.Battel.HeroReadyList) {

            var OneHero = this.Battel.HeroReadyList[iii];
            if (!this.PlayerCities[OneHero.side][OneHero.id_player])
                this.PlayerCities[OneHero.side][OneHero.id_player] = {};
            if (!this.PlayerCities[OneHero.side][OneHero.id_player][OneHero.id_city])
                this.PlayerCities[OneHero.side][OneHero.id_player][OneHero.id_city] = Elkaisar.Config.CPlayer.PlayerCityPrizeEmpty();

            this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["Killed"] += OneHero["troopsKilled"];
            this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["Kills"] += OneHero["troopsKills"];
            this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["idCity"] = OneHero["id_city"];

            for (var ii in OneHero.type) {
                var armyType = OneHero.type[ii];
                this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["armySize"] += Elkaisar.Config.CArmy.ArmyCap[armyType] * OneHero["pre"][ii];
                this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["armyRemainSize"] += Elkaisar.Config.CArmy.ArmyCap[armyType] * Math.max(OneHero["pre"][ii] - OneHero["post"][ii], 0);
                this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["Troops"][armyType] += OneHero["pre"][ii];
                this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["RemainTroops"][armyType] += Math.max(OneHero["pre"][ii] - OneHero["post"][ii], 0);
                this.PlayerCities[OneHero["side"]][OneHero["id_player"]][OneHero["id_city"]]["ResourceCap"] += Elkaisar.Config.CArmy.ArmyPower[armyType]["res_cap"] * Math.max(OneHero["pre"][ii] - OneHero["post"][ii], 0);
            }
        }

        for (var idPlayer in this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT]) {
            for (var idCity in this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][idPlayer]) {
                this.totalResCap += this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][idPlayer][idCity].ResourceCap;
            }
        }
    }

    seaCityPrize(Player, SeaCity, callBack) {

        var p_prize = { "food": 0, "wood": 0, "stone": 0, "metal": 0, "coin": 0, gold: 0};
        var ResToTake = LPrize.SEA_CITY_RES[SeaCity];

        if (this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer]) {
            var This = this;
            var Cities = Object.values(this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer]);

            Cities.forEach(function (City, Index) {
                var idCity = City.idCity;
                var cityShareRate = City.ResourceCap / This.totalResCap;
                var ResAmount = LPrize.SEA_CITY_RES_TAKE_RATE[ResToTake] * City.ResourceCap;
                if(SeaCity == Elkaisar.Config.WUT_SEA_CITY_6)
                  ResAmount = Math.min(ResAmount, This.SeaCityMaxGoldTakenAmount - This.seaCityTakenAmount)*cityShareRate;

                This.seaCityTakenAmount += ResAmount;
                p_prize[ResToTake] += ResAmount;
                if(SeaCity == Elkaisar.Config.WUT_SEA_CITY_6)
                  Elkaisar.Lib.LPlayer.givePlayerGold(Player.idPlayer, ResAmount);
                else
                  Elkaisar.DB.Update(`${ResToTake} = ${ResToTake} + ${ResAmount}`, "city", "id_city = ?", [idCity]);
            });
        }
        return p_prize;
    }

    cityPrize(Player) {    /// دى جوايز المناورات
        if (!this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer])
            return;
        var p_prize = { "food": 0, "wood": 0, "stone": 0, "metal": 0, "coin": 0 };

        var share = Math.min(this.totalResCap / (this.cityAvailResources["food"] + this.cityAvailResources["wood"] + this.cityAvailResources["stone"] + this.cityAvailResources["metal"] + this.cityAvailResources["coin"]), 1);


        var This = this;
        var Cities = Object.values(this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer]);
        Cities.forEach(async function (City, Index) {
            var idCity = City.idCity;
            var cityShareRate = City.ResourceCap / This.totalResCap;
            await Elkaisar.Lib.LSaveState.saveCityState(idCity);
            var food = This.cityAvailResources["food"] * LPrize.CITY_RES_TAKE_RATE["food"] * cityShareRate * share;
            var wood = This.cityAvailResources["wood"] * LPrize.CITY_RES_TAKE_RATE["wood"] * cityShareRate * share;
            var stone = This.cityAvailResources["stone"] * LPrize.CITY_RES_TAKE_RATE["stone"] * cityShareRate * share;
            var metal = This.cityAvailResources["metal"] * LPrize.CITY_RES_TAKE_RATE["metal"] * cityShareRate * share;
            var coin = This.cityAvailResources["coin"] * LPrize.CITY_RES_TAKE_RATE["coin"] * cityShareRate * share;

            p_prize["food"] += food;
            p_prize["wood"] += wood;
            p_prize["stone"] += stone;
            p_prize["metal"] += metal;
            p_prize["coin"] += coin;

            Elkaisar.DB.Update(
                `food = food + ${food || 0}, wood = wood + ${wood || 0}, stone = stone + ${stone || 0}, metal = metal + ${metal || 0} , coin = coin + ${coin || 0}`,
                "city", "id_city = ?", [idCity]);

            Player.ResourcePrize.food  += food;
            Player.ResourcePrize.wood  += wood;
            Player.ResourcePrize.stone += stone;
            Player.ResourcePrize.metal += metal;
            Player.ResourcePrize.coin  += coin;

        });
        return Player.ResourcePrize;

    }

    async cityItemsPrize(Player) {
        
        if (this.totalResCap < 5e6)
            return [];

        
        if (!this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer])
            return [];
        
        var playerTotal = 0;
        for (var iii in this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer])
            playerTotal += this.PlayerCities[Elkaisar.Config.BATTEL_SIDE_ATT][Player.idPlayer][iii]["ResourceCap"];


    
        var Items = Elkaisar.World.getUnitPrize(this.Battel);


        var playerShare = playerTotal / this.totalResCap;
        var ItemPrize = [];
        var This = this;
        
        if (!Items.length)
            return [];
        var ii, OneItem;
        for(var ii in Items){
            OneItem = Items[ii];
            var canTackAmount = (Math.floor(Math.random() * OneItem["amount_max"]) + OneItem["amount_min"]) * playerShare;
            const PrizeAmount = await Elkaisar.DB.ASelectFrom("amount", "player_item", "id_player = ? AND id_item = ?",
                [This.cityAvailResources.id_player, OneItem.prize]);
            
            if (!PrizeAmount)
                continue;
            if (!PrizeAmount[0])
                continue;
            if (PrizeAmount[0].amount <= 0)
                continue;
            var amount = Math.min(canTackAmount, PrizeAmount[0].amount);
            if (amount <= 0)
                continue;
            if (ItemPrize.length >= 10)
                continue;
           
            await Elkaisar.DB.AUpdate(`amount = ${Math.max(0, PrizeAmount[0].amount - amount)}`, "player_item", "id_item = ? AND id_player = ?", [OneItem.prize, This.cityAvailResources.id_player]);
            ItemPrize.push({
                "prize": OneItem["prize"],
                "amount_min": amount,
                "amount_max": amount,
                "win_rate": 1000
            });
        }
        return ItemPrize;
    }

    async givePrize(Player) {

        var Prizes = Elkaisar.Config.CPlayer.PrizeEmpty();
        var Unit = Elkaisar.World.getUnit(this.Battel.Battel.x_coord, this.Battel.Battel.y_coord);

        if (Elkaisar.Lib.LWorldUnit.isArmyCapital(Unit.ut))
            return;


        if (Elkaisar.Lib.LWorldUnit.isCity(Unit["ut"]) && this.Battel.Battel.task == Elkaisar.Config.BATTEL_TASK_CONQUER) {
            const ResourcePrize = await this.cityPrize(Player);
            const ItemPrize = await this.cityItemsPrize(Player);
            this.addPrizeToDB({ ResourcePrize: ResourcePrize, ItemPrize: ItemPrize }, Player);
            return;
            
        } else if (Elkaisar.Lib.LWorldUnit.isSeaCity(Unit["ut"]) && this.Battel.Battel.task == Elkaisar.Config.BATTEL_TASK_CONQUER) {
            Prizes["ItemPrize"] = Elkaisar.World.getUnitPrize(this.Battel);
            const ResourcePrize =  this.seaCityPrize(Player, Unit["ut"]);
            this.addPrizeToDB({ ResourcePrize: ResourcePrize, ItemPrize: Prizes["ItemPrize"] }, Player);
            return;
        }
        
        Prizes["ItemPrize"] = Elkaisar.World.getUnitPrize(this.Battel);
        this.addPrizeToDB(Prizes, Player);
    }

    addPrizeToDB(Prizes, Player) {

        if (!Player["ItemPrize"])
            Player["ItemPrize"] = [];
        Prizes["ItemPrize"].forEach(function (OnePrize, Index) {
            var Luck = Elkaisar.Base.rand(0, 1000);
            var amount = 0;
            if (Luck <= OnePrize["win_rate"]) {
                amount = Elkaisar.Base.rand(OnePrize["amount_min"], OnePrize["amount_max"]);
                Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Player.idPlayer, OnePrize["prize"]]);
                Player.ItemPrize.push({
                    "Item": OnePrize["prize"],
                    "amount": amount
                });


            }
        });
        Player["ResourcePrize"] = Prizes["ResourcePrize"];
        Elkaisar.DB.Update("honor = honor + ?", "player", "id_player = ?", [Player.Honor, Player.idPlayer]);
    }

}

module.exports = LPrize;

