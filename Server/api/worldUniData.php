<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["BATTEL_ON_UNIT"])){
    
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
    
    $battels = selectFromTable($quary, $table, "btl.x_coord = $x_coord AND btl.y_coord = $y_coord");
    
    
    
    echo json_encode($battels);
    
}