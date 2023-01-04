<?php
require_once '../config.php';
require_once '../base.php';
    
if(isset($_GET["get_theater_hero"])){
    
    $id_player       = validateId(cryptUserId(($_GET['token']), "d"));
    $id_city         = validateId($_GET["id_city"]);
    
    echo Hero::refreshTeater($id_city);
    
}



if(isset($_GET["REFRESH_THEATER_WITH_MAT"])){
    
    $id_player       = validateId(cryptUserId(($_GET['token']), "d"));
    $id_city         = validateId($_GET["id_city"]);
    if(Matrial::useMatrial("matrial_main", "rec_letter", 1, $id_player)){
        
        echo Hero::refreshTeater($id_city , TRUE);
        
    }else{
        
        
        echo json_encode([]);
        
    }
    
    
}


elseif(isset ($_POST["ADD_HERO_FROM_THEATER"])){
    
    $id_here_theater = validateId($_POST["id_hero"]);
    $id_player       = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city         = validateId($_POST["id_city"]);
    
    
    $theater_hero = selectFromTable("*", "hero_theater", "id_hero = :idh", ["idh"=>$id_here_theater]);
    
    if(is_array($theater_hero) && count($theater_hero) > 0){
        
        Hero::deleteHeroTheaterById($id_here_theater);
        $AVAIL_NAME = ["ماكسيموس","اشرف", "مصطفى", "اليكس", "اليسا", "بطليموس",
            "كليوباترا","هكس","ماجد", "يويليوس","مارس","ماكس","صلاح الدين","سيورس",
             "سيزار", "اغسطس","جلادياتور","سما", "زين","شادو","الملك", "القاهر",
            "الاسد", "اليس","حورس","يورك"
        ];
        $hero = Hero::addHero($AVAIL_NAME[$theater_hero[0]["hero_name"]], 
                $theater_hero[0]["hero_lvl"], 
                $id_player,
                $id_city,
                $theater_hero[0]["hero_image"],
                $theater_hero[0]["ultra_p"]);
        
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->coin_outState($id_city);
        $price = $theater_hero[0]["hero_lvl"]*100;
        updateTable("coin = GREATEST(coin - $price , 0)", "city", "id_city = :idc",["idc"=>$id_city]);
        echo json_encode(['state' => "ok" , "city"=> selectFromTable("food,wood,stone,metal,coin,coin_out", "city", "id_city = :idc",["idc"=>$id_city])[0] ]);
        
        
    }else{
        
        echo json_encode("error");
        
    }
    
    
    
    
}

/*
 *هنا هجيب المديليات الى لابسها البطل  
 *  */

elseif (isset ($_GET["get_medal"])) {
    
    $id_hero = validateId($_GET["id_hero"]);
    echo json_encode(Hero::getHeroMedal($id_hero));
}
 /*
  *UPgrade hero
  * lvl , id_hero   will be send as post 
  * id_player in  session 
  * check in database
  *   */
elseif(isset ($_POST["upgrade_hero"])){
    
    $id_hero   = validateId($_POST["id_hero"]);
    $hero      = selectFromTable("lvl, exp, ultra_p", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    $lvl       = $hero[0]["lvl"];
    $ultra_p   = $hero[0]["ultra_p"];
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    
    
    $reqXp     = Hero::calReqXp($lvl , $id_player);
    $point = 3;
    
    if(($lvl + 1)%10 == 0){
        
        $point += $ultra_p;
        
    }
    
    
    if($lvl < 255){
        
        
        updateTable(
                "lvl = lvl + 1 , points = points + :p ,  exp = exp - :re",
                "hero",
                "id_hero = :idh AND id_player = :idp AND lvl = :l AND in_city = 1 AND exp >= :rex -100 AND ultra_p = :up",
                ["p"=>$point, "re"=>$reqXp, "idh"=>$id_hero, "idp"=>$id_player, "l"=>$lvl, "rex"=>$reqXp, "up"=>$ultra_p]);
        
        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);
        $save_state->coin_outState($id_city);
        
        echo json_encode([
                "state"=>"ok",
                "city"=> selectFromTable("food,wood,stone,metal,coin,coin_out", "city", "id_city = '$id_city'")[0],
                'points'=>$point
            ]);
        
        
    }
}



/*

 * USE MATRIAL FOR HERO 
 * we GET hero id   we have id_player
 * we decemnt element   if it updated ok the its ok to add  the task 
 * لو المتريال قلت كدة يبقى هو معاه  كتير عشان الفيلد  معمول موجب بس فى الداتا بيز
 *  */

elseif(isset ($_POST["add_xp"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $hero      = selectFromTable("lvl, exp, ultra_p", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    $matrial   = validateOurStr($_POST["matrial"]);
    $hero_lvl  = $hero[0]["lvl"];
    
    
    $exp = Hero::calReqXp($hero_lvl ,$id_player);
    
    if($matrial == "exp_hero_8"){
        $amount = $exp*8/100 > 1000 ? $exp*8/100  : 1000;
    }elseif($matrial == "exp_hero_30"){
        $amount = $exp*0.3 > 100000 ? $exp*0.3    : 100000;
    }elseif($matrial == "exp_hero_100"){
        $amount = $exp > 1000000 ? $exp    : 1000000;
    }
    
    $rowCount = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);
    if($rowCount > 0){
        updateTable("exp = exp + :a", "hero", " id_player = :idp  AND id_hero = :idh AND lvl = :l",["a"=>$amount, "idp"=>$id_player, "idh"=>$id_hero, "l"=>$hero_lvl]);
        
        echo json_encode(array(
            "state"=>"ok",
            "amount"=>$amount
        ));
        
    }
}

/*

 * USE MATRIAL FOR HERO 
 * we GET hero id   we have id_player
 * we decemnt element   if it updated ok the its ok to add  the task 
 * لو المتريال قلت كدة يبقى هو معاه  كتير عشان الفيلد  معمول موجب بس فى الداتا بيز
 *  */

elseif(isset ($_POST["add_power"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $hero      = selectFromTable("lvl, power", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    $matrial   = validateOurStr($_POST["matrial"]);
    $hero_lvl  = $hero[0]["lvl"];
    $current_power = $hero[0]["power"];
    
    $maxPower = $hero_lvl >= 100 ? 150 : $hero_lvl +50;
    
    if($matrial == "bread"){
        $amount = (int)($current_power + ($maxPower*10/100) >= $maxPower ? $maxPower - $current_power :($maxPower*10/100));
    }elseif($matrial == "fruit"){
        $amount = (int)($current_power + ($maxPower*30/100) >= $maxPower ? $maxPower - $current_power :($maxPower*30/100));
    }elseif($matrial == "milk"){
        $amount = (int)($current_power + ($maxPower*60/100) >= $maxPower ? $maxPower - $current_power :($maxPower*60/100));
    }elseif($matrial == "meat"){
        $amount = (int)( $maxPower - $current_power);
    }
    
    $rowCount = Matrial::useMatrial("matrial_acce", $matrial, 1, $id_player);
    if($rowCount > 0){
        
        if(Hero::increasePower($id_player, $id_hero, $amount) > 0 || $amount ==0){
           echo json_encode(array(
               "state"=>"ok",
               "amount"=>$amount
           ));
           
        }else{
            echo json_encode(array(
                   "state"=>"notok",
                   "amount"=>0
               ));
        }
        
    }
}



/*

 * USE MATRIAL FOR HERO 
 * we GET hero id   we have id_player
 * we decemnt element   if it updated ok the its ok to add  the task 
 * لو المتريال قلت كدة يبقى هو معاه  كتير عشان الفيلد  معمول موجب بس فى الداتا بيز
 *  */

elseif(isset ($_POST["add_loy"])){
    
    $id_player   = cryptUserId(($_POST['token']), "d");
    $id_hero     = validateId($_POST["id_hero"]);
    $hero        = selectFromTable("lvl, loyal", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    $matrial     = validateOurStr($_POST["matrial"]);
    $hero_lvl    = $hero[0]["lvl"];
    $current_loy = $hero[0]["loyal"];
    
    $maxLoy = 100;
    
    if($matrial == "luxury_1"){
        $amount = (int)(100 - $current_loy >= 5 ? $current_loy+5 : 100 );
    }elseif($matrial == "luxury_2"){
        $amount = (int)(100 - $current_loy >= 10 ? $current_loy+10 : 100);
    }elseif($matrial == "luxury_3"){
        $amount = (int)(100 - $current_loy >= 15 ? $current_loy+15 : 100);
    }elseif($matrial == "luxury_4"){
        $amount = (int)(100 - $current_loy >= 20 ? $current_loy+20 : 100);
    }elseif($matrial == "luxury_5"){
        $amount = (int)(100 - $current_loy >= 25 ? $current_loy+25 : 100);
    }elseif($matrial == "luxury_6"){
        $amount = (int)(100 - $current_loy >= 30 ? $current_loy+30 : 100);
    }elseif($matrial == "luxury_7"){
        $amount = (int)(100 - $current_loy >= 35 ? $current_loy+35 : 100);
    }elseif($matrial == "luxury_8"){
        $amount = (int)(100 - $current_loy >= 40 ? $current_loy+40 : 100);
    }elseif($matrial == "luxury_9"){
        $amount = (int)(100 - $current_loy >= 45 ? $current_loy+45 : 100);
    }else{
        $amount = 0;
    }
    
    $rowCount = Matrial::useMatrial("matrial_luxury", $matrial, 1, $id_player);
    if($rowCount > 0){
        
        updateTable("loyal = :a", "hero", "id_player = :idp  AND id_hero = :idh AND loyal >= :l", ["idp"=>$id_player, "a"=>$amount, "idh"=>$id_hero, "l"=>$current_loy]);
        
        
        echo json_encode(array(
            "state"=>"ok",
            "amount"=>$amount
        ));
           
       
    }
}

/* UPDATE HERO POINTS  */
elseif (isset ($_POST["update_hero_point"])) {
    
    $id_player =(int) validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   =(int) validateId($_POST["id_city"]);
    $id_hero   =(int) validateId($_POST["id_hero"]);
    $point_a   =(int) validateId($_POST["add_p_a"]);
    $point_b   =(int) validateId($_POST["add_p_b"]);
    $point_c   =(int) validateId($_POST["add_p_c"]);
    
    $total = $point_a + $point_b + $point_c;
    
    if($total > 0){
        
       $row_count =  updateTable("point_a = point_a + :pa ,  point_b = point_b + :pb , point_c = point_c + :pc , points = points - :pt",
               "hero",
               "id_player = :idp AND id_hero = :idh AND  points >= :t AND in_city = 1",
               ["pa"=>$point_a, "pb"=>$point_b, "pc"=>$point_c, "pt"=>$total, "idp"=>$id_player, "idh"=>$id_hero, "t"=>$total]);
       
        
        if($row_count > 0){
            $id_console = selectFromTable("console", "city", "id_city = :idc", ["idc"=>$id_city])[0]["console"];
            if($id_console == $id_hero){
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->getConsoleEffect($id_city);
                $save_state->res_inState($id_city, "food");
                $save_state->res_inState($id_city, "wood");
                $save_state->res_inState($id_city, "stone");
                $save_state->res_inState($id_city, "metal");
                $save_state->coin_inState($id_city);
                
                echo json_encode([
                    "state"=>"ok",
                    "hero"=> selectFromTable("point_a, point_b, point_c, points", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0],
                    "city"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city  = :idc",["idc"=>$id_city])[0]
                ]);
            }else{
                 echo json_encode([
                    "state"=>"ok",
                    "hero"=> selectFromTable("point_a, point_b, point_c, points", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0]
                ]);
            }
        }else{
            echo json_encode([
                    "state"=>"error",
                    "hero"=> selectFromTable("point_a, point_b, point_c, points", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0]
                ]);
        }
    }
}


/*                               RETREAT ALL POINTS FOR HERO                  */

elseif (isset ($_POST["retreat_points_all"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $heroDB    = selectFromTable("lvl", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    $lvl       = $heroDB[0]["lvl"];
    $id_city   = validateId($_POST["id_city"]);
    
    
    $matrial_amount = floor($lvl/10) +1;
    
    
    
    $rowCount = Matrial::useMatrial("matrial_main", "retreat_point", $matrial_amount , $id_player);
    if($rowCount > 0){
        
        $hero = selectFromTable("*", "hero", "id_hero = :idh", ["idh" => $id_hero])[0];
        $points = ($hero["lvl"])*3 + floor(($hero["lvl"] - $hero["b_lvl"])/10)*$hero["ultra_p"];
        
        $row_count = updateTable("points = :po , point_a = p_b_a , point_b = p_b_b  , point_c = p_b_c", "hero", "id_player = :idp AND id_hero = :idh  AND in_city = 1", ["po"=>$points,"idh"=>$id_hero, "idp"=>$id_player]);
        
        
            
            $id_console = selectFromTable("console", "city", "id_city = '$id_city'")[0]["console"];
            
            if($id_console == $id_hero){
                $save_state = new SaveState($id_player);
                $save_state->getConsoleEffect($id_city);
                $save_state->saveCityState($id_city);
                $save_state->res_inState($id_city, "food");
                $save_state->res_inState($id_city, "wood");
                $save_state->res_inState($id_city, "stone");
                $save_state->res_inState($id_city, "metal");
                $save_state->coin_inState($id_city);
                echo json_encode([
                    "state"=>"ok",
                    "hero"=> selectFromTable("point_a , point_b, point_c, points", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0],
                    "city"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city = :idc", ["idc"=>$id_city])[0]
                ]);
            }else{
               
                echo json_encode([
                    "state"=>"ok",
                    "hero"=> selectFromTable("point_a , point_b, point_c, points", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0]
                ]);
                
            }
            
            
        

        
        
        
        
    }else{
        echo 'no_matrial';
    }
    
        
    
}


/*                          add console to city                               */
elseif (isset ($_POST["add_console"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $id_city   = selectFromTable("id_city", "hero", "id_hero = :idh", ["idh"=>$id_hero])[0]['id_city']; 
    
    updateTable("console = 0", "hero", "id_city = :idc", ["idc"=>$id_city]);
    updateTable("console = 1", "hero", "id_hero = :idh", ["idh"=>$id_hero]);
    updateTable("console = :idh", "city", "id_city = :idc", ["idh"=>$id_hero, "idc"=>$id_city]);
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    $save_state->getConsoleEffect($id_city);
    $save_state->coin_inState($id_city);
    $save_state->res_inState($id_city , "food");
    $save_state->res_inState($id_city , "metal");
    $save_state->res_inState($id_city , "stone");
    $save_state->res_inState($id_city , "wood");

    echo json_encode([
        "state"=>"ok" , 
        "city_resource"=> selectFromTable("id_city, food, wood, stone, coin, metal, food_in, wood_in, stone_in, metal_in, coin_in", "city", "id_city = :idc", ["idc"=>$id_city])[0]
        ]);
}


/*                          remove console from city                               */
elseif (isset ($_POST["remove_console"])) {
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero   = validateId($_POST["id_hero"]);
    $id_city   = validateId($_POST["id_city"]);
    
    updateTable("console = 0", "hero", "id_city = :idc", ["idc" => $id_city]);
    updateTable("console = NULL", "city", "id_city = :idc", ["idc" => $id_city]);
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    $save_state->getConsoleEffect($id_city);
    $save_state->coin_inState($id_city);
    $save_state->res_inState($id_city , "metal");
    $save_state->res_inState($id_city , "food");
    $save_state->res_inState($id_city , "stone");
    $save_state->res_inState($id_city , "wood");

    echo json_encode([
        "state"=>"ok" , 
        "city_resource"=> selectFromTable("food, wood, stone, coin, metal, food_in, wood_in, stone_in, metal_in, coin_in", "city", "id_city = :idc", ["idc" =>$id_city])[0]
        ]);


}


/*                       add medl   to hero            */

elseif(isset ($_POST["add_medal_for_hero"])){
    
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    $id_city   = validateId($_POST["id_city"]);
    $id_hero   = validateId($_POST["id_hero"]);
    $medal     = validateOurStr($_POST["medal"]);
    
    $row = selectFromTable("`$medal`", "hero_medal", "id_hero = :idh", ["idh"=>$id_hero]);
    if(count($row) < 1){
        catchHack();
        exit();
    }
    $now = time();
    $time_limit =  $row[0][$medal];
    
    if($time_limit > $now){
        $amount = $time_limit +  7*24*60*60;
    }else{
        $amount = $now +  7*24*60*60;
    }
    
    $rowCount = Matrial::useMatrial("matrial_main", $medal, 1, $id_player);
    
    if($rowCount > 0){
        
        updateTable("`$medal` = :am" , "hero_medal" , "id_hero = :idh", ["idh"=>$id_hero, "am"=>$amount]);
        
        if($medal === "medal_ceasro"){
            $id_console = selectFromTable("console", "city", "id_city = :idc", ["idc" => $id_city])[0]['console'];
            
            if($id_hero == $id_console){
                
                $save_state = new SaveState($id_player);
                $save_state->saveCityState($id_city);
                $save_state->getConsoleEffect($id_city);
                $save_state->coin_inState($id_city);
                $save_state->res_inState($id_city, "food");
                $save_state->res_inState($id_city, "wood");
                $save_state->res_inState($id_city, "stone");
                $save_state->res_inState($id_city, "metal");
                
                echo json_encode([
                    "state"=>"ok",
                    "time_end"=>$amount,
                    "city"=> selectFromTable("food,wood,stone,metal,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city = :idc", ["idc" => $id_city])[0]
                ]);
                
            }else{
                echo json_encode([
                    "state"=>"ok",
                    "time_end"=>$amount
                ]);
            }
            
        }else{
           
            echo json_encode([
                    "state"=>"ok",
                    "time_end"=>$amount
                ]);
            
        }
        
    }else{
        echo json_encode([
                    "state"=>"error"
                ]);
    }
    
}






/*____________________________HERO RANKS _____________________________________*/

elseif(isset ($_GET["get_rank_hero"])){
    
    $offset = validateId($_GET["offset"]);
    
    echo json_encode(selectFromTable(
            "hero.name , hero.id_hero , hero.lvl , hero.point_a , hero.point_b ,  hero.point_c , player.name AS p_name", 
            "hero JOIN player  ON player.id_player = hero.id_player",
            "1  ORDER BY point_a DESC, player.prestige DESC LIMIT 10 OFFSET $offset"));
    
}


    
/*____________________________HERO RANKS _____________________________________*/

elseif(isset ($_GET["get_rank_hero_searsh"])){
    
    $searsh_By    = validateName($_GET["searsh_By"]);
    $search_value = validateName($_GET["search_value"]);
    $sv = "";
    if(is_numeric($search_value)){
        
        $condetion = "col.`$searsh_By` = :sv";
        $sv = $search_value;
    }else{
        
        $condetion = "col.`$searsh_By` LIKE :sv";
        $sv = "%$search_value%";
    }
    
   
    echo json_encode(selectFromTable("col.name , col.lvl , col.point_a , col.point_b , col.point_c, rank_h , player.name as p_name",
            "(SELECT hero.*, @row:=@row+1 as 'rank_h' FROM hero , (SELECT @row:=0) r ORDER BY hero.lvl DESC ) AS col JOIN player  ON $condetion AND col.id_player = player.id_player", "1  LIMIT 10", ["sv" => $sv]));
    
}


elseif (isset ($_POST["LEARN_HERO_POINT_PLUS"])) {

    $id_player   = validateId(cryptUserId(($_POST['token']), "d"));
    $id_hero     = validateId($_POST["id_hero"]);
    $point_for   = validateOurStr($_POST["point_for"]);
    $meddal      = validateOurStr($_POST["meddal_used"]);
    
    if(!in_array($point_for, ["point_a_plus", "point_b_plus", "point_c_plus"])){
        catchHack();
        exit();
    }
    if($meddal == "medal_bronz"){
        
        $rand = rand(-100, 100);
        $maxPoint = $rand > 0? ($rand > 50 ? 2 : 1) : -1; 
        
        
    }elseif($meddal == "medal_silver"){
        
        $rand = rand(-50, 100);
        $maxPoint = $rand > 0? ($rand > 50 ? 2 : 1) : -1; 
        
    }elseif( $meddal == "medal_gold"){
        
        $rand = rand(-30, 100);
        $maxPoint = $rand > 0? ($rand > 50 ? ($rand > 75 ? 3 : 2) : 1) : 0; 
        
    } else {
        catchHack();
        exit();
    }
    
    $rowCount = Matrial::useMatrial("matrial_box", $meddal, 10 , $id_player);
    
    if($rowCount > 0){
        
        updateTable("`$point_for` = GREATEST(0 , LEAST(`$point_for` + (:mx) , 10) )", "hero", "id_player = :idp AND  id_hero = :idh AND in_city = 1", ["mx" => $maxPoint, "idp" => $id_player, "idh" => $id_hero]);
        
        echo $maxPoint;
        
        
    }
    
}

elseif (isset ($_POST["UPDATE_HERO_NEW_NAME"])) {

    $id_hero    = validateId($_POST["id_hero"]);
    $hero_name  = validateName($_POST["new_name"]);
    $id_player  = validateId(cryptUserId(($_POST['token']), "d"));
    
    updateTable("name = :hn", "hero", "id_hero = :idh AND id_player = :idp", ["hn" => $hero_name, "idh" => $id_hero, "idp" => $id_player]);
   
}


elseif(isset ($_GET["ARMY_FROM_CITY_TO_HERO"])){
     
    $id_city     = validateId($_GET['id_city']);  // id of city where army are
    $id_player   = validateId(cryptUserId(($_GET['token']), "d"));             // id  owner of city
    $army_type   = validateOurStr($_GET["type"]);     // army kind
    $army_amount = validateId($_GET["amount"]);
    $id_hero     = validateId($_GET["id_hero"]); // hero  to add or   remove army from
    $army_place  = validateOurStr($_GET["army_place"]); //  the cell where  the army add or remove
     
    $stdArmyPlaces = [
        "f_1","f_2","f_3","b_1","b_2","b_3"
    ];
    if(!in_array($army_place, $stdArmyPlaces)){
        file_put_contents("place-error-ar-place.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit("1");
        
    }
    
    if(!is_numeric($army_amount) || $army_amount <= 0){
        file_put_contents("city-to-hero-armyAmount.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit("2");
    }
    
    if(!is_string($army_place) || strlen($army_place) < 2){
        file_put_contents("city-to-hero-armyPlace.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit("3");
    }
    
     
    switch ($army_type){
        case "sol-1":
            $type_for_hero = 1;
            $type_for_city = "army_a";
            break;
        case "sol-2":
            $type_for_hero = 2;
            $type_for_city = "army_b";
            break;
        case "sol-3":
            $type_for_hero = 3;
            $type_for_city = "army_c";
            break;
        case "sol-4":
            $type_for_hero = 4;
            $type_for_city = "army_d";
            break;
        case "sol-5":
            $type_for_hero = 5;
            $type_for_city = "army_e";
            break;
        case "sol-6":
            $type_for_hero = 6;
            $type_for_city = "army_f";
            break;
        default :
            catchHack();
            $type_for_hero = NULL;
            $type_for_city = NULL;
    }
    
    if(is_null($type_for_hero) || is_null($type_for_city)){
        catchHack();
        exit("4");
    }
    
    $city = new City($id_city);
    $hero = new Hero($id_hero);
    
    $cityAmount = selectFromTable("$type_for_city", "city", "id_city = '$id_city' AND id_player = '$id_player'")[0];
    $avail_cap  = Hero::heroAvailableCap($id_player, $id_hero);
    
    if($cityAmount[$type_for_city] < $army_amount){
        
        exit("5");
    }
    
    if($avail_cap < Hero::$SOLIDIAR_CAP[$type_for_hero]*$army_amount){
        
        exit(json_encode(['state'=>"error_2" , "army_hero"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero'")[0]]));
        
    }
    
    updateTable("$type_for_city = $type_for_city - '$army_amount'", "city", "id_city = '$id_city' AND id_player = '$id_player'");
    
    if(updateTable("`".$army_place."_type` = $type_for_hero , `".$army_place."_num` = `".$army_place."_num` + '$army_amount'",
            "hero_army",
            "id_player = '$id_player' AND id_hero = '$id_hero' AND (`".$army_place."_type` = $type_for_hero OR `".$army_place."_type` = 0)") < 1){
        file_put_contents("city-to-hero-no-take.txt", print_r($_GET, TRUE), FILE_APPEND);
    }
    
    echo json_encode(['state'=>"ok" ,
        "army_hero"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero'")[0],
        "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]
            ); 
            
    
    
   
    
  
 }
 
 
elseif(isset ($_GET["ARMY_FROM_HERO_TO_CITY"])){
     
    $id_city     = validateId($_GET['id_city']);  // id of city where army are
    $id_player   = validateId(cryptUserId($_GET['token'], "d"));              // id  owner of city
    $army_type   = validateOurStr($_GET["type"]);     // army kind
    $army_amount = validateId($_GET["amount"]);
    $id_hero     = validateId($_GET["id_hero"]); // hero  to add or   remove army from
    $army_place  = validateOurStr($_GET["army_place"]); //  the cell where  the army add or remove
     
    $stdArmyPlaces = [
        "f_1","f_2","f_3","b_1","b_2","b_3"
    ];
    if(!in_array($army_place, $stdArmyPlaces)){
        file_put_contents("place-error-ar-place.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    
    if(!is_numeric($army_amount) || 
            !is_string($army_place) || strlen($army_place) < 2 || $army_amount <= 0){
        file_put_contents("place-error-arp-ar-amo.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    
    
     
    switch ($army_type){
        
        case "sol-1":
            $type_for_hero = 1;
            $type_for_city = "army_a";
            break;
        case "sol-2":
            $type_for_hero = 2;
            $type_for_city = "army_b";
            break;
        case "sol-3":
            $type_for_hero = 3;
            $type_for_city = "army_c";
            break;
        case "sol-4":
            $type_for_hero = 4;
            $type_for_city = "army_d";
            break;
        case "sol-5":
            $type_for_hero = 5;
            $type_for_city = "army_e";
            break;
        case "sol-6":
            $type_for_hero = 6;
            $type_for_city = "army_f";
            break;
        default :
            catchHack();
            $type_for_hero = NULL;
            $type_for_city = NULL;
    }
    
    
    if(is_null($type_for_hero) || is_null($type_for_city)){
        exit();
    }
    
    $city = new City($id_city);
    $hero = new Hero($id_hero);
    
    $cell_from = $hero->getHeroArmyByCELL($army_place, $id_player);
    
    $to_add = "`".$army_place."_num` - {$army_amount}";
    
    
    if(!$cell_from){
        
        file_put_contents("place-error-no-cell-from.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    
    if($cell_from[1] == $army_amount){
        
        $type_for_hero = 0;
        $to_add = "0";
        
    }else if($cell_from[1] < $army_amount){
        
        exit(json_encode(['state'=>"error_0" ,
            "army_hero"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero'")[0],
            "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]
                ));
        
    }
    
    if($cell_from[0] != $type_for_hero && $type_for_hero != 0 ){
        
        exit(json_encode(['state'=>"error_1" ,
            "army_hero"=> selectFromTable("*", "hero_army", "id_hero = $id_hero")[0],
            "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]
                ));
        
    }
    
    
    
    updateTable("$type_for_city = $type_for_city + $army_amount", "city", "id_city = '$id_city' AND id_player = '$id_player'");
    
    $row_count = updateTable("`".$army_place."_type` = '$type_for_hero' , `".$army_place."_num` = $to_add ", "hero_army", "id_hero = '$id_hero' AND id_player = '$id_player'");
    
   
    if($row_count < 1){
        file_put_contents("hero-to-city-errors.txt", print_r($_GET, TRUE), FILE_APPEND);
    }

    echo json_encode(['state'=>"ok" ,
        "army_hero"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero'")[0],
        "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]
    ); 

        
        
        
   
    
  
 }
 

 elseif(isset ($_GET["ARMY_FROM_HERO_TO_HERO"])){
    
    $id_city     = validateId($_GET['id_city']);  // id of city where army are
    $id_player   = validateId(cryptUserId($_GET['token'], "d"));              // id  owner of city
    $army_type   = validateOurStr($_GET["type"]);     // army kind
    $army_amount = floor(validateId($_GET["amount"]) );
    $id_hero_from= validateId($_GET["id_hero_from"]); // hero  to   remove army from
    $id_hero_to  = validateId($_GET["id_hero_to"]);   // hero to add army to
    $place_from  = validateOurStr($_GET["place_from"]); //  the cell where  the army  remove
    $place_to    = validateOurStr($_GET["place_to"]);   // the cell to move army to
    
    
    $stdArmyPlaces = [
        "f_1","f_2","f_3","b_1","b_2","b_3"
    ];
    if(!in_array($place_from, $stdArmyPlaces)){
        file_put_contents("place-error-ar-place.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    if(!in_array($place_to, $stdArmyPlaces)){
        file_put_contents("place-error-ar-place.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    
    if(!is_string($place_from)  || ! is_string($place_to)){
        file_put_contents("place-error-from-h-to-h.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit(json_encode(["state"=>"error_0"]));
    }
    
    switch ($army_type){
        case "sol-1":
            $type_for_hero = 1;
            $type_for_city = "army_a";
            break;
        case "sol-2":
            $type_for_hero = 2;
            $type_for_city = "army_b";
            break;
        case "sol-3":
            $type_for_hero = 3;
            $type_for_city = "army_c";
            break;
        case "sol-4":
            $type_for_hero = 4;
            $type_for_city = "army_d";
            break;
        case "sol-5":
            $type_for_hero = 5;
            $type_for_city = "army_e";
            break;
        case "sol-6":
            $type_for_hero = 6;
            $type_for_city = "army_f";
            break;
        default :
            catchHack();
            $type_for_hero = NULL;
            $type_for_city = NULL;
     }
     
    $hero_from = new Hero($id_hero_from);
    $hero_to   = new Hero($id_hero_to);
    $cell_from = $hero_from->getHeroArmyByCELL($place_from, $id_player);
    $cell_to   = $hero_to->getHeroArmyByCELL($place_to, $id_player);
    
    
    if(!is_numeric($army_amount) || $army_amount <= 0 ){
        file_put_contents("army-amount-h-to-h.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
        
    }
    
    if(!$cell_from || ! $cell_to){
        file_put_contents("place-error-from-h-to-h.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit(json_encode(["state"=>"error_0"]));
    }
    
    if($cell_from[0] != $cell_to[0] && $cell_to[0] != 0){
        exit(json_encode(["state"=>"error_0"]));
    }
    
    if(is_null($type_for_hero) || is_null($type_for_city)){
        exit(json_encode(["state"=>"error_0"]));
    }
    
    $type_from = $type_for_hero;
    $from_num  = $cell_from[1] - $army_amount;
    
    if($cell_from[1] == $army_amount){
        
        $type_from = 0;
        $from_num  = 0;
        
    } else if($cell_from[1] < $army_amount){
        
        exit(
                json_encode(['state'=>"error_1" ,
                    "army_hero_from"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero_from'")[0],
                    "army_hero_to"   => selectFromTable("*", "hero_army", "id_hero = '$id_hero_to'")[0]
                    ])
                );
        
    }
    
    
    
    $avail_cap_to = Hero::heroAvailableCap($id_player, $id_hero_to);
    
    if(Hero::$SOLIDIAR_CAP[$cell_from[0]]*$army_amount > $avail_cap_to){
        
        echo json_encode(['state'=>"error_1" ,
            "army_hero_from"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero_from'")[0],
            "army_hero_to"   => selectFromTable("*", "hero_army", "id_hero = '$id_hero_to'")[0]
            ]); 
    }else{
        
        if(updateTable("`".$place_from."_type` = '$type_from' , `".$place_from."_num` = '$from_num'", "hero_army", "id_hero = '$id_hero_from' AND id_player = '$id_player'") < 1){
            
            file_put_contents("army-from-h-to-h.txt", print_r($_GET, TRUE), FILE_APPEND);
            
        }
        if(updateTable("`".$place_to."_type` = '{$cell_from[0]}' , `".$place_to."_num` = `".$place_to."_num` + '$army_amount'", "hero_army", "id_hero = '$id_hero_to' AND id_player = '$id_player'") < 1){
            
            file_put_contents("army-to-h-to-h.txt", print_r($_GET, TRUE), FILE_APPEND);
            
        }
        
        
        
        
        echo json_encode(['state'=>"ok" ,
        "army_hero_from"=> selectFromTable("*", "hero_army", "id_hero = '$id_hero_from'")[0],
        "army_hero_to"   => selectFromTable("*", "hero_army", "id_hero = '$id_hero_to'")[0]
        ]); 
        
    }
    
   
}


elseif(isset ($_GET["CLEAR_HERO"])){
  
    $id_hero   = validateId($_GET["id_hero"]);
    $id_city   = validateId($_GET["id_city"]);
    $id_player = validateId(cryptUserId($_GET['token'], "d"));
    
    if(!is_numeric($id_hero) || !is_numeric($id_city) || !is_numeric($id_player)){
        
        
        file_put_contents("clear-hero-city-errors.txt", print_r($_GET, TRUE), FILE_APPEND);
        exit();
    }
    
    $hero = selectFromTable("*", 'hero_army', "id_hero = '$id_hero'");
    $city = new City($id_city);
    
    $city_type = array("0" ,
        "army_a" ,
        "army_b" ,
        "army_c" , 
        "army_d" ,
        "army_e",
        "army_f");
    
    
    $quary  = "";
    $quary .= $hero[0]["f_1_type"] != 0 ? "  {$city_type[$hero[0]["f_1_type"]]} = {$city_type[$hero[0]["f_1_type"]]} + {$hero[0]["f_1_num"]}" : "";
    $quary .= $hero[0]["f_2_type"] != 0 ? ", {$city_type[$hero[0]["f_2_type"]]} = {$city_type[$hero[0]["f_2_type"]]} + {$hero[0]["f_2_num"]}" : "";
    $quary .= $hero[0]["f_3_type"] != 0 ? ", {$city_type[$hero[0]["f_3_type"]]} = {$city_type[$hero[0]["f_3_type"]]} + {$hero[0]["f_3_num"]}" : "";
    $quary .= $hero[0]["b_1_type"] != 0 ? ", {$city_type[$hero[0]["b_1_type"]]} = {$city_type[$hero[0]["b_1_type"]]} + {$hero[0]["b_1_num"]}" : "";
    $quary .= $hero[0]["b_2_type"] != 0 ? ", {$city_type[$hero[0]["b_2_type"]]} = {$city_type[$hero[0]["b_2_type"]]} + {$hero[0]["b_2_num"]}" : "";
    $quary .= $hero[0]["b_3_type"] != 0 ? ", {$city_type[$hero[0]["b_3_type"]]} = {$city_type[$hero[0]["b_3_type"]]} + {$hero[0]["b_3_num"]}" : "";
   
    if($quary == ""):
        exit();
    endif;
    $quary_remove = "f_1_type = 0, f_2_type = 0, f_3_type = 0,"
            . " b_1_type = 0, b_2_type = 0, b_3_type = 0,"
            . " f_1_num = 0, f_2_num = 0,  f_3_num = 0,"
            . " b_1_num = 0, b_2_num = 0,  b_3_num = 0"; 
        
    if(updateTable($quary_remove, "hero_army", "id_hero = '$id_hero' AND id_player = '$id_player'") > 0){
        
        $rowCount = updateTable(trim($quary, ",") , "city", "id_city = '$id_city' AND id_player = '$id_player'");
        
         if($rowCount > 0){
        
            echo json_encode(["state"=>"ok" , "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]);
        
        }else{
            echo json_encode(["state"=>"error" , "army_city"=> selectFromTable("army_a,army_b,army_c,army_d,army_e,army_f", "city", "id_city = '$id_city'")[0]]);
            file_put_contents("clear-hero-city-errors.txt", print_r($hero, TRUE), FILE_APPEND);
            file_put_contents("clear-hero-city-errors.txt", print_r($quary, TRUE), FILE_APPEND);
        }
    
    }else{
        
        file_put_contents("clear-hero-errors.txt", print_r($hero, TRUE), FILE_APPEND);
        
    }
    
    
    
   
    
    
}



elseif(isset ($_POST["SWAP_ARMY"])){
    
    $first_hero_id = validateId($_POST["right_hero_id"]);
    $second_hero_id = validateId($_POST["left_hero_id"]);
    $id_city = validateId($_POST["id_city"]);
    
    $id_player = cryptUserId(($_POST['token']), "d");
    
    if(!is_numeric($first_hero_id) || !is_numeric($second_hero_id) || !is_numeric($id_city)|| !is_numeric($id_player)){
        
        
        file_put_contents("swap-hero-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
        exit();
    }
    
    $first_hero = new Hero($first_hero_id);
    $second_hero = new Hero($second_hero_id);
    
    $first_army  = $first_hero->getHeroArmy($id_player);
    $second_army = $second_hero->getHeroArmy($id_player);
  
    
    
    $first_hero_cap = Hero::heroCap($first_hero_id);
    $first_hero_max_cap = Hero::heroMaxCap($id_player , $first_hero_id);
    
    
    $second_hero_cap = Hero::heroCap($second_hero_id);
    $second_hero_max_cap = Hero::heroMaxCap($id_player , $second_hero_id);
    
    
    if($first_hero_max_cap < $second_hero_cap || $second_hero_max_cap < $first_hero_cap){
        exit(json_encode(["state"=>"error"]));
    }
    
    


    $quary_1 = "f_1_type = {$first_army["f_1_type"]} , f_1_num = {$first_army["f_1_num"]}, "
        . " f_2_type = {$first_army["f_2_type"]} , f_2_num = {$first_army["f_2_num"]}, "
        . " f_3_type = {$first_army["f_3_type"]} , f_3_num = {$first_army["f_3_num"]}, "
        . " b_1_type = {$first_army["b_1_type"]} , b_1_num = {$first_army["b_1_num"]}, "
        . " b_2_type = {$first_army["b_2_type"]} , b_2_num = {$first_army["b_2_num"]}, "
        . " b_3_type = {$first_army["b_3_type"]} , b_3_num = {$first_army["b_3_num"]}";
        
    $quary_2 = "f_1_type = {$second_army["f_1_type"]} , f_1_num = {$second_army["f_1_num"]}, "
      . "f_2_type = {$second_army["f_2_type"]} , f_2_num = {$second_army["f_2_num"]}, "
      ."f_3_type = {$second_army["f_3_type"]} , f_3_num = {$second_army["f_3_num"]}, "
      ."b_1_type = {$second_army["b_1_type"]} , b_1_num = {$second_army["b_1_num"]}, "
      ."b_2_type = {$second_army["b_2_type"]} , b_2_num = {$second_army["b_2_num"]}, "
      ."b_3_type = {$second_army["b_3_type"]} , b_3_num = {$second_army["b_3_num"]}";
      
    if(count($second_army) != count($first_army)){
        exit();
    }
    
    if(updateTable($quary_1, "hero_army", "id_hero = '$second_hero_id' AND id_player = '$id_player'") <= 0){
        
        
        file_put_contents("swap-hero-secound-errors.txt", print_r($quary_1, TRUE), FILE_APPEND);
        file_put_contents("swap-hero-secound-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
        file_put_contents("swap-hero-secound-errors.txt", print_r("=======================\n", TRUE), FILE_APPEND);
        
            
    }
    
    
  
    if(updateTable($quary_2, "hero_army", "id_hero = $first_hero_id AND id_player = $id_player") <= 0){
        
        file_put_contents("swap-hero-first-errors.txt", print_r($quary_2, TRUE), FILE_APPEND);
        file_put_contents("swap-hero-first-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
        file_put_contents("swap-hero-first-errors.txt", print_r("===---------------------\n", TRUE), FILE_APPEND);
        
    }
    
    
    
    
        
   
}





elseif(isset ($_POST["GET_HERO_POWER_INCREASE"])){
    
    $id_hero = validateId($_POST["id_hero"]);
    $hero    = selectFromTable("lvl , power_ls , power , id_hero", "hero", "id_hero = :idh", ["idh" => $id_hero]);
    if(count($hero) > 0){
        echo json_encode(Hero::calPowerTOAdd($hero[0]));
    }else{
        echo json_encode([]);
    }
    
    
}


elseif(isset ($_POST["REORDER_HERO"])){
    
    $id_hero   = validateId($_POST["id_hero"]);
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId($_POST["id_player"]);
    $move      = validateOurStr($_POST["direction"]);
    $ord       = selectFromTable("ord", "hero", "id_hero = '$id_hero'")[0]["ord"];
    
    if(!is_numeric($id_city)){
        exit("error_1");
    }else if(!is_numeric($id_hero)){
        exit("error_2");
    }else{
        
        if($move == "up"){

            $first = selectFromTable("ord , id_hero", "hero", "ord < '$ord' AND id_city = '$id_city' ORDER BY ord DESC LIMIT 1 ");


        }else{
            $first = selectFromTable("ord , id_hero", "hero", "ord > '$ord' AND id_city = '$id_city' ORDER BY ord ASC LIMIT 1 ");

        }
        
        if(count($first) > 0){
            
            $rowCount = 0;
            $rowCount += updateTable("ord = '$ord'", "hero", "id_hero = '{$first[0]["id_hero"]}'");
            $rowCount += updateTable("ord = '{$first[0]["ord"]}'", "hero", "id_hero = '$id_hero'");
            $city = new City($id_city);
            echo json_encode($city->getCityHeros($id_player));
                
          
            
        }else {
            
            $city = new City($id_city);
            echo json_encode($city->getCityHeros($id_player));
            
        }
        
        
    }
    
    
    
    
    
    
}


elseif(isset ($_POST["FIRE_HERO_OFF"])){
    
    $id_hero   = validateId($_POST["id_hero"]);
    $id_city   = validateId($_POST["id_city"]);
    $id_player = validateId(cryptUserId(($_POST['token']), "d"));
    
    deleteTable("hero_army", "id_hero  = '$id_hero' AND id_player = '$id_player'");
    deleteTable("hero_medal", "id_hero = '$id_hero'");
    deleteTable("hero_equip", "id_hero = '$id_hero' AND id_player = '$id_player'");
    deleteTable("world_unit_garrison", "id_hero = '$id_hero' AND id_player = '$id_player'");
    deleteTable("hero", "id_hero = '$id_hero' AND id_player = '$id_player'");
    
    $save_state = new SaveState($id_player);
    $save_state->saveCityState($id_city);
    $save_state->coin_outState($id_city);
    $save_state->food_OutState($id_city);
    
    echo json_encode([
        "city"=> selectFromTable("food,wood,stone,metal,coin, coin_out, food_out, food_in", "city", "id_city = '$id_city'")[0]
    ]);
    
    
   
}



elseif(isset ($_GET["HERO_REVIEW_DETAIL"])){
    
    $id_hero = validateId($_GET["id_hero"]);
    
   
    $hero = selectFromTable("*", "hero", "id_hero = '$id_hero'")[0];

    $hero["army"] = [
        "f_1_type"=>0, "f_2_type"=>0, "f_3_type"=>0,
        "b_1_type"=>0, "b_2_type"=>0, "b_3_type"=>0,
        "f_1_num"=>0, "f_2_num"=>0, "f_3_num"=>0,
        "b_1_num"=>0, "b_2_num"=>0, "b_3_num"=>0,
    ];
    
    $hero_equip = selectFromTable("*", "hero_equip", "id_hero = '$id_hero'")[0];

    $hero["equip"]["boot"]   = Equipment::retriveEquipByItsId($hero_equip["id_boot"]);
    $hero["equip"]["armor"]  = Equipment::retriveEquipByItsId($hero_equip["id_armor"]);
    $hero["equip"]["shield"] = Equipment::retriveEquipByItsId($hero_equip["id_shield"]);
    $hero["equip"]["helmet"] = Equipment::retriveEquipByItsId($hero_equip["id_helmet"]);
    $hero["equip"]["sword"]  = Equipment::retriveEquipByItsId($hero_equip["id_sword"]);
    $fetch["equip"]["belt"]        = Equipment::retriveEquipByItsId($hero_equip["id_belt"]);
    $fetch["equip"]["necklace"]    = Equipment::retriveEquipByItsId($hero_equip["id_necklace"]);
    $fetch["equip"]["pendant"]     = Equipment::retriveEquipByItsId($hero_equip["id_pendant"]);
    $fetch["equip"]["ring"]        = Equipment::retriveEquipByItsId($hero_equip["id_ring"]);
    $fetch["equip"]["steed"]       = Equipment::retriveEquipByItsId($hero_equip["id_steed"]);

    $hero["medal"]= [
        "ceaser_eagle" =>"0",
        "medal_ceasro" => "0",
        "medal_den" => "0",
        "medal_leo" => "0",
    ]; 

    echo json_encode($hero);
}

