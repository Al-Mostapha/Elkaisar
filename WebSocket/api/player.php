<?php
require_once '../config.php';
require_once '../base.php';

if(isset($_POST["get_matrial"]))
{
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $player    = new Player($id_player);
    // get all matrial
    $matrial_all = $player->retriveMatrial_all();
    // send data as Json
    
    echo json_encode($matrial_all);
}

elseif (isset ($_POST["get_city"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $player    = new Player($id_player);
    // get all matrial
    $all_ids = selectFromTable("id_city", "city", "id_player = $id_player LIMIT 5");
    $save_state  = new SaveState($id_player);
   
    // send data as Json
    foreach ($all_ids as $one){
        
        $save_state->getConsoleEffect($one['id_city']);
        $save_state->res_inState($one['id_city'], "food");
        $save_state->res_inState($one['id_city'], "wood");
        $save_state->res_inState($one['id_city'], "stone");
        $save_state->res_inState($one['id_city'], "metal");
        $save_state->coin_inState($one['id_city']);
        $save_state->coin_outState($one['id_city']);
        $save_state->food_OutState($one['id_city']);
        
    }
    
    $city_all = $player->getCityAll();
    
    echo json_encode($city_all);
    
}

elseif(isset ($_GET["REFRESH_PLAYER_DATA"])){
    
    $id_player = validateId($_GET["id_player"]);
    $player = new Player($id_player);
    
    echo json_encode($player->getPlayer());
    
}



elseif(isset ($_GET['get_hero'])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $id_city   = validateId($_GET['id_city']);
    $city = new City($id_city);
    // get all matrial
    $heros_all = $city->getCityHeros($id_player);
    // send data as Json
    echo json_encode($heros_all);
    
}

elseif(isset ($_GET['GET_PLAYER_ALL_HERO'])){
    
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $all_ids   = selectFromTable("id_city", "city", "id_player = $id_player");
    
    foreach ($all_ids as $one){
        
        $city = new City($one["id_city"]);
        // get all matrial
        $heros_all[] = $city->getCityHeros($id_player);
        
    }
    
    
    // send data as Json
    echo json_encode($heros_all , JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
}


// get equip off here


elseif(isset ($_GET["get_player_tech_lvl"])){
    $id_player = validateId(cryptUserId(($_GET['token']), "d"));
    $player    = new Player($id_player);
    $study_lvl = $player->getPlayerStdLvl();
    echo json_encode($study_lvl);
}







if(isset($_POST["test_time"])){
    echo time();
}

/*         GET PLAYER STATE             **/
elseif (isset ($_GET["get_player_state"])) {
    
    $id_player = validateId(cryptUserId($_GET["token"], "d"));
    
    echo json_encode(selectFromTable("*", "player_stat", "id_player = :idp", ["idp" => $id_player])[0]);

}







/*                      Get ranks                      */
elseif (isset ($_GET["get_rank_player"])) {
    
    $offset = validateId($_GET["offset"]);
    
    $quary = "player.name , player.prestige , player.guild ,player.honor ,player.id_player , player.porm ,player_title.*";
    
    echo json_encode(selectFromTable($quary,"player JOIN player_title ON player.id_player = player_title.id_player" , "1 ORDER BY  porm DESC , prestige DESC  LIMIT 10 OFFSET $offset"));
  

}  


/*                      Get ranks                      */
elseif (isset ($_GET["get_rank_player_searsh"])) {
    
    $searsh_By    = mres($_GET["searsh_By"]);
    $search_value = mres($_GET["search_value"]);
    
    echo json_encode(selectFromTable("id_player , name , guild , porm , honor , prestige , rank", 
            "(SELECT player.*, @row:=@row+1 as 'rank' FROM player , (SELECT @row:=0) r ORDER BY player.prestige DESC  ) AS col ", 
           " col.`$searsh_By`LIKE :sv LIMIT 10", ["sv" =>"%$search_value%"] ));

}  

elseif (isset ($_GET["search_by_name"])){
    
    $segmant = validateName($_GET["name"]);
    
    $condetion = "";
    
    if(isset($_GET["id_guild_no"])){
        
        $id_guild = validateId($_GET["id_guild"]);
        
        $condetion = " AND id_guild IS NULL   AND  player.id_player NOT IN (SELECT guild_inv.id_player FROM  guild_inv WHERE  guild_inv.id_guild = '$id_guild' AND guild_inv.id_player = player.id_player )";
        
    }
    
    
    
    echo json_encode(selectFromTable("name,id_player , porm , avatar ", "player", "name LIKE :se  $condetion ORDER BY prestige DESC LIMIT 7 ", ["se" => "%$segmant%"]));
    
}



elseif (isset ($_POST["ACCE_STUDY_UP"])) 
{

    
    $id_city     = validateId($_POST["id_city"]);
    $matrial     = validateOurStr($_POST["matrial"]);
    $id_player   = validateId(cryptUserId(($_POST['token']), "d"));
    $study_place = validateOurStr($_POST["study_place"]);
    
    
    $matrial_used = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);
    
    if($matrial_used > 0){
        
        Player::acceStudyUp($id_city, $id_player, $matrial, $study_place);
        $save_state = new SaveState($id_player);
        
        echo json_encode(
            array(
                "state"=>"ok",
                "timedTasks"=>$save_state->getTimedTasks()
            )
        );
    }
}


elseif(isset ($_GET["SERVER_DATA"])){
    
    
    echo json_encode(selectFromTable("*", "server_data", "id = 1")[0]);
    
}



elseif(isset ($_GET["GET_PLAYER_DETAIL"])){
    
    $id_player = validateId($_GET["id_player"]);
    
    echo json_encode(selectFromTable(
            "id_player , name , guild , porm , honor , prestige , rank , avatar",
            "(SELECT player.*, @row:=@row+1 as 'rank' FROM player ,  (SELECT @row:=0) r ORDER BY player.prestige DESC  ) AS col", "col.id_player = :idp", ["idp" =>$id_player ])[0]);
    
}
  
  
elseif(isset ($_POST["CHANGE_PLAYER_NAME"])){
    
    $new_name  = validateName($_POST["new_name"]);
    $id_player = validateId((cryptUserId(($_POST['token']), "d")));
    
    $rowCount = Matrial::useMatrial("matrial_main", "change_name" , 1 , $id_player);
    
    if($rowCount > 0){
        
        updateTable("name = :nn", "player", "id_player = :idp", ["nn" => $new_name, "idp" => $id_player]);
        echo 'done';
        
    
        
    }
}


elseif(isset ($_POST["CHANGE_PLAYER_AVATAR"])){
    
    $image_index = validateId($_POST["image_index"]);
    $id_player   = validateId(cryptUserId(($_POST['token']), "d"));
    
    updateTable("avatar = :ain", "player", "id_player = :idp", ["ain" => $image_index, "idp" => $id_player]);

    echo 'done';

    
        
   
}


elseif(isset ($_GET["REFRESH_PLAYER_TIMED_TASKS"])){
    
    $id_player = validateId($_GET["id_player"]);
    $save_state = new SaveState($id_player);
    echo json_encode($save_state->getTimedTasks());
    
}
