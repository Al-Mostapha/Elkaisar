<?php
require_once '../config.php';
require_once '../base.php';


if(isset($_GET["get_hero_army"])){
     
    $id_hero   = validateId($_GET["id_hero"]);
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $hero      = new Hero($id_hero);
    $hero_army = $hero->getHeroArmy($id_player);
    
    echo json_encode($hero_army);
}
 

// get equipment for player
elseif(isset ($_GET["get_available_equip"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    echo json_encode(Equipment::retriveEquipByIdPlayer($id_player));
}

// get  hero equips.

elseif(isset($_GET["get_hero_equip"])){
    
    $id_hero   = validateId($_GET["id_hero"]);
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $hero_equip = Equipment::retriveEquipByIdHero($id_hero, $id_player);
    
    $boot["boot"]          = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
    $armor["armor"]        = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
    $shield["shield"]      = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
    $helmet["helmet"]      = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
    $sword["sword"]        = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
    $belt["belt"]          = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
    $necklace["necklace"]  = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
    $pendant["pendant"]    = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
    $ring["ring"]          = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
    $steed["steed"]        = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);
    $player["id_player"]   = $id_player;
    $player["id_hero"]     = $id_hero;
   
    echo json_encode(array_merge($sword , $helmet , $shield , $armor , $boot , $player, $belt, $necklace, $pendant, $ring, $steed));
}


// get city map
elseif(isset ($_GET["get_city_map"])){
    
    $id_city = validateId($_GET["id_city"]);
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $all_citys = selectFromTable("id_city", "city", "id_player = '$id_player'");
    
    $total = [];
    
    foreach ($all_citys as $one){
        
        $city = new City($one["id_city"]);
        $total[] = $city->getRemainCity($id_player);
        
    }
    
    
    echo json_encode($total);
}

// build army
elseif(isset ($_POST["BUILD_ARMY"])){
    
    
    $amount         = validateId($_POST["amount"]);
    $army_type      = validateOurStr($_POST["army_type"]);
    $id_city        = validateId($_POST["id_city"]);
    $building_place = validateOurStr($_POST["building_place"]);
    $worship_place  = validateOurStr($_POST["worship_place"]);
    $id_player      = validateId(cryptUserId(($_POST['token']), "d"));
    $divideBy       = validateOurStr($_POST["divideBy"]);
    
    
    $city = new City($id_city);
    
    if(!is_numeric($amount) || $amount < 1){
        exit(json_encode(["state"=>"error_adding"]));
    }
    
    $resource = $city->army_data[$army_type];
    $resource["food"] *= (int) $amount;
    $resource["wood"] *= (int) $amount;
    $resource["stone"]*= (int) $amount;
    $resource["metal"]*= (int) $amount;
    $resource["coin"] *= (int) $amount;
    $resource["pop"]  *= (int) $amount;
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    $cityResource = selectFromTable("food, wood,stone,metal,coin, pop", "city", "id_city = :idc", ["idc" => $id_city])[0];
    
    if($cityResource["food"] < $resource["food"] - 5000
            || $cityResource["wood"] < $resource["wood"] - 5000
            || $cityResource["stone"] < $resource["stone"] - 5000
            || $cityResource["metal"] < $resource["metal"] - 5000
            || $cityResource["coin"] < $resource["coin"] - 5000
            || $cityResource["pop"] < $resource["pop"] - 1000){
        
        
        
        exit($responce = [
            "state"=>"error_res",
            "new_res"=> selectFromTable("food,wood,stone,metal,pop,coin", "city", "id_city = :idc", ["idc" => $id_city])[0]
            
        ]);
    }
    
    
    if($worship_place != "false"){
        $worship_lvl  = $city->getOneBuildingLvl($id_player, $worship_place);
    }else{
        $worship_lvl = 0;
        
    }
    
    
    $columns = [
        "food  = GREATEST(food - ".$resource["food"]." , 0)",
        "wood  = GREATEST(wood - ".$resource["wood"]." , 0)",
        "stone = GREATEST(stone - ".$resource["stone"]." , 0)",
        "metal = GREATEST(metal - ".$resource["metal"]." , 0)",
        "coin  = GREATEST(coin - ".$resource["coin"]." , 0)",
        "pop   = GREATEST(pop - ".$resource["pop"]." , 0)",
        "pop_state =  -1 "
        
    ];
     
    $city->updateCityColumns($id_player ,  $columns);
   
    
    $id = [];
    
    
    
    if($divideBy == "none"){
        
        $building_lvl = $city->getOneBuildingLvl($id_player, $building_place);
        $workingCount = selectFromTable("COUNT(*)  as count", "build_army", "id_city = :idc AND place = :pl ", ["pl" => $building_place, "idc" => $id_city])[0]["count"];

        if($workingCount >= $building_lvl){
            exit(json_encode(["state"=>"error_adding"]));
        }
        
        
        $last_time = $city->getLastWorkingArmyBuilding($id_player, $building_place);  
        
        if(is_array($last_time) && count($last_time) > 0){
        
            $time_start = $last_time[0]["time_end"];

        }else{

            $time_start = time();

        }
        
        $time_par_unit = $resource["time"];
        $time_par_unit -= (int)($time_par_unit*$building_lvl*1.5/100);
        $time_par_unit -= (int)($time_par_unit*$worship_lvl*3/100);

        $time_end = $time_start + ((int)($time_par_unit*$amount));
        
        
        $id[] = [
                
                "id"         =>$city->addArmyBuild($id_player, $building_place, $army_type, $time_start , $time_end , $amount),
                "time_end"   =>$time_end,
                "time_start" =>$time_start,
                "amount"     =>$amount,
                "place"      =>$building_place,
                "duration"   =>$time_end - $time_start
                
            ];
        
      
        
    }
    
    else{
        
        
        $samePlaces = Building::buildingForArmy($id_city, $army_type);
        
        if(count($samePlaces) == 0){
            exit();
        }
        
        
        $lvlSum = array_sum($samePlaces);
        $arrCount = count($samePlaces);
        
        foreach ($samePlaces as $place => $lvl){
            
            $last_time = $city->getLastWorkingArmyBuilding($id_player, $place);
             if(is_array($last_time) && count($last_time) > 0){
                $time_start = $last_time[0]["time_end"];
            }else{
                $time_start = time();
            }
            
            $amountToBuild = 0;
            
            if($divideBy == "time"){
                
                $amountToBuild = round(($lvl/$lvlSum)*$amount);
                
            }else if($divideBy == "amount"){
                
                $amountToBuild = round(($amount/$arrCount));
            }
            
            $time_par_unit = $resource["time"];
            $time_par_unit -= (int)($time_par_unit*$lvl*1.5/100);
            $time_par_unit -= (int)($time_par_unit*$worship_lvl*3/100);

            $time_end = $time_start + ((int)($time_par_unit*$amountToBuild));
           
            
            
            $ii = $city->addArmyBuild($id_player, $place, $army_type, $time_start , $time_end , $amountToBuild);
            $id[] = [
                
                "id"=>$ii,
                "time_end"=>$time_end,
                "time_start"=>$time_start,
                "amount"=>$amountToBuild,
                "place"=>$place,
                "duration"=>$time_end - $time_start
                
            ];
            
            
        }
        
        
        
        
    }
    
    
    
    $save_state->getConsoleEffect($id_city);
    $save_state->coin_inState($id_city);
    $save_state->res_inState($id_city, "food");
    $save_state->res_inState($id_city, "wood");
    $save_state->res_inState($id_city, "stone");
    $save_state->res_inState($id_city, "metal");
    
    $responce = [
           "state"=>"ok",
           "work"=>$id,
           "time_end"=>$time_start,
           "new_res"=> selectFromTable("food,wood,stone,metal,pop,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city = '$id_city'")[0],
           "amount"=>$amount,
           "army_type"=>$army_type

       ];
   
    
    echo json_encode($responce);
    
    /*  get last finishing time to start after*/
    
    
    
    
    
   
   
    
    
        
        
    
    
    
}




// get  current working army
elseif(isset ($_GET["get_current_working_army"])){
    
    $place       = validateOurStr($_GET["place"]);
    $id_city     = validateId($_GET["id_city"]);
    $id_player   = validateId(cryptUserId(($_GET['token']), "d"));
    $city        = new City($id_city);
    $all_working = $city->getCurrentProArmy($id_player, $place);
    
    
    echo json_encode($all_working);
}



// get name of city when the town is clicked
elseif(isset ($_GET["get_data_by_coords"])){
    
    $x = validateId($_GET["x_coord"]);
    $y = validateId($_GET["y_coord"]);
    
    $data = City::getDataByCoords($x, $y);
    if(is_array($data) && count($data)>0){
        echo json_encode($data);
    }else{
        echo json_encode(NULL);
    }
}




/*__________________________________GET CITY RANK ______________________________*/
elseif(isset ($_GET["get_rank_city"])){
    
    $offset = validateId($_GET["offset"]);
    
    echo json_encode(selectFromTable(" city.name , city.id_city , city.pop , city.lvl ,  player.guild , player.name AS p_name", "city JOIN player ON  player.id_player = city.id_player", "1 ORDER BY pop DESC LIMIT 10 OFFSET $offset"));
    
}


elseif(isset ($_GET["get_rank_city_searsh"])){
    
    $searsh_By    = validateName($_GET["searsh_By"]);
    $search_value = validateName($_GET["search_value"]);
    $sv = "";
    if(is_numeric($search_value) && $searsh_By == "id_player"){
        
        $condetion = "col.`$searsh_By` = :sv";
        $sv = $search_value;
        
    }else{
        
        $condetion = " col.`$searsh_By` LIKE :sv ";
         $sv = "%$search_value%";
    }
    
   
    echo json_encode(selectFromTable(
            "col.name , col.lvl , col.pop, rank_g , player.name as p_name  ,  guild.name AS g_name",
            "(SELECT city.*, @row:=@row+1 as 'rank_g' FROM city ,  (SELECT @row:=0) r ORDER BY city.pop DESC ) AS col JOIN player ON   $condetion AND col.id_player = player.id_player LEFT JOIN guild   ON player.id_guild = guild.id_guild","1 LIMIT 10" ,
            ["sv" => $sv]));
    
}



/*                                SET   CITY   HELPER                         */

elseif(isset ($_POST["SET_CITY_HELPER"])){
    
   $id_player       = validateId(cryptUserId(($_POST['token']), "d"));
   $id_city         = validateId($_POST["id_city"]);
   $helper          = validateId($_POST["helper"]);
   $helper_place    = validateOurStr($_POST["helper_place"]);
   
    
   $city = new City($id_city);
   $row_count = $city->setCityHelper($id_player, $helper);
   $data = [];
   
    if($helper ==  HELPER_POP){
        
        $lvl =  $city->getOneBuildingLvl($id_player, $helper_place);
        $total_cap = City::calPopCap($id_city); 
        $all_pop = $total_cap + $total_cap*0.03*$lvl;
        updateTable("pop_cap = $all_pop", "city", "id_city = '$id_city'");
        $data  ["pop_cap"] = $all_pop;
    }
    
   
   if($row_count > 0){
       echo json_encode(["state"=>"ok" , "data"=>$data]);
   }else{
       echo json_encode(["state"=>"ok" , "data"=>$data]);
   }
    
}
/*                                RESET   CITY   HELPER                      */

elseif(isset ($_POST["RESET_CITY_HELPER"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $helper    = validateId($_POST["helper"]);
   
   $matrial_used = Matrial::useMatrial("matrial_main", "help_house_chng", 1, $id_player);

    if($matrial_used  > 0){
        $data = [];
        if($helper ==  HELPER_POP){
            
            $total_cap = City::calPopCap($id_city); 
            updateTable("pop_cap = $total_cap", "city", "id_city = '$id_city'");
            $data  ["pop_cap"] = $total_cap;
        }
        
        
        $city = new City($id_city);
        $row_count = $city->resetCityHelper($id_player);

        if($row_count > 0){
            echo json_encode(["state"=>"ok" , "data"=>$data]);
        }else{
            echo json_encode(["state"=>"error" , "data"=>$data]);
        }

    }else{
       
        echo 'error';

    }
    
}

/*                                GET   CITY   WOUNDED SOLIDIER               */

elseif(isset ($_GET["GET_PLAZA_ARMY"])){
    
   $id_player = validateId(cryptUserId(($_GET['token']), "d"));
   $id_city   = validateId($_GET["id_city"]);
   
   $city = new City($id_city);
   
   $wounded = $city->getCityWounded($id_player);
   
   if($wounded != FALSE){
       
       echo json_encode($wounded);
   }
    
}

/*   cure wounded            */

elseif(isset ($_POST["CURE_SOLIDIER"])){
    
   $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
   $id_city    = validateId($_POST["id_city"]);
   $army_type  = validateOurStr($_POST["army_type"]);
   $armyAmount = selectFromTable("`$army_type`", "city_wounded", "id_player = :idp AND id_city = :idc", ["idp" => $id_player, "idc" => $id_city])[0][$army_type];
  
   
   $army_price = [
       "army_a" => 18, // مشاة
       "army_b" => 500,// فرسان
       "army_c" => 600,// مدرعين
       "army_d" => 30, // رماة
       "army_e" => 120,// مقاليع
       "army_f" => 450 // منجنيق
   ];
   
   if(!array_key_exists($army_type, $army_price)){
       exit();
   }
   
   $coin_amount = $army_price[$army_type] * $armyAmount;
   $save_state = new SaveState($id_player);
   $save_state->saveCityState($id_city);
   
   $cityCoin = selectFromTable("coin", "city", "id_city = :idc", ["idc" => $id_city])[0]["coin"];
   
   
   if($cityCoin + 10000 < $coin_amount){
       file_put_contents("cure-hake-1.txt", print_r($_POST, TRUE), FILE_APPEND);
       exit(json_encode(["state"=>"no_coin", "amount"=>$coin_amount]));
   }else if($amount < 0){
       file_put_contents("cure-hake-3.txt", print_r($_POST, TRUE), FILE_APPEND);
       exit(json_encode(["state"=>"error_1"]));
   }
   
   updateTable("coin = GREATEST(0 , coin - :ca)", "city", "id_city = :idc AND id_player = :idp", ["idc" => $id_city, "idp" => $id_player, "ca" => $coin_amount]);
   updateTable("`$army_type` = 0 ", "city_wounded", "id_city = :idc  AND id_player = :idp AND `$army_type` = :aa", ["idc"=> $id_city, "idp" => $id_player, "aa" => $armyAmount]);
   updateTable("`$army_type` = `$army_type` + :aa", "city", "id_city = :idc AND id_player = :idp", ["aa" => $armyAmount, "idc" => $id_city, "idp" => $id_player]);
   $save_state->food_OutState($id_city);
   
    echo json_encode(
        [
            "army_type"=>$army_type,
            "amount"=> $armyAmount,
            "state"=>"ok",
            "coin"=>$coin_amount,
            "city"=> selectFromTable("food,wood,stone,metal,coin,food_out,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = :idc", ["idc" => $id_city])[0],
            "id_city"=>$id_city
        ]
    );
   
  
    
}

        /*------------------------------------------------------------*/
/******************************FIRE_WOUNDED_SOLIDIER***************************/

elseif(isset ($_POST["FIRE_WOUNDED_SOLIDIER"])){
    
    
    $id_player   = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city     = validateId($_POST["id_city"]);
    $army_type   = validateOurStr($_POST["army_type"]);
    $armyAmount = selectFromTable("`$army_type`", "city_wounded", "id_player = :idp AND id_city = :idc", ["idp" => $id_player, "idc" => $id_city])[0][$army_type];
    
    if($armyAmount <= 0){
        exit();
    }
    
    $army_price = [ "army_a","army_b","army_c" ,"army_d","army_e","army_f"];
   
    if(!in_array($army_type, $army_price)){
        exit();
    }
    $rc = updateTable("`$army_type` = 0 ", "city_wounded", "id_city = :idc AND id_player = :idp AND `$army_type` >= :aa ", ["idc" => $id_city, "idp" => $id_player, "aa" => $armyAmount]);
    
    
  
        
    $city = new City($id_city);
    /*  initial data*/

    $resource["food"]  = (int) $city->army_data[$army_type]["food"]*$armyAmount/3;
    $resource["wood"]  = (int) $city->army_data[$army_type]["wood"]*$armyAmount/3;
    $resource["stone"] = (int) $city->army_data[$army_type]["stone"]*$armyAmount/3;
    $resource["metal"] = (int) $city->army_data[$army_type]["metal"]*$armyAmount/3;
    $resource["coin"]  = (int) $city->army_data[$army_type]["coin"]*$armyAmount/3;
    $resource["pop"]   = 10;



    $check = $city->updateResources($id_player, "+", $resource);

    if($check === TRUE){

        echo json_encode(array(
          "food" => $resource["food"] ,
          "wood" => $resource["wood"], 
          "stone"=> $resource["stone"],
          "metal"=> $resource["metal"],
          "coin" => $resource["coin"] ,
          "pop"  => $resource["pop"]  ,
          "state"=> "ok"
        ));

    }else{
        echo json_encode(array(
          "state"=> "'الجيش اتمسح بس الموارد طارت'"
        ));
    }
        
   
    
}




elseif (isset ($_POST["CHANGE_CITY_NAME"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $new_name  = validateName($_POST["new_name"]);
    
    
    $city = new City($id_city);
    
    if($city->UPDATE($id_player, "name", $new_name) > 0){
        echo "done";
    }

}

elseif (isset ($_POST["CHANGE_CITY_TAXS"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $new_val   = validateId($_POST["new_val"]);
    
    if($new_val <= 100){
        
        $city = new City($id_city);
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->coin_inState($id_city);
        
        if($city->UPDATE($id_player, "taxs", $new_val) > 0){
            updateTable("loy = 100 - $new_val", "city", "id_city = $id_city");
            echo json_encode([
                "state" => "ok" ,
                "city"=> selectFromTable("food,wood,stone,metal,coin,coin_in,taxs", "city", "id_city = '$id_city'")[0]
                ]);
        }else{
            echo json_encode(["state" => "error_1"]);
        }
        
    }else{
       echo json_encode(["state" => "error_2"]); 
    }
    
    

}


elseif (isset ($_POST["EXPAND_CITY"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $city_lvl  = validateId($_POST["current_lvl"]);
    
    if($city_lvl < 0){
        catchHack();
        exit();
    }
    
    $row_count = Matrial::useMatrial("matrial_main", "expan_plan", pow(2, $city_lvl), $id_player);
    $city_on_map = selectFromTable("x,y, lvl", "city", "id_city = :idc", ["idc" => $id_city]);
    
    if($row_count > 0){
        
      $city = new City($id_city);
    
        if($city->expandCity($id_player , $city_lvl) > 0){
            
            updateTable("t = t + 1", "world", "x = '{$city_on_map[0]["x"]}' AND y =  '{$city_on_map[0]["y"]}' AND t < 20");
            
            echo "done";
        }  
        
    }
    

}



else if(isset ($_GET["GET_CITY_RESOURCES"])){

   $id_player = validateId(cryptUserId(($_GET['token']), "d"));
   $id_city   = validateId($_GET["id_city"]);
   
   
   $save_state = new SaveState($id_player);
   
   $save_state->saveCityState($id_city);
   
   echo json_encode(City::getCityResources($id_city));
    
}


else if(isset ($_POST["UPDATE_CITY_POP"])){

    
   $id_player      = validateId(cryptUserId(($_POST['token']), "d"));
   $id_city        = validateId($_POST["id_city"]);
   
   $wor_ship_lvl   = 0;
   
   if(!is_numeric($id_player)){
       exit(json_encode([
            "state"=>"error_id_player"
        ])) ;
   }
   
   $allCities = selectFromTable("pop,pop_state,pop_LSS,pop_cap,helper,taxs,id_city", "city", "id_player = :idp", ["idp" => $id_player]);
   
   foreach ($allCities as $oneCity){
       
       $city = new City($oneCity['id_city']);
       
       $wor_ship_lvl = $oneCity["helper"] == 2 ?  City::buildingLvlByType($oneCity['id_city'], WORSHIP) : 0;

       
       
        $estemated_pop = ceil($oneCity["pop_cap"] + ($oneCity["pop_cap"]*0.03*$wor_ship_lvl) - (($oneCity["taxs"]*$oneCity["pop_cap"])/100 ));
        $_5percent_pop = max(ceil($estemated_pop * 5/100) , ceil($oneCity["pop"]*5/100));
        
        $diff_time = time() -  $oneCity["pop_LSS"];
   
        $first_shot = max(1 , ($diff_time/(60*6)));

        if($oneCity["pop"] < $estemated_pop){

            $to_add = min($oneCity["pop"] + $first_shot*$_5percent_pop , $estemated_pop);

            updateTable("pop = $to_add , pop_LSS = ".time(), "city", "id_city = '{$oneCity["id_city"]}'");

        }else if($oneCity["pop"] > $estemated_pop){

            $to_add = max($oneCity["pop"] - $first_shot*$_5percent_pop , $estemated_pop);
            updateTable("pop = $to_add , pop_LSS = ".time(), "city", "id_city = '{$oneCity["id_city"]}'");

        }
        
    }
    
    
    if(is_numeric($id_city)){
        
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->getConsoleEffect($id_city);
        $save_state->coin_inState($id_city);
        $save_state->res_inState($id_city, "food");
        $save_state->res_inState($id_city, "wood");
        $save_state->res_inState($id_city, "metal");
        $save_state->res_inState($id_city, "stone");

        echo json_encode([
            "state"=>"ok",
            "city"=> selectFromTable("food,wood,stone,coin,metal,food_in,wood_in,stone_in,metal_in,coin_in,pop", "city", "id_city = '$id_city'")[0]
        ]);
        
    }
   
  
   
    
}



elseif (isset ($_GET["GET_CITY_STORAGE"])) {

    $id_city = validateId($_GET["id_city"]);
    
    $storage = selectFromTable("*","city_storage", "id_city = '$id_city'");
    
    echo json_encode($storage[0]);
    
}




else if(isset ($_POST["DISMESS_CITY_ARMY"])){
    
    
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $amount    = validateId($_POST["amount"]);
    $type      = validateOurStr($_POST["army_type"]);
    
    if(!is_numeric($amount) || $amount < 1){
        catchHack();
        exit(json_encode(["state"=>"error"]));
    }
    
    
    $dismess_res = [
        'army_a'=>["coin"=>5,   "food"=>45,  "wood"=>150, "stone"=>0,    "metal"=>30,  "pop"=>1],
        'army_b'=>["coin"=>150, "food"=>450, "wood"=>240, "stone"=>0,    "metal"=>225, "pop"=>3],
        'army_c'=>["coin"=>180, "food"=>600, "wood"=>150, "stone"=>0,    "metal"=>750, "pop"=>6],
        'army_d'=>["coin"=>9,   "food"=>90,  "wood"=>105, "stone"=>0,    "metal"=>90,  "pop"=>1],
        'army_e'=>["coin"=>36,  "food"=>300, "wood"=>350, "stone"=>0,    "metal"=>240, "pop"=>4],
        'army_f'=>["coin"=>135, "food"=>900, "wood"=>900, "stone"=>1800, "metal"=>360, "pop"=>8],
        'wall_a'=>["coin"=>0,   "food"=>15,  "wood"=>150, "stone"=>30,   "metal"=>15,  "pop"=>0],
        'wall_b'=>["coin"=>0,   "food"=>60,  "wood"=>600, "stone"=>300,  "metal"=>150, "pop"=>0],
        'wall_c'=>["coin"=>0,   "food"=>180, "wood"=>0,   "stone"=>2400, "metal"=>0,   "pop"=>0],
        'spies'=> ["coin"=>27,  "food"=>180, "wood"=>45,  "stone"=>0,    "metal"=>105, "pop"=>0]
    ];
    
    if(!array_key_exists($type, $dismess_res)){
        exit();
    }
    $unit_army = $dismess_res[$type];
    
    $food  = $amount*$unit_army["food"];
    $wood  = $amount*$unit_army["wood"];
    $metal = $amount*$unit_army["metal"];
    $stone = $amount*$unit_army["stone"];
    $pop   = $amount*$unit_army["pop"];
    $coin  = $amount*$unit_army["coin"];
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    $quary = " food = food + $food, wood = wood + $wood,"
            . " stone = stone + $stone, metal = metal + $metal, pop = pop + $pop,"
            . " coin = coin + $coin, `$type` = `$type` - $amount";
    $row_count = updateTable($quary, 'city', "id_city = '$id_city' AND `$type` >= '$amount' AND id_player = '$id_player'");
    $save_state->food_OutState($id_city);
    

    $resource = selectFromTable("food, stone, wood, metal, coin, pop, food_out", "city", "id_city = :idc" , ["idc" => $id_city]);
    $resource[0]["state"] = 'ok';
    echo json_encode($resource[0]);
        
   
    
}


elseif(isset ($_GET["AFTER_BATTEL_FINISH_REFRESH"])){
    
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_city   = validateId($_GET["id_city"]);
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    $save_state->food_OutState($id_city);
    
    echo json_encode([
        "state"=>"ok",
        "city"=> selectFromTable("food,wood,stone,metal,coin,food_out", "city", "id_city = :idc", ["idc" => $id_city])[0]
    ]);
    
}

elseif(isset ($_GET["GET_CITY_HEROS"])){
    
    $id_city   = validateId($_GET["id_city"]);
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $city = new City($id_city);
    echo json_encode($city->getCityHeros($id_player));
}


elseif(isset ($_GET["GET_CITY_DATA"])){
    
    $id_city   = validateId($_GET["id_city"]);
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    
    $city = new City($id_city);
    if(!is_numeric($id_city) || !is_numeric($id_player)){
        exit();
    }
    $save_state  = new SaveState($id_player);
    $save_state->getConsoleEffect($id_city);
    $save_state->res_inState($id_city, "food");
    $save_state->res_inState($id_city, "wood");
    $save_state->res_inState($id_city, "stone");
    $save_state->res_inState($id_city, "metal");
    $save_state->coin_inState($id_city);
    $save_state->coin_outState($id_city);
    $save_state->food_OutState($id_city);
    
    
    echo json_encode([
        "cityData"=> Player::getCityById($id_city),
        "cityBuilding"=> $city->getRemainCity($id_player)
    ]);

}

