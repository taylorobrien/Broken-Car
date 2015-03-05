var P2Game = {};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');


P2Game.StateA = function (game) {

    this.player;
    this.map;
    this.layer;
    this.bg;
    this.spikes
    this.spikes2
    this.spikes3
    this.spikes4
    this.spikes5
    this.sign
    this.car
    this.smoke
    this.wolf1
    this.wolf2
    this.wolf3
    this.wolf4
    this.wolf5
    this.a = .5;
    this.hastools = false;
    this.tools;
    this.music;
},

P2Game.StateA.prototype = {

preload: function () {

	this.load.image('background', 'assets/background-stars.png');
	this.load.image('sign', 'assets/sign.png');
	this.load.image('tools', 'assets/tools.png');
	this.load.image('car', 'assets/car.png');
	this.load.image('spikes', 'assets/spikes.png');
	this.load.image('tree', 'assets/tree.png');
 	this.load.tilemap('hospital', 'assets/map-game5.json', null,
Phaser.Tilemap.TILED_JSON);
	this.load.image('blueblack', 'assets/blueblacktile.png'); 	
	this.load.spritesheet('player', 'assets/girl-sprite.png',31, 48, 8); 
	this.load.spritesheet('smoke', 'assets/smoke-sprite.png',64, 58, 6);
	this.load.spritesheet('wolf', 'assets/wolf-sprite.png',108, 51, 12); 
	this.load.audio('forest',['assets/forest.mp3','assets/forest.ogg']);



    },

    create: function () {

	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'background');
        //this.game.stage.backgroundColor = '#806000';
	this.bg.scale.set(1.75,1.75);
	
	this.sign = this.game.add.sprite(150,60,'sign');
	this.sign.scale.set(.4,.4);

	this.music = this.game.add.audio('forest');
	this.music.play('',0,1,true);

	this.smoke = this.game.add.sprite(60,83,'smoke');
	this.smoke.animations.add('smoking', [0,1,2,3,4,5],6,true);
	this.smoke.animations.play('smoking');

	this.tools = this.game.add.sprite(2340,80,'tools');
	this.tools.scale.set(.07,.07);
	this.game.physics.enable(this.tools, Phaser.Physics.ARCADE);
	
	this.car = this.game.add.sprite(35,130,'car');
	this.car.scale.set(.3,.3);
	this.game.physics.enable(this.car, Phaser.Physics.ARCADE);

	this.spikes = this.game.add.sprite(590,550,'spikes');
	this.game.physics.arcade.enable(this.spikes);
	this.spikes.body.gravity.y = -200;
	this.spikes.scale.set(.5,.5);

	this.spikes2 = this.game.add.sprite(750,200,'spikes');
	this.game.physics.arcade.enable(this.spikes2);
	this.spikes2.body.gravity.y = -200;
	this.spikes2.scale.set(.5,.5);

	this.spikes3 = this.game.add.sprite(-110,350,'spikes');
	this.game.physics.arcade.enable(this.spikes3);
	this.spikes3.body.gravity.y = -200;
	this.spikes3.scale.set(.5,.5);

	this.spikes4 = this.game.add.sprite(2100,480,'spikes');
	this.game.physics.arcade.enable(this.spikes4);
	this.spikes4.body.gravity.y = -200;
	this.spikes4.scale.set(.25,.25);

	this.map = this.game.add.tilemap('hospital');
	this.map.addTilesetImage('blueblack');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	var tree = this.game.add.sprite(350,35,'tree');
	var tree2 = this.game.add.sprite(120,335,'tree');
	var tree3 = this.game.add.sprite(330,475,'tree');	
	var tree4 = this.game.add.sprite(520,475,'tree');
	var tree5 = this.game.add.sprite(850,75,'tree');
	var tree6 = this.game.add.sprite(1080,453,'tree');
	var tree7 = this.game.add.sprite(1350,195,'tree');	
	var tree8 = this.game.add.sprite(1500,533,'tree');
	var tree9 = this.game.add.sprite(1800,153,'tree');
	var tree10 = this.game.add.sprite(1970,533,'tree');	
	var tree11 = this.game.add.sprite(2100,195,'tree');
	var tree12 = this.game.add.sprite(2300,35,'tree');	
	var tree13 = this.game.add.sprite(2295,353,'tree');

	this.player = this.game.add.sprite(150,50,'player');
	//this.player = this.game.add.sprite(1900,50,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('idle', [0],1,true);
	this.player.animations.add('left', [0,1,2,3],4,true);
	this.player.animations.add('right', [4,5,6,7],4,true);
	this.player.animations.play('right');
	this.player.body.collideWorldBounds = true;
	this.player.scale.set(.75,.75);
	this.game.camera.follow(this.player);

	this.wolf1 = this.game.add.sprite(90,560,'wolf');
	this.game.physics.arcade.enable(this.wolf1);
	this.wolf1.animations.add('right', [0,1,2,3,5],6,true);
	this.wolf1.animations.add('left', [6,7,8,9,10,11],6,true);
	this.wolf1.animations.play('right');
	this.wolf1.body.velocity.x = 60;
	this.wolf1.scale.set(.5,.5);
	this.wolf1.body.bounce.set(1);
	this.wolf1.body.collideWorldBounds = true;




	this.game.physics.arcade.gravity.y = 200;


        this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },


    playerkill: function(){

        this.state.start('StateC');

},

   wolfhitwall: function(){
	 this.wolf1.scale.x = this.a*-1; 
		
},

   gettoolbox: function(){
	this.hastools = true;
	this.tools.kill();

},

   atcar: function(){
	if(this.hastools == true){
		this.state.start('StateD');
 	}
},
   

    update: function () {

	this.game.physics.arcade.collide(this.wolf1,this.layer); //, this.wolfhitwall,null,this);
	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.collide(this.tools,this.layer);
	this.game.physics.arcade.collide(this.car,this.layer);
	this.game.physics.arcade.overlap(this.car,this.player,this.atcar,null,this);
	this.game.physics.arcade.overlap(this.player, this.spikes,
this.playerkill,null, this);
	this.game.physics.arcade.overlap(this.player, this.spikes2,
this.playerkill,null, this);
	this.game.physics.arcade.overlap(this.player, this.spikes3,
this.playerkill,null, this);
	this.game.physics.arcade.overlap(this.player, this.spikes4,
this.playerkill,null, this);
	this.game.physics.arcade.overlap(this.player, this.wolf1,
this.playerkill,null, this);

this.game.physics.arcade.collide(this.player, this.tools,
this.gettoolbox,null, this);
	this.bg.tilePosition.x -= .05;
    
if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();
	    //this.player.body.velocity.y =200;
	    this.player.body.velocity.x = 0;
            this.facing = 'idle';
        }
    }



    },

    render: function () {

       

        this.game.debug.text("State A", 32, 560);

    }

};


//  State C //////////////////////////////////////////////////////////

P2Game.StateC = function (game) {

    this.player;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateC.prototype = {

    create: function () {

	this.game.stage.backgroundColor = '#00FFFF';
	

	var style3 = {font: "30px Arial", fill:"#DC143C"};
	var scoringstuff = "At least you tried? Refresh to play again!";
 	var winstatement = game.add.text(50,200,scoringstuff,style3);
	

    },


    
    update: function () {


    },


    render: function () {

    }

};
//////
P2Game.StateD = function (game) {

    this.player;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateD.prototype = {

    create: function () {

	this.game.stage.backgroundColor = '#00FFFF';
	

	var style3 = {font: "30px Arial", fill:"#DC143C"};
	var scoringstuff = "Good job! You made it out alive! Refresh to play again!";
 	var winstatement = game.add.text(50,200,scoringstuff,style3);
	

    },


    
    update: function () {


    },


    render: function () {

    }

};

game.state.add('StateA', P2Game.StateA);
game.state.add('StateD', P2Game.StateD);
game.state.add('StateC', P2Game.StateC);


game.state.start('StateA');

//http://greatleadersserve.com/wp-content/uploads/2012/08/iStock_000020378687XSmall.jpg
//http://imageshack.com/handle_redirect.php?ser=233&file=animations2222223.png
//http://cliparts.co/cliparts/8cz/nLb/8cznLbR7i.png
//http://previews.123rf.com/images/zentilia/zentilia1111/zentilia111100067/11503913-3d-rendering-of-blank-signs-pointing-in-opposite-directions-Stock-Photo.jpg
//http://img3.wikia.nocookie.net/__cb20130304122439/sonic/images/d/d3/Spikes_in_Sonic_the_Hedgehog_4.png
//http://www.wikihow.com/images/e/eb/594851-11.jpg
//http://static.giantbomb.com/uploads/original/12/126604/2430869-7835230262-starf.gif
//http://fc03.deviantart.net/fs70/f/2013/177/9/e/bina___rpg_sprites__request__by_lagoon_sadnes-d6atbky.png//http://felicemagazine.weebly.com/uploads/2/1/8/7/21874606/9978435_orig.png

//http://greatleadersserve.com/wp-content/uploads/2012/08/iStock_000020378687XSmall.jpg
//http://imageshack.com/handle_redirect.php?ser=233&file=animations2222223.png
//http://cliparts.co/cliparts/8cz/nLb/8cznLbR7i.png
//http://previews.123rf.com/images/zentilia/zentilia1111/zentilia111100067/11503913-3d-rendering-of-blank-signs-pointing-in-opposite-directions-Stock-Photo.jpg
//http://img3.wikia.nocookie.net/__cb20130304122439/sonic/images/d/d3/Spikes_in_Sonic_the_Hedgehog_4.png
//http://www.wikihow.com/images/e/eb/594851-11.jpg
//http://static.giantbomb.com/uploads/original/12/126604/2430869-7835230262-starf.gif
//http://fc03.deviantart.net/fs70/f/2013/177/9/e/bina___rpg_sprites__request__by_lagoon_sadnes-d6atbky.png//http://felicemagazine.weebly.com/uploads/2/1/8/7/21874606/9978435_orig.png

