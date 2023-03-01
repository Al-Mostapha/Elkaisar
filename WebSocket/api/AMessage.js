class AMessage {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getMsgNumbers() {
    return {
      state: "ok",
      msg_out: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_out", "msg_out", "id_from = ?", [this.idPlayer]))[0]["msg_out"],
      msg_income: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_income", "msg_income", "id_to = ?", [this.idPlayer]))[0]["msg_income"],
      msg_diff: (await Elkaisar.DB.ASelectFrom("COUNT(*) AS msg_diff", "msg_diff", "id_to = ?", [this.idPlayer]))[0]["msg_diff"],
      report_player: (await Elkaisar.DB.ASelectFrom("COUNT(DISTINCT id_report) AS report_player", "report_player", "id_player = ?", [this.idPlayer]))[0]["report_player"]
    };
  }

  async getMsgIncome() {
    const offset = Elkaisar.Base.validateOffset(this.Parm["offset"]);
    const MessageList = await Elkaisar.DB.ASelectFrom(" id_from , head , time_stamp , id_msg  , from_  , seen", "msg_income", " id_to = ? ORDER BY id_msg DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    let MsgList = [];
    for (let OneMessage of MessageList) {
      if (OneMessage["from_"] == 1) {
        OneMessage["name"] = "النظام";
      } else {
        OneMessage["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMessage["id_from"]]))[0]["name"];
      }
      const ts = new Date(OneMessage["time_stamp"] * 1000);
      OneMessage["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      MsgList.push(OneMessage);
    }
    return MsgList;
  }

  async getMsgIncomeDetail() {

    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_income", "id_to = ? AND id_msg = ?", [this.idPlayer, idMsg]);
    for (let OneMsg of Msgs) {
      if (OneMsg["from_"] == 1) {
        OneMsg["name"] = "النظام";
      } else {
        OneMsg["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg["id_from"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      if (OneMsg["seen"] == 0) {
        Elkaisar.DB.AUpdate("seen = 1", "msg_income", " id_msg = ? ", [idMsg]);
      }
    }
    return Msgs;
  }

  async getMsgDiff() {

    const offset = Elkaisar.Base.validateOffset(this.Parm["offset"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_diff", "id_to = ?  ORDER BY time_stamp DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    for (let OneMsg of Msgs) {
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;
  }

  async getMsgDiffDetail() {

    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("*", "msg_diff", "id_to = ? AND id_msg = ?", [this.idPlayer, idMsg]);

    for (let OneMsg of Msgs) {
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
      if (OneMsg["seen"] == 0) {
        Elkaisar.DB.AUpdate("seen = 1", "msg_diff", " id_msg = ? ", [idMsg]);
      }
    }
    return Msgs;
  }

  async getMsgOutcome() {

    const offset = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("id_to , head , time_stamp , id_msg", "msg_out", "id_from = ?  ORDER BY time_stamp DESC LIMIT 10 OFFSET ?", [this.idPlayer, offset]);
    for (let OneMsg of Msgs) {
      if (OneMsg["id_to"] == 0) {
        OneMsg["name"] = "النظام";
      } else {
        OneMsg["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg["id_to"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;
  }

  async getMsgOutcomeDetail() {

    const idMsg = Elkaisar.Base.validateId(this.Parm["idMessage"]);
    const Msgs = await Elkaisar.DB.ASelectFrom("id_to ,  head , time_stamp , id_msg , body", "msg_out", "id_from = ?  AND id_msg = ?", [this.idPlayer, idMsg]);
    for (let OneMsg of Msgs) {
      if (OneMsg["id_to"] == 0) {
        OneMsg["name"] = "النظام";
      } else {
        OneMsg["name"] = (await Elkaisar.DB.ASelectFrom("name", "player", "id_player = ?", [OneMsg["id_to"]]))[0]["name"];
      }
      const ts = new Date(OneMsg["time_stamp"] * 1000);
      OneMsg["time_stamp"] = `${ts.getDay()}/${ts.getMonth()}/${ts.getFullYear()} ${ts.getHours()}:${ts.getMinutes()}`;
    }
    return Msgs;

  }

  async deleteMessages() {
    const MsgsId = Elkaisar.Base.isJson(this.Parm.idMsgs);
    const table = Elkaisar.Base.validateGameNames(MsgsId.table);
    for (let index in MsgsId.id_msgs)
      MsgsId.id_msgs[index] = Elkaisar.Base.validateId(MsgsId.id_msgs[index]);
    let con = "", ids = "";
    if (table == "msg_diff" || table == "msg_income")
      con = "id_to = ?";
    else if (table == "msg_out")
      con = "id_from = ?";

    if (table == "report_player" || table == "spy_report")
      ids = `id_report IN(${MsgsId.id_msgs.join(",")})" AND  id_player = ?`;
    else
      ids = `id_msg IN (${MsgsId.id_msgs.join(",")} AND ${con}`
    await Elkaisar.DB.ADelete("??", ids, [table, this.idPlayer]);
    return {
      state: "ok"
    }
  }

  async deleteUnreadMessages() {
    const data = Elkaisar.Base.isJson(this.Parm.idMsgs);
    const table = Elkaisar.Base.validateGameNames(data.table);
    let con = "";
    if (table == "msg_diff" || table == "msg_income")
      con = "id_to  = ?";
    else if (table == "msg_out")
      con = "id_from = ?";
    else if (table == "report_player" || table == "spy_report")
      con = "id_player = ?";
    else
      return Elkaisar.Base.TryToHack(this);
    await Elkaisar.DB.ADelete("??", con, [table, this.idPlayer]);
  }


  async sendMail() {
    const body = Elkaisar.Base.validatePlayerWord(this.Parm.body);
    const subject = Elkaisar.Base.validatePlayerWord(this.Parm.subject);
    const idTo = Elkaisar.Base.validateId(this.Parm.idTo);
    const idFrom = this.idPlayer;
    const time_stamp = Math.floor(Date.now() / 1000);
    await Elkaisar.DB.AInsert(
      "id_from = ?, id_to = ?, head = ? , body = ? , time_stamp = ?",
      "msg_income", [idFrom, idTo, subject, body, time_stamp]);
    await Elkaisar.DB.AInsert("id_from = ?, id_to = ?, head = ?, body = ?, time_stamp = ?",
      "msg_out", [idFrom, idTo, subject, body, time_stamp]);
    return {
      state: "ok"
    }
  }

  async sendGuildMail(){
    const body = Elkaisar.Base.validatePlayerWord(this.Parm.body);
    const subject = Elkaisar.Base.validatePlayerWord(this.Parm.subject);
    const timeStamp = Math.floor(Date.now()/1000);
    const idPlayer = this.idPlayer ;
    const AllPlayers = await Elkaisar.DB.ASelectFrom("id_player", "guild_member", 
    "id_guild = (SELECT id_guild FROM guild_member WHERE id_player = ?  AND rank >= ?)", [this.idPlayer, Elkaisar.Config.GUILD_R_SUPERVISOR])
    AllPlayers.forEach(Player => {
      Elkaisar.DB.AInsert("id_from = ?, id_to = ?, head = ?, body = ?, from_ = 2, time_stamp = ?",
      "msg_income", [idPlayer, Player.id_player, subject, body, timeStamp])
    });
    return {
      state: "ok"
    }

    //TODO: Send websocket message to all players
  }

  

};

module.exports = AMessage;