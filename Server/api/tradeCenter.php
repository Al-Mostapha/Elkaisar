<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["GET_TRADE_LIST"]))
{
   
   $offset = validateId($_GET["offset"]) ? validateId($_GET["offset"]) : 0;
            
   echo json_encode(selectFromTable("buy_item.* , player.name AS p_name", "buy_item JOIN player ON player.id_player = buy_item.id_player", "1 LIMIT 7 OFFSET $offset"));
    
}
elseif(isset($_GET["GET_TOTAL_COUNT"])){
       
   echo json_encode(selectFromTable("COUNT(*)  AS item_count", "buy_item", "1")[0]);
    
}
elseif(isset($_GET["GET_FORBIDDEN_ITEM"])){
       
   echo json_encode(selectFromTable("*", "buy_item_black_list", "1"));
    
}

elseif(isset($_GET["GET_PLAYER_TRADE_LIST"])){
    
    $idPlayer = validateId(cryptUserId(($_GET['token']), "d"));
    echo json_encode(selectFromTable("*", "buy_item", "id_player = $idPlayer"));
    
}



elseif(isset ($_POST['BUY_ITEM'])){
     exit();
    $amount     = abs(validateId($_POST["amount"]));
    $id_item    = validateId($_POST["id_item"]);
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $item_table = validateOurStr($_POST["item_table"]);
    
    $item = selectFromTable("*", "buy_item", "id_item = :it", ["it" => $id_item]);
    exit();
   
    
    if(count($item) < 1){
        
       exit (json_encode(["state" => "error_1"])); 
       
    }else if($amount <= 0 || $amount > $item[0]["amount"]){
        
        exit (json_encode(["state" => "error_2"])); 
        
    } 
    
    $buyVoucherCheck = Matrial::useMatrial("matrial_main", "buy_voucher", $amount, $id_player);
    
    if($buyVoucherCheck < 1){
        exit (json_encode(["state" => "error_6"]));
    }
    
    if($item[0]["price"] <= 0){
        exit (json_encode(["state" => "error_1"])); 
    }
    
    $gold = ($amount*$item[0]["price"]);
    
    if($gold < 0){
        exit (json_encode(["state" => "error_5"]));
    }
    
    $rowCount = updateTable("gold = gold - :g", "player", "id_player = :idp AND porm >= 5 ", ["g" => $gold, "idp" => $id_player]);
    
    if($rowCount > 0){
        
        if(Matrial::addMatrial($item_table, $item[0]['item'], $amount, $id_player) > 0){
            
            updateTable("gold = gold + :g", "player", "id_player = :idp", ["g" => $gold, "idp" =>$item[0]['id_player']]);
            echo json_encode(['state' => "ok"]);
            
            if($amount == $item[0]["amount"]){
                
                deleteTable("buy_item", "id_item = :idt", ["idt" => $id_item]);
                
            }else{
                
                updateTable("amount = amount - :a", "buy_item", "id_item = :idt", ["a" =>$amount, "idt" => $id_item]);
                
            }
            
            
        }else{
            
            echo json_encode(["state" => "error_4"]);
            
        }
        
        
    }else{
       
        echo json_encode(["state" => "error_3"]);
        
    }
        
    
}



elseif(isset ($_POST["SELL_ITEM"])){
     exit();
    $matrial  = validateOurStr($_POST["item"]);
    $price    = validateId($_POST["price"]);
    $amount   = validateId($_POST["amount"]);
    $id_player= validateId(cryptUserId(($_POST['token']), "d"));
    $mat_table= validateOurStr($_POST["mat_table"]);
    
    
    
    $rowCount = Matrial::useMatrial($mat_table, $matrial, $amount, $id_player);
    $sellVoucher = Matrial::useMatrial("matrial_main", "sell_voucher", $amount, $id_player);
    $blackList = selectFromTable("*", "buy_item_black_list", "item = :mt", ["mt" => $matrial]);
    
    if(selectFromTable("porm", "player", "id_player = :idp", ["idp" => $id_player])[0]["porm"] < 7){
        
        exit(json_encode(["state" => "error"]));
        
    }else if($amount <= 0){
        exit(json_encode(["state" => "error_0"]));
    }else if($rowCount < 1){
        
        exit(json_encode(["state" => "error_1"]));
        
    }else if($sellVoucher < 1){
        exit(json_encode(["state" => "error_2"]));
    }else if(count($blackList) > 0){
        exit(json_encode(["state" => "error_3"]));
    }
    else{
        
        $now = time();
    
        $id_item = insertIntoTable("id_player = :idp , amount = :a , price = :p, item = :m , time_stamp = :n", "buy_item",
                ["idp" => $id_player, "a" =>$amount, "p" => $price, "m" =>$matrial, "n" => $now]);

        echo json_encode([
            "state"=>"ok",
            "id_item" => $id_item
        ]);
        
    }
    
    
}


elseif(isset ($_POST["CANCEL_SELL_ITEM_OFFFER"])){
    
    $idPlayer = validateId(cryptUserId(($_POST['token']), "d"));
    $idItem   = validateId($_POST["id_item"]);
    $matTable = validateOurStr($_POST["mat_table"]);
    
    $item = selectFromTable("*", "buy_item", "id_item = :idt", ["idt" => $idItem]);
    
    if(count($item) < 1){
        
        exit(json_encode(["state" => "error_0"]));
        
    }else if($item[0]["id_player"] != $idPlayer){
        
        exit(json_encode(["state" => "error_1"]));
        
    }else{
        
       $rowCount = deleteTable("buy_item", "id_item = :idt", ["idt" => $idItem]);
       
       if($rowCount > 0){
           
           Matrial::addMatrial($matTable, $item[0]["item"], $item[0]["amount"], $idPlayer);
           
           echo (json_encode([
               "state" => "ok",
               "item"=> $item[0]["item"],
               "amount"=> $item[0]["amount"]
               
               ]));
       }else{
           
           echo (json_encode(["state" => "error_2"]));
           
       }
        
    }
    
}

