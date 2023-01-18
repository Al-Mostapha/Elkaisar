<?php
require_once '../config.php';
require_once '../base.php';

if(isset ($_POST["upgrade_study_lvl"])){
    
    
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city    = validateId($_POST["id_city"]);
    $study_lvl  = validateId($_POST["study_lvl"]);
    $study_type = validateOurStr($_POST["study_type"]);
    $category   = validateOurStr($_POST["category"]);
    
    if(!is_numeric($id_player)){
        
        exit(array(
            "ok"=>FALSE,
            "error"=>"error_0"
        ));
        
    }else if(!is_numeric($id_city)){
        
         exit(array(
            "ok"=>FALSE,
            "error"=>"error_1"
        ));
        
    }else if(!is_numeric($study_lvl)){
        
         exit(array(
            "ok"=>FALSE,
            "error"=>"error_2"
        ));
        
    }
    
    $resource   = EduUtil::getResource($study_lvl, $study_type);
    $time_end   = time() + (int) $resource["time"];
    
    
    if($study_lvl >= 25){
        
        Matrial::useMatrial("matrial_flags", "law_3", 1, $id_player);
        
    }else if($study_lvl >= 20){
        
        Matrial::useMatrial("matrial_flags", "law_2", 1, $id_player);
        
    }else if($study_lvl >= 10){
        
        Matrial::useMatrial("matrial_flags", "law_1", 1, $id_player);
        
    }
    
    
    $player = new Player($id_player);
    $city   = new City($id_city);
    
    if(!$resource){
        
        exit(json_encode(array(
            "ok"=>FALSE,
            "error"=>"error_3"
        )));
        
    }
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    
    
   $cityRes = selectFromTable("food,wood,stone,metal,coin", "city", "id_city = :idc", ["idc"=>$id_city])[0];
    
   if(
            $cityRes["food"] < $resource["food"] - 5000 
           || $cityRes["wood"]  < $resource["wood"] - 5000
           || $cityRes["stone"] < $resource["stone"] - 5000
           || $cityRes["metal"] < $resource["metal"] - 5000
           || $cityRes["coin"]  < $resource["coin"] - 5000
           ){
       
       
               exit(json_encode([
                   "state"=>"error_no_res"
               ]));
       
           }
           
    
    $eduIn = $category == "study_uni"  ? "edu_uni" : "edu_acad";
    
    if(existInTable("`$category`", "id_player = :idp AND id_city = :idc", ["idp"=>$id_player, "idc"=>$id_city]) == 1){
        exit(json_encode([
                   "state"=>"error_4"
               ]));
    }
        
    $studyDbLvl = selectFromTable("`$study_type`", "`$eduIn`", "id_player = :idp", ["idp"=>$id_player])[0][$study_type];
    
    if(
            $player->addStudy($id_city, $studyDbLvl + 1 , $study_type, $category, time(), $time_end)
            ){
        
        $city->updateResources($id_player, "-", $resource);
        
            }else{
                
                exit(json_encode([
                   "state"=>"error_add"
               ]));
                
                
            }
    
    
    echo json_encode(array(
            "ok"        => "ok",
            "study"     => selectFromTable("*", $category, "id_player = :idp AND id_city = :idc", ["idp"=>$id_player, "idc"=>$id_city]),
            "city"      => selectFromTable("food,wood,stone,metal,coin", "city", "id_city = :idc", ["idc"=>$id_city])[0],
            "timedTasks"=> $save_state->getTimedTasks()
       ));
  
    
}





elseif(isset ($_POST["upgrade_tech"])){
    
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $place     = validateOurStr($_POST["place"]);
    $tech      = validateOurStr($_POST["study_type"]);
    $id_city   = validateId($_POST["id_city"]);
    $lvl_to    = validateId($_POST["lvl_to"]);
    
    $player = new Player($id_player);
    
    $workingStudy = selectFromTable('*', "`$place`", "id_player = :idp AND id_city = :idc", ["idp"=>$id_player, "idc"=>$id_city]);
    
    if(count($workingStudy) == 0){
        exit(json_encode([
            "state" =>  "error_1" 
            ]));
    }else if($workingStudy[0]["time_end"] > time()){
        exit(json_encode([
            "state" =>  "error_2" 
            ]));
    }else{
        $player->deleteStudy($place, $id_city);
        $player->incrementStudyLvl($place , $tech);
        $prestige_gain = new Prestige($id_player);
        $add = $prestige_gain->eduGainPrestige($tech, $lvl_to);
        $prestige_gain->adddPrestige($add);
        
        echo json_encode([
            "state" =>  "ok" ,
            "prestige"=>$add
        ]);
    }
   
    
    
    
   
}

