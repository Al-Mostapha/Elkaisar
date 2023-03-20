Elkaisar.WsLib.World = {};
Elkaisar.WsLib.World.Fire = {};
Elkaisar.WsLib.World.Battel = {};

Elkaisar.WsLib.World.ResetLvl = function (data) {
  for (var ii in Elkaisar['worldAllUnits']) {
    if (Elkaisar['worldAllUnits'][ii]['ut'] === 0x0) continue;
    if (Elkaisar['worldAllUnits'][ii]['ut'] < WUT_MONAWRAT) continue;
    if (!data['UnitList']['includes'](Elkaisar['worldAllUnits'][ii]['ut'])) continue;
    Elkaisar['worldAllUnits'][ii]['l'] = 0x1;
  }
  alert_box['systemChatMessage']('تم اعادة التعين');
}



Elkaisar.WsLib.World.Battel.Started = function (data) {
  var world_unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  world_unit.s = 1;
  Animation.fireWorldUnit(data.xCoord, data.yCoord);
  Elkaisar.World.MapBattel.newBattel(data);

}


Elkaisar.WsLib.World.Battel.Ended = function (data) {
  var world_unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  Elkaisar.World.MapBattel.removeBattel(data);

}

Elkaisar.WsLib.World.Fire.On = function (data) {
  var world_unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  world_unit.s = 1;
  Animation.fireWorldUnit(data.xCoord, data.yCoord);

}

Elkaisar.WsLib.World.UnitUpdate = function (Parm) {
  var world_unit = WorldUnit.getWorldUnit(Parm.xCoord, Parm.yCoord);
  world_unit.l = Parm.unit.l;
  world_unit.t = Parm.unit.t;
  world_unit.ut = Parm.unit.ut;
  world_unit.lo = Parm.unit.lo;
}

Elkaisar.WsLib.World.Fire.Off = function (data) {
  var Unit = WorldUnit['getWorldUnit'](data['xCoord'], data['yCoord']);
  Unit['s'] = 0;
  WorldUnit.refreshUnitView(data.xCoord, data.yCoord);
}

Elkaisar.WsLib.World.RefereshWorldUnit = function (data) {
  var WorldUnits = data['WorldUnits'];
  for (var ii in WorldUnits) {
    var Unit = Elkaisar['worldAllUnits'][WorldUnits[ii]['x'] * 500 + WorldUnits[ii]['y']];
    Unit['t'] = WorldUnits[ii]['t'];
    Unit['ut'] = WorldUnits[ii]['ut'];
    Unit['l'] = WorldUnits[ii]['l'];
    WorldUnit.refreshUnitView(WorldUnits[ii]['x'], WorldUnits[ii]['y']);
  }
  Elkaisar.World.Map.getWorldCityColonized();
  Elkaisar.World.Map.getWorldCity();
}


Elkaisar.WsLib.World.LvlChangedByGM = function (data) {

  var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  Unit.l = data.lvlTo;
  var msg = `<div class="msg-unit ann-red announce">
        تم تعديل مستوى ${WorldUnit.getUnitData(Unit.ut).Title} ${Extract.coordDirect(data.xCoord, data.yCoord)} حتى يصبح المستوى الحالى ${data.lvlTo}
    </div>`;
  Chat.append(msg);

};


Elkaisar.WsLib.World.UnitLockedByGM = function (data) {

  var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  Unit.lo = 1;
  var msg = `<div class="msg-unit ann-red announce">
        تم إغلاق ${WorldUnit.getUnitData(Unit.ut).Title} ${Extract.coordDirect(data.xCoord, data.yCoord)} 
    </div>`;
  Chat.append(msg);

};

Elkaisar.WsLib.World.UnitLockedByGM = function (data) {

  var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  Unit.lo = 0;
  var msg = `<div class="msg-unit ann-red announce">
        تم فتح ${WorldUnit.getUnitData(Unit.ut).Title} ${Extract.coordDirect(data.xCoord, data.yCoord)} 
    </div>`;
  Chat.append(msg);

};

Elkaisar.WsLib.World.UnitRoundFinishedByGM = function (data) {

  var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  var msg = `<div class="msg-unit ann-red announce">
        تم إنهاء الجولة الحالية لـ ${WorldUnit.getUnitData(Unit.ut).Title} ${Extract.coordDirect(data.xCoord, data.yCoord)} 
    </div>`;
  Chat.append(msg);

};

Elkaisar.WsLib.World.UnitRoundStartedByGM = function (data) {

  var Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  var msg = `<div class="msg-unit ann-red announce">
        تم بدء الجولة الحالية لـ ${WorldUnit.getUnitData(Unit.ut).Title} ${Extract.coordDirect(data.xCoord, data.yCoord)} 
    </div>`;
  Chat.append(msg);

};

Elkaisar.WsLib.World.UnitTypeLvlChange = function (data) {
  var Titles = [];
  for (var iii in data.UnitType) {

    Titles.push(WorldUnit.getUnitData(data.UnitType[iii]).Title)
  }

  var msg = `<div class="msg-unit ann-red announce"> تم تعديل مستوى جميع (${Titles.join(" - ")}) حتى يصبح المستوى الحالى ${data.lvlTo} !</div>`;
  Chat.append(msg);

};


Elkaisar.WsLib.World.newBarrColonized = function (data) {

  const Unit = WorldUnit.getWorldUnit(data.xCoord, data.yCoord);
  const UnitData = WorldUnit.getUnitData(Unit.ut);
  alert_box.systemChatMessage(`تم إضافة ${UnitData.Title} مستوى ${Unit.l}  ${Extract.coordDirect(data.xCoord, data.yCoord)} إلى مستعمراتك فى المدينة ${Elkaisar.City.getCity(data.idCity).City.name} بنجاح !`)
  Elkaisar.City.getCityBarray(data.idCity);
  WorldUnit.refreshUnitView(data.xCoord, data.yCoord);
};


