<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["GET_ARMY_CAPITAL_DOMINANT"])){
    
    $unit = selectFromTable("*", "world", "x = 235 AND y = 125")[0];
    $army_capital = [];
    
    if($unit["lo"] == lOCKED_UNIT){
        
       
        $names = "player.name  , player.guild";
        $joiner = "JOIN player
                 ON player.id_player = world_unit_rank.id_dominant";

       $quary =   "world_unit_rank.id_dominant ,
                 SUM(world_unit_rank.duration) AS d_sum,
                 SUM(world_unit_rank.win_num) AS w_num,
                 $names";
       $table ="world_unit_rank  $joiner ";
       
        $army_capital["type"] = "rank";   
           
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 235  AND world_unit_rank.y = 125  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>235, "y"=>125, "title"=>"عاصمة المشاة"  ];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 140  AND world_unit_rank.y = 170  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>140, "y"=>170, "title"=>"عاصمة الفرسان" ];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 400  AND world_unit_rank.y = 230  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>400, "y"=>230, "title"=>"عاصمة المدرعين"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 255  AND world_unit_rank.y = 266  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>255, "y"=>266, "title"=>"عاصمة الرماه"  ];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 80   AND world_unit_rank.y = 280  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>80 , "y"=>280, "title"=>"عاصمة المقاليع"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, " world_unit_rank.x = 400  AND world_unit_rank.y = 340  GROUP BY world_unit_rank.id_dominant ORDER BY d_sum DESC LIMIT 1"),"x"=>400, "y"=>340, "title"=>"عاصمة المنجنيق"];
             
        
    }else{
        
        $army_capital["type"] = "domain";   
         
        $quary = "world_unit_rank.id_dominant , player.name, world_unit_rank.time_stamp";
        $table = "world_unit_rank JOIN player ON player.id_player = world_unit_rank.id_dominant";
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 235  AND world_unit_rank.y = 125 ORDER BY id_round DESC LIMIT 1"),"x"=>235, "y"=>125, "title"=>"عاصمة المشاة"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 140  AND world_unit_rank.y = 170 ORDER BY id_round DESC LIMIT 1"),"x"=>140, "y"=>170, "title"=>"عاصمة الفرسان"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 400  AND world_unit_rank.y = 230 ORDER BY id_round DESC LIMIT 1"),"x"=>400, "y"=>230, "title"=>"عاصمة المدرعين"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 255  AND world_unit_rank.y = 266 ORDER BY id_round DESC LIMIT 1"),"x"=>255, "y"=>266, "title"=>"عاصمة الرماه"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 80   AND world_unit_rank.y = 280 ORDER BY id_round DESC LIMIT 1"),"x"=>80 , "y"=>280, "title"=>"عاصمة المقاليع"];
        $army_capital["unit"][] = ["rank"=>selectFromTable($quary, $table, "world_unit_rank.x = 400  AND world_unit_rank.y = 340 ORDER BY id_round DESC LIMIT 1"),"x"=>400, "y"=>340, "title"=>"عاصمة المنجنيق"];
        
    }
    
    
    
    
   
    echo json_encode($army_capital);
}

