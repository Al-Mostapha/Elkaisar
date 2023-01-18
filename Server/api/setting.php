<?php

require_once '../config_index.php';
require_once '../config.php';
require_once '../base.php';
if(session_status() == PHP_SESSION_NONE){
    session_start();
}

if(isset($_POST["CHANGE_PLAYER_PASSWORD"])){
    
    $idPlayer = validateId(cryptUserId($_POST["token"], "d"));
    $newPass  = (validateName($_POST["newPassword"]));
    $oldPass  = (validateName($_POST["oldPassword"]));
    
    
    $check = selectFromTableIndex("id_user, enc_pass", "game_user", "id_user = :idp", ["idp" => $idPlayer]);
    
    if(!passCheck($oldPass, $check[0]["enc_pass"])){
        exit(json_encode([
            "state"=>"error"
        ]));
    }else if(count($check) == 0){
        exit(json_encode([
            "state"=>"error"
        ]));
    }
    $enc_pass = passEnc($newPass);
    if(updateTableIndex("enc_pass = :pass", "game_user", "id_user = :idp", ["pass" => $enc_pass, "idp" => $idPlayer]) > 0){
        session_destroy();
        exit(json_encode([
            "state"=>"ok"
        ]));
        
    }
    
    
}



else if(isset ($_POST["CHANGE_PLAYER_LANG"])){
    
    $idPlayer = validateId(cryptUserId($_POST["token"], "d"));
    $newLang  = validateOurStr($_POST["newLang"]);
    
    
    if(strlen($newLang) > 3){
        exit();
    }
    
    updateTable("lang = :nl", "player", "id_player = :idp", ["nl" => $newLang, "idp" => $idPlayer]);
    
    echo json_encode(["state"=>"ok"]);
    
}