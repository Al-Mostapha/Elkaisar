<?php

ini_set("memory_limit", "-1");
set_time_limit(0);

require_once '../../../base.php';
require_once '../../../config.php';

DbConnect(1);

$Cities = selectFromTable("*", "city", "1");
echo "Cities Count: " . count($Cities) . "\n";
foreach($Cities as $oneCity){
  $World = selectFromTable("x, y", "world", "ut = 0 ORDER BY RAND() LIMIT 1");
  updateTable("x = {$World[0]["x"]}, y = {$World[0]["y"]}", "city", "id_city = {$oneCity["id_city"]}");
  updateTable("ut = 60 + {$oneCity["lvl"]}, l = {$oneCity["lvl"]}", "world", "x = {$World[0]["x"]} AND y = {$World[0]["y"]}");
  echo "City {$oneCity["id_city"]} Moved To {$World[0]["x"]}, {$World[0]["y"]}\n";

}


// DELETE FROM arena_player_challange WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM arena_player_challange_hero WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM arena_player_challange_buy WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM build_army WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_wounded_fired WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_wounded WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_worker WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_theater WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_study_acad WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_storage WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_jop_hiring WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_jop WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_colonize WHERE city_colonize.id_colonizer NOT IN(SELECT id_player FROM player);
// DELETE FROM city_colonize WHERE city_colonize.id_colonized NOT IN(SELECT id_player FROM player);
// DELETE FROM city_building_lvl WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_building WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM city_bar WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM edu_uni WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM edu_acad WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM equip WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM exchange_player WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM god_gate WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM god_gate_1 WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM god_gate_2 WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM god_gate_3 WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM god_gate_4 WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM hero WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM hero_theater WHERE hero_theater.id_city NOT IN(SELECT id_city FROM city);
// DELETE FROM hero_medal WHERE id_hero NOT IN(SELECT id_hero FROM hero);
// DELETE FROM hero_equip WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM hero_back WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM hero_army WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_transfer WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_title WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_stat WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_logs WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_item WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_edu WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM player_auth WHERE id_player NOT IN(SELECT id_player FROM player);
// DELETE FROM quest_player WHERE id_player NOT IN(SELECT id_player FROM player);


// UPDATE player                      SET id_player = id_player + 50000;
// UPDATE arena_player_challange      SET id_player = id_player + 50000;
// UPDATE arena_player_challange_hero SET id_player = id_player + 50000;
// UPDATE arena_player_challange_buy  SET id_player = id_player + 50000;
// UPDATE build_army                  SET id_player = id_player + 50000;
// UPDATE city                        SET id_player = id_player + 50000;
// UPDATE city_wounded_fired          SET id_player = id_player + 50000;
// UPDATE city_wounded                SET id_player = id_player + 50000;
// UPDATE city_worker                 SET id_player = id_player + 50000;
// UPDATE city_theater                SET id_player = id_player + 50000;
// UPDATE city_study_acad             SET id_player = id_player + 50000;
// UPDATE city_storage                SET id_player = id_player + 50000;
// UPDATE city_jop_hiring             SET id_player = id_player + 50000;
// UPDATE city_jop                    SET id_player = id_player + 50000;
// UPDATE city_building_lvl           SET id_player = id_player + 50000;
// UPDATE city_building               SET id_player = id_player + 50000;
// UPDATE city_bar                    SET id_player = id_player + 50000;
// UPDATE edu_uni                     SET id_player = id_player + 50000;
// UPDATE edu_acad                    SET id_player = id_player + 50000;
// UPDATE equip                       SET id_player = id_player + 50000;
// UPDATE exchange_player             SET id_player = id_player + 50000;
// UPDATE god_gate                    SET id_player = id_player + 50000;
// UPDATE god_gate_1                  SET id_player = id_player + 50000;
// UPDATE god_gate_2                  SET id_player = id_player + 50000;
// UPDATE god_gate_3                  SET id_player = id_player + 50000;
// UPDATE god_gate_4                  SET id_player = id_player + 50000;
// UPDATE hero                        SET id_player = id_player + 50000;
// UPDATE hero_equip                  SET id_player = id_player + 50000;
// UPDATE hero_back                   SET id_player = id_player + 50000;
// UPDATE hero_army                   SET id_player = id_player + 50000;
// UPDATE player_transfer             SET id_player = id_player + 50000;
// UPDATE player_title                SET id_player = id_player + 50000;
// UPDATE player_stat                 SET id_player = id_player + 50000;
// UPDATE player_logs                 SET id_player = id_player + 50000;
// UPDATE player_item                 SET id_player = id_player + 50000;
// UPDATE player_edu                  SET id_player = id_player + 50000;
// UPDATE player_auth                 SET id_player = id_player + 50000;
// UPDATE quest_player                SET id_player = id_player + 50000;


// UPDATE city                        SET id_city = id_city + 500000;
// UPDATE city_wounded_fired          SET id_city = id_city + 500000;
// UPDATE city_wounded                SET id_city = id_city + 500000;
// UPDATE city_worker                 SET id_city = id_city + 500000;
// UPDATE city_theater                SET id_city = id_city + 500000;
// UPDATE city_study_acad             SET id_city = id_city + 500000;
// UPDATE city_study_uni              SET id_city = id_city + 500000;
// UPDATE city_storage                SET id_city = id_city + 500000;
// UPDATE city_jop_hiring             SET id_city = id_city + 500000;
// UPDATE city_jop                    SET id_city = id_city + 500000;
// UPDATE city_building_lvl           SET id_city = id_city + 500000;
// UPDATE city_building               SET id_city = id_city + 500000;
// UPDATE city_bar                    SET id_city = id_city + 500000;
// UPDATE hero                        SET id_city = id_city + 500000;
// UPDATE build_army                  SET id_city = id_city + 500000;

// UPDATE hero                        SET id_hero = id_hero + 50000000;
// UPDATE hero_equip                  SET id_hero = id_hero + 50000000;
// UPDATE hero_back                   SET id_hero = id_hero + 50000000;
// UPDATE hero_army                   SET id_hero = id_hero + 50000000;
// UPDATE hero_medal                  SET id_hero = id_hero + 50000000;
// UPDATE equip                       SET id_hero =  NULL;