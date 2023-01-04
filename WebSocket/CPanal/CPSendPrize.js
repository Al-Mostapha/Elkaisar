class CPSendPrize {

    Parm;
    idPlayer;
    constructor(Url) {
        this.Parm = Url;
    }


    async sendPrizeToGuild() {
        if (this.Parm.DistBy == "Manually") {
            return this.sendManuallyDistForGuild();
        } else {
            return this.sendEquallyDistForGuild();
        }


    }

    async sendEquallyDistForGuild() {

        const idGuild = Elkaisar.Base.validateId(this.Parm.idGuild);
        const Prizes = Elkaisar.Base.validateJson(this.Parm.Prizes);

        const PrizeList = JSON.parse(Prizes);
        const GuildMember = await Elkaisar.DB.ASelectFrom("*", "guild_member", "id_guild = ?", [idGuild]);
        const Guild = await Elkaisar.DB.ASelectFrom("*", "guild", "id_guild = ?", [idGuild]);

        const JsonStrMsg = JSON.stringify({
            classPath: "Guild.PrizeSent",
            GuildName : Guild[0].name
        });
        GuildMember.forEach(function (Player, PlayerIndex) {
            PrizeList.forEach(function (Prize, Index) {
                if (Prize.type == "matrial")
                    Elkaisar.Lib.LItem.addItem(Player.id_player, Prize.matrial, Prize.amount);
                else if (Prize.type == "equip") {
                    Elkaisar.Lib.LItem.addEquip(Player.id_player, Prize.idEquip, Prize.amount)
                }
            });

            Elkaisar.Base.broadcast(JsonStrMsg)

        });


    }
    async sendManuallyDistForGuild() {
        const idGuild = Elkaisar.Base.validateId(this.Parm.idGuild);
        const Prizes = Elkaisar.Base.validateJson(this.Parm.Prizes);

        const PrizeList = JSON.parse(Prizes);
        const GuildMember = await Elkaisar.DB.ASelectFrom("*", "guild_member", "id_guild = ?", [idGuild]);
        const Guild = await Elkaisar.DB.ASelectFrom("*", "guild", "id_guild = ?", [idGuild]);

        const JsonStrMsg = JSON.stringify({
            classPath: "Guild.PrizeSent",
            GuildName : Guild[0].name
        });
        GuildMember.forEach(function (Player, PlayerIndex) {
            PrizeList.forEach(function (Prize, Index) {

                if (Math.floor(Prize.amount * Player.prize_share / 100) <= 0)
                    return;
                if (Prize.type == "matrial")
                    Elkaisar.Lib.LItem.addItem(Player.id_player, Prize.matrial, Math.floor(Prize.amount * Player.prize_share / 100));
                else if (Prize.type == "equip") {
                    Elkaisar.Lib.LItem.addEquip(Player.id_player, Prize.idEquip, Math.floor(Prize.amount * Player.prize_share / 100))
                }
            });

            Elkaisar.Base.broadcast(JsonStrMsg)

        });


    }

    async searchByGuildName() {

        return await Elkaisar.DB.ASelectFrom("*", "guild", `name LIKE '%${this.Parm.seg}%' ORDER BY prestige DESC`);

    }
    
    async sendPlayerOffer(){
        
        const idUser = Elkaisar.Base.validateId(this.Parm.idPlayer);
        const idOffer  = Elkaisar.Base.validateId(this.Parm.idOffer);
        const player = await Elkaisar.DB.ASelectFrom("id_player", "player", "id_user = ?", [idUser]);
        if(!player.length)
            return;
        const idPlayer = player[0].id_player;
        
        const Offer = await Elkaisar.DB.ASelectFrom("*", "server_offer", "id_offer = ?", [idOffer]);
        
        if(!Offer.length)
            return {state : "error_0"};
        
        const OfferPrize = Elkaisar.Base.isJson(Offer[0]["offer"]);
        if(!OfferPrize)
            return {state : "error_1"};
        
        OfferPrize.forEach(function (Prize){
            if (Prize.type == "matrial")
                Elkaisar.Lib.LItem.addItem(idPlayer, Prize.matrial, Prize.amount);
            else if (Prize.type == "equip") {
                Elkaisar.Lib.LItem.addEquip(idPlayer, Prize.idEquip, Prize.amount);
            }
        });
        Elkaisar.Lib.LPlayer.givePlayerGold(idPlayer, Offer[0].gold);
        Elkaisar.Lib.LItem.offerSent(idPlayer, idOffer);
        Elkaisar.DB.Insert("id_player = ?, id_offer = ?", "server_offer_taken", [idPlayer, idOffer]);
        
        return {state : "ok"};
    }

    async offerSent(){
        const idPlayer = Elkaisar.Base.validateId(this.Parm.idPlayer);
        const idOffer = Elkaisar.Base.validateId(this.Parm.idOffer);
        Elkaisar.Lib.LItem.offerSent(idPlayer, idOffer);
        return {"state" : "ok", "C" : "s"};
    }
}

module.exports = CPSendPrize;