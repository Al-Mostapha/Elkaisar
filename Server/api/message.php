<?php

require_once '../config.php';
require_once '../base.php';

    
if(isset ($_GET["get_msg_income"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $offset    = validateId($_GET["offset"]);
    $msg = selectFromTable(" id_from , head , time_stamp , id_msg  , from_  , seen", "msg_income", " id_to = :idp ORDER BY id_msg DESC LIMIT 10 OFFSET $offset", ["idp" => $id_player]);
    foreach ($msg as &$one){
         if($one["from_"] == 1){
            $one ["name"] = "النظام";
        }else{
            $one ["name"] = Player::getPlayerName($one ["id_from"])["name"];
        }
        $one["time_stamp"] = date("j M , H:i", ($one    ["time_stamp"]));
    }
    
    echo json_encode($msg);
    
}

elseif(isset ($_GET["get_income_msg_in_detail"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_msg    = validateId($_GET["id_message"]);
    
   
    $msgs = selectFromTable("id_from , head , time_stamp , id_msg , body , from_ , seen ", "msg_income", "id_to = :idp  AND id_msg = :idm ", ["idp"=>$id_player, "idm" => $id_msg]);
    foreach ($msgs as &$one){
        
        if($one["from_"] == 1){
            $one ["name"] = "النظام";
        }else{
            $one ["name"] = Player::getPlayerName($one ["id_from"])["name"];
        }
        $one["time_stamp"] = date("j M , H:i", ($one    ["time_stamp"]));
        
        
        if($one["seen"] == 0){
            updateTable("seen = 1", "msg_income", " id_msg = :idm ", ["idm" => $id_msg]);
            
        }
    }
    echo json_encode($msgs);
    
}


elseif(isset ($_GET["get_msg_diff"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $offset    = validateId($_GET["offset"]);
    
    
    $msgs = selectFromTable("head , time_stamp , id_msg ,seen", "msg_diff", "id_to = :idp  ORDER BY time_stamp DESC LIMIT 10 OFFSET $offset ", ["idp" => $id_player]);
    foreach ($msgs as &$one){
        $one["time_stamp"] = date("j M , H:i", ($one    ["time_stamp"]));
    }
    echo json_encode($msgs);
    
}

elseif(isset ($_GET["get_diff_msg_in_detail"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_msg    = validateId($_GET["id_message"]);
    
    $msgs = selectFromTable("head , time_stamp , id_msg , body , seen ", "msg_diff", " id_to = :idp  AND id_msg = :idm ", ["idp" => $id_player, "idm" => $id_msg]);
    foreach ($msgs as &$one){
        $one["time_stamp"] = date("j M , H:i", ($one["time_stamp"]));
      
        
        if($one["seen"] == 0){
            updateTable(" seen = 1", "msg_diff", "id_msg = :idm", ["idm" => $id_msg]);
        }
    }
   
    echo json_encode($msgs);
    
}

elseif(isset ($_GET["get_msg_outcome"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $offset    = validateId($_GET["offset"]);
    
    $msgs = selectFromTable("id_to , head , time_stamp , id_msg", "msg_out", "id_from = :idp   ORDER BY time_stamp DESC LIMIT 10 OFFSET $offset", ["idp" => $id_player]);
    
    foreach ($msgs as &$one){
        
         if($one["id_to"] == 0){
            $one ["name"] = "النظام";
        }else{
            $one ["name"] = Player::getPlayerName($one ["id_to"])["name"];
        }
        $one["time_stamp"] = date("j M , H:i", ($one    ["time_stamp"]));
      
    }
   
    echo json_encode($msgs);
    
}

elseif(isset ($_GET["get_out_msg_in_detail"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_msg    = validateId($_GET["id_message"]);
    
    
    $msgs = selectFromTable("id_to ,  head , time_stamp , id_msg , body", "msg_out", "id_from = :idp  AND id_msg = :idm", ["idp" => $id_player, "idm" => $id_msg]);
    foreach ($msgs as &$one){
        if($one["id_to"] == 0){
            $one ["name"] = "النظام";
        }else{
            $one ["name"] = Player::getPlayerName($one ["id_to"])["name"];
        }
        $one["time_stamp"] = date("j M , H:i", ($one    ["time_stamp"]));
    }
    
    echo json_encode($msgs);
    
}


elseif (isset ($_POST["delete_msg"])) {
    
    $data = json_decode($_POST["msgs"]);
    $table = validateOurStr($data->table);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    foreach ($data->id_msgs as $key => $val){
        $data->id_msgs[$key] = validateId($val);
    }
    if($table == "msg_diff"){ 
        $con = "id_to = :idp";
    }else if($table == "msg_income"){ 
        $con = "id_to = :idp";
    }else if($table == "msg_out"){ 
        $con = "id_from = :idp";
    }
    
    if($table == "report_player" || $table == "spy_report"){
        
        $ids ="( id_report = " . implode(" OR id_report = ", $data->id_msgs).") AND  id_player = :idp";
        
    }else{
        
        $ids =" ( id_msg = " . implode(" OR id_msg = ", $data->id_msgs).") AND $con";
        
    }
    
    echo deleteTable( "`$table`", $ids, ["idp" => $id_player]);
}


elseif (isset ($_POST["DELETE_ALL_UNREAD"])) {
    
    $data      = json_decode($_POST["msgs"]);
    $table     = validateOurStr($data->table);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    if($table == "msg_diff"){ 
        $con = "id_to = :idp";
    }else if($table == "msg_income"){ 
        $con = "id_to = :idp";
    }else if($table == "msg_out"){ 
        $con = "id_from = :idp";
    }else if($table == "report_player"){
        $con = "id_player = :idp";
    }else if($table == "spy_report"){
        
        $con = "id_player = :idp";
        
    }else{
        catchHack();
    }
    deleteTable("`$table`", $con, ["idp" => $id_player]);
    
}

elseif (isset ($_GET["GET_PLAYER_NOTIF"])) {
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $player = new Player($id_player);
    echo json_encode($player->getPlayerNotif());
    
}



elseif(isset ($_POST["send_mail_to"])){
    
    $body       = mres($_POST["body"]);
    $subject    = mres($_POST["subject"]);
    $id_to      = validateId($_POST["id_to"]);
    $id_from    = validateId(cryptUserId(($_POST['token']), "d"));
    $time_stamp = time();
    
    $id = insertIntoTable("id_from = :idf , id_to = :idt ,head = :h , body = :b , time_stamp =  :ts", "msg_income",  ["idf" => $id_from, "idt" => $id_to, "h" => $subject, "b"=> $body, "ts" => $time_stamp]);
    if( $id > 0){
        insertIntoTable("id_from = :idf , id_to = :idt ,head = :h , body = :b , time_stamp =  :ts", "msg_out",  ["idf" => $id_from, "idt" => $id_to, "h" => $subject, "b"=> $body, "ts" => $time_stamp]);
        
        echo 'done';
        
    }
    
}


elseif (isset ($_GET["MSG_NUMBERS"])) {
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    global $dbh;
    $sql = $dbh->prepare("SELECT"
            . " (SELECT COUNT(*) FROM msg_out WHERE id_from = :idp1  ) AS msg_out, "
            . " (SELECT COUNT(*) FROM msg_income WHERE id_to = :idp2 ) AS msg_income,"
            . " (SELECT COUNT(*) FROM msg_diff WHERE id_to = :idp3 ) AS msg_diff,"
            . " (SELECT COUNT(DISTINCT id_report) FROM report_player WHERE id_player = :idp4) AS report_player");
    
    $sql->execute([
        "idp1"=>$id_player,
        "idp2"=>$id_player,
        "idp3"=>$id_player,
        "idp4"=>$id_player,
    ]);
    
    echo json_encode($sql->fetch(PDO::FETCH_ASSOC));

}

elseif (isset ($_POST["SEND_GUILD_MAIL"])) {

    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $body       = mres($_POST["body"]);
    $subject    = mres($_POST["subject"]);
    $time_stamp = time();
    
    $all_players = selectFromTable("id_player", "guild_member", " id_guild = (SELECT id_guild FROM guild_member WHERE id_player = :idp  AND rank >= :r)", ["idp" => $id_player, "r" =>GUILD_R_SUPERVISOR]);
    foreach ($all_players as $one){
        insertIntoTable("id_from = :idf , id_to = :idt, head = :h, body = :b , from_ = 2, time_stamp = $time_stamp", "msg_income", ["idf" => $id_player, "idt" => $one["id_player"], "h"=> $subject, "b" => $body]);
    }
    
    echo 'sent';
        
   
    
}
