<?php

require_once '../config.php';
require_once '../base.php';


    
if(isset($_POST["JOIN_BATTEL"])){
    
    $id_player = validateId(cryptUserId($_POST['token'], "d"));
    $id_hero   = validateId($_POST["id_hero"]);  
    $side      = validateId($_POST["side"]);     
    $id_battel = validateId($_POST["id_battel"]);   
    $id_city   = validateId($_POST["id_city"]);   
    
    
    if(selectFromTable("in_city", "hero", "id_hero = :idh", ["idh"=> $id_hero])[0]["in_city"] != "1"){
        
        exit(json_encode([
            "state"=>"not_in_city"
        ]));
        
    }
    
   
    
    
    $battel_arr = selectFromTable("battel.id_battel, battel.id_player , battel.time_end, world.t, world.l, "
                . "battel.x_city , battel.y_city,  battel.time_start, battel.x_coord, battel.y_coord",
                "battel JOIN world ON world.x = battel.x_coord AND world.y = battel.y_coord ",
                "battel.id_battel = :idb", ["idb" => $id_battel]);
    
     if($side == SIDE_DEFANCE)
    {
        $count = 
        selectFromTable("*", 
                "battel_member JOIN battel ON battel.id_battel = battel_member.id_battel",
                "battel_member.id_player = :idp AND battel_member.side = :s AND battel.x_coord = :x AND battel.y_coord = :y ", 
                ["idp" => $id_player, "s" => SIDE_ATTACK, "x" =>$battel_arr[0]["x_coord"], "y" =>$battel_arr[0]["y_coord"]]);
        if(count($count) > 0)
            exit(json_encode(["state"=>"error_2_1"]));
    }
    
    if(count($battel_arr) == 0){
        exit(json_encode(["state"=>"error_1"]));
    }
    
    
    $battel = $battel_arr[0];
    
    if(WorldUnit::limitedHero($battel["t"])){
        
        $count_attack = selectFromTable("COUNT(*) AS joiner", "battel_member", "id_battel = :idb AND side = :si", ["idb"=>$id_battel, "si"=>SIDE_ATTACK])[0]["joiner"];
        $count_def    = selectFromTable("COUNT(*) AS joiner", "battel_member", "id_battel = :idb AND side = :si", ["idb"=>$id_battel, "si"=>SIDE_DEFANCE])[0]["joiner"];
        
        if($count_attack >= Battel::MaxJoinNum($battel["t"]) && $side == SIDE_ATTACK){
        
            exit(json_encode(["state"=>"error_2_1"]));
            
        }else if($count_def >= Battel::MaxJoinNum($battel["t"]) && $side == SIDE_DEFANCE){
            exit(json_encode(["state"=>"error_2_2"]));
        }
        
    }
    
    
    
    
    
    
    if(!Battel::canJoin($battel, $id_player, $side)){
        if($side == SIDE_ATTACK){
            exit(json_encode(["state"=>"error_3_1"]));
        }elseif ($side == SIDE_DEFANCE) {
           exit(json_encode(["state"=>"error_3_2"])); 
        } else {
            exit(json_encode(["state"=>"error_3_3"]));
        }
        
    }elseif (Battel::takeNeedsFromJoiner($battel["t"], $id_player) == FALSE) {
        
        exit(json_encode(["state"=>"error_4"]));
        
    }
    
    
    
    
    if(Battel::joinBattel($id_battel, $id_hero, $id_player, $side) > 0){
        
        
        Hero::heroLeaveHome($id_player, $id_hero , Battel::getBattelBackTime($id_battel, $id_hero, $id_city));
        $power_need = Battel::powerNeededForUnit($battel["t"]);
        Hero::decreasePower($id_player, $id_hero, $power_need);
        
        $city = selectFromTable("city.name AS c_name , player.name AS p_name",
                "city JOIN player ON city.id_player = player.id_player",
                "city.x = :bxc AND city.y = :byc", ["bxc" => $battel["x_city"], "byc" =>$battel["y_city"]])[0];
        
        echo json_encode([
            "state"      => "ok",
            "time_end"   => $battel["time_end"],
            "time_start" => $battel["time_start"],
            "unit_type"  => $battel["t"],
            "unit_lvl"   => $battel["l"],
            "x_city"     => $battel["x_city"],
            "y_city"     => $battel["y_city"],
            "c_name"     => $city["c_name"],
            "p_name"     => $city["p_name"],
            "attack_num" => selectFromTable("COUNT(*) AS count", "battel_member", "id_battel = :idb AND side = :si", ["idb"=> $id_battel, "si"=>SIDE_ATTACK ])[0]["count"],
            "defence_num"=> selectFromTable("COUNT(*) AS count", "battel_member", "id_battel = :idb AND side = :si", ["idb"=> $id_battel, "si"=>SIDE_DEFANCE])[0]["count"]
        ]);
        
    }
    
}

elseif(isset ($_GET["get_player_battel"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    global $dbh;

    $sql = $dbh->prepare("SELECT DISTINCT battel.id_battel , battel.time_start ,battel.time_end , battel.y_coord , battel.x_coord ,
                                battel.x_city , battel.y_city FROM `battel`
                                JOIN battel_member ON battel_member.id_battel = battel.id_battel
                            WHERE battel_member.id_player = :idp1 

                            UNION

                            SELECT DISTINCT battel.id_battel , battel.time_start ,battel.time_end , battel.y_coord , battel.x_coord ,
                                battel.x_city , battel.y_city FROM `battel`
                                JOIN city ON city.x = battel.x_coord 
                                AND city.y = battel.y_coord 
                                WHERE city.id_player = :idp2

                            UNION

                            SELECT DISTINCT battel.id_battel , battel.time_start ,battel.time_end , battel.y_coord , battel.x_coord ,
                                battel.x_city , battel.y_city FROM `battel`
                                JOIN world_unit_garrison ON world_unit_garrison.x_coord = battel.x_coord 
                                AND world_unit_garrison.y_coord  = battel.y_coord 
                                WHERE world_unit_garrison.id_player = :idp3");
    
    $sql->execute(["idp1"=>$id_player,"idp2"=>$id_player,"idp3"=>$id_player]);

    $data = [];
    while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
        $city_data             = City::getCityNameByCoords($fetch["x_city"], $fetch["y_city"]);
        $fetch["city_name"]    = $city_data["name"];
        $fetch["player_name"]  = $city_data["p_name"];
        $fetch["attack_num"]   = Battel::returnBattelSideCount($fetch["id_battel"], SIDE_ATTACK);
        $fetch["defence_num"]  = Battel::returnBattelSideCount($fetch["id_battel"], SIDE_DEFANCE);
        $fetch["defence_side"] = Battel::returnDefenceSideData($fetch["id_battel"]);
        $data[] = $fetch;
    }

    echo json_encode($data);
    
}


elseif(isset ($_GET["GET_LEAVING_HEROS"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    global $dbh;
    
    $sql = $dbh->prepare("SELECT battel_member.id_hero , battel_member.id_battel , battel.task , "
            . " battel_member.side , battel.time_start , battel.time_end , battel.x_coord ,"
            . " battel.y_coord , battel.x_city , battel.y_city FROM battel_member JOIN "
            . " battel ON battel.id_battel = battel_member.id_battel AND "
            . " battel_member.id_player = :idp ");
    
    $sql->execute(["idp" => $id_player]);
    
    echo json_encode($sql->fetchALL(PDO::FETCH_ASSOC));
    
}

elseif(isset ($_GET["GET_BACK_HEROS"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    global $dbh;
    $sql = $dbh->prepare("SELECT hero_back.* , hero.id_city , city.x, city.y , "
            . " city.name AS c_name , hero.name AS h_name FROM hero JOIN hero_back"
            . " ON hero.id_player = :idp AND hero.id_hero = hero_back.id_hero  LEFT JOIN"
            . " city ON city.id_city = hero.id_city ");
    
    $sql->execute(["idp" => $id_player]);
    
    echo  json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    
}


elseif(isset ($_GET["GET_BATTEL_FIELD_DATA"])){
    
    $x_coord = validateId(($_GET["x_coord"]));
    $y_coord = validateId(($_GET["y_coord"]));
    
    global $dbh;
    $sql = $dbh->prepare("SELECT battel.id_battel , battel.x_city , battel.y_city FROM  `battel`"
            . " WHERE battel.x_coord = :x AND  battel.y_coord = :y  LIMIT 10");
    $sql->execute(["x"=>$x_coord, "y"=>$y_coord]);

    $data = NULL;
    while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
        $city_data = City::getCityNameByCoords($fetch["x_city"], $fetch["y_city"]);
        $fetch["city_name"] = $city_data["name"];
        $fetch["player_name"] = $city_data["p_name"];
        $data[] = $fetch;
    }

    echo json_encode($data);
    
}

    
elseif(isset ($_GET["GET_BATTEL_FIELD_DETAIL"])){
    
    $id_battel = validateId(($_GET["id_battel"]));

    $fetch = array();
    
    $fetch["attack_num"]  = Battel::returnBattelSideCount($id_battel, SIDE_ATTACK);
    $fetch["defence_num"]  = Battel::returnBattelSideCount($id_battel, SIDE_DEFANCE);
    
    echo json_encode($fetch);
    
}

elseif(isset ($_GET["GET_BATTEL_FIXED_DATA"])){
    
    global $dbh;
    
    if(isset($_GET["id_battel"])){
        
        $id_battel = validateId(($_GET["id_battel"]));
        $p = ["idb" =>$id_battel];
        $sql = $dbh->prepare("SELECT battel.id_battel , battel.time_end , battel.time_start , city.name FROM  `battel` JOIN city ON "
                . " city.x = battel.x_city AND city.y = battel.y_city"
                . " WHERE battel.id_battel = :idb");
    }
    else {
        
        $x_coord = validateId(($_GET["x_coord"]));
        $y_coord = validateId(($_GET["y_coord"]));
        $p  = ["x" =>$x_coord, "y"=>$y_coord];
        
        $sql = $dbh->prepare("SELECT battel.id_battel ,  battel.time_end , battel.time_start , city.name FROM  `battel` JOIN city ON "
                . " city.x = battel.x_city AND city.y = battel.y_city"
                . " WHERE battel.x_coord = :x AND battel.y_coord = :y ");
        
    }
    
    $sql->execute($p);

    $fetch = $sql->fetch(PDO::FETCH_ASSOC);
    

    
    echo json_encode($fetch);
    
}



elseif(isset ($_GET["REFRESH_BATTEL_DATA"])){
    
    
    $id_battel = validateId(($_GET["id_battel"]));
    
    $fetch = array();
    
    $fetch["attack_num"]  = Battel::returnBattelSideCount($id_battel, SIDE_ATTACK);
    $fetch["defence_num"]  = Battel::returnBattelSideCount($id_battel, SIDE_DEFANCE);
    
    echo json_encode($fetch);
}
    
elseif (isset ($_GET["GET_COMING_BACK_HEROS"])) {
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $heros = selectFromTable("*", "hero_back", "id_player = $id_player", ["idp" => $id_player]);
    foreach ($heros as &$one){
        $city = selectFromTable("city.name", "city", "x = '{$one["x_to"]}' AND y = '{$one["y_to"]}'");
        $one["x"] = $one["x_to"];
        $one["y"] = $one["y_to"];
        $one["c_name"] = count($city) > 0 ?  $city[0]["name"] : "--";
    }
    echo json_encode($heros);

}


elseif (isset ($_GET["GET_GARRISON_WORLD_UNIT"])) {
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $units = selectFromTable("world_unit_garrison.* , world.l, world.t , city.name as hero_city, hero.name as hero_name", 
            "world_unit_garrison JOIN  world ON world.x = world_unit_garrison.x_coord "
            . " AND world.y = world_unit_garrison.y_coord JOIN hero ON hero.id_hero = world_unit_garrison.id_hero "
            . " JOIN city ON hero.id_city = city.id_city", "world_unit_garrison.id_player = :idp", ["idp" => $id_player]);
    
    foreach ($units as &$unit){
        if(WorldUnit::isCity($unit["t"])){
            $city = selectFromTable("city.x , city.y , city.name", "city JOIN hero ON hero.id_city = city.id_city", "hero.id_hero = '{$unit["id_hero"]}'")[0];
            $unit["c_name"] = $city["name"];
        }  
    }
    echo json_encode($units);

}

elseif (isset ($_GET["GET_GOINING_SPY_TASKS"])) {
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $units = selectFromTable("spy.* , world.l, world.t , city.name as spy_city", 
            "spy JOIN  world ON world.x = spy.x_to  AND world.y = spy.y_to "
            . " JOIN city ON spy.id_city = city.id_city", "spy.id_player = :idp", ["idp" => $id_player]);
    
    foreach ($units as &$unit){
        if(WorldUnit::isCity($unit["t"])){
            $city = selectFromTable("city.name", "city", "x = '{$unit["x_to"]}' AND y = '{$unit["y_to"]}'")[0];
            $unit["c_name"] = $city["name"];
        }  
    }
    echo json_encode($units);

}



elseif(isset ($_POST["SUPPLY_WORLD_UNIT_HERO"])){
    
    $x_from    = validateId($_POST["x_from"]);
    $y_from    = validateId($_POST["y_from"]);
    $x_to      = validateId($_POST["x_to"]);
    $y_to      = validateId($_POST["y_to"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    
    $unit_type = selectFromTable("t", "world", "x = :x_ AND y = :y_", ["x_" => $x_to, "y_" => $y_to])[0]["t"];
    
    $distance    =  Battel::calcDistance($x_from, $x_to, $y_from, $y_to);
    $hero        =  Hero::getHeroCellArmy($id_hero);
    $slowestType =  Battel::getSlowestType($hero);
    //echo $slowestType;      
    $time = time() + min(ceil($distance/ Battel::$speeds[$slowestType]) , 2*60*60);
    
    if(WorldUnit::isCity($unit_type)){
        
        $cityPlayer = selectFromTable("id_player ,  id_city", "city", "x = :x_ AND y = :y_", ["x_" => $x_to, "y_" => $y_to])[0];
        
        //  لو  اللاعب هو صاحب المدينتين كدة يبقى انا بنقل الابطال 
        if($cityPlayer["id_player"] == $id_player){
            
           
            Hero::heroLeaveHome($id_player, $id_hero);
            
            $quary = "id_hero = :idh, id_player = :idp, x_to = :x, "
                    . "y_to = :y, x_from = :xf , y_from = :yf, task = 5,"
                    . "time_back = :t";
            
            $inParm = [
                "idh"=>$id_hero, 
                "idp"=>$id_player,
                "x"  => $x_to, 
                "y"  => $y_to,
                "xf" => $x_from,
                "yf" => $y_from,
                "t"  => $time
            ];
            insertIntoTable($quary, "hero_back" , $inParm);
            
            
            
            exit(json_encode([
                "state"=>"ok"
            ]));
        }
        
    }
    
    
    $inParm_ = [
                "idh"=>$id_hero, 
                "idp"=>$id_player,
                "x"  => $x_to, 
                "y"  => $y_to,
                "xf" => $x_from,
                "yf" => $y_from,
                "t"  => $time
            ];
    $quary = "id_hero = :idh, id_player = :idp, x_to = :x, "
                    . "y_to = :y, x_from = :xf , y_from = :yf, task = 6,"
                    . "time_back = :t";
    insertIntoTable($quary, "hero_back", $inParm_);
    
    
    echo json_encode([
        "state"=>"ok"
       
    ]);
    
    
    
}


