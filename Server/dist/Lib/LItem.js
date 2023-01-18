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
class LItem {
    static getItemData(callBack) {
        Elkaisar.Base.Request.getReq({
            server: Elkaisar.CONST.SERVER_ID
        }, `${Elkaisar.CONST.BASE_URL}/js/json/ItemLang/ar.json`, function (data) {
            LItem.ItemList = JSON.parse(data);
            Elkaisar.DB.SelectFrom("*", "item", "1", [], function (Items) {
                Items.forEach(function (OneItem) {
                    if (LItem.ItemList[OneItem.id_item])
                        LItem.ItemList[OneItem.id_item].gold = OneItem.gold;
                });
            });
            console.log("Item Fetched");
            if (callBack)
                callBack();
        });
    }
    static getEquipData(callBack) {
        Elkaisar.Base.Request.getReq({
            server: Elkaisar.CONST.SERVER_ID
        }, `${Elkaisar.CONST.BASE_URL}/js/json/equipment/ar.json`, function (data) {
            LItem.EquipList = JSON.parse(data);
            if (callBack)
                callBack();
        });
    }
    static addItem(idPlayer, idItem, amount = 1) {
        Elkaisar.DB.Update("amount = amount + ?", "player_item", "id_player = ? AND id_item = ?", [amount, idPlayer, idItem]);
    }
    static addEquip(idPlayer, idEquip, amount = 1) {
        const EP = idEquip.split("_");
        for (var iii = 0; iii < amount; iii++) {
            Elkaisar.DB.Insert("id_player = ?, type = ?, part = ?,  lvl = ?", "equip", [idPlayer, EP[0], EP[1], EP[2]]);
        }
    }
    static isEnough(idPlayer, idItem, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount <= 0)
                return false;
            const Item = yield Elkaisar.DB.ASelectFrom("*", "player_item", "id_player = ? AND id_item = ?", [idPlayer, idItem]);
            if (!Item.length)
                return false;
            if (Item[0].amount < amount)
                return false;
            if (Item[0].amount >= amount)
                return true;
        });
    }
    static useItem(idPlayer, idItem, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount <= 0)
                return false;
            const Ret = yield Elkaisar.DB.AUpdate("amount = amount - ?", "player_item", "id_player = ? AND id_item = ? AND amount >= ?", [amount, idPlayer, idItem, amount]);
            if (Ret.affectedRows == 1)
                return true;
            return false;
        });
    }
    static offerSent(idPlayer, idOffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const Offer = yield Elkaisar.DB.ASelectFrom("*", "server_offer", "id_offer = ?", [idOffer]);
            if (!Offer.length)
                return { state: "error_0" };
            const OfferPrize = Elkaisar.Base.isJson(Offer[0]["offer"]);
            if (!OfferPrize)
                return { state: "error_1" };
            var List = ``;
            OfferPrize.forEach(function (Prize) {
                if (Prize.type == "matrial") {
                    let Item = Elkaisar.Lib.LItem.ItemList[Prize.matrial];
                    List += `<li style="width: 12.5%;">
                            <div class="image"><img src="${Item.image}"></div>
                            <div class="amount stroke">${Prize.amount} X</div>
                        </li>`;
                }
                else if (Prize.type == "equip") {
                    let Equip = Elkaisar.Lib.LItem.EquipList[Prize.idEquip];
                    List += `<li style="width: 12.5%;">
                            <div class="image"><img src="${Equip.image}"></div>
                            <div class="amount stroke">${Prize.amount} X</div>
                        </li>`;
                }
            });
            List += `<li style="width: 12.5%;">
                            <div class="image"><img src="images/icons/resource/gold.png" style="width: 31px;margin: auto;display: block;margin-top: 10px;padding-bottom: 4px;"></div>
                            <div class="amount stroke">${Offer[0].gold} X</div>
                        </li>`;
            Elkaisar.DB.Insert(`id_to = ${idPlayer}, head = 'وصول عرض شحن', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none;margin: auto;width: 100%;"><p style="margin: 0px;text-align: center;font-size: 16px;font-weight: bold;">وصول عرض شحن (${Offer[0]["offer_name"]})</p><ul class="matrial-list">${List}</ul></div>`]);
        });
    }
}
LItem.ItemList = {};
LItem.EquipList = {};
LItem.getItemData();
LItem.getEquipData();
module.exports = LItem;
