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
class ATeamInvReq {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    SendPlayerInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const TeamMember = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [this.idPlayer]);
            const idPlayerToInvite = Elkaisar.Base.validateId(this.Parm.idPlayer);
            const playerToInvTeam = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [idPlayerToInvite]);
            if (playerToInvTeam.length)
                return { "state": "error_0" };
            if (!TeamMember.length)
                return { "state": "error_1" };
            if (TeamMember[0]["rank"] < Elkaisar.Config.TEAM_R_SUPERVISOR)
                return { "state": "error_2" };
            Elkaisar.DB.Insert("id_team = ?, id_player = ?, inv_by = ?, time_stamp = ?", "team", [TeamMember[0].id_team, idPlayerToInvite, this.idPlayer, Date.now() / 1000]);
            let TeamPlayers = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [TeamMember[0].id_team]);
            TeamPlayers.push({ id_player: idPlayerToInvite });
            const Msg = JSON.stringify({
                classPath: "Team.TeamInvSent",
                idPlayerToInvite: idPlayerToInvite,
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayerToInvite]))[0].name,
                InvBy: TeamMember[0].id_player,
                InvByName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [TeamMember[0].id_player]))[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [TeamMember[0].id_team]))[0].name,
            });
            TeamPlayers.forEach(function (Player) {
                Elkaisar.Base.sendMsgToPlayer(Player.id_player, Msg);
            });
            return {
                "state": "ok",
            };
        });
    }
    rejectTeamInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const idTeam = Elkaisar.Base.validateId(this.Parm.idTeam);
            const PlayerToInvite = yield Elkaisar.DB.ASelectFrom("player.name AS PlayerName", "player", "id_player = ?", [this.idPlayer]);
            const Team = yield Elkaisar.DB.ASelectFrom("*", "team", "id_team = ?", [idTeam]);
            yield Elkaisar.DB.ADelete("team_inv", "id_player = ? AND id_team = ?", [this.idPlayer, idTeam]);
            var TeamMem = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [idTeam]);
            TeamMem.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Team.PlayerInvRejected",
                idPlayer: this.idPlayer,
                PlayerName: PlayerToInvite[0].PlayerName,
                idTeam: idTeam,
                TeamName: Team[0].name
            });
            TeamMem.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok",
                TeamInv: yield Elkaisar.DB.ASelectFrom("*", "team_inv JOIN team ON team.id_team = team_inv.id_team", "team_inv.id_player = ?", [this.idPlayer])
            };
        });
    }
    acceptTeamInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const idTeam = Elkaisar.Base.validateId(this.Parm.idTeam);
            const PlayerToInvite = yield Elkaisar.DB.ASelectFrom("player.name AS PlayerName", "player", "id_player = ?", [this.idPlayer]);
            const Team = yield Elkaisar.DB.ASelectFrom("*", "team", "id_team = ?", [idTeam]);
            const Inv = yield Elkaisar.DB.ASelectFrom("*", "team_inv", "id_team = ? AND id_player = ?", [idTeam, this.idPlayer]);
            if (!Inv.length)
                return { state: "error_0" };
            yield Elkaisar.Lib.ALTeam.addPlayer(idTeam, this.idPlayer, Elkaisar.Config.TEAM_R_MEMBER);
            var TeamMem = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [idTeam]);
            const Msg = JSON.stringify({
                classPath: "Team.PlayerAcceptInv",
                idPlayer: this.idPlayer,
                PlayerName: PlayerToInvite[0].PlayerName,
                idTeam: idTeam,
                TeamName: Team[0].name
            });
            TeamMem.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    cancelTeamInv() {
        return __awaiter(this, void 0, void 0, function* () {
            const idPlayer = Elkaisar.Base.validateId(this.Parm.idPlayer);
            const TeamMem = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [this.idPlayer]);
            const Team = yield Elkaisar.DB.ASelectFrom("*", "team", "id_team = ?", [TeamMem[0].id_team]);
            const Inv = yield Elkaisar.DB.ASelectFrom("*", "team_inv", "id_team = ? AND id_player = ?", [TeamMem[0].id_team, idPlayer]);
            if (!Inv.length)
                return { state: "error_0" };
            if (!TeamMem.length)
                return { state: "error_1" };
            if (TeamMem.length > Elkaisar.Config.TEAM_R_LEADER)
                return { state: "error_2" };
            Elkaisar.DB.Delete("team_inv", "id_team = ? AND id_player = ?", [TeamMem[0].id_team, idPlayer]);
            var TeamMems = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [TeamMem[0].id_team]);
            TeamMems.push({ id_player: idPlayer });
            const Msg = JSON.stringify({
                classPath: "Team.TeamInvCanceled",
                idPlayer: idPlayer,
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [idPlayer]))[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [Team[0].id_team]))[0].name
            });
            TeamMems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    sendTeamJoinRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const idTeam = Elkaisar.Base.validateId(this.Parm.idTeam);
            const TeamMember = yield Elkaisar.DB.ASelectFrom("COUNT(*) AS c", "team_member", "id_player = ?", [this.idPlayer]);
            const Player = yield Elkaisar.DB.ASelectFrom("*", "player", "id_player = ?", [this.idPlayer]);
            if (TeamMember[0]["c"] > 0)
                return { "state": "error_0" };
            yield Elkaisar.DB.ADelete("team_req", "id_player = ?", [this.idPlayer]);
            yield Elkaisar.DB.AInsert("id_player = ?, id_team = ?, time_stamp = ?", "team_req", [this.idPlayer, idTeam, Date.now() / 1000]);
            let TeamMems = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [idTeam]);
            TeamMems.push({ id_player: Player[0].id_player });
            const Msg = JSON.stringify({
                classPath: "Team.TeamReqSent",
                idPlayerReq: Player[0].id_player,
                PlayerName: Player[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [idTeam]))[0].name
            });
            TeamMems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    cancelTeamJoinReq() {
        return __awaiter(this, void 0, void 0, function* () {
            const Team = yield Elkaisar.DB.ASelectFrom("*", "team_req", "id_player = ?", [this.idPlayer]);
            if (!Team.length)
                return { state: "error_0" };
            let TeamMems = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [Team[0].id_team]);
            TeamMems.push({ id_player: this.idPlayer });
            const Msg = JSON.stringify({
                classPath: "Team.TeamReqCanceled",
                idPlayerReq: this.idPlayer,
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [Team[0].id_team]))[0].name
            });
            TeamMems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            yield Elkaisar.DB.ADelete("team_req", "id_player = ?", [this.idPlayer]);
            return {
                state: "ok"
            };
        });
    }
    acceptTeamJoinReq() {
        return __awaiter(this, void 0, void 0, function* () {
            const idPlayer = Elkaisar.Base.validateId(this.Parm.idPlayer);
            const Leader = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [this.idPlayer]);
            const Req = yield Elkaisar.DB.ASelectFrom("*", "team_req", "id_team = ? AND id_player = ?", [Leader[0].id_team, idPlayer]);
            const PlayerTeam = Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [idPlayer]);
            if (!Leader.length)
                return { state: "error_0" };
            if (!Req.length)
                return { state: "error_1" };
            if (Leader[0].rank < Elkaisar.Config.TEAM_R_DEPUTY_2)
                return { state: "error_2" };
            if (PlayerTeam.length > 0)
                return { state: "error_3" };
            if (Req[0].id_team != Leader[0].id_team)
                return { state: "error_4" };
            Elkaisar.Lib.ALTeam.addPlayer(Leader[0].id_team, idPlayer, Elkaisar.Config.TEAM_R_MEMBER);
            let TeamMems = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [Leader[0].id_team]);
            const Msg = JSON.stringify({
                classPath: "Team.TeamReqAccepted",
                idPlayerReq: this.idPlayer,
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [Leader[0].id_team]))[0].name
            });
            TeamMems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
    rejectTeamJoinReq() {
        return __awaiter(this, void 0, void 0, function* () {
            const idPlayer = Elkaisar.Base.validateId(this.Parm.idPlayer);
            const Leader = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [this.idPlayer]);
            const Req = yield Elkaisar.DB.ASelectFrom("*", "team_req", "id_team = ? AND id_player = ?", [Leader[0].id_team, idPlayer]);
            const PlayerTeam = Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [idPlayer]);
            if (!Leader.length)
                return { state: "error_0" };
            if (!Req.length)
                return { state: "error_1" };
            if (Leader[0].rank < Elkaisar.Config.TEAM_R_DEPUTY_2)
                return { state: "error_2" };
            if (PlayerTeam.length > 0)
                return { state: "error_3" };
            if (Req[0].id_team != Leader[0].id_team)
                return { state: "error_4" };
            Elkaisar.DB.Delete("team_req", "id_team = ? AND id_player = ?", [Leader[0].id_team, idPlayer]);
            let TeamMems = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [Leader[0].id_team]);
            TeamMems.push({ id_player: idPlayer });
            const Msg = JSON.stringify({
                classPath: "Team.TeamReqRejected",
                idPlayerReq: this.idPlayer,
                PlayerName: (yield Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [this.idPlayer]))[0].name,
                TeamName: (yield Elkaisar.DB.ASelectFrom("name", "team", "id_team = ?", [Leader[0].id_team]))[0].name
            });
            TeamMems.forEach(function (P) {
                Elkaisar.Base.sendMsgToPlayer(P.id_player, Msg);
            });
            return {
                state: "ok"
            };
        });
    }
}
module.exports = ATeamInvReq;
