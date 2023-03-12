var last_offset = window.pageYOffset;
var Config = {};
HomeUrl = HomeUrl || "http://localhost:8080";
var Player = null;

$(document).on("click" ,"#join-now" , function (){
    $("#over_lay").fadeIn();
});




$(document).on("keyup" ,"#signupEmail" , function (){
    if(!validateEmail(this.value) && this.value.length > 7){
       
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});



$(document).on("keyup" ,"#signupUsername" , function (){
    
    if(!validateUsername(this.value) || this.value.length > 15 || this.value.length < 5){
        
        
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupEmail" , function (){
    
    if(!validateEmail(this.value) && this.value.length > 7){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});


    

$(document).on("blur" ,"#signupUsername" , function (){
    
    if(!validateUsername(this.value) || this.value.length > 15 || this.value.length < 5){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});






$(document).on("keyup" ,"#signupPassword" , function (){
    
    if(this.value.length > 15 || this.value.length < 5){
        
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupPassword" , function (){
    
    if(this.value.length > 15 || this.value.length < 5){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});



$(document).on("keyup" ,"#signupConfirmPassword" , function (){
    
    if(this.value !==  document.getElementById("signupPassword")){
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupConfirmPassword" , function (){
    
    if(this.value !==  document.getElementById("signupPassword")){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});






function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username) {
    var usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(String(username));
}



$(document).on("click" , "#join-submit" , function (){
    
     var userName    = document.getElementById("signupUsername").value;
    var Email       = document.getElementById("signupEmail").value;
    var password    = document.getElementById("signupPassword").value;
    var confirmpass = document.getElementById("signupConfirmPassword").value;
    
    if(!validateUsername(userName)){
        alertBox.confirmDialog("خطأ اسم المستخدم يجب انا يحتوى على حروف وارقام" )
        
        
    }else if(userName.length < 5 || userName.length > 15){
        alertBox.confirmDialog("اقصى عدد لحروف اسم المستخدم هو 15 حرف واقل عدد هو 5");
       
        
    }else if(password.length < 5 || password.length > 15 ){
        alertBox.confirmDialog("اقصى عدد لحروف كلمة المرور هو 15 حرف واقل عدد هو 5");
        
    }else if(confirmpass !== password){
        
        alertBox.confirmDialog("كلمة المرور غير متطابقة");
        
    }else if(!validateEmail(Email)){
        alertBox.confirmDialog("الاميل غير صحيح");
        
    }else {
        
        
        $.ajax({
            
            url: "api/signup.php",
            data: {
                SIGN_USER_UP: true,
                username: userName,
                password: password,
                email: Email
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(data === "done"){
                    
                    $("#over_lay").fadeOut();
                    $("#username input").val(userName);
                    $("#password input").val(password);
                    $("#login-btn button").click();
                    $("#join-now").hide();
                    document.getElementById("signupUsername").value = "";
                    document.getElementById("signupPassword").value = "";
                    document.getElementById("signupEmail").value = "";
                    document.getElementById("signupConfirmPassword").value = "";

                    alertBox.confirmDialog("تم التسجيل بنجاح");
                    
                }else{
                    
                    alertBox.confirmDialog(data);
                    
                }
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
       
        
    }
    
});





    
function logout(){

  const LoginToken = localStorage.getItem("LoginToken");
  localStorage.clear();
  ShowLoginBox();

    $.ajax({
        url: `${HomeUrl}/HomeApi/ALogin/Logout`,
        data: {
          LoginToken: LoginToken
         },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          ShowLoginBox();
          alertBox.confirmDialog("تم تسجيل خروجك");
            
        }
        ,error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
   

}
    




    
function login(){
    
    
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        $.ajax({
            
            url: `${HomeUrl}/HomeApi/ALogin/Login`,
            data: {
                userName: username,
                password: password
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if(!isJson(data)){
                    Elkaisar.LBase.Error(data);
                    return ;
                }
                var json_data = JSON.parse(data);
                if(json_data.state == "error_0")
                  return  alertBox.confirmDialog("خطاء اسم المستخدم ");
                if(json_data.state == "error_0")
                  return  alertBox.confirmDialog("خطاء كلمة المرور  ");
                if(json_data.state == "error_0")
                  return  alertBox.confirmDialog("هذا الحساب محظور");
                   
                if(json_data.state == 'ok')
                {
                    Player = json_data;
                    ShowServerList();
                    for(let OneToken in json_data.Tokens){
                      localStorage.setItem(json_data.Tokens[OneToken] , OneToken);
                    }
                    localStorage.setItem("LoginToken", json_data.LoginToken);
                    localStorage.setItem("LoginLastServerName", json_data.serverName);
                    localStorage.setItem("LoginLastServerLink", getServerToken(json_data.User.last_server));
                    localStorage.setItem("LoginExpireOn", Date.now() + 1000 * 60 * 60 * 24 * 10);
                    localStorage.setItem("LoginPlayerName", json_data.User.user_name);
                    ShowLoginBox();
                } else {
                    
                  alertBox.confirmDialog("خطاء اسم المستخدم او كلمة المرور");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
            
        });
            
};
    


$(document).on("click" , "#close-signup" , function (){
    $('#over_lay').fadeOut();
});



alertBox = {
    
    confirmDialog: function (msg ,yesCallBack , obj){
        
        
        var contet = `<div id="over_lay_alert">  
                        <div id="alert_container">     
                            <div id="alert_head">       
                                <div>               
                                    <img src="images/panner/king_name.png">   
                                </div>     
                                <div id="alert-title">تاكيد            </div>  
                                <img src="images/btns/close_b.png" class="img-sml close-alert">     
                            </div> 
                            <div id="alert_box" class="for_battel">        
                                <div class="row-2">
                                    <div class="msg">${msg}</div>
                                </div>    
                                <div class="row-3">        
                                    <div class="confim-btn">            
                                        <button class="full-btn full-btn-3x pull-R enter" id="btn-confirm-yes">تاكيد</button>    
                                        <button class="full-btn full-btn-3x pull-L" id="btn-confirm-no">الغاء</button>  
                                    </div>    
                                </div>
                            </div>   
                        </div>
                    </div>`;
                $("body").append(contet);
                
                $("#btn-confirm-yes").click(function (){
                    $("#over_lay_alert").remove();

                });

                $("#btn-confirm-no , .close-alert ").click(function (){
                    $("#over_lay_alert").remove();
                });
                
        
    },
    
    close:function (){
        $('.close-alert').trigger('click');
    }
    
};


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getServerToken(serverIndex){
  if(!Player)
    return "";
  if(!Player.Tokens)
    return "";
  if(!Player.Tokens[serverIndex])
    return "";
  return `server.php?token=${Player.Tokens[serverIndex]}&lt=${Player.LoginToken}`;
}


function ShowServerList(){
  let ServerListHtml = "";
  for(var OneServer in Config.ServerList){
    ServerListHtml += `  <li>
                        <span class="server-state"><label></label></span>
                        <span class="server-name">
                          <a class="enter-server" data-id-server="1" 
                            data-id-player="<?=$playerId?>" 
                            href="${getServerToken(OneServer)}" 
                            target="_blank">${Config.ServerList[OneServer].name} (s${OneServer})</a>
                        </span>
                        <span class="banner"></span>
                    </li>`;
  }
  console.log(ServerListHtml);
  $("#Server-List").html(ServerListHtml);
};

function ShowLoginBox(){
  let Box = ``;
  if(localStorage.getItem("LoginToken") && localStorage.getItem("LoginExpireOn") > Date.now()){
    Box = `<div class="welcome-name">
                <label class="yellow-color">${localStorage.getItem("LoginPlayerName")}</label>
                <label>مرحبا</label>

            </div>
            <div class="welcome-name">
                <label class="yellow-color">  مركز الاعضاء&nbsp;&nbsp;⇚   </label>
                <label>للدخول الى  </label>

            </div>
            <div class="welcome-name">
                <label class="yellow-color"><a href="${localStorage.getItem("LoginLastServerLink")}" 
                target="_blank">${localStorage.getItem("LoginLastServerName")}</a></label>
                <label style="direction: rtl">اخر سيرفر قمت بالدخول علية :</label>

            </div>
            <div onclick="logout()" class="add-account" style="width: 85%">
                <h3>تسجيل الخروج</h3>
            </div> `
  }else{
    Box = ` <input id="username" type="text" name="" placeholder="البريد الالكتروني او اسم المستخدم">
            <input id="password" type="password" name="" placeholder="كلمة المرور">
            <button onclick="login()" class="login">تسجيل الدخول </button> `
  }
  $("#login-form").html(Box);
}

$(document).ready(function (){
  console.log("ready");
  $.ajax({
    url: `${HomeUrl}/home/Config`,
    type: 'GET',
    success: function (data, textStatus, jqXHR) {
      console.log("ready");
      try{
        const json = JSON.parse(data);
        Config = json.Config;
        console.log(Config);
        ShowServerList();
        ShowLoginBox();
      }catch(e){
        Elkaisar.LBase.Error(e);
        console.log(e);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(this.url);
    }
  });
});