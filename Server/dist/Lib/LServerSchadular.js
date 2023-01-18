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
Elkaisar.Helper.CloseQueenCity = function (UnitType) {
    return __awaiter(this, void 0, void 0, function* () {
        var Unites = yield Elkaisar.DB.ASelectFrom("*", "world", `ut = ${UnitType}`, []);
        var Unit = Unites[0];
        if (Unit.lo == 1)
            return;
        Elkaisar.DB.Update("lo = 1", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
            Elkaisar.World.refreshWorldUnit();
        });
        yield Elkaisar.DB.AUpdate(`duration = ${Math.floor(Date.now() / 1000)} - time_stamp`, "world_unit_rank", `x = ${Unit.x} AND y = ${Unit.y} ORDER BY id_round DESC LIMIT 1`);
        var Guild = yield Elkaisar.DB.ASelectFrom(`guild.name AS GuildName, SUM(duration) AS TotalD, guild.id_guild`, "guild JOIN world_unit_rank ON world_unit_rank.id_dominant = guild.id_guild", "x = ? AND y = ? GROUP BY id_dominant ORDER BY TotalD DESC LIMIT 1 ", [Unit.x, Unit.y]);
        Elkaisar.Base.broadcast(JSON.stringify({
            "classPath": "ServerAnnounce.QueenCityClosed",
            "WorldUnit": Unit,
            "WinnerGuild": Guild && Guild[0] ? Guild[0] : {}
        }));
        if (!Guild[0])
            return;
        var PrizeList = yield Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", "unitType = ?", [Unit.ut]);
        var GuildMember = yield Elkaisar.DB.ASelectFrom("id_player", "guild_member", "id_guild = ?", [Guild[0].id_guild]);
        GuildMember.forEach(function (Member, Index) {
            var PlayerList = [];
            PrizeList.forEach(function (Prize, Index) {
                var Luck = Math.floor(Math.random() * 1000);
                var amount = 0;
                if (Luck <= Prize["win_rate"]) {
                    amount = Elkaisar.Base.rand(Prize["amount_min"], Prize["amount_max"]);
                    Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Member.id_player, Prize.prize]);
                    PlayerList.push({
                        "Item": Prize["prize"],
                        "amount": amount
                    });
                }
            });
            var List = ``;
            for (var iii in PlayerList) {
                var Item = Elkaisar.Lib.LItem.ItemList[PlayerList[iii].Item];
                if (!Item) {
                    continue;
                }
                List += `<li style="width: 20%;">
                                                <div class="image"><img src="${Item.image}"></div>
                                                <div class="amount stroke">${PlayerList[iii].amount} X</div>
                                            </li>`;
            }
            //insertIntoTable("id_to = {$cityFrom["id_player"]} , head = 'تقرير وصول الموارد'  , body = '$body' , time_stamp = $now ", "msg_diff");
            Elkaisar.DB.Insert(`id_to = ${Member.id_player}, head = 'تقرير استلام جوائز الملكة', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none"><ul class="matrial-list">${List}</ul></div>`]);
            var playerTo = Elkaisar.Base.getPlayer(Member.id_player);
            if (playerTo)
                playerTo.connection.sendUTF(JSON.stringify({
                    "classPath": "Chat.QueenPrizeSent",
                    "xCoord": Unit.x,
                    "yCoord": Unit.y
                }));
        });
    });
};
Elkaisar.Cron.schedule(`0 0 * * 1`, function () {
    Elkaisar.Helper.CloseQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_A);
    Elkaisar.Helper.CloseQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_B);
    Elkaisar.Helper.CloseQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_C);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.OpenQueenCity = function (unitType) {
    return __awaiter(this, void 0, void 0, function* () {
        Elkaisar.DB.SelectFrom("*", "world", `ut = ${unitType}`, [], function (Unites) {
            Unites.forEach(function (Unit, Index) {
                Elkaisar.DB.Update("lo = 0, l = 1", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
                    Elkaisar.World.refreshWorldUnit();
                });
                Elkaisar.DB.Delete("world_unit_rank", "x = ? AND y = ?", [Unit.x, Unit.y]);
                Elkaisar.Base.broadcast(JSON.stringify({
                    "classPath": "ServerAnnounce.QueenCityOpened",
                    "WorldUnit": Unit
                }));
            });
        });
    });
};
Elkaisar.Cron.schedule(`0 0 * * 2`, function () {
    Elkaisar.Helper.OpenQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_A);
    Elkaisar.Helper.OpenQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_B);
    Elkaisar.Helper.OpenQueenCity(Elkaisar.Config.WUT_QUEEN_CITY_C);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.OpenRepleCastle = function (unitType) {
    return __awaiter(this, void 0, void 0, function* () {
        var Units = yield Elkaisar.DB.ASelectFrom("*", "world", `ut = ${unitType}`, []);
        var Unit = Units[0];
        Elkaisar.DB.SelectFrom("guild.name AS GuildName, guild.id_guild, world_attack_queue.id", "guild JOIN world_attack_queue ON world_attack_queue.id_guild = guild.id_guild", `world_attack_queue.x_coord = ${Unit.x} AND world_attack_queue.y_coord = ${Unit.y} ORDER BY id ASC LIMIT 1`, [], function (Guild) {
            if (!Guild || !Guild[0])
                return;
            Elkaisar.DB.Update("lo = 0", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
                Elkaisar.World.refreshWorldUnit();
            });
            Elkaisar.DB.Update("time_start = ?, time_end = ?", "world_attack_queue", "id = ?", [Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 3600, Guild[0]["id"]]);
            Elkaisar.DB.SelectFrom("guild.name AS GuildName, guild.id_guild", "guild JOIN world_unit_rank ON world_unit_rank.id_dominant = guild.id_guild", `world_unit_rank.x = ${Unit.x} AND world_unit_rank.y = ${Unit.y} ORDER BY id_round DESC LIMIT 1`, [], function (GuildDef) {
                Elkaisar.Base.broadcast(JSON.stringify({
                    classPath: "ServerAnnounce.RepleCastleOpened",
                    WorldUnit: Unit,
                    GuildAtt: Guild[0],
                    GuildDef: GuildDef && GuildDef[0] ? GuildDef[0] : null
                }));
            });
        });
    });
};
/* Open Reple castle*/
Elkaisar.Cron.schedule("0 12 * * *", function () {
    Elkaisar.Helper.OpenRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_A);
    Elkaisar.Helper.OpenRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_B);
    Elkaisar.Helper.OpenRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_C);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.CloseRepleCastle = function (unitType) {
    return __awaiter(this, void 0, void 0, function* () {
        Elkaisar.DB.SelectFrom("*", "world", `ut = ${unitType}`, [], function (Units) {
            Units.forEach(function (Unit, Index) {
                Elkaisar.DB.Update("lo = 1", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
                    Elkaisar.World.refreshWorldUnit();
                });
                Elkaisar.DB.Delete("world_attack_queue", "time_start < ? AND x_coord = ? AND y_coord = ?", [Date.now() / 1000, Unit.x, Unit.y]);
                Elkaisar.Base.broadcast(JSON.stringify({
                    classPath: "ServerAnnounce.RepleCastleClosed",
                    WorldUnit: Unit
                }));
            });
        });
    });
};
Elkaisar.Cron.schedule("0 13 * * *", function () {
    Elkaisar.Helper.CloseRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_A);
    Elkaisar.Helper.CloseRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_B);
    Elkaisar.Helper.CloseRepleCastle(Elkaisar.Config.WUT_REPLE_CASTLE_C);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.CloseArmyCapital = function (UnitType) {
    return __awaiter(this, void 0, void 0, function* () {
        var Units = yield Elkaisar.DB.ASelectFrom("*", "world", `ut = ${UnitType}`, []);
        var Unit = Units[0];
        if (Unit.lo == 1)
            return;
        Elkaisar.DB.Update("lo = 1", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
            Elkaisar.World.refreshWorldUnit();
        });
        yield Elkaisar.DB.AUpdate("duration = ? - time_stamp", "world_unit_rank", `x = ${Unit.x} AND y = ${Unit.y} ORDER BY id_round DESC LIMIT 1`, [Math.floor(Date.now() / 1000)]);
        var Players = yield Elkaisar.DB.ASelectFrom(`world_unit_rank.id_dominant, SUM(world_unit_rank.duration) AS d_sum, SUM(world_unit_rank.win_num) AS w_num, player.name, player.id_player  , player.guild`, `world_unit_rank JOIN player ON player.id_player = world_unit_rank.id_dominant`, `world_unit_rank.x = ${Unit["x"]}  AND  world_unit_rank.y = ${Unit["y"]}  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 5`, []);
        if (!Players)
            return;
        Players.forEach(function (Player, Index) {
            return __awaiter(this, void 0, void 0, function* () {
                var PrizeList = yield Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", `unitType = ${Unit.ut} AND lvl = ${Index + 1}`, []);
                var List = ``;
                PrizeList.forEach(function (Prize) {
                    var Luck = Math.floor(Math.random() * 1000);
                    var amount = 0;
                    if (Luck <= Prize["win_rate"]) {
                        amount = Elkaisar.Base.rand(Prize["amount_min"], Prize["amount_max"]);
                        Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Player.id_player, Prize.prize]);
                        var Item = Elkaisar.Lib.LItem.ItemList[Prize["prize"]];
                        List += `<li style="width: 20%;">
                                    <div class="image"><img src="${Item.image}"></div>
                                    <div class="amount stroke">${amount} X</div>
                                </li>`;
                    }
                });
                Elkaisar.DB.Insert(`id_to = ${Player.id_player}, head = 'تقرير استلام جوائز العواصم', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none"><ul class="matrial-list">${List}</ul></div>`]);
                var playerTo = Elkaisar.Base.getPlayer(Player.id_player);
                if (playerTo)
                    playerTo.connection.sendUTF(JSON.stringify({
                        "classPath": "Chat.PrizeSent",
                        "xCoord": Unit.x,
                        "yCoord": Unit.y
                    }));
            });
        });
        Elkaisar.Base.broadcast(JSON.stringify({
            classPath: "ServerAnnounce.capitalLock",
            Player: Players[0],
            WorldUnit: Unit
        }));
    });
};
/*close Army Capital*/
Elkaisar.Cron.schedule("0 19 * * 1", function () {
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_A);
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_B);
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_C);
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_D);
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_E);
    Elkaisar.Helper.CloseArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_F);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.OpenArmyCapital = function (unitType) {
    return __awaiter(this, void 0, void 0, function* () {
        Elkaisar.DB.SelectFrom("*", "world", `ut = ${unitType} `, [], function (Units) {
            Units.forEach(function (Unit, Index) {
                Elkaisar.DB.Update("lo = 0", "world", "x = ? AND y = ?", [Unit.x, Unit.y], function () {
                    Elkaisar.World.refreshWorldUnit();
                });
                Elkaisar.DB.Delete("world_unit_rank", "x = ? AND y = ?", [Unit.x, Unit.y]);
                Elkaisar.Base.broadcast(JSON.stringify({
                    classPath: "ServerAnnounce.capitalUnLock",
                    WorldUnit: Unit
                }));
            });
        });
    });
};
/* Open Army Capital*/
Elkaisar.Cron.schedule("30 17 * * 1", function () {
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_A);
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_B);
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_C);
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_D);
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_E);
    Elkaisar.Helper.OpenArmyCapital(Elkaisar.Config.WUT_ARMY_CAPITAL_F);
}, {
    scheduled: true,
    timezone: "Etc/UTC"
});
Elkaisar.Helper.CloseArenaChallange = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const PlayerList = yield Elkaisar.DB.ASelectFrom("arena_player_challange.*, player.name", "arena_player_challange JOIN player ON player.id_player = arena_player_challange.id_player", "1 ORDER BY arena_player_challange.rank ASC LIMIT 10", []);
        PlayerList.forEach(function (Player, Index) {
            return __awaiter(this, void 0, void 0, function* () {
                const PrizeList = yield Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", "unitType = ? AND lvl = ?", [Elkaisar.Config.WUT_CHALLAGE_FIELD_PLAYER, Index + 1]);
                var List = ``;
                PrizeList.forEach(function (Prize) {
                    var Luck = Math.floor(Math.random() * 1000);
                    var amount = 0;
                    if (Luck <= Prize["win_rate"]) {
                        amount = Elkaisar.Base.rand(Prize["amount_min"], Prize["amount_max"]);
                        Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Player.id_player, Prize.prize]);
                        var Item = Elkaisar.Lib.LItem.ItemList[Prize["prize"]];
                        List += `<li style="width: 20%;">
                                    <div class="image"><img src="${Item.image}"></div>
                                    <div class="amount stroke">${amount} X</div>
                                </li>`;
                    }
                });
                Elkaisar.DB.Insert(`id_to = ${Player.id_player}, head = 'تقرير استلام جوائز ميدان التحدى', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none"><ul class="matrial-list">${List}</ul></div>`]);
                if (Index == 0) {
                    Elkaisar.Base.broadcast(JSON.stringify({
                        classPath: "ServerAnnounce.ArenaChallangeRoundEnd",
                        PlayerName: Player.name
                    }));
                    Elkaisar.DB.Update("champion = champion + 1", "arena_player_challange", `id_player = ${Player.id_player}`);
                }
            });
        });
    });
};
Elkaisar.Helper.CloseArenaChallangeTeam = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const Teams = yield Elkaisar.DB.ASelectFrom("arena_team_challange.*, team.name", "arena_team_challange JOIN team ON team.id_team = arena_team_challange.id_team", "1 ORDER BY arena_team_challange.rank ASC LIMIT 10", []);
        Teams.forEach(function (Team, Index) {
            return __awaiter(this, void 0, void 0, function* () {
                const PrizeList = yield Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", "unitType = ? AND lvl = ?", [Elkaisar.Config.WUT_CHALLAGE_FIELD_TEAM, Index + 1]);
                const PlayerTeam = yield Elkaisar.DB.ASelectFrom("hero.id_player", "arena_team_challange_hero JOIN hero ON hero.id_hero = arena_team_challange_hero.id_hero", "id_team = ? GROUP BY hero.id_player", [Team.id_team]);
                if (PlayerTeam.length == 0)
                    return;
                if (PrizeList.length == 0)
                    return;
                PlayerTeam.forEach(function (Player) {
                    let List = ``;
                    PrizeList.forEach(function (Prize) {
                        let Luck = Math.floor(Math.random() * 1000);
                        let amount = 0;
                        if (Luck <= Prize["win_rate"]) {
                            amount = Elkaisar.Base.rand(Prize["amount_min"], Prize["amount_max"]);
                            Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Player.id_player, Prize.prize]);
                            let Item = Elkaisar.Lib.LItem.ItemList[Prize["prize"]];
                            List += `<li style="width: 20%;">
                            <div class="image"><img src="${Item.image}"></div>
                            <div class="amount stroke">${amount} X</div>
                        </li>`;
                        }
                    });
                    Elkaisar.DB.Insert(`id_to = ${Player.id_player}, head = 'تقرير استلام جوائز ميدان تحدى الفريق', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none"><ul class="matrial-list">${List}</ul></div>`]);
                });
                if (Index == 0) {
                    yield Elkaisar.DB.AUpdate("champion = champion + 1", "arena_team_challange", `id_team = ${Team.id_team}`);
                    Elkaisar.Base.broadcast(JSON.stringify({
                        classPath: "ServerAnnounce.ArenaChallangeTeamRoundEnd",
                        TeamName: Team.name
                    }));
                }
            });
        });
    });
};
Elkaisar.Helper.CloseArenaChallangeGuild = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const Guilds = yield Elkaisar.DB.ASelectFrom("arena_guild_challange.*, guild.name", "arena_guild_challange JOIN guild ON guild.id_guild = arena_guild_challange.id_guild", "1 ORDER BY arena_guild_challange.rank  ASC LIMIT 10", []);
        Guilds.forEach(function (Guild, Index) {
            return __awaiter(this, void 0, void 0, function* () {
                const PrizeList = yield Elkaisar.DB.ASelectFrom("*", "world_unit_prize_sp", "unitType = ? AND lvl = ?", [Elkaisar.Config.WUT_CHALLAGE_FIELD_GUILD, Index + 1]);
                const PlayerGuild = yield Elkaisar.DB.ASelectFrom("hero.id_player", "arena_guild_challange_hero JOIN hero ON hero.id_hero = arena_guild_challange_hero.id_hero", "id_guild = ? GROUP BY hero.id_player", [Guild.id_guild]);
                PlayerGuild.forEach(function (Player) {
                    var List = ``;
                    PrizeList.forEach(function (Prize) {
                        var Luck = Math.floor(Math.random() * 1000);
                        var amount = 0;
                        if (Luck <= Prize["win_rate"]) {
                            amount = Elkaisar.Base.rand(Prize["amount_min"], Prize["amount_max"]);
                            Elkaisar.DB.Update(`amount = amount + ${amount}`, "player_item", "id_player = ? AND id_item = ?", [Player.id_player, Prize.prize]);
                            var Item = Elkaisar.Lib.LItem.ItemList[Prize["prize"]];
                            List += `<li style="width: 20%;">
                            <div class="image"><img src="${Item.image}"></div>
                            <div class="amount stroke">${amount} X</div>
                        </li>`;
                        }
                    });
                    console.log(Player, `Prize List Length : ${PrizeList.length}`);
                    Elkaisar.DB.Insert(`id_to = ${Player.id_player}, head = 'تقرير استلام جوائز ميدان تحدى الأحلاف', body=?, time_stamp = ${Math.floor(Date.now() / 1000)}`, "msg_diff", [`<div id="matrial-box-gift" style="border: none; background: none"><ul class="matrial-list">${List}</ul></div>`]);
                });
                if (Index == 0) {
                    Elkaisar.DB.Update("champion = champion + 1", "arena_guild_challange", `id_guild = ${Guild.id_guild}`);
                    Elkaisar.Base.broadcast(JSON.stringify({
                        classPath: "ServerAnnounce.ArenaChallangeGuildRoundEnd",
                        GuildName: Guild.name
                    }));
                }
            });
        });
    });
};
/*   Arena challange */
Elkaisar.Cron.schedule("59 19 * * *", function () {
    Elkaisar.Helper.CloseArenaChallange();
    Elkaisar.Helper.CloseArenaChallangeTeam();
    Elkaisar.Helper.CloseArenaChallangeGuild();
});
/*   Arena challange */
Elkaisar.Cron.schedule("0 16 * * 0,1,2,3,4,6", function () {
    Elkaisar.DB.Update("lo = 0", "world", `ut IN (${Elkaisar.Config.WUT_SEA_CITY_1}, ${Elkaisar.Config.WUT_SEA_CITY_2}, ${Elkaisar.Config.WUT_SEA_CITY_3}, ${Elkaisar.Config.WUT_SEA_CITY_4})`, [], function () {
        Elkaisar.World.refreshWorldUnit();
    });
    Elkaisar.Base.broadcast(JSON.stringify({
        classPath: "ServerAnnounce.SeaCityOppend"
    }));
});
Elkaisar.Cron.schedule("0 17 * * 0,1,2,3,4,6", function () {
    Elkaisar.DB.Update("lo = 1", "world", `ut IN (${Elkaisar.Config.WUT_SEA_CITY_1}, ${Elkaisar.Config.WUT_SEA_CITY_2}, ${Elkaisar.Config.WUT_SEA_CITY_3}, ${Elkaisar.Config.WUT_SEA_CITY_4})`, [], function () {
        Elkaisar.World.refreshWorldUnit();
    });
    Elkaisar.Base.broadcast(JSON.stringify({
        classPath: "ServerAnnounce.SeaCityClosed"
    }));
});
/*   Arena challange */
Elkaisar.Cron.schedule("0 16 * * 5", function () {
    Elkaisar.DB.Update("lo = 0", "world", `ut IN (${Elkaisar.Config.WUT_SEA_CITY_5})`, [], function () {
        Elkaisar.World.refreshWorldUnit();
    });
    Elkaisar.Base.broadcast(JSON.stringify({
        classPath: "ServerAnnounce.SeaCityCoinOppend"
    }));
});
Elkaisar.Cron.schedule("0 17 * * 5", function () {
    Elkaisar.DB.Update("lo = 1", "world", `ut IN (${Elkaisar.Config.WUT_SEA_CITY_5})`, [], function () {
        Elkaisar.World.refreshWorldUnit();
    });
    Elkaisar.Base.broadcast(JSON.stringify({
        classPath: "ServerAnnounce.SeaCityCoinClosed"
    }));
});
