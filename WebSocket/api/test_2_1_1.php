<?php
set_time_limit(0);
define("SERVER_ID", 1);
require '../config.php';

        
        $PlayerArr = explode("),(", $s);
foreach ($PlayerArr as $onePlayer){
    
    $Player = explode(",", $onePlayer);
    echo "UPDATE player SET prestige = {$Player[2]} WHERE id_player = {$Player[0]}; \n";
}
