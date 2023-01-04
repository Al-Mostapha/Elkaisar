<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["GET_EQUIP_POWER"])){
    
    
    
    echo json_encode(selectFromTable("*", "equip_power", "1"));
    
}

// get equip on here
elseif (isset ($_POST["get_equip_onHero"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $id_equip  = validateId($_POST["id_equip"]);
    $equip_part= validateOurStr($_POST["equip_part"]);
    
     if(!is_numeric($id_equip) || $equip_part == "undefined" || !in_array($equip_part, ["boot", "armor", "shield", "helmet", "sword", "belt", "necklace", "pendant", "ring", "steed"])){
        exit(json_encode([
            "state"=>"error_0"
        ]));
    }
    
    if(count(selectFromTable("`id_$equip_part`" ,"hero_equip", "`id_$equip_part` = :ide", ["ide"=>$id_equip])) > 0){
        
        exit(json_encode([
            "state"=>"error_0"
        ]));
        
    }
    if(!count(selectFromTable("*", "equip", "id_equip = :idq AND id_player = :idp", ["idq" => $id_equip, "idp" => $id_player])))
            exit(json_encode([
                "state"=>"error_0"
            ]));
    /*   لو البطل   شايل معدة  هيرجع الايدى بتاعها 
لو م  شايل هيرجع   نل     */
    $id_equip_onhero = Equipment::getHeroEquiPart($id_hero, $id_player, $equip_part);
    
    if(is_numeric($id_equip_onhero)){
        Equipment::removeFromHero($id_hero, $id_equip_onhero, $equip_part, $id_player);
    }
    
    Equipment::addToHero($id_hero, $id_equip, $equip_part, $id_player);
        
    $hero_equip = Equipment::retriveEquipByIdHero($id_hero, $id_player);
    $fetch["equip"]["boot"]        = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
    $fetch["equip"]["armor"]       = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
    $fetch["equip"]["shield"]      = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
    $fetch["equip"]["helmet"]      = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
    $fetch["equip"]["sword"]       = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
    $fetch["equip"]["belt"]        = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
    $fetch["equip"]["necklace"]    = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
    $fetch["equip"]["pendant"]     = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
    $fetch["equip"]["ring"]        = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
    $fetch["equip"]["steed"]       = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);
    
    echo json_encode($fetch);
        
    
}


elseif (isset ($_POST["get_equip_offHero"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $id_equip  = validateId($_POST["id_equip"]);
    $equip_part= validateOurStr($_POST["equip_part"]);
    
    if(!is_numeric($id_equip) || $equip_part == "undefined" || !in_array($equip_part, ["boot", "armor", "shield", "helmet", "sword", "belt", "necklace", "pendant", "ring", "steed"])){
        exit(json_encode([
            "state"=>"error_0"
        ]));
    }
    if(!count(selectFromTable("*", "equip", "id_equip = :idq AND id_player = :idp", ["idq" => $id_equip, "idp" => $id_player])))
        exit(json_encode([
            "state"=>"error_0"
        ]));
    
    Equipment::removeFromHero($id_hero, $id_equip, $equip_part, $id_player);
     
    $hero_equip = Equipment::retriveEquipByIdHero($id_hero, $id_player);
    $fetch["equip"]["boot"]        = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
    $fetch["equip"]["armor"]       = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
    $fetch["equip"]["shield"]      = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
    $fetch["equip"]["helmet"]      = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
    $fetch["equip"]["sword"]       = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
    $fetch["equip"]["belt"]        = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
    $fetch["equip"]["necklace"]    = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
    $fetch["equip"]["pendant"]     = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
    $fetch["equip"]["ring"]        = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
    $fetch["equip"]["steed"]       = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);
    
    echo json_encode($fetch);
}

