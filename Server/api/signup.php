<?php

require_once '../config_index.php';
require_once '../base.php'; 


function signUp($email , $username , $enc_pass)
{
    global $dbhIndex;
        
        $sql = $dbhIndex->prepare("INSERT INTO game_user SET user_name = :un, email = :em , enc_pass = :enc");
        
        $sql->execute([
            "un" => $username, "em" => $email, "enc" => $enc_pass
        ]);
        return  $dbhIndex->lastInsertId();
    
}
 
function checkUserName($user_name)
{
    
    global $dbhIndex;
        
    $sql = $dbhIndex->prepare("SELECT user_name FROM game_user  WHERE  user_name  = :un");

    $sql->execute(["un" => $user_name]);
    return  $sql->fetch(PDO::FETCH_ASSOC);
    
    
}
function checkUserEmail($email)
{
    
     global $dbhIndex;
        
    $sql = $dbhIndex->prepare("SELECT email FROM game_user  WHERE  email  = :em");

    $sql->execute(["em" => $email]);
    return  $sql->fetch(PDO::FETCH_ASSOC);
    
    
}



if (isset($_POST["SIGN_USER_UP"])){
    
    $username = validateEnStr($_POST["username"]);
    $email    = validateEnStr($_POST["email"]);
    $password = mres($_POST["password"]);
    
    if(strlen($username) < 5 || strlen($username) > 15 ){
        
        echo 'username error';
        
    }else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        echo 'email error';
        
    }else if (strlen($password) > 20 || strlen($password) < 5) {
        
        echo 'password error';
        
    }else {
        
        $enc_pass = passEnc($password);
        
        
            if(checkUserName($username)){

                echo 'اسم المستخدم موجود مسبقا';

            }else if(checkUserEmail($email)){

                echo ' الاميل موجود مسبقا';

            }else{
                $id_user = signUp($email, $username, $enc_pass);
                if($id_user > 0){
                    echo 'done';
                }else{
                    echo 'حدث خطاء';
                }
            }
            
       
    
    }
   
    
}

