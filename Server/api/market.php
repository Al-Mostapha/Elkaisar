<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_POST["PROPOSE_SELL_OFFER"])){
    
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city    = validateId($_POST["id_city"]);
    $resource   = validateOurStr($_POST["resource"]);
    $unit_price = validateOurStr($_POST["unit_price"]);
    $quantity   = validateId($_POST["quantity"]);
    if($unit_price < 0 || !is_numeric($unit_price)){
        catchHack();
        exit();
    }
    $save_state = new SaveState($id_player);
    
    $save_state->saveCityState($id_city);
    
    $fees = $unit_price*$quantity*0.75/100;
    
    
    if($fees <0 || $quantity < 0){
        file_put_contents("tryToHack.txt", print_r($_POST, TRUE), FILE_APPEND);
        exit();
    }
    
    $cityResCoin  = selectFromTable("`$resource` , coin", "city", "id_city = :idc AND id_player = :idp", ["idc" => $id_city, "idp" => $id_player])[0];
    
    
    if($cityResCoin["coin"] + 10000 < $fees){
        exit( json_encode([
            "state"=>"error"
        ]));
    }else if($cityResCoin[$resource] + 10000 < $quantity){
        exit( json_encode([
            "state"=>"error"
        ]));
    }
    
    $quary = "  `$resource`  = GREATEST( `$resource` - $quantity  , 0) , coin  =  GREATEST( coin - $fees  , 0)";
    $row_count =  updateTable($quary, "city", "id_city = $id_city AND id_player = $id_player AND `$resource` > $quantity - 1000 AND coin > $fees - 1000");
   
        
        $condetion = " deal = 'buy' AND  unit_price >= :up AND resource = :res ORDER BY unit_price DESC LIMIT 10";
    
        $offers = selectFromTable("*", 'market_deal', $condetion, ["up" => $unit_price, "res" => $resource]);

        $now = time();
        $total_done = 0;
        $buyer = [];
        $new_msg_num = 0;

        if(is_array($offers) && count($offers) > 0){

            foreach ($offers as $offer){

                $amount_need = $offer["amount"] - $offer["done"];
                $id_deal      = $offer["id_deal"];
                $id_city_to   = $offer["id_city"];
                $id_player_to = $offer["id_player"];
                $buyer_unit_price = $offer["unit_price"];
                $amount_to_send  = 0;



                if($amount_need > $quantity - $total_done ){

                    updateTable("done = done + ".($quantity - $total_done), "market_deal", " id_deal = $id_deal");
                    $amount_to_send = $quantity-$total_done;
                    $total_price = floor(($quantity-$total_done)*$unit_price);
                    $buyer_price = $amount_to_send*$buyer_unit_price;

                    $total_done = $quantity ;


                }else{

                   deleteTable("market_deal", "id_deal = $id_deal");
                   $total_done += $amount_need;
                   $total_price = floor($amount_need*$unit_price);
                   $amount_to_send = $amount_need;

                   $buyer_price = $amount_to_send*$buyer_unit_price;

                }


                insertIntoTable("id_to = $id_player_to ,"
                        . " head = 'تقرير شراء الموارد'  ,"
                        . " body = 'تمت عملية شراء {$amount_to_send} وحدة من {$RESOURCE_AR_TITLE[$resource]} بسعر {$buyer_price}  '"
                        . " , time_stamp = $now ", "msg_diff");
                insertIntoTable("id_to = $id_player ,"
                        . " head = 'تقرير بيع الموارد'  ,"
                        . " body = 'تمت عملية بيع {$amount_to_send} وحدة من {$RESOURCE_AR_TITLE[$resource]} بسعر {$total_price}  '"
                        . " , time_stamp = $now ", "msg_diff");

                 $buyer[] = ["id_player"=>$id_player_to , "id_city"=>$id_city_to];
                 $new_msg_num++;



                $time_arrive = time() + 30 *60;

                insertIntoTable("id_city_to = $id_city_to , "
                        . " amount = $amount_to_send , id_player_to = $id_player_to ,resource = :res , time_arrive = $time_arrive , unit_price = $unit_price ", "market_buy_transmit", ["res" => $resource]);


                updateTable("coin = coin + $total_price", "city", "id_city = $id_city AND id_player = $id_player");

                if ($total_done >= $quantity){break;}
            }

        }



        if ($total_done < $quantity){

            insertIntoTable("deal = 'sell' , unit_price = $unit_price , amount = $quantity , done = $total_done , "
                    . " resource = :res , id_player = $id_player , id_city = $id_city", "market_deal", ["res" => $resource]);

        }

        echo json_encode([
            "state"=>"ok",
            "city_resource"=> selectFromTable("food , wood, stone, metal, coin", "city", "id_city = $id_city")[0],
            "buyers"=>$buyer,
            "msg_num"=>$new_msg_num,
            "deal_list"=> selectFromTable("*", "market_deal", "id_city = $id_city")
        ]);
    
        
   
    
    

}


else if(isset($_POST["PROPOSE_BUY_OFFER"])){
    
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city    = validateId($_POST["id_city"]);
    $resource   = validateOurStr($_POST["resource"]);
    $unit_price = validateOurStr($_POST["unit_price"]);
    $quantity   = validateId($_POST["quantity"]);
    
    if(!is_numeric($unit_price) || $unit_price < 0){
        catchHack();
        exit();
    }
    $fees = $unit_price*$quantity*0.75/100;
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    $total_payment = $quantity*$unit_price + $fees;
    
    if($total_payment <= 0 ||  $quantity <= 0){
        file_put_contents("tryToHack.txt", print_r($_POST, TRUE), FILE_APPEND);
        exit();
    }
    
    $cityCoin = selectFromTable("coin", "city", "id_player = $id_player AND id_city = $id_city")[0]["coin"];
    
    if($cityCoin + 10000 < $total_payment){
         exit( json_encode([
            "state"=>"error",
            "city_resource"=> selectFromTable("food , wood, stone, metal, coin", "city", "id_city = $id_city")[0],
        ])) ;
    }
    
    updateTable(" coin = GREATEST( coin - $total_payment , 0)", "city", "id_player = $id_player AND id_city = $id_city");
    
    
    $now = time();
     /*لو فى عرض فى السوق بسعر  اقل من السعر دة*/
     
    $condetion = "deal = 'sell' AND  unit_price <= $unit_price AND  resource = :res  ORDER BY unit_price ASC LIMIT 10";
     
    $smallest_offer = selectFromTable("*", 'market_deal', $condetion, ["res" => $resource]);
     
    $msg_num = 0;
    $total_done = 0;
    $seller = [];

     /*  some offers may be available*/
     if(is_array($smallest_offer) && count($smallest_offer) > 0){
         
        foreach ($smallest_offer as $offer){
             
            $amount_avail = $offer["amount"] - $offer["done"];
            $id_deal = $offer["id_deal"];
            $id_city_from = $offer["id_city"];
            $id_player_from = $offer["id_player"];
            $amount_to_send  = 0;
            $seller_unit_price = $offer["unit_price"];

            if($amount_avail > $quantity - $total_done){

               updateTable("done = done + ".($quantity - $total_done), "market_deal", "id_deal = $id_deal");
               $total_price = floor(($quantity-$total_done)*$unit_price);
               $amount_to_send = $quantity-$total_done;
               $total_done = $quantity ;
               
                
                
               

            }else{

                deleteTable("market_deal", "id_deal = $id_deal");
                $total_done += $amount_avail;
                $amount_to_send = $amount_avail;
                $total_price = floor($amount_avail*$unit_price);
               
            }
            
            
            $seller_price = $amount_to_send*$seller_unit_price;
            insertIntoTable("id_to = $id_player ,"
                   . " head = 'تقرير شراء الموارد'  ,"
                   . " body = 'تمت عملية شراء {$amount_to_send} وحدة من {$RESOURCE_AR_TITLE[$resource]} بسعر {$total_price}  '"
                   . " , time_stamp = $now ", "msg_diff");
            insertIntoTable("id_to = $id_player_from ,"
                    . " head = 'تقرير بيع الموارد'  ,"
                    . " body = 'تمت عملية بيع {$amount_to_send} وحدة من {$RESOURCE_AR_TITLE[$resource]} بسعر {$seller_price}  '"
                    . " , time_stamp = $now ", "msg_diff");
            $msg_num++;
            
            
            $seller[] = ["id_player"=>$id_player_from , "id_city"=>$id_city_from];
            
             
            $time_arrive = time() + 30 *60;
            
            insertIntoTable("id_city_to = $id_city , "
                    . " amount = $amount_to_send , id_player_to = $id_player ,resource = :res , time_arrive = $time_arrive , unit_price = $unit_price ", "market_buy_transmit", ["res" => $resource]);
            
            
            updateTable("coin = coin + $total_price", "city", "id_city = $id_city_from");
            
            if ($total_done >= $quantity){break;}
        }
         
    }
    
    
    
    if ($total_done < $quantity){
          
        insertIntoTable(" deal = 'buy' , unit_price = $unit_price , amount = $quantity , done = $total_done , "
                . "resource = :res , id_player = $id_player , id_city = $id_city", "market_deal", ["res" => $resource]);

    }
    
    
    echo json_encode([
        "state"=>"ok",
        "city_resource"=> selectFromTable("food , wood, stone, metal, coin", "city", "id_city = $id_city")[0],
        "seller"=>$seller,
        "msg_num"=>$msg_num,
        "deal_list"=> selectFromTable("*", "market_deal", "id_city = $id_city")
    ]);
        
    
    
    
}


else if(isset ($_GET["GET_MARKET_LIST"])){
    
    $resource = validateOurStr($_GET["resource"]);
    $list_sell = selectFromTable("*", "market_deal", " deal = 'sell' AND resource = :res ORDER BY unit_price ASC  LIMIT 5",  ["res" => $resource ]);
    $list_buy  = selectFromTable("*", "market_deal", " deal = 'buy' AND  resource = :res ORDER BY unit_price DESC  LIMIT 5", ["res" => $resource]);
    
    echo json_encode(["sell_list"=>$list_sell ,"buy_list"=>$list_buy]);
    
}


else if(isset ($_GET["GET_MY_OFFER_LIST"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_city   = validateId($_GET["id_city"]);
    
    $my_offers  = selectFromTable("*", "market_deal", "id_city = $id_city");
    
    echo json_encode($my_offers);
    
}

else if(isset ($_GET["GET_MY_OFFERS_STATUS"])){
    
    $id_player = validateId(cryptUserId($_GET['token'], "d"));
    $id_city   = validateId($_GET["id_city"]);
    
    $my_offers  = selectFromTable("*", "market_buy_transmit", "id_city_to = $id_city");
    
    echo json_encode($my_offers);
    
}


else if(isset ($_POST["CANSEL_MARKT_DEAL"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_deal   = validateId($_POST["id_deal"]);
    $id_city   = validateId($_POST["id_city"]);
    
    $deal = selectFromTable("*", "market_deal", "id_deal = $id_deal AND id_player = $id_player");
    
    
    if($deal[0]['deal']  === 'sell'){
        
        if(deleteTable("market_deal", "id_deal = ".$id_deal) == 1){
            
            $resource = $deal[0]["resource"];
            $toAdd = $deal[0]['amount'] - $deal[0]['done'];
            updateTable("$resource = $resource + ".$toAdd, 'city', "id_city = ".$deal[0]["id_city"]);
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            
            echo json_encode([
                "state"=>"ok",
                "city_resource"=> selectFromTable("food, wood, stone, metal, coin", "city", "id_city = $id_city")[0]
            ]);
            
        }else{
            
            echo json_encode([
                "state"=>"error"
            ]);
            
        }
        
        
        
        
    }else if($deal[0]['deal']  === 'buy'){
        
        if(deleteTable("market_deal", "id_deal = ".$id_deal) == 1){
            
            updateTable("coin = coin + ".ceil((max($deal[0]['amount'] - $deal[0]['done'] , 0))*$deal[0]["unit_price"]), 'city', "id_city = ".$deal[0]["id_city"]);
            
            echo 'done';
        }else{
            
            echo 'error';
            
        }
        
    }
    
    
}


// accelrate arriving deals 
else if (isset ($_POST["ACCELERATE_ARRIVING_DEALS"])){
    
    $id_deal   = validateId($_POST["id_deal"]);
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    $row_count = Matrial::useMatrial("matrial_acce", "shopping_car", 1, $id_player);
    
    
    if($row_count  == 1){
        
        finshDeal($id_deal);
       
        echo json_encode(City::getCityResources($id_city));
        
    }else {
        
        echo 'error';
    }
    
    
    
}

else if(isset ($_GET["GET_TRANSPORTED_RESOURCES"])){
    
    $id_player = validateId(cryptUserId($_GET['token'], "d"));
    $id_city   = validateId($_GET["id_city"]);
   
        
    $list["out"]    = selectFromTable("market_transport.* , city.x , city.y", 'market_transport JOIN city ON market_transport.id_city_to = city.id_city', "id_city_from = :idc", ["idc" => $id_city]);
    $list['in']     = selectFromTable("market_transport.* , city.x , city.y", 'market_transport JOIN city ON market_transport.id_city_from = city.id_city' , "id_city_to = :idc", ["idc" => $id_city]);
    $list['back']   = selectFromTable("market_transport_back.* , city.x , city.y", 'market_transport_back JOIN city ON market_transport_back.id_city_from = city.id_city' , "id_city_to = :idc", ["idc" => $id_city]);
       
    echo json_encode($list);
    
}


else if(isset ($_POST["TRANSMIT_RESOURCE_TO"])){
    exit();
    
    $id_player  = validateId(cryptUserId($_POST['token'], "d"));
    $id_city    = validateId($_POST["id_city"]);
    $food       = validateId($_POST["food"]);
    $wood       = validateId($_POST["wood"]);
    $stone      = validateId($_POST["stone"]);
    $metal      = validateId($_POST["metal"]);
    $coin       = validateId($_POST["coin"]);
    $x_coord    = validateId($_POST["x_coord"]);
    $y_coord    = validateId($_POST["y_coord"]);
    $x_from     = validateId($_POST["x_from"]);
    $y_from     = validateId($_POST["y_from"]);
    $market_lvl = validateId($_POST["market_lvl"]);
    $city =  new City($id_city);
    
    if(
        selectFromTable("COUNT(*) as count", "market_transport", "id_city_from = $id_city")[0]['count'] +
        selectFromTable("COUNT(*) as count", "market_transport_back", "id_city_to = $id_city")[0]['count'] 
            >= $market_lvl){
        exit(json_encode(["state"=>"error_1"]));
    }
    
    
    
    $resource = [
        'food'=>$food,
        "wood"=>$wood,
        "stone"=>$stone,
        "metal"=>$metal,
        "coin"=>$coin,
        "pop"=>0
    ];
    
    if($resource["food"] < 0||$resource["wood"] < 0||$resource["stone"] < 0||$resource["metal"] < 0||$resource["coin"] < 0){
        file_put_contents("tryToHack.txt", print_r($_POST, TRUE), FILE_APPEND);
        exit();
    }
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    if($city->updateResources($id_player, "-", $resource)){
        
        $distance = Battel::calcDistance($x_from, $x_coord, $y_from, $y_coord);
        $lose_ratio = max(20 - $market_lvl , 0);
        $lose_ratio += max(floor($distance/1200000) - $market_lvl , 0);
        
        $city_to = selectFromTable("id_city , name", "city", "x = $x_coord AND y = $y_coord");
        
        if(count($city_to) < 1){
            
            exit(json_encode([
                "state"=>"error_city"
            ]));
            
        }
        
        
        
        $id_city_to = $city_to[0]['id_city'];
        $time_arrive = time() + $distance/300;
        
        $quary = "id_city_from = $id_city , id_city_to = $id_city_to , time_arrive = $time_arrive, "
                . "food = $food, wood = $wood , stone = $stone, metal = $metal , coin = $coin, "
                . "lose_ratio = $lose_ratio";
        
        $id_trans = insertIntoTable($quary, 'market_transport'); 
        
        
        echo json_encode(['state'=>"ok" ,
            "distance"=>$distance ,
            "id_trans"=> $id_trans,
            "time_arrive" =>$time_arrive,
            "city_name" =>$city_to[0]["name"],
            "city"=> selectFromTable("food,wood,stone,metal,coin,pop", "city", "id_city = :idc" , ["idc" => $id_city])[0]
                ]);
        
    }else{
        echo 'error';
    }
    
    
    
}

elseif(isset($_POST["DEALS_TIME_ARRIVE_FINISHED"])){
    exit();
    $id_deal    = validateId($_POST["id_deal"]);
    $id_city    = validateId($_POST["id_city"]);
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    
    $deal = selectFromTable("*", "market_buy_transmit", "id_deal = $id_deal")[0];
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    deleteTable("market_buy_transmit", "id_deal = {$deal["id_deal"]}");
    $row_count = updateTable("`{$deal["resource"]}` = `{$deal["resource"]}` + {$deal["amount"]}", "city", "id_city = $id_city AND id_player = $id_player");
    
    if($row_count > 0){
        
       
        
        echo json_encode([
            "state"=>"ok",
            "city_resource"=> selectFromTable("food, wood, stone, metal, coin", "city", "id_city = {$id_city}")[0]
        ]);
        
    }else{
        json_encode([
            "state"=>"error"
        ]);
    }
    
    
    
}


elseif(isset ($_POST["TRANSPORTER_BACK"])){
    $id_trans = validateId($_POST["id_trans"]);
    deleteTable("market_transport_back", "id_trans = $id_trans");
    
}

elseif(isset($_POST["ACCE_TRANSPORT"])){
    
    $id_trans  = validateId($_POST['id_trans']);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    $row_count = Matrial::useMatrial("matrial_acce", "shopping_car", 1, $id_player);
    if($row_count == 1){
        $now = time();
        updateTable("time_arrive = time_arrive - (time_arrive - $now)/2 , acce  = 1", "market_transport", "id_trans = $id_trans AND acce = 0");
        
    }
    
}






function finshDeal($id_deal){
    exit();
    $deal = selectFromTable("*", "market_buy_transmit", "id_deal = $id_deal");
    
    if(count($deal) > 0){
        
        $resource =  $deal[0]["resource"];
        $amount   =  $deal[0]["amount"];
        $id_city  =  $deal[0]["id_city_to"];
        
        if(deleteTable("market_buy_transmit", "id_deal = $id_deal") == 1){
            updateTable(" `$resource` = `$resource` + $amount", "city", "id_city = $id_city");
        }
        
        
        
       
        
        return TRUE;
        
    }
    
}



