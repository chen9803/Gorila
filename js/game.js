// create a new scene
let gameScene = new Phaser.Scene('Game');

// ============= (1) init ===================
// init is the first function that is called. 
// Initiate certain variables or objects for your scene here. 
gameScene.init = function (){
    this.familyHealth = 5;
    this.money = 10;
    this.strings = ["you are a simple villager who is trying to feed your family, and you can farm or go hunt gorillas",
                    "at the start of each month, you can chose to farm or hung gorillas to earn money",
                    "at the end of the month, you will spend your money to buy food",
                    "this is the first month and you have to decide if you want to hunt gorillas or farm",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban",
                    "ban"
                   ];
    this.style = { font: 'bold 20pt Arial', fill: 'white', align: 'left', wordWrap:{width: config.width, useAdvancedWrap: true}};
    this.i = 0;
//    this.timer = game.time.create(1000, false);
};

// ============ (2) preload =================
// preload is used to load all of your assets to memory. 
// All your images, sounds, and other files will be ready. 
gameScene.preload = function (){
    this.load.image('player', 'assets/player.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};

// ============ (3) create ==================
// create is called once when preload is complete. 
// Create your sprite objects and display them 
gameScene.create = function () {
    // set up cursor input
    cursors = this.input.keyboard.createCursorKeys();
    //console.log(cursors);
    // create background sprite
    this.bg = this.add.sprite(0, 0, 'background');
    // change the sprite origin to the top-left corner
    this.bg.setOrigin(0,0);
    
    this.text = gameScene.add.text(0,0,this.strings[this.i], this.style);
};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  
    game.input.enabled = true;
    //check for active pointer 
    if(this.input.keyboard.checkDown(cursors.space, 5000)) {
        this.i ++;
        console.log("spacebar down");
        this.text.setText(this.strings[this.i]);       
    }

};



//The maximum is inclusive and the minimum is inclusive 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
//checks if two sprites intersect
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};

// set the configuration of the game
let config = {
    type: Phaser.AUTO, 
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
