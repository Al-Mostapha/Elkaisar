<?php

if(session_status() == PHP_SESSION_NONE){
    session_start();
}
session_destroy();
if (!empty($_SESSION) && is_array($_SESSION)){
    
    
    
    
}else{
    
    sleep(10);
    
}
