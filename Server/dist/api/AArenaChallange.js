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
class AArenaChallange {
    constructor(idPlayer, Url) {
        this.ArenaHeroList = {};
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    getArenaData() {
        return __awaiter(this, void 0, void 0, function* () {
            const PlayerGuild = yield Elkaisar.DB.ASelectFrom("id_guild", 'guild_member', 'id_player = ?', [this.idPlayer]);
            const PlayerTeam = yield Elkaisar.DB.ASelectFrom("id_team", 'team_member', 'id_player = ?', [this.idPlayer]);
            const ArenaKingData = yield Elkaisar.DB.ASelectFrom("apc.*, player.name AS ArenaName", "arena_player_challange AS apc JOIN player ON player.id_player = apc.id_player", "apc.id_player = ?", [this.idPlayer]);
            var ArenaGuildData = [{}], ArenaTeamData = [{}], GuildHeroList = [], TeamHeroList = [];
            const KingArena = {
                "Arena": ArenaKingData[0],
                "HeroList": yield Elkaisar.DB.ASelectFrom("hero.name AS HeroName, hero.avatar, hero.lvl, hero.id_hero, hero.id_player, player.name AS PlayerName, hero.ultra_p", "arena_player_challange_hero JOIN hero ON arena_player_challange_hero.id_hero = hero.id_hero JOIN player ON player.id_player = ?", "arena_player_challange_hero.id_player = ? ORDER BY arena_player_challange_hero.ord ASC", [this.idPlayer, this.idPlayer])
            };
            if (PlayerGuild.length) {
                ArenaGuildData = yield Elkaisar.DB.ASelectFrom("agc.*, guild.*, guild.name AS ArenaName", "arena_guild_challange AS agc JOIN guild ON guild.id_guild = agc.id_guild", "agc.id_guild = ?", [PlayerGuild[0].id_guild]);
                GuildHeroList = yield Elkaisar.DB.ASelectFrom("hero.name AS HeroName, hero.avatar, hero.lvl, hero.id_hero, hero.id_player, player.name AS PlayerName, hero.ultra_p", "arena_guild_challange_hero JOIN hero ON arena_guild_challange_hero.id_hero = hero.id_hero JOIN player ON player.id_player = hero.id_player", "arena_guild_challange_hero.id_guild = ? ORDER BY arena_guild_challange_hero.ord ASC", [PlayerGuild[0].id_guild]);
            }
            if (PlayerTeam.length) {
                ArenaTeamData = yield Elkaisar.DB.ASelectFrom("atc.*, team.*, team.name AS ArenaName", "arena_team_challange AS atc JOIN team ON team.id_team = atc.id_team", "atc.id_team = ?", [PlayerTeam[0].id_team]);
                TeamHeroList = yield Elkaisar.DB.ASelectFrom("hero.name AS HeroName, hero.avatar, hero.lvl, hero.id_hero, hero.id_player, player.name AS PlayerName, hero.ultra_p", "arena_team_challange_hero JOIN hero ON arena_team_challange_hero.id_hero = hero.id_hero JOIN player ON player.id_player = hero.id_player", "arena_team_challange_hero.id_team = ? ORDER BY arena_team_challange_hero.ord ASC", [PlayerTeam[0].id_team]);
            }
            return {
                King: KingArena,
                Team: {
                    "Arena": ArenaTeamData[0],
                    "HeroList": TeamHeroList
                },
                Guild: {
                    "Arena": ArenaGuildData[0],
                    "HeroList": GuildHeroList
                }
            };
        });
    }
    getFightList() {
        return __awaiter(this, void 0, void 0, function* () {
            const PlayerGuild = yield Elkaisar.DB.ASelectFrom("id_guild", 'guild_member', 'id_player = ?', [this.idPlayer]);
            const PlayerTeam = yield Elkaisar.DB.ASelectFrom("id_team", 'team_member', 'id_player = ?', [this.idPlayer]);
            const ArenaKingData = yield Elkaisar.DB.ASelectFrom("rank", "arena_player_challange", "id_player = ?", [this.idPlayer]);
            var ArenaKingFightList = [], ArenaTeamFightList = [], ArenaGuildFightList = [];
            if (ArenaKingData.length) {
                ArenaKingFightList = yield Elkaisar.DB.ASelectFrom(` player.id_player AS idPlayer, player.name AS PlayerName, guild.id_guild AS idGuild,
                  guild.name AS GuildName, guild.slog_top, guild.slog_cnt, guild.slog_btm, player.porm,
                  arena_player_challange.rank, arena_player_challange.lvl AS arenaLvl`, ` arena_player_challange JOIN player ON player.id_player = arena_player_challange.id_player 
                    LEFT JOIN guild ON guild.id_guild = player.id_guild`, ` arena_player_challange.rank < ? ORDER BY rank DESC LIMIT 10`, [Math.max(ArenaKingData[0]["rank"], 11)]);
            }
            if (PlayerTeam.length) {
                const ArenaTeamData = yield Elkaisar.DB.ASelectFrom("rank", "arena_team_challange", "id_team = ?", [PlayerTeam[0].id_team]);
                if (ArenaTeamData.length)
                    ArenaTeamFightList = yield Elkaisar.DB.ASelectFrom(` player.id_player AS idPlayer, player.name AS LeaderName, team.id_team AS idTeam, team.mem_num,
                        team.name AS TeamName, team.slog_top, team.slog_cnt, team.slog_btm,
                        arena_team_challange.rank, arena_team_challange.lvl AS arenaLvl`, ` arena_team_challange JOIN team ON team.id_team = arena_team_challange.id_team JOIN player ON player.id_player = team.id_leader `, ` arena_team_challange.rank < ? ORDER BY rank DESC LIMIT 10`, [Math.max(ArenaTeamData[0]["rank"], 11)]);
            }
            if (PlayerGuild.length) {
                const ArenaGuildData = yield Elkaisar.DB.ASelectFrom("*", "arena_guild_challange", "id_guild = ?", [PlayerGuild[0].id_guild]);
                if (ArenaGuildData.length)
                    ArenaGuildFightList = yield Elkaisar.DB.ASelectFrom(` player.id_player AS idPlayer, player.name AS LeaderName, guild.id_guild AS idGuild, 
                  guild.name AS GuildName, guild.slog_top, guild.slog_cnt, guild.slog_btm, guild.mem_num,
                  arena_guild_challange.rank, arena_guild_challange.lvl AS arenaLvl`, ` arena_guild_challange JOIN guild ON guild.id_guild = arena_guild_challange.id_guild JOIN player ON player.id_player = guild.id_leader `, ` arena_guild_challange.rank < ? ORDER BY rank DESC LIMIT 10`, [Math.max(ArenaGuildData[0]["rank"], 11)]);
            }
            return {
                King: ArenaKingFightList,
                Team: ArenaTeamFightList,
                Guild: ArenaGuildFightList
            };
        });
    }
    fightSomeOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const idPlayerToFight = Elkaisar.Base.validateId(this.Parm["idPlayerToFight"]);
            const Arena = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl, attempt", "arena_player_challange", "id_player = ?", [this.idPlayer]);
            const ArenaToFight = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl", "arena_player_challange", "id_player = ?", [idPlayerToFight]);
            const AttackHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_player_challange_hero JOIN hero ON hero.id_hero = arena_player_challange_hero.id_hero", "arena_player_challange_hero.id_player = ? ORDER BY arena_player_challange_hero.ord ASC", [this.idPlayer]);
            const DefenceHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_player_challange_hero JOIN hero ON hero.id_hero = arena_player_challange_hero.id_hero", "arena_player_challange_hero.id_player = ? ORDER BY arena_player_challange_hero.ord ASC", [idPlayerToFight]);
            const now = Date.now() / 1000;
            const idPlayer = this.idPlayer;
            if (!Arena.length)
                return { "state": "error_0" };
            if (ArenaToFight[0]["rank"] < Arena[0]["rank"] - 10)
                return { "state": "error_1" };
            if (ArenaToFight[0]["rank"] > Math.max(Arena[0]["rank"], 11))
                return { "state": "error_2" };
            if (this.idPlayer == idPlayerToFight)
                return { "state": "error_2" };
            if (AttackHeros.length <= 0)
                return { "state": "error_3" };
            if (AttackHeros.length > Arena[0]["lvl"])
                return { "state": "error_3" };
            if (Arena[0]["lastAttackTime"] + 10 * 60 > Date.now() / 1000)
                return { "state": "error_4" };
            if (Arena[0]["attempt"] <= 0)
                return { "state": "error_5" };
            yield Elkaisar.DB.AUpdate("attempt = attempt - 1, lastAttackTime = ?", "arena_player_challange", "id_player = ?", [Date.now() / 1000, this.idPlayer]);
            const CityFrom = yield Elkaisar.DB.ASelectFrom("city.x, city.y", "city JOIN hero ON hero.id_city = city.id_city", "hero.id_hero = ?", [AttackHeros[0]["id_hero"]]);
            const idBattel = yield Elkaisar.DB.AInsert("id_hero = ?, time_start = ?, time_end = ?, x_coord = ?, y_coord = ?, id_player = ?, id_player_def = ?, x_city = ?, y_city = ?, task = ?", "battel", [
                AttackHeros[0]["id_hero"], now, now + 1, 233, 246, this.idPlayer,
                idPlayerToFight, CityFrom[0]["x"], CityFrom[0]["y"], Elkaisar.Config.BATTEL_TASK_CHALLANGE
            ]);
            const Battel = yield Elkaisar.Lib.LBattelUnit.getBattelById(idBattel.insertId);
            Elkaisar.Lib.LBattel.newBattelStarted(Battel);
            AttackHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_ATT, HeroIndex);
            });
            DefenceHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_DEF, HeroIndex);
            });
            return { "state": "ok" };
        });
    }
    fightSomeTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const idTeamToFight = Elkaisar.Base.validateId(this.Parm["idTeamToFight"]);
            const PlayerTeam = yield Elkaisar.DB.ASelectFrom("id_team", "team_member", "id_player = ?", [this.idPlayer]);
            if (!PlayerTeam.length)
                return { state: "error_0" };
            const Arena = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl, attempt", "arena_team_challange", "id_team = ?", [PlayerTeam[0].id_team]);
            const ArenaToFight = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl", "arena_team_challange", "id_team = ?", [idTeamToFight]);
            const AttackHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_team_challange_hero JOIN hero ON hero.id_hero = arena_team_challange_hero.id_hero", "arena_team_challange_hero.id_team = ? ORDER BY arena_team_challange_hero.ord ASC", [PlayerTeam[0].id_team]);
            const DefenceHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_team_challange_hero JOIN hero ON hero.id_hero = arena_team_challange_hero.id_hero", "arena_team_challange_hero.id_team = ? ORDER BY arena_team_challange_hero.ord ASC", [idTeamToFight]);
            const now = Date.now() / 1000;
            const idPlayer = this.idPlayer;
            if (!Arena.length)
                return { "state": "error_0" };
            if (ArenaToFight[0]["rank"] < Arena[0]["rank"] - 10)
                return { "state": "error_1" };
            if (ArenaToFight[0]["rank"] > Math.max(Arena[0]["rank"], 11))
                return { "state": "error_2" };
            if (PlayerTeam[0].id_team == idTeamToFight)
                return { "state": "error_2" };
            if (AttackHeros.length <= 0)
                return { "state": "error_3", "Heros": "AttackHeros" };
            if (AttackHeros.length > Arena[0]["lvl"] * 3)
                return { "state": "error_3", "Hero": "sss" };
            if (Arena[0]["lastAttackTime"] + 10 * 60 > Date.now() / 1000)
                return { "state": "error_4" };
            if (Arena[0]["attempt"] <= 0)
                return { "state": "error_5" };
            yield Elkaisar.DB.AUpdate("attempt = attempt - 1, lastAttackTime = ?", "arena_team_challange", "id_team = ?", [Date.now() / 1000, PlayerTeam[0].id_team]);
            const CityFrom = yield Elkaisar.DB.ASelectFrom("city.x, city.y", "city JOIN hero ON hero.id_city = city.id_city", "hero.id_hero = ?", [AttackHeros[0]["id_hero"]]);
            const idBattel = yield Elkaisar.DB.AInsert("id_hero = ?, time_start = ?, time_end = ?, x_coord = ?, y_coord = ?, id_player = ?, id_player_def = ?, x_city = ?, y_city = ?, task = ?", "battel", [
                AttackHeros[0]["id_hero"], now, now + 1, 360, 196, this.idPlayer,
                idTeamToFight, CityFrom[0]["x"], CityFrom[0]["y"], Elkaisar.Config.BATTEL_TASK_CHALLANGE
            ]);
            const Battel = yield Elkaisar.Lib.LBattelUnit.getBattelById(idBattel.insertId);
            Elkaisar.Lib.LBattel.newBattelStarted(Battel);
            AttackHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_ATT, HeroIndex);
            });
            DefenceHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_DEF, HeroIndex);
            });
            return { "state": "ok" };
        });
    }
    fightSomeGuild() {
        return __awaiter(this, void 0, void 0, function* () {
            const idGuildToFight = Elkaisar.Base.validateId(this.Parm["idGuildToFight"]);
            const PlayerGuild = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
            if (!PlayerGuild.length)
                return { state: "error_0" };
            const Arena = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl, attempt", "arena_guild_challange", "id_guild = ?", [PlayerGuild[0].id_guild]);
            const ArenaToFight = yield Elkaisar.DB.ASelectFrom("lastAttackTime , rank, lvl", "arena_guild_challange", "id_guild = ?", [idGuildToFight]);
            const AttackHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_guild_challange_hero JOIN hero ON hero.id_hero = arena_guild_challange_hero.id_hero", "arena_guild_challange_hero.id_guild = ? ORDER BY arena_guild_challange_hero.ord ASC", [PlayerGuild[0].id_guild]);
            const DefenceHeros = yield Elkaisar.DB.ASelectFrom("hero.id_hero, hero.id_city, hero.id_player", "arena_guild_challange_hero JOIN hero ON hero.id_hero = arena_guild_challange_hero.id_hero", "arena_guild_challange_hero.id_guild = ? ORDER BY arena_guild_challange_hero.ord ASC", [idGuildToFight]);
            const now = Date.now() / 1000;
            const idPlayer = this.idPlayer;
            if (!Arena.length)
                return { "state": "error_0" };
            if (ArenaToFight[0]["rank"] < Arena[0]["rank"] - 10)
                return { "state": "error_1" };
            if (ArenaToFight[0]["rank"] > Math.max(Arena[0]["rank"], 11))
                return { "state": "error_2" };
            if (PlayerGuild[0].id_guild == idGuildToFight)
                return { "state": "error_2" };
            if (AttackHeros.length <= 0)
                return { "state": "error_3" };
            if (AttackHeros.length > Arena[0]["lvl"] * 5)
                return { "state": "error_3" };
            if (Arena[0]["lastAttackTime"] + 10 * 60 > Date.now() / 1000)
                return { "state": "error_4" };
            if (Arena[0]["attempt"] <= 0)
                return { "state": "error_5" };
            yield Elkaisar.DB.AUpdate("attempt = attempt - 1, lastAttackTime = ?", "arena_guild_challange", "id_guild = ?", [Date.now() / 1000, PlayerGuild[0].id_guild]);
            const CityFrom = yield Elkaisar.DB.ASelectFrom("city.x, city.y", "city JOIN hero ON hero.id_city = city.id_city", "hero.id_hero = ?", [AttackHeros[0]["id_hero"]]);
            const idBattel = yield Elkaisar.DB.AInsert("id_hero = ?, time_start = ?, time_end = ?, x_coord = ?, y_coord = ?, id_player = ?, id_player_def = ?, x_city = ?, y_city = ?, task = ?", "battel", [
                AttackHeros[0]["id_hero"], now, now + 1, 406, 317, this.idPlayer,
                idGuildToFight, CityFrom[0]["x"], CityFrom[0]["y"], Elkaisar.Config.BATTEL_TASK_CHALLANGE
            ]);
            const Battel = yield Elkaisar.Lib.LBattelUnit.getBattelById(idBattel.insertId);
            Elkaisar.Lib.LBattel.newBattelStarted(Battel);
            AttackHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_ATT, HeroIndex);
            });
            DefenceHeros.forEach(function (Hero, HeroIndex) {
                Elkaisar.Lib.LBattelUnit.join(idPlayer, Battel, Hero, Elkaisar.Config.BATTEL_SIDE_DEF, HeroIndex);
            });
            return { "state": "ok" };
        });
    }
    saveHeroList() {
        return __awaiter(this, void 0, void 0, function* () {
            const ArenaFor = Elkaisar.Base.validateGameNames(this.Parm.ArenaFor);
            const PlayerTeam = yield Elkaisar.DB.ASelectFrom("id_team", "team_member", "id_player = ?", [this.idPlayer]);
            const PlayerGuild = yield Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
            const ArenaPlayerHero = yield Elkaisar.DB.ASelectFrom("id_hero, 'Arena' AS ArenaFor", "arena_player_challange_hero", "id_player = ?", [this.idPlayer]);
            const ArenaTeamHero = PlayerTeam.length ? yield Elkaisar.DB.ASelectFrom("id_hero, 'ArenaTeam' AS ArenaFor", "arena_team_challange_hero", "id_team = ?", [PlayerTeam[0].id_team]) : [];
            const ArenaGuildHero = PlayerGuild.length ? yield Elkaisar.DB.ASelectFrom("id_hero, 'ArenaGuild' AS ArenaFor", "arena_guild_challange_hero", "id_guild = ?", [PlayerGuild[0].id_guild]) : [];
            const AllHeros = [].concat(ArenaPlayerHero, ArenaTeamHero, ArenaGuildHero);
            var ii = 0;
            for (ii in AllHeros)
                this.ArenaHeroList[AllHeros[ii].id_hero] = AllHeros[ii].ArenaFor;
            this.ArenaFor = ArenaFor;
            if (ArenaFor == "Arena")
                return yield this.saveHeroListForPlayer();
            else if (ArenaFor == "ArenaTeam")
                return yield this.saveHeroListForTeam();
            else if (ArenaFor == "ArenaGuild")
                return yield this.saveHeroListForGuild();
            return {
                "state": "error_3"
            };
        });
    }
    saveHeroListForPlayer() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHeros = Elkaisar.Base.validateGameNames(this.Parm["HeroList"]).split("-");
            const Arena = yield Elkaisar.DB.ASelectFrom("lvl", "arena_player_challange", "id_player = ?", [this.idPlayer]);
            var ord = 0, approved = 0, refused = 0, iii = 0, HeroArmy;
            if (!Arena.length)
                return { "state": "error_0" };
            if (idHeros.length > Arena[0]["lvl"])
                return { "state": "error_1" };
            yield Elkaisar.DB.ADelete("arena_player_challange_hero", "id_player = ?", [this.idPlayer]);
            for (; iii < idHeros.length; iii++) {
                const idHero = Number(idHeros[iii]);
                if (!idHero)
                    return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack() };
                HeroArmy = yield (new Elkaisar.Lib.LHeroArmy()).isCarringArmy(idHero);
                if (HeroArmy == false || HeroArmy.id_player != this.idPlayer) {
                    refused++;
                    continue;
                }
                approved++;
                HeroArmy.ord = ord++;
                yield this.addHeroToArena(HeroArmy, "arena_player_challange_hero");
            }
            return { "state": "ok" };
        });
    }
    saveHeroListForTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHeros = Elkaisar.Base.validateGameNames(this.Parm["HeroList"]).split("-").map(e => Number(e));
            var ord = 0, approved = 0, refused = 0, iii = 0, Arena = [], AllTeamPlayers = {}, HeroArmy;
            const PlayerTeam = yield Elkaisar.DB.ASelectFrom("*", "team_member", "id_player = ?", [this.idPlayer]);
            if (PlayerTeam.length) {
                Arena = yield Elkaisar.DB.ASelectFrom("lvl", "arena_team_challange", "id_team = ?", [PlayerTeam[0].id_team]);
                const AllPlayers = yield Elkaisar.DB.ASelectFrom("id_player", "team_member", "id_team = ?", [PlayerTeam[0].id_team]);
                for (var ii in AllPlayers)
                    AllTeamPlayers[AllPlayers[ii].id_player] = true;
            }
            if (!Arena.length || !PlayerTeam.length)
                return { "state": "error_0" };
            if (idHeros.length > Arena[0]["lvl"] * 3)
                return { "state": "error_1" };
            if (PlayerTeam[0].rank >= Elkaisar.Config.TEAM_R_LEADER)
                yield Elkaisar.DB.ADelete("arena_team_challange_hero", "id_team = ?", [PlayerTeam[0].id_team]);
            else
                yield Elkaisar.DB.ADelete("arena_team_challange_hero", "id_player = ?", [this.idPlayer]);
            const ExistHero = Object.values(yield Elkaisar.DB.ASelectFrom("id_hero", "arena_team_challange_hero", "id_team = ?", [PlayerTeam[0].id_team])).map(Number);
            if ((new Set([...ExistHero, ...idHeros])).length > Arena[0]["lvl"] * 3)
                return { "state": "error_1" };
            for (; iii < idHeros.length; iii++) {
                const idHero = Number(idHeros[iii]);
                if (!idHero)
                    return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack() };
                HeroArmy = yield (new Elkaisar.Lib.LHeroArmy()).isCarringArmy(idHero);
                if (HeroArmy == false)
                    continue;
                else if (HeroArmy.id_player != this.idPlayer && PlayerTeam[0].rank < Elkaisar.Config.TEAM_R_LEADER)
                    continue;
                else if (!AllTeamPlayers[HeroArmy.id_player])
                    continue;
                HeroArmy.id_team = PlayerTeam[0].id_team;
                HeroArmy.ord = ord++;
                yield this.addHeroToArena(HeroArmy, "arena_team_challange_hero");
            }
            return { "state": "ok" };
        });
    }
    saveHeroListForGuild() {
        return __awaiter(this, void 0, void 0, function* () {
            const idHeros = Elkaisar.Base.validateGameNames(this.Parm["HeroList"]).split("-").map(e => Number(e));
            var ord = 0, approved = 0, refused = 0, iii = 0, Arena = [], AllTeamPlayers = [], HeroArmy;
            const PlayerGuild = yield Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
            if (PlayerGuild.length) {
                Arena = yield Elkaisar.DB.ASelectFrom("lvl", "arena_guild_challange", "id_guild = ?", [PlayerGuild[0].id_guild]);
                const AllPlayers = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [PlayerGuild[0].id_guild]);
                for (var ii in AllPlayers)
                    AllTeamPlayers[AllPlayers[ii].id_player] = true;
            }
            if (!Arena.length || !PlayerGuild.length)
                return { "state": "error_0" };
            if (idHeros.length > Arena[0]["lvl"] * 3)
                return { "state": "error_1" };
            if (PlayerGuild[0].rank >= Elkaisar.Config.GUILD_R_DEPUTY_2)
                Elkaisar.DB.ADelete("arena_guild_challange_hero", "id_guild = ?", [PlayerGuild[0].id_guild]);
            else
                Elkaisar.DB.ADelete("arena_guild_challange_hero", "id_player = ?", [this.idPlayer]);
            const ExistHero = Object.values(yield Elkaisar.DB.ASelectFrom("id_hero", "arena_guild_challange_hero", "id_guild = ?", [PlayerGuild[0].id_guild])).map(Number);
            if ((new Set([...ExistHero, ...idHeros])).length > Arena[0]["lvl"] * 3)
                return { "state": "error_1" };
            for (; iii < idHeros.length; iii++) {
                const idHero = Number(idHeros[iii]);
                if (!idHero)
                    return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack() };
                HeroArmy = yield (new Elkaisar.Lib.LHeroArmy()).isCarringArmy(idHero);
                if (HeroArmy == false)
                    continue;
                else if (HeroArmy.id_player != this.idPlayer && PlayerGuild[0].rank < Elkaisar.Config.GUILD_R_DEPUTY_2)
                    continue;
                else if (!AllTeamPlayers[HeroArmy.id_player])
                    continue;
                HeroArmy.id_guild = PlayerGuild[0].id_guild;
                HeroArmy.ord = ord++;
                yield this.addHeroToArena(HeroArmy, "arena_guild_challange_hero");
            }
            return { "state": "ok" };
        });
    }
    addHeroToArena(HeroArmy, Arena) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.ArenaHeroList[HeroArmy.id_hero] == this.ArenaFor) || !this.ArenaHeroList[HeroArmy.id_hero])
                yield Elkaisar.DB.AInsert(`id_player = ?, id_hero = ?, ord = ?,
                    ${this.ArenaFor == "ArenaTeam" ? "id_team = " + HeroArmy.id_team + "," : (this.ArenaFor == "ArenaGuild" ? "id_guild = " + HeroArmy.id_guild + "," : "")}
                    f_1_type = ?, f_1_num = ?, f_2_type = ?, f_2_num = ?, f_3_type = ?, f_3_num = ?, 
                    b_1_type = ?, b_1_num = ?, b_2_type = ?, b_2_num = ?, b_3_type = ?, b_3_num = ?`, Arena, [
                    HeroArmy.id_player, HeroArmy.id_hero, HeroArmy.ord,
                    HeroArmy["f_1_type"], HeroArmy["f_1_num"], HeroArmy["f_2_type"], HeroArmy["f_2_num"],
                    HeroArmy["f_3_type"], HeroArmy["f_3_num"], HeroArmy["b_1_type"], HeroArmy["b_1_num"],
                    HeroArmy["b_2_type"], HeroArmy["b_2_num"], HeroArmy["b_3_type"], HeroArmy["b_3_num"]
                ]);
        });
    }
}
module.exports = AArenaChallange;
