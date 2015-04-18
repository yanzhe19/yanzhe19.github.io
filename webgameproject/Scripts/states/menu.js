/// <reference path="../constants.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/sea.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/player.ts" />
/*Source  file  name: menu.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the menu state file, it controls and create the menus state,
Revision  History : Version 2.0*/
//This is the menu state
var states;
(function (states) {
    //event listener when play button of menu screen clicked
    function playButtonClicked(event) {
        //remove everything from the stage frist
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        //create another state screen --> play state screen
        currentState = constants.PLAY_STATE; //place to set the initial start level, current is the play state (level one)
        changeState(currentState);
    }
    states.playButtonClicked = playButtonClicked;
    //event listener when instruction button of menu screen clicked
    function instructionBtnClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        //go to the instruction state and screen changed to insturction state
        currentState = constants.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.instructionBtnClicked = instructionBtnClicked;
    //menu state function, updates for menu states
    function menuState() {
        sea.update();
        player.update();
    }
    states.menuState = menuState;
    //create the menu state scene
    function menu(state) {
        //label show the name of game
        var gameNameLabel;
        // Declare new Game Container
        game = new createjs.Container();
        // Instantiate Game Objects
        sea = new objects.Sea(stage, game);
        player = new objects.Player(state);
        // Show Cursor
        stage.cursor = "default";
        // Display Game Over
        gameNameLabel = new objects.Label(stage.canvas.width / 2, 40, "Dtzz Game!");
        game.addChild(gameNameLabel);
        // Display Instruction Button
        instructionBtn = new objects.Button(stage.canvas.width / 2, 230, "btnInstruction");
        game.addChild(instructionBtn);
        instructionBtn.addEventListener("click", instructionBtnClicked);
        // Display Play game Button
        playButton = new objects.Button(stage.canvas.width / 2, 300, "btnPlay");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);
        //Display idle player object
        //player.idle();
        game.addChild(player);
        //add game container to the stage
        stage.addChild(game);
    }
    states.menu = menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map