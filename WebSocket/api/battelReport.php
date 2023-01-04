<?php
require_once '../config.php';
require_once '../base.php';

if(isset($_GET["get_report"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $offset    = validateId($_GET["offset"]);
 
    $reports = BattelReport::getPlayerReport($id_player , $offset);
    $data = array();
    
    if(is_array($reports) && count($reports) > 0){
        foreach ($reports as $one){      
            $report = BattelReport::getReportHeader($one["id_report"]);
            $report["seen"] = $one["seen"];
            $report["type"] = "battel";
            $data[] = $report;
        }
    }
   echo json_encode($data);
}

if(isset($_GET["get_spy_report"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $offset = validateId(($_GET["offset"]));
    $data = array();
    $spy_report = selectFromTable("*", "spy_report", "id_player = :idp ORDER BY id_report DESC LIMIT 10 OFFSET $offset" , ["idp"=> $id_player]);
    
    if(is_array($spy_report) && count($spy_report) > 0){
        foreach ($spy_report as $one){   
            $row = WorldMap::getUnitData($one["x_coord"], $one["y_coord"]);
            $row["x"] = $one["x_coord"];
            $row["y"] = $one["y_coord"];
            $row["time_stamp"] = date("j M y", ($one["time_stamp"]));
            $row["id_report"] = $one["id_report"];
            $row["type"] = "spy";
            $row["seen"] = $one["seen"];
            $row['spy_for']= $one["spy_for"];
            $row['id_player']= $one["id_player"];
            $data[] = $row;
        }
    }
   
   echo json_encode($data);
}

elseif(isset ($_GET["report_detail"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_report = validateId($_GET["id_report"]);
    BattelReport::updateReportSeen($id_report, $id_player);
    
    echo json_encode(
                array(
                    "heros"=> BattelReport::getHeros($id_report),
                    "prize"=> BattelReport::getPrize($id_report, $id_player),
                    "general_data"=> BattelReport::getGeneralData($id_report),
                    "encId"=> urlencode(base64_encode(json_encode(["id"=>$id_report, "s"=> validateId($_GET["server"])])))
                )
            );
}

elseif(isset ($_GET["spy_report_detail"])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_report = validateId($_GET["id_report"]);
    $id_victim = validateId($_GET["id_victim"]);
    $spy_for   = validateOurStr($_GET["spy_for"]);
    
    updateTable('seen = 1', "spy_report", "id_report = :idr AND id_player = :idp", ["idp"=>$id_player, "idr"=>$id_report]);
    
    if($spy_for == "city"){
        if($id_victim == $id_player){
            $row_data = selectFromTable("*", 'spy_victim', "id_report = :idr", ["idr" =>$id_report])[0];
            $row_data["side"] = "victim";
            echo json_encode($row_data);
        }else{
            $row_data = selectFromTable("*", 'spy_city', "id_report = :idr", ["idr" => $id_report]);
            if(count($row_data) > 0){
                $data_2_send = $row_data[0];
                $data_2_send["side"] = "winner";
                
            }else{
                $data_2_send = selectFromTable("*", 'spy_victim', "id_report = :idr" , ["idr" => $id_report])[0];
                $data_2_send["side"] = "victim";
            }
           
            echo json_encode($data_2_send);
        }
        
    }elseif($spy_for == "barrary"){
         echo json_encode(selectFromTable("*", 'spy_barray', "id_report = :idr" , ["idr" => $id_report])[0]);
    }
}

elseif(isset ($_POST["GET_HERO_FROM_GARRISON"])){
    
    $id_hero  = validateId($_POST["id_hero"]);
    $id_player = validateId(cryptUserId($_POST['token'], "d"));
    
    $rowCount = deleteTable("world_unit_garrison", "id_hero = :idh  AND id_player = :idp", ["idh" => $id_hero, "idp"=> $id_player]);
    if($rowCount > 0){
        updateTable("in_city = 1", "hero", "id_hero = :idh AND id_player = :idp", ["idh" => $id_hero, "idp"=> $id_player]);
        
    }
    echo 'done';
}

