<!DOCTYPE html>
<html>
    <head>
        <title>CMS Admin</title>
        <meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
        <link rel="stylesheet" href="<?= RESOURCE_BATH ?>/css/all.css"/>
    </head>
    <body>
        <div id="main">
            <div id="header"> <a href="#" class="logo"><img src="../images/Logo-wow.png" width="101" height="29" alt="" /></a>
                <ul id="top-navigation">
                    <?= LCPBase::getTabs("ServerOffer") ?>  
                </ul>
            </div>
            <div id="middle">
                <div id="left-column">
                    <h3>العروض الحالية</h3> 
                    <div id="current-offers">
                        <ul style="padding: 0px;"> </ul>
                    </div>
                </div>
                <div id="center-column">
                    <br />
                    <div class="select-bar">
                        <select id="select-prize-type">
                            <option value="matrial">مواد</option>
                            <option  value="equip"> معدات</option>
                        </select>
                        <label>
                            نوع الجائزة
                        </label>

                    </div>
                    <div class="table" style="margin-bottom: 0px;"> <img src="img/bg-th-left.gif" width="8" height="7" alt="" class="left" /> <img src="img/bg-th-right.gif" width="7" height="7" alt="" class="right" />
                        <div class="listing" style="text-align: center">
                            <div class="th" style="background: #9097A9 url(../img/bg-th-left.gif) no-repeat left top;">
                                <div class="tr" style="width: 30%; display: inline-block; ">اخرى</div>
                                <div class="tr" style="width: 68%; display: inline-block">المواد</div>
                            </div>
                            <div class="content" style="overflow: auto">
                                <div id="matrial-list">
                                </div>
                                <div id="other-list" style="width: 30%">
                                    <div id="resource-req">
                                        <input id="offer-num" type="text" name="textfield" placeholder="رقم العرض"  style="margin-top: 3px"/>
                                        <input id="offer-name" type="text" name="textfield" placeholder="إسم العرض"  style="margin-top:3px"/>
                                        <input id="offer-price" type="text" name="textfield" placeholder="سعر العرض"  style="margin-top: 3px"/>
                                        <input id="offer-gold" type="text" name="textfield" placeholder="ذهب"  style="margin-top: 3px"/>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="table" style="margin-bottom: 0px; height: 180px"> <img src="img/bg-th-left.gif" width="8" height="7" alt="" class="left" /> <img src="img/bg-th-right.gif" width="7" height="7" alt="" class="right" />
                        <div class="listing" style="text-align: center">
                            <div class="th" style="background: #9097A9 url(../img/bg-th-left.gif) no-repeat left top;">
                                <div class="tr" style="width: 100%; display: inline-block; ">الجائزة</div>
                            </div>
                            <div id="Server-offer-detail"  style="width: 70%;  float: right;height: 162px;overflow: auto;">
                                <ul></ul>
                            </div>
                        </div>

                    </div>
                    <hr style="display: block;width: 100%;float: none;clear: both;">

                    <div id="ADD_SERVER_OFFER">
                        <button style="display: block; margin: auto; width: 120px; height: 36px; margin-bottom: 15px;">اضف العرض</button>
                    </div>
                    <!--
                    <div class="table"> <img src="img/bg-th-left.gif" width="8" height="7" alt="" class="left" /> <img src="img/bg-th-right.gif" width="7" height="7" alt="" class="right" />
                        <table class="listing form" cellpadding="0" cellspacing="0">
                            <tr>
                                <th class="full" colspan="2">Header Here</th>
                            </tr>
                            <tr>
                                <td class="first" width="172"><strong>Lorem Ipsum</strong></td>
                                <td class="last"><input type="text" class="text" /></td>
                            </tr>
                            <tr class="bg">
                                <td class="first"><strong>Lorem Ipsum</strong></td>
                                <td class="last"><input type="text" class="text" /></td>
                            </tr>
                            <tr>
                                <td class="first"><strong>Lorem Ipsum</strong></td>
                                <td class="last"><input type="text" class="text" /></td>
                            </tr>
                            <tr class="bg">
                                <td class="first"><strong>Lorem Ipsum</strong></td>
                                <td class="last"><input type="text" class="text" /></td>
                            </tr>
                        </table>
                        <p>&nbsp;</p>
                    </div>
                    -->


                </div>
                <div id="right-column"></div>
            </div>
            <div id="footer"></div>
        </div>
       <script>
            var BASE_URL    = "<?= BASE_URL ?>";
            var SERVER_ID   = <?= $_GET["server"] ?>;
            var SERVER_LIST = <?= json_encode(array_combine(array_keys($ServerList), array_column($ServerList, "name")), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) ?>;
            var OuthToken   = '<?= $_GET["AdminToken"] ?>';
            var WS_HOST     = '<?= WEB_SOCKET_HOST ?>';
            var WS_PORT     = '<?= $ServerList[$_GET["server"]]["Port"] ?>';
        </script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/base.js"></script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/Item.js"></script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/ServerOffer.js"></script>
    </body>
</html>
