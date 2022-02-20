<?php

class ARankingGuild
{
    
    function generalRank()
    {
         $offset = validateID(max($_GET["offset"], 0));

        return selectFromTable(
                "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
                . "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
                . "guild.slog_top, guild.slog_cnt, guild.slog_btm",
                "guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE guild_member.id_guild = guild.id_guild AND guild_member.rank = ".GUILD_R_LEADER." LIMIT 1)",
                "1 ORDER BY guild.mem_num DESC, guild.prestige DESC  LIMIT 10 OFFSET $offset");
        
    }
    
    function prestigeRank()
    {
         $offset = validateID(max($_GET["offset"], 0));

        return selectFromTable(
                "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
                . "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
                . "guild.slog_top, guild.slog_cnt, guild.slog_btm",
                "guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE guild_member.id_guild = guild.id_guild AND guild_member.rank = ".GUILD_R_LEADER." LIMIT 1)",
                "1 ORDER BY guild.prestige DESC  LIMIT 10 OFFSET $offset");
        
    }
    
    function honorRank()
    {
         $offset = validateID($_GET["offset"]);

        return selectFromTable(
                "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
                . "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
                . "guild.slog_top, guild.slog_cnt, guild.slog_btm",
                "guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE guild_member.id_guild = guild.id_guild AND guild_member.rank = ".GUILD_R_LEADER." LIMIT 1)",
                "1 ORDER BY guild.honor DESC  LIMIT 10 OFFSET $offset");
        
    }
    
    function searchByName()
    {
        
        $searchName = validateID($_GET["searchName"]);

        return selectFromTable(
                "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
                . "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
                . "guild.slog_top, guild.slog_cnt, guild.slog_btm",
                "guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE guild_member.id_guild = guild.id_guild AND guild_member.rank = ".GUILD_R_LEADER." LIMIT 1)",
                "guild.name LIKE :n ORDER BY guild.mem_num DESC  LIMIT 10", ["n" => "%$searchName%"]);
        
    }
    
    function searchByRank()
    {
        
        $rank = validateID(max($_GET["offset"], 0));

        return selectFromTable(
                "guild.lvl, guild.name AS GuildName, guild.prestige, guild.honor, guild.id_guild, "
                . "guild.mem_num , player.name AS lord_name, player.avatar, player.porm,"
                . "guild.slog_top, guild.slog_cnt, guild.slog_btm",
                "guild JOIN player ON player.id_player = (SELECT id_player FROM guild_member WHERE guild_member.id_guild = guild.id_guild AND guild_member.rank = ".GUILD_R_LEADER." LIMIT 1)",
                "1 ORDER BY guild.mem_num DESC  LIMIT 1 OFFSET ". max($rank, 10));
        
    }
    
}

