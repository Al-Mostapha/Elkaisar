"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AItemUse {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    useMotivSpeech() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const motiv = yield Elkaisar.DB.ASelectFrom('motiv', "player_stat", "id_player = ?", [this.idPlayer]);
            if (Item != "motiv_60" && Item != "motiv_7")
                return { "state": "error" };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (!motiv.length)
                return { "state": "error_1" };
            if (amount <= 0)
                return { "state": "error_2" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            var newTime = Date.now() / 1000;
            if (Item == "motiv_60")
                newTime = Math.max(newTime + 60 * 60 * 60 * amount, motiv[0]["motiv"] + 60 * 60 * 60 * amount);
            else if (Item == "motiv_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, motiv[0]["motiv"] + 60 * 60 * 24 * 7 * amount);
            Elkaisar.DB.Update("motiv = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            return { "state": "ok" };
        });
    }
    useProtPop() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "prot_pop", amount)))
                return { "state": "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "prot_pop", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate(`pop = pop + GREATEST(100*${amount} , pop_cap*0.2*${amount})`, 'city', "id_city = ?", [idCity]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.coinInState(this.idPlayer, idCity);
            Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "food");
            Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "wood");
            Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "stone");
            Elkaisar.Lib.LSaveState.resInState(this.idPlayer, idCity, "metal");
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useCeaseFire() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const Truce = yield Elkaisar.DB.ASelectFrom('peace', "player_stat", "id_player = ?", [this.idPlayer]);
            const now = Date.now() / 1000;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "peace", amount)))
                return { state: "error_0" };
            if (!Truce.length)
                return { "state": "error_1" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (Truce[0]["peace"] > now)
                return { "state": "error_2" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "peace", amount)))
                return { state: "error_0" };
            Elkaisar.DB.Update("peace = ?", "player_stat", "id_player = ?", [now + 60 * 60 * 24, this.idPlayer]);
            return { "state": "ok" };
        });
    }
    useTheatrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "a_play", amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "a_play", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate(" dis_loy = 0 , loy = 100, pop_state = 1", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
            yield Elkaisar.Lib.LSaveState.saveCityState(this.idPlayer);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useFreedomHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "freedom_help", 1)))
                return { "state": "error_0" };
            const Colonize = yield Elkaisar.DB.ASelectFrom("*", "city_colonize", "id_city_colonized = ?", [idCity]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city, id_player", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
            if (!City.length)
                return { "state": "error_1" };
            if (!Colonize.length)
                return { "state": "error_2" };
            Elkaisar.DB.Delete("city_colonize", "id_city_colonized = ?", [idCity]);
            Elkaisar.Lib.LSaveState.afterCityColonized(Colonize[0]["id_city_colonized"]);
            Elkaisar.Lib.LSaveState.afterCityColonizer(Colonize[0]["id_city_colonizer"]);
            Elkaisar.WsLib.World.refreshWorldColonizedCities();
            return { "state": "ok" };
        });
    }
    useMedicalStatue() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const medical = (yield Elkaisar.DB.ASelectFrom("medical", "player_stat", "id_player = ?", [this.idPlayer]))[0]["medical"];
            if (Item != "medical_moun" && Item != "mediacl_statue")
                return { state: "error_2" };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            if (amount <= 0)
                return { state: "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "medical_moun")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, medical + 60 * 60 * 24 * amount);
            if (Item == "mediacl_statue")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, medical + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            Elkaisar.DB.Update("medical = ?", 'player_stat', "id_player = ?", [newTime, this.idPlayer]);
            return { "state": "ok" };
        });
    }
    useAttackAdvancer() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const attack = (yield Elkaisar.DB.ASelectFrom("attack_10", "player_stat", "id_player = ?", [this.idPlayer]))[0]["attack_10"];
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            if (amount <= 0)
                return { state: "error_1" };
            var newTime = Date.now();
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            if (Item == "sparta_stab")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, attack + 60 * 60 * 24 * amount);
            if (Item == "qulinds_shaft")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, attack + 60 * 60 * 24 * 7 * amount);
            Elkaisar.DB.Update("attack_10 = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            return { "state": "ok" };
        });
    }
    useDefenceAdvancer() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const defence = (yield Elkaisar.DB.ASelectFrom("defence_10", "player_stat", "id_player = ?", [this.idPlayer]))[0]["defence_10"];
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            if (amount <= 0)
                return { state: "error_1" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            var newTime = Date.now();
            if (Item == "marmlo_helmet")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, defence + 60 * 60 * 24 * amount);
            if (Item == "march_prot")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, defence + 60 * 60 * 24 * 7 * amount);
            Elkaisar.DB.Update("defence_10 = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            return { "state": "ok" };
        });
    }
    useRandomMove() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const province = Elkaisar.Base.validateId(this.Parm["province"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const EmptyPlace = yield Elkaisar.Lib.ALWorld.getEmptyPlace(province);
            const Unit = yield Elkaisar.DB.ASelectFrom("*", "world", "x = ? AND y = ?", [EmptyPlace[0]["x"], EmptyPlace[0]["y"]]);
            const City = yield Elkaisar.DB.ASelectFrom("x, y, lvl", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
            if (!City.length)
                return { "state": "error_no_city" };
            if (!Unit.length || !EmptyPlace.length)
                return { "state": "error_no_place" };
            if (Unit[0]["ut"] != Elkaisar.Config.WUT_EMPTY)
                return { "state": "error_no_place_empty" };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "random_move", 1)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "random_move", 1)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("t = 0 ,ut = 0, s = 0 , l = 0", "world", "x = ? AND  y = ?", [City[0]["x"], City[0]["y"]]);
            yield Elkaisar.DB.AUpdate("ut = ?, l = ?, s = 0", "world", "x = ? AND y = ?", [Elkaisar.Config.WUT_CITY_LVL_0 + City[0]["lvl"], City[0]["lvl"], EmptyPlace[0]["x"], EmptyPlace[0]["y"]]);
            yield Elkaisar.DB.AUpdate("x = ?, y = ?", "city", "id_city = ?", [EmptyPlace[0]["x"], EmptyPlace[0]["y"], idCity]);
            Elkaisar.DB.Update("x_coord = ?, y_coord = ?", "world_unit_garrison", "x_coord = ? AND y_coord = ?", [EmptyPlace[0]["x"], EmptyPlace[0]["y"], City[0]["x"], City[0]["y"]]);
            Elkaisar.WsLib.World.refreshWorldUnit(null, {
                "Units": [
                    { "x": EmptyPlace[0]["x"], "y": EmptyPlace[0]["y"] },
                    { "x": City[0]["x"], "y": City[0]["y"] }
                ]
            });
            return { "state": "ok" };
        });
    }
    useCertainMove() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const newX = Elkaisar.Base.validateId(this.Parm["newX"]);
            const newY = Elkaisar.Base.validateId(this.Parm["newY"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const Unit = yield Elkaisar.DB.ASelectFrom("*", "world", "x = ? AND y = ?", [newX, newY]);
            const City = yield Elkaisar.DB.ASelectFrom("x, y, lvl", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
            if (!City.length)
                return { "state": "error_no_city" };
            if (!Unit.length)
                return { "state": "error_no_place" };
            if (Unit[0]["ut"] != Elkaisar.Config.WUT_EMPTY)
                return { "state": "error_no_place_empty" };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "certain_move", 1)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "certain_move", 1)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("t = 0 ,ut = 0, s = 0 , l = 0", "world", "x = ? AND  y = ?", [City[0]["x"], City[0]["y"]]);
            yield Elkaisar.DB.AUpdate("ut = ?, l = ?", "world", "x = ? AND y = ?", [Elkaisar.Config.WUT_CITY_LVL_0 + City[0].lvl, City[0].lvl, newX, newY]);
            yield Elkaisar.DB.AUpdate("x = ?, y = ?", "city", "id_city = ?", [newX, newY, idCity]);
            Elkaisar.DB.Update("x_coord = ?, y_coord = ?", "world_unit_garrison", "x_coord = ? AND y_coord = ?", [newX, newY, City[0].x, City[0].y]);
            Elkaisar.WsLib.World.refreshWorldUnit(null, {
                "Units": [
                    { "x": newX, "y": newY },
                    { "x": City[0]["x"], "y": City[0]["y"] }
                ]
            });
            return { "state": "ok" };
        });
    }
    useWheat() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const lastTime = (yield Elkaisar.DB.ASelectFrom("wheat", "player_stat", "id_player = ?", [this.idPlayer]))[0]["wheat"];
            const idPlayer = this.idPlayer;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "wheat_1")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, lastTime + 60 * 60 * 24 * amount);
            if (Item == "wheat_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, lastTime + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, 1)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("wheat = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
            City.forEach(function (OneCity) {
                Elkaisar.Lib.LSaveState.saveCityState(OneCity.id_city);
                Elkaisar.Lib.LSaveState.resInState(idPlayer, OneCity.id_city, "food");
            });
            return { "state": "ok", "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0] };
        });
    }
    useStone() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const lastTime = (yield Elkaisar.DB.ASelectFrom("stone", "player_stat", "id_player = ?", [this.idPlayer]))[0]["stone"];
            const idPlayer = this.idPlayer;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "stone_1")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, lastTime + 60 * 60 * 24 * amount);
            if (Item == "stone_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, lastTime + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, 1)))
                return { state: "error_0" };
            Elkaisar.DB.AUpdate("stone = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
            City.forEach(function (OneCity) {
                Elkaisar.Lib.LSaveState.saveCityState(OneCity.id_city);
                Elkaisar.Lib.LSaveState.resInState(idPlayer, OneCity.id_city, "stone");
            });
            return { "state": "ok", "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0] };
        });
    }
    useWood() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const lastTime = (yield Elkaisar.DB.ASelectFrom("wood", "player_stat", "id_player = ?", [this.idPlayer]))[0]["wood"];
            const idPlayer = this.idPlayer;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "wood_1")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, lastTime + 60 * 60 * 24 * amount);
            if (Item == "wood_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, lastTime + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, 1)))
                return { state: "error_0" };
            Elkaisar.DB.AUpdate("wood = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
            City.forEach(function (OneCity) {
                Elkaisar.Lib.LSaveState.saveCityState(OneCity.id_city);
                Elkaisar.Lib.LSaveState.resInState(idPlayer, OneCity.id_city, "wood");
            });
            return { "state": "ok", "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0] };
        });
    }
    useMetal() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const lastTime = (yield Elkaisar.DB.ASelectFrom("metal", "player_stat", "id_player = ?", [this.idPlayer]))[0]["metal"];
            const idPlayer = this.idPlayer;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "metal_1")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, lastTime + 60 * 60 * 24 * amount);
            if (Item == "metal_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, lastTime + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, 1)))
                return { state: "error_0" };
            Elkaisar.DB.AUpdate("metal = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
            City.forEach(function (OneCity) {
                Elkaisar.Lib.LSaveState.saveCityState(OneCity.id_city);
                Elkaisar.Lib.LSaveState.resInState(idPlayer, OneCity.id_city, "metal");
            });
            return { "state": "ok", "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0] };
        });
    }
    useCoin() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            const lastTime = (yield Elkaisar.DB.ASelectFrom("coin", "player_stat", "id_player = ?", [this.idPlayer]))[0]["metal"];
            const idPlayer = this.idPlayer;
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            var newTime = Date.now() / 1000;
            if (Item == "coin_1")
                newTime = Math.max(newTime + 60 * 60 * 24 * amount, lastTime + 60 * 60 * 24 * amount);
            if (Item == "coin_7")
                newTime = Math.max(newTime + 60 * 60 * 24 * 7 * amount, lastTime + 60 * 60 * 24 * 7 * amount);
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, 1)))
                return { state: "error_0" };
            Elkaisar.DB.AUpdate("coin = ?", "player_stat", "id_player = ?", [newTime, this.idPlayer]);
            const City = yield Elkaisar.DB.ASelectFrom("id_city", "city", "id_player = ?", [this.idPlayer]);
            City.forEach(function (OneCity) {
                Elkaisar.Lib.LSaveState.saveCityState(OneCity.id_city);
                Elkaisar.Lib.LSaveState.coinInState(idPlayer, idCity);
            });
            return { "state": "ok", "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0] };
        });
    }
    useGoldPack() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const goldAmount = {
                "gold_1": 1, "gold_5": 5, "gold_10": 10,
                "gold_25": 25, "gold_75": 75, "gold_100": 100,
                "gold_500": 500, "gold_1000": 1000
            };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!goldAmount[Item])
                return { "state": "error_2" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("gold = gold + ?", "player", "id_player = ?", [goldAmount[Item] * amount, this.idPlayer]);
            return {
                "state": "ok"
            };
        });
    }
    useArenaAttempt() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const ArenaAttemptAmount = {
                "arena_attempt_1": 1, "arena_attempt_5": 5, "arena_attempt_10": 10
            };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!ArenaAttemptAmount[Item])
                return { "state": "error_2" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("attempt  = attempt + ?", "arena_player_challange", "id_player = ?", [ArenaAttemptAmount[Item] * amount, this.idPlayer]);
            return {
                "state": "ok"
            };
        });
    }
    useArenaExpPack() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const ArenaExpAmount = {
                "arena_exp_1": 1, "arena_exp_5": 5,
                "arena_exp_10": 10, "arena_exp_25": 25
            };
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, Item, amount)))
                return { "state": "error_0" };
            if (amount <= 0)
                return { "state": "error_1" };
            if (!ArenaExpAmount[Item])
                return { "state": "error_2" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, Item, amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("exp  = exp + ?", "arena_player_challange", "id_player = ?", [ArenaExpAmount[Item] * amount, this.idPlayer]);
            return {
                "state": "ok"
            };
        });
    }
}
module.exports = AItemUse;
