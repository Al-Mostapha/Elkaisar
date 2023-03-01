class ABattelReport {
  Parm;
  idPlayer;
  constructor(idPlayer, Url) {
    this.Parm = Url;
    this.idPlayer = idPlayer;
  }

  async getBattelReports() {
    const Offet = Elkaisar.Base.validateOffset(this.Parm["offset"]);
    const Reports = await Elkaisar.DB.ASelectFrom("DISTINCT id_report , seen", "report_player", "id_player = ? ORDER BY id_report DESC LIMIT 10 OFFSET ?", [this.idPlayer, Offet]);

    let ReportList = [];
    for (let OneReport of Reports) {
      const Report = await Elkaisar.DB.ASelectFrom("*", "report_battel", "id_report = ?", [OneReport["id_report"]]);
      if (!Report || Report.length == 0)
        continue;
      const WorldUnit = Object.assign({}, Elkaisar.World.getUnit(Report[0]["x"], Report[0]["y"]));
      const time_stamp = new Date(Report[0]["time_stamp"] * 1000);
      WorldUnit["time_stamp"] = `${time_stamp.getDay()}/${time_stamp.getMonth()}/${time_stamp.getFullYear()}`;
      WorldUnit["id_report"] = Report[0]["id_report"];
      WorldUnit["type"] = "battel";
      WorldUnit["seen"] = OneReport["seen"];
      ReportList.push(WorldUnit);
    }
    return ReportList;
  }

  async getSpyReports() {
    const Offet = Elkaisar.Base.validateCount(this.Parm["offset"]);
    const Reports = await Elkaisar.DB.ASelectFrom("*", "spy_report", "id_player = ? ORDER BY id_report DESC LIMIT 10 OFFSET ?", [this.idPlayer, Offet]);
    let ReportList = [];
    for (let OneReport of Reports) {
      let WorldUnit = Object.assign({}, Elkaisar.World.getUnit(OneReport["x_coord"], OneReport["y_coord"]));
      const time_stamp = new Date(OneReport["time_stamp"] * 1000);
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


  async getBattelReportDetail() {
    const idReport = Elkaisar.Base.validateId(this.Parm.idReport);
    Elkaisar.DB.AUpdate("seen = 1", "report_player", "id_report = ? AND id_player = ?", [idReport, this.idPlayer]);
    return {
      heros: await Elkaisar.Lib.LBattelReport.getReportHeros(idReport),
      prize: await Elkaisar.Lib.LBattelReport.getReportPrize(this.idPlayer, idReport),
      general_data: await Elkaisar.Lib.LBattelReport.getGeneralReportData(idReport),
      encId: await Elkaisar.Lib.LBattelReport.getReportId({ id: idReport, s: Elkaisar.CONST.SERVER_ID })
    }
  }

  async getSpyReportDetail() {

    const idReport = Elkaisar.Base.validateId(this.Parm.idReport);
    const idVictim = Elkaisar.Base.validateId(this.Parm.idVictim)
    const spyFor = Elkaisar.Base.validateGameNames(this.Parm.spyFor);

    Elkaisar.DB.AUpdate('seen = 1', "spy_report", "id_report = ? AND id_player = ?", [idReport, this.idPlayer]);

    if (spyFor == "city") {
      if (idVictim == this.idPlayer) {
        const rowData = (await Elkaisar.DB.ASelectFrom("*", 'spy_victim', "id_report = ?", [idReport]))[0];
        rowData.side = "victim";
        return rowData;
      } else {
        const rowData = await Elkaisar.DB.ASelectFrom("*", 'spy_city', "id_report = ?", [idReport]);
        let dataToSend = {};
        if (rowData.length > 0) {
          dataToSend = rowData[0];
          dataToSend.side = "winner";
        } else {
          dataToSend = (await Elkaisar.DB.ASelectFrom("*", 'spy_victim', "id_report = ?", [idReport]))[0];
          dataToSend.side = "victim";
        }
        return dataToSend;
      }
    } else {
      return await Elkaisar.DB.ASelectFrom("*", 'spy_barray', "id_report = ?", [idReport]);
    }

  }

};

module.exports = ABattelReport;
