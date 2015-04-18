/// <reference path="constants.ts" />
/// <reference path="managers/playerasset.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/ghost.ts" />
/// <reference path="objects/sea.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/ufo.ts" />
/// <reference path="objects/fireball.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="managers/collision.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/level2state.ts" />
/// <reference path="states/level3state.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/instruction.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="objects/levellabel.ts" />
/// <reference path="objects/player.ts" />

// Big Fish Version 2.0
/*Source  file  name: game.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_3_18,  Program description： This file is the main game typescript file and controls the game loop and game state
Revision  History : Version 2.0*/

//+++++++++++++++++++++++++++++++++++++++++++variable section++++++++++++++++++++++++++++++++
//stage and game container
var stage: createjs.Stage;
var game: createjs.Container;

//game variables
var sea: objects.Sea;
var player: objects.Player;
//var smallFish: objects.SmallFish;
var ghosts = [];//ghost array;
var ufo;//ufo object;
var fireballs = [];//fireball array;
var fences = [];//fences array;
var crystals = [];//crystals array;
var levelLabel: objects.LevelLabel;//this is the text of displaying levels
var backgroundSound: createjs.SoundInstance;

var scoreboard: objects.Scoreboard;

//collision variables
var collision: managers.Collision;

//Buttons needed for the big fish game
var tryAgain: objects.Button;
var playButton: objects.Button;
var instructionBtn: objects.Button;
var goBackBtn: objects.Button;
var backToMenuBtn: objects.Button;

//state variables
var currentState: number;
var currentStateFunction;
//+++++++++++++++++++++++++++++++++++++++++++END of variable section++++++++++++++++++++++++++++++++


// Preload function - Loads Assets and initializes game;
function preload(): void {
    managers.PlayerAssets.init();
    managers.Assets.init();
    //after assets loaded, invoke init function
    managers.Assets.loader.addEventListener("complete", new function () { managers.PlayerAssets.loader.addEventListener("complete", init); });
    
}

// init called after Assets have been loaded.
function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(30);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    optimizeForMobile();

    this.backgroundSound = createjs.Sound.play('backgroundSound', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);

    //set the current game staate to MENU_STATE
    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// Add touch support for mobile devices
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

// Game Loop
function gameLoop(event): void {
    //invoke the current state function, to update game state accordingly
    currentStateFunction();
    stage.update();
}

//function to change game state
function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            currentStateFunction = states.menuState;
            // instantiate menu screen
            states.menu(state);

            //this.backgroundSound.stop();
            //this.backgroundSound.start();
            break;

        case constants.PLAY_STATE://this is the first level
            // instantiate play screen
            states.play(state);
            currentStateFunction = states.playState;
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            // instantiate game over screen
            states.gameOver(state);
            break;

        case constants.INSTRUCTION_STATE:
            currentStateFunction = states.instructionState;
            // instantiate instruction screen
            states.instructionScene(state);
            break;

        case constants.LEVEL_TWO_STATE:
            currentStateFunction = states.level2State;
            // instantiate level two screen
            states.level2Scene(state);
            break;

        case constants.LEVEL_THREE_STATE:
            currentStateFunction = states.level3State;
            // instantiate level three screen
            states.level3Scene(state);
            break;
    }
}





