<?php
require_once '../config.php';
require_once '../base.php';


if(isset($_POST["JOP_HIRING"])){

    
    $id_city        = (int) validateId($_POST["id_city"]);
    $id_player      = (int) validateId(cryptUserId(($_POST['token']), "d"));
    $building_place = validateOurStr($_POST["building_place"]);
    $building_type  = (int) validateId($_POST["building_type"]);
    $number_to_hire = (int) validateId($_POST["num_to_hire"]);
    
    if(!is_numeric($number_to_hire) || $number_to_hire < 1){
        exit( json_encode([
                "state"=>"error_1",
                "error"=>"resourse discounted but jop not hired"
            ]));
    }else if(existInTable("city_jop_hiring", "id_city = :ic", ["ic"=>$id_city]) == 1){
        exit(json_encode(["state"=>"error_2"]));
    }
    
    $city = new City($id_city);
    $building_lvl = $city->getOneBuildingLvl($id_player, $building_place);
    $CITY_JOP = array(
        
        "FARM" =>["food"=>10 ,"wood"=>20, "stone"=>30, "metal"=>15, "time"=>31, "pop"=>1,"produce"=>"food"],
        "WOOD" =>["food"=>15 ,"wood"=>10, "stone"=>20, "metal"=>30, "time"=>31, "pop"=>1,"produce"=>"wood"],
        "STONE"=>["food"=>30 ,"wood"=>15, "stone"=>10, "metal"=>20, "time"=>31, "pop"=>1,"produce"=>"stone"],
        "MINE" =>["food"=>20 ,"wood"=>30, "stone"=>15, "metal"=>10, "time"=>31, "pop"=>1,"produce"=>"metal"],
        
    );
    $bp = strtoupper($building_place);
    if(!array_key_exists($bp, $CITY_JOP)){
        try{
             throw new Exception();
         }catch ( Exception $e ){
             $trace = $e->getTrace();
             file_put_contents("Jop Number.txt", print_r($trace, TRUE), FILE_APPEND);
             file_put_contents("Jop Number.txt", print_r($_POST, TRUE), FILE_APPEND);
             file_put_contents("Jop Number.txt", print_r($_GET, TRUE), FILE_APPEND);

         }
        exit();
    }else if(!is_numeric($building_lvl)){
        try{
             throw new Exception();
         }catch ( Exception $e ){
             $trace = $e->getTrace();
             file_put_contents("Jop Number-.txt", print_r($trace, TRUE), FILE_APPEND);
             file_put_contents("Jop Number-.txt", print_r($_POST, TRUE), FILE_APPEND);
             file_put_contents("Jop Number-.txt", print_r($_GET, TRUE), FILE_APPEND);

         }
        $building_lvl = 0;
    }
    
    
    $total_time = $number_to_hire*($CITY_JOP[$bp]["time"] - $building_lvl);
    
    $cityRes = selectFromTable("food,wood,stone,metal,pop", "city", "id_city = :idc", ["idc" =>$id_city])[0];
    
    if($cityRes["pop"] - 10 < ($CITY_JOP[$bp]["pop"]*$number_to_hire)){
        exit(json_encode(["state"=>"no_pop"]));
    }else if($cityRes["food"] - 10 < ($CITY_JOP[$bp]["food"]*$number_to_hire)){
        exit(json_encode(["state"=>"no_food"]));
    }else if($cityRes["wood"] - 10 < ($CITY_JOP[$bp]["wood"]*$number_to_hire)){
        exit(json_encode(["state"=>"no_wood"]));
    }else if($cityRes["stone"] - 10 < ($CITY_JOP[$bp]["stone"]*$number_to_hire)){
        exit(json_encode(["state"=>"no_stone"]));
    }else  if($cityRes["metal"] - 10 < ($CITY_JOP[$bp]["metal"]*$number_to_hire)){
        exit(json_encode(["state"=>"no_metal"]));
    }
    
    $columns = "pop   = pop   - :po, food  = food  - :fo, wood  = wood  - :wo, stone = stone - :st, metal = metal - :me, pop_state =  -1 "
                ;
    
    $upParm = [
        "po"=>($CITY_JOP[$bp]["pop"]*$number_to_hire),
        "fo"=>($CITY_JOP[$bp]["food"]*$number_to_hire),
        "wo"=>($CITY_JOP[$bp]["wood"]*$number_to_hire) ,
        "st"=>($CITY_JOP[$bp]["stone"]*$number_to_hire),
        "me"=>($CITY_JOP[$bp]["metal"]*$number_to_hire),
        "idc"=> $id_city,
        "idp"=>$id_player
    ];
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    updateTable($columns, "city", "id_city = :idc AND id_player = :idp", $upParm);
    
    $now = time();
    $quary = "id_city = :idc , id_player = :idp , "
            . "time_end  = :te , time_end_org = :teo , time_start = :ts, num = :nu , "
            . "jop_place = :jp";
    
    $inParm = [
        "idc" => $id_city, 
        "idp" => $id_player, 
        "te"  => ($now + $total_time),
        "teo" => ($now + $total_time),
        "ts"  => $now,
        "nu"  => $number_to_hire,
        "jp"  => $building_place
    ];

    insertIntoTable($quary, "city_jop_hiring", $inParm);



    echo json_encode([
        "state"   =>"ok",
        "time_end"=>time() + $total_time,
        "new_res"=> City::getCityResources($id_city),
        "timedTasks"=>$save_state->getTimedTasks()

    ]);
            
       
   


}

else if(isset ($_POST["FINISH_CITY_JOP_HIRING"])){
    
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    
    
    $jop = selectFromTable("*", "city_jop_hiring", "id_city = :idc", ["idc"=>$id_city])[0];
    
    if($jop){
        
        if($jop["time_end"] <= time()+10):
            
            City::deleteFromCityHiring($id_city);
            
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            
           $CITY_JOP = array(
        
                "FARM" =>["food"=>10 ,"wood"=>20, "stone"=>30, "metal"=>15, "time"=>31, "pop"=>1,"produce"=>"food"],
                "WOOD" =>["food"=>15 ,"wood"=>10, "stone"=>20, "metal"=>30, "time"=>31, "pop"=>1,"produce"=>"wood"],
                "STONE"=>["food"=>30 ,"wood"=>15, "stone"=>10, "metal"=>20, "time"=>31, "pop"=>1,"produce"=>"stone"],
                "MINE" =>["food"=>20 ,"wood"=>30, "stone"=>15, "metal"=>10, "time"=>31, "pop"=>1,"produce"=>"metal"],

            );
        
            $condetion = " id_city = :idc";
            $string = $CITY_JOP[strtoupper($jop["jop_place"])]["produce"]
                    ." = ".$CITY_JOP[strtoupper($jop["jop_place"])]["produce"]." + "
                    .$jop["num"];
        
            updateTable($string, "city_jop", $condetion, ["idc" =>  $id_city]);
            $save_state->res_inState($id_city, $CITY_JOP[strtoupper($jop["jop_place"])]["produce"]);
            
            $prestige = new Prestige($id_player);
            $prestige_gain = $prestige->jopGainPrestige($jop["num"]);
            $prestige->adddPrestige($prestige_gain);
            City::addEXPConsole($id_city, $prestige_gain*2);
            echo json_encode([
                "state"=>"ok" , 
                "new_res"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in, coin_in", "city", "id_city = :idc", ["idc" => $id_city])[0],
                "player"=> selectFromTable("gold,guild,prestige,honor", "player", "id_player = :idp", ["idp" => $id_player])[0],
                "prestige"=>$prestige_gain,
                "city_jop"=> selectFromTable("*", "city_jop","id_city = :idc" , ["idc" => $id_city])[0]
                    ]);
            
        endif;
        
    }
    
    
}



elseif(isset ($_POST["ACCE_JOP_UP"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $matrial   = validateOurStr($_POST["matrial"]);
    
    
    $is_ok = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);
    
    if($is_ok > 0){
        
        global  $dbh;
        
        if($matrial == "polit_a"){
            
            $equation = "time_end - 15*60";
            
        }elseif($matrial == "polit_b"){
            
            $equation = "time_end - 60*60";
            
        }elseif($matrial == "polit_c"){
            
            $equation = "time_end - 3*60*60";
            
        }elseif($matrial == "polit_d"){
            $now = time();
            $equation = "time_end - (time_end - $now)*0.3";
            
        }else{
           $equation = "time_end - 0"; 
        }
        
        updateTable("time_end = $equation", "city_jop_hiring", "id_city = :idc", ["idc" => $id_city]);
        
        
    }
    
    $save_state = new SaveState($id_player);
    echo json_encode(
            array(
                "state"=>"ok",
                "timedTasks"=>$save_state->getTimedTasks()
            )
        );
    
}


elseif (isset ($_POST["FIRE_CITY_LABOR"])) {

    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $amount    = validateId($_POST["amount"]);
    $jopFor    = validateOurStr($_POST["jopFor"]);
    
    $CITY_JOP = array(
        
                "food" =>["food"=>5  ,"wood"=>10, "stone"=>15, "metal"=>7],
                "wood" =>["food"=>7  ,"wood"=>5 , "stone"=>10, "metal"=>15],
                "stone"=>["food"=>15 ,"wood"=>7 , "stone"=>5 , "metal"=>10],
                "metal"=>["food"=>10 ,"wood"=>15, "stone"=>7 , "metal"=>5],

            );
    
    
    if(!array_key_exists($jopFor, $CITY_JOP)){
        exit();
    }
    $gain["food"]  = $CITY_JOP[$jopFor]["food"]*$amount;
    $gain["wood"]  = $CITY_JOP[$jopFor]["wood"]*$amount;
    $gain["stone"] = $CITY_JOP[$jopFor]["stone"]*$amount;
    $gain["metal"] = $CITY_JOP[$jopFor]["metal"]*$amount;
    
    $jopNum = selectFromTable("`$jopFor`", "city_jop", " id_city = :idc", ["idc" => $id_city])[0];
    
    if($jopNum < $amount ){
        
        exit(json_encode([
            "state"=>"error_1"
        ]));
        
    }
    
    if($amount <= 0){
        
        exit(json_encode([
            "state"=>"error_2"
        ]));
        
    }
    
    updateTable("`$jopFor` = `$jopFor` - :a", "city_jop", "id_city = :idc AND id_player = :idp", ["a" => $amount, "idc"=> $id_city, "idp" => $id_player]);
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    $quary = " food = food + {$gain["food"]}, wood = wood + {$gain["wood"]}, "
    . "stone = stone + {$gain["stone"]}, metal = metal + {$gain["metal"]} ";
    
   
    updateTable($quary, "city", "id_city = :idc", ["idc"=>$id_city]);
    
    $save_state->res_inState($id_city, $jopFor);
    
    echo json_encode([
        "state"=>"ok",
        "city"=> [
            "res"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in", "city", "id_city = :idc", ["idc" => $id_city])[0],
            "jop"=> selectFromTable("*", "city_jop", "id_city = :idc", ["idc" => $id_city])[0]
            
        ]
    ]);
    
}

elseif(isset ($_POST["CHANEG_CITY_PRODUCTION_RATE"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $foodRate  = validateId($_POST["foodRate"]);
    $woodRate  = validateId($_POST["woodRate"]);
    $stoneRate = validateId($_POST["stoneRate"]);
    $metalRate = validateId($_POST["metalRate"]);
    
    if(!is_numeric($foodRate)  || $foodRate  > 100 || $foodRate  < 0){catchHack(); exit();}
    if(!is_numeric($woodRate)  || $woodRate  > 100 || $woodRate  < 0){catchHack(); exit();}
    if(!is_numeric($stoneRate) || $stoneRate > 100 || $stoneRate < 0){catchHack(); exit();}
    if(!is_numeric($metalRate) || $metalRate > 100 || $metalRate < 0){catchHack(); exit();}
    
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    $quary = "food_rate = :fr, wood_rate = :wr, stone_rate = :sr, metal_rate = :mr";
    $upParm =[
        "fr"=> $foodRate,
        "wr"=> $woodRate,
        "sr"=> $stoneRate,
        "mr"=> $metalRate,
        "idc"=> $id_city,
        "idp"=> $id_player
    ];
   
    
    updateTable($quary, "city_jop", "id_city =  :idc AND id_player = :idp", $upParm);
    
    $save_state->res_inState($id_city, "food");
    $save_state->res_inState($id_city, "wood");
    $save_state->res_inState($id_city, "stone");
    $save_state->res_inState($id_city, "metal");
    
    echo json_encode([
        
        "state"=>"ok",
        "city"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in", "city", "id_city = :idc", ["idc"=>$id_city])[0],
        "cityJop"=> selectFromTable("*", "city_jop", "id_city = :idc", ["idc"=>$id_city])[0]
    ]);
    
    
}