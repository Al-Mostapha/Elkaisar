const LSaveState = require("../Lib/LSaveState");

class AMarket{
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async sellOffer(unitPrice, Resource, quantity){
    const Cond = `deal = 'buy' AND unit_price >= ? AND resource = ? ORDER BY unit_price DESC LIMIT 10`;
    //     $offers = selectFromTable("*", 'market_deal', $condetion, ["up" => $unit_price, "res" => $resource]);
    const Offers = await ASelectFrom("*", "market_deal",Cond, [unitPrice, Resource]);
    const now = Date.now()/1000;
    let totalDone = 0;
    let buyer = [];
    let newMsgNum = 0;

    for(let OneOffer in Offers){
      const amountNeed = Number(OneOffer.amount - OneOffer.done);
      const idDeal = OneOffer.id_deal;
      const idCityTo = OneOffer.id_City;
      const idPlayerTo = OneOffer.id_player;
      const buyerUnitPrice = OneOffer.unit_price;
      const amountToSend = 0;
      let totalPrice = 0;
      let buyerPrice = 0;
      if(amountNeed > quantity - totalDone){
        Elkaisar.DB.AUpdateTable(`done = done  + ${Math.max(quantity - totalDone, 0)}`, "market_deal", `id_deal = ${idDeal}`);
        amountToSend = Math.max(quantity - totalDone, 0);
        totalPrice = Math.floor((quantity - totalDone)*unitPrice);
        buyerPrice = amountToSend*buyerUnitPrice;
        totalDone = quantity;
      }else{
        Elkaisar.DB.ADelete("market_deal", `id_deal = ${idDeal}`);
        totalDone += amountNeed;
        totalPrice = Math.floor(amountNeed*unitPrice);
        amountToSend = amountNeed;
        buyerPrice = amountToSend*buyerUnitPrice;
      }
      Elkaisar.DB.AInsert(`id_to = ${idPlayerTo}, head = 'تقرير شراء الموارد', body = 'تمت عملية شراء ${amountToSend} وحدة من ${Resource} بسعر ${buyerPrice}', time_stamp = ${now}`, "msg_diff");
      Elkaisar.DB.AInsert(`id_to = ${this.idPlayer}, head = 'تقرير بيع الموارد', body = 'تمت عملية بيع ${amountToSend} وحدة من ${Resource} بسعر ${buyerPrice}', time_stamp = ${now}`, "msg_diff");
      
      buyer.push({idPlayer: idPlayerTo, idCity: idCityTo});
      const timeArrive = now + 30*60;
      Elkaisar.DB.AInsert(`id_city_to = ${idCityTo}, amount = ${amountToSend}, id_player_to = ${idPlayerTo}, resource = ?, time_arrive = ${timeArrive}, unit_price = ${buyerUnitPrice}`, "market_buy_transmit", [Resource]);
      Elkaisar.DB.AUpdate(`coin = coin + ${totalPrice}`, "city", `id_city = ? AND id_player = ?`, [idCity, this.idPlayer]);
      if(totalDone >= quantity)
        break;
    }
    if(totalDone < quantity){
      Elkaisar.DB.AInsert(`deal = 'sell', unit_price = ${unitPrice}, amount = ${quantity}, done = ${totalDone}, resource = ?, id_player = ?, id_city = ?`, "market_deal", [Resource, this.idPlayer, idCity]);
    }
    //     echo json_encode([
    //         "state"=>"ok",
    //         "city_resource"=> selectFromTable("food , wood, stone, metal, coin", "city", "id_city = $id_city")[0],
    //         "buyers"=>$buyer,
    //         "msg_num"=>$new_msg_num,
    //         "deal_list"=> selectFromTable("*", "market_deal", "id_city = $id_city")
    //     ]);
    
  }

  async buyOffer(unitPrice, Resource, quantity){
   // $condetion = "deal = 'sell' AND  unit_price <= $unit_price AND  resource = :res  ORDER BY unit_price ASC LIMIT 10";
   const Cond = `deal = 'sell' AND  unit_price <= ${unitPrice} AND  resource = ?  ORDER BY unit_price ASC LIMIT 10`;
   // $smallest_offer = selectFromTable("*", 'market_deal', $condetion, ["res" => $resource]);
    const SmallestOffer = await Elkaisar.DB.ASelectFrom("*", "market_deal", Cond, [Resource]);
   // $msg_num = 0;
   const msgNum = 0;
   // $total_done = 0;
    let totalDone = 0;
   // $seller = [];
    let seller = [];

   //  /*  some offers may be available*/
   //  if(is_array($smallest_offer) && count($smallest_offer) > 0){
    for(let OneOffer in SmallestOffer){
      const amountAvail = Number(OneOffer.amount - OneOffer.done);
      const idDeal = OneOffer.id_deal;
      const idCityFrom = OneOffer.id_city;
      const idPlayerFrom = OneOffer.id_player;
      let amountToSend = 0;
      const sellerUnitPrice = OneOffer.unit_price;
      if(amountAvail > quantity - totalDone){
        Elkaisar.DB.AUpdate(`done = done + ${Math.max(quantity - totalDone, 0)}`, "market_deal", `id_deal = ${idDeal}`);
        totalPrice = Math.floor((quantity - totalDone)*unitPrice);
        amountToSend = Math.max(quantity - totalDone, 0);
        totalDone = quantity;
      }else{
        Elkaisar.DB.ADelete("market_deal", `id_deal = ${idDeal}`);
        totalDone += amountAvail;
        amountToSend = amountAvail;
        totalPrice = Math.floor(amountAvail*unitPrice);
      }

      const sellerPrice = amountToSend*sellerUnitPrice;
      Elkaisar.DB.AInsert(`id_to = ${idPlayerFrom}, head = 'تقرير شراء الموارد', body = 'تمت عملية شراء ${amountToSend} وحدة من ${Resource} بسعر ${totalPrice}', time_stamp = ${now}`, "msg_diff");
      Elkaisar.DB.AInsert(`id_to = ${idPlayerFrom}, head = 'تقرير بيع الموارد', body = 'تمت عملية بيع ${amountToSend} وحدة من ${Resource} بسعر ${sellerPrice}', time_stamp = ${now}`, "msg_diff");

      seller.push({idPlayer: idPlayerFrom, idCity: idCityFrom});
      const timeArrive = now + 30*60;
      Elkaisar.AInsert(`id_city_to = ${idCity}, amount = ${amountToSend}, id_player_to = ${idPlayer},resource = ?, time_arrive = ${timeArrive}, unit_price = ${unitPrice}`, "market_buy_transmit", [Resource]);       
      Elkaisar.DB.AUpdate(`coin = coin + ${sellerPrice}`, "city", `id_city = ${idCityFrom}`);
        if(totalDone >= quantity){break;}

    }
    
    if(totalDone < quantity)
      Elkaisar.DB.AInsert(`deal = 'buy', unit_price = ${unitPrice}, amount = ${quantity}, done = ${totalDone}, resource = ?, id_player = ?, id_city = ?`, "market_deal", [Resource, this.idPlayer, idCity]);
  }

  async ProposeSellOffer(){
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Resource = Elkaisar.Base.validateGameNames(this.Parm.Resource);
    const unitPrice = Elkaisar.Base.validateFloat(this.Parm.unitPrice);
    const quantity = Elkaisar.Base.validateId(this.Parm.quantity);
    if(!idCity || !Resource || !unitPrice || !quantity){
      return {state:"error_1"};
    }
    Elkaisar.Lib.LSaveState.saveCityState(idCity);
    const fees = unitPrice*quantity*0.75/100;
    if(fees <0 || quantity < 0){
      Elkaisar.Base.tryToHack();
      return {state:"error_2"};
    }

    const CityRes = await Elkaisar.Base.ASelectFrom("food, wood, stone, metal, coin", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    if(CityRes[0]["coin"] < fees)
      return {state:"error_3"};
    else if(!CityRes[0][Resource] || CityRes[0][Resource] < quantity)
      return {state:"error_4"};
    const RemainRes = Math.max(CityRes[0][Resource] - quantity, 0);
    const RemainCoin = Math.max(CityRes[0].coin - fees, 0);
    const Quary = `  ${Resource}  = ${RemainRes} , coin  =  ${RemainCoin}`;
    await Elkaisar.Base.AUpdateTable(Quary, "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    this.sellOffer(unitPrice, Resource, quantity);
    return {
      state:"ok",
    }
  }

  async ProposeBuyOffer(){
    const idCity = Elkaisar.Base.validateId(this.Parm.idCity);
    const Resource = Elkaisar.Base.validateGameNames(this.Parm.Resource);
    const unitPrice = Elkaisar.Base.validateFloat(this.Parm.unitPrice);
    const quantity = Elkaisar.Base.validateAmount(this.Parm.quantity);
    if(unitPrice <= 0)
      return {state:"error_1"};

    // $fees = $unit_price*$quantity*0.75/100;
    const fees = unitPrice*quantity*0.75/100;
    await LSaveState.saveCityState(idCity);
    const totalPayment = quantity*unitPrice + fees;
    if(totalPayment <= 0 ||  quantity <= 0)
      return {state:"error_2"}
    
    const CityCoin = await Elkaisar.DB.ASelectFrom("food, wood, stone, metal, coin", "city", "id_city = ? AND id_player = ?", [idCity, this.idPlayer]);
    if(CityCoin[0]["coin"] < totalPayment)
      return {state:"error_3"};
    const RemainCoin = Math.max(CityCoin[0].coin - totalPayment, 0);
    // updateTable(" coin = GREATEST( coin - $total_payment , 0)", "city", "id_player = $id_player AND id_city = $id_city");
    Elkaisar.DB.AUpdate(`coin = ${RemainCoin}`, "city", "id_player = ? AND id_city = ?", [this.idPlayer, idCity]);
    const now = Math.floor(Date.now()/1000);
    // $now = time();
    //  /*لو فى عرض فى السوق بسعر  اقل من السعر دة*/
     
   
    
    
    // echo json_encode([
    //     "state"=>"ok",
    //     "city_resource"=> selectFromTable("food , wood, stone, metal, coin", "city", "id_city = $id_city")[0],
    //     "seller"=>$seller,
    //     "msg_num"=>$msg_num,
    //     "deal_list"=> selectFromTable("*", "market_deal", "id_city = $id_city")
    // ]);
  }

};