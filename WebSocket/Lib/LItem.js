
class LItem {
    static ItemList = {};
    static EquipList = {};

    static getItemData(callBack) {
        Elkaisar.Base.Request.getReq(
                {
                    server: Elkaisar.CONST.SERVER_ID
                },
                `${Elkaisar.CONST.BASE_URL}/js/json/ItemLang/ar.json`,
                function (data) {
                    LItem.ItemList = JSON.parse(data);
                    Elkaisar.DB.SelectFrom("*", "item", "1", [], function (Items) {
                        Items.forEach(function (OneItem) {
                            if (LItem.ItemList[OneItem.id_item])
                                LItem.ItemList[OneItem.id_item].gold = OneItem.gold;
                        });
                    })
                    if (callBack)
                        callBack();
                }
        );
    }
    static getEquipData(callBack) {

        Elkaisar.Base.Request.getReq(
                {
                    server: Elkaisar.CONST.SERVER_ID
                },
                `${Elkaisar.CONST.BASE_URL}/js/json/equipment/ar.json`,
                function (data) {
                    LItem.EquipList = JSON.parse(data);
                    if (callBack)
                        callBack();
                }
        );


    }

    static addItem(idPlayer, idItem, amount = 1) {
        Elkaisar.DB.Update(
                "amount = amount + ?",
                "player_item",
                "id_player = ? AND id_item = ?", [amount, idPlayer, idItem]);
    }

    static addEquip(idPlayer, idEquip, amount = 1) {
        const EP = idEquip.split("_");
        for (var iii = 0; iii < amount; iii++) {
            Elkaisar.DB.Insert("id_player = ?, type = ?, part = ?,  lvl = ?", "equip", [idPlayer, EP[0], EP[1], EP[2]]);

    }
    }

    static async isEnough(idPlayer, idItem, amount) {


        if (amount <= 0)
            return false;

        const Item = await Elkaisar.DB.ASelectFrom("*", "player_item", "id_player = ? AND id_item = ?", [idPlayer, idItem]);

        if (!Item.length)
            return false;
        if (Item[0].amount < amount)
            return false;
        if (Item[0].amount >= amount)
            return true;
    }

    static async useItem(idPlayer, idItem, amount) {
        if (amount <= 0)
            return false;
        const Ret = await Elkaisar.DB.AUpdate("amount = amount - ?", "player_item", "id_player = ? AND id_item = ? AND amount >= ?", [amount, idPlayer, idItem, amount]);
        if (Ret.affectedRows == 1)
            return true;
        return  false;
    }

    static async offerSent(idPlayer, idOffer) {

        const Offer = await Elkaisar.DB.ASelectFrom("*", "server_offer", "id_offer = ?", [idOffer]);

        if (!Offer.length)
            return {state: "error_0"};

        const OfferPrize = Elkaisar.Base.isJson(Offer[0]["offer"]);
        if (!OfferPrize)
            return {state: "error_1"};

        var List = ``;
        OfferPrize.forEach(function (Prize) {
            if (Prize.type == "matrial") {
                let Item = Elkaisar.Lib.LItem.ItemList[Prize.matrial];
                List += `<li style="width: 12.5%;">
                            <div class="image"><img src="${Item.image}"></div>
                            <div class="amount stroke">${Prize.amount} X</div>
                        </li>`;


            } else if (Prize.type == "equip") {
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
        Elkaisar.DB.Insert(
                `id_to = ${idPlayer}, head = 'وصول عرض شحن', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff",
                [`<div id="matrial-box-gift" style="border: none; background: none;margin: auto;width: 100%;"><p style="margin: 0px;text-align: center;font-size: 16px;font-weight: bold;">وصول عرض شحن (${Offer[0]["offer_name"]})</p><ul class="matrial-list">${List}</ul></div>`]);



    }

}

LItem.getItemData();
LItem.getEquipData();


module.exports = LItem;