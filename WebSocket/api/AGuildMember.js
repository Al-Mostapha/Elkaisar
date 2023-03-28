class AGuildMember {
  constructor(idPlayer, Url) {
    this.idPlayer = idPlayer;
    this.Parm = Url;
  }

  async getGuildMember() {
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const idGuild = await Elkaisar.DB.ASelectFrom("id_guild", "guild_member", "id_player = ?", [this.idPlayer]);
    if (!idGuild.length)
      return [];
    return await Elkaisar.Lib.LGuild.getGuildMember(idGuild[0]["id_guild"], offset);
  }

  async removeFromPosition() {
    const idMember = Elkaisar.Base.validateId(this.Parm.idMember);
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const GuildMember = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [this.idPlayer]);
    const MemberRank = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [idMember]);
    if (!GuildMember.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!MemberRank.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["id_guild"] != MemberRank[0]["id_guild"])
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["rank"] <= MemberRank[0]["rank"])
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    await Elkaisar.DB.AUpdate("rank = 0", "guild_member", "id_player = ? AND id_guild = ?", [idMember, GuildMember[0]["id_guild"]]);
    return {
      state: "ok",
      memberList: await Elkaisar.Lib.LGuild.getGuildMember(GuildMember[0]["id_guild"], offset)
    }
  }

  async promotMember() {
    const idMember = Elkaisar.Base.validateId(this.Parm.idMember);
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const promotTo = Elkaisar.Base.validateOffset(this.Parm.newRank);
    const GuildMember = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [this.idPlayer]);
    const MemberRank = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [idMember]);
    if (!GuildMember.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!MemberRank.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["id_guild"] != MemberRank[0]["id_guild"])
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["rank"] <= MemberRank[0]["rank"] || MemberRank[0]["rank"] > Elkaisar.Config.GUILD_R_DEPUTY)
      return { state: "error_3", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (promotTo > Elkaisar.Config.GUILD_R_DEPUTY)
      return { state: "error_4", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!Elkaisar.Lib.LGuild.G_POSITION_MAX_NUM.hasOwnProperty(promotTo))
      return { state: "error_5", TryToHack: Elkaisar.Base.TryToHack(this) };
    const posCount = (await Elkaisar.DB.ASelectFrom("COUNT(*) AS poSC", "guild_member", "id_guild = ? AND rank = ?", [GuildMember[0]["id_guild"], promotTo]))[0]["poSC"];
    if (posCount >= Elkaisar.Lib.LGuild.G_POSITION_MAX_NUM[promotTo])
      return { state: "error_6", TryToHack: Elkaisar.Base.TryToHack(this) };
    await Elkaisar.DB.AUpdate("rank = ?", "guild_member", "id_player = ? AND id_guild = ?", [promotTo, idMember, GuildMember[0]["id_guild"]]);
    return {
      state: "ok",
      memberList: await Elkaisar.Lib.LGuild.getGuildMember(GuildMember[0]["id_guild"], offset)
    }
  }

  async tradePosition() {

    const idMember = Elkaisar.Base.validateId(this.Parm.idMember);
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const GuildMember = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [this.idPlayer]);
    const MemberRank = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [idMember]);
    if (!GuildMember.length)
      return { state: "error_0", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (!MemberRank.length)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["id_guild"] != MemberRank[0]["id_guild"])
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["rank"] <= MemberRank[0]["rank"])
      return { state: "error_3" };
    await Elkaisar.DB.AUpdate("rank = ?", "guild_member", "id_player = ? AND id_guild = ?", [GuildMember[0]["rank"], idMember, GuildMember[0]["id_guild"]]);
    await Elkaisar.DB.AUpdate("rank = ?", "guild_member", "id_player = ? AND id_guild = ?", [MemberRank[0]["rank"], this.idPlayer, GuildMember[0]["id_guild"]]);
    return {
      state: "ok",
      memberList: await Elkaisar.Lib.LGuild.getGuildMember(GuildMember[0]["id_guild"], offset)
    }
  }

  async modifyPrizeShare() {

    const idMember = Elkaisar.Base.validateId(this.Parm.idMember);
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const newPrizeShare = Elkaisar.Base.validateFloat(this.Parm.newPrizeShare);
    const GuildMember = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [this.idPlayer]);
    const MemberRank = await Elkaisar.DB.ASelectFrom("id_guild, rank, prize_share", "guild_member", "id_player = ?", [idMember]);

    if (!MemberRank.length)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (!MemberRank.length)
      return { "state": "error_1", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["id_guild"] != MemberRank[0]["id_guild"])
      return { "state": "error_2", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0]["rank"] < Elkaisar.Config.GUILD_R_LEADER)
      return { "state": "error_3" };
    if (newPrizeShare < 0)
      return { "state": "error_4", "TryToHack": Elkaisar.Base.TryToHack(this) };
    const totalPrizeShare = (await Elkaisar.DB.ASelectFrom("SUM(prize_share) AS total_prize_share ", "guild_member", "id_guild = ?", [GuildMember[0]["id_guild"]]))[0]["total_prize_share"];
    if (100 < totalPrizeShare + newPrizeShare - MemberRank[0]["prize_share"])
      return { "state": "error_5" };
    await Elkaisar.DB.AUpdate("prize_share = ?", "guild_member", "id_player = ? AND id_guild = ?", [newPrizeShare, idMember, GuildMember[0]["id_guild"]]);
    return {
      "state": "ok",
      "memberList": await Elkaisar.Lib.LGuild.getGuildMember(GuildMember[0]["id_guild"], offset)
    }
  }

  async resignFromPosition() {
    const GuildMember = await Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
    if (GuildMember.length == 0)
      return { state: "error_0" };
    if (GuildMember[0].rank >= Elkaisar.Config.GUILD_R_LEADER)
      return { state: "error_1" };
    await Elkaisar.DB.AUpdate("rank = 0", "guild_member", "id_guild = ? AND id_player = ?", [GuildMember[0].id_guild, this.idPlayer]);
    return {
      state: "ok",
      playerGuildData: await Elkaisar.Lib.LGuild.getPlayerGuildData(this.idPlayer)
    }
  }

  async quitFromGuild() {
    const GuildMember = await Elkaisar.DB.ASelectFrom("*", "guild_member", "id_player = ?", [this.idPlayer]);
    if (GuildMember.length == 0)
      return { state: "error_0" }
    if (GuildMember[0].rank > Elkaisar.Config.GUILD_R_MEMBER)
      return { state: "error_1" }
    await Elkaisar.DB.ADelete("guild_member", "id_player = ?", [this.idPlayer]);
    await Elkaisar.DB.AUpdate("guild = NULL, id_guild = NULL", "player", "id_player = ?", [this.idPlayer]);
    Elkaisar.Lib.LGuild.updateGuildData(GuildMember[0].id_player);
    return {
      state: "ok",
      playerGuildData: await Elkaisar.Lib.LGuild.getPlayerGuildData(this.idPlayer),
      playerData: await Elkaisar.Lib.LPlayer.getData(this.idPlayer)
    };
  }

  async fireMember() {
    
    const idMember = Elkaisar.Base.validateId(this.Parm.idMember);
    const offset = Elkaisar.Base.validateOffset(this.Parm.offset);
    const GuildMember = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [this.idPlayer]);
    const MemberRank = await Elkaisar.DB.ASelectFrom("id_guild, rank", "guild_member", "id_player = ?", [idMember]);

    if (GuildMember.length == 0)
      return { state: "error_0", "TryToHack": Elkaisar.Base.TryToHack(this) };
    if (MemberRank.length == 0)
      return { state: "error_1", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0].id_guild != MemberRank[0].id_guild)
      return { state: "error_2", TryToHack: Elkaisar.Base.TryToHack(this) };
    if (GuildMember[0].rank < Elkaisar.Config.GUILD_R_DEPUTY_2)
      return { state: "error_3" }
    if(MemberRank[0].rank > Elkaisar.Config.GUILD_R_MEMBER)
      return {state: "error_4"};
    
    Elkaisar.DB.ADelete("guild_member", "id_player = ? AND id_guild = ?  AND rank = 0",[idMember, GuildMember[0].id_guild]);
    Elkaisar.DB.AUpdate("guild = NULL , id_guild = NULL", "player", "id_player = ?", [idMember]);
  
    return {
      state: "ok",
      memberList: await Elkaisar.Lib.LGuild.getGuildMember(GuildMember[0]["id_guild"], offset)
    };
  }

}

module.exports = AGuildMember;