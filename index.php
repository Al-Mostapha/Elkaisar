<?php
define('BASE_URL', "http://web.elkaisar.com");
define('HOME_URL', "http://localhost:8080");
?>
<!DOCTYPE html>
<html>
<title>قيصر الشرق</title>
<link rel="icon" type="image/png" href="images/favicon.png" sizes="128×128">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- First Mobile Meta-->
<meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- For Enternet Explorer-->
<link rel="stylesheet" href="cssHome/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="cssHome/style.css">
<link rel="stylesheet" type="text/css" href="cssHome/base_index.css">
<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Asap|Days+One" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet">

<body>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="title col-md-6">
          <div><img src="images/home//title1.png"></div>
          <div><a href=""><img src="images/home/title2.png"></a></div>
        </div>
      </div>
    </div>
  </div>
  <div class="navBar">
    <div class="container">

      <ul class="left">
        <a href="">
          <li>شراء المواد </li>
        </a>
        <a href="">
          <li>الترتيب </li>
        </a>
      </ul>

      <div class="logo">
        <img src="images/home/logo.png">
      </div>

      <ul class="right">
        <a href="http://forum.elkaisar.com/index.php">
          <li>المنتدي</li>
        </a>
        <a href="http://www.elkaisar.com/">
          <li>الرئيسية</li>
        </a>
      </ul>

    </div>
  </div>
  <div class="body">
    <div class="container">
      <div class="row">

        <!-- Start Left Column-->
        <div class="leftColumn col-md-8">
          <!--Start Slider-->
          <div class="slider"></div>
          <!--End Slider-->

          <!--Start know more about Kaisar-->
          <div class="knowAbout">
            <div class="title">
              <h3>اعرف اكثر عن لعبة القيصر</h3>
            </div>
          </div>
          <!--End know more about Kaisar-->


          <!--Start unkowen Kaisar-->
          <div class="unkowen">
            <div class="title"></div>

            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images/home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>
            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images/home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>
            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images/home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>
            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images/home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>
            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images//home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>
            <!--Text Box -->
            <div class="box">
              <div class="icon"><img src="images/home/icon.png"></div>
              <div class="text">
                <p> </p>
              </div>
            </div>

          </div>
        </div>
        <div class="rightColumn col-md-4">

          <!--Sign Form -->
          <div class="form1">
            <div class="loginBox" id="login-form"></div>
          </div>
          <div class="add-account" id="join-now">
            <h3>اضافة حساب جديد</h3>
          </div>
          <a href="">
            <div class="facebook">
              <p>تسجيل الدخول</p>
            </div>
          </a>
          <!-- Sign with googlePlus-->
          <a href="">
            <div class="googlePlus">
              <p>تسجيل الدخول</p>
            </div>
          </a>
          <!-- Start Groub of servers -->
          <div id="list-of-servers" class="servers">
            <div class="head-title">
              قائمة السيرفرات
            </div>
            <ul id="Server-List">
            </ul>
          </div>
          <!-- End Groub of servers -->

        </div>
        <!--End Right Section -->
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="title">
      <img src="images/home/logo.png">
    </div>
    <div class="container">
      <div class="row">

        <!-- Download App-->
        <div class="download col-md-4">
          <h5>احصل علي عروضنا الحصريه</h5>
          <a href=""><img src="images/home/pay.png"></a>
          <a href=""><img src="images/home/voda.png"></a>
        </div>
        <!-- date-->
        <div class="date col-md-4">
          <h5>حقوق التصميم محفوظة</h5>
          <p>قيصر الشرق</p>
        </div>
        <!-- Follow Us-->
        <div class="follow col-md-4">
          <h5>تابعنا : </h5>
          <a href=""><i class="fab fa-twitter"></i></a>
          <a href=""><i class="fab fa-facebook-square"></i></a>
          <a href=""><i class="fab fa-youtube"></i></a>
        </div>

      </div>
    </div>
  </div>

  <div id="over_lay">
    <div class="mfp-content">
      <div id="signup_button_box" class="zoom-anim-dialog">
        <div id="signup_header">
          <div id="log-with">
            <button class="loginBtn loginBtn--facebook">
              Facebook
            </button>

            <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
          </div>
        </div>
        <div class="clear"></div>
        <div id="signup_btm">
          <div id="signup_button_box_inn">
            <div id="signup_dialog">
              <div class="clear"></div>
              <div class="control-group">
                <input type="text" class="input-medium" id="signupEmail" autocomplete="off" value="" rel="tipsy" original-title="" placeholder="البريد الالكترونى">
                <span class="status"> </span>
              </div>
              <div class="control-group">
                <input type="text" class="input-medium" id="signupUsername" rel="tipsy" original-title="" placeholder="اسم المستخدم">
                <span class="status"></span>
              </div>
              <div class="control-group">
                <input type="password" class="input-medium" id="signupPassword" rel="tipsy" original-title="" placeholder="كلمة المرور">
                <span class="status"></span>
              </div>
              <div class="control-group">
                <input type="password" class="input-medium" id="signupConfirmPassword" rel="tipsy" original-title="" placeholder="تاكيد كلمة المرور">
                <span class="status"></span>
              </div>
              <div id="join-submit">
                <button>
                  اشترك الان
                </button>
              </div>
            </div>
          </div><!-- signup_button_box_inn -->
        </div><!-- signup_btm -->
        <button title="Close (Esc)" type="button" class="mfp-close" id="close-signup"></button>
      </div>
    </div>
  </div>
  <script>
    var HomeUrl = '<?= HOME_URL ?>';
  </script>
  <script type="text/javascript" src="jsHome/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="jsHome/js.js"></script>
  <script type="text/javascript" src="jsHome/bootstrap.min.js"></script>
  <script type="text/javascript" src="jsHome/jquery.nicescroll.min.js"></script>
  <script type="text/javascript" src="jsHome/Login.js"></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145179238-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-145179238-1');
  </script>
</body>
</html>