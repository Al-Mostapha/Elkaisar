
var MSG_NUM;


function refreshMsg() {

  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgNumbers`,
    data: {
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {
    },
    success: function (data, textStatus, jqXHR) {
      MSG_NUM = JSON.parse(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

}

$(document).on("PlayerReady", 'html', function () {
  refreshMsg();
});

function getReports(offset) {

  if (offset === undefined) {
    offset = 0;
  }

  return $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ABattelReport/getBattelReports`,
    data: {
      offset: offset,
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (Elkaisar.LBase.isJson(data)) {
        var reports = JSON.parse(data);
      } else {
        Elkaisar.LBase.Error(data);
      }

      if (reports) {
        console.log(reports)
        var header = "";
        for (var iii = 0; iii < 10; iii++) {
          if (reports[iii]) {
            header += `<div class="tr  ${parseInt(reports[iii].seen) === 0 ? "not-seen" : ""}" id_report="${reports[iii]["id_report"]}"  id_msg="${reports[iii]["id_report"]}" 
                            table="report_player" db_offset="${parseInt(offset) + iii}" data-x-coord="${reports[iii].x}" 
                             data-y-coord="${reports[iii].y}" data-time-stamp="${reports[iii].time_stamp}" data-report-for="${reports[iii].type}"
                            data-seen="${reports[iii].seen}">
                            <div class="td_1">
                                <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                <label for="check_${iii}" class="checker"></label>
                            </div>
                            <div class="td_3">${getReportTitle(reports[iii]["t"], reports[iii]["lvl"], reports[iii]["x"], reports[iii]["y"])}</div>
                            <div class="td_5">${reports[iii]["time_stamp"]}</div>
                            <div class="td_6"><div class="full-btn full-btn-3x show_battel_report">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                        </div>`;
          } else {
            header += `<div class="tr"></div>`;
          }
        }
        var output = `<div class="box_content for_msg for_Br ">
                                        <div class="left-content full">
                                            <div class="th">
                                            <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                            <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                            <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                            <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                        </div>
                                            ${header}
                                        </div>
                                        ${message.footer("report_player", offset)}
                                    </div>`;
        $(".box_content").replaceWith(output);


      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}

function getSpyReports(offset) {

  if (offset === undefined) {

    offset = 0;

  }
  return $.ajax({


    url: `${Elkaisar.Config.NodeUrl}/api/ABattelReport/getSpyReports`,
    data: {
      offset: offset,
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {

      if (isJson(data)) {
        var reports = JSON.parse(data);
      } else {
        Elkaisar.LBase.Error(data);
      }

      if (reports) {

        var header = "";
        for (var iii = 0; iii < 10; iii++) {
          if (reports[iii]) {
            var seen = "";
            if (Number(reports[iii].id_player) === Number(Elkaisar.DPlayer.Player.id_player)) {
              seen = Number(reports[iii].seen) === 0 ? "not-seen" : "";
            }
            header += `<div class="tr  ${seen}" id_report="${reports[iii]["id_report"]}"  id_msg="${reports[iii]["id_report"]}" 
                                            table="spy_report" db_offset="${parseInt(offset) + iii}" data-x-coord="${reports[iii].x}" 
                                            data-y-coord="${reports[iii].y}" data-time-stamp="${reports[iii].time_stamp}" 
                                            data-id-player = "${reports[iii].id_player}"
                                            data-report-for="${reports[iii].type}"  data-spy-for="${reports[iii].spy_for}" data-seen="${reports[iii].seen}">
                                            <div class="td_1">
                                                <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                                <label for="check_${iii}" class="checker"></label>
                                            </div>
                                            <div class="td_3">${getSpyReportTitle(reports[iii]["t"], reports[iii]["l"], reports[iii]["x"], reports[iii]["y"])}</div>
                                            <div class="td_5">${reports[iii]["time_stamp"]}</div>
                                            <div class="td_6"><div class="full-btn full-btn-3x show_spy_report" data-id-victim=${Number(reports[iii].victim)}>${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                        </div>`;
          } else {
            header += `<div class="tr"></div>`;
          }
        }
        var output = `<div class="box_content for_msg for_Br  for_SR">
                                        <div class="left-content full">
                                            <div class="th">
                                                <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                                <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                                <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                                <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                            </div>
                                            ${header}
                                        </div>
                                        ${message.footer("spy_report", offset)}
                                    </div>`;
        $(".box_content").replaceWith(output);


      }

    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}

var message = {

  dialogBoxContent_battelReport: function (offset) {
    if (offset === undefined) {

      offset = 0;

    }
    getReports(offset);

  },
  dialogBoxContent_spyReport: function (offset) {
    if (offset === undefined) {

      offset = 0;

    }
    getSpyReports(offset);

  },
  dialogBoxcontent_msgIncome: function (offset) {
    if (offset === undefined) {

      offset = 0;

    }


    var output = ` <div class="box_content for_msg">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Sender[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                            </div>
                        `;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgIncome`,
      data: {
        offset: offset,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);

        var json_data = JSON.parse(data);
        for (var iii = 0; iii < 10; iii++) {
          if (json_data[iii]) {
            output += `<div class="tr ${parseInt(json_data[iii].seen) === 0 ? "not-seen" : "seen"} ${parseInt(json_data[iii].from_) === 1 ? "sys-msg" : ""} ${parseInt(json_data[iii].from_) === 2 ? "g-msg" : ""}"
                                            data-seen="${json_data[iii].seen}" id_msg="${json_data[iii].id_msg}" table="msg_income" db_offset="${parseInt(offset) + iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                        </div>
                                        <div class="td_2">${json_data[iii].name}</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6">
                                            <div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div>
                                        </div>
                                    </div>`;
          } else {
            output += `<div class="tr"></div>`;
          }
        }
        output += `
                </div>
                    ${message.footer("msg_income", offset)}
                </div>`;
        $(".box_content").replaceWith(output);
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });





  },

  incomeMsgShow: function (id_msg, offset_parent) {

    var msg_data;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgIncomeDetail`,
      data: {
        idMessage: id_msg,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        msg_data = JSON.parse(data);
        var single_meassage = `  <div class="box_content for_msg" id="msg_income_detail">
                                            <div class="left-content full">
                                                <div class="upper">
                                                    <ol>
                                                        <li>
                                                             <span>: المرسل </span><span style="max-width: 120px;"> ${msg_data[0].name}</span> 
                                                        </li>
                                                        <li>
                                                              <span>  : الموضوع  </span><span style="width: 256px;">${msg_data[0].head}</span>
                                                        </li>
                                                        <li>
                                                             <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="msg_body">
                                                    <p class ="selectable">
                                                        ${extractUrl(msg_data[0].body)}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                                <div class="buttons">  
                                                    <ul>  
                                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                            <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_income">
                                                                عودة
                                                            </button>
                                                        </li>
                                                        <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                                           ${parseInt(msg_data[0].from_) === 1 ? "" : ` <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>`}
                                                        </li>

                                                    </ul>  
                                                </div>  
                                            </div> 
                                        </div>`;
        $(".box_content").replaceWith(single_meassage);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });

  },
  dialogBoxcontent_msgDiff: function (offset) {
    if (offset === undefined) {

      offset = 0;

    }

    var output = ` <div class="box_content for_msg ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Sender[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>`;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgDiff`,
      data: {
        offset: offset || 0,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {

        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data)
        var json_data = JSON.parse(data);
        for (var iii = 0; iii < 10; iii++) {

          if (json_data[iii]) {
            output += `<div class="tr ${parseInt(json_data[iii].seen) === 0 ? "not-seen" : "seen"}"
                                            data-seen="${json_data[iii].seen}" id_msg="${json_data[iii].id_msg}" data-seen="${json_data[iii].seen}"
                                            table="msg_diff" db_offset="${parseInt(offset) + iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                        </div>
                                        <div class="td_2">النظام</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6"><div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                    </div>`;
          } else {
            output += `<div class="tr"></div>`;
          }
        }
        output += `

                                </div>
                                ${message.footer("msg_diff", offset)}
                            </div>`;
        $(".box_content").replaceWith(output);

      },
      error: function (jqXHR, textStatus, errorThrown) {

      }

    });





  },
  diffMsgShow: function (id_msg, offset_parent) {
    var msg_data;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgDiffDetail`,
      data: {
        idMessage: id_msg,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        msg_data = JSON.parse(data);
        var single_meassage = `  <div id="msg_diff_detail" class="box_content for_msg">
                                            <div class="left-content full">
                                                <div class="upper">
                                                    <ol>
                                                        <li>

                                                        </li>
                                                        <li>
                                                              <span>  : الموضوع  </span><span>${msg_data[0].head}</span>
                                                        </li>
                                                        <li>
                                                             <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="msg_body">
                                                    <p>
                                                        ${msg_data[0].body}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                                <div class="buttons">  
                                                    <ul>  
                                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                            <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_diff">
                                                                عودة
                                                            </button>
                                                        </li>
                                                        <li style=" float: right; width: 85px; margin-right: 10px;">  
                                                             <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>
                                                        </li>

                                                    </ul>  
                                                </div>  
                                            </div> 
                                        </div>`;
        $(".box_content").replaceWith(single_meassage);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });



  },
  dialogBoxcontent_msgOutcome: function (offset) {

    if (offset === undefined) {

      offset = 0;

    }
    var output = ` <div class="box_content for_msg ">
                            <div class="left-content full">
                                <div class="th">
                                    <div class="td_1 ellipsis">${Translate.Title.TH.Select[UserLag.language]}</div>
                                    <div class="td_2 ellipsis">${Translate.Title.TH.Recipient[UserLag.language]}</div>
                                    <div class="td_3 ellipsis subject">${Translate.Title.TH.Subject[UserLag.language]}</div>
                                    <div class="td_5 ellipsis">${Translate.Title.TH.TimeOfreceipt[UserLag.language]}</div>
                                    <div class="td_6 ellipsis">${Translate.Button.General.Action[UserLag.language]}</div>
                                </div>`;
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgOutcome`,
      data: {
        get_msg_outcome: true,
        offset: offset || 0,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        var json_data = JSON.parse(data);
        if (json_data.length > 0) {
          for (var iii = 0; iii < 10; iii++) {

            if (json_data[iii]) {
              output += `<div class="tr" id_msg="${json_data[iii].id_msg}" data-seen="${json_data[iii].seen}" table="msg_out" db_offset="${parseInt(offset) + iii}">
                                        <div class="td_1">
                                            <input name="msg_sel" id="check_${iii}" class="msg-action" type="checkbox" style="display:none">
                                            <label for="check_${iii}" class="checker"></label>
                                        </div>
                                        <div class="td_2">${json_data[iii].name}</div>
                                        <div class="td_3">${json_data[iii].head}</div>
                                        <div class="td_5">${json_data[iii].time_stamp}</div>
                                        <div class="td_6"><div class="full-btn full-btn-3x  show_msg_income ">${Translate.Button.MenuList.View[UserLag.language]}</div></div>
                                    </div>`;
            } else {
              output += `<div class="tr"></div>`;
            }
          }
          output += `
            </div>
                ${message.footer("msg_out", offset)}
            </div>`;
          $(".box_content").replaceWith(output);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  },

  outcomeMsgShow: function (id_msg, offset_parent) {
    var msg_data;
    $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/getMsgOutcomeDetail`,
      data: {
        idMessage: id_msg,
        token: Elkaisar.Config.OuthToken
      },
      type: 'GET',
      beforeSend: function (xhr) {

      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        msg_data = JSON.parse(data);
        var single_meassage = `  <div class="box_content for_msg">
                                            <div class="left-content full">
                                              <div class="upper">
                                                <ol>
                                                  <li>
                                                    <span>: المرسل </span><span style="max-width: 120px;"> ${msg_data[0].name}</span> 
                                                  </li>
                                                  <li>
                                                    <span>  : الموضوع  </span><span>${msg_data[0].head}</span>
                                                  </li>
                                                  <li>
                                                    <span> : التاريخ</span><span>${msg_data[0].time_stamp}</span>
                                                  </li>
                                                </ol>
                                              </div>
                                              <div class="msg_body">
                                                <p class ="selectable">
                                                  ${extractUrl(msg_data[0].body)}
                                                </p>
                                              </div>
                                            </div>
                                            <div class="right-content-footer" rank_for="players">  
                                              <div class="buttons">  
                                                <ul>  
                                                  <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                                    <button class="full-btn full-btn-3x full" id="back_msg"  data-parent-offset="${offset_parent}" data-msg-for="msg_out">
                                                      عودة
                                                    </button>
                                                  </li>
                                                  <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                                    <button class="full-btn full-btn-3x full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}" data-msg-head="${msg_data[0].head}">  رد </button>
                                                  </li>
                                                </ul>  
                                              </div>  
                                            </div> 
                                        </div>`;

        $(".box_content").replaceWith(single_meassage);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });



  },
  /*
   *  
   *  
   */
  dialogBoxcontent_msgWrite: function (to, subject) {
    var single_meassage = `  <div class="box_content for_msg">
                                <div class="left-content full">
                                  <div class="upper">
                                    <ol>
                                        <li>
                                          <span>: المرسل </span><span style="max-width: 120px;"> ${Elkaisar.DPlayer.Player.name}</span> 
                                        </li>
                                        <li>
                                          <span>  : الموضوع  </span><input type="text" class="input" value="${subject || ''}" style=" width: 76% ;" id="subject_to_mail"/>
                                        </li>
                                        <li>
                                          <span> : المستقبل</span>
                                          <input type="text" class="input" value="${to ? to.name : ''}" style=" width: 59%;" ${to ? (to.id === null ? "" : `id_player="${to.id}"`) : ""} id="${to ? (to.id === null ? "" : "search_by_name") : "search_by_name"}" />
                                        </li>
                                    </ol>
                                    ${to ? "" : ` 
                                      <div id="search_result" class="search_res">
                                        <ul></ul>
                                      </div>`}
                                  </div>
                                  <div class="msg_body">
                                    <textarea class ="selectable"></textarea>
                                  </div>
                              </div>
                              <div class="right-content-footer" rank_for="players">  
                                  <div class="buttons">  
                                      <ul>  
                                        <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                          <button class="full-btn full-btn-3x full" id="get-out-of-msgout">
                                            عودة
                                          </button>
                                        </li>
                                        <li  style=" float: right; width: 85px; margin-right: 10px;">  
                                          <button class="full-btn full-btn-3x full" id="${to ? (to.id === null ? "send_mail_to_guild" : "send_mail_to") : "send_mail_to"}">
                                            ارسال
                                          </button>
                                        </li>
                                      </ul>  
                                  </div>  
                              </div> 
                            </div>`;
    return single_meassage;
  },
  footer: function (table, offset) {
    var footer = `   <div class="right-content-footer" msg_for="${table}">  
                            <div class="buttons">  
                              <ul style="overflow: auto; height: 100%;">  
                                <li>  
                                  <div class="full-btn full-btn-3x" id="select_msg_all">  
                                    ${Translate.Button.MenuList.ToggelAll[UserLag.language]}   
                                  </div>  
                                </li> 
                                <li id="nav_input">  
                                  <div class="full-btn full-btn-3x full" id="del_selected">  
                                    ${Translate.Button.MenuList.DeleteSelected[UserLag.language]}   
                                  </div> 
                                </li>
                                <li id="delete-all">  
                                  <button class="full-btn full-btn-3x full">  
                                    ${Translate.Button.MenuList.DeleteAll[UserLag.language]}   
                                  </button> 
                                </li>
                                ${table !== undefined ?
                                    `<li>
                                      <div id="move_msg_left" msg_type="${table}"  class="left pull-L move_msg left-btn"> </div>
                                      <h1 class="pull-L" id="msg-navigator"> <span>${getArabicNumbers(parseInt(offset) / 10 + 1)}</span>/${getArabicNumbers(Math.ceil(MSG_NUM[table] / 10) || 0)}</h1>
                                      <div id="move_msg_right" msg_type="${table}" class="right pull-R move_msg right-btn" ></div>
                                    </li>` : ""
                                }
                              </ul>  
                            </div>  
                        </div> `;
    return footer;
  }
};


$(document).on("click", ".show_msg_income", function () {

  var id_msg = $(this).parents(".tr").attr("id_msg");
  var table = $(this).parents(".tr").attr("table");
  var seen = $(this).parents(".tr").attr("data-seen");
  var offset = $(".for_msg  .tr:first").attr("db_offset");
  if (table === "msg_diff") {
    message.diffMsgShow(id_msg, offset);
    if (Number(seen) === 0) {
      Elkaisar.DPlayer.Notif.msg_diff--;
    }
  } else if (table === "msg_income") {
    message.incomeMsgShow(id_msg, offset);
    if (Number(seen) === 0) {
      Elkaisar.DPlayer.Notif.msg_in--;
    }
  } else if (table === "msg_out") {
    message.outcomeMsgShow(id_msg, offset);
  }
  Fixed.refreshPlayerNotif();
});


/*                     SELECT ALL MESSAGEES             */
$(document).on("click", "#select_msg_all", function () {

  $(".msg-action").prop("checked", true);

});

$(document).on("click", "#del_selected", function () {

  var total_msg = {
    table: null,
    id_msgs: []
  };

  $(".msg-action").each(function () {

    if ($(this).prop("checked") === true) {
      var id_msg = $(this).parents(".tr").attr("id_msg");
      var table = $(this).parents(".tr").attr("table");

      total_msg.id_msgs.push(id_msg);
      total_msg.table = table;
    }

  });

  if (total_msg.id_msgs.length < 1) {
    return;
  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/AMessage/deleteMessages`,
    data: {
      idMsgs: JSON.stringify(total_msg),
      token: Elkaisar.Config.OuthToken
    },
    type: 'POST',
    beforeSend: function (xhr) {
    },
    success: function (data, textStatus, jqXHR) {

      if (parseInt(data) > 0) {

        if (total_msg.table === "msg_income") {
          message.dialogBoxcontent_msgIncome();
        } else if (total_msg.table === "msg_diff") {
          message.dialogBoxcontent_msgDiff();
        } else if (total_msg.table === "msg_out") {
          message.dialogBoxcontent_msgOutcome();
        } else if (total_msg.table === "report_player") {
          message.dialogBoxContent_battelReport();
        } else if (total_msg.table === "report_player") {
          message.dialogBoxContent_spyReport();
        }
        Player_profile.refreshPlayerNotif();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      Elkaisar.LBase.Error(errorThrown);
    }

  });

});


$(document).on("click", "#delete-all button", function () {

  var total_msg = {
    table: null,
    id_msgs: []
  };
  total_msg.table = $(".right-content-footer").attr("msg_for")

  alert_box.confirmDialog("تأكيد حذف جميع الرسائل!..", function () {
    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/deleteUnreadMessages`,
      data: {
        idMsgs: JSON.stringify(total_msg),
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {



        if (total_msg.table === "msg_income") {
          message.dialogBoxcontent_msgIncome();
        } else if (total_msg.table === "msg_diff") {
          message.dialogBoxcontent_msgDiff();
        } else if (total_msg.table === "msg_out") {
          message.dialogBoxcontent_msgOutcome();
        } else if (total_msg.table === "report_player") {
          message.dialogBoxContent_battelReport();
        } else if (total_msg.table === "report_player") {
          message.dialogBoxContent_spyReport();
        }

        Player_profile.refreshPlayerNotif();


      },
      error: function (jqXHR, textStatus, errorThrown) {
        Elkaisar.LBase.Error(errorThrown);
      }

    });
  });

});


function searchByName(segmant, condtion) {


  if (condtion === undefined) {

    var data_send = {
      searchByName: true,
      name: segmant,
      token: Elkaisar.Config.OuthToken
    };

  } else {

    var data_send = {
      searchByName: true,
      name: segmant,
      idGuildNo: false,
      idGuild: Elkaisar.DPlayer.Player.id_guild,
      token: Elkaisar.Config.OuthToken

    };

  }

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/APlayer/searchByName`,
    data: data_send,
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);

      var json_data = JSON.parse(data);
      var total = "";
      for (var iii = 0; iii < json_data.length; iii++) {
        if (json_data[iii]) {
          total += ` <li id_player="${json_data[iii].id_player}" data-player-name="${json_data[iii].name}"> 
                                        <div class="pull-L">
                                            <img src="${Elkaisar.BaseData.HeroAvatar[json_data[iii].avatar]}"/>
                                        </div>
                                        <h1 class="pull-L">${json_data[iii].name}</h1>
                                        <h2 class="pull-L">(${Elkaisar.BaseData.Promotion[json_data[iii].porm].Title})</h2>
                                    </li>`;
        }
      }
      $("#search_result ").show();
      $("#search_result ul").html(total);
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });

}



$(document).on("keyup", "#search_by_name", function () {

  var segmant = $(this).val();

  if ($.trim(segmant) !== "") {

    searchByName(segmant);

  } else {
    $("#search_result ul").empty();
    $("#search_result ").hide();
  }


});


$(document).on("click", "#search_result ul li", function () {

  var id_player = $(this).attr("id_player");
  var p_name = $(this).attr("data-player-name");
  $("#search_by_name").attr("id_player", id_player);
  $("#search_by_name").val(p_name);
  $("#search_by_name_forGuild").attr("id_player", id_player);
  $("#SearchByNameForTeam").attr("data-id-player", id_player);
  $("#search_by_name_forGuild").val(p_name);
  $("#search_result").hide();

});


$(document).on("click", "#send_mail_to", function () {

  var id_to = $("#search_by_name").attr("id_player");
  var subject = $("#subject_to_mail").val();
  var body = $(".msg_body textarea").val();


  if (!id_to) {
    alert_box.confirmMessage("لا يوجد لاعب بهذا الاسم الرجاء التاكد من اسم اللاعب");
    return;
  } else if ($.trim(subject) === "") {
    alert_box.confirmMessage("يجب ان تكون الرسالة بعنوان اكتب اسم موضوع الرسالة");
    return;
  } else if ($.trim(body) === "") {
    alert_box.confirmMessage("لا يمكنك ارسال رسالة فارغة");
    return;
  } else {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/sendMail`,
      data: {
        idTo: id_to,
        body: body,
        subject: subject,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {
      },
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        $("#search_by_name").val("");
        $("#subject_to_mail").val("");
        $(".msg_body textarea").val("");
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }

});



$(document).on("click", ".move_msg", function () {

  var msg_for = $(this).parents(".right-content-footer").attr("msg_for");

  var offset = 0;
  if ($(this).attr("id") === "move_msg_left") {

    offset = $(".for_msg .left-content .tr:first").attr("db_offset") - 10 >= 0 ? $(".for_msg .left-content .tr:first").attr("db_offset") - 10 : 0;

  } else if ($(this).attr("id") === "move_msg_right") {

    offset = parseInt($(".for_msg .left-content .tr:last").attr("db_offset")) + 1 || 0;

  }




  switch (msg_for) {

    case "msg_income":

      message.dialogBoxcontent_msgIncome(parseInt(offset));

      break;
    case "report_player":

      message.dialogBoxContent_battelReport(parseInt(offset));

      break;
    case "msg_diff":

      message.dialogBoxcontent_msgDiff(parseInt(offset));

      break;

    case "msg_out":

      message.dialogBoxcontent_msgOutcome(parseInt(offset));

      break;

    case "spy_report":

      message.dialogBoxContent_spyReport(parseInt(offset));

      break;


  }


});






$(document).on("click", ".show-player-profile", function () {

  var id_player = $(this).attr("data-id-player");
  showPlayerProfile(id_player);

});


/*
 * 
 * @param {type} id_player
 * @returns {undefined}
 */
function showPlayerProfile(id_player) {

  $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/APlayer/getOtherPlayerData`,
    data: {
      token: Elkaisar.Config.OuthToken,
      idOtherPlayer: id_player
    },
    type: 'GET',
    beforeSend: function (xhr) {
      var player_review = `<div id="over_lay">
                                    <div id="select_from">
                                        <div class="head_bar">
                                            <img src="images/style/head_bar.png" class="banner">
                                            <div class="title">ملف الملك</div>
                                            <img class="close close_use_menu" src="images/btns/close_b.png">
                                        </div>
                                        <p style="clear: both"></p>
                                        <div id="rank-review" class="player-review">
                                            <div class="upper">
                                                <div class="left pull-L">
                                                    <div class="player-avatar">
                                                        <img src="${Elkaisar.BaseData.HeroAvatar[1]}" id="A-A-P-image"/>
                                                    </div>

                                                </div>
                                                <div class="right pull-R">
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.League[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-guild">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.NobleRank[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-promotion">
                                                       ----
                                                    </div>
                                                    <div class="th ellipsis">
                                                        ${Translate.Title.TH.Ranking[UserLag.language]}
                                                    </div>
                                                    <div class="trow bg-btn-blu" id="A-A-P-rank">
                                                       ----
                                                    </div>
                                                </div>
                                                <p style="clear: both"></p>
                                                <h1 class="player-name" id="A-A-P-name">-----</h1>
                                            </div>
                                            <div class="down">
                                                <div class="th ellipsis">${Translate.Title.TH.Info[UserLag.language]}</div>
                                                <div class="li" style="margin-top: 15px;">
                                                    <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/prestige.png"/>
                                                        </div>
                                                        <div class="title pull-R  " id="A-A-P-prestige">
                                                           ------
                                                        </div>
                                                    </div>
                                                    <div class="li-d pull-R bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/honor.png"/>
                                                        </div>
                                                        <div class="title pull-R " id="A-A-P-honor">
                                                            ----
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="li" style="margin-top: 5px; width: 125px; margin: auto">
                                                     <div class="li-d pull-L bg-btn-blu">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/stat_login.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            ${Translate.Button.General.Soon[UserLag.language]}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="li buttons" style="margin-top: 15px; width: 95%">
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/message.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            مراسلة
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/chat.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            شات
                                                        </div>
                                                    </div>
                                                     <div class="li-d pull-L bg-btn-red">
                                                        <div class="image pull-L">
                                                            <img src="images/icons/friend.png"/>
                                                        </div>
                                                        <div class="title pull-R  ">
                                                            صديق
                                                        </div>
                                                    </div>

                                                </div>

                                                <span style="clear: both"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

      $("body").append(player_review);
    },
    success: function (data, textStatus, jqXHR) {
      if (!Elkaisar.LBase.isJson(data))
        return Elkaisar.LBase.Error(data);
      var json_data = JSON.parse(data);
      $("#A-A-P-image").attr("src", Elkaisar.BaseData.HeroAvatar[json_data.Player.avatar]);
      $("#A-A-P-guild").html(json_data.Player.guild || "----");
      $("#A-A-P-promotion").html(Elkaisar.BaseData.Promotion[json_data.Player.porm].Title);
      $("#A-A-P-rank").html(getArabicNumbers(json_data.Player.rank));
      $("#A-A-P-name").html(json_data.Player.name);
      $("#A-A-P-prestige").html(getArabicNumbers(json_data.Player.prestige));
      $("#A-A-P-honor").html(getArabicNumbers(json_data.Player.honor));
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }

  });




}


$(document).on("click", "#send-g-msg", function () {


  var dialog_box = menu_bar.dialogBox(
    Translate.Title.MenuList.Mail[UserLag.language],
    NavBar.Mail,
    message.dialogBoxcontent_msgWrite(
      { name: Translate.Button.Chat.League[UserLag.language], id: null }
    ),
    0);

  dialogBoxShow(dialog_box, function () { $("#dialg_box").attr("type", "messages"); });



});

$(document).on("click", "#send_mail_to_guild", function () {


  var subject = $("#subject_to_mail").val();
  var body = $(".msg_body textarea").val();


  if ($.trim(subject) === "") {
    alert_box.confirmMessage("يجب ان تكون الرسالة بعنوان اكتب اسم موضوع الرسالة");
    return;
  } else if ($.trim(body) === "") {
    alert_box.confirmMessage("لا يمكنك ارسال رسالة فارغة");
    return;
  } else {

    $.ajax({

      url: `${Elkaisar.Config.NodeUrl}/api/AMessage/sendGuildMail`,
      data: {
        body: body,
        subject: subject,
        token: Elkaisar.Config.OuthToken
      },
      type: 'POST',
      beforeSend: function (xhr) {},
      success: function (data, textStatus, jqXHR) {
        if (!Elkaisar.LBase.isJson(data))
          return Elkaisar.LBase.Error(data);
        alert_box.succesMessage("تم ارسال الرسالة بنجاح");
        $("#search_by_name").val("");
        $("#subject_to_mail").val("");
        $(".msg_body textarea").val("");
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }
});


/*<button class="full-btn full" id="back_msg_income"  data-parent-offset="${offset_parent}">*/

$(document).on("click", "#back_msg", function () {


  var back_offset = $(this).attr("data-parent-offset");
  var msg_for = $(this).attr("data-msg-for");


  switch (msg_for) {

    case "msg_income":

      message.dialogBoxcontent_msgIncome(parseInt(back_offset));

      break;
    case "battel_report":

      message.dialogBoxContent_battelReport(parseInt(back_offset));

      break;
    case "msg_diff":

      message.dialogBoxcontent_msgDiff(parseInt(back_offset));

      break;

    case "msg_out":

      message.dialogBoxcontent_msgOutcome(parseInt(back_offset));

      break;

    case "spy_report":

      message.dialogBoxContent_spyReport(parseInt(back_offset));

      break;



  }
  $("#dialg_box  .nicescroll-rails").remove();
});

$(document).on("click", "#get-out-of-msgout", function () {

  $(".nav_bar .left-nav li:first").click();

});

$(document).on("click", ".show_battel_report", function () {

  var id_report = $(this).parents(".tr").attr("id_report");
  var parent_offset = $(".for_msg .tr:first").attr("db_offset");
  var seen = $(this).parents(".tr").attr("data-seen");

  var data_obj = {

    time_stamp: $(this).parents(".tr").attr("data-time-stamp"),
    x_coord: $(this).parents(".tr").attr("data-x-coord"),
    y_coord: $(this).parents(".tr").attr("data-y-coord"),
    id_report: id_report

  };


  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/api/ABattelReport/getBattelReportDetail`,
    data: {
      idReport: id_report,
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (Number(seen) === 0) {
        Elkaisar.DPlayer.Notif.msg_report--;
        Fixed.refreshPlayerNotif();
      }
      if (isJson(data)) {
        $(".box_content").replaceWith(getReportContent(JSON.parse(data), data_obj, parent_offset));
        $("#battel-detail").niceScroll(SCROLL_BAR_PROP);
      } else {
        Elkaisar.LBase.Error(data);
      }


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
});



message.contentForSpyReport = function (json_data, data_obj, parent_offset) {

  if (Number(data_obj.seen) === 0) {
    Elkaisar.DPlayer.Notif.spy_report--;
    Fixed.refreshPlayerNotif();
  }
  if (json_data.side === "victim") {

    return `<div id="spy-report" class="box_content for_msg" >
                    <div class="left-content full">
                        <div id="city-spy-report" class="spy-report">
                            <div class="paragraph">${json_data.content}</div>
                        </div>
                    </div>
                    <div class="right-content-footer" rank_for="players">  
                        <div class="buttons">  
                            <ul>  
                                <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                    <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                        عودة
                                    </button>
                                </li>
                                <li style=" float: right; width: 85px; margin-right: 10px;">  

                                </li>

                            </ul>  
                        </div>  
                    </div> 
                <div>`;
  }


  return `<div id="spy-report" class="box_content for_msg" >
                <div class="left-content full">
                    
                    <div id="city-spy-report" class="spy-report">
                        
                        <div class="report">
                            <div id="city-resource">
                                <div class="title banner-red">
                                    موارد  المدينة
                                </div>
                                <hr style="width: 70%"/>
                                <ul>
                                    <li>
                                        <img src="images/style/food.png"/>
                                        <label>${json_data.food_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/wood.png"/>
                                        <label>${json_data.wood_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/stone.png"/>
                                        <label>${json_data.stone_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/iron.png"/>
                                        <label>${json_data.metal_res}</label>
                                    </li>
                                    <li>
                                        <img src="images/style/coin.png"/>
                                        <label>${json_data.coin_res}</label>
                                    </li>
                                </ul>
                            </div>
                            <hr style="width: 80%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div id="spy-report-city-floor">
                                <div id="hill">
                                    <div class="building-unit" style="left: 320px; top: 131px;">
                                        <img class="building" src="images/city/palace.png" style="width: 90px;">
                                        <div class="lvl">${json_data.palace.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 162px; top: 151px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 122px; top: 163px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 208px; top: 156px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 177px; top: 168px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 146px; top: 177px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 251px; top: 165px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 222px; top: 178px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 191px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 160px; top: 198px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 265px; top: 184px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 203px; top: 209px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_11.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 233px; top: 197px;">
                                        <img class="building" src="${BuildingConstData[json_data.hill_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.hill_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="under-wall">
                                    <div class="building-unit" style="left: 199px; top: 25px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 168px; top: 65px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 169px; top: 40px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 229px; top: 88px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 263px; top: 75px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 199px; top: 51px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 230px; top: 40px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 139px; top: 51px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 259px; top: 52px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 293px; top: 63px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 226px; top: 64px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_11.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 199px; top: 77px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_wall_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_wall_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="under-palace">
                                    <div class="building-unit" style="left: 456px; top: 216px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 425px; top: 202px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 202px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 361px; top: 177px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 393px; top: 165px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 458px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 176px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 513px; top: 189px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 453px; top: 163px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 422px; top: 152px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_10.split("-")[1]}</div>
                                    </div>

                                    <div class="building-unit" style="left: 426px; top: 175px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_11.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_11.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 395px; top: 188px;">
                                        <img class="building" src="${BuildingConstData[json_data.under_palace_12.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.under_palace_12.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="light-house">
                                   
                                     <div class="building-unit" style="left: 546px; top: 120px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 514px; top: 134px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 547px; top: 148px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 548px; top: 174px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 535px; top: 100px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 484px; top: 147px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_6.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 510px; top: 111px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_7.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_7.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 483px; top: 122px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_8.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_8.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 455px; top: 133px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_9.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_9.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 517px; top: 160px;">
                                        <img class="building" src="${BuildingConstData[json_data.light_house_10.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.light_house_10.split("-")[1]}</div>
                                    </div>
                                </div>
                                <div id="around-wood">
                                    <div class="building-unit" style="left: 185px; top: 107px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 156px; top: 94px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 287px; top: 134px;">
                                        <img class="building" src="${BuildingConstData[json_data.around_wood_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.around_wood_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 323px; top: 122px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_1.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_1.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 359px; top: 108px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_2.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_2.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 388px; top: 97px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_3.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_3.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 359px; top: 83px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_4.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_4.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 332px; top: 94px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_5.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_5.split("-")[1]}</div>
                                    </div>
                                    <div class="building-unit" style="left: 146px; top: 120px;">
                                        <img class="building" src="${BuildingConstData[json_data.above_palace_6.split("-")[0]].image}" style="width: 50px">
                                        <div class="lvl">${json_data.above_palace_6.split("-")[1]}</div>
                                    </div>
                                </div>
                            </div>
                            <hr style="width: 90%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div class="title banner-red" style="width: 40%; margin: auto">
                                قوات المدينة
                            </div>
                            <div class="city-army">
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier01.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_a)}">${json_data.army_a}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier02.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_b)}">${json_data.army_b}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier03.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_c)}">${json_data.army_c}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier04.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_d)}">${json_data.army_d}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier05.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_e)}">${json_data.army_e}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier06.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_f)}">${json_data.army_f}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            
                            <div class="desc">
                                يمكن ان تحتوى هذه التقارير على  استخبارات خاطئة بسبب  ضعف الجواسيس لديك
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right-content-footer" rank_for="players">  
                    <div class="buttons">  
                        <ul>  
                            <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                    عودة
                                </button>
                            </li>
                            <li style=" float: right; width: 85px; margin-right: 10px;">  

                            </li>

                        </ul>  
                    </div>  
                </div> 
            </div>`;

};


message.contentForSpyReportBarray = function (json_data, data_obj, parent_offset) {

  return `<div id="spy-report" class="box_content for_msg" >
                <div class="left-content full">
                    
                    <div id="city-spy-report" class="spy-report">
                        
                        <div class="report">
                            
                            <hr style="width: 80%; margin-top: 10px; margin-bottom: 5px;"/>
                            <div class="title banner-red" style="width: 40%; margin: auto">
                                قوات البرية
                            </div>
                            <div class="city-army">
                                <ul>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier01.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_a * 3)}">${json_data.army_a * 3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier02.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_b * 3)}">${json_data.army_b * 3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier03.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_c * 3)}">${json_data.army_c * 3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier04.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_d * 3)}">${json_data.army_d * 3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier05.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_e * 3)}">${json_data.army_e * 3}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrapper">
                                            <img src="images/tech/soldier06.jpg"/>
                                            <div class="amount stroke ${Fixed.getArmyAmountColor(json_data.army_f * 3)}">${json_data.army_f * 3}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            
                            <div class="desc">
                                يمكن ان تحتوى هذه التقارير على  استخبارات خاطئة بسبب  ضعف الجواسيس لديك
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right-content-footer" rank_for="players">  
                    <div class="buttons">  
                        <ul>  
                            <li id="back_to_msg" style=" float: right; width: 85px; margin-right: 50px;">  
                                <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${parent_offset}" data-msg-for="spy_report">
                                    عودة
                                </button>
                            </li>
                            <li style=" float: right; width: 85px; margin-right: 10px;">  

                            </li>

                        </ul>  
                    </div>  
                </div> 
            </div>`;

};

$(document).on("click", ".show_spy_report", function () {

  var id_report = $(this).parents(".tr").attr("id_report");
  var seen = $(this).parents(".tr").attr("data-seen");
  var id_player = $(this).parents(".tr").attr("data-id-player");
  var parent_offset = $(".for_msg .tr:first").attr("db_offset");
  var id_victim = $(this).attr("data-id-victim");

  if (Number(seen) === 0) {
    Elkaisar.DPlayer.Notif.spy_report--;
    Fixed.refreshPlayerNotif();
  }

  var data_obj = {

    time_stamp: $(this).parents(".tr").attr("data-time-stamp"),
    x_coord: $(this).parents(".tr").attr("data-x-coord"),
    y_coord: $(this).parents(".tr").attr("data-y-coord"),
    spy_for: $(this).parents(".tr").attr("data-spy-for"),
    id_victim: id_victim,
    seen: seen,
    id_player: id_player

  };


  $.ajax({
    url: `${Elkaisar.Config.NodeUrl}/ABattelReport/getSpyReportDetail`,
    data: {
      idReport: id_report,
      spyFor: data_obj.spy_for,
      idVictim: id_victim,
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    beforeSend: function (xhr) {

    },
    success: function (data, textStatus, jqXHR) {
      if (isJson(data)) {
        if (data_obj.spy_for === "barrary") {

          $(".box_content").replaceWith(message.contentForSpyReportBarray(JSON.parse(data), data_obj, parent_offset));
          $("#spy-report .spy-report .report").niceScroll(SCROLL_BAR_PROP);

        } else if (data_obj.spy_for === "city") {

          $(".box_content").replaceWith(message.contentForSpyReport(JSON.parse(data), data_obj, parent_offset));
          $("#spy-report .spy-report .report").niceScroll(SCROLL_BAR_PROP);

        }

      } else {
        Elkaisar.LBase.Error(data);
      }


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
});


/**
 * 
 * @param {int} id_player
 * @param {array} heros
 * @param {int} side_win
 * @returns {Boolean}  true if winner 
 */
function checkWinner(id_player, heros, side_win) {
  for (var jjj = 0; jjj < heros.length; jjj++) {
    if (parseInt(heros[jjj].id_player) === parseInt(id_player) &&
      parseInt(heros[jjj].side) === parseInt(side_win)) {
      return true;
    }
  }
  return false;
}


//الملك ${detail.general_data.p_name} انشئ ${parseInt(detail.general_data.task) === 0 ? "غزو" : "استيلاء"} الى جبل [ ${getArabicNumbers(data_obj.y_coord)} , ${getArabicNumbers(data_obj.x_coord)} ]
function getReportContent(detail, data_obj, offset) {
  console.log(arguments)
  var cont = `<div class="box_content for_msg for_Br " id="battel-report-msg">
                    <div class="left-content full">
                        <div id="battel_r_upper">
                            <div class="header">
                                <div class="pull-R th" style="direction: rtl;">
                                   انشئ الملك ${detail.general_data.p_name} ${parseInt(detail.general_data.task) === 0 ? "غزو" : "استيلاء"} الى   [ ${getArabicNumbers(data_obj.y_coord)} , ${getArabicNumbers(data_obj.x_coord)} ] م ${(detail.general_data.lvl)} 
                                </div>
                                <div class="pull-L th">
                                    ${data_obj.time_stamp}
                                </div>
                            </div>
                            <p style="clear: both"></p>
                            <div class="result-icon">
                                ${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "<div class='win'>فوز</div> " : "<div class='def'>هزيمة</div>"}
                            </div>
                            <div class="battel-desc">
                                
                            </div>
                            <div class="resource-row">
                                <ul>
                                    <li><img ondragstart="return false;" src="images/style/food.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.Resource.food} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/wood.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.Resource.wood}</span></li>
                                    <li><img ondragstart="return false;" src="images/style/stone.png"><span>${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.Resource.stone} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/iron.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.Resource.metal} </span></li>
                                    <li><img ondragstart="return false;" src="images/style/coin.png"><span> ${checkWinner(Elkaisar.DPlayer.Player.id_player, detail.heros, detail.general_data.side_win) ? "+" : "-"}  ${detail.prize.Resource.coin} </span></li>
                                </ul>
                            </div>
                            <div class="prize-row flex">
                                <ul>`;
  for (var iii in detail.prize.Item) {

    cont += `<li>
                <img src="${Matrial.image(detail.prize.Item[iii].prize)}">
                <div class="amount stroke">${detail.prize.Item[iii].amount}</div>
            </li>`;

  }


  cont += `</ul>
                  <p>جولات: ${getArabicNumbers(detail.general_data.round_num)}, شرف: ${getArabicNumbers(detail.prize.Honor || 0)}</p>
              </div>
          </div>`;


  cont += `<div id="battel-detail">
                            <div class="your_side">
                                <ul>`;
  for (var jjj = 0; jjj < detail.heros.length; jjj++) {
    if (detail.heros[jjj]["side"] == 1) {
      var tr_1 = "";
      var tr_2 = "";
      for (var iii = 1; iii <= 3; iii++) {
        var f_pre = "f_" + iii + "_pre";
        var f_post = "f_" + iii + "_post";
        var f_type = "f_" + iii + "_type";

        if (detail["heros"][jjj][f_pre] != 0) {
          tr_1 += ` <li>
                      ${army_icon[detail["heros"][jjj][f_type]]}
                      <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][f_pre])}</div>
                      <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][f_post])}</div>
                    </li>`;
        }
      }
      for (var kkk = 1; kkk <= 3; kkk++) {

        var b_pre = "b_" + kkk + "_pre";
        var b_post = "b_" + kkk + "_post";
        var b_type = "b_" + kkk + "_type";
        if (detail["heros"][jjj][b_pre] != 0) {
          tr_2 += ` <li>
                       ${army_icon[detail["heros"][jjj][b_type]]}
                      <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][b_pre])}</div>
                      <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][b_post])}</div>
                  </li>`;
        }
      }
      cont += `<li>
                <div class="hero">
                    <div class="name">
                        ${detail.heros[jjj].h_name ? detail.heros[jjj].h_name : "بطل النظام"}
                    </div>
                    ${Number(detail.heros[jjj].id_player) === Number(Elkaisar.DPlayer.Player.id_player) ?
                    `<div class="image">
                          <img src="${Elkaisar.BaseData.HeroAvatar[detail.heros[jjj].avatar] || "images/icons/hero/eq-bg.png"}" />
                          <div class="xp stroke">+${getArabicNumbers(detail["heros"][jjj]["xp"])}</div>
                      </div>`: ""}
                      </div>
                      <div class="army">
                          <ol>
                          ${tr_1}
                          ${tr_2}
                          </ol>
                      </div>
                  </li>`;
    }
  }
  cont += `</ul>
          </div>
          <div class="enemy_side">
              <ul>`;
  for (var jjj = 0; jjj < detail.heros.length; jjj++) {
    if (detail.heros[jjj]["side"] == 0) {
      var tr_1 = "";
      var tr_2 = "";
      for (var iii = 1; iii <= 3; iii++) {
        var f_pre = "f_" + iii + "_pre";
        var f_post = "f_" + iii + "_post";
        var f_type = "f_" + iii + "_type";

        if (detail["heros"][jjj][f_pre] != 0) {
          tr_1 += ` <li>
                        ${army_icon[detail["heros"][jjj][f_type]]}
                        <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][f_pre])}</div>
                        <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][f_post])}</div>
                    </li>`;
        }
      }
      for (var kkk = 1; kkk <= 3; kkk++) {

        var b_pre = "b_" + kkk + "_pre";
        var b_post = "b_" + kkk + "_post";
        var b_type = "b_" + kkk + "_type";
        if (detail["heros"][jjj][b_pre] != 0) {
          tr_2 += ` <li>
                      ${army_icon[detail["heros"][jjj][b_type]]}
                      <div class="pre-amount stroke">${getArabicNumbers(detail["heros"][jjj][b_pre])}</div>
                      <div class="post-amount">${getArabicNumbers(detail["heros"][jjj][b_post])}</div>
                  </li>`;
        }
      }
      cont += `<li>
                  <div class="hero">
                      <div class="name">
                          ${detail.heros[jjj].h_name ? detail.heros[jjj].h_name : "بطل النظام"}
                      </div>
                      ${Number(detail.heros[jjj].id_player) === Number(Elkaisar.DPlayer.Player.id_player) ?
                `<div class="image">
                    <img src="${Elkaisar.BaseData.HeroAvatar[detail.heros[jjj].avatar] || "images/icons/hero/eq-bg.png"}"/>
                    <div class="xp stroke">+${getArabicNumbers(detail["heros"][jjj]["xp"])}</div>
                </div>`: ""}
                  </div>
                  <div class="army">
                      <ol>
                      ${tr_1}
                      ${tr_2}
                      </ol>
                  </div>
              </li>`;
    }
  }
  cont += ` </ul>
                            </div>
                        </div>
                    </div>
                    <div class="right-content-footer" rank_for="players">  
                        <div class="buttons">  
                            <ul>  
                                <li  style=" float: right; width: 85px; margin-right: 50px;">  
                                    <button class="full-btn full-btn-3x full" id="back_msg" data-parent-offset="${offset}" data-msg-for="battel_report">
                                        عودة
                                    </button>
                                </li>
                                <li  style=" float: right; width: 120px; margin-right: 10px;">  
                                    <button class="full-btn full-btn-3x full" id="show-battel-animated">
                                        <a   href="battel.php?report=${detail.encId}&server=${Elkaisar.Config.idServer}" target="_blank">استعراض المعارك</a>
                                    </button>
                                </li>
                            </ul>  
                        </div>  
                    </div>
                </div>`;
  return cont;
}

$(document).on("click", "#show-battel-animated", function () {

  //alert_box.confirmMessage("هذة الخاصية غير متاحة الان");

});

/*<button class="full-btn full" id="msg-reply" data-id-player="${msg_data[0].id_from}" data-player-name="${msg_data[0].name}">  رد </button>*/

$(document).on("click", "#msg-reply", function () {
  var id_player = $(this).attr("data-id-player");
  var player_name = $(this).attr("data-player-name");
  var subject = "رد " + $(this).attr("data-msg-head");
  $(".for_msg").replaceWith(
    message.dialogBoxcontent_msgWrite(
      { name: player_name, id: id_player }, subject
      )
    );
});