<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_POST["get_server_data"])){
    echo json_encode(selectFromTable("*", "server_data", "1")[0]);
}
