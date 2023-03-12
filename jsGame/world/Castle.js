Elkaisar.Castle = {};
Elkaisar.Castle.FloorPartPos;

Elkaisar.Castle.getFloorPostion = function () {

  return $.getJSON(`${Elkaisar.Config.AssetPath}/jsGame${Elkaisar.Config.JsVersion}/json/Castle/CastleFloorPos.json`,
    function (data) {
      Elkaisar.Castle.FloorPartPos = data;
    });

};



Elkaisar.Castle.addFloor = function () {

  var x = 0;

  for (let OnePart of Elkaisar.Castle.FloorPartPos) {
    Elkaisar.GE.CityScene.add.sprite(OnePart.Pos.x, OnePart.Pos.y, OnePart.Image);
    if (++x > 11)
      break;
  }
  /*Elkaisar.GE.CityScene.add.image(x, y, BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].sprit_name).setInteractive({
      hitArea: new Phaser.Geom.Polygon(BuildingConstData[Elkaisar.City.getCity().BuildingType[BuildingPlace]].hitArea),
      hitAreaCallback: Phaser.Geom.Polygon.Contains
  }).setOrigin(0, 0).setDepth(2)
          .on("click", function () {
              buildingClick(BuildingPlace);
          })
          .on(Phaser.Input.Events.GAMEOBJECT_OVER, MouseOverBuilding)
          .on(Phaser.Input.Events.GAMEOBJECT_OUT, MouseOutBuilding);
  BuildingOnFloor[BuildingPlace].Lable = building_lvl_lable(x, y, BuildingPlace);
  building_hammer_animate(BuildingPlace);
  return BuildingOnFloor[BuildingPlace];*/
};