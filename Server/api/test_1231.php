<?php
ini_set("memory_limit", "-1");
set_time_limit(0);
define("SERVER_ID", 3);
require_once '../config.php';
echo 'Am Here Baby'."\n";
$im = imagecreatefrompng("provinceColored.png");
/*

 * {
  "1":{r:0,g:0,b:255},// بريطانيا
  "2":{r:0,g:0,b:0},  //rich
  "3":{r:102,g:102,b:102},// Asia
  "4":{r:0,g:255,b:0},// France
  "5":{r:255,g:0,b:255},// Macdon
  "6":{r:0,g:255,b:255},// Spain
  "7":{r:255,g:0,b:0},// Italia
  "8":{r:102,g:0,b:153},// Parsia
  "9":{r:255,g:255,b:255},// Cartage
  "10":{r:255,g:255,b:0}// Egypt
  };
 *  */
$t = [
    "1" => ["r" => 0, "g" => 0, "b" => 255], // بريطانيا
    "2" => ["r" => 0, "g" => 0, "b" => 0], //"r"ich
    "3" => ["r" => 102, "g" => 102, "b" => 102], // Asia
    "4" => ["r" => 0, "g" => 255, "b" => 0], // F"r"ance
    "5" => ["r" => 255, "g" => 0, "b" => 255], // Macdon
    "6" => ["r" => 0, "g" => 255, "b" => 255], // Spain
    "7" => ["r" => 255, "g" => 0, "b" => 0], // Italia
    "8" => ["r" => 102, "g" => 0, "b" => 153], // Pa"r"sia
    "9" => ["r" => 255, "g" => 255, "b" => 255], // Ca"r"ta"g"e
    "10" => ["r" => 255, "g" => 255, "b" => 0]// E"g"ypt
];
$c = 0;
for ($xxx = 0; $xxx < 500; $xxx++) {

    for ($yyy = 0; $yyy < 500; $yyy++) {

        $rgb = imagecolorat($im, floor($xxx/5), floor($yyy/5));
        $colors = imagecolorsforindex($im, $rgb);
        foreach ($t as $key => $val){
            
            if($val["r"] == $colors["red"] && $val["g"] == $colors["green"] && $val["b"] == $colors["blue"] ){
                
               $c +=  updateTable("p = $key", "world", "x = $xxx AND y = $yyy");
                
            }
            
        }
    }
    echo "one Loop Done $xxx"."\n";
}

echo $c;



