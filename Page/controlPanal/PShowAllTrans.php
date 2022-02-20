<!DOCTYPE html>
<html>
    <head>
        <title>Elkaisar CP</title>
        <link rel="icon" type="image/png" href="<?= RESOURCE_BATH ?>/images/favicon.png" sizes="128×128">
        <meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
        <link rel="stylesheet" href="<?= RESOURCE_BATH ?>/css/all.css"/>
    </head>
    <body>
        <div id="main">
            <div id="header"> <a href="#" class="logo"><img src="../images/Logo-wow.png" width="101" height="29" alt="" /></a>
                <ul id="top-navigation">
                    <?= LCPBase::getTabs("") ?>  
                </ul>
            </div>
            <div id="middle">
                <div id="left-column">
                    <h3>إجمالى العمليات</h3> 
                    <div id="item-prize-list">
                        <ul id="player-list" style="padding: 0px;">

                        </ul>
                    </div>

                </div>
                <div id="center-column">
                    <div class="table" style="margin-bottom: 0px;"> <img src="img/bg-th-left.gif" width="8" height="7" alt="" class="left" /> <img src="img/bg-th-right.gif" width="7" height="7" alt="" class="right" />
                        <div class="table"> 
                            <img src="http://localhost/Elkaisar/Page/controlPanal/img/bg-th-left.gif" alt="" class="left" width="8" height="7"> 
                            <img src="http://localhost/Elkaisar/Page/controlPanal/img/bg-th-right.gif" alt="" class="right" width="7" height="7">
                            <table id="user-table" class="listing" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                        <th class="first" width="177"> العرض</th>
                                        <th>اللاعب- السيرفر</th>
                                        <th>السيرفر</th>
                                        <th>عر</th>
                                        <th>ترقية</th>
                                        <th>ذهب</th>
                                        <th>حظر</th>
                                        <th>القاب</th>
                                        <th>فحص</th>
                                        <th class="last">نقل</th>
                                    </tr>
                                    <?php
                                        $AllTrans = selectFromTableIndex("*", "rech_comp", "1");
                                        $List = "";
                                        foreach ($AllTrans as $one){
                                            $Offer = json_decode($one["offer"]);
                                            echo '<tr data-id-player="6591">'. json_encode($Offer, JSON_UNESCAPED_SLASHES).'</tr>    ';
                                            $List = '<tr data-id-rech="'.$one["id_rech"].'">
                                                            <td class="first" data-id-player="6591">'.$one["offer_name"]."(".$one["offer_num"].")".'</td>
                                                            <td class="change-player-group" data-id-player="6591"> (0)</td>
                                                            <td class="change-player-prestige" data-id-player="6591">  421082679 </td>
                                                            <td class="change-player-honor" data-id-player="6591">  2147483647 </td>
                                                            <td class="change-player-porm" data-id-player="6591">  29 </td>
                                                            <td class="change-player-gold" data-id-player="6591">  7114 </td>
                                                            <td class="pannPlayer" data-id-player="6591">   1 Jan 1970, 01:00</td>
                                                            <td class="changePlayerTitle" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/hr.gif" alt="" width="16" height="16"></td>
                                                            <td class="examinPlayer" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/hr.gif" alt="" width="16" height="16"></td>
                                                            <td class="transPlayer" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/save-icon.gif" alt="" width="16" height="16"></td>
                                                        </tr>  ';
                                        }
                                    ?>

                                    <tr data-id-player="6591">
                                        <td class="first change-player-name" data-id-player="6591">- ℍ𝔸𝕋𝔼𝕄</td>
                                        <td class="change-player-group" data-id-player="6591"> (0)</td>
                                        <td class="change-player-prestige" data-id-player="6591">  421082679 </td>
                                        <td class="change-player-honor" data-id-player="6591">  2147483647 </td>
                                        <td class="change-player-porm" data-id-player="6591">  29 </td>
                                        <td class="change-player-gold" data-id-player="6591">  7114 </td>
                                        <td class="pannPlayer" data-id-player="6591">   1 Jan 1970, 01:00</td>
                                        <td class="changePlayerTitle" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/hr.gif" alt="" width="16" height="16"></td>
                                        <td class="examinPlayer" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/hr.gif" alt="" width="16" height="16"></td>
                                        <td class="transPlayer" data-player-name="ℍ𝔸𝕋𝔼𝕄" data-id-player="6591"> <img src="../img/save-icon.gif" alt="" width="16" height="16"></td>
                                    </tr>                      
                                </tbody></table>

                            <div class="select"></div>
                        </div>

                    </div>
                </div>
                <div id="right-column"> 
                    <h3>ترتيب</h3> 
                    <div style="width: 142px; margin-top: 15px;"> 
                        <table id="user-table" class="listing" style="width: 100%;" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th class="first" style="text-align: center">ترتيب</th>
                                </tr>                
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <div id="footer"></div>
        </div>
        <script>
            var BASE_URL = "<?= BASE_URL ?>";
            var SERVER_ID = <?= $_GET["server"] ?>;
            var SERVER_LIST = <?= json_encode(array_combine(array_keys($ServerList), array_column($ServerList, "name")), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) ?>;
            var OuthToken = '<?= $_GET["AdminToken"] ?>';
            var WS_HOST = '<?= WEB_SOCKET_HOST ?>';
            var WS_PORT = '<?= $ServerList[$_GET["server"]]["Port"] ?>';
        </script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/base.js"></script>
        <script type="text/javascript" src="<?= RESOURCE_BATH ?>/js/Rech.js"></script>

    </body>
</html>
