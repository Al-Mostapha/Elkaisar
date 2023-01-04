<?php
require_once '../config.php';
require_once '../base.php';

if(isset($_POST["RONDOM_MOVE"])){
    
    $id_city      = validateId($_POST["id_city"]);
    $province     = validateId($_POST["province"]);
    $id_player    = validateId(cryptUserId(($_POST['token']), "d"));
    
    $rowCount = Matrial::useMatrial("matrial_main", "random_move", 1, $id_player);
    
    $coord = WorldMap::getEmptyPlace($province);

    $city_data = selectFromTable("x , y, lvl", "city", "id_city = :idc" ,["idc" => $id_city]);
    $new_type  = 17 + $city_data[0]["lvl"];    
    $old_x     = $city_data[0]["x"];
    $old_y     = $city_data[0]["y"];
    $x         = $coord["x"];
    $y         = $coord["y"];
    
    if($rowCount > 0){


        updateTable("x = $x , y = $y", "city", "id_city = $id_city");
        updateTable("t = 0 , s = 0 , l = 0", "world", "x = $old_x AND  y = $old_y");
        updateTable("t = $new_type", "world", "x = $x AND  y = $y");

       

        echo json_encode(
                array(
                    "state"=>"ok",
                    "new_x"=>$x,
                    "new_y"=>$y
                )
            );

        

    }else{
       
    }
}
