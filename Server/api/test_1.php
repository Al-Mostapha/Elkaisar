<?php
echo 'Done 11111';
ini_set("memory_limit", "-1");
set_time_limit(0);
define("SERVER_ID", 4);
require_once '../config.php';


$players = selectFromTable("id_player", "player", "1");

foreach ($players as $one){
    
    updateTable("p_token = :t", "player", "id_player = :idp", ["t" => cryptUserId($one["id_player"]), "idp" => $one["id_player"]]);
    
}

echo 'Done';