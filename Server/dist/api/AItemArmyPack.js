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
class AItemArmyPack {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    useArmyPackMini() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_all_1", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_all_1", amount)))
                return { state: "error_0" };
            const army_a = Elkaisar.Base.rand(200, 300) * amount;
            const army_d = Elkaisar.Base.rand(100, 200) * amount;
            const spies = Elkaisar.Base.rand(30, 50) * amount;
            yield Elkaisar.DB.AUpdate("army_a = army_a + ? ,  army_d = army_d + ?  , spies = spies + ? ", "city", "id_city = ?  AND id_player = ?", [army_a, army_d, spies, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackMedium() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_all_2", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_all_2", amount)))
                return { state: "error_0" };
            const army_b = Elkaisar.Base.rand(30, 50) * amount;
            const army_c = Elkaisar.Base.rand(10, 20) * amount;
            const army_d = Elkaisar.Base.rand(200, 300) * amount;
            const army_e = Elkaisar.Base.rand(100, 200) * amount;
            yield Elkaisar.DB.AUpdate("army_b = army_b + ?, army_c = army_c + ?, army_d = army_d + ?, army_e = army_e + ?", "city", "id_city = ?  AND   id_player = ?", [army_b, army_c, army_d, army_e, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackLarge() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_all_3", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_all_3", amount)))
                return { state: "error_0" };
            const army_b = Elkaisar.Base.rand(100, 200) * amount;
            const army_c = Elkaisar.Base.rand(30, 50) * amount;
            const army_e = Elkaisar.Base.rand(200, 300) * amount;
            const army_f = Elkaisar.Base.rand(10, 20) * amount;
            yield Elkaisar.DB.AUpdate("army_b = army_b + ?, army_c = army_c + ?, army_e = army_e + ?, army_f = army_f + ?", "city", "id_city = ?  AND   id_player = ?", [army_b, army_c, army_e, army_f, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackA100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_a_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_a_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_a = army_a + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackB100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_b_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_b_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_b = army_b + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackC100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_c_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_c_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_c = army_c + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackD100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_d_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_d_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_d = army_d + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackE100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_e_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_e_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_e = army_e + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackF100() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_f_100", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_f_100", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_f = army_f + ? ", "city", "id_city = ?  AND id_player = ?", [100 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackA1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_a_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_a_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_a = army_a + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackB1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_b_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_b_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_b = army_b + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackC1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_c_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_c_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_c = army_c + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackD1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_d_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_d_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_d = army_d + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackE1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_e_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_e_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_e = army_e + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
    useArmyPackF1000() {
        return __awaiter(this, void 0, void 0, function* () {
            const Item = Elkaisar.Base.validateGameNames(this.Parm["Item"]);
            const amount = Elkaisar.Base.validateId(this.Parm["amount"]);
            const idCity = Elkaisar.Base.validateId(this.Parm["idCity"]);
            if (!(yield Elkaisar.Lib.LItem.isEnough(this.idPlayer, "army_f_1000", amount)))
                return { state: "error_0" };
            if (!(yield Elkaisar.Lib.LItem.useItem(this.idPlayer, "army_f_1000", amount)))
                return { state: "error_0" };
            yield Elkaisar.DB.AUpdate("army_f = army_f + ? ", "city", "id_city = ?  AND id_player = ?", [1000 * amount, idCity, this.idPlayer]);
            Elkaisar.Lib.LSaveState.saveCityState(idCity);
            Elkaisar.Lib.LSaveState.foodOutState(idCity);
            return {
                "state": "ok",
                "City": (yield Elkaisar.DB.ASelectFrom("*", "city", "id_city = ?", [idCity]))[0]
            };
        });
    }
}
module.exports = AItemArmyPack;
