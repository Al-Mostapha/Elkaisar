<?php
require_once '../config.php';
require_once '../base.php';

if(isset($_GET["GET_LUCK_WHEEL_MAT"])){
    
   $avail_for_win = [
        /* n for name a for amount*/
        ["n"=>"luxury_8", "a"=>1],["n"=>"luxury_9", "a"=>1],
        ["n"=>"bread", "a"=>1],["n"=>"fruit", "a"=>1],["n"=>"milk", "a"=>1],["n"=>"meat", "a"=>1],
        ["n"=>"stone_1", "a"=>1],["n"=>"stone_7", "a"=>1],["n"=>"wood_1", "a"=>1],["n"=>"wood_7", "a"=>1],
        ["n"=>"metal_1", "a"=>1],["n"=>"metal_7", "a"=>1],["n"=>"coin_1", "a"=>1],["n"=>"coin_7", "a"=>1],
        ["n"=>"motiv_60", "a"=>1],["n"=>"motiv_7", "a"=>1],["n"=>"prot_pop", "a"=>1],["n"=>"peace", "a"=>1],
        ["n"=>"coin_a", "a"=>20],["n"=>"coin_b", "a"=>15],["n"=>"coin_c", "a"=>12],["n"=>"coin_d", "a"=>10],
        ["n"=>"polit_a", "a"=>1],["n"=>"polit_b", "a"=>1],["n"=>"polit_c", "a"=>1],["n"=>"polit_d", "a"=>1],
        ["n"=>"food_a", "a"=>20],["n"=>"food_b", "a"=>15],["n"=>"food_c", "a"=>12],["n"=>"food_d", "a"=>10],
        ["n"=>"wood_a", "a"=>20],["n"=>"wood_b", "a"=>15],["n"=>"wood_c", "a"=>12],["n"=>"wood_d", "a"=>10],
        ["n"=>"archit_a", "a"=>1],["n"=>"archit_b", "a"=>1],["n"=>"archit_c", "a"=>1],["n"=>"archit_d", "a"=>1],
        ["n"=>"archim_a", "a"=>1],["n"=>"archim_b", "a"=>1],["n"=>"archim_c", "a"=>1],["n"=>"archim_d", "a"=>1],
        ["n"=>"luxury_1", "a"=>1],["n"=>"luxury_2", "a"=>1],["n"=>"luxury_3", "a"=>1],["n"=>"luxury_4", "a"=>1],
        ["n"=>"luxury_4", "a"=>1],["n"=>"luxury_5", "a"=>1],["n"=>"luxury_6", "a"=>1],["n"=>"luxury_7", "a"=>1],
        ["n"=>"stone_a", "a"=>20],["n"=>"stone_b", "a"=>15],["n"=>"stone_c", "a"=>12],["n"=>"stone_d", "a"=>10],
        ["n"=>"metal_a", "a"=>20],["n"=>"metal_b", "a"=>15],["n"=>"metal_c", "a"=>12],["n"=>"metal_d", "a"=>10],
        ["n"=>"wall_acce", "a"=>1],["n"=>"powder_keg", "a"=>1],["n"=>"wheat_1", "a"=>1],["n"=>"wheat_7", "a"=>1],
        ["n"=>"certain_move", "a"=>1],["n"=>"spies", "a"=>1],["n"=>"change_name", "a"=>1],["n"=>"trumpet", "a"=>1],
        ["n"=>"tagned_3p", "a"=>1],["n"=>"tagned_4p", "a"=>1],["n"=>"tagned_5p", "a"=>1],["n"=>"medal_silver", "a"=>10],
        ["n"=>"medal_gold", "a"=>5],["n"=>"army_all_1", "a"=>5],["n"=>"army_all_2", "a"=>4],["n"=>"army_all_3", "a"=>2],
        ["n"=>"army_a_100", "a"=>5],["n"=>"army_b_100", "a"=>5],["n"=>"army_c_100", "a"=>5],["n"=>"army_d_100", "a"=>5],
        ["n"=>"coach", "a"=>1],["n"=>"train_acce_30", "a"=>1],["n"=>"train_acce_50", "a"=>1],["n"=>"exp_hero_8", "a"=>1],
        ["n"=>"medal_ceasro", "a"=>1],["n"=>"medal_den", "a"=>1],["n"=>"medal_leo", "a"=>1],["n"=>"ceaser_eagle", "a"=>1],
        ["n"=>"rec_letter", "a"=>1],["n"=>"retreat_point", "a"=>1],["n"=>"hero_train", "a"=>1],["n"=>"random_move", "a"=>1],
        ["n"=>"exp_hero_30", "a"=>1],["n"=>"exp_hero_100", "a"=>1],["n"=>"hero_back", "a"=>1],["n"=>"shopping_car", "a"=>1],
        ["n"=>"army_a_1000", "a"=>2],["n"=>"army_b_1000", "a"=>2],["n"=>"army_c_1000", "a"=>2],["n"=>"army_d_1000", "a"=>2],
        ["n"=>"a_play", "a"=>1],["n"=>"help_house_chng", "a"=>1],["n"=>"family_slogan", "a"=>1],["n"=>"union_slogan", "a"=>1],
        ["n"=>"expan_plan", "a"=>1],["n"=>"marcus_scheme", "a"=>1],["n"=>"freedom_help", "a"=>1],["n"=>"medical_moun", "a"=>1],
        ["n"=>"sparta_stab", "a"=>1],["n"=>"marmlo_helmet", "a"=>1],["n"=>"qulinds_shaft", "a"=>1],["n"=>"march_prot", "a"=>1]
        
        
    ];

    $count = 0;
    $occoures = [];
    while ($count < 20){

        $rand = rand(0, count($avail_for_win) - 1);
        if(!in_array($rand, $occoures)){

            $occoures[] = $rand;
            $count++;
        }

    }
    
    $matrial_to_send = [];
    
    foreach ($occoures as $one){
        
        $matrial_to_send[] = $avail_for_win[$one];
        
    }
   
    echo json_encode($matrial_to_send);
    
}


else if(isset ($_POST["PLAY_LUCK_WHEEL"])){
    
    $idPlayer = validateId(cryptUserId($_POST["token"], "d"));
    
    $avail_for_win = [
        /* n for name a for amount*/
        ["n"=>"luxury_8",    "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_9",        "t"=> "matrial_luxury",   "a"=>1],
        ["n"=>"bread",       "t"=> "matrial_acce",     "a"=>1], ["n"=>"fruit",           "t"=> "matrial_acce",     "a"=>1], ["n"=>"milk",          "t"=> "matrial_acce",     "a"=>1], ["n"=>"meat",         "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"stone_1",     "t"=> "matrial_product",  "a"=>1], ["n"=>"stone_7",         "t"=> "matrial_product",  "a"=>1], ["n"=>"wood_1",        "t"=> "matrial_product",  "a"=>1], ["n"=>"wood_7",       "t"=> "matrial_product",  "a"=>1],
        ["n"=>"metal_1",     "t"=> "matrial_product",  "a"=>1], ["n"=>"metal_7",         "t"=> "matrial_product",  "a"=>1], ["n"=>"coin_1",        "t"=> "matrial_product",  "a"=>1], ["n"=>"coin_7",       "t"=> "matrial_product",  "a"=>1],
        ["n"=>"motiv_60",    "t"=> "matrial_main",     "a"=>1], ["n"=>"motiv_7",         "t"=> "matrial_main",     "a"=>1], ["n"=>"prot_pop",      "t"=> "matrial_main",     "a"=>1], ["n"=>"peace",        "t"=> "matrial_main",     "a"=>1],
        ["n"=>"coin_a",      "t"=> "matrial_box_plus", "a"=>20],["n"=>"coin_b",          "t"=> "matrial_box_plus", "a"=>15],["n"=>"coin_c",        "t"=> "matrial_box_plus", "a"=>12],["n"=>"coin_d",       "t"=> "matrial_box_plus", "a"=>10],
        ["n"=>"polit_a",     "t"=> "matrial_acce",     "a"=>1], ["n"=>"polit_b",         "t"=> "matrial_acce",     "a"=>1], ["n"=>"polit_c",       "t"=> "matrial_acce",     "a"=>1], ["n"=>"polit_d",      "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"food_a",      "t"=> "matrial_box_plus", "a"=>20],["n"=>"food_b",          "t"=> "matrial_box_plus", "a"=>15],["n"=>"food_c",        "t"=> "matrial_box_plus", "a"=>12],["n"=>"food_d",       "t"=> "matrial_box_plus", "a"=>10],
        ["n"=>"wood_a",      "t"=> "matrial_box_plus", "a"=>20],["n"=>"wood_b",          "t"=> "matrial_box_plus", "a"=>15],["n"=>"wood_c",        "t"=> "matrial_box_plus", "a"=>12],["n"=>"wood_d",       "t"=> "matrial_box_plus", "a"=>10],
        ["n"=>"archit_a",    "t"=> "matrial_acce",     "a"=>1], ["n"=>"archit_b",        "t"=> "matrial_acce",     "a"=>1], ["n"=>"archit_c",      "t"=> "matrial_acce",     "a"=>1], ["n"=>"archit_d",     "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"archim_a",    "t"=> "matrial_acce",     "a"=>1], ["n"=>"archim_b",        "t"=> "matrial_acce",     "a"=>1], ["n"=>"archim_c",      "t"=> "matrial_acce",     "a"=>1], ["n"=>"archim_d",     "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"luxury_1",    "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_2",        "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_3",      "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_4",     "t"=> "matrial_luxury",   "a"=>1],
        ["n"=>"luxury_4",    "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_5",        "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_6",      "t"=> "matrial_luxury",   "a"=>1], ["n"=>"luxury_7",     "t"=> "matrial_luxury",   "a"=>1],
        ["n"=>"stone_a",     "t"=> "matrial_box_plus", "a"=>20],["n"=>"stone_b",         "t"=> "matrial_box_plus", "a"=>15],["n"=>"stone_c",       "t"=> "matrial_box_plus", "a"=>12],["n"=>"stone_d",      "t"=> "matrial_box_plus", "a"=>10],
        ["n"=>"metal_a",     "t"=> "matrial_box_plus", "a"=>20],["n"=>"metal_b",         "t"=> "matrial_box_plus", "a"=>15],["n"=>"metal_c",       "t"=> "matrial_box_plus", "a"=>12],["n"=>"metal_d",      "t"=> "matrial_box_plus", "a"=>10],
        ["n"=>"wall_acce",   "t"=> "matrial_acce",     "a"=>1], ["n"=>"powder_keg",      "t"=> "matrial_acce",     "a"=>1], ["n"=>"wheat_1",       "t"=> "matrial_product",  "a"=>1], ["n"=>"wheat_7",      "t"=> "matrial_product",  "a"=>1],
        ["n"=>"certain_move","t"=> "matrial_main",     "a"=>1], ["n"=>"spies",           "t"=> "matrial_main",     "a"=>1], ["n"=>"change_name",   "t"=> "matrial_main",     "a"=>1], ["n"=>"trumpet",      "t"=> "matrial_main",     "a"=>1],
        ["n"=>"tagned_3p",   "t"=> "matrial_box",      "a"=>1], ["n"=>"tagned_4p",       "t"=> "matrial_box",      "a"=>1], ["n"=>"tagned_5p",     "t"=> "matrial_box",      "a"=>1], ["n"=>"medal_silver", "t"=> "matrial_box",      "a"=>10],
        ["n"=>"medal_gold",  "t"=> "matrial_box",      "a"=>5], ["n"=>"army_all_1",      "t"=> "matrial_box_plus", "a"=>5], ["n"=>"army_all_2",    "t"=> "matrial_box_plus", "a"=>4], ["n"=>"army_all_3",   "t"=> "matrial_box_plus", "a"=>2],
        ["n"=>"army_a_100",  "t"=> "matrial_box_plus", "a"=>5], ["n"=>"army_b_100",      "t"=> "matrial_box_plus", "a"=>5], ["n"=>"army_c_100",    "t"=> "matrial_box_plus", "a"=>5], ["n"=>"army_d_100",   "t"=> "matrial_box_plus", "a"=>5],
        ["n"=>"coach",       "t"=> "matrial_acce",     "a"=>1], ["n"=>"train_acce_30",   "t"=> "matrial_acce",     "a"=>1], ["n"=>"train_acce_50", "t"=> "matrial_acce",     "a"=>1], ["n"=>"exp_hero_8",   "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"medal_ceasro","t"=> "matrial_main",     "a"=>1], ["n"=>"medal_den",       "t"=> "matrial_main",     "a"=>1], ["n"=>"medal_leo",     "t"=> "matrial_main",     "a"=>1], ["n"=>"ceaser_eagle", "t"=> "matrial_main",     "a"=>1],
        ["n"=>"rec_letter",  "t"=> "matrial_main",     "a"=>1], ["n"=>"retreat_point",   "t"=> "matrial_main",     "a"=>1], ["n"=>"hero_train",    "t"=> "matrial_main",     "a"=>1], ["n"=>"random_move",  "t"=> "matrial_main",     "a"=>1],
        ["n"=>"exp_hero_30", "t"=> "matrial_acce",     "a"=>1], ["n"=>"exp_hero_100",    "t"=> "matrial_acce",     "a"=>1], ["n"=>"hero_back",     "t"=> "matrial_acce",     "a"=>1], ["n"=>"shopping_car", "t"=> "matrial_acce",     "a"=>1],
        ["n"=>"army_a_1000", "t"=> "matrial_box_plus", "a"=>2], ["n"=>"army_b_1000",     "t"=> "matrial_box_plus", "a"=>2], ["n"=>"army_c_1000",   "t"=> "matrial_box_plus", "a"=>2], ["n"=>"army_d_1000",  "t"=> "matrial_box_plus", "a"=>2],
        ["n"=>"a_play",      "t"=> "matrial_main",     "a"=>1], ["n"=>"help_house_chng", "t"=> "matrial_main",     "a"=>1], ["n"=>"family_slogan", "t"=> "matrial_main",     "a"=>1], ["n"=>"union_slogan", "t"=> "matrial_main",     "a"=>1],
        ["n"=>"expan_plan",  "t"=> "matrial_main",     "a"=>1], ["n"=>"marcus_scheme",   "t"=> "matrial_main",     "a"=>1], ["n"=>"freedom_help",  "t"=> "matrial_main",     "a"=>1], ["n"=>"medical_moun", "t"=> "matrial_main",     "a"=>1],
        ["n"=>"sparta_stab", "t"=> "matrial_main",     "a"=>1], ["n"=>"marmlo_helmet",   "t"=> "matrial_main",     "a"=>1], ["n"=>"qulinds_shaft", "t"=> "matrial_main",     "a"=>1], ["n"=>"march_prot",   "t"=> "matrial_main",     "a"=>1]
        
        
    ];

    $count = 0;
    $occoures = [];
    while ($count < 20){

        $rand = rand(0, count($avail_for_win) - 1);
        if(!in_array($rand, $occoures)){

            $occoures[] = $rand;
            $count++;
        }

    }
    
    $matrial_to_send = [];
    
    foreach ($occoures as $one){
        
        $matrial_to_send[] = $avail_for_win[$one];
        
    }
    
    $rowCount = Matrial::useMatrial("matrial_box", "luck_play", 1, $idPlayer);
    
    if($rowCount > 0){
        $index = rand(0, 19);
        Matrial::addMatrial($matrial_to_send[$index]["t"], $matrial_to_send[$index]["n"], $matrial_to_send[$index]["a"], $idPlayer);
        echo json_encode([
            "state" => "ok",
            "availPrizes" => $matrial_to_send,
            "winIndex"    => $index
        ]);
        
    }else{
        
        echo json_encode([
            "state" => "error_1"
        ]);
        
    }
    
}
   
