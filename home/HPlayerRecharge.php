<?php

define("PAY_SKY_MID",        "10225960771");
define("PAY_SKY_TID",        "559525");
define("PAY_SKY_SEKRET_KEY", "63613435386434662D626433392D346264622D393461362D613264376137326636383936");
class HPlayerRecharge {

    function getBaseData() {

        global $ServerList;
        $Sers = [];

        foreach ($ServerList as $idServer => $oneServer) {

            $Sers[] = [
                "idServer" => $idServer,
                "Port" => $oneServer["Port"],
                "Name" => $oneServer["name"]
            ];
        }

        return [
            "Servers" => $Sers,
            "AppApiUrl" => BASE_URL,
            "JsVersion" => JS_VERSION
        ];
    }

    function getServerOffers() {

        return [
            "Offers" => selectFromTable("*", "server_offer", "avail = 1")
        ];
    }

    function getOfferDetail() {

        $idOffer = validateID($_GET["idOffer"]);
        return [
            "Offer" => selectFromTable("*", "server_offer", "id_offer = :ido AND avail = 1", ["ido" => $idOffer])
        ];
    }

    function getPlayerData() {


        $PlayerCode = validateGameNames($_POST["PlayerCode"]);
        $idPlayer = selectFromTableIndex("id_user", "game_user", "rech_code = :rc", ["rc" => $PlayerCode]);

        if (!count($idPlayer))
            return ["state" => "error_0"];

        $Player = selectFromTable("id_player, name, porm", "player", "id_player = :idp", ["idp" => $idPlayer[0]["id_user"]]);

        if (!count($Player))
            return ["state" => "error_1"];

        return [
            "state" => "ok",
            "Player" => $Player[0]
        ];
    }

    function hexToStr($hex) {
        $string = '';
        for ($i = 0; $i < strlen($hex) - 1; $i += 2) {
            $string .= chr(hexdec($hex[$i] . $hex[$i + 1]));
        }
        return $string;
    }

    function error($ErrMsg) {

        file_put_contents("PayError.txt", $ErrMsg . print_r($_POST, TRUE), FILE_APPEND);
        file_put_contents("PayError.txt", $ErrMsg . print_r($_GET, TRUE), FILE_APPEND);
        return $ErrMsg;
    }

    function genHmac() {
        
        global $ServerList;
        
        $idOffer = validateID($_POST["idOffer"]);
        $idPlayer = validateID($_POST["idPlayer"]);
        $idServer = validateID($_POST["idServer"]);
        $RechCode = validateGameNames($_POST["RechCode"]);
        $time = gmdate('YmdHi', time());
        $Offer = selectFromTable("*", "server_offer", "id_offer = :ido AND avail = 1", ["ido" => $idOffer]);
        

        if (!is_numeric($idOffer))
            return ["state" => "error_0_0", "Er" => $this->error("Error id Offer")];
        if (!is_numeric($idPlayer))
            return ["state" => "error_0_1", "Er" => $this->error("Error id Player")];
        if (!is_numeric($idServer) || !isset($ServerList[$idServer]))
            return ["state" => "error_0_2", "Er" => $this->error("Error id Server")];
        if (!count($Offer))
            return ["state" => "error_0", "Er" => $this->error("Error Offer Not Found")];
        $PlayerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_player = :idp AND id_offer = :ido", ["idp" => $idPlayer, "ido" => $idOffer]);
        $ServerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_offer = :ido", ["ido" => $idOffer]);
        if(count($PlayerOfferCompCount) >= $Offer[0]["player_max"] && $Offer[0]["player_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Player Max Count")];
        if(count($ServerOfferCompCount) >= $Offer[0]["server_max"] && $Offer[0]["server_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Player Max Count")];
        $idTrans = insertIntoTableIndex("id_player = :idp, id_server = :ids, id_offer = :ido, server_name = :sn, rech_code = :rc, rech_date = :rd, rech_price = :rp, secure_hash = :sh",
                "rech_init", ["idp" => $idPlayer, "ids" => $idServer, "ido" => $idOffer, "sn" => $ServerList[$idServer]["name"],
            "rc" => $RechCode, "rd" => $time, "rp" => $Offer[0]["price"], "sh" => ""]);



        $Mr = $idServer . "_" . $idPlayer . "_" . $idOffer . "_" . $idTrans;


        $hashing = "Amount={$Offer[0]["price"]}&DateTimeLocalTrxn=$time&MerchantId=".PAY_SKY_MID."&MerchantReference=$Mr&TerminalId=".PAY_SKY_TID;
        $SecureCode = hash_hmac('sha256', $hashing, $this->hexToStr(PAY_SKY_SEKRET_KEY));
        if ($idTrans == 0)
            return ["state" => "error_3", "Er" => $this->error("Trans Not Added For " . $SecureCode)];




        return [
            "state" => "ok",
            "MID" => PAY_SKY_MID,
            "TID" => PAY_SKY_TID,
            "AmountTrxn" => $Offer[0]["price"],
            "MerchantReference" => $Mr,
            "TrxDateTime" => $time,
            "SecureHash" => $SecureCode
        ];
    }

    function payComp2() { }
    
    function getAllRechComp(){
        
        return selectFromTableIndex("*", "rech_comp", "1");
        
    }
    
    function test(){
        
        //{"state":"error_2",
        //"Er":"Error Secure Code Not Match",
        //"0":{
        //"TxnDate":"220206150338",
        //"SystemReference":"1371795",
        //"NetworkReference":"30000051651",
        //"MerchantReference":"1_54_2_15",
        //"Amount":"2100","Currency":"818",
        //"PaidThrough":"Card",
        //"PayerAccount":"457376XXXXXX1734",
        //"PayerName":"Mustapha",
        //"ProviderSchemeName":"",
        //"SecureHash":"984778ED8D8D9D2B627B7CD838D7479EC4FEEEDC028DCA519DADA1CF285BA659"
        //},"1":"bd2b78a429c3200798366f62aa3e6d7c7251eda61a292809fc8c10d0d31db494"}
        
        $hashing = "Amount=2100&Currency=818&MerchantId=".PAY_SKY_MID."&MerchantReference=1_54_2_15&PaidThrough=Card&TerminalId=".PAY_SKY_TID."&TxnDate=220206150338";
           // $hashing = "Amount=2100&DateTimeLocalTrxn=220206150338&MerchantId=".PAY_SKY_MID."&MerchantReference=1_54_2_15&TerminalId=".PAY_SKY_TID;
            
        echo strtoupper(hash_hmac('sha256', $hashing, $this->hexToStr(PAY_SKY_SEKRET_KEY)))."<br>";
       
        echo  "984778ED8D8D9D2B627B7CD838D7479EC4FEEEDC028DCA519DADA1CF285BA659"."</br>";
        
    }

}
