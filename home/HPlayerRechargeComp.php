<?php

define("PAY_SKY_MID", "10225960771");
define("PAY_SKY_TID", "559525");
define("PAY_SKY_SEKRET_KEY", "63613435386434662D626433392D346264622D393461362D613264376137326636383936");

class HPlayerRechargeComp {

    private $idServer;
    private $idPlayer;
    private $idOffer;
    private $idTrans;

    function hexToStr($hex) {
        $string = '';
        for ($i = 0; $i < strlen($hex) - 1; $i += 2) {
            $string .= chr(hexdec($hex[$i] . $hex[$i + 1]));
        }
        return $string;
    }

    function genHash($time) {

        $merchantId = PAY_SKY_MID;
        $terminalId = PAY_SKY_TID;
        $hashing = "DateTimeLocalTrxn=$time&MerchantId=$merchantId&TerminalId=$terminalId";
        return hash_hmac('sha256', $hashing, $this->hexToStr(PAY_SKY_SEKRET_KEY));
    }

    function sendRequest($gateway_url, $request_string) {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $gateway_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($request_string));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);
        print_r($response . "dsdsd");
        curl_close($ch);
        return $response;
    }

    private function isPayed($TransActions, $MrRef, $OfferPrice) {
        $isPaymentApproved = false;

        foreach ($TransActions as $transaction) {
            $dateTransactions = $transaction->DateTransactions;
            foreach ($dateTransactions as $dateTransaction) {
                if ($dateTransaction->MerchantReference != $MrRef) {
                    continue;
                }


                $serverAmount = doubleval($dateTransaction->AmountTrxn);
                if ($dateTransaction->Status != 'Approved') {
                    $isPaymentApproved = false;
                    break;
                } else if ($OfferPrice != $serverAmount) {
                    $isPaymentApproved = false;
                    break;
                } else {
                    $isPaymentApproved = true;
                }
            }
        }

        return $isPaymentApproved;
    }

    private function getAllTransaction($MerchantReference) {

        $time = gmdate('YmdHis', time());
        $secureHash = $this->genHash($time);
        $request_string = array(
            'SecureHash' => $secureHash,
            'DateTimeLocalTrxn' => $time,
            'TerminalId' => PAY_SKY_TID,
            'MerchantId' => PAY_SKY_MID,
            'MerchantReference' => $MerchantReference,
            'FetchType' => "0",
            'DisplayLength' => 10,
            "DisplayStart" => 0
        );

        return json_decode($this->sendRequest("https://cube.paysky.io/cube/paylink.svc/api/FilterTransactions", $request_string));
    }

    function error($ErrMsg) {

        file_put_contents("PayError.txt", $ErrMsg . print_r($_POST, TRUE), FILE_APPEND);
        file_put_contents("PayError.txt", $ErrMsg . print_r($_GET, TRUE), FILE_APPEND);
        return $ErrMsg;
    }

    function completeTransaction() {

        global $ServerList;
        $Amount = validateID($_POST["Amount"]);
        $MerchantReference = validateGameNames($_POST["MerchantReference"]);
        $TransData = explode("_", $MerchantReference);
        $this->idServer = $TransData[0];
        $this->idPlayer = $TransData[1];
        $this->idOffer = $TransData[2];
        $this->idTrans = $TransData[3];
        $Transaction = selectFromTableIndex("*", "rech_init", "id_trans = :idt", ["idt" => $this->idTrans]);
        if (!count($Transaction))
            return ["state" => "error_0", "Er" => $this->error("No TransAction intianted")];
        if ($Transaction[0]["comp"] != 0)
            return ["state" => "error_1", "Er" => $this->error("Transaction already Completed")];
        updateTableIndex("comp = 1", "rech_init", "id_trans = :idt", ["idt" => $this->idTrans]);

        $object = $this->getAllTransaction($MerchantReference);


        if (count($TransData) == 0)
            return ["state" => "error_2", "Er" => $this->error("Trans Comp Pay ERROR ")];
        if (!isset($ServerList[$this->idServer]))
            return ["state" => "error_3", "Er" => $this->error("Server Error Not Found")];
        DbConnect($this->idServer);

        $Offer = selectFromTable("*", "server_offer", " id_offer = :ido AND avail = 1", ["ido" => $this->idOffer]);
        if (!count($Offer))
            return ["state" => "error_4", "Er" => $this->error("Error Offer Not Found")];
        if ($Offer[0]["price"] != $Amount)
            return ["state" => "error_5", "Er" => $this->error("Error Price")];
        if ($object == null)
            return ["state" => "error_6"];
        if ($object->TotalCountAllTransaction < 1)
            return ["state" => "error_7"];

        $PlayerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_player = :idp AND id_offer = :ido", ["idp" => $this->idPlayer, "ido" => $this->idOffer]);
        $ServerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_offer = :ido", ["ido" => $this->idOffer]);
        if (count($PlayerOfferCompCount) >= $Offer[0]["player_max"] && $Offer[0]["player_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Player Max Count")];
        if (count($ServerOfferCompCount) >= $Offer[0]["server_max"] && $Offer[0]["server_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Server Max Count")];

        $isPaymentApproved = $this->isPayed($object->Transactions, $MerchantReference, $Offer[0]["price"]);

        if (!$isPaymentApproved)
            return ["state" => "error_8", "Er" => $this->error("Payment Not Approved")];

        $this->giveOffer($Offer, $this->idPlayer);
        $this->saveTrans($Offer, $Amount);
        makeGetReq(["idPlayer" => $this->idPlayer, "idOffer" => $this->idOffer], "http://" . WEB_SOCKET_HOST . ":" . $ServerList[$this->idServer]["Port"] . "/cp/CPSendPrize/offerSent");

        return ["state" => "ok"];
    }

    function completeTransactionGet() {

        global $ServerList;
        $Amount = validateID($_GET["Amount"]);
        $MerchantReference = validateGameNames($_GET["MerchantReference"]);
        $TransData = explode("_", $MerchantReference);
        $this->idServer = $TransData[0];
        $this->idPlayer = $TransData[1];
        $this->idOffer = $TransData[2];
        $this->idTrans = $TransData[3];
        $Transaction = selectFromTableIndex("*", "rech_init", "id_trans = :idt", ["idt" => $this->idTrans]);
        if (!count($Transaction))
            return ["state" => "error_0", "Er" => $this->error("No TransAction intianted")];
        if ($Transaction[0]["comp"] != 0)
            return ["state" => "error_1", "Er" => $this->error("Transaction already Completed")];
        updateTableIndex("comp = 1", "rech_init", "id_trans = :idt", ["idt" => $this->idTrans]);

        $object = $this->getAllTransaction($MerchantReference);


        if (count($TransData) == 0)
            return ["state" => "error_2", "Er" => $this->error("Trans Comp Pay ERROR ")];
        if (!isset($ServerList[$this->idServer]))
            return ["state" => "error_3", "Er" => $this->error("Server Error Not Found")];
        DbConnect($this->idServer);

        $Offer = selectFromTable("*", "server_offer", " id_offer = :ido AND avail = 1", ["ido" => $this->idOffer]);
        if (!count($Offer))
            return ["state" => "error_4", "Er" => $this->error("Error Offer Not Found")];
        if ($Offer[0]["price"] != $Amount)
            return ["state" => "error_5", "Er" => $this->error("Error Price")];
        if ($object == null)
            return ["state" => "error_6"];
        /* if ($object->TotalCountAllTransaction < 1)
          return ["state" => "error_7"]; */

        $PlayerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_player = :idp AND id_offer = :ido", ["idp" => $this->idPlayer, "ido" => $this->idOffer]);
        //print_r($PlayerOfferCompCount);

        $ServerOfferCompCount = selectFromTable("*", "server_offer_taken", "id_offer = :ido", ["ido" => $this->idOffer]);

        if (count($PlayerOfferCompCount) > $Offer[0]["player_max"] && $Offer[0]["player_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Player Max Count")];
        if (count($ServerOfferCompCount) > $Offer[0]["server_max"] && $Offer[0]["server_max"] > 0)
            return ["state" => "error_0_3", "Er" => $this->error("Server Max Count")];

        /* $isPaymentApproved = $this->isPayed($object->Transactions, $MerchantReference, $Offer[0]["price"]);

          if (!$isPaymentApproved)
          return ["state" => "error_8", "Er" => $this->error("Payment Not Approved")]; */

        $this->giveOffer($Offer, $this->idPlayer);
        $this->saveTrans($Offer, $Amount);
        makeGetReq(["idPlayer" => $this->idPlayer, "idOffer" => $this->idOffer], "http://" . WEB_SOCKET_HOST . ":" . $ServerList[$this->idServer]["Port"] . "/cp/CPSendPrize/offerSent");
        return ["state" => "ok"];
    }

    private function giveOffer($Offer, $idPlayer) {

        $OfferPrize = json_decode($Offer[0]["offer"], true);

        foreach ($OfferPrize as $One) {
            if ($One["type"] == "matrial") {

                LItem::addItem($One["matrial"], $One["amount"], $idPlayer);
            } else if ($One["type"] == "equip") {
                $Equip = explode("_", $One["idEquip"]);
                LEquip::addEquipForPlayer($idPlayer, $Equip[0], $Equip[1], $Equip[2]);
            }
        }

        LPlayer::giveGold($idPlayer, $Offer[0]["gold"]);
    }

    private function saveTrans($Offer, $Amount) {

        insertIntoTableIndex("id_trans = :idt, id_offer = :ido, id_player = :idp,"
                . " id_server = :ids, offer = :o, amount = :a, comp = :c",
                "rech_comp", [
            "idt" => $this->idTrans, "ido" => $this->idOffer, "idp" => $this->idPlayer, "ids" => $this->idServer,
            "o" => json_encode($Offer[0]), "a" => $Amount, "c" => json_encode($_POST)
        ]);
        insertIntoTable("id_player = :idp, id_offer = :ido", "server_offer_taken", ["idp" => $this->idPlayer, "ido" => $this->idOffer]);
    }

}
