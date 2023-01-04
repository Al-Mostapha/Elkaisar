<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["MATRIAL_DAILY_TRADE"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $matrial   = selectFromTable("*", "exchange_player", "id_player = :idp", ["idp" =>$id_player]);
    
    echo json_encode($matrial);
    
}

else if(isset ($_POST["BUY_TRADE_MATRIAL"])){
    
    
    $id_player     = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city       = validateId($_POST["id_city"]);
    $id_ex         = validateId($_POST["id_ex"]);
    $amountToTrade = validateId($_POST["amountToTrade"]);
    
    if(!($amountToTrade)|| $amountToTrade <= 0){
        catchHack();
        exit("Never try To Hake We know Who you are!");
        $amountToTrade = 1;
        
    }
    

    
    $exchnage = selectFromTable("*", "exchange", "id_ex = :idx", ["idx" => $id_ex]);
    $playerExchange = selectFromTable("*", "exchange_player", "id_trade = :idx AND id_player = :idp" , ["idx"=> $id_ex, "idp" => $id_player]);
    if(!isJson($exchnage[0]["reword"]) || !isJson($exchnage[0]["req"])){
        catchHack();
    }
    $reword = json_decode($exchnage[0]["reword"]);

    
    if($reword->type === "matrial"){
        $playerAmount = Matrial::getAmount("$reword->mat_tab", $reword->matrial, $id_player);
    }else if($reword->type === "equip"){
        
        $playerAmount = selectFromTable(
                "COUNT(*) AS c", "equip", 
                "id_player = :idp AND part = :p AND type = :e",
                ["idp" =>$id_player, "p"=>$reword->part, 
                "e"=>$reword->equip])[0]["c"];
    }
    
    
    
    
    if($playerAmount + $amountToTrade > $exchnage[0]["max_to_have"]){
        exit(json_encode(["state"=> "error_over_max"]));
    }else  if($exchnage[0]["server_take"] + $amountToTrade > $exchnage[0]["server_max"] && !is_null($exchnage[0]["server_max"])){
        
        exit(json_encode(["state"=> "error_3"]));
        
    }else if($playerExchange[0]["take_times"] + $amountToTrade > $exchnage[0]["player_max"]){
        
        exit(json_encode(["state"=> "error_1"]));
        
    }else if(count($exchnage) > 0){
        
        $req = json_decode($exchnage[0]["req"]);
        $getIn = FALSE;
        
        foreach ($req  as $one){
            $a =  $one->amount * $amountToTrade;
            
            if($one->type === "matrial"){
                
                if(Matrial::useMatrial($one->mat_tab, $one->matrial, $a, $id_player) < 1):
                    exit (json_encode(["state"=>"error_2"]));
                endif;
                    
                
            }else if($one->type === "resource"){
                
                if(!$getIn){
                    
                    $save_state = new SaveState($id_player);
                    $save_state->saveCityState($id_city);
                    
                    
                }
                
                if(updateTable("$one->resource_type = GREATEST( $one->resource_type - $a , 0)", "city", "id_city = :idc AND $one->resource_type >=  $a - 1000", ["idc"=>$id_city]) < 1):
                    exit (json_encode(["state"=>"error_4"]));
                endif;
                
                
            } else if($one->type == "equip"){
                
                if(deleteTable("equip", "id_player = :idp AND part = :p AND type = :t LIMIT '$a'", ["idp"=>$id_player, "p"=>$one->part, "t"=>$one->equip]) < 1):
                    exit (json_encode(["state"=>"error_5"]));
                endif;
                
            }else if($one->type == "gold"){
                if($one->amount <= 0){
                     exit (json_decode(["state"=>"error_4"]));
                }
                if(updateTable("gold = gold - :a", "player", "id_player = :idp AND gold > :a2", ["a"=>$a, "idp"=>$id_player, "a2"=>$a]) < 1):
                    exit (json_encode(["state"=>"error_4"]));
                endif;
            }
            
        }
        
        
        
        if($reword->type === "matrial"){
            
            Matrial::addMatrial($reword->mat_tab, $reword->matrial, $reword->amount * $amountToTrade, $id_player);
            
        }else if($reword->type === "equip"){
            
            for($ii = 0; $ii < $amountToTrade; $ii++):
                Equipment::addEquipment($id_player, 0, $reword->equip, $reword->part);
            endfor;
            
        }
        
        
        updateTable("server_take = server_take + $amountToTrade", "exchange", "id_ex = :idx", ["idx" => $id_ex]);
        updateTable("take_times  = take_times  + $amountToTrade", "exchange_player", "id_trade = :idx AND id_player = :idp", ["idx"=>$id_ex, "idp"=>$id_player]);
        
        echo json_encode(["state"=>"ok"]);
        
    }
    
    
}

elseif(isset ($_GET["GET_EXCHANGE_ITEM"])){
    
    echo json_encode(selectFromTable("*", 'exchange', "1"));
    
}

