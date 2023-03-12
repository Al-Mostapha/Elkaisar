<?php
if (!defined("DEV_MODE")) {
  echo '<!--';
}
?>

<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lib/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lib/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lib/jquery-ui.min.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lib/phaser.min.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lib/Peer.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/VoiceChat.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/translate.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/userLan.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/navBar.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/LPreLoad.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/Scene/WorldDesertScene.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/LBaseData.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/base.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/boxWrapper.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/rank.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/player.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/province.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/city.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/fullscr.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/alert.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/city/city_profile.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/city/army_building.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/interatction.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/base/schadular.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/building.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/city/cityBuilding.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/city/PlayerHero.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/army.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/hero.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/heroArmy.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/matrial.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/LItemUse.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/education.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/menuList.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/exchange.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/battelReport.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/dominant.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/LItem.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/menu-list/Rank.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/server.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/wsBattel.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/chat.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/battel.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/guild.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/mail.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/hero.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/player.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/serverAnnounce.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/city.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/Base.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ws/lib/wsWorld.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/worldUnit.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/worldCampBox.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/WorldUnitIcon.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/WorldUnitArmy.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/worldUtil.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/worldUnitPrize.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/worldMap.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/WorldMapBattel.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/world/world.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/battel.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/guild.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/message.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/quest.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/lastUtil.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/luck_wheel.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/market.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/palace.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/spy.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/navigate.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/animation.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/equipment.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/tradeCenter.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/tools/jop.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/battel/joinAttack.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/battel/battelField.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/godGate.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/setting.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/emjoi.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/contribute.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/arenaChallange.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/feature/team.js"></script>
<script type="text/javascript" src="jsGame<?= JS_VERSION ?>/ui/ui.js"></script>

<?php
if (!defined("DEV_MODE")) {
  echo '-->';
  echo '  <script type="text/javascript" src="jsGame' . JS_VERSION . '/lib/jquery-3.2.1.min.js"></script>
            <script type="text/javascript" src="jsGame' . JS_VERSION . '/lib/jquery.nicescroll.min.js"></script>
            <script type="text/javascript" src="jsGame' . JS_VERSION . '/lib/jquery-ui.min.js"></script>
            <script type="text/javascript" src="jsGame' . JS_VERSION . '/lib/phaser.min.js"></script>
            <script type="text/javascript" src="jsGame' . JS_VERSION . '/obfuscated.js"></script>
            <script type="text/javascript" src="jsGame' . JS_VERSION . '/lib/Peer.js"></script>
            ';
}

?>