<?php

require_once '../config.php';
require_once '../base.php';


if(isset($_POST["ADD_CITY_GARRISON"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $city_x    = validateId($_POST["city_x"]);
    $city_y    = validateId($_POST["city_y"]);
    
    
    $lastOrd = selectFromTable("ord", "world_unit_garrison", "x_coord = :x AND y_coord = :y ORDER BY ord DESC LIMIT 1", ["x"=>$city_x, "y"=>$city_y]);
    $ord = 1    ;
    if(count($lastOrd) > 0){
       $ord =  $lastOrd[0]["ord"] + 1;
    }
    
    
    insertIntoTable("x_coord = :x , y_coord = :y, id_hero = :idh, id_player = :idp", "world_unit_garrison", ["x"=>$city_x, "y"=>$city_y, "idh"=>$id_hero, "idp"=>$id_player]);
    

    echo json_encode([
        "state"=>"ok",
        "ord" => $ord
    ]);

    
}



elseif(isset ($_GET["GET_CITY_GARRISON"])){
    
    $city_x    = validateId($_GET["city_x"]);
    $city_y    = validateId($_GET["city_y"]);
    
    echo json_encode(selectFromTable("world_unit_garrison.id_hero ,"
            . " player.name  AS p_name ,"
            . " hero.name AS h_name ,"
            . " hero.avatar , hero.lvl",
            "world_unit_garrison JOIN player ON"
            . " player.id_player = world_unit_garrison.id_player JOIN "
            . " hero ON hero.id_hero =  world_unit_garrison.id_hero", 
            "world_unit_garrison.x_coord = :x AND world_unit_garrison.y_coord = :y "
            . "ORDER BY world_unit_garrison.ord ASC", ["x"=>$city_x, "y"=>$city_y]));
}


elseif(isset ($_POST["REMOVE_HERO_FROM_GARRISON"])){
    
    $id_hero   = validateId($_POST["id_hero"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    if(deleteTable("world_unit_garrison", "id_hero = :idh AND id_player = :idp", ["idp"=>$id_player, "idh"=>$id_hero]) > 0){
        echo 'deleted';
    }else{
        echo "error";
    }
    
}



elseif(isset ($_POST["CHANGE_HERO_ORDER"])){
    
    $id_hero_1 = validateId($_POST["id_hero_1"]);
    $id_hero_2 = validateId($_POST["id_hero_2"]);
    
    
    $ord_1 = selectFromTable("ord", "world_unit_garrison", "id_hero = :idh", ["idh"=>$id_hero_1])[0]["ord"];
    $ord_2 = selectFromTable("ord", "world_unit_garrison", "id_hero = :idh", ["idh"=>$id_hero_2])[0]["ord"];
    
    $rowCount = 0;
    
    $rowCount += updateTable("ord = :o", "world_unit_garrison", "id_hero = :idh", ["o"=>$ord_1, "idh"=>$id_hero_2]);
    $rowCount += updateTable("ord = :o", "world_unit_garrison", "id_hero = :idh", ["o"=>$ord_2, "idh"=>$id_hero_1]);
    
    if($rowCount == 2){
        echo "ok";
    }else{
        echo 'error';
    }
    
}