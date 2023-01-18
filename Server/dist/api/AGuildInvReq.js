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
class AGuildInvReq {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    sendGuildJoinInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const GuildMember = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            const idPlayerToInvite = Elkaisar.Base.validateId(this.Parm["idPlayerToInvite"]);
            const playerToInvGuild = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayerToInvite]);
            if (playerToInvGuild.length)
                return { "state": "error_0" };
            if (!GuildMember.length)
                return { "state": "error_1" };
            if (GuildMember[0]["rank"] < Elkaisar.Config.GUILD_R_SUPERVISOR)
                return { "state": "error_2" };
            Elkaisar.DB.Insert("id_guild = ?, id_player = ?, inv_by = ?, time_stamp = ?", "guild_inv", [GuildMember[0]["id_guild"], idPlayerToInvite, this.idPlayer, Date.now() / 1000]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [GuildMember[0].id_guild]);
            Mems.push({ id_player: playerToInvGuild });
            const Msg = JSON.stringify({
                classPath: "Guild.GuildInvSent",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayerToInvite]))[0].name,
                InvByName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [GuildMember[0].id_guild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    rejectGuildInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
            Elkaisar.DB.Delete("guild_inv", "id_guild = ? AND id_player = ?", [idGuild, this.idPlayer]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [idGuild]);
            Mems.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Guild.PlayerInvRejected",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [idGuild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    acceptGuildInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
            const inv = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_inv", "id_player = ? AND id_guild = ?", [this.idPlayer, idGuild]);
            const playerGuild = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            if (!inv.length)
                return { "state": "error_0" };
            if (playerGuild.length > 0)
                return { "state": "error_1" };
            Elkaisar.Lib.ALGuild.addPlayer(idGuild, this.idPlayer, Elkaisar.Config.GUILD_R_MEMBER);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [idGuild]);
            Mems.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Guild.PlayerInvAccepted",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [idGuild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
    cancelGuildInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const GuildMember = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            const idPlayerToInvite = Elkaisar.Base.validateId(this.Parm["idPlayerToInvite"]);
            if (!GuildMember.length)
                return { "state": "error_0" };
            if (GuildMember[0]["rank"] < Elkaisar.Config.GUILD_R_SUPERVISOR)
                return { "state": "error_1" };
            Elkaisar.DB.Delete("guild_inv", "id_player = ? AND id_guild = ?", [idPlayerToInvite, GuildMember[0]["id_guild"]]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [GuildMember[0].id_guild]);
            Mems.push({ id_player: idPlayerToInvite });
            const Msg = JSON.stringify({
                classPath: "Guild.PlayerInvCanceled",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayerToInvite]))[0].name,
                CancelledBy: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [GuildMember[0].id_guild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
    sendGuildRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
            const GuildMember = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            if (GuildMember.length > 0)
                return { "state": "error_0" };
            yield Elkaisar.DB.ADelete("guild_req", "id_player = ?", [this.idPlayer]);
            Elkaisar.DB.Insert("id_player = ?, id_guild = ?, time_stamp = ?", "guild_req", [this.idPlayer, idGuild, Date.now() / 1000]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [idGuild]);
            Mems.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Guild.joinReqSent",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [idGuild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
    cancelGuildRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const idGuild = Elkaisar.Base.validateId(this.Parm["idGuild"]);
            Elkaisar.DB.Delete("guild_req", "id_player = ?", [this.idPlayer]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [idGuild]);
            Mems.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Guild.joinReqCanceled",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [idGuild]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
    acceptGuildReq() {
        return __awaiter(this, void 0, void 0, function* () {
            const GuildMember = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            const idPlayerToAccept = Elkaisar.Base.validateId(this.Parm["idPlayerToAccept"]);
            const playerToJoinGuild = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayerToAccept]);
            const Req = yield Elkaisar.DB.ASelectFrom("*", "guild_req", "id_guild = ? AND id_player = ?", [GuildMember[0].id_guild, idPlayerToAccept]);
            if (playerToJoinGuild.length)
                return { "state": "error_0" };
            if (!GuildMember.length)
                return { "state": "error_1" };
            if (GuildMember[0]["rank"] < Elkaisar.Config.GUILD_R_SUPERVISOR)
                return { "state": "error_2" };
            if (Req.length <= 0)
                return { state: "error_3" };
            Elkaisar.Lib.ALGuild.addPlayer(GuildMember[0].id_guild, idPlayerToAccept, Elkaisar.Config.GUILD_R_MEMBER);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [GuildMember[0].id_guild]);
            const Msg = JSON.stringify({
                classPath: "Guild.joinReqAccepted",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayerToAccept]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [GuildMember[0].id_guild]))[0].name,
                AcceptBy: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
    rejectGuildJoinReq() {
        return __awaiter(this, void 0, void 0, function* () {
            const GuildMember = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            const idPlayerToAccept = Elkaisar.Base.validateId(this.Parm["idPlayerToAccept"]);
            const playerToJoinGuild = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [idPlayerToAccept]);
            const Req = Elkaisar.DB.ASelectFrom("*", "guild_req", "id_guild = ? AND id_player = ?", [GuildMember[0].id_guild, idPlayerToAccept]);
            if (playerToJoinGuild.length)
                return { "state": "error_0" };
            if (!GuildMember.length)
                return { "state": "error_1" };
            if (GuildMember[0]["rank"] < Elkaisar.Config.GUILD_R_SUPERVISOR)
                return { "state": "error_2" };
            if (Req.length <= 0)
                return { state: "error_3" };
            Elkaisar.DB.Delete("guild_req", "id_player = ? AND id_guild = ?", [idPlayerToAccept, GuildMember[0]["id_guild"]]);
            var Mems = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [GuildMember[0]["id_guild"]]);
            Mems.push({ id_player: playerToJoinGuild });
            const Msg = JSON.stringify({
                classPath: "Guild.joinReqRejected",
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayerToAccept]))[0].name,
                GuildName: (yield Elkaisar.DB.ASelectFrom("name", "guild", "id_guild = ?", [GuildMember[0]["id_guild"]]))[0].name,
                RejectedBy: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
            });
            Mems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return { state: "ok" };
        });
    }
}
module.exports = AGuildInvReq;
