<?php


require_once '../config.php';
require_once '../base.php';


if(isset($_POST["creat_guild"])){
    
    $guild_name = validateName($_POST["guild_name"]);
    $slog_top   = validateId($_POST["slog_top"]);
    $slog_cnt   = validateId($_POST["slog_cnt"]);
    $slog_btm   = validateId($_POST["slog_btm"]);
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    
    
    $guild = new Guild($id_player);
    $player = new Player($id_player);
    
    
    //if($player->getGuildId()["id_guild"] == NULL){
        
        $id_guild = $guild->creat($guild_name, $slog_top, $slog_cnt, $slog_btm);
        if($id_guild > 0){
           echo json_encode(
                        array(
                            "state"=>"ok",
                            "id_guild"=>$id_guild,
                            "name"=>$guild_name
                        )
                   );
        }else{
            
            echo 'some error habbend';
            
            
        }
        
        
   // }
}


elseif(isset ($_GET["get_guild_data"])){
    
    $id_guild = validateId($_GET["id_guild"]);
    
   
    $guild_arr = selectFromTable("id_leader , mem_num ,name ,prestige ,honor ,lvl, "
            . "slog_top , slog_cnt , slog_btm  , word , id_guild", "guild", "id_guild = :idg", ["idg"=>$id_guild]);
    
    
    if(count($guild_arr) == 0){
        exit();
    }
    
    $guild = $guild_arr[0];
    
    $p = Player::getPlayerName($guild["id_leader"]);
    $guild["p_name"] = $p["name"];
    $guild["allay"] = selectFromTable("guild.id_guild , guild.name , guild_relation.state", "guild "
             . " JOIN guild_relation ON guild.id_guild = guild_relation.id_guild_2", "guild_relation.id_guild_1 = :idg", ["idg"=>$id_guild]);
    $guild["total_prize_share"] = selectFromTable("SUM(prize_share) AS total_prize_share ", "guild_member", "id_guild = :idg", ["idg"=>$id_guild])[0]["total_prize_share"];
    
    echo json_encode($guild);
    
}


elseif(isset ($_GET["get_guild_member"])){
    
    $id_guild = validateId($_GET["id_guild"]);
    $offset   = validateId($_GET["offset"]);
    echo json_encode(selectFromTable(
            "player.name , guild_member.rank , guild_member.prize_share ,player.prestige , player.id_player , player.`online`, player.last_seen, player.porm",
            "player JOIN  guild_member ON player.id_player = guild_member.id_player",
            "guild_member.id_guild = :idg ORDER BY guild_member.rank DESC, player.prestige DESC LIMIT 10 OFFSET $offset", ["idg" => $id_guild]));
}


elseif(isset ($_GET["get_guild_res"])){
    
    $id_guild = validateId($_GET["id_guild"]);
    $guild = selectFromTable("food , wood ,stone ,lvl , metal , coin , mem_num ", "guild", "id_guild = :idg",["idg"=>$id_guild])[0];
    echo json_encode($guild);
}


elseif (isset ($_POST["upgrade_guild_with_mat"])) {
    
    
    $id_guild  = validateId($_POST["id_guild"]);
    $matrial   = validateOurStr($_POST["matrial"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
   
    $rowCount = Matrial::useMatrial("matrial_main", $matrial, 1, $id_player);
    
    if($rowCount > 0){
        
        if($matrial == "union_slogan"){
            $new_lvl =10;
        }else if($matrial == "union_declar"){
            $new_lvl = 20;
        }else if($matrial == "union_era"){
            $new_lvl = 30;
        }else{
            exit(json_encode(["state"=>"error"]));
        }
        
        updateTable("lvl = :lv", "guild", "id_guild = :idg", ["idg"=>$id_guild, "lv" => $new_lvl]);
        
        $return = array(
            "state"=>"ok",
            "guild_lvl"=>$new_lvl
        );
        echo json_encode($return);
        
   
    }else{
        echo json_encode(["state"=>"error_2"]);
    }
}



/*                           GUILD RANKS      */
elseif(isset ($_GET["get_rank_union"])){
    
    $offset = validateId($_GET["offset"]);
    
    $output = selectFromTable(
            "guild.lvl, guild.name, guild.prestige, guild.honor, guild.id_guild, guild.mem_num , player.name AS p_name",
            "guild JOIN player ON player.id_player = guild.id_leader",
            "1 ORDER BY guild.prestige DESC  LIMIT 10 OFFSET $offset");
  
    echo json_encode($output);
    
}

/*                           GUILD RANKS      */
elseif(isset ($_GET["get_rank_union_searsh"])){
    
    $searsh_By    = validateOurStr($_GET["searsh_By"]);
    $search_value = validateName($_GET["search_value"]);
    
    $output = selectFromTable(
            "col.id_guild , col.mem_num , col.name , col.prestige , rank_g , col.honor , player.name as p_name", 
            "(SELECT guild.*, @row:=@row+1 as 'rank_g' FROM guild , (SELECT @row:=0)"
            . " r ORDER BY guild.prestige DESC ) AS col "
            . " JOIN player ON col.`$searsh_By` LIKE :s "
            . " AND col.id_leader = player.id_player", "1 LIMIT 10" , ["s"=>$search_value."%"]);
  
    
    echo json_encode($output);
    
}


/*                           GUILD RANKS      */
elseif(isset ($_GET["GET_GUILD_DETAIL"])){
    
    $id_guild = validateId($_GET["id_guild"]);
    
    $output = selectFromTable(
            "col.*, rank_g , player.name as p_name",
            "(SELECT guild.*, @row:=@row+1 as 'rank_g' FROM guild , (SELECT @row:=0) r  )"
            . " AS col JOIN player ON col.id_guild = :idg  AND col.id_leader = player.id_player", "1", ["idg" =>$id_guild])[0];
    
    echo json_encode($output);
    
}

else if(isset ($_POST["DONATE_FOR_GUILD"])){
    
    $resource["food"]     = validateId($_POST["food"]);
    $resource["wood"]     = validateId($_POST["wood"]);
    $resource["metal"]    = validateId($_POST["metal"]);
    $resource["stone"]    = validateId($_POST["stone"]);
    $resource["coin"]     = validateId($_POST["coin"]);
    $id_guild             = validateId($_POST["id_guild"]);
    $id_player            = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city              = validateId($_POST["id_city"]);
    
 
    $save_state = new SaveState($id_player);
    $row_count = $save_state->saveCityState($id_city);
    
    if($row_count  > 0){
        
        /*   wil change  no thing  */
        $resource["pop"] = 0;

        $city = new City($id_city);
        $check = $city->updateResources($id_player, "-", $resource);

        if($check){
            
            $guild = new Guild($id_player, $id_guild);
            if($guild->updateGuildResource("+", $resource) > 0){
                
                 echo 'done';
                
            }else {
                
                
                echo 'resource  deleted but doesnot  added';
                
            }
            
           

        }
        
    }else{
        
        echo 'no_resource';
        
    }
    
    
    
    
    
    
}



else if(isset ($_POST["CHANGE_GUILD_WORD"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_guild  = validateId($_POST["id_guild"]);
    $word      = validateEnStr($_POST["guild_word"]);
    
    $guild = new Guild($id_player, $id_guild);
    if($guild->changeGuildWord($word) > 0){
        
        echo 'done';
        
    }else{
        
        echo 'error';
        
    }
}


elseif(isset ($_GET["GET_GUILD_AUTO_COMPLETE"])){
    
    $search_value = validateName($_GET["search_value"]);
    $id_guild = validateId($_GET["id_guild"]);
    
    $output = selectFromTable(
            "id_guild , name , lvl , slog_cnt , slog_top , slog_btm", 
            "guild", 
            "name LIKE :sv AND id_guild != :idg  ORDER BY prestige DESC LIMIT 10", ["sv"=>"%$search_value%", "idg"=>$id_guild]);

    echo json_encode($output);
    
}



elseif (isset ($_POST["CHANGE_GUILD_RELATION"])) {
    
    $id_guild  = validateId($_POST["id_guild"]);
    $relation  = validateOurStr($_POST["relation"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    $GUILD_RELATIOIN =  array(
        "ally"=>0,
        "enemy"=>1,
        "friend"=>2
    );
    
    if(isset($GUILD_RELATIOIN[$relation])){
        
        $guild_rel = $GUILD_RELATIOIN[$relation];
        
    }else{
        
        $guild_rel = 0;
        
    }
    
    insertIntoTable(
            "id_guild_1  = (SELECT id_guild FROM guild_member WHERE id_player = :idp AND rank >= :r), "
            . "id_guild_2 = :idg , state = :gr  ON DUPLICATE KEY UPDATE state = :gr2 ", "guild_relation", 
            ["idp"=>$id_player, "r"=>GUILD_R_DEPUTY, "idg"=>$id_guild, "gr"=>$guild_rel, "gr2"=>$guild_rel]);
   
    echo 'added';
        

}


elseif (isset ($_POST["INVITE_GUILD_MEMBER"])) {
    
    $id_member = validateId($_POST["id_player"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
   
    insertIntoTable("id_guild  = (SELECT id_guild FROM guild_member WHERE id_player = :idp AND rank >= :r) ,"
            . " id_player = :idm, inv_by = :inby ", "guild_inv",
            ["idp"=>$id_player, "r"=>GUILD_R_SUPERVISOR, "idm"=>$id_member, "inby"=>$id_player]);
    
   
    echo 'added';
        

}


elseif(isset ($_GET["GET_INVITED_MEM"])){
    
    $id_guild = validateId($_GET["id_guild"]);
    
    $inv_list = selectFromTable("guild_inv.id_player , player.avatar , player.name", "guild_inv JOIN player ON guild_inv.id_player = player.id_player", "guild_inv.id_guild =  :idg", ["idg"=>$id_guild]);
    $req_list = selectFromTable("guild_req.id_player , player.avatar , player.name", "guild_req JOIN  player ON guild_req.id_player = player.id_player", "guild_req.id_guild = :idg", ["idg"=>$id_guild]);
    
    echo json_encode([
        "inv_list"=> $inv_list,
        "req_list"=> $req_list
        ]);
    
}


elseif (isset ($_POST["CHANGE_GUILD_SLOGAN"])) {

    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $slog_top  = validateId($_POST["slog_top"]);
    $slog_cnt  = validateId($_POST["slog_cnt"]);
    $slog_btm  = validateId($_POST["slog_btm"]);
    
    if(Matrial::useMatrial("matrial_main", "family_slogan", 1, $id_player) > 0){
        
        updateTable(
                "slog_top = :st , slog_cnt = :sc ,slog_btm = :sb", "guild",
                "id_guild = ( SELECT id_guild FROM guild_member  WHERE id_player = :idp AND  rank > :r)",
                ["st"=>$slog_top, "sc"=>$slog_cnt, "sb"=>$slog_btm,"idp"=>$id_player, "r"=>GUILD_R_SUPERVISOR]);
        

        echo "done";

        
        
    }
    
}


/*      get player state   of guilds
 * if player has requess   to join guilds
 * if  he has some invetation
 *  
 */
else if(isset ($_GET["GET_UNJOINED_PLAYER_DATA"])){
    
    $id_player = validateId($_GET["id_player"]);
    
    
    
    $guild_req = selectFromTable("guild_req.* , guild.name", " guild_req JOIN guild ON  guild.id_guild = guild_req.id_guild", "guild_req.id_player = :idp", ["idp"=>$id_player]);
    $guild_inv = selectFromTable("guild_inv.id_guild , guild.name", "guild_inv JOIN guild ON guild.id_guild = guild_inv.id_guild", "guild_inv.id_player = :idp", ["idp"=>$id_player]);
    
    echo json_encode([
        "guild_inv"=>$guild_inv,
        "guild_req"=>$guild_req
    ]);
    
}


/*

 * if   some one wants to join this guild
 *  
 */
else if(isset ($_POST["SEND_GUILD_REQ"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_guild  = validateId($_POST["id_guild"]);
    
    insertIntoTable("id_player = '$id_player' , id_guild  = '$id_guild'", "guild_req", ["idp" => $id_player, "idg"=>$id_guild]);
    
    echo 'sent';
}

/*

 * if   some one wants to join this guild
 *  
 */
else if(isset ($_POST["CANSEL_GUILD_INVETATION"])){
    
    $id_player = validateId($_POST["id_player"]);
    $id_guild  = validateId($_POST["id_guild"]);
    
    deleteTable("guild_inv", "id_player = :idp AND id_guild  = :idg", ["idp"=>$id_player, "idg"=>$id_guild]);
    
    echo 'done';
    
}

/*

 * if   some one wants to join this guild
 *  
 */
else if(isset ($_POST["CANSEL_GUILD_INV_ADMIN"])){
    
    $id_admin  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_player = validateId($_POST["id_player"]);
    
    
    $id_guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r", ["idp"=>$id_admin, "r"=>GUILD_R_DEPUTY_2]);
   
    if(count($id_guild) > 0):
        deleteTable("guild_inv", "id_player = :idp", ["idp"=>$id_player]);
        echo 'done';
    endif;
    
}


/*

 * if the owner of request wants  to cansel
 * 
 *  
 */
else if(isset ($_POST["CANSEL_GUILD_REQUEST"])){
    
    $id_player = validateId($_POST["id_player"]);
    $id_guild  = validateId($_POST["id_guild"]);
    
    deleteTable("guild_req", "id_player = :idp AND id_guild  = :idg", ["idp"=>$id_player, "idg"=>$id_guild]);
    
    echo 'done';
    
}



/*
 * if   ACCEPT invetaion from anothe guild
 */
else if(isset ($_POST["ACCEPT_GUILD_INVETATION"])){
    
    $id_player = validateId($_POST["id_player"]);
    $id_guild  = validateId($_POST["id_guild"]);
    
    $rc = deleteTable("guild_inv", "id_player = :idp AND id_guild  = :idg", ["idp"=>$id_player, "idg"=>$id_guild]);
    
    if(($rc) > 0){
        
        $guild = new Guild($id_player, $id_guild);
        
        if($guild->addPlayer(GUILD_R_MEMBER) > 0){
            
            $guildName = selectFromTable("name", "guild", "id_guild = :idg", ["idg"=>$id_guild])[0]["name"];
            updateTable("id_guild = :idg , guild = :gn", "player", "id_player = :idp", ["idg"=>$id_guild, "gn"=>$guildName, "idp"=>$id_player]);
            Guild::updateGuildData($id_guild);
            echo 'done';
            
        }
        
    }else{
        
        echo 'there is no enveation for this player';
        
    }
    
}


/*

 *  request accepted by guild admins
 *  */

else if(isset ($_POST["ACCEPT_GUILD_REQ"])){
    
    $id_admin  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_player = validateId($_POST["id_player"]);
    
    $id_guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r", ["idp"=>$id_admin, "r"=>GUILD_R_DEPUTY_2]);
   
    if(count($id_guild)):
        
        $rc = deleteTable("guild_req", "id_player = :idp", ["idp"=>$id_player]);
        
        if(($rc) >0){

            $guild = new Guild($id_player, $id_guild[0]["id_guild"]);

            $guild->addPlayer(GUILD_R_MEMBER);

            Player::refreshPlayerId_guild($id_player);
            Guild::updateGuildData( $id_guild[0]["id_guild"]);
            
            echo 'done';
            

        }else{
            
            
            echo 'fuck';
        }
        
    endif;
    
}
/*
    if  the admin wants to cansel  the reqest
 *  
*/

else if(isset ($_POST["CANSEL_GUILD_REQ"])){
    
    $id_admin  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_player = validateId($_POST["id_player"]);
    
    
    
    
    
    
    $id_guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r", ["idp"=>$id_admin, "r"=>GUILD_R_DEPUTY]);
   
    
    if(count($id_guild)):
        
        $rc = deleteTable("guild_req", "id_player = :idp", ["idp" =>$id_player]);
       
        if($rc >0){

             echo 'done';

        }else{
            
            
            echo 'fuck';
        }
        
    endif;
    
}



elseif (isset ($_POST["ISOLATE_GUILD_MEMBER"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_member = validateId($_POST["id_member"]);
    
    
    $rc = updateTable("a.rank = 0",
            "guild_member AS a INNER JOIN guild_member AS b ON b.id_guild = a.id_guild AND a.rank < b.rank",
            "b.id_player = :idp AND a.id_player = :idm", ["idp"=>$id_player, "idm"=>$id_member]);
    
    
    if( $rc  > 0){
       
        echo 'done';
        
    }

}

elseif(isset ($_POST["PROMOTE_GUILD_MEMBER"]))
{
    
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_member  = validateId($_POST["id_member"]);
    $promote_to = validateId($_POST["promote_to"]);
    
    
    $id_guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r ", ["idp"=>$id_player, "r"=>GUILD_R_DEPUTY]);
    
    
    if(count($id_guild)>0){
         
       $postion_count = selectFromTable("COUNT(*) AS pos_count", "guild_member", "id_guild = :idg AND rank = :r ", ["idg"=>$id_guild[0]["id_guild"], "r"=>$promote_to])[0]["pos_count"];
       
       $G_POSITION_MAX_NUM =  array(

            0=>300,// عضو عادى
            1=>10,  //  عضو رسمى
            2=>6,   //  عضو كبير
            3=>4,   //  مستشار
            4=>3,  //  وزير
            5=>2,  //  نائب المدير
            6=>1   //  المدير

        );  
        
        if($postion_count < $G_POSITION_MAX_NUM[$promote_to] && $promote_to <= 5 ){
            
            updateTable("rank = :r", "guild_member", "id_player = :idp AND id_guild = :idg", ["r"=>$promote_to, "idp"=>$id_member, "idg"=>$id_guild[0]["id_guild"]]);
            
            echo json_encode([
                "state"=>"ok"
            ]);
                
            
            
        }else{
            
            echo json_encode([
                "state"=>"error_0"
            ]);
            
        }
        
    } else {
        
        echo json_encode([
                "state"=>"error_1"
            ]);
        
    }
    
       
}


elseif (isset ($_POST["TRADE_GUILD_POSITION"])) {
    
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    $id_member  = validateId($_POST["id_member"]);
    $id_guild   = validateId($_POST["id_guild"]);
    
    
    $first_player = selectFromTable("rank", "guild_member", "id_player = :idp AND id_guild = :idg",["idg" => $id_guild, "idp"=>$id_player]);
    
    if(count($first_player) > 0){$first_player_rank = $first_player[0]["rank"];}
        
    
    $second_player = selectFromTable("rank", "guild_member", "id_player = :idp AND id_guild = :idg",["idg" => $id_guild, "idp"=>$id_member]);
    
    if(count($second_player) > 0){$second_player_rank = $second_player[0]["rank"];}
  
    
    if($first_player_rank > $second_player_rank){
        
        $count = 0;
        
        $count += updateTable("rank = :r", "guild_member", "id_player = :idp AND id_guild = :idg", ["r"=>$first_player_rank, "idp"=>$id_member, "idg"=>$id_guild]);
        $count += updateTable("rank = :r", "guild_member", "id_player = :idp AND id_guild = :idg", ["r"=>$second_player_rank, "idp"=>$id_player, "idg"=>$id_guild]);
        
        
        if($first_player_rank == GUILD_R_LEADER){
            
            updateTable("id_leader = :idp", "guild", "id_guild = :idg", ["idp"=>$id_member, "idg"=>$id_guild]);
          
        }
        
            
        echo 'done';
        
    }else{
        
        echo 'error_0';
        
    }
    

}



/*     FIRE  PLAYER        */
elseif(isset ($_POST["FIRE_GUILD_MAMBER"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_member = validateId($_POST["id_member"]);
    
    
    
    $guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r", ["idp"=>$id_player, "r"=>GUILD_R_DEPUTY_2]);
    
    if(count($guild) > 0){
        $id_guild = $guild[0]["id_guild"];
    }
    
    if($id_guild){
        deleteTable("guild_member", "id_player = :idm AND id_guild = :idg  AND rank = 0", ["idm"=>$id_member, "idg"=>$id_guild]);
        updateTable("guild = NULL , id_guild = NULL", "player", "id_player = :idp", ["idp" => $id_member]);
        
        echo "done";
         
    }else{
        
        echo 'error_0';
        
    }
}



elseif (isset ($_POST["GUILD_GET_OUT_MEMBER"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_guild  = validateId($_POST["id_guild"]);
    
    deleteTable("guild_member", "id_player = :idp AND rank = 0", ["idp"=>$id_player]);
    updateTable("guild = NULL, id_guild = NULL", "player", "id_player = '$id_player'");
    Guild::updateGuildData($id_guild);
    
    echo 'done';
    
    
}


elseif (isset ($_POST["STEP_DOWN_GUILD_POSITION"])) {

    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    updateTable("rank = 0", "guild_member", "id_player = :idp AND rank < :r", ["idp"=>$id_player, "r"=>GUILD_R_LEADER]);
    echo 'done';
        
}

elseif(isset ($_POST["DESTROY_GUILD"])){
    
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_guild  = validateId($_POST["id_guild"]);
    // first delete guild_relation 
    
    $guild = selectFromTable("*", "guild", "id_leader = :idp", ["idp"=>$id_player]);
    
    if(count($guild) == 0){
        exit(json_encode([
            "state"=>"error_0"
        ]));
    }
    
    deleteTable("guild", "id_leader = :idp LIMIT 1", ["idp"=>$id_player]);
    updateTable("guild = NULL , id_guild = NULL", "player", "id_guild = :idg", ["idg"=>$guild[0]["id_guild"]]);
   
}

elseif(isset ($_POST["UPGRADE_GUILD_BY_RES"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
   
    $id_guild = selectFromTable("id_guild", "guild_member", "id_player = :idp AND rank >= :r", ["idp"=>$id_player, "r"=>GUILD_R_DEPUTY_2]);
    
    
    
    if(count($id_guild) > 0){
        
        $id_guild = $id_guild[0]["id_guild"];
        
        updateTable(
                "wood = wood - 1250000*lvl , food = food - 1250000*lvl ,stone = stone - 1250000*lvl , metal = metal - 1250000*lvl , coin = coin - 1000000*lvl, lvl = lvl +1", 
                "guild", "lvl < 10 AND id_guild = :idg", ["idg"=>$id_guild]);
        
        echo 'done';
           
    }
    
}

elseif(isset ($_POST["MODIFI_PLAYER_PRIZE_SHARE"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_member = validateId($_POST["id_member"]);
    $newVal    = floor(validateId($_POST["newVal"]));
    
    $playerRank        = selectFromTable("rank, id_guild", "guild_member", "id_player = :idp", ["idp"=>$id_player])[0];
    $mem_prize_share   = selectFromTable("prize_share, id_guild", "guild_member", "id_player = :idp", ["idp"=>$id_member])[0];
    $total_prize_share = selectFromTable("SUM(prize_share) AS total_prize_share ", "guild_member", "id_guild = :idg", ["idg"=>$playerRank["id_guild"]])[0]["total_prize_share"];
    
    if($playerRank["id_guild"] != $mem_prize_share["id_guild"] ){
        echo json_encode(["state"=>"error_1"]);
    }else if($newVal < 0){
         echo json_encode(["state"=>"error_2"]);
    }else if($newVal > 100 - $total_prize_share + $mem_prize_share['prize_share'] ){
        echo json_encode(["state"=>"error_3"]);
    }else{
        
        updateTable("prize_share = :nv", "guild_member", "id_player = :idp", ["idp"=>$id_member, "nv"=>$newVal]);
        echo json_encode(["state"=> "ok"]);
        
    }
 
}




