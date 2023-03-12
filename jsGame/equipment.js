Elkaisar.Equip.getPlayerEquip = function () {

  return $.ajax({

    url: `${Elkaisar.Config.NodeUrl}/api/APlayerEquip/getPlayerEquip`,
    data: {
      server: Elkaisar.Config.idServer,
      token: Elkaisar.Config.OuthToken
    },
    type: 'GET',
    success: function (data, textStatus, jqXHR) {

      if (!Elkaisar.LBase.isJson(data))
        Elkaisar.LBase.Error(data);

      Elkaisar.DPlayer.Equip = JSON.parse(data);
      Elkaisar.Equip.distributeEquip();
    }
  });


};


Elkaisar.Equip.distributeEquip = function () {

  for (var iii in Elkaisar.DPlayer.Heros) {

    Elkaisar.DPlayer.Heros[iii].Equip = {
      boot: null, armor: null, shield: null, helmet: null,
      sword: null, belt: null, ring: null, steed: null,
      pendant: null, necklace: null
    };

    for (var ii in Elkaisar.DPlayer.Equip) {


      if (Number(Elkaisar.DPlayer.Equip[ii].id_hero) === Number(Elkaisar.DPlayer.Heros[iii].idHero)) {


        if (Elkaisar.DPlayer.Equip[ii].part === "boot")
          Elkaisar.DPlayer.Heros[iii].Equip.boot = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "armor")
          Elkaisar.DPlayer.Heros[iii].Equip.armor = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "shield")
          Elkaisar.DPlayer.Heros[iii].Equip.shield = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "helmet")
          Elkaisar.DPlayer.Heros[iii].Equip.helmet = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "sword")
          Elkaisar.DPlayer.Heros[iii].Equip.sword = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "belt")
          Elkaisar.DPlayer.Heros[iii].Equip.belt = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "necklace")
          Elkaisar.DPlayer.Heros[iii].Equip.necklace = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "pendant")
          Elkaisar.DPlayer.Heros[iii].Equip.pendant = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "ring")
          Elkaisar.DPlayer.Heros[iii].Equip.ring = Elkaisar.DPlayer.Equip[ii];
        if (Elkaisar.DPlayer.Equip[ii].part === "steed")
          Elkaisar.DPlayer.Heros[iii].Equip.steed = Elkaisar.DPlayer.Equip[ii];

      }

    }

  }

};

Elkaisar.Equip.getEquipUnit = function (idEquip) {
  for (var iii in Elkaisar.DPlayer.Equip)
    if (Number(Elkaisar.DPlayer.Equip[iii].id_equip) === Number(idEquip))
      return Elkaisar.DPlayer.Equip[iii];

  return {};
};

Elkaisar.Equip.EquipList = {},
  Elkaisar.Equip.getEquipData = function () {
    $.ajax({
      'url': `${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/equipment/${UserLag.language || "ar"}.json`,
      success: function (data) {
        Elkaisar.Equip.EquipList = data;
        $.ajax({
          'url':`${Elkaisar.Config.NodeUrl}/api/APlayerEquip/getEquipPower`,
          'data': {
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
          },
          success: function (DataI) {
            if (!Elkaisar.LBase.isJson(DataI))
              return Elkaisar.LBase.Error(DataI);
            var JsonData = JSON.parse(DataI);
            for (var ii in JsonData) {
              const EquipId = `${JsonData[ii]['equip']}_${JsonData[ii]['part']}_${JsonData[ii]['lvl']}`;
              if(!Elkaisar.Equip.EquipList[EquipId])
                console.log(EquipId)
              Elkaisar.Equip.EquipList[EquipId]['Power'] = JsonData[ii];
            }
          }
        });
      }
    });
  }

Elkaisar.Equip.getPlayerAmount = function (EquipType, Part, Lvl = 1) {

  var Count = 0x0;
  for (var ii in Elkaisar.DPlayer['Equip']) {
    if (Elkaisar.DPlayer['Equip'][ii]['type'] == EquipType
      && Elkaisar.DPlayer['Equip'][ii]['part'] == Part
      && Elkaisar.DPlayer['Equip'][ii]['lvl'] == Lvl)
      Count++;
  }
  return Count;
};
$(document)['on']('PlayerReady', 'html', function () {
  Elkaisar.Equip.getEquipData();
});

Elkaisar.Equip.EquipFeature = {
  0: {
    Title: "لا توجد"
  },
  1: {
    Title: "وابل السهام أمام"
  },
  2: {
    Title: "وابل سهام خلف"
  },
  3: {
    Title: "الدرع"
  }
};

var Equipment = {

  secoundryList: ["belt", "necklace", "pendant", "ring", "steed"],

  getName: function (equip, part, lvl = 1) {
    let Equip = Elkaisar['Equip']['EquipList'][`${equip}_${part}_${lvl}`];
    if (!Equip)
      return "";
    return Equip.name;
  },
  getEquipData: function (equip, part, lvl) {

    if (!Elkaisar.Equip.EquipList[`${equip}_${part}_${lvl}`])
      return {
        Power: {
          anti_break: 0,
          attack: 0,
          break: 0,
          damage: 0,
          defence: 0,
          equip: "",
          immunity: 0,
          lvl: 1,
          part: "",
          sp_attr: 0,
          strike: 0,
          vitality: 140
        },
        Texture2D: "Texture2D'/Game/images/equip/equip228.equip228'",
        desc: "تزيد من الحيوية والهجوم لدى القوات.",
        image: "images/equip/equip228.jpg",
        long_desc: "من معدّات إحتفالية العامين للقيصر, المخلصين والشجعان فقط من يحصلون عليها. علامةُ فارقة بين المعدّات والأسلحة.",
        name: "مصفح الـڤيكنج",
        orid: 197
      };


    return Elkaisar.Equip.EquipList[`${equip}_${part}_${lvl}`];
  },
  getImage: function (equip, part, lvl) {
    let Equip = Elkaisar['Equip']['EquipList'][`${equip}_${part}_${lvl}`];
    if (!Equip)
      return "";
    return Equip.image;
  },

  getPlayerEquip: function () {
    return $.ajax({
      url: `${Elkaisar.Config.NodeUrl}/api/APlayerEquip/getPlayerEquip`,
      type: 'GET',
      data: {
        token: Elkaisar.Config.OuthToken
      },
      dataType: 'JSON',
      success: function (data, textStatus, jqXHR) {
        available_Equip = data;

        if ($("#equip-list-heroDia").length) {

          $("#equip-list-heroDia").html(army.getEquipList());

        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }

    });
  },
  getPlayerAmount: function (equip, part, lvl) {

    var count = 0;
    for (var iii in Elkaisar.DPlayer.Heros) {
      for (var jjj in Elkaisar.DPlayer.Heros[iii]) {
        for (var kkk in Elkaisar.DPlayer.Heros[iii][jjj].equip) {
          if (Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk]
            && Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk].type === equip
            && Elkaisar.DPlayer.Heros[iii][jjj].equip[kkk].part === part) {
            count++;
          }
        }
      }
    }

    for (var iii in Elkaisar.DPlayer.Equip) {
      if (Elkaisar.DPlayer.Equip[iii]
        && Elkaisar.DPlayer.Equip[iii].type === equip
        && Elkaisar.DPlayer.Equip[iii].part === part) {
        count++;
      }
    }

    return count;

  },

  getPlayerAvailAmount: function (equip, part, lvl) {
    for (var iii in Elkaisar.DPlayer.Equip) {
      if(!Elkaisar.DPlayer.Equip[iii])
        continue;
      if(Elkaisar.DPlayer.Equip[iii].type != equip)
        continue;
      if(Elkaisar.DPlayer.Equip[iii].part != part)
        continue;
      if(Elkaisar.DPlayer.Equip[iii].lvl != lvl)
        continue;
      if(isNaN(Number(Elkaisar.DPlayer.Equip[iii].id_hero)))
        continue;
      count++;
    }

    return count;

  },

  getData: function (Equip, Part, Lvl) {
    return Elkaisar.Equip.EquipList[Equip + '_' + Part + '_' + (Lvl || 0x1)];
  }

};
