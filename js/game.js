// create a new scene
let gameScene = new Phaser.Scene('Game');

// extra variables
// counter for text
var i = 0;
// array for choices
var choices = [4,5];
// month counter
var month = 1;
// hunted gorilla counter
var gorillaCounter = 0;
// check for options being visible
var createdText = false;
var option1 = null;
var option2 = null;
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
                    "Your family has survived for another day"
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
    this.load.image('deathScreen','assets/death.jpg');
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
    this.youLose = this.add.sprite(0,0, 'deathScreen')
    this.youLose.setOrigin(0,0);
    // change the sprite origin to the top-left corner
    this.bg.setOrigin(0,0);
    this.moneyString = gameScene.add.text(0,config.height-30,"Moneyz: " + this.money,this.style);
    this.text = gameScene.add.text(0,0,this.strings[this.i], this.style);
    this.familyHealthString = gameScene.add.text(config.width-250,config.height-30,"Family Health: " + this.familyHealth,this.style);
    this.familyDeadString = gameScene.add.text(0,config.height-300,"Your family is dead", this.bigStyle);
    this.familyDeadString.setVisible(false);
    this.youLose.setVisible(false);
};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  
    game.input.enabled = true;
    //check for active pointer 
<<<<<<< HEAD
    if(this.input.keyboard.checkDown(cursors.space, 5000)) {
        i ++;
        money(i);
        console.log("i: " + i);
        console.log("your family's health: " + this.familyHealth);
        this.text.setText(this.strings[i]); 
        if(i >= 4){
            this.familyHealth -= 1;
        }
    }
    if (this.familyHealth<=0){
        this.familyDeadString.setVisible(true);
        this.familyDeadString.setDepth(3);
        this.youLose.setDepth(2);
        this.youLose.setVisible(true);
        console.log('you died')
        
=======
    
    if(typeof this.strings[i] !== 'undefined') {
        if(this.input.keyboard.checkDown(cursors.space, 5000) && notChoice()){
            i ++;
            family(-1)
            console.log("i: " + i);
            this.text.setText(this.strings[i]);
        }
    }else{
        i = 3;
        month++;
        this.text.setText("this is month " + month + ", and you need to decide if you want to farm or hunt gorillas");
        console.log('i: ' + i);
>>>>>>> a1315df90f0193c0a01a55f60c89be39036806d8
    }
    // get option text to show up on the correct index
    if(i == 4){
        console.log('option1: ' + option1);
        // create the text and set it so it can be interacted with
        if(/*typeof option1 == 'undefined' && typeof option2 == 'undefined'*/ option1 == null && option2 == null){
            console.log('added the text');
            createdText = true;
            option1 = text("hunt gorillas",0,50).setVisible(true).setInteractive();
            option1.setDepth(1);
            
            option2 = text("farm",500,50).setInteractive();
            option2.setVisible(true);
            option2.setDepth(1);
        }
        if(/*typeof option1 !== 'undefined' && typeof option2 !== 'undefined'*/ option1 != null && option2 != null && i == 4){
            option1.on('pointerdown', function(pointer){
                if(i == 4){
                    console.log('clicked option one');
                    gorillaCounter++;
                    money(100);
                    i ++;
                    console.log(i);
                    option1.setVisible(false);
                    option1 = null;
                    option2.setVisible(false);
                    option2 = null;
                    createdText = false;
                    // has to use gameScene.strings because this would refer to the text because we are inside the text reference
                    gameScene.text.setText(gameScene.strings[i]);
                }
            });
            option2.on('pointerdown',function(pointer){
                if(i == 4){
                    console.log('clicked option 2');
                    money(3);
                    i ++;
                    console.log(i);
                    option1.setVisible(false);
                    option1 = null;
                    option2.setVisible(false);
                    option2 = null;
                    createdText = false;
                    // has to use gameScene.strings because this would refer to the text because we are inside the text reference
                    gameScene.text.setText(gameScene.strings[i]);  
                }
            });
        }
    }
        if(i == 5){
            console.log('option1: ' + option1);
            // create the text and set it so it can be interacted with
            if(option1 == null && option2 == null){
                console.log('added the text');
                createdText = true;
                option1 = text("buy food",0,50).setVisible(true).setInteractive();
                option1.setDepth(1);
                
                option2 = text("starve them",500,50).setInteractive();
                option2.setVisible(true);
                option2.setDepth(1);
            }
            if(typeof option1 !== 'undefined' && typeof option2 !== 'undefined' && i == 5){
                option1.on('pointerdown', function(pointer){
                    if(i == 5){
                        console.log('clicked option one');
                        money(-10);
                        family(5);
                        i ++;
                        console.log(i);
                        option1.setVisible(false);
                        option1 = null;
                        option2.setVisible(false);
                        option2 = null;
                        createdText = false;
                        // has to use gameScene.strings because this would refer to the text because we are inside the text reference
                        gameScene.text.setText(gameScene.strings[i]);
                    }
                });
                option2.on('pointerdown',function(pointer){
                    if(i == 5){
                        console.log('clicked option 2');
                        money(-10);
                        family(-2);
                        i ++;
                        console.log(i);
                        option1.setVisible(false);
                        option1 = null;
                        option2.setVisible(false);
                        option2 = null;
                        createdText = false;
                        // has to use gameScene.strings because this would refer to the text because we are inside the text reference
                        gameScene.text.setText(gameScene.strings[i]);  
                    }
                });
            }
    }

};

// loop through the months choices until family health dies
function timePass(){
    
}

// create text and return the object, can take in just a string or take in a string and its position
function text(string,x,y){
    if(typeof x !== 'undefined' && typeof y !== 'undefined'){
        return gameScene.add.text(x,y,string,gameScene.style);
    }
    return gameScene.add.text(0,config.height/2-10,string,gameScene.style);

}
// check if it is the index of a choice
function notChoice(){
    for(let j = 0; j < choices.length; j++){
        if(i == choices[j]){
            return false;
        }
    }
    return true;
}
function family(value){
    gameScene.familyHealth += value;
    gameScene.familyHealthString.setText("Family Health: " + gameScene.familyHealth);
    return gameScene.familyHealth;
}
function money(value){
    gameScene.money += value;
    gameScene.moneyString.setText("moneyz: " + gameScene.money);
    return gameScene.money;
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
