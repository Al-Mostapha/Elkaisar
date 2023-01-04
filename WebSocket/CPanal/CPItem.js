class CPItem {

    Parm;
    idPlayer;
    constructor(Url) {
        this.Parm = Url;
    }

    async saveItemProp() {

        const ItemPrice = Elkaisar.Base.validateId(this.Parm["ItemPrice"]);
        const ItemStartingAmount = Elkaisar.Base.validateId(this.Parm["ItemStartingAmount"]);
        const ItemSelectPlace = Elkaisar.Base.validateGameNames(this.Parm["ItemSelectPlace"]);
        const ItemMaxPrize = Elkaisar.Base.validateId(this.Parm["ItemMaxPrize"]);
        const idItem = Elkaisar.Base.validateGameNames(this.Parm["idItem"]);
        await Elkaisar.DB.AUpdate(
            "gold = ?, tab = ?, startingAmount = ?, prizeLimit = ?",
            "item", "id_item = ?", [
                ItemPrice,
                ItemSelectPlace,
                ItemStartingAmount,
                ItemMaxPrize,
                idItem
            ]);
            Elkaisar.Lib.LItem.getItemData();
    }

}

module.exports = CPItem;