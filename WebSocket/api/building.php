<?php
require_once '../config.php';
require_once '../base.php';

if(isset($_POST["upgrade_building"])){
    
    
    $id_player    = validateId(cryptUserId($_POST['token'], "d"));
    $id_city      = validateId($_POST["id_city"]);
    $place        = validateOurStr($_POST["place"]);
    $lvl          = selectFromTable($place, "city_building_lvl", "id_player = :idp AND id_city = :idc", ["idp" => $id_player, "idc"=>$id_city])[0][$place];
    $type         = selectFromTable($place, "city_building", "id_player = :idp AND id_city = :idc", ["idp" => $id_player, "idc"=>$id_city])[0][$place];
    $wor_ship_lvl = validateId($_POST["worship_helper"]);
    
    if($wor_ship_lvl > 30){
        catchHack();
        exit();
    }
    if(!is_numeric($id_player) ||
            !is_numeric($id_city)||
            !is_numeric($lvl)){
        catchHack();
        exit();
            }
    
    
    $CW_count = selectFromTable("COUNT(*) AS count", "city_worker", "id_city = :idc", ["idc" => $id_city])[0]["count"];
    $motiv = selectFromTable("motiv", "player_stat", "id_player = :idp", ["idp" => $id_player])[0]["motiv"];
    
    if($CW_count >= 1 && $motiv < time()){
        exit (json_encode(array(
                "state"         => "error_3"
            )));
    }
    
    $building_obj = new Building($id_player, $id_city, $lvl, $type, $place);
    $city = new City($id_city);
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    
    
    $resource_need = $building_obj->getResource();
    
    if(selectFromTable("helper", "city", "id_city = :idc", ["idc" => $id_city])[0]["helper"] == HELPER_BUILD){
        $resource_need["time"] -= $resource_need["time"]*$wor_ship_lvl*0.03;
    }
    
   
    
    
    if($type == PALACE && $lvl >= 25){
        
       $mat_chek =  Matrial::useMatrial("matrial_flags", "law_3", 5, $id_player);
       
    }elseif ($type == PALACE && $lvl >= 20) {
        
        $mat_chek =  Matrial::useMatrial("matrial_flags", "law_2", 5, $id_player);
        
    }elseif ($type == PALACE && $lvl >= 10) {
        
        $amount_array = [5,5,5,8,8,8,10,10,10,10];
        $mat_chek =  Matrial::useMatrial("matrial_flags", "law_1", $amount_array[$lvl - 10], $id_player);
    }

    if($type === PALACE && $mat_chek  < 1){
        exit(json_encode(array("state"=> "error_2")));
    }

    if ($building_obj->isUpgradeable($resource_need) === TRUE  && $city->updateResources($id_player, "-", $resource_need)){

        if($building_obj->upgradeBuilding($resource_need["time"]) == TRUE){

            echo (json_encode(array(
                "type"          => "building",
                "task"          => "upgrade",
                "state"         => "ok",
                "time_end"      => time() + $resource_need["time"],
                "building_place"=>$place,
                "city_res"      => selectFromTable("food,wood,stone,metal,coin", "city", "id_city = :idc", ["idc" => $id_city])[0],
                "timedTasks"    =>$save_state->getTimedTasks()
            )));

        }else{


            echo (json_encode(array(
                "state"         => "error_1"
            )));


        }

    }else{

        echo (json_encode(array(
               "state"         => "error_2"
           )));

    }
        
}


if(isset($_POST["downgrade_building"])){
    
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $lvl       = validateId($_POST["lvl"]);
    $type      = validateId($_POST["type"]);
    $place     = validateOurStr($_POST["place"]);
    
    $building_obj = new Building($id_player, $id_city, $lvl, $type, $place);
    $resource_need = $building_obj->getResource();
    $save_state = new SaveState($id_player);
    
    if($building_obj->downgradeBuilding($resource_need["time"]/2) === TRUE){
        
        echo (json_encode(array(
            "type"          => "building",
            "task"          => "upgrade",
            "state"         => "ok",
            "time_end"      => time() + $resource_need["time"]/2,
            "building_place"=>$place,
            "timedTasks"    =>$save_state->getTimedTasks()
        )));
        
    }            
                
    
                
            
}



elseif(isset ($_POST["ACCE_BUILDING_UP"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $place     = validateOurStr($_POST["building_place"]);
    $matrial   = validateOurStr($_POST["matrial"]);
    
    
    $is_ok = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);
    
    if($is_ok > 0){
        
       $done =  Building::acceBuildingUp($id_city, $id_player, $matrial, $place);
        
    }
    
    if($done > 0){
        $save_state = new SaveState($id_player);
        
        echo json_encode(
                    array(
                        "state"=>"ok",
                        "timedTasks"=>$save_state->getTimedTasks()
                    )
                );        
    }
    
}



elseif(isset ($_POST["FINISH_UPGRADE_BUILDING"])){
    
    $id_city   = validateId($_POST["id_city"]);
    $lvl_to    = validateId($_POST["lvl_to"]);
    $place     = validateOurStr($_POST["place"]);
    $type      = validateId($_POST["type"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
   $building_obj = new Building($id_player, $id_city, $lvl_to, $type, $place);
   $bEndTime = selectFromTable("*", "city_worker", "id_city = :idc   AND id_player = :idp AND place = :p" , ["idc" => $id_city, "idp"=>$id_player, "p" =>$place]);
   
   if(count($bEndTime) == 0){
       exit(json_encode(["state"=>"error_0"]));
   }else if($bEndTime[0]["time_end"] > time() + 120){
       exit(json_encode(["state"=>"error_1"]));
   }else{
       
       deleteTable("city_worker", "id_city = :idc "
                . " AND id_player = :idp AND place = :p",
               ["idc" => $id_city, "idp" =>$id_player, "p" => $place]);
       $building_obj->buildingLvlUp() ;
   }
   
  
}


elseif(isset ($_POST["FINISH_DOWNGRADE_BUILDING"])){
    
    $id_city   = validateId($_POST["id_city"]);
    $lvl_to    = (int)validateId($_POST["lvl_to"]);
    $place     = validateOurStr($_POST["place"]);
    $type      = (int)validateId($_POST["type"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    
    
    
   $building_obj = new Building($id_player, $id_city, $lvl_to, $type, $place);
   
   $bEndTime = selectFromTable("*", "city_worker", "id_city = :idc "
                . " AND id_player = :idp AND place = :p", 
           ["idc" => $id_city, "idp" =>$id_player, "p" => $place]);
   
   if(count($bEndTime) == 0){
       exit(json_encode(["state"=>"error_0"]));
   }else if($bEndTime[0]["time_end"] > time() + 120){
       exit(json_encode(["state"=>"error_1"]));
   }else{
       
       deleteTable("city_worker", "id_city = :idc "
                . " AND id_player = :idp AND place = :p", 
               ["idc" => $id_city, "idp" =>$id_player, "p" => $place]);
      $building_obj->afterBuildingLvlDown() ;
   }
   
  
    
}


elseif(isset ($_POST["CONSTRUCT_BUILDING"])){
    
    
    $id_player         = validateId(cryptUserId(($_POST['token']), "d"));
    $building_to_build = validateOurStr($_POST["building_to_build"]);
    $building_place    = validateOurStr($_POST["building_place"]);
    $id_city           = validateId($_POST["id_city"]);
    $city              = new City($id_city);
    
    
    if($building_to_build >= 6){   // unique building in  city
        
        
        
        $city_building = $city->getCityBuiling($id_player);
        
        $founed = FALSE;
        
        foreach ($city_building as $key => $value) {
            
            if($city_building[$key] == $building_to_build && $key != "id_player" && $key != "id_city"){
                
                $founed = TRUE;
                
            }
            
        }
        
        if( !$founed ){ // if not found
            
            $row_count =  $city->build_A_Building($building_place, $building_to_build, $id_player);
            
            echo ($row_count  === 1 ? "done" : "error");
        
            
        }else{
            
            echo 'no_duplicate';
            
        }
       
        
        
    }else{   // multiple building in city
        
        $row_count =  $city->build_A_Building($building_place, $building_to_build, $id_player);
            
        echo ($row_count  === 1 ? "done" : "error");
            
    }
    
 
    
}

elseif (isset ($_POST["CANCEL_BUILDING_UPGRADE"])){
    
    $id_city   = validateId($_POST["id_city"]);
    $lvl_to    = validateId($_POST["lvl"]);
    $place     = validateOurStr($_POST["place"]);
    $type      = validateId($_POST["type"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    $building_obj = new Building($id_player, $id_city, $lvl_to, $type, $place);
    
    if($building_obj->cancelWorker() > 0){
        
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        
        $buildingRes = json_decode(file_get_contents(BASE_BATH."js".JS_VERSION."/json/building.json") , TRUE);
        
        $resToReturn = $buildingRes[$type]["lvl_req"][$lvl_to];
        
        $city = new City($id_city);
        $city->updateResources($id_player, "+", [
            "food"=>$resToReturn["food"]*BUILDING_CANCEL_LOSE_RATIO,
            "wood"=>$resToReturn["wood"]*BUILDING_CANCEL_LOSE_RATIO,
            "stone"=>$resToReturn["stone"]*BUILDING_CANCEL_LOSE_RATIO,
            "metal"=>$resToReturn["metal"]*BUILDING_CANCEL_LOSE_RATIO,
            "coin"=>0,
            "pop"=>0
        ]);
        
        
        echo json_encode([
            
            "state"=>"ok",
            "city"=> selectFromTable("food,wood,stone,metal,coin", "city", "id_city = :idc", ["idc"=>$id_city])[0]
            
        ]);
        
    }else{
        
        echo 'error';
        
    }
    
}


/*
    CHANGE CITY STORAGE
 *  */

elseif(isset ($_POST["CHANGE_CITY_STORAGE_PERCENT"])){
    
    $food_perc    = validateId($_POST["food_percent"]);
    $wood_perc    = validateId($_POST["wood_percent"]);
    $metal_perc   = validateId($_POST["metal_percent"]);
    $stone_perc   = validateId($_POST["stone_percent"]);
    $id_city      = validateId($_POST["id_city"]);
    $id_player    = validateId(cryptUserId(($_POST['token']), "d"));
    
    if($food_perc + $wood_perc + $metal_perc + $stone_perc > 100){
        exit();
    }
    
    if($food_perc < 0 || $wood_perc < 0 || $metal_perc < 0 || $stone_perc < 0 ){
        exit();
    }
    if(!is_numeric($food_perc) || !is_numeric($wood_perc)||!is_numeric($metal_perc)|| !is_numeric($stone_perc)){
        exit();
    }
    
    
    $total_storage_cap = selectFromTable("total_cap", "city_storage", "id_city = :idc", ["idc" => $id_city]);
    
    
    $food_cap  = floor($total_storage_cap[0]["total_cap"]*$food_perc/100);
    $wood_cap  = floor($total_storage_cap[0]["total_cap"]*$wood_perc/100);
    $stone_cap = floor($total_storage_cap[0]["total_cap"]*$stone_perc/100);
    $metal_cap = floor($total_storage_cap[0]["total_cap"]*$metal_perc/100);
    
    $now = time();
    
    $quary = " food_cap = :fc , wood_cap = :wc , stone_cap = :sc , metal_cap = :mc , LS = :no";
    $upParm = [
        "idc" => $id_city,
        "idp" =>$id_player,
        "fc"  =>$food_cap,
        "wc"  => $wood_cap,
        "sc"  => $stone_cap, 
        "mc"  => $metal_cap, 
        "no"  => $now
            ];
    
    if(updateTable($quary, "city", "id_city = :idc AND id_player = :idp", $upParm)){
        
        echo json_encode([
            "food_cap"=>$food_cap,
            "wood_cap"=>$wood_cap,
            "stone_cap"=>$stone_cap,
            "metal_cap"=>$metal_cap,
            "total_cap"=>$total_storage_cap[0]["total_cap"],
            "LS"=>$now,
            "state"=>"ok"
        ]);
        
        
        $quary = "food_storage_ratio = :fc , wood_storage_ratio = :wc , "
                . "metal_storage_ratio = :mc , stone_storage_ratio = :sc";
        $upParm2 = [
        "idc" => $id_city,
        "fc"  =>$food_perc,
        "wc"  => $wood_perc,
        "sc"  => $stone_perc, 
        "mc"  => $metal_perc
            ];
        updateTable($quary, 'city_storage', "id_city = :idc", $upParm2);
        
    }else{
        
        echo json_encode(["state"=>"error"]);
        
    }
    
}





else if(isset ($_POST['EXPLODE_BUILDNG'])){
    
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $place     = validateOurStr($_POST['place']);
    $type      = validateId($_POST['type']);
    $lvl       = validateId($_POST['lvl']);
    
    $row_count = Matrial::useMatrial("matrial_acce", "powder_keg", 1, $id_player);
    if($row_count  == 1){
        
        if($type < 12){
            
            updateTable("`$place` = 0", "city_building", "id_city = :idc", ["idc" =>$id_city]);
            updateTable("`$place` = 0", "city_building_lvl", "id_city = :idc", ["idc" =>$id_city]); 
            deleteTable("build_army", "id_city = :idc AND place = :pl", ["idc" => $id_city, "pl" =>$place]);
            
            Building::afterBuildingExploaded($id_city, $type , $lvl);
            
            echo 'done';
        }else{

            echo 'error';

        }
        
    }else{
        
        echo 'error_2';
        
    }
    
    
    
    
}

