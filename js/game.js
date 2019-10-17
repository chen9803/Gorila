// create a new scene
let gameScene = new Phaser.Scene('Game');
var createdText = false;
// ============= (1) init ===================
// init is the first function that is called. 
// Initiate certain variables or objects for your scene here. 
gameScene.init = function (){
    this.familyHealth = 5;
    this.money = 10;
    // array for all the different messages that will be displayed in the game
    this.strings = ["you are a simple villager who is trying to feed your family, and you can farm or go hunt gorillas",
                    "at the start of each month, you can chose to farm or hung gorillas to earn money",
                    "at the end of the month, you will spend your money to buy food",
                    "this is the first month and you have to decide if you want to hunt gorillas or farm",
                    "",
                    "Will you now buy food and water for your family?",
                    "ban",
                    ""
                   ];
    // style for all the text in the game and get it to wrap around the screen
    this.style = { font: '20pt Arial', fill: 'white', align: 'left', wordWrap:{width: config.width, useAdvancedWrap: true}};
    this.bigStyle = { font:"75pt Arial", fill: 'white', align:'center', wordWrap:{width: config.width, useAdvancedWrap: true}};
    console.log(this.style);
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
    this.moneyString = gameScene.add.text(0,config.height-30,"Moneyz: " + this.money,this.style);
    this.text = gameScene.add.text(0,0,this.strings[this.i], this.style);
    this.familyHealthString = gameScene.add.text(config.width-250,config.height-30,"Family Health: " + this.familyHealth,this.style);
    this.familyDeadString = gameScene.add.text(0,config.height-300,"Your family is dead", this.bigStyle);
    this.familyDeadString.setVisible(false);
};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  
    game.input.enabled = true;
    //check for active pointer 
    if(this.input.keyboard.checkDown(cursors.space, 5000)) {
        this.i ++;
        this.money += this.i;
        console.log("i: " + this.i);
        console.log("Moneyz: " + this.money);
        this.moneyString.setText("Moneyz: " + this.money);
        this.text.setText(this.strings[this.i]);
        if(this.i>=4){
            this.familyHealth -= 1;
        }
        
    }
    // get option text to show up on the correct index
    if(this.i == 4){
        // create the text and set it so it can be interacted with
        var option1 = text("hunt gorillas",0,50).setInteractive();
        var option2 = text("farm",500,50).setInteractive();
        var deadFamily = ("Your family is dead",0,0);
        //deadFamily.setOrigin: 
        option1.on('pointerdown',function(pointer){
            console.log('clicked option one');
            this.money = 100;
            console.log("Moneyz: " + this.money);
            this.i ++;
        });
        option2.on('pointerdown',function(pointer){
            console.log('clicked option 2');
            this.money += 3;
            console.log("Moneyz: " + this.money);
            this.i ++;
            
    })}
    if(this.familyHealth==0){
        this.familyDeadString.setVisible(true);
    }


};

//create text and return the object, can take in just a string or take in a string and its position
function text(string,x,y){
    if(typeof x !== 'undefined' && typeof y !== 'undefined'){
        return gameScene.add.text(x,y,string,gameScene.style);
    }
    return gameScene.add.text(0,config.height/2-10,string,gameScene.style);

}

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
