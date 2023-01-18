<?php

require_once '../config.php';
require_once '../base.php';


if (isset($_POST["CANCEL_AMY_BUILD"])) {

    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city = validateId($_POST["id_city"]);
    $building_blace = validateOurStr($_POST["building_blace"]);
    $id_work = validateId($_POST["id_work"]);

    $all_next_works = selectFromTable("*", "build_army", "id_city = :idc AND place = :bp AND id > :idw AND id_player = :idp", ["idc" => $id_city, "bp" => $building_blace, "idw" => $id_work, "idp" => $id_player]);
    $oneBeforeDelete = selectFromTable("*", "build_army", "id_city = :idc AND place = :bp AND id_player = :idp AND id < :idw LIMIT 1", ["idc" => $id_city, "bp" => $building_blace, "idw" => $id_work, "idp" => $id_player]);

    if (count($oneBeforeDelete) > 0) {

        $time_start = $oneBeforeDelete[0]["time_end"];
    } else {

        $time_start = time();
    }



    for ($iii = 0; $iii < count($all_next_works); $iii++) {


        $time_end = $time_start + ($all_next_works[$iii]["time_end"] - $all_next_works[$iii]["time_start"]);
        updateTable("time_start = :ts , time_end = :te", "build_army", "id = :i", ["ts" => $time_start, "te" => $time_end, "i" => $all_next_works[$iii]["id"]]);
        $time_start += ($all_next_works[$iii]["time_end"] - $all_next_works[$iii]["time_start"]);
    }

    $working = selectFromTable("amount, army_type", "build_army", "id = :idw AND id_player = :idp", ["idw" => $id_work, "idp" => $id_player])[0];

    $req = Army::$ARMY_DATA[$working["army_type"]];

    $req["food"] *= $working["amount"] * ARMY_CANCEL_LOSE_RATIO;
    $req["wood"] *= $working["amount"] * ARMY_CANCEL_LOSE_RATIO;
    $req["stone"] *= $working["amount"] * ARMY_CANCEL_LOSE_RATIO;
    $req["metal"] *= $working["amount"] * ARMY_CANCEL_LOSE_RATIO;
    $req["coin"] *= $working["amount"] * ARMY_CANCEL_LOSE_RATIO;

    $req["pop"] = 0;


    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);


    $city = new City($id_city);
    $city->updateResources($id_player, "+", $req);




    deleteTable("build_army", "id = :idw AND id_player = :idp", ["idw" => $id_work, "idp" => $id_player]);



    echo json_encode([
        "state" => "ok",
        "city" => selectFromTable("food,wood,stone,metal,coin", "city", "id_city = :idc", ["idc" => $id_city])[0]
    ]);
} 

elseif (isset($_POST["FINISH_ARMY_BUILD"])) {

    $id_player    = validateId(cryptUserId(($_POST['token']), "d"));
    $id_work      = validateId($_POST["id_work"]);
    $oneRow       = selectFromTable("*", "build_army", "id = :idw AND id_player = :idp", ["idw" => $id_work, "idp" => $id_player]);
    $army_amount  = validateId($oneRow[0]["amount"]);
    $army_type    = validateOurStr($oneRow[0]["army_type"]);
    $id_city      = validateId($oneRow[0]["id_city"]);
    $current_city = validateId($_POST["current_city"]);


    if (count($oneRow) < 1) {
        exit(json_encode([
                "state" => "ok",
                "player" => selectFromTable("gold,guild,prestige,honor", "player", "id_player = :idp", ["idp" => $id_player])[0],
                "prestige" => $prestige_gain
            ]));
    } else if ($oneRow[0]["time_end"] - 100 > time()) {
        exit(json_encode([
                "state" => "ok",
                "player" => selectFromTable("gold,guild,prestige,honor", "player", "id_player = :idp", ["idp" => $id_player])[0],
                "prestige" => $prestige_gain
            ]));
    }


    $rowCount = Hero::resetArmyBuild($id_player, $id_work);


    $city = new City($id_city);
    $prestige = new Prestige($id_player);

    $prestige_gain = $prestige->armyGainPrestige($army_amount, $army_type);
    $prestige->adddPrestige($prestige_gain);
    City::addEXPConsole($id_city, $prestige_gain * 2);
    $city->armyCityAdd($id_player, $army_type, $army_amount, "+");

    if ($id_city == $current_city) {
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->food_OutState($id_city);
        echo json_encode([
            "state" => "ok",
            "player" => selectFromTable("gold,guild,prestige,honor", "player", "id_player = :idp", ["idp" => $id_player])[0],
            "city" => selectFromTable("food_out,army_a,army_b,army_c,army_d,army_e,army_f,food,wood,stone,metal,coin", "city", "id_city = '$id_city'")[0],
            "prestige" => $prestige_gain
        ]);
    } else {
        echo json_encode([
            "state" => "ok",
            "player" => selectFromTable("gold,guild,prestige,honor", "player", "id_player = :idp", ["idp" => $id_player])[0],
            "prestige" => $prestige_gain
        ]);
    }

    if ($rowCount > 0) {
        
    } else {
        echo json_encode([
            "state" => "error"
        ]);
        file_put_contents("army-build-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
    }
} 

elseif (isset($_POST["ACCE_ARMY_BUILD"])) {

    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $place     = validateOurStr($_POST["place"]);
    $matrial   = validateOurStr($_POST["matrial"]);


    if ($matrial == "train_acce_30") {

        $factor = 0.3;
    } else if ($matrial == "train_acce_50") {

        $factor = 0.5;
        
    }else if($matrial == "wall_acce" && $place == "wall"){
        $factor = 0.5;
    }else{
        
        catchHack();
        exit();
        
    }
    
    $check = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);

    $BuildingBlocks = [
        "light_house" => ["light_house_1", "light_house_2", "light_house_3", "light_house_4", "light_house_5", "light_house_6", "light_house_7", "light_house_8", "light_house_9", "light_house_10"],
        "above_palace" => ["above_palace_1", "above_palace_2", "above_palace_3", "above_palace_4", "above_palace_5", "above_palace_6"],
        "under_palace" => ["under_palace_1", "under_palace_2", "under_palace_3", "under_palace_4", "under_palace_5", "under_palace_6", "under_palace_7", "under_palace_8", "under_palace_9", "under_palace_10", "under_palace_11"],
        "hill" => ["hill_1", "hill_2", "hill_3", "hill_4", "hill_5", "hill_6", "hill_7", "hill_8", "hill_9", "hill_10", "hill_11", "hill_12"],
        "under_wall" => ["under_wall_1", "under_wall_2", "under_wall_3", "under_wall_4", "under_wall_5", "under_wall_6", "under_wall_7", "under_wall_8", "under_wall_9", "under_wall_10", "under_wall_11", "under_wall_12"],
        "around_wood" => ["around_wood_1", "around_wood_2", "around_wood_3"]
    ];

    if($place == "wall"){
        $blockPlaces = ["wall"];
    }else{
        $blockKey = explode("_", $place);
        array_pop($blockKey);
        $blockBelong = implode("_", $blockKey);
        $blockPlaces = $BuildingBlocks[$blockBelong];
    }
    
    if ($check > 0) {
        foreach ($blockPlaces as $onePlace):
            $all_recordes = [];

            $all_recordes = selectFromTable("*", "build_army", "id_city = :idc AND id_player = :idp  AND place = :pl", ["idc" => $id_city, "idp" => $id_player, "pl" => $onePlace]);

            for ($index = 0; $index < count($all_recordes); $index++):

                if ($index > 0) {

                    $time_start = max($all_recordes[$index - 1]["time_end"], time());

                    if ($all_recordes[$index]["acce"] == 1) {

                        $time_end = $all_recordes[$index]["time_end"] - ($all_recordes[$index]["time_start"] - $time_start);
                    } else {

                        $time_end = $all_recordes[$index]["time_end"] - ($all_recordes[$index]["time_end"] - $all_recordes[$index]["time_start"]) * $factor - ($all_recordes[$index]["time_start"] - $time_start);
                    }



                    $all_recordes[$index]["time_end"] = $time_end;
                    $all_recordes[$index]["time_start"] = $time_start;
                } else {

                    if ($all_recordes[0]["acce"] == 0) {
                        $time_end = $all_recordes[0]["time_end"] - ($all_recordes[0]["time_end"] - time()) * $factor;
                        $all_recordes[0]["time_end"] = $time_end;
                    }
                }


                City::updateArmyBuild($all_recordes[$index]["time_end"], $all_recordes[$index]["time_start"], $all_recordes[$index]["id"]);
            endfor;

        endforeach;
    }

    $save_state = new SaveState($id_player);
    echo json_encode($save_state->getTimedTasks());
}

