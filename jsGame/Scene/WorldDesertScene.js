Elkaisar.GE.CWorldDesertScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { "key": "WorldDesert" });
    Elkaisar.GE.WorldDesertScene = this;
  },
  init: function () { },
  preload: function () { },
  create: function () {
    Testmap = this.add.tilemap("WorldDesert");
    const tileSet_1 = Testmap.addTilesetImage("test", "World_1")
    const tileSet_2 = Testmap.addTilesetImage("test 2", "World_4")
    Testmap.createLayer("tile", [tileSet_1, tileSet_2]);
    Testmap.createLayer("ground", [tileSet_1, tileSet_2]);

  },
  update: function (time, delta) {
  }
});