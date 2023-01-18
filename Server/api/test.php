<?php
set_time_limit(0);
require_once '../config.php';
require_once '../base.php';

$AVAIL_NAME = ["ماكسيموس","اشرف", "مصطفى", "اليكس", "اليسا", "بطليموس",
            "كليوباترا","هكس","ماجد", "يويليوس","مارس","ماكس","صلاح الدين","سيورس",
             "سيزار", "اغسطس","جلادياتور","سما", "زين","شادو","الملك", "القاهر",
            "الاسد", "اليس","حورس","يورك"
        ];
$c = count($AVAIL_NAME);
/*for($iii  = 1; $iii <=  50; $iii++){
    $m = selectFromTable("x, y, t", "world", "t = 30");
    foreach ($m as $one){
        
        $heros = Battel::fillHeroForM_M($one["t"], $iii);
        foreach ($heros as $oneHero){
            $name = $AVAIL_NAME[random_int(0, $c - 1)];
            insertIntoTable(
                    "x  = {$one["x"]}, y  = {$one["y"]}, lvl  = $iii, ord = {$oneHero["ord"]}, name = '$name', "
                    . "f_1_type = {$oneHero["type"]["f_1_type"]}, f_2_type={$oneHero["type"]["f_2_type"]}, f_3_type={$oneHero["type"]["f_3_type"]}, "
                    . "b_1_type = {$oneHero["type"]["b_1_type"]}, b_2_type={$oneHero["type"]["b_2_type"]}, b_3_type={$oneHero["type"]["b_3_type"]}, "
                    . "f_1_num  = {$oneHero["pre"]["f_1_pre"]}, f_2_num  = {$oneHero["pre"]["f_2_pre"]}, f_3_num  = {$oneHero["pre"]["f_3_pre"]}, "
                    . "b_1_num = {$oneHero["pre"]["b_1_pre"]}, b_2_num = {$oneHero["pre"]["b_2_pre"]}, b_3_num = {$oneHero["pre"]["b_3_pre"]}", "world_unit_hero");
            
            
        }
        
    }
    
}*/
/*for($iii  = 1; $iii <=  50; $iii++){
    $m = selectFromTable("x, y, t", "world", "t = 31");
    foreach ($m as $one){
        
        $heros = Battel::fillHeroForM_M($one["t"], $iii);
        foreach ($heros as $oneHero){
            $name = $AVAIL_NAME[random_int(0, $c - 1)];
            insertIntoTable(
                    "x  = {$one["x"]}, y  = {$one["y"]}, lvl  = $iii, ord = {$oneHero["ord"]}, name = '$name', "
                    . "f_1_type = {$oneHero["type"]["f_1_type"]}, f_2_type={$oneHero["type"]["f_2_type"]}, f_3_type={$oneHero["type"]["f_3_type"]}, "
                    . "b_1_type = {$oneHero["type"]["b_1_type"]}, b_2_type={$oneHero["type"]["b_2_type"]}, b_3_type={$oneHero["type"]["b_3_type"]}, "
                    . "f_1_num  = {$oneHero["pre"]["f_1_pre"]}, f_2_num  = {$oneHero["pre"]["f_2_pre"]}, f_3_num  = {$oneHero["pre"]["f_3_pre"]}, "
                    . "b_1_num = {$oneHero["pre"]["b_1_pre"]}, b_2_num = {$oneHero["pre"]["b_2_pre"]}, b_3_num = {$oneHero["pre"]["b_3_pre"]}", "world_unit_hero");
            
            
        }
        
    }
    
}*/
/*
$count = 0;
for($iii  = 1; $iii <=  10; $iii++){
    $m = selectFromTable("x, y, t", "world", "t = 48");
    foreach ($m as $one){
        
        $heros = Battel::fillHeroForAsianSqads($one["t"]);
        foreach ($heros as $oneHero){
            $name = $AVAIL_NAME[random_int(0, $c - 1)];
            insertIntoTable(
                    "x  = {$one["x"]}, y  = {$one["y"]}, lvl  = $iii, ord = {$oneHero["ord"]}, name = '$name', "
                    . "f_1_type = {$oneHero["type"]["f_1_type"]}, f_2_type={$oneHero["type"]["f_2_type"]}, f_3_type={$oneHero["type"]["f_3_type"]}, "
                    . "b_1_type = {$oneHero["type"]["b_1_type"]}, b_2_type={$oneHero["type"]["b_2_type"]}, b_3_type={$oneHero["type"]["b_3_type"]}, "
                    . "f_1_num  = {$oneHero["pre"]["f_1_pre"]}, f_2_num  = {$oneHero["pre"]["f_2_pre"]}, f_3_num  = {$oneHero["pre"]["f_3_pre"]}, "
                    . "b_1_num = {$oneHero["pre"]["b_1_pre"]}, b_2_num = {$oneHero["pre"]["b_2_pre"]}, b_3_num = {$oneHero["pre"]["b_3_pre"]}", "world_unit_hero");
            $count++;
            
        }
        
    }
    
}

echo $count;*/
/*
$MAX_UNIT_LVL=[
        30=>50,31=>50,
        32=>40,33=>40,34=>40,35=>40,
        36=>30,37=>30,38=>30,39=>30,
        40=>20,41=>20,42=>20,43=>20,
        44=>20,45=>20,46=>20,47=>20,
        48=>10,
        49=>2,50=>2,51=>2,
        52=>10,53=>10,54=>10,55=>10,56=>10
        
    ];

$worldUnits = selectFromTable("*", "world", "t NOT IN(0, 17, 18, 19, 20)");
$count = 0;

foreach ($worldUnits as $unit){
    if(isset($MAX_UNIT_LVL[$unit["t"]])){
        
       for($iii = 1; $iii <=  $MAX_UNIT_LVL[$unit["t"]] ; $iii++){
           $unit["l"] = $iii;
           $heros = Battel::getFirstHeros($unit["x"], $unit["y"], $unit);
           foreach ($heros as $oneHero){
                $name = $AVAIL_NAME[random_int(0, $c - 1)];
                insertIntoTable(
                        "x  = {$unit["x"]}, y  = {$unit["y"]}, lvl  = {$unit["l"]}, ord = {$oneHero["ord"]}, name = '$name', "
                        . "f_1_type = {$oneHero["type"]["f_1_type"]}, f_2_type={$oneHero["type"]["f_2_type"]}, f_3_type={$oneHero["type"]["f_3_type"]}, "
                        . "b_1_type = {$oneHero["type"]["b_1_type"]}, b_2_type={$oneHero["type"]["b_2_type"]}, b_3_type={$oneHero["type"]["b_3_type"]}, "
                        . "f_1_num  = {$oneHero["pre"]["f_1_pre"]}, f_2_num  = {$oneHero["pre"]["f_2_pre"]}, f_3_num  = {$oneHero["pre"]["f_3_pre"]}, "
                        . "b_1_num = {$oneHero["pre"]["b_1_pre"]}, b_2_num = {$oneHero["pre"]["b_2_pre"]}, b_3_num = {$oneHero["pre"]["b_3_pre"]}", "world_unit_hero");
                $count++;

            }

        }
        
    }else{
        
        $heros = Battel::getFirstHeros($unit["x"], $unit["y"], $unit);
           foreach ($heros as $oneHero){
                $name = $AVAIL_NAME[random_int(0, $c - 1)];
                insertIntoTable(
                        "x  = {$unit["x"]}, y  = {$unit["y"]}, lvl  = {$unit["l"]}, ord = {$oneHero["ord"]}, name = '$name', "
                        . "f_1_type = {$oneHero["type"]["f_1_type"]}, f_2_type={$oneHero["type"]["f_2_type"]}, f_3_type={$oneHero["type"]["f_3_type"]}, "
                        . "b_1_type = {$oneHero["type"]["b_1_type"]}, b_2_type={$oneHero["type"]["b_2_type"]}, b_3_type={$oneHero["type"]["b_3_type"]}, "
                        . "f_1_num  = {$oneHero["pre"]["f_1_pre"]}, f_2_num  = {$oneHero["pre"]["f_2_pre"]}, f_3_num  = {$oneHero["pre"]["f_3_pre"]}, "
                        . "b_1_num = {$oneHero["pre"]["b_1_pre"]}, b_2_num = {$oneHero["pre"]["b_2_pre"]}, b_3_num = {$oneHero["pre"]["b_3_pre"]}", "world_unit_hero");
                $count++;

            }
        
    }
    
   
    
}

echo $count;
*/
/*
$co = 0;


for($iii = 1 ; $iii <= 10; $iii++){
    for($ii = -3; $ii < 0; $ii ++){
        insertIntoTable(
            "x  = 340, y  = 420, lvl  = $iii, ord = $ii, name = 'محارب الذئب', "
            . "f_1_type = 1, f_2_type= 1, f_3_type = 1, "
            . "b_1_type = 4, b_2_type = 4, b_3_type = 4, "
            . "f_1_num  = 10000, f_2_num  = 250000, f_3_num  = 10000, "
            . "b_1_num  = 10000, b_2_num = 80000, b_3_num = 10000", "world_unit_hero");
        $co++;
    }
}

echo $co;

*/

/*
for($iii = 1 ; $iii <= 10; $iii++){
   
        insertIntoTable( "x  = 340, y  = 420, lvl  = $iii, equip = 'fearless', part = 'helmet', equip_lvl = '1'", "world_unit_equip");
        insertIntoTable( "x  = 340, y  = 420, lvl  = $iii, equip = 'fearless', part = 'sword', equip_lvl = '1'", "world_unit_equip");
        insertIntoTable( "x  = 340, y  = 420, lvl  = $iii, equip = 'fearless', part = 'shield', equip_lvl = '1'", "world_unit_equip");
        insertIntoTable( "x  = 340, y  = 420, lvl  = $iii, equip = 'mili', part = 'armor', equip_lvl = '1'", "world_unit_equip");
        insertIntoTable( "x  = 340, y  = 420, lvl  = $iii, equip = 'mili', part = 'boot', equip_lvl = '1'", "world_unit_equip");
        
   
}
*/

$t = "

         	
         	
    color: rgb(54 , 13 , 0);      	
         	
         	
    color: #a7e328;      	
    color: #bd962d;      	
         	
    color: #666;      	
    color: #666;      	
    color: #deba5e;      	
    color: #666;      	
         	
    color: #79582E;      	
          	
    color: blanchedalmond;      	
          	
          	
    color: #f79c21;      	
    color: blanchedalmond ;  
         	
    color: #08ff07;      	
    color:  #C70039;      
    color: #08ff07;
         	
    color:  white;      	
    color: #81511c      	
    color: #08ff07;      	
         	
         	
    color: #81511c;      	
    color: #2a2aa5  
    color: red;      	
    color: #81511c;      	
    color: #ea700d;      	
    color: #5f8c00;      	
    color: #fc1c12;      	
         	
    color: #5e341b;      	
         	
         	
         	
    color: #81511c      	
         	
    color: gray;      	
         	
    color: #722;      	
    color: #db0000 ;      	
    color: #ffeba3 ;      	
    color: #372b00;      	
    color: #5f8c00;      	
    color: #a7e328;      	
    color: #d60000 ;      	
    color: #008c10;      	
    color: #b43d02      	
    color: #0065ac;      	
         	
    color: #a7e328 ;      	
    color: #00ffff ;      	
    color: #aa00aa ;      	
    color: rgb(54 , 13 , 0);      	
         	
    color: #e30c0c;      	
    color: red;      	
    color: #5f8c00;      	
    color: red;      	
    color: #5f8c00;      	
    color: #0082cd  ;      	
    color: #08ff07;      	
    color: rgb(133, 68, 7);      	
    color: red;      	
    color: #0065ac;      	
         	
    color:#c59844;      
         	
    color: #d0b617;      	
         	
    color: rgb(54 , 13 , 0);      	
         	
    color: #81511c;      	
         	
    color: #660000;      	
         	
    color: red;      	
    color: black;      	
    color: #fcf7e5;      	
    color: aqua;      	
    color: greenyellow;      	
    color: chartreuse;      	
    color: #660000;      	
    color: #660000;       	
    color: #81511c      	
    color: #5f8c00;      	
         	
    color: #5e341b;      	
    color:  	#7F0000;      	
         	
    color: #9aa2ab;      	
    color: black;      	
    color: #9aa2ab;      	

    color: #08ff07;      	
    color:  #C70039;   
    
    color: rgba(255,255,255,1);      	
    color: #08ff07;    	
         	  	
    color:  white;      	
    color: #81511c      	
    color: #08ff07;      	
         	
         	
    color: #81511c;      	
    color: #2a2aa5      	
         	
    color: #e2952b;      	
    color: #e2952b;      	
      	
    color: #4c7f47;      	
         	
    color: #ac340f;      	
    color: #e2952b;      	
    color: #ac340f;      	
    color:#5e341b;      	
    color: #5f8c00;      	
    color: #5f8c00;      	
    color:  #5e341b;      	
	
    color: #770101;      	
    color: #419322;      	
         		
         	
    color: #707070;          	
    color: #81511c;      	
    color: greenyellow;      	
         	
         	
    color: #ff0d0c;      	
    color: greenyellow;      	
         	
    color: rgb(54 , 13 , 0);      	
     	
    color: #ef4416;      	
    color: #1751b5;      	
	
    color: #f79c21;      	
    color: blanchedalmond;      	
    color:#d64623;      	
         	
         	
         	
    color: rgb(54 , 13 , 0);      	

    color: #81511c;      	
    color: #81511c;      	
         	
    color: #5e341b;      	
    color: #5f8c00;      	
    color: #9b4b1a;      	
         	
         	
         	
         	
         	
         	
    color: #81511c;      	
	
    color: #81511c      	
    color: #5e341b;      	
    color: #5e341b;      	
         	
         	
         	
    color: #08ff07;      	
    color: red;      	
         	
         	
    color: #074b6c;      	
    color: #e30c0c;      	
    color: #074206;      	
         	
    color: #81511c;      	
    color: #370d00;      	
    color: #370d00;      	
    color: #81511c;      	
    color: #1943a5;      	
    color: #766025; ";