<?php

require_once '../config.php';
require_once '../base.php';
if(isset ($_POST["CHANGE_PLAYER_LANG"])){
    
    $idPlayer = validateId(cryptUserId($_POST["token"], "d"));
    $newLang  = validateOurStr($_POST["newLang"]);
    
    
    if(strlen($newLang) > 3){
        exit();
    }
    
    updateTable("lang = '$newLang'", "player", "id_player = '$idPlayer'");
    
    echo json_encode(["state"=>"ok"]);
    
}