<?php

require_once '../config.php';
require_once '../base.php'; 



if(isset($_POST["SPY_ON_CITY"])){
    
    
    $id_player = validateId($_POST["id_player"]);
    $x_coord   = validateId($_POST["x_to"]);
    $y_coord   = validateId($_POST["y_to"]);
    $id_city   = validateId($_POST["id_city"]);
    $id_spy    = validateId($_POST["id_spy"]);
    $spy_num   = validateId($_POST["spy_num"]);
    
    // get player  soy count
    $player_spy  = selectFromTable("spies, x, y, name", "city", "id_city = :idc", ["idc" => $id_city]);
    // get victim spy count
    $vectim_spy  = selectFromTable("spies , id_player , id_city, name", 'city', "x = :xc   AND y = :yc", ["xc" => $x_coord, "yc" => $y_coord]);
    $study_victim= selectFromTable("riding, spying", "edu_acad", "id_player = {$vectim_spy[0]["id_player"]}")[0];
    $study_player= selectFromTable("riding, spying", "edu_acad", "id_player = {$id_player}")[0];
    
    $victim_point = $vectim_spy[0]["spies"] + $vectim_spy[0]["spies"]*$study_victim["riding"];
    $player_point = $player_spy[0]["spies"] + $player_spy[0]["spies"]*$study_player["riding"];
    
    $now = time();
    if($victim_point < $player_point){
        
       
        updateTable("spies = {$player_spy[0]["spies"]}  - {$vectim_spy[0]["spies"]}", "city", "id_city = $id_city");
        updateTable("spies = 0 ", "city", "x = $x_coord   AND y = $y_coord");
        
        $id_report = insertIntoTable("id_player = $id_player , x_coord = $x_coord,"
                . " y_coord = $y_coord, spy_city = $id_city , time_stamp = {$now} , state = 1", "spy_report");
                
        $id_report_victim = insertIntoTable("id_player = {$vectim_spy[0]["id_player"]} , x_coord = $x_coord,"
                . " y_coord = $y_coord, spy_city = $id_city , time_stamp = {$now} , state = 1", "spy_report");

        $content = "قام العديد من اللاعبين بحملات تجسس على "
                . " المدينة {$vectim_spy[0]["name"]} [$x_coord , $y_coord] "
                . "و خسرت {$vectim_spy[0]["spies"]} جاسوس خلال هذة العملية";
                
        // vitem report         
        $victim_report = "id_report = $id_report_victim , id_player = {$vectim_spy[0]["id_player"]} ,"
                . " x_coord = $x_coord, y_coord = $y_coord, city_name = '{$vectim_spy[0]["name"]}' ,"
                . " content = '{$content}' , time_stamp = {$now}";
        insertIntoTable($victim_report, "spy_victim");   
        
        
        
        $victim_city = selectFromTable("food , wood , stone , metal, coin , army_a,"
                . " army_b, army_c, army_d, army_e, army_f ", "city", "id_city = {$vectim_spy[0]["id_city"]}")[0];
        $victim_building = selectFromTable("*", "city_building", "id_city = {$vectim_spy[0]["id_city"]}")[0];
        $victim_building_lvl = selectFromTable("*", "city_building_lvl", "id_city = {$vectim_spy[0]["id_city"]}")[0];
        $study_effect = max( 25 - $study_player["riding"]  , 0);
        foreach ($victim_city as $key => $val){
            if($key != "id_city" &&  $key != "id_player"){
                $victim_city[$key]  = $victim_city[$key] == 0?  0 : $victim_city[$key] - $victim_city[$key]* rand(-1*$study_effect*3, $study_effect*3)/100;
            }
        }
        foreach ($victim_building_lvl as $key => $val){
            if($key != "id_city" &&  $key != "id_player"){
                $victim_building_lvl[$key]  = $victim_building[$key] == 0?  0 : max($victim_building_lvl[$key] + rand(-1*$study_effect*2, $study_effect*2) , 1);
            }
        }
        
        $quary = "id_report = $id_report , palace = '{$victim_building["palace"]}-{$victim_building_lvl["palace"]}', wall = '{$victim_building["wall"]}-{$victim_building_lvl["wall"]}',"
        . " seaport = '{$victim_building["seaport"]}-{$victim_building_lvl["seaport"]}', market = '{$victim_building["market"]}-{$victim_building_lvl["market"]}',"
        . " wood = '{$victim_building["wood"]}-{$victim_building_lvl["wood"]}', farm = '{$victim_building["farm"]}-{$victim_building_lvl["farm"]}',"
        . " mine = '{$victim_building["mine"]}-{$victim_building_lvl["mine"]}', lighthouse = '{$victim_building["lighthouse"]}-{$victim_building_lvl["lighthouse"]}',"
        . " stone = '{$victim_building["stone"]}-{$victim_building_lvl["stone"]}', id_city = '{$victim_building["id_city"]}',"
        . " id_player = '{$victim_building["id_player"]}', light_house_1 = '{$victim_building["light_house_1"]}-{$victim_building_lvl["light_house_1"]}',"
        . " light_house_2 = '{$victim_building["light_house_2"]}-{$victim_building_lvl["light_house_2"]}', light_house_3 = '{$victim_building["light_house_3"]}-{$victim_building_lvl["light_house_3"]}',"
        . " light_house_4 = '{$victim_building["light_house_4"]}-{$victim_building_lvl["light_house_4"]}', light_house_5 = '{$victim_building["light_house_5"]}-{$victim_building_lvl["light_house_5"]}',"
        . " light_house_6 = '{$victim_building["light_house_6"]}-{$victim_building_lvl["light_house_6"]}', light_house_7 = '{$victim_building["light_house_7"]}-{$victim_building_lvl["light_house_7"]}',"
        . " light_house_8 = '{$victim_building["light_house_8"]}-{$victim_building_lvl["light_house_8"]}', light_house_9 = '{$victim_building["light_house_9"]}-{$victim_building_lvl["light_house_9"]}',"
        . " light_house_10 = '{$victim_building["light_house_10"]}-{$victim_building_lvl["light_house_10"]}', under_palace_1 = '{$victim_building["under_palace_1"]}-{$victim_building_lvl["under_palace_1"]}',"
        . " under_palace_2 = '{$victim_building["under_palace_2"]}-{$victim_building_lvl["under_palace_2"]}', under_palace_3 = '{$victim_building["under_palace_3"]}-{$victim_building_lvl["under_palace_3"]}',"
        . " under_palace_4 = '{$victim_building["under_palace_4"]}-{$victim_building_lvl["under_palace_4"]}', under_palace_5 = '{$victim_building["under_palace_5"]}-{$victim_building_lvl["under_palace_5"]}',"
        . " under_palace_6 = '{$victim_building["under_palace_6"]}-{$victim_building_lvl["under_palace_6"]}', under_palace_7 = '{$victim_building["under_palace_7"]}-{$victim_building_lvl["under_palace_7"]}',"
        . " under_palace_8 = '{$victim_building["under_palace_8"]}-{$victim_building_lvl["under_palace_8"]}', under_palace_9 = '{$victim_building["under_palace_9"]}-{$victim_building_lvl["under_palace_9"]}',"
        . " under_palace_10 = '{$victim_building["under_palace_10"]}-{$victim_building_lvl["under_palace_10"]}', under_palace_11 = '{$victim_building["under_palace_11"]}-{$victim_building_lvl["under_palace_11"]}',"
        . " under_palace_12 = '{$victim_building["under_palace_12"]}-{$victim_building_lvl["under_palace_12"]}', above_palace_1 = '{$victim_building["above_palace_1"]}-{$victim_building_lvl["above_palace_1"]}',"
        . " above_palace_2 = '{$victim_building["above_palace_2"]}-{$victim_building_lvl["above_palace_2"]}', above_palace_3 = '{$victim_building["above_palace_3"]}-{$victim_building_lvl["above_palace_3"]}',"
        . " above_palace_4 = '{$victim_building["above_palace_4"]}-{$victim_building_lvl["above_palace_4"]}', above_palace_5 = '{$victim_building["above_palace_5"]}-{$victim_building_lvl["above_palace_5"]}',"
        . " above_palace_6 = '{$victim_building["above_palace_6"]}-{$victim_building_lvl["above_palace_6"]}', hill_1 = '{$victim_building["hill_1"]}-{$victim_building_lvl["hill_1"]}',"
        . " hill_2 = '{$victim_building["hill_2"]}-{$victim_building_lvl["hill_2"]}', hill_3 = '{$victim_building["hill_3"]}-{$victim_building_lvl["hill_3"]}',"
        . " hill_4 = '{$victim_building["hill_4"]}-{$victim_building_lvl["hill_4"]}', hill_5 = '{$victim_building["hill_5"]}-{$victim_building_lvl["hill_5"]}',"
        . " hill_6 = '{$victim_building["hill_6"]}-{$victim_building_lvl["hill_6"]}', hill_7 = '{$victim_building["hill_7"]}-{$victim_building_lvl["hill_7"]}',"
        . " hill_8 = '{$victim_building["hill_8"]}-{$victim_building_lvl["hill_8"]}', hill_9 = '{$victim_building["hill_9"]}-{$victim_building_lvl["hill_9"]}', "
        . " hill_10 = '{$victim_building["hill_10"]}-{$victim_building_lvl["hill_10"]}', hill_11 = '{$victim_building["hill_11"]}-{$victim_building_lvl["hill_11"]}',"
        . " hill_12 = '{$victim_building["hill_12"]}-{$victim_building_lvl["hill_12"]}', under_wall_1 = '{$victim_building["under_wall_1"]}-{$victim_building_lvl["under_wall_1"]}', "
        . " under_wall_2 = '{$victim_building["under_wall_2"]}-{$victim_building_lvl["under_wall_2"]}', under_wall_3 = '{$victim_building["under_wall_3"]}-{$victim_building_lvl["under_wall_3"]}',"
        . " under_wall_4 = '{$victim_building["under_wall_4"]}-{$victim_building_lvl["under_wall_4"]}', under_wall_5 = '{$victim_building["under_wall_5"]}-{$victim_building_lvl["under_wall_5"]}',"
        . " under_wall_6 = '{$victim_building["under_wall_6"]}-{$victim_building_lvl["under_wall_6"]}', under_wall_7 = '{$victim_building["under_wall_7"]}-{$victim_building_lvl["under_wall_7"]}',"
        . " under_wall_8 = '{$victim_building["under_wall_8"]}-{$victim_building_lvl["under_wall_8"]}', under_wall_9 = '{$victim_building["under_wall_9"]}-{$victim_building_lvl["under_wall_9"]}',"
        . " under_wall_10 = '{$victim_building["under_wall_10"]}-{$victim_building_lvl["under_wall_10"]}', under_wall_11 = '{$victim_building["under_wall_11"]}-{$victim_building_lvl["under_wall_11"]}',"
        . " under_wall_12 = '{$victim_building["under_wall_12"]}-{$victim_building_lvl["under_wall_12"]}', around_wood_1 = '{$victim_building["around_wood_1"]}-{$victim_building_lvl["around_wood_1"]}',"
        . " around_wood_2 = '{$victim_building["around_wood_2"]}-{$victim_building_lvl["around_wood_2"]}', around_wood_3 = '{$victim_building["around_wood_3"]}-{$victim_building_lvl["around_wood_3"]}', "
        . " food_res = {$victim_city["food"]}, wood_res = {$victim_city["wood"]}, stone_res = {$victim_city["stone"]}, metal_res = {$victim_city["metal"]}, coin_res = {$victim_city["coin"]},"
        . " army_a = {$victim_city["army_a"]}, army_b = {$victim_city["army_b"]}, army_c = {$victim_city["army_c"]}, army_d = {$victim_city["army_d"]}, army_e = {$victim_city["army_e"]},  "
        . " army_f = {$victim_city["army_f"]}";
        
        insertIntoTable($quary, "spy_city");
        
        
        echo json_encode([
            "state"=>"ok",
            "id_victim"=>$vectim_spy[0]["id_player"],
            "victim"=>"city"
        ]);
        
        
    }else{
        
        updateTable("spies = 0", "city", "id_city = $id_city");
        $loss_victim = $vectim_spy[0]["spies"] - $spy_num;
        updateTable("spies = {$vectim_spy[0]["spies"]} - {$spy_num} ", "city", "x = $x_coord   AND y = $y_coord");
        
        
        
        $id_report = insertIntoTable("id_player = {$vectim_spy[0]["id_player"]} , x_coord = $x_coord,"
                . " y_coord = $y_coord, spy_city = $id_city , time_stamp = {$now} , state = 0", "spy_report");
                
        $content = "قامت المدينة {$player_spy[0]["name"]} [{$player_spy[0]["x"]} , {$player_spy[0]["y"]}] بحملة تجسس على المدينة {$vectim_spy[0]["name"]} [{$x_coord} , $y_coord]  باستخدام {$player_spy[0]["spies"]}"
        . " جاسوس وخسرت مدينتك {$player_spy[0]["spies"]} جاسوس خلال هذة الحملة";
        $victim_report = "id_report = $id_report , id_player = {$vectim_spy[0]["id_player"]} ,"
                . " x_coord = $x_coord, y_coord = $y_coord, city_name = '{$vectim_spy[0]["name"]}' ,"
                . " content = '{$content}' , time_stamp = {$now}";
                
        $id_report_player = insertIntoTable("id_player = $id_player , x_coord = $x_coord,"
                . " y_coord = $y_coord, spy_city = $id_city ,"
                . " time_stamp = {$now} , state = 0", "spy_report");       
        $content_player = "فشل محاولة التجسس على المدينة {$vectim_spy[0]["name"]} [$x_coord , $y_coord] وخسرت {$player_spy[0]["spies"]}جاسوس فى هذة المحاولة ";
        $player_report = "id_report = $id_report_player , id_player = {$id_player} ,"
                . " x_coord = $x_coord, y_coord = $y_coord, city_name = '{$vectim_spy[0]["name"]}' ,"
                . " content = '{$content_player}' , time_stamp = {$now}";
        insertIntoTable($victim_report, "spy_victim");
        insertIntoTable($player_report, "spy_victim");
        
        echo json_encode([
            "state"=>"fail",
            "id_victim"=>$vectim_spy[0]["id_player"],
            "victim"=>"city"
        ]);
    }
    
    
}




if(isset($_POST["SPY_ON_Barray"])){
    
    
    $id_player = validateId($_POST["id_player"]);
    $x_coord   = validateId($_POST["x_to"]);
    $y_coord   = validateId($_POST["y_to"]);
    $id_city   = validateId($_POST["id_city"]);
    
    $now = time();
    
    $barray_army  = selectFromTable("*", "army_bar", "x = $x_coord AND y = $y_coord");
    
    $id_report = insertIntoTable("id_player = $id_player , x_coord = $x_coord,"
                . " y_coord = $y_coord, spy_city = $id_city ,"
            . " time_stamp = {$now} , spy_for = 'barrary'  , state = 1", "spy_report");
                
    insertIntoTable("id_report = $id_report , army_a = {$barray_army[0]["army_a"]}, army_b = {$barray_army[0]["army_b"]},"
                    . " army_c = {$barray_army[0]["army_c"]}, army_d = {$barray_army[0]["army_d"]},"
                    . " army_e = {$barray_army[0]["army_e"]},  army_f = {$barray_army[0]["army_f"]}"
                , "spy_barray");
    
   
        
    echo json_encode([
        "state"=>"ok",
        "victim"=>"barrary"
    ]);
        
    
    
}


elseif(isset ($_POST["START_SPY"])){
    
    
    $id_player = validateId($_POST["id_player"]);
    $spy_num   = validateId($_POST["spy_num"]);
    $x_to      = validateId($_POST["x_to"]);
    $y_to      = validateId($_POST["y_to"]);
    $x_from    = validateId($_POST["x_from"]);
    $y_from    = validateId($_POST["y_from"]);
    $id_city   = validateId($_POST["id_city"]);
    
    $unit = selectFromTable("t", "world", "x = $x_to AND y = $y_to")[0];
    if(WorldUnit::isCity($unit["t"])){
        $spy_on =  "city";
    }else{
        $spy_on = "barrary";
    }
    
    
    $distance    =  Battel::calcDistance($x_from, $x_to, $y_from, $y_to);
    $time_arrive = time() +  $distance/2000;
    
    if(selectFromTable("spies", "city", "id_city = $id_city")[0]["spies"] < $spy_num){
        file_put_contents("tryToHackSpie.txt", print_r($_POST, TRUE), FILE_APPEND);
        exit();
    }
    $rowCount  = updateTable("spies = spies - $spy_num", 'city', "id_city = $id_city");
 

    $quary = "id_player = $id_player , id_city = $id_city , x_to = $x_to , "
        . "y_to = $y_to , spy_num = $spy_num , time_arrive = $time_arrive ,"
        . " spy_on = '$spy_on'";
    $id_spy = insertIntoTable($quary, "spy");

    echo json_encode([
        "state"=>"ok",
        "army"=> selectFromTable("army_a, army_b,army_c, army_d,army_e, army_f, spies,id_city", "city", "id_city = $id_city")[0]
    ]);

        

    
    
}


elseif(isset ($_POST["CANCEL_SPY_PROCCESS"])){
    
    $id_spy    = validateId($_POST["id_spy"]);
    $id_player = validateId($_POST["id_player"]);
    
    $spy_num = selectFromTable("spy_num , id_city", "spy", "id_spy = $id_spy")[0];
    $row_count = deleteTable("spy", "id_spy = $id_spy AND id_player = $id_player");
    if($row_count > 0){
        updateTable("spies = spies + {$spy_num["spy_num"]}", "city", "id_city = {$spy_num["id_city"]}");
        echo json_encode([
            "state"=>"ok",
            "army"=> selectFromTable("army_a, army_b,army_c, army_d,army_e, army_f, spies,id_city", "city", "id_city = {$spy_num["id_city"]}")[0]
        ]);
    }else{
        echo json_encode([
            "state"=>"error",
            "army"=> selectFromTable("army_a, army_b,army_c, army_d,army_e, army_f, spies,id_city", "city", "id_city = {$spy_num["id_city"]}")[0]
        ]);
    }
    
    
}


