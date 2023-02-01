class AMessage{
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async GetMsgNumbers(){
    return {
      state: "ok",
      msg_out: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_out", "msg_out", "id_from = ?", [this.idPlayer])) [0]["msg_out"],
      msg_income: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_income", "msg_income", "id_to = ?", [this.idPlayer]))[0]["msg_income"],
      msg_diff: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_diff", "msg_diff", "id_to = ?", [this.idPlayer])) [0]["msg_diff"],
      report_player: (await Elkaisar.DB.ASelectFrom("COUNT(DISTINCT id_report) AS report_player", "report_player", "id_player = ?", [this.idPlayer])) [0]["report_player"]
    };
  }

  async GetMsgIncome(){
    const offset = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const MessageList = await Elkaisar.DB.ASelectFrom(" id_from , head , time_stamp , id_msg  , from_  , seen", "msg_income", " id_to = ? ORDER BY id_msg DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    let MsgList =[];
    for(let OneMessage of MessageList){
      if(OneMessage["from_"] == 1){
        OneMessage ["name"] = "النظام";
      }else{
        OneMessage ["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMessage ["id_from"]]))[0]["name"];
      }
      const ts = new Date(OneMessage["time_stamp"] * 1000);
      OneMessage["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      MsgList.push(OneMessage);
    }
    return MsgList;
  }

  async GetMsgIncomeDetail(){
    
    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_income", "id_to = ? AND id_msg = ?", [this.idPlayer, idMsg]);
    for(let OneMsg of Msgs){
      if(OneMsg["from_"] == 1){
        OneMsg ["name"] = "النظام";
      }else{
        OneMsg ["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg ["id_from"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      if(OneMsg["seen"] == 0){
        Elkaisar.DB.AUpdate("seen = 1", "msg_income", " id_msg = ? ", [idMsg]);
      }
    }
    return Msgs;
  }

  async GetMsgDiff(){

    const offset = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_diff", "id_to = ?  ORDER BY time_stamp DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    for(let OneMsg of Msgs){
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;
  }

  async GetMsgDiffDetail(){
    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_diff", "id_to = ? AND id_msg = ?", [this.idPlayer, idMsg]);
  
    for(let OneMsg of Msgs){
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      if(OneMsg["seen"] == 0){
        Elkaisar.DB.AUpdate("seen = 1", "msg_diff", " id_msg = ? ", [idMsg]);
      }
    }
    return Msgs;
  }

  async GetMsgOutcome(){
    
    const offset = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("id_to , head , time_stamp , id_msg", "msg_out", "id_from = ?  ORDER BY time_stamp DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    for(let OneMsg of Msgs){
      if(OneMsg["id_to"] == 0){
        OneMsg ["name"] = "النظام";
      }else{
        OneMsg ["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg ["id_to"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;
  }

  async GetMsgOutcomeDetail(){
    
    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("id_to ,  head , time_stamp , id_msg , body", "msg_out", "id_from = ?  AND id_msg = ?", [this.idPlayer, idMsg]);
    for(let OneMsg of Msgs){
      if(OneMsg["id_to"] == 0){
        OneMsg ["name"] = "النظام";
      }else{
        OneMsg ["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg ["id_to"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;

  }

  
};

module.exports = AMessage;