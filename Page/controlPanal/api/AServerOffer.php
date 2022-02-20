<?php

class AServerOffer
{
    
    function getServerOffers(){
        return [
            "Offers" => selectFromTable("*", "server_offer", "1")
        ];
        
    }
    
    function updateOffer(){
        $idOffer    = validateID($_POST["idOffer"]);
        $priceOffer = validateID($_POST["OfferPrice"]);
        $OfferName  = validatePlayerWord($_POST["OfferName"]);
        $offerNum   = validateGameNames($_POST["OfferNum"]);
        $gold       = validateGameNames($_POST["OfferGold"]);
        $offer      = validatePlayerWord($_POST["Offer"]);
        $ServerMax  = validateID($_POST["OfferServerMax"]);
        $PlayerMax  = validateID($_POST["OfferPlayerMax"]);
        $OfferAvail = validateID($_POST["OfferAvail"]);
        updateTable("offer_name = :ofName, offer_num = :ofNum, price = :p, offer = :of, gold = :g, server_max = :sm, player_max = :pm, avail = :oa", "server_offer", "id_offer = :idO",
                ["ofName" => $OfferName, "ofNum" => $offerNum, "of" =>$offer, "p" => $priceOffer,"idO" =>$idOffer, "g" => $gold, "sm" => $ServerMax, "pm" => $PlayerMax,"oa" => $OfferAvail]);
    }
    
    
    function addOffer(){
        $offerPrice = validateID($_POST["OfferPrice"]);
        $OfferName  = validatePlayerWord($_POST["OfferName"]);
        $offerNum   = validateGameNames($_POST["OfferNum"]);
        $offer      = validatePlayerWord($_POST["Offer"]);
        $gold       = validateID($_POST["OfferGold"]);
        $ServerMax  = validateID($_POST["OfferServerMax"]);
        $PlayerMax  = validateID($_POST["OfferPlayerMax"]);
        $OfferAvail = validateID($_POST["OfferAvail"]);
        insertIntoTable("offer_name = :ofName, offer_num = :ofNum, price = :p, offer = :of, gold = :g, server_max = :sm, player_max = :pm, avail = :oa", "server_offer",
                ["ofName" => $OfferName, "ofNum" => $offerNum, "of" =>$offer, "g" => $gold, "p" => $offerPrice, "sm" => $ServerMax, "pm" => $PlayerMax, "oa" => $OfferAvail]);
    }
    
    
    function removeOffer(){
        $idOffer    = validateID($_POST["idOffer"]);
        updateTable("avail = 0", "server_offer", "id_offer = :idf", ["idf" => $idOffer]);
        
    }
}


//ALTER TABLE `server_offer` ADD `server_max` INT NOT NULL DEFAULT '0' AFTER `gold`, ADD `player_max` INT NOT NULL DEFAULT '0' AFTER `server_max`, ADD `avail` TINYINT NOT NULL DEFAULT '1' AFTER `player_max`; 
/*CREATE TABLE server_offer_taken(
id_offer int(32),
    id_player int(32),
    time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP
);*/