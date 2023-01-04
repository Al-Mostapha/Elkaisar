<?php

require_once '../config_index.php';
//require_once '../google-api-php-client-2.2.2/vendor/autoload.php';
require_once '../lib/log.php';
require_once '../base.php';

if(isset($_POST["LOG_USER_IN"])){
    
    $usernameOrEmail = validateEnStr($_POST["user_name"]);
    $password        = validateEnStr($_POST["password"]);
    
    $user = selectFromTableIndex("id_user , user_name , last_server, enc_pass", "game_user", "( user_name = :ue OR email = :em )", ["ue" =>$usernameOrEmail, "em" => $usernameOrEmail]);
    
    if(!passCheck($password, $user[0]["enc_pass"])){
        
        exit(json_encode(FALSE));
        
    }else if(count($user) <= 0){
        
        exit(json_encode(FALSE));
        
    }else{
        
       $outh = Log::userLoged($user[0]["id_user"], $user[0]["user_name"], $user[0]["last_server"]);
        $user[0]["server_name"] = serverName($user[0]["last_server"]);
        $user[0]["uot"] = $outh;
        echo json_encode($user[0]);
    }
    
    
}



elseif(isset ($_POST["LOGIN_WITH_GOOGLE"])){
    
   $id_token = $_POST["idtoken"];
   
   $CLIENT_ID = "828247207891-u16eqsdre79mspjvplud3u2lsd85t2bl.apps.googleusercontent.com";
   
   
   /* REMMBER EXEPTION DUE TO TIME C:\xampp\htdocs\eastCeaser\google-api-php-client-2.2.2\vendor\firebase\php-jwt\Firebase\PHP-JWT\Authentication\JWT.php*/
    $client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
    $payload = $client->verifyIdToken($id_token);
    
  
    if ($payload) {
        $userid = $payload['sub'];
        $email  =  $payload["email"];
        $user_name = $payload["given_name"].rand(100, 999);
         
                
        $log = new Log();
        
       echo  $log->googleLogIn($userid, $email, $user_name);
    
      
    } else {
        // Invalid ID token
        echo 'asA';
    }
    
}


else if(isset ($_POST["SET_PLAYER_LAST_SERVER"])){
    
    $idPlayer = validateId($_POST["id_player"]);
    $idServer = validateId($_POST["id_server"]);
    
    
    updateTableIndex("last_server = :ids", "game_user", "id_user = :idp", ["ids" =>$idServer, "idp" => $idPlayer]);
    
}