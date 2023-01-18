class ABattelReport{
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
      this.Parm = Url;
      this.idPlayer = idPlayer;
  }

  async GetBattelReports(){
    const Offet = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Reports = await Elkaisar.DB.ASelectFrom("DISTINCT id_report , seen", "report_player", "id_player = ? ORDER BY id_report DESC LIMIT 10 OFFSET ?", [this.idPlayer, Offet]);

    let ReportList = [];
    for(let OneReport of Reports){
      const Report = await Elkaisar.DB.ASelectFrom("*", "report_battel", "id_report = ?", [OneReport["id_report"]]);
      if(!Report || Report.length == 0)
        continue;
      const WorldUnit = Object.assign({}, Elkaisar.World.getUnit(Report[0]["x"], Report[0]["y"]));
      const time_stamp = new Date(Report[0]["time_stamp"]*1000);
      WorldUnit["time_stamp"] =`${time_stamp.getDay()}/${time_stamp.getMonth()}/${time_stamp.getFullYear()}`;
      WorldUnit["id_report"] = Report[0]["id_report"];
      WorldUnit["type"] = "battel";
      WorldUnit["seen"] = OneReport["seen"];
      ReportList.push(WorldUnit);
    }
    return ReportList;
  }

  async GetSpyReports(){
    const Offet = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Reports = await Elkaisar.DB.ASelectFrom("*", "spy_report", "id_player = ? ORDER BY id_report DESC LIMIT 10 OFFSET ?", [this.idPlayer, Offet]);
    let ReportList = [];  
    for(let OneReport of Reports){
      let WorldUnit =Object.assign({}, Elkaisar.World.getUnit(OneReport["x_coord"], OneReport["y_coord"]));
      const time_stamp = new Date(OneReport["time_stamp"]*1000);
      WorldUnit["time_stamp"] = `${time_stamp.getDay()}/${time_stamp.getMonth()}/${time_stamp.getFullYear()}`;;
      WorldUnit["id_report"] = OneReport["id_report"];
      WorldUnit["type"] = "spy";
      WorldUnit["seen"] = OneReport["seen"];
      WorldUnit["spy_for"] = OneReport["spy_for"];
      WorldUnit["id_player"] = OneReport["id_player"];
      ReportList.push(WorldUnit);
    }
    return ReportList;
  }

};

module.exports = ABattelReport;
