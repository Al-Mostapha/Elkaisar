<?php

ini_set("memory_limit", "-1");
set_time_limit(0);

class AIp {

    function getPlayerIps() {

        $idPlayer = validateID($_GET["idPlayer"]);
        $userIps = selectFromTable("ipv4, time_stamp, times", "player_logs", "id_player = '$idPlayer'");


        $userCommon = selectFromTable("player_logs.*, player.name, player.last_seen, player.porm",
                "player JOIN player_logs ON player_logs.id_player = player.id_player",
                " player_logs.id_player = $idPlayer LIMIT 45");

        foreach ($userCommon as &$oneUser) {
            $ipData = selectFromTableIndex("*", "ip_info", "ip = :i", ["i" => $oneUser["ipv4"]]);
            if (count($ipData)) {
                $oneUser["coName"] = $ipData[0]["countery"];
            }
        }

        return [
            "state" => "ok",
            "users" => $userCommon
        ];
    }

    function getAllPlayerIps() {

        $userIps = selectFromTable("player_logs.id_player,  ipv4, time_stamp, times, player.*", "player_logs JOIN player ON player.id_player = player_logs.id_player", "1 GROUP BY player_logs.id_player");
        $Count = 0;
        foreach ($userIps as &$oneUser) {
            $ipData = selectFromTableIndex("*", "ip_info", "ip = :i", ["i" => $oneUser["ipv4"]]);
            if (count($ipData)) {
                $Count++;
                echo "{$Count} Player  <span style='color: #aa0011'>({$oneUser["name"]})</span> Countery <span style='color: #aa0011'>({$ipData[0]["countery"]})</span> <br>";
            }
        }

        return [
            "state" => "ok"
        ];
    }

    function getIpData() {
        $AllPlayersIp = selectFromTable("DISTINCT(ipv4)", "player_logs", "1");
        $Test = 0;
        foreach ($AllPlayersIp as $onePlayer) {
            $ip = str_replace("::ffff:", "", $onePlayer["ipv4"]);
            $Eip = selectFromTableIndex("*", "ip_info", "ip = :i", ["i" => $ip]);
            if (count($Eip))
                continue;

            $ipInfo = file_get_contents("http://api.ipstack.com/$ip?access_key=110c661d714578dc347824ddfd4be53a");
            $JsIp = json_decode($ipInfo, true);
            $Test++;
            if (isset($JsIp["success"]) && $JsIp["success"] == false) {
                echo print_r($ipInfo, true);
                echo 'Rech max ' . $Test;
                return;
            }
            echo $ip . "      ->     " . $JsIp["country_name"];
            insertIntoTableIndex("info = :in, countery = :co , flag = :f, ip = :ip", "ip_info", ["in" => $ipInfo, "co" => $JsIp["country_name"], "f" => $JsIp["location"]["country_flag"], "ip" => $ip]);
        }
    }

    function getIpData2() {
        $AllPlayersIp = selectFromTable("DISTINCT(ipv4)", "player_logs", "1");
        $Test = 0;
        foreach ($AllPlayersIp as $onePlayer) {
            $ip = str_replace("::ffff:", "", $onePlayer["ipv4"]);
            $Eip = selectFromTableIndex("*", "ip_info", "ip = :i", ["i" => $ip]);
            if (count($Eip))
                continue;

            $ipInfo = file_get_contents("https://api.ipgeolocation.io/ipgeo?apiKey=fea28b2d1cad4d2fa2f3723958d06d0d&ip=$ip");
            $JsIp = json_decode($ipInfo, true);
            if (!$JsIp)
                $Test++;
            
            if (!isset($JsIp["country_name"])) {
                echo print_r($ipInfo, true);
                echo 'Rech max ' . $Test;
                return;
            }
            echo $ip . "      ->     " . $JsIp["country_name"];
            insertIntoTableIndex("info = :in, countery = :co , flag = :f, ip = :ip", "ip_info", ["in" => $ipInfo, "co" => $JsIp["country_name"], "f" => $JsIp["country_flag"], "ip" => $ip]);
        }
    }

}
