WorldUnit.prize = {};

WorldUnit.prize.prizes = {};


WorldUnit.prize.getAllPrize = function () {
  $.ajax({
    'url': `${Elkaisar.Config.NodeUrl}/api/AWorld/getWorldUnitPrize`,
    'data': {
      token: Elkaisar.Config.OuthToken
    },
    'type': 'GET',
    success: function (data, _0x45a054, _0x31b37d) {
      if (Elkaisar.LBase.isJson(data))
        WorldUnit.prize.prizes = JSON.parse(data);
      else
        Elkaisar.LBase.Error(data);
    },
    'error': function (_0x295c85, _0x4fa13c, _0x20447d) { }
  });
};

WorldUnit.prize.PrizFor = {
  'Win': 'Win',
  'Lose': 'Lose',
  'Sp': 'Sp',
  'Plunder': 'Plunder'
};



WorldUnit['prize']['getUnitPrize'] = function (unitType, lvl, PrizeFor = 'Win') {
  unitType = Number(unitType);
  lvl = Number(lvl);
  var PrizeList = [];
  for (var iii in WorldUnit['prize']['prizes'][PrizeFor]) {
    if (WorldUnit['prize']['prizes'][PrizeFor][iii]['unitType'] === unitType
      && WorldUnit['prize']['prizes'][PrizeFor][iii]['lvl'] === lvl)
      PrizeList.push(WorldUnit['prize']['prizes'][PrizeFor][iii]);
  }
  return PrizeList;
};

WorldUnit['prize']['getUnitAllLvlsPrize'] = function (unitType, PrizeFor = 'Win') {
  unitType = Number(unitType);
  var PrizeList = [];
  for (var iii in WorldUnit['prize']['prizes'][PrizeFor]) {
    if (WorldUnit['prize']['prizes'][PrizeFor][iii]['unitType'] === unitType)
      PrizeList.push(WorldUnit['prize']['prizes'][PrizeFor][iii]);
  }
  return PrizeList;
};


WorldUnit.prize.prizeList = function (x_coord, y_coord) {

  if (!WorldUnit.getWorldUnit(x_coord, y_coord))
    return;

  var lvl = Number(WorldUnit.getWorldUnit(x_coord, y_coord).l);
  var type = Number(WorldUnit.getWorldUnit(x_coord, y_coord).ut);

  var prize = this.getUnitPrize(type, lvl);
  var list = "";
  for (var iii in prize) {
    list += `   <li>
                        <div class="golden-border">
                            <div class="unit-image" style="background-image: url(${Matrial.image(prize[iii].prize)})">
                                <div class="amount stroke">(${prize[iii].amount_min}-${prize[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
  }

  return list;
};

WorldUnit['prize']['prizeAllLvlsList'] = function (xCoord, yCoord, prizeFor = 'Win') {
  if (!WorldUnit['getWorldUnit'](xCoord, yCoord))
    return;
  var lvl = Number(WorldUnit['getWorldUnit'](xCoord, yCoord)['l']),
    unitType = Number(WorldUnit['getWorldUnit'](xCoord, yCoord)['ut']),
    PrizeList = WorldUnit['prize']['getUnitAllLvlsPrize'](unitType, prizeFor),
    PList = [],
    List = '';
  for (var iii in PrizeList) {
    if (PList['indexOf'](PrizeList[iii]['prize']) === -0x1)
      PList.push(PrizeList[iii]['prize']);
    else
      continue;
    if (PList['length'] > 0x10)
      break;
    List += `   <li>
                        <div class="golden-border">
                            <div class="unit-image ${PrizeList[iii].lvl !== lvl ? "gray-filter" : ""}" style="background-image: url(${Matrial.image(PrizeList[iii].prize)})">
                                <div class="amount stroke">(${PrizeList[iii].amount_min}-${PrizeList[iii].amount_max})X</div>
                            </div>
                        </div>
                    </li>
                    `;
  }
  return List;
};



$(document).on("PlayerReady", "html", function () {
  WorldUnit.prize.getAllPrize();
});