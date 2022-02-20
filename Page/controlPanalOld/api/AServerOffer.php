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
        $gold   = validateGameNames($_POST["OfferGold"]);
        $offer      = validatePlayerWord($_POST["Offer"]);
        updateTable("offer_name = :ofName, offer_num = :ofNum, price = :p, offer = :of, gold = :g", "server_offer", "id_offer = :idO",
                ["ofName" => $OfferName, "ofNum" => $offerNum, "of" =>$offer, "p" => $priceOffer,"idO" =>$idOffer, "g" => $gold ]);
    }
    
    
    function addOffer(){
        print_r($_POST);
        $offerPrice = validateID($_POST["OfferPrice"]);
        $OfferName  = validatePlayerWord($_POST["OfferName"]);
        $offerNum   = validateGameNames($_POST["OfferNum"]);
        $offer      = validatePlayerWord($_POST["Offer"]);
        $gold       = validateID($_POST["OfferGold"]);
        insertIntoTable("offer_name = :ofName, offer_num = :ofNum, price = :p, offer = :of, gold = :g", "server_offer",
                ["ofName" => $OfferName, "ofNum" => $offerNum, "of" =>$offer, "g" => $gold, "p" => $offerPrice]);
    }
    
    
    function removeOffer(){
        $idOffer    = validateID($_POST["idOffer"]);
        deleteTable("server_offer", "id_offer = :idf", ["idf" => $idOffer]);
        
    }
}
