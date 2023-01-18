module.exports = class AExchange{
  constructor(idPlayer, Param){
    this.idPlayer = idPlayer;
    this.Param = Param;
  }
  async getExchangeItem(){
    return await Elkaisar.DB.ASelectFrom(
            "exchange.*, exchange_player.take_times",
            "exchange JOIN exchange_player ON exchange.id_ex = exchange_player.id_trade", 
            "exchange_player.id_player = ?", [this.idPlayer]
            );
  }
}