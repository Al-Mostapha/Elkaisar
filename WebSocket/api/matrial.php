<?php

require_once '../config.php';
require_once '../base.php';

/*

    
if(isset($_POST["join_battel"])){
    $id_player = $_SESSION["id_player"];
            
}
 * 
 */

    
    
    /*

     *  الجزء دة مهم جدا وهبقى طويل اللاعب هيبعت اسم المادة الى هو يقدر يستاخدمها  
     * وانا بقى هشوف كل مادة بتعمل اى والمفروص انى  هعدل فى الداتا بيز عشان اقدر اعمل التاثير بتاعها 
     * 
     * 
     * هنا انا هغير كل حاجة بايدى  وهكتب جمل السكول هنا
     *      */
    
if(isset($_POST["use_matrial_box"])){
    
    $matrial_name = validateOurStr($_POST["matrial_name"]);
    $id_city      = validateId($_POST["id_city"]);
    $id_player    = validateId(cryptUserId(($_POST['token']), "d"));
    $amount       = validateId($_POST["amount"]);
    
    if($amount <= 0){
        catchHack();
        exit();
    }
    
    if($matrial_name === "motiv_60"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $motiv = selectFromTable('motiv', "player_stat", "id_player =:idp", ["idp" => $id_player])[0]["motiv"];
        $now = time();
        
        if($motiv > $now){
            $new_time = $motiv + (60*60*60);  
        }else{
           $new_time = $now + (60*60*60);   
        }

        if($rowCount > 0){
            
            updateTable("motiv = :nt", "player_stat", "id_player = :idp", ["idp" => $id_player, "nt" => $new_time]);
            echo json_encode(
                                array(
                                    "state"=>"ok",
                                    "time"=>$new_time
                                )
                            );
        }
    }
    elseif($matrial_name == "motiv_7"){
        
        $rowCount = Matrial::useMatrial("matrial_main", "motiv_7", 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $motiv = selectFromTable('motiv', "player_stat", "id_player = :idp", ["idp" => $id_player])[0]["motiv"];
        $now = time();
        if($motiv > $now){
            $new_time = $motiv + (60*60*24*7);  
        }else{
           $new_time = $now + (60*60*24*7);   
        }

        if($rowCount > 0){

            updateTable(" motiv = :nt", "player_stat", "id_player = :idp", ["idp" => $id_player, "nt" => $new_time]);
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
        
    }
    elseif($matrial_name == "prot_pop"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
            
            $new_time = time();
            if($rowCount > 0){
                updateTable("pop = pop + GREATEST(100 , pop_cap*0.2 )", 'city', "id_city = :idc", ["idc" => $id_city]);
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->getConsoleEffect($id_city);
                $save_state->coin_inState($id_city);
                $save_state->res_inState($id_city, "food");
                $save_state->res_inState($id_city, "wood");
                $save_state->res_inState($id_city, "metal");
                $save_state->res_inState($id_city, "stone");
            }
            echo json_encode(
                    array(
                        "state"=>"ok",
                        "city"=> selectFromTable("pop,food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city = $id_city")[0]
                    )
                );
    }
    elseif($matrial_name == "peace"){
        
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
            
            $new_time = time() + (60*60*24);
            if($rowCount > 0){
                updateTable("peace = :nt", "player_stat", "id_player = :idp", ["nt" => $new_time, "idp" => $id_player]);
                echo json_encode(
                                array(
                                    "state"=>"ok",
                                    "time"=>$new_time
                                )
                            );
            
            }
        
    }
    elseif($matrial_name == "a_play"){
        
        $rowCount = Matrial::useMatrial("matrial_main", "a_play", 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $new_time = time();
        updateTable(" dis_loy = 0 , loy = 100, pop_state = 1", "city", "id_city = :idc", ["idc" => $id_city]);
        echo json_encode(
                    array(
                        "state"=>"ok"
                    )
                );
        
    }
    elseif($matrial_name == "medical_moun"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("medical", "player_stat", "id_player = $id_player")[0]["medical"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            
            updateTable(" medical = :nt", 'player_stat', "id_player = :idp", ["nt" => $new_time, "idp" => $id_player]);
            
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
    }
    elseif($matrial_name == "mediacl_statue"){
        
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("medical", "player_stat", "id_player = $id_player")[0]["medical"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){

            updateTable(" medical = :nt", 'player_stat', "id_player = :idp", ["nt" => $new_time, "idp" => $id_player]);
            
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
        
    }
    elseif($matrial_name == "sparta_stab"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("attack_10", "player_stat", "id_player = :idp", ["idp" => $id_player])[0]["attack_10"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("attack_10 = :nt", "player_stat", "id_player = :idp" , ["idp" => $id_player, "nt" => $new_time]);
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
    }
    elseif($matrial_name == "marmlo_helmet"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("defence_10", "player_stat", "id_player = $id_player")[0]["defence_10"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("defence_10 = :nt", "player_stat", "id_player = :idp" , ["idp" => $id_player, "nt" => $new_time]);
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
    }
    elseif($matrial_name == "qulinds_shaft"){
        
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("attack_10", "player_stat", "id_player = $id_player")[0]["attack_10"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("attack_10 = $new_time", "player_stat", "id_player = $id_player");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
        
    }
    elseif($matrial_name == "march_prot"){
        $rowCount = Matrial::useMatrial("matrial_main", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        $last_time = selectFromTable("defence_10", "player_stat", "id_player = $id_player")[0]["defence_10"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("defence_10 = $new_time", "player_stat", "id_player = $id_player");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time
                            )
                        );

        }
    }
    elseif($matrial_name == "random_move"){
        
        
    }
    elseif($matrial_name == "certain_move"){
        
        $new_x    = validateId($_POST["new_x"]);
        $new_y    = validateId($_POST["new_y"]);
        $city_lvl = validateId($_POST["city_lvl"]);
        $unit     = WorldMap::getUnitData($new_x, $new_y);
        $id_city  = validateId($_POST["id_city"]);

        if($unit["t"] == 0){

            $rowCount = Matrial::useMatrial("matrial_main", "certain_move", 1, $id_player);
            $city_data = selectFromTable("x , y, lvl", "city", "id_city = $id_city AND id_player = $id_player");

            $old_x = $city_data[0]["x"];
            $old_y = $city_data[0]["y"];

            $new_type = 17 + $city_data[0]["lvl"];

            if($rowCount > 0){


               $count =  updateTable("x = $new_x , y = $new_y", "city", "id_city = $id_city");
               updateTable("t = 0 , s = 0 , l = 0", "world", "x = $old_x AND  y = $old_y");
               updateTable("t = $new_type", "world", "x = $new_x AND  y = $new_y");
                if($count > 0){

                    echo json_encode(
                            array(
                                "state"=>"ok",
                                "new_x"=>$new_x,
                                "new_y"=>$new_y
                            )
                        );

                }

            } 

        }else{

           echo json_encode(
                array(
                    "state"=>"ok",
                    "error"=>"yes"
                )
            ); 

        }
    }
    elseif($matrial_name == "wheat_1"){
        
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("wheat", "player_stat", "id_player = $id_player")[0]["wheat"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("wheat = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "food");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,food_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name  == "wheat_7"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("wheat", "player_stat", "id_player = $id_player")[0]["wheat"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("wheat = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "food");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,food_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "stone_1"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player);
        $last_time = selectFromTable("stone", "player_stat", "id_player = $id_player")[0]["stone"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("stone = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "stone");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,stone_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name  == "stone_7"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("stone", "player_stat", "id_player = $id_player")[0]["stone"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("stone = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "stone");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,stone_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "wood_1"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("wood", "player_stat", "id_player = $id_player")[0]["wood"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("wood = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "wood");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,wood_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name  == "wood_7"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("wood", "player_stat", "id_player = $id_player")[0]["wood"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("wood = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "wood");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,wood_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "metal_1"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("metal", "player_stat", "id_player = $id_player")[0]["metal"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("metal = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "metal");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,metal_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name  == "metal_7"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("metal", "player_stat", "id_player = $id_player")[0]["metal"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("metal = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->res_inState($id_city, "metal");
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,metal_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "coin_1"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("coin", "player_stat", "id_player = $id_player")[0]["coin"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24) : $now + (60*60*24);
        if($rowCount > 0){
            updateTable("coin = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->coin_inState($id_city);
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,coin_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name  == "coin_7"){
        $rowCount = Matrial::useMatrial("matrial_product", $matrial_name, 1, $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        $last_time = selectFromTable("coin", "player_stat", "id_player = $id_player")[0]["coin"];
        $now = time();
        $new_time = $last_time >  $now ? $last_time + (60*60*24*7) : $now + (60*60*24*7);
        if($rowCount > 0){
            updateTable("coin = $new_time", "player_stat", "id_player = $id_player");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->getConsoleEffect($id_city);
            $save_state->coin_inState($id_city);
            echo json_encode(
                            array(
                                "state"=>"ok",
                                "time"=>$new_time,
                                "city"=> selectFromTable("food,wood,stone,metal,coin,coin_in", "city", "id_city = $id_city")[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "gift_box"){
        $lux_1  = rand(0, 4);
        $lux_2  = rand(0, 4);
        $lux_3  = rand(0, 4);

        $rowCount = Matrial::useMatrial("matrial_box", $matrial_name, 1, $id_player);
        if($rowCount > 0){

           ($lux_1 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_1", $lux_1, $id_player) : "" ;
           ($lux_2 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_2", $lux_2, $id_player) : "";
           ($lux_3 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_3", $lux_3, $id_player) : "";

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["luxury_1"=>$lux_1, "luxury_2"=>$lux_2, "luxury_3"=>$lux_3]]);

        }else{
            echo 'asdasdasdas';
        }
    }
    elseif($matrial_name == "wood_box"){
        
        $lux_4  = rand(0, 4);
        $lux_5  = rand(0, 4);
        $lux_6  = rand(0, 4);

        $rowCount = Matrial::useMatrial("matrial_box", $matrial_name, 1, $id_player);
        if($rowCount > 0){

           ($lux_4 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_4", $lux_4, $id_player) : "" ;
           ($lux_5 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_5", $lux_5, $id_player) : "";
           ($lux_6 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_6", $lux_6, $id_player) : "";

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["luxury_4"=>$lux_4, "luxury_5"=>$lux_5, "luxury_6"=>$lux_6]]);

        }
        
    }
    elseif($matrial_name == "golden_box"){
        
        $lux_7  = rand(0, 4);
        $lux_8  = rand(0, 4);
        $lux_9  = rand(0, 4);

        $rowCount = Matrial::useMatrial("matrial_box", "golden_box", 1, $id_player);
        if($rowCount > 0){

           ($lux_7 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_7", $lux_7, $id_player) : "" ;
           ($lux_8 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_8", $lux_8, $id_player) : "";
           ($lux_9 > 0)?  Matrial::addMatrial("matrial_luxury", "luxury_9", $lux_9, $id_player) : "";

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["luxury_7"=>$lux_7, "luxury_8"=>$lux_8, "luxury_9"=>$lux_9]]);

        }
        
    }
    elseif($matrial_name == "beginner_back_1"){
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, 1, $id_player);
            
        if($rowCount > 0){

            Matrial::addMatrial("matrial_main", "expan_plan", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_a_100", 2, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_b_100", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_c_100", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "beginner_back_2", 1, $id_player);

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["expan_plan"=>1, "army_a_100"=>2, "army_b_100"=>1, "army_c_100"=>1, "beginner_back_2"=>1]]);

        }
    }
    elseif ($matrial_name == "beginner_back_2" ) {
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, 1, $id_player);
            
        if($rowCount > 0){

            Matrial::addMatrial("matrial_acce", "archit_a", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_d_100", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_e_100", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_f_100", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "beginner_back_3", 1, $id_player);

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["archit_a"=>1, "army_d_100"=>1, "army_e_100"=>1, "army_f_100"=>1, "beginner_back_3"=>1]]);

        }
    }
    elseif($matrial_name == "beginner_back_3"){
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, 1, $id_player);
            
        if($rowCount > 0){

            Matrial::addMatrial("matrial_acce", "archit_a", 3, $id_player);
            Matrial::addMatrial("matrial_acce", "exp_hero_8", 3, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_a_1000", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_b_1000", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "beginner_back_4", 1, $id_player);

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["archit_a"=>3, "exp_hero_8"=>3, "army_a_1000"=>1, "army_b_1000"=>1, "beginner_back_4"=>1]]);

        }
    }
    elseif($matrial_name == "beginner_back_4"){
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, 1, $id_player);
            
        if($rowCount > 0){

            Matrial::addMatrial("matrial_acce", "shopping_car", 5, $id_player);
            Matrial::addMatrial("matrial_acce", "bread", 5, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_d_1000", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "army_e_1000", 1, $id_player);
            Matrial::addMatrial("matrial_box_plus", "beginner_back_5", 1, $id_player);

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["shopping_car"=>5, "bread"=>5, "army_d_1000"=>1, "army_e_1000"=>1, "beginner_back_5"=>1]]);

        }
            
    }
    elseif($matrial_name == "beginner_back_5"){
        
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, 1, $id_player);
            
        if($rowCount > 0){

            Matrial::addMatrial("matrial_main", "motiv_60", 1, $id_player);
            Matrial::addMatrial("matrial_main", "rec_letter", 5, $id_player);
            Matrial::addMatrial("matrial_main", "retreat_point", 10, $id_player);
            Matrial::addMatrial("matrial_box", "wood_box", 1, $id_player);
            Matrial::addMatrial("matrial_box", "medal_silver", 10, $id_player);

           echo json_encode(["state"=>"ok" ,
                   "gift"=>["motiv_60"=>1, "rec_letter"=>5, "retreat_point"=>10, "wood_box"=>1, "medal_silver"=>1]]);

        }
        
    }
    elseif($matrial_name == "army_box"){
        
        $id_city  = validateId($_POST["id_city"]);
        $rowCount = Matrial::useMatrial("matrial_box", "army_box", $amount , $id_player);
        if($rowCount > 0){

            $army_b = 2000*$amount;
            $army_e = 1000*$amount;
            $army_f = 300*$amount;

            
                
                updateTable("army_b = army_b + :ab ,  army_e = army_e + :ae  , army_f = army_f + :af ", "city", "id_city = :idc  AND id_player = :idp", ["ab"=>$army_b, "ae"=>$army_e, "af"=>$army_f, "idc"=>$id_city, "idp" => $id_player]);
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->food_OutState($id_city);

                $city_data = selectFromTable("food_out , food,wood,stone,metal,coin ,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
                echo json_encode(
                            array(
                                "state"=>"ok",
                                "city"  =>$city_data[0]
                            )
                        );
        }
        
    }
    elseif($matrial_name == "army_all_1"){
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_all_1", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $army_a = rand(200, 300)*$amount;
            $army_d = rand(100, 200)*$amount;
            $spies = rand(30, 50)*$amount;
            updateTable("army_a = army_a + :aa ,  army_d = army_d + :ad  , spies = spies + :as ", "city", "id_city = :idc  AND id_player = :idp", ["aa"=>$army_a, "ad"=>$army_d, "as"=>$spies, "idc"=>$id_city, "idp" => $id_player]);

            
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->food_OutState($id_city);

                $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = :idc", ["idc" => $id_city]);
                echo json_encode(
                            array(
                                "state"=>"ok",
                                "city"  =>$city_data[0]
                            )
                        );

        }
    }
    elseif($matrial_name == "army_all_2"){
        
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_all_2", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $army_b = rand(30, 50)*$amount;
            $army_c = rand(10, 20)*$amount;
            $army_d = rand(200, 300)*$amount;
            $army_e = rand(100, 200)*$amount;

                
            updateTable("army_b = army_b + :ab, army_c = army_c + :ac, army_d = army_d + :ad, army_e = army_e + :ae",
                    "city", "id_city = :idc  AND   id_player = :idp",
                    ["ab" => $army_b, "ac"=> $army_c, "ad" => $army_d, "ae"=> $army_e, "idc" => $id_city, "idp" => $id_player]);
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );

        }
        
    }
    elseif($matrial_name == "army_all_3"){
        
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_all_3", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $army_b = rand(100, 200)*$amount;
            $army_e = rand(200, 300)*$amount;
            $army_c = rand(30, 50)*$amount;
            $army_f = rand(10, 20)*$amount;

            updateTable("army_b = army_b + :ab ,  army_e = army_e + :ae  , army_c = army_c + :ac, army_f = army_f + :af", "city", "id_city = :idc  AND id_player = :idp",
                    ["ab"=>$army_b, "ae"=>$army_e, "ac"=> $army_e, "ac"=>$army_c, "af" => $army_f, "idc" => $id_city, "idp" => $id_player]);
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = :idc", ["idc" => $id_city]);
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );

        }
        
    }
    elseif($matrial_name == "army_a_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_a_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_a", 100*$amount , "+");
            $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->food_OutState($id_city);

                $city_data = selectFromTable("food_out , food,wood,stone,metal,coin , army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
                echo json_encode(
                            array(
                                "state"=>"ok",
                                "city"  =>$city_data[0]
                            )
                        );

        }
            
    }
    elseif($matrial_name == "army_b_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_b_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_b", 100*$amount , "+");
            $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->food_OutState($id_city);

                $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
                echo json_encode(
                            array(
                                "state"=>"ok",
                                "city"  =>$city_data[0]
                            )
                        );
        }
    }
    elseif($matrial_name == "army_c_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_c_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_c", 100*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin ,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_d_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_d_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_d", 100*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin ,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );

        }
    }
    elseif($matrial_name == "army_e_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_e_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_e", 100*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin ,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_f_100"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_f_100", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_f", 100*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin ,army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_a_1000"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_a_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_a", 1000*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_b_1000"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_b_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_b", 1000*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );

        }
    }
    elseif($matrial_name == "army_c_1000"){
       
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_c_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_c", 1000*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_d_1000"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_d_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_d", 1000*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
    }
    elseif($matrial_name == "army_e_1000"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_e_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            $city->armyCityAdd($id_player, "army_e", 1000*$amount , "+");
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->food_OutState($id_city);

            $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
            echo json_encode(
                        array(
                            "state"=>"ok",
                            "city"  =>$city_data[0]
                        )
                    );
        }
            
    }
    elseif($matrial_name == "army_f_1000"){
        
        $id_city = validateId($_POST["id_city"]);

        $rowCount = Matrial::useMatrial("matrial_box_plus", "army_f_1000", $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/

        if($rowCount > 0){

            $city = new City($id_city);
            if($city->armyCityAdd($id_player, "army_f", 1000*$amount , "+") > 0){
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->food_OutState($id_city);

                $city_data = selectFromTable("food_out , food,wood,stone,metal,coin, army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = $id_city");
                echo json_encode(
                            array(
                                "state"=>"ok",
                                "city"  =>$city_data[0]
                            )
                        );
            }
        }
    }
    
    elseif( $matrial_name == "tagned_3p" || $matrial_name == "tagned_4p" || 
            $matrial_name == "tagned_5p" || $matrial_name == "tagned_6p" || 
            $matrial_name == "tagned_7p" || $matrial_name == "tagned_8p" ){
        
        
        $id_city = validateId($_POST["id_city"]);
        $theater_place = validateOurStr($_POST["city_theater"]);
        $theater_lvl = 0;
        if($theater_place != "false"){
            $theater_lvl = selectFromTable("`$theater_place`", "city_building_lvl", "id_city = $id_city")[0][$theater_place];
        }
        
        
        $rowCount = Matrial::useMatrial("matrial_box", $matrial_name, $amount , $id_player); /* 1   if  thhe player has at least  onr of matrial*/
        
        
        if($rowCount > 0){
            
            
            $AVAIL_NAME = ["ماكسيموس","اشرف", "مصطفى", "اليكس", "اليسا", "بطليموس",
                "كليوباترا","هكس","ماجد", "يويليوس","مارس","ماكس","صلاح الدين","سيورس",
                 "سيزار", "اغسطس","جلادياتور","سما", "زين","شادو","الملك", "القاهر",
                "الاسد", "اليس","حورس","يورك"
            ];
            
            $points = [
                "tagned_3p"=>3,
                "tagned_4p"=>4,
                "tagned_5p"=>5,
                "tagned_6p"=>6,
                "tagned_7p"=>7,
                "tagned_8p"=>8
            ];

            
            for($iii = 0 ; $iii < $amount ; $iii++){
                $avatar = rand(0, 19);
                $name = $AVAIL_NAME[rand(0, count($AVAIL_NAME) - 1)];
                $lvl = rand(1, max($theater_lvl*5  , 5));
                Hero::addHero($name, $lvl, $id_player, $id_city ,$avatar ,  $points[$matrial_name]);
            }
            

            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $save_state->coin_outState($id_city);
            $city = new City($id_city);
            // get all matrial
            $heros_all = $city->getCityHeros($id_player);
            // send data as Json
            echo json_encode([
                "state"=>"ok",
                "heros"=>$heros_all,
                "city"=> selectFromTable("food,wood,stone,metal,coin,coin_out", "city", "id_city = $id_city")[0]
            ]);
           

        }
    }
    
    elseif(
            $matrial_name == "coin_a"  || $matrial_name == "coin_b"  || $matrial_name == "coin_c"  || $matrial_name == "coin_d" ||
            $matrial_name == "food_a"  || $matrial_name == "food_b"  || $matrial_name == "food_c"  || $matrial_name == "food_d" ||
            $matrial_name == "wood_a"  || $matrial_name == "wood_b"  || $matrial_name == "wood_c"  || $matrial_name == "wood_d" ||
            $matrial_name == "stone_a" || $matrial_name == "stone_b" || $matrial_name == "stone_c" || $matrial_name == "stone_d"||
            $matrial_name == "metal_a" || $matrial_name == "metal_b" || $matrial_name == "metal_c" || $matrial_name == "metal_d" 
            ){
        
        $array_matrial = [
            "coin_a" =>["a"=>1500, "for"=>"coin" ],"coin_b" =>["a"=>5000, "for"=>"coin" ],"coin_c" =>["a"=>100000, "for"=>"coin" ],"coin_d" =>["a"=>350000, "for"=>"coin"],
            "food_a" =>["a"=>1500, "for"=>"food" ],"food_b" =>["a"=>5000, "for"=>"food" ],"food_c" =>["a"=>100000, "for"=>"food" ],"food_d" =>["a"=>350000, "for"=>"food"],
            "wood_a" =>["a"=>1500, "for"=>"wood" ],"wood_b" =>["a"=>5000, "for"=>"wood" ],"wood_c" =>["a"=>100000, "for"=>"wood" ],"wood_d" =>["a"=>350000, "for"=>"wood"],
            "stone_a"=>["a"=>1500, "for"=>"stone"],"stone_b"=>["a"=>5000, "for"=>"stone"],"stone_c"=>["a"=>100000, "for"=>"stone"],"stone_d"=>["a"=>350000, "for"=>"stone"],
            "metal_a"=>["a"=>1500, "for"=>"metal"],"metal_b"=>["a"=>5000, "for"=>"metal"],"metal_c"=>["a"=>100000, "for"=>"metal"],"metal_d"=>["a"=>350000, "for"=>"metal"],
        ];
        
        $rowCount = Matrial::useMatrial("matrial_box_plus", $matrial_name, $amount , $id_player);
        
        if($rowCount > 0){
            
            $save_state = new SaveState($id_player);
            $save_state->saveCityState($id_city);
            $new_amount = $array_matrial[$matrial_name]["a"]*$amount;
            updateTable("{$array_matrial[$matrial_name]["for"]} = {$array_matrial[$matrial_name]["for"]} + {$new_amount} ", "city", "id_city = $id_city");
           
            echo json_encode([
                "state" => "ok",
                "city"=> selectFromTable("food,wood,stone,metal,coin", "city", "id_city = $id_city")[0]
                ]);
        }
    }
    
    
}





elseif (isset ($_POST["BUY_MATRIAL"])) {

    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $matrial   = validateOurStr($_POST["matrial"]);
    $amount    = floor(validateId($_POST["amount"]));
    if($amount <= 0 || !$amount){
        catchHack();
        exit();
    }
    $string_matrial = file_get_contents(BASE_BATH."js".JS_VERSION."/matrial_all.json");
   
    $all_matrial = json_decode($string_matrial);
   
    $gold_price = ($all_matrial->$matrial->gold)*$amount;
    if($gold_price < 1){
        exit();
    }
    $horus = new Horus($id_player);
    
    $rowCount = $horus->useGold($gold_price);
    
    if($rowCount > 0){
        
        $horus->recordeGoldUseMatrial($gold_price, $matrial);
        
        if(Matrial::addMatrial($all_matrial->$matrial->db_tab, $matrial, $amount, $id_player)){
            
            echo 'done';
            
        }
        
    }
    
}
