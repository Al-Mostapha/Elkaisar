<?php

require_once '../config.php';
require_once '../base.php';

if(isset($_GET["REFRESH_MATRIAL"])){
    
    $id_player   = validateId(cryptUserId($_GET['token'], "d"));
    $matrial     = validateOurStr($_GET["matrial"]);
    $matrial_box = new Matrial($id_player);
    
    if($matrial == "main"){
        echo json_encode($matrial_box->retriveMatrial_main()[0]);
    }elseif($matrial == 'box'){
       echo json_encode($matrial_box->retriveMatrial_box()[0]);
    }elseif($matrial == "acce"){
        echo json_encode($matrial_box->retriveMatrial_acce()[0]);
    }elseif($matrial =="product"){
        echo json_encode($matrial_box->retriveMatrial_product()[0]);
    }elseif($matrial =="flags"){
        echo json_encode($matrial_box->retriveMatrial_flags()[0]);
    }elseif($matrial == "luxury"){
        echo json_encode($matrial_box->retriveMatrial_luxury()[0]);
    }
    
}

