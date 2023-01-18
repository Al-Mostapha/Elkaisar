<?php

require_once '../config.php';
require_once '../base.php';


if(isset($_GET["get_map_fromTo"])){
    $x_start = validateId( $_GET["x_start"]);
    $x_end = validateId( $_GET["x_end"]);
    $y_start = validateId( $_GET["y_start"]);
    $y_end = validateId( $_GET["y_end"]);
    
    $map = WorldMap::getMapFromTo($x_start, $x_end, $y_start, $y_end);
    echo json_encode($map);
}


elseif (isset ($_GET["get_unit_map_data"])){
    
    $x = validateId($_GET["x_coord"]);
    $y = validateId($_GET["y_coord"]);
    
    $unite = WorldMap::getUnitData($x, $y);
    $unite["equip"] = selectFromTable("*", "world_unit_equip", "x = :xc AND y = :yc AND l = :l", ["xc"=> $x, "yc"=>$y, "l"=> $unite["l"]]);
    $unite["hero"]  = selectFromTable("*", "world_unit_hero",  "x = :xc AND y = :yc AND lvl = :l", ["xc"=> $x, "yc"=>$y, "l"=> $unite["l"]]);
    echo json_encode($unite);
    
}

elseif(isset ($_GET["GET_SECONDRY_UNITE_DATA"])){
    $x_start = validateId( $_GET["x_start"]);
    $x_end   = validateId( $_GET["x_end"]);
    $y_start = validateId( $_GET["y_start"]);
    $y_end   = validateId( $_GET["y_end"]);
    
    
    $cities = selectFromTable("player.id_guild, city.x, city.y, city.lvl, player.city_flag , player_stat.peace",
            "player RIGHT JOIN  city ON city.id_player = player.id_player JOIN player_stat ON city.id_player = player_stat.id_player",
            "(x BETWEEN $x_start AND  $x_end ) AND (y BETWEEN $y_start AND $y_end)");
    
    $fired        = selectFromTable("x_coord, y_coord, time_end", "battel", "(x_coord BETWEEN $x_start AND  $x_end ) AND (y_coord BETWEEN $y_start AND $y_end)");
    $changableLvl = selectFromTable("x, y, l", "world", "(x BETWEEN $x_start AND  $x_end ) AND (y BETWEEN $y_start AND $y_end) AND t >= 30");
    
    echo json_encode(["city" =>$cities , "fired" =>$fired ,  "changableLvl"=>$changableLvl]);
}


else if(isset ($_GET["GET_CITY_BAR"])){
    
    $id_city = validateId($_GET["id_city"]);
     
    echo json_encode(WorldMap::getCityBar($id_city));
}

else if(isset($_GET["get_map_from_To"])){
    $x_start = validateId( $_GET["x_start"]);
    $x_end = validateId( $_GET["x_end"]);
    $y_start = validateId( $_GET["y_start"]);
    $y_end = validateId( $_GET["y_end"]);
    
    $map = json_encode(getMapFromTo($x_start, $x_end, $y_start, $y_end));
    echo str_replace('"', "", $map);
}

else if(isset ($_POST["ABANDON_CITY_BAR"])){
    
    $id_player = validateId($_POST["id_player"]);
    $id_city   = validateId($_POST['id_city']);
    $x_coord   = validateId($_POST['x_coord']);
    $y_coord   = validateId($_POST['y_coord']);
    $unit_for  = validateOurStr($_POST['unit_for']);
    
    $rowCount = deleteTable("city_bar", "id_city = :idc AND id_player = :idp AND x_coord = :xc AND y_coord = :yc", ["idp" => $id_player, "idc" => $id_city, "xc" => $x_coord, "yc" => $y_coord]);
    if($rowCount === 1){
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->res_inState($id_city, $unit_for);

        $new_res = selectFromTable("food_in , wood_in , metal_in , stone_in", "city", "id_city = :idc", ["idc" => $id_city]);

        json_encode($new_res[0]);
    }
}
else if(isset ($_POST["ADD_PLAYER_CITY"])){
    
    $id_player = validateId(cryptUserId($_POST["token"], "d"));
    $id_city   = validateId($_POST["id_city"]);
    $x_coord   = validateId($_POST["x_coord"]);
    $y_coord   = validateId($_POST["y_coord"]);
    $city_name = validateName($_POST["city_name"]);
    
    $player = selectFromTable("porm", "player", "id_player = :idp", ["idp" => $id_player]);
    
    $city_count = selectFromTable("COUNT(*) AS c_count", "city", "id_player = :idp", ["idp" => $id_player]);
    
    $unit = selectFromTable("t", "world", "x = :xc AND y = :yc", ["xc" => $x_coord, "yc" => $y_coord]);
    
    if(count($city_count) == 0){
        exit();
    }
    if($city_count[0]["c_count"] > 4 ){
        exit(json_encode(["state"=>"error_0"]));
    }else if($player[0]['porm'] < $city_count[0]["c_count"]*2){
        exit(json_encode(["state"=>"error_1"]));
    }else if($unit[0]["t"] != 0){
        exit(json_encode(["state"=>"error_2"]));
    }
    
    $val = pow(10, $city_count[0]["c_count"] + 2);
    $base_city = new City($id_city);
    
    $resources["food"] = $val;
    $resources["wood"] = $val;
    $resources["stone"] = $val;
    $resources["metal"] = $val;
    $resources["coin"] = $val;
    $resources["pop"] = 0;
    
   
    
    $row_count =  $base_city->updateResources($id_player, "-", $resources);
    
    
    $new_city = new City();
    
    $id_city_new = $new_city->addCity($id_player, $x_coord, $y_coord , $city_name);
    
    
    
    echo json_encode(["state" =>"ok" , "city"=>Player::getCityById($id_city_new) , "city_building" => $new_city->getRemainCity($id_player)]);
    
    
}

else if(isset ($_GET['GET_EMAIN_BARRY_DATA'])){
    
    $x_coord = validateId($_GET["x_coord"]);
    $y_coord = validateId($_GET['y_coord']);
    
    
    
    $unit_data = selectFromTable(
            "p.name as p_name ,p.guild ,  p.id_guild , c.name as c_name , c.x , c.y",
            "player p, city_bar b, city c", 
            "c.id_player = p.id_player  AND b.x_coord = :x AND b.y_coord = :y AND b.id_city = c.id_city", ["x" => $x_coord, "y"=>$y_coord]);
    
    if(isset($unit_data[0])){
        echo json_encode($unit_data[0]); 
    }else{
        echo json_encode(null);
    }
   
    
}


elseif(isset ($_GET["GET_ALL_WORLD_CITIES"])){
    $all_cities = selectFromTable("x,y,t,l,p,ut", "world", "t >= 17 AND t <= 20");
    echo json_encode($all_cities);
} 

elseif(isset($_GET["BATTEL_ON_UNIT"])){
    
    $x_coord = validateId($_GET["x_coord"]);
    $y_coord = validateId($_GET["y_coord"]);
    
    $quary = " btl.id_player, btl.time_start, btl.time_end, "
            . " btl.id_battel, player.name AS player_name, city.name AS city_name ,"
            . " btl.task, btl.x_city , btl.y_city, btl.x_coord , btl.y_coord,"
            . " (SELECT COUNT(id_battel) FROM battel_member bm WHERE bm.id_battel = btl.id_battel AND side = ".SIDE_ATTACK.") AS attack_num,"
            . " (SELECT COUNT(id_battel) FROM battel_member bm WHERE bm.id_battel = btl.id_battel AND side = ".SIDE_DEFANCE.") AS defence_num ";
    
    $table = " battel btl"
            . "     JOIN player ON btl.id_player = player.id_player"
            . "     JOIN city ON btl.x_city = city.x AND btl.y_city = city.y ";
    
    $battels = selectFromTable($quary, $table, "btl.x_coord = :x AND btl.y_coord = :y", ["x" => $x_coord, "y" => $y_coord]);
    
    
    
    echo json_encode($battels);
    
}







else if(isset ($_GET["GET_WORLD_UNIT_RANK"])){
    
    
    $x_coord  = validateId($_GET["x_coord"]);
    $y_coord  = validateId($_GET["y_coord"]);
    $type     = validateId($_GET["type"]);
    
    if(WorldUnit::isArenaGuild($type)){
        
       $names = "guild.name AS g_name";
       $joiner = "JOIN guild
                ON guild.id_guild = world_unit_rank.id_dominant";
        
    }else{
        $names = "player.name  , player.guild";
        $joiner = "JOIN player
                ON player.id_player = world_unit_rank.id_dominant";
    }
    
    echo json_encode(selectFromTable(
            
            "world_unit_rank.id_dominant ,
                SUM(world_unit_rank.duration) AS d_sum,
                SUM(world_unit_rank.win_num) AS w_num,
                $names"
            , "world_unit_rank  $joiner "
            , " world_unit_rank.x = :xc 
                AND 
                world_unit_rank.y = :yc 
                GROUP BY world_unit_rank.id_dominant
                ORDER BY d_sum DESC LIMIT 5", 
            ["xc" => $x_coord, "yc" => $y_coord]));
    
    
}


function getMapFromTo($x1 , $x2 , $y1 , $y2)
{
    
    $data = [];
    $units = selectFromTable("x , y ,t , s , l", "world", "(x BETWEEN :x1 AND :x2) AND (y BETWEEN :y1 AND :y2)", ["x1"=>$x1, "x2"=>$x2, "y1"=>$y1, "y2"=>$y2]);
    
    foreach ($units as $one){
        $data[] = $fetch["x"]."_".$fetch["y"]."_".$fetch["t"]."_".$fetch["s"]."_".$fetch["l"];
    }
    return $data;
}
