<?php

require_once '../config.php';
require_once '../base.php';





if(isset($_POST["ACCEPT_QUEST"])){
    
    $idQuest  = validateOurStr($_POST["id_quest"]);
    $idPlayer = validateId($_POST["id_player"]);
    $idCity   = validateId($_POST["id_city"]);
    
    $quest = selectFromTable("*", "quest", "id_quest = :idq", ["idq" => $idQuest]);
   
    
    if(count($quest) > 0){
        
         $questObj = new Quest($quest[0]);
        if(!$questObj->checkNeeds($idPlayer)){
            exit(json_encode([
                "state"=>"error_4"
            ])) ; 
        }
        $rowCount = updateTable("done = 1", "quest_player", "id_player = :idp AND id_quest = :idq AND done = 0", ["idp" => $idPlayer, "idq" => $idQuest]);
        
        if($rowCount > 0){
            
           
            
            
            if(!$questObj->takeNeed($idPlayer, $idCity)){
                
                catchHack();
                
            }else{
                
               
               
               
                
                
            }
            
            $reword = $questObj->giveReword($idPlayer, $idCity);
             echo json_encode([
                    "state"=>"ok",
                    "reword"=>$reword
                ]); 
            
        } else {
            
            echo json_encode([
                "state"=>"error_2"
            ]);
           
        }
        
    }else{
        
        echo json_encode([
            "state"=>"error_1"
        ]);
        
    }
    
}


