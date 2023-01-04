<?php

require_once '../config.php';
require_once '../base.php';


if(isset($_GET["GET_PLAYER_GOD_GATE"])){
    
    $idPlayer = validateId(cryptUserId(($_GET['token']), "d"));
    
    $godGate = selectFromTable("*", "god_gate", "id_player = $idPlayer")[0];
    
    $g_1 = selectFromTable("*", "god_gate_1", "id_player = :idp", ["idp"=>$idPlayer]);
    $g_2 = selectFromTable("*", "god_gate_2", "id_player = :idp", ["idp"=>$idPlayer]);
    $g_3 = selectFromTable("*", "god_gate_3", "id_player = :idp", ["idp"=>$idPlayer]);
    $g_4 = selectFromTable("*", "god_gate_4", "id_player = :idp", ["idp"=>$idPlayer]);
    
    $godGate["god_gate_1"] = count($g_1) > 0? $g_1[0] : NULL;
    $godGate["god_gate_2"] = count($g_2) > 0? $g_2[0] : NULL;
    $godGate["god_gate_3"] = count($g_3) > 0? $g_3[0] : NULL;
    $godGate["god_gate_4"] = count($g_4) > 0? $g_4[0] : NULL;
    
    
    
    echo json_encode($godGate);
    
    
}

elseif (isset ($_GET["GLOBAL_GATE_DATA"])) {
    echo json_encode([
        "gate_1_count"=> selectFromTable("COUNT(id_player) as count", "god_gate_1", "1")[0]["count"],
        "gate_2_count"=> selectFromTable("COUNT(id_player) as count", "god_gate_2", "1")[0]["count"],
        "gate_3_count"=> selectFromTable("COUNT(id_player) as count", "god_gate_3", "1")[0]["count"],
        "gate_4_count"=> selectFromTable("COUNT(id_player) as count", "god_gate_4", "1")[0]["count"]
    ]);
}



else if(isset ($_POST["OPEN_GOD_GATE"])){
    
    $idPlayer = validateId(cryptUserId(($_POST['token']), "d"));
    $gate     = validateOurStr($_POST["gate"]);
    
    $needs = [
        "gate_1"=>[
            "points"=>500,
            "porm"=>4
        ],
        "gate_2"=>[
            "points"=>1500,
            "porm"=>10
        ],
        "gate_3"=>[
            "points"=>2500,
            "porm"=>18
        ],
        "gate_4"=>[
            "points"=>4000,
            "porm"=>28
        ]
    ];
    
    $godGate = selectFromTable("god_gate.points , player.porm",
            "player JOIN god_gate ON player.id_player = god_gate.id_player",
            "player.id_player = :idp", ["idp"=>$idPlayer])[0];
    
    
    if((int)$godGate["porm"] < (int)$needs[$gate]["porm"]){
        
        echo json_encode([
            "state"=>"error_1"
        ]);
        
    }else if((int)$godGate["points"] < (int)$needs[$gate]["points"]){
        
        echo json_encode([
            "state"=>"error_2"
        ]);
        
    }else{
        
        
        $p_1 = rand(1, 20);
        $p_2 = rand(1, 20);
        $p_3 = rand(1, 20);

        $quary = "cell_1_type =  'vit' , cell_2_type = 'attack' , cell_3_type = 'damage',"
                . "cell_1_score = $p_1, cell_2_score = $p_2, cell_3_score = $p_3 , id_player = :idp";
        
        insertIntoTable($quary, "`god_$gate`", ["idp"=>$idPlayer]);
        
        updateTable("`$gate` = $p_1 + $p_2 + $p_3", "god_gate", "id_player = :idp", ["idp" => $idPlayer]);
        updateTable("points = points - {$needs[$gate]["points"]}", "god_gate", "id_player = :idp", ["idp"=>$idPlayer]);
        
        echo json_encode([
            "state"=>"ok",
            "gate"=>selectFromTable("*", "`god_$gate`", "id_player = :idp", ["idp"=>$idPlayer])[0],
            "score"=>$p_1 + $p_2 + $p_3
        ]);
        
    }
    
    
    
}

else if(isset ($_POST["CHANGE_LIST_ITEM_STATE"])){
    
    $idPlayer = validateId(cryptUserId(($_POST['token']), "d"));
    $index    = validateId($_POST["index"]);
    $gate     = validateOurStr($_POST["gate"]);
    $state    = validateId($_POST["state"]);
    
    
    updateTable("`c_".$index."_s` = '$state'", "`god_$gate`", "id_player = :idp", ["idp"=>$idPlayer]);
    
    echo json_encode(selectFromTable("*", "`god_$gate`", "id_player = :idp", ["idp"=>$idPlayer])[0]);
    
}


else if(isset ($_POST["CHANGE_GATE_CELL"])){
    
    $idPlayer = validateId(cryptUserId(($_POST['token']), "d"));
    $gate     = validateOurStr($_POST["gate"]);
    
    $godGate = selectFromTable("*", "`god_$gate`", "id_player = :idp", ["idp"=>$idPlayer]);
    $playerPoint = selectFromTable("points", "god_gate", "id_player = :idp", ["idp"=>$idPlayer])[0]["points"];
    $maxVal = [
        "vit"=>100,
        "attack"=>50,
        "damage"=>50,
        "defence"=>50
    ];
    
    
    
    if(count($godGate) != 1){
        exit (json_encode ([ "stat"=>"error_1"]));
    }
    
    $lockCells = 0;
    $lockedTypes = [];
    
    for($iii = 1 ; $iii <= 3; $iii++){
        
        if($godGate[0][("c_".$iii."_s")] == 0){
            $lockCells++;
            $lockedTypes[] = $godGate[0][("cell_".$iii."_type")];
        }
        
    }
    
    
    
    $reqPoints = 50 + 50*$lockCells;
    
    if($playerPoint <  $reqPoints){
        exit (json_encode ([ 
            "stat"=>"error_2",
            "god_gate"=>selectFromTable("*", "`god_$gate`", "id_player = :idp", ["idp"=> $idPlayer])[0],
            "gate"=>selectFromTable("*", "god_gate", "id_player = :idp", ["idp"=> $idPlayer])[0]
            ]));
    }
    
    $totalScore = 0;
    
    
    for($iii = 1; $iii <= 3; $iii++){
        
        if($godGate[0][("c_".$iii."_s")] == 0){
            
            $totalScore += floor(($godGate[0][("cell_".$iii."_score")]/$maxVal[$godGate[0][("cell_".$iii."_type")]])*100);
            continue;
        }
        
        $unlockedTyps = array_diff(["vit","attack","defence","damage"], $lockedTypes);
        $newType = array_rand($unlockedTyps);
        $lockedTypes[] = $unlockedTyps[$newType];
        
        $godGate[0][("cell_".$iii."_type")] = $unlockedTyps[$newType];
        
        $score = 0;
        
        $randLH = rand(0, 100);
        if($randLH > 97){
            rand(floor($maxVal[$unlockedTyps[$newType]]*0.7), $maxVal[$unlockedTyps[$newType]]);
        }else if($randLH > 80){
            $score =  rand(1, floor($maxVal[$unlockedTyps[$newType]]*0.9));
        }else if($randLH > 71){
            $score = rand(1, floor($maxVal[$unlockedTyps[$newType]]*0.7));
        }else{
            $score = rand(1, floor($maxVal[$unlockedTyps[$newType]]*0.5));
        }
        
        
        $godGate[0][("cell_".$iii."_score")] = $score;
        $totalScore += floor(($score/$maxVal[$godGate[0][("cell_".$iii."_type")]])*100);
        
        
    }
    
    $quary = "cell_1_type = '{$godGate[0]["cell_1_type"]}' , cell_2_type = '{$godGate[0]["cell_2_type"]}' ,"
    . " cell_3_type = '{$godGate[0]["cell_3_type"]}' ,  cell_4_type = '{$godGate[0]["cell_4_type"]}' , "
    . " cell_1_score = {$godGate[0]["cell_1_score"]} ,  cell_2_score = {$godGate[0]["cell_2_score"]} ,"
    . " cell_3_score = {$godGate[0]["cell_3_score"]} ,  cell_4_score = {$godGate[0]["cell_4_score"]}  ";
    
    
    updateTable("points  = points - $reqPoints, `$gate` = $totalScore", "god_gate", "id_player = :idp", ["idp"=>$idPlayer]);
    
    updateTable($quary, "`god_$gate`", "id_player = :idp", ["idp"=>$idPlayer]);
    
    echo json_encode([
        "state"=>"ok",
        "cell_1_type"=>$godGate[0][("cell_1_type")],
        "cell_2_type"=>$godGate[0][("cell_2_type")],
        "cell_3_type"=>$godGate[0][("cell_3_type")],
        "cell_4_type"=>$godGate[0][("cell_4_type")],
        "cell_1_score"=>$godGate[0][("cell_1_score")],
        "cell_2_score"=>$godGate[0][("cell_2_score")],
        "cell_3_score"=>$godGate[0][("cell_3_score")],
        "cell_4_score"=>$godGate[0][("cell_4_score")],
        "points"=>$playerPoint  - $reqPoints,
        "score"=>$totalScore
        
    ]);
    
    
}


else if(isset ($_POST["ADD_GOD_GATE_POINTS"])){
    
    $idPlayer = validateId(cryptUserId(($_POST['token']), "d"));
    $matrial  = validateOurStr($_POST['matrial']);
    $amount   = validateId($_POST['amount']);
    
    
    if($amount < 1)
    {exit ();}
    
    $pointToAdd = 0;
    
    if($matrial == "god_point_5")
    {$pointToAdd = 5;}
    elseif($matrial == "god_point_30")
    {$pointToAdd = 30;}
    elseif($matrial == "god_point_75")
    {$pointToAdd = 75;}
    elseif($matrial == "god_point_175")
    {$pointToAdd = 175;}
    elseif($matrial == "god_point_750")
    {$pointToAdd = 750;}
    elseif ($matrial == "god_point_1k")
    {$pointToAdd = 1000;}
    elseif ($matrial == "god_point_2k")
    {$pointToAdd = 2000;}
    elseif ($matrial == "god_point_5k")
    {$pointToAdd = 5000;}
    elseif ($matrial == "god_point_10k")
    {$pointToAdd = 10000;}
    elseif ($matrial == "god_point_50k")
    {$pointToAdd = 50000;}
    
    
    $rowCount = Matrial::useMatrial("matrial_flags", $matrial, $amount, $idPlayer);
    
    $pointToAdd *= $amount;
    
    if($rowCount > 0){
        
        updateTable("points = points + $pointToAdd", "god_gate", "id_player = :idp", ["idp"=>$idPlayer]);
        
    }
    
    echo json_encode([
        "state"=>"ok",
        "gate" => selectFromTable("*", "god_gate", "id_player = :idp", ["idp"=>$idPlayer])[0]
    ]);
    
}


elseif (isset ($_GET["GET_RANK_GATE"])) {
    
    $gate  = validateOurStr($_GET["gate"]);
    $offset = is_numeric($_GET["offset"]) ? validateId($_GET["offset"]) : 0;
    
    $quary = " god_gate JOIN player ON player.id_player = god_gate.id_player";
    
    echo json_encode(selectFromTable( "player.name , god_gate.`$gate` AS score", $quary, "1 ORDER BY god_gate.`$gate` DESC LIMIT 10 OFFSET $offset"));
    
    
}


elseif(isset ($_GET["RANK_EFFECT"])){
    echo json_encode(godGate::$RANK_POINT_PLUSE);
}