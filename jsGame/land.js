

function building_const(el){
     el.on("pointerover" , function () {
        this.alpha = 0.8;
        });
        el.on("pointerout" , function (){
            this.alpha = 1;
        });
}

// aliases
var  Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;
var city = new Application({width: window.innerWidth-5, height:window.innerHeight-5});
city.renderer.backgroundColor = 0x061639;
// add image to loader object
document.body.appendChild(city.view);
loader
    .add(["images/palace.png",
          "images/stabl_1.png",
          "images/seaport-land.png",
          "images/seaport-build.png",
          "images/wall.png",
          "images/farm.png",
          "images/market.png",          
          "images/workshop.png",
          "images/no_building.png",
          "images/wood2.png",
          "images/homelev1_1.png",
          "images/thaknat_1.png"

      ])
    .load(setup);
// set up function
function setup()
{
    /*________________________________________________________________________*/
    /*_________________________seaport________________________________________*/
    var seaport = new Container();
    seaport.scale._y = 0.9;
    // sea port land
    var seaport_land = new Sprite(
                resources["images/seaport-land.png"].texture
            );
    seaport.scale._x = 0.75;
 
    seaport.addChild(seaport_land);
    seaport.x = window.innerWidth - seaport.width ;
    
    
    //seaposrt building
    var seaport_build = new Sprite(
                resources["images/seaport-build.png"].texture
            );  
    seaport_build.x = 50 ;
    seaport_build.y = 250;
    seaport_build.interactive = true;
    seaport_build.buttonMode = true;
    seaport_build.hitArea = new PIXI.Polygon([157,47,178,66,
        221,59,240,33,261,22,
        266,49,266,49,303,61,
        331,46,343,80,343,100,
        344,125,308,138,284,150,
        333,171,352,198,349,224,
        290,228,208,190,188,196,
        225,222,197,243,156,227,
        121,233,89,222,49,192,31,
        172,73,95]);
    seaport.addChild(seaport_build);
    building_const(seaport_build);
    
    city.stage.addChild(seaport);
    
    
 
  
    /*_____________________________middel right_________________________________*/
    var middel_left = new Container();
    middel_left.x = 340;
    middel_left.y = 240;
     // top left one 
    var middel_left_1 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_1].image].texture
            );
    middel_left_1.x = 0;
    middel_left_1.y = 50;
    middel_left_1.buttonMode = true;
    middel_left_1.interactive = true; 
    middel_left_1.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_1);
    middel_left_1.on("click" , function (){
         buildingClick("middel_left_1");
    });
    middel_left.addChild(middel_left_1);
    
    // top left two
    var middel_left_2 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_2].image].texture
            );
    middel_left_2.x = 100;
    middel_left_2.y = 00;
    middel_left_2.buttonMode = true;
    middel_left_2.interactive = true;
    middel_left_2.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_2);
    middel_left_2.on("click" , function (){
         buildingClick("middel_left_2");
    });
    middel_left.addChild(middel_left_2);
    // top left three
    var middel_left_3 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_3].image].texture
            );
    middel_left_3.x = 100;
    middel_left_3.y = 120;
    middel_left_3.buttonMode = true;
    middel_left_3.interactive = true; 
    middel_left_3.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_3);
    middel_left_3.on("click" , function (){
         buildingClick("middel_left_3");
    });
     middel_left.addChild(middel_left_3);
    // top right three
    var middel_left_4 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_4].image].texture
            );
    middel_left_4.x = 200;
    middel_left_4.y = 70;
    middel_left_4.buttonMode = true;
    middel_left_4.interactive = true; 
    middel_left_4.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_4);
    middel_left_4.on("click" , function (){
         buildingClick("middel_left_4");
    });
    middel_left.addChild(middel_left_4);
    
    var middel_left_5 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_5].image].texture
            );
    middel_left_5.x = 200;
    middel_left_5.y = 190;
    middel_left_5.buttonMode = true;
    middel_left_5.interactive = true; 
    middel_left_5.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_5);
    middel_left_5.on("click" , function (){
         buildingClick("middel_left_5");
    });
     middel_left.addChild(middel_left_5);
    // top right three
    var middel_left_6 = new Sprite(
            resources[BuildingConstData[city_building.building.middel_left_6].image].texture
            );
    middel_left_6.x = 290;
    middel_left_6.y = 135;
    middel_left_6.buttonMode = true;
    middel_left_6.interactive = true; 
    middel_left_6.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_left_6);
    middel_left_6.on("click" , function (){
         buildingClick("middel_left_6");
    });
    middel_left.addChild(middel_left_6);
    
    
    /*________________________________________________________________________*/
    /*_____________________________middel right_________________________________*/
    var middel_right = new Container();
    middel_right.x = 0;
    middel_right.y = 0;
     // top right one 
    var middel_right_1 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_1.x = 0;
    middel_right_1.y = 50;
    middel_right_1.buttonMode = true;
    middel_right_1.interactive = true; 
    middel_right_1.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_1);
    middel_right_1.on("click" , function (){
         buildingClick("middel_right_1");
    });
    middel_right.addChild(middel_right_1);
    
    // top right two
    var middel_right_2 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_2.x = 100;
    middel_right_2.y = 00;
    middel_right_2.buttonMode = true;
    middel_right_2.interactive = true; 
    middel_right_2.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_2);
    middel_right_2.on("click" , function (){
         buildingClick("middel_right_2");
    });
    middel_right.addChild(middel_right_2);
    // top right three
    var middel_right_3 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_3.x = 100;
    middel_right_3.y = 120;
    middel_right_3.buttonMode = true;
    middel_right_3.interactive = true; 
    middel_right_3.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_3);
    middel_right_3.on("click" , function (){
         buildingClick("middel_right_3");
    });
     middel_right.addChild(middel_right_3);
    // top right three
    var middel_right_4 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_4.x = 200;
    middel_right_4.y = 70;
    middel_right_4.buttonMode = true;
    middel_right_4.interactive = true; 
    middel_right_4.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_4);
    middel_right_4.on("click" , function (){
         buildingClick("middel_right_4");
    });
    middel_right.addChild(middel_right_4);
    
    var middel_right_5 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_5.x = 200;
    middel_right_5.y = 190;
    middel_right_5.buttonMode = true;
    middel_right_5.interactive = true; 
    middel_right_5.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_5);
    middel_right_5.on("click" , function (){
         buildingClick("middel_right_5");
    });
     middel_right.addChild(middel_right_5);
    // top right three
    var middel_right_6 = new Sprite(
            resources["images/stabl_1.png"].texture
            );
    middel_right_6.x = 290;
    middel_right_6.y = 135;
    middel_right_6.buttonMode = true;
    middel_right_6.interactive = true; 
    middel_right_6.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    building_const(middel_right_6);
    middel_right_6.on("click" , function (){
         buildingClick("middel_right_6");
    });
    middel_right.addChild(middel_right_6);
    
    
    
    // total middel 
    var middel = new Container();
    middel.scale._x = 0.9;
    middel.scale._y = 0.9;
    middel.x = 180;
    middel.y = 140;
    middel.addChild(middel_left);
    middel.addChild(middel_right);
    
    /*_________________________________________________________________________*/
    /*_______________________gate______________________________________________*/
    var gate  = new Container();
    gate.scale._x = 0.9;
    gate.scale._y = 0.9;
    //  city wall 
    var wall = new Sprite(resources["images/wall.png"].texture);
    wall.pivot.x = 0.5;
    wall.pivot.y = 0.5;
    wall.rotation = 0.06;
    wall.buttonMode = true;
    wall.interactive = true; 
    wall.hitArea = new PIXI.Polygon([129,0,146,12,165,62,236,82,241,171,177,196,124,236,74,192,3,163,9,88,80,67]);
    
    wall.on("pointerover" , function () {
        this.alpha = 0.8;
    });
    wall.on("pointerout" , function (){
        this.alpha = 1;
    });
    wall.on("click" , function (){
            buildingClick("wall");
    });
    gate.addChild(wall);
    
    // farm 
    var farm = new Sprite(resources["images/farm.png"].texture);
    // postioning farm
    farm.y = 150;
    farm.hitArea = new PIXI.Polygon([90,0,128,11,162,
        65,220,105,168,
        157,168,192,94,
        217,59,212,22,
        157,26,116,41,55]);
    farm.interactive = true;
    farm.buttonMode = true ; 
    farm.on("click" , function (){
            buildingClick("farm");
    });
    // market
    var market = new Sprite(resources["images/market.png"].texture);
    // postioning market
    market.y = 400;
    market.x = 280;
    market.interactive = true ; 
    market.buttonMode = true ;
    market.hitArea = new PIXI.Polygon([156,23,216,
                                        40,290,82,
                                        292,164,216,
                                        175,82,168,
                                        26,140,87,52]);
    market.on("click" , function (){
            buildingClick("market");
    });
    // front  of wall 
    var front_wall = new Container();
    front_wall.addChild(farm);
    front_wall.addChild(market);
    gate.addChild(front_wall);
    gate.y = 200;
    city.stage.addChild(upper_conatiner);
    city.stage.addChild(middel);
    city.stage.addChild(gate);
}

