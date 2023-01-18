
<?php
set_time_limit(0);
define("SERVER_ID", 1);
require '../config.php';


$Items = json_decode(file_get_contents("http://localhost/elkaisar/js-0.0.12/json/ItemLang/ar.json"), true);

foreach ($Items as $idItem => $oneItem){
    insertIntoTable("id_item = :idi, gold = :g", ["idi" => $idItem, "g" => $oneItem["gold"]]);
}