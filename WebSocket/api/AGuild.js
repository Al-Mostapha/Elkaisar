class AGuild {

    Parm;
    idPlayer;
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }

    async changeGuildName() {

        const idPlayer = Elkaisar.Base.validateId(this.Parm["idPlayer"]);
        const slog_top = Elkaisar.Base.validateId(this.Parm["slog_top"]);
        const slog_cnt = Elkaisar.Base.validateId(this.Parm["slog_cnt"]);
        const slog_btm = Elkaisar.Base.validateId(this.Parm["slog_btm"]);
        const newGuildName = Elkaisar.Base.validatePlayerWord(this.Parm["newGuildName"]).trim();

        const playerGuild = await Elkaisar.DB.ASelectFrom("guild_member.*, player.name AS PlayerName",
                "guild_member JOIN player ON player.id_player = guild_member.id_player", "guild_member.id_player = ?", [this.idPlayer]);
        if (!playerGuild)
            return {"state": "error_0"};
        if (playerGuild[0].rank < Elkaisar.Config.GUILD_R_DEPUTY_2)
            return {"state": "error_1"};
        if (newGuildName.length > 15)
            return {"state": "error_2"};

        if (!(await Elkaisar.Lib.LItem.isEnough(this.idPlayer, "family_slogan", 1)))
            return {"state": "error_3"};

        Elkaisar.Lib.LItem.useItem(this.idPlayer, "family_slogan", 1);
        const OldGuildName = await Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [playerGuild[0].id_guild]);
        Elkaisar.DB.AUpdate("slog_top = ? , slog_cnt = ? ,slog_btm = ?, name = ?", "guild",
                "id_guild = ?", [slog_top, slog_cnt, slog_btm, newGuildName, playerGuild[0].id_guild]);
        if (OldGuildName[0].name != newGuildName) {
            var msg = JSON.stringify({
                "classPath": "Guild.GuildNameChanged",
                "OldName": OldGuildName[0].name,
                "NewName": newGuildName,
                "ChangeBy": playerGuild[0].PlayerName,
                "idGuild": playerGuild[0].id_guild
            });
            Elkaisar.Base.broadcast(msg);
        }
        return {"state": "ok"};
    }

    async getGuildData(){
      const idGuild = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
      if (!idGuild.length) return {"state": "noGuild"};
      return {
        "state": "ok",
        "Guild": await Elkaisar.Lib.LGuild.getGuildData(idGuild[0]["id_guild"])
      }
    }

}
module.exports = AGuild;